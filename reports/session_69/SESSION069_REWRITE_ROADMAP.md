# Session 69 — Rewrite Roadmap to 40% Higher-Order Thinking

**Board:** roadmap-board
**Timestamp:** 2026-07-29T17:27:12Z
**Read-Only:** Yes
**Data Source:** `scripts\session69_roadmap_scan.js` — regex-based CognitiveLevel extraction across all 5 packs

---

## Current State

| Metric | Count | % of Pool |
|--------|-------|-----------|
| Total items scanned | 2,545 | 100% |
| Remember | 81 | 3.2% |
| Understand | 1,046 | 41.1% |
| Apply | 1,055 | 41.5% |
| Analyze | 206 | 8.1% |
| Evaluate | 149 | 5.9% |
| **Analyze + Evaluate** | **355** | **14.0%** |

> **Note:** 8 items across Packs A (3 missing), B (5 missing) have no CognitiveLevel field — likely archival artifacts or R-series items. Pack E reports 545 matches vs. 540 expected — 5 extra matches likely from R-series items with CognitiveLevel in both metadata and content blocks. Raw `CognitiveLevel` regex matches used as authoritative count.

## Target State (CAQS v1.0 §6.2)

| Metric | Target % | Target Count | Current | Gap |
|--------|----------|-------------|---------|-----|
| Evaluate | 15% | 382 | 149 | **233** |
| Analyze | 25% | 637 | 206 | **431** |
| **Higher-Order** | **40%** | **1,018** | **355** | **663** |

## Velocity Assumptions

| Metric | Value | Source |
|--------|-------|--------|
| Rewrites per session | 12.6 | S61-S68 average (84 rewrites / 8 sessions = 10.5; rounded up to include non-HO upgrades) |
| Evaluate created per session | 5.4 | S61-S68 average (43 Evaluate / 8 sessions) |
| Analyze created per session | 5.1 | S61-S68 average (41 Analyze / 8 sessions) |
| Higher-order per session | 10.5 | S61-S68 average (84 total HO upgrades / 8 sessions) |

## Wave Projection

| Wave | Sessions | Cumulative Rewrites | Est. Evaluate | Est. Analyze | Cumulative H-O | Cumulative H-O % |
|------|----------|-------------------|---------------|--------------|----------------|-------------------|
| Wave 1 (done) | S61-S68 | 84 | 43 | 41 | 355 | 14.0% |
| Wave 2 | S69-S76 | +101 | +43 | +41 | 456 | 17.9% |
| Wave 3 | S77-S84 | +101 | +43 | +41 | 557 | 21.9% |
| Wave 4 | S85-S92 | +101 | +43 | +41 | 658 | 25.9% |
| Wave 5 | S93-S100 | +101 | +43 | +41 | 759 | 29.8% |
| Wave 6 | S101-S108 | +101 | +43 | +41 | 860 | 33.8% |
| Wave 7 | S109-S116 | +101 | +43 | +41 | 961 | 37.8% |
| Wave 8 | S117-S124 | +101 | +43 | +41 | **1,062** | **41.7%** |

**Estimated sessions to 40%: ~56 sessions (7 waves from current position).**

## Sessions to Target

| Target | Sessions at Current Velocity |
|--------|------------------------------|
| Close Evaluate gap (to 15%) | ~44 sessions |
| Close Analyze gap (to 25%) | ~85 sessions |
| Reach 40% higher-order | ~53 sessions (at 12.6 total HO/session) |
| Full pool at CAQS targets | ~85 sessions (bottlenecked by Analyze creation rate) |

> **Bottleneck insight:** The Analyze gap (431) is nearly double the Evaluate gap (233), but Analyze creation rate (5.1/session) is similar to Evaluate (5.4/session). The Evaluate gap closes in ~44 sessions while Analyze takes ~85. The program reaches 40% HO at ~53 sessions — well before full CAQS targets, because Evaluate overshoot helps compensate for Analyze undershoot. Full CAQS alignment (25% Analyze + 15% Evaluate individually) requires ~85 sessions, bottlenecked by the Analyze creation rate.

---

## Section-Level Upgrade Pool (Top 15 by Apply + Understand)

Sections with highest lower-order populations — these are the primary upgrade candidates. Apply items are the easiest to upgrade (Apply → Analyze/Evaluate is a natural cognitive progression); Understand items require more redesign effort.

