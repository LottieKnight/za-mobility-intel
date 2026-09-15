// data.js — loads knowledge base JSON + geo assets
const DATA_KEYS = [
  'geography', 'corridors', 'roadSafety', 'regulation', 'standards', 'industry',
  'research', 'driving', 'scenarios', 'opportunities', 'strategy', 'knowledgeGaps',
  'international', 'mining', 'safetyMetrics', 'alerts',
];

export const DB = {};

export async function loadAll() {
  await Promise.all(
    DATA_KEYS.map(async (k) => {
      try {
        const r = await fetch(`/api/${k}`);
        DB[k] = await r.json();
      } catch (e) {
        DB[k] = { error: String(e), _dataFrom: 'load-fail' };
      }
    }),
  );
  const [prov, outline] = await Promise.all([
    fetch('/assets/sa-provinces.geojson').then((r) => r.json()),
    fetch('/assets/sa-outline.geojson').then((r) => r.json()),
  ]);
  DB._provincesGeo = prov;
  DB._outlineGeo = outline;
  return DB;
}

export function getGeography() { return DB.geography || {}; }
export function getCorridors() { return DB.corridors || {}; }
export function getScenarios() { return DB.scenarios || {}; }

// Build a search index across the knowledge base
export function buildIndex() {
  const idx = [];
  const push = (type, id, title, blurb, screen) => {
    idx.push({ type, id, title: String(title || ''), blurb: String(blurb || ''), screen });
  };
  const G = getGeography();
  (G.provinces || []).forEach((p) => push('province', p.iso, p.name, `${p.capital} · pop ${(p.population / 1e6).toFixed(1)}m`, 'map'));
  (G.metros || []).forEach((m) => push('metro', m.name, m.name, m.kind || '', 'map'));
  (G.cities || []).forEach((c) => push('city', c.name, c.name, c.kind || '', 'map'));
  (G.ports || []).forEach((p) => push('port', p.name, p.name, p.kind || '', 'map'));
  (G.airports || []).forEach((a) => push('airport', a.name, a.name, a.kind || '', 'map'));
  (getCorridors().corridors || []).forEach((c) => push('corridor', c.id, `${c.ref} ${c.name}`, c.route || '', 'corridors'));
  const R = DB.regulation || {};
  (R.instruments || []).forEach((i) => push('instrument', i.id, i.title, `${i.category} · ${i.status}`, 'regulatory'));
  const IND = DB.industry || {};
  ['oem', 'miningCos', 'telematics', 'logistics', 'telecoms', 'energy'].forEach((sec) => {
    (IND[sec] || []).forEach((x) => push(sec, x.id || x.name, x.name, x.note || x.city || '', 'industry'));
  });
  (IND.miningTech || []).forEach((x) => push('miningTech', x.id, x.name, x.note, 'industry'));
  const RES = DB.research || {};
  (RES.hubs || []).forEach((h) => push('research', h.id, h.name, `${h.city || ''} ${h.focus || ''}`, 'research'));
  (RES.testAssets || []).forEach((t) => push('test', t.name, t.name, t.kind, 'research'));
  const SC = getScenarios();
  (SC.scenarios || []).forEach((s) => push('scenario', s.id, `${s.id} ${s.title}`, `${s.cat} · ${s.location}`, 'driving'));
  const OP = DB.opportunities || {};
  (OP.radar || []).forEach((o) => push('opportunity', o.id, o.name, `build-${o.cat}`, 'opportunities'));
  const MIN = DB.mining || {};
  (MIN.sites || []).forEach((s) => push('mine', s.name, s.name, `${s.commodity} · ${s.province}`, 'mining'));
  (DB.knowledgeGaps?.register || []).forEach((g) => push('gap', g.id, g.topic, g.state, 'knowledge'));
  return idx;
}