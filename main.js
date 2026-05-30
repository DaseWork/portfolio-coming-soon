import { injectSpeedInsights } from '@vercel/speed-insights';

// Initialize Vercel Speed Insights
injectSpeedInsights();

// ============================================================
// PROJECT DATA
// ============================================================
const PROJECTS = [
  {
    id:'01', client:'SXSW 2026',
    cat:'Wayfinding & Event Design', year:'2026',
    desc:'Multi-channel asset production and wayfinding systems for 50,000+ attendees across a multi-site festival — executed under strict brand guidelines.',
    slides:[
      {label:'Hero / Cover Image',       tag:'Act 01 — Brief'},
      {label:'Wayfinding System Diagram',tag:'Act 02 — Research'},
      {label:'Sketches & Concepts',      tag:'Act 03 — Process'},
      {label:'Email Banner Suite (×3)',   tag:'Act 04 — Execution'},
      {label:'Signage Installations',    tag:'Act 04 — Execution'},
      {label:'Mobile App UI',            tag:'Act 04 — Digital Extension'},
      {label:'Installation Grid & Impact',tag:'Act 05 — Result'},
    ]
  },
  {
    id:'02', client:'Flawless Vape Co.',
    cat:'Brand Identity & Label Design', year:'2019–2026',
    desc:'Complete brand build from identity through label design, then navigating an FDA regulatory overhaul mid-project without losing shelf presence.',
    slides:[
      {label:'Brand Hero',               tag:'Act 01 — Brief'},
      {label:'Logo Exploration',         tag:'Act 03 — Process'},
      {label:'Color & Typography System',tag:'Act 03 — Process'},
      {label:'Label Suite — Original',   tag:'Act 04 — Execution'},
      {label:'FDA Compliance Redesign',  tag:'Act 04 — Solution'},
      {label:'Shelf Presence',           tag:'Act 05 — Result'},
      {label:'2026 Digital Extension',   tag:'Act 04 — New Work'},
    ]
  },
  {
    id:'03', client:'Austin Sign Co.',
    cat:'Rebrand & Environmental Design', year:'2023',
    desc:'Identity through storefront installation, vehicle wraps, and digital presence for a 15-year-old Austin sign shop competing in a modernizing market.',
    slides:[
      {label:'Before / After Storefront',tag:'Act 01 — Brief'},
      {label:'Logo System',              tag:'Act 03 — Process'},
      {label:'Storefront — Installed',   tag:'Act 04 — Execution'},
      {label:'35ft Interior Mural',      tag:'Act 04 — Execution'},
      {label:'Vehicle Wraps',            tag:'Act 04 — Execution'},
      {label:'2026 Digital Extension',   tag:'Act 04 — New Work'},
      {label:'Timeline & Impact',        tag:'Act 05 — Result'},
    ]
  }
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================
function makeCard(p) {
  const el = document.createElement('article');
  el.className = 'proj-card';
  el.setAttribute('role','button');
  el.setAttribute('tabindex','0');
  el.setAttribute('aria-label', 'View case study: ' + p.client);
  el.innerHTML = `
    <div class="proj-media">
      <p class="proj-media-bg">${p.client}</p>
      <span class="proj-num">${p.id}</span>
      <span class="proj-cta">View Case Study</span>
    </div>
    <div class="proj-info">
      <p class="proj-cat">${p.cat}</p>
      <h3 class="proj-title">${p.client}</h3>
      <p class="proj-desc">${p.desc}</p>
      <p class="proj-year">${p.year}</p>
    </div>`;
  const open = () => openCase(p);
  el.addEventListener('click', open);
  el.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){e.preventDefault();open();} });
  return el;
}

function openCase(p) {
  document.getElementById('cs-cat').textContent   = p.cat;
  document.getElementById('cs-title').textContent = p.client;
  document.getElementById('cs-desc').textContent  = p.desc;
  const g = document.getElementById('cs-gallery');
  g.innerHTML = '';
  p.slides.forEach(s => {
    const d = document.createElement('div');
    d.className = 'case-slide';
    d.innerHTML = `<p class="slide-label">${s.label}</p><span class="slide-tag">${s.tag}</span>`;
    g.appendChild(d);
  });
  go('case');
  window.scrollTo(0,0);
}

function go(page) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + page);
  if (el) { el.classList.add('active'); window.scrollTo(0,0); }
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('data-p') === page);
  });
}

function init() {
  const hg = document.getElementById('home-grid');
  const wg = document.getElementById('work-grid');
  PROJECTS.forEach(p => {
    hg.appendChild(makeCard(p));
    wg.appendChild(makeCard(p));
  });
}

// ============================================================
// EXPOSE GLOBAL FUNCTIONS (for inline onclick handlers)
// ============================================================
window.go = go;

// ============================================================
// INITIALIZE APP
// ============================================================
init();
