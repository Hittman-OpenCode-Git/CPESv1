# SESSION096P — Recovery Impact

**Session:** 96P
**Date:** 2026-07-31
**Pilot Section:** Pack C Section EC (75 items)

---

## 1. Recovery Effort Estimation

### 1.1 Pilot Section Recovery Profile

| Recovery Action | Items Affected | Effort per Item | Total Effort |
|-----------------|---------------|-----------------|--------------|
| Relabel CognitiveLevel (label change only) | 26 | 30 seconds | ~13 minutes |
| Adjust Difficulty + DifficultyScore | 12 | 30 seconds | ~6 minutes |
| Content rewrite | 0 | N/A | 0 |
| Re-verify answer keys | 0 (no CC changes) | N/A | 0 |
| Re-verify explanations | 0 (no content changes) | N/A | 0 |
| Update question_state (if needed) | 0 | N/A | 0 |
| **Section EC total** | **26 metadata corrections** | | **~20 minutes** |

### 1.2 Repository-Wide Projection

| Component | Items | Effort Estimate |
|-----------|-------|-----------------|
| Pack C Sections ED, EE, EF | ~225 | ~1 hour |
| Pack D Sections CD, DD, ED, FD | ~300 | ~1.5 hours |
| Pack A Sections A, B, D (residual) | ~200 | ~1 hour |
| Pack B Sections (all — if affected) | ~500 | ~30 min (likely minimal issues) |
| Pack E Sections (all — if affected) | ~545 | ~30 min (independent pipeline) |
| **Repository total** | **~1,770 HO items** | **~4-5 hours** (batch relabeling via script) |

### 1.3 Scripted Recovery Feasibility

**Approach:** Write a targeted Node.js script that:
1. Reads the current `CognitiveLevel` for each item
2. Applies a lookup table of QID → corrected CognitiveLevel + Difficulty
3. Writes back corrected pack file
4. Runs validator to confirm 0 new errors

**Risk:** Low. Metadata field changes only. No content, answer keys, or explanation fields touched.

**Batch cap:** Per governance-guard Rule 5, batches must be ≤30 items. Total ~90 batches for full repository.

---

## 2. Impact on Certification Status

### 2.1 Certified Items with Label Changes

| Section | Certified Items | Items with Label Change | % Affected |
|---------|----------------|------------------------|------------|
| Pack C EC | 70 | 20 | 28.6% |
| Pack C ED (est.) | ~75 | ~15 | ~20% |
| Pack D CD (est.) | ~75 | ~15 | ~20% |
| Pack D DD (est.) | ~75 | ~20 | ~27% |

**Certification question:** Does changing `CognitiveLevel` from "Evaluate" → "Analyze" invalidate certification?

**Answer per CAQS v1.0:** No. CognitiveLevel is metadata, not content. Certification under CAQS §1.7.2 requires:
1. Six-dimension HIGH-confidence AI verification ✓ (unchanged)
2. User approval documented ✓ (unchanged)
3. Distractor tier map recorded ✓ (unchanged)
4. Low-confidence claims resolved ✓ (unchanged)

Changing `CognitiveLevel` does not trigger re-certification under current governance rules. The content (stem, choices, explanations, answer key) is unchanged.

### 2.2 Recommended Governance Amendment

**Proposal:** Add a rule that when `CognitiveLevel` is changed by 2+ tiers (e.g., Evaluate → Understand), the item should flag for lower-confidence re-verification on Dimension 2 (Cognitive Level). This is consistent with CAQS §1.6's build-time verification mandate but does not require full re-certification.

---

## 3. Impact on Learner Experience

### 3.1 Current State (Mislabeled)

| Scenario | Current Behavior | Learner Impact |
|----------|-----------------|----------------|
| "What framework is COSO?" labeled Analyze/Difficult | Learner sees "Analyze, Difficult" difficulty badge | Mismatched expectation — item is trivial |
| Complex scenario labeled Evaluate | Learner sees "Evaluate, Very Difficult" | Accurate expectation (if correctly labeled) |
| Definition-recall labeled Analyze | Learner sees "Analyze" for simple recall | Inflated difficulty perception |

### 3.2 Corrected State

| Scenario | Corrected Behavior | Learner Benefit |
|----------|-------------------|-----------------|
| "What framework is COSO?" → Remember/Easy | Accurate difficulty badge | Honest difficulty calibration |
| Complex scenario → Analyze | Accurate cognitive label | Appropriate expectation setting |
| Judgment required → Evaluate | Correctly identifies highest-demand items | Better study prioritization |

---

## 4. Impact on Future Modernization Waves

### 4.1 Traditional Modernization Track (S87-S93+)

**Finding:** The Traditional Modernization Track is authoring new Analyze/Evaluate items while the repository already has items mislabeled as Analyze/Evaluate that should be lower.

**Recommendation:** Relabel before authoring more HO items. The repository needs more genuinely low-level items (Remember/Understand/Apply), and fixing the labels reveals the real distribution gap.

### 4.2 Interaction with Session 92 (Pack B Section B)

**No overlap.** Session 92 operates on Pack B, which uses an independent authorship pipeline with different cognitive labeling patterns. Section EC is in Pack C.

### 4.3 Interaction with Future S95P (Certification Framework)

**S96P data is an input to S95P.** The certification framework should incorporate:
- CognitiveLevel accuracy as a certification dimension
- Tier 1 (order-of-magnitude) errors as certification-blocking
- Tier 2 (one-tier slippage) errors as certification-warning

---

## 5. Cost-Benefit Summary

| Factor | Assessment |
|--------|------------|
| **Cost** | ~4-5 hours of scripted batch relabeling across ~1,770 HO items |
| **Risk** | Very low — metadata-only changes, no content or answer keys touched |
| **Benefit** | Accurate cognitive labeling for 2,545 items; honest difficulty calibration; reliable CAQS §6.2 distribution tracking |
| **Learner impact** | Improved expectation-setting; no content changes to learner experience |
| **Blockers** | None. Zero content rewrites needed. Governance guard Rule 5 batch cap (≤30) is the only pacing constraint. |
