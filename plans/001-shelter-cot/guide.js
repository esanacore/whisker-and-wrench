// Plan 001 guide: shopping list, isometric step drawings and the stepper.
// Kept in a file (not inline) so the site can send a strict Content-Security-Policy.
(function(){
const K=10, CS=Math.cos(Math.PI/6), OD=13, FD=17;
const pr=([x,y,z])=>[(x-y)*CS*K,(x+y)*0.5*K-z*K];
const add=(a,d,s)=>[a[0]+d[0]*s,a[1]+d[1]*s,a[2]+d[2]*s];
const f=n=>Math.round(n*10)/10;
let uid=0;

function render(els,label){
  const id='a'+(uid++);
  const L={under:[],pipes:[],fits:[],over:[],top:[]};
  const pts=[];
  const dep=p=>p[0]+p[1]+p[2]*0.02;
  const pipes=els.filter(e=>e.t==='pipe').sort((a,b)=>(dep(a.a)+dep(a.b))-(dep(b.a)+dep(b.b)));
  pipes.forEach(e=>{
    const [x1,y1]=pr(e.a),[x2,y2]=pr(e.b);pts.push([x1,y1,FD],[x2,y2,FD]);
    const dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy)||1;let px=-dy/len,py=dx/len;if(py>0){px=-px;py=-py}
    const n=e.s==='new'?' n':'';
    L.pipes.push(`<line class="pe" x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke-width="${OD+3}"/>`+
      `<line class="pf${n}" x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke-width="${OD}"/>`+
      `<line class="sh${n}" x1="${f(x1+px*3.2)}" y1="${f(y1+py*3.2)}" x2="${f(x2+px*3.2)}" y2="${f(y2+py*3.2)}" stroke-width="2"/>`);
  });
  els.filter(e=>e.t==='fit').sort((a,b)=>dep(a.p)-dep(b.p)).forEach(e=>{
    const ln=e.cap?0.75:1.0;const n=e.s==='new'?' n':'';
    let o='',fl='';
    e.dirs.forEach(d=>{const [x1,y1]=pr(e.p),[x2,y2]=pr(add(e.p,d,ln));pts.push([x1,y1,FD],[x2,y2,FD]);
      o+=`<line class="pe" x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke-width="${FD+3}" stroke-linecap="round"/>`;
      fl+=`<line class="pf${n}" x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke-width="${FD}" stroke-linecap="round"/>`;});
    L.fits.push(o+fl);
  });
  els.filter(e=>e.t==='poly').forEach(e=>{
    const p=e.pts.map(pr);p.forEach(q=>pts.push([q[0],q[1],2]));
    (e.layer==='under'?L.under:L.over).push(`<polygon class="fab${e.s==='new'?' n':''}" points="${p.map(q=>f(q[0])+','+f(q[1])).join(' ')}"/>`);
  });
  els.filter(e=>e.t==='screw').forEach(e=>{const [x,y]=pr(e.p);L.top.push(`<circle class="scr${e.s==='new'?' n':''}" cx="${f(x)}" cy="${f(y)}" r="3.4"/>`)});
  els.filter(e=>e.t==='ring').forEach(e=>{const [x,y]=pr(e.p);L.top.push(`<circle class="ring" cx="${f(x)}" cy="${f(y)}" r="7"/>`)});
  els.filter(e=>e.t==='arrow').forEach(e=>{const [x1,y1]=pr(e.a),[x2,y2]=pr(e.b);pts.push([x1,y1,8],[x2,y2,8]);
    L.top.push(`<line class="arr" x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" marker-end="url(#${id})"/>`)});
  els.filter(e=>e.t==='label').forEach(e=>{const [x,y]=pr(e.p);pts.push([x,y,16]);
    L.top.push(`<text class="lbl" x="${f(x)}" y="${f(y)}" text-anchor="middle" dominant-baseline="middle">${e.text}</text>`)});
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;pts.forEach(([x,y,p])=>{x0=Math.min(x0,x-p);y0=Math.min(y0,y-p);x1=Math.max(x1,x+p);y1=Math.max(y1,y+p)});
  const pad=10;x0-=pad;y0-=pad;x1+=pad;y1+=pad;
  return `<svg viewBox="${f(x0)} ${f(y0)} ${f(x1-x0)} ${f(y1-y0)}" role="img" aria-label="${label}"><defs><marker id="${id}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path class="arrh" d="M0 0L10 5L0 10z"/></marker></defs>${L.under.join('')}${L.pipes.join('')}${L.fits.join('')}${L.over.join('')}${L.top.join('')}</svg>`;
}

/* Model, inches. Frame centerline 36 x 28, rail center 5 in above floor */
const RZ=5;
const RAILS={C1:[[0,0],[0,28]],C2:[[36,0],[36,28]],A1:[[0,0],[5,0]],A2:[[31,0],[36,0]],A3:[[0,28],[5,28]],A4:[[31,28],[36,28]],B1:[[5,0],[31,0]],B2:[[5,28],[31,28]]};
const LEGS=[[5,0],[31,0],[5,28],[31,28]];
const CORN=[[0,0,[[1,0,0],[0,1,0]]],[36,0,[[-1,0,0],[0,1,0]]],[0,28,[[1,0,0],[0,-1,0]]],[36,28,[[-1,0,0],[0,-1,0]]]];
function frame(o){
  const def=o.def||'old',st=(m,k)=>m&&k in m?m[k]:def,out=[];
  Object.entries(RAILS).forEach(([k,[a,b]])=>{const s=st(o.rails,k);if(s!=='hide')out.push({t:'pipe',a:[a[0],a[1],RZ],b:[b[0],b[1],RZ],s})});
  LEGS.forEach(([x,y],i)=>{
    const sl=st(o.legs,i),stt=st(o.tees,i),sc=st(o.caps,i);
    if(sl!=='hide')out.push({t:'pipe',a:[x,y,RZ],b:[x,y,0.9],s:sl});
    if(stt!=='hide')out.push({t:'fit',p:[x,y,RZ],dirs:[[1,0,0],[-1,0,0],[0,0,-1]],s:stt});
    if(sc!=='hide')out.push({t:'fit',p:[x,y,0.35],dirs:[[0,0,1]],cap:1,s:sc});
  });
  CORN.forEach(([x,y,d],i)=>{const s=st(o.elbows,i);if(s!=='hide')out.push({t:'fit',p:[x,y,RZ],dirs:d,s})});
  return out;
}
const TOP=5.66,UND=4.34,E=0.66;
const fabricTop=()=>[
  {t:'poly',layer:'over',pts:[[-E,-E,TOP],[36+E,-E,TOP],[36+E,28+E,TOP],[-E,28+E,TOP]]},
  {t:'poly',layer:'over',pts:[[-E,28+E,TOP],[36+E,28+E,TOP],[36+E,28+E,4.5],[-E,28+E,4.5]]},
  {t:'poly',layer:'over',pts:[[36+E,-E,TOP],[36+E,28+E,TOP],[36+E,28+E,4.5],[36+E,-E,4.5]]}];
const fabricBase=s=>({t:'poly',layer:'under',s,pts:[[-E,-E,TOP],[36+E,-E,TOP],[36+E,28+E,TOP],[-E,28+E,TOP]]});
const FL=1.9;
function flap(side,s){
  const r=(x0,x1,y0,y1)=>({t:'poly',layer:'over',s,pts:[[x0,y0,UND],[x1,y0,UND],[x1,y1,UND],[x0,y1,UND]]});
  if(side==='C1')return[r(-E,FL,2,26)];
  if(side==='C2')return[r(36-FL,36+E,2,26)];
  if(side==='L0')return[[2,4],[6,30],[32,34]].map(([a,b])=>r(a,b,-E,FL));
  return[[2,4],[6,30],[32,34]].map(([a,b])=>r(a,b,28-FL,28+E));
}
function screws(side,s){
  const ys=[2,6,10,14,18,22,26],xs=[2.8,9,13.5,18,22.5,27,33.2];
  if(side==='C1')return ys.map(y=>({t:'screw',s,p:[0.45,y,UND-0.05]}));
  if(side==='C2')return ys.map(y=>({t:'screw',s,p:[35.55,y,UND-0.05]}));
  if(side==='L0')return xs.map(x=>({t:'screw',s,p:[x,0.45,UND-0.05]}));
  return xs.map(x=>({t:'screw',s,p:[x,27.55,UND-0.05]}));
}
const H=10.4;
function flip(els){const fp=p=>[p[0],p[1],H-p[2]];return els.map(e=>{const c={...e};
  if(c.p)c.p=fp(c.p);if(c.a)c.a=fp(c.a);if(c.b)c.b=fp(c.b);if(c.pts)c.pts=c.pts.map(fp);if(c.dirs)c.dirs=c.dirs.map(d=>[d[0],d[1],-d[2]]);return c;});}
function rings(){const r=[];frame({}).filter(e=>e.t==='fit').forEach(e=>e.dirs.forEach(d=>r.push({t:'ring',p:add(e.p,d,e.cap?0.55:0.95)})));return r;}

/* Flat diagrams */
function cutSheet(){
  const W=340,sc=W/120,h=22;let s='',x=0;
  const seg=(len,lbl,y,waste)=>{const w=len*sc;s+=`<rect class="${waste?'flat-waste':'flat-stick'}" x="${f(x+10)}" y="${y}" width="${f(w)}" height="${h}" rx="3"/>`;
    if(lbl)s+=`<text class="ico-t" x="${f(x+10+w/2)}" y="${y+h/2+1}" text-anchor="middle" dominant-baseline="middle">${lbl}</text>`;
    if(!waste)s+=`<line class="cutln" x1="${f(x+10+w)}" y1="${y-4}" x2="${f(x+10+w)}" y2="${y+h+4}"/>`;x+=w;};
  s+=`<text class="dim" x="10" y="14">STICK 1 · 1″ × 10 FT</text>`;
  [[26.5,'C'],[26.5,'C'],[24.5,'B'],[24.5,'B'],[3.5,'A'],[3.5,'A'],[3.5,'A'],[3.5,'A']].forEach(([l,t])=>seg(l,t,22));seg(120-116,'',22,1);
  x=0;s+=`<text class="dim" x="10" y="78">STICK 2 · 1″ × 5 FT</text>`;
  [[4,'D'],[4,'D'],[4,'D'],[4,'D']].forEach(([l,t])=>seg(l,t,86));seg(44,'save',86,1);
  s+=`<text class="dim" x="10" y="132">C 26½″ · B 24½″ · A 3½″ · D 4″ · purple line = cut</text>`;
  return `<svg viewBox="0 0 360 142" role="img" aria-label="Cut sheet for two pipe sticks">${s}</svg>`;
}
function fabricSheet(){
  const sc=7,ox=30,oy=26,W=44*sc,Hh=36*sc;let s=`<rect class="flat-fab" x="${ox}" y="${oy}" width="${W}" height="${Hh}"/>`;
  [[0,0],[W-2*sc,0],[0,Hh-2*sc],[W-2*sc,Hh-2*sc]].forEach(([x,y])=>s+=`<rect class="flat-cut" x="${ox+x}" y="${oy+y}" width="${2*sc}" height="${2*sc}"/>`);
  [9,35].forEach(c=>{const x=ox+(c-1)*sc;s+=`<rect class="flat-cut" x="${x}" y="${oy}" width="${2*sc}" height="${2.5*sc}"/><rect class="flat-cut" x="${x}" y="${oy+Hh-2.5*sc}" width="${2*sc}" height="${2.5*sc}"/>`});
  s+=`<line class="dimln" x1="${ox}" y1="12" x2="${ox+W}" y2="12"/><text class="dim" x="${ox+W/2}" y="9" text-anchor="middle">44″</text>`;
  s+=`<line class="dimln" x1="14" y1="${oy}" x2="14" y2="${oy+Hh}"/><text class="dim" x="10" y="${oy+Hh/2}" text-anchor="middle" transform="rotate(-90 10 ${oy+Hh/2})">36″</text>`;
  s+=`<text class="dim" x="${ox+9*sc}" y="${oy+Hh+16}" text-anchor="middle">9″</text><text class="dim" x="${ox+35*sc}" y="${oy+Hh+16}" text-anchor="middle">35″</text>`;
  s+=`<text class="dim light" x="${ox+W/2}" y="${oy+Hh/2-6}" text-anchor="middle">NOTCH 2″ W × 2½″ D</text><text class="dim light" x="${ox+W/2}" y="${oy+Hh/2+10}" text-anchor="middle">CORNERS 2″ × 2″</text>`;
  return `<svg viewBox="0 0 ${ox+W+12} ${oy+Hh+26}" role="img" aria-label="Fabric cutting diagram">${s}</svg>`;
}

/* Part icons */
const IC={
  pipe:(l,n)=>`<svg viewBox="0 0 54 30"><rect class="${n?'ico-n':'ico-p'}" x="2" y="8" width="50" height="14" rx="3"/><text class="ico-t" x="27" y="16" text-anchor="middle" dominant-baseline="middle">${l}</text></svg>`,
  elbow:n=>`<svg viewBox="0 0 30 30"><path class="${n?'ico-n':'ico-p'}" d="M4 4h12v14h10v8H4z"/></svg>`,
  tee:n=>`<svg viewBox="0 0 34 30"><path class="${n?'ico-n':'ico-p'}" d="M2 4h30v10H22v14H12V14H2z"/></svg>`,
  cap:n=>`<svg viewBox="0 0 22 30"><path class="${n?'ico-n':'ico-p'}" d="M4 6h14v16a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/></svg>`,
  screw:n=>`<svg viewBox="0 0 22 30"><path class="${n?'ico-n':'ico-p'}" d="M3 6h16l-5 5v15l-3 3-3-3V11z"/></svg>`,
  fabric:n=>`<svg viewBox="0 0 40 30"><rect class="fab${n?' n':''}" x="2" y="4" width="36" height="22" rx="2"/></svg>`,
  glue:()=>`<svg viewBox="0 0 26 30"><rect class="ico-p" x="4" y="9" width="18" height="19" rx="2"/><rect class="ico-a" x="7" y="3" width="12" height="6" rx="1"/></svg>`,
  saw:()=>`<svg viewBox="0 0 34 30"><path class="ico-p" d="M3 20h22l6-6V8H8z"/><path class="ico-teeth" d="M5 20l2 4 2-4 2 4 2-4 2 4 2-4 2 4 2-4"/></svg>`
};
const part=(svg,q,label)=>`<div class="part">${svg}<div><b>${q}</b><em>${label||''}</em></div></div>`;

/* Steps */
const STEPS=[
 {t:'Cut the pipe',parts:[part(IC.saw(),'',''),part(IC.pipe('C'),'2×','26½″'),part(IC.pipe('B'),'2×','24½″'),part(IC.pipe('A'),'4×','3½″'),part(IC.pipe('D'),'4×','4″')],
  view:cutSheet,
  text:['Mark and cut every piece on the sheet. Most big-box stores will cut PVC for free if you hand them this list. Write the letter on each piece with a marker so the next steps go fast.'],
  tip:'<b>Cut square.</b> A crooked end leaves a gap inside the fitting and weakens the joint.'},
 {t:'Build the leg assemblies',mult:'×4',parts:[part(IC.tee(1),'1×','tee'),part(IC.pipe('D',1),'1×','4″'),part(IC.cap(1),'1×','cap')],
  view:()=>render(frame({def:'hide',tees:{0:'new'},legs:{0:'new'},caps:{0:'new'}}).concat([{t:'arrow',a:[5,-3.5,1.2],b:[5,-3.5,3.8]}]),'Tee with leg and cap'),
  text:['Push a D leg into the bottom outlet of a tee, then cap the other end. Tap with a mallet until the pipe bottoms out in the socket. No glue yet, everything gets dry-fit first.']},
 {t:'Build the long sides',mult:'×2',parts:[part(IC.pipe('A',1),'2×','3½″'),part(IC.pipe('B',1),'1×','24½″')],
  view:()=>render(frame({def:'hide',rails:{A1:'new',A2:'new',B1:'new'},legs:{0:'old',1:'old'},tees:{0:'old',1:'old'},caps:{0:'old',1:'old'}}).concat([{t:'label',p:[2.5,-3,7.2],text:'A'},{t:'label',p:[18,-3,7.2],text:'B'},{t:'label',p:[33.5,-3,7.2],text:'A'}]),'Long side assembly'),
  text:['Line them up in this order: A, leg assembly, B, leg assembly, A. Turn both tees so the legs point straight down and match each other.']},
 {t:'Add the corner elbows',parts:[part(IC.elbow(1),'4×','90°')],
  view:()=>render(frame({rails:{C1:'hide',C2:'hide'},elbows:{0:'new',1:'new',2:'new',3:'new'}}),'Both long sides with elbows'),
  text:['Set the two long sides parallel, legs down. Put an elbow on each end with its open socket pointing across at the other side.']},
 {t:'Close the frame',parts:[part(IC.pipe('C',1),'2×','26½″')],
  view:()=>render(frame({rails:{C1:'new',C2:'new'}}),'Complete frame'),
  text:['Slide the C rails into the open elbows. Stand it on a flat floor and check two things: all four legs touch, and the two diagonals match within ¼″ (about 45½″ corner to corner).'],
  tip:'<b>Rocking?</b> Twist the fittings a little until all four caps sit flat. Fix it now, glue locks it in.'},
 {t:'Glue every joint',parts:[part(IC.glue(),'1×','primer'),part(IC.glue(),'1×','cement')],
  view:()=>render(frame({}).concat(rings()),'Frame with glue joints marked'),
  text:['Work one joint at a time. Pull it apart, wipe purple primer on the pipe end and inside the socket, then cement on both. Push together with a quarter turn and hold for 15 seconds.','Glue outdoors or with a fan running, and keep the frame on the flat floor while it sets.'],
  tip:'<b>Cure time:</b> 2 hours before adding fabric, 24 hours before a dog uses it.'},
 {t:'Cut the fabric',parts:[part(IC.fabric(1),'1×','44 × 36″')],
  view:fabricSheet,
  text:['Cut one 44″ × 36″ panel. Trim a 2″ square off each corner, then cut a 2″ wide, 2½″ deep notch at each leg position. Vinyl mesh and vinyl tarp don\'t fray, so there\'s no hem to sew.']},
 {t:'Fasten the first short side',parts:[part(IC.screw(1),'7×','#8 × ½″')],
  view:()=>render(flip([fabricBase('old')].concat(frame({}),flap('C1','new'),screws('C1','new'))),'Upside-down frame with first side fastened'),
  text:['Flip the frame upside down onto the fabric and center it. Wrap one short edge up over its C rail and drive a lath screw through it every 4″, starting 2″ from the corner.'],
  tip:'<b>Cold garage?</b> Pre-drill with a 3/32″ bit. Cold PVC can crack under a screw.'},
 {t:'Stretch the other side',parts:[part(IC.screw(1),'7×','#8 × ½″')],
  view:()=>render(flip([fabricBase('old')].concat(frame({}),flap('C1','old'),screws('C1','old'),flap('C2','new'),screws('C2','new'),[{t:'arrow',a:[38,14,UND],b:[42.5,14,UND]}])),'Second short side pulled tight and fastened'),
  text:['Pull the fabric hard across the frame, a second person helps a lot here, and screw the opposite short side the same way. Press the middle: it should feel like a drum.']},
 {t:'Fasten the long sides',parts:[part(IC.screw(1),'14×','#8 × ½″')],
  view:()=>render(flip([fabricBase('old')].concat(frame({}),flap('C1','old'),flap('C2','old'),screws('C1','old'),screws('C2','old'),flap('L0','new'),flap('L1','new'),screws('L0','new'),screws('L1','new'))),'Long sides fastened'),
  text:['Wrap each long edge around its rail so the notches straddle the legs. Screw every 4″ between the fittings.']},
 {t:'Flip it and check',parts:[],
  view:()=>render(frame({}).concat(fabricTop()),'Finished cot'),
  text:['Turn it upright. Press hard on each corner and the center: no rocking, no creaking joints, no screw tips or fabric edges a dog can reach.','Write the build date on a leg with a paint marker so the shelter knows its age.']}
];

/* Hero + shopping list */
document.getElementById('hero').innerHTML=render(frame({}).concat(fabricTop()),'Finished PVC shelter cot');
const SHOP=[
 ['Plumbing aisle · all 1″ Schedule 40'],
 ['1','1″ × 10 ft pipe','','pipe'],
 ['1','1″ × 5 ft pipe','Or a second 10 ft stick. The leftover starts your next cot.','pipe'],
 ['4','1″ 90° elbow','Slip × slip','fitting'],
 ['4','1″ tee','Slip × slip × slip','fitting'],
 ['4','1″ cap','Slip','fitting'],
 ['1','PVC primer + PVC cement','Small cans, purple primer','glue'],
 ['Hardware'],
 ['28','#8 × ½″ lath screws','Wafer head. Buy a 50-pack.','fastener'],
 ['Fabric'],
 ['1','44″ × 36″ vinyl panel','Vinyl-coated polyester mesh (outdoor sling fabric) or 18 oz vinyl tarp','fabric'],
 ['Tools'],
 ['','Hacksaw or PVC cutter, tape measure, marker','Skip the saw if the store cuts for you','tool'],
 ['','Drill, 3/32″ bit, #2 Phillips bit, rubber mallet, utility knife','','tool']
];
document.getElementById('shop').innerHTML=SHOP.map(r=>r.length===1?`<div class="sub">${r[0]}</div>`:
  `<div class="row"><span class="q">${r[0]}</span><span class="n">${r[1]}${r[2]?`<small>${r[2]}</small>`:''}</span><span class="tag">${r[3]}</span></div>`).join('');

/* Stepper */
let i=0;try{const v=parseInt(localStorage.getItem('cot-step'),10);if(v>=0&&v<STEPS.length)i=v}catch(e){}
const $=id=>document.getElementById(id),dots=$('dots');
dots.innerHTML=STEPS.map((_,k)=>`<button class="dot" type="button" id="dot${k}" aria-label="Step ${k+1}">${k+1}</button>`).join('');
dots.addEventListener('click',e=>{const b=e.target.closest('.dot');if(b){i=+b.id.slice(3);show()}});
function show(){
  const s=STEPS[i];
  $('sNum').innerHTML=`${i+1}<small>/${STEPS.length}</small>`;
  $('sTitle').textContent=s.t;$('sEye').textContent=i===STEPS.length-1?'Last step':'Step';
  $('sParts').innerHTML=s.parts.length?s.parts.join(''):'<span class="eyebrow">No new parts</span>';
  $('sStage').innerHTML=s.view()+(s.mult?`<span class="mult">${s.mult}</span>`:'');
  $('sBody').innerHTML=s.text.map(t=>`<p>${t}</p>`).join('')+(s.tip?`<p class="tip">${s.tip}</p>`:'');
  $('prev').disabled=i===0;$('next').textContent=i===STEPS.length-1?'Start over':'Next';
  [...dots.children].forEach((d,k)=>{d.className='dot'+(k===i?' on':k<i?' done':'')});
  try{localStorage.setItem('cot-step',i)}catch(e){}
}
$('prev').onclick=()=>{if(i>0){i--;show()}};
$('next').onclick=()=>{i=i<STEPS.length-1?i+1:0;show()};
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')$('next').click();if(e.key==='ArrowLeft')$('prev').click()});
let sx=null;const stage=$('sStage');
stage.addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});
stage.addEventListener('touchend',e=>{if(sx===null)return;const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50){d<0?$('next').click():$('prev').click()}sx=null});
show();
})();
