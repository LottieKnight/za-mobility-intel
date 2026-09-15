// util.js — DOM/format helpers
export const esc = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export function el(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
}

export const fmt = (n, d = 0) => (n == null || isNaN(n) ? '\u2205' : n.toLocaleString('en-ZA', { maximumFractionDigits: d }));

export const pct = (n, d = 0) => (n == null ? '\u2205' : n.toFixed(d) + '%');

export const band = (n) => {
  if (n == null) return 'grey';
  if (n >= 80) return 'green';
  if (n >= 60) return 'blue';
  if (n >= 40) return 'yellow';
  if (n >= 20) return 'orange';
  return 'red';
};

export const heat = (n) => {
  if (n == null) return 'transparent';
  const h = Math.max(0, Math.min(100, n));
  if (h >= 70) return '#35c480';
  if (h >= 45) return '#f5b942';
  if (h >= 20) return '#f08f3c';
  return '#f0564a';
};

const KSTATE = { verified: 'verified', estimated: 'estimated', inferred: 'inferred', unknown: 'unknown', missing: 'missing' };

export function ktag(src) {
  const k = (src || '').toLowerCase();
  const cls = KSTATE[k] || 'missing';
  const label = (k === 'missing' || !k) ? 'MISSING' : k.replace(/[_]/g, '-');
  return `<span class="ktag ${cls}">${esc(label)}</span>`;
}

export function badge(text, cls = 'grey') {
  return `<span class="badge ${cls}">${esc(text)}</span>`;
}

export function tierTag(t) {
  return `<span class="tier ${esc(t)}">${esc(t)}-TIER</span>`;
}

export function confBar(conf) {
  if (conf == null) return '<div class="conf-bar"><i></i><i></i><i></i><i></i><i></i></div>';
  const n = Math.max(1, Math.min(5, Math.round(conf / 20)));
  let out = '<div class="conf-bar">';
  for (let i = 1; i <= 5; i++) {
    const cls = i <= n ? (n >= 4 ? 'on hi' : n >= 3 ? 'on mid' : 'on lo') : '';
    const w = i <= n ? 24 : 24;
    out += `<i class="${cls}" style="width:${w}px"></i>`;
  }
  return out + '</div>';
}

export function evBlock(evs) {
  if (!evs || !evs.length) return '';
  return evs.map((e) => `
    <div class="ev">
      <div class="head">
        ${badge(e.type || 'TERTIARY', e.type === 'PRIMARY' ? 'green' : e.type === 'SECONDARY' ? 'blue' : 'grey')}
        ${badge('conf ' + (e.confidence ?? '?') + '%', 'gold')}
        <span class="tag-t">${esc(e.publisher || '')}</span><span class="tag-t">${esc(e.date || '')}</span><span class="tag-t">${e.verified ? 'verified ' + e.verified : ''}</span>
      </div>
      <div class="claim">${esc(e.claim || '')}</div>
      <div class="meta">source: ${esc(e.source || '—')}${e.note ? ' · note: ' + esc(e.note) : ''}${e.url ? ' · ' + `<a href="${esc(e.url)}" target="_blank" rel="noopener">link</a>` : ''}</div>
    </div>`).join('');
}

export function rawNote(n) {
  return n ? `<div class="muted small mt6">${esc(n)}</div>` : '';
}

export function pipe(status, pipeline) {
  if (!pipeline) return '';
  const i = pipeline.indexOf(status);
  return `<div class="pipe">${pipeline.map((s, j) => {
    let cls = 'step';
    if (j < i) cls += ' done';
    if (j === i) cls += ' on';
    return `<span class="${cls}">${esc(s)}</span>`;
  }).join('')}</div>`;
}

export function statTile({ label, value, unit, foot, cls = '', sm }) {
  return `<div class="tile ${cls}">
    <div class="label">${esc(label)}</div>
    <div class="value ${sm ? 'sm' : ''}">${value}${unit ? `<span class="unit"> ${esc(unit)}</span>` : ''}</div>
    ${foot ? `<div class="foot">${foot}</div>` : ''}
  </div>`;
}

export function meterRow(label, v, max = 100, color) {
  const c = color || heat(v);
  const vv = v == null ? 0 : v;
  return `<div class="meter"><span class="lk">${esc(label)}</span>
    <span class="track"><span class="fill" style="width:${Math.max(0, Math.min(100, vv / max * 100))}%;background:${c}"></span></span>
    <span class="val">${v == null ? '\u2205' : fmt(v)}</span></div>`;
}

export function heatRow(label, v) {
  const c = v == null ? '#2c3a52' : heat(v);
  return `<div class="heatbar-row"><span class="lk">${esc(label)}</span>
    <span class="heat" style="flex:1"><span style="width:${v == null ? 0 : Math.max(0, Math.min(100, v))}%;background:${c};display:block;height:100%;border-radius:3px"></span></span>
    <span class="val">${v == null ? '\u2205' : fmt(v)}</span></div>`;
}

export function kv(rows) {
  return `<div class="kv">${rows.map(([k, v]) => `<span class="k">${esc(k)}</span><span class="v">${v}</span>`).join('')}</div>`;
}

export function soWhat(text) {
  return `<div class="small mt6" style="color:#e8c15a">So what: ${esc(text)}</div>`;
}

// simple score dial (SVG arc)
export function dial(score, conf, label, color) {
  if (score == null) {
    return `<div class="score-dial"><div class="cap">${esc(label||'')}</div>
      <div class="num" style="color:var(--ink-faint)">\u2205</div>
      <div class="cap">NO DATA</div>${confBar(conf)}</div>`;
  }
  const c = color || heat(score);
  const r = 52, circ = 2 * Math.PI * r;
  const frac = Math.max(0, Math.min(1, score / 100));
  return `<div class="score-dial">
    <svg width="130" height="92" viewBox="0 0 130 92">
      <circle cx="65" cy="60" r="${r}" fill="none" stroke="#202b3e" stroke-width="9"/>
      <circle cx="65" cy="60" r="${r}" fill="none" stroke="${c}" stroke-width="9"
        stroke-dasharray="${(circ * frac).toFixed(1)} ${circ.toFixed(1)}"
        transform="rotate(-90 65 60)" stroke-linecap="round"/>
      <text x="65" y="58" text-anchor="middle" fill="${c}" font-size="26" font-weight="800" font-family="SFMono-Regular,monospace">${fmt(score)}</text>
      <text x="65" y="76" text-anchor="middle" fill="#56627a" font-size="9" font-family="SFMono-Regular,monospace" letter-spacing="1.5">${esc(label||'')}</text>
    </svg>
    ${confBar(conf)}
  </div>`;
}

export function spark(data, w = 140, h = 30, color = '#2fd4c7') {
  if (!data || data.length < 2) return '<span class="muted small">no trend</span>';
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((d, i) => `${(i / (data.length - 1)) * w},${h - 2 - ((d - min) / (max - min || 1)) * (h - 6)}`).join(' ');
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.6"/></svg>`;
}

export const today = () => new Date().toISOString().slice(0, 10);

export function titleCrumb(screen) { return screen.crumb || ''; }