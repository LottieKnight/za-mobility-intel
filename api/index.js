// api/index.js — Vercel serverless function for ZA Mobility Intelligence
// Reads bundled JSON from the deployment filesystem; serves the knowledge base,
// ingest API, and (when GR_YARIS_SIM is set) the simulation runner.
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { execFile } from 'node:child_process';
import { createRequire } from 'node:module';
import bundledData from './data.js';

const require = createRequire(import.meta.url);
const DATA = join(process.cwd(), 'data');
const UPLOADS = join(DATA, 'uploads');
const GR_SIM = process.env.GR_YARIS_SIM || null;
const GR_SIM_PY = process.env.GR_YARIS_SIM_PY || (GR_SIM ? join(GR_SIM, 'venv', 'bin', 'python') : 'python3');

function runSim(scenarioId, surface, load, seed) {
  return new Promise((resolve, reject) => {
    if (!GR_SIM) return reject(new Error('GR yaris sim not available on this deployment'));
    const out = join(GR_SIM, 'scenes', 'telemetry');
    const args = ['engine.py', '--scenario', String(scenarioId), '--surface', String(surface), '--load', String(load), '--seed', String(seed), '--out', out];
    execFile(GR_SIM_PY, args, { cwd: GR_SIM, timeout: 120000, maxBuffer: 8 * 1024 * 1024 }, (err, stdout) => {
      if (err) return reject(new Error(`sim failed: ${String(err.message).split('\n')[0]}`));
      try { resolve(JSON.parse(stdout)); }
      catch { reject(new Error('sim produced unparseable output')); }
    });
  });
}

const INGEST = {
  corridors: { csv: ['corridorId', 'factor', 'v', 'src', 'note'] },
  roadSafety: { csv: ['province', 'sharePct', 'src', 'note'] },
  behavioural: { csv: ['variable', 'state', 'measurement', 'src'] },
  scenarios: { csv: null },
};

const overlays = {};

function applyOverlays(baseKey, base) {
  if (baseKey === 'corridors') {
    for (const r of (overlays.corridors || [])) {
      const c = (base.corridors || []).find((x) => x.ref === r.corridorId || x.id === r.corridorId);
      if (!c) continue;
      const metaKey = base.factorMeta?.find((fm) => fm.key === r.factor);
      if (!metaKey) continue;
      const f = c.factors || {};
      f[r.factor] = { ...f[r.factor], v: r.v, src: r.src == null ? 'VERIFIED' : r.src };
      if (r.note != null) f[r.factor].note = r.note;
    }
  } else if (baseKey === 'roadSafety') {
    for (const r of (overlays.roadSafety || [])) {
      const p = (base.province || []).find((x) => x.province === r.province);
      if (!p) continue;
      p.sharePct = r.sharePct;
      p.src = r.src == null ? 'VERIFIED' : r.src;
      if (r.note != null) p.note = r.note;
    }
  } else if (baseKey === 'behavioural' && base.behaviouralVariables) {
    for (const r of (overlays.behavioural || [])) {
      const b = base.behaviouralVariables.find((x) => x.variable === r.variable);
      if (!b) continue;
      if (r.state) b.state = r.state;
      if (r.measurement) b.measurement = r.measurement;
      b.src = r.src == null ? 'MEASURED' : r.src;
      b.note = r.note || (b.note || '');
    }
  } else if (baseKey === 'scenarios' && base.scenarios) {
    for (const r of (overlays.scenarios || [])) {
      const s = base.scenarios.find((x) => x.id === r.id);
      if (!s) continue;
      Object.assign(s, r.patch || {});
      if (r.evidence != null) {
        const add = Array.isArray(r.evidence) ? r.evidence : [r.evidence];
        const hay = JSON.stringify(s.evidence || []);
        for (const ev of add) {
          if (ev == null) continue;
          const key = JSON.stringify(ev);
          if (!hay.includes(JSON.stringify({ ...ev, verified: undefined })) && !hay.includes(key)) s.evidence = (s.evidence || []).concat(ev);
        }
      }
    }
  }
  return base;
}

function validateRecord(dataset, r) {
  if (dataset === 'corridors') {
    if (!r.corridorId) return 'missing corridorId';
    if (!r.factor) return 'missing factor';
    if (r.v == null || !Number.isFinite(Number(r.v))) return 'v must be a number';
    if (Number(r.v) < 0 || Number(r.v) > 100) return 'v must be 0-100';
    r.v = Number(r.v);
    return null;
  }
  if (dataset === 'roadSafety') {
    if (!r.province) return 'missing province';
    if (r.sharePct == null || !Number.isFinite(Number(r.sharePct))) return 'sharePct must be a number';
    if (Number(r.sharePct) < 0 || Number(r.sharePct) > 100) return 'sharePct must be 0-100';
    r.sharePct = Number(r.sharePct);
    return null;
  }
  if (dataset === 'behavioural') {
    if (!r.variable) return 'missing variable';
    return null;
  }
  if (dataset === 'scenarios') {
    if (!r.id) return 'missing id';
    if (!r.patch || typeof r.patch !== 'object') return 'missing patch object';
    return null;
  }
  return 'unknown dataset: ' + dataset;
}

