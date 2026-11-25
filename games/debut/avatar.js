/* ふたりでアイドルデビュー：架空の女の子イラスト（SVG・viewBox 0 0 200 300） */
window.Avatar=(()=>{
 const HAIR=['ロング','ツインテール','ポニーテール','ボブ','おだんご'],HC=['#3A2A2A','#7A4A2C','#C98A4B','#E9B7C8','#8E7CC3','#5FA8D3'];
 const DRESS=['ワンピース','セーラー','パンツ','フリル','スター'],DC=['#F06292','#4FC3F7','#FFD54F','#81C784','#9575CD','#37474F'];
 const dk=(h,k=.78)=>'#'+[1,3,5].map(i=>Math.round(parseInt(h.slice(i,i+2),16)*k).toString(16).padStart(2,'0')).join('');
 let uid=0;
 function hair(t,c){const d=dk(c),o=`stroke="${d}" stroke-width="2" stroke-linejoin="round"`;
  const back={0:`<path d="M46 74C40 130 44 176 54 190C70 196 130 196 146 190C156 176 160 130 154 74Z" fill="${d}"/>`,
   1:`<path d="M44 66C10 70 4 130 22 166C36 150 46 120 52 92ZM156 66C190 70 196 130 178 166C164 150 154 120 148 92Z" fill="${c}" ${o}/><circle cx="47" cy="66" r="8" fill="#FFD54F"/><circle cx="153" cy="66" r="8" fill="#FFD54F"/>`,
   2:`<path d="M132 30C180 22 196 80 176 148C166 130 158 90 130 56Z" fill="${c}" ${o}/><circle cx="138" cy="36" r="9" fill="#F06292"/>`,
   3:`<path d="M42 74C36 112 42 134 54 142H146C158 134 164 112 158 74Z" fill="${d}"/>`,
   4:`<circle cx="56" cy="26" r="22" fill="${c}" ${o}/><circle cx="144" cy="26" r="22" fill="${c}" ${o}/><path d="M46 14a14 14 0 0120 4M134 18a14 14 0 0120-4" fill="none" stroke="${d}" stroke-width="2"/>`}[t];
  const front=`<path d="M44 92C34 34 66 8 100 8C134 8 166 34 156 92C150 78 146 66 140 56C130 64 122 66 112 58C106 68 88 72 74 60C64 68 52 78 44 92Z" fill="${c}" ${o}/><path d="M62 36C72 22 90 18 106 20C92 26 80 34 74 46Z" fill="#fff" opacity=".35"/>`+(t===0||t===3?`<path d="M44 86C40 108 42 122 50 130C54 116 54 100 50 84ZM156 86C160 108 158 122 150 130C146 116 146 100 150 84Z" fill="${c}" ${o}/>`:'');
  return[back,front];}
 function dress(t,c){const d=dk(c),L=`<path d="M82 226V276M118 226V276" stroke="#FFE0CC" stroke-width="17" stroke-linecap="round"/>`,shoe=`<path d="M70 284a13 9 0 0124 0zM106 284a13 9 0 0124 0z" fill="${t===4?'#FFD54F':'#fff'}" stroke="${d}" stroke-width="2"/>`;
  if(t===2)return `<path d="M72 206H128L132 280H106L100 236L94 280H68Z" fill="#37474F"/>${shoe}<path d="M72 150C84 144 116 144 128 150L132 212H68Z" fill="${c}"/><path d="M100 152l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1z" fill="#fff" opacity=".9"/>`;
  const skirt={0:`M72 200L50 250C82 262 118 262 150 250L128 200Z`,1:`M72 200L54 244H146L128 200Z`,3:`M72 196L42 252C82 268 118 268 158 252L128 196Z`,4:`M72 198L46 246L62 254L76 246L88 258L100 248L112 258L124 246L138 254L154 246L128 198Z`}[t];
  let x=L+shoe+`<path d="${skirt}" fill="${t===1?d:c}" stroke="${d}" stroke-width="2"/>`;
  if(t===1)x+=`<path d="M72 206L66 244M84 206L82 244M100 206V244M116 206L118 244M128 206L134 244" stroke="#fff" opacity=".4" stroke-width="2"/>`;
  if(t===3)x+=`<path d="M46 244q9 12 18 2q9 13 18 2q9 13 18 2q9 13 18 0q9 11 18 -2q9 10 18 -4" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><path d="M60 222q10 10 20 2q10 11 20 2q10 11 20 0q10 8 20 -4" fill="none" stroke="#fff" stroke-width="4" opacity=".8"/>`;
  x+=`<path d="M72 150C84 144 116 144 128 150L130 204H70Z" fill="${t===1?'#fff':c}" stroke="${d}" stroke-width="2"/>`;
  if(t===1)x+=`<path d="M74 148L100 178L126 148L118 144L100 160L82 144Z" fill="${c}"/><path d="M100 170l-12 8 6 10 6-8 6 8 6-10z" fill="${d}"/>`;
  else if(t===4)x+=[[84,170],[116,180],[96,194],[74,232],[126,236],[100,226]].map(([a,b])=>`<path transform="translate(${a} ${b}) scale(.5)" d="M0-12l4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" fill="#FFF59D"/>`).join('')+`<path d="M70 198H130" stroke="#FFD54F" stroke-width="7"/>`;
  else x+=`<path d="M100 152l-14-7v15zM100 152l14-7v15z" fill="#fff"/><circle cx="100" cy="152" r="4" fill="${d}"/><path d="M70 200H130" stroke="#fff" stroke-width="5"/>`;
  return x;}
 function svg(a,face='smile'){const[b,f]=hair(a.h,HC[a.hc]),c=DC[a.dc],slv=a.d===1?'#fff':c,id='av'+(++uid);
  const eye=(x,m)=>face==='joy'?`<path d="M${x-11} 96q11-15 22 0" fill="none" stroke="#3A2A35" stroke-width="5" stroke-linecap="round"/>`
   :`<g class="eyes"><ellipse cx="${x}" cy="94" rx="10" ry="13" fill="#3A2A35"/><ellipse cx="${x}" cy="98" rx="7.5" ry="8" fill="${HC[a.hc]==='#3A2A2A'?'#8D5A3B':HC[a.hc]}"/><circle cx="${x-3}" cy="89" r="4" fill="#fff"/><circle cx="${x+4}" cy="100" r="2" fill="#fff"/><path d="M${x-12*m} 84q${8*m} -8 ${22*m} -2" fill="none" stroke="#3A2A35" stroke-width="4" stroke-linecap="round"/></g>`;
  const mouth=face==='joy'?'<path d="M88 114q12 5 24 0q-1 16-12 16t-12-16z" fill="#C2455A"/>':face==='oops'?'<ellipse cx="100" cy="120" rx="5" ry="6" fill="#C2455A"/>':'<path d="M90 116q10 9 20 0" fill="none" stroke="#C2455A" stroke-width="4" stroke-linecap="round"/>';
  return `<svg class="av" viewBox="-14 -10 228 310" aria-hidden="true"><ellipse cx="100" cy="288" rx="54" ry="8" fill="#000" opacity=".16"/><g class="all"><g class="hb">${b}</g>
  <g class="bd">${dress(a.d,c)}<g class="armL"><path d="M76 158L50 196" stroke="#FFE0CC" stroke-width="14" stroke-linecap="round"/><path d="M77 156L66 172" stroke="${slv}" stroke-width="18" stroke-linecap="round"/></g><g class="armR"><path d="M124 158L150 196" stroke="#FFE0CC" stroke-width="14" stroke-linecap="round"/><path d="M123 156L134 172" stroke="${slv}" stroke-width="18" stroke-linecap="round"/><rect x="146" y="176" width="9" height="24" rx="4" fill="#455A64" transform="rotate(-20 150 190)"/><circle cx="146" cy="172" r="9" fill="#90A4AE"/></g></g>
  <path d="M92 134H108V152H92Z" fill="#F5C9B0"/><g class="hd"><path d="M48 80C46 118 68 142 100 142C132 142 154 118 152 80C150 44 128 26 100 26C72 26 50 44 48 80Z" fill="#FFE6D6" stroke="#E7B59C" stroke-width="1.6"/><ellipse cx="66" cy="112" rx="11" ry="6" fill="#FF9AA8" opacity=".55"/><ellipse cx="134" cy="112" rx="11" ry="6" fill="#FF9AA8" opacity=".55"/>${eye(78,1)}${eye(122,-1)}${mouth}${f}</g></g></svg>`;}
 return{svg,HAIR,HC,DRESS,DC};
})();
