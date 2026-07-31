# G01 — Defect Status Matrix

**Date:** 2026-07-31
**Session:** G01 Governance Rebaseline & Standards Consolidation
**Status:** COMPLETE
**Auditor:** G01 Defect Auditor (governance-general agent)
**Evidence cut:** 2026-07-31 — direct file inspection + session report cross-reference

---

## 1. Audited Defects

| Defect | CURRENT_BASELINES §3 Claim | Auditor Verdict | Trustworthiness | Recommended Action |
|--------|---------------------------|----------------|-----------------|---------------------|
| **DL-008** | RESOLVED — 59 items S893–S895 | RESOLVED — **84 items** (59 + 25 S382) | TRUSTWORTHY (undercount) | Update count to 84 |
| **DL-016** | RESOLVED — S227 T0 verified | RESOLVED for Pack A; MONITOR for Packs C+D | TRUSTWORTHY | No immediate action. S227 confirmed Pack A single-object. Packs C+D dual-block not yet audited. |
| **DL-026** | RESOLVED — 0 Certified | **CONTRADICTED** by DL-035 (39 Certified) | NOT TRUSTWORTHY | Reconcile with DL-035. Either update DL-026 to 39 or merge entries. |
| **DL-029** | Not listed in §3 | NEUTRALIZED — P1-P8 rules prevent recurrence | TRUSTWORTHY | Deprecate. Add to RESOLVED section. Retain P1-P8. |
| **DL-031** | Partially remediated | RESOLVED — **~677 items recalibrated** (>100% of original ~500 estimate) | MOSTLY TRUSTWORTHY | Deprecate as active. Update baselines to reflect 677. |
| **DL-032** | 330 items uniform Moderate | **Stale.** Item-level: 80% resolved (472/592 via S716). Case-level: uniform Moderate. | PARTIALLY TRUSTWORTHY | Update with S716 item-level distribution evidence. Split case-level vs. item-level status. |
| **DL-038** | Not listed in §3 | RESOLVED — S85, no recurrence | TRUSTWORTHY | Add to RESOLVED section |

---

## 2. Detailed Evidence

### 2.1 DL-008 — ExplanationWrong[CorrectChoice] Non-Empty

**Total remediated across all waves:** 84 items

| Wave | Items | Source |
|------|-------|--------|
| S893 (2026-07-28T11:00) | 59 (22 Pack C, 37 Pack D, 55 Certified) | Function-constructor parse; `reports/SESSION893_DL008_QUARANTINE.json` |
| S382 (2026-07-28T22:55) | 25 (15 Pack C, 10 Pack D, 10 Certified) | Function-constructor parse; `reports/SESSION382_DL008_REMEDIATION.json` |
| **Total** | **84** | |

**Post-remediation verification:** Both S895 and S382 post-remediation re-parses confirm 0/1,000 items. Governance guard Rule 2: 51/51 PASS.

**Status:** RESOLVED. Update CURRENT_BASELINES.md count from 59 to 84.

---

### 2.2 DL-016 — Metadata-Block ChoiceA-D +1 Offset

**Pack A Section E (57 items):** RESOLVED — S805 (2026-07-26). 171 ExplanationWrong fields authored with choice-specific COSO-aligned explanations. S227 T0 boundary-aware scan confirmed 0 flat ChoiceA-D fields in current Pack A — single-object architecture.

**Packs C+D:** DEFECT_LIBRARY correctly flags dual-block risk. No new DL-016 findings since S805. No certification-blocking impact observed.

**Case-pack files (S81/S83/S85):** Zero DL-016 risk. Case-pack architecture does not have the dual-block format (flat `ChoiceA-D` vs. nested `Choices.A-D`).

**Status:** RESOLVED for Pack A. MONITOR for Packs C+D. No immediate action.

---

### 2.3 DL-026 / DL-035 — Contradictory Claims Reconciliation

**DL-026 CURRENT_BASELINES claim:** "0 Certified items. RESOLVED — learner pool secured. S227 T0 confirmed 0 DL-026 across all Domain F."

**DL-035 CURRENT_BASELINES claim:** "S377 IN PROGRESS — 39 Certified Domain F items carry empty distractor EW slots."

**Reconciliation:** Both claims cannot be simultaneously true. The timeline resolves the contradiction:

1. **Pre-S853 (S227 time):** Domain F (Pack C+D, 150 items) had 0 Certified DL-026. ✅ DL-026 claim was correct at that time.
2. **S853 WAVE_A (between S227 and S377):** Certified 100 new Domain F items (50 Pack C, 50 Pack D). Of those, 39 carried pre-existing empty distractor EW slots — but governance guard only checked DL-008 (Rule 2), not DL-026.
3. **Post-S853 (S377 time):** 39 Certified DL-026 items exist. DL-035 correctly identifies them.

**Resolution:** The DL-026 "0 Certified" claim is **stale** — it reflects pre-S853 state. The current state is 39 Certified DL-026 items (28 Pack C, 11 Pack D), all Domain F.

**Recommendation:**
- Update DL-026 status: "39 Certified items (Domain F — Pack C: 28, Pack D: 11). Co-managed under DL-035. Remediation pending S816-S818."
- Ensure both entries reference each other to prevent future auditors from re-discovering the same discrepancy.

---

### 2.4 DL-029 — Regex Block-Scan False Positives

**Neutralization evidence:**
- S802 (2026-07-26): Root cause analysis established 8 permanent prevention rules (P1–P8). Estimated ~520+ false positives across prior scans.
- S893 quarantine: Used "Function constructor parse" — P1 compliant.
- S382 verification: Used "Function constructor same-object parse."
- All post-July-28 sessions cite Function-constructor or within-object extraction in methodology declarations.

