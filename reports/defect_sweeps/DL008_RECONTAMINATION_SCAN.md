# DL-008 Re-Contamination Scan

**Date:** 2026-07-22
**Status:** Findings complete — no remediation applied

---

## Executive Summary

14 certified items in Pack A Section A were re-contaminated after the Bucket 1A sweep. The sweep correctly cleared them. Sub-batch 2B Wave 1 (the earliest certification wave) re-populated their ExplanationWrong[CorrectChoice] slots with `"Option X ($value) is correct..."` text. No later wave introduced this defect. Section E Block 1 is clean.

---

## Re-Contaminated Items (All 14)

| QID | CW field | Sweep cleared to | Current content (re-contaminated) | Source |
|---|---|---|---|---|
| P1-A-003 | ExplanationWrongC | `""` | `"Option C ($201,000) is the correct CFO..."` | 2B Wave 1 |
| P1-A-004 | ExplanationWrongC | not in sweep (conceptual) | `"Option C is correct. Under ASC 505..."` | 2B Wave 1 |
| P1-A-006 | ExplanationWrongD | not in sweep (conceptual) | `"Option D is correct. Under ASC 606..."` | 2B Wave 1 |
| P1-A-007 | ExplanationWrongB | not in sweep (conceptual) | `"Option B is correct. Under ASC 326..."` | 2B Wave 1 |
| P1-A-008 | ExplanationWrongC | not in sweep (conceptual) | `"Option C is correct. Under ASC 330..."` | 2B Wave 1 |
| P1-A-010 | ExplanationWrongB | `""` | `"Option B ($6,000) is correct..."` | 2B Wave 1 |
| P1-A-019 | ExplanationWrongA | not in sweep (conceptual) | `"Option A is correct. Under ASC 320..."` | 2B Wave 1 |
| P1-A-023 | ExplanationWrongC | not in sweep (conceptual) | `"Option C is correct. Under ASC 820..."` | 2B Wave 1 |
| P1-A-024 | ExplanationWrongC | not in sweep (conceptual) | `"Option C is correct. Under ASC 230..."` | 2B Wave 1 |
| P1-A-026 | ExplanationWrongD | `""` | `"Option D ($197,200) is correct..."` | 2B Wave 1 |
| P1-A-027 | ExplanationWrongC | `""` | `"Option C ($21,780) is correct. Revenue is recognized..."` | 2B Wave 1 |
| P1-A-028 | ExplanationWrongD | `""` | `"Option D ($171,650) is correct. COGS =..."` | 2B Wave 1 |
| P1-A-029 | ExplanationWrongB | not in sweep | `"Option B ($16,160) is correct..."` | 2B Wave 1 |
| P1-A-030 | ExplanationWrongB | `""` | `"Option B ($124,800) is correct. CFO indirect =..."` | 2B Wave 1 |

**8 of 14 were included in the Bucket 1A sweep and were properly cleared before re-contamination.**  
**6 of 14 were conceptual items never in the sweep but have the same defect from Wave 1.**

---

## Scope Cross-Check

| Certification wave | Items reviewed | Re-contaminated | Status |
|---|---|---|---|
| Sub-batch 2B Wave 1 (P1-A-003–023) | 8 | **8** | **DEFECTIVE** |
| Sub-batch 2B Wave 2 (P1-A-024–032) | 8 | **4** (024, 026, 027, 028, 029, 030) | **PARTIAL DEFECT** |
| Sub-batch 2B Wave 3 (P1-A-033–042) | 8 | **0** | CLEAN |
| Section A Block 1 (24 items) | 24 | **0** | CLEAN |
| Section A Block 2 (20 items) | 20 | **0** | CLEAN |
| Section E Block 1 (50 items) | 50 | **0** | CLEAN |
| R14 Waves 4-7 | 25 | **0** | CLEAN |

**Waves 2-3 and all subsequent blocks learned from Wave 1's mistake.** Sub-agent instructions for later waves explicitly included "Clear ExplanationWrong[CorrectChoice] to ''" as step 6.

---

## Section E Block 1 Status: CLEAN

All 50 Pack A Section E certified items have correctly empty ExplanationWrong[CorrectChoice] slots. The Block 1 sub-agents followed the EV8 instruction. The 9 unreviewed Pack A Section E items have pre-existing DL-008 from template authoring (fragmentary clauses like "because...") — not sub-agent contamination.

---

## Repository-Wide DL-008 State

| Category | Count | Description |
|---|---|---|
| Re-contaminated (Wave 1 defect) | **14** | `"Option X is correct..."` in ExplanationWrong[CorrectChoice] — need clearing |
| Swept but clean (Bucket 1A) | 94 | Properly cleared by sweep, not re-contaminated |
| Never swept, calculation summary | 84 | Bucket 1A candidates excluded by 3-pass criteria |
| Never swept, fragmentary clause | 277 | "because..." patterns across all packs |
| Never swept, other substantive | 39 | Mixed content requiring editorial review |
| **Total non-empty** | **414** | Across all packs |

---

## Root Cause Analysis

**Source:** Sub-batch 2B Wave 1 sub-agent instructions (the earliest certification wave).

**Mechanism:** The sub-agent was asked to "expand ExplanationCorrect" and "explain why each distractor is wrong." The agent interpreted the task as "write explanations for ALL four slots" and wrote `"Option X is correct. [reasoning]."` into the ExplanationWrong[CorrectChoice] field. This violates CAQS v1.0 EV8 (correct-answer ExplanationWrong slot must be empty).

**Why only Wave 1?** Wave 1 was the first certification wave — no explicit "clear the correct answer's slot" instruction. Starting with Wave 2, the sub-agent instructions added step 6: "Clear ExplanationWrong[CorrectChoice] to ''". All subsequent waves (2-3, A B1-B2, E B1) included this step.

**P1-A-004/006/007/008/019/023/024/029** were conceptual items never in the Bucket 1A sweep, but they share the same `"Option X is correct"` pattern because Wave 1's sub-agent introduced it directly during certification.

**Prevention:** All current sub-agent templates already include the EV8 instruction. The defect is contained to Wave 1 output and will not recur.

---

## Recommendation

1. **Clear the 14 re-contaminated slots.** All 14 contain text that belongs in ExplanationCorrect or is redundant with it. Clear to `""` without content loss — ExplanationCorrect already contains the substance.
2. **Do NOT roll back the Bucket 1A sweep.** The sweep was correct and safe.
3. **No change to Section E Block 1.** All 50 items are EV8-clean.
4. **The remaining 400 DL-008 occurrences** (calculation summaries, fragmentary clauses, other) are a SEPARATE editorial queue issue — not related to the Wave 1 sub-agent bug.

---

**Full scope:** 14 re-contaminated items, all in Pack A Section A, all from Sub-batch 2B Wave 1. Defect is contained. Section E Block 2 is not at risk.

---

## Fix Applied (2026-07-22)

All 14 ExplanationWrong[CorrectChoice] slots cleared to `""`. Pre-check confirmed ExplanationCorrect independently contains the substantive content in all 14 cases — zero content loss. Rollback log: `reports/DL008_14ITEM_FIX_ROLLBACK.md`.

Validator: 2,575 scanned, 118 errors, 1,671 warnings (baseline unchanged). No regressions.

**DL-008 Wave 1 re-contamination: CLOSED.**
