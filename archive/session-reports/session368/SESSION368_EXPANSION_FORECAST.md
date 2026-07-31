# S368 — Expansion Throughput Simulation: Forecast

**Date:** 2026-07-28
**Session:** S368 (READ-ONLY)
**Predecessor:** S367 (Baseline Integrity Recapture)
**Type:** Throughput simulation — no file modifications

---

## 1. Current Throughput Reality

### 1.1 Measured Throughput Across Reference Sessions

The platform has documented throughput across 12+ content-editing sessions spanning defect remediation, cognitive upgrades, and net-new authoring. The data converges at **~7.5 items/session** for field-level edits (cognitive upgrades, calibrations) and **5.6 items/day** for net-new cognitive content.

| Session | Type | Items | Defects | Rate | Notes |
|---------|------|-------|---------|------|-------|
| **S899 Phase 1** | Net-new authoring | 20 | 0 | 20 items/session | Peak throughput. Clone replacement with fresh Analyze-level items. |
| **S853** | Analyze expansion | 22 | 1 (fixed) | 22 items/session | Remember/Understand → Analyze. 1 self-introduced DL-008 caught immediately. |
| **S861** | Analyze production | 15 (direct) | 0 | 15 items/session | 25 net-new Analyze including 9 rotation-clone inheritances. |
| **S861-S864** | Cohort C Wave 1 | 16 | 0 | 4.0 items/session | 4 sessions: 15 Analyze + 1 Evaluate. Throughput diluted by board/review sessions. |
| **S865-S868** | Cohort C Wave 2 | 30 | 0 | 7.5 items/session | 4 sessions: 0 Analyze + 10 Evaluate + 20 calibrations. Net cognitive: +1. |
| **S854** | Evaluate expansion | 3 | 0 | 3 items/session | Target was 10. Only 2/12 Section F items had natural Evaluate potential. |
| **Autonomous Run** | Defect remediation | 70 | 0 (net) | 20 items/hr | Remediation is 4-5× faster than authoring (no creative design required). |

**Convergence:** 7.5 items/session is the sustained throughput for field edits. S899's 20 items/session is achievable for net-new authoring but has been demonstrated exactly once (not sustained across multiple sessions).

### 1.2 Defect Rate

**Cumulative defect rate: 0 defects introduced per content edit across 113 observed edits** (S359).

The single self-introduced defect in the record (P1-EC-008 in S853) was caught and fixed within the same session. The governance guard (Rule 2, DL-008 Block; Rule 6, DL-026 Block; Rule 9, DL-037 Block) provides automated enforcement that catches structural defects at write time.

### 1.3 The Throughput Plateau

The readiness score trajectory tells the story:

```
S856: 54 → S861: 60 → S862: 65 → S863: 72 → S864: 75 → S868: 75 (PLATEAU)
```

**Root cause of the plateau (S868 finding):** The label-change upgrade pipeline for Sections C/D is EXHAUSTED. 147 of 147 Understand items are definition-match rotation artifacts that cannot be meaningfully upgraded via CognitiveLevel field change alone. S865 searched all of Sections C/D and found ZERO new Analyze candidates. The bottleneck is no longer methodology or governance — it is content design.

### 1.4 Evaluate vs. Analyze Difficulty

Evaluate authoring is fundamentally more complex than Analyze:

| Dimension | Analyze | Evaluate | Multiplier |
|-----------|---------|----------|------------|
| Items/hour (S856) | ~4 | ~1 | 4× |
| Items/session (S853 vs S854) | 22 | 3 | 7.3× |
| Content design effort | Enhance existing stem | Redesign stem from scratch | 2.5-3× |
| Distractor engineering | Enhance existing distractors | Create judgment-based distractors | 2-3× |
| **Weighted estimate** | — | — | **~2.5×** |

The S360 bottleneck analysis measured 21.9 Analyze items/hr vs 11.3 Evaluate/hr for batch authoring (~1.94×). In actual sessions, the ratio is wider (7.3×) because Evaluate items are concentrated in domains with fewer natural candidates.

---

## 2. Three-Scenario Forecast

### 2.1 Pessimistic — Current Sustained (5.6 items/day)

