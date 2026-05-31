(function(){
'use strict';

function safeText(el,t){if(el&&t!=null)el.textContent=String(t)}
function easeOutExpo(t){return t===1?1:1-Math.pow(2,-10*t)}
var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;

var loader=document.getElementById('loader');
setTimeout(function(){if(loader)loader.classList.add('hidden')},1500);

setTimeout(function(){
  var n=document.getElementById('navbar');
  if(n)n.classList.add('show');
},1600);

var progressBar=document.querySelector('.progress-bar-top');
window.addEventListener('scroll',function(){
  var s=window.scrollY,d=document.documentElement.scrollHeight-window.innerHeight;
  if(progressBar)progressBar.style.width=(d>0?(s/d)*100:0)+'%';
});

var lastY=0,navEl=document.getElementById('navbar');
window.addEventListener('scroll',function(){
  var c=window.scrollY;
  if(c>lastY&&c>80){if(navEl)navEl.classList.add('nav-hidden')}
  else{if(navEl)navEl.classList.remove('nav-hidden')}
  lastY=c;
});

var hamburger=document.getElementById('hamburgerBtn');
var mobileMenu=document.getElementById('mobileMenu');
var navLinksContainer=document.getElementById('navLinks');
if(mobileMenu&&navLinksContainer){
  mobileMenu.innerHTML=navLinksContainer.innerHTML;
  mobileMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){
      mobileMenu.classList.remove('show');
      if(hamburger)hamburger.setAttribute('aria-expanded','false');
    });
  });
}
if(hamburger&&mobileMenu){
  hamburger.addEventListener('click',function(){
    var isOpen=mobileMenu.classList.toggle('show');
    hamburger.setAttribute('aria-expanded',isOpen?'true':'false');
  });
}

var accessBtn=document.getElementById('accessBtn');
var dropdown=document.getElementById('dropdownPanel');
if(accessBtn&&dropdown){
  accessBtn.addEventListener('click',function(e){
    e.stopPropagation();
    var isOpen=dropdown.classList.toggle('show');
    accessBtn.setAttribute('aria-expanded',isOpen?'true':'false');
  });
  document.addEventListener('click',function(e){
    if(!dropdown.contains(e.target)&&e.target!==accessBtn){
      dropdown.classList.remove('show');
      accessBtn.setAttribute('aria-expanded','false');
    }
  });
}

