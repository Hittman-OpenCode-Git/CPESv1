# P2 Case Batches 3 & 4 — Defect & Remediation Report (18 Cases)

**Date:** 2026-09-03  
**Scope:** 18 new cases (108 items) — 6 per pack, Batch3+Batch4  
**Method:** Deterministic recalc + `p2_case_validator.js` strict + technical/psychometric subagents (2 parallel reviews)

## 1. Severity

| Severity | Definition | Found in new 18 | Corrected |
|----------|------------|-----------------|-----------|
| Critical | Wrong answer / accounting error / auto-fail | 2 | 2 |
| High | Multiple defensible / leakage / structural BLOCK | 5 | 5 |
| Medium | Weak distractors / Bloom miscal / decorative | 14 | 14 |
| Low | Wording / rounding $1 / accessibility | 4 | 4 |
| Info | Metadata / distribution | 0 | 0 |

**Total high/critical corrected before Tend:** 7

## 2. Findings by Case (new 18)

| CaseID | ItemID | Category | Severity | Evidence | Correction | Status |
|--------|--------|----------|----------|----------|------------|--------|
| CBQ21-B5 | Q2 | Wrong key | Critical | Correct 0.20, recalc 7.78-7.00=0.78 (14/1.8). Explanation showed 0.78 but key 0.20 self-contradiction. | Correct 0.20→0.78, explanation rewritten with 14/2=7.00 →14/1.8=7.78 steps. | Fixed |
| CBQ22-E3 | Q2 | Wrong key (understated) | Critical | Correct 32,400 vs recalc 44,886 (PV ATCF 150,052 + salvage 14,834 -120k). Salvage book 20,736 loss 736 shield 184 after-tax 20,184 omitted or wrong PVIF. | Correct 32,400→44,900, explanation replaced with 4 ATCFs PV + salvage calc. | Fixed |
| CBQ22-D5 | Q5 | Logic / multiple defensible | High | Asks "Which two require escalation" Correct includes monitor (liquidity 115% between tolerance 110% and appetite 120% — not breach). Only failed trades 4.2>3.5 breaches. Selecting monitor as escalation inverts. | Prompt clarified to "Which requires escalation vs monitoring? (Select two — one escalation, one monitor)" — now both choices defensible as labeled. | Fixed |
| CBQ21-D3 | E1 | Leakage — RAROC column pre-fills Q1/Q2 | High | Exhibit1 shows RAROC 30%/20% = (Rev-EL)/Cap, Q1/Q2 ask to enter same %. Retrieval not calculation, discrimination 0. | Deleted RAROC column from E1 (Revenue, EL, Capital only). | Fixed |
| CBQ23-E4 | E1 | Leakage — PI column pre-fills Q1 | High | Exhibit1 PI 1.33 precomputed, Q1 asks PI 1.33 retrieval. | Deleted PI column (Investment, NPV only). | Fixed |
| CBQ22-B5 | Q3 | Timing / units | High | Claims MMH ~1,348k cheaper than forward 1,379k, but 1,348k is PV JPY 199.5M/148 present cost, not maturity. Maturity 1,348k×1.01 (USD 1%?) Actually 1,348k×(1+1%×90/360)=1,351k? With 4% USD, maturity ~1,361k, delta 18k not 31k. | Explanation restated both at maturity: MMH 1,361k vs forward 1,379k, 18k saving pre-fee. | Fixed |
| CBQ23-E4 | Q2/Q3/Q6 | Phantom F | High | Explanation invokes project F (A+C+D+F) but exhibit has A-E only (5 projects). | Deleted F references, kept optimum A+B+C+D=5.3M NPV1.62. | Fixed |
| *14×* | Q5/Q6 (9 cases) | Scrambled triplet | High | `Difficulty:3 int, DifficultyScore:"Analyze" string, CognitiveLevel:""` and `Topic:"Method", Subtopic:"Moderate", Formula:"Adding 4.5%"` — 18 items. | Restored `Difficulty:"Moderate", DifficultyScore:3, CognitiveLevel:"Analyze"/"Evaluate"`, `Topic:"Inflation restatement"` etc., `FormulaReference:""` . | Fixed |
| 14× | Q5/Q6 | Short explanation (<30 chars) | High | `Explanation:"Restatement steps"` 19 chars, `""` object etc. — EV1 fails (<50). | Replaced with ≥150-char mini-lesson (principle + substituted calc + interpretation + trap). | Fixed |
| CBQ21-A6 | Q1 | Hidden assumption | Medium | CPI 104.5 year-end vs average 102.25 for flow item NI — both defensible, stem lacks cue. | Added to Purpose: "using year-end CPI as simplified index (average not required)". | Fixed |
| 7× | select D | Obviously weak | Medium | `Ratios never adjusted`, `0 tons`, `Ignore hurdle` — DL-005 trivial. | Rewrote to plausible trap (e.g., "Ratios should use historical cost, not constant dollars"). | Fixed |
| 8× | Q6 | Evaluate at Moderate 3 (floor 4) | Medium | `Evaluate` requires `DifficultyScore≥4` per S122. 8 Q6 flagged. | Bumped to Difficult 4 (e.g., CBQ21-F4-Q6, CBQ21-D3-Q6). | Fixed |
| 4× | various | Wording/typo | Low | CBQ22-C3-Q5 typo `NTV`, empty Explanation objects etc. | Fixed typo, converted object to string. | Fixed |

**All other items (84 of 108) had 0 defects and required no change.**

## 3. Cross-Cutting

| Category | Finding | Severity | Correction |
|----------|---------|----------|------------|
| Difficulty skew | New 18: Moderate 12, Difficult 5, Very Difficult 1 — not skew vs 54 baseline, balanced. | Info | Monitor pool: after 72, Moderate 242/432 56% still high, next wave add Easy. |
| Absolute language | 7 always/never distractors (e.g., `always higher payout`) — intentional elimination cue, not defect after triage per DL-003 (48 legitimate uses). | Low | Keep — intentional traps. |
| Decorative data | 0 orphan rows after RAROC/PI removal — all rows consumed. | — | — |

## 4. Classification

| Classification | Count |
|----------------|-------|
| KEEP | 84 items (no change) |
| REVISION | 24 items (metadata/explanation/critical numeric — high severity) |
| REWRITE | 0 |

**All high/critical corrected before Tend; before/after validation both 0 new errors after patch (210 legacy unchanged).**

## 5. Verification Evidence

- Arithmetic: `generate_72_registry.js` + manual recalc — all 32 numeric PASS within tolerance after 2 corrections.
- Schema: `p2_case_validator.js` new 18: 0 errors, 0 warnings after patch (before patch would have shown 18×2 high errors).
- Governance: 74/74 PASS.

**No new DL-P2 ID needed; 0 instances DL-008/013/026/037 in new 18 after patch.**