**Assumptions:**
- 5-6 net cognitive upgrade items per session (mixed Analyze + Evaluate)
- 1 session per calendar day
- Evaluate items at 2.5× the cost of Analyze
- Label-change pipeline remains exhausted (no more easy upgrades)
- Content design is the binding constraint

| Milestone | Items Needed | Sessions | Calendar Days | Work Weeks |
|-----------|-------------|----------|---------------|------------|
| 10% Analyze | 107 | 22 | 22 | 4.4 |
| 20% Analyze | 361 | 73 | 73 | 14.6 |
| 30% Analyze | 615 | 123 | 123 | 24.6 |
| 40% Analyze+Evaluate | 866 | 144 | 144 | 28.8 |
| Full certification (242 items) | 242 | 21 | 21 | 4.2 |

**At current velocity, the cognitive gap closes in ~7 months of continuous daily work.** This assumes zero defect regressions, no new defect discoveries, and sustained single-person commitment — all of which are optimistic given the project's history of defect-discovery-outpacing-resolution (S362: 4.2 defects found/day vs 1.6 resolved/day).

**Full certification is 21 sessions away** — achievable within ~1 month. This would mean 100% of items are Certified but only 5.8% are Analyze+Evaluate.

### 2.2 Optimistic — S899 Peak (20 items/session)

**Assumptions:**
- 20 net-new items per session (S899 Phase 1 model)
- Items authored from scratch at target cognitive levels
- Uses 183 archived DL-012 clone slots as insertion points
- 1 session per calendar day sustained
- Mixed workload: some sessions pure Analyze (20/session), some sessions Evaluate (5/session)

| Milestone | Items Needed | Analyze-Only Sessions | Evaluate-Only Sessions | Calendar Days |
|-----------|-------------|----------------------|----------------------|---------------|
| 10% Analyze | 107 | 6 | — | 6 |
| 20% Analyze | 361 | 19 | — | 19 |
| 30% Analyze | 615 | 31 | — | 31 |
| 40% Analyze+Evaluate | 866 | 25 | 74 | **99** |

**Evaluate is the long pole.** At S899 peak, the 488 Analyze items close in 25 sessions. But the 368 Evaluate items at 5/session require 74 sessions. This shifts the bottleneck from general throughput to Evaluate content-design capacity.

**Key insight:** Even at perfect throughput, Evaluate authoring is the irreducible constraint. The 25% Analyze target is reachable in ~4 weeks. The 15% Evaluate target takes ~14 weeks even at peak rate.

### 2.3 Automation-Assisted (12 items/session)