var translations={pt:{},en:{}};
var textKeys={
  nav_home:{pt:"Início",en:"Home"},nav_challenges:{pt:"Desafios",en:"Challenges"},
  nav_education:{pt:"Educação",en:"Education"},nav_policies:{pt:"Políticas",en:"Policies"},
  nav_protagonism:{pt:"Protagonismo",en:"Protagonism"},nav_data:{pt:"Dados",en:"Data"},
  loader_title:{pt:"Jovens no Campo",en:"Youth in the Countryside"},
  hero_label:{pt:"PESQUISA 2026",en:"RESEARCH 2026"},
  hero_title:{pt:"Sucessão Rural Sustentável",en:"Sustainable Rural Succession"},
  hero_sub:{pt:"Inovação, jovens e agroecologia moldando o futuro do campo brasileiro",en:"Innovation, youth and agroecology shaping Brazil's countryside future"},
  hero_btn1:{pt:"Explorar pesquisa",en:"Explore research"},
  hero_btn2:{pt:"Assistir documentário ↗",en:"Watch documentary ↗"},
  stat1:{pt:"Milhões de hectares subutilizados",en:"Million underutilized hectares"},
  stat2:{pt:"% dos jovens rurais que buscam cursos técnicos",en:"% rural youth seeking technical courses"},
  stat3:{pt:"% de redução do êxodo rural (2020-2025)",en:"% rural exodus reduction (2020-2025)"},
  stat4:{pt:"+150 mil propriedades com sucessão familiar",en:"+150k properties with family succession"},
  slide1_title:{pt:"Envelhecimento do produtor rural",en:"Aging rural producers"},
  slide1_desc:{pt:"Média etária acima de 58 anos, desafio de renovação geracional.",en:"Average age over 58, generational renewal challenge."},
  slide2_title:{pt:"Acesso limitado à tecnologia",en:"Limited tech access"},
  slide2_desc:{pt:"Conectividade no campo ainda é desafio para jovens inovadores.",en:"Rural connectivity remains a challenge for innovative youth."},
  slide3_title:{pt:"Crédito e assistência técnica",en:"Credit & technical assistance"},
  slide3_desc:{pt:"Linhas de financiamento para sucessão ainda são burocráticas.",en:"Succession credit lines are still bureaucratic."},
  edu_label:{pt:"Educação",en:"Education"},
  edu_title:{pt:"Pedagogia da Alternância",en:"Pedagogy of Alternation"},
  edu_desc:{pt:"Modelo que integra tempo-escola e tempo-comunidade, revolucionando a formação jovem.",en:"Model integrating school and community time, revolutionizing youth education."},
  timeline1:{pt:"Base científica e gestão sustentável no campo.",en:"Scientific basis & sustainable field management."},
  timeline2:{pt:"Vivência direta na propriedade familiar e inovação.",en:"Direct experience on family farms and innovation."},
  timeline3:{pt:"Intercâmbio de saberes entre juventude e agricultores experientes.",en:"Knowledge exchange between youth and experienced farmers."},
  tl1_title:{pt:"Teoria",en:"Theory"},
  tl2_title:{pt:"Prática",en:"Practice"},
  tl3_title:{pt:"Alternância",en:"Alternation"},
  quote_edu:{pt:"\"A alternância forma jovens protagonistas da transição agroecológica.\"",en:"\"Alternation forms young protagonists of the agroecological transition.\""},
  policy_title:{pt:"Lei 15.178/2025 — Programa Nacional de Sucessão Rural",en:"Law 15.178/2025 - National Rural Succession Program"},
  policy_cite:{pt:"\"Primeiro marco legal para incentivar jovens no campo com prioridade fiscal e técnica.\"",en:"'First legal framework to encourage rural youth with fiscal and technical priority.'"},
  prot_label:{pt:"JOVENS PROTAGONISTAS",en:"YOUNG PROTAGONISTS"},
  prot_title:{pt:"Tecnologia e empreendedorismo no agro",en:"Technology & entrepreneurship in agribusiness"},
  prot_desc:{pt:"Bioinsumos, drones, gestão digital e rastreabilidade: a nova geração rural conectada.",en:"Bioinputs, drones, digital management and traceability: the connected rural generation."},
  prot_btn:{pt:"Saiba mais",en:"Learn more"},
  badge1:{pt:"🌾 Agricultura de precisão",en:"🌾 Precision agriculture"},
  badge2:{pt:"📱 Gestão de fazenda 4.0",en:"📱 Farm management 4.0"},
  badge3:{pt:"💡 Bioeconomia",en:"💡 Bioeconomy"},
  btn_theme:{pt:"Modo escuro/claro",en:"Dark/light mode"},
  btn_contrast:{pt:"Alto contraste",en:"High contrast"},
  btn_close:{pt:"Fechar",en:"Close"},
  btn_backtop:{pt:"↑ Voltar ao início",en:"↑ Back to top"},
  chart_title:{pt:"População rural ativa: evolução e projeção (2012-2030)",en:"Active rural population: evolution & projection (2012-2030)"},
  chart_note:{pt:"* Dados de 2012 a 2021: IBGE / PNAD Contínua. Valores de 2024 a 2030 são projeções baseadas em tendências atuais de sucessão rural.",en:"* Data 2012-2021: IBGE / Continuous PNAD. Values 2024-2030 are projections based on current rural succession trends."},
  footer_credits:{pt:"Aluno Davi Caitano · Colégio Estadual Padre Cláudio Morelli · Orientador Rafael Biano",en:"Student Davi Caitano · State School Padre Cláudio Morelli · Advisor Rafael Biano"},
  modal_title:{pt:"Inovação e Protagonismo Jovem",en:"Youth Innovation & Protagonism"},
  modal_text:{pt:"Iniciativas de jovens rurais estão transformando territórios com agroflorestas, energias renováveis e comercialização digital. O protagonismo sustentável gera emprego e mantém a família no campo com dignidade.",en:"Rural youth initiatives are transforming territories with agroforestry, renewable energy and digital marketing. Sustainable protagonism creates jobs and keeps families in the countryside with dignity."},
  policy1_title:{pt:"Crédito Jovem Agro",en:"Young Agro Credit"},
  policy1_desc:{pt:"Linha especial com juros reduzidos e carência.",en:"Special credit line with reduced interest and grace period."},
  policy2_title:{pt:"Assistência Técnica",en:"Technical Assistance"},
  policy2_desc:{pt:"ATER focada em sucessão e transição ecológica.",en:"Technical assistance focused on succession and ecological transition."},
  policy3_title:{pt:"Seguro Safra Inclusivo",en:"Inclusive Crop Insurance"},
  policy3_desc:{pt:"Proteção para jovens agricultores.",en:"Protection for young farmers."},
  policy4_title:{pt:"Bolsa Permanência",en:"Retention Scholarship"},
  policy4_desc:{pt:"Apoio financeiro durante formação.",en:"Financial support during training."},
  policy5_title:{pt:"Terra Jovem",en:"Young Land"},
  policy5_desc:{pt:"Facilidade acesso à terra via reforma agrária.",en:"Easier land access via agrarian reform."},
  policy6_title:{pt:"Incubadora de Negócios Verdes",en:"Green Business Incubator"},
  policy6_desc:{pt:"Apoio a cooperativas e startups rurais.",en:"Support for rural cooperatives and startups."}
};

