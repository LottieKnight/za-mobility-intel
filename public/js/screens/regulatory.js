// regulatory.js — regulatory command + legal evidence engine
import { DB } from '../data.js';
import { esc, badge, evBlock, pipe, ktag, tierTag } from '../util.js';

export function renderRegulatory(view) {
  const R = DB.regulation || {};
  const instruments = R.instruments || [];
  const catCls = { LAW: 'red', REGULATION: 'orange', POLICY: 'blue', STRATEGY: 'grey', 'GOVERNMENT STATEMENT': 'gold' };

  view.innerHTML = `
  <h3 class="sec">Current legal position — evidence engine verdict</h3>
  <div class="tile">
    <div class="small">
      Current evidence indicates there is <b>no gazetted comprehensive automated-driving legislation</b> in South Africa.
      The Department of Transport has identified development of a legislative framework for autonomous vehicle technology as a priority
      &mdash; treat that as <b>direction and possible upcoming consultation</b>, not enacted law.
      Public-road autonomous operation remains legally unestablished under the National Road Traffic Act framework as at the tracker date.
    </div>
    <div class="small muted mt6">Verdict type: <b>INFERRED</b> from primary instruments listed below; re-verify against SAFLII/GPW before any reliance. This is intelligence, not legal advice.</div>
  </div>

  <div class="row r3 mt10">
    <div class="tile"><div class="label">Law vs policy separation</div>
      <div class="small mt6 dim">The tracker types each instrument distinctly:
        <b>law</b> (binding statute/regulation), <b>policy</b>/<b>strategy</b> (non-binding direction), <b>proposal</b>, <b>government statement</b>, <b>industry position</b>. Policy intention is never presented as actual law.</div></div>
    <div class="tile"><div class="label">Deadlines to watch</div>
      <div class="small mt6 dim">DoT AV-framework consultations; Road Safety Strategy revision; AARTO remedial legislation; POPIA guidance updates; WP.29 membership status.</div></div>
    <div class="tile"><div class="label">Status pipeline</div>
      <div class="small mt6 dim">${esc(R.pipeline ? R.pipeline.join(' → ') : '')}</div></div>
  </div>

  <h3 class="sec">Instruments (${instruments.length})</h3>
  <div class="panel"><div class="panel-bd flush">
    <table class="grid">
      <thead><tr><th>Instrument</th><th>Type</th><th>Status</th><th>AV relevance</th><th>Evidence & gaps</th></tr></thead>
      <tbody>
        ${instruments.map((i) => `
          <tr>
            <td><b>${esc(i.title)}</b>
              <div class="small dim">${esc(i.significance || '')}</div>
              <div class="small muted mt6">${esc(i.avGap || '')}</div></td>
            <td>${badge(i.category, catCls[i.category] || 'grey')}</td>
            <td>${pipe(i.status, R.pipeline)}<div class="small muted mt6">${esc(i.statusNote || '')}</div></td>
            <td>${badge(i.relevance, i.relevance === 'CRITICAL-TO-MONITOR' ? 'red' : i.relevance === 'DIRECT' ? 'orange' : i.relevance === 'DIRECT-DATA' ? 'blue' : 'grey')}</td>
            <td>
              <details><summary style="cursor:pointer" class="small gold">evidence trail (${(i.evidence || []).length})</summary>
                <div class="small mt6">${evBlock(i.evidence)}</div>
              </details>
              ${i.monitoringNotes ? `<div class="small muted mt6">${esc(i.monitoringNotes)}</div>` : ''}
            </td>
          </tr>`).join('')}
      </tbody>
    </table>
  </div></div>

  <h3 class="sec">Monitoring targets</h3>
  <div class="panel"><div class="panel-bd">
    <div class="tags">${(R.monitoringTargets || []).map((t) => `<span class="tag" style="font-size:10.5px">${esc(t)}</span>`).join('')}</div>
  </div></div>

  <h3 class="sec">Standards layer (kept separate from law)</h3>
  <div class="panel"><div class="panel-bd flush">
    <table class="grid">
      <thead><tr><th>Standard / framework</th><th>Edition</th><th>Status check</th><th>Scope</th><th>SA relevance</th></tr></thead>
      <tbody>
        ${(DB.standards?.standards || []).map((s) => `
          <tr><td><b>${esc(s.title)}</b></td><td class="small">${esc(s.edition || '—')}</td>
          <td>${badge(s.status || 'VERIFY-STATUS', s.status?.startsWith('VERIFY') ? 'yellow' : 'grey')}</td>
          <td class="small dim">${esc(s.scope || '')}</td><td class="small dim">${esc(s.saRelevance || '')}</td></tr>`).join('')}
      </tbody>
    </table>
    <div class="panel-bd small muted">${(DB.standards?.notes || []).join(' · ')}</div>
  </div></div>
  `;
}