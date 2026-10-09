import { renderTokenEconomics } from './screens/token-economics.js';
// app.js — bootstrap, router, shell, global search
import { loadAll, buildIndex, DB } from './data.js';
import { samri } from './scoring.js';
import { el, esc, badge } from './util.js';
import { renderCommand } from './screens/command.js';
import { renderMap } from './screens/map.js';
import { renderCorridors } from './screens/corridors.js';
import { renderRegulatory } from './screens/regulatory.js';
import { renderIndustry } from './screens/industry.js';
import { renderResearch } from './screens/research.js';
import { renderDriving } from './screens/driving.js';
import { renderSafety } from './screens/safety.js';
import { renderMining } from './screens/mining.js';
import { renderOpportunities } from './screens/opportunities.js';
import { renderStrategy } from './screens/strategy.js';
import { renderKnowledge } from './screens/knowledge.js';
import { renderWorld } from './screens/world.js';

export const SCREENS = {
  token_economics: { id: "token-economics", title: "Token Economics", crumb: "whitepaper / compute costs", render: renderTokenEconomics },

  command: { id: 'command', title: 'Command Centre', crumb: 'national overview', render: renderCommand },
  map: { id: 'map', title: 'Geospatial Intelligence', crumb: 'map / layers / entities', render: renderMap },
  corridors: { id: 'corridors', title: 'Corridors & Roads', crumb: 'autonomy readiness / digital road twin', render: renderCorridors },
  regulatory: { id: 'regulatory', title: 'Regulatory Command', crumb: 'legal tracker / evidence engine', render: renderRegulatory },
  industry: { id: 'industry', title: 'Industry Graph', crumb: 'OEMs · technology · mining · logistics · telecoms · energy', render: renderIndustry },
  research: { id: 'research', title: 'Research Graph', crumb: 'universities · labs · test assets', render: renderResearch },
  driving: { id: 'driving', title: 'Driving Intelligence', crumb: 'road ontology · behaviour · scenarios · ODD', render: renderDriving },
  safety: { id: 'safety', title: 'Safety Command Centre', crumb: 'RTMC intel · AV safety metrics', render: renderSafety },
  mining: { id: 'mining', title: 'Mining Autonomy', crumb: 'first-class deployment domain', render: renderMining },
  opportunities: { id: 'opportunities', title: 'Opportunity Engine', crumb: 'radar · scoring · tiers', render: renderOpportunities },
  strategy: { id: 'strategy', title: 'Strategy', crumb: 'entry · foresight · partnerships · pilot generator', render: renderStrategy },
  knowledge: { id: 'knowledge', title: 'Knowledge & Evidence', crumb: 'gaps · blind spots · provenance · audit', render: renderKnowledge },
  world: { id: 'world', title: 'SA vs World', crumb: 'competitive intelligence · gap analysis', render: renderWorld },
};

export const NAV = [
  { group: 'Command' },
  { id: 'command', k: '01', label: 'Command Centre', hot: '' },
  { group: 'Intelligence Domains' },
  { id: 'map', k: '02', label: 'Geospatial Intel', hot: '' },
  { id: 'corridors', k: '03', label: 'Corridors & Roads', hot: '' },
  { id: 'regulatory', k: '04', label: 'Regulatory Command', hot: '' },
  { id: 'safety', k: '05', label: 'Safety Command', hot: '' },
  { id: 'mining', k: '06', label: 'Mining Autonomy', hot: '' },
  { id: 'industry', k: '07', label: 'Industry Graph', hot: '' },
  { id: 'research', k: '08', label: 'Research Graph', hot: '' },
  { id: 'driving', k: '09', label: 'Driving Intelligence', hot: '' },
  { group: 'Decision Systems' },
  { id: 'opportunities', k: '10', label: 'Opportunity Engine', hot: '' },
  { id: 'strategy', k: '11', label: 'Strategy', hot: '' },
  { id: 'knowledge', k: '12', label: 'Knowledge & Evidence', hot: '' },
  { id: 'world', k: '13', label: 'SA vs World', hot: '' },
];

let index = [];

async function boot() {
  const ok = await loadAll();
  index = buildIndex();
  renderSidebar();
  setClock();
  renderGlobal();
  route();
  window.addEventListener('hashchange', () => { route(); });
  const inp = document.getElementById('gSearch');
  inp.addEventListener('input', () => onSearch(inp.value));
  inp.addEventListener('focus', () => onSearch(inp.value));
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#gSearch') && !e.target.closest('#searchDrop')) hideSearch();
  });
}