for(var k in textKeys){
  translations.pt[k]=textKeys[k].pt;
  translations.en[k]=textKeys[k].en;
}

var currentLang='pt';

function updateLanguage(){
  var keys=Object.keys(translations[currentLang]);
  keys.forEach(function(key){
    var els=document.querySelectorAll('[data-key="'+key+'"]');
    els.forEach(function(el){
      if(el.id!=='heroTitle')safeText(el,translations[currentLang][key]);
    });
  });
  updateHeroTitle();
}

function updateHeroTitle(){
  var el=document.getElementById('heroTitle');
  if(!el)return;
  var text=translations[currentLang]['hero_title']||'Sucessão Rural Sustentável';
  var words=text.split(' ');
  var depths=[80,50,100];
  el.innerHTML=words.map(function(w,i){
    return '<span class="hero-word" style="transform:translateZ('+(depths[i]||40)+'px)">'+w+'</span>';
  }).join(' ');
}

var policies=[
  {num:"01",titleKey:"policy1_title",descKey:"policy1_desc"},
  {num:"02",titleKey:"policy2_title",descKey:"policy2_desc"},
  {num:"03",titleKey:"policy3_title",descKey:"policy3_desc"},
  {num:"04",titleKey:"policy4_title",descKey:"policy4_desc"},
  {num:"05",titleKey:"policy5_title",descKey:"policy5_desc"},
  {num:"06",titleKey:"policy6_title",descKey:"policy6_desc"}
];

function renderPolicies(){
  var grid=document.getElementById('policyGrid');
  if(!grid)return;
  grid.innerHTML=policies.map(function(p){
    return '<div class="policy-card sr"><div class="accent-text" style="font-size:2rem;">'+p.num+'</div><h3>'+(translations[currentLang][p.titleKey]||'')+'</h3><p>'+(translations[currentLang][p.descKey]||'')+'</p></div>';
  }).join('');
  document.querySelectorAll('#policyGrid .sr').forEach(function(el){srObs.observe(el)});
  attachPolicyHover();
}

