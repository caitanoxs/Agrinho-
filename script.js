/**
 * Sucessao Rural Sustentavel | Pesquisa 2026
 * Script principal: interacoes, traducao, grafico, animacoes e acessibilidade
 * Sem bibliotecas externas — apenas JavaScript puro
 */
(function(){
'use strict';

// Atualiza texto de um elemento de forma segura
function safeText(el,t){if(el&&t!=null)el.textContent=String(t)}

// Easing suave para animacao de contadores
function easeOutExpo(t){return t===1?1:1-Math.pow(2,-10*t)}

// Detecta se o usuario prefere menos movimento (acessibilidade)
var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;

// Funcao de troca de tema (claro/escuro/contraste)
function setTheme(theme){
  document.body.className=theme;
  localStorage.setItem('theme',theme);
  
  // Atualiza botoes de tema
  var lightBtn=document.getElementById('themeToggle');
  var contrastBtn=document.getElementById('contrastToggle');
  
  if(lightBtn){
    lightBtn.classList.toggle('active',theme==='light');
    lightBtn.innerHTML=theme==='light'?'<span>☀️</span> <span data-key="btn_theme">Modo claro</span>':'<span>🌙</span> <span data-key="btn_theme">Modo escuro</span>';
  }
  if(contrastBtn){
    contrastBtn.classList.toggle('active',theme==='contrast');
  }
}

// Loader progressivo real: barra preenche com incrementos aleatorios
var loader=document.getElementById('loader');
var loaderLine=document.querySelector('.loader-progress');
if(loader&&loaderLine){
  var progress=0;
  var tick=setInterval(function(){
    progress+=Math.random()*18+6;
    if(progress>=100){
      progress=100;
      clearInterval(tick);
      loaderLine.style.width='100%';
      setTimeout(function(){loader.classList.add('hidden')},400);
      setTimeout(function(){
        var n=document.getElementById('navbar');
        if(n)n.classList.add('show');
      },500);
    }else{
      loaderLine.style.width=progress+'%';
    }
  },80);
}

// Dados para scroll unificado: links da navbar e secoes
var navLinks=document.querySelectorAll('.nav-links a');
var secs=['hero','desafios','teorias','educacao','panorama','politicas','ciclo','revisao','protagonismo','paradoxo','dados','recomendacoes','referencias'];

// Scroll unificado: barra de progresso, navbar, link ativo e anel de progresso
// Com throttle para 60fps (atualiza a cada ~16ms)
var progressBar=document.querySelector('.progress-bar-top');
var lastY=0,navEl=document.getElementById('navbar');
var progressRing=document.querySelector('.progress-ring-fill');
var ringCircumference=progressRing?2*Math.PI*20:0;
var scrollThrottle=0;

window.addEventListener('scroll',function(){
  var now=Date.now();
  if(now-scrollThrottle<16)return;
  scrollThrottle=now;

  var s=window.scrollY;
  var d=document.documentElement.scrollHeight-window.innerHeight;
  var p=d>0?s/d:0;

  // Barra de progresso no topo
  if(progressBar)progressBar.style.width=(p*100)+'%';

  // Navbar: esconde ao descer, mostra ao subir
  if(navEl){
    if(s>lastY&&s>80)navEl.classList.add('nav-hidden');
    else navEl.classList.remove('nav-hidden');
  }
  lastY=s;

  // Link ativo da navbar
  var pos=s+200,cur='hero';
  for(var i=0;i<secs.length;i++){
    var el=document.getElementById(secs[i]);
    if(el&&el.offsetTop<=pos)cur=secs[i];
  }
  navLinks.forEach(function(l){l.classList.toggle('active',l.getAttribute('href')==='#'+cur)});

  // Anel de progresso circular no back-to-top
  if(progressRing)progressRing.style.strokeDashoffset=ringCircumference*(1-p);
});

// Menu mobile: clona links do desktop e controla abertura/fechamento
var hamburger=document.getElementById('hamburgerBtn');
var mobileMenu=document.getElementById('mobileMenu');
var navLinksContainer=document.getElementById('navLinks');
if(mobileMenu&&navLinksContainer){
  mobileMenu.innerHTML=navLinksContainer.innerHTML;
  attachSmoothScroll(mobileMenu.querySelectorAll('a'));
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

// Painel de acessibilidade (tema, contraste, fonte, idioma)
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

// Dicionario de traducoes PT/EN para todos os textos do site
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
  slide2_desc:{pt:"Conectividade no campo ainda é um desafio para jovens inovadores.",en:"Rural connectivity remains a challenge for innovative youth."},
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
  btn_backtop_aria:{pt:"Voltar ao início",en:"Back to top"},
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
  policy6_desc:{pt:"Apoio a cooperativas e startups rurais.",en:"Support for rural cooperatives and startups."},
  nav_theories:{pt:"Teorias",en:"Theories"},
  nav_panorama:{pt:"Panorama",en:"Panorama"},
  nav_review:{pt:"Revisão",en:"Review"},
  nav_paradox:{pt:"Paradoxo",en:"Paradox"},
  nav_recommendations:{pt:"Ações",en:"Actions"},
  nav_references:{pt:"Fontes",en:"Sources"},
  nav_cycle:{pt:"Ciclo",en:"Cycle"},
  theories_title:{pt:"Teorias da Migração Juvenil",en:"Youth Migration Theories"},
  theory1_title:{pt:"Push-Pull (Ravenstein)",en:"Push-Pull (Ravenstein)"},
  theory1_desc:{pt:"Fatores de expulsão (desemprego, pobreza) e atração (oportunidades urbanas) explicam o fluxo migratório.",en:"Push factors (unemployment, poverty) and pull factors (urban opportunities) explain migration flows."},
  theory2_title:{pt:"Nova Economia da Migração (NELM)",en:"New Economics of Labor Migration (NELM)"},
  theory2_desc:{pt:"A decisão de migrar é familiar — estratégia de gestão de risco diante da falha do mercado rural.",en:"Migration is a family decision — a risk management strategy against rural market failure."},
  theory3_title:{pt:"Teoria do Sistema-Mundo (Wallerstein)",en:"World-Systems Theory (Wallerstein)"},
  theory3_desc:{pt:"A dependência estrutural entre países pobres e ricos gera fluxos migratórios forçados pelo capitalismo global.",en:"Structural dependency between poor and rich countries generates forced migration flows by global capitalism."},
  theory4_title:{pt:"Fatores Socialmente Incorporados",en:"Socially Embedded Factors"},
  theory4_desc:{pt:"Aspirações de futuro, educação, expectativas de gênero e redes de parentesco impulsionam a migração.",en:"Future aspirations, education, gender expectations and kinship networks drive migration."},
  panorama_title:{pt:"Panorama Global",en:"Global Panorama"},
  panorama_sub:{pt:"Dados que revelam a magnitude do desafio da sucessão rural no mundo.",en:"Data revealing the magnitude of the rural succession challenge worldwide."},
  gstat1:{pt:"Artigos científicos analisados (20 anos)",en:"Scientific articles analyzed (20 years)"},
  gstat2:{pt:"% de agricultores familiares em pobreza (FAO)",en:"% of family farmers in poverty (FAO)"},
  gstat3:{pt:"% das pesquisas brasileiras concentradas no Sul",en:"% of Brazilian research concentrated in the South"},
  gstat4:{pt:"% de pesquisas sobre sucessão na Amazônia",en:"% of succession research in the Amazon"},
  review_label:{pt:"Revisão Sistemática",en:"Systematic Review"},
  review_title:{pt:"Distribuição Geográfica das Pesquisas",en:"Geographic Distribution of Research"},
  review_desc:{pt:"A produção científica sobre sucessão rural no Brasil está desequilibrada. O Sul concentra 67,4% dos estudos, enquanto a Amazônia representa apenas 1,2% — uma lacuna crítica para a sustentabilidade global.",en:"Scientific production on rural succession in Brazil is unbalanced. The South concentrates 67.4% of studies, while the Amazon represents only 1.2% — a critical gap for global sustainability."},
  review_alert:{pt:"⚠️ LACUNA CRÍTICA: A Região Norte representa apenas 1,2% das pesquisas sobre sucessão rural.",en:"⚠️ CRITICAL GAP: The North Region represents only 1.2% of rural succession research."},
  paradox_label:{pt:"ANÁLISE CRÍTICA",en:"CRITICAL ANALYSIS"},
  paradox_title:{pt:"O Paradoxo da Sucessão Rural",en:"The Rural Succession Paradox"},
  paradox_text:{pt:"Quanto mais o jovem se qualifica e se prepara, mais provável é que ele identifique oportunidades fora do campo. Maior será o êxodo rural de jovens qualificados. Isso gera um ciclo vicioso: a educação, que deveria fortalecer o campo, muitas vezes se torna o principal vetor de migração.",en:"The more youth qualify and prepare themselves, the more likely they are to identify opportunities outside the countryside. Greater will be the rural exodus of qualified youth. This creates a vicious cycle: education, which should strengthen the countryside, often becomes the main vector of migration."},
  paradox_quote:{pt:"\"O futuro do campo não se constrói apenas com crédito e tecnologia, mas com a construção diária de um lugar onde os jovens queiram estar.\"",en:"\"The future of the countryside is not built with credit and technology alone, but with the daily construction of a place where young people want to be.\""},
  rec_title:{pt:"Recomendações Estratégicas",en:"Strategic Recommendations"},
  rec1_header:{pt:"📚 Para Pesquisadores",en:"📚 For Researchers"},
  rec1_item1:{pt:"Descentralizar a produção científica — menos de 2% dos estudos focam na Amazônia",en:"Decentralize scientific production — less than 2% of studies focus on the Amazon"},
  rec1_item2:{pt:"Incluir mulheres e não-sucessores nos desenhos de pesquisa",en:"Include women and non-successors in research designs"},
  rec1_item3:{pt:"Adotar metodologias mistas que capturem aspectos subjetivos",en:"Adopt mixed methodologies that capture subjective aspects"},
  rec2_header:{pt:"🏛️ Para Gestores Públicos",en:"🏛️ For Public Managers"},
  rec2_item1:{pt:"Políticas integradas que combinem crédito, educação contextualizada e assistência técnica",en:"Integrated policies combining credit, contextualized education and technical assistance"},
  rec2_item2:{pt:"Programas de mentoria entre gerações",en:"Intergenerational mentorship programs"},
  rec2_item3:{pt:"Incentivos fiscais para propriedades com plano de sucessão formalizado",en:"Tax incentives for properties with formalized succession plans"},
  rec3_header:{pt:"🤝 Para Organizações da Sociedade Civil",en:"🤝 For Civil Society Organizations"},
  rec3_item1:{pt:"Fortalecer redes de jovens agricultores",en:"Strengthen networks of young farmers"},
  rec3_item2:{pt:"Promover feiras e eventos que valorizem a produção jovem",en:"Promote fairs and events that value youth production"},
  rec3_item3:{pt:"Criar programas de intercâmbio entre regiões",en:"Create exchange programs between regions"},
  ref_title:{pt:"Referências Acadêmicas",en:"Academic References"},
  ref_col_authors:{pt:"Autores",en:"Authors"},
  ref_col_year:{pt:"Ano",en:"Year"},
  ref_col_title:{pt:"Título (Artigo)",en:"Title (Article)"},
  ref_col_journal:{pt:"Periódico",en:"Journal"},
  ref1_title:{pt:"Sucessão na agricultura familiar brasileira: uma revisão sistemática",en:"Sucessão na agricultura familiar brasileira: uma revisão sistemática"},
  ref2_title:{pt:"Why do rural youth migrate? Evidence from Colombia and Guatemala",en:"Why do rural youth migrate? Evidence from Colombia and Guatemala"},
  ref3_title:{pt:"Generational succession in agriculture: academic debate and scientific trends",en:"Generational succession in agriculture: academic debate and scientific trends"},
  ref4_title:{pt:"Beyond Poverty: Socially Embedded Push Factors in Adolescent Rural-Urban Migration",en:"Beyond Poverty: Socially Embedded Push Factors in Adolescent Rural-Urban Migration"},
  ref5_title:{pt:"Japa Syndrome and Youth Migration in Africa",en:"Japa Syndrome and Youth Migration in Africa"},
  ref_note:{pt:"* Títulos originais dos artigos em inglês, conforme publicados.",en:"* Original article titles in English, as published."},
  ciclo_title:{pt:"O Ciclo da Sucessão Rural",en:"The Rural Succession Cycle"},
  ciclo_subtitle:{pt:"Clique em cada etapa para entender como o ciclo se completa:",en:"Click each step to understand how the cycle completes:"},
  ciclo_default:{pt:"Selecione uma etapa acima para ver a explicação.",en:"Select a step above to see the explanation."},
  ciclo1_title:{pt:"Jovem Rural",en:"Rural Youth"},
  ciclo2_title:{pt:"Educação",en:"Education"},
  ciclo3_title:{pt:"Crédito/Terra",en:"Credit/Land"},
  ciclo4_title:{pt:"Produção",en:"Production"},
  ciclo5_title:{pt:"Retorno",en:"Return"}
};

for(var k in textKeys){
  translations.pt[k]=textKeys[k].pt;
  translations.en[k]=textKeys[k].en;
}

// Idioma atual (padrao: Portugues)
var currentLang='pt';

// Aplica a traducao em todos os elementos com data-key
function updateLanguage(){
  var keys=Object.keys(translations[currentLang]);
  keys.forEach(function(key){
    var els=document.querySelectorAll('[data-key="'+key+'"]');
    els.forEach(function(el){
      if(el.id!=='heroTitle')safeText(el,translations[currentLang][key]);
    });
  });
  // Atualiza aria-label do botao voltar ao inicio
  var backTopBtn=document.getElementById('backToTop');
  if(backTopBtn){
    var ariaText=translations[currentLang]['btn_backtop_aria'];
    if(ariaText)backTopBtn.setAttribute('aria-label',ariaText);
  }
  updateHeroTitle();
}

// Aplica efeito 3D de profundidade por palavra no titulo principal
function updateHeroTitle(){
  var el=document.getElementById('heroTitle');
  if(!el)return;
  var text=translations[currentLang]['hero_title']||'Sucessão Rural Sustentável';
  var words=text.split(' ');
  var depthClasses=['hero-word-d1','hero-word-d2','hero-word-d3'];
  el.innerHTML=words.map(function(w,i){
    var cls=depthClasses[i]||'hero-word-d1';
    return '<span class="hero-word '+cls+'">'+w+'</span>';
  }).join(' ');
}

// Dados das 6 politicas publicas da Lei 15.178/2025
var policies=[
  {num:"01",titleKey:"policy1_title",descKey:"policy1_desc"},
  {num:"02",titleKey:"policy2_title",descKey:"policy2_desc"},
  {num:"03",titleKey:"policy3_title",descKey:"policy3_desc"},
  {num:"04",titleKey:"policy4_title",descKey:"policy4_desc"},
  {num:"05",titleKey:"policy5_title",descKey:"policy5_desc"},
  {num:"06",titleKey:"policy6_title",descKey:"policy6_desc"}
];

// Renderiza os cards de politicas dinamicamente no grid
function renderPolicies(){
  var grid=document.getElementById('policyGrid');
  if(!grid)return;
  grid.innerHTML=policies.map(function(p){
    return '<div class="policy-card sr"><div class="accent-text policy-num">'+p.num+'</div><h3>'+(translations[currentLang][p.titleKey]||'')+'</h3><p>'+(translations[currentLang][p.descKey]||'')+'</p></div>';
  }).join('');
  document.querySelectorAll('#policyGrid .sr').forEach(function(el){srObs.observe(el)});
  attachPolicyHover();
}
var themeLight=document.getElementById('themeToggle');
var themeContrast=document.getElementById('contrastToggle');
if(themeLight)themeLight.addEventListener('click',function(){setTheme(document.body.classList.contains('light')?'dark':'light')});
if(themeContrast)themeContrast.addEventListener('click',function(){setTheme(document.body.classList.contains('contrast')?'dark':'contrast')});
try{var savedTheme=localStorage.getItem('theme');if(savedTheme)setTheme(savedTheme);}catch(e){}

// Botoes de troca de idioma (PT/EN) com salvamento no localStorage
var langPtBtn=document.getElementById('langPt');
var langEnBtn=document.getElementById('langEn');
if(langPtBtn)langPtBtn.addEventListener('click',function(){currentLang='pt';document.documentElement.lang='pt-br';updateLanguage();renderPolicies();drawRegionChart();initTypewriter();localStorage.setItem('lang','pt')});
if(langEnBtn)langEnBtn.addEventListener('click',function(){currentLang='en';document.documentElement.lang='en';updateLanguage();renderPolicies();drawRegionChart();initTypewriter();localStorage.setItem('lang','en')});
try{var savedLang=localStorage.getItem('lang');if(savedLang==='en'){currentLang='en';document.documentElement.lang='en';updateLanguage();renderPolicies();drawRegionChart();initTypewriter();}}catch(e){}

// Controle de tamanho da fonte com persistencia no localStorage
var fontSize=100;
function setFontSize(s){document.documentElement.style.fontSize=s+'%';localStorage.setItem('fontSize',s)}
var fontInc=document.getElementById('fontIncrease');
var fontDec=document.getElementById('fontDecrease');
var fontRes=document.getElementById('fontReset');
if(fontInc)fontInc.addEventListener('click',function(){if(fontSize<130){fontSize+=10;setFontSize(fontSize)}});
if(fontDec)fontDec.addEventListener('click',function(){if(fontSize>80){fontSize-=10;setFontSize(fontSize)}});
if(fontRes)fontRes.addEventListener('click',function(){fontSize=100;setFontSize(fontSize)});
try{var sf=localStorage.getItem('fontSize');if(sf){fontSize=parseInt(sf,10);setFontSize(fontSize)}}catch(e){}

// Navegacao suave para links de ancora internos
// Respeita prefers-reduced-motion (sem animacao se o usuario desejar)
function attachSmoothScroll(links){
  links.forEach(function(a){
    a.addEventListener('click',function(ev){
      var id=this.getAttribute('href');
      if(id==='#'||!id)return;
      var el=document.querySelector(id);
      if(el){ev.preventDefault();el.scrollIntoView({behavior:rm?'auto':'smooth',block:'start'})}
      else{ev.preventDefault()}
    });
  });
}
attachSmoothScroll(document.querySelectorAll('a[href^="#"]'));

// Scroll Reveal: adiciona classe 'visible' quando elementos entram na viewport
var srObs=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('visible');srObs.unobserve(e.target)}
  });
},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.sr, .stat-item').forEach(function(el){srObs.observe(el)});
document.querySelectorAll('.ref-table tbody tr').forEach(function(el){srObs.observe(el)});

