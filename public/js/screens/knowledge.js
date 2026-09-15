// knowledge.js — knowledge gap register, blind spots, audit loop, ingest
import { DB } from '../data.js';
import { esc, badge, ktag } from '../util.js';

const INGEST_SPEC = {
  corridors: { label: 'Corridors — corridor factor values', csv: ['corridorId', 'factor', 'v', 'src', 'note'] },
  roadSafety: { label: 'Road safety — provincial crash shares', csv: ['province', 'sharePct', 'src', 'note'] },
  behavioural: { label: 'Driving intelligence — behaviour measurements', csv: ['variable', 'state', 'measurement', 'src'] },
  scenarios: { label: 'Driving intelligence — scenario validation status', csv: null },
};

export function renderKnowledge(view) {
  const KG = DB.knowledgeGaps || {};

  view.innerHTML = `
  <div class="tile danger">
    <div class="label">WHAT WE DO NOT KNOW</div>
    <div class="small mt6">A strong intelligence platform is defined by its awareness of blind spots. This register is a first-class citizen of the system — silence here would be the real failure.</div>
  </div>

  <h3 class="sec">Knowledge gap register (${(KG.register || []).length})</h3>
  <div class="panel"><div class="panel-bd flush">
    <table class="grid">
      <thead><tr><th>ID</th><th>Topic</th><th>State</th><th>Ingestion route</th><th>Strategic impact if unresolved</th></tr></thead>
      <tbody>
        ${(KG.register || []).map((g) => `<tr>
          <td class="mono small">${esc(g.id)}</td>
          <td class="small"><b>${esc(g.topic)}</b></td>
          <td>${ktag(String(g.state).replace(/-/g, ' ').toLowerCase())}</td>
          <td class="small dim">${esc(g.route || '')}</td>
          <td class="small dim">${esc(g.impact || '')}</td></tr>`).join('')}
      </tbody>
    </table>
  </div></div>

  <h3 class="sec">Blind-spot detection — modelled, not modelled enough</h3>
  <div class="panel"><div class="panel-bd">
    <div class="tags">
      ${(KG.blindSpots || []).map((b) => `<span class="tag" style="border-color:var(--orange-dim);color:#ffd7a8">${esc(b)}</span>`).join('')}
    </div>
    <div class="small dim mt6">Each blind spot is a candidate analysis module or ingestion pathway — the system must actively search for omissions (insurance, liability, cyber, labour, accessibility, public acceptance, taxation, customs, emergency interaction, remote operations, disaster response&hellip;).</div>
  </div></div>

  <h3 class="sec">Data assets needed to close the moat</h3>
  <div class="panel"><div class="panel-bd flush">
    <table class="grid">
      <thead><tr><th>Asset</th><th>Owner</th><th>Status</th></tr></thead>
      <tbody>
        ${(KG.dataAssetsNeeded || []).map((d) => `<tr><td class="small"><b>${esc(d.asset)}</b></td><td class="small dim">${esc(d.owner)}</td><td>${badge(d.status, d.status === 'build' ? 'gold' : 'grey')}</td></tr>`).join('')}
      </tbody>
    </table>
  </div></div>

  <h3 class="sec">Self-critique loop — audit checklist (run before declaring any iteration complete)</h3>
  <div class="row r2">
    ${[
      ['Data audit', 'Are sources current?'],
      ['Regulatory audit', 'Are legal claims verified and typed (law vs policy)?'],
      ['Geographic audit', 'Are locations accurate?'],
      ['Technology audit', 'Are specifications supported by evidence?'],
      ['UX audit', 'Can the operator understand the information in 30s?'],
      ['Strategic audit', 'Does it actually improve decisions?'],
      ['Safety audit', 'Could any metric mislead toward unsafe conclusions?'],
      ['Evidence audit', 'Can every important claim be traced to a source?'],
    ].map(([t, q]) => `<div class="tile"><div class="label">${esc(t)}</div><div class="small dim mt6">${esc(q)}</div></div>`).join('')}
  </div>

  <h3 class="sec">Ingest measured data — replace ESTIMATED with measured</h3>
  <div class="panel"><div class="panel-bd">
    <div class="row r2">
      <div>
        <label class="k" for="ingDs">Target dataset</label>
        <select id="ingDs" class="ctl">
          ${Object.entries(INGEST_SPEC).map(([k, v]) => `<option value="${k}">${esc(v.label)}</option>`).join('')}
        </select>
        <div class="mt6"><input type="file" id="ingFile" accept=".json,.csv,application/json,text/csv" class="ctl"/></div>
        <div class="mt6">
          <button class="btn" id="ingPrev">Preview records</button>
          <button class="btn gold" id="ingCommit" disabled>Commit to knowledge base</button>
        </div>
        <div class="small dim mt6">
          JSON: <code>{"meta":{...},"records":[{...}]}</code> — record shapes follow the dataset spec
          (corridors: corridorId,factor,v,src,note · roadSafety: province,sharePct,src,note ·
          behavioural: variable,state,measurement,src · scenarios: id,patch).<br/>
          CSV: header must be <code>${colHint()}</code>.<br/>
          The <b>server enforces existence</b> — records that target unknown corridors, factors, provinces,
          variables or scenario IDs are rejected and reported, never silently applied.
        </div>
      </div>
      <div>
        <div class="label">Preview</div>
        <div id="ingOut" class="small dim">Select a file and press Preview. The platform records before/after on commit; refresh the page afterwards to re-score every engine with the newly measured values.</div>
      </div>
    </div>
  </div></div>

  <h3 class="sec">Reiteration engine questions</h3>
  <div class="panel"><div class="panel-bd">
    <div class="tags">
      ${['What did we learn?', 'What was wrong?', 'What changed?', 'What information is stale?', 'Which assumptions failed?', 'What data is missing?', 'Which model is too simple?', 'Which component is not useful?', 'What question cannot be answered?', 'What new relationship appeared?', 'What new opportunity emerged?'].map((q) => `<span class="tag" style="font-size:10.5px">${esc(q)}</span>`).join('')}
    </div>
  </div></div>
  `;

  wireIngest(view);
}

