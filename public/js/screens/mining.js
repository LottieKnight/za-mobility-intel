// mining.js — mining autonomy (first-class domain)
import { DB } from '../data.js';
import { esc, badge, heatRow, ktag } from '../util.js';

export function renderMining(view) {
  const M = DB.mining || {};

  view.innerHTML = `
  <h3 class="sec">Why mining is first-class for SA autonomy</h3>
  <div class="tile" style="border-color:var(--gold)">${esc(M.thesis || '')}</div>

  <h3 class="sec">Mine-site autonomy readiness map (${(M.sites || []).length} sites)</h3>
  <div class="panel"><div class="panel-bd flush">
    <table class="grid">
      <thead><tr><th>Site</th><th>Commodity</th><th>Province</th><th>Autonomy status</th><th>Readiness</th><th>Notes</th></tr></thead>
      <tbody>
        ${(M.sites || []).map((s) => `
          <tr>
            <td><b>${esc(s.name)}</b></td>
            <td>${badge(s.commodity || '', 'grey')}</td>
            <td class="small">${esc(s.province)}</td>
            <td class="small">${esc(s.autonomy || '—')}</td>
            <td style="min-width:150px">${heatRow('', s.readiness)}
              <div class="small dim">${s.readinessSrc || ''} · score</div></td>
            <td class="small dim">${esc(s.notes || '')}</td>
          </tr>`).join('')}
      </tbody>
    </table>
  </div></div>

  <div class="row r2 mt10">
    <div class="panel">
      <div class="panel-hd"><span class="t">SA capability ladder</span></div>
      <div class="panel-bd">
        ${(M.capabilityLadder || []).map((c) => `
          <div class="meter"><span class="lk" style="width:220px">${esc(c.name)}</span>
            <span class="track"><span class="fill" style="width:${stageWidth(c.stage, c.saState)}%;background:${stageColor(c.saState)}"></span></span>
            <span class="val" style="font-size:9px;color:var(--ink-faint)">${esc(c.saState)}</span></div>`).join('')}
      </div>
    </div>
    <div>
      <div class="panel">
        <div class="panel-hd"><span class="t">Metrics to track</span></div>
        <div class="panel-bd">
          ${(M.metricsToTrack || []).map((m) => `<div class="small dim">· ${esc(m)}</div>`).join('')}
        </div>
      </div>
      <div class="panel mt10">
        <div class="panel-hd"><span class="t">Global technology leaders</span></div>
        <div class="panel-bd">
          <div class="tags">${(M.globalLeaders || []).map((g) => `<span class="tag" style="font-size:10.5px">${esc(g)}</span>`).join('')}</div>
          <div class="small dim mt6">${ktag('estimated')} supplier/engagement status verified on a site-by-site basis during contact strategy.</div>
        </div>
      </div>
    </div>
  </div>
  `;
}

function stageWidth(stage, state) {
  const map = { WIDESPREAD: 92, DEPLOYED: 75, 'DEPLOYED AT SCALE GLOBALLY; SA AT MOGALAKWENA (VERIFY SCALE)': 60, EMERGING: 40, LIMITED: 22 };
  return map[state] ?? ((stage || 1) * 18);
}
function stageColor(state) {
  if (state.startsWith('WIDESPREAD') || state.startsWith('DEPLOYED AT SCALE')) return '#35c480';
  if (state === 'DEPLOYED') return '#4a9be0';
  if (state === 'EMERGING') return '#e8c15a';
  if (state === 'LIMITED') return '#f08f3c';
  return '#7c8ba5';
}