// Imagem da educacao: adiciona classe 'visible' para animacao de zoom
var imgObs=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('visible');imgObs.unobserve(e.target)}
  });
},{threshold:.1});
document.querySelectorAll('.split-image').forEach(function(el){imgObs.observe(el)});

// Contadores animados: conta de 0 ate o valor ao entrar na viewport
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
          el.classList.add('bounce');
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

// Slider de desafios: troca slides com transicao de "abertura de porta"
var slideEls=document.querySelectorAll('.slide');
var dotsContainer=document.getElementById('sliderDots');
var curSlide=0,autoInterval;
var isAnimating=false;

function updateSlider(){
  slideEls.forEach(function(s,i){
    s.classList.remove('active','prev');
    if(i===curSlide){
      s.classList.add('active');
    }else if(i===(curSlide-1+slideEls.length)%slideEls.length){
      s.classList.add('prev');
    }
  });
  if(dotsContainer){
    var dots=dotsContainer.querySelectorAll('.dot');
    dots.forEach(function(d,i){d.classList.toggle('active',i===curSlide)});
  }
}

function goToSlide(n){
  if(!slideEls.length||isAnimating)return;
  var next=(n+slideEls.length)%slideEls.length;
  if(next===curSlide)return;
  isAnimating=true;
  curSlide=next;
  updateSlider();
  setTimeout(function(){isAnimating=false;},1000);
}