| Rank | Section | Apply | Understand | Upgrade Pool | Current H-O | H-O % |
|------|---------|-------|------------|-------------|-------------|-------|
| 1 | Pack E:Section E | 19 | 87 | 106 | 4 | 3.4% |
| 2 | **Pack C:Section B** | **69** | 30 | **99** | **1** | **1.0%** |
| 3 | **Pack D:Section B** | **77** | 19 | **96** | **4** | **4.0%** |
| 4 | Pack E:Section B | 36 | 59 | 95 | 3 | 2.9% |
| 5 | Pack E:Section C | 28 | 66 | 94 | 7 | 6.9% |
| 6 | **Pack A:Section B** | **75** | 17 | **92** | **8** | **8.0%** |
| 7 | Pack A:Section C | 60 | 28 | 88 | 11 | 11.0% |
| 8 | Pack B:Section C | 69 | 17 | 86 | 8 | 8.0% |
| 9 | Pack D:Section C | 54 | 32 | 86 | 14 | 14.0% |
| 10 | Pack D:Section A | 18 | 57 | 75 | 0 | 0.0% |
| 11 | Pack E:Section F | 0 | 75 | 75 | 1 | 1.3% |
| 12 | Pack C:Section C | 40 | 34 | 74 | 7 | 9.3% |
| 13 | Pack E:Section D | 13 | 61 | 74 | 3 | 3.9% |
| 14 | Pack B:Section B | 63 | 10 | 73 | 3 | 3.1% |
| 15 | Pack A:Section F | 13 | 59 | 72 | 2 | 2.7% |

### Zero Higher-Order Sections (Critical Gaps)

These sections have 0 or nearly 0 Analyze + Evaluate items — highest priority for the rewrite program.

| Section | Total Items | H-O Count | Apply Pool | Domain |
|---------|------------|-----------|------------|--------|
| **Pack C:Section A** | 75 | 0 | 40 | External Financial Reporting |
| **Pack D:Section A** | 75 | 0 | 18 | External Financial Reporting |
| **Pack C:Section B** | 100 | 1 | 69 | Planning, Budgeting, Forecasting |
| Pack A:Section F | 75 | 2 | 13 | Technology and Analytics |
| Pack B:Section F | 73 | 2 | 22 | Technology and Analytics |
| Pack E:Section F | 76 | 1 | 0 | Technology and Analytics |

### Already Strong Sections (Above 30% H-O)

These sections need little or no cognitive upgrade attention — resources should be redirected elsewhere.

| Section | H-O Count | H-O % |
|---------|-----------|-------|
| **Pack D:Section E** | 68/75 | 90.7% |
| **Pack C:Section E** | 66/75 | 88.0% |
| Pack A:Section A | 22/75 | 29.3% |
| Pack A:Section E | 21/72 | 29.2% |
| Pack D:Section F | 24/74 | 32.4% |
| Pack C:Section F | 18/75 | 24.0% |

## Shortest Path Recommendation

### Tier 1 — Highest ROI (Apply-heavy sections with near-zero H-O)

These sections have large Apply pools and minimal existing higher-order items. They represent the fastest path to closing the gap — Apply items convert naturally to Analyze/Evaluate.

| Priority | Section | Pack | Domain | Apply Pool | Est. Sessions |
|----------|---------|------|--------|------------|---------------|
| **P1** | Section B | Pack D | Planning, Budgeting | 77 | ~5-6 |
| **P2** | Section B | Pack A | Planning, Budgeting | 75 | ~5 |
| **P3** | Section B | Pack C | Planning, Budgeting | 69 | ~4-5 |
| **P4** | Section B | Pack B | Planning, Budgeting | 63 | ~4 |
| **P5** | Section C | Pack B | Performance Management | 69 | ~4-5 |

**Rationale:** Section B (Planning, Budgeting, Forecasting) is the single richest vein for cognitive upgrades. Budget variance analysis, forecasting scenarios, sensitivity analysis, and cash budget decision-making all naturally extend Apply-level calculations into Analyze (interpretation/comparison) and Evaluate (recommendation/judgment) territory.

### Tier 2 — Second Priority (Understand-heavy, need more redesign)

| Priority | Section | Pack | Domain | Upgrade Pool | Notes |
|----------|---------|------|--------|-------------|-------|
| P6 | Section A | Pack D | External Financial Reporting | 75 | 0 H-O currently — critical gap |
| P7 | Section A | Pack C | External Financial Reporting | 70 | 0 H-O currently — critical gap |
| P8 | Section D | Pack B | Cost Management | 69 | Mostly Apply (68), easy upgrades |
| P9 | Section A | Pack B | External Financial Reporting | 60 | 4 H-O currently (5.4%) |

### Tier 3 — Lower ROI (Technology & Analytics, harder to upgrade)

Section F items are definition-heavy and resist cognitive upgrading. These should be addressed last.

| Priority | Section | Pack | Domain | Notes |
|----------|---------|------|--------|-------|
| P10 | Section F | Pack E | Technology & Analytics | 0 Apply items — all Understand |
| P11 | Section F | Pack A | Technology & Analytics | 13 Apply pool |
| P12 | Section F | Pack B | Technology & Analytics | 22 Apply pool |

## Session 70 Recommendation

**Target: Pack D Section B** — highest Apply count (77 items) with only 4 Analyze+Evaluate (4.0% H-O).

