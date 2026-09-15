// scoring.js — SAMRI, corridor, opportunity, maturity, cyber scoring with uncertainty propagation
import { DB } from './data.js';

export const SAMRI_DEFAULTS = [
  { key: 'infra', label: 'Infrastructure readiness', weight: 15, value: 45, src: 'ESTIMATED', note: 'National road/motorway network substantial but aged; metro density high.' },
  { key: 'regulatory', label: 'Regulatory readiness', weight: 10, value: 18, src: 'ESTIMATED', note: 'No operative automated-driving instrument; DoT direction exists (law gated).' },
  { key: 'road', label: 'Road quality', weight: 10, value: 48, src: 'ESTIMATED', note: 'Tolled N-roads good; municipal & rural condition weak; markings variable.' },
  { key: 'connectivity', label: 'Connectivity', weight: 10, value: 55, src: 'ESTIMATED', note: 'Metro 5G/4G strong; corridor gaps outside metros.' },
  { key: 'mapping', label: 'Mapping / localisation', weight: 10, value: 30, src: 'ESTIMATED', note: 'No national HD-map/localisation service.' },
  { key: 'predict', label: 'Traffic predictability', weight: 10, value: 42, src: 'ESTIMATED', note: 'Congestion regimes + taxi/pedestrian variability unmeasured nationally.' },
  { key: 'safety', label: 'Safety environment', weight: 10, value: 40, src: 'ESTIMATED', note: '11,485 fatalities/yr; pedestrian share 45% — high-risk environment.' },
  { key: 'econ', label: 'Economic opportunity', weight: 10, value: 74, src: 'ESTIMATED', note: 'Freight corridors, mining, automotive manufacturing base.' },
  { key: 'energy', label: 'Energy / charging', weight: 5, value: 42, src: 'ESTIMATED', note: 'Charging network growing; grid reliability variable.' },
  { key: 'data', label: 'Data availability', weight: 5, value: 35, src: 'ESTIMATED', note: 'Crash data access friction; no public SA driving dataset.' },
  { key: 'inst', label: 'Institutional / partnership', weight: 5, value: 58, src: 'ESTIMATED', note: 'CSIR/UP/SANRAL/RTMC exist; consortium absent.' },
];

export function samri(weights) {
  const w = weights || Object.fromEntries(SAMRI_DEFAULTS.map((c) => [c.key, c.weight]));
  let num = 0, den = 0, covered = 0;
  const rows = SAMRI_DEFAULTS.map((c) => {
    const wgt = w[c.key] ?? 0;
    if (c.value == null || wgt <= 0) return { ...c, contrib: null };
    num += c.value * wgt;
    den += wgt;
    covered++;
    return { ...c, contrib: (c.value * wgt) };
  });
  const score = den ? Math.round(num / den) : null;
  const coverage = Math.round((covered / SAMRI_DEFAULTS.length) * 100);
  // confidence: discount by share of ESTIMATED inputs and coverage
  const estShare = SAMRI_DEFAULTS.filter((c) => c.src !== 'VERIFIED').length / SAMRI_DEFAULTS.length;
  const confidence = Math.round(85 * (coverage / 100) * (1 - 0.45 * estShare));
  return { score, coverage, confidence, label: 'Prediction label: ESTIMATED (expert-judgement base inputs). Legal verdicts require primary sources.', rows };
}

export function corridorScore(c, weights) {
  const fw = weights;
  const rows = [];
  let num = 0, den = 0;
  for (const fm of (DB.corridors.factorMeta || [])) {
    const f = (c.factors || {})[fm.key];
    if (!f || f.v == null) { rows.push({ key: fm.key, label: fm.label, v: null, src: 'MISSING' }); continue; }
    const wgt = fw ? (fw[fm.key] ?? 0) : 0;
    if (wgt <= 0) { rows.push({ key: fm.key, label: fm.label, v: f.v, src: f.src }); continue; }
    const readiness = fm.dir === '+' ? f.v : 100 - f.v;
    num += readiness * wgt;
    den += wgt;
    rows.push({ key: fm.key, label: fm.label, v: f.v, src: f.src, readiness: Math.round(readiness), wgt });
  }
  const score = den ? Math.round(num / den) : null;
  const coverage = Math.round((rows.filter((r) => r.v != null).length / rows.length) * 100);
  const estShare = rows.filter((r) => r.v != null && r.src !== 'VERIFIED').length / Math.max(1, rows.filter((r) => r.v != null).length);
  const confidence = score == null ? null : Math.round(80 * (coverage / 100) * (1 - 0.4 * estShare));
  const weakest = rows.filter((r) => r.readiness != null).sort((a, b) => a.readiness - b.readiness)[0];
  const strongest = rows.filter((r) => r.readiness != null).sort((a, b) => b.readiness - a.readiness)[0];
  return {
    score, coverage, confidence, rows, weakest,
    assessments: deriveCorridorSubScores(score, c),
    weakestLabel: weakest ? weakest.label : null,
    strongestLabel: strongest ? strongest.label : null,
  };
}

