// world.js — South Africa vs world, competitive intelligence
import { DB } from '../data.js';
import { esc, badge, ktag, heatRow } from '../util.js';

export function renderWorld(view) {
  const I = DB.international || {};

  view.innerHTML = `
  <h3 class="sec">Global leaders — what implies what for SA</h3>
  <div class="panel"><div class="panel-bd flush">
    <table class="grid">
      <thead><tr><th>Company</th><th>Category</th><th>Operating domain</th><th>Position note</th><th>SA implication</th></tr></thead>
      <tbody>
        ${(I.leaders || []).map((l) => `<tr>
          <td class="small"><b>${esc(l.name)}</b></td>
          <td>${badge(l.category, 'blue')}</td>
          <td class="small dim" style="max-width:220px">${esc(l.oddc || '')}</td>
          <td class="small dim">${esc(l.note || '')}</td>
          <td class="small" style="max-width:240px">${esc(l.saImplication || '')}</td></tr>`).join('')}
      </tbody>
    </table>
    <div class="panel-bd small muted">Deployments change fast — re-verify each row at use time. ${ktag('estimated')} statuses.</div>
  </div></div>

  <h3 class="sec">South Africa vs world — autonomy gap analysis</h3>
  <div class="panel"><div class="panel-bd flush">
    <table class="grid">
      <thead><tr><th>Market</th><th>Notable strengths</th><th>SA advantage</th><th>SA disadvantage</th><th>Gap type</th><th>Emerging opportunity</th></tr></thead>
      <tbody>
        ${(I.governmentCountries || []).map((c) => `<tr>
          <td class="small"><b>${esc(c.country)}</b></td>
          <td class="small dim">${esc((c.areas || []).join('; '))}</td>
          <td class="small" style="color:#8ef0c4">${esc(c.advantage || '—')}</td>
          <td class="small" style="color:#ffb3ab">${esc(c.disadvantage || '—')}</td>
          <td class="small dim">${esc(c.gapForSA || '—')}</td>
          <td class="small dim">${esc(c.emergingOpportunity || '—')}</td></tr>`).join('')}
      </tbody>
    </table>
  </div></div>

  <h3 class="sec">Strategic position summary</h3>
  <div class="row r2">
    <div class="panel"><div class="panel-hd"><span class="t">Advantages</span></div>
      <div class="panel-bd small">${(I.southAfricaGapAnalysis?.advantages || []).map((a) => `<div class="dim">· ${esc(a)}</div>`).join('')}</div></div>
    <div class="panel"><div class="panel-hd"><span class="t">Disadvantages</span></div>
      <div class="panel-bd small">${(I.southAfricaGapAnalysis?.disadvantages || []).map((a) => `<div class="dim">· ${esc(a)}</div>`).join('')}</div></div>
  </div>
  <div class="row r1 mt10">
    <div class="panel"><div class="panel-hd"><span class="t">Recommendations</span></div>
      <div class="panel-bd small">
        <div class="kv" style="grid-template-columns:20px 1fr">${(I.southAfricaGapAnalysis?.recommendations || []).map((r, i) => `<span class="k">${i + 1}</span><span class="v">${esc(r)}</span>`).join('')}</div>
      </div></div>
  </div>
  `;
}