--- Source: /home/lottie/.hermes/skills/research/academic-whitepaper-authoring/references/front-back-matter.md ---
1|# Front matter & back matter pattern for this whitepaper
2|
3|Verified working structure for the tokenomics/SCHOOL whitepaper (HTML + weasyprint
4|PDF). Order of document:
5|
6|  Cover figure (page 1, alone) -> Executive Abstract (1 page) -> Author's
7|  Foreword -> TOC -> Chapters 1..N -> Glossary (at end).
8|
9|## Cover figure
10|- Generate via `image_generate` (FAL FLUX). ALWAYS instruct "no text, no
11|  letters, no words, no numbers, no equations, no labels of any kind anywhere."
12|  The first attempt included garbled AI-text labels ("brandwwd", "Ecomte") which
13|  are UNACCEPTABLE on a cover — regenerate without text, then overlay the real
14|  title as HTML/CSS instead.
15|- Download the returned URL locally (`assets/cover_figure.png`) so weasyprint
16|  embeds it reliably. Verify embedding by checking for an `/Image` XObject on
17|  page 1 (pypdf: `page.get('/Resources')['/XObject']`), NOT by grepping for
18|  "PNG" (weasyprint re-encodes, so raw PNG streams are absent).
19|- CSS: `.cover { position:relative; page-break-after:always; }` with an
20|  absolutely-positioned `.cover-title` overlay (title, subtitle, byline) and a
21|  text-shadow for legibility over the image.
22|
23|## Executive Abstract
24|One tight page, 4 paragraphs: (1) thermodynamic floor + the "100x" correction
25|with the real J/token ratio, (2) measurement framework + the 100-item Q result
26|with CIs, (3) historical frame (fusion of horizons), (4) numbered contributions.
27|No padding; every claim is one already proven in the body.
28|
29|## Author's Foreword
30|Personal lineage (childhood coding -> grade 5 Math club/Lego Robotics/IT ->
31|grade 12 CAT) and the two grounding commitments: physics (Landauer) and history
32|(convergence). Ends on the "we are not buying magic, we are buying the
33|coordinated right to erase bits" thesis line.
34|
35|## Glossary
36|<dl> of ~20 terms, each cross-linked to its chapter (e.g. "Landauer Bound ...
37|(Chapter 10)"). Placed at the very end. Include: Bit, Byte, Hexadecimal, Token,
38|FLOP, CPU, DRAM, SoC, VRAM, von Neumann, Landauer Bound, RAG, MCP, Embedding,
39|Latent space, Reversible computing, Top-k/Temperature, Web-search, Agent,
40|Heatsink/Thermal envelope.
41|
42|## Style notes carried from the user
43|Oxford commas; formulas in `.formula-block`; every quantitative claim has a
44|primary reference; honesty caveats even when results are nuanced; verify before
45|asserting. PDF regenerated with weasyprint after every append.


--- Source: /home/lottie/.hermes/skills/research/venture-model-synthesis/references/sa_mining_economics.md ---
1|# SA Mining / Compute Economics — Knowledge Bank (condensed)
2|> Dated mid-2026; refresh figures before reuse. Verified via web_search + execute_code.
3|
4|## Landauer thermodynamic floor (ties AI inference + Bitcoin)
5|- E_min = k_B·T·ln2 = 2.87e-21 J/bit @ 300K (~0.018 eV). Confirmed experimentally.
6|- Bitcoin network ~950 EH/s (Aug 2026) of irreversible compute → ~10^10–10^11× above floor.
7|- AI inference best HW ~3e7× above floor. Both share ONE cost denominator: electricity.
8|
9|## ASIC specs / economics (illustrative, Aug 2026)
10|- Antminer S21 Pro: 234 TH/s, 3510 W, ~$2,100 (R~52k landed w/ 10% duty + 15% VAT + freight).
11|- Breakever electricity rate ≈ R2.31/kWh (at BTC $95k, network 950 EH/s, FX 18.5).
12|- PC CPU cannot mine BTC profitably (≈5 GH/s vs network; ~1.2e6 yr/block).
13|
14|## SA electricity rate bands (ZAR/kWh, illustrative)
15|- Eskom residential ~R2.40 | Bizflex ~R1.80 | Megaflex industrial ~R1.10
16|- Municipal ~R2.00 | Solar PPA ~R1.20 | Own solar (levelized 20yr) ~R0.90
17|- Eskom reportedly considering discounted daytime power for miners (2026).
18|
19|## By-product streams (the "cane & by-products" frame)
20|1 Raw BTC (volatile) · 2 Heat (~100% draw, sellable per kWh) · 3 Flexible load (grid demand-response) · 4 Green-hashrate premium (ESG, needs attestation) · 5 Optimization IP (AURA; licensable) · 6 Hardware residual (resale/scrap).
21|Verified: bagasse-equiv R0.75/kWh → raw R132/day, +all by-products R215/day (+63% margin), payback 13→8 mo.
22|
23|## Geography (best SA compute sites)
24|- KZN north coast: 10 of 14 sugar mills, bagasse+grid (by-product siting logic, not literal farming).
25|- Mpumalanga: cheapest Megaflex industrial power, coal-adjacent.
26|- Northern Cape: highest irradiance, own-solar ~R0.90/kWh.
27|- Eastern Cape: REIPPPP wind+grid.
28|
29|## Corridor shortlist (Ditshego logistics lever = R135.3bn model uplift)
30|Tier1: Sishen→Saldanha (iron), RBCT Richards Bay (coal), PGM Limpopo/NW→Durban/Maputo, chrome/ferrochrome.
31|Tier2: Durban gateway (also ASIC import landing, China=22.5% of SA imports), Maputo Corridor, SADC borders.