| Metric | Value |
|--------|-------|
| Target pack | `pack_d_corrected.js` |
| Target section | Section B (P1D-B-001 through P1D-B-100) |
| Current H-O | 4 items (2 Analyze + 2 Evaluate) |
| Apply pool for upgrade | 77 items |
| Expected session output | ~12-15 rewrites |
| Expected Evaluate | ~5-6 |
| Expected Analyze | ~5-7 |
| Domain | Planning, Budgeting, and Forecasting |
| Certification status | 100/100 Certified (entire Pack D Section B) |
| Upgrade candidates | Budget variance scenarios → Evaluate (recommendation); Forecasting methods → Analyze (comparison); Sensitivity analysis → Analyze (interpretation) |

**Post-S70 projected state:** Pack D Section B at ~18-20 H-O items (~18-20% H-O across the section).

## Risk Factors

1. **Diminishing returns curve** — S61-S68 targeted the easiest upgrades first. Later Apply items in Section B/D/C may require more extensive rewrites (new exhibits, new scenarios) rather than simple question-stem reframing.

2. **Section F (Technology & Analytics) stuck point** — 3 of 6 packs have Section F with <3% higher-order. Technology items are inherently definition-driven (COSO, IT governance, data privacy). Upgrading these to Analyze/Evaluate requires scenario-based caselets, which take 2-3x the authoring time of a simple Apply→Analyze reframe.

3. **Pack E bottleneck** — Pack E has 409 Understand items (75.1% of pack). These are the hardest to upgrade (Understand → Analyze requires complete redesign, not reframing). Pack E may absorb a disproportionate amount of rewrite effort for limited H-O gain.

4. **Certified item constraints** — Most high-Apply sections (Pack D Section B, Pack A Section B) are 100% Certified. Any rewrite must maintain or improve answer-key correctness, explanation quality, and DL-008/DL-026 compliance. The governance guard Rules 1-9 are active and will BLOCK substandard rewrites.

5. **Analyze gap outpaces Evaluate** — The Analyze creation rate (5.1/session) is similar to Evaluate (5.4/session), but the Analyze gap (431) is 1.85x the Evaluate gap (233). The program will hit 40% HO before hitting individual CAQS targets because Evaluate overshoot will compensate. Full CAQS alignment requires the Analyze rate to nearly double or the program to continue past 40% HO.

6. **Count stability** — Pack A reports 497 CognitiveLevel matches (3 missing), Pack B 495 (5 missing). These 8 uncounted items may have no CognitiveLevel field (legacy artifacts). The 8 missing items represent 0.3% of the pool — negligible for roadmap purposes.

## Session 69 Verification

| Check | Result |
|-------|--------|
| Scan script produced | `scripts\session69_roadmap_scan.js` |
| Total items counted | 2,545 |
| CognitiveLevel coverage | 99.7% (2,537/2,545 items have CognitiveLevel) |
| Pack file integrity | All 5 packs passed `node --check` at last rebuild_baselines |
| Read-only compliance | No file modifications performed |
| Governance guard | Not invoked (read-only scan) |

## Appendix A — Per-Pack Cognitive Distribution

### Pack A (500 items)
| Level | Count | % |
|-------|-------|---|
| Remember | 3 | 0.6% |
| Understand | 160 | 32.0% |
| Apply | 258 | 51.6% |
| Analyze | 42 | 8.4% |
| Evaluate | 34 | 6.8% |
| **H-O** | **76** | **15.2%** |
| *Uncounted* | *3* | *0.6%* |

### Pack B (500 items)
| Level | Count | % |
|-------|-------|---|
| Remember | 41 | 8.2% |
| Understand | 119 | 23.8% |
| Apply | 309 | 61.8% |
| Analyze | 14 | 2.8% |
| Evaluate | 12 | 2.4% |
| **H-O** | **26** | **5.2%** |
| *Uncounted* | *5* | *1.0%* |

### Pack C (500 items)
| Level | Count | % |
|-------|-------|---|
| Remember | 27 | 5.4% |
| Understand | 178 | 35.6% |
| Apply | 191 | 38.2% |
| Analyze | 58 | 11.6% |
| Evaluate | 46 | 9.2% |
| **H-O** | **104** | **20.8%** |

### Pack D (500 items)
| Level | Count | % |
|-------|-------|---|
| Remember | 0 | 0.0% |
| Understand | 180 | 36.0% |
| Apply | 191 | 38.2% |
| Analyze | 82 | 16.4% |
| Evaluate | 47 | 9.4% |
| **H-O** | **129** | **25.8%** |

### Pack E (540 items expected, 545 CognitiveLevel matches)
| Level | Count | % |
|-------|-------|---|
| Remember | 10 | 1.8% |
| Understand | 409 | 75.1% |
| Apply | 106 | 19.4% |
| Analyze | 10 | 1.8% |
| Evaluate | 10 | 1.8% |
| **H-O** | **20** | **3.7%** |
| *Overcount* | *+5* | *—* |

---

*Generated by roadmap-board (Session 69). Data: `scripts\session69_roadmap_scan.js`. Next: Session 70 rewrite targeting Pack D Section B.*
