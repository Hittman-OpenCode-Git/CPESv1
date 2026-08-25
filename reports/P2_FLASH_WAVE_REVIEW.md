# Flash Wave Review Report — 90 MCQs (P2-A-161…P2-F-065)

**Date:** 2026-08-24
**Review type:** Full Governance Lane — post-authoring quality gate (independent content review of subagent output)
**Scope:** All 90 items authored under Session P2-047 (15 per pack, A–F, scenario company "Flash")
**Method:** (1) mechanical/psychometric script suite; (2) six independent review agents (one per pack) solving every item from first principles without the stored key; (3) orchestrator raw-evidence re-verification of every finding rated Medium or higher. No files modified (read-only review).

---

## 1. Verdict Summary

| Metric | Result |
|--------|--------|
| Answer keys correct (independent solve = stored CorrectChoice) | **90 / 90** |
| Certification-blocking defects | **1** (P2-C-136 — answer-uniqueness) |
| Medium-severity defects (repair before learner delivery) | **6** |
| Systematic calibration defect (Evaluate floor) | **5 items** (orchestrator spec error) |
| Low-severity notes (editorial / calibration / citation) | **~12** |
| Structural violations (DL-008 / DL-026 / DL-013 / DL-037) | **0 / 0 / 0 / 0** |

**Bottom line:** The subagents produced high-quality, structurally clean content with 90/90 correct answer keys. The wave is **not certifiable as-is** — it requires one item repair (C-136), a difficulty re-rating for five Evaluate items, and six Medium-quality fixes before learner delivery. No wrong-answer-key defects were found.

---

## 2. Pack-Level Results

| Pack | Domain | PASS | REVIEW | FAIL | High | Medium | Low | Notes |
|------|--------|------|--------|------|------|--------|-----|-------|
| A | Financial Statement Analysis | 13 | 2 | 0 | 0 | 2 | 4 | A-164/A-170 defects |
| B | Corporate Finance | 13 | 2 | 0 | 0 | 2 | 5 | B-103/B-105 arithmetic incoherence |
| C | Decision Analysis | 12 | 3 | 0 | **1** | 1 | 2 | C-136 = the blocker |
| D | Risk Management (ERM) | 10 | 5 | 0 | 0 | 1 | 4 | All explanation-level, keys correct |
| E | Investment Decisions | 13 | 2 | 0 | 0 | 2 | 0 | E-071 PI premise, E-075 floor |
| F | Professional Ethics | 15 | 0 | 0 | 0 | 0 | 3 | Cleanest pack |
| **Total** | | **76** | **14** | **0** | **1** | **8** | **18** | |

---

## 3. Certification-Blocking Finding (1)

### P2-C-136 — Relevant-cost classification: two defensible answers (HIGH)

**Stem:** "Which of the following costs is NOT relevant to the make-or-buy decision?"
- **B:** "The $12,500 monthly salary of the supervisor who **would be transferred to another line** if casing production stops"
- **C (stored correct):** "The $140,000 of factory fixed overhead allocated to the casing line that will continue whether Flash makes or buys"

**Finding (verified against raw item):** A supervisor who is *reassigned* stays on the payroll — the salary does not differ between alternatives, so under standard relevant-costing doctrine it is **NOT relevant**. Choice B is therefore a second defensible answer to "NOT relevant." ExplanationWrongB even asserts "Flash no longer pays for that position," which misreads the transfer fact pattern. Answer uniqueness is violated.

**Repair:** Reword B to an unambiguously *avoidable* salary (e.g., "the salary of the supervisor who would be laid off, position eliminated, if casing production stops") so only C is NOT relevant; or reword to "transferred to another line **and the position is not backfilled**" with matching ExplanationWrongB.

---

## 4. Systematic Defect — Evaluate @ DifficultyScore 3 (5 items)

AGENTS.md §11.2 (S122 authoring rule) sets the floor **Evaluate ≥ 4**. All five items below violate it; the batch spec (P2-047) set them at Moderate(3) — an orchestrator-side spec error inherited by the subagents. Confirmed by script across all 90 items.

| QID | Topic | CognitiveLevel | DifficultyScore |
|-----|-------|----------------|-----------------|
| P2-A-175 | Earnings quality — red flags | Evaluate | 3 |
| P2-C-140 | Differential analysis — segment drop with redeployment | Evaluate | 3 |
| P2-D-065 | ERM integration with strategy | Evaluate | 3 |
| P2-E-075 | Mutually exclusive projects — scale | Evaluate | 3 |
| P2-F-065 | Ethical dilemma — resolution steps | Evaluate | 3 |

