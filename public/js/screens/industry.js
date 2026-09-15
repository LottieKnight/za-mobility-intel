// industry.js — industry graph
import { DB } from '../data.js';
import { esc, badge, ktag } from '../util.js';

export function renderIndustry(view) {
  const I = DB.industry || {};

  view.innerHTML = `
  <h3 class="sec">Strategic findings</h3>
  <div class="row r2">
    ${(I.findings || []).map((f) => `
      <div class="tile"><div class="label">${badge(f.kind, f.kind === 'GAP-STRATEGIC' ? 'red' : f.kind === 'ASSET' ? 'green' : 'gold')}</div>
        <div class="small mt6">${esc(f.finding)}</div>
        <div class="foot mt6">confidence: ${esc(f.confidence)}</div></div>`).join('')}
  </div>

  <h3 class="sec">OEM & vehicle manufacturing</h3>
  <div class="panel"><div class="panel-bd flush">
    <table class="grid">
      <thead><tr><th>OEM</th><th>Facilities</th><th>Autonomy note</th><th>EV note</th><th>Status</th></tr></thead>
      <tbody>
        ${(I.oem || []).map((o) => `
          <tr>
            <td><b>${esc(o.name)}</b><div class="small dim">${esc(o.city)}</div></td>
            <td class="small">${esc((o.plants || []).join('; '))}</td>
            <td class="small dim">${esc(o.autonomyNote || '—')}</td>
            <td class="small dim">${esc(o.evNote || '—')}</td>
            <td>${ktag('estimated')}</td>
          </tr>`).join('')}
      </tbody>
    </table>
  </div></div>

  <h3 class="sec">Mining companies (first-class domain)</h3>
  <div class="panel"><div class="panel-bd flush">
    <table class="grid">
      <thead><tr><th>Company</th><th>Sites</th><th>Autonomy position</th><th>Validation needed</th></tr></thead>
      <tbody>
        ${(I.miningCos || []).map((m) => `
          <tr>
            <td><b>${esc(m.name)}</b></td>
            <td class="small dim">${esc((m.sites || []).join('<br/>'))}</td>
            <td class="small">${esc(m.autonomyNote || '—')}</td>
            <td>${ktag(m.confidence || 'estimated')}</td>
          </tr>`).join('')}
      </tbody>
    </table>
  </div></div>

  <div class="row r2 mt10">
    <div class="panel">
      <div class="panel-hd"><span class="t">Mining autonomy technology suppliers</span></div>
      <div class="panel-bd">${(I.miningTech || []).map((t) => `
        <div class="thing mt6"><div class="tt">${esc(t.name)}</div><div class="desc">${esc(t.note)}</div>
        <div class="meta">confidence: ${esc(t.confidence)}</div></div>`).join('')}</div>
    </div>
    <div class="panel" style="flex:1">
      <div class="panel-hd"><span class="t">Logistics & ports</span></div>
      <div class="panel-bd">${(I.logistics || []).map((t) => `
        <div class="thing mt6"><div class="tt">${esc(t.name)}</div><div class="desc">${esc(t.note || '')}</div></div>`).join('')}</div>
    </div>
  </div>

  <div class="row r2 mt10">
    <div class="panel">
      <div class="panel-hd"><span class="t">Telecommunications & connectivity</span></div>
      <div class="panel-bd">${(I.telecoms || []).map((t) => `
        <div class="thing mt6"><div class="tt">${esc(t.name)}</div><div class="desc">${esc(t.note || '')}</div></div>`).join('')}</div>
    </div>
    <div class="panel">
      <div class="panel-hd"><span class="t">Energy & electrification</span></div>
      <div class="panel-bd">${(I.energy || []).map((t) => `
        <div class="thing mt6"><div class="tt">${esc(t.name)}</div><div class="desc">${esc(t.note || '')}</div></div>`).join('')}</div>
    </div>
  </div>

  <h3 class="sec">Ecosystem gaps (industry layer)</h3>
  <div class="panel"><div class="panel-bd flush">
    <table class="grid">
      <thead><tr><th>Gap</th><th>SA state</th><th>Action</th></tr></thead>
      <tbody>
        ${(I.gaps || []).map((g) => `
          <tr><td class="small"><b>${esc(g.gap)}</b></td>
          <td>${ktag(g.saState ? g.saState.replace(/-/g, ' ').toLowerCase() : 'unknown')}</td>
          <td class="small dim">${esc(g.action || '')}</td></tr>`).join('')}
      </tbody>
    </table>
  </div></div>
  `;
}