var langPtBtn=document.getElementById('langPt');
var langEnBtn=document.getElementById('langEn');
if(langPtBtn)langPtBtn.addEventListener('click',function(){currentLang='pt';updateLanguage();renderPolicies();drawChart();localStorage.setItem('lang','pt')});
if(langEnBtn)langEnBtn.addEventListener('click',function(){currentLang='en';updateLanguage();renderPolicies();drawChart();localStorage.setItem('lang','en')});
try{var savedLang=localStorage.getItem('lang');if(savedLang==='en'){currentLang='en';updateLanguage();renderPolicies();}}catch(e){}

function setTheme(t){
  document.body.classList.remove('light','contrast');
  if(t==='light')document.body.classList.add('light');
  if(t==='contrast')document.body.classList.add('contrast');
  localStorage.setItem('theme',t);
  drawChart();
}
var themeLight=document.getElementById('themeToggle');
var themeContrast=document.getElementById('contrastToggle');
if(themeLight)themeLight.addEventListener('click',function(){setTheme(document.body.classList.contains('light')?'dark':'light')});
if(themeContrast)themeContrast.addEventListener('click',function(){setTheme(document.body.classList.contains('contrast')?'dark':'contrast')});
try{var savedTheme=localStorage.getItem('theme');if(savedTheme)setTheme(savedTheme);}catch(e){}

var fontSize=100;
function setFontSize(s){document.documentElement.style.fontSize=s+'%';localStorage.setItem('fontSize',s)}
var fontInc=document.getElementById('fontIncrease');
var fontDec=document.getElementById('fontDecrease');
var fontRes=document.getElementById('fontReset');
if(fontInc)fontInc.addEventListener('click',function(){if(fontSize<130){fontSize+=10;setFontSize(fontSize)}});
if(fontDec)fontDec.addEventListener('click',function(){if(fontSize>80){fontSize-=10;setFontSize(fontSize)}});
if(fontRes)fontRes.addEventListener('click',function(){fontSize=100;setFontSize(fontSize)});
try{var sf=localStorage.getItem('fontSize');if(sf){fontSize=parseInt(sf,10);setFontSize(fontSize)}}catch(e){}

document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(ev){
    var id=this.getAttribute('href');
    if(id==='#'||!id)return;
    var el=document.querySelector(id);
    if(el){ev.preventDefault();el.scrollIntoView({behavior:rm?'auto':'smooth',block:'start'})}
    else{ev.preventDefault()}
  });
});

var navLinks=document.querySelectorAll('.nav-links a');
var secs=['hero','desafios','educacao','politicas','protagonismo','dados'];
window.addEventListener('scroll',function(){
  var pos=window.scrollY+200,cur='hero';
  for(var i=0;i<secs.length;i++){
    var s=document.getElementById(secs[i]);
    if(s&&s.offsetTop<=pos)cur=secs[i];
  }
  navLinks.forEach(function(l){l.classList.toggle('active',l.getAttribute('href')==='#'+cur)});
});

var srObs=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('visible');srObs.unobserve(e.target)}
  });
},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.sr, .stat-item').forEach(function(el){srObs.observe(el)});

var imgObs=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('visible');imgObs.unobserve(e.target)}
  });
},{threshold:.1});
document.querySelectorAll('.split-image').forEach(function(el){imgObs.observe(el)});

var cObs=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){
      var el=e.target,tgt=parseInt(el.getAttribute('data-count'),10),dur=2000,sTs=null;
      function anim(ts){
        if(!sTs)sTs=ts;
        var p=Math.min((ts-sTs)/dur,1),v=easeOutExpo(p);
        safeText(el,Math.floor(v*tgt));
        if(p<1){requestAnimationFrame(anim)}else{
          safeText(el,tgt);
          var parent=el.closest('.stat-item'); var particles=parent?parent.querySelector('.stat-particles'):null;
          if(particles)particles.classList.add('burst');
        }
      }
      requestAnimationFrame(anim);
      cObs.unobserve(el);
    }
  });
},{threshold:.3});
document.querySelectorAll('.stat-number').forEach(function(c){cObs.observe(c)});

var slideEls=document.querySelectorAll('.slide');
var dotsContainer=document.getElementById('sliderDots');
var curSlide=0,autoInterval;