if(dotsContainer){
  dotsContainer.innerHTML='';
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
  autoInterval=setInterval(function(){goToSlide(curSlide+1)},5000);
  var sliderContainer=document.getElementById('sliderContainer');
  if(sliderContainer){
    sliderContainer.addEventListener('mouseenter',function(){clearInterval(autoInterval)});
    sliderContainer.addEventListener('mouseleave',function(){autoInterval=setInterval(function(){goToSlide(curSlide+1)},5000)});
  }
}

// Botoes de navegacao manual do slider
var prevSlideBtn=document.getElementById('prevSlide');
var nextSlideBtn=document.getElementById('nextSlide');
if(prevSlideBtn)prevSlideBtn.addEventListener('click',function(){clearInterval(autoInterval);goToSlide(curSlide-1)});
if(nextSlideBtn)nextSlideBtn.addEventListener('click',function(){clearInterval(autoInterval);goToSlide(curSlide+1)});

// Swipe / Drag no slider: arrastar com mouse ou touch para trocar slides
// Efeito fluido de "puxar" o proximo slide junto com o atual
(function(){
  var sliderContainer=document.getElementById('sliderContainer');
  if(!sliderContainer)return;
  var startX=0,currentDelta=0,isDragging=false;
  var threshold=60;
  var currentSlideEl=null,targetSlideEl=null;

  function getSlideEl(index){
    var idx=(index+slideEls.length)%slideEls.length;
    return slideEls[idx];
  }

  function startDrag(x){
    if(slideEls.length<=1||isAnimating)return;
    isDragging=true;startX=x;currentDelta=0;
    currentSlideEl=getSlideEl(curSlide);
    clearInterval(autoInterval);
  }

  function moveDrag(x){
    if(!isDragging||!currentSlideEl)return;
    currentDelta=x-startX;
    var dir=currentDelta>0?-1:1;
    var targetIdx=(curSlide+dir+slideEls.length)%slideEls.length;
    targetSlideEl=getSlideEl(targetIdx);

    currentSlideEl.classList.add('dragging');
    if(targetSlideEl)targetSlideEl.classList.add('drag-target');

    var containerW=sliderContainer.offsetWidth;
    var pct=(currentDelta/containerW)*100;
    var scale=1-Math.abs(pct/100)*0.05;
    var brightness=1-Math.abs(pct/100)*0.3;

    currentSlideEl.style.transform='translateX('+pct+'%) scale('+scale+')';
    currentSlideEl.style.filter='brightness('+brightness+')';
    currentSlideEl.style.zIndex='3';

    if(targetSlideEl){
      var targetStart=dir>0?100:-100;
      var targetScale=0.95+Math.abs(pct/100)*0.05;
      var targetBright=0.7+Math.abs(pct/100)*0.3;
      targetSlideEl.style.transform='translateX('+(targetStart+pct)+'%) scale('+targetScale+')';
      targetSlideEl.style.filter='brightness('+targetBright+')';
      targetSlideEl.style.zIndex='2';
    }
  }

  function endDrag(){
    if(!isDragging||!currentSlideEl)return;
    isDragging=false;

    currentSlideEl.classList.remove('dragging');
    currentSlideEl.style.transform='';
    currentSlideEl.style.filter='';
    currentSlideEl.style.zIndex='';
    if(targetSlideEl){
      targetSlideEl.classList.remove('drag-target');
      targetSlideEl.style.transform='';
      targetSlideEl.style.filter='';
      targetSlideEl.style.zIndex='';
    }

    if(Math.abs(currentDelta)>threshold){
      if(currentDelta>0)goToSlide(curSlide-1);
      else goToSlide(curSlide+1);
    }else{
      updateSlider();
    }

    targetSlideEl=null;currentSlideEl=null;

    if(!rm){clearInterval(autoInterval);autoInterval=setInterval(function(){goToSlide(curSlide+1)},5000);}
  }

  sliderContainer.addEventListener('mousedown',function(e){startDrag(e.clientX)});
  sliderContainer.addEventListener('touchstart',function(e){startDrag(e.touches[0].clientX)},{passive:true});
  sliderContainer.addEventListener('mousemove',function(e){moveDrag(e.clientX)});
  sliderContainer.addEventListener('touchmove',function(e){moveDrag(e.touches[0].clientX)},{passive:true});
  sliderContainer.addEventListener('mouseup',endDrag);
  sliderContainer.addEventListener('mouseleave',function(){if(isDragging)endDrag()});
  sliderContainer.addEventListener('touchend',endDrag);
})();