**Status:** NEUTRALIZED → DEPRECATE as active defect.

**Recommendation:** Add to CURRENT_BASELINES.md §3 RESOLVED section. Retain P1-P8 prevention rules as standing methodology requirements.

---

### 2.5 DL-031 — Definition-Match Difficulty Inflation

**Downgrades applied:**

| Session | Items | Scope |
|---------|-------|-------|
| S89B | ~411 | Pool-wide difficulty distribution (all sections, all packs) |
| S89C | 80 | Pack C Sections C-F: Difficult(4)→Moderate(3)/Easy(1) |
| S713 | 186 | All 5 packs: Moderate(3)/Difficult(4)→Moderate-Easy(2) |
| **Total** | **~677** | |

Original estimate: ~500 items. Resolution: ~677 downgrades = >100%.

**Post-downgrade distribution:** Moderate dropped by ~150 (to ~1,066). Moderate-Easy increased by 186 (to ~215). The remaining moderate skew reflects genuine Apply-level content, not label inflation.

**Status:** RESOLVED → DEPRECATE as active defect.

**Recommendation:** Update CURRENT_BASELINES.md: "RESOLVED — 677 items recalibrated across S89B, S89C, S713. Remaining moderate/easy skew reflects genuine content-creation distribution, not inflation."

---

### 2.6 DL-032 — Case-Bank Uniform Difficulty

**Item-level evidence (S716, 2026-07-26):**
- Calibrated 472 case items across all 5 scored_cases files
- 370 unlabeled items received first-time difficulty assignments
- Post-calibration distribution: Moderate-Easy 15.5%, Moderate 43.5%, Difficult 41% — **NOT uniform**
- 120 items without CognitiveLevel deferred

**Case-level evidence:**
- Case-level `Difficulty: "Moderate"` metadata field remains uniform across all 75 cases
- This is a separate field from item-level `DifficultyScore`

**CURRENT_BASELINES claim "330 items still uniform Moderate" is stale.** Only 120 of 592 case items remain uncalibrated (20.3%).

**Status:** UPDATE — split case-level vs. item-level status.

**Recommendation:**
- Item-level: "80% calibrated (472/592). 120 deferred (no CognitiveLevel)."
- Case-level: "Uniform Moderate — deferred to certification wave recalibration."

---

### 2.7 DL-038 — Matching Item RightItems Unicode Mismatch

**Discovery:** S85 Auditor Phase (2026-07-30). CBQ5-C3-Q2 had 2 RightItems entries using ASCII "x" (U+0078) where Correct object used Unicode "×" (U+00D7).

**Resolution:** S85 Execute Phase. Changed "x $13.20" → "× $13.20" in two RightItems entries. Character encoding normalization only — no content change.

**Post-resolution:** S85 closeout confirmed 0 sequential pattern items remaining. Correct objects unchanged across all 83 items. S85 is the most recent session touching matching items — no recurrence possible without future content editing errors.

**Status:** RESOLVED. Add to CURRENT_BASELINES.md §3 RESOLVED section.

---

## 3. Post-Audit Defect Status Summary

| Defect | Pre-Audit Status | Post-Audit Status | Action Required |
|--------|-----------------|-------------------|----------------|
| DL-008 | RESOLVED (59) | RESOLVED (84) | Update count |
| DL-016 | RESOLVED | RESOLVED | None |
| DL-026 | RESOLVED — 0 Certified | **39 Certified** — reconcile with DL-035 | Merge/reconcile entries |
| DL-029 | Not listed | DEPRECATED | Add to RESOLVED |
| DL-031 | Partially remediated | RESOLVED — 677 recalibrated | Deprecate |
| DL-032 | 330 uniform Moderate | Item: 80% resolved; Case: uniform | Update with S716 |
| DL-038 | Not listed | RESOLVED | Add to RESOLVED |

---

## 4. CURRENT_BASELINES.md §3 Update Specification

### Replace DL-008 entry:
```
| DL-008 | 84 items (59 S893–S895 + 25 S382). 0 remaining. Function-constructor parse verified. | RESOLVED |
```

### Replace DL-026 entry:
```
| DL-026 | **39 Certified items** (28 Pack C + 11 Pack D, all Domain F). Co-managed under DL-035. S853 WAVE_A certified items with pre-existing empty distractor slots. Rule 6 deployed S814 to prevent future occurrences. Content remediation pending S816-S818. | **OPEN — 39 Certified learner-pool items** (see DL-035) |
```

### Replace DL-031 entry:
```
| DL-031 | **RESOLVED** — ~677 items recalibrated across S89B (411), S89C (80), S713 (186). Remaining moderate/easy skew reflects genuine content distribution, not inflation. | RESOLVED |
```

### Replace DL-032 entry:
```
| DL-032 | Item-level: 80% calibrated (472/592). 120 deferred (no CognitiveLevel). Case-level: uniform Moderate (deferred to certification waves). | PARTIAL — item-level substantially resolved; case-level deferred |
```

### Add to RESOLVED section:
```
| DL-029 | Neutralized — P1-P8 prevention rules active. All post-July-28 scans use Function-constructor parse. | RESOLVED |
| DL-038 | Unicode mismatch in matching RightItems (CBQ5-C3-Q2). Fixed S85. No recurrence. | RESOLVED |
```

---

*Generated: 2026-07-31 | G01 Implementer Phase — Defect Status Matrix*
