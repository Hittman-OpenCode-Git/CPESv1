# P2 Case Certification Record — 2026-09-19 (#3 Program)

**Authority:** User approval "okay, proceed with 3" (2026-09-19). CAQS §1.7.2 + QUESTION_METADATA_STANDARD §9.
**Method:** 3 parallel read-only agents (p2_1: 33 items, p2_2: 18, p2_3: 18), six P2-adapted dimensions at HIGH bar; author spot-checked 7 fresh items (all corroborate, incl. E3-Q6 fix scope); flips via `scripts/flip_cert.js` (assert-Unprocessed-or-abort) in Rule-5 batches 16/14/18/10 + E3-Q6 rationale repair. Backups `.bak-CERT-20260919123815` (all 3 files).
**Result:** 58 CERTIFY flips (57 clean + E3-Q6 post-fix) + 11 HOLDs (→ DL-056). Pool 88 → 96 strict-eligible cases. Screens stable; preflight/smoke/pipeline green.

Tier codes: T = correct/target behavior; t1/t2/t3 = traps in listed order. Evidence = exhibit-derived.

## p2_1 — D2 (Flash Capital ERM, Sec D) — 6/6 CERTIFY
| Item | Key | Tiers | Evidence |
|------|-----|-------|----------|
| D2-Q1 | capacity-ceiling vs appetite-band | T:A; t:B(staffing) C(terms) D(credit-only) | capacity=survival ceiling, appetite=operating band |
| D2-Q2 | Comp-1 Governance&Culture | T:C; t:A(Comp3) B(Comp5) D(Comp4) | tone-at-top founds all else (COSO ERM 2017) |
| D2-Q3 | vendor +3/150%, lag 63d | T:A; t:B(credit-mislabel) C(compliance) D(operational) | 3-way absolute tie; vendor wins rate + lag 63≫47 |
| D2-Q4 | 90-day register, scope-deeper-later | T:B; t:A(overcommit) C(defer) D(outsource-tone) | $340M integration + $14M near-misses ⇒ proportionate |
| D2-Q5 | CRO/Caldwell + mandate | T:B; t:A(CCO-reach) C(CEO-distance) D(chair-invert) | cross-silo authority + board-written accountability |
| D2-Q6 | escalate ISO 31000 | T:B; t:A(stay-course) C(leap-COSO) D(defer) | vendor cadence + unfunded control ⇒ process gap |

## p2_1 — F2 (Logistics ethics, Sec F) — 6/6 CERTIFY
| Item | Key | Tiers | Evidence |
|------|-----|-------|----------|
| F2-Q1 | supervisor-exhausted→audit-chair | T:B; t:A(resign-first) C(counsel-first) D(sign-protest) | Hoffmann raised/dismissed ⇒ next rung AC |
| F2-Q2 | PO-satisfied (over-time/point-in-time) | T:B; t:A(cash) C(invoice) D(acceptance-only) | ASC 606-10-25-1: performance, not cash |
| F2-Q3 | 6.6%/7.0%, SAB 99/SOX 302/10b-5 | T:B; t:A(routine) C(subsidiary-myth) D(5%-myth) | 11.4/173.8=6.56%; 11.4/162.4=7.02% |
| F2-Q4 | Integrity+Credibility + refuse/escalate | T:C; t:A(confid-only) B(competence) D(objectivity) | 7% suppression ⇒ conflicts + withheld-info |
| F2-Q5 | hotline→committee→resign, no signing | T:C; t:A(sign-first) B(sign-insert) D(resign-first) | believed-misstated package never curable |
| F2-Q6 | anonymized principles-frame | T:B; t:A(avoid) C(naming) D(defer) | forward generic framing, no names/amounts |

## p2_1 — A4 (Flash Foods, Sec A) — 4/6 CERTIFY (Q1,Q2 HOLD → DL-056)
| Item | Key | Tiers | Evidence |
|------|-----|-------|----------|
| A4-Q3 | MLTN holistic weighing | T:C; t:A(shortfall-trigger) B(skip-qual) D(year-only) | ASC 350-20-35-3: 18% dip = indicator, not trigger |
| A4-Q4 | eliminate $2M unrealized | T:B; t:A(revenue-only) C(defer) D(NCI) | $14M sale + $2M markup; 100% owned ⇒ full elim (ASC 810) |
| A4-Q5 | document-MLTN, test if inconclusive | T:C; t:A(always-quant) B(any-indicator) D(held-sale) | balances cost vs auditability |
| A4-Q6 | full ASC 280 set + reconciliations | T:B; t:A(rev+assets) C(5%-myth) D(redundant) | ASC 280-10-50 |