// Modal: abre/fecha com botao, clique fora ou tecla Escape
var modal=document.getElementById('modal');
var openBtn=document.getElementById('openModalBtn');
var closeBtn=document.getElementById('closeModalBtn');
if(openBtn&&modal)openBtn.addEventListener('click',function(){modal.classList.add('active')});
if(closeBtn&&modal)closeBtn.addEventListener('click',function(){modal.classList.remove('active')});
if(modal)modal.addEventListener('click',function(e){if(e.target===modal)modal.classList.remove('active')});
window.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal&&modal.classList.contains('active'))modal.classList.remove('active')});

// Gráfico SVG: animação de desenhar a linha e tooltip
function initChartSVG(){
  var chartLine=document.getElementById('chartLine');
  var chartWrap=document.querySelector('.chart-wrap');
  if(!chartLine)return;

  // Calcula o comprimento total do path para stroke-dasharray
  var len=chartLine.getTotalLength?chartLine.getTotalLength():2000;
  chartLine.style.strokeDasharray=len;
  chartLine.style.strokeDashoffset=len;

  // Observa quando o gráfico entra na viewport para iniciar a animação
  var chartObs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        chartLine.classList.add('drawn');
        chartObs.unobserve(e.target);
      }
    });
  },{threshold:.2});
  chartObs.observe(chartWrap);

  // Tooltip nos pontos do SVG
  var tooltip=document.createElement('div');
  tooltip.className='chart-tooltip';
  if(chartWrap)chartWrap.appendChild(tooltip);

  var dotValues=['28.2','26.5','25.1','24.3','24.8','25.9','27.3','29.1'];
  var dotLabels=['2012','2015','2018','2021','2024','2026','2028','2030'];

  document.querySelectorAll('.chart-dot').forEach(function(dot,i){
    dot.addEventListener('mouseenter',function(e){
      tooltip.innerHTML=dotLabels[i]+': <strong>'+dotValues[i]+' milhões</strong>';
      tooltip.style.opacity='1';
      var rect=dot.getBoundingClientRect();
      var wrapRect=chartWrap.getBoundingClientRect();
      tooltip.style.left=(rect.left-wrapRect.left-20)+'px';
      tooltip.style.top=(rect.top-wrapRect.top-45)+'px';
    });
    dot.addEventListener('mouseleave',function(){
      tooltip.style.opacity='0';
    });
  });
}

