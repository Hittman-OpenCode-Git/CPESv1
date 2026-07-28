# SESSION 913 — Rule 9 Governance Guard Deployment

**Date:** 2026-07-28
**Type:** WRITE — Governance Guard Plugin Extension
**Rule:** RULE 9 — Choice Binary Lead-In Polarity Mismatch (DL-037)
**Level:** BLOCK

## Changes

### governance-guard.js (8 → 9 rules)

1. **`findLogicInversionViolations(text)`** — new function (lines 125–146)
   - Reuses `extractObjectsFromText` for object extraction
   - Iterates Choices values from extracted question objects
   - Applies Pattern 1 (No+affirmative) and Pattern 2 (Yes+negative)
   - Returns `[{qid, choice, pattern, snippet}]`

2. **RULE 9 BLOCK check** — inserted in `tool.execute.before` (lines 262–276)
   - Runs after Rule 6 (DL-026) check
   - Blocks any write/edit that introduces a mismatched binary lead-in
   - Error message references DL-037 with fix instructions

### test_governance_guard.js (45 → 51 tests)

**6 new Rule 9 tests:**
| Test | Pattern | Expected |
|------|---------|----------|
| "No" + affirmative conclusion | Pattern 1 | 1 violation |
| "Yes" + negative conclusion | Pattern 2 | 1 violation |
| "No" + negative conclusion | Negative control | 0 violations |
| "Yes" + affirmative conclusion | Affirmative control | 0 violations |
| Multiple mismatches | Both patterns | 2 violations |
| Fragment without complete Choice | Graceful skip | 0 violations |

## Verification

```
=== RESULTS: 51 PASS, 0 FAIL ===
```

- Original P1-B-040 text → Rule 9 blocks ✅
- Fixed P1-B-040 text → Rule 9 passes ✅
- All existing Rules 1–8 → still pass ✅
- No false positives on semantically-aligned text ✅
