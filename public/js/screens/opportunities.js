// opportunities.js — opportunity engine (radar, scoring, tiers)
import { DB } from '../data.js';
import { opportunityScore, OPP_DEFAULTS, OPP_CAT_ORDER } from '../scoring.js';
import { esc, badge, tierTag, heat, meterRow } from '../util.js';

const CATS = { build: 'green', buy: 'blue', partner: 'gold', research: 'violet', monitor: 'yellow', avoid: 'red' };

export function renderOpportunities(view) {
  const opts = (DB.opportunities?.radar || []).map((o) => ({ ...o, sc: opportunityScore(o) }));
  opts.sort((a, b) => (b.sc.score ?? -999) - (a.sc.score ?? -999));

  view.innerHTML = `
  <h3 class="sec">Opportunity scoring model</h3>
  <div class="row r2">
    <div class="tile">
      <div class="small dim">Opportunity Score = Market + Strategic + Technical + Regulatory + Localisation + Data + Capital-efficiency + Partnership + Time &minus; Execution risk (weights below), normalised 0&ndash;100, then tiered S (national strategic) / A (strong commercial) / B (validate) / C (research) / D (monitor).</div>
      <div class="tags mt6">${OPP_DEFAULTS.map((d) => `<span class="tag" title="dir:${d.dir || '+'}">${esc(d.label)} ${d.weight}%</span>`).join('')}</div>
    </div>
    <div class="tile">
      <div class="label">Portfolio view</div>
      <div class="kv mt6" style="grid-template-columns:110px 1fr">
        ${OPP_CAT_ORDER.map((c) => {
          const n = opts.filter((o) => o.cat === c).length;
          return `<span class="k">${esc(c)}</span><span class="v">${badge(n + ' items', CATS[c])}</span>`;
        }).join('')}
      </div>
      <div class="small muted mt6">Radar directive: Build what should be built · Buy what exists · Partner where external capability is needed · Research what is immature · Monitor what may become important · Avoid bad economics.</div>
    </div>
  </div>

  <h3 class="sec">Ranked opportunity radar</h3>
  <div class="panel"><div class="panel-bd flush">
    <table class="grid">
      <thead><tr><th>Rank</th><th>Opportunity</th><th>Category</th><th>Score</th><th>Tier</th><th>Capital</th><th>Time</th><th>Rationale</th></tr></thead>
      <tbody>
        ${opts.map((o, i) => `
          <tr>
            <td class="num mono">${i + 1}</td>
            <td class="small" style="max-width:260px"><b>${esc(o.name)}</b>
              <details class="mt6"><summary style="cursor:pointer" class="small gold">dims</summary>
                <div class="mt6">${OPP_DEFAULTS.map((d) => meterRow(d.label, (o.dims || {})[d.key])).join('')}</div>
              </details></td>
            <td>${badge(o.cat, CATS[o.cat])}</td>
            <td class="num"><b class="num" style="color:${heat(o.sc.score)};font-size:16px">${o.sc.score ?? '\u2205'}</b></td>
            <td>${tierTag(o.sc.tier)}</td>
            <td class="small dim">${esc(o.capital || '—')}</td>
            <td class="small dim">${esc(o.timeToValue || '—')}</td>
            <td class="small dim">${esc(o.why || '')}</td>
          </tr>`).join('')}
      </tbody>
    </table>
  </div></div>

  <h3 class="sec">Data-quality note</h3>
  <div class="panel"><div class="panel-bd small dim">
    All per-dimension inputs are currently <b>ESTIMATED</b> (expert judgement placeholders). Rank order and tiers will shift as real market research, procurement signals and partner conversations replace estimates. Nothing here is a funding commitment or a quote.
  </div></div>
  `;
}