## p2_1 — B4 (Flash Industrial financing, Sec B) — 5/6 CERTIFY (Q4 HOLD → DL-056)
| Item | Key | Tiers | Evidence |
|------|-----|-------|----------|
| B4-Q1 | B 7.45% (FIX VERIFIED) | T:B; t:A(8.13 no-shield) C(9.44 pre-tax) D(10.18 unweighted) | 0.60×6.40%×0.75+0.40×11.50% = 7.48% |
| B4-Q2 | one-notch (BBB+→BBB) | T:C; t:A(no-change) B(two-notch) D(upgrade) | single leverage trigger ⇒ −1 notch |
| B4-Q3 | retained→debt→equity vs shield/distress | T:A; t:B(pecking-1.4) C(equity-first) D(bucket) | Myers-Majluf vs static-tradeoff |
| B4-Q5 | tradeoff-dependent | T:C; t:A(sale-universal) B(debt-universal) D(equity-default) | shield vs EBIT vs optionality; no dominant |
| B4-Q6 | marginal-shield=marginal-distress | T:B; t:A(max-lev) C(refi-higher) D(recap-rating) | static-tradeoff + asymmetry caveat |

## p2_1 — C4 (Make-vs-buy, Sec C) — 6/6 CERTIFY
| Item | Key | Tiers | Evidence |
|------|-----|-------|----------|
| C4-Q1 | incremental/avoidable/differential | T:B; t:A(allocated) C(sunk-invert) D(gross-9v12) | in-house 9−4=5M vs outsource 12M |
| C4-Q2 | in-house by ≈$27M | T:A; t:B(sign-flip) C(perpetuity) D(premium-gap) | 12×3.8897−5×3.8897 = 27.23 |
| C4-Q3 | capital/speed/scale vs control | T:B; t:A(SOX-exempt) C(zero-integr) D(overrun) | $10–18M premium doesn't erase $27M |
| C4-Q4 | Q*=(FixedO−FixedI)/(vI−vO) | T:A; t:B(Q=0) C(CoC) D(half) | algebra verified |
| C4-Q5 | hybrid core-in/noncore-out | T:C; t:A(uncond-in) B(uncond-out) D(defer) | NPV + flexibility under uncertainty |
| C4-Q6 | arm's-length + benchmarking + BEPS | T:B; t:A(at-cost) C(max-penalty) D(treasury) | after-tax decision cost (Sec-C coherent) |

## p2_1 — E3 (Capital allocation, Sec E) — Q4,Q5 CERTIFY + Q6 CERTIFY POST-FIX (Q1–Q3 already effective-Certified)
| Item | Key | Tiers | Evidence |
|------|-----|-------|----------|
| E3-Q4 | Gamma $15.0M + customer 5/5 + resale | T:C; t:A(Alpha-NPV) B(Beta-payback) D(reject-all) | NPVs α14.80 β12.30 γ15.02; paybacks 3.4/5.3✗/4.4 |
| E3-Q5 | NPV-dominance (scale/life/timing) | T:B; t:A(IRR-wins) C(converge) D(uncomputable) | IRRs ≈18.4/14.2/16.9; NPV governs exclusion |
| E3-Q6 | Gamma (rationale REPAIRED 2026-09-19) | T:B; t:A(noise-dismiss) C(categorical-M&A) D(capitulate) | Fix: term-sheet/Meridian rationale (absent from case) → horizon (yr7 vs yr10) + NPV 15.02 + customer score. Key unchanged. Old text archived in `.bak-CERT` + git history. |

## p2_2 — A3 (Argentina/ASC 830, Sec A) — 6/6 CERTIFY
A3-Q1 current-rate/AOCI (t: hyper-temporal, avg-rate, FV/IAS29) · Q2 CPI-restate+close-1580 (t: rate-swap, avg-CPI, double-close) · Q3 hyper-gain-to-income (t: OCI-defer, indefinite, RE-reclass) · Q4 integral/self-sustaining vs foreign-op (t: identical, inverted, both-bar) · Q5 USD-functional prospective+disclose (t: prohibition, auto-AOCI, CHF-only) · Q6 lifetime-ECL + FX forecast (t: incurred-only, spot-ignore, guarantor-only). Evidence: Exh1 4.2M AR; ASC 830-10-45/830-30-45-12; ASC 326.