function renderSidebar() {
  const sb = document.getElementById('sidebar');
  const alerts = (DB.alerts?.alerts || []).filter((a) => a.level === 'RED' || a.level === 'ORANGE').length;
  const red = (DB.alerts?.alerts || []).filter((a) => a.level === 'RED').length;
  const nav = NAV.map((n) => {
    if (n.group) return `<div class="nav-grp">${esc(n.group)}</div>`;
    return `<div class="nav-item" data-go="/${n.id}">
      <span class="k">${n.k}</span>${esc(n.label)}
      ${n.id === 'command' && red ? `<span class="dot" style="background:${red ? '#f0564a' : 'transparent'}"></span>` : ''}
    </div>`;
  }).join('');
  sb.innerHTML = `
    <div class="brand">
      <div class="flag">ZA · MOBILITY INTEL</div>
      <h1>Autonomous Mobility<br/>Intelligence</h1>
      <div class="sub">South African Autonomous Mobility<br/>Strategic Advancement System</div>
    </div>
    <div class="nav">${nav}</div>
    <div class="side-foot">
      v0.1 · ${today()}<br/>
      ${alerts} active alarms in system<br/>
      data integrity: honest states<br/>
      <span style="color:#7a621c">SOUTH AFRICA FIRST · EVIDENCE BEFORE ASSERTION</span>
    </div>`;
  sb.querySelectorAll('.nav-item').forEach((i) =>
    i.addEventListener('click', () => { location.hash = i.dataset.go; }),
  );
}

function route() {
  const id = (location.hash || '#/command').replace('#/', '');
  const screen = SCREENS[id] || SCREENS.command;
  document.getElementById('viewTitle').textContent = screen.title;
  document.getElementById('viewCrumb').textContent = screen.crumb || '';
  const view = document.getElementById('view');
  view.innerHTML = '';
  try {
    screen.render(view);
  } catch (e) {
    view.innerHTML = `<div class="panel"><div class="panel-bd">Render error: ${esc(e.message || e)}</div></div>`;
    console.error(e);
  }
  document.querySelectorAll('.nav-item').forEach((i) => i.classList.toggle('on', i.dataset.go === `/${screen.id}`));
  view.scrollTop = 0;
  document.getElementById('main').scrollTop = 0;
}

export function go(screen) { location.hash = `#/${screen}`; }

function setClock() {
  const t = new Date();
  document.getElementById('clock').textContent =
    t.toISOString().slice(0, 10) + ' ' + t.toTimeString().slice(0, 8) + ' Z';
}

function renderGlobal() {
  const s = samri();
  const g = document.getElementById('globState');
  g.innerHTML = `NATIONAL SAMRI <b>${s.score == null ? '\u2205' : s.score}</b><span style="color:${s.score >= 60 ? 'var(--green)' : s.score >= 40 ? 'var(--orange)' : 'var(--red)'}">●</span>`;
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}

function onSearch(q) {
  const existing = document.getElementById('searchDrop');
  if (existing) existing.remove();
  q = (q || '').trim().toLowerCase();
  if (q.length < 2) return;
  const hits = index.filter((h) => (h.title + ' ' + h.blurb).toLowerCase().includes(q)).slice(0, 14);
  if (!hits.length) return;
  const drop = el('div', 'panel', '');
  drop.id = 'searchDrop';
  drop.style.cssText = 'position:fixed;top:48px;right:180px;width:420px;z-index:200;box-shadow:var(--shadow)';
  let rows = hits.map((h) => `
    <div class="nav-item" data-r="${h.screen}" data-q="${esc(h.title)}" style="cursor:pointer;flex-wrap:wrap">
      <span class="badge grey">${esc(h.type)}</span><span>${esc(h.title)}</span>
      <span class="wrap-any small dim" style="flex-basis:100%;padding-left:2px">${esc(h.blurb).slice(0, 90)}</span>
    </div>`).join('');
  drop.innerHTML = rows;
  document.body.appendChild(drop);
  drop.querySelectorAll('.nav-item').forEach((r) =>
    r.addEventListener('click', () => {
      const sc = r.dataset.r;
      go(sc);
      // scroll-in: not needed; simplest is confirm the nav jump
      hideSearch();
      const inp = document.getElementById('gSearch');
      inp.value = '';
      setTimeout(() => inp.blur(), 50);
    }),
  );
}

function hideSearch() {
  document.getElementById('searchDrop')?.remove();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();