function deriveCorridorSubScores(score, c) {
  if (score == null) return null;
  const s = score; // 0-100 readiness
  return {
    humanIntervention: Math.round(100 - s * 0.9),       // MODEL-DERIVED
    perceptionDifficulty: Math.round(105 - s * 0.85),
    localizationDifficulty: Math.round(110 - s * 0.95),
    safetyRisk: Math.round(120 - s * 1.05),
    commercialOpportunity: Math.round((c.factors.commercialImportance?.v ?? 50) * 0.6 + (c.factors.freightVolume?.v ?? 50) * 0.4),
    deploymentCost: Math.round(35 + s * 0.5),           // higher readiness -> somewhat higher expectation cost scale
    roiPotential: Math.round(((c.factors.economicValue?.v ?? 50) + (c.factors.freightVolume?.v ?? 50)) / 2 * 0.9),
  };
}

export const OPP_DEFAULTS = [
  { key: 'marketPotential', label: 'Market potential', weight: 15 },
  { key: 'strategicImportance', label: 'Strategic importance', weight: 14 },
  { key: 'technicalFeasibility', label: 'Technical feasibility', weight: 10 },
  { key: 'regulatoryFeasibility', label: 'Regulatory feasibility', weight: 8 },
  { key: 'localisationPotential', label: 'Localisation potential', weight: 10 },
  { key: 'dataAdvantage', label: 'Data advantage', weight: 10 },
  { key: 'capitalEfficiency', label: 'Capital efficiency', weight: 8 },
  { key: 'partnershipAvailability', label: 'Partnership availability', weight: 8 },
  { key: 'timeAdvantage', label: 'Time advantage', weight: 7 },
  { key: 'executionRisk', label: 'Execution risk', weight: 10, invert: true },
];

export function opportunityScore(o) {
  let num = 0, den = 0;
  for (const d of OPP_DEFAULTS) {
    const v = (o.dims || {})[d.key];
    if (v == null) continue;
    const wgt = d.weight;
    num += (d.invert ? 100 - v : v) * wgt;
    den += wgt;
  }
  const score = den ? Math.round(num / den) : null;
  const tier = score == null ? null : score >= 80 ? 'S' : score >= 70 ? 'A' : score >= 60 ? 'B' : score >= 50 ? 'C' : 'D';
  return { score, tier };
}
export const OPP_CAT_ORDER = ['build', 'buy', 'partner', 'research', 'monitor', 'avoid'];

export const MATURITY = [
  { dim: 'Research', v: 62, src: 'ESTIMATED', note: 'UP/CSIR ecosystem active; no national AV program.' },
  { dim: 'Simulation', v: 28, src: 'ESTIMATED', note: 'No national-scale autonomy simulation platform known.' },
  { dim: 'ADAS', v: 85, src: 'ESTIMATED', note: 'ADAS standard in new imports & local builds.' },
  { dim: 'Mining autonomy', v: 60, src: 'ESTIMATED', note: 'Global tech available; Mogalakwena AHS; scale limited.' },
  { dim: 'Infrastructure', v: 45, src: 'ESTIMATED', note: 'Tolled network good; smart-infra early.' },
  { dim: 'Regulation', v: 22, src: 'ESTIMATED', note: 'Direction exists; enactment absent.' },
  { dim: 'Public-road AV', v: 12, src: 'ESTIMATED', note: 'Legally gated; pilots absent.' },
  { dim: 'Robotaxi', v: 5, src: 'ESTIMATED', note: 'Not viable near-term.' },
];

export const CYBER_SCORE = {
  score: 55, src: 'ESTIMATED', note: 'Modelled placeholder — no SA AV-fleet cybersecurity measurement exists.',
  components: [
    { key: 'vehicle', label: 'Vehicle attack surface', v: 55 },
    { key: 'v2x', label: 'V2X attacks', v: 45 },
    { key: 'gnss', label: 'GNSS spoofing', v: 62 },
    { key: 'ots', label: 'OTA vulnerabilities', v: 48 },
    { key: 'fleet', label: 'Fleet compromise', v: 52 },
    { key: 'remote', label: 'Remote operations', v: 60 },
    { key: 'cloud', label: 'Cloud infrastructure', v: 57 },
    { key: 'edge', label: 'Edge devices', v: 48 },
  ],
};

export function normalizeWeights(map, defs, total = 100) {
  const out = {};
  const defSum = defs.reduce((a, d) => a + (map[d.key] ?? d.weight), 0) || 1;
  for (const d of defs) out[d.key] = Math.round(((map[d.key] ?? d.weight) / defSum) * total * 10) / 10;
  return out;
}