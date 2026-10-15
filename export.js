import {ASSETS,AREAS,PHASES,validation} from './data.js?v=20261015-rooms1';
import {wheelSVG} from './wheel.js?v=20261015-rooms1';
const font='"Malgun Gothic", "Apple SD Gothic Neo", sans-serif';
export async function planImage(plan,strength=''){
 const issue=validation('plan',plan);if(issue)throw new Error(issue);
 await document.fonts.ready;
 const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');canvas.width=1200;
 const blocks=[];let y=95;
 function lines(text,size,weight,width=1000){ctx.font=`${weight} ${size}px ${font}`;const result=[];for(const paragraph of String(text).split('\n')){let line='';for(const c of paragraph){if(ctx.measureText(line+c).width>width){result.push(line);line=c;}else line+=c;}result.push(line);}return result;}
 function add(text,size=28,color='#26334d',weight=400,gap=20){const content=lines(text,size,weight);blocks.push({content,size,color,weight,y});y+=content.length*size*1.65+gap;}
 add('MY NEXT CHAPTER',22,'#345ce6',700,22);add('나의 취업 계획서',54,'#172640',700,30);
 add(new Date().toLocaleDateString('ko-KR')+'  ·  내일의 나 커리어 워크숍',21,'#697790',400,54);
 add('나를 소개하는 한 문장',22,'#345ce6',700,10);add(plan.intro,34,'#172640',700,36);
 add('희망 직무',22,'#345ce6',700,10);add(plan.role,30,'#26334d',400,24);
 add('취업 희망 시기',22,'#345ce6',700,10);add(plan.when,30,'#26334d',400,40);
 add('지금 시작할 세 가지',22,'#345ce6',700,18);plan.tasks.forEach((v,i)=>add(`${i+1}. ${v}`,29,'#26334d',400,22));
 if(strength.trim()){add('내가 가져갈 강점',22,'#345ce6',700,12);add(strength,27,'#26334d',400,38);}
 add('미래의 나에게',22,'#345ce6',700,14);add(plan.letter,29,'#26334d',400,50);
 add('완벽한 준비보다, 오늘의 한 걸음.',24,'#697790',400,0);
 canvas.height=Math.ceil(y+80);ctx.fillStyle='white';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#345ce6';ctx.fillRect(0,0,1200,14);
 blocks.forEach(b=>{ctx.font=`${b.weight} ${b.size}px ${font}`;ctx.fillStyle=b.color;ctx.textBaseline='top';b.content.forEach((line,i)=>ctx.fillText(line,100,b.y+i*b.size*1.65));});
 return new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
}
export async function wheelImage(wheel){
 const canvas=document.createElement('canvas');canvas.width=1200;const ctx=canvas.getContext('2d');
 const rows=[];for(const [i,a] of AREAS.entries()){let text=`${a.label}  ·  현재 ${wheel.baseline[i].score??'미입력'}점: ${wheel.baseline[i].reason}`;const action=wheel.actions[a.key];if(action)text+=`\n목표 ${action.goal??'미입력'}점 · ${action.text} (${action.when})`;if(wheel.after[i].score!==null)text+=`\n실행 후 ${wheel.after[i].score}점: ${wheel.after[i].reason}`;rows.push(text);}
 ctx.font=`25px ${font}`;const wrap=s=>{const out=[];for(const p of s.split('\n')){let line='';for(const c of p){if(ctx.measureText(line+c).width>1000){out.push(line);line=c;}else line+=c;}out.push(line);}return out;};const wrapped=rows.map(wrap);canvas.height=1150+wrapped.reduce((n,r)=>n+r.length*40+30,0);
 ctx.fillStyle='white';ctx.fillRect(0,0,1200,canvas.height);ctx.fillStyle='#172640';ctx.font=`700 44px ${font}`;ctx.fillText('나의 취업 동기 코칭 휠',100,85);
 const url=URL.createObjectURL(new Blob([wheelSVG(wheel,false)],{type:'image/svg+xml'}));const img=new Image();await new Promise((res,rej)=>{img.onload=res;img.onerror=rej;img.src=url;});ctx.drawImage(img,80,100,1040,936);URL.revokeObjectURL(url);
 ctx.font=`25px ${font}`;ctx.fillStyle='#52617b';ctx.fillText('파랑 점선: 현재   /   주황: 목표   /   초록: 실행 후',100,1070);let y=1140;
 for(const lines of wrapped){ctx.fillStyle='#26334d';for(const l of lines){ctx.fillText(l,100,y);y+=40;}y+=30;}
 return new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
}
export function download(blob,name){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);}