**Assumptions:**
- S367 automation improvements: QC overhead reduced 60%, metadata scaffolding saves 3 min/item
- Net throughput: 7.5 → 12 items/session (~1.6× gain)
- Evaluate: 1 → 4 items/session (scaffolding reduces mechanical overhead disproportionately for complex items)
- Clone replacement scaffolder deployed (S367 Recommendation #3)
- Post-change QC script deployed (S367 Recommendation #2)

| Milestone | Items Needed | Sessions | Calendar Days | Work Weeks |
|-----------|-------------|----------|---------------|------------|
| 10% Analyze | 107 | 14 | 14 | 2.8 |
| 20% Analyze | 361 | 46 | 46 | 9.2 |
| 30% Analyze | 615 | 77 | 77 | 15.4 |
| 40% Analyze+Evaluate | 866 | 153 | 153 | 30.6 |

**Automation alone does not close the cognitive gap in a dramatically shorter time.** The 1.6× throughput gain is real but the 866-item gap is so large that even at 12 items/session, it's ~30 work-weeks. Automation removes friction but doesn't replace creative content design.

**With 183 archived clone slots fully utilized + automation scaffolding:** 866 - 183 = 683 → 683/12 = 57 sessions for the remaining gap + 12 sessions for the scaffolded clones = ~69 sessions. This assumes all 183 items are authored at Analyze/Evaluate level using the scaffolding.

---

## 3. Cognitive Gap Timeline

### Timeline to 40% Analyze+Evaluate Under Each Scenario

```
          WEEK 1    WEEK 4    WEEK 8    WEEK 12   WEEK 16   WEEK 20   WEEK 24   WEEK 28
          0 days    28 days   56 days   84 days   112 days  140 days  168 days  196 days
          |         |         |         |         |         |         |         |
Current   |---10%---|---20%-----------|---------30%---------------------|---40% (144 days)
S899 Peak |10%|--20%|--30%|--------40%+Eval (99 days, Eval-limited)
Auto      |--10%---|---20%---|---30%-----------|------40% (153 days)
```

**Key observations:**
- S899 Peak reaches 30% Analyze in 31 days vs. Current's 123 days — a 4× acceleration on Analyze alone
- All three scenarios converge toward similar total timelines because Evaluate authoring is the irreducible constraint
- The first 20% of Analyze (0→20%) closes quickly in all scenarios because the absolute count (361 items) is manageable
- The Evaluate gap (368 items) dominates the timeline regardless of throughput model

### Partial Progress Milestones

| Milestone | Current | S899 Peak | Auto-Assisted |
|-----------|---------|-----------|---------------|
| 10% Analyze (107 items) | Day 22 | Day 6 | Day 14 |
| 15% Analyze (254 items) | Day 51 | Day 13 | Day 32 |
| 20% Analyze (361 items) | Day 73 | Day 19 | Day 46 |
| 25% Analyze — CAQS Target (488 items) | Day 98 | Day 25 | Day 61 |
| 5% Evaluate (127 items) | Day 127 | Day 26 | Day 32 (parallel) |
| 10% Evaluate (254 items) | Day 254 | Day 51 | Day 64 (parallel) |
| 40% Combined (866 items) | Day 144 | Day 99 | Day 153 |

---

## 4. Sensitivity Analysis

### 4.1 What If Throughput Doubles?

**Scenario:** Two full-time contributors working in independent parallel sessions.

| Model | Sessions to 40% | Calendar Days (1 session/day each) |
|-------|----------------|-----------------------------------|
| Current (2 contributors) | 87 | 44 (parallel) |
| S899 Peak (2 contributors) | 50 | 25 (parallel) |

Two contributors doing S899-level work in parallel close the Analyze gap in 13 days and the full 40% target in 50 days. **The constraint shifts from "one person's daily capacity" to "Evaluate authoring complexity."** Even with two people, 368 Evaluate items at 5/session per person = 37 parallel sessions.

### 4.2 What If Focused Analyze Only?

**Strategy:** Ignore Evaluate gap entirely. Focus all capacity on closing Analyze from 5.8% → 25%.

| Scenario | Items Needed | Sessions | Calendar Days |
|----------|-------------|----------|---------------|
| Current (5 Analyze/session) | 488 | 98 | 98 |
| S899 Peak (20/session) | 488 | 25 | 25 |
| Auto-Assisted (8/session) | 488 | 61 | 61 |

**Analyze gap closes in 25 days at S899 peak.** After that, the pool has 25% Analyze but still 0.5% Evaluate. **CAQS §6.2 compliance requires BOTH dimensions.** This analysis shows that Analyze alone is tractable — the real difficulty is Evaluate.

### 4.3 What If Label-Change Only (DL-031)?

**Strategy:** Recalibrate difficulty labels for ~500 definition-match items (Moderate → Easy).

| Metric | Value |
|--------|-------|
| Sessions needed | ~3 (25 items/session label changes) |
| Calendar days | 3 |
| Cognitive impact | **ZERO** |
| Difficulty distribution improvement | Significant — labels become honest |
| CAQS §6.2 compliance | **UNCHANGED** — 5.8% Analyze+Evaluate |

**DL-031 recalibration is a cosmetic improvement to analytics accuracy.** It does not close the cognitive gap. A candidate answering a question labeled "Easy" instead of "Moderate" still answers the same definition-match item. The pool's actual cognitive demand does not change.

**However, accurate labels are a prerequisite for accurate reporting.** Until DL-031 is fixed, any coverage or difficulty distribution report is systematically inflated. This should be done regardless of the expansion strategy.

### 4.4 What If Sections E+F Certification Only?

**Strategy:** Certify all 242 remaining uncertified items without addressing cognitive gap.

- Sessions needed (current rate): 21
- Result: 2,540/2,540 items Certified (100%)
- Cognitive distribution: 5.8% Analyze+Evaluate vs 40% CAQS target
- Platform status: "Complete" but does not meet CAQS cognitive standards

**This is achievable within ~1 month at current throughput.** Full certification provides the appearance of completeness but does not address the structural educational quality gap.

---

## 5. Binding Constraint Verification

### 5.1 Is Throughput Truly the Binding Constraint?

**Yes, but with a critical qualifier.** The S362 economics board concluded "the binding constraint is content design throughput." S365 confirmed "the governance guard is the only reliable automated component." S868 found "the bottleneck is no longer architecture, governance, or methodology — it is content design."

However, framing the problem as "throughput" alone obscures a deeper issue:

### 5.2 The Deeper Problem: Content Design Capacity, Not Speed

The real binding constraint is **the pipeline's ability to produce genuinely analytical content from a pool designed for definition-recall testing.** The 1,248 Understand items (49% of pool) were authored in a template-based rotation pipeline that produced definition-match questions — "What is X?" with X as the correct answer. These items cannot be upgraded to Analyze or Evaluate through field edits alone.

**The S868 finding is definitive:** "147 of 147 Understand items in Sections C/D are definition-match rotation artifacts that cannot be meaningfully upgraded via CognitiveLevel field change alone."

The solution space fork:

| Path | Description | Throughput | Quality |
|------|-------------|-----------|---------|
| **A. Stem rewrites** | Rewrite existing definition-match stems to add analytical depth | ~4 items/session (S856 estimate) | HIGH — items retain existing choices, verified architecture |
| **B. Clone replacement** | Replace Archived DL-012 clones with net-new Analyze/Evaluate items | 20 items/session (S899 proven) | HIGH — S899: 0 defects, items designed from scratch at target level |
| **C. New pack authoring** | Create entirely new items in new sections | ~10-15 items/session (untested) | MEDIUM — full CAQS 6-dimension verification required |

**Path B (clone replacement) is the proven model.** S899 demonstrated 20 items/session with zero defects. The 183 archived clone slots in Pack C+D Sections E+F provide structural capacity for ~10 sessions of replacement authoring.

### 5.3 Constraint Chain (Weakest to Strongest)

| # | Constraint | Severity | Mitigation |
|---|-----------|----------|------------|
| 1 | **Content design capacity** | CRITICAL | S899 clone replacement model at 20 items/session |
| 2 | **Evaluate complexity** | HIGH | Dedicated Evaluate author, parallel Analyze pipeline |
| 3 | **30-item batch cap (Rule 5)** | MEDIUM | Use BLOCK-AUTHORIZED marker. Not binding for creative work (<30/session). |
| 4 | **DL-016 dual-block verification** | MEDIUM | Per-item metadata-content cross-check during authoring |
| 5 | **Pack C Section F corruption** | MEDIUM | 15 unparseable items + 42 XXXMARKERs must be cleaned |
| 6 | **Agent availability** | LOW | 1 session/day is the current pattern; could scale to 2-3 |
| 7 | **Governance guard** | LOW | 9 BLOCK rules, 51/51 tests, 0 false positives — NOT a constraint |
| 8 | **Validator infrastructure** | LOW | DL-020 fix deployed. Functional. NOT a constraint |
| 9 | **Automation (QC/baselines)** | MEDIUM | Manual but not throughput-limiting for authoring (per-item time dominates) |

**The constraint chain confirms: content design capacity → Evaluate complexity → batch cap → everything else.** Governance, validation, and automation are NOT binding constraints.

### 5.4 Automation's Real Impact

S367 found that 60-80% of QC overhead is automatable, saving ~2 hours per change-set. But for the 866-item cognitive gap, the dominant cost is creative content design (~15 min/item for clone replacement, per S367 §1.3), not QC overhead (~1 min/item). Automation improves the 10% of time spent on QC, not the 90% spent on creative design.

**Automation's primary value is defect prevention, not throughput.** The governance guard prevents DL-008/DL-026/DL-037 at write time — this saves rework, not authoring time. The QC chain automation eliminates ~2h of manual verification per session but does not make stems write themselves.

---

## 6. Recommendations

### 6.1 Single Highest-Leverage Action

**Resume the S899 clone-replacement program immediately at 20 items/session, targeting Pack D Sections E+F first (has the structural issues), then Pack C Sections E+F.**

Rationale:
- S899 Phase 1 proved 20 items/session with zero defects
- 183 archived DL-012 clone slots exist — no new slot creation needed
- Items can be authored directly at Analyze/Evaluate level — bypasses the label-change exhaustion problem entirely
- 10 sessions at 20 items/session closes the 183-slot capacity and adds up to 183 Analyze/Evaluate items to the pool
- This alone moves Analyze+Evaluate from 6.3% → 13.5% in ~2 weeks
- Pack D has FD-045 and FD-075 structural issues that must be addressed before learner delivery

### 6.2 Recommended Execution Sequence

```
PHASE A — Critical Pool Safety (Sessions 1-3, ~3 days)
  1. Fix FD-075 (blank Certified item) — complete content or archive
  2. Resolve DL-021 documentation conflict — boundary-aware scan of Pack E Section C
  3. Execute DL-035 remediation — 117 distractor fields for 39 Domain F items

PHASE B — Clone Replacement Sprint (Sessions 4-13, ~10 days)
  4. Resume S899 Phase 2: Pack D Sections E(56) + F(52), 108 items = 6 sessions
  5. Continue S899 Phase 3: Pack C Sections E(56) + F(56), 112 items = 6 sessions
  6. Target: +183 Analyze/Evaluate items. Pool reaches ~13.5% Analyze+Evaluate.

PHASE C — DL-031 Recalibration (Session 14, ~1 day)
  7. S367 Recommendation #1: DL-031 scanner + bulk downgrade of ~500 items
  8. Difficulty labels become honest. Analytics reports become accurate.

PHASE D — Automate & Scale (Sessions 15-20, ~1 week)
  9. Deploy post-change QC script (S367 Recommendation #2)
  10. Deploy clone-replacement scaffolder (S367 Recommendation #3)
  11. Target: sustained 25-30 items/session at 0 defects

PHASE E — Evaluate Gap (Sessions 21+, ongoing)
  12. Dedicated Evaluate authoring stream — 5 items/session
  13. Target: 368 Evaluate items needed for CAQS §6.2. 74 sessions.
  14. Consider parallel contributor for Evaluate to halve calendar time.
```

### 6.3 Throughput Projection After All Improvements

| Phase | Items/Session | Sessions | Cumulative Sessions | Cumulative Calendar Days |
|-------|--------------|----------|--------------------|-------------------------|
| A — Pool Safety | Mixed (varies) | 3 | 3 | 3 |
| B — Clone Replacement | 20 | 10 | 13 | 13 |
| C — DL-031 Recal | 25 (label changes) | 1 | 14 | 14 |
| D — Auto+Scale | 12-15 | 6 | 20 | 20 |
| E — Evaluate Gap | 5 | 74 | 94 | 94 |
| **TOTAL** | — | **94** | 94 | 94 |

**After Phase B (clone replacement), the pool reaches ~13.5% Analyze+Evaluate.** This is a 2.1× increase from the current 6.3% and represents the single largest cognitive upgrade possible in a short time window.

### 6.4 Verdict

**Throughput IS the binding constraint, but the deeper problem is content design capacity, not session count.** The S899 model (20 items/session, zero defects) proves that throughput can be dramatically higher than current sustained rate. The question is not "can we go faster" — we have proven we can. The question is "will we sustain the faster rate."

The 866-item cognitive gap is bridgeable in ~94 sessions under the recommended plan — approximately 3-4 months of sustained daily work. The parallel-contributor model could reduce this to ~2 months.

**One sentence answer:** The platform can reach CAQS cognitive targets within a quarter with dedicated execution of the proven S899 model. The binding constraint is the willingness to sustain the model, not the model itself.

---

*S368 Expansion Throughput Simulation. READ-ONLY. No file modifications.*
*Data sources: S359, S360, S361, S362, S365, S367, S853-S856, S861-S868, S899, Autonomous Run 2026-07-23, CURRENT_BASELINES.md*
