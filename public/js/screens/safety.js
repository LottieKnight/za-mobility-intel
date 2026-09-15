// safety.js — autonomous safety command centre
import { DB } from '../data.js';
import { CYBER_SCORE } from '../scoring.js';
import { esc, badge, ktag, statTile, heat } from '../util.js';

export function renderSafety(view) {
  const RS = DB.roadSafety || {};
  const SM = DB.safetyMetrics || {};
  const nat = RS.national || {};

  view.innerHTML = `
  <h3 class="sec">National road-safety intelligence</h3>
  <div class="row r4">
    ${statTile({ label: 'Road fatalities (yr)', value: nat.fatalities.toLocaleString ? nat.fatalities.toLocaleString('en-ZA') : nat.fatalities, foot: 'RTMC 2025 · brief-sourced', cls: 'danger' })}
    ${statTile({ label: 'Fatal crashes', value: nat.fatalCrashes.toLocaleString ? nat.fatalCrashes.toLocaleString('en-ZA') : nat.fatalCrashes, foot: '', cls: 'danger' })}
    ${statTile({ label: 'Pedestrian share', value: nat.pedestrianSharePct + '%', foot: 'among the highest world-wide', cls: 'warn' })}
    ${statTile({ label: 'Gauteng share', value: nat.gautengSharePct + '%', foot: 'dense metro arterials', cls: 'warn' })}
  </div>

  <div class="row r2 mt10">
    <div class="panel">
      <div class="panel-hd"><span class="t">From statistics to causal opportunity engine</span></div>
      <div class="panel-bd">
        ${(RS.causalDomains || []).map((d) => `
          <div class="thing mt6">
            <div class="tt">${esc(d.domain)} <span class="badge ${d.state === 'OK' ? 'green' : d.state === 'PARTIAL' ? 'yellow' : 'grey'}">${esc(d.state)}</span></div>
            <div class="small dim mt6">Signal: ${esc(d.signal || '')}</div>
            <div class="small mt6" style="color:#e8c15a">Opportunity: ${esc(d.opportunity || '')}</div>
            <div class="small muted mt6">Risk: ${esc(d.risk || '')}</div>
          </div>`).join('')}
      </div>
    </div>
    <div>
      <div class="panel">
        <div class="panel-hd"><span class="t">Provincial breakdown</span><span class="free">Gauteng verified from brief; rest = data gap</span></div>
        <div class="panel-bd flush">
          <table class="grid">
            <thead><tr><th>Province</th><th class="num">Share</th><th>State</th><th>Note</th></tr></thead>
            <tbody>
              ${(RS.province || []).map((p) => `<tr>
                <td class="small"><b>${esc(p.province)}</b></td>
                <td class="num">${p.sharePct == null ? '\u2205' : p.sharePct + '%'}</td>
                <td>${ktag(String((p.src || 'unknown').toLowerCase().replace('verified-from-brief', 'verified')))}</td>
                <td class="small dim">${esc(p.note || '')}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="tile mt10">
        <div class="label">Derived national metrics</div>
        ${(nat.derived || []).map((d) => `<div class="heatbar-row"><span class="lk" style="flex:1">${esc(d.label)}</span><span class="val hl-amber">${esc(d.value)}</span></div>`).join('')}
      </div>
    </div>
  </div>

  <h3 class="sec">Autonomous-system safety command centre</h3>
  <div class="tile" style="border-color:var(--red-dim)">
    <div class="small">No SA autonomous-system safety data exists yet. The metrics below are <b>schema</b> — every field shows its required dataset and current MISSING state. No metric is ever presented without source, methodology, sample size, confidence and test conditions.</div>
  </div>
  <div class="panel mt10"><div class="panel-bd flush">
    <table class="grid">
      <thead><tr><th>Metric</th><th class="num">Value</th><th>State</th><th>Required to activate</th></tr></thead>
      <tbody>
        ${(SM.adsSafetyMetrics?.metrics || []).map((m) => `<tr>
          <td class="small"><b>${esc(m.label)}</b><div class="mono small dim">${esc(m.key)}</div></td>
          <td class="num">${m.value == null ? '\u2205' : m.value}</td>
          <td>${ktag(m.state || 'missing')}</td>
          <td class="small dim">${esc(m.needed || '')}</td></tr>`).join('')}
      </tbody>
    </table>
  </div></div>

  <div class="row r2 mt10">
    <div class="tile">
      <div class="label">National safety intervention model</div>
      ${(SM.nationalSafetyModel?.interventions || []).map((i) => `
        <div class="thing mt6"><div class="tt">${esc(i.lever)} <span class="badge ${i.maturity === 'commercial-now' ? 'green' : i.maturity === 'pilot-ready-on-private-land' ? 'gold' : 'blue'}">${esc(i.maturity)}</span></div>
          <div class="small dim mt6">${esc(i.fit)}</div>
          <div class="small muted">evidence: ${esc(i.evidence || '—')}</div></div>`).join('')}
    </div>
    <div class="panel">
      <div class="panel-hd"><span class="t">Disengagement framework — proposed standard</span></div>
      <div class="panel-bd small dim">${esc(SM.disengagementFramework?.definition || '')} <span class="badge gold">PROPOSED</span></div>
      <div class="panel-hd"><span class="t">Fleet cybersecurity ${ktag('estimated')}</span></div>
      <div class="panel-bd">
        <div class="meter"><span class="lk" style="width:110px">Cyber posture</span>
          <span class="track"><span class="fill" style="width:${CYBER_SCORE.score}%;background:${heat(CYBER_SCORE.score)}"></span></span>
          <span class="val">${CYBER_SCORE.score}</span></div>
        <div class="tags mt6">${CYBER_SCORE.components.map((c) => `<span class="tag" style="font-size:10px">${esc(c.label)} ${c.v}</span>`).join('')}</div>
        <div class="small muted mt6">Model-derived placeholder — no measured SA baseline. A compromised fleet is a safety event; cyber posture belongs in the safety command centre.</div>
      </div>
      <div class="panel-hd"><span class="t">Data ingestion path (crash intelligence)</span></div>
      <div class="panel-bd small dim">
        ${(RS.ingestionPath || []).map((x) => `<div>· ${esc(x)}</div>`).join('')}
      </div>
    </div>
  </div>
  `;
}