function updateSlider(){
  slideEls.forEach(function(s,i){
    s.classList.toggle('active',i===curSlide);
  });
  if(dotsContainer){
    var dots=dotsContainer.querySelectorAll('.dot');
    dots.forEach(function(d,i){d.classList.toggle('active',i===curSlide)});
  }
}

function goToSlide(n){
  if(!slideEls.length)return;
  curSlide=(n+slideEls.length)%slideEls.length;
  updateSlider();
}

if(dotsContainer){
  slideEls.forEach(function(_,i){
    var dot=document.createElement('div');
    dot.className='dot';
    dot.setAttribute('role','button');
    dot.setAttribute('aria-label','Ir para slide '+(i+1));
    dot.addEventListener('click',function(){goToSlide(i)});
    dotsContainer.appendChild(dot);
  });
}
updateSlider();

if(!rm){
  autoInterval=setInterval(function(){goToSlide(curSlide+1)},6000);
  var sliderContainer=document.getElementById('sliderContainer');
  if(sliderContainer){
    sliderContainer.addEventListener('mouseenter',function(){clearInterval(autoInterval)});
    sliderContainer.addEventListener('mouseleave',function(){autoInterval=setInterval(function(){goToSlide(curSlide+1)},6000)});
  }
}

var prevSlideBtn=document.getElementById('prevSlide');
var nextSlideBtn=document.getElementById('nextSlide');
if(prevSlideBtn)prevSlideBtn.addEventListener('click',function(){clearInterval(autoInterval);goToSlide(curSlide-1)});
if(nextSlideBtn)nextSlideBtn.addEventListener('click',function(){clearInterval(autoInterval);goToSlide(curSlide+1)});

var modal=document.getElementById('modal');
var openBtn=document.getElementById('openModalBtn');
var closeBtn=document.getElementById('closeModalBtn');
if(openBtn&&modal)openBtn.addEventListener('click',function(){modal.classList.add('active')});
if(closeBtn&&modal)closeBtn.addEventListener('click',function(){modal.classList.remove('active')});
if(modal)modal.addEventListener('click',function(e){if(e.target===modal)modal.classList.remove('active')});
window.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal&&modal.classList.contains('active'))modal.classList.remove('active')});

var chartLabels=['2012','2015','2018','2021','2024','2026','2028','2030'];
var chartData=[28.2,26.5,25.1,24.3,24.8,25.9,27.3,29.1];

