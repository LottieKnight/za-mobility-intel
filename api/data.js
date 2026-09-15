// data.js — knowledge base bundled into the serverless function at build time.
// `require` of JSON is inlined by Vercel's esbuild into the lambda, so the full
// KB is guaranteed present regardless of runtime cwd. Generated pattern —
// edit data/*.json, not this file.
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const data = {
  corridors: require('../data/corridors.json'),
  roadSafety: require('../data/roadSafety.json'),
  geography: require('../data/geography.json'),
  regulation: require('../data/regulation.json'),
  standards: require('../data/standards.json'),
  industry: require('../data/industry.json'),
  research: require('../data/research.json'),
  driving: require('../data/driving.json'),
  scenarios: require('../data/scenarios.json'),
  opportunities: require('../data/opportunities.json'),
  strategy: require('../data/strategy.json'),
  knowledgeGaps: require('../data/knowledgeGaps.json'),
  international: require('../data/international.json'),
  mining: require('../data/mining.json'),
  safetyMetrics: require('../data/safetyMetrics.json'),
  alerts: require('../data/alerts.json'),
};

export default data;