function colHint() {
  const csv = Object.values(INGEST_SPEC).find((s) => s.csv);
  return (csv.csv || []).join(',');
}

function wireIngest(view) {
  let current = { records: [], format: null, dataset: null, file: null, errors: [] };
  const out = view.querySelector('#ingOut');
  const commitBtn = view.querySelector('#ingCommit');
  const dsSel = view.querySelector('#ingDs');
  const fileIn = view.querySelector('#ingFile');

  view.querySelector('#ingPrev').addEventListener('click', () => {
    const dataset = dsSel.value;
    const file = fileIn.files && fileIn.files[0];
    if (!file) { out.innerHTML = '<span class="muted">Choose a file first.</span>'; return; }
    const ext = file.name.split('.').pop().toLowerCase();
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || '');
      let records = [], errors = [];
      try {
        if (ext === 'json') {
          const parsed = JSON.parse(text);
          records = Array.isArray(parsed) ? parsed : parsed.records || [];
          errors = Array.isArray(parsed) ? [] : (parsed.errors || []);
        } else if (ext === 'csv') {
          const spec = INGEST_SPEC[dataset];
          if (!spec || !spec.csv) { out.innerHTML = '<span class="warn">CSV not supported for this dataset.</span>'; return; }
          const rows = parseCSV(text);
          if (rows.length) {
            const header = rows[0].map((h) => h.trim().toLowerCase());
            const idx = Object.fromEntries(spec.csv.map((c) => [c.toLowerCase(), header.indexOf(c.toLowerCase())]));
            for (let i = 1; i < rows.length; i++) {
              const raw = rows[i] || [];
              if (raw.every((x) => !String(x || '').trim())) continue;
              const rec = {};
              for (const col of spec.csv) {
                const j = idx[col.toLowerCase()];
                if (j >= 0 && raw[j] !== undefined) rec[col] = String(raw[j]).trim();
              }
              records.push(rec);
            }
          } else errors.push('CSV appears empty');
        } else {
          out.innerHTML = '<span class="warn">Unsupported file type — use .json or .csv.</span>';
          return;
        }
      } catch (e) {
        errors.push('Parse error: ' + e.message);
      }
      if (!records.length) { out.innerHTML = `<span class="warn">No records parsed.${errors[0] ? ' ' + esc(errors[0]) : ''}</span>`; commitBtn.disabled = true; return; }
      current = { records, format: ext, dataset, file, errors };
      out.innerHTML = `
        <div>${records.length} records parsed from <b>${esc(file.name)}</b> (${(ext).toUpperCase()}).
        ${errors.length ? `<span class="warn">File-level: ${esc(errors.join('; '))}</span>` : ''}</div>
        <table class="grid mt6"><thead><tr>${Object.keys(records[0]).map((k) => `<th>${esc(k)}</th>`).join('')}</tr></thead>
        <tbody>${records.slice(0, 4).map((r) => `<tr>${Object.values(r).map((v) => `<td class="small dim">${esc(String(v))}</td>`).join('')}</tr>`).join('')}</tbody></table>
        <div class="muted mt6">Server-side validation (existence, ranges, ranges on final commit) still applies — commit reports any rejects.</div>`;
      commitBtn.disabled = false;
    };
    reader.readAsText(file);
  });

  commitBtn.addEventListener('click', async () => {
    if (!current.records.length) return;
    commitBtn.disabled = true;
    const isCsv = current.format === 'csv';
    const url = `/api/ingest/${current.dataset}${isCsv ? '/csv' : ''}`;
    const body = isCsv ? current.file : JSON.stringify({ meta: { source: 'manual ingest via Knowledge screen', date: new Date().toISOString().slice(0, 10) }, records: current.records });
    try {
      const res = await fetch(url, { method: 'POST', headers: isCsv ? {} : { 'Content-Type': 'application/json' }, body });
      const r = await res.json();
      if (r.applied > 0) {
        out.innerHTML = `<div class="ok"><b>${r.applied} record${r.applied > 1 ? 's' : ''} committed</b>${r.rejected ? ` · ${r.rejected} rejected` : ''}${r.file ? ` · snapshot <code>${esc(r.file.split('/').pop())}</code>` : ''}</div>
          ${r.samples && r.samples.length ? `<div class="small dim mt6">Sample: ${r.samples.map((s) => JSON.stringify(s)).join(' · ')}</div>` : ''}
          <div class="mt6"><button class="btn" id="ingReload">Refresh &amp; re-score</button></div>`;
        const rb = view.querySelector('#ingReload');
        if (rb) rb.addEventListener('click', () => location.reload());
      } else {
        out.innerHTML = `<span class="warn">Nothing committed — ${r.rejected || 0} rejected.</span> ${(r.errors || []).slice(0, 6).map((e) => `<div class="small dim">· ${esc(e.reason || JSON.stringify(e.record || e))}</div>`).join('')}`;
      }
    } catch (e) {
      out.innerHTML = `<span class="warn">Commit failed: ${esc(String(e.message || e))}</span>`;
    }
  });
}

function parseCSV(text) {
  const rows = [];
  let cur = '', field = [], row = [];
  const pushField = () => { field.push(cur); cur = ''; };
  let inQ = false;
  for (const ch of text) {
    if (ch === '"') { inQ = !inQ; cur += ch; continue; }
    if (ch === ',' && !inQ) { pushField(); row.push(field.join('').replace(/""/g, '"').replace(/^"|"$/g, '').trim()); field = []; continue; }
    if ((ch === '\n' || ch === '\r') && !inQ) {
      if (cur !== '' || field.length || row.length) {
        pushField();
        row.push(field.join('').replace(/""/g, '"').trim());
        if (row.some((x) => x !== '')) rows.push(row);
      }
      field = []; row = []; cur = '';
      continue;
    }
    cur += ch;
  }
  if (cur !== '' || field.length || row.length) {
    pushField();
    row.push(field.join('').replace(/""/g, '"').trim());
    if (row.some((x) => x !== '')) rows.push(row);
  }
  return rows;
}