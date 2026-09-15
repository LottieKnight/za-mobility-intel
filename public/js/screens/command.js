// command.js — national command centre
import { DB } from '../data.js';
import { samri, MATURITY, CYBER_SCORE } from '../scoring.js';
import { esc, statTile, meterRow, dial, badge, ktag, heat, confBar, soWhat, pct } from '../util.js';

export function renderCommand(view) {
  const S = samri();
  const alerts = (DB.alerts?.alerts || []).slice().sort((a, b) => levelOf(b) - levelOf(a));
  const min = S.rows.filter((r) => r.value != null).sort((a, b) => a.value - b.value)[0];
  const max = S.rows.filter((r) => r.value != null).sort((a, b) => b.value - a.value)[0];

  view.innerHTML = `
  <h3 class="sec">South African Autonomous Mobility Readiness Index (SAMRI)</h3>
  <div class="row r32">
    <div class="panel">
      <div class="panel-hd"><span class="t">National readiness</span>
        <span class="free">${ktag('estimated')} base inputs · ${S.coverage}% factor coverage</span></div>
      <div class="panel-bd" style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
        ${dial(S.score, S.confidence, 'SAMRI')}
        <div style="flex:1;min-width:280px">
          ${meterCols(S.rows)}
          <div class="small mt10 dim">Score produced from ${S.rows.length} weighted components. Every component is currently an <b>expert-judgement estimate</b>; replace each with primary data as ingestion proceeds. Weightings are operator-adjustable in Corridors/Readiness tools.</div>
        </div>
      </div>
    </div>
    <div class="tile">
      <div class="label">Interpreting this number</div>
      <div class="small mt6">
        <div class="kv mt6">
          <span class="k">Confidence</span><span class="v">${S.confidence}/100 (discounted for estimate share)</span>
          <span class="k">Trend</span><span class="v">First measurement — previous score not yet recorded</span>
          <span class="k">Primary weakness</span><span class="v">${min ? `${esc(min.label)} (${min.value}) — ${esc(min.note)}` : '—'}</span>
          <span class="k">Primary asset</span><span class="v">${max ? `${esc(max.label)} (${max.value}) — ${esc(max.note)}` : '—'}</span>
          <span class="k">Required intervention</span><span class="v">Regulatory activation + data ingestion + corridor/mine pilot evidence</span>
          <span class="k">Methodology</span><span class="v">Weighted readiness per spec §8; weights adjustable; missing factors excluded; coverage shown.</span>
        </div>
      </div>
    </div>
  </div>

  <h3 class="sec">National autonomy maturity curve</h3>
  <div class="row r2">
    <div class="panel">
      <div class="panel-bd">${MATURITY.map((m) => maturityRow(m)).join('')}</div>
      <div class="panel-bd flush" style="padding-top:0">${maturityBar(MATURITY)}</div>
    </div>
    <div>
      <div class="tile warn">
        <div class="label">Road-safety as the strategic driver</div>
        <div class="value sm num hl-red">11,485 <span class="unit">fatalities / yr</span></div>
        <div class="foot">RTMC 2025 (brief-sourced) · 9,734 fatal crashes · 45% pedestrians · Gauteng ~20%</div>
        ${soWhat('Every autonomy pilot should be framed as a safety intervention targeted at measured exposure. Pedestrian-exposure concentration is the map we have not yet coloured in.')}
      </div>
      <div class="tile mt10">
        <div class="label">Derived national metrics</div>
        ${(DB.roadSafety?.national?.derived || []).map((d) => `
          <div class="heatbar-row" style="justify-content:space-between"><span class="lk" style="width:auto;flex:1">${esc(d.label)}</span>
          <span class="val hl-amber" style="width:auto">${esc(d.value)}</span></div>`).join('')}
        <div class="muted small mt6">${DB.roadSafety?.national?.evidence?.[0]?.note || ''}</div>
      </div>
    </div>
  </div>

  <h3 class="sec">Fleet cybersecurity readiness ${ktag('estimated')} — modelled placeholder</h3>
  <div class="row r2">
    <div class="tile" style="border-color:var(--orange-dim)">
      <div class="label">Cyber posture score</div>
      <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
        ${dial(CYBER_SCORE.score, 40, 'CYBER')}
        <div class="small dim" style="flex:1;min-width:220px">${esc(CYBER_SCORE.note)} There is no measured SA AV/connected-fleet cyber baseline; this is a model-derived placeholder for directional awareness, not a security assessment. Ingest real penetration-test and incident data to replace it.</div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-hd"><span class="t">Attack-surface scoring</span><span class="free">${ktag('estimated')}</span></div>
      <div class="panel-bd">${CYBER_SCORE.components.map((c) => `
        <div class="meter"><span class="lk" style="width:140px">${esc(c.label)}</span>
          <span class="track"><span class="fill" style="width:${c.v}%;background:${heat(c.v)}"></span></span>
          <span class="val">${c.v}</span></div>`).join('')}</div>
    </div>
  </div>

  <h3 class="sec">Alarm board</h3>
  <div class="panel"><div class="panel-bd">
    ${alerts.map((a) => alertRow(a)).join('')}
  </div></div>

  <h3 class="sec">Recommended action stream</h3>
  <div class="row r3">
    ${actionCard('This week', DB.strategy?.doNow, 'gold')}
    ${actionCard('This month', DB.strategy?.doThisMonth, 'blue')}
    ${actionCard('This quarter', DB.strategy?.doThisQuarter, 'green')}
  </div>

  <h3 class="sec">Highest-leverage next move</h3>
  <div class="tile" style="border-color:var(--amber-dim)">
    <div class="small">${esc(DB.strategy?.personalLayer?.highestLeverageNextMove || '')}</div>
  </div>
  `;
}

