// map.js — geospatial intelligence screen
import { DB } from '../data.js';
import { esc, ktag } from '../util.js';

const d3 = window.d3;
let layers = ['provinces', 'corridors', 'metros', 'cities', 'ports', 'mines', 'research'];

export function renderMap(view) {
  const G = DB.geography || {};
  if (!window.d3 || !window.d3.geoMercator) {
    view.innerHTML = '<div class="tile danger"><div class="label">Map unavailable</div><div class="small mt6">D3 failed to load (vendor/d3.v7.min.js missing or blocked). Map intelligence cannot render without it.</div></div>';
    return;
  }
  const W = 900, H = 790;
  const provGeo = DB._provincesGeo;
  const outline = DB._outlineGeo;

  const proj = d3.geoMercator().fitExtent([[16, 14], [W - 12, H - 16]], provGeo);
  const path = d3.geoPath(proj);
  const projP = (w) => proj(w && w.length === 2 ? [w[1], w[0]] : w);
  const lineGen = d3.line();

  const byName = {};
  (G.provinces || []).forEach((p) => (byName[p.name] = p));
  const provData = (provGeo.features || []).map((f) => ({
    ...f,
    info: byName[f.properties.name] || { name: f.properties.name },
    model: provinceReadiness(f.properties.name),
  }));

  const metros = (G.metros || []).map((m) => ({ ...m, kind: 'metro' }));
  const cities = (G.cities || []).map((c) => ({ ...c, kind: 'city' }));
  const ports = (G.ports || []).map((p) => ({ ...p, kind: 'port' }));
  const airports = (G.airports || []).map((a) => ({ ...a, kind: 'airport' }));
  const mines = (DB.mining?.sites || []).map((s) => ({ ...s, kind: 'mine' }));
  const hubs = (DB.research?.hubs || []).filter((h) => h.lat != null).map((h) => ({ ...h, kind: 'research' }));
  const corridors = DB.corridors?.corridors || [];

  view.innerHTML = `
    <h3 class="sec">South African autonomous-mobility map</h3>
    <div class="row r32">
      <div>
        <div id="mapWrap">
          <svg id="mapSvg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"></svg>
        </div>
        <div class="legend mt6">
          <span class="li"><span class="sw" style="background:#35c480"></span>mine / private ODD</span>
          <span class="li"><span class="sw" style="background:#a683e8"></span>research hub</span>
          <span class="li"><span class="sw" style="background:#f5b942"></span>metro</span>
          <span class="li"><span class="sw" style="background:#2fd4c7"></span>city / port / airport</span>
          <span class="li"><span class="sw" style="background:#4a86b4"></span>corridor (schematic)</span>
          <span class="li">province fill = modelled readiness proxy (inferred)</span>
        </div>
      </div>
      <div>
        <div class="panel">
          <div class="panel-hd"><span class="t">Map layers</span></div>
          <div class="panel-bd">
            <div class="map-layers" id="layers">
              ${[
                ['provinces', 'Provinces / readiness'],
                ['corridors', 'Corridors'],
                ['metros', 'Metropolitan areas'],
                ['cities', 'Cities'],
                ['ports', 'Ports & airfields'],
                ['mines', 'Mines (private ODD)'],
                ['research', 'Research hubs'],
              ].map(([k, l]) => `<span class="map-layer ${layerOn(k) ? 'on' : ''}" data-l="${k}">${esc(l)}</span>`).join('')}
            </div>
            <div class="muted small mt6">Corridor lines are schematic waypoint alignments, to be refined against OSM/SANRAL. Province fills are a <b>modelled proxy</b>, not measured data. Crash/charging/connectivity layers are {{MISSING}} — ingestion pathways built, data pending.</div>
          </div>
        </div>
        <div class="tile mt10">
          <div class="label">Selected province</div>
          <div id="selProv"><span class="muted small">Select a province on the map&hellip;</span></div>
        </div>
        <div class="tile mt10">
          <div class="label">Data & confidence</div>
          <div class="small mt6 dim" style="line-height:2.1">
            <div>Province attributes: Census 2022 (Stats SA) ${ktag('verified')}</div>
            <div>Corridor factor inputs ${ktag('estimated')}</div>
            <div>Province readiness ${ktag('inferred')} (model proxy)</div>
            <div>Crash layer ${ktag('missing')} &middot; charging layer ${ktag('missing')} &middot; connectivity layer ${ktag('missing')}</div>
          </div>
        </div>
      </div>
    </div>`;

  const svg = d3.select('#mapSvg');
  const base = svg.append('g');
  const tip = document.getElementById('mapTip');

  base.append('g').selectAll('path').data(outline.features).join('path')
    .attr('d', path).attr('class', 'country');

  base.append('g').selectAll('path').data(provData).join('path')
    .attr('d', path).attr('class', 'prov')
    .style('fill', (d) => layerOn('provinces') ? provFill(d.model.score) : '#111a29')
    .on('mousemove', (e, d) => showTip(e, provTip(d)))
    .on('mouseleave', hideTip)
    .on('click', (e, d) => selectProvince(d));

  if (layerOn('provinces')) {
    base.append('g').selectAll('text').data(provData).join('text')
      .attr('x', (d) => proj(d3.geoCentroid(d))[0])
      .attr('y', (d) => proj(d3.geoCentroid(d))[1])
      .attr('text-anchor', 'middle').attr('class', 'map-label')
      .text((d) => d.info.name);
  }

  if (layerOn('corridors')) {
    const cg = base.append('g');
    cg.selectAll('path').data(corridors.filter((c) => c.waypoints && c.waypoints.length >= 2)).join('path')
      .attr('d', (c) => lineGen(c.waypoints.map((w) => projP(w))))
      .attr('class', 'map-corridor').attr('stroke', corridorColor)
      .on('mousemove', (e, d) => showTip(e, corridorTip(d)))
      .on('mouseleave', hideTip);
    cg.selectAll('text').data(corridors).join('text')
      .attr('class', 'map-label')
      .attr('x', (c) => {
        const pts = (c.waypoints || []).map((w) => projP(w));
        return pts.length ? pts[Math.floor(pts.length / 2)][0] + 8 : 0;
      })
      .attr('y', (c) => {
        const pts = (c.waypoints || []).map((w) => projP(w));
        return pts.length ? pts[Math.floor(pts.length / 2)][1] - 5 : 0;
      })
      .text((c) => c.ref);
  }

  drawLayer(metros, 'map-city met', 'metros');
  drawLayer(cities, 'map-city', 'cities');
  drawLayer([...ports, ...airports], 'map-city', 'ports');
  drawLayer(mines, 'map-pin', 'mines');
  drawLayer(hubs, 'map-loc', 'research');

  function drawLayer(items, cls, layerKey) {
    const ok = layerOn(layerKey);
    const g2 = base.append('g');
    g2.selectAll('circle').data(items.filter((i) => i.lat != null && i.lon != null)).join('circle')
      .attr('cx', (d) => proj([d.lon, d.lat])[0])
      .attr('cy', (d) => proj([d.lon, d.lat])[1])
      .attr('r', (d) => (d.kind === 'metro' ? 5 : 4))
      .attr('class', cls)
      .style('display', ok ? 'block' : 'none')
      .on('mousemove', (e, d) => showTip(e, entityTip(d)))
      .on('mouseleave', hideTip);
  }

  document.querySelectorAll('.map-layer').forEach((b) => b.addEventListener('click', () => {
    const k = b.dataset.l;
    layers = layers.includes(k) ? layers.filter((x) => x !== k) : [...layers, k];
    renderMap(view);
  }));
}

