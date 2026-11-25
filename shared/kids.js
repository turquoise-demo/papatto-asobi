/* ぱぱっとあそび 共通：音・こえ・はなふぶき・絵（アイコン） */
// 画面の固定：ピンチ・ダブルタップ・入力時の拡大と、横ずれを止める（全ページ共通）
(()=>{
  const st=document.createElement('style');
  st.textContent='html{-webkit-text-size-adjust:100%;text-size-adjust:100%;overflow:hidden;overscroll-behavior:none;width:100%;height:100%}body{position:fixed;inset:0;width:100%;max-width:100%;overscroll-behavior:none}*{touch-action:pan-x pan-y}input,select,textarea{font-size:max(16px,1em)}';
  document.head.prepend(st);
  const no=e=>e.preventDefault(),o={passive:false};
  ['gesturestart','gesturechange','gestureend'].forEach(n=>document.addEventListener(n,no,o));
  document.addEventListener('touchmove',e=>{if(e.touches.length>1)e.preventDefault();},o);
  document.addEventListener('dblclick',no,o);
  addEventListener('wheel',e=>{if(e.ctrlKey)e.preventDefault();},o);
})();
window.Kids=(()=>{
  let ac=null;
  function audio(){try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume();}catch(e){ac=null;}return ac;}
  // ひとつの音
  function tone(f,d=.15,type='sine',vol=.08,when=0,slide=1){
    const a=audio();if(!a)return;const t=a.currentTime+when;
    const o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.setValueAtTime(f,t);
    if(slide!==1)o.frequency.exponentialRampToValueAtTime(f*slide,t+d);
    g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0001,t+d+.08);
    o.connect(g).connect(a.destination);o.start(t);o.stop(t+d+.1);
  }
  const blip=(f=620)=>tone(f,.07,'sine',.06,0,1.5);
  const pop=()=>{tone(500+Math.random()*500,.06,'sine',.09,0,2.2);};
  function yay(big=true){[523,659,784,1047].forEach((f,i)=>tone(f,.2,'triangle',.08,i*.09));if(big)confetti();}
  const oops=()=>tone(330,.18,'triangle',.06,0,.7);

  // こえ（端末に日本語の声があれば）
  function say(text){try{const s=window.speechSynthesis;if(!s)return;s.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='ja-JP';u.rate=.95;u.pitch=1.15;s.speak(u);}catch(e){}}

  // はなふぶき
  function confetti(){
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const c=document.createElement('canvas');c.style.cssText='position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:50';
    document.body.appendChild(c);const x=c.getContext('2d');const W=c.width=innerWidth,H=c.height=innerHeight;
    const cols=['#E8342E','#F7931E','#FFD23F','#8BC34A','#4FC3F7','#2563C9','#8E44AD','#F78FB3'];
    const ps=Array.from({length:140},()=>({x:W/2+(Math.random()-.5)*W*.3,y:H*.55,vx:(Math.random()-.5)*14,vy:-Math.random()*16-6,s:6+Math.random()*8,r:Math.random()*6,vr:(Math.random()-.5)*.3,c:cols[Math.floor(Math.random()*cols.length)],sh:Math.random()<.5}));
    let f=0;(function step(){x.clearRect(0,0,W,H);ps.forEach(p=>{p.vy+=.45;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;
      if(p.sh){x.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);}else{x.beginPath();x.arc(0,0,p.s/2.4,0,7);x.fill();}x.restore();});
      if(++f<110)requestAnimationFrame(step);else c.remove();})();
  }
  function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function shake(el){el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake');}

  // 絵（viewBox 0 0 100 100）
  const I={
    apple:'<path d="M50 30C38 20 14 24 14 52c0 22 16 40 28 40 4 0 6-2 8-2s4 2 8 2c12 0 28-18 28-40 0-28-24-32-36-22z" fill="#E8342E"/><path d="M50 32c0-9 3-15 9-19" stroke="#8D5A3B" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="66" cy="20" rx="12" ry="6" fill="#8BC34A" transform="rotate(-25 66 20)"/><ellipse cx="32" cy="48" rx="6" ry="11" fill="#fff" opacity=".45"/>',
    star:'<polygon points="50,7 61,37 93,38 68,58 77,90 50,71 23,90 32,58 7,38 39,37" fill="#FFD23F" stroke="#E0A800" stroke-width="4" stroke-linejoin="round"/>',
    heart:'<path d="M50 88C12 60 6 32 26 22c12-6 22 0 24 10 2-10 12-16 24-10 20 10 14 38-24 66z" fill="#F78FB3"/><ellipse cx="30" cy="38" rx="6" ry="4" fill="#fff" opacity=".6" transform="rotate(-35 30 38)"/>',
    fish:'<polygon points="70,50 94,32 90,50 94,68" fill="#2563C9"/><ellipse cx="44" cy="50" rx="32" ry="22" fill="#4FC3F7"/><circle cx="30" cy="45" r="5" fill="#1F2A44"/><path d="M50 36q8 14 0 28" stroke="#2563C9" stroke-width="4" fill="none"/>',
    flower:'<g fill="#F78FB3"><circle cx="50" cy="30" r="15"/><circle cx="69" cy="44" r="15"/><circle cx="62" cy="66" r="15"/><circle cx="38" cy="66" r="15"/><circle cx="31" cy="44" r="15"/></g><circle cx="50" cy="50" r="12" fill="#FFD23F"/>',
    sun:'<g stroke="#FFD23F" stroke-width="7" stroke-linecap="round"><path d="M50 8v12M50 80v12M8 50h12M80 50h12M20 20l8 8M72 72l8 8M80 20l-8 8M28 72l-8 8"/></g><circle cx="50" cy="50" r="22" fill="#F7931E"/>',
    car:'<path d="M28 50l10-20h26l10 20z" fill="#E8342E"/><path d="M35 49l7-14h8v14zM56 49V35h6l7 14z" fill="#BFE6FF"/><rect x="10" y="48" width="80" height="24" rx="10" fill="#E8342E"/><circle cx="30" cy="74" r="10" fill="#1F2A44"/><circle cx="70" cy="74" r="10" fill="#1F2A44"/><circle cx="30" cy="74" r="4" fill="#fff"/><circle cx="70" cy="74" r="4" fill="#fff"/>',
    cat:'<polygon points="22,42 26,12 46,28" fill="#F7931E"/><polygon points="78,42 74,12 54,28" fill="#F7931E"/><circle cx="50" cy="55" r="32" fill="#F7931E"/><circle cx="39" cy="52" r="5" fill="#1F2A44"/><circle cx="61" cy="52" r="5" fill="#1F2A44"/><polygon points="46,61 54,61 50,66" fill="#F78FB3"/><path d="M20 62h14M20 68l14-2M80 62H66M80 68l-14-2" stroke="#1F2A44" stroke-width="2.5" stroke-linecap="round"/>',
    banana:'<path d="M18 30c6 34 34 52 66 40 4-2 4-6 0-6-26 6-46-8-54-36-2-6-14-6-12 2z" fill="#FFD23F" stroke="#E0A800" stroke-width="3"/><path d="M18 30l-4-8" stroke="#8D5A3B" stroke-width="5" stroke-linecap="round"/>',
    balloon:'<ellipse cx="50" cy="40" rx="26" ry="30" fill="#8E44AD"/><polygon points="46,70 54,70 50,76" fill="#8E44AD"/><path d="M50 76q-6 10 0 20" stroke="#1F2A44" stroke-width="2" fill="none"/><ellipse cx="40" cy="30" rx="5" ry="9" fill="#fff" opacity=".45"/>',
    house:'<svg viewBox="0 0 32 32"><path d="M4 15L16 5l12 10" fill="none" stroke="#1F2A44" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 14v13h18V14" fill="#fff" stroke="#1F2A44" stroke-width="3" stroke-linejoin="round"/><rect x="13" y="19" width="6" height="8" fill="#E8342E"/></svg>'
  };
  const icon=(k,size)=>`<svg viewBox="0 0 100 100"${size?` width="${size}" height="${size}"`:''} aria-hidden="true">${I[k]}</svg>`;
  const homeIcon=I.house;

  // 合言葉（一度入れたら、この端末では次から聞かない）
  (function gate(){
    const KEY='papatto-asobi-ok',HASH='c50a675';
    const fnv=s=>{let h=2166136261;for(const ch of s){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)>>>0;}return h.toString(16);};
    let ok=false;try{ok=localStorage.getItem(KEY)===HASH;}catch(e){}
    try{ok=ok||sessionStorage.getItem(KEY)===HASH;}catch(e){}
    if(ok)return;
    const st=document.createElement('style');
    st.textContent='.gate{position:fixed;inset:0;z-index:100;background:var(--frame,#3B6FE0);display:flex;align-items:center;justify-content:center;padding:16px}.gate form{background:#fff;border-radius:24px;padding:26px 22px;width:min(100%,360px);box-sizing:border-box;display:flex;flex-direction:column;gap:14px;text-align:center;box-shadow:0 6px 0 #2A55B8}.gate h2{margin:0;font-size:24px}.gate p{margin:0;color:#6B7590;font-weight:500;font-size:14px}.gate input{font:inherit;font-size:22px;text-align:center;padding:12px;border:3px solid #EEF3FF;border-radius:14px;outline:none}.gate input:focus{border-color:#FFC83D}.gate .err{color:#E8342E;font-weight:800;min-height:1.2em}';
    document.head.appendChild(st);
    const g=document.createElement('div');g.className='gate';
    g.innerHTML='<form autocomplete="off"><h2>あいことば</h2><p>おうちの ひとに いれてもらってね</p><input id="gatePw" type="text" inputmode="text" autocapitalize="off" aria-label="あいことば"><div class="err" id="gateErr"></div><button class="big" type="submit">はいる</button></form>';
    const mount=()=>{document.body.appendChild(g);setTimeout(()=>g.querySelector('input').focus(),50);};
    document.body?mount():addEventListener('DOMContentLoaded',mount);
    g.querySelector('form').addEventListener('submit',e=>{e.preventDefault();const v=g.querySelector('input').value.trim().normalize('NFKC').replace(/[\u30a1-\u30f6]/g,ch=>String.fromCharCode(ch.charCodeAt(0)-0x60));
      if(fnv(v)===HASH){try{localStorage.setItem(KEY,HASH);}catch(_){}try{sessionStorage.setItem(KEY,HASH);}catch(_){}g.remove();blip(800);}
      else{g.querySelector('#gateErr').textContent='ちがうみたい';shake(g.querySelector('form'));g.querySelector('input').select();}});
  })();
  // おしている間ずっと（repeat=ミリ秒でくり返し）。離したら onUp
  function hold(btn,onDown,opt={}){
    let t1,t2,on=false;
    const stop=()=>{if(!on)return;on=false;btn.classList.remove('on');clearTimeout(t1);clearInterval(t2);opt.onUp&&opt.onUp();};
    btn.addEventListener('pointerdown',e=>{e.preventDefault();try{btn.setPointerCapture(e.pointerId);}catch(_){}on=true;btn.classList.add('on');onDown();
      if(opt.repeat){t1=setTimeout(()=>{t2=setInterval(onDown,opt.repeat);},opt.delay||170);}});
    ['pointerup','pointercancel','lostpointercapture'].forEach(n=>btn.addEventListener(n,stop));
    btn.addEventListener('contextmenu',e=>e.preventDefault());
  }
  return{hold,tone,blip,pop,yay,oops,say,confetti,shuffle,shake,icon,homeIcon,ICONS:Object.keys(I).filter(k=>k!=='house')};
})();