function meterCols(rows) {
  return rows.map((r) => {
    const srcT = r.value == null ? '' : ktag(r.src);
    return `<div class="meter"><span class="lk">${esc(r.label)}</span>
      <span class="track"><span class="fill" style="width:${r.value == null ? 0 : r.value}%;background:${heat(r.value)}"></span></span>
      <span class="val">${r.value == null ? '\u2205' : r.value}${srcT ? '' : ''}</span>${srcT ? `<span style="flex:none">${srcT}</span>` : ''}</div>`;
  }).join('');
}

function maturityRow(m) {
  const blocks = Math.round(m.v / 10);
  return `<div class="meter"><span class="lk" style="width:130px">${esc(m.dim)}</span>
    <span class="track"><span class="fill" style="width:${m.v}%;background:${heat(m.v)}"></span></span>
    <span class="val">${m.v}</span> <span style="font-size:9px;color:var(--ink-faint)">${esc(m.src)}</span></div>`;
}

function maturityBar(M) {
  const cols = M.map((m) => `<div class="bar" style="height:${m.v}%"><span class="lb">${m.v}</span><span class="lb" style="top:auto;bottom:-14px">${esc(m.dim.slice(0, 4)).toUpperCase()}</span></div>`).join('');
  return `<div class="bars" style="height:110px">${cols}</div>`;
}

function alertRow(a) {
  const lvl = { RED: 'red', ORANGE: 'orange', YELLOW: 'yellow', BLUE: 'blue' }[a.level] || 'grey';
  return `<div class="alert ${lvl}">
    <span class="date">${esc(a.date)}</span>
    <div class="body">
      <div class="tt">${esc(a.title)}</div>
      <div class="dd">${esc(a.body)}</div>
      <div class="so">Therefore: ${esc(a.soWhat)}</div>
      <div class="tags mt6">${badge(a.level)}${badge(a.source, 'grey')}<span class="tag">conf ${a.confidence}%</span></div>
    </div>
  </div>`;
}

function actionCard(title, body, cls) {
  return `<div class="panel"><div class="panel-hd"><span class="t">${esc(title)}</span></div>
    <div class="panel-bd small">${body ? esc(body) : '<span class="muted">Not specified.</span>'}</div></div>`;
}

function levelOf(a) { return { RED: 4, ORANGE: 3, YELLOW: 2, BLUE: 1 }[a.level] || 0; }