## p2_2 — F3 (Ethics/inquiry, Sec F) — 6/6 CERTIFY
F3-Q1 two-step quant+overlay (t: 5%-only, auto-material, Wells-timing) · Q2 disclose-not-accrue (t: any-inquiry, 5%-confuse, no-estimable) · Q3 302-fair/DC&P + 404-ICFR (t: identical, swapped, neither) · Q4 Credibility full-disclosure (t: confid-overclaim, competence, integrity-generic) · Q5 brief-factual 10-Q + written AC (t: omit-<1%, Wells-wait, social-only) · Q6 omission-misleads (t: harms-cynicism, Wells-only, timing-only). Evidence: 4.2/162=2.6%, 4.2/1180=0.36%; ASC 450-20; SAB 99.

## p2_2 — B3 (Payout, Sec B) — 6/6 CERTIFY
B3-Q1 residual $0 (t: fixed-48, partial-residual, additive-120) · Q2 DPS 2.20/0.73x (t: annualization, forget-×4, old-DPS) · Q3 MM no-impact (t: wealth-destroy, bird-hand, concentration) · Q4 indifferent + tender flexibility (t: inverted, distress-only, no-clientele) · Q5 moderate + defer + prefund (t: full-hike, suspend, hold) · Q6 dividend credible commitment (t: neg-NPV, overvalued, strong-form). Evidence: NI80/capex90/WC30; 0.55×4=2.20; FCF55+cash210.

## p2_3 — C3-Q2 CERTIFY (rest HOLD → DL-056)
C3-Q2: full-A max-CM (t: suboptimal-B $264k, weakest-C $180k, 2.00-hr misread) | 12,000×$28.04=$336,480; 12,000/2.14=5,607 units.

## p2_3 — D2-Q2,Q3,Q5 CERTIFY (rest HOLD → DL-056)
D2-Q2: 1.3σ/frequent-amber (t: 0.9σ-units, 2.0σ/3.0%, never-normal) | (2.5−1.6)/0.7=1.29 · D2-Q3: four-eyes+flags+SoD+testing (t: unlimited, single-analyst, offshoring) | COSO ERM P10 · D2-Q5: CDS-if-premium<EL (t: zero-risk, interchangeable, no-basis) | $1.6M overlay vs $4M EL.

## p2_3 — E3-Q1..Q6 CERTIFY (6/6)
E3-Q1 annuity+salvage+shield DCF (t: undiscounted, zero-NPV, nominal) | $46.5M stipulated; PVIFA 8.5%,8=5.639 · Q2 32×0.79+34.56×0.21=$32.54M≈$32.5M (t: shield-irrelevant, double-count, shield-only) · Q3 +$7.2M→$53.7M robust (t: options-n/a, option=NPV, option=CF) · Q4 −31% cushion-narrows (t: WACC-only, higher-raises, fixed-8.5) | (32.0−46.5)/46.5=−31.2% · Q5 phase/finance+covenants (t: ignore-envelope, hard-ceiling, cancel-DC) | $180M vs $140M · Q6 NPV-superior+reinvestment (t: IRR-dominance, CEO-pref, conflict-disqual).

## Corrections to agent returns (author-verified)
- E3-Q2/Q3 (CBQ21-E3) HAVE Topics ("NPV with qualitative scoring") — agent's missing-Topic claim refuted by raw read. No action.
- CBQ23-E3-Q1/Q2/Q3: keys independently hand-solved correct (34260 rounding; 5.20 PV; 8.67 WACC post-fix) during DL-051.

## HOLDs → DL-056 (11, all remain Unprocessed, all excluded from strict pool)
D1: A4-Q1 (goodwill $20M, no correct option), A4-Q2 (8.49% fails 10%; assets-only), B4-Q4 ($2.11M vs $1.98M), C3-Q1 (5,529 vs 4,640 hrs). D3: D2-Q1 (definition recall labeled Apply/Moderate; Rule 12 bars relabel → stem rewrite required). D4: C3-Q3/Q4/Q5/Q6, D2-Q4/Q6 (EW misassignment; keys intact).