function drawChart(){
  var cc=document.getElementById('ruralChart');
  if(!cc)return;
  var ctx=cc.getContext('2d');

  var dpr=window.devicePixelRatio||1;
  var cssW=cc.offsetWidth||800;
  var cssH=Math.min(400, Math.round(cssW*0.5));
  if(Math.abs((cc.width/dpr)-cssW)>1 || Math.abs((cc.height/dpr)-cssH)>1){
    cc.width=Math.round(cssW*dpr);
    cc.height=Math.round(cssH*dpr);
  }
  ctx.setTransform(dpr,0,0,dpr,0,0);

  var w=cssW, h=cssH;
  var pad=60;
  ctx.clearRect(0,0,w,h);

  var isLight=document.body.classList.contains('light');
  var isContrast=document.body.classList.contains('contrast');
  var textColor=isLight?'#121a14':(isContrast?'#ffffff':'#e8ece9');
  var lineColor='#4ade80';

  var minD=Infinity, maxD=-Infinity;
  for(var i=0;i<chartData.length;i++){
    if(chartData[i]<minD)minD=chartData[i];
    if(chartData[i]>maxD)maxD=chartData[i];
  }
  var step=2;
  var minVal=Math.floor(minD/step)*step;
  var maxVal=Math.ceil(maxD/step)*step+step;
  if(maxVal-minVal<step*3){maxVal=minVal+step*4;}

  function yFor(v){return h-pad-((v-minVal)/(maxVal-minVal))*(h-pad*2);}
  function xFor(i){return pad+(i/(chartLabels.length-1))*(w-pad*2);}


  ctx.font='12px system-ui';
  ctx.fillStyle=textColor;
  ctx.textAlign='right';
  for(var v=minVal;v<=maxVal;v+=step){
    var y=yFor(v);
    ctx.fillText(v,pad-10,y+4);
    ctx.strokeStyle=isLight?'rgba(0,0,0,0.08)':'rgba(255,255,255,0.05)';
    ctx.beginPath();ctx.moveTo(pad,y);ctx.lineTo(w-pad,y);ctx.stroke();
  }


  ctx.textAlign='center';
  ctx.fillStyle=textColor;
  for(var i=0;i<chartLabels.length;i++){
    ctx.fillText(chartLabels[i],xFor(i),h-pad+20);
  }

 
  var splitX=xFor(3)+((xFor(4)-xFor(3))/2);
  ctx.strokeStyle=isLight?'rgba(0,0,0,0.15)':'rgba(255,255,255,0.12)';
  ctx.setLineDash([5,5]);
  ctx.beginPath();ctx.moveTo(splitX,pad);ctx.lineTo(splitX,h-pad);ctx.stroke();
  ctx.setLineDash([]);

  
  ctx.font='11px system-ui';
  ctx.textAlign='center';
  ctx.fillStyle=textColor;
  ctx.fillText(currentLang==='pt'?'Dados reais':'Real data', pad+((splitX-pad)/2), pad-12);
  ctx.fillStyle=lineColor;
  ctx.fillText(currentLang==='pt'?'Projeção':'Projection', splitX+((w-pad-splitX)/2), pad-12);

  
  var points=[];
  for(var i=0;i<chartData.length;i++){
    points.push({x:xFor(i),y:yFor(chartData[i]),val:chartData[i],lab:chartLabels[i]});
  }

  
  ctx.fillStyle='rgba(74,222,128,0.08)';
  ctx.beginPath();ctx.moveTo(points[0].x,h-pad);
  for(var i=0;i<points.length;i++)ctx.lineTo(points[i].x,points[i].y);
  ctx.lineTo(points[points.length-1].x,h-pad);ctx.closePath();ctx.fill();

  
  ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);
  for(var i=1;i<points.length;i++)ctx.lineTo(points[i].x,points[i].y);
  ctx.strokeStyle=lineColor;ctx.lineWidth=3;ctx.lineJoin='round';ctx.stroke();

 
  for(var i=0;i<points.length;i++){
    ctx.beginPath();ctx.arc(points[i].x,points[i].y,5,0,Math.PI*2);
    ctx.fillStyle=lineColor;ctx.fill();
    ctx.strokeStyle=isLight?'#f5f7f5':'#0a0f0a';ctx.lineWidth=2;ctx.stroke();
  }
  
  for(var i=4;i<points.length;i++){
    ctx.beginPath();ctx.arc(points[i].x,points[i].y,3,0,Math.PI*2);
    ctx.fillStyle=isLight?'#f5f7f5':'#0a0f0a';ctx.fill();
    ctx.strokeStyle=lineColor;ctx.lineWidth=2;ctx.stroke();
  }

 
  cc.onmousemove=function(e){
    var r=cc.getBoundingClientRect();
    var mx=e.clientX-r.left,my=e.clientY-r.top;
    drawChart();
    for(var i=0;i<points.length;i++){
      var dx=mx-points[i].x,dy=my-points[i].y;
      if(Math.sqrt(dx*dx+dy*dy)<18){
        ctx.beginPath();ctx.arc(points[i].x,points[i].y,8,0,Math.PI*2);
        ctx.fillStyle=lineColor;ctx.fill();
        var tx=points[i].x,ty=points[i].y-48,tw=120,th=34;
        var rx=tx-tw/2,ry=ty;
        ctx.beginPath();
        ctx.moveTo(rx+8,ry);
        ctx.lineTo(rx+tw-8,ry);
        ctx.quadraticCurveTo(rx+tw,ry,rx+tw,ry+8);
        ctx.lineTo(rx+tw,ry+th-8);
        ctx.quadraticCurveTo(rx+tw,ry+th,rx+tw-8,ry+th);
        ctx.lineTo(rx+8,ry+th);
        ctx.quadraticCurveTo(rx,ry+th,rx,ry+th-8);
        ctx.lineTo(rx,ry+8);
        ctx.quadraticCurveTo(rx,ry,rx+8,ry);
        ctx.closePath();
        ctx.fillStyle=isLight?'rgba(255,255,255,0.95)':'rgba(18,26,20,0.95)';
        ctx.fill();
        ctx.fillStyle=textColor;ctx.textAlign='center';ctx.font='12px system-ui';
        var label=points[i].val+' '+(currentLang==='pt'?'milhões':'million');
        ctx.fillText(label,tx,ty+22);
      }
    }
  };
  cc.onmouseleave=function(){drawChart();};
}


var chartResizeTimer;
window.addEventListener('resize',function(){
  clearTimeout(chartResizeTimer);
  chartResizeTimer=setTimeout(drawChart,150);
});

if(!rm){
  var heroContent=document.querySelector('.hero-content');
  var heroBg=document.getElementById('heroBg');
  var ticking=false;
  document.addEventListener('mousemove',function(e){
    if(!ticking){
      requestAnimationFrame(function(){
        var mx=(e.clientX/window.innerWidth-.5)*2;
        var my=(e.clientY/window.innerHeight-.5)*2;
        if(heroContent)heroContent.style.transform='rotateY('+mx*2+'deg) rotateX('+(-my*2)+'deg)';
        if(heroBg)heroBg.style.transform='rotateX('+my*0.05+'deg) rotateY('+mx*0.05+'deg) translateZ(10px)';
        ticking=false;
      });
      ticking=true;
    }
  });
  document.addEventListener('mouseleave',function(){
    if(heroContent)heroContent.style.transform='rotateY(0) rotateX(0)';
    if(heroBg)heroBg.style.transform='rotateX(0) rotateY(0) translateZ(0)';
  });
}

if(!rm&&'ontouchstart' in window===false){
  var cursor=document.getElementById('customCursor');
  if(cursor){
    document.body.classList.add('js-enabled');
    var mx=0,my=0,ct=false;
    document.addEventListener('mousemove',function(e){
      mx=e.clientX;my=e.clientY;
      if(!ct){
        requestAnimationFrame(function(){
          cursor.style.transform='translate('+mx+'px,'+my+'px) translate(-50%,-50%)';
          ct=false;
        });
        ct=true;
      }
    });
    var hoverTargets='.policy-card, .stat-item, .btn-primary, .btn-outline, .badge, a, button';
    document.querySelectorAll(hoverTargets).forEach(function(el){
      el.addEventListener('mouseenter',function(){cursor.classList.add('hover')});
      el.addEventListener('mouseleave',function(){cursor.classList.remove('hover')});
    });
  }
}

function attachPolicyHover(){
  document.querySelectorAll('.policy-card').forEach(function(card){
    card.addEventListener('mousemove',function(e){
      var rect=card.getBoundingClientRect();
      var x=(e.clientX-rect.left)/rect.width-0.5;
      var y=(e.clientY-rect.top)/rect.height-0.5;
      card.style.transform='rotateY('+(x*12)+'deg) rotateX('+(-y*12)+'deg) translateY(-6px)';
    });
    card.addEventListener('mouseleave',function(){
      card.style.transform='';
    });
    var cursorEl=document.getElementById('customCursor');
    if(cursorEl){
      card.addEventListener('mouseenter',function(){cursorEl.classList.add('hover')});
      card.addEventListener('mouseleave',function(){cursorEl.classList.remove('hover')});
    }
  });
}

var backToTop=document.getElementById('backToTop');
if(backToTop)backToTop.addEventListener('click',function(){window.scrollTo({top:0,behavior:rm?'auto':'smooth'})});

updateHeroTitle();
renderPolicies();
drawChart();

})();
