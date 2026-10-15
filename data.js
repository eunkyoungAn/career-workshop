export const ASSETS = [
 {key:'interest',title:'흥미',question:'무엇을 할 때 시간 가는 줄 모르고 몰입하나요?',examples:['오류의 원인을 하나씩 찾아 해결할 때 몰입한다.','다른 사람이 쉽게 쓸 수 있도록 사용법을 정리하는 일이 즐겁다.']},
 {key:'values',title:'가치',question:'일에서 무엇을 중요하게 여기나요?',examples:['일을 마친 뒤 결과를 확인하고 정확하게 전달하는 것을 중요하게 여긴다.','꾸준히 배우며 전문성을 키울 수 있는 일을 원한다.']},
 {key:'experience',title:'경험',question:'지금까지 해본 일·학습·활동은 무엇인가요?',examples:['전공 팀 과제에서 자료를 정리하고 진행 상황을 공유했다.','자격증을 준비하며 실습 오류와 해결 과정을 기록했다.']},
 {key:'skills',title:'역량',question:'실제로 할 수 있는 일을 행동으로 적어 보세요.',examples:['문제 상황을 순서대로 확인하고 결과를 설명할 수 있다.','기술 자료를 읽고 핵심 내용을 이해하기 쉽게 요약할 수 있다.']},
 {key:'conditions',title:'현실조건',question:'지역·시간·급여·학습 여건에서 고려할 조건은 무엇인가요?',examples:['서울 지역에서 대중교통으로 출퇴근할 수 있는 일을 찾고 있다.','평일 저녁에 학습할 수 있고, 취업 준비에는 주당 5시간을 쓸 수 있다.']}
];
export const STRENGTH_QUESTIONS = [
 ['approach','문제를 해결하는 나의 방식','나는 일을 할 때 주로 어떤 방식으로 문제를 해결하나요?','예: 상황을 나누어 확인하고, 원인을 하나씩 좁혀 간다.'],
 ['feedback','주변에서 들은 나의 강점','주변 사람들은 나에게 무엇을 잘한다고 이야기하나요?','예: 복잡한 내용을 이해하기 쉽게 정리해 준다고 한다.'],
 ['finish','끝까지 해낸 경험','이전 경험에서 끝까지 해낸 일은 무엇인가요?','예: 팀 과제의 오류 기록을 모아 제출일까지 수정했다.'],
 ['solve','예상 밖의 문제를 해결한 경험','예상하지 못한 문제를 어떻게 해결했나요?','예: 실습이 멈췄을 때 확인 순서를 정해 원인을 찾았다.'],
 ['apply','지원 직무에 활용할 강점','이 강점을 지원 직무의 어떤 일에 활용할 수 있나요?','예: M365 사용자 문의의 증상을 확인하고 안내하는 데 활용한다.']
];
export const AREAS = [
 {key:'need',label:'취업 필요성',question:'내가 취업하려는 이유와 원하는 변화가 얼마나 분명한가요?',low:'이유가 아직 막연해요',high:'내 이유를 분명히 설명해요',example:'취업으로 이루고 싶은 생활의 변화 2가지를 적습니다.'},
 {key:'direction',label:'직무 방향성',question:'원하는 직무와 그 직무가 하는 일을 얼마나 구체적으로 알고 있나요?',low:'어떤 일을 할지 막막해요',high:'원하는 역할과 업무가 구체적이에요',example:'관심 채용공고 3개를 비교합니다.'},
 {key:'confidence',label:'자기효능감',question:'필요한 준비를 배우고 이어 갈 수 있다고 얼마나 믿고 있나요?',low:'시작할 자신이 부족해요',high:'어려워도 방법을 찾아볼 수 있어요',example:'최근 해낸 작은 일 1개와 도움이 된 방법을 기록합니다.'},
 {key:'strength',label:'강점 인식',question:'나의 강점을 실제 경험과 함께 얼마나 설명할 수 있나요?',low:'강점이 잘 떠오르지 않아요',high:'경험과 근거로 설명할 수 있어요',example:'해결 경험 2개를 강점 문장으로 바꿉니다.'},
 {key:'action',label:'구직 실행력',question:'최근 2~4주 동안 계획한 취업 준비 행동을 얼마나 실천했나요?',low:'계획을 시작하기 어려웠어요',high:'정한 행동을 꾸준히 실천했어요',example:'이번 주 지원서 1건을 제출합니다.'},
 {key:'readiness',label:'취업 준비도',question:'지원서·경험 자료·면접 등 현재 필요한 준비가 얼마나 갖춰졌나요?',low:'필요한 준비가 아직 많아요',high:'지원할 근거와 자료가 준비됐어요',example:'경험 1개를 상황·행동·결과가 담긴 한 쪽으로 정리합니다.'},
 {key:'support',label:'주변 지원',question:'조언·학습·생활 여건에서 필요한 도움을 얼마나 받을 수 있나요?',low:'도움을 받을 곳을 찾는 중이에요',high:'필요한 도움을 구체적으로 요청할 수 있어요',example:'취업컨설턴트에게 물어볼 질문 1개를 작성합니다.'},
 {key:'energy',label:'에너지 관리',question:'준비를 지속할 수 있도록 시간·휴식·회복을 얼마나 관리하고 있나요?',low:'지금 여유와 회복이 필요해요',high:'준비와 휴식의 균형을 잡고 있어요',example:'하루 구직 준비 시간을 1시간으로 정합니다.'}
];
export const SECTIONS = [
 {key:'assets',label:'커리어 자산',short:'자산',title:'이미 내 안에 있는 커리어 자산',intro:'흥미부터 현실조건까지. 나를 이루는 다섯 가지 자원을 적어 보세요.'},
 {key:'strength',label:'강점 발견',short:'강점',title:'내가 해본 일에서 강점을 발견해요',intro:'DISC 행동 경향을 참고하되, 내가 직접 한 행동과 경험을 함께 떠올려 보세요.'},
 {key:'wheel',label:'코칭 휠',short:'코칭 휠',title:'지금의 나를 그리고, 변화를 기록해요',intro:'점수는 평가가 아닙니다. 최근 2~4주의 나를 살피고 도움이 될 행동을 찾아보세요.'},
 {key:'plan',label:'취업 계획서',short:'계획서',title:'나를 위한 다음 한 걸음',intro:'내가 원하는 일을 향해, 지금 할 수 있는 세 가지를 정해 보세요.'}
];
export const PHASES={baseline:'현재',goal:'목표',after:'실행 후'};
export const MAX_TEXT=500;
export function emptyWheel(){return {baseline:AREAS.map(()=>({score:null,reason:''})),actions:{},after:AREAS.map(()=>({score:null,reason:''}))};}
export function emptyDraft(){return {version:1,assets:Object.fromEntries(ASSETS.map(a=>[a.key,''])),strength:{disc:'',approach:'',feedback:'',finish:'',solve:'',apply:'',sentence:''},wheel:emptyWheel(),plan:{intro:'',role:'',when:'',tasks:['','',''],letter:''},shared:{},updated:Date.now()};}
export function text(value,max=500){return typeof value==='string'?value.slice(0,max):'';}
export function score(value){return Number.isInteger(value)&&value>=1&&value<=10?value:null;}
export function sanitizeSection(section,input={}){
 if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('응답 형식을 확인해 주세요.');
 if(section==='assets')return Object.fromEntries(ASSETS.map(a=>[a.key,text(input[a.key])]));
 if(section==='strength')return Object.fromEntries(['disc',...STRENGTH_QUESTIONS.map(a=>a[0]),'sentence'].map(k=>[k,k==='disc'?(['D','I','S','C','mixed','unknown',''].includes(input[k])?input[k]:''):text(input[k],600)]));
 if(section==='plan')return {intro:text(input.intro,120),role:text(input.role,120),when:text(input.when,80),tasks:[0,1,2].map(i=>text(input.tasks?.[i],300)),letter:text(input.letter,800)};
 if(section==='wheel'){
  const answers=phase=>AREAS.map((a,i)=>({score:score(input[phase]?.[i]?.score),reason:text(input[phase]?.[i]?.reason,300)}));
  const actions={};for(const a of AREAS){const v=input.actions?.[a.key];if(v&&typeof v==='object')actions[a.key]={text:text(v.text,300),when:text(v.when,100),goal:score(v.goal)};}
  return {baseline:answers('baseline'),after:answers('after'),actions};
 }
 throw new Error('알 수 없는 활동입니다.');
}
export function validation(section,value){
 const d=sanitizeSection(section,value);
 if(section==='assets'&&ASSETS.some(a=>!d[a.key].trim()))return '다섯 가지 자산을 한 문장씩 적어 주세요. 아직 모르겠는 부분은 “더 찾아보고 싶어요”라고 적어도 좋아요.';
 if(section==='strength'&&[...STRENGTH_QUESTIONS.map(q=>q[0]),'sentence'].some(k=>!d[k].trim()))return '다섯 가지 질문과 나의 강점 문장을 작성해 주세요.';
 if(section==='wheel'&&d.baseline.some(v=>v.score===null||!v.reason.trim()))return '8개 영역의 현재 점수와 이유를 모두 작성해 주세요.';
 if(section==='wheel'&&Object.values(d.actions).some(v=>!v.text.trim()||!v.when.trim()||v.goal===null))return '선택한 행동의 내용, 시작 시점, 목표 점수를 작성해 주세요.';
 if(section==='wheel'&&d.after.some(v=>v.score!==null||v.reason.trim())&&d.after.some(v=>v.score===null||!v.reason.trim()))return '실행 후 비교를 공유하려면 8개 영역의 재평가 점수와 이유를 모두 적어 주세요. 작성 중인 내용은 기기에 저장됩니다.';
 if(section==='plan'&&(!d.intro.trim()||!d.role.trim()||!d.when.trim()||!d.letter.trim()||d.tasks.some(t=>!t.trim())))return '한 줄 소개, 희망 직무·시기, 세 가지 행동과 미래의 나에게 할 말을 모두 적어 주세요.';
 return '';
}
export function completedAnswers(list){return list.filter(v=>v.score!==null&&v.reason.trim()).length;}
export function series(wheel){
 const baseline=AREAS.map((a,i)=>score(wheel.baseline?.[i]?.score));
 const goal=AREAS.map(a=>score(wheel.actions?.[a.key]?.goal));
 const after=AREAS.map((a,i)=>score(wheel.after?.[i]?.score));
 return {baseline,goal,after};
}
export function escapeHTML(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function nicknameValue(value){return typeof value==='string'?value.normalize('NFKC').trim().replace(/\s+/g,' '):'';}
export function nicknameError(value){const name=nicknameValue(value);if(!name)return '수업에서 사용할 닉네임을 입력해 주세요.';if(Array.from(name).length>20)return '닉네임은 20자 이내로 적어 주세요.';if(!/^[\p{L}\p{M}\p{N} _-]+$/u.test(name))return '닉네임은 한글·영문·숫자, 공백, - 또는 _로 적어 주세요.';return '';}
export function safeDraft(raw){const d=emptyDraft();for(const s of SECTIONS){try{d[s.key]=sanitizeSection(s.key,raw?.[s.key]||d[s.key]);}catch{}}d.shared=raw?.shared&&typeof raw.shared==='object'?raw.shared:{};return d;}
