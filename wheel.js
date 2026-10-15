import {AREAS,PHASES,series,escapeHTML as e} from './data.js?v=20261015-rooms1';
export const COLORS={baseline:'#345ce6',goal:'#cc7616',after:'#008578'};
const point=(i,score,r=170)=>[300+Math.sin(i*Math.PI/4)*r*score/10,270-Math.cos(i*Math.PI/4)*r*score/10];
const points=values=>values.map((v,i)=>point(i,v).join(',')).join(' ');
export function wheelSVG(wheel,interactive=true){
 const values=series(wheel);let svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 540" role="img" aria-label="취업 동기 코칭 휠. 현재 파랑 점선, 목표 주황, 실행 후 초록."><rect width="600" height="540" fill="white"/>';
 for(let n=1;n<=10;n++)svg+=`<circle cx="300" cy="270" r="${n*17}" fill="none" stroke="${n%5===0?'#c8d1e2':'#e9edf4'}" stroke-width="${n%5===0?1.5:1}"/>`;
 AREAS.forEach((a,i)=>{const [x,y]=point(i,10);const [lx,ly]=point(i,10,221);svg+=`<line x1="300" y1="270" x2="${x}" y2="${y}" stroke="#c8d1e2"/><text x="${lx}" y="${ly+5}" text-anchor="middle" font-family="sans-serif" font-size="17" font-weight="600" fill="#33405b">${a.label}</text>`;});
 for(const n of [0,5,10])svg+=`<text x="307" y="${270-n*17-5}" font-family="sans-serif" font-size="12" fill="#748097">${n}</text>`;
 for(const phase of ['goal','baseline','after']){const v=values[phase],color=COLORS[phase],dash=phase==='baseline'?'8 6':phase==='goal'?'3 5':'';
  if(v.every(n=>n!==null))svg+=`<polygon points="${points(v)}" fill="${color}" fill-opacity=".06" stroke="${color}" stroke-width="3" stroke-dasharray="${dash}"/>`;
  else v.forEach((n,i)=>{const next=(i+1)%8;if(n!==null&&v[next]!==null){const a=point(i,n),b=point(next,v[next]);svg+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${color}" stroke-width="3" stroke-dasharray="${dash}"/>`;}});
  v.forEach((n,i)=>{if(n===null)return;const [x,y]=point(i,n);const reason=phase==='goal'?wheel.actions[AREAS[i].key]?.text:wheel[phase][i]?.reason;svg+=`<g ${interactive?`tabindex="0" role="button" data-point="${phase}:${i}"`:''} aria-label="${e(`${AREAS[i].label} ${PHASES[phase]} ${n}점. ${reason||'이유 미작성'}`)}"><title>${e(`${AREAS[i].label} · ${PHASES[phase]} ${n}점: ${reason||'이유 미작성'}`)}</title><circle cx="${x}" cy="${y}" r="14" fill="transparent"/><circle cx="${x}" cy="${y}" r="6" fill="${color}" stroke="white" stroke-width="2"/></g>`;});
 }
 return svg+'</svg>';
}
export function mountWheel(container,wheel){
 container.innerHTML=wheelSVG(wheel)+'<div class="point-tip" hidden></div><div class="legend"><span class="blue">┄ 현재</span><span class="orange">··· 목표</span><span class="green">━ 실행 후</span></div><p class="chart-hint">점을 누르면 그 점수의 이유가 나타나요.</p>';
 const tip=container.querySelector('.point-tip');
 const show=target=>{const [phase,index]=target.dataset.point.split(':');const i=Number(index),a=AREAS[i];const value=phase==='goal'?wheel.actions[a.key]?.goal:wheel[phase][i].score;const reason=phase==='goal'?wheel.actions[a.key]?.text:wheel[phase][i].reason;
  tip.innerHTML=`<strong>${a.label} · ${PHASES[phase]} ${value}점</strong><p>${e(reason||'아직 이유를 적지 않았어요.')}</p>`;tip.hidden=false;
  const rect=target.getBoundingClientRect(),parent=container.getBoundingClientRect();tip.style.left=Math.max(8,Math.min(rect.left-parent.left,container.clientWidth-264))+'px';tip.style.top=Math.max(8,rect.top-parent.top-95)+'px';
 };
 container.querySelectorAll('[data-point]').forEach(el=>{el.addEventListener('click',()=>show(el));el.addEventListener('focus',()=>show(el));el.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();show(el);}if(ev.key==='Escape')tip.hidden=true;});});
}
