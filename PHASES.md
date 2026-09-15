# PHASES.md — six-phase rollout program

The dashboard is built as the **negotiation layer**: a truthful, evidence-labelled picture of where SA stands and what to do first. Every later phase plugs into this base without changing its honesty contract.

## Phase 1 — Foundation (DONE, this build)
- Zero-dep web platform, 17-dataset knowledge base, 13 screens, honest labelling.
- Scoring engines in place: SAMRI (national **44**, coverage 100%, confidence 47% — all ESTIMATED), corridor readiness (40–61), opportunity tiers (S/A/B/C/D).
- Entry: `node server.js` → `http://localhost:4173`.

## Phase 2 — Data ingestion layer
Replace ESTIMATED inputs with measured data:
- RTMC / SAPS crash datasets → **causal opportunity engine** (per-corridor, per-municipality).
- Telematics fleet telemetry (speed, braking, lane discipline) → **driving behaviour model** — statistical, not stereotyped.
- SANRAL/link roads pavements, signage audits → **road ontology** quantities.
- The single highest-value asset: a **public SA driving / road-scene dataset** (tier A opportunity).

## Phase 3 — Simulation layer
- National-scale scenario library (15 scenarios exist; all `not-started`).
- ODD-envelope and safety-metric schema (all fields reside in `safetyMetrics.json` as MISSING with the datasets required to activate).
- Synthetic corridor scenes from the ontology — validation before any physical test.

## Phase 4 — Mining / private-land validation
First-class domain because it is legal today:
- Private-land ADS validation (Mogalakwena AHS pattern), perimeter safety autonomy, site-readiness upgrades.
- Fleet-safety analytics on live operations as near-term commercial revenue.

## Phase 5 — Infrastructure & sub-national deployment
- Smart corridors, V2X/smart-intersection pilots, digital-road-twin for candidate corridors.
- Municipal circulation/micromobility autonomy within lanes the legal regime actually permits.

## Phase 6 — Public-road autonomy (law-gated)
- Only after the operative legal instrument exists (direction ≠ law). Currently `REGULATORY` readiness scores 18/100 and `Public-road AV` maturity 12/100.

## Governing rules across all phases
1. Nothing unpublished as fact. ESTIMATED is always labelled, confidence is always shown.
2. Every metric carries source, methodology, sample size, and test conditions — no bare numbers.
3. The system actively searches for blind spots (see Knowledge → gap register).
4. Strategy windows are re-normalised monthly (Phase 1 delivered: do-now / month / quarter cadence).