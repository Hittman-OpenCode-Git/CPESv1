# SESSION 911 — P1-B-040 Logic Inversion Correction

**Date:** 2026-07-28
**Type:** WRITE — Content Fix (One-Word)
**QID:** P1-B-040
**Pack:** pack_a_corrected.js, Section B
**Backup:** backups\pack_a_corrected.js.bak-S911-20260728090956 (1,724,046 bytes)

## Defect

Choice B (correct answer, CorrectChoice=B): lead-in "No" contradicted conclusion "so it should be investigated."

**Original:** "No, because 5% of $150,000 is $7,500 and $9,000 exceeds that, so it should be investigated"
**Fixed:** "Yes, because 5% of $150,000 is $7,500, and $9,000 exceeds it, so it should be investigated"

## Stem

"Eastwood investigates any budget variance exceeding 5% of budgeted cost or $10,000, whichever is smaller. A department shows a $9,000 unfavorable variance on a $150,000 budget. Should this be investigated?"

- 5% of $150,000 = $7,500
- $7,500 < $10,000 → threshold = $7,500
- $9,000 > $7,500 → YES, investigate
- Answer: B (now reads "Yes, because...")

## Post-Fix Verification

| Check | Result |
|-------|--------|
| Pack A parse | ✅ Clean |
| DL-008 (EW[CC] empty) | ✅ ExplanationWrongB="" maintained |
| DL-026 (non-CC EW populated) | ✅ A, C, D all non-empty |
| CorrectChoice unchanged | ✅ B |
| question_state unchanged | ✅ "Certified" |
| Governance guard | ✅ 45/45 PASS |
| Visual confirmation | ✅ Lines 5856–5862 show "Yes, because..." |
