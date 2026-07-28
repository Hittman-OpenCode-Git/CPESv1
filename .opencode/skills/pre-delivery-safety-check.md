# Pre-Delivery Safety Check Skill

**Purpose:** Confirm the learner delivery pool only pulls strictly `"Certified"` items and that all known-defective QIDs are excluded — as a standing safety check, not a one-off ask.

**Trigger:** Use before any live simulation test, any learner-facing deployment, or any session that will draw from the question pool for practice/testing purposes. Also triggered when the user asks to "run a practice session," "test the delivery pool," "start a simulation," or any variant.

---

## 1. Core Principle

Per CAQS_v1.0.md §1.7.1: only items with `question_state: "Certified"` are eligible for learner practice sessions. All other states (`Unprocessed`, `In Audit`, `Editorial Queue`, `Archived`) must be excluded. This is a standing safety check — not a one-off request.

---

## 2. Pre-Delivery Checklist

Run every item on this checklist before any learner-facing delivery. Do not skip any step.

### Step 1: Confirm Certified-Only Filter

Verify the delivery mechanism (app.js or equivalent) filters by `question_state === "Certified"`:

```bash
grep -n "question_state" app.js | grep -i "certified\|filter\|eligible\|pool"
```

If no such filter exists in app.js, flag it — the delivery pool may be pulling uncertified items.

### Step 2: Count Certified Items Available

```bash
grep -c '"question_state"[[:space:]]*:[[:space:]]*"Certified"' pack_*_corrected.js
```

Confirm the count matches the most recent `knowledge/REVISION_HISTORY.md` entry. Flag any discrepancy.

### Step 3: Extract All Certified QIDs

```bash
grep -B1 '"question_state"[[:space:]]*:[[:space:]]*"Certified"' pack_*_corrected.js | grep '"QuestionID"' | sort
```

### Step 4: Cross-Reference Known-Defective QIDs

| Defect Class | QID Pattern | Status |
|-------------|-------------|--------|
| DL-012 clones (if archived) | EC-* and ED-* clones marked `"Archived"` | Must be excluded |
| DL-012 clones (if not yet remediated) | EC-* and ED-* items with missing `question_state` | Must be excluded (not "Certified") |
| Pack B rotation-artifact items | Items with wrong answer keys (17 confirmed in Section E) | Must not be "Certified" |
| Pack A Section E 16 clones | P1-E-046/047/049/050/054/055/057/058/062/063/065/066/070/071/073/074 | Must not be "Certified" |
| DL-008 re-contaminated items | 14 items from Sub-batch 2B Wave 1 | All fixed — but verify no regressions |

For each known-defective category:
1. Check `question_state` of each affected QID in the source file.
2. Flag any with `question_state: "Certified"` — these must NOT be in the delivery pool.
3. If the DL-012 archival has been executed, verify all 112 clones read `"Archived"`.

### Step 5: Verify No Unprocessed Items Leaking Into Certified Pool

```bash
# Items with "Certified" state but missing CAQS score (incomplete certification)
```

Cross-reference certified QIDs against `MASTER_QUESTION_REGISTRY.md`. Any certified item without a CAQS score is suspicious — it may have been marked certified through batch operations without individual verification.

### Step 6: Spot-Check Delivery Pool Integrity

Select 5 random QIDs from the certified list. For each:
1. Verify `question_state: "Certified"` is present in the source file.
2. Verify `CorrectChoice` / `Correct` field is present and non-empty.
3. Verify `ExplanationCorrect` is substantive (>100 chars).
4. Verify no DL-008 violation: `ExplanationWrong[CorrectChoice]` is `""`.
5. Verify the question renders correctly (if an HTML preview is available).

### Step 7: Section Coverage Check

Verify the certified pool has coverage across all six blueprint sections (A–F):

```bash
# For each section A-F, count certified items by QuestionID prefix
```

Flag any section with zero certified items — candidates in that domain will get no practice questions.

---

## 3. Stop Conditions

The following conditions require a HARD STOP before delivery:

| Condition | Action |
|-----------|--------|
| No `question_state` filter in delivery code | Block delivery — fix app.js first |
| Known-defective QID in certified pool | Block delivery — archive/uncertify the QID first |
| Certified count ≠ REVISION_HISTORY.md last entry | Investigate discrepancy — do not deliver until reconciled |
| Section with zero certified items | Warn — delivery pool has blueprint coverage gap |
| DL-012 not yet executed (140 clones still present) | Warn — Section E delivery pool inflated with clones |

---

## 4. Output Format

Every pre-delivery check must produce:

```
=== PRE-DELIVERY SAFETY CHECK ===
Date: [ISO 8601]
Trigger: [what delivery is being prepared for]

[1] CERTIFIED POOL SIZE
  Total: N certified items across all packs
  Match REVISION_HISTORY.md: YES/NO

[2] KNOWN-DEFECTIVE CROSS-REFERENCE
  DL-012 clones in certified pool: N (expected: 0)
  Pack B rotation artifacts certified: N (expected: 0)
  Pack A 16 clones certified: N (expected: 0)
  DL-008 re-contaminated certified: N (expected: 0)

[3] SECTION COVERAGE
  A: N certified, B: N, C: N, D: N, E: N, F: N
  Gaps: [list sections with 0]

[4] DELIVERY MECHANISM
  question_state filter in app.js: FOUND/NOT FOUND
  Location: [file:line]

[5] SPOT-CHECKS
  [5 items checked, results]

[6] STOP CONDITIONS TRIGGERED
  [List or "NONE"]

[7] VERDICT
  DELIVERY SAFE / DELIVERY BLOCKED — [reason]
```

---

## 5. Post-Delivery (Optional)

After a live simulation completes:

1. Confirm all items served actually read `question_state: "Certified"` (if session log available).
2. Verify no error states from items that should have been excluded.
3. Log the session result for psychometric tracking.

---

## 6. Reference

- **Certification standard:** `knowledge/CAQS_v1.0.md` §1.7
- **Governance states:** `knowledge/QUESTION_METADATA_STANDARD.md` Part 9
- **Known defects:** `knowledge/DEFECT_LIBRARY.md`
- **Session status (open risks):** `reports/SESSION_STATUS_2026-07-22.md`
