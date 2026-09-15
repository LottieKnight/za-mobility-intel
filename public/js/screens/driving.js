// driving.js — driving intelligence (ontology, behaviour, ODD, scenarios)
import { DB } from '../data.js';
import { esc, badge, ktag } from '../util.js';

const CAT_CLS = { Ordinary: 'blue', Difficult: 'orange', Extreme: 'red', 'South African-Specific': 'gold' };
const LEVEL_CLS = { ordinary: 'blue', difficult: 'orange', extreme: 'red', sa: 'gold' };

export function renderDriving(view) {
  const D = DB.driving || {};
  const SC = DB.scenarios || {};

  view.innerHTML = `
  <h3 class="sec">Why a dedicated driving layer</h3>
  <div class="tile">
    <div class="small dim">Autonomous driving cannot import assumptions from clean, predictable road datasets. This layer holds a structured understanding of the SA driving world: the environment, markings, signs, traffic control, road users, behavioural variables and ODD envelopes. The ontology is a settled taxonomy; <b>all behaviour quantities are UNMEASURED</b> and must be statistically measured, never stereotyped.</div>
  </div>

  <h3 class="sec">Road environment ontology</h3>
  <div class="ont">
    ${(D.environment || []).concat(D.roadMarkings || []).concat(D.signs || []).concat(D.trafficControl || []).map((c) => ontCard(c)).join('')}
  </div>

  <h3 class="sec">Road users</h3>
  <div class="ont">${(D.roadUsers || []).map((c) => ontCard(c)).join('')}</div>

  <div class="row r2 mt10">
    <div class="panel">
      <div class="panel-hd"><span class="t">SA condition model</span></div>
      <div class="panel-bd kv" style="grid-template-columns:90px 1fr">
        ${Object.entries(D.conditions || {}).map(([k, v]) => `<span class="k">${esc(k)}</span><span class="v tags" style="display:flex;flex-wrap:wrap">${(v || []).map((x) => `<span class="tag">${esc(x)}</span>`).join('')}</span>`).join('')}
      </div>
    </div>
    <div class="panel">
      <div class="panel-hd"><span class="t">ODD model</span></div>
      <div class="panel-bd">
        <div class="small dim mb10">${esc(D.oddModel?.principle || '')}</div>
        <div class="tags mb10">${(D.oddModel?.dimensions || []).map((d) => `<span class="tag" style="font-size:10px">${esc(d)}</span>`).join('')}</div>
        ${Object.entries(D.oddModel?.exampleEnvelope || {}).map(([k, env]) => `
          <details class="mt6"><summary style="cursor:pointer" class="small gold">example envelope — ${esc(k)}</summary>
          <div class="panel-bd flush kv" style="grid-template-columns:110px 1fr;font-size:11px">${Object.entries(env).map(([a, b]) => `<span class="k">${esc(a)}</span><span class="v">${esc(b)}</span>`).join('')}</div></details>`).join('')}
      </div>
    </div>
  </div>

  <h3 class="sec">Driving behaviour model — statistical, not stereotyped</h3>
  <div class="panel"><div class="panel-bd flush">
    <table class="grid">
      <thead><tr><th>Behavioural variable</th><th>Measurement state</th><th>Measurement pathway</th></tr></thead>
      <tbody>
        ${(D.behaviouralVariables || []).map((b) => `
          <tr>
            <td class="small"><b>${esc(b.variable || b.principle || '—')}</b>
            ${b.principle ? `<div class="small mt6" style="color:#e8c15a">${esc(b.principle)}</div>` : ''}</td>
            <td>${ktag(String(b.state || 'unknown').toLowerCase())}</td>
            <td class="small dim">${esc(b.measurement || '—')}</td>
          </tr>`).join('')}
      </tbody>
    </table>
  </div></div>

  <h3 class="sec">Scenario library (${(SC.scenarios || []).length})</h3>
  <div class="panel"><div class="panel-bd">
    <div class="tags mb10" id="scFilt"></div>
    <table class="grid">
      <thead><tr><th>ID</th><th>Scenario</th><th>Cat</th><th>Severity</th><th>Location</th><th>Sensors needed</th><th>AI capability gap</th><th>Sim / validation</th></tr></thead>
      <tbody id="scBody"></tbody>
    </table>
  </div></div>

  <h3 class="sec">Simulation runner — GR Yaris scenario harness (Phase-3 engine)</h3>
  <div class="panel"><div class="panel-bd">
    <div class="row r2">
      <div>
        <label class="k">Scenario</label>
        <select id="simSc" class="ctl">${(SC.scenarios || []).map((s) => `<option value="${esc(s.id)}">${esc(s.id)} — ${esc(s.title)}</option>`).join('')}</select>
        <div class="mt6 kv" style="grid-template-columns:120px 1fr">
          <span class="k">Surface μ scale</span><span class="v"><input type="range" id="simMu" min="0.2" max="1" step="0.05" value="1" style="vertical-align:middle"/> <b id="simMuV" class="mono">1.00</b></span>
          <span class="k">Load factor</span><span class="v"><input type="range" id="simLoad" min="0" max="1" step="0.1" value="0" style="vertical-align:middle"/> <b id="simLoadV" class="mono">0.0</b></span>
          <span class="k">Seed</span><span class="v"><input type="number" id="simSeed" value="7" min="1" max="9999" class="ctl" style="width:90px"/></span>
        </div>
        <div class="mt6">
          <button class="btn gold" id="simRun">Run simulation</button>
          <button class="btn" id="simCommit" disabled>Commit simulation evidence → scenario library</button>
        </div>
        <div class="small dim mt6">
          Runs the NWU GR Yaris dynamic vehicle model (gears, clutch, μ-limited traction, campus economic map) with a scripted reference driver through the
          registered scenario. Outputs per-timestep telemetry (<code>scenes/telemetry/</code>) and honest derivation of whether the encounter was handled. All values are
          <b>MODEL-DERIVED</b> (synthetic scaffold for scenario acceptance) — never field measurements.
        </div>
      </div>
      <div>
        <div class="label">Run output</div>
        <div id="simOut" class="small dim">Select a scenario, set surface/load, then press Run. A green commit turns the scenario library's <b>sim status</b> to <code>simulated</code> with an evidence stub pointing at this telemetry.</div>
      </div>
    </div>
  </div></div>
  `;

  // scenario filter + render
  const cats = ['ALL', 'Ordinary', 'Difficult', 'Extreme', 'South African-Specific'];
  const filtEl = document.getElementById('scFilt');
  filtEl.innerHTML = cats.map((c) => `<span class="map-layer ${c === 'ALL' ? 'on' : ''}" data-c="${c}" style="cursor:pointer">${esc(c)}</span>`).join('');
  filtEl.querySelectorAll('[data-c]').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('#scFilt [data-c]').forEach((x) => x.classList.remove('on'));
    b.classList.add('on');
    renderScenarios(b.dataset.c);
  }));
  renderScenarios('ALL');

  wireSimRunner(view);

  function wireSimRunner(view) {
    const mu = view.querySelector('#simMu'), muV = view.querySelector('#simMuV');
    const ld = view.querySelector('#simLoad'), ldV = view.querySelector('#simLoadV');
    mu.addEventListener('input', () => { muV.textContent = mu.value; });
    ld.addEventListener('input', () => { ldV.textContent = ld.value; });
    const out = view.querySelector('#simOut');
    const commitBtn = view.querySelector('#simCommit');
    let pending = null;

    view.querySelector('#simRun').addEventListener('click', async () => {
      out.innerHTML = '<span class="dim">Running GR Yaris harness…</span>';
      const body = { scenarioId: view.querySelector('#simSc').value, surface: Number(mu.value), load: Number(ld.value), seed: Number(view.querySelector('#simSeed').value) };
      try {
        const r = await (await fetch('/api/sim/run', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })).json();
        if (!r.ok) throw new Error(r.error || 'run failed');
        pending = r;
        const m = r.metrics || {};
        out.innerHTML = `
          <div class="ok"><b>${esc(r.scenario)} simulated</b> — ${esc(m.title || '')}</div>
          <div class="tags mt6"><span class="tag" style="font-size:10px">${esc(r.methodology.status || 'MODEL-DERIVED')}</span></div>
          <table class="grid mt6"><tbody>
            ${metricRow('Duration', m.duration_s + ' s')}
            ${metricRow('Distance covered', m.distance_m + ' m')}
            ${metricRow('Mean speed', m.mean_speed_kmh + ' km/h')}
            ${metricRow('Speed-limit compliance', m.speed_limit_compliance_pct + ' %')}
            ${metricRow('Comfort (jerk RMS)', m.jerk_rms_m_s3 + ' m/s³')}
            ${metricRow('Disengagements', m.disengagements)}
            ${metricRow('Near-misses (TTC<1.5s)', m.near_misses)}
            ${metricRow('Min time-to-collision', m.min_ttc_s == null ? 'n/a' : m.min_ttc_s + ' s')}
            ${m.pedestrian_handled_under_15kph != null ? metricRow('Pedestrian handled ≤15km/h', String(m.pedestrian_handled_under_15kph)) : ''}
            ${metricRow('Traction margin (min)', m.min_traction_margin)}
          </tbody></table>
          <div class="small mt6 mono">telemetry: <code>${esc((r.telemetryCsv || '').split('/').slice(-2).join('/'))}</code></div>
          <div class="small dim mt6">Driving state measured: handle-with-load &gt; threshold events are reported as <b>disengagements</b>; a <b>near-miss</b> flag is any obstacle event time-to-collision &lt; 1.5 s. Zero/probe values mean the encounter was managed without emergency intervention — confirm by inspecting the telemetry CSV.</div>
        `;
        commitBtn.disabled = false;
      } catch (e) {
        out.innerHTML = `<span class="warn">${esc(String(e.message || e))}</span>`;
      }
    });

    commitBtn.addEventListener('click', async () => {
      if (!pending) return;
      const m = pending.metrics || {};
      const patch = {
        simStatus: 'simulated', validated: true,
        lastSimRun: pending.meta.lastRun,
        validation: `MODEL-DERIVED: ${m.duration_s}s, mean ${m.mean_speed_kmh}km/h, compliance ${m.speed_limit_compliance_pct}%, disengagements ${m.disengagements}, near-misses ${m.near_misses}, min-TTC ${m.min_ttc_s}s @ μ×${m.surface_mu_scale}`,
      };
      const record = { id: pending.scenario, patch };
      const evidence = {
        claim: `${m.title || pending.scenario}: scenario sim run under ${pending.meta.engine} with μ×${m.surface_mu_scale}`,
        source: 'gr_yaris_sim engine.py', publisher: 'NWU GR Yaris simulator',
        date: m.lastRun?.slice ? m.lastRun.slice(0, 10) : new Date().toISOString().slice(0, 10),
        url: pending.telemetryCsv || '', type: 'simulation', confidence: 'model-derived', verified: false,
        note: 'Synthetic telemetry scaffold — not field data.',
      };
      try {
        const r = await (await fetch('/api/ingest/scenarios', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ records: [{ ...record, evidence }] }) })).json();
        if (r.applied > 0) {
          out.innerHTML = `<div class="ok"><b>Simulation evidence committed</b> — scenario library now shows <code>sim simulated</code>. Refresh to re-render the library state.</div>
            <div class="mt6"><button class="btn" id="simReload">Refresh scenario library</button></div>`;
          const rb = view.querySelector('#simReload');
          if (rb) rb.addEventListener('click', () => location.reload());
          if (pending.scenario === 'SC-002') {
            out.innerHTML += `<div class="mt6 small">Suggested next step for the behaviour model: register the sim run as <b>inferred</b> evidence for the minibus-taxi emergency-stop variable (state graduates UNMEASURED → INFERRED-from-sim, still not field-measured).</div>
              <div class="mt6"><button class="btn" id="simGrad">Graduate variable → INFERRED</button></div>`;
            const g = view.querySelector('#simGrad');
            if (g) g.addEventListener('click', async () => {
              const gr = await (await fetch('/api/ingest/behavioural', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ records: [{ variable: 'minibus taxi emergency stops', state: 'INFERRED', measurement: 'MODEL-DERIVED from gr_yaris_sim engine run (SC-002) — not field measured.' }] }) })).json();
              out.innerHTML = gr.applied ? `<div class="ok"><b>Variable graduated to INFERRED</b> — refresh to see it in the behaviour model table.</div>` : `<span class="warn">Graduation rejected: ${(gr.errors || []).map((e) => esc(String(e.reason || ''))).join(' ')} — check the variable name matches the table.</span>`;
            });
          }
        } else {
          out.innerHTML = `<span class="warn">Commit rejected — ${(r.errors || []).map((e) => esc(String(e.reason || e.error || ''))).join('; ') || 'server error'}</span>`;
        }
        commitBtn.disabled = true;
      } catch (e) {
        out.innerHTML = `<span class="warn">Commit failed: ${esc(String(e.message || e))}</span>`;
      }
    });

    function metricRow(k, v) { return `<tr><td class="small dim">${esc(k)}</td><td class="small mono">${esc(String(v))}</td></tr>`; }
  }

  function renderScenarios(cat) {
    let list = SC.scenarios || [];
    if (cat !== 'ALL') list = list.filter((s) => s.cat === cat);
    document.getElementById('scBody').innerHTML = list.map((s) => `
      <tr class="sci ${s.level}" style="border:1px solid var(--line);border-left-width:3px;border-left-color:var(--${LEVEL_CLS[s.level] || 'blue'}-dim)">
        <td class="small mono">${esc(s.id)}</td>
        <td class="small"><b>${esc(s.title)}</b>
          <div class="small dim mt6">${esc(s.expected || '')}</div>
          <details class="mt6"><summary style="cursor:pointer" class="small gold">failure modes & box</summary>
            <div class="small dim mt6 kv" style="grid-template-columns:110px 1fr;font-size:10.5px">
              ${kvRows([['Road', s.roadType], ['Weather', s.weather], ['Lighting', s.lighting], ['Traffic', s.traffic], ['Actors', s.actors ? s.actors.join(', ') : '']])}
              Failure modes: ${esc((s.failureModes || []).join('; '))}
            </div></details></td>
        <td>${badge(s.cat, CAT_CLS[s.cat] || 'grey')}</td>
        <td class="center">${sev(s.severity)} ${ktag(String(s.probability || 'unknown').split('-')[0])}</td>
        <td class="small dim">${esc(s.location || '')}</td>
        <td class="small">${esc((s.sensors || []).join(' · '))}</td>
        <td class="small dim">${esc(s.aiCapability || '—')}</td>
        <td>${badge('sim ' + (s.simStatus || 'na'), s.simStatus === 'not-started' ? 'grey' : 'blue')} ${badge('real ' + (s.validation || 'none'), 'grey')}</td>
      </tr>`).join('');
  }

  function kvRows(pairs) {
    return pairs.map(([k, v]) => `<span class="k">${esc(k)}</span><span class="v">${esc(v)}</span>`).join('');
  }
}

function ontCard(c) {
  return `<div class="oc"><div class="ot">${esc(c.name || c.category || '')}</div>
    <ul class="small">${(c.nodes || []).map((n) => `<li>${esc(n)}</li>`).join('')}</ul>
    ${c.note ? `<div class="small" style="color:#e8c15a;font-size:10px;margin-top:3px">${esc(c.note)}</div>` : ''}</div>`;
}

function sev(n) {
  const colors = ['', '#35c480', '#35c480', '#f5b942', '#f08f3c', '#f0564a'];
  return `<span class="num" style="color:${colors[n] || '#56627a'}">${n}/5</span>`;
}