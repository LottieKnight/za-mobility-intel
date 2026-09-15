// research.js — research ecosystem graph
import { DB } from '../data.js';
import { esc, badge, ktag } from '../util.js';

export function renderResearch(view) {
  const R = DB.research || {};

  view.innerHTML = `
  <h3 class="sec">Mobility research hubs</h3>
  <div class="row r3">
    ${(R.hubs || []).map((h) => `
      <div class="thing"><div class="tt">${esc(h.name)}</div>
        <div class="meta">${esc(h.city || '')} · ${badge(h.kind || 'research', 'blue')}</div>
        <div class="desc">${esc(h.focus || '')}</div>
        <div class="meta mt6">${ktag((h.confidence || 'estimated').split(' ')[0].toLowerCase())} ${esc(h.confidence || '')}</div>
        ${h.saSignal ? `<div class="small mt6" style="color:#e8c15a">${esc(h.saSignal)}</div>` : ''}
        ${h.evidence ? evidenceBrief(h.evidence) : ''}
      </div>`).join('')}
  </div>

  <div class="row r2 mt10">
    <div class="panel">
      <div class="panel-hd"><span class="t">Research graph — key relationships</span></div>
      <div class="panel-bd net">
        ${(R.researchGraph || []).map((e) => `<div class="nrow">
          <span class="nx src">${esc(e.from)}</span>
          <span class="arrow">→</span>
          <span class="rel">${esc(e.rel)}</span>
          <span class="arrow">→</span>
          <span class="nx dst">${esc(e.to)}</span></div>`).join('')}
      </div>
    </div>
    <div class="panel">
      <div class="panel-hd"><span class="t">Capability matrix (who does what)</span></div>
      <div class="panel-bd flush" style="padding:0">
        <table class="grid">
          <tbody>
            ${Object.entries(R.capabilityMatrix || {}).map(([k, v]) => `
              <tr><td class="small"><b>${esc(k)}</b></td><td class="small dim">${esc((v || []).join(' · '))}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <h3 class="sec">Testing & validation assets</h3>
  <div class="row r2">
    ${(R.testAssets || []).map((t) => `
      <div class="tile"><div class="label">${badge(t.kind || 'asset', 'violet')}</div>
        <div class="small mt6"><b>${esc(t.name)}</b> · ${esc(t.city)}</div>
        <div class="small dim mt6">${esc(t.note || '')}</div>
        <div class="foot mt6">confidence: ${ktag((t.confidence || '').split(' ')[0].toLowerCase() || 'unknown')} ${esc(t.confidence || '')}</div></div>`).join('')}
  </div>

  <h3 class="sec">Research gaps</h3>
  <div class="panel"><div class="panel-bd">
    <div class="tags">
      ${(R.gaps || []).map((g) => `<span class="tag" style="font-size:10.5px;border-color:var(--red-dim);color:#ffb3ab">${esc(g)}</span>`).join('')}
    </div>
  </div></div>
  `;
}

function evidenceBrief(evs) {
  if (!evs || !evs.length) return '';
  const e = evs[0];
  return `<details style="margin-top:6px"><summary style="cursor:pointer" class="small gold">evidence</summary>
    <div class="ev"><div class="head">${badge(e.type || 'TERTIARY', e.type === 'PRIMARY' ? 'green' : 'grey')}</div>
    <div class="claim">${esc(e.claim || '')}</div>
    <div class="meta">${esc(e.source || '')} · ${esc(e.publisher || '')} · conf ${e.confidence ?? '?'}%</div></div></details>`;
}