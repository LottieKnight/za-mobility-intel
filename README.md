# South African Autonomous Mobility Intelligence & Strategic Advancement Dashboard

A zero-dependency command-centre web application that fuses South Africa's road-reality data gap, its regulatory landscape, its research and industry base, and its commercial opportunities into a single intelligence surface — and shows the analyst exactly what is known, what is estimated, and what is missing.

## Run it

```bash
node server.js            # serves http://localhost:4173 (PORT env overrides)
```

No build step, no npm dependencies. Static ES-module SPA + a tiny Node `http` server that also exposes the knowledge base as `/api/<dataset>` JSON.

## Architecture

```
server.js                zero-dep static + /api/{dataset} JSON server + ingest API + sim runner
public/index.html        single-page shell
public/css/theme.css     command-centre design system
public/vendor/d3.v7.min.js   vendored D3 (map screen only)
public/assets/*.geojson  province boundaries + country outline
public/js/
  app.js                 bootstrap, hash router, sidebar, global search, SAMRI clock
  data.js                loads all 17 datasets + geo, builds the search index
  scoring.js             SAMRI / corridor / opportunity / maturity / cyber models
  util.js                badges, ktag(), evidence blocks, dials, meters, pipes
  screens/*.js           one module per screen (13 total)
data/*.json              17 curated HTML-friendly datasets (the knowledge base)
data/uploads/            timestamped ingest snapshots (git-ignored)
```

The knowledge base is the product. Every dataset carries `meta` (source, updated, confidence policy), evidence objects `{claim, source, publisher, date, url, type, confidence, verified, note}`, and values tagged `VERIFIED / ESTIMATED / INFERRED / UNKNOWN / MISSING`. Missing data renders as `∅` and is excluded from scoring rather than invented.

## Ingesting measured data

Operators replace `ESTIMATED` values with measured ones without touching source JSON:

- `POST /api/ingest/:dataset` — JSON `{"meta":{...},"records":[...]}`
- `POST /api/ingest/:dataset/csv` — CSV (lowercase-tolerant headers)
- Whitelisted: `corridors`, `roadSafety`, `behavioural` (maps to `driving`), `scenarios`
- Every record is validated and **rejected with a reason** if it targets an unknown corridor, factor, province, behaviour variable, or scenario id — the platform never claims it applied data to a non-existent entity.
- Applied records are merged as in-memory overlays and snapshotted to `data/uploads/`; the newest snapshot per dataset is restored on boot.
- Surface: the **Knowledge** screen "Ingest" panel (file picker, preview, commit, reload-and-re-score) and the **Driving** screen "Simulation runner".

## Simulation runner (GR Yaris Phase-3 harness)

`/home/lottie/gr_yaris_sim/engine.py` runs the NWU GR Yaris dynamic vehicle model (gears, clutch, μ-limited traction) through scenarios registered in the knowledge base, emitting per-timestep telemetry to `scenes/telemetry/` and honest `MODEL-DERIVED` metrics (compliance, jerk RMS, disengagements, near-misses, min-TTC, traction margin). It does **not** fabricate road data.

- `POST /api/sim/run` — `{"scenarioId":"SC-002","surface":0.8,"load":0}` → metrics + telemetry paths
- The Driving screen runner lets the operator run, review, and commit scenario evidence to the library (sim status flips to `simulated`) and graduate a behavioural variable to `INFERRED`.
- The endpoint shells out to `python3 gr_yaris_sim/engine.py`; set `GR_YARIS_SIM` / `GR_YARIS_SIM_PY` to override where it lives.

## Deploy

**Docker** (recommended):

```bash
docker compose up -d --build
# http://<host>:4173
```

Mount a checkout of `gr_yaris_sim` at `/srv/gr_yaris_sim` and set `GR_YARIS_SIM` in `docker-compose.yml` to unlock the Simulation Runner. Ingested data persists in the named `uploads` volume.

**systemd** (bare metal):

```bash
sudo useradd -r -m -s /usr/sbin/nologin zamobility
sudo rsync -a --exclude data/uploads . /srv/za-mobility-intel/
sudo install -m 644 deploy/za-mobility-intel.service /etc/systemd/system/
sudo mkdir -p /srv/za-mobility-intel/data/uploads && sudo chown -R zamobility: /srv/za-mobility-intel
sudo systemctl daemon-reload && sudo systemctl enable --now za-mobility-intel
```

## Screens

| # | Screen | Purpose |
|---|--------|---------|
| 1 | Command | SAMRI dial, maturity curve, alarm board, action stream, highest-leverage next move |
| 2 | Map | D3 geospatial: provinces, corridors, metros, ports, mine sites, research hubs, layered toggles |
| 3 | Corridors | 9 strategic corridors scored on 17 weighted factors with an operator-adjustable tuner |
| 4 | Regulatory | legal verdicts, law-vs-policy separation, instruments, standards (ISO/UN) |
| 5 | Safety | RTMC crash intelligence, causal opportunity engine, ADS safety-metrics command centre (all MISSING ground-truth) |
| 6 | Mining | first-class domain: 10 mine sites, readiness heat, SA capability ladder |
| 7 | Industry | telematics, mining cos, OEMs, logistics, telecoms, energy, ecosystem gaps |
| 8 | Research | Engineering 4.0, CSIR Transport Safety Lab, universities, test assets, capability matrix |
| 9 | Driving | road ontology, US-export SOP, ODD model, scenario library with sim/validation states |
| 10 | Opportunities | 18-opportunity radar scored and tiered S/A/B/C/D, portfolio view |
| 11 | Strategy | entry lanes, decision cadences, six foresight scenarios, Africa-first sequence, partnership engine, pilot template |
| 12 | Knowledge | gap register, blind spots, data assets, self-critique audit loop |
| 13 | SA vs World | competitive intelligence, country gap analysis, strategic position |

## Knowledge-honesty contract

- A value is only `VERIFIED` if a primary source is in evidence; otherwise it is `ESTIMATED`/`INFERRED`, and `UNKNOWN`/`MISSING` are shown flat out.
- Every "high-confidence" number without provenance is a red flag; the platform labels it.
- Legal claims are separated into **law** (enacted) vs **policy direction** (a public position, not an operative rule).
- Modelled outputs (SAMRI, corridor readiness, opportunity tiers) display coverage % and confidence, and flag themselves `MODEL-DERIVED`.
- The operator must never treat placeholders as facts; the data-quality notes on each screen say so explicitly.

## Roadmap

See `PHASES.md` — Phase 1 (this build) is the negotiation layer of a six-phase program. Phases 2–6 define the ingestion, simulation, fleet-validation, and sub-national deployment stack that this dashboard is designed to grow into.