function filterAgainstBase(dataset, records, base) {
  const applied = [], rejected = [];
  const BKEY = { behavioural: 'driving' }[dataset] || dataset;
  const baseSet = (base || {})[BKEY] || {};
  for (const r of records) {
    if (dataset === 'corridors') {
      if (!(baseSet.corridors || []).find((x) => x.ref === r.corridorId || x.id === r.corridorId)) { rejected.push({ record: r, reason: 'unknown corridorId' }); continue; }
      if (!(baseSet.factorMeta || []).find((f) => f.key === r.factor)) { rejected.push({ record: r, reason: 'unknown factor' }); continue; }
    } else if (dataset === 'roadSafety') {
      if (!(baseSet.province || []).find((x) => x.province === r.province)) { rejected.push({ record: r, reason: 'unknown province' }); continue; }
    } else if (dataset === 'behavioural') {
      if (!(baseSet.behaviouralVariables || []).find((x) => x.variable === r.variable)) { rejected.push({ record: r, reason: 'unknown behaviour variable' }); continue; }
    } else if (dataset === 'scenarios') {
      if (!(baseSet.scenarios || []).find((x) => x.id === r.id)) { rejected.push({ record: r, reason: 'unknown scenario id' }); continue; }
    }
    applied.push(r);
  }
  return { applied, rejected };
}

const cache = new Map();

async function loadData() {
  // Prefer the knowledge base bundled into the function at build time
  // (guaranteed present on Vercel), falling back to the local filesystem for
  // `node server.js`-style development where the dir always exists.
  if (bundledData && Object.keys(bundledData).length >= 16) return bundledData;
  const files = (await readdir(DATA)).filter((f) => f.endsWith('.json'));
  const out = {};
  for (const f of files) {
    try { out[f.replace(/\.json$/, '')] = JSON.parse(await readFile(join(DATA, f), 'utf8')); }
    catch (e) { out[f] = { error: String(e.message) }; }
  }
  return out;
}

async function bundle() {
  let data = cache.get('data');
  if (!data) { data = await loadData(); cache.set('data', data); }
  const out = {};
  for (const [k, v] of Object.entries(data)) out[k] = { ...v };
  for (const ds of Object.keys(INGEST)) {
    const BKEY = { behavioural: 'driving' }[ds] || ds;
    if (out[BKEY]) out[BKEY] = applyOverlays(ds, out[BKEY]);
  }
  return out;
}

function parseCSV(text) {
  const rows = [];
  let cur = '', field = [], row = [], inQ = false;
  const pushField = () => { field.push(cur); cur = ''; };
  for (const ch of text) {
    if (ch === '"') { inQ = !inQ; cur += '"'; continue; }
    if (ch === ',' && !inQ) { pushField(); row.push(field.join('').replace(/""/g, '"').replace(/^"|"$/g, '')); field = []; continue; }
    if ((ch === '\n' || ch === '\r') && !inQ) {
      if (cur !== '' || field.length || row.length) { pushField(); row.push(field.join('').replace(/""/g, '"').trim()); if (row.some((x) => x !== '')) rows.push(row); }
      field = []; row = []; cur = ''; continue;
    }
    cur += ch;
  }
  if (cur !== '' || field.length || row.length) { pushField(); row.push(field.join('')); if (row.some((x) => x)) rows.push(row); }
  return rows;
}

function csvToRecords(dataset, text) {
  const rows = parseCSV(text);
  if (!rows.length) return { records: [], errors: ['empty file'] };
  const spec = INGEST[dataset];
  if (!spec?.csv) return { records: [], errors: [`CSV not supported for ${dataset}`] };
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idx = Object.fromEntries(spec.csv.map((col) => [col.toLowerCase(), header.indexOf(col.toLowerCase())]));
  const records = [], errors = [];
  for (let i = 1; i < rows.length; i++) {
    const raw = rows[i];
    if (!raw || raw.every((x) => x === '')) continue;
    const rec = {};
    for (const col of spec.csv) {
      const j = idx[col.toLowerCase()];
      if (j >= 0 && raw[j] !== undefined) rec[col] = raw[j].trim();
    }
    if (dataset === 'scenarios') {
      if (rec.id && rec.field) rec.patch = { [rec.field]: rec.value };
      else errors.push(`row ${i + 1}: scenarios CSV needs id,field,value columns`);
    }
    records.push(rec);
  }
  return { records, errors };
}