Only P2-F-062 (Evaluate@4) complies. **Repair:** raise each to DifficultyScore 4 (and Difficulty "Difficult") or re-label to Apply/Analyze where the demand is mechanical. Also fix each item's VerifiedChecks "Difficulty justified" line accordingly.

---

## 5. Medium-Severity Defects (6, all verified against raw fields)

### P2-A-164 — EWC arithmetic contradiction (DPO)
EWC states "Flash's ending inventory rose $80M, so purchases ($730M) exceed COGS" — but $730M < $900M, and the shared Flash universe (A-162: inventory $140M→$220M) would require purchases ≈ $980M. The 32-day COGS-substitution trap is correctly rejected but with a false justification. **Repair:** reword to "payables arise from purchases; substituting COGS ($900M) for purchases understates the payables period because purchases ≠ COGS here."

### P2-A-170 — "third-quarter 10-Q" vs. full-year weighting (EPS)
Stem says EPS is computed "for the third-quarter 10-Q and the board package"; the answer requires full-year weighting (8M shares issued July 1 × 6/12 = 24M → $2.25). A strict nine-month reading weights 3/9 → 22.67M → $2.38, which is not offered. **Repair:** drop "third-quarter 10-Q" (retain full-year board-package framing) or align the weighting basis explicitly.

### P2-B-103 — Distractor B / EWB incoherent arithmetic (CV)
Choice B: "25.00 — dividing the 3.5% deviation by 14 expressed as a whole number." EWB: "3.5 ÷ 14 as whole numbers yields 25.00, but 0.035 / 0.14 = 0.25." But 3.5/14 = 0.25 (= the correct answer) and 0.035/0.14 = 0.25 (also the correct answer). The described error path is impossible; the actual 25.00 path would be 3.5 / 0.14 (unit mix). **Repair:** correct Choice B and EWB to the 3.5/0.14 unit-mix error.

