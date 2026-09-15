// ZA Mobility Intelligence - zero-dependency static + JSON API server
// Adds: read-only knowledge base, in-memory measured-data overlays with disk backups,
// and an ingestion API (JSON or CSV) that lets operators replace ESTIMATED values.
import http from 'node:http';
import { readFile, readdir, stat, mkdir, writeFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const PUBLIC = join(ROOT, 'public');
const DATA = join(ROOT, 'data');
const UPLOADS = join(DATA, 'uploads');
const PORT = process.env.PORT || 4173;

// --- GR Yaris simulator (Phase-3 scenario validation harness) ----------------
const GR_SIM = process.env.GR_YARIS_SIM || process.env.HOME ? join(process.env.HOME, 'gr_yaris_sim') : null;
const GR_SIM_PY = process.env.GR_YARIS_SIM_PY || (GR_SIM ? join(GR_SIM, 'venv', 'bin', 'python') : 'python3');

function runSim(scenarioId, surface, load, seed) {
  return new Promise((resolve, reject) => {
    const out = join(GR_SIM || '.', 'scenes', 'telemetry');
    const args = ['engine.py', '--scenario', String(scenarioId), '--surface', String(surface), '--load', String(load), '--seed', String(seed), '--out', out];
    execFile(GR_SIM_PY, args, { cwd: GR_SIM || '.', timeout: 120000, maxBuffer: 8 * 1024 * 1024 }, (err, stdout) => {
      if (err) return reject(new Error(`sim failed: ${String(err.message).split('\n')[0]}`));
      try { resolve(JSON.parse(stdout)); }
      catch { reject(new Error('sim produced unparseable output')); }
    });
  });
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.geojson': 'application/geo+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

// --- Ingestion whitelist -------------------------------------------------
// Only these datasets accept overlay records. Every record is validated and
// rejected with a reason if it does not match the base knowledge base.
const INGEST = {
  corridors: {
    label: 'Corridors — corridor factor values',
    csv: ['corridorId', 'factor', 'v', 'src', 'note'],
  },
  roadSafety: {
    label: 'Road safety — provincial crash shares',
    csv: ['province', 'sharePct', 'src', 'note'],
  },
  behavioural: {
    label: 'Driving intelligence — behaviour measurements',
    csv: ['variable', 'state', 'measurement', 'src'],
  },
  scenarios: {
    label: 'Driving intelligence — scenario validation status',
    csv: null,
  },
};

const overlays = {}; // dataset -> [records]

// --- Overlay application (deep merge into base) ---------------------------
function applyOverlays(baseKey, base) {
  if (baseKey === 'corridors') {
    const recs = overlays.corridors || [];
    const cs = base.corridors || [];
    for (const r of recs) {
      const c = cs.find((x) => x.ref === r.corridorId || x.id === r.corridorId);
      if (!c) continue;
      const f = c.factors || {};
      const metaKey = base.factorMeta?.find((fm) => fm.key === r.factor);
      if (!metaKey) continue;
      f[r.factor] = { ...f[r.factor], v: r.v, src: r.src == null ? 'VERIFIED' : r.src };
      if (r.note != null) f[r.factor].note = r.note;
    }
  } else if (baseKey === 'roadSafety') {
    const recs = overlays.roadSafety || [];
    const prov = base.province || [];
    for (const r of recs) {
      const p = prov.find((x) => x.province === r.province);
      if (!p) continue;
      p.sharePct = r.sharePct;
      p.src = r.src == null ? 'VERIFIED' : r.src;
      if (r.note != null) p.note = r.note;
    }
  } else if (baseKey === 'behavioural' && base.behaviouralVariables) {
    const recs = overlays.behavioural || [];
    for (const r of recs) {
      const b = base.behaviouralVariables.find((x) => x.variable === r.variable);
      if (!b) continue;
      if (r.state) b.state = r.state;
      if (r.measurement) b.measurement = r.measurement;
      b.src = r.src == null ? 'MEASURED' : r.src;
      b.note = r.note || (b.note || '');
    }
  } else if (baseKey === 'scenarios' && base.scenarios) {
    const recs = overlays.scenarios || [];
    for (const r of recs) {
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

// --- Record validation -----------------------------------------------------
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

// Reject records that do not map onto the existing knowledge base, so the
// platform never claims it "applied" data that targeted a non-existent entity.
function filterAgainstBase(dataset, records, base) {
  const applied = [];
  const rejected = [];
  const b = base || {};
  const BKEY = { behavioural: 'driving' }[dataset] || dataset;
  const baseSet = b[BKEY] || {};
  for (const r of records) {
    if (dataset === 'corridors') {
      const c = (baseSet.corridors || []).find((x) => x.ref === r.corridorId || x.id === r.corridorId);
      if (!c) { rejected.push({ record: r, reason: 'unknown corridorId' }); continue; }
      const fm = (baseSet.factorMeta || []).find((f) => f.key === r.factor);
      if (!fm) { rejected.push({ record: r, reason: 'unknown factor' }); continue; }
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

async function writeSnapshot(dataset, meta, records) {
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const file = join(UPLOADS, `${dataset}-${ts}.json`);
  await writeFile(file, JSON.stringify({ dataset, ts, meta: meta || {}, records }, null, 2));
  return file;
}

async function restoreOverlays() {
  await mkdir(UPLOADS, { recursive: true });
  const files = (await readdir(UPLOADS)).filter((f) => f.endsWith('.json'));
  const byDataset = {};
  for (const f of files) {
    const m = f.match(/^(.*?)-(\d{4}-\d{2}-\d{2}T.*?)\.json$/);
    if (!m) continue;
    (byDataset[m[1]] = byDataset[m[1]] || []).push(f);
  }
  for (const [ds, list] of Object.entries(byDataset)) {
    list.sort();
    const latest = list[list.length - 1];
    try {
      const base = await loadData();
      const snap = JSON.parse(await readFile(join(UPLOADS, latest), 'utf8'));
      const ok = [];
      for (const r of snap.records || []) {
        if (validateRecord(ds, r) == null) ok.push(r);
      }
      const { applied } = filterAgainstBase(ds, ok, base);
      overlays[ds] = (overlays[ds] || []).concat(applied);
      if (applied.length) console.log(`[za-mobility-intel] restored ${applied.length} overlay records -> ${ds} (from ${latest})`);
    } catch (e) {
      console.log(`[za-mobility-intel] skip overlay restore ${latest}: ${e.message}`);
    }
  }
}

// --- CSV parsing -----------------------------------------------------------
function parseCSV(text) {
  const rows = [];
  let cur = '', field = [], row = [];
  const pushField = () => { field.push(cur); cur = ''; };
  let inQ = false;
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
  if (!spec?.csv) return { records: [], errors: [`CSV ingestion not supported for ${dataset}`] };
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idx = Object.fromEntries(spec.csv.map((col) => [col.toLowerCase(), header.indexOf(col.toLowerCase())]));
  const records = [];
  const errors = [];
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

// --- HTTP helpers ----------------------------------------------------------
function json(res, code, obj, extra = {}) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-cache', ...extra });
  res.end(body);
}

function readBody(req, limit = 8 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > limit) { reject(new Error('payload too large')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function safeJoin(base, p) {
  const target = normalize(join(base, p));
  if (!target.startsWith(base)) return null;
  return target;
}

const cache = new Map();

async function loadData() {
  const files = (await readdir(DATA)).filter((f) => f.endsWith('.json'));
  const out = {};
  for (const f of files) {
    try {
      const key = f.replace(/\.json$/, '');
      out[key] = JSON.parse(await readFile(join(DATA, f), 'utf8'));
    } catch (e) {
      out[f] = { error: String(e && e.message) };
    }
  }
  return out;
}

async function bundle() {
  let data = cache.get('data');
  if (!data) {
    data = await loadData();
    cache.set('data', data);
  }
  const out = {};
  for (const [k, v] of Object.entries(data)) out[k] = { ...v };
  for (const ds of Object.keys(INGEST)) {
    const BKEY = { behavioural: 'driving' }[ds] || ds;
    if (out[BKEY]) out[BKEY] = applyOverlays(ds, out[BKEY]);
  }
  return out;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const path = decodeURIComponent(url.pathname);

  // --- Ingesting measured data ---------------------------------------------
  if (req.method === 'POST' && path.startsWith('/api/ingest/')) {
    const rest = path.slice(12).replace(/\/$/, '');
    const [dataset, mode] = rest.split('/');
    if (!INGEST[dataset]) return json(res, 404, { error: 'dataset not on ingest whitelist' });
    if (mode && mode !== 'csv') return json(res, 404, { error: 'unknown ingest mode' });
    try {
      const body = await readBody(req);
      let records = [], meta = null, csvErrors = [];
      if (mode === 'csv') {
        const parsed = csvToRecords(dataset, body);
        records = parsed.records;
        csvErrors = parsed.errors || [];
      } else {
        let payload;
        try { payload = JSON.parse(body); } catch { return json(res, 400, { error: 'invalid JSON body' }); }
        records = payload.records || [];
        meta = payload.meta || null;
      }
      if (!records.length) {
        return json(res, 400, { applied: 0, rejected: 0, errors: csvErrors.length ? csvErrors : ['no records in payload'] });
      }
      const structural = [];
      for (const r of records) {
        const err = validateRecord(dataset, r);
        if (err) structural.push({ record: r, reason: err });
      }
      const usable = records.filter((r) => validateRecord(dataset, r) == null);
      const { applied, rejected } = filterAgainstBase(dataset, usable, await bundle());
      if (applied.length) {
        overlays[dataset] = (overlays[dataset] || []).concat(applied);
        const file = await writeSnapshot(dataset, meta, applied);
        console.log(`[za-mobility-intel] ingested ${applied.length} records -> ${dataset} (${file})`);
        return json(res, 200, { applied: applied.length, rejected: rejected.length + structural.length, errors: [...rejected, ...structural], file, samples: applied.slice(0, 3) });
      }
      return json(res, 400, { applied: 0, rejected: rejected.length + structural.length, errors: [...rejected, ...structural] });
    } catch (e) {
      return json(res, 500, { error: String(e.message || e) });
    }
  }

  // --- Simulation runner (GR Yaris scenario harness) ------------------------
  if (req.method === 'POST' && path === '/api/sim/run') {
    try {
      if (!GR_SIM) return json(res, 503, { error: 'GR yaris sim directory not found' });
      const body = await readBody(req, 65536);
      let p;
      try { p = JSON.parse(body || '{}'); } catch { return json(res, 400, { error: 'invalid JSON body' }); }
      const scenarioId = String(p.scenarioId || '');
      const surface = Math.max(0.2, Math.min(1.0, Number(p.surface ?? 1.0)));
      const load = Math.max(0.0, Math.min(1.0, Number(p.load ?? 0.0)));
      const seed = Number(p.seed ?? 7);
      const b = await bundle();
      const scList = b.scenarios?.scenarios || [];
      if (!scList.some((s) => s.id === scenarioId)) {
        return json(res, 400, { error: 'scenario not registered in the knowledge base: ' + scenarioId });
      }
      const result = await runSim(scenarioId, surface, load, seed);
      const meta = { simStatus: 'simulated', validated: true, lastRun: new Date().toISOString(), engine: 'gr_yaris_sim engine.py', surfaceMu: surface, loadFactor: load };
      const m = result.metrics || {};
      meta.summary = `n=${m.duration_s ? m.duration_s + 's' : '?'}, mean ${m.mean_speed_kmh}km/h, compliance ${m.speed_limit_compliance_pct}%`;
      return json(res, 200, {
        ok: true, scenario: scenarioId, metrics: result.metrics,
        methodology: result.methodology, telemetryCsv: result.telemetry_csv,
        metricsJson: result.metrics_json, meta, scriptedParams: { scenarioId, surface, load, seed },
      });
    } catch (e) {
      return json(res, 500, { error: String(e.message || e) });
    }
  }

  // --- Read-only API --------------------------------------------------------
  if (req.method === 'GET' && path.startsWith('/api/')) {
    const key = path.slice(5).replace(/\/$/, '');
    try {
      const b = await bundle();
      if (key.length === 0) return json(res, 200, b);
      if (b[key]) return json(res, 200, b[key]);
      return json(res, 404, { error: 'unknown dataset: ' + key });
    } catch (e) {
      return json(res, 500, { error: String(e.message || e) });
    }
  }

  // --- Static ---------------------------------------------------------------
  let file = 'index.html';
  if (path.startsWith('/assets/') || path.startsWith('/vendor/') || path.startsWith('/css/') || path.startsWith('/js/')) {
    file = path.slice(1);
  }
  const target = safeJoin(PUBLIC, file);
  if (!target) return json(res, 400, { error: 'bad path' });
  try {
    const body = await readFile(target);
    res.writeHead(200, {
      'Content-Type': MIME[extname(target)] || 'application/octet-stream',
      'Cache-Control': path.startsWith('/css/') || path.startsWith('/js/') ? 'no-cache' : 'public, max-age=3600',
    });
    res.end(body);
  } catch {
    if (path === '/' || file === 'index.html') {
      res.writeHead(200, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-cache' });
      return res.end(await readFile(join(PUBLIC, 'index.html')));
    }
    return json(res, 404, { error: 'not found' });
  }
});

// --- Boot --------------------------------------------------------------------
server.listen(PORT, async () => {
  await mkdir(UPLOADS, { recursive: true }).catch(() => {});
  await restoreOverlays();
  console.log(`[za-mobility-intel] running at http://localhost:${PORT}`);
});