function layerOn(k) { return layers.includes(k); }

function provinceReadiness(name) {
  const G = DB.geography || {};
  const metros = (G.metros || []).filter((m) => m.province === name).length;
  const ports = (G.ports || []).reduce((n, p) => n, 0); // port prov mapping not stored; neutral
  const mines = (DB.mining?.sites || []).filter((s) => s.province === name).length;
  let s = 40 + metros * 12 + Math.min(10, mines * 4) + (name === 'Gauteng' ? 12 : 0) + (name === 'Western Cape' ? 5 : 0) + (name === 'Northern Cape' ? -8 : 0) + (name === 'Limpopo' ? 6 : 0);
  s = Math.max(15, Math.min(90, Math.round(s)));
  return { score: s, src: 'INFERRED', metro: metros, cityNm: 0, portN: ports, mine: mines };
}

function provFill(s) {
  const map = { 15: '#1a0d12', 30: '#3a1820', 45: '#5c3a12', 60: '#3f5a17', 75: '#12403a' };
  const k = Math.round(s / 15) * 15;
  return map[k] || map[45];
}

function corridorColor(c) {
  const len = c.lengthKm || 500;
  return len > 800 ? '#5a8fc4' : len > 400 ? '#4a86b4' : '#39607f';
}

function provTip(d) {
  return { tt: d.info.name, rows: [
    ['ISO', d.info.iso], ['Capital', d.info.capital], ['Census 2022 pop', fmtPop(d.info.population)],
    ['Area km²', fmtPop(d.info.areaKm2)], ['Mine sites', d.model.mine],
    ['Readiness proxy', d.model.score + ' (inferred model)'], ['Note', d.info.note],
  ] };
}