### P2-B-105 — Choice D / EWD impossible arithmetic + wrong direction (WACC)
EWD: "Dropping preferred and renormalizing gives 0.40/0.90 × 6.30% + 0.50/0.90 × 13% = 10.32%." Evaluated: 0.4444×6.30 + 0.5556×13 = **10.02%**, not 10.32%. Excluding the low-cost preferred and re-weighting the higher-cost components *raises* WACC above 9.72% — the claim that it "understates the true blended cost" is backwards. (The real 10.32% path charges preferred at equity's 13%.) **Repair:** correct Choice D's figure to 10.02% (or restate the error path) and rewrite EWD's direction.

### P2-E-071 — Choice D / EWD false PI premise (capital rationing)
Choice D: "Projects A and C, because they are the two highest-index projects." Actual PIs: A 1.30, B 1.25, C 1.22, D 1.22 — the two highest are **A and B**, not A and C. EWD repeats the false premise. **Repair:** correct the distractor text (and note the greedy PI sequence A→B→C happens to be the optimum here, weakening the intended lesson — consider re-designing distractors so greedy ≠ optimum).

### P2-D-064 — EC conflates COSO ERM principles (tone at the top)
EC cites "Principle 1 requires the board and CEO to… demonstrate commitment to integrity and ethical values" — that is Principle 4 (Demonstrates Commitment to Core Values); Principle 1 is Board Risk Oversight. Tone-at-the-top maps to Principles 1/3/4. **Repair:** correct the principle citation.

---

## 6. Low-Severity Notes (~12, non-blocking)

| QID | Note |
|-----|------|
| A-167 | Footnote-disclosure framing for gross margin is forced; use MD&A framing |
| A-168 | ASC 210-10 citation for ROA is a scope stretch (DL-009-adjacent) |
| A-173 | FCF single-rule Apply at Difficulty 4 is generous; 3 would be tighter |
| B-101/102/108/111 | Difficulty 3/4 slightly generous for single-formula/one-tradeoff items (not DL-031) |
| B-109 | Choice C label self-contradictory ("non-annualized … annualized premium") |
| B-112 | "Analyze" generous; Understand/Apply arguable |
| B-114 | Content overlap with B-107 (identical figures, 7.03%) — redundancy risk in wave |
| B-115 | Understand label under-stated for a CalculationItem; Apply more consistent |
| C-130 | Distractor B's premise supports the opposite of its conclusion (DL-037-adjacent) |
| C-133 | Transfer-price minimum single-rule at Difficulty 4; 3 more honest |
| D-051 | VerifiedChecks says "Remember/Diff1", stored fields are Understand/2 — self-doc mismatch |
| D-054/056/061 | EC does not name COSO ERM (2017) explicitly (EV3 gap) |
| D-060 | "Remember" under-labels a classify task; "strategic risk … in Strategy & Objective-Setting" phrasing loose |
| F-051/056/064 | Cosmetic: EW-C incompleteness; Understand-vs-Apply and Analyze-vs-Apply borderline labels |

---

## 7. What Passed Cleanly (high-confidence strengths)

- **90/90 answer keys** correct and unique (except C-136 uniqueness defect) — including all 48 calculation items re-solved by the review agents (WACC 9.72%, EAA selection, EVPI $56K, ATCF $114K, NPV −$4K, MACRS $160K, DSO/DPO/DIO chains, DuPont 15%, SGR 9%, EOQ 600, EAR 8.24%…).
- **Governance/structural:** 0 DL-008, 0 DL-026, 0 DL-013 boilerplate, 0 DL-037 inversions, 0 absent EW fields, 0 QID/Topic collisions, 0 answer streaks ≥4, positions balanced 4/4/4/3 per pack.
- **DL-031 hygiene is exemplary:** definition-match items (A-167, B-113, C-137, F-051, F-057) correctly stay Remember/Easy(1); two review agents explicitly flagged the calibration as a model for the rest of the bank.
- **Realism:** every stem names Flash with a named stakeholder and a business trigger (no textbook stems).
- **Pack F (Ethics)** and **Pack E (Investment Decisions)** are the strongest; Pack D is fully correct on keys with only explanation-level polish needed.

---

## 8. Recommended Actions Before Certification

1. Repair P2-C-136 (reword distractor B / EW_B) — the only certification blocker.
2. Re-rate the five Evaluate@3 items to DifficultyScore 4 (or re-label) per §11.2.
3. Repair the six Medium items (A-164, A-170, B-103, B-105, E-071, D-064) per §5.
4. Optionally batch the low-severity notes into the next editorial pass.
5. Re-run the mechanical suite + review-agent spot-checks after repairs, then proceed to six-dimension certification in 15-item batches (Rule 5 cap).

**Review by:** P2-048 — Flash Wave Post-Authoring Review
**Related:** REVISION_HISTORY_P2.md (P2-047 authoring), backups `pack_p2_{a–f}.js.bak-flashwave-20260824020003`

---

## 9. Repair Closeout (Session P2-049, 2026-08-24)

All certification-blocking, systematic, and Medium findings — plus the objective Low findings — were repaired in a single count-asserted change-set (46 exact-string replacements, 20 items, no answer keys changed; backups `pack_p2_{a–f}.js.bak-flashfix-20260823224200`). Full ledger in REVISION_HISTORY_P2.md P2-049.

| Section 5/3/4 finding | Status |
|---|---|
| C-136 answer-uniqueness (blocker) | ✅ Reworded distractor B/EW_B/EC — laid-off supervisor |
| Evaluate@3 × 5 (A-175, C-140, D-065, E-075, F-065) | ✅ All raised to DifficultyScore 4 + VC lines |
| A-164 EWC arithmetic contradiction | ✅ Rewritten; EC discount sentence corrected |
| A-170 10-Q weighting ambiguity | ✅ "third-quarter 10-Q" removed |
| B-103 CV distractor/EWB impossible math | ✅ Rewritten to 3.5/0.14 unit-mix path |
| B-105 WACC Choice D/EWD | ✅ 10.02% + direction corrected |
| E-071 PI-premise false | ✅ A+B (1.30/1.25) with corrected totals |
| D-064 principle conflation | ✅ Principles 1/3/4 cited |
| Low batch (A-167, A-168, A-173, B-102, B-108, B-109, B-115, C-130, C-133, D-054/056/061) | ✅ Applied |
| D-051 VerifiedChecks mismatch | ⏭️ False positive — no change needed |

**Post-repair state:** 0 Evaluate-floor violations; 0 Analyze-floor violations; mechanical suite clean on structure/formula/LOSTag/clone; both preflights 0 divergences. The 90 Flash items are repair-clean and ready for six-dimension certification (15-item batches per Rule 5) pending user direction. Remaining non-blocking notes (length-cueing pack style, borderline labels, B-114/B-107 redundancy) are documented in §6 and deferred.
