// corridors.js — corridor autonomy readiness engine + digital road twin
import { DB } from '../data.js';
import { corridorScore } from '../scoring.js';
import { esc, badge, ktag, heat, confBar } from '../util.js';

const meta = () => DB.corridors?.factorMeta || [];
const DEFAULT_W = () => {
  const m = meta();
  const base = 100 / m.length;
  const o = {};
  m.forEach((f) => (o[f.key] = base));
  return o;
};

export function renderCorridors(view) {
  view.innerHTML = `
    <h3 class="sec">Corridor Autonomy Readiness Engine</h3>
    <div class="row r32">
      <div>
        <div class="panel">
          <div class="panel-hd"><span class="t">Corridor ranking</span>
            <span class="free">scores recompute with factor weights · all inputs ESTIMATED until primary data ingested</span></div>
          <div class="panel-bd flush"><div id="corrTable"></div></div>
        </div>
        <div class="panel mt10">
          <div class="panel-hd"><span class="t">Digital Road Twin — segment schema</span>
            <span class="free">every important road becomes a digital object</span></div>
          <div class="panel-bd" style="font-family:var(--mono);font-size:10.5px;line-height:1.7">
            <pre style="margin:0;color:var(--ink-dim)"><code>Road Segment
├── geometry            (lat/lon, alignment — schematic today)
├── traffic              MISSING → RTMC/SANRAL/licensed telematics
├── speed                MISSING → field measurement
├── road classification  VERIFIED (N-road refs)
├── surface              PARTIAL (estimated)
├── elevation/curvature  MISSING → DTM data
├── weather              PARTIAL → SAWS
├── incidents/crashes    MISSING → RTMC crash DB
├── infrastructure       PARTIAL (toll/charging estimates)
├── signs/signals        MISSING → field survey
├── pedestrian activity  MISSING → the critical dataset
├── vehicle mix          PARTIAL (freight estimates)
├── connectivity         MISSING → telecom coverage tbds
├── charging             PARTIAL (estimated)
├── mapping              MISSING → HD map/localisation program
├── autonomy readiness   COMPUTED (engine below)
├── historical perf      MISSING → ops log
├── simulation scenarios PHASE-4 → CARLA/SUMO
└── confidence score     SHOWN (coverage-weighted)</code></pre>
          </div>
        </div>
      </div>
      <div>
        <div class="panel">
          <div class="panel-hd"><span class="t">Factor weights (operator-adjustable)</span>
            <span class="free"><a href="javascript:void(0)" id="wReset">reset</a></span></div>
          <div class="panel-bd tune" id="tuner"></div>
          <div class="panel-hd" style="border-top:1px solid var(--line)"><span class="t">Coverage legend</span></div>
          <div class="panel-bd small dim">
            ${ktag('verified')} primary data &middot; ${ktag('estimated')} expert judgement &middot;
            ${ktag('inferred')} derived &middot; ${ktag('missing')} no data (excluded, shown as &#8709;)
            <div class="mt6">Readiness per factor = value (if &lsquo;+&rsquo;) or 100-value (if inverted, e.g. crash density, pedestrian exposure, weather risk). Higher score = more suitable for autonomy.</div>
            <div class="mt6">All numeric inputs are marked ESTIMATED. Replace with field / RTMC / SANRAL / telematics data as it loads &mdash; the engine recomputes and confidence rises.</div>
          </div>
        </div>
      </div>
    </div>`;

  const weights = DEFAULT_W();
  renderTable(weights);
  renderTuner(weights);
  document.getElementById('wReset').addEventListener('click', () => renderCorridors(view));
}

function renderTable(weights) {
  const corrs = DB.corridors?.corridors || [];
  const scored = corrs.map((c) => ({ c, r: corridorScore(c, weights) }));
  scored.sort((a, b) => (b.r.score ?? -999) - (a.r.score ?? -999));

  const head = `<thead><tr>
    <th>Corridor</th><th class="num">Readiness</th><th>Conf</th><th>Cov</th>
    <th>Weakest factor</th><th>Strongest factor</th><th>Assessment</th></tr></thead>`;

  const rows = scored.map(({ c, r }) => `
    <tr>
      <td><b>${esc(c.ref)}</b><div class="small dim">${esc(c.name)}</div><div class="tags mt6">${c.provinces.map((p) => `<span class="tag">${esc(p)}</span>`).join('')}</div></td>
      <td class="num"><b class="num" style="color:${heat(r.score)};font-size:16px">${r.score == null ? '\u2205' : r.score}</b></td>
      <td>${confBar(r.confidence)}<div class="small muted center">${r.confidence ?? '—'}</div></td>
      <td class="center num">${r.coverage}%</td>
      <td class="small">${r.weakestLabel ? esc(r.weakestLabel) : '—'}</td>
      <td class="small">${r.strongestLabel ? esc(r.strongestLabel) : '—'}</td>
      <td class="small dim">${esc(c.assessment || '')}</td>
    </tr>`).join('');

  document.getElementById('corrTable').innerHTML = `<table class="grid">${head}<tbody>${rows}</tbody></table>`;

  // factor detail below
  const detail = scored.map(({ c, r }) => {
    const factorRows = (r.rows || []).filter((x) => true).map((f) => {
      const col = f.v == null ? '#56627a' : heat(f.readiness ?? f.v);
      return `<td class="small num" style="text-align:left"><span class="heat" style="display:inline-block;vertical-align:middle"><span style="display:block;width:${f.v == null ? 0 : (f.readiness ?? f.v)}px;max-width:60px;height:6px;background:${col};border-radius:2px"></span></span>
        <span style="color:${col}">${f.readiness ?? '\u2205'}</span> ${f.src === 'MISSING' ? ktag('missing') : ktag(f.src)}</td>`;
    }).join('');
    return `<tr><td colspan="7" style="background:#0d1420">
      <details>
        <summary style="cursor:pointer" class="small gold">Factor inputs — ${esc(c.ref)} (${c.lengthKm} km ${ktag(c.lengthSrc)})</summary>
        <table class="grid mt10">${head.replace('Assessment', 'Route')}<tbody>
          <tr>${factorRows}</tr>
          <tr><td colspan="7" class="small dim">${esc(c.route)}</td></tr>
        </tbody></table>
      </details>
    </td></tr>`;
  }).join('');
  document.getElementById('corrTable').innerHTML += `<table class="grid" style="margin-top:4px"><tbody>${detail}</tbody></table>`;
}

function renderTuner(weights) {
  const tuner = document.getElementById('tuner');
  tuner.innerHTML = meta().map((f) => `
    <div class="tw"><span class="nm" title="${esc(f.label)} · direction ${f.dir}">${esc(f.label)}</span>
      <input type="range" min="0" max="30" step="0.5" value="${weights[f.key]}" data-k="${f.key}"/>
      <span class="num" style="width:34px;color:var(--gold)">${weights[f.key].toFixed(1)}</span></div>`).join('');
  tuner.querySelectorAll('input').forEach((i) =>
    i.addEventListener('input', () => {
      const nw = { ...weights, [i.dataset.k]: +i.value };
      renderTable(nw);
      renderTunerVals(nw);
    }));
}

function renderTunerVals(weights) {
  document.querySelectorAll('#tuner .tw').forEach((row) => {
    const k = row.querySelector('input').dataset.k;
    row.querySelector('.num').textContent = weights[k].toFixed(1);
  });
}