function corridorTip(c) {
  return { tt: `${c.ref} — ${c.name}`, rows: [
    ['Route', c.route], ['Length', (c.lengthKm || '—') + ' km · ' + (c.lengthSrc || '')],
    ['Provinces', c.provinces.join(', ')], ['Assessment', c.assessment],
  ] };
}

function entityTip(d) {
  const rows = [['Kind', d.kind]];
  if (d.pop) rows.push(['Pop', d.pop]);
  if (d.kind === 'mine') {
    if (d.commodity) rows.push(['Commodity', d.commodity]);
    rows.push(['Autonomy', d.autonomy]); rows.push(['Readiness', d.readiness + ' (est.)']);
  }
  if (d.focus) rows.push(['Focus', d.focus]);
  if (d.kind === 'research') rows.push(['Confidence', d.confidence]);
  return { tt: d.name, rows };
}

function fmtPop(n) { return n == null ? '—' : (+n).toLocaleString('en-ZA'); }

function showTip(e, t) {
  const tip = document.getElementById('mapTip');
  tip.innerHTML = `<div class="tt">${esc(t.tt)}</div>
    ${(t.rows || []).map(([k, v]) => `<div class="row"><span>${esc(k)}</span><span style="text-align:right;color:#d7e0ee;max-width:240px">${esc(String(v == null ? '—' : v))}</span></div>`).join('')}`;
  tip.style.display = 'block';
  const wrap = document.getElementById('mapWrap').getBoundingClientRect();
  tip.style.left = Math.min(e.clientX - wrap.left + 14, wrap.width - 230) + 'px';
  tip.style.top = Math.min(e.clientY - wrap.top + 8, wrap.height - 160) + 'px';
}

function hideTip() { const t = document.getElementById('mapTip'); t.style.display = 'none'; }

function selectProvince(d) {
  const m = d.model;
  document.getElementById('selProv').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center">
      <b>${esc(d.info.name)}</b>
      <span>Readiness proxy <b class="hl-amber num">${m.score}</b> ${ktag('inferred')}</span>
    </div>
    <div class="small mt6 dim">${esc(d.info.note || '')}</div>
    <div class="kv mt6">
      <span class="k">Capital</span><span class="v">${esc(d.info.capital || '—')}</span>
      <span class="k">Census 2022 pop</span><span class="v num">${fmtPop(d.info.population)}</span>
      <span class="k">Area</span><span class="v num">${fmtPop(d.info.areaKm2)} km²</span>
      <span class="k">Mine sites</span><span class="v">${m.mine}</span>
      <span class="k">Metros</span><span class="v">${m.metro}</span>
    </div>
    <div class="muted small mt6">Next step: build a provincial SAMRI with primary RTMC/SANRAL/municipal data for this province.</div>`;
}