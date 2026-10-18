# S10 Process Gate — B:INVERSION REVIEW Flags Adjudication

**Date:** 2026-09-22
**Authority:** Board directive (2026-09-20 calibration)
**Scope:** All certification batches using `semantic_key_verifier.js`

---

## Rule
**No item with an active REVIEW flag from Screen B (B:INVERSION) may flip to `Certified` until human adjudication is documented.**

### Adjudication Checklist (per flagged QID)
1. **Read the item** — stem, choices, ExplanationCorrect, all ExplanationWrong
2. **Compare** — Does ExplanationCorrect substantively support the stored CorrectChoice?
3. **Verify** — Is the REVIEW flag a calculation-item FP (Screen B known issue) or genuine inversion?
4. **Document** — Record adjudication in REVISION_HISTORY.md with QID, verdict (FP/GENUINE), and reviewer
5. **Clear** — If FP, no code change needed. If GENUINE, fix before certification.

### Thresholds (2026-09-20 calibration)
| Tier | Condition | Action |
|------|-----------|--------|
| REVIEW | bestRecall ≥ 85% + margin ≥ 40% | Human adjudication required |
| REVIEW | bestRecall ≥ 60% + margin ≥ 25% | Human adjudication required |
| PASS | bestRecall < 60% OR margin < 25% | Auto-clear |

### Known FP Classes (pre-approved for auto-clear with note)
- Calculation items where EC formula numbers coincidentally match distractor lead phrases
- 29 QIDs documented in 2026-09-20 calibration (see DL-047 entry)

### Integration Point
Add to certification batch checklist (REVISION_HISTORY.md entry template):
```
## B:INVERSION REVIEW Adjudication
Batch: [batch-id]
Flags reviewed: [count]
FP cleared: [count, list QIDs]
Genuine fixed: [count, list QIDs]
Reviewer: [name]
Date: [ISO date]
```

### Enforcement
- `semantic_key_verifier.js` exits 0 with 0 BLOCK flags (REVIEW only)
- Certification batch script MUST include REVIEW adjudication step
- REVISION_HISTORY.md entry required per AGENTS.md §4

---

**Effective:** 2026-09-22
**Owner:** Certification batch lead
**Review:** Next board meeting