function jsonRes(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-cache' });
  res.end(body);
}

export default async function handler(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const path = decodeURIComponent(url.pathname);

  // POST /api/ingest/:dataset[/csv]
  if (req.method === 'POST' && path.startsWith('/api/ingest/')) {
    const rest = path.slice(12).replace(/\/$/, '');
    const [dataset, mode] = rest.split('/');
    if (!INGEST[dataset]) return jsonRes(res, 404, { error: 'dataset not on ingest whitelist' });
    if (mode && mode !== 'csv') return jsonRes(res, 404, { error: 'unknown ingest mode' });
    try {
      const chunks = [];
      for await (const c of req) chunks.push(c);
      const body = Buffer.concat(chunks).toString('utf8');
      let records = [], meta = null, csvErrors = [];
      if (mode === 'csv') {
        const parsed = csvToRecords(dataset, body);
        records = parsed.records; csvErrors = parsed.errors || [];
      } else {
        let payload;
        try { payload = JSON.parse(body); } catch { return jsonRes(res, 400, { error: 'invalid JSON body' }); }
        records = payload.records || []; meta = payload.meta || null;
      }
      if (!records.length) return jsonRes(res, 400, { applied: 0, rejected: 0, errors: csvErrors.length ? csvErrors : ['no records'] });
      const structural = [];
      for (const r of records) { const err = validateRecord(dataset, r); if (err) structural.push({ record: r, reason: err }); }
      const usable = records.filter((r) => validateRecord(dataset, r) == null);
      const { applied, rejected } = filterAgainstBase(dataset, usable, await bundle());
      if (applied.length) {
        overlays[dataset] = (overlays[dataset] || []).concat(applied);
        const ts = new Date().toISOString().replace(/[:.]/g, '-');
        await mkdir(UPLOADS, { recursive: true }).catch(() => {});
        const file = join(UPLOADS, `${dataset}-${ts}.json`);
        await writeFile(file, JSON.stringify({ dataset, ts, meta: meta || {}, records: applied }, null, 2)).catch(() => {});
        return jsonRes(res, 200, { applied: applied.length, rejected: rejected.length + structural.length, errors: [...rejected, ...structural], file, samples: applied.slice(0, 3) });
      }
      return jsonRes(res, 400, { applied: 0, rejected: rejected.length + structural.length, errors: [...rejected, ...structural] });
    } catch (e) { return jsonRes(res, 500, { error: String(e.message || e) }); }
  }

  // POST /api/sim/run
  if (req.method === 'POST' && path === '/api/sim/run') {
    try {
      if (!GR_SIM) return jsonRes(res, 503, { error: 'GR yaris sim not available on this deployment (requires GR_YARIS_SIM env var)' });
      const chunks = [];
      for await (const c of req) chunks.push(c);
      const body = Buffer.concat(chunks).toString('utf8');
      let p;
      try { p = JSON.parse(body || '{}'); } catch { return jsonRes(res, 400, { error: 'invalid JSON body' }); }
      const scenarioId = String(p.scenarioId || '');
      const surface = Math.max(0.2, Math.min(1.0, Number(p.surface ?? 1.0)));
      const load = Math.max(0.0, Math.min(1.0, Number(p.load ?? 0.0)));
      const seed = Number(p.seed ?? 7);
      const b = await bundle();
      if (!(b.scenarios?.scenarios || []).some((s) => s.id === scenarioId)) return jsonRes(res, 400, { error: 'unknown scenario: ' + scenarioId });
      const result = await runSim(scenarioId, surface, load, seed);
      const m = result.metrics || {};
      return jsonRes(res, 200, {
        ok: true, scenario: scenarioId, metrics: result.metrics, methodology: result.methodology,
        telemetryCsv: result.telemetry_csv, metricsJson: result.metrics_json,
        meta: { simStatus: 'simulated', validated: true, lastRun: new Date().toISOString(), engine: 'gr_yaris_sim engine.py', surfaceMu: surface, loadFactor: load },
      });
    } catch (e) { return jsonRes(res, 500, { error: String(e.message || e) }); }
  }

  // GET /api[/dataset]
  if (req.method === 'GET' && path.startsWith('/api/')) {
    const key = path.slice(5).replace(/\/$/, '');
    try {
      const b = await bundle();
      if (key.length === 0) return jsonRes(res, 200, b);
      if (b[key]) return jsonRes(res, 200, b[key]);
      return jsonRes(res, 404, { error: 'unknown dataset: ' + key });
    } catch (e) { return jsonRes(res, 500, { error: String(e.message || e) }); }
  }

  // Everything else — Vercel serves public/ statically via the filesystem handle
  return jsonRes(res, 404, { error: 'not found' });
}