// Parallax hero com lerp suave: fundo e conteudo movem-se com easing
// Pausa automaticamente quando o hero nao esta visivel
if(!rm){
  var heroContent=document.querySelector('.hero-content');
  var heroBg=document.getElementById('heroBg');
  var heroSection=document.getElementById('hero');
  var targetX=0,targetY=0,currentX=0,currentY=0,currentCX=0,currentCY=0;
  var ease=0.055;
  var parallaxActive=true;

  if(heroSection){
    heroSection.addEventListener('mousemove',function(e){
      targetX=(e.clientX/window.innerWidth-.5)*2;
      targetY=(e.clientY/window.innerHeight-.5)*2;
    });
    heroSection.addEventListener('mouseleave',function(){
      targetX=0;targetY=0;
    });
  }

  function parallaxLoop(){
    currentX+=(targetX*-18-currentX)*ease;
    currentY+=(targetY*-12-currentY)*ease;
    currentCX+=(targetX*8-currentCX)*ease;
    currentCY+=(targetY*5-currentCY)*ease;
    if(heroBg)heroBg.style.transform='scale(1.08) translate('+currentX+'px,'+currentY+'px)';
    if(heroContent)heroContent.style.transform='translate('+currentCX+'px,'+currentCY+'px)';
    if(parallaxActive)requestAnimationFrame(parallaxLoop);
  }
  parallaxLoop();

  // Pausa quando o hero sai da viewport
  var heroObs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        if(!parallaxActive){parallaxActive=true;parallaxLoop();}
      }else{
        parallaxActive=false;
      }
    });
  },{threshold:0.01});
  heroObs.observe(heroSection);
}

// Cursor customizado no desktop: forma de semente com anel pulsante
// Respeita dispositivos touch e prefers-reduced-motion
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

// Tilt 3D especifico para stat cards (ja tem perspective no parent)
function attachStatTilt(){
  if(rm)return;
  document.querySelectorAll('.stat-item').forEach(function(card){
    if(card.dataset.hoverAttached==='true')return;
    card.dataset.hoverAttached='true';
    card.addEventListener('mousemove',function(e){
      if(!card.classList.contains('visible'))return;
      var rect=card.getBoundingClientRect();
      var x=(e.clientX-rect.left)/rect.width-0.5;
      var y=(e.clientY-rect.top)/rect.height-0.5;
      var rx=(y-0.5)*-14;
      var ry=(x-0.5)*14;
      card.style.transform='perspective(800px) rotateX('+rx+'deg) rotateY('+ry+'deg) scale(1.05)';
    });
    card.addEventListener('mouseleave',function(){
      card.style.transform='';
    });
  });
}

// Tilt 3D dinamico nos cards: inclina seguindo o mouse
// Preserva o transform base do CSS e so adiciona o tilt
function attachTiltHover(selector){
  if(rm)return;
  document.querySelectorAll(selector).forEach(function(card){
    if(card.dataset.hoverAttached==='true')return;
    card.dataset.hoverAttached='true';
    var baseTransform='';
    card.addEventListener('mouseenter',function(){
      // So ativa o tilt se o card ja foi revelado (possui .visible)
      if(!card.classList.contains('visible'))return;
      baseTransform=window.getComputedStyle(card).transform;
      if(baseTransform==='none')baseTransform='';
    });
    card.addEventListener('mousemove',function(e){
      if(!card.classList.contains('visible'))return;
      var rect=card.getBoundingClientRect();
      var x=(e.clientX-rect.left)/rect.width-0.5;
      var y=(e.clientY-rect.top)/rect.height-0.5;
      var tilt='rotateY('+(x*12)+'deg) rotateX('+(-y*12)+'deg) translateY(-6px)';
      card.style.transform=(baseTransform?baseTransform+' ':'')+tilt;
    });
    card.addEventListener('mouseleave',function(){
      if(!card.classList.contains('visible'))return;
      card.style.transform=baseTransform;
    });
    var cursorEl=document.getElementById('customCursor');
    if(cursorEl){
      card.addEventListener('mouseenter',function(){cursorEl.classList.add('hover')});
      card.addEventListener('mouseleave',function(){cursorEl.classList.remove('hover')});
    }
  });
}
function attachPolicyHover(){attachTiltHover('.policy-card');}

// Botao "Voltar ao inicio" com scroll suave
var backToTop=document.getElementById('backToTop');
if(backToTop)backToTop.addEventListener('click',function(){window.scrollTo({top:0,behavior:rm?'auto':'smooth'})});

// Typewriter effect na secao Paradoxo: digita o texto letra por letra
var twObs=null,twStarted=false;
function initTypewriter(){
  var el=document.getElementById('typewriterText');
  if(!el)return;
  var fullText=translations[currentLang]['paradox_text']||'';
  if(rm){el.textContent=fullText;return}
  // Reinicia estado ao trocar idioma
  el.textContent='';
  twStarted=false;
  var i=0,speed=35;
  function type(){
    if(i<fullText.length){
      el.textContent+=fullText.charAt(i);
      i++;
      setTimeout(type,speed);
    }
  }
  if(twObs)twObs.disconnect();
  twObs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting&&!twStarted){twStarted=true;type();}
    });
  },{threshold:.3});
  twObs.observe(el);
}

// Acordeao (accordion) de recomendacoes: cada item abre/fecha independentemente
function initAccordion(){
  document.querySelectorAll('.accordion-header').forEach(function(btn){
    btn.addEventListener('click',function(){
      var item=btn.closest('.accordion-item');
      var isOpen=item.classList.contains('open');
      var icon=btn.querySelector('.accordion-icon');
      if(isOpen){
        item.classList.remove('open');
        btn.setAttribute('aria-expanded','false');
        if(icon)icon.textContent='+';
      } else {
        item.classList.add('open');
        btn.setAttribute('aria-expanded','true');
        if(icon)icon.textContent='×';
      }
    });
  });
}

// Alias para compatibilidade: drawRegionChart redesenha o grafico completo
function drawRegionChart(){drawRegionChartFrame(99999);}

// Grafico de barras Canvas: distribuicao geografica das pesquisas com animacao de crescimento sequencial (stagger)
var regionChartState={animating:false,values:[67.4,18.6,8.1,4.7,1.2],labels:['Sul','Sudeste','Nordeste','Centro-Oeste','Norte'],barColors:['#4ade80','#22c55e','#16a34a','#15803d','#dc2626'],maxVal:80,stagger:250,dur:1000};

function drawRegionChartFrame(elapsed){
  var cc=document.getElementById('regionChart');
  if(!cc)return;
  var ctx=cc.getContext('2d');
  var dpr=window.devicePixelRatio||1;
  var cssW=cc.offsetWidth||500;
  var cssH=Math.min(400,Math.round(cssW*0.8));
  if(Math.abs((cc.width/dpr)-cssW)>1||Math.abs((cc.height/dpr)-cssH)>1){
    cc.width=Math.round(cssW*dpr);cc.height=Math.round(cssH*dpr);
  }
  ctx.setTransform(dpr,0,0,dpr,0,0);
  var w=cssW,h=cssH,pad=50;
  ctx.clearRect(0,0,w,h);
  var isLight=document.body.classList.contains('light');
  var textColor=isLight?'#121a14':'#e8ece9';
  var barW=(w-pad*2)/regionChartState.labels.length*0.6;
  ctx.font='12px system-ui';ctx.fillStyle=textColor;ctx.textAlign='center';

  for(var i=0;i<regionChartState.labels.length;i++){
    var x=pad+(i+0.5)*((w-pad*2)/regionChartState.labels.length);
    var finalH=(regionChartState.values[i]/regionChartState.maxVal)*(h-pad*2);
    // Cada barra inicia apos um delay (stagger)
    var barStart=i*regionChartState.stagger;
    var barElapsed=Math.max(0,elapsed-barStart);
    var barP=Math.min(barElapsed/regionChartState.dur,1);
    var barH=finalH*easeOutQuart(barP);
    var y=h-pad-barH;
    ctx.fillStyle=regionChartState.barColors[i];
    ctx.beginPath();
    ctx.roundRect(x-barW/2,y,barW,barH,6);
    ctx.fill();
    ctx.fillStyle=textColor;
    ctx.fillText(regionChartState.labels[i],x,h-pad+20);
    // Porcentagem aparece apenas quando a barra ja terminou de subir
    if(barP>=1){
      ctx.fillStyle=textColor;
      ctx.fillText(regionChartState.values[i]+'%',x,y-8);
    }
  }
}

function easeOutQuart(t){return 1-Math.pow(1-t,4)}

function animateRegionChart(ts){
  if(!regionChartState.startTs)regionChartState.startTs=ts;
  var elapsed=ts-regionChartState.startTs;
  var totalDur=regionChartState.dur+(regionChartState.values.length-1)*regionChartState.stagger;
  drawRegionChartFrame(elapsed);
  if(elapsed<totalDur){
    regionChartState.rafId=requestAnimationFrame(animateRegionChart);
  }else{
    regionChartState.animating=false;
    regionChartState.startTs=null;
  }
}

function startRegionChartAnimation(){
  if(regionChartState.animating)return;
  if(rm){drawRegionChartFrame(99999);return;}
  regionChartState.animating=true;
  regionChartState.startTs=null;
  if(regionChartState.rafId)cancelAnimationFrame(regionChartState.rafId);
  regionChartState.rafId=requestAnimationFrame(animateRegionChart);
}

// Observer que dispara a animacao quando o grafico entra na viewport
var regionObs=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){startRegionChartAnimation();regionObs.unobserve(e.target)}
  });
},{threshold:.2});
var regionCanvasEl=document.getElementById('regionChart');
if(regionCanvasEl)regionObs.observe(regionCanvasEl);

// Redesenha estatico ao redimensionar (sem reanimar)
var regionResizeTimer;
window.addEventListener('resize',function(){
  clearTimeout(regionResizeTimer);
  regionResizeTimer=setTimeout(function(){
    drawRegionChartFrame(99999);
  },150);
});

// Canvas de partículas no Hero: folhas/grama flutuando para cima
function initHeroParticles(){
  if(rm)return;
  var canvas=document.getElementById('heroParticles');
  if(!canvas)return;
  var ctx=canvas.getContext('2d');
  var w,h,particles=[],animId;
  var isLight=document.body.classList.contains('light');
  var leafColor=isLight?'rgba(22,163,74,':'rgba(74,222,128,';

  function resize(){
    var rect=canvas.parentElement.getBoundingClientRect();
    w=rect.width;h=rect.height;
    canvas.width=w;canvas.height=h;
  }

  function createParticle(){
    return {
      x:Math.random()*w,
      y:h+Math.random()*60,
      size:Math.random()*4+2,
      speed:Math.random()*0.8+0.2,
      opacity:Math.random()*0.4+0.1,
      sway:Math.random()*2-1,
      phase:Math.random()*Math.PI*2,
      rotation:Math.random()*Math.PI*2,
      rotSpeed:(Math.random()-0.5)*0.02
    };
  }

  function initParticles(){
    particles=[];
    var count=Math.floor((w*h)/25000);
    for(var i=0;i<count;i++){
      var p=createParticle();
      p.y=Math.random()*h;
      particles.push(p);
    }
  }

  function drawLeaf(p){
    ctx.save();
    ctx.translate(p.x,p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle=leafColor+p.opacity+')';
    ctx.beginPath();
    ctx.ellipse(0,0,p.size,p.size*0.5,0,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
  }

  function drawConnections(){
    var threshold=80;
    for(var i=0;i<particles.length;i++){
      for(var j=i+1;j<particles.length;j++){
        var a=particles[i],b=particles[j];
        var dx=a.x-b.x,dy=a.y-b.y;
        var dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<threshold){
          var opacity=(1-dist/threshold)*0.15;
          ctx.strokeStyle='rgba(74,222,128,'+opacity+')';
          ctx.lineWidth=0.8;
          ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
        }
      }
    }
  }

  function animate(){
    ctx.clearRect(0,0,w,h);
    drawConnections();
    for(var i=0;i<particles.length;i++){
      var p=particles[i];
      p.y-=p.speed;
      p.phase+=0.015;
      p.x+=Math.sin(p.phase)*p.sway*0.5;
      p.rotation+=p.rotSpeed;
      if(p.y+p.size<0){
        p.y=h+p.size;
        p.x=Math.random()*w;
      }
      drawLeaf(p);
    }
    animId=requestAnimationFrame(animate);
  }

  resize();initParticles();animate();

  window.addEventListener('resize',function(){resize();initParticles();});

  var pObs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){if(!animId)animate();}
      else{cancelAnimationFrame(animId);animId=null;}
    });
  },{threshold:0.05});
  pObs.observe(canvas);
}

// Simulador do Ciclo da Sucessao Rural: 5 etapas clicaveis
function initCicloSimulador(){
  var botoes=document.querySelectorAll('.ciclo-btn');
  var descricao=document.getElementById('cicloDescricao');
  if(!botoes.length||!descricao)return;

  var textos={
    jovem:{pt:'O jovem identifica oportunidades no campo e decide investir na sucessão familiar, unindo tradição e inovação.',en:'The youth identifies opportunities in the countryside and decides to invest in family succession, combining tradition and innovation.'},
    educacao:{pt:'Cursos técnicos e superior agrícola preparam a nova geração para inovar com sustentabilidade e tecnologia.',en:'Technical and agricultural higher education courses prepare the new generation to innovate with sustainability and technology.'},
    credito:{pt:'Acesso a financiamento e políticas públicas viabilizam a entrada do jovem na propriedade rural.',en:'Access to financing and public policies enables the youth to enter the rural property.'},
    producao:{pt:'Tecnologia, sustentabilidade e agroecologia impulsionam a produção familiar no campo.',en:'Technology, sustainability and agroecology boost family production in the countryside.'},
    retorno:{pt:'O ciclo se fecha: o jovem se torna protagonista e inspira a próxima geração a permanecer no campo.',en:'The cycle closes: the youth becomes a protagonist and inspires the next generation to stay in the countryside.'}
  };

  botoes.forEach(function(btn){
    btn.addEventListener('click',function(){
      var chave=btn.getAttribute('data-etapa');
      var texto=textos[chave];
      if(!texto)return;

      botoes.forEach(function(b){b.classList.remove('ativo');});
      btn.classList.add('ativo');

      descricao.style.opacity='0';
      setTimeout(function(){
        descricao.innerHTML='<p class="ciclo-texto">'+(currentLang==='pt'?texto.pt:texto.en)+'</p>';
        descricao.style.opacity='1';
      },200);
    });
  });
}

// === NOVAS ANIMACOES INTERATIVAS ===

// Efeito Spotlight: brilho radial que segue o cursor nos cards de politica e teoria
// Usa variaveis CSS --mx e --my posicionadas pelo mouse para o gradiente radial
function initSpotlightEffect(){
  if(rm)return;
  document.addEventListener('mousemove',function(e){
    var card=e.target.closest('.policy-card, .theory-card');
    if(card){
      var rect=card.getBoundingClientRect();
      card.style.setProperty('--mx',(e.clientX-rect.left)+'px');
      card.style.setProperty('--my',(e.clientY-rect.top)+'px');
    }
  });
}

// Efeito Magnetico: botoes primarios e outline seguem levemente o cursor
// Desativa transicao durante o movimento para resposta instantanea; reativa ao sair
function initMagneticButtons(){
  if(rm)return;
  document.querySelectorAll('.btn-primary, .btn-outline').forEach(function(btn){
    btn.addEventListener('mousemove',function(e){
      var rect=btn.getBoundingClientRect();
      var x=e.clientX-rect.left-rect.width/2;
      var y=e.clientY-rect.top-rect.height/2;
      btn.style.transition='none';
      btn.style.transform='translate('+x*0.25+'px,'+y*0.25+'px)';
    });
    btn.addEventListener('mouseleave',function(){
      btn.style.transition='';
      btn.style.transform='';
    });
  });
}

// Efeito Ripple: onda circular emitida ao clicar botoes interativos
// Cria um span com gradiente que se expande e desaparece
function initRippleEffect(){
  document.addEventListener('click',function(e){
    var target=e.target.closest('.ciclo-btn, .accordion-header, .btn-primary, .btn-outline');
    if(!target)return;
    var rect=target.getBoundingClientRect();
    var ripple=document.createElement('span');
    ripple.className='ripple-effect';
    var size=Math.max(rect.width,rect.height)*2;
    ripple.style.width=ripple.style.height=size+'px';
    ripple.style.left=(e.clientX-rect.left-size/2)+'px';
    ripple.style.top=(e.clientY-rect.top-size/2)+'px';
    target.appendChild(ripple);
    setTimeout(function(){ripple.remove()},700);
  });
}

// Efeito Parallax nos badges: cada badge segue o cursor com profundidade diferente
// Pausa a animacao badgeFloat durante o movimento e retoma ao sair
function initBadgeParallax(){
  if(rm)return;
  var section=document.getElementById('protagonismo');
  if(!section)return;
  var badges=section.querySelectorAll('.badge');
  if(!badges.length)return;
  var isOver=false;
  section.addEventListener('mouseenter',function(){
    isOver=true;
    badges.forEach(function(b){b.style.animationPlayState='paused'});
  });
  section.addEventListener('mousemove',function(e){
    if(!isOver)return;
    var rect=section.getBoundingClientRect();
    var cx=(e.clientX-rect.left)/rect.width-0.5;
    var cy=(e.clientY-rect.top)/rect.height-0.5;
    badges.forEach(function(b,i){
      var depth=(i+1)*12;
      var dx=-cx*depth;
      var dy=-cy*depth;
      b.style.transform='translateY('+dy+'px) translateX('+dx+'px)';
    });
  });
  section.addEventListener('mouseleave',function(){
    isOver=false;
    badges.forEach(function(b){
      b.style.animationPlayState='';
      b.style.transform='';
    });
  });
}

// Animacao de headings: adiciona scroll reveal (.sr) aos titulos de secao
// Usa o IntersectionObserver ja existente para revelar com fade-up
function initHeadingAnim(){
  if(rm)return;
  document.querySelectorAll('.heading-medium, .heading-large').forEach(function(h){
    if(!h.classList.contains('sr')){h.classList.add('sr');srObs.observe(h);}
  });
}

// === INICIALIZACAO ===
updateHeroTitle();
renderPolicies();
initChartSVG();
initTypewriter();
initAccordion();
initCicloSimulador();
initHeroParticles();
initSpotlightEffect();
initMagneticButtons();
initRippleEffect();
initBadgeParallax();
initHeadingAnim();
attachStatTilt();

})();
