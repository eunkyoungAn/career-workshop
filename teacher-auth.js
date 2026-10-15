// Teacher capabilities and saved classrooms are encrypted; the access number is never bundled.
const encoder=new TextEncoder(),decoder=new TextDecoder();
const pack=bytes=>btoa(String.fromCharCode(...new Uint8Array(bytes)));
const unpack=value=>Uint8Array.from(atob(value),c=>c.charCodeAt(0));
const bytes=(...parts)=>encoder.encode(JSON.stringify(parts));
let configuration=null,authorityKey=null,vaultKey=null,generation=0;
async function config(){if(!configuration){const response=await fetch(new URL('./teacher-access.json',import.meta.url),{cache:'no-store'});if(!response.ok)throw new Error('강사 확인 설정을 불러오지 못했습니다. 다시 시도해 주세요.');configuration=await response.json();}return configuration;}
export const isTeacherUnlocked=()=>authorityKey!==null&&vaultKey!==null;
export function lockTeacher(){generation++;authorityKey=null;vaultKey=null;}
export async function unlockTeacher(value){
 const code=String(value??'').replace(/[\s-]/g,'');if(!/^\d{4}$/.test(code))throw new Error('숫자 4자리 강사번호를 입력해 주세요.');
 const settings=await config();const attempt=++generation;
 try{
  const material=await crypto.subtle.importKey('raw',encoder.encode(code),'PBKDF2',false,['deriveKey']);
  const key=await crypto.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt:unpack(settings.salt),iterations:settings.iterations},material,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
  const raw=await crypto.subtle.decrypt({name:'AES-GCM',iv:unpack(settings.iv),additionalData:bytes('career-teacher-authority-v1')},key,unpack(settings.encryptedAuthority));
  const authority=await crypto.subtle.importKey('jwk',JSON.parse(decoder.decode(raw)),{name:'ECDSA',namedCurve:'P-256'},false,['sign']);
  if(attempt!==generation)throw new Error('cancelled');vaultKey=key;authorityKey=authority;
 }catch{if(attempt===generation){vaultKey=null;authorityKey=null;}throw new Error('강사번호가 일치하지 않습니다. 다시 확인해 주세요.');}
}
export async function authorizeRoom(room){
 if(!isTeacherUnlocked())throw new Error('강사번호를 먼저 입력해 주세요.');
 room.authorization=pack(await crypto.subtle.sign({name:'ECDSA',hash:'SHA-256'},authorityKey,bytes('career-teacher-room-v1',room.id,room.identity.pub)));
 return room;
}
export async function verifyTeacherRoom(id,pub,signature){
 try{if(typeof signature!=='string'||signature.length>200)return false;const settings=await config();const key=await crypto.subtle.importKey('jwk',settings.publicKey,{name:'ECDSA',namedCurve:'P-256'},false,['verify']);return await crypto.subtle.verify({name:'ECDSA',hash:'SHA-256'},key,unpack(signature),bytes('career-teacher-room-v1',id,pub));}catch{return false;}
}
export async function saveTeacherRoom(room){
 if(!isTeacherUnlocked())throw new Error('강사 공간이 잠겼습니다. 다시 로그인해 주세요.');
 const key=vaultKey,iv=crypto.getRandomValues(new Uint8Array(12));
 const ciphertext=await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:bytes('career-room-vault-v1',room.id)},key,encoder.encode(JSON.stringify(room)));
 if(vaultKey!==key)throw new Error('강사 공간이 잠겼습니다.');
 localStorage.setItem('career-v1:room:'+room.id,JSON.stringify({encrypted:1,iv:pack(iv),data:pack(ciphertext)}));
}
export async function readTeacherRoom(id){
 if(!isTeacherUnlocked())throw new Error('강사번호를 먼저 입력해 주세요.');
 const stored=JSON.parse(localStorage.getItem('career-v1:room:'+id)||'null');if(!stored)return null;
 let room;
 if(stored.encrypted===1){const raw=await crypto.subtle.decrypt({name:'AES-GCM',iv:unpack(stored.iv),additionalData:bytes('career-room-vault-v1',id)},vaultKey,unpack(stored.data));room=JSON.parse(decoder.decode(raw));}
 else{room=stored;if(room.id!==id||!room.identity?.pub)throw new Error('수업방 정보를 확인할 수 없습니다.');await authorizeRoom(room);await saveTeacherRoom(room);}
 if(!await verifyTeacherRoom(room.id,room.identity.pub,room.authorization)){await authorizeRoom(room);await saveTeacherRoom(room);}
 return room;
}
export async function migrateTeacherRooms(){const ids=JSON.parse(localStorage.getItem('career-v1:rooms')||'[]');for(const id of ids)await readTeacherRoom(id);}
