import {sanitizeSection,validation,SECTIONS} from './data.js';
const prefix='career-v1:';
const enc=new TextEncoder();
export const read=(key,fallback=null)=>{try{return JSON.parse(localStorage.getItem(prefix+key))??fallback;}catch{return fallback;}};
export function write(key,value){localStorage.setItem(prefix+key,JSON.stringify(value));window.dispatchEvent(new Event('career-storage'));}
export const encode=bytes=>btoa(String.fromCharCode(...new Uint8Array(bytes))).replaceAll('+','-').replaceAll('/','_').replaceAll('=','');
export const decode=s=>Uint8Array.from(atob(s.replaceAll('-','+').replaceAll('_','/')),c=>c.charCodeAt(0));
const canonical=(...v)=>enc.encode(JSON.stringify(v));
export async function makeIdentity(){const pair=await crypto.subtle.generateKey({name:'ECDSA',namedCurve:'P-256'},true,['sign','verify']);return {pub:encode(await crypto.subtle.exportKey('raw',pair.publicKey)),private:await crypto.subtle.exportKey('jwk',pair.privateKey)};}
async function sign(identity,bytes){const key=await crypto.subtle.importKey('jwk',identity.private,{name:'ECDSA',namedCurve:'P-256'},false,['sign']);return encode(await crypto.subtle.sign({name:'ECDSA',hash:'SHA-256'},key,bytes));}
async function verify(pub,sig,bytes){try{const key=await crypto.subtle.importKey('raw',decode(pub),{name:'ECDSA',namedCurve:'P-256'},false,['verify']);return await crypto.subtle.verify({name:'ECDSA',hash:'SHA-256'},key,decode(sig),bytes);}catch{return false;}}
async function identityId(pub){return encode(await crypto.subtle.digest('SHA-256',enc.encode(pub))).slice(0,24);}
export async function createRoom(title){const identity=await makeIdentity();const room={id:crypto.randomUUID(),title:String(title||'M365 커리어 워크숍').slice(0,80),identity,created:Date.now(),open:true,people:{}};write('room:'+room.id,room);const rooms=read('rooms',[]);write('rooms',[room.id,...rooms]);return room;}
export function joinURL(room){return `${location.origin}${location.pathname}#/join/${room.id}?key=${room.identity.pub}`;}
const safeMessage=data=>data&&typeof data==='object'&&!Array.isArray(data)&&JSON.stringify(data).length<48000;
const allowed=new Set(SECTIONS.map(s=>s.key));
export class Classroom {
 constructor(room,onChange){this.room=room;this.onChange=onChange;this.connections=new Map();this.peer=null;this.status='수업방 연결 중';}
 start(){
  this.peer=new Peer('career-'+this.room.id,{debug:0});
  this.peer.on('open',()=>{this.status='수업방 열림';this.emit();});
  this.peer.on('connection',c=>this.accept(c));
  this.peer.on('error',e=>{this.status=e.type==='unavailable-id'?'이 수업방이 다른 화면에서 열려 있습니다.':'연결 오류 · 인터넷 연결 후 다시 열어 주세요.';this.emit();});
  this.peer.on('disconnected',()=>{this.status='수업방 연결 끊김 · 다시 연결 중';this.emit();if(!this.peer.destroyed)this.peer.reconnect();});
 }
 emit(){this.onChange?.(this);}
 persist(){write('room:'+this.room.id,this.room);this.emit();}
 accept(c){
  const clientNonce=c.metadata?.nonce;const nonce=crypto.randomUUID();let id=null;let authenticated=false;let busy=false;
  const deadline=setTimeout(()=>{if(!authenticated)c.close();},15000);
  c.on('open',async()=>{try{if(!this.room.open||typeof clientNonce!=='string'||clientNonce.length>80)return c.close();c.send({type:'hello',nonce,signature:await sign(this.room.identity,canonical('career-v1',this.room.id,clientNonce,nonce))});}catch{c.close();}});
  c.on('data',async data=>{
   if(busy||!safeMessage(data))return;busy=true;
   try{
    if(!authenticated){if(data.type!=='auth'||typeof data.pub!=='string'||data.pub.length>200||!await verify(data.pub,data.signature,canonical('career-student-v1',this.room.id,clientNonce,nonce)))return c.close();
     id=await identityId(data.pub);authenticated=true;clearTimeout(deadline);this.connections.get(id)?.close();this.connections.set(id,c);
     const person=this.room.people[id]??={alias:'익명 '+id.slice(0,6).toUpperCase(),sections:{},hidden:{}};
     c.send({type:'ready',alias:person.alias,title:this.room.title});this.emit();return;
    }
    if(!this.room.open)return c.send({type:'error',request:data.request,message:'강사가 수업방을 닫았습니다.'});
    if(!allowed.has(data.section)||typeof data.request!=='string'||data.request.length>80)return;
    const person=this.room.people[id];const before=structuredClone(person);
    try{
     if(data.type==='share'){const value=sanitizeSection(data.section,data.value);const issue=validation(data.section,value);if(issue)throw new Error(issue);person.sections[data.section]={value,updated:Date.now()};}
     else if(data.type==='withdraw')delete person.sections[data.section];else return;
     this.persist();c.send({type:'ack',request:data.request,section:data.section,operation:data.type});
    }catch(e){this.room.people[id]=before;c.send({type:'error',request:data.request,message:e.name==='QuotaExceededError'?'강사 기기의 저장 공간이 부족합니다.':e.message});}
   }catch{c.close();}finally{busy=false;}
  });
  c.on('close',()=>{clearTimeout(deadline);if(this.connections.get(id)===c)this.connections.delete(id);this.emit();});
  c.on('error',()=>c.close());
 }
 stop(){this.peer?.destroy();this.connections.clear();}
}
export class Participant {
 constructor(room,key,onChange){this.room=room;this.key=key;this.onChange=onChange;this.status='수업방 연결 중';this.ready=false;this.pending=new Map();this.closed=false;}
 async start(){
  try{this.identity=read('identity:'+this.room);if(!this.identity){this.identity=await makeIdentity();write('identity:'+this.room,this.identity);}this.peer=new Peer({debug:0});
   this.peer.on('open',()=>this.connect());this.peer.on('error',()=>this.offline());this.peer.on('disconnected',()=>this.offline());
  }catch{this.status='이 브라우저에서 연결을 시작하지 못했습니다. 일반 브라우저로 열어 주세요.';this.onChange?.(this);}
 }
 offline(){this.ready=false;this.status='강사 연결 대기 · 작성 내용은 이 기기에 저장돼요';this.onChange?.(this);}
 connect(){const clientNonce=crypto.randomUUID();this.conn=this.peer.connect('career-'+this.room,{reliable:true,serialization:'json',metadata:{nonce:clientNonce}});let trusted=false;
  this.conn.on('data',async data=>{if(!safeMessage(data))return;try{
   if(data.type==='hello'&&!trusted){if(!await verify(this.key,data.signature,canonical('career-v1',this.room,clientNonce,data.nonce))){this.status='수업방 인증에 실패했습니다. 강사의 참여 링크를 확인해 주세요.';this.onChange?.(this);return this.conn.close();}trusted=true;this.conn.send({type:'auth',pub:this.identity.pub,signature:await sign(this.identity,canonical('career-student-v1',this.room,clientNonce,data.nonce))});}
   else if(trusted&&data.type==='ready'){this.ready=true;this.alias=data.alias;this.title=data.title;this.status=`${this.alias} · 수업방 연결됨`;this.onChange?.(this);}
   else if(trusted&&(data.type==='ack'||data.type==='error')){const p=this.pending.get(data.request);if(p){clearTimeout(p.timer);this.pending.delete(data.request);data.type==='ack'?p.resolve(data):p.reject(new Error(data.message));}}
  }catch{this.offline();}});
  this.conn.on('close',()=>this.offline());this.conn.on('error',()=>this.offline());
  setTimeout(()=>{if(!this.ready&&!this.closed)this.offline();},12000);
 }
 send(type,section,value){return new Promise((resolve,reject)=>{if(!this.ready||!this.conn?.open)return reject(new Error('강사 화면과 연결된 뒤 다시 공유해 주세요. 내용은 기기에 남아 있습니다.'));const request=crypto.randomUUID();const timer=setTimeout(()=>{this.pending.delete(request);reject(new Error('공유 확인을 받지 못했습니다. 연결 상태를 확인하고 다시 눌러 주세요.'));},12000);this.pending.set(request,{resolve,reject,timer});this.conn.send({type,section,value,request});});}
 stop(){this.closed=true;this.peer?.destroy();for(const p of this.pending.values()){clearTimeout(p.timer);p.reject(new Error('연결이 종료되었습니다.'));}this.pending.clear();}
}
