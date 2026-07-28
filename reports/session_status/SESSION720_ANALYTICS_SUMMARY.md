# SESSION 720 — Analytics Summary

**Agent:** L — Analytics Package
**Generated:** 2026-07-26
**Status:** READ-ONLY — Zero files modified
**Data sources:** 6 agent reports + S719 analytics + current grep verification

---

## 1. CognitiveLevel Distribution: S718 → S719 → S720

| CL | S718 (post-assignment) | S719 (reported) | S720 Actual (grep) | S720 Projected | CAQS Target |
|----|----------------------|-----------------|-------------------|----------------|-------------|
| Remember | 436 (17.4%) | 50 (2.0%) | **50 (2.0%)** | 57 (2.3%) | 5% |
| Understand | 614 (24.6%) | 1,168 (46.7%) | **1,156 (46.2%)** | 1,149 (46.0%) | 15% |
| Apply | 1,122 (44.9%) | 1,161 (46.4%) | **1,161 (46.4%)** | 1,161 (46.4%) | 40% |
| Analyze | 58 (2.3%) | 66 (2.6%) | **66 (2.6%)** | 66 (2.6%) | 25% |
| Evaluate | 270 (10.8%) | 55 (2.2%) | **67 (2.7%)** | 67 (2.7%) | 15% |
| **Total** | **2,500** | **2,500** | **2,500** | **2,500** | |

**Key:** S719 reported numbers are inflated by 12 B/C/D phantom items. S720 projected includes Agent C's 7 Remember restorations (not yet applied).

**Difficulty distribution (current):**
- Easy: 543 (21.7%) | Moderate-Easy: 571 (22.8%) | Moderate: 1,253 (50.1%) | Difficult: 132 (5.3%) | Very Difficult: 0 (0%) | 1 empty

**Certified items:** 2,181 (Pack A: 481, B: 500, C: 350, D: 350, E: 500)

---

## 2. Pack E Restoration — Boundary Review

| Metric | Value |
|--------|-------|
| Candidates reviewed | 70 |
| Confirmed Remember | **7 (10%)** |
| Retain Understand | 60 (85.7%) |
| Upgrade to Apply | 2 (2.9%) |
| Escalate | 1 (1.4%) |

**Section breakdown of 7 restorations:** A: 1, B: 3, E: 3

**Key finding:** Automated classifier had 85.7% false-positive rate. Only 10% of flagged candidates are genuine Remember items. All 7 have cross-domain distractors enabling domain-disjoint elimination per ALIGNMENT_MAINTENANCE_GUIDE.md §2.1 Q3 rule.

---

## 3. Reliability Trend

| Session | Agreement | Method |
|---------|-----------|--------|
| S717 | 71.0% | Baseline |
| S719 | 72.0% | Retest (recalibrated items only) |
| S720 | **73.7%** | 388-item sample + 48 manual overrides |

**Trend:** +1.3pp per session. Recalibrated packs: 81-86% agreement. Non-recalibrated controls: 47%.

**Main hotspot:** Apply→Understand boundary — 88 of 102 disagreements (86.3%). The classification system cannot reliably distinguish "applying a procedure" from "understanding how to apply a procedure."

---

## 4. DCS §3 Compliance

| Metric | Value |
|--------|-------|
| Overall compliance | **89.3%** (2,233/2,500) |
| Severe misalignments | 267 (down from 1,604 pre-S719) |
| Worst sections | B (57), C (53), F (50) |
| Dominant pattern | **Apply@Easy — 184 items** |

12 Evaluate@Easy items remain (Section C: 6, E: 5, F: 1) — S719 resolved 92.9%.

---

## 5. Cross-Pack Consistency

**Verdict:** Pack E uses a different taxonomy.

- Packs A-D: internally consistent (moderate variance)
- Pack E: diverges on all 4 consistency patterns (definition-match, standard-application, calculation, framework-application)
- Section E (Internal Controls): 4 different dominant CLs across packs for equivalent content
- **Recommendation:** Pack E needs full CL re-audit beyond S719 normalization

---

## 6. Analyze Gap

| Metric | Value |
|--------|-------|
| Labeled Analyze | 66 (2.64%) |
| DL-012 clone fakes | 48 (72.7%) |
| Genuine Analyze | **~33 (1.32%)** |
| CAQS target | 625 (25%) |
| Structural gap | **~592 new items needed** |

**Worst section:** A — 0 Analyze items across all packs. **Best section:** E — Pack B Section E COSO/ERM scenarios.
**Separate issue:** 47 computational items labeled Understand (should be Apply).

---

## 7. S719 Reporting Discrepancies

3 HIGH-severity discrepancies found:
1. S719 Analytics Package pool-wide CL totals are wrong by ±12 items (phantom B/C/D changes)
2. Items modified: 542 (actual) vs 554 (reported)
3. 168 Evaluate→Understand claimed; actual delta = -156

All core S719 execution was sound: 542 items correctly modified. The reporting artifacts affect downstream analytics that use S719 data as source.

---

## 8. Biggest Surprise Finding

**72.7% of "Analyze" items are counterfeit.** 48 of 66 items labeled Analyze are definition-match clones testing basic concept recognition. Only ~33 items in the entire 2,500-item pool require genuine analytical thinking. Section A — the CMA domain richest in judgment scenarios — has zero Analyze items.

**Second finding:** 93% of pool is Understand+Apply. The cognitive spread is dangerously narrow with no room for genuine higher-order thinking.

**Third finding:** Pack E uses an entirely different taxonomy from Packs A-D, even after S719 normalization. 80% of Pack E is Understand but it's a different kind of Understand than Packs A-D — requires full re-audit.

**Fourth finding:** S719's official analytics deliverables contain systematic phantom data — 12 B/C/D items reported as changed that were never executed. Every downstream dataset using S719 analytics as source will carry this error.

---

## Key Recommendations

1. **Apply 7 Remember restorations** to Pack E (10% confirmation rate, manually verified)
2. **Downgrade 48 clone "Analyze" items** to Understand (removes counterfeit Analyze)
3. **Recode 47 computational items** Understand→Apply (systematic template error)
4. **Clarify Apply/Understand boundary** in ALIGNMENT_MAINTENANCE_GUIDE.md (86.3% of disagreements live here)
5. **Pack E full re-audit** — different taxonomy requires per-item review
6. **Author ~580 new Analyze items** — structural gap, not calibration fix
