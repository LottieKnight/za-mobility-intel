// strategy.js — decision strategy, foresight, partnerships, pilot generator
import { DB } from '../data.js';
import { esc, badge, ktag } from '../util.js';

export function renderStrategy(view) {
  const S = DB.strategy || {};

  view.innerHTML = `
  <h3 class="sec">Entry strategy — four lanes</h3>
  <div class="row r4">
    ${(S.entryStrategy?.sequence || []).map((l) => `
      <div class="panel"><div class="panel-hd"><span class="t">${esc(l.lane)}</span><span class="free">capital ${esc(l.capital)}</span></div>
        <div class="panel-bd small">
          <div class="mono gold small mb6">STEP ${l.step}</div>
          ${(l.moves || []).map((m) => `<div class="dim" style="margin:3px 0">· ${esc(m)}</div>`).join('')}
          <div class="muted">${esc(l.logic)}</div>
        </div></div>`).join('')}
  </div>

  <h3 class="sec">Decision engine — what should we do?</h3>
  <div class="row r3">
    <div class="tile gold"><div class="label">Now (this week)</div><div class="small mt6">${esc(S.doNow || '')}</div></div>
    <div class="tile"><div class="label">This month</div><div class="small mt6">${esc(S.doThisMonth || '')}</div></div>
    <div class="tile"><div class="label">This quarter</div><div class="small mt6">${esc(S.doThisQuarter || '')}</div></div>
  </div>

  <h3 class="sec">Strategic foresight — six scenarios</h3>
  <div class="panel"><div class="panel-bd flush">
    <table class="grid">
      <thead><tr><th>Scenario</th><th class="center">P(EST)</th><th>Drivers</th><th>Blockers</th><th>Winners</th><th>Losers</th><th>Actions now</th></tr></thead>
      <tbody>
        ${(S.foresight || []).map((f) => `<tr>
          <td class="small"><b>${esc(f.scenario)}</b></td>
          <td class="center num">${esc(f.probPct)}%</td>
          <td class="small dim">${esc((f.drivers || []).join('; '))}</td>
          <td class="small dim">${esc((f.blockers || []).join('; '))}</td>
          <td class="small dim">${esc((f.winners || []).join('; '))}</td>
          <td class="small dim">${esc((f.losers || []).join('; '))}</td>
          <td class="small dim">${esc(f.actions || '')}</td></tr>`).join('')}
      </tbody>
    </table>
    <div class="panel-bd small muted">Probabilities are expert-judgement placeholders (ESTIMATED) and must be revised with evidence.</div>
  </div></div>

  <h3 class="sec">Africa-first strategy</h3>
  <div class="row r2">
    <div class="panel"><div class="panel-hd"><span class="t">Market entry sequence</span></div>
      <div class="panel-bd">
        ${(S.africaFirst?.sequence || []).map((m) => `
          <div class="thing mt6"><div class="tt">${esc(m.market)} <span class="badge gold">${esc(m.role)}</span></div>
            <div class="small dim mt6">${esc(m.rationale)}</div></div>`).join('')}
      </div></div>
    <div class="panel"><div class="panel-hd"><span class="t">Export categories</span></div>
      <div class="panel-bd">
        <div class="tags">${(S.africaFirst?.exportCategories || []).map((x) => `<span class="tag">${esc(x)}</span>`).join('')}</div>
        <div class="small dim mt6" style="color:#e8c15a">${esc(S.africaFirst?.thesis || '')}</div>
      </div></div>
  </div>

  <h3 class="sec">Partnership discovery engine</h3>
  <div class="row r2">
    ${(S.partnershipCore || []).map((p) => `
      <div class="thing"><div class="tt">${esc(p.partner)}</div>
      <div class="kv mt6" style="grid-template-columns:100px 1fr">
        <span class="k">Why</span><span class="v small">${esc(p.why)}</span>
        <span class="k">They gain</span><span class="v small">${esc(p.theyGain)}</span>
        <span class="k">We gain</span><span class="v small">${esc(p.weGain)}</span>
        <span class="k">MVP</span><span class="v small">${esc(p.mvp)}</span>
      </div></div>`).join('')}
  </div>

  <h3 class="sec">Personal strategic layer</h3>
  <div class="panel"><div class="panel-bd">
    <div class="kv" style="grid-template-columns:180px 1fr">
      <span class="k">Current capabilities</span><span class="v">${esc((S.personalLayer?.currentCapabilities || []).join(' · '))}</span>
      <span class="k">Missing capabilities</span><span class="v">${esc((S.personalLayer?.missingCapabilities || []).join(' · '))}</span>
      <span class="k">Assets</span><span class="v">${esc((S.personalLayer?.assets || []).join(' · '))}</span>
      <span class="k">Capital constraint</span><span class="v">${esc(S.personalLayer?.capitalConstraint || '')}</span>
    </div>
    <div class="tile warn mt10"><div class="label">Highest-leverage next move</div>
      <div class="small mt6">${esc(S.personalLayer?.highestLeverageNextMove || '')}</div></div>
  </div></div>

  <h3 class="sec">Pilot generator template</h3>
  <div class="panel"><div class="panel-bd flush">
    <table class="grid">
      <tbody>
        ${Object.entries(S.pilotTemplate || {}).map(([k, v]) => `<tr>
          <td class="k" style="width:150px">${esc(k)}</td>
          <td class="v small">${v instanceof Array ? v.map((x) => '<span class="tag">' + esc(x) + '</span>').join(' ') : esc(v)}</td></tr>`).join('')}
      </tbody>
    </table>
    <div class="panel-bd small muted">Estimated capital values are labelled ESTIMATE; never present modelled ranges as quotes.</div>
  </div></div>
  `;
}