# Defect Library

**Purpose:** Catalog every content defect discovered after initial authoring, with root cause, detection method, and correction. Entries drive automated validator rules and improve future content creation.

**Note â€” Build-Time AI Verification as Defect Source:** As of the governance amendment (Sprint 6.x), build-time AI verification is an accepted defect-detection source alongside automated validators. Defects surfaced by AI verification follow the same schema (ID, Class, Domain, Severity, Detection Rule, Validator/Source, Root Cause, Correct Pattern, Regression Test) with the "Validator" field allowed to read "Build-Time AI Verification" where appropriate. This does not create a new validator module or alter the existing validator pipeline order.

**Class Scale (Structural Audit):**

| Class | Meaning | Examples |
|-------|---------|----------|
| Structural | Field-level rule violations | Missing fields, wrong types, format mismatches, empty-when-required, non-empty-when-empty (DL-008) |
| Content | Accounting/educational quality issues | Wrong answer, imprecise explanation, distractor quality (DL-001, DL-002, DL-006, DL-007) |
| Pedagogical | Learning science / psychometric issues | Cognitive level mismatch, absolute language, ambiguity, distractor similarity (DL-003, DL-004, DL-005) |

**Severity Scale:**

| Severity      | Meaning                             |
| ------------- | ----------------------------------- |
| Critical      | Wrong answer / incorrect accounting |
| High          | Multiple defensible answers         |
| Medium        | Weak distractors                    |
| Low           | Grammar / wording                   |
| Informational | Metadata only                       |

---

## DL-001

```
Defect ID        DL-001
Class            Content
Domain           Semantic Accuracy
Severity         Critical
Detected By      Manual Review (Phase 1 CAQS)
Status           Resolved
```

**Question IDs:** P1B-C-185

**File:** `pack_b_corrected.js`

**Stem:** "Which of the following factors is LEAST likely to trigger a variance investigation?"

### Issue

Option C read: *"A variance that is exactly equal to the standard cost."*

By definition: **Variance = Actual âˆ’ Standard**

If variance equals the standard cost (e.g., standard = $100, variance = $100), then actual is either $0 or $200 â€” an enormous variance that absolutely warrants investigation.

The author intended to describe **a zero variance** (actual = standard), but the option text says something mathematically different. The explanation correctly described the intended meaning, creating an answer/explanation mismatch.

### Root Cause

Imprecise wording during authoring. The phrase "variance equals standard cost" was substituted for "actual cost equals standard cost (zero variance)" without verifying mathematical consistency.

### Pattern

```
"Variance equals standard cost"
```

**Correct pattern:** "Actual cost equals standard cost" / "zero variance"

Indirection in variance descriptions. Authors describe the variance magnitude ($0) by referencing standard cost ($100) rather than stating "zero variance" directly. This creates ambiguity whenever the two numbers happen to be equal.

### Detection Rule (v2 â€” Calibrated)

Primary pattern: `/variance\s+.*\b(equals?|equal to|same as)\b/i`

Exclusion (legitimate formula descriptions):  
`/\bstandard\s+(?:price|quantity|rate|hours?|CM|cost per|usage|allowance|input|output|budget|volume|efficiency|spending)\b/i`

A match only triggers if the primary pattern matches AND the exclusion pattern does NOT match.

### Validator

`PsychometricValidator.MathematicalValidator`

### Regression Test Suite

| Input | Expected | Status |
|-------|----------|--------|
| "A variance that is exactly equal to the standard cost" | Trigger | âœ… |
| "A variance that is equal to the standard" | Trigger | âœ… |
| "Variance equals standard cost" | Trigger | âœ… |
| "variance equals standard price times actual quantity" | No trigger | âœ… |
| "variance equals ... minus standard price" | No trigger | âœ… |
| "variance equals ... Ã— Standard CM" | No trigger | âœ… |
| "variance equals standard rate Ã— (actual - standard) hours" | No trigger | âœ… |
| "variance equals actual hours Ã— (actual - standard) rate" | No trigger | âœ… |
| "variance equals standard price Ã— usage difference" | No trigger | âœ… |

Run with: `node -e "const MV = require('./scripts/validators/psychometric/MathematicalValidator'); const v = new MV(); const r = v.runSelfTest(); console.log(r.failed === 0 ? 'ALL PASS' : 'FAIL: ' + r.failed);"`

### Correction

| Field | Before | After |
|-------|--------|-------|
| Choices.C | "A variance that is exactly equal to the standard cost" | "Actual costs equal standard costs, resulting in a zero variance" |
| Choices.A | "A variance that persists for several consecutive periods" | "A recurring unfavorable variance that exceeds the investigation threshold" |
| Choices.D | "A variance that exceeds a predetermined monetary threshold" | "A significant variance whose cause has not yet been identified" |
| ExplanationCorrect | "A variance that equals the standard cost (i.e., zero variance)..." | "When actual costs equal standard costs, the variance is zero..." |
| ExplanationWrongA | Referenced old A text | Updated to match new Option A |
| ExplanationWrongB | Referenced old B text | Updated for clarity |
| ExplanationWrongD | Referenced old D text | Updated to match new Option D |

### Regression Test

- Verify Option C is selected as the correct answer (least likely trigger)
- Verify all three distractors are genuine investigation triggers
- Verify no other question contains "variance equals standard"

### Resolved

2026-07-21 â€” Applied to `pack_b_corrected.js` line 10467.

---

---

## DL-002

```
Defect ID        DL-002
Class            Content
Domain           Explanation Consistency
Severity         Medium
Detected By      ExplanationConsistencyValidator
Status           No Findings â€” Clean
```

**Result:** Zero findings across 2,575 scanned questions. All explanations are consistent with their corresponding correct answers.

**Pattern:** ExplanationCorrect contradicts the selected correct-answer letter (e.g., explanation says "is not correct" about the correct choice).

**Detection Rule:** Regex negation patterns (`/is not correct/i`, `/is incorrect/i`) on ExplanationCorrect text, combined with low keyword overlap between the explanation and the correct-choice text.

**Validator:** `PsychometricValidator.ExplanationConsistencyValidator`

### Note
This validator has an 80% confidence rating. Low-confidence checks (keyword overlap heuristics) did not trigger, suggesting all explanations are genuinely well-aligned.

---

## DL-003

```
Defect ID        DL-003
Class            Pedagogical
Domain           Absolute Language
Severity         Medium
Detected By      AbsoluteLanguageValidator
Status           Has Findings â€” 958 Hits
```

**Result:** 958 instances of absolute language detected across 2,575 questions. Breakdown:
- "only"/"exclusively": 824 (86%)
- "always": 79 (8%)
- "never": 39 (4%)
- "must", "exactly", "impossible": 16 (<2%)

**Recommendation:** Prioritize "always" and "never" findings first (118 errors). Most "only" uses are legitimate (e.g., "recognize revenue only when...").

**Pattern:** Choice or prompt contains absolute wording: "always", "never", "only", "must", "exactly", "impossible".

**Detection Rule:** Regex patterns for each absolute term in choice text and prompt text.

**Validator:** `PsychometricValidator.AbsoluteLanguageValidator`

### Notes
- "Always" and "never" are almost never justified in a well-written CMA choice â€” flag as errors
- "Only", "must", "exactly" may be justified in narrow technical contexts â€” flag as warnings
- Review priority: always/never > must > only > exactly/impossible

### 2026-08-23 Amendment — Term-Set Expansion + Distractor-Slot Audit

User-reported exam practice feedback (all modules) identified additional cueing terms — "any", "all", "every" — and requested scoping. Full-bank audit (2,620 items, all 5 packs, distractor slots only):

| Term set | Distractor-slot hits | Triage |
|----------|---------------------|--------|
| always / never / impossible (strong cueing) | 128 items (A 20, B 18, C 39, D 21, E 30) | Remediate — high elimination-cue value |
| any / every / all / must | 1,032 hits | Triage — many legitimate technical uses ("write down all three lines") |
| only / exclusively | 846 hits | Mostly legitimate per original note |

`AbsoluteLanguageValidator` term set extended to include "any", "all", "every" (warning class). Remediation batched per Rule 5 (≤30 items/change-set).

---

## DL-004

```
Defect ID        DL-004
Class            Pedagogical
Domain           Ambiguity
Severity         Medium
Detected By      AmbiguityValidator
Status           Has Findings â€” 410 Hits
```

**Result:** 410 instances of vague qualifiers flagged across 2,575 questions. Also includes overlapping-distractor warnings.

**Recommendation:** Cluster by term for efficient review (e.g., review all "generally"/"usually" questions together).

**Pattern:** Choice or prompt contains vague qualifiers: "usually", "normally", "generally", "often", "typically".

**Detection Rule:** Regex patterns for each vague qualifier in choice and prompt text.

**Validator:** `PsychometricValidator.AmbiguityValidator`

### Notes
- Vague qualifiers reduce item discrimination because test-takers can rationalize almost any answer
- Some usage is legitimate (e.g., "Costs are generally classified as..." in a knowledge-level item)
- Flag for human review rather than auto-fix

---

## DL-005

```
Defect ID        DL-005
Class            Pedagogical
Domain           Distractor Similarity
Severity         Medium
Detected By      DistractorSimilarityValidator
Status           Has Findings â€” 450 Warnings
```

**Result:** 450 distractor-similarity warnings across 2,500 MCQ questions. Notable high-severity findings:
- Numerous 100% identical distractors (e.g., P1B-C-194 B/D, P1B-D-092 A/D, P1B-D-136 A/C, P1-DC-069 all pairs)
- Multiple questions with all 6 pairs > 50% similarity (e.g., P1B-D-088, P1-BC-065â€“070, P1E-A-003, P1E-C-003/004)
- Pack E has the highest concentration of similarity issues

**Recommendation:** Investigate 100% identical distractors first (placeholder quality). Then review domain clusters with pervasive moderate similarity.

**Pattern:** Two or more distractors share high word overlap (Jaccard similarity > 70%), making them psychometrically redundant.

**Detection Rule:** Jaccard similarity of significant words (length > 2, excluding stop words) between every pair of choices. Flag distractor-distractor pairs > 70%.

**Validator:** `PsychometricValidator.DistractorSimilarityValidator`

### Notes
- Distractor-correct pairs are flagged at > 70% (moderate similarity between correct and a distractor is itself worth reviewing)
- Distractor-distractor pairs > 50% are flagged as warnings
- Questions with high-similarity distractors almost always underperform psychometrically
- Confidence: 70% â€” Jaccard similarity without NLP has non-trivial false-positive rate

---

## DL-007

```
Defect ID        DL-007
Class            Content
Domain           Explanation Quality
Severity         Medium
Detected By      Manual CAQS Review (Sprint 6.1, Batch 1)
Status           Superseded â€” see DL-013 for corrected scope. The single-question entry below (P1-A-022) was the prototype finding. Actual scope: 2,587 occurrences across 882 QIDs in Packs A/C/D (Pack A: 118, Pack C: 382, Pack D: 382). The original "Resolved" annotation applied only to this one item; the broader defect category was not understood at time of filing.
```

**Question IDs:** P1-A-022 (prototype only â€” full scope at DL-013)

**File:** `pack_a_corrected.js` lines 1120â€“1123

**Stem:** "Meridian is comparing U.S. GAAP and IFRS treatment of internally developed intangible costs. Which response is most appropriate?"

### Issue

All three distractor explanation fields (ExplanationWrongA, ExplanationWrongC, ExplanationWrongD) contained nearly identical generic text that differed only by the option letter and choice text inserted verbatim at the beginning. Each explanation read:

> "Option X (choice text) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusion that recognize that ifrs may permit capitalization of qualifying development costs, while u.s. gaap is generally more restrictive. A candidate may select this option by misapplying a related but distinct concept."

This is a copy-paste defect. None of the distractor explanations explained WHY that specific choice was wrong or addressed the specific misconception the distractor targets.

### Root Cause

Template-based bulk authoring without per-distractor quality review. The author wrote one generic explanation and reused it across all three distractor slots.

### Pattern

Identical or near-identical distractor explanations differing only by inserted choice text. Look for:
```
/represents a plausible misconception[\s\S]*A candidate may select this option by misapplying a related but distinct concept/
```

### Detection Rule

The ExplanationConsistencyValidator does NOT catch this (it only checks consistency between ExplanationCorrect and CorrectChoice). A validator that checks for distractor explanation uniqueness (comparing Jaccard similarity between distractor explanation pairs) would detect this pattern.

### Correction

Each distractor explanation was rewritten to:
1. Address the specific error in the choice
2. Explain the misconception behind selecting that option
3. Contrast with the correct approach

| Field | Before | After |
|-------|--------|-------|
| ExplanationWrongA | Generic template | Explains why development costs are not inventory |
| ExplanationWrongC | Generic template | Explains why GAAP doesn't capitalize research costs + "always" overgeneralization |
| ExplanationWrongD | Generic template | Explains why IFRS may permit capitalization â†’ not "always expense" |
| ExplanationCorrect | 1 sentence | Full explanation: IAS 38 vs ASC 350-40, capitalization criteria, exam trap |

### Regression Test

- Verify P1-A-022 ExplanationWrongA, C, D are all unique and choice-specific
- Verify ExplanationCorrect references specific accounting standards (IAS 38, ASC 350-40)
- Verify no other question has all three distractor explanations as near-copies

### Resolved

2026-07-22 â€” Applied to `pack_a_corrected.js` lines 1093â€“1123.

---

## DL-006

```
Defect ID        DL-006
Class            Content
Domain           Session Recovery
Severity         High
Detected By      Regression Test (test_session_recovery.js â€” Test 12)
Status           Resolved
```

**Component:** `SessionPersistence.save()`

### Issue

When a user completes an exam (`session.completed = true`, `session.submitted = true`), the primary save correctly stores the completed state. However, stale checkpoints in `cmaP1SessionCheckpoints` remain from earlier in the session, causing `restore()` to fall back to an old checkpoint and return `true`.

### Root Cause

The `save()` method wrote the primary save but never cleared checkpoints or journal when the session was marked completed. `restore()` checks `!sn.session.completed` on the primary save (skips it), then falls through to `_restoreFromCheckpoints()`, which finds a pre-completion checkpoint and restores it.

### Detection Rule

If `session.completed` is true during `save()`, immediately remove `CHECKPOINT_KEY` and `JOURNAL_KEY` from localStorage.

### Correction

Added to `save()` in `SessionPersistence`:

```javascript
if (sn.session && sn.session.completed) {
    localStorage.removeItem(this.CHECKPOINT_KEY);
    localStorage.removeItem(this.JOURNAL_KEY);
}
```

### Regression Test

- Test 12 in `scripts/test_session_recovery.js`: save completed session â†’ `restore()` returns false â†’ `clear()` removes all keys

### Resolved

2026-07-22 â€” Applied to `app.js` line 413.

---

## DL-008 â€” ExplanationWrong[CorrectChoice] Non-Empty

```
Defect ID        DL-008
Class            Structural
Domain           Explanation Slot Error (EV8 â€” CAQS v1.0 Â§4.4)
Severity         High (learner-safety risk when Certified â€” wrong-answer explanation displayed in correct-answer slot; upgraded from 2026-07-22 "Low" after full-pool severity reassessment 2026-07-23)
Detected By      Build-Time AI Verification (Sub-batch 2A Wave 1, 2026-07-22); full-pool sweep (2026-07-23)
Status           Resolved — reconciled 2026-09-05 (0 pool-wide, all states; see Learner-Safety Status). Prior 6-agent orchestration claimed "0 remaining across all 5 packs" but a 2026-07-23 Tier 0 corrective session found 175 DL-008 items in Pack C (174 Certified + 1 MISSING: P1-BC-094) — likely DL-019 concurrent-write overwrite: the DL-013/certification wave restored pre-cleared EW[CC] fields. Additionally, all 175 items are affected by a systematic CorrectChoice rotation artifact (CC ≠ EC for 74.1%), making simple EW[CC] clear unsafe. See `reports/session_status/TIER0_PACK_C_DL008_SESSION_2026-07-23.md` for full evidence ledger. Validator gap (ExplanationValidator.js:180) fixed. Governance guard Rule 2 BLOCK active.
```

### Affected

| Category | Count | Scope | Status |
|----------|-------|-------|--------|
| Previously resolved | 203 | Tier 0 (7) + Bucket 1A (108) + Wave 1 (14) + Pack B/E (24 — re-authoring) + Pack A (187 via Agent 4) + Pack C (74 via Agent 4) + Pack D (75 via Agent 5) = 539 | **All resolved 2026-07-22/23** |
| **Total identified** | **539** | All 5 packs, all sections, all states | **539 identified — 539 resolved = 0 remaining** |
| **Certified pool impact** | **0** | All 75 Certified + all non-Certified cleared | **Learner pool fully secured** |

### Pattern

The distractor explanation slot corresponding to the correct answer (ExplanationWrong[CorrectChoice]) is non-empty. Per EV8 (CAQS_v1.0.md Â§4.4), this slot must be empty (`""`). Instead, many questions store a duplicate of ExplanationCorrect or a fragmentary clause in the correct-answer's ExplanationWrong slot.

**Certified example (P1-A-031, RESOLVED):** CorrectChoice was D. The ExplanationWrongÂ·D field contained `"Ending retained earnings = $195,000 + $80,400 - $20,700 = $254,700."` â€” a verbatim subset of the ExplanationCorrect field which independently contains the full explanation (formula + substitution + business interpretation). Zero content loss when cleared.

**Non-Certified example (P1-B-008, MISSING-state, Pack A Section B):** CorrectChoice is B. The ExplanationWrongÂ·B field contains substantive conceptual prose describing why the sales budget is prepared first. This is a full explanation fragment misplaced in the wrong slot.

### Root Cause

Template-based authoring: authors filled all four ExplanationWrong fields without verifying which slot maps to the correct answer. The defect manifests in three patterns:

| Pattern | Prevalence | Content Type | Remediation |
|---------|-----------|--------------|-------------|
| Bucket 1 â€” Naked calculation summary | ~46% (171/372 Tier 2 + 108 swept) | Duplicate of EC calculation portion | Mechanical clear â€” safe, zero content loss |
| Bucket 2 â€” Fragmentary conceptual clause | ~54% (201/372 Tier 2) | "because..." fragments, substantive prose | Editorial review â€” merge into EC, relocate, or remove |
| Bucket 3 â€” Misattributed distractor | 0 currently (1 resolved in Bucket 1A) | Explains a different choice's error | Re-attribute to correct ExplanationWrong slot |

### Severity Reassessment (2026-07-23)

DL-008 was originally classified **Low** severity based on the assumption that non-empty ExplanationWrong[CorrectChoice] is redundant but not harmful. The 2026-07-23 full-pool sweep reassessed this:

- **When Certified items are affected:** severity is **High** (learner-safety risk). If the delivery engine reads the distractor explanation slot for the correct answer, a learner reviewing the correct answer sees calculation-summary or fragmentary text instead of a proper explanation. While the content is typically not factually wrong, the degraded educational feedback undermines the simulator's pedagogical purpose.
- **When non-Certified items are affected:** severity is **Medium** (certification-blocking). Items with DL-008 cannot be certified per governance-guard Rule 2.

### Detection Rule

```
For each question Q:
  let letter = Q.CorrectChoice;
  if Q["ExplanationWrong" + letter] is truthy â†’ flag DL-008
```

**Automated enforcement:** governance-guard Rule 2 (BLOCK) â€” prevents certification of any item with non-empty ExplanationWrong[CorrectChoice]. Active as of 2026-07-22. The `ExplanationValidator` module reports these as warnings (not errors) â€” DL-008 is the only structural defect in the validator suite that is tracked as a warning rather than a blocking error. A validator gap exists: Certified items should produce errors, not warnings.

### Validator / Source

- **Primary detection:** `Build-Time AI Verification` â€” full-pool scan scripts at scripts/ directory (Method 1: Function constructor; Method 2: JSON.parse â€” identical 393 result, both methods verified)
- **Runtime enforcement:** `governance-guard.js` Rule 2 (BLOCK level)
- **Validator integration:** `ExplanationValidator` reports DL-008 violations as warnings (gap: should be errors for Certified items)
- **Validated false positive rate:** 0% across 539 occurrences â€” every flag is a genuine EV8 violation

### Correction

For Bucket 1 (calculation summaries): set ExplanationWrong[correct_letter] to `""` â€” no content loss, ExplanationCorrect independently contains the full explanation.

For Bucket 2 (fragmentary conceptual): per-item editorial judgment required â€” merge into ExplanationCorrect, relocate to distractor slot, or remove.

For Bucket 3 (misattributed): re-attribute to correct ExplanationWrong slot.

### Regression Test

- Verify ExplanationWrongA/B/C/D are empty for the slot matching CorrectChoice
- Verify no content loss â€” ExplanationCorrect must still contain the full explanation
- Re-run validator â€” zero new errors
- Re-run registry build â€” item count unchanged, MD5 match on second pass

### Resolution Timeline

| Date | Action | Count | Impact |
|------|--------|-------|--------|
| 2026-07-22 | Bucket 1A sweep | 108 clears | Packs A/C/D — mechanical only |
| 2026-07-22 | Wave 1 re-contamination fix | 14 clears | Pack A Section A — sub-agent "Option X is correct" bug |
| 2026-07-23 | Full-pool sweep | 393 identified | All 5 packs, all states — first complete inventory |
| 2026-07-23 | Certified Tier 0 fix | 7 clears | Pack A Section A — learner pool secured |
| 2026-07-23 | Authoritative paired-object rescan | **336 remaining** (75 Certified + 261 non-Certified) | Refutes prior "197 cleared / ~189 remain" estimate. **75 Certified items live.** |
| 2026-07-23 | ExplanationValidator line-180 gap fix (Agent 1) | 3 lines added; 336/336 detected; 0 false positives | Validator now catches DL-008 at validation time |
| 2026-07-23 | Pack A DL-008 remediation (Agent 4) | 187 clears (7 batches ≤30) | Pack A: 0 remaining |
| 2026-07-23 | Pack C DL-008 remediation (Agent 4) | 74 clears (3 batches ≤30) | Pack C: 0 remaining |
| 2026-07-23 | Pack D DL-008 remediation (Agent 5) | 75 clears (3 batches ≤30) | Pack D: 0 remaining |
| 2026-07-23 | Independent verification (Agent 6) | 20/20 spot-checks pass; 10/10 CorrectChoice intact | **0 classic DL-008 remaining — all 5 packs clean** |
| 2026-07-23 | **Tier 0 corrective session — Pack C re-scan** | **175 items found** (174 Certified + 1 MISSING: P1-BC-094) | **Pack C: 175 remaining. CC-rotation artifact discovered. All 175 quarantined (Tier 1).** Prior "74 clears" claim refuted — likely DL-019 overwrite by DL-013/certification wave. |

### Learner-Safety Status

**RESOLVED — reconciled 2026-09-05.** Canonical-parser within-object rescan (same-object CC+EW extraction, DL-029-compliant) finds **0 DL-008 pool-wide across all states and all 5 packs** — run twice on separate sessions (DL-047 audit + 2026-09-05 cleanup) with stable counts, plus a Certified-only rescan at 0. The 2026-07-23 "175 remaining" figure is superseded: later waves re-remediated Pack C without a corresponding library update (S896 closed 59 pre-existing instances pool-wide; S133 closed the 9-item Pack D Section B cluster; Rule 2 BLOCK prevents recurrence). P1-BC-094 (the MISSING item in the 2026-07-23 count) carries no DL-008 in current files. Learner-pool exposure: 0. Historical record of the 2026-07-23 Tier 0 corrective session: `reports/session_status/TIER0_PACK_C_DL008_SESSION_2026-07-23.md`.

**Validator gap fixed:** `ExplanationValidator.js` line 180 was patched (Agent 1) to flag non-empty `ExplanationWrong[CorrectChoice]` as errors. Previously the validator silently skipped non-empty slots at the CorrectChoice position.

### Cross-References

- Full-pool sweep report: `reports/defect_sweeps/DL008_FULL_POOL_SWEEP_2026-07-23.md`
- Remediation proposal: `reports/remediation/DL008_REMEDIATION_PROPOSAL.md` (batch plan, â‰¤28 items/batch)
- Prior sweep closeout: `reports/defect_sweeps/DL-008_SWEEP_CLOSEOUT.md`
- Re-contamination scan: `reports/defect_sweeps/DL008_RECONTAMINATION_SCAN.md`
- Governance guard: `.opencode/plugins/governance-guard.js` Rule 2
- REVISION_HISTORY.md: 7-item fix entry and formalization entry (both 2026-07-23)

---

## DL-009 â€” Incorrect Authority Citation

```
Defect ID        DL-009
Class            Content
Domain           Authority Citation
Severity         High (correctness defect â€” candidates learn wrong authoritative reference)
Category         Incorrect ASC authority citation
Detected By      Build-Time AI Verification (Sub-batch 2A Wave 3 â€” P1-A-012, expanded to P1-BC-065)
Status           Resolved — full-citation-table adjudication 2026-09-05 (108 citing items; 1 fix applied; rest legitimate)
```

**Question IDs:** P1-A-012, P1-BC-065 area

**Files:** `pack_a_corrected.js`

**Stems:**
- P1-A-012: "A company is sued for defective products. The company's legal team estimates a 70% probability of losing $500,000. Which of the following correctly describes the required accounting treatment?"
- P1-BC-065 area: Budget/contingency planning question â€” "Which step should management take after determining a risk is reasonably likely to occur?"

### Issue

The cited ASC authority reference does not match the accounting concept being tested:

1. **P1-A-012** cites "ASC 210 (Accruals)" for loss contingency treatment. ASC 210 covers balance sheet classification (current vs. non-current). The correct authority for loss contingencies is ASC 450 (Contingencies).

2. **P1-BC-065 area distractor explanations** (~3 occurrences at line 7699â€“7702) use "Under ASC 450 (Contingencies)" in a budget/contingency planning question. The question tests management's planning response to risk, not loss contingency accounting. The ASC 450 citation is a DL-007 template artifact â€” the explanation text was reused from loss-contingency questions without updating the authority reference.

### Root Cause

Template-based authoring artifact. Questions were produced using a text template that included boilerplate authority citations. When the template was reused across topics, the ASC reference was not updated to match the new question's actual accounting concept.

The P1-A-012 case additionally reflects an original authoring error: the question writer cited the wrong ASC section for the topic.

### Correct Pattern

Verify every cited ASC section against the actual standard scope before production. The rule: **the cited ASC reference must match the accounting concept being tested, not merely be a valid ASC section**.

### Detection Rule

For each question, scan for pattern `ASC \d{3}(-\d{2}(-\d{2})?)?`. For each match, verify:
1. Does the cited standard's scope topic match the question's topic?
2. Is there a more specific subsection that should be cited?

Automated implementation: extend ReferenceValidator to cross-check cited ASC sections against a known-good topicâ†’standard mapping.

### Regression Test

Scan all pack files for cited ASC references (total: 483 across 5 packs). Cross-check each against the known-good list. Flag any citation where the standard's scope does not match the question's topic.

### Estimated Scope

| Pack | ASC Citations | Est. Scan Time |
|------|---------------|----------------|
| pack_a | 107 | ~30 min |
| pack_b | 53 | ~15 min |
| pack_c | 126 | ~35 min |
| pack_d | 171 | ~45 min |
| pack_e | 26 | ~10 min |
| **Total** | **483** | **~2â€“3 hours** |

### Resolved

2026-07-22 â€” 10 Pack C citation defects corrected:
- P1-AC-016 through P1-AC-020: "ASC 360 (Impairment)" â†’ "ASC 350 (Goodwill)" â€” goodwill impairment testing is governed by ASC 350, not ASC 360
- P1-AC-066 through P1-AC-070: "ASC 405 (Liabilities)" â†’ "ASC 450 (Contingencies)" â€” loss contingency disclosure is governed by ASC 450, not ASC 405

All 30 occurrences (3 per question Ã— 10 questions) corrected. Zero regressions on validator suite. Remaining 473 ASC citations across packs A/B/D/E were verified as correct during the DL-009 scan completed earlier.

### 2026-09-05 Amendment — Full-Citation-Table Adjudication

All 108 citing items extracted (QID/Topic/CC/ASC citations) and reviewed. Original instances confirmed fixed in current files (P1-A-012 cites ASC 450 correctly with detailed subsections; P1-BC-065 carries no ASC citation). 16 suspects read in full: 15 adjudicated clean — contrast/contextual citations that correctly invoke a standard to refute or characterize a choice (e.g., ASC 810 consolidation threshold to refute full consolidation on equity-method items AC-012/014; ASC 330 systematic-and-rational allocation language on ABB/capacity items B-006/B-064; ASC 606 to characterize revenue propositions in planning/quality/metadata stems B-028/C-010/F-055; ASC 606+326 substantive application on F-S06). 1 confirmed: P1B-F-120 EC cited "Under ASC 350" for ML training-data integrity — ASC 350 does not govern input-data integrity; repaired to COSO-only framing and recertified 2026-09-05 (no key change, 1 object, backup `pack_b_corrected.js.bak-DL009-20260905153818`). Residual: none known.

---

## DL-010 â€” Misassigned Choice Explanations

```
Defect ID        DL-010
Class            Structural / Content (hybrid)
Domain           Explanation Assignment
Severity         High
Detected By      Build-Time AI Verification (Sub-batch 2B Wave 2 â€” P1-A-029)
Status           Open — monitored class; all confirmed instances remediated (see 2026-09-05 amendment; no automated semantic gate exists)
```

**Category:** Misassigned choice explanations

**Question IDs (known):** P1-A-029 (Wave 2)

**File:** `pack_a_corrected.js`

**Stem (P1-A-029):** "Holt bought equipment for $92,800 with a $12,000 salvage value and a 5-year useful life. Using straight-line depreciation, what is the annual depreciation?"

### Issue

The content of `ExplanationWrong[X]` semantically describes a choice other than X, or `ExplanationCorrect` describes a wrong choice. In P1-A-029:

- **ExplanationWrongA** described Choice B ($16,160 = correct answer), not Choice A ($80,800)
- **ExplanationWrongB** described Choice C ($18,560, a distractor), not Choice B ($16,160, the correct answer)

A learner reviewing why A is wrong receives the text for the correct answer. A learner reviewing why B is wrong receives text about a different distractor. Both receive educationally misleading feedback.

### Root Cause

Authoring pattern where explanation fields were populated by column position rather than by choice assignment â€” a copy-paste artifact from bulk template filling. The author intended to write explanations in order (A-wrong, B-correct, C-wrong, D-wrong) but populated slots by a different mapping (Aâ†’correct text, Bâ†’distractor text, Câ†’distractor text, Dâ†’distractor text).

### Detection Rule

For each question Q, for each letter L in {A, B, C, D}:

1. Read the choice text `Q.Choices[L]`
2. Read the explanation text `Q["ExplanationWrong" + L]` (or `Q.ExplanationCorrect` for L = CorrectChoice)
3. Assess whether the explanation semantically describes the choice it is assigned to

This is inherently a semantic (NLP/human) check. No regex or structural rule can reliably detect it.

### Correct Pattern

Each `ExplanationWrong[X]` must describe why choice X is wrong. `ExplanationCorrect` must describe why the designated correct choice is correct. Formally:

```
For each letter L:
  if L == CorrectChoice:
    Q.ExplanationCorrect semantically describes Q.Choices[L]
  else:
    Q["ExplanationWrong" + L] semantically describes Q.Choices[L]
```

### Validator / Source

`Build-Time AI Verification` â€” no automated validator can reliably detect semantically-misassigned explanations. This is a fundamental gap: the existing validator suite checks structural correctness (DL-008), explanation uniqueness (DL-007), and authority accuracy (DL-009), but cannot verify that explanation text matches the specific choice it annotates.

### Reference Instance (P1-A-029)

| Slot | Before (wrong) | After (correct) |
|------|----------------|-----------------|
| ExplanationWrongA | "$16,160 equals ($92,800 - $12,000) / 5, correctly applying the straight-line formula." (describes Choice B) | "$80,800 is the depreciable base (cost minus salvage), not the annual depreciation. Annual depreciation = $80,800 / 5 = $16,160." |
| ExplanationWrongB | "$18,560 results from dividing the full cost ($92,800) by 5 without subtracting salvage value." (describes Choice C) | "Option B ($16,160) is correct. Straight-line depreciation = ($92,800 - $12,000) / 5 = $80,800 / 5 = $16,160 per year." |

### Regression Test

Repository-wide semantic scan across all packs and scored-case files. For each question and case item, confirm:

- Each `ExplanationWrong[X]` text refers to the specific error in Choice X
- `ExplanationCorrect` text refers to the specific correct answer
- No explanation text is wholly generic or describes a different choice

### 2026-08-23 Amendment — ZBB Template Contamination (Pack C/D)

During the DL-043 Batch 1 remediation, a systematic misassignment cluster surfaced: the explanation text *"Zero-based budgeting requires all expenses to be justified each period from zero…"* appears in 17 ExplanationWrong slots across Packs C and D. Classification:

- **13 on-topic but generic** (Pack C 5: P1-BC-080, BC-081, CC-048, FC-036, FC-075; Pack D 8: P1-CD-045, CD-046, CD-049, CD-066, CD-069, CD-070, CD-091, CD-094) — these items genuinely carry a "Zero-based budgeting" distractor; the identical boilerplate EW is a DL-013-class choice-specificity gap, deferred to the DL-013 workstream. **RESOLVED 2026-08-23 (DL-043 Batch 4):** all 13 rewritten choice-specific.
- **4 misassigned (correctness defect)** — the ZBB text sat in EW slots whose choices are unrelated: P1-CD-068 EWC (variance thresholds), P1-CD-044 EWC (customer profitability), P1-CD-072 EWC (quality benchmarking), P1-CD-075 EWB (quality maturity). All four rewritten 2026-08-23 with choice-specific explanations.
- A companion "controllability principle" misassigned EWA in P1-CD-068 was corrected in the same pass.
- **Additional misassignments found 2026-08-23 (DL-043 Batch 4):** P1-BC-079/P1-BC-080 EWA (ABB/ZBB hybrid text on an incremental-budgeting choice) and P1-CD-070 EWD (controllability choice) — all three corrected.

**Cross-check note:** the P1-CD-068/044/072/075 cluster shares the P1-CD-xxx template family that produced the DL-043 near-duplicate distractors — both defect classes trace to the same rotation-template pipeline.

### 2026-09-05 Amendment — Generalized-Screen Adjudication + 5 Fixes

Keyword-recall screen (per non-CC EW slot: own-choice recall < 0.25 with another-choice recall ≥ 0.5) over all Certified items yielded 253 flags. Strongest 48 (own == 0, best ≥ 0.8, best ≠ CC) read in full → 5 confirmed, all remediated + recertified 2026-09-05 with choice-specific texts (keys intact, 5 objects across 2 packs): P1-DC-038 EW_D (truncated text describing choice A); P1-FC-043 EW_A (RPA/keystroke fusion) + EW_B (describes choice D); P1-FC-048 EW_B/EW_C transposed pair; P1-BD-032 EW_B (duplicates A's refutation); P1-CD-073 EW_C (describes choice B). 43/48 adjudicated clean — sign-flip variance items whose correct "amount-right-direction-wrong" texts share section vocabulary ("unfavorable"/amounts), a systematic screen artifact. Remaining 204 weaker flags unread (low-yield tail: best < 0.8 or own > 0). Screen script preserved for future runs. Plus DL-047 Group-B confirmations (P1-DD-022, P1B-B-102 — remediated + recertified).

---

## DL-011 — Reserved (Intentionally Skipped — Numbering Gap)

```
Defect ID        DL-011
Class            Structural
Domain           N/A — Reserved
Severity         Informational
Detected By      N/A
Status           Reserved — skipped during initial authoring
```

### Issue

DL-011 was not assigned during the original defect library authoring sequence (DL-001 through DL-010, then DL-012). This entry exists to document the gap as intentional, preventing future auditors from incorrectly assuming an entry was deleted or overlooked.

**No content defect associated with this DL-ID.**

---

## DL-012 â€” Section E Clonal Redundancy (Pack C/D)

```
Defect ID        DL-012
Class            Structural
Domain           Clone Redundancy
Severity         Medium
Detected By      Section E Population Scan (2026-07-22)
Status           Resolved — 18 clones archived 2026-09-05 (see Remediation Status)
Category         Template-generated clone waste
```

**Question IDs:** 150 items across Pack C (Section E: EC-001â€“EC-075) and Pack D (Section E: ED-001â€“ED-075). 140 clones (28 groups Ã— 5 items each) + 10 standalone unique items.

**Files:** `pack_c_corrected.js`, `pack_d_corrected.js`

**Pattern:** 28 clone groups, each containing 5 items generated via template:
- Stem variation: fictional company names only (alphabetical progression), no other content varies
- Answer choices: same four options, positionally rotated so correct answer lands in A/B/C/D once per group
- Distractor explanations: verbatim identical within each group (generic "plausible misconception" template text)
- Difficulty: one item per group marked "Difficult" with expanded ExplanationCorrect; others are "Moderate" or "Easy"

### Root Cause

Residual duplication from the historical Pack C/Pack D bulk-authoring aliasing issue. The same authoring template was used to generate variant packs (Aâ†’Câ†’Dâ†’Bâ†’E), producing 5-item groups where only the company name and answer-letter position varied.

### Detection Rule

For each micro-topic within a Section, compare stems for Jaccard similarity > 90% after removing proper nouns. Flag groups of 5 items sharing the same stem skeleton with only company-name substitution and answer-letter rotation.

### Remediation Plan

| Batch | Scope | Approach |
|-------|-------|----------|
| 1 | Segment 1 + 3 (Unprocessed) | Rewrite distractor explanations to be choice-specific. Blocking certification. |
| 2-3 | Segments 2, 4, 6 | Deferred -- per-wave editorial enhancement. Not blocking. |
| 4 | Segment 5 | Route to DL-010 workstream. |

Batch cap: <=28 items per governance-guard Rule 5. Backup-before-write: mandatory per BACKUP_PROTOCOL.md.


### Count Stability

Three scans were run before the count stabilized at 140 clones. The original finding report (128) had an arithmetic error (56+56â‰ 128) and an undercount. The first background agent (138) miscounted Groups 1 and 15. The definitive scan (BG Agent 3, 150 items / 140 clones) is authoritative.

### Open Decisions — RESOLVED 2026-09-05

- Option A (Archive) selected per user-authorized live-pool cleanup directive (Archived = out of delivery, content preserved per §9.2, reversible).
- Reconstruction was required: the proposal files are absent from the repo, and intervening waves differentiated most original groups. Current-architecture scan (stem-Jaccard ≥ 0.78 + identical choice-value multiset, the AGENTS.md §19.4 rotation-gate family) found 11 residual families (29 items), not 28 — 121/150 scope items are now solo (genuinely differentiated). Seeds picked by richest EC + clean EWs (ED-036/040 and ED-046/050 decided on EW richness over the EC-length tie-break).
- Group-1 debate moot: EC-003's stem diverged (supplier-sanctions scenario); the surviving SoD-skeleton family (EC-001/004/005) seeded EC-004.

### Remediation Status

**EXECUTED 2026-09-05.** 18 clones archived, state-only (Certified → Archived; content untouched per §9.2): Pack C — EC-001, EC-005, EC-010, EC-030, EC-050, EC-051, EC-053, EC-055, EC-057, EC-059, EC-062, EC-063, EC-064, EC-065; Pack D — ED-001, ED-014, ED-036, ED-046. 11 seeds retained (EC-004/008/028/049/052/060/061, ED-002/015/040/050). Traveling defects ride into archive (reactivation-gated, documented here): EC-030 (key inversion stored-D/true-B + foreign EWs), EC-050 (EW_A/EW_D mismatches), EC-051/053/057/059/063/064/065 (DL-013 boilerplate slots). Pool: 2,602 Certified (500/500/486/496/620). Backups: `pack_c/d_corrected.js.bak-DL012-20260905152943`. Superseded fixes: EC-001/005/010/055 (DL-047 remediations absorbed by archival — correctness work preserved in seed counterparts).

### Regression Test

After archival:
- Verify 28 seeds have `question_state: "Unprocessed"` (active)
- Verify 112 clones have `question_state: "Archived"` (excluded from learner pool)
- Verify 10 standalone items preserved unchanged
- Verify zero Section F misplacements (EC-075 and ED-075 confirmed Section E)
- Verify no clone QID appears in delivery pool

### Impact

Before remediation, 140 clone items (93.3% of the 150 Pack C/D Section E inventory) provide zero additional pedagogical value beyond the 28 seed items. The clone waste also dilutes Section E population metrics and distorts blueprint coverage reporting.

---

## DL-013 â€” Template Boilerplate Distractor Explanations

```
Defect ID        DL-013
Class            Content
Domain           Explanation Quality
Severity         High (educational quality â€” learners receive generic, non-instructional feedback)
Detected By      Build-Time AI Verification (DL-007 segmentation scan, 2026-07-22; scope corrected 2026-07-23)
Status           Resolved — certification-blocking scope closed 2026-09-05 (template 0 + short-form 0 pool-wide; see closeout below).
Category         Template-generated boilerplate distractor explanations
```

**Question IDs:** 882 unique QuestionIDs across Pack A (118), Pack C (382), and Pack D (382). Total: 2,587 individual ExplanationWrong field occurrences. Zero Certified QIDs affected (learner pool clean). âš  The original 1,011 figure was produced by brace-matched object parsing which fragments single QIDs across multiple pseudo-objects (~15% inflation). Boundary-aware block-parsing (QuestionID â†’ next QuestionID boundary) is the authoritative method per `reports/defect_sweeps/DL007_QID_COUNT_BOUNDARY_REVERIFY.md` and `.opencode/skills/reconciliation-audit.md` Â§3a.

**Files:** `pack_a_corrected.js`, `pack_c_corrected.js`, `pack_d_corrected.js`

**Pattern:** Distractor explanation fields contain identical or near-identical generic template text:
> "Option X (...) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusion that [correct answer]. A candidate may select this option by misapplying a related but distinct concept."

All three distractor slots per question share this template, differing only by the option letter and inserted choice text. The explanations do not address WHY each specific distractor is wrong or identify the targeted misconception.

### Root Cause

Template-based bulk authoring (same pipeline that produced DL-012 clones). Questions were authored in 5-item groups where distractor explanations were template-filled rather than individually written.

### Detection Rule

```
For each ExplanationWrong[X] field in each question:
  if field contains "represents a plausible misconception"
    AND "A candidate may select this option by misapplying"
    â†’ flag DL-013
```

Scanning methodology (corrected 2026-07-23): The original brace-matched object parsing inflated the unique QID count by ~15% (1,011 vs. correct 882 â€” see `reports/defect_sweeps/DL007_QID_COUNT_BOUNDARY_REVERIFY.md`). The authoritative method is boundary-aware block-parsing (find `"QuestionID"` â†’ scan to next `"QuestionID"` â†’ test block per `.opencode/skills/reconciliation-audit.md` Â§3a). Zero Certified items affected (down from an initial false-positive count of 9 caused by a prior window-based scan). The field-occurrence count (2,587) was unaffected by the parsing error and remains confirmed by all methods.

### Segmentation (from DL007_SEGMENTATION.md, scaled to 2,587 occurrences)

| Segment | Description | Est. Occurrences | Priority |
|---------|-------------|-----------------|----------|
| 1 | Exact duplicate generic (identical across all 3 slots) | ~640 | Highest â€” zero educational value |
| 2 | Generic but directionally accurate | ~1,280 | Deferred â€” not blocking certification |
| 3 | Misleading or inconsistent | ~250 | High â€” correctness defect |
| 4 | Intentional equivalents (accepted pattern) | ~155 | Document and close |
| 5 | Misassigned (route to DL-010) | ~10 | Correctness defect |
| 6 | Unassessed | ~252 | Classify during remediation |

### Certified QIDs Affected

**0.** All 2,587 occurrences are in Unprocessed or legacy (no `question_state`) items. The learner pool is clean. This defect blocks certification of the affected items but has no impact on current learner delivery.

### Count Stability

Three independent methods converged at 2,587:
- Method 1: global regex (pattern match across raw files) = 2,587
- Method 2: field-bounded extraction (ExplanationWrong field name â†’ value regex) = 2,587
- Method 3: boundary-aware parse (brace-matched complete objects) = 2,587

Cross-check: all 2,587 occurrences contain both "represents a plausible misconception" AND "A candidate may select this option by misapplying" â€” confirming identical template origin.

### Distribution

| Pack | Occurrences (original) | Remediated | Remaining (authoritative) | Sections with Residue |
|------|------------------------|-----------|--------------------------|----------------------|
| Pack A | 295 | 57 | **238** | A (5), B (111), C (94), E (28) |
| Pack C | 1,146 | ~789 | **357** | D (131), E (125), F (101) |
| Pack D | 1,146 | ~890 | **256** | E (138), F (118) |
| **Total** | **2,587** | **~1,736** | **851** | Boundary-safe rescan confirmed |

Packs C and D have identical counts (1,146 each) â€” a duplicate artifact from the historical bulk-authoring pipeline (same root cause as DL-012).

### Remediation Plan

| Batch | Scope | Approach |
|-------|-------|----------|
| 1 | Segment 1 + 3 (Unprocessed) | Rewrite distractor explanations to be choice-specific. Blocking certification. |
| 2-3 | Segments 2, 4, 6 | Deferred -- per-wave editorial enhancement. Not blocking. |
| 4 | Segment 5 | Route to DL-010 workstream. |

Batch cap: <=28 items per governance-guard Rule 5. Backup-before-write: mandatory per BACKUP_PROTOCOL.md.

**Detailed execution proposal:** 
`
` reports/remediation/DL013_REMEDIATION_PROPOSAL.md ` -- 6-batch plan targeting Pack C/D Section A first (137 items, 411 fields, 100% Segment 1 boilerplate). These are the highest-density DL-013 clusters: Pack C Section A has 65 contaminated items (86.7% of section); Pack D Section A has 72 (96.0%). All are fully templated -- all 3 distractor slots per item carry identical boilerplate. Zero DL-008 overlap (all CorrectChoice slots clean). Proposed execution order: Pack C (3 batches: 20+28+17), then Pack D (3 batches: 28+28+16). This represents the largest single remediation block within the 882-QID DL-013 population.

### Relationship to DL-007

DL-007 was originally filed as a single-instance defect (P1-A-022) and marked Resolved. The prototype finding was correct in pattern but incomplete in scope â€” the defect category spans 2,587 occurrences, not one question. DL-013 supersedes DL-007 as the authoritative defect record. DL-007 is retained in the library with a cross-reference annotation. The DL-007 entry's "Resolved" status applied only to P1-A-022; the entry has been re-labeled "Superseded â€” see DL-013."

### Resolved

2026-07-23 — In progress. As of the 2026-07-23 governance documentation catch-up session, a fresh boundary-safe QID-indexing rescan (QuestionID → next QuestionID block, per `.opencode/skills/reconciliation-audit.md` §3a) produced the following authoritative counts:

**Remaining: 366 QIDs, 851 fields** — zero Certified items affected (learner pool clean).

| Pack | Remaining QIDs | Remaining Fields | Sections with Residue |
|------|---------------|-----------------|----------------------|
| Pack A | 94 | 238 | A (2 QIDs: P1-A-044, P1-A-064), B (41), C (38), E (13) |
| Pack C | 159 | 357 | D (60), E (56), F (43) |
| Pack D | 113 | 256 | E (61), F (52) |
| **Total** | **366** | **851** | |

**Remediation completed since original scan (2,587 → 851 = 1,736 fields cleared):**
- Pack D Section A: 72 items (dedicated DL-013 batches)
- Pack C Section A: 65 items (dedicated DL-013 batches)
- Pack C Section C: 86 items / 182 fields (Subagent 2, confirmed 0 by fresh rescan)
- Pack D Section C: 86 items / 193 fields (Subagent 2, confirmed 0 by fresh rescan)
- Pack C Section B: 57 items (Subagent 3 certification wave, confirmed 0 by fresh rescan)
- Pack D Section B: 51 items (Subagent 3 certification wave, confirmed 0 by fresh rescan)
- Pack A Section D: 24 items (Subagent 3 certification wave, confirmed 0 by fresh rescan)
- Pack D Section D: 37 items (Subagent 3 certification wave, confirmed 0 by fresh rescan)

**Fresh rescan cross-checks:**
- Section C (both Pack C and Pack D): **0 fields** — Subagent 2 remediation fully confirmed
- Section B (both Pack C and Pack D): **0 fields** — Subagent 3 certification wave fully confirmed
- Pack A Section D: **0 fields** — Subagent 3 certification wave fully confirmed
- Pack A Section A residual: 2 items (P1-A-044, P1-A-064) with 5 fields — edge cases missed by prior sweeps

**Count stability:** The 851 field total was confirmed by 5 independent boundary-safe per-section scans. No counting instability observed. Full plan: `reports/remediation/DL013_REMAINING_1713_REMEDIATION_PROPOSAL.md`.

### 2026-09-05 Closeout — Blocking scope resolved

Exact-template screen (both-half conjunction) over all 5 packs found 8 Certified items (EC-051/053/056/057/059/063/064/065 — the 2026-07-23 "851 fields" figure is superseded; intervening waves cleared the rest without a library update); short-form screen found 0; all-states counts identical (no non-Certified residue). Disposition: 7 archived via the DL-012 disposition of the same date (EC-051/053/057/059/063/064/065 — boilerplate rides into archive, documented in DL-012); EC-056 (unique Meridian board-independence scenario, S58-upgraded) repaired choice-specific + recertified. Post: template 0, short-form 0 pool-wide, all states. Deferred Segments 2/4/6 editorial enhancement (generic-but-accurate texts) remains non-blocking future work, not a certification defect.

---

## DL-014 — Sibling Null Guard Missing (app.js:1187 s.mcqs)

```
Defect ID        DL-014
Class            Structural
Domain           Session Recovery
Severity         Low (defensive — no crash reported for this path)
Detected By      Code path analysis during DL-013 / app.js crash guard work (2026-07-23)
Status           Open — documented, low priority
```

**File:** `app.js` line 1187

**Issue:** The same null-guard vulnerability applied at line 1188 (`s.cases.length` → `(s.cases || []).length`) exists one line earlier for `s.mcqs.length`. If a session restore corruption produces null/undefined for both `s.mcqs` and `s.cases`, line 1187 throws TypeError before reaching the guarded line 1188.

**Current code (line 1187):**
```javascript
if (s.qIndex < s.mcqs.length) return this.renderMCQ(s.mcqs[s.qIndex]);
```

**Proposed fix (identical pattern to line 1188):**
```javascript
if (s.qIndex < (s.mcqs || []).length) return this.renderMCQ(s.mcqs[s.qIndex]);
```

**Root Cause:** Same as the line 1188 crash — the `render()` decision tree assumes `s.mcqs` and `s.cases` are always valid arrays. Session restoration via `localStorage.getItem()` + `JSON.parse()` can produce partial/corrupted snapshots.

**Remediation Priority:** Low. No crash has been reported for the MCQ path. The line 1188 fix already handles the known crash vector. This is a defensive hardening item for a future session.

**Resolved**

Not yet.

---

## DL-015 — Metadata Topic Numbering Shift (E.040–E.042)

```
Defect ID        DL-015
Class            Structural
Domain           Metadata Consistency
Severity         Low (informational — no content or learner impact)
Detected By      Session 1 Tier 0 escalation investigation; confirmed by Sessions 2, 5, 6 (2026-07-23)
Status           Open — documented, low priority
```

**Question IDs:** P1-E-040, P1-E-041, P1-E-042

**File:** `pack_a_corrected.js`

**Issue:** The Topic field number labels for items E.040 through E.042 are shifted by one position relative to the expected sequential topic mapping. The Topic *descriptions* are correct — the numbering labels alone are shifted:

| QID | Topic Field (current) | Actual Content | Expected Topic Number |
|-----|----------------------|----------------|----------------------|
| P1-E-040 | "E.040 inventory cycle count investigation 5" | Inventory cycle count | E.040 (or alternate slot) |
| P1-E-041 | "E.041 user access recertification 6" | User access recertification | E.040 per sequential mapping |
| P1-E-042 | "E.042 control exception root cause 7" | Control exception root cause | E.041 per sequential mapping |

In all three cases, the Topic *description* portion ("inventory cycle count investigation 5", "user access recertification 6", "control exception root cause 7") correctly describes the item's actual content. Only the numeric label (E.040, E.041, E.042) is offset from expectation.

### Root Cause

Template authoring — items were generated from a 5-item rotation group where the Topic label was auto-incremented sequentially, but a prior item (E.040's index position) was assigned a different topic ("inventory cycle count") than the rotation template expected ("user access recertification"). This shifted all subsequent Topic labels by one.

### Impact

**None.** The Topic description matches the content. The rendering engine does not use Topic numbers for content display. No stem-choice inconsistency exists — this was confirmed by three independent sessions (2, 5, 6). The initial Tier 0 emergency flag was a false positive caused by comparing Topic numbers rather than Topic descriptions.

### Detection Rule

For any item where `Topic` contains a label like "E.NNN <description>", verify that `<description>` matches the item's `Stem` content semantics. The numeric label `E.NNN` is cosmetic metadata.

### Validator

This defect category is not currently covered by any validator module. Recommended: add a `TopicDescriptionConsistencyValidator` to the `MetadataValidator` pipeline for future certification waves.

### Remediation

Correct the Topic number labels when the items next undergo certification review. Priority: lowest — no learner impact, no content incorrectness, no certification-blocking property.

### Cross-Reference

**DL-016** documents a related but distinct manifestation of the same template-pipeline root cause: the metadata-block `ChoiceA`-`D` text (first object per QuestionID) is shifted such that each seed's metadata advertises the *previous* QID's topic, not its own. Both defects arise from the same 5-item rotation template but affect different fields. DL-015 = content-block Topic labels; DL-016 = metadata-block ChoiceA-D text.

### Resolved

Not yet.

---

## DL-016 — Metadata-Block Topic-Numbering Shift (Pack A Section E)

```
Defect ID        DL-016
Class            Structural / Documentation
Domain           Metadata Consistency
Severity         Upgraded to HIGH (2026-07-24 — Session 64 pilot certification found DL-016 affects ALL Pack A sections, not just Section E; learner-safety risk on Certified items where EW text describes wrong item's choices)
Detected By      Build-Time AI Verification (Session 5 — reconciliation-audit skill validation, 2026-07-23; EXPANDED Session 64, 2026-07-24)
Status           **Resolved — S805 (2026-07-26). 57 Certified Pack A Section E items remediated: 171 ExplanationWrong fields authored with choice-specific, COSO-aligned distractor explanations. 0 DL-008, 0 empty distractor slots. Architecture confirmed as SINGLE-OBJECT (not dual-block) for Section E. P1-E-084 was naturally clean (last in rotation group).** Packs C and D dual-block status not yet confirmed — S805 scope was Pack A Section E only.
```

**Question IDs:** P1-E-038 through P1-E-042 (5 certified seeds)

**File:** `pack_a_corrected.js`

### Issue

The pack file uses a paired-object structure per QuestionID: a **metadata block** (QuestionID, question_state, ChoiceA–D, ExplanationWrongA–D) and a **content block** (Part, Section, Topic, Stem, Choices, CorrectChoice, ExplanationCorrect). The metadata blocks for seeds P1-E-038 through P1-E-042 exhibit a systematic one-position shift: each seed's metadata `ChoiceA`–`D` text advertises the *previous* QID's topic, not its own.

| Seed QID | Metadata ChoiceA-D Topic | Content-Block Actual Topic |
|----------|--------------------------|---------------------------|
| P1-E-038 | AP duplicate invoice control | **Payroll terminated employee control** |
| P1-E-039 | Payroll terminated employee | **Inventory cycle count** |
| P1-E-040 | Inventory cycle count | **User access recertification** |
| P1-E-041 | User access recertification | **Control exception root cause** |
| P1-E-042 | Control exception root cause | **Control evidence retention** |

The content block (what the app renders to the learner) is internally consistent in every case — stem matches choices topically, CorrectChoice is correct for the rendered stem. The metadata block's choices are stale template residue from the original bulk-authoring pipeline.

### Root Cause

Template-based bulk authoring produced items in 5-item rotation groups. When the content blocks were independently authored/upgraded during the Section E Block 1 certification wave, the metadata blocks were not updated to match — they still carry the rotation-template choices from the original authoring pass. This is the same template pipeline that produced the DL-012 Pack C/D clones and the Pack B Section E 17-defect rotation artifacts.

### Impact

**HIGH — Learner-safety risk on Certified items.** The metadata block's ExplanationWrong fields describe a *different* item's choices than the content block that the learner sees. This means a learner who selects a wrong answer may see an explanation about a completely different topic.

**Session 64 pilot evidence (2026-07-24):**
- **P1-A-005** (contract liability for advance collections, CC=D): Metadata EW fields describe P1-A-004's ASC 606 equipment installation scenario. A learner answering P1-A-005 incorrectly sees distractor explanations about Umbra's installation contract revenue recognition.
- **P1-A-030** (retained earnings rollforward, CC=D): Metadata EW fields describe a cash-flow indirect-method question (depreciation, A/R, A/P), not the retained earnings calculation.
- **P1-D-030** (predetermined overhead applied to job, CC=A): Metadata EW fields describe a JIT philosophy question, not overhead allocation.
- **P1-DD-025** (margin of safety calculation, CC=B): Metadata EW_B contains text about reciprocal cost allocation method ("Option B is incorrect. The reciprocal method best captures...") — completely unrelated to the margin-of-safety question the learner answered.

**Previously documented impact (2026-07-23):** The content block (what the app renders to the learner) is internally consistent — stem matches choices topically, CorrectChoice is correct for the rendered stem. The metadata block's ExplanationWrong fields, however, are from a +1 offset item. The rendering engine reads ExplanationWrong fields from the metadata block, meaning learners see wrong explanations for wrong-answer choices on affected Pack A/C/D items.

### Detection Rule

For any item with `question_state: "Certified"`, extract both metadata-block `ChoiceA`–`D` and content-block `Choices.A`–`D`. Compare:
- If identical → structurally consistent
- If different → flag as metadata-content inconsistency (this defect)

### Correction

Align the metadata-block `ChoiceA`–`D` text with the content-block `Choices.A`–`D` text for all 5 seeds during a future metadata-remediation pass. Low priority — the content blocks are already correct.

### Scanning-Quality Impact (2026-07-23)

This defect class caused a Tier 0 false alarm when Session 1's scanning script used a flat regex match (`/ChoiceA/`) that captured the metadata-block field before reaching the content-block nested field (`"Choices": { "A": ... }`). The script reported stem-choice mismatches based on metadata-block choices, which carry stale template residue from the original bulk-authoring pipeline. The content block (actual learner-facing choices) was internally coherent for all affected items. The Hold→Certified revert was executed by Session 2, and Session 6 independently confirmed via direct field reconciliation.

**Rule for future scans:** When reading learner-facing choices, use path-aware matching (`"Choices": { "A"`) — never use flat `"ChoiceA"` regex on blocks that contain both metadata and content sub-blocks. The rendering engine indexes by `Choices.A`–`D` (nested), not by `ChoiceA`–`D` (flat metadata).

### Converged Sessions

- Session 2 (Hold→Certified revert + root cause analysis)
- Session 6 (direct field reconciliation refuting the stem-choice mismatch claim)
- Session 1 (third-angle verification: re-examined raw file, confirmed metadata vs. content block confusion)

### Cross-Reference

**DL-015** documents a related but distinct manifestation of the same template-pipeline root cause: the content-block `Topic` field number labels are shifted by one position. Both defects arise from the same 5-item rotation template but affect different fields. DL-015 = content-block Topic labels; DL-016 = metadata-block ChoiceA-D text.

### Resolved

2026-07-26 — S805: 57 Certified Pack A Section E items remediated. 171 ExplanationWrong fields authored with choice-specific, COSO-principled distractor explanations. All fields reference appropriate COSO principles (1-5: Control Environment, 6-9: Risk Assessment, 10-12: Control Activities, 13-15: Information & Communication, 16-17: Monitoring). Zero DL-008, zero empty distractor slots. Architecture investigation confirmed Section E uses single-object format (not dual-block) — the +1 shift was an ExplanationWrong rotation artifact from template-based authoring, not a metadata-vs-content block divergence. P1-E-084 naturally clean (last in rotation group). Governance guard 27/27 PASS. Pack A Section E learner pool fully secured.

**2026-08-24 — Post-resolution instrument measurement (canonical pack_parser, Item 1 Phases A/B):** Role-tagging + `toCanonicalRecords` measured dual-block structure pool-wide: **paired metadata/content blocks = 0 across all five packs (2,620/2,620 single-object)**, independently confirmed by raw-key census (flat `ChoiceA`–`D` keys = 0 pool-wide; nested `Choices` exactly once per item). All historical dual-block citations under DL-016/DL-026/DL-029 refer to structures no longer present in current files — they describe history, not live architecture. Instrument evidence: conformance harness fingerprint pair `9d6c89c2…d1601`, artifact `reports/PHASE_B_CONFORMANCE_HARNESS_2026-08-24.json`.

---

---

## DL-017 — Pack B Sections B/C/F File Corruption (Backtick-Newline Artifact)

```
Defect ID        DL-017
Class            Structural
Domain           File Integrity / Parser Infrastructure
Severity         High (blocks Pack B Sections A/D certification, rotation-artifact audit, and all JSON/object-parsing tools on Sections B/C/F)
Detected By      Build-Time AI Verification (2026-07-23 governance documentation catch-up — root-cause analysis of the Pack B "eval() parser failure")
Status           Resolved — 275 sites fixed 2026-07-23 via 6-agent orchestration (Agent 3)
Category         File corruption residue from prior reconstruction script
```

**Question IDs:** 275 Certified items across Pack B Sections B (P1B-B-101 through P1B-B-200, 100 items), C (P1B-C-101 through P1B-C-200, 100 items), and F (P1B-F-076 through P1B-F-150, 75 items).

**File:** `pack_b_corrected.js`

### Issue

A `` `n `` (backtick-literal-n) artifact is embedded in the inter-object space of 275 question objects, making them unparseable by `JSON.parse()` or `new Function()`:

```
"QuestionID": "P1B-B-101",`n    "question_state": "Certified",101: true,
```

The corruption has two components:
1. `` `n `` appears where a JSON property separator should be (e.g., ``,`` or ``,`` + newline)
2. `NNN: true,` is a duplicate artifact appended after `question_state` (e.g., `,101: true,`)

The corruption is mechanically identical at all 275 locations across Sections B, C, and F.

### Root Cause

Residue from a prior file reconstruction/recovery script that mismatched a newline replacement pattern, substituting a backtick for a comma or newline character. The original authoring pipeline likely used template strings with `` ` `` delimiters in a separate build step; when the build output was reconstructed from a partial backup, the replacement pattern substituted `` ` `` for ``,`` at specific line positions.

Sections A (73 items, lines 19–2919) and D (74 items, lines 10952–14160) have clean JSON structure with zero backtick corruption and no `question_state` field (MISSING state). These 147 items are the uncertified sections that require a rotation-artifact audit — currently blocked because scripts that attempt JSON.parse() on the full Pack B array fail before reaching Sections A and D.

Section E (75 items, lines 14164–17597) has clean JSON with `question_state: "Certified"` and zero backtick corruption.

### Impact

| Blocked Work | Scope | Notes |
|-------------|-------|-------|
| Pack B Sections A/D rotation-artifact audit | 147 items | Batch parse fails before reaching these clean sections |
| Pack B Sections A/D certification | 147 items | Both sections lack question_state entirely |
| Pack B Sections B/C/F DL-008 scan | 275 items | JSON-based tools crash on corrupted objects |
| Pack B Sections B/C/F DL-013 scan | 275 items | JSON-based tools crash on corrupted objects |
| `build_master_registry.js` on Pack B | 500 items | Brace-tracking may survive; JSON.parse() per-object fails |
| Any script calling `JSON.parse()` on full Pack B array | 500 items | Malformed JSON rejected |

**NOT blocked:** Simple grep/regex scans via `Select-String` work fine (string matching unaffected).

### Pattern

At each of the 275 corruption sites:
```
"QuestionID": "P1B-[BCF]-\d+",`n    "question_state": "Certified", NNN: true,
```

**Correct pattern:**
```
"QuestionID": "P1B-[BCF]-\d+",
    "question_state": "Certified",
    ...
```

### Detection Rule

Grep for `` `n `` in `pack_b_corrected.js`:
```
Select-String -Path pack_b_corrected.js -Pattern '`n'
```
Expected: 275 matches, all in Sections B/C/F. Zero matches in Sections A/D/E.

### Validator / Source

`Build-Time AI Verification` — no existing validator detects this pattern. The file corruption was previously mischaracterized as "template string literals preventing `eval()` parsing" (see `reports/session_status/SESSION_STATUS_2026-07-23.md` §5). The actual parser issue is that the JSON is structurally malformed, not a JavaScript language feature.

### Correction

**Option A (recommended — simple find-and-replace):**

A 2-pattern mechanical fix across 275 locations:
1. Replace `` `n    "question_state" `` → ``,
    "question_state" `` (restore valid JSON separator)
2. Remove ``,NNN: true,`` artifact entirely

This is NOT a parser upgrade. It is a file-correction operation. No AST parser, acorn, babel, or npm install required.

Estimated effort: ~30 minutes. Risk: LOW — the corruption is mechanically identical at all 275 locations.

**Option B (validation-gated):**

Write a targeted Node.js script that:
1. Reads the file line-by-line
2. On lines matching `/P1B-[BCF]-\d+",\x60n/` applies both replacements
3. Writes cleaned file to a new path
4. Validates all 275 affected objects parse via `JSON.parse()` individually
5. Confirms QuestionID count unchanged (500)
6. Cross-checks: pack_a and pack_d backup integrity; zero regression on validator suite

### Regression Test

After correction:
- `JSON.parse()` the full Pack B array succeeds (500 items)
- `grep -c '"QuestionID"'` returns 500
- `grep '` + '`n`' returns 0
- Sections A and D (147 items) are parseable — unblocking rotation-artifact audit
- Sections B, C, F (275 items) show `question_state: "Certified"` on the correct line with no `NNN: true` artifact

### Cross-References

- SESSION_STATUS: `reports/session_status/SESSION_STATUS_2026-07-23.md` §5 (mischaracterized as "eval() parser failure")
- Pack B Section E rotation artifacts: 17 confirmed defects (prior to Section E certification)
- REVISION_HISTORY.md: Governance catch-up entry (this session)
- governance-guard.js Rule 5: 30-item batch cap — the 275-location fix is above the cap but is a file-correction, not a batch content write

### Resolved

2026-07-23 — 275 corruption sites fixed via Agent 3 (6-agent orchestration). All `` `n `` artifacts removed and `NNN: true` duplicates stripped. Pack B Sections A/D (147 items) now unblocked for rotation-artifact audit. Sections B/C/F remain Certified with `question_state` intact. `JSON.parse()` validates clean across all 500 items. Backup: `pack_b_corrected.js.bak-20260723141212` (1,330,691 bytes).

---

## DL-018 — Missing ExplanationWrong[CorrectChoice] Fields (Pack E + Pack A Section E)

```
Defect ID        DL-018
Class            Structural
Domain           Explanation Slot Error (complementary to DL-008)
Severity         Medium (field absent rather than non-empty; ExplanationCorrect + ExplanationWrongA–D fields exist at all other positions; 104 Certified items affected but learner impact is indirect — missing field produces cleaner rendering than DL-008's misplaced text)
Detected By      Build-Time AI Verification (6-agent orchestration Wave 2, Agent 2 + Agent 5, 2026-07-23)
Status           **Resolved — 351/351 items remediated (2026-07-23). P1-E-027 confirmed NOT DL-018 (CorrectChoice=B, ExplanationWrongB exists and is ""). P1-E-032 confirmed genuine DL-018 (CorrectChoice=C, ExplanationWrongC was absent) — fixed by orchestrator. All 349 Pack E items fixed by Agent 2. All 2 Pack A Section E items fixed (P1-E-031 by Agent 2, P1-E-032 by orchestrator).**
Category         Missing-field artifact from separate authorship pipeline (Pack E + Pack A Section E legacy templates)
```

**Question IDs:** 352 items across:
- **Pack E:** 349 items (Sections A–F, all sections). Specific distribution: 104 Certified, 245 non-Certified. **All 349 remediated by Agent 2 — 0 remaining.**
- **Pack A Section E:** 2 items (P1-E-031, P1-E-032 — **both remediated**). P1-E-027 originally listed but confirmed NOT DL-018 (CorrectChoice=B, ExplanationWrongB exists and is "").

**File:** `pack_e_corrected.js`, `pack_a_corrected.js`

### Issue

The `ExplanationWrong[CorrectChoice]` field is **structurally absent** (undefined) from the question object at the slot matching the CorrectChoice letter. This is distinct from classic DL-008 where the field exists with non-empty content.

Unlike DL-008, where the learner sees misplaced text in the correct-answer explanation slot, a missing field typically causes no user-visible defect — the rendering engine encounters `undefined` and treats it equivalently to an empty string. However, the field's absence means:
1. The ExplanationValidator silently skips these items (line 173 guard: `if (!val) return;`) — the validator was designed to validate non-empty strings, not check field presence
2. The item's JSON structure is incomplete relative to the schema assumed by `governance-guard.js` Rule 2
3. Future tooling that expects all four `ExplanationWrong` keys to exist may encounter unexpected `undefined` behavior

**104 of these 352 items are Certified** — they are in the active learner delivery pool. The absence of the field at the CorrectChoice position means no wrong-answer text appears where the correct-answer explanation should be, which is the correct rendering behavior (empty = no wrong-answer text shown). This is why severity is Medium, not High — the missing-field scenario paradoxically produces *correct* rendering, unlike DL-008 which produces *wrong* rendering.

### Root Cause

Separate authorship pipeline. Pack E was authored independently from Packs A–D (not through the same template-based bulk-authoring pipeline). Pack E items use a JSON structure where ExplanationWrong fields are only populated for distractors (non-correct-answer slots) and omitted entirely for the correct-answer slot. Pack A Section E items (E-033, E-046, E-047) share this structural pattern — likely authored by the same pipeline or writer.

In contrast, Packs A–D items populate all four ExplanationWrong slots regardless of CorrectChoice, creating the DL-008 problem. The Pack E authorship pipeline avoided the DL-008 defect category by simply not emitting the ExplanationWrong field at the CorrectChoice position.

### Pattern

```
{
  ...
  "CorrectChoice": "B",
  "ExplanationWrongA": "why A is wrong...",
  "ExplanationWrongC": "why C is wrong...",
  "ExplanationWrongD": "why D is wrong...",
  // ExplanationWrongB is simply not present
  "ExplanationCorrect": "why B is correct..."
}
```

Compare with DL-008, where `ExplanationWrongB` exists and contains `"some text"` instead of being absent.

### Detection Rule

```
For each question Q:
  let letter = Q.CorrectChoice;
  if !(("ExplanationWrong" + letter) in Q) → flag DL-018
```

Note: This is the *structural inverse* of DL-008. DL-008 flags non-empty; DL-018 flags absent. Both can be detected with the same scan by checking both conditions:
- `typeof Q["ExplanationWrong" + letter] === "undefined"` → DL-018
- `Q["ExplanationWrong" + letter] !== ""` → DL-008

### Validator / Source

- **Primary detection:** `Build-Time AI Verification` — Agent 2 and Agent 5 during the 6-agent orchestrated DL-008 remediation (2026-07-23)
- **Validator integration:** `ExplanationValidator.js` line 173 guard (`if (!val) return;`) silently skips undefined fields. A separate validation path is needed for field-presence checks.
- **Governance guard:** No explicit rule for missing ExplanationWrong fields (Rule 2 only blocks non-empty ExplanationWrong[CorrectChoice], not absent fields)

### Correction

Add the missing ExplanationWrong[CorrectChoice] field with value `""` for all 352 affected items. This is a structural normalization with zero content impact:
- The field value is empty (nothing to render)
- ExplanationCorrect independently contains the full explanation
- Validator and governance guard will no longer encounter undefined fields at the CorrectChoice position

**For Pack E:** ~349 items need the missing field added. This can be done via a single targeted script since the structural pattern is uniform across the pack.
**For Pack A Section E:** 3 items (P1-E-033, P1-E-046, P1-E-047).

### Priority

**Medium.** No learner-facing defect exists (missing field produces correct rendering behavior). The remediation is a structural normalization to close the validator gap and ensure future tooling compatibility. Defer to next Pack E or Pack A Section E certification wave.

### Relationship to DL-008

| Property | DL-008 | DL-018 |
|----------|--------|--------|
| Field state | Exists, non-empty | Absent (undefined) |
| Learner impact | Wrong text in correct-answer slot | Correct rendering (empty = no text) |
| Severity | High (learner-safety risk) | Medium (validator normalization) |
| Detection gap | Validator line 180 | Validator line 173 |
| Packs affected | A, C, D | E, A (Section E only) |
| Status | Resolved | Resolved |

### Regression Test

After correction:
- All 352 items have `ExplanationWrong[CorrectChoice]: ""` (field exists, value is empty string)
- ExplanationCorrect content preserved unchanged
- No learner-facing text changes
- QuestionID count unchanged by field
- Validator: 0 DL-008 errors, 0 DL-018 field-presence warnings

### Cross-References

- 6-Agent orchestration session: REVISION_HISTORY.md lines 3561–3613
- Agent 2 finding: 46 Pack E items flagged (determined to be missing-field, not classic DL-008)
- Agent 5 investigation: Pack E confirmed 0 classic DL-008, 349 missing-field items
- DL-008 entry (DEFECT_LIBRARY.md): complementary defect — non-empty field at CorrectChoice position
- ExplanationValidator.js: line 173 guard (`if (!val) return;`)

### Resolved

2026-07-23 — 351 of 351 items remediated (Pack E: 349 items by Agent 2 across 13 batches; Pack A Section E: P1-E-031 by Agent 2, P1-E-032 by orchestrator). ExplanationWrong[CorrectChoice] fields added as `""`. **0 remaining.** P1-E-027 was a false positive (CorrectChoice=B, ExplanationWrongB exists and is ""). All other ExplanationWrong fields (A, B, D) are present with genuine, choice-specific text across all affected items.

**2026-08-24 Amendment — Phase C targeting classification (canonical pack_parser EW-key census):**
Four pool items exhibit absent-EW-slot structure (flat-EW counts: Pack B 1998/2000, Pack C 1999/2000, Pack E 2479/2480). All four classified **benign variant — absent slot == CorrectChoice**, distractor slots present with substantive text (632–846 chars), all Certified. Remediation = schema normalization only (`ExplanationWrong[CC]: ""`); zero learner-facing gap:

| QID | State | CC | Absent slot | Distractor lens |
|-----|-------|----|-------------|-----------------|
| P1B-E-083 | Certified | C | C (== CC) | A:637, B:789, D:781 |
| P1B-F-091 | Certified | C | C (== CC) | A:833, B:720, D:728 |
| P1-EC-045 | Certified | C | C (== CC) | A:743, B:669, D:632 |
| P1E-B-012 | Certified | C | C (== CC) | A:809, B:818, D:846 |

---

## DL-021 — Missing Distractor ExplanationWrong Fields (Pack E Section C)

```
Defect ID        DL-021
Class            Structural / Content (hybrid)
Domain           Explanation Slot Absence (distinct from DL-018 CorrectChoice-only absence)
Severity         High (educational quality — 5 Certified items in learner pool; all 100 Section C items have zero distractor explanations; learners see no feedback on incorrect choices) — RESOLVED
Detected By      Build-Time AI Verification (3-agent scoping session, 2026-07-23)
Status           Resolved — S71 (2026-07-24) authored 264 choice-specific distractor explanations across 88 Unprocessed items and certified all 100. 5 previously remediated items (Autonomous Run Part 4) intact. Confirmed 0 DL-021 remaining by S828 (2026-07-27). All 100 Section C items Certified with fully authored distractor EW fields (300 fields, avg 162 chars).
Category         Template pipeline gap — distractor ExplanationWrong fields completely absent
```

**Question IDs:** 100 items: P1E-C-001 through P1E-C-100 (all Pack E Section C)

**File:** `pack_e_corrected.js`

**Pattern:** Every Pack E Section C item has exactly 1 ExplanationWrong field — the CorrectChoice-matching slot, which is empty (`""`). This empty slot was added by the DL-018 remediation session, which scanned for missing ExplanationWrong[CorrectChoice] across all Pack E items and added `""` where absent. The three distractor ExplanationWrong fields are structurally absent (undefined, not present in the JSON object).

```
// Actual structure (P1E-C-001, CorrectChoice=B):
{
  ...
  "Stem": "Standard costs are:",
  "ExplanationCorrect": "Standard costs are predetermined target costs...",
  "QuestionID": "P1E-C-001",
  ...
  "ExplanationWrongB": ""      // ← Only field present (DL-018 fix)
  // ExplanationWrongA: ABSENT
  // ExplanationWrongC: ABSENT
  // ExplanationWrongD: ABSENT
}

// Expected structure (cf. P1E-B-001, CorrectChoice=D):
{
  ...
  "Stem": "A static budget is based on:",
  "ExplanationCorrect": "Static budgets are fixed for...",
  "QuestionID": "P1E-B-001",
  ...
  "ExplanationWrongA": "Multiple activity levels...",   // ← Present
  "ExplanationWrongB": "Industry averages...",           // ← Present
  "ExplanationWrongC": "Actual activity levels...",      // ← Present
  "ExplanationWrongD": ""                                // ← CorrectChoice, empty
}
```

### Issue

All 100 Pack E Section C items are missing three ExplanationWrong fields each (300 total distractor explanation slots). When a learner selects an incorrect answer, the review screen shows no feedback explaining why that choice is wrong. The CorrectChoice slot is present and empty (normalized by DL-018), and ExplanationCorrect is present with text for all items. But the distractor feedback layer — the educational content that teaches why each wrong option is wrong — does not exist for Section C.

This is a **distinct defect from DL-018**. DL-018 is the absence of the ExplanationWrong field at the CorrectChoice position (1 slot per item). DL-021 is the absence of the ExplanationWrong fields at all three distractor positions (3 slots per item). DL-018 is a structural normalization issue; DL-021 is a content-authoring gap.

**5 of the 100 affected items are Certified and in the active learner delivery pool:**
| QID | CorrectChoice | Certification Batch |
|-----|--------------|---------------------|
| P1E-C-013 | D | R14 Wave 5 |
| P1E-C-054 | D | R14 Wave 6 |
| P1E-C-055 | A | R14 Wave 6 |
| P1E-C-074 | D | R14 Wave 6 |
| P1E-C-083 | C | R14 Wave 6 |

These 5 Certified items have been delivered to learners with no distractor explanations visible. The educational quality of the review experience for these items is degraded — learners who select wrong answers receive no instructive feedback on why their answer is incorrect.

### Root Cause

The Pack E authoring template engine was configured with a per-section flag that controlled ExplanationWrong field generation. For all other sections (A, B, D, E, F), the template emitted all 4 ExplanationWrong fields with choice-specific distractor text (and the CorrectChoice slot empty). For Section C, the template was configured to suppress distractor ExplanationWrong generation entirely.

Evidence supporting this hypothesis:
1. All 5 other Pack E sections have 4.0 ExplanationWrong fields per item with real text. Only Section C has 1.0 (just the DL-018-added empty CorrectChoice slot).
2. All other structural fields (StudyLinks, SourceDescription, VerifiedChecks, UniqueConceptKey, MicroTopic, LOSTag format, ReviewNote, ItemStyle) are identical between Section C and Section B/D/E/F — ruling out a different author or pipeline.
3. Section C items are interleaved within the same rotation-group blocks as other sections — they were generated at the same time, not in a separate authorship pass.
4. The VerifiedChecks boilerplate for Section C claims "Distractors written as plausible CMA-style traps" — but no distractor explanations exist. This boilerplate was emitted by the template regardless of whether distractors were written, confirming the template was the source of the gap rather than a post-hoc stripping operation.
5. Pack B Section C (a different pipeline) has all 4 ExplanationWrong fields with detailed text — demonstrating that the defect is Pack E/template-specific, not Section C topic-specific.

### Pattern

```
"ExplanationCorrect": "<substantive text>",
"QuestionID": "P1E-C-NNN",
...
"ExplanationWrong[CC]": ""  // ← Only field present, empty (DL-018 added)
// ExplanationWrong[other 3 letters] are structurally absent
```

**Correct pattern (cf. Pack E Section B):**
```
"ExplanationCorrect": "<substantive text>",
"QuestionID": "P1E-B-NNN",
...
"ExplanationWrongA": "<why A is wrong>",  // ← Present with text
"ExplanationWrongB": "<why B is wrong>",  // ← Present with text  
"ExplanationWrongC": "<why C is wrong>",  // ← Present with text
"ExplanationWrongD": ""                    // ← Present, empty (CorrectChoice)
```

### Detection Rule

```
For each question Q with Section == "C" in pack_e:
  let cc = Q.CorrectChoice;
  for each letter L in {A, B, C, D}:
    if L == cc:
      Verify Q["ExplanationWrong" + L] === "" (DL-018 normalization, OK)
    else:
      Verify Q["ExplanationWrong" + L] is present and non-empty
      If absent → flag DL-021
```

### Validator / Source

- **Primary detection:** Build-Time AI Verification — 3-agent sequential-safe scoping session (2026-07-23)
- **Validator integration:** No existing validator detects field absence (present/absent) — only field content (empty/non-empty). The `ExplanationValidator.js` line 173 guard (`if (!val) return;`) silently skips both undefined and empty fields. A field-presence check (`hasOwnProperty` or `!== undefined` vs `=== ""`) is needed to distinguish DL-021 from DL-018.
- **Governance guard:** The `governance-guard.js` Rule 2 BLOCKs non-empty ExplanationWrong[CorrectChoice] but does not check for absent distractor ExplanationWrong fields.

### Correction

For all 100 Pack E Section C items, author choice-specific distractor explanations for the 3 absent ExplanationWrong slots per item (300 total fields). Each distractor explanation must:
1. Explain why that specific choice is wrong
2. Identify the likely misconception that leads to selecting that choice
3. Contrast with the correct approach

Remediation should follow the same batch protocol as DL-018 remediation: ≤30 items per batch per governance-guard Rule 5, backup-before-write per BACKUP_PROTOCOL.md, and independent post-remediation verification.

**Certified items (5) must be remediated first** — they are in the active learner delivery pool and represent the highest-priority educational-quality gap.

### Relationship to DL-018

| Property | DL-018 | DL-021 |
|----------|--------|--------|
| Affected slots | CorrectChoice only (1 per item) | Distractor slots (3 per item) |
| Field state | Absent (undefined) | Absent (undefined) — same field state |
| Learner impact | None (absent field = correct rendering) | **Degraded educational feedback** (no distractor explanations shown) |
| Scope | Pack E Sections A-F + Pack A Section E (352 total) | **Pack E Section C only** (100 items) |
| Root cause | Authorship pipeline omitted CorrectChoice slot | **Template per-section flag suppressed all distractor ExplanationWrong generation** |
| Status | Resolved (351/351 fixed) | **Open — 300 fields not yet authored** |
| Severity | Medium | **High** (5 Certified items in learner pool) |

### Regression Test

After remediation:
- All 100 Section C items have ExplanationWrong[A,B,C,D] fields present
- Each distractor ExplanationWrong field (non-CorrectChoice) contains ≥ 50 characters of choice-specific text
- Each CorrectChoice ExplanationWrong field is `""`
- ExplanationCorrect preserved unchanged for all 100 items
- QuestionID count unchanged (100 P1E-C-*)
- 0 new validator errors
- Pre-delivery safety check: 0 Section C items flagged for missing distractor explanations

### Resolved

2026-07-24 — S71 authored 264 choice-specific distractor explanations across 88 Unprocessed items and certified all 100. 5 previously remediated items (Autonomous Run Part 4) intact. Confirmed 0 DL-021 remaining by S828 (2026-07-27). All 100 Section C items Certified with fully authored distractor EW fields (300 fields, avg 162 chars).

---

## DL-019 — Concurrent-Write Data Loss (DL-008 Remediation Silently Overwritten)

```
Defect ID        DL-019
Class            Structural
Domain           Concurrent-Write Integrity / Session Isolation
Severity         High
Detected By      Build-Time AI Verification (cross-session DL-008 re-verification, 2026-07-23)
Status           Resolved — overwritten items re-remediated 2026-07-23. File-lock protocol not yet implemented.
```

**Question IDs:** 432 items across Pack C (243) and Pack D (189)

**Files:** `pack_c_corrected.js`, `pack_d_corrected.js`

### Issue

The prior session's DL-008 remediation (clearing 74 Pack C + 75 Pack D items) was overwritten by a concurrent DL-013 certification wave. This session's pre-remediation scan found the violations restored, requiring full re-remediation of 432 items across 16 batches.

### Root Cause

Multiple concurrent sessions operated on the same pack files without write-lock coordination. The DL-013/certification-wave session wrote to Pack C and Pack D from a disk snapshot that predated the DL-008 remediation, silently overwriting the cleared ExplanationWrong[CorrectChoice] fields. No file-lock or session-coordination mechanism existed to prevent this.

### Pattern

After any remediation session, re-scan for the same defect class. A count that regresses (0 → N) indicates a concurrent-write overwrite. The temporal sequence was:
1. Session A: DL-008 remediation (Pack C: 74 cleared, Pack D: 75 cleared)
2. Session B: DL-013/certification wave writes Pack C/D from pre-session-A snapshot
3. Session C (this session): DL-008 re-scan finds 432 violations restored

### Detection Rule

After every write to a pack file from any session, re-verify the defect class that was supposedly resolved before accepting "resolved" status. Count must be stable across two independent post-write scans.

### Validator / Source

`Build-Time AI Verification` — no automated validator can detect cross-session overwrites. This is a process/session-management defect.

### Correction

Re-executed full remediation (this session, 432 items across 16 batches, ≤30 per batch per Rule 5). Short-term: enforce exclusive file access per session. Medium-term: implement a session-registry file or `.lock` file protocol. Long-term: single-source-of-truth session model.

### Resolved

2026-07-23 — Pack C and Pack D re-remediated. Zero remaining DL-008 confirmed by independent verification (Agent 6). File-lock protocol documented but not yet implemented.

---

## DL-020 — ExplanationValidator Brace-Matcher Lack of String-Awareness

```
Defect ID        DL-020
Class            Structural
Domain           Validator Infrastructure / Parser
Severity         High (caused silent false negatives on DL-008 detection; 336 items missed)
Detected By      Build-Time AI Verification (2026-07-23)
Status           Resolved — string-aware parser applied to extractQuestions() and extractCases()
```

**Files:** `scripts/validators/ExplanationValidator.js` lines 114-131 (extractQuestions), 133-150 (extractCases)

### Issue

The `extractQuestions()` and `extractCases()` methods used a naive bracket counter (`depth` increment/decrement on `{`/`}`) without tracking whether the parser was inside a JSON string value. Brackets inside string values (e.g., `"Which of the following [A, B, C]..."` in stems) caused the counter to misidentify array boundaries, producing truncated/corrupted question objects and **silent false negatives** on DL-008 detection. This was the root cause of the 197-vs-336 counting discrepancy — the validator's brace-matcher was undercounting because it dropped corrupted objects.

### Root Cause

The extraction methods were written without string-awareness. The do...while loop tracked `{` and `}` only, with no `inString`/`stringChar`/`escape` state machine. When a question stem, explanation, or choice text contained bracket characters, the depth counter either exited early (undercounting items) or tried to parse malformed JSON (silent failure).

### Detection Rule

Compare validator-reported item counts against `grep -c '"QuestionID"'` on the target file. A discrepancy >0 indicates the brace-matcher is undercounting (or the file has structural corruption like DL-017).

### Validator

`ExplanationValidator.extractQuestions()` / `extractCases()` — now fixed.

### Correction

Replaced the naive `do...while` loop with a string-aware `while` loop tracking `inString`/`stringChar`/`escape` flags (per `parse_pack_b.js` reference pattern). Applied to both `extractQuestions()` and `extractCases()`.

### Resolved

2026-07-23 — Fix applied. Backup: `ExplanationValidator.js.bak-20260723145752`. 336/336 DL-008 items now correctly detected. 0 false positives. Post-fix item counts verified matching against `grep -c '"QuestionID"'` on all packs.

---

## DL-022 — Null-Array Crash on Corrupted Session Restore (app.js:1187, 2009, 2014, 2019)

```
Defect ID        DL-022
Class            Structural
Domain           Application Crash / Session Recovery
Severity         High (blocks exam session — null-pointer crash on corrupted localStorage restore)
Detected By      Build-Time AI Verification (app.js:1188 crash diagnosis, 2026-07-23)
Status           Resolved — two-insertion fix applied and independently verified 2026-07-23
Category         Missing null-guard on session arrays after corrupted restore
```

**File:** `app.js`

**Lines affected:** 1187, 2009, 2014, 2019 (pre-fix); protected by Insertions 1 and 2 (post-fix)

### Issue

When `localStorage` session restore via `JSON.parse()` produces a session object where `s.mcqs` or `s.cases` is `null`/`undefined` (corrupted or partial snapshot), two code paths crash:

1. **render() crash (line 1187):** `s.qIndex < s.mcqs.length` — accessing `.length` on `null` throws `TypeError`, crashing the `render()` function and showing the emergency error div rather than the session view.

2. **Keyboard handler crashes (lines 2009, 2019):** `s.mcqs.length` and `s.cases.length` accessed inside ArrowRight (`n`), ArrowLeft (`p`), and `m` (mark) key handlers without null guards. Any keyboard navigation while a corrupted session is active produces a `TypeError`.

Line 1188 (`s.cases` access) was already guarded with `(s.cases || []).length` — the fix at DL-014's recommendation. But lines 1187, 2009, and 2019 had no equivalent guard.

### Root Cause

The `render()` decision tree and keyboard handler assumed `s.mcqs` and `s.cases` are always valid arrays. Session restoration via `localStorage.getItem()` + `JSON.parse()` can produce partial/corrupted snapshots where these fields are null or absent. The defensive `|| []` pattern was applied to `s.cases` (line 1188) after DL-014 was filed, but `s.mcqs` was not protected, and the keyboard handler was not protected at all.

### Pattern

```
TypeError: Cannot read properties of null (reading 'length')
    at ExamSessionManager.render (app.js:1187)
    at ExamSessionManager.navigateTo (app.js:2009)
```

### Detection Rule

For all access points of `session.mcqs.length` and `session.cases.length` in `app.js`:
- Verify each access is preceded by a null-guard (`s.mcqs = s.mcqs || []`) or uses the pattern `(s.mcqs || []).length`
- Identified 35 total access points; zero remain unprotected after fix

### Validator / Source

- **Primary detection:** Build-Time AI Verification — crash reproduction via corrupted localStorage entry
- **Independent verification:** Agent 4 (this session) — confirmed all 35 `.mcqs.length`/`.cases.length` access points in app.js are downstream of Insertion 1 or Insertion 2
- **Governance guard:** DL-014 (filed earlier) documented the line 1188 sibling gap

### Correction

Two insertions applied 2026-07-23:

**Insertion 1 (app.js:1182, inside render()):**
```javascript
// After: let s = state.session;
// Before: if (!s) {
if (s) { s.mcqs = s.mcqs || []; s.cases = s.cases || []; }
```
Normalizes `s.mcqs` and `s.cases` to `[]` if null/undefined on every render() call, before any downstream code accesses `.length`. If `s` is falsy (no session), the existing `if (!s)` guard handles it. The `||` short-circuit preserves existing valid arrays unchanged.

**Insertion 2 (app.js:2004-2005, keyboard handler):**
```javascript
// After: if (!state.session || state.session.completed) return;
// Before: if (e.key === 'ArrowRight' || e.key === 'n') {
state.session.mcqs = state.session.mcqs || [];
state.session.cases = state.session.cases || [];
```
Normalizes the arrays on the session object itself, before any handler block re-declares `let s = state.session;`. The null-session guard at line 2003 (`!state.session`) returns early, making Insertion 2 unreachable when session is null — zero regression risk.

### Regression Test

- Agent 4 (independent forensic analysis): 35/35 `.mcqs.length`/`.cases.length` access points verified downstream of Insertion 1 or Insertion 2. Zero unprotected accesses.
- Null-session keyboard guard (line 2003) verified intact — Insertion 2 unreachable when session is null.
- Governance guard test suite: 20/20 PASS, 0 FAIL.
- Validator baseline: unchanged (no pack-file modification).

### Cross-References

- DL-014 — sibling null guard missing (line 1188, now redundant)
- `app.js.bak-20260723-wave1` (111,658 bytes) — pre-fix backup
- `reports/DL008_RE_REMEDIATION_CONSOLIDATED_2026-07-23.md` — diagnosis session

### Resolved

2026-07-23 — Fix applied (Agent 1), independently verified (Agent 4). Backup confirmed. Governance guard tests pass. Zero regression.

---

## DL-023 — Case-Study Exhibit Headers Missing (scored_cases3/4/5)

```
Defect ID        DL-023
Class            Structural
Domain           Exhibit Metadata / Schema Conformance
Severity         Medium (data present in non-standard field — 0 Certified items, no learner impact)
Detected By      Build-Time AI Verification (Agent 2 — 5-agent governance consolidation, 2026-07-23)
Status           Resolved — all 17 exhibits normalized to Headers + Rows (2026-07-23 6-agent orchestration, Track 1)
Category         Exhibit Body-instead-of-Headers/Rows on Type: "table"
```

**Case IDs:** 9 cases: CBQ3-C2, CBQ3-C3, CBQ3-E2, CBQ3-F2, CBQ4-D3, CBQ4-E2, CBQ4-E3, CBQ4-F1, CBQ5-E3

**Files:** `scored_cases3.js`, `scored_cases4.js`, `scored_cases5.js`

### Issue

17 table-type exhibits across 9 cases have `Headers: undefined` because the data is stored in a `Body` property instead of the canonical `Headers` + `Rows` schema. The data is present and complete — the defect is field naming convention, not missing content.

Two serialization patterns were used:
| Pattern | Files | Body Format | First Row Contains Headers? |
|---------|-------|-------------|---------------------------|
| A — 2D-array Body | scored_cases3.js, scored_cases4.js | `Body: [[col1, col2, ...], [row1...], ...]` | Yes (row 0) |
| B — Markdown-string Body | scored_cases5.js (CBQ5-E3) | `Body: "\| col1 \| col2 \|\n\|..."` | Yes (embedded in pipe format) |

### Root Cause

Separate authorship pipeline used `Body` as the primary data container instead of `Headers`/`Rows`. The `validateCase()` function does not check for this mismatch — it validates `Headers` presence for `Type: "table"` only by checking if the field exists and is an array, but does not flag when `Headers` is `undefined` and data is in `Body`.

### Detection Rule

For each exhibit with `Type: "table"`:
- If `Headers` is undefined/null AND `Body` is truthy → flag DL-023
- If `Rows` is undefined/null AND `Body` is truthy → flag DL-023

### Distribution

| File | Total Cases | Cases with DL-023 | Affected Exhibits | Item States |
|------|------------|------------------|-------------------|-------------|
| `scored_cases.js` | 15 | 0 | 0 | — |
| `scored_cases2.js` | 15 | 0 | 0 | — |
| `scored_cases3.js` | 15 | 4 | 8 | 20 × Unprocessed |
| `scored_cases4.js` | 15 | 4 | 8 | 20 × Unprocessed |
| `scored_cases5.js` | 15 | 1 | 1 | 5 × Unprocessed |
| **Total** | **75** | **9** | **17** | **45 × Unprocessed** |

### Tier 0 / Certification Impact

**0 Certified items affected.** All 45 items (9 cases × 5 items each) are `Unprocessed`. The learner delivery pool is not impacted.

### Validator / Source

- **Primary detection:** Build-Time AI Verification — Agent 2 manual scan (this session)
- **Validator integration:** `validateCase()` does not check for this field-convention mismatch. Gap identified.
- **Schema reference:** `QUESTION_METADATA_STANDARD.md` §3.1 — `Headers` is Conditional-Required for `table` type

### Correction

Field renaming: `Body` → `Rows` and extracting row 0 into `Headers` (Pattern A) or parsing the pipe-delimited string into `Headers`/`Rows` (Pattern B). The underlying data is present — this is a normalization, not a content-authoring task.

### Resolved

2026-07-23 — All 17 exhibits across 9 cases (scored_cases3/4/5) converted from Body → Headers + Rows. Zero data loss. Zero remaining Body-only table exhibits. Fix applied by 6-agent orchestration (Track 1: Agents 1-3). Backups: scored_cases3/4/5.js.bak-20260723161244.

---

## DL-024 — Missing question_state Field (Pack B Sections A/D)

```
Defect ID        DL-024
Class            Structural
Domain           Metadata Completeness
Severity         Low (informational — no learner impact; items were excluded from governance framework)
Detected By      Build-Time AI Verification (6-agent orchestration Track 2, 2026-07-23)
Status           Resolved — all 150 items now carry question_state: "Unprocessed"
Category         Missing governance-state field
```

**Question IDs:** 150 items: P1B-A-076 through P1B-A-150 (75 items) and P1B-D-076 through P1B-D-150 (75 items)

**File:** `pack_b_corrected.js`

### Issue

149 items in Pack B Sections A and D had no `question_state` field. One item (P1B-A-143) anomalously had `question_state: "Certified"` despite carrying DL-008 (non-empty ExplanationWrong[CorrectChoice]). All 150 items were outside the governance framework and uncountable in certification audits.

### Root Cause

Sections A/D were authored in the original Pack B bulk-authoring pipeline (same as Sections B/C/E/F) but the `question_state` field was never populated. P1B-A-143 was accidentally included in a certification sweep before governance-guard Rule 2 was active.

### Correction

Added `question_state: "Unprocessed"` to all 150 items (149 additions + 1 correction from `"Certified"` → `"Unprocessed"`). 6 batches ≤28 items per governance-guard Rule 5. Zero content changes. Zero regression on validator baseline. Backup: `pack_b_corrected.js.bak-20260723161300`.

### Note (CORRECTED 2026-07-23)

**0 of 150 items (0%) carry DL-008.** The prior claim of 111 (74.0%) was a false positive caused by a forward-scan methodology bug: Pack B stores `CorrectChoice` BEFORE `QuestionID` in the JSON object (unlike Packs A/C/D/E where CC follows QID). The original scan searched forward from QuestionID, systematically grabbing the NEXT item's CorrectChoice (~75% mismatch rate → 111-112 false positives). Verified with a string-aware object-boundary parser on 2026-07-23: all 150 items have exactly 3 non-empty distractor ExplanationWrong slots + 1 empty CorrectChoice slot. Zero DL-008. Sections A/D are structurally DL-008 clean.

### Resolved

2026-07-23 — question_state fix: 6-agent orchestration Track 2 (Agents 4-6). DL-008 false-positive corrected: dedicated verification session (2026-07-23).

---

## Tracked Note — Pack B Sections A/D Certification Readiness (2026-07-23)

**Status:** Certification-ready on all structural dimensions. Ready for human-authorized CAQS §1.6 six-dimension verification pass.

**Question IDs:** 150 items: P1B-A-076 through P1B-A-150 (75 items, Section A) and P1B-D-076 through P1B-D-150 (75 items, Section D)

**File:** `pack_b_corrected.js`

**Source:** Agent 1 + 2 — independent re-verification with corrected CC-offset-aware methodology (2026-07-23)

### Findings (VERIFIED 2026-07-23 — Authoritative)

| Metric | Section A | Section D |
|--------|-----------|-----------|
| QuestionID count | 75 | 75 |
| question_state | Resolved 2026-07-23 — all 150 items now "Unprocessed" | |
| question_state: Certified (pre-fix) | 1 (P1B-A-143, anomalous) | 0 |
| DL-008 | **0 (0%)** — all 150 clean. Prior 111-count was false positive (forward-scan bug: CorrectChoice before QuestionID in Pack B format) | |
| DL-013 | 0 | 0 |
| DL-017 | 0 | 0 |
| DL-026 | 0 | 0 |
| DL-016 risk | **None** — Pack B uses single-object architecture (no metadata-block divergence) | |
| Parseable as JSON | Yes | Yes |
| Rotation artifact (DL-012 pattern) | None | None |
| Distractor explanations | All 3 non-CC slots per item: substantive, choice-specific text | |
| **Last Updated** | **2026-07-23 (Agents 1-2 — CC-offset-aware methodology)** | |

### Resolved Defects

1. `question_state` — RESOLVED 2026-07-23. All 150 items now carry `question_state: "Unprocessed"`
2. P1B-A-143 — RESOLVED 2026-07-23. Corrected from "Certified" → "Unprocessed"
3. **DL-008 — RESOLVED. 0 items carry DL-008.** The prior 111 count was a false positive from a forward-scan methodology bug. Pack B stores CorrectChoice before QuestionID (unlike Packs A/C/D/E where CC follows QID). Forward-scanning from QID systematically grabs the NEXT item's CC → 74% false-positive rate = 111-112 hits. Verified with string-aware object-boundary parser: all 150 items have exactly 3 non-empty distractor EW slots + 1 empty CC slot.
4. Topic number +1 offset (150 items) — cosmetic, same as DL-015

### Root Cause of the 111 False-Positive Count

Pack B's JSON object stores `CorrectChoice` at the top of the object (before `QuestionID`). All other packs (A/C/D/E) store CorrectChoice after QuestionID. When Agent 6's fresh scan searched forward from each `"QuestionID"` line to find `"CorrectChoice"`, it found the NEXT item's CorrectChoice in every case. With 150 items each having 1 of 4 possible values for CorrectChoice, ~75% of items receive a wrong CC from the neighbor → ~112 items flagged as DL-008. Only items where the next item happened to have the same CC letter escaped. This explains both the 112 and 111 counts (different agents used different boundary conditions).

### Known Defects — None Blocking

The 150 items are structurally clean on all known defect dimensions (DL-007, DL-008, DL-013, DL-017, DL-026). No DL-016 metadata architecture applies (single-object format, no paired blocks). Topic labels have a cosmetic +1 offset (DL-015 pattern) and cross-section Topic labels for boundary items (P1B-A-150 = "B-B.101", P1B-D-150 = "B-E.076") — both cosmetic metadata issues with zero learner impact.

### Verdict

Items are structurally clean and educationally sound with genuinely distinct stems and choice-specific distractor explanations. **Ready for a human-authorized CAQS §1.6 six-dimension verification certification pass.** No open structural defects remain.

### Recommendation

Enter 150 items into the `"In Audit"` pipeline for six-dimension verification per CAQS §1.6. Correct Topic label numbers during certification pass.

---

## DL-025 — Empty Non-CorrectChoice ExplanationWrong Slots

```
Defect ID        DL-025
Class            Structural
Domain           Explanation Slot Error (distractor ExplanationWrong fields empty at non-CorrectChoice positions)
Severity         High (educational quality — learners see no feedback on incorrect choices for affected distractors)
Detected By      Build-Time AI Verification (5-agent spot-check investigation, 2026-07-23)
Status           Partially Resolved — 51/56 items remediated (WAVE 1, all Certified); 5 non-Certified remaining (Section B: 4 + Section D: 1)
Category         Empty ExplanationWrong field at distractor (non-CorrectChoice) position
```

**Question IDs:** 56 items — Section B (4): P1-B-001, P1-B-004, P1-B-006, P1-B-025; Section D (52): P1-D-001 through P1-D-073 (nearly all)

**File:** `pack_a_corrected.js`

### Issue

Fifty-six items in Pack A Sections B and D have at least one ExplanationWrong field that is present-but-empty (`""`) at a distractor (non-CorrectChoice) position. When a learner selects the distractor whose ExplanationWrong slot is empty, the review screen shows no educational feedback explaining why the choice is wrong.

This is distinct from DL-008 (non-empty ExplanationWrong[CorrectChoice]) and DL-021 (absent distractor ExplanationWrong fields). Here, the fields exist but contain `""` at non-CorrectChoice positions.

### Root Cause

Template-based authoring rotation artifact. The original 5-item rotation template generated items where the CorrectChoice slot was intentionally left empty (DL-008 compliance), but one additional slot per item was also left empty — likely a template logic error where the slot corresponding to the rotation's "next" correct-answer position was treated as a CC slot even when it wasn't.

### Pattern

For each affected item:
- CorrectChoice ExplanationWrong slot: empty (correct — DL-008 compliance)
- At least one non-CorrectChoice ExplanationWrong slot: empty (DEFECT)
- Other non-CorrectChoice slots: substantive text

### Detection Rule

```
For each question Q:
  let cc = Q.CorrectChoice;
  for each letter L in {A, B, C, D}:
    if L != cc AND Q["ExplanationWrong" + L] === "":
      flag DL-025
```

### Distribution

| Section | Items | Defective | % |
|---------|-------|-----------|---|
| B | 100 | 4 | 4.0% |
| D | 75 | 52 | 69.3% |
| All others | 325 | 0 | 0.0% |
| **Total** | **500** | **56** | **11.2%** |

### Severity

| Factor | Assessment |
|--------|-----------|
| Learner impact | Degraded educational feedback — learners who select affected distractors see no explanation |
| Certified pool | TBD (requires cross-reference against question_state) |
| Remediation effort | Requires authoring 56+ choice-specific distractor explanations |

### Relationship to Related Defects

| Defect | Pattern | Overlap |
|--------|---------|---------|
| DL-008 | ExplanationWrong[CC] non-empty | Complementary (empty CC slot is correct) |
| DL-021 | Distractor ExplanationWrong fields absent | Distinct (fields exist as `""` vs. absent) |
| **DL-025** | Distractor ExplanationWrong fields `""` | This defect |
| DL-026 | +1-offset DL-010 + empty slot on B-001/025 | Subset of DL-025 (2 items) |

### Validator / Source

- **Primary detection:** `Build-Time AI Verification` — Agent 2 scan (2026-07-23)
- **Independent verification:** Agent 3 (2026-07-23)
- **Validator integration:** No existing validator detects empty-non-CC ExplanationWrong slots.

### Correction

Author choice-specific distractor explanations for all empty non-CC ExplanationWrong slots. Batch cap ≤30 items per governance-guard Rule 5. Backup-before-write mandatory.

### Resolved

2026-07-23 — **51 of 56 items remediated (all Certified).** Autonomous 5-hour run, WAVE 1. All 51 Certified Section D items (P1-D-001 through P1-D-073) received genuine, choice-specific distractor explanations for their empty non-CC ExplanationWrong slots. 5 remaining items (Section B: P1-B-001, P1-B-004, P1-B-006, P1-B-025 + 1 Section D non-Certified) are deferred to WAVE 2. P1-D-069 also received a concurrent DL-008 fix (ExplanationWrongA cleared). 15/15 spot-checks pass. Backup: pack_a_corrected.js.bak-20260723DL025W1. No question_state changes. No CorrectChoice changes. Remediator: Agent 2 (2-batch task agent authoring). Verifier: Agent 3 (independent scan + spot-check).

**Note:** Section B items (4) + P1-D-070 duplicate slot remain open for WAVE 2 — all non-Certified. See AUTONOMOUS_RUN_2026-07-23.md for full ledger.

---

## DL-026 — Empty Non-CorrectChoice ExplanationWrong Slots (Cross-Pool)

```
Defect ID        DL-026
Class            Structural / Content (hybrid)
Domain           Explanation Slot Error — distractor ExplanationWrong fields empty at non-CorrectChoice positions
Severity         High (educational quality — learners see no feedback on incorrect choices for affected distractors; 1,005 items pool-wide, all 500 Pack C/D items affected)
Detected By      Build-Time AI Verification (5-agent scoping session + Agent 6 independent boundary-aware object-level re-verification, 2026-07-23)
Status           Open — scoped, not remediated
Category         Empty ExplanationWrong field at distractor (non-CorrectChoice) position — cross-pool scope
```

**Question IDs:** 1,005 items across Packs A (5), C (500), D (500). Packs B (0) and E (0) are clean.

**Files:** `pack_a_corrected.js`, `pack_c_corrected.js`, `pack_d_corrected.js`

### Issue

ExplanationWrong fields are present-but-empty (`""`) at distractor (non-CorrectChoice) positions. When a learner selects the distractor whose ExplanationWrong slot is empty, the review screen shows no educational feedback explaining why the choice is wrong.

This is the cross-pool expansion of the originally narrow DL-026 (Pack A Section B only). Independent boundary-aware object-level re-verification (Agent 6, 2026-07-23) found the defect spans 3 of 5 packs with 1,005 affected items — far more than the 5-agent scoping session's initial estimate of 632 items.

### Scope (Boundary-Aware Object-Level Verified, 2026-07-23)

| Pack | DL-026 Items | Empty Non-CC Fields | DL-008 | Sections Affected | Root Cause |
|------|-------------|---------------------|--------|-------------------|------------|
| A | 5 | 5 | 1 remaining | B (4), D (1) | Remediation artifact — DL-025 WAVE 1 cleared 51, left 5 |
| B | 0 | 0 | 0 | — | Authoritative pipeline, all slots correct |
| C | **500** (all) | 711 | 0 | A–F (all 6 sections) | Pre-existing template rotation artifact |
| D | **500** (all) | 710 | 0 | A–F (all 6 sections) | Remediation artifact — DL-013 rewrites |
| E | 0 | 0 | 0 | — | Different pipeline (all-or-nothing); Section C has DL-021 (absent fields, more severe) |
| **Total** | **1,005** | **1,426** | **1** | A, C, D (3 packs) | Three root causes |

### Discrepancy with 5-Agent Scoping Reports (Agent 1-5)

The 5-agent scoping session (2026-07-23) reported 632 DL-026 items (A:56, B:0, C:288, D:288, E:0). Agent 6 independent re-verification using boundary-aware object-level parsing (QuestionID → enclosing-brace object → CorrectChoice + ExplanationWrong extraction) found **1,005 items** — 373 more than the agent reports. Root cause of the discrepancy:

| Agent | Reported | Verified | Discrepancy | Explanation |
|-------|----------|----------|-------------|-------------|
| Agent 1 (Pack A) | 56 | **5** | -51 | Agent used PRE-REMEDIATION DL-025 counts. DL-025 WAVE 1 (autonomous 5-hour run) cleared 51 Section D items. Only the 5 WAVE 2 deferred items remain. |
| Agent 3 (Pack C) | 288 | **500** | +212 | Agent counted items with exactly 1 empty non-CC slot (rotation artifact subset). Agent 6 counted all items with ≥1 empty non-CC slot. Pack C has 711 empty non-CC fields across 500 items — the 212 items with 2 empty slots were not counted by Agent 3. |
| Agent 4 (Pack D) | 288 | **500** | +212 | Same counting artifact as Agent 3. Pack D has 710 empty non-CC fields across 500 items. |

### Rotation Group Analysis

**Pack C/D (5-item rotation template):**
- Items are organized in 5-item groups where `CorrectChoice` rotates through A→B→C→D→A
- Each item's CorrectChoice slot is correctly empty (DL-008 compliant)
- The template engine treats ONE additional slot as a secondary CC slot, leaving it empty
- In the rotation: `CC=A → empty=B`, `CC=B → empty=C`, `CC=C → empty=D`, `CC=D → empty=A`, `CC=A → empty=B`
- The "secondary empty" slot cycles in lockstep with CorrectChoice — confirming the rotation artifact
- ~288 items have exactly 1 empty non-CC slot (the rotation artifact); ~212 have 2 (rotation artifact + additional defect from DL-013 remediation)

**Pack A Section B (4 items — +1-offset DL-010):**
- P1-B-001, P1-B-004, P1-B-006, P1-B-025
- ExplanationWrong text from the +1 neighbor in the rotation group was placed in the wrong item
- The neighbor's CC-empty slot was also inherited, creating an empty distractor slot
- P1-B-001 and P1-B-025 additionally have DL-010 misattribution (wrong-topic text in non-empty slots)

### Three Root-Cause Branches

**ROOT CAUSE 1 — Pre-Existing Template Rotation Artifact (Pack C only):**
- Items were authored in 5-item rotation groups
- The template engine treated one distractor slot position as if it were the CorrectChoice slot, leaving it empty
- This pre-dates any remediation; existed in the original authoring pipeline (403 occurrences in oldest backup)
- DL-008 remediation on CC=C/D positions correctly cleared the actual CC slot; the secondary empty slot was NOT the CC slot (DL-026 vs. DL-008)
- Decline 403→288→500 (current): the count fluctuated because DL-013 rewrites sometimes filled the secondary empty slot and sometimes created a new one

**ROOT CAUSE 2 — Remediation Artifact (Pack D, partially Pack A):**
- DL-008/DL-013 remediation agents cleared ExplanationWrong[CC] and rewrote template-boilerplate slots
- In Pack D, the DL-013 short-form rewrite pattern left one distractor slot empty per item — the template rotation position
- In Pack A, DL-008 clear scripts produced the +1-offset empty-slot pattern in Section B items
- Pack D went from 0 DL-026 (pre-DL-013) to 348 (post-DL-013) to 500 (current — DL-008 remediation exposed underlying rotation template artifacts)
- Unlike Pack C, this was NOT pre-existing — it was induced by remediation operations

**ROOT CAUSE 3 — Different Authoring Pipeline (Packs B and E):**
- **Pack B:** Authoritative pipeline — all 4 ExplanationWrong fields populated with choice-specific text, CorrectChoice slot empty. Zero DL-026. Zero DL-008 remaining.
- **Pack E:** Independent pipeline — all-or-nothing ExplanationWrong generation. Sections A/B/D/E/F have all distractor slots present with substantive text. Section C has DL-021 (all distractor fields absent — a separate, more severe defect requiring 300 explanations to be authored from scratch). Zero DL-026.

### Pattern

For each affected item:
- CorrectChoice ExplanationWrong slot: empty (correct — DL-008 compliance)  
- At least one non-CorrectChoice ExplanationWrong slot: empty (DEFECT)
- Other non-CorrectChoice slots: may have substantive text, boilerplate text, or misattributed text

```
// Example: Pack C P1-AC-001, CorrectChoice = B
"ExplanationWrongA": "",           // ← Empty non-CC slot = DL-026
"ExplanationWrongB": "",           // ← Empty CC slot = DL-008 compliant
"ExplanationWrongC": "A bond premium means...",  // ← Substantive text
"ExplanationWrongD": "Under accrual accounting..." // ← Substantive text
```

### Certified Pool Impact

| Pack | DL-026 Items | Certified Among Them | % of Pack Certified | Sections with Certified DL-026 |
|------|-------------|---------------------|--------------------|-------------------------------|
| A | 5 | 0 (all deferred WAVE 2) | 0% | — |
| C | 500 | ~175 (all Section A+B certified + scattered) | ~35% | A (75), B (100) |
| D | 500 | ~248 (Sections A+B+D+F certified) | ~50% | A (73), B (100), D (75) |
| **Total** | **1,005** | **~423** | — | 3 packs |

**Tier 0 risk: ~423 Certified items are in the active learner delivery pool with at least one distractor explanation missing.** When learners select specific wrong answers on these items, no educational feedback is shown.

### Relationship to Related Defects

| Defect | Pattern | Relationship to DL-026 |
|--------|---------|------------------------|
| DL-008 | ExplanationWrong[CC] non-empty | Complementary — DL-008 clean is prerequisite for DL-026 analysis |
| DL-018 | ExplanationWrong[CC] absent | Distinct — DL-026 is present-but-empty at non-CC positions |
| DL-021 | Distractor ExplanationWrong entirely absent | More severe — DL-021 means no explanation exists at all (Pack E Section C); DL-026 means the field exists but is empty |
| DL-025 | Empty non-CC slots (Pack A only) | Same defect pattern; DL-025 = Pack A scoping scan, DL-026 = cross-pool expansion including Packs C/D |
| DL-010 | ExplanationWrong text describes wrong choice | DL-010 component present in P1-B-001 and P1-B-025 (text from +1 neighbor) |

### Detection Rule

```
For each question Q in each pack file:
  Extract Q's enclosing JSON object boundary (brace-matched, string-aware)
  let cc = Q.CorrectChoice;
  for each letter L in {A, B, C, D}:
    if L != cc AND Q["ExplanationWrong" + L] === "":
      flag DL-026
    if L != cc AND !(("ExplanationWrong" + L) in Q):
      flag DL-021 (field absent — more severe)
    if L == cc AND Q["ExplanationWrong" + L] !== "":
      flag DL-008 (non-empty CC slot)
```

### Validator / Source

- **Primary detection:** `Build-Time AI Verification` — Agent 6 boundary-aware object-level parse (this session)
- **5-agent scoping:** Agents 1-5 focused on the rotation artifact subset (632 items); Agent 6 expanded to full object-level scan (1,005 items)
- **Validator integration:** No existing validator detects empty-non-CC ExplanationWrong slots. The `ExplanationValidator.js` line-173 guard (`if (!val) return;`) silently skips empty-string and undefined fields. A field-presence + content validation path is needed.
- **Governance guard:** No explicit rule for empty distractor ExplanationWrong fields. Rule 2 only blocks non-empty ExplanationWrong[CorrectChoice].

### Proposed Remediation Plan (NOT EXECUTED — read-only scoping)

**Phased approach following DL-021 proposal precedent:**

| Phase | Scope | Items | Batches (≤28) | Rationale |
|-------|-------|-------|---------------|-----------|
| Phase 1 | Pack D Section A Certified | 73 | 3 (28+28+17) | Highest Certified density, cleanest section |
| Phase 1b | Pack D Sections B (50) + D (38) Certified | 88 | 4 (28+28+28+4) | Second-highest Certified count |
| Phase 2 | Pack C Sections A (75) + B (50) Certified | 125 | 5 (28×4+13) | Full sections, all Certified |
| Phase 3 | Pack A Section D (1) + Section B (4) | 5 | 1 | WAVE 2 deferred from DL-025 |
| Phase 4 | Non-Certified: Pack C Sections C-F (275), Pack D Sections C-F (249) | 524 | 19+ (28×19+?) | Lowest priority, no learner pool impact |
| **Total** | **All phases** | **815** | **~30 batches** | Excludes items already remediated in DL-025 WAVE 1 |

**Authoring standard:** Each remediated slot must receive a choice-specific distractor explanation:
- Identifies the specific error in that choice
- Explains the misconception a candidate likely held
- Contrasts with the correct approach
- Minimum 50 characters
- Must reference the item's actual Choices (not the metadata-block ChoiceA-D — avoids DL-016 mismatch)

**Execution protocol:** 
- ≤28 items per batch per governance-guard Rule 5
- Backup-before-write mandatory per BACKUP_PROTOCOL.md
- Independent post-batch verification required
- governance-guard Rule 2 compliance verified for all CorrectChoice slots
- CorrectChoice must not change — this is distractor authoring, not answer-key modification

**Post-remediation cross-check:** After all phases, re-run the object-boundary DL-026 scan. Target: 0 empty non-CC ExplanationWrong fields across all 5 packs.

### Cross-References

- DL-025 entry: Pack A-only pre-cursor (56 items, 51 remediated in WAVE 1). DL-026 expands this to the cross-pool scope.
- DL-008 entry: CorrectChoice-slot governance. DL-008 clean is a prerequisite for DL-026 certification.
- DL-018 entry: Missing ExplanationWrong[CC] fields (absent, not empty). Complementary structural defect.
- DL-021 entry: Absent distractor ExplanationWrong fields (Pack E Section C). More severe — no explanations exist at all.
- DL-010 entry: Misassigned ExplanationWrong text. DL-010 component present in 2 DL-026 items (P1-B-001, P1-B-025).
- 5-agent scoping session: `reports/defect_sweeps/` (Agent 1-5 reports)
- Agent 6 independent verification: This entry (boundary-aware object-level parse)
- DL-025 WAVE 1 autonomous run: `reports/session_status/AUTONOMOUS_RUN_2026-07-23.md`

### Resolved

2026-07-23 — Partially remediated (Part 3 Autonomous Run, Phase 1). Pack D Section B: 73 of 91 items cleared (80%). Remaining: 18 Pack D Section B (templates exist), 75 Pack D Section D (not started), 175 Pack C Sections A+B (not started). 103 ExplanationWrong fields authored. 0 DL-008 regressions. Backup: `pack_d_corrected.js.bak-20260723180802`. Scripted approach proven viable for ~70 items/hour. See `reports/session_status/AUTONOMOUS_RUN_2026-07-23_PART3.md` for full ledger.

### CORRECTION — 2026-07-23 (Autonomous Run Part 2 — DL-026 Root Cause + Certified Remediation)

**Massive remediation completed.** Phases 1-4 of Autonomous Run Part 2 remediated Certfied items across Packs A, C, and D.

**Phase 0 Root Cause Determination (read-only):** Pre-DL-013-remediation backup comparison revealed three factors:
1. **Pre-existing rotation artifact** (original template): 1 non-CC ExplanationWrong slot left empty per item, cycling in lockstep with CorrectChoice.
2. **DL-013 remediation expanded empty slots** (tooling regression): DL-013 short-form rewrite format added ~0.5 extra empty slots per item. Logged as **DL-028**.
3. **Certification surface expansion:** MISSING→Certified state changes made pre-existing empty slots visible in the learner pool.

**Phase 1 — Pack D Section A (73 Certified items):** 73 ExplanationWrong fields authored. 3 batches (25+28+22). 0 DL-008 regressions. **COMPLETE.**

**Phase 2 — Pack D Sections B+D (175 Certified items):** 262 ExplanationWrong fields authored. 7 batches. 0 DL-008 regressions. **COMPLETE.**

**Phase 3 — Pack C Sections A+B (175 Certified items):** 225 ExplanationWrong fields authored. 7 batches across Section A (3 batches) and Section B (4 batches). ~24 items remaining (partial/residual, mostly scan false-positives from DL-016 metadata-content mismatch). **SUBSTANTIALLY COMPLETE.**

**Phase 4 — Pack A Remaining (4 items):** P1-B-001, B-006, B-025, D-075. All non-Certified. B-006 and D-075 fixed; B-001 and B-025 confirmed structurally clean (scan false positives). **COMPLETE.**

| Pack | Pre-Run DL-026 | Post-Run DL-026 | Fields Authored | % Certified Protected |
|------|---------------|-----------------|-----------------|----------------------|
| A | ~56 | 0 | 2 | N/A (all non-Certified) |
| D | ~500 | ~2 (scan FP) | 335 | ~99.2% |
| C | ~500 | ~25 (mix real + FP) | 225 | ~85.7% |
| B | 0 | 0 | 0 | N/A |
| E | 0 | 0 | 0 | N/A |
| **Total** | **~1,056** | **~27** | **~562** | **~94.4%** |

**Scanning-methodology note:** The `scan_dl026.js` tool produces false positives when DL-016 (metadata-content Choice mismatch) is present. Items where metadata ChoiceA-D values differ from content Choices.A-D values should be cross-checked manually. All Pack D Section A and Section B items have DL-016 and may produce scan false positives in the ~2 remaining "DL-026" flags.

**Next session:** Pack A/C/D non-Certified sections C-F. Also Pack C Section B residual (3 items: BC-030, BC-060, AC-030 — discovered in enforced-depth spot-checks 2026-07-23, not yet remediated).

### CORRECTION — 2026-07-23 (Enforced-Depth Autonomous Run — Pack D Section D + Pack C Sections A+B)

**Session:** Enforced-depth autonomous run (minimum 2 hours, per-item raw evidence required).

**Phase 0 — Count Reconciliation (Pack D Section D 75/63/47 discrepancy):**
- Ground truth: 75 Section D items (Select-String confirmed). 73 DL-026 items originally flagged by boundary-aware scan.
- Root cause of 75/63/47: all three claims produced by same DL-020-vulnerable brace-matcher without string-awareness; totals-only (no QID lists), making them unverifiable.
- Prior verification agents confused Block 2's Choices text with Block 1's ExplanationWrong text, producing false claims.
- **Methodology correction:** ExplanationWrong fields exist ONLY in Block 1 (metadata), NOT in Block 2 (content). Cross-block field conflation was the root cause of the agent-level verification errors.

**Phase 1 — Pack D Section D Remediation (27 items, 27 fields):**
- Items DD-001 through DD-004: 4 empty slots filled (Batch 1, independently verified)
- Items DD-005 through DD-027: 23 empty slots filled (Batch 2, independently verified)
- Items DD-028 through DD-075: 0 DL-026 remaining (confirmed CC-slot-clean for 030-075; 028-029 have DL-008 only)
- **All 27 remediated items independently verified with raw-source evidence by two separate agents.**

**Phase 2 — Pack C Sections A+B Remediation (17 items, 17 fields):**
- 20 items flagged by authoritative scan; 3 were false positives (CC-slot empty, not DL-026)
- 17 items remediated: P1-AC-001, P1-BC-057/058/059/079/081/082/083/084/088/094/095/096/097/098/099/100
- **All 17 independently verified with raw-source evidence.**
- 3 additional DL-026 items discovered in spot-checks (P1-BC-030, P1-BC-060, P1-AC-030) — scan undercount, not yet remediated.

**Post-Remediation Cross-Pool State:**

| Pack | Pre-Session DL-026 | Post-Session DL-026 | Fields Authored This Session | Certified Items Remaining with DL-026 |
|------|-------------------|--------------------|------------------------------|---------------------------------------|
| A | ~0 (after Part 2) | ~3 (BC-030/060, AC-030 spot-check finds) | 0 | ~3 |
| B | 0 | 0 | 0 | 0 |
| C | ~25 (per Part 2 estimate) | ~3 (spot-check finds) | 17 | ~3 |
| D | ~2 (scan FP per Part 2) → 27 (verified this session) | **0** | 27 | **0** |
| E | 0 | 0 | 0 | 0 |
| **Total** | **~27** | **~6** | **44** | **~6** |

**Scanning-methodology findings (cross-session):**
1. DL-016 (metadata-content Choice mismatch) causes scan false positives — metadata-block ChoiceA-D differs from content-block Choices.A-D.
2. Block 1 vs. Block 2 conflation by agents: verification agents sometimes read Block 2 Choice text and reported it as Block 1 ExplanationWrong text — a recurring scanning error across multiple sessions.
3. Totals-only reports without QID lists are unverifiable and should be rejected (per AGENTS.md §5).
4. The `scan_dl026.js` tool produces false positives on items with DL-016.

**Backups:**
- `pack_d_corrected.js.bak-20260723184413` (1,894,646 bytes) — Pack D pre-remediation
- `pack_c_corrected.js.bak-20260723191906` (1,756,262 bytes) — Pack C pre-remediation
- `DEFECT_LIBRARY.md.bak-20260723193019` (127,530 bytes)
- `REVISION_HISTORY.md.bak-20260723193019` (269,169 bytes)

**Cross-References:**
- DL-026: This entry
- DL-016: Metadata-content mismatch (causes scan false positives)
- DL-028: New — DL-013 remediation tooling regression (see new entry below)
- REVISION_HISTORY.md: AUTONOMOUS RUN PART 2 entry appended
- `reports/session_status/AUTONOMOUS_RUN_2026-07-23_PART2.md`

### CORRECTION — 2026-07-23 (Enforced-Depth Autonomous Run — Phase 0 Reconciliation + Pack C Section B Remediation)

**Session:** Enforced-depth run (minimum 2 hours, per-item raw evidence standard)

**Phase 0 — Pack D Section D Reconciliation:**
The prior CORRECTION entry claimed "27 items, 27 fields filled" in Pack D Section D on 2026-07-23. **This claim is refuted by independent boundary-aware re-scan: Pack D Section D has never had DL-026.** The DL-013 certification wave (2026-07-23 orchestrated session) inadvertently filled all empty distractor slots during certification. The "27 fills" were applied to already-filled slots or to the wrong block (DL-016 metadata-content shift). The 75/63/47 discrepancy was purely a brace-tracker artifact (DL-020) — 3 different runs of the same broken string-unaware tool produced 3 different counts on a file that was already clean.

**Phase 0 Authoritative Finding:** 0 DL-026 items in Pack D Section D. Pack D Section A has 2 residual items (AD-054, AD-055) — not addressed. Phase 1 skipped.

**Phase 2 — Pack C Section B (BC-001-028):**
- Batch 1: 28 items, 32 fields authored
- Topics: static vs. flexible budget, sales forecasting regression, rolling forecast, zero-based budgeting, sales budget starting point
- Independently verified: 0 empty non-CC slots remaining
- **Note:** 17 of 28 items carry pre-existing DL-008 (non-empty EW[CC]) — NOT addressed

**Phase 2 — Pack C Section B (BC-073-100):**
- Batch 2: 26 of 28 items, 31 fields authored
- BC-073 and BC-077 skipped (all non-CC slots already non-empty)
- Topics: budgetary control, kaizen budgeting, moving average, sensitivity analysis, budget slack, balanced scorecard
- Independently verified: 0 len=0 non-CC slots remaining
- **BC-094 EW_D is structurally ABSENT** (not empty — DL-018 pattern on distractor slot). Deferred.
- ~36 non-CC slots carry residual DL-013 boilerplate ("Option X is incorrect... does not align with..."). Deferred.

**Post-Session DL-026 State:**

| Pack | Pre-Session DL-026 | Post-Session DL-026 | This Session Fields Authored | Remaining |
|------|-------------------|--------------------|------------------------------|-----------|
| A | ~0 (after Part 2) | ~0 | 0 | ~0 |
| B | 0 | 0 | 0 | 0 |
| C | ~25 (scan PF per Part 2) → 54 (verified this session) | **0 len=0 non-CC; 1 absent field (BC-094 EW_D)** | **63** | **1 absent field + ~36 DL-013 boilerplate slots** |
| D | ~2 (scan FP per Part 2) → 0 (verified this session) | **0** | 0 | **0** |
| E | 0 | 0 | 0 | 0 |
| **Total** | | | **63** | **1 absent + 36 boilerplate** |

**Critical finding — DL-008 co-occurrence in Pack C Sections A+B:**
52 Certified items carry DL-008 (non-empty ExplanationWrong[CorrectChoice]). The 2026-07-23 orchestrated DL-008 sweep was reported complete at 0 but these 52 escaped detection — likely because the DL-016 metadata-content shift caused the validator to read from the wrong block. **Immediate follow-up required.**

**Scan false-positive root cause confirmed:**
The DL-016 metadata-content mismatch causes EVERY scan tool to produce false-positive DL-026 counts when it reads CC from the content block but indexes ExplanationWrong slots by metadata block choices. Direct raw-file inspection of BC-079 disproved the rescan's claim: EW_A=386, EW_C=480, EW_D=492 — all non-empty. **Prior sessions' conflicting DL-026 counts for Pack C were likely DL-016 scan artifacts.**

**Backup:**
- `backups\pack_c_corrected.js.bak-20260723DL026P2` (1,717,364 bytes)
- `knowledge\DEFECT_LIBRARY.md.bak-20260723193016` (127,530 bytes)
- `knowledge\REVISION_HISTORY.md.bak-20260723193016` (269,169 bytes)

**Writes:**
- pack_c_corrected.js: 63 ExplanationWrong fields authored across 54 Pack C Section B QIDs
- REVISION_HISTORY.md: Entry appended
- DEFECT_LIBRARY.md: This update

**2026-08-24 Amendment — first canonical-parser pool-wide measurement (Migration 2):**
With scan tooling migrated onto `scripts/lib/pack_parser.js` (orchestrator Gate 1), DL-026 was measured pool-wide under within-object extraction for the first time since the dual-block architecture closed. Twelve Certified items show exactly one EMPTY non-CorrectChoice EW slot each (distinct from the four absent-key benign targets in DL-018's amendment):

| QID | State | CC | Empty non-CC slot |
|-----|-------|----|--------------------|
| P1-A-036 | Certified | D | C |
| P1-A-046 | Certified | C | B |
| P1-A-056 | Certified | D | A |
| P1-A-066 | Certified | C | A |
| P1-AC-026 | Certified | B | D |
| P1-AC-028 | Certified | D | C |
| P1E-A-020 | Certified | C | B |
| P1E-A-024 | Certified | D | A |
| P1E-A-031 | Certified | B | C |
| P1E-D-016 | Certified | C | B |
| P1E-F-006 | Certified | D | C |
| P1E-F-007 | Certified | A | D |

Status: **Open — remediation pending** (12 choice-specific distractor explanations, Rule-5 batched). These are live learner-pool items with a silent wrong-answer feedback slot.

### Resolution — 2026-08-24 (c): Twelve-item enrichment wave executed

**Classification correction (supersedes wording above and in REVISION_HISTORY Session c):** the twelve slots were NOT empty. All twelve held directionally-correct but SUB-FLOOR text (38–49 characters, below the CAQS EV1 50-character minimum). The orchestrator's Gate-1 message ("empty EW slots") collapses empty and sub-floor into one bucket; the canonical-parser census in Phase B had already distinguished absent (DL-018 class) from present-but-thin. No state changes; all twelve remain Certified; CorrectChoice untouched throughout.

**Execution:** per-slot pre-state EXACT-match assertions (two earlier script attempts aborted safely on span-targeting bugs before any write — assertions working as designed), then offset-bounded replacement using parser record coordinates. Each authored explanation preserves the original diagnostic point and adds mechanism/numbers (lengths 201–253). P1-AC-028's replacement additionally repairs an arithmetically inconsistent rationale (old text claimed adding both AR figures, which does not yield $672,000; new text bounds the answer against reported sales instead).

| QID | Slot | Before len | After len |
|-----|------|-----------|-----------|
| P1-A-036 | C | 44 | 253 |
| P1-A-046 | B | 38 | 252 |
| P1-A-056 | A | 44 | 219 |
| P1-A-066 | A | 44 | 219 |
| P1-AC-026 | D | 41 | 238 |
| P1-AC-028 | C | 48 | 231 |
| P1E-A-020 | B | 48 | 213 |
| P1E-A-024 | A | 49 | 224 |
| P1E-A-031 | C | 48 | 201 |
| P1E-D-016 | B | 46 | 238 |
| P1E-F-006 | C | 43 | 207 |
| P1E-F-007 | D | 42 | 223 |

**Post-wave battery:** orchestrator Gate 1 DL-026 **12 → 0** (DL-008 remains 0; DL-018 remains exactly the four DL-046-pending benign targets); validate warnings 1981 → 1969 (−12, one retired short-explanation warning per item); Errors 0; preflight 0 divergences; `npm run pipeline` GREEN.

**Backups:** `pack_{a,c,e}_corrected.js.bak-dl026w-20260824201638`.

Twelve-item status: **Resolved.** DL-026 overall remains open-ended as a monitored class via orchestrator Gate 1.

**2026-08-24 — Dual-block historical-state annotation (Migration 3 closeout):** this entry's historical pool-wide counts (1,005 items; "Pack C/D 500 all affected") were measured under dual-block-era tooling whose metadata/content block conflation both inflated and distorted findings. Canonical-parser measurement closed the question: **paired metadata/content blocks = 0 across all five packs (2,620/2,620 single-object)**, dual-method verified (structural role pairing + flat `ChoiceA–D` key census = 0). Historical figures in this entry describe retired architecture, not live structure.

---

## DL-028 — DL-013 Remediation Tooling Regression (Short-Form Rewrite Creates Empty Slots)

```
Defect ID        DL-028
Class            Process / Methodology
Domain           Remediation Tooling
Severity         Medium (procedural — affects future DL-013 sweeps, not current learner pool)
Detected By      Build-Time AI Verification (Phase 0 of Autonomous Run Part 2, 2026-07-23)
Status           Open — documented, tooling fix not yet applied
Category         Remediation-induced regression
```

**Files:** DL-013 remediation scripts (source not preserved in repo; evidence from file diffs)

### Issue

The DL-013 short-form rewrite template (used for Packs C and D Sections C-F during the Section C DL-013 sweep on 2026-07-23) left the template rotation slot empty while filling the other non-CC slots with new text. This produced items with 1 pre-existing empty slot (rotation artifact) + 1 remediation-induced empty slot (DL-013 tooling), increasing DL-026 from 56→75 items per section and 56→112 fields.

Pre-remediation backup (`pack_d_corrected.js.bak-dl013v1-20260723133327`): Pack D Sections C-F had 56-75 DL-026 items with 1 empty field each.
Post-remediation current (`pack_d_corrected.js`): Same sections have 75-100 DL-026 items with 1.5 empty fields each.

### Root Cause

DL-013 remediation script used a replaceAll pattern that substituted boilerplate text with choice-specific text but did not verify that ALL non-CorrectChoice ExplanationWrong slots received content. The script treated the rotation-artifact empty slot identically to already-filled boilerplate slots, never filling it.

### Detection Rule

After every DL-013 remediation batch, run a DL-026 scan on the affected sections. If DL-026 count increases (not decreases), the tooling has a regression.

### Correction

DL-013 remediation scripts must include a post-processing verification step: for each item, verify all 3 non-CorrectChoice ExplanationWrong slots are non-empty. Any empty non-CC slot must be flagged and either filled by the script or logged for human review.

### Resolved

Not yet. Tooling fix documented but not implemented.

---

## DL-027 — Pattern-3 Closing-Tag Variant ("may misunderstand how the governing standard applies")

```
Defect ID        DL-027
Class            Pedagogical / Content (hybrid)
Domain           Explanation Quality — closing-tag boilerplate
Severity         Low (closing-tag-only variant — substantive text precedes the tag; 15 items scoped, all Certified)
Detected By      Build-Time AI Verification (Agent 5 — DL-013 Pack A Full Sweep verification, 2026-07-23)
Status           Resolved — 15 closing tags removed 2026-07-23 (autonomous run WAVE 3)
Category         Closing-tag boilerplate on otherwise substantive explanations
```

**Question IDs:** 15 items: Section A (4): P1-A-001 (EWA), P1-A-002 (EWB), P1-A-009 (EWA), P1-A-018 (EWB); Section D (11): P1-D-002 (EWA), P1-D-005 (EWD), P1-D-006 (EWA), P1-D-008 (EWC), P1-D-012 (EWC), P1-D-013 (EWD), P1-D-018 (EWA), P1-D-019 (EWB), P1-D-020 (EWC), P1-D-029 (EWD), P1-D-069 (EWD)

**File:** `pack_a_corrected.js`

### Issue

Fifteen ExplanationWrong fields contain the sentence "A candidate selecting this option may misunderstand how the governing standard applies to this specific fact pattern" appended to otherwise substantive, choice-specific explanation text. This is a closing tag — not a standalone template.

Three distinct severities:
1. **Section A (4 items):** The closing tag is the ONLY boilerplate. All text before it is choice-specific with proper ASC citations. No "represents a plausible misconception" anywhere. Qualitatively distinct from classic DL-013.
2. **Section D (11 items):** **HYBRID.** The closing-tag slot has substantive choice-specific text + closing tag, but the same item's OTHER distractor ExplanationWrong slots contain classic DL-013 boilerplate ("does not align with... The correct approach involves..."). These 11 items need BOTH DL-013 remediation (for boilerplate slots) AND DL-027 closing-tag cleanup (for the tagged slot).
3. **Nonsensical standard citations (3 items):** P1-D-018, P1-D-029, P1-D-069 cite "Artificial intelligence in accounting" as the governing standard for quality cost classification, value chain analysis, and life-cycle costing — a template placeholder.

### Root Cause

Template engine appended a standard closing sentence to ExplanationWrong fields as a pedagogical flourish. The core text was authored substantively, but the engine auto-appended this tag. For Section D items, the same template engine also left classic DL-013 boilerplate in companion slots.

### Pattern

```
"<substantive choice-specific text with proper standard citation>. A candidate selecting this option may misunderstand how the governing standard applies to this specific fact pattern."
```

### Detection Rule

Grep for: `/A candidate selecting this option may misunderstand how the governing standard applies/`

Confirmed: 15 matches across Sections A (4) and D (11).

### Correction

Section A (4 items): Delete the closing tag only. The preceding text is fully substantive.

Section D (11 items): Remediate companion DL-013 boilerplate slots first. Then delete the closing tag from the one flagged slot per item. Fix nonsensical standard citations (3 items) in the same pass.

### Resolved

2026-07-23 — 15/15 closing tags removed via replaceAll (autonomous 5-hour run, WAVE 3). `. A candidate selecting this option may misunderstand how the governing standard applies to this specific fact pattern.` → `.`. Zero content loss — all preceding text was substantive with proper ASC/cost-management citations. Verification: Select-String count = 0. File: pack_a_corrected.js.

---

## DL-033 — Wave 4 "Pack E" Archival Discrepancy (Naming Confusion, False Alarm)

```
Defect ID        DL-033
Class            Structural / Documentation
Domain           Process Integrity — Claim-Verification Gap
Severity         Informational (no content defect — false alarm, documentation-only)
Detected By      Build-Time AI Verification (Autonomous Run Wave 4 + Phase 0 resolution, 2026-07-23)
Status           Resolved — no content fix needed; root cause documented; naming convention clarified
Category         Pack-file naming confusion: "Pack A Section E" vs "Pack E"
```

**No content defect — false alarm.** No pack file modification required.

### Issue

The AUTONOMOUS_RUN Wave 4 (2026-07-23) searched `pack_e_corrected.js` (the Pack E file, QID format P1E-xxx) for Archived DL-012 clone items and found 0. It reported this as a discrepancy: "Pack E: 0 Archived... Prior session's claim of '16 Pack E clones already Archived' does not match current file state."

The prior "16 Archived" claim (REVISION_HISTORY.md line 2572) referred to **Pack A Section E** items (P1-E-046 through P1-E-074, in `pack_a_corrected.js`), NOT to Pack E items (P1E-xxx, in `pack_e_corrected.js`). The labeling convention confusion between "Pack A Section E" (prefixed P1-E-) and "Pack E" (file `pack_e_corrected.js`, prefixed P1E-) caused Wave 4 to check the wrong file.

### Root Cause

**File-location vs. section-name ambiguity.** The project uses two parallel naming conventions:
- File-based: Packs A, B, C, D, E → `pack_a_corrected.js` through `pack_e_corrected.js`
- Section-based within Pack A: Sections A through F → items prefixed P1-A- through P1-E-

The "16 clones" were in Pack **A**, Section **E** (P1-E-046–074) — a Section E inside Pack A. Wave 4 interpreted "Pack E" as meaning the entire Pack E file (`pack_e_corrected.js`), which was authored through a completely different pipeline and has no DL-012 clones.

### Current Verified State (pack_a_corrected.js, 2026-07-23)

| Category | Count | Items | Status |
|----------|-------|-------|--------|
| Genuine template clones (DL-012 pattern) | 12 | P1-E-046, 049, 054, 057, 058, 062, 063, 065, 066, 070, 071, 073 | **Archived** — no issue |
| Re-archived after Tier 0 reversal | 4 | P1-E-047, 050, 055, 074 | **Archived** — re-archived by Session 5 corrective reversal |
| Unique seed (not a clone) | 1 | P1-E-053 | **Certified** — correct status (vendor master file control, independent topic) |
| Independent topic, possibly mis-archived | 1 | P1-E-056 | **Archived** — independent topic (physical count control); may warrant re-review |
| **Learner pool exposure** | **0** | — | **No Certified clone items in learner pool** |

### Detection Rule

Any report that references "Pack E" must disambiguate whether it means:
- The file `pack_e_corrected.js` (QIDs: P1E-A-xxx through P1E-F-xxx), or
- Pack A Section E (QIDs: P1-E-xxx, in `pack_a_corrected.js`)

The disambiguation rule: "Pack E" = the file. "Pack A Section E" = Section E within Pack A. Never abbreviate "Pack A Section E" as "Pack E."

### Validator / Source

`Build-Time AI Verification` — Phase 0 resolution, this session (2026-07-23).

### Correction

No content fix required. Documentation clarification only:
1. DL-033 entry added to DEFECT_LIBRARY.md (this entry) — documenting the naming-confusion root cause
2. REVISION_HISTORY.md entry appended — Phase 0 resolution and cross-reference
3. AUTONOMOUS_RUN_2026-07-23.md Wave 4 note: "0 Archived" in pack_e_corrected.js is correct; the 16 Archived items are in pack_a_corrected.js Section E
4. SESSION_STATUS_2026-07-23.md §5 note: "Pack A Section E — 16 clones" wording is correct; Wave 4 misinterpreted it

### Regression Test

After this documentation fix:
- Verify no pack file was modified (true — read-only resolution)
- Verify the 17 clone items remain Archived in pack_a_corrected.js (confirmed)
- Verify P1-E-053 remains Certified (correctly a unique seed)
- Verify pack_e_corrected.js has 0 Archived (correct — no clones exist there)
- Verify 0 Certified items exposed (confirmed)

### Cross-References

- DL-012 entry: `knowledge/DEFECT_LIBRARY.md` DL-012 (Pack C/D Section E clone redundancy)
- REVISION_HISTORY.md line 2572: "16 clones (P1-E-046 through P1-E-074) — Archived — No change"
- Tier 0 closeout: REVISION_HISTORY.md lines 2463–2534
- AUTONOMOUS_RUN Wave 4: `reports/session_status/AUTONOMOUS_RUN_2026-07-23.md` lines 99–111
- PACK_A_16CLONE_ARCHIVE_VERIFICATION.md: `reports/defect_sweeps/PACK_A_16CLONE_ARCHIVE_VERIFICATION.md`
- DL-015/DL-016 entries: related metadata-numbering issues in same section

### Resolved

2026-07-23 — Phase 0 resolution. No content defect. Naming confusion documented. DL-033 closed.

---

---

## DL-029 — Regex Block-Scan DL-008 False Positives (Cross-Pack Parsing Methodology)

```
Defect ID        DL-029
Class            Methodology / Process
Domain           Scan Reliability
Severity         High (caused prior sessions to report 885+ Certified DL-008 where actual count is dozens)
Detected By      Build-Time AI Verification (Full-Depth Audit Phase 0B, 2026-07-23)
Status           Open — documented, methodology correction recommended
Category         Scan false-positive inflation from CC-offset in block-window extraction
```

**Scope:** All prior sessions that used regex block-window scanning to count DL-008.

### Issue

The regex block-window scanning methodology extracts QuestionID → searches forward in a fixed window for CorrectChoice → flags EW[CC] as DL-008. When the JSON object stores CorrectChoice BEFORE QuestionID (Pack B format, some Pack D objects), the scanner reads the NEXT QID's CorrectChoice. With random CC distribution, this produces a ~75% false-positive rate.

**Example:**
- QID N's object: `{ "CorrectChoice": "A", ... "QuestionID": "P1B-xxx", ... "ExplanationWrongA": "" }`
- Scanner reads: QID at position P → searches forward → finds CC="B" (from QID N+1's object) → flags EW-B (from QID N's object) as non-empty → FALSE POSITIVE

### Verified Impact

| Pack | Regex Scan DL-008 (Certified) | Actual (from verified samples) | False Positive Rate |
|------|------------------------------|-------------------------------|---------------------|
| A | 138 | ~2 confirmed (B-001, B-025) + unknown residual | High |
| B | 257 | **0** (Function constructor parse, 500 items) | **100%** |
| C | 174 | At least 6 confirmed (BC-001/010/020/030/094, AC-001) + unknown | Mixed |
| D | 246 | At least 1 confirmed (BD-001) | Very high for Section A |
| E | 70 | 1 confirmed (P1E-B-079) | Very high |

### Detection Rule

After every scan, verify CorrectChoice positioning: if CC field appears BEFORE QuestionID in the source file for that pack, the block-window scan is unreliable for that pack. Use Function constructor parse or direct line-level inspection instead.

### Validator

`Build-Time AI Verification` — no automated validator can detect this. It is a methodology defect in the scanning approach, not a validator bug.

### Correction

1. **Pack B**: Use Function constructor parse (already working). Confirmed 0 DL-008.
2. **Pack E**: Use Function constructor parse (already working). Confirmed 1 DL-008.
3. **Packs A/C/D**: Need direct line-level inspection per item, or fix the brace-matcher to be CC-position-aware.

### Cross-References

- DL-008 entry: The defect being counted
- DL-020: Brace-matcher string-awareness (related parser issue)
- Full-Depth Audit Phase 0B: `reports/session_status/FULL_DEPTH_AUDIT_2026-07-23.md`

### Resolved

Not yet. Methodology correction documented. Scan scripts in `scripts/` directory may need updates to be CC-position-aware.

**2026-08-24 — Dual-block historical-state annotation + methodology retirement (Migration 3 closeout):** this entry's core concern — CC-offset false positives from block-window scanning — is now structurally eliminated, not merely corrected per-scan. All active pipeline tools parse through `scripts/lib/pack_parser.js`, where CorrectChoice is read from the same enclosing parsed object as the EW fields by construction; forward-scan windows no longer exist in the toolchain. The 80-block and 242-vs-282 historical figures cited across this entry were artifacts of the retired methodology; current authoritative counts come from the orchestrator/scorer chain (Gate -1: 2620P / 0B post-regex-flip). Dual-block context: paired metadata/content blocks = 0 pool-wide (see DL-016/DL-026 annotations).

---

## DL-030 — CorrectChoice Answer-Key Errors (Phase 0B Full-Pool Audit)

```
Defect ID        DL-030
Class            Content
Domain           Semantic Accuracy — Answer-Key Error
Severity         Critical (High learner-safety risk — wrong answer marked correct)
Detected By      Build-Time AI Verification — Phase 0B Full CorrectChoice Ground-Truth Audit (2026-07-23/24)
Status           Resolved — all 5 items fixed 2026-07-24
Category         Stored CorrectChoice disagrees with independently derived correct answer
```

**Question IDs:** 5 items across Pack B (4) and Pack E (1)

**Files:** `pack_b_corrected.js`, `pack_e_corrected.js`

### Issue

Five Certified items in the active learner delivery pool had stored CorrectChoice values that disagreed with the independently derived correct answer. All 5 were confirmed by independent 20% re-derivation.

### Confirmed Items

| QID | Pack/Section | Topic | Stored CC | Correct CC | Root Cause |
|-----|-------------|-------|-----------|------------|------------|
| **P1B-B-119** | B/B | Learning curve 4th unit | B (51.2) | **C (64)** | Formula error: EC used 8^(-0.3219) instead of 4^(-0.3219). The 4th unit time = 100 × 4^(-0.32193) = 64, not 51.2. |
| **P1B-F-084** | B/F | Data visualization best practice | A (3D pie) | **D (appropriate chart)** | CC pointed to a known bad practice (3D pie charts with 12 categories). D is the textbook best practice. |
| **P1B-F-116** | B/F | ERP segregation of duties | C (SoD irrelevant) | **A (access controls)** | CC claimed SoD "no longer relevant in ERP" — categorically false. SoD is maintained through role-based access controls in ERP. |
| **P1B-F-121** | B/F | Smart contracts | C (paper-based) | **B (self-executing)** | CC claimed smart contracts are "legally binding only when printed" — wrong. Smart contracts are self-executing code-based agreements. |
| **P1E-E-037** | E/E | COSO Principle 15 | D (all personnel) | **B (external parties)** | CC pointed to COSO Principle 14 (internal communication). Principle 15 covers external party communication. The EC text itself confirmed the correct answer. |

### Root Cause

Multiple causes:
- P1B-B-119: Arithmetic error in the author's learning curve calculation (exponent applied to 8 instead of 4)
- P1B-F-084/116/121, P1E-E-037: Conceptual design errors — the authoring template assigned the correct answer to the wrong letter in the 5-item rotation group. The ExplanationCorrect text was correct, but CorrectChoice pointed to a different choice.

### Detection Rule

For each question Q, independently derive the correct answer from stem + choices. Compare to stored CorrectChoice. Flag any mismatch.

### Validator

Build-Time AI Verification — Phase 0B Full CorrectChoice Ground-Truth Audit

### Correction

Applied 2026-07-24:

| QID | Before CC | After CC | EW[new_CC] cleared | EC updated |
|-----|-----------|----------|-------------------|------------|
| P1B-B-119 | B | C | Yes (was "" already) | Yes — 0.64/64 |
| P1B-F-084 | A | D | Yes | No (already described D) |
| P1B-F-116 | C | A | Yes | No (already described A) |
| P1B-F-121 | C | B | Yes | No (already described B) |
| P1E-E-037 | D | B | Yes | Yes — COSO Principle 15 |

All ExplanationWrong[old_CC] slots filled with appropriate distractor text for the new distractor position. All files retain 500 QIDs. Zero DL-008 on corrected items.

### Regression Test

- Verify all 5 items have ALL_AGREE verdict after fix
- Re-run the Phase 0B CorrectChoice sweep on corrected items
- Verify no new DL-008 violations introduced
- Verify ExplanationCorrect text describes the new correct answer

### Cross-References

- Phase 0B CorrectChoice Ground-Truth Audit: `reports/PHASE0B_DL029_GROUND_TRUTH_AND_PREFLIGHT_REPORT.md`
- Independent 20% Re-Derivation: All 5 confirmed
- REVISION_HISTORY.md: Phase 0B-10 entry

### Resolved

2026-07-24 — All 5 items corrected. Backups: pack_b_corrected.js.bak-phase6-20260724094003, pack_e_corrected.js.bak-phase6-20260724094003.

---

## DL-031 — Definition-Match Difficulty Inflation (Systematic)

```
Defect ID        DL-031
Class            Pedagogical
Domain           Difficulty Calibration — Systematic Over-Labeling
Severity         High (systematic — estimated ~500 items across all 5 packs labeled Moderate that test Bloom's Remember/Understand)
Detected By      Build-Time AI Verification — Session 700 Layer 2 Difficulty Specialist
Status           Open — scoped, not remediated
Category         Systematic difficulty inflation from template-based labeling
```

**Question IDs:** ~500 items across all 5 packs (see Session 700 Global Summary §5.3)

**Files:** All `pack_*_corrected.js` files

### Issue

Items where the question stem is a textbook definition and the correct answer is the term being defined are systematically labeled `Difficulty: "Moderate" / DifficultyScore: 3` when they should be `"Easy" / 1`. These items test Bloom's Remember or Understand level — the candidate matches the definition in the stem to the term in the answer choices. No application, analysis, or evaluation is required.

Six of seven difficulty miscalibrations found in Session 700's 15-item sample follow this exact pattern:

| QID | Topic | Stored | Should Be | Pattern |
|-----|-------|--------|-----------|---------|
| P1B-B-120 | Time series — trend | Moderate (3) | Easy (1) | Stem: "long-term direction" → Answer: "Trend" |
| P1B-F-100 | CCPA rights | Moderate (3) | Easy (1) | "All of the above" where all sub-choices correct |
| P1-BC-075 | Budgetary control | Moderate (3) | Easy (1) | Stem: "compares actual to budgeted" → Answer: "budgetary control" |
| P1-FC-030 | CIA triad | Moderate (3) | Easy (1) | Stem: "confidentiality... integrity... availability" → Answer: "CIA triad" |
| P1-CD-050 | Goal congruence | Moderate (3) | Easy (1) | Stem: "best interest of the company as a whole" → Answer: "goal congruence" |
| P1E-F-050 | ELT vs ETL | Moderate (3) | Easy (1) | Acronym self-defines answer |

### Root Cause

Template-rotation authoring pipeline assigned difficulty labels by position in the 5-item rotation group rather than by cognitive demand assessment. The template engine used a fixed difficulty assignment pattern (Easy, Moderate, Moderate, Difficult, Moderate) without evaluating whether the item's cognitive requirements matched the assigned label.

### Pattern

For any item where the question stem contains a textbook definition and the correct answer is the defined term:
```
Stem: "[textbook definition of concept X]"
Correct answer: "[term for concept X]"
```

When the overlap between stem keywords and correct answer choice text exceeds ~50%, the item should default to Easy (1) unless the distractors require genuine application-level discernment.

### Detection Rule

For each item:
1. Compute lexical overlap (Jaccard or word-level) between stem and correct answer choice text
2. If overlap > 50% AND distractors are definition-level opposites → flag as potential DL-031
3. For any item flagged, verify: does answering correctly require more than reading comprehension? If no → recalibrate to Easy (1).

### Estimated Scope

| Pack | Estimated Affected Items | Based On |
|------|------------------------|----------|
| A | ~100 | CC B-bias + template rotation pattern |
| B | ~200 | 2/3 sampled items overstated; 600 Moderate items, estimated 33% inflated |
| C | ~100 | 2/3 sampled items overstated; large Unprocessed pool |
| D | ~100 | 1/3 sampled items overstated |
| E | ~50 | 1/3 sampled items overstated; Pack E tends to understate |

### Validator / Source

- **Primary detection:** Build-Time AI Verification — Session 700 Layer 2 Difficulty Specialist
- **Validator integration:** No existing validator detects definition-match inflation. Recommended: add `DifficultyCalibrationValidator` to flag items where stem-CorrectChoice lexical overlap exceeds threshold while difficulty is labeled ≥ Moderate.

### Correction

Recalibrate ~500 items from Moderate→Easy where definition-match pattern is confirmed. Per-item verification required — not all Moderate items with high lexical overlap are automatically Easy; some have sophisticated distractor engineering that justifies Moderate labeling.

### Regression Test

After recalibration:
- Verify difficulty distribution meets CAQS §6.1 targets (Easy 15%, Moderate 30%, etc.)
- Re-run difficulty calibration sample audit
- Confirm Bloom's level alignment with difficulty label

### Resolved

Not yet.

---

## DL-032 — Case Bank Uniform Difficulty (No Calibration)

```
Defect ID        DL-032
Class            Pedagogical
Domain           Difficulty Calibration — Zero Variance
Severity         Medium (all items labeled "Moderate" with no differentiation — statistical implausibility for 420-item pool)
Detected By      Build-Time AI Verification — Session 700 Layer 1 Case Files Scan
Status           Open — scoped, not remediated
Category         Template-based uniform labeling — no cognitive calibration performed
```

**Question IDs:** 420 items across 75 cases in all 5 scored_cases files

**Files:** `scored_cases.js`, `scored_cases2.js`, `scored_cases3.js`, `scored_cases4.js`, `scored_cases5.js`

### Issue

Every single case and item across all 5 case files is labeled `Difficulty: "Moderate"`. Zero items are Easy, Difficult, or Very Difficult. For a pool of 420 items spanning 75 cases across 6 blueprint domains, this is statistically implausible — it indicates template-based labeling with no cognitive calibration.

The CAQS v1.0 §6.1 target distribution is:
- Easy: 15%
- Moderate-Easy: 20%
- Moderate: 30%
- Difficult: 25%
- Very Difficult: 10%

The current case bank distribution is:
- Moderate: 100%
- All other tiers: 0%

### Root Cause

Template-based case authoring pipeline that assigned `Difficulty: "Moderate"` as a default value without per-item cognitive assessment. Unlike the MCQ banks (where the 5-item rotation template at least varied difficulty labels — albeit often mechanically), the case pipeline appears to have used a single difficulty label for all items.

### Detection Rule

For each case file, compute difficulty label distribution. If any single label accounts for ≥ 90% of items → flag DL-032.

### Validator / Source

- **Primary detection:** Build-Time AI Verification — Session 700 Layer 1 Case Files Scan
- **Validator integration:** No existing validator checks for uniform difficulty labels across a pool. Recommended: add `CaseDifficultyVarianceValidator`.

### Correction

Assign genuine difficulty labels to all 420 case items based on:
1. Cognitive level (Bloom's) of the item
2. Calculation complexity
3. Number of exhibits the item depends on
4. Distractor deceptiveness
5. Required CMA Part 1 maturity

Target the CAQS §6.1 distribution post-recalibration.

### Cross-References

- DL-031: Systematic difficulty inflation in MCQ banks (same root cause — template-based labeling without cognitive calibration)
- CAQS v1.0 §6.1: Target difficulty distribution
- CAQS v1.0 §6.2: Bloom's taxonomy distribution targets

### Resolved

Not yet.

---

## Tracked Note — Pack D DL-008 Count Discrepancy (Session 700 Finding)

**Status:** Open — independent verification required before any remediation

**Source:** Session 700 Layer 1 structural scan + deep verification

### Finding

SESSION_STATUS_2026-07-24 reports 10 DL-008 items in Pack D. Session 700's structural scan using Select-String + content-block CC extraction produced a count of ~342 items (341 Certified). Deep verification of 10 sampled items found 7/8 Certified items (87.5%) had DL-008 confirmed by direct line-level inspection.

### Discrepancy Analysis

| Source | Count | Method | Date |
|--------|-------|--------|------|
| SESSION_STATUS_2026-07-24 | 10 | Unknown | 2026-07-24 |
| Session 700 L1 scan | ~342 | Select-String + content-block CC | 2026-07-25 |
| Session 700 deep verification | 7/8 in sample (87.5%) | Line-level inspection of 10 QIDs | 2026-07-25 |

### Root Cause Hypotheses

1. **Genuine discrepancy:** SESSION_STATUS undercounted (e.g., only counted specific QID ranges). Session 700 scan methodology is correct.
2. **DL-016 scan artifact:** The dual-block architecture causes confusion between metadata-block CC and content-block CC, inflating the count.
3. **Both partially true:** Session 700 count is inflated by DL-016 artifacts, but the true count is higher than 10.

### Required Action

Session 701 must independently verify the Pack D DL-008 count using boundary-aware object parsing (Function-constructor parse or within-object-field-extraction), not forward-scan/back-scan regex. Until verified, assume the higher count for learner-safety purposes (conservative approach).

### Cross-References

- DL-008 entry: DEFECT_LIBRARY.md
- DL-016: Metadata-block topic-numbering shift
- DL-029: Regex block-scan false positives
- Session 506/507: Prior Pack D Section C DL-008/DL-010 controversy resolved by within-object extraction

---

## DL-034 — P1-E-R33 Missing Structural Fields (CorrectChoice, Stem, ExplanationCorrect)

```
Defect ID        DL-034
Class            Structural
Domain           Identity Integrity — Missing Required Fields
Severity         Critical
Detected By      Build-Time AI Verification — S204 Gate -1 Identity Validation Pilot (Board B)
Status           Resolved
```

**Question IDs:** P1-E-R33

**File:** `pack_e_corrected.js`

**Section:** E (Pack E — items P1-E-R01 through P1-E-R40 are supplemental Section E items beyond the standard 500)

### Issue

~~P1-E-R33 was identified as a `question_state: "Certified"` item in the learner delivery pool that is missing three structural fields: CorrectChoice, Stem, and ExplanationCorrect.~~ **(RESOLVED — see below. The S204 Gate -1 scan was executed against a pre-S808 file state. S207 T0 verification (2026-07-27) confirmed the item is now structurally complete.)**

### Root Cause

The item was part of the Pack E supplemental item set (P1-E-R01 through P1-E-R40). At the time of the S204 Gate -1 scan, P1-E-R33 genuinely had missing fields — a template-rotation omission from the original authoring pipeline. Between S204 and S207, Session 808 (2026-07-26) repaired and certified the item. The S205/S206 analysis chain was based on the stale S204 data.

### Resolution

P1-E-R33 was repaired and certified in **Session 808 (2026-07-26)**. Current file state (verified by S207 T0, 2026-07-27):

- **CorrectChoice:** "D" — PRESENT
- **Stem:** "The IIA's International Standards for the Professional Practice of Internal Auditing require that the chief audit executive (CAE) report to a level within the organization that allows the internal audit activity to fulfill its responsibilities..." — PRESENT
- **ExplanationCorrect:** Full IIA Standard 1110/1110.A1/1130 explanation — PRESENT
- **ExplanationWrongA/B/C:** All populated with choice-specific distractor text — PRESENT
- **ExplanationWrongD:** "" (correctly empty for CC=D, DL-008 compliant) — PRESENT
- **Choices:** {A, B, C, D} all populated — PRESENT
- **question_state:** "Certified" — PRESENT
- **certification_session:** "S808" — RECORDED

Identity validator self-test: 540/540 PASS on Pack E (includes P1-E-R33). All Gate -1 checks PASS.

### Impact (Post-Resolution)

| Category | Assessment |
|----------|------------|
| Learner pool | **Safe** — item is structurally complete and renderable |
| Renderability | Fully functional — Stem, CC, EC, all EW fields present |
| Application stability | No crash risk — all required fields populated |
| 800-Series | **BLOCKER REMOVED** — no longer blocks restart |

### Cross-References

- **S207 resolution disposition:** `reports/SESSION207_DL034_RISK_REVIEW.json`, `reports/SESSION207_DL034_DISPOSITION.json`
- S204 Board B (Gate -1 Validation): `reports/SESSION204_GATE_NEG1_VALIDATION.json` (stale — pre-S808 state)
- S205 Analysis: `reports/SESSION205_DL034_ANALYSIS.json` (stale — pre-S808 state)
- S207 Executive Summary: `reports/SESSION207_EXECUTIVE_SUMMARY.md`

### Resolved

2026-07-26 — S808 repaired and certified P1-E-R33. Resolution confirmed 2026-07-27 by S207 T0 verification (direct file inspection + identity validator self-test).

---

## DL-035 — Governance Guard DL-026 Coverage Gap (39 Certified Domain F Items)

```
Defect ID        DL-035
Class            Structural / Governance
Domain           Governance Guard Coverage Gap — Certification Pipeline
Severity         High (39 Certified items in active learner pool carry empty distractor EW slots)
Detected By      Build-Time AI Verification (S812 Repeatability Review — Board G-L)
Status           Resolved-in-fact 2026-09-05 — 0 Certified empty-slot items pool-wide (see Resolved)
```

**Question IDs:** 39 items across Pack C (28) and Pack D (11), all Domain F, all `question_state: "Certified"` (certified via S853 WAVE_A, 2026-07-27)

**Pack C — Domain F (28 items from S853 Batch B3):**
`P1-FC-001`, `P1-FC-006`, `P1-FC-007`, `P1-FC-010`, `P1-FC-015`, `P1-FC-020`, `P1-FC-025`, `P1-FC-026`, `P1-FC-031`, `P1-FC-036`, `P1-FC-043`, `P1-FC-048`, `P1-FC-053`, `P1-FC-058`, `P1-FC-063`, `P1-FC-068`, `P1-FC-073`, `P1-FC-074`, `P1-FC-075`, `P1-FD-001`, `P1-FD-006`, `P1-FD-011`, `P1-FD-016`, `P1-FD-021`, `P1-FD-026`, `P1-FD-027`, `P1-FD-030`, `P1-FD-031`

**Pack D — Domain F (11 items from S853 Batch B4):**
`P1-FD-033`, `P1-FD-034`, `P1-FD-043`, `P1-FD-049`, `P1-FD-054`, `P1-FD-059`, `P1-FD-064`, `P1-FD-069`, `P1-FD-073`, `P1-FD-074`, `P1-FD-075`

**Files:** `pack_c_corrected.js`, `pack_d_corrected.js`

### Issue

The governance guard enforces Rule 2 (DL-008: non-empty ExplanationWrong[CorrectChoice] BLOCK) but did not enforce a parallel rule for DL-026 (empty non-CorrectChoice ExplanationWrong slots). The S853 WAVE_A certification pipeline checked DL-008 (passed: 0 violations) but did not check DL-026 on the 39 candidate items before certifying them.

As a result, 39 Domain F items were certified into the learner delivery pool (2,298-item pool) with ~117 empty distractor ExplanationWrong slots. When learners select wrong answers on these items, no educational feedback is displayed — an educational quality degradation, not a correctness risk (zero DL-008 = no wrong answers displayed).

The pre-existing DL-026 baseline in `CURRENT_BASELINES.md` §3 stated "MINIMAL — no learner-pool exposure" as of 2026-07-27, which was true pre-S853 but became stale post-S853 when these 39 items were certified.

### Root Cause

**Primary:** Governance guard coverage gap. The guard's certification rules (Rules 1-5) covered DL-008 (wrong text shown as correct), DL-029 (scan methodology), and batch-size limits — but had zero coverage for DL-026 (empty distractor explanation slots). The certification pipeline treated "DL-008 clean" as sufficient for certification, which was a false assumption.

**Secondary:** `CURRENT_BASELINES.md` stale status. The pre-S853 DL-026 count reflected the state before the S853 certification wave, and no re-scan was performed post-certification.

**Tertiary:** Artifact reuse gap. The S853 cert wave and the governance guard operate on independent scans — no shared truth source.

### Relationship to DL-026

DL-026 documents the defect CLASS (1,005 items pool-wide with empty non-CC EW slots across all state types). DL-035 documents the GOVERNANCE INSTANCE: 39 specific Certified items that passed through the certification pipeline because DL-026 was not a certification-blocking check. DL-026 is the defect pattern; DL-035 is the certification failure that put learners at risk.

### Pattern

For each affected item:
- CorrectChoice ExplanationWrong slot: empty (DL-008 compliant)
- One or more non-CorrectChoice ExplanationWrong slots: empty or absent (DL-026 — not blocked pre-Rule 6)
- Item carries `question_state: "Certified"` — in active learner pool
- All certified during a single wave (S853 WAVE_A) that only enforced DL-008

### Detection Rule

```
For each Certified question Q across all packs:
  let cc = Q.CorrectChoice;
  for each letter L in {A, B, C, D}:
    if L != cc AND (Q["ExplanationWrong" + L] === "" OR absent):
      flag DL-035 — Certified item with empty distractor ExplanationWrong slot
```

**Automated enforcement:** governance-guard.js Rule 6 (deployed S814) — BLOCKs any write containing empty/absent non-CC ExplanationWrong slots. Post-S814, new certifications cannot introduce DL-035.

### Validator / Source

- **Primary detection:** Build-Time AI Verification — S812 Repeatability Review (Board G-L)
- **S813 formalization:** SESSION813_FRAMEWORK_V2_ADOPTION_REVIEW.json (C1, C3)
- **Governance enforcement:** governance-guard.js Rule 6 (S814)
- **QID list source:** `scripts/output/session_packages/S853.json`

### Correction

**Prevention:** Rule 6 deployed (S814) — BLOCKs future certifications with empty non-CC EW slots.

**Remediation:** Author ~117 choice-specific distractor explanations for all empty non-CC EW slots across the 39 items (~1.5 empty slots per item). Scheduled for S816-S818. Each slot requires:
- Choice-specific text identifying why that distractor is wrong
- Minimum 50 characters
- Technology & Analytics domain-appropriate content (data governance, ERP, cybersecurity, AI, etc.)

### Regression Test

After remediation:
- Verify 0 DL-035 items across all 5 packs (via object-boundary DL-026 scan filtered to `question_state: "Certified"`)
- Verify governance guard Rule 6 blocked if any non-CC EW slot is empty
- Verify learner-pool delivery safety check passes

### Resolved

Resolved-in-fact 2026-09-05: canonical-parser scan (empty OR absent non-CC EW slot on Certified) finds 0 items pool-wide — the 39 S853-wave items now carry filled, choice-specific distractor slots (filled by intervening certification waves; no S816–S818 wave proved necessary). Template-boilerplate screen on the same cohort: 0. Rule 6 BLOCK remains deployed as prevention. No S816–S818 remediation outstanding.

### Cross-References

- DL-026: Parent defect class (1,005 items pool-wide)
- DL-036: 40-item pipeline routing divergence (S812 concurrent finding)
- S812 Repeatability Review: `reports/SESSION812_REPEATABILITY_REVIEW.json`
- S813 Conditional Adoption: `reports/SESSION813_FRAMEWORK_V2_ADOPTION_REVIEW.json`
- S853 WAVE_A: `scripts/output/session_packages/S853.json`
- governance-guard.js Rule 6: `.opencode/plugins/governance-guard.js`
- REVISION_HISTORY.md: S814 C1/C4 entry

---

## DL-036 — Pipeline Artifact Reuse Gap (40-Item Readiness Routing Divergence)

```
Defect ID        DL-036
Class            Process / Methodology
Domain           Pipeline Consistency — Readiness Routing Divergence
Severity         Medium (no learner impact — 40 Certified items misclassified as BLOCKED by one tool)
Detected By      Build-Time AI Verification (S812 Repeatability Review — Board A-F)
Status           Resolved — Migration 3 executed 2026-08-24 (see in-entry amendment)
```

**Question IDs:** 40 items: P1-E-R01 through P1-E-R40 (Pack E R-series, all `question_state: "Certified"`)

**Files:** `pack_e_corrected.js`

### Issue

Two Framework v2 pipeline tools produce different BLOCKED item counts (242 vs 282) because they use different QID-matching regexes against the same pack file. The 40-item divergence is entirely isolated to Pack E's supplementary R-series items.

| Tool | Session | BLOCKED Count | Pack E BLOCKED | QID Regex |
|------|---------|--------------|----------------|-----------|
| Readiness Scorer (S322) | S322 | 242 | 0 | Correctly matches `P1-E-R##` |
| Candidate Engine (SESSION850) | SESSON850 | 282 | 40 | Does NOT match `P1-E-R##` |

The Readiness Scorer correctly recognizes all 540 Pack E items (500 standard + 40 R-series) as CERTIFY/BLOCKED=0. The Candidate Engine sees the 40 R-series items as identity-validation failures (regex mismatch) and classifies them as BLOCKED.

The 282-item "BLOCKED" count reported by the Candidate Engine is therefore inflated by 40 false positives. The authoritative BLOCKED count is 242 (from the Readiness Scorer, matching ground truth of 540/540 Pack E Certified).

### Root Cause

**Primary:** Zero artifact reuse between pipeline stages. Each stage independently re-scans all 5 pack files from source with its own parsing rules, rather than consuming a pre-computed artifact from an upstream stage.

**Secondary:** The Candidate Engine's Pack E QID regex (`/^P1E-[A-F]-\d{3}$/`) was not updated when 40 R-series items (format `P1-E-R##`) were inserted into Pack E via S808. The Readiness Scorer was updated; the Candidate Engine was not.

This is a synchronization gap caused by the pipeline operating as independent transforms rather than a connected consumer chain.

### Detection Rule

```
At each pipeline gate checkpoint:
  1. Extract total_BLOCKED from readiness_scoring.json
  2. Extract total_BLOCKED from certification_candidates.json
  3. If totals diverge → flag DL-036
  4. Isolate divergent pack by comparing perPack BLOCKED counts
  5. Reconcile each divergent item against raw file question_state:
     - If raw file shows "Certified" but tool shows BLOCKED → QID regex mismatch (DL-036)
     - If raw file shows non-Certified but readiness scorer shows CERTIFY → state-classification divergence (different root cause)
```

### Validator / Source

- **Primary detection:** Build-Time AI Verification — S812 Repeatability Review (Board A-F)
- **Concurrent finding:** S204 Gate -1 identity validation (documented P1-E-R## regex gap)
- **Governance relevance:** S813 Condition C2 (pipeline artifact reuse)

### Correction

**Short-term:** Update Candidate Engine's Pack E QID regex to accept `P1-E-R\d{2}$` format — eliminates the 40 false positives immediately.

**Long-term (C2):** Connect pipeline stages via artifact consumption — Candidate Engine should consume Readiness Scorer output artifact rather than re-scanning from source. This eliminates the entire class of regex-divergence defects and ensures a single source of truth for QID classification across the pipeline.

### Regression Test

After correction:
- Verify `readiness_scoring.json.total_BLOCKED === certification_candidates.json.total_BLOCKED`
- Verify both = 242 (the authoritative BLOCKED count matching Pack E ground truth of 540/540 Certified)
- Verify perPack BLOCKED counts match for all 5 packs

### Resolved

Not yet. Root cause identified and documented. Correction pending (C2 target: S819-S820). 40 R-series items are correctly Certified in the learner pool — no content remediation required.

### Cross-References

- S812 Repeatability Review: `reports/SESSION812_REPEATABILITY_REVIEW.json` (Board A-F)
- S813 Condition C2: `reports/SESSION813_FRAMEWORK_V2_ADOPTION_REVIEW.json`
- S204 Gate -1 identity validation: P1-E-R## regex gap documented
- S808: Pack E R-series insertion (500→540 items)
- `scripts/output/readiness_scoring.json` (S322) — authoritative: 242 BLOCKED
- `scripts/output/certification_candidates.json` (SESSION850) — inflated: 282 BLOCKED
- DL-035: Concurrent governance gap finding (39 Domain F items)

**2026-08-24 Amendment — sibling-class confirmation via canonical-parser Gate -1 (Migration 2):**
With `scan_orchestrator.js` repaired (rootDir had silently emptied every gate post-reorganization) and its substrate migrated to the canonical parser, Gate -1's first real run blocked **80 items** — all Pack E supplemental series: `P1E-[A-F]-S##` and `P1E-EVAL-###`. Same root cause as this defect: `pack_reader.QID_REGEX.pack_e` was never extended when the supplemental series landed (it accepts only `P1E-[A-F]-\d{3}` and `P1-E-R\d{2}`). Proposed regex for Board disposition: `^(?:P1E-(?:[A-F]-\d{3}|[A-F]-S\d{2}|EVAL-\d{3})|P1-E-R\d{2})$`. No content defect implicated; blocks are pure identity-pattern gaps.

### Resolved

2026-08-24 — Migration 3 executed under three Board-authorized workstreams:

1. **QID_REGEX flip (validated before flipping):** proposed regex tested against the full 620-item Pack E population — **620/620 matched, zero orphans**, family decomposition exact (500 standard + 40 R-series + 75 S-series + 5 EVAL-series), **zero over-matches** across 11 negative probes (foreign pack formats, invalid shapes, case variants). Structural spot-checks on 7 sampled supplemental items: all fully-formed Certified questions. Flip applied in BOTH live copies: `engine/pack_reader.js` QID_REGEX (identity authority, consumed by identity_validator) and `certification_candidate_engine.js` — whose local table was **deleted outright**, replaced by `pr.getQIDFormatRegex()`. Post-flip: Gate -1 **2620P / 0B** (was 2540P / 80B); all other gates unchanged.
2. **Artifact-consumption wiring (C2):** `certification_candidate_engine.js` rewritten as a downstream consumer of `readiness_scoring.json`. Guards per DL-045 doctrine: missing artifact → refuse; empty scoring → refuse; pack-hash staleness vs current files → refuse; any parsed item absent from the scorer's items[] → hard error (evidence-chain gap). A structural **parity invariant** now throws if the engine's state totals diverge from the scorer's `portfolioReadiness.byState` by even one item. Chain run: orchestrator → scorer (**first non-empty scoring since the content/ reorganization** — the scorer carried the same repo-root rootDir bug and was silently scoring zero; repaired with the same guards) → engine: CERTIFY=2620 mirrored exactly.
3. **Second silent-empty tool discovered & fixed:** `readiness_scorer.js` rootDir repaired (repo-root → content/packs, both call sites) with identical refusal guards.

**Regression test now built-in:** any future regex/classification drift between the pair throws `PARITY FAILURE vs scorer artifact` instead of producing divergent BLOCKED counts.

---

## DL-037 — Choice Binary Lead-In Polarity Mismatch

```
Defect ID        DL-037
Class            Content
Domain           Semantic Accuracy — Choice Lead-In / Conclusion Alignment
Severity         Medium
Detected By      Manual Review (Post-Exam Project Reopening)
Status           Resolved (S911 fix + S913 Rule 9 automated prevention)
```

**Question IDs:** P1-B-040 (Pack A, Section B)

**File:** `pack_a_corrected.js`

**Stem:** "Eastwood investigates any budget variance exceeding 5% of budgeted cost or $10,000, whichever is smaller. A department shows a $9,000 unfavorable variance on a $150,000 budget. Should this be investigated?"

### Issue

Choice B (the correct answer) read: *"**No**, because 5% of $150,000 is $7,500 and $9,000 exceeds that, so it **should be investigated**."*

The lead-in word "No" directly contradicts the conclusion "so it should be investigated." The correct answer is mathematically YES — the variance exceeds the $7,500 threshold, so investigation is warranted. Choice B's trailing rationale is correct, but the one-word lead-in "No" is semantically wrong.

The stem asks "Should this be investigated?" and the answer is yes. Choice B was the only choice that correctly calculates the threshold, but it opens with the wrong binary signal.

### Root Cause

Human authoring error — the choice text's leading binary ("No" / "Yes") was misaligned with the logical conclusion of the trailing clause. The distractor was written correctly (5% threshold calculation is right) but the initial Yes/No polarity was inverted during authoring.

The exact same content with "Yes" instead of "No" would be semantically consistent: "Yes, because 5% of $150,000 = $7,500, and $9,000 exceeds it, so it should be investigated."

### Pattern

```
// BAD — "No" contradicts "should be investigated"
"No, because <calculation is correct>, so it should be investigated"

// FIXED — "Yes" aligns with "should be investigated"
"Yes, because <calculation is correct>, and it exceeds the threshold, so it should be investigated"
```

**Correct pattern:** Match the binary lead-in word ("Yes"/"No") to the conclusion of the sentence.

### Detection Rule

1. Scan all Choice text values starting with "Yes," or "No,"
2. Pattern 1: `^No,.*\b(should be investigated|should be accepted|should be selected|...)\b` — a "No" paired with an affirmative conclusion
3. Pattern 2: `^Yes,.*\b(should not|shouldn't|cannot|must not|...)\b` — a "Yes" paired with a negative conclusion
4. Flag any match as a DL-037 logic inversion

### Validator / Source

- **Primary detection:** Manual Review (post-exam project reopening)
- **Automated prevention:** Rule 9 (governance-guard.js) — BLOCK enforcement at write/edit time
- **Full-pool scan:** `scripts/scan_logic_inversions.js` — independent full-pool audit
- **Governance relevance:** S913 Rule 9 deployment; S914 baselines recaptured

### Correction

**S911:** Changed P1-B-040 Choice B from "No" → "Yes." One-word edit. All other fields unchanged: CorrectChoice=B, ExplanationWrongB="" (DL-008 clean), all 3 non-CC EW slots non-empty (DL-026 clean), question_state="Certified." Backup: `backups\pack_a_corrected.js.bak-S911-20260728090956`.

**S912:** Full-pool semantic scan executed across all 2,500 items via `scripts/scan_logic_inversions.js`. Result: 0 additional inversions found. P1-B-040 was the sole instance of this defect class.

**S913:** Rule 9 (Choice Binary Lead-In Polarity Mismatch) deployed to governance guard. BLOCK-level enforcement at write/edit time. Test suite expanded from 45 → 51 tests. Verified 51/51 PASS. Rule 9 successfully catches the historical P1-B-040 pattern and correctly passes semantically-aligned text.

### Regression Test

After correction:
- Verify P1-B-040 Choice B reads "Yes, because..." with semantically-aligned conclusion
- Verify no other questions flag on Pattern 1 or Pattern 2 via full-pool scan
- Verify Rule 9 BLOCKs a synthetic write introducing "No, ... should be investigated"
- Verify Rule 9 does NOT flag "No, because the variance is favorable" (correctly aligned)
- Verify Rule 9 does NOT flag "Yes, because the variance exceeds the threshold" (correctly aligned)

### Resolved

2026-07-28 — S911 (content fix) + S912 (pool scan) + S913 (Rule 9 prevention) + S914 (commit). Defect corrected. Automated guard deployed. Full pool confirmed clean.

### Cross-References

- S911–S914 Nuisance Defect Remediation Program
- Rule 9: `governance-guard.js` §RULE_9, `test_governance_guard.js` Rule 9 test block
- Full-pool scan: `scripts/scan_logic_inversions.js` + `scripts/output/logic_inversion_scan.json`
- CURRENT_BASELINES.md: pack_a_corrected.js hash updated (605F576F → D7422331)
- DL-008 (explanation purity — related: ExplanationWrongB remains "" post-fix)
- DL-026 (distractor completeness — related: all 3 non-CC EW slots remain populated)

---

## DL-038 — Matching Item RightItems Unicode Mismatch (CBQ5-C3-Q2)

```
Defect ID        DL-038
Class            Structural
Domain           Character Encoding — Correction Object Reference Integrity
Severity         Medium (prevented derangement shuffle on affected item; no learner impact because item was already non-sequential)
Detected By      Build-Time AI Verification (Session 85 Auditor Phase — Correct-to-RightItems cross-check)
Status           Resolved
```

**Question IDs:** CBQ5-C3-Q2

**File:** `case_pack_3_corrected.js`

**Stem:** "The CFO needs to explain each variance component to the VP of Sales. Match each variance concept to the correct calculated result based on the data in Exhibit 1."

### Issue

Two RightItems entries used plain ASCII "x" (U+0078 LATIN SMALL LETTER X) where the Correct object and LeftItems used the Unicode multiplication sign "×" (U+00D7 MULTIPLICATION SIGN):

| Location | Char | Text |
|----------|------|------|
| RightItems[2] | U+0078 | "yielding 25,000 additional units **x** $13.20 WACM" |
| Correct["Market Size Variance..."] | U+00D7 | "yielding 25,000 additional units **×** $13.20 WACM" |
| RightItems[3] | U+0078 | "represents 10,000 lost units **x** $13.20 WACM" |
| Correct["Market Share Variance..."] | U+00D7 | "represents 10,000 lost units **×** $13.20 WACM" |

Because "x" ≠ "×", these 2 Correct values were orphans — not found in the RightItems array. This blocked any automated shuffle/derangement algorithm that requires all Correct values to exist in RightItems.

### Root Cause

The S81 Wave 1 redesign expanded the RightItems for CBQ5-C3-Q2. The author wrote the Correct object with Unicode "×" (matching the LeftItems convention) but wrote two RightItems entries with plain ASCII "x." Character encoding inconsistency from multi-step content editing across sessions.

### Pattern

```javascript
// BAD — ASCII "x" in RightItems but Unicode "×" in Correct
RightItems: [..., "yielding 25,000 additional units x $13.20 WACM", ...]
Correct: { "Market Size Variance = ... × Budgeted WACM": "yielding 25,000 additional units × $13.20 WACM" }
```

**Correct pattern:** Use the same Unicode character consistently across LeftItems, Correct, and RightItems.

### Detection Rule

For each matching item, compare each Correct value as a string against RightItems entries. If any Correct value has no exact string match in RightItems, flag for character-level diff. Common Unicode mismatch characters: × (U+00D7), − (U+2212), — (U+2014), ' (U+2018), ' (U+2019).

### Validator / Source

- **Primary detection:** Build-Time AI Verification — Session 85 Auditor Phase Correct-to-RightItems cross-check
- **Automation potential:** Add Unicode normalization check to matching item validator

### Correction

Changed "x $13.20" → "× $13.20" in two RightItems entries (lines 3127-3128 of `case_pack_3_corrected.js`). Character encoding normalization only — no content change. Session 85 propagation script applied the fix before shuffling.

### Regression Test

- Verify CBQ5-C3-Q2 all Correct values found in RightItems
- Verify derangement shuffle succeeds on the item
- Verify no other matching items have orphaned Correct values (Session 85 auditor confirmed 0 others)

### Resolved

2026-07-30 — Session 85. Fix applied before ordered-pattern propagation. Item confirmed deranged and all Correct values present in RightItems.

### Cross-References

- S85 Auditor Phase: `reports/SESSION085_AUDITOR.md` §1.3
- S85 Closeout: `reports/SESSION085_CLOSEOUT.md`
- REVISION_HISTORY.md: Session 85 entry

---

## DL-039 — Certified Pack D Section B DL-008 Cluster (9 Items, Unblocklisted)

```
Defect ID        DL-039
Class            Structural / Content (hybrid)
Domain           Explanation Slot Error — rotation-artifact DL-008 cluster
Severity         HIGH (learner-safety — 9 Certified items in Tier 1 delivery with non-empty ExplanationWrong[CorrectChoice])
Detected By      Build-Time AI Verification (P1 Repository Truth Verification, 2026-08-01 — Function-constructor within-object scan)
Status           Resolved — S133 2026-08-01 (see Resolved section in-entry)
Category         Rotation-artifact cluster missed by prior DL-008 closeout
```

**Question IDs:** P1-BD-008, P1-BD-015, P1-BD-056, P1-BD-064, P1-BD-070, P1-BD-076, P1-BD-077, P1-BD-079, P1-BD-100 (all `question_state: "Certified"`)

**File:** `content/packs/pack_d_corrected.js`

### Issue

Nine Certified Pack D Section B items have a non-empty `ExplanationWrong[CorrectChoice]` slot (DL-008 / EV8 violation). 8 of the 9 additionally carry DL-026 (one empty non-CC distractor slot). None of the 9 QIDs appear in any runtime blocklist source, so they are delivered to learners as Tier 1.

| QID | CC | EW[CC] len | Empty non-CC slot |
|-----|----|-----------|--------------------|
| P1-BD-008 | D | 751 | C |
| P1-BD-015 | D | 461 | C |
| P1-BD-056 | D | 1,038 | C |
| P1-BD-064 | C | 375 | B |
| P1-BD-070 | B | 783 | C |
| P1-BD-076 | D | 796 | — |
| P1-BD-077 | B | 196 | A |
| P1-BD-079 | D | 352 | C |
| P1-BD-100 | D | 827 | A |

**Verified patterns (raw-file inspection, AGENTS.md §5):**
- P1-BD-008 EW_D contains **cross-item ZBB text** ("Option D focuses exclusively on the ongoing cost differential ($42,000 vs. $9,200/year)…") — the actual Choice D is "It can perpetuate inefficiencies from prior periods…" (incremental budgeting). DL-016-style cross-item contamination.
- P1-BD-064 EW_C describes **Choice B's error** ("applies the high-low method … but overlooks the step-cost constraint") at the C slot — DL-010-style misassignment at the CorrectChoice position.

### Root Cause

Pack D Section B Block 1 / S74 cognitive-upgrade wave rotation artifacts. The 2026-07-23 DL-008 full-pool closeout reported Pack D "0 remaining"; this Section B cluster escaped because the closeout's residual counts covered Sections A/C/D/E while Section B rotation artifacts were not re-scanned after the S74 cognitive upgrade rewrote CognitiveLevel/DifficultyScore fields.

### Detection Rule

```
For each question Q (Function-constructor parse):
  let cc = Q.CorrectChoice;         // same object as EW fields
  if Q["ExplanationWrong" + cc] is a non-empty string → DL-008
  for L in {A,B,C,D}, L != cc:
    if Q["ExplanationWrong" + L] is "" or absent → DL-026
```

### Validator / Source

`Build-Time AI Verification` — P1 within-object scan (DL-029-compliant: CC read from the same parsed object as EW slots, never forward-scanned from QID).

### Correction

Not executed (P1 read-only). Remediation path: clear or re-attribute `ExplanationWrong[CorrectChoice]` per EV8; author the 8 empty non-CC slots; re-verify per DL-008/DL-026 detection rule; confirm no CorrectChoice change required (CC values themselves are correct for the rendered stem).

### Regression Test

- Re-run P1 within-object scan: 0 Certified DL-008 across all 5 packs
- Re-run P1 DL-026 scan: 0 empty non-CC slots on Certified items
- Rebuild `DEFECT_MANIFEST_DL008_DL026.json` from Function-constructor parse; confirm `dl008_certified: 0` is truthful

### Resolved

2026-08-01 — S133 (P2 Phase A). All 9 items remediated in 1 batch (≤30 Rule 5). Category 1 (5 items: BD-008, BD-056, BD-070, BD-076, BD-100) received full EW re-authoring (all non-CC slots were cross-item contaminated); Category 2 (4 items: BD-015, BD-064, BD-077, BD-079) received CC-slot clear + empty-slot fill. CorrectChoice unchanged (verified correct for rendered stems). Post-fix independent scan: **0 Certified DL-008, 0 Certified DL-026** pool-wide. Preflight 0 divergences, guard 66/66. Backup: `backups/pack_d_corrected.js.bak-20260801194044`. Full report: `reports/P2_DL039_REMEDIATION_REPORT.md`.

### Cross-References

- P1 report: `reports/P1_REPOSITORY_TRUTH_VERIFICATION.md` §3
- P2 remediation report: `reports/P2_DL039_REMEDIATION_REPORT.md`
- DL-008 entry (DEFECT_LIBRARY.md): parent defect class — 2026-07-23 closeout scope did not cover this Pack D Section B cluster
- DL-010: misassigned choice explanations (P1-BD-064 pattern)
- DL-016: cross-item rotation shift (P1-BD-008 pattern)
- Manifest staleness: S725/S726 documented regeneration requirement — regeneration targeted in P2 Phase E

---

## DL-040 — Non-Registry `question_state: "Active"` (20 Items, Runtime-Deliverable)

```
Defect ID        DL-040
Class            Structural / Governance
Domain           Metadata Registry Gap — unregistered governance state
Severity         MEDIUM (governance invisibility + runtime delivery exposure; no content error)
Detected By      Build-Time AI Verification (P1 Repository Truth Verification, 2026-08-01)
Status           Resolved — S133 2026-08-01 (see Resolved section in-entry)
Category         Registry/standard divergence from S899 authoring practice
```

**Question IDs:** Pack C (9): P1-EC-001, P1-EC-005, P1-EC-010, P1-EC-030, P1-EC-055, P1-FC-005, P1-FC-016, P1-FC-045, P1-FC-050. Pack D (11): P1-ED-002, P1-ED-015, P1-ED-020, P1-ED-040, P1-ED-050, P1-FD-002, P1-FD-010, P1-FD-020, P1-FD-040, P1-FD-046, P1-FD-050.

**Files:** `content/packs/pack_c_corrected.js`, `content/packs/pack_d_corrected.js`

### Issue

20 items carry `question_state: "Active"` — a value **not registered** in QUESTION_METADATA_STANDARD.md §9.1 (Unprocessed / In Audit / Editorial Queue / Certified / Archived). Consequences:

1. **Governance invisibility:** excluded from the 2,451 Certified count and from all state-based reporting; no governance rule tracks them.
2. **Runtime deliverability:** `assignTier` (app/app.js:1068) does NOT hard-exclude "Active" (only Archived / In Audit / Editorial Queue). All 19 scored items land at qualityScore ≥ 2 → **Tier 2**; P1-FD-046 scores −1 → Tier 3. `selectWithDifficultyDistribution` (app/app.js:2058) fill order includes Tier 2/3 → these items can reach learners despite never being Certified.
3. **Registry divergence:** S899 (2026-07-28) introduced the state during authoring; S103P (2026-07-31) preserved it; the standard was never updated.

Note: P1-FD-046 is a known shell item (no content block) — it reaches Tier 3 but lacks renderable content; delivery fallback may still surface it.

### Root Cause

S899 Phase 1 authoring (2026-07-28) used `question_state: "Active"` for 20 replacement items without amending QUESTION_METADATA_STANDARD.md §9.1 or TAXONOMY_REGISTRY.md. The state is an informal "in authoring / active replacement" marker that no governance rule recognizes.

### Detection Rule

```
question_state not in {Unprocessed, In Audit, Editorial Queue, Certified, Archived} → flag
```

### Validator / Source

`Build-Time AI Verification` — Function-constructor parse, state enumeration check.

### Correction

Not executed (P1 read-only). Options: (a) register "Active" as a legitimate state in the standard + add governance tracking, or (b) transition the 20 items to a registered state (Unprocessed or Editorial Queue) before any further certification work. P1-FD-046 should be Archived (shell item).

### Regression Test

- All question_state values in all 5 packs are members of the §9.1 registry (or the registry is amended to include "Active")
- No non-Certified, non-Archived state flows into a delivery tier
- Count reconciliation: 2,451 Certified + registered non-certified + Archived = 2,545

### Resolved

2026-08-01 — S133 (P2 Phase E). User decision: **transition to registered states** (option b). 19 items transitioned "Active" → "Unprocessed" (Pack C: 9, Pack D: 10); P1-FD-046 (shell item) transitioned "Active" → "Archived". All 20 items now carry §9.1-registered states. Post-fix scan: **0 "Active" remaining** across all 5 packs. Preflight 0 divergences, guard 66/66. Backups: `pack_c_corrected.js.bak-20260801194738`, `pack_d_corrected.js.bak-20260801194738`.

### Cross-References

- P1 report: `reports/P1_REPOSITORY_TRUTH_VERIFICATION.md` §4
- P2 remediation report: `reports/P2_DL039_REMEDIATION_REPORT.md` (Phase E section)
- S899 entry: `knowledge/REVISION_HISTORY.md` line 1446
- S103P entry: `knowledge/REVISION_HISTORY.md` line 29523

---

## DL-041 — Certified Pack A Section E Items Missing CognitiveLevel + DifficultyScore

```
Defect ID        DL-041
Class            Structural
Domain           Metadata Completeness
Severity         MEDIUM (metadata-incomplete Certified items in Tier 1 learner pool)
Detected By      Build-Time AI Verification (P1 Repository Truth Verification, 2026-08-01)
Status           Resolved — S133 2026-08-01 (see Resolved section in-entry)
Category         Metadata field absence on Certified items
```

**Question IDs:** P1-E-081, P1-E-082, P1-E-083 (all `question_state: "Certified"`)

**File:** `content/packs/pack_a_corrected.js`

### Issue

Three Certified Pack A Section E items have **no `CognitiveLevel` key and no `DifficultyScore` key** at all (verified by Function-constructor parse + key enumeration — zero Cognitive-matching keys). Impact:

- Difficulty calibration (CAQS §6, DCS §3) cannot classify these items.
- May coaching reads `CognitiveLevel` (app/may/may-context-builder.js:168) → silently degrades.
- CAQS §6.2 distribution reporting excludes them.
- They are Tier 1 Certified and in the active learner pool.

### Root Cause

Pack A Section E certification wave (S805-era) certified items without full metadata normalization; the three items (E-081/082/083) predate the metadata-standard rollout and were never enriched.

### Detection Rule

```
For each question Q: if !Q.CognitiveLevel → flag; if Q.DifficultyScore is undefined → flag
```

### Validator / Source

`Build-Time AI Verification` — Function-constructor parse.

### Correction

Not executed (P1 read-only). Add `CognitiveLevel` + `DifficultyScore` per CAQS §6 and DCS §3 defaults after content review; validate no CL/Diff mismatch (DL-031 pattern) before assignment.

### Regression Test

- 2,545/2,545 items carry CognitiveLevel + DifficultyScore (Function-constructor parse)
- May coaching calibration sample uses the new labels without error

### Resolved

2026-08-01 — S133 (P2 Phase B). All 3 items labeled per Rule 11 AF-E4 (named decision-maker, judgment, competing alternatives) + DCS v1.1 §3 (Evaluate → DifficultyScore 4) + S122 COSO Evaluate exemplars. P1-E-081/082/083: `Difficulty: "Difficult"`, `DifficultyScore: 4`, `CognitiveLevel: "Evaluate"`. No DL-031 (none are definition-match). Field placement mirrors E-080 (Difficulty before ItemType; DifficultyScore/CognitiveLevel at object end). Post-fix scan: **0 items missing CognitiveLevel or DifficultyScore** across all 5 packs. Preflight 0 divergences, guard 66/66. Backup: `backups/pack_a_corrected.js.bak-20260801194339`. Full report: `reports/P2_METADATA_VERIFICATION.md`.

### Cross-References

- P1 report: `reports/P1_REPOSITORY_TRUTH_VERIFICATION.md` §5
- P2 metadata report: `reports/P2_METADATA_VERIFICATION.md`
- DL-031: difficulty inflation pattern to avoid when assigning labels
- S805: Pack A Section E certification wave

---

## DL-042 — Resume Does Not Restore Exam-Integrity Mode (Delivery-Integrity Bypass)

```
Defect ID        DL-042
Class            Structural
Domain           Session Recovery — Exam-Integrity UI State
Severity         HIGH (delivery-integrity bypass — non-exam UI exposed during a resumed Full Exam / real-conditions session)
Detected By      P4-W1-A verification session (2026-08-01) — confirmed against app/app.js
Status           Resolved — W1-A, 2026-08-01
Category         Exam-integrity mode body class not re-derived on resume
```

**Files:** `app/app.js`, `app/may/may-core.js`

### Issue

`ExamSessionManager.start()` adds `exam-integrity-mode` to `document.body` when a session is in exam-integrity mode (Full Exam, or real exam conditions checked). On **resume**, the recovery-modal handler restored `session-active` and re-rendered but never re-applied `exam-integrity-mode` from the restored session. Result: a learner resuming a Full Exam (or real-conditions session) sees non-exam UI — tabs, hero panel, setup controls, and May surfaces — during the exam, an assessment-conditions integrity bypass.

Two contributing defects:
1. **No re-derivation on resume** — the body class was only applied in the start path.
2. **`realConditions` was not persisted** — the session snapshot omitted it, so render-time logic read the live DOM checkbox (`$('realConditions')?.checked`), which is reset to unchecked after a page reload, diverging from the actual session conditions. The derived signal therefore disagreed between start and resume (split-brain).

Additionally, May's `isFullTabBlocked()` derived exam state inline (`state.session.mode === 'full'`), a second, inconsistent source that ignored `realConditions` — the same split-brain class.

### Root Cause

Start path computed exam-integrity mode from live DOM; resume path computed it from nothing; May computed it from a different inline expression. No single source of truth existed, so state reconstruction on resume was incomplete.

### Pattern

```
Start Full Exam → body.exam-integrity-mode added
Resume Full Exam → body.session-active added, exam-integrity-mode NOT added → non-exam UI visible
```

### Detection Rule

For each session-resume code path, assert `document.body.classList.contains('exam-integrity-mode')` equals `isExamIntegrityMode(state.session)` after resume.

### Correction (W1-A)

1. **Centralized derivation:** Added global `isExamIntegrityMode(session)` = `session.mode === 'full' || session.realConditions === true` in `app/app.js` (single source of truth).
2. **Persist `realConditions`:** Session object now stores `realConditions` at creation; `start()`, `pause()`, and MCQ/case render logic (pause button, exam notice) read the persisted value instead of the live DOM checkbox.
3. **Resume re-derivation:** The `recoveryResume` handler re-applies (or removes) `exam-integrity-mode` from `isExamIntegrityMode(state.session)`.
4. **May gating unification:** `isFullTabBlocked()` in `app/may/may-core.js` delegates exam-state derivation to `isExamIntegrityMode` (with legacy fallback for load-order safety), preserving the `!completed` and has-questions gates.

### Regression Test

Extended `scripts/smoke_test.js` with a W1-A Resume Integrity block (3 scenarios × start + resume):
- Full Exam → integrity mode active at start and restored on resume
- Real-conditions practice → integrity mode active at start and restored on resume
- Normal practice → integrity mode absent at start and after resume

Result: 26/26 smoke checks PASS, including all 9 W1-A checks. Preflight 0 divergences, guard 66/66. Backups: `backups/app.js.bak-W1A-20260801200732`, `backups/may-core.js.bak-W1A-20260801200949`.

### Resolved

2026-08-01 — W1-A. Applies to new sessions. Pre-existing in-flight sessions created before this fix without `realConditions` fall back to `mode === 'full'` derivation (the `realConditions` checkbox path for those sessions is not recoverable from the old snapshot).

### W1-B Follow-On — Exam State Unification (2026-08-01, Resolved)

The split-brain exam-state model documented above was fully closed in W1-B:

1. **Dead flag removed** — `May._examModeActive` (read in may-context-builder.js:101, never set anywhere) is no longer read. `examModeActive` in `_getAppState()` now derives from `_isExamIntegrityActive()`, which prefers `May.isFullTabBlocked()` (itself composed from the shared `isExamIntegrityMode(session)`) with a direct-derivation fallback carrying the `!completed` guard.
2. **Routing wiring fixed** — a second latent defect: `buildAppContext()` nested `examModeActive` under `mayConfig`, while `_recommendMode()` read `a.examModeActive` on the AppContext top level — so `exam_briefing` routing was unreachable even with a live flag. `buildAppContext()` now exposes `examModeActive` at the top level (keeping `mayConfig` intact).
3. **Remaining inline derivations unified** — may-core.js:4500 (pre-exam chat greeting) and may-core.js:6801 (launcher state) now derive from `isExamIntegrityMode` with the session-lifecycle guards. app.js `pause()` merged its duplicate guards onto `isExamIntegrityMode`.
4. **Answer-leakage control** — `ANSWER_LEAKAGE_EXAM` (may-core.js:6283) reads `context.examModeActive`, which the guarded-speak path sets from `isFullTabBlocked()` (unified). Now additionally protective for real-conditions sessions.

Post-W1-B smoke: **35/35 PASS** — unified gate, context `examModeActive`, and `exam_briefing` routing verified reachable for Full Exam and real-conditions sessions, correctly absent for practice. No duplicate flags or parallel state models remain.

### Cross-References

- S130 exam-integrity-mode CSS: `styles.css:6100-6104`
- May `isFullTabBlocked`: `app/may/may-core.js` (§W1-A)
- `isExamIntegrityMode`: `app/app.js` (line ~1945)
- Resume handler: `app/app.js` (line ~5407)
- W1-B: `app/may/may-context-builder.js` (`_isExamIntegrityActive`, `buildAppContext`), `app/may/may-core.js` (§W1-B), REVISION_HISTORY.md S135

---

## DL-043 — Logically Equivalent / Near-Duplicate Distractor Pairs

```
Defect ID        DL-043
Class            Pedagogical
Domain           Distractor Distinctness (logical equivalence / restatement duplication)
Severity         Medium (psychometric — reduces effective choices; also flagged as "too easy to rule out" in learner practice)
Detected By      User-reported exam practice feedback (all modules, 2026-08-23); scoped by automated audit
Status           Program complete 2026-08-23 (Batches 1–4 closed; see Batch 4 progress in-entry)
```

**Files:** all 5 Part 1 packs; worst cluster in Pack E supplemental items (S-series).

### Issue

Several items carry two distractors that are the same incorrect answer restated in different words (e.g., "write down Line X by $50,000 … reverse $50,000 on Line X" appearing in two choices; the learner-reported "A is less than B / B is more than A" pattern). When two distractors are logically equivalent, a learner who recognizes the duplication eliminates BOTH at once, converting a 4-choice item into a 2-choice item. This violates CAQS §6.3 (distractor distinctness) and §6.4 (no logical subset cueing).

### Scope (audit 2026-08-23, 2,620 items)

- **22 prose near-duplicate pairs** (shared-token ratio ≥ 0.55, both choices ≥ 80 chars): Pack E 17, Pack B 3, Pack A 1, Pack D 1. Worst: P1E-C-S01 (3-way overlap), P1E-C-S06, P1E-F-S04, P1B-A-085, P1B-E-086, P1-A-064, P1-CD-068, P1-E-R11/R13/R19.
- **True contrapositive pairs** ("X less than Y" vs "Y more than X"): 0 detected — the learner-observed pattern is restatement duplication, not literal contraposition.

### Root Cause

Template-rotation authoring: variant choices were generated by re-ordering or minimally shifting the same content across answer slots (same pipeline as DL-005/DL-012). Jaccard word-overlap validators miss the pattern when the wording differs (DL-005 flags ≥70% overlap; these pairs sit at 55–65%).

### Detection Rule

1. Prose-choice pair scan: shared-token ratio ≥ 0.55 with both choices ≥ 80 chars → flag for human confirmation.
2. Contrapositive scan: extract "X (is/are) less than Y" and "Y (is/are) more than X" patterns; flag subject-swaps.
3. Same-number-set scan: choices sharing ≥ 3 numeric literals with identical structure (catches P1E-C-S01-style variance-list clones).

### Correction

Rewrite ONE distractor of each pair to test a distinct misconception, preserving the correct answer and the other two distractors. Batched per Rule 5.

### Regression Test

- Re-run the pair scan: 0 pairs ≥ 0.55 for prose choices
- DL-008/DL-026 intact on all touched items; CorrectChoice unchanged

### Resolved

Not yet — Batch 1 (duplicate pairs) in progress 2026-08-23.

**Batch 1 progress (2026-08-23):** 7 items rewritten with matching explanation updates — P1-A-064 (choice D), P1B-A-085 (D), P1B-E-086 (D), P1-E-R11 (D), P1-E-R13 (A/D), P1-E-R19 (D), P1-CD-068 (EWA/EWC misassignment). 4 pairs triaged as DISTINCT traps on inspection — P1E-C-S01, P1E-C-S06, P1E-D-S04, P1E-F-S04 — no rewrite needed (structural similarity only). 3 additional misassigned ZBB-explanation slots found and corrected during batch execution: P1-CD-044 EWC, P1-CD-072 EWC, P1-CD-075 EWB (see DL-010). Batch 2 (strong absolute terms, 128 items) pending.

**Batch 2 progress (2026-08-23):** Strong absolute terms (always/never/impossible) in distractor slots remediated — 118 slot rewrites applied across 5 packs via a 78-rule phrase table (rotation-group families collapsed: e.g., "they are always immaterial" ×7, "It always maximizes overall company profit" ×7, "Never test goodwill unless it is sold" ×5). 5 items triaged as LEGITIMATE and kept: bare "Never" answer options (P1E-A-070, P1E-A-078, P1E-C-092), "almost always" hedge (P1-FC-038), and the factually-true "Management override of established controls is always possible" (P1B-E-150). Verified: 0 residual strong absolutes in distractor choices (non-KEEP), all packs parse, DL-008/DL-026 0, preflight PASS. **Pending:** any/every/all/must triage (1,032 hits) and DL-013-class ZBB generic-EW cluster (13 items).

**Batch 3 progress (2026-08-23):** any/all/every triage complete — 661 distractor rewrites across 5 packs (512 distinct texts; rotation families collapsed: "Wait for the external audit before designing any internal control" ×31, "It eliminates the need for any market price data" ×7, etc.). Triaged and KEPT: enumerated "all N" counts, ZBB definitional texts ("resets every account"), "each period" phrasing, conditional "any of the/any amount" uses, ALL "must" occurrences (requirement phrasing — not a cueing term), and technical phrases ("substantially all", absorption-costing/reciprocal/direct method definitions). One generic-rule damage case found and restored during falsity review ("Substantially all (typically 90%+)" in P1-A-014). Verified: 0 non-whitelisted any/all/every residuals in distractor choices, all packs parse, DL-008/DL-026 0, preflight PASS. **Remaining:** DL-013-class ZBB generic-EW cluster (13 items) — the only open distractor-quality workstream.

**Batch 4 progress (2026-08-23):** ZBB generic-EW cluster resolved — 13 choice-specific EW rewrites (Pack C 5: P1-BC-080, BC-081, CC-048, FC-036, FC-075; Pack D 8: P1-CD-045, CD-046, CD-049, CD-066, CD-069, CD-070, CD-091, CD-094), each now referencing the item's own stem facts and contrasting with the correct technique. Two additional misassigned EW slots found and fixed during execution: P1-BC-079 and P1-BC-080 EWA (ABB/ZBB hybrid text sat on an incremental-budgeting choice) and P1-CD-070 EWD (controllability choice). Verified: 0 generic-ZBB EW slots remain in the 13-item cluster; all packs parse; DL-008/DL-026 0; preflight PASS. **THE DISTRACTOR-QUALITY PROGRAM IS COMPLETE** — DL-043 (equivalence pairs), DL-003 (absolute language, all tiers), and the DL-013-class ZBB cluster are all closed.

---

## DL-044 — Legacy Case-Bank Structural Corruption (scored_cases.js / scored_cases5.js)

```
Defect ID        DL-044
Class            Structural
Domain           File Integrity — Case Bank Syntax Errors
Severity         High (four cases unrenderable as stored; two entire case files were invisible to the validator suite until Migration 1 restored coverage)
Detected By      Build-Time AI Verification — canonical pack_parser during Migration 1 equivalence diff (2026-08-24); independently confirmed by V8 JSON.parse position-mapped verdicts
Status           Resolved — content wave executed 2026-08-24; 4 structural characters inserted; bidirectional byte-proof of zero data loss; validate Errors→0; pipeline green
Category         Missing-comma corruption (3 sites) and DL-016-era fused-object residue fossilized into invalid syntax (1 site)
```

**Files:** `content/cases/legacy/scored_cases.js`, `content/cases/legacy/scored_cases5.js`

**Case IDs / regions:**

| File | Region span (bytes) | Line | Case | V8 JSON.parse verdict |
|------|--------------------|------|------|----------------------|
| scored_cases.js | 38171–68418 | 355 | CBQ-A2 | Expected ',' or ']' after array element @absOffset 63669 — `"DifficultyScore": 3 }` newline `{ "Type": "multi"` (missing comma between Items elements) |
| scored_cases.js | 178601–204809 | 1814 | CBQ-C2 | Same missing-comma class @absOffset 200329 |
| scored_cases.js | 407728–432382 | 4720 | CBQ-C3 | Same missing-comma class @absOffset 428756 |
| scored_cases5.js | 12753–27876 | 233 | CBQ5-A2 area | Expected ',' or ']' @absOffset 27718 — metadata keys (`question_state`/`pack_state`/`pedagogical_tier`) fused after a nested close; cascades to MISMATCHED_CLOSER at byte 27876 |

### Issue

The legacy whole-array extractor (`ENHANCED_CASE_BASE\d*` regex + single `JSON.parse` → Function-constructor fallback) failed on these two files and **silently returned null** — meaning every validator consuming it (ExplanationValidator et al.) validated zero cases from either file while reporting nothing. The canonical per-object parser isolates the damage: scored_cases.js yields 12 valid cases + 3 precise ERROR diagnostics; scored_cases5.js yields 1 valid case + REGION_PARSE_FAILED + MISMATCHED_CLOSER + TRUNCATED_ARRAY (array discovery conservatively stops at the first structural mismatch).

### Root Cause

Missing commas between array elements in three cases' Items structures (scored_cases.js); scored_cases5.js carries the historical dual-block merge architecture fossilized into invalid syntax inside one object — the same template-pipeline era that produced DL-016/DL-026, surviving only in this file.

### Impact

- Pre-Migration-1: entire validation suite silently covered zero cases in these files; post-migration the corruption is loudly reported (validate Errors 0→5, Explanation Validator FAIL — correct behavior).
- Runtime delivery exposure: RESOLVED by same-day reconciliation — root `scored_cases*.js` do not exist, no loader references the banks, and `getCasePool()` is unfed (see Amendment 2026-08-24(b) below). Original wording ("exposure unknown; app loads root-level copies") was stale on both counts.

### Detection Rule

Automated as of Migration 1: ExplanationValidator routes parser `REGION_PARSE_FAILED` / `MISMATCHED_CLOSER` / `TRUNCATED_ARRAY` diagnostics to errors for all `ENHANCED_CASE_BASE*` banks. Any validate run now fails loudly while these regions remain unrepaired.

### Correction (proposed, not executed)

Content wave with backup protocol: insert the three missing commas (byte-exact sites above); unfuse the CBQ5-A2 metadata block into a separate well-formed structure or remove the residue per content review; re-run `npm run validate` expecting Errors→0 and pipeline gate restored. Also reconcile legacy copies against root `scored_cases*.js`.

### Regression Test

After remediation: equivalence diff shows old/new both parse all 15+15 cases; validate returns to WARN status with Errors 0; conformance harness unchanged for packs.

### Resolved

2026-08-24 — DL-044 content wave executed under five Board conditions:

1. **§3 backups:** `backups/scored_cases.js.bak-20260824164512` (456,450 B), `backups/scored_cases5.js.bak-20260824164512` (332,612 B).
2. **Zero-data-loss deep-diff (bidirectional byte-proof):** shipped files reconstruct exactly from backups by removing the inserted tokens — forward constructive equivalence AND reverse excision both BYTE-EQUAL. Total change: **4 characters** (three `,` between Items elements in scored_cases.js @CBQ-A2/C2/C3; one `]` closing CBQ5-A2's Items array in scored_cases5.js @byte 27692). Content-token censuses unchanged.
3. **Legacy-copy reconciliation (exposure question closed):** root-level `scored_cases*.js` do NOT exist; `content/cases/legacy/` is the sole copy. Neither `index_updated.html` nor `app/app.js` reference `scored_cases*` — case banks are validator-scope content with no runtime delivery path found. Corruption never reached learners; it silently blinded validation instead.
4. **Post-fix battery:** parsePack 15/15 cases per file (was 12+3E and 1+3E); legacy whole-array eval also succeeds post-fix (15/15, JSON-valid); `npm run test:parser` 20/20; conformance harness ALL GATES PASS; equivalence diff TRUE on all shared-scope files; `npm run validate` Errors 0 / Failed 0 / Status WARN / exit 0 (warnings 1861→1983 from newly-covered case items — coverage expansion, not regression); **`npm run pipeline` GREEN end-to-end** (validate → registry rebuild [3,020 questions] → dashboard), restoring the Tend gate blocked since Migration 1.
5. **Rule 5:** satisfied — 4 case objects touched.

Post-fix note: scored_cases5.js contains 15 governance-junction sites of identical shape (`}\n        ],\n        "question_state"`); the repaired site was proven positionally within the CBQ5-A2 span.

### Amendment — 2026-08-24 (b): Delivery-Layer Verdict + Residual Mechanisms

**Verdict:** the corruption never reached learners at any delivery layer. Case banks are validator-scope content; no runtime path existed before or after the repair.

**Residual mechanisms on record** (so a future session cannot rediscover them "the hard way" by re-adding a script tag):

1. **Unfed `getCasePool()` hook** (`app/app.js:2393–2414`, consumed at `:2113`): the case-pool builder reads globals `CASE_BANK_A–E`, `MIGRATED_CASE_BASE_A–E`, and `ENHANCED_CASE_BANK_[A–F]` / `ENHANCED_CASE_BANK2–5_[A–F]` — none of which any loader provides. It never references the arrays the legacy files actually declare (`ENHANCED_CASE_BASE`, `ENHANCED_CASE_BASE5`). Net effect: integrated cases are structurally absent from runtime delivery, independent of file validity.
2. **Script-tag re-add risk:** re-adding `<script>` tags for the legacy banks would execute their file-level `.map()` derivations under names (`ENHANCED_CASE_BANK5_A`…`_F`) that only partially match the hook's expectations — producing silently partial pools rather than an error. Any future loader work MUST reconcile global-name inventory against `getCasePool()`'s expectations first.

---

## DL-045 — Background-Delegation Silent-Empty Findings

```
Defect ID        DL-045
Class            Process / Methodology
Domain           Session Management / Delegation Tooling
Severity         Medium (an investigation can conclude "no findings" from an empty result that was never evidence; also produced a defective pre-assigned ID in session prose)
Detected By      Board tooling-hardening review (@registry-integrity check, 2026-08-24); ID assigned by Board determination — filing mandated in the DL-044 wave session
Status           Open — routing doctrine active; no code-level guard implemented
Category         Silent-empty results from background delegation treated as evidence
```

### Issue

Background `delegate` runs against this repository can return empty/silent failures on large files, indistinguishable from a genuine "nothing found" result (precedent: AGENTS.md §9.4 item 7 — "delegate fails silently on this project's file sizes"). Any audit, scan, or review conclusion sourced from such a result is unsupported. Separately, this finding circulated in session prose carrying the pre-assigned ID "DL-044" while DL-044 was independently filed for case-bank corruption — two findings, one ID — until the registry-integrity check reallocated it as DL-045.

### Root Cause

Two compounding gaps: (a) delegation results were accepted without positive-evidence cross-checks, and (b) defect-ID allocation happened in prose rather than against DEFECT_LIBRARY registry state.

### Detection Rule

Any "clean" / "no findings" / "zero hits" claim sourced from a background delegation is inadmissible without a positive-evidence artifact (record count, QID list, or fingerprint) cross-checked per AGENTS.md §5. New DL-IDs must be allocated by scanning DEFECT_LIBRARY.md for the highest existing ID at allocation time.

### Correct Pattern

Investigations route through the four permitted foreground program agents (`stewardship-inspector`, `registry-integrity`, `drift-detector`, `governance-validator` — per current `opencode.json` permission set); background delegation output carries no evidentiary weight until corroborated. ID allocation queries the registry first.

### Regression Test

- Every delegation-sourced claim in future session reports cites a verifiable artifact.
- Next new-defect filing demonstrates registry-first ID allocation (DL-046+).

---

## DL-046 — Corrupted Choice Text on Certified Item (P1E-A-024 Option C)

```
Defect ID        DL-046
Class            Content
Domain           Semantic Accuracy — Distractor Text Integrity
Severity         High (Certified item presents a malformed answer choice to learners)
Detected By      Build-Time AI Verification — evidence-gathering probe during the DL-026 enrichment wave (2026-08-24)
Status           Resolved — choice C reconstructed + recertified 2026-09-05 (see Resolved)
Category         Truncated/garbled choice text surviving certification
```

**Question ID:** P1E-A-024 (Pack E, Section A, `question_state: "Certified"`)

**File:** `content/packs/pack_e_corrected.js`

### Issue

Option C's raw value is `" securities"` — a leading space plus an orphaned fragment with no complete option text. Learners see a malformed choice on a live-pool item. CorrectChoice=D, ExplanationCorrect, and the remaining distractors are intact, so the answer key is unaffected; the defect is confined to one distractor slot's display text.

### Root Cause

Not yet determined. The fragment pattern suggests a mid-edit truncation during authoring or a template-fill failure that certification waves did not screen for — no existing gate validates choice-text completeness.

### Detection Rule

For each parsed item, flag any Choice[A–D] value whose trimmed length is less than a minimal floor (e.g., 8 characters) or that does not begin with an alphanumeric character. Candidate for a Gate-1 check when the orchestrator next gains content-shape rules.

### Remediation Path

Reconstruct the intended option from topic context (diluted-EPS scope — the sibling options are "Only common shares" / "Only preferred stock" / "Convertible securities and options if dilutive", so C was plausibly a third scope variant), then re-verify the item end-to-end before any further state change.

### Resolved

2026-09-05 — Choice C reconstructed as "Only antidilutive securities" (the surviving " securities" tail; EW_C's "antidilutive securities are excluded" confirms the intended scope-variant; completes the only-common / only-preferred / only-antidilutive / convertible-if-dilutive set). Key D intact (verified correct). Quarantine → fix → verify → Certified + `recertification_batch`/`recertification_date` stamps. Backup: `pack_e_corrected.js.bak-DL046-20260905152439`. Related observation (non-blocking): Pack E leading-space choice pattern (`" work to date"`, `" costs incurred"`, `" manufacturing costs"`) — cosmetic DL-046-family marker; only E-C-092 rose to defect (repaired under DL-047).

---

## DL-046 — P2 Rotation-Clone Pairs Inside a Certification Batch (P2-C-181≡199, P2-C-185≡198)

```
Defect ID        DL-046
Class            Structural
Domain           Clone Redundancy (certification-pipeline intake)
Severity         Medium (would have injected duplicate measurement into the certified pool)
Detected By      Build-Time AI Verification — P2-059 certifier review of p2_cert_review_20260824
Status           Resolved — caught pre-certification; newer duplicates archived P2-059
Category         Rotation-template clones (DL-012 class) surfacing in Part 2 authored content
```

**Question IDs:** P2-C-199, P2-C-198 (archived); survivors P2-C-181, P2-C-185 (repaired + certified)

**Files:** p2/pack_p2_c.js

### Issue

Two rotation-clone pairs were discovered inside the P2-053..057 authoring output during certification review: identical scenario parameters, topic strings, and distractor VALUE SETS with letter-rotated answer keys:

| Pair | Shared content | Key rotation |
|------|----------------|--------------|
| P2-C-181 ≡ P2-C-199 | cost-plus-fixed-fee: 7% fee, $80K lobbying exclusion, $1.2M base → $1,284,000 | C→B |
| P2-C-185 ≡ P2-C-198 | break-even market share: $6.4M FC, $16 CM, 2,000,000-unit market → 20.0% | C→A |

Both members of each pair were queued for certification together. The pre-flip certifier review caught them because clone comparison was on the checklist; an S853-style wave that only checks DL-008 would have certified all four.

### Root Cause

Authoring waves re-used a worked example’s parameter set across sessions with only cosmetic rewording and answer-position rotation. UniqueConceptKey strings differ only by item number, so exact-stem dedupe checks missed them.

### Detection Rule

Before any certification batch flip: compare candidate items pairwise on (normalized numeric-literal multiset + Topic string). Identical multiset + identical Topic = suspected clone; confirm by human review before archiving. (Jaccard stem similarity alone misses these — prose differs.)

### Correction

User-approved disposition: archive the newer duplicate of each pair (P2-C-199, P2-C-198 — question_state Archived, content preserved per §9.2), repair and certify the survivors. Survivor repairs also fixed the shared $1,364,000 padded-base distractor value (→$1,369,600) on P2-C-181.

### Regression Test

Certification batches must include a numeric-multiset + Topic clone scan across ALL packs (not just the batch) before state flips. Zero confirmed pairs = pass.

### Cross-References

- DL-012 (clone redundancy, Pack C/D Section E — same template-pipeline family)
- DL-035 (certification-pool intake gap — Rule 6 response)
- REVISION_HISTORY_P2.md Session P2-059 entry

---

## DL-047 — Certified Answer-Key / Explanation-Content Contradictions (Semantic Verification Gap)

```
Defect ID        DL-047
Class            Content / Structural (hybrid)
Domain           Semantic Accuracy — Answer-Key / Explanation Agreement
Severity         Critical (7 key inversions teach a wrong answer as correct on live-pool items); High (foreign-topic contamination, misassignment, incomplete content)
Detected By      Learner challenge (2026-09-05 — P1-F-009, P1-E-056) + Build-Time AI Verification pool-wide audit (4 screens over 2,620/2,620 parsed items)
Status           Resolved — remediated + recertified 2026-09-05 (10/10 items; see Correction below)
Category         Semantic-verification gap: contradiction between stored key and explanation content, invisible to all structural gates
```

**Question IDs (10, all `question_state: "Certified"` — live learner pool):**

| # | QID | Pack | Stored CC | True answer | Manifestations |
|---|-----|------|-----------|-------------|----------------|
| 1 | P1-F-009 | A | D | **C** | Key inversion; EW_C holds supporting fragment (user-reported) |
| 2 | P1-E-056 | A | D | **B** | Key inversion; foreign-topic EC; EW_B/EW_C shift (user-reported) |
| 3 | P1-F-054 | A | A | **D** | Key inversion; EC + EW_D support D |
| 4 | P1-EC-001 | C | D | **A** | Key inversion; EC supports A; EW_A/B/C foreign scenario |
| 5 | P1-EC-005 | C | B | **A** | Key inversion; EC supports A; EW_A/C/D foreign scenario |
| 6 | P1-EC-010 | C | C | **B** | Key inversion; EC supports B; EW_A/D foreign; EW_B refutes correct answer |
| 7 | P1-EC-055 | C | D | **C** | Key inversion; EC supports C; EW_A/B foreign |
| 8 | P1-DD-022 | D | B (intact) | **B** | Key intact; EW_A/C/D foreign-topic contamination |
| 9 | P1B-B-102 | B | B (intact) | **B** | Key intact; EW_A/C/D misassigned (+1 shift) |
| 10 | P1E-C-092 | E | D | unanswerable | Incomplete stem/choices (blank numbers); fragment choice D |

### Summary

Ten Certified items carry contradictions between the stored answer key and the item's own explanation content. Seven teach a factually wrong answer as correct (Critical — strictly worse than DL-008, which shows wrong *feedback* but keeps the right *key*). Two carry foreign-topic explanation text with an intact key (High). One is unanswerable as stored (High). All ten pass every automated gate (DL-008 = 0, DL-026 = 0, Rule 9 = 0), which is why successive "learner pool confirmed clean" attestations missed them: those attestations cover structural defects only. No semantic key/explanation-agreement gate exists anywhere in the pipeline.

### Group A — Key inversions (stored key contradicts stem + choices + explanations)

**A1. P1-F-009** — `content/packs/pack_a_corrected.js:22023-22057` (Certified, Session 68 Wave 1, 2026-07-24). Stem: POS feed arrives two days *after* pricing decisions → timeliness. Choice C ("Timeliness, because data are not available when needed") is correct; stored CC = D ("Validity … format and range checks" — no stem facts support it). EC (line 22031) explains timeliness. EW_C (line 22056) holds the fragment *"because the data arrive after managers need them for pricing decisions"* — a justification *for* the correct answer filed in a wrong-answer slot (DL-010). Learner review rendered EC as "WHAT WAS TESTED / WHY THE CORRECT ANSWER WINS" and EW_C as "WHY YOUR ANSWER WAS WRONG," so the UI faithfully displayed the data defect (renderer exonerated).

**A2. P1-E-056** — `content/packs/pack_a_corrected.js:20555-20592` (Certified, S803 Wave 1, 2026-07-26). Stem: custodian performs the physical count without independent oversight → segregation-of-duties failure. Choice B is correct; stored CC = D ("required for accurate cycle counts" — factually false; independence, not custody, is required). EC (line 20563) is foreign-topic text about *periodic access recertification / least privilege / MFA* belonging to a different item (DL-016/DL-010 contamination). EW_B (line 20590) refutes choice C's "more accurate" claim at B's slot; EW_C (line 20591) refutes choice D's claim at C's slot; only EW_A sits in its correct slot — a forward-shift pattern consistent with the empty/CC slot having moved B→D while the true answer stayed B.

**A3. P1-F-054** — `content/packs/pack_a_corrected.js:24306` (Certified, no batch stamp). Stem asks which metric's lineage gap is highest-risk. EC + EW_D both conclude Metric 5 / Diluted EPS (choice D) is a *confirmed* error outranking risk-only metrics; stored CC = A (Metric 1). Entire explanation set written for CC=D; the key is the outlier. True answer D.

**A4. P1-EC-001** — `content/packs/pack_c_corrected.js:17934` (Certified, no batch stamp). Stem describes textbook three-way segregation (authorize / record / reconcile) → A. EC supports A; stored CC = D (risk acceptance). EW_A/B/C all narrate a *different* scenario (warehouse PO-creation + invoice-entry custody, duplicate-payment scheme, $47,000) absent from this stem.

**A5. P1-EC-005** — `content/packs/pack_c_corrected.js:18139` (Certified, no batch stamp). Same stem skeleton as A4 (Emberton three-way split) → A. EC supports A; stored CC = B (cost-benefit). EW_A/C/D narrate a foreign compensating-monitoring scenario (duplicate scheme undetected six months).

**A6. P1-EC-010** — `content/packs/pack_c_corrected.js:18395` (Certified, no batch stamp). Stem: "five integrated components" internal-control framework → B (COSO IC-IF) by definition. EC supports B; stored CC = C (Balanced Scorecard). EW_A (fraud-triangle pressure) and EW_D (fraud diamond) are foreign-topic; EW_B refutes the correct answer with reasoning the stem directly contradicts.

**A7. P1-EC-055** — `content/packs/pack_c_corrected.js:20705` (Certified, no batch stamp). Stem: small firm cannot segregate → C (compensating owner/management review, the standard answer). EC supports C; stored CC = D ("Eliminating internal controls entirely" — certifying this as correct teaches learners to dismantle controls). EW_A (board independence) and EW_B (control-environment taxonomy) are foreign-topic.

### Group B — Explanation contamination / misassignment with intact key

**B1. P1-DD-022** — `content/packs/pack_d_corrected.js:15176` (Certified, no batch stamp). Key B correct (R-squared 0.82 → purchase orders; EC on-topic). EW_A/C/D cite a foreign assignment question's numbers ($120,000 pool, 2,400 orders, Product A 600 × $50 = $30,000, $50,000 rate) nowhere present in this stem ($180,000 pool, 1,200 POs, R-squared). Learners selecting A/C/D receive feedback about a different question.

**B2. P1B-B-102** — `content/packs/pack_b_corrected.js:3236` (Certified, no batch stamp). Key B correct (direct materials purchases budget is operating). EW_A (slot A, choice A = capex budget) describes the *cash* budget; EW_C (slot C, choice C = cash budget) describes the *balance sheet*; EW_D invokes the sales budget (not a choice) — a +1 misassignment shift with a correct key (DL-010).

### Group C — Incomplete content

**C1. P1E-C-092** — `content/packs/pack_e_corrected.js:25010` (Certified, S71, 2026-07-24). Stem contains unfilled numeric blanks ("Segment A assets , segment B assets . Total assets ."); choice D is the fragment `" > 10% of "` (leading-space fragment pattern — DL-046 family). EC and EW_B/C assert "Segment A's assets equal exactly 10%" — facts not in evidence in the stem. Unanswerable as stored.

### Why every gate missed this class

| Gate | Result on all 10 items | Reason |
|------|------------------------|--------|
| DL-008 (Rule 2) | 0 | CC slots correctly empty — structure fine, semantics wrong |
| DL-026 (Rule 6) | 0 | Non-CC slots non-empty — filled with wrong-topic text, which Rule 6 does not screen |
| Rule 9 (lead-in polarity) | 0 | No Yes/No lead-ins involved |
| DL-010 validators | No coverage | No automated validator checks semantic slot assignment |
| Certification waves | Passed | Waves checked DL-008/DL-026 only (S853 pattern); semantic key agreement never verified |
| Baselines §3 "pool clean" | Stale scope | Attests structural defects only |

### Root cause

Answer-position rotation/shift during authoring or certification waves moved the stored CorrectChoice (and, on E-056/B-B-102, the empty-slot marker) without moving the explanation content written for the true answer; on E-056/EC-001/EC-005/EC-010/EC-055/DD-022, whole explanation fields were pasted from unrelated items of the same section (same template-pipeline family as DL-012/DL-016). Eight of ten items carry no `certification_batch`/`certification_date` stamp, limiting wave attribution to: Session 68 Wave 1 (F-009), S803 Wave 1 restoration (E-056), S71 (E-C-092).

### Detection rule (4 screens; DL-029-compliant within-object extraction via `scripts/lib/pack_parser.js`)

1. **Exact-phrase fingerprints** — search pool for known contaminant strings (F-009 EW_C fragment; E-056 access-recertification EC; F-009 timeliness EC). Any hit outside the source item = spread.
2. **EC lead-token echo** — per Certified item, keyword-recall of each choice's lead phrase against EC; flag when best-recall letter ≠ CC with recall ≥ 0.50 and margin ≥ 0.40.
3. **EC–stem topical mismatch** — Jaccard(content-words(EC), content-words(stem+choices)); flag < 0.05 with EC ≥ 20 content words.
4. **EW lowercase-fragment** — flag any non-empty EW slot whose trimmed text starts with a lowercase letter (misfiled justification continuation, e.g. F-009's *"because…"*).

### Audit scope and methodology (2026-09-05)

- All 5 MCQ packs: 2,620/2,620 items parsed (matches preflight QID totals 500/500/500/500/620); 2,620 Certified screened.
- Screen yields: A = 3 hits (all on the 2 source items, no spread); B = 24 flags → 6 key-inversion confirmations (A1, A3–A7) + 1 intact-key shift (B2), 17 adjudicated-clean heuristic FPs (generic-word overlap, e.g. P1-C-049 "acceptable/price"; short ECs naming contrasted choices, e.g. AC-071–075 rotation group verified slot-clean); C = 1 flag → A2 confirmed; D = 14 flags → A1 + B1 confirmed, 12 style-only lowercase continuations with correct content (BC-056, FC-026, AD-054/055, DD-024, E-D-005/026/073).
- Count stability (§6): full screen re-run produced identical 24/1/14/3 yields before adjudication.
- Every confirmation verified by verbatim within-object extraction (pack + line cited above); UI mapping verified field-for-field against the learner screenshots (renderer exonerated).
- Case banks excluded: different schema, outside the challenged MCQ review UI scope — flagged as residual risk, not audited.

### Correction (executed 2026-09-05 — user-authorized remediation + recertification)

Flow per item: `Certified` → `In Audit` (delivery quarantine) → content fix → verify → `Certified` + `recertification_batch`/`recertification_date` stamps (provenance; original `certification_batch` preserved where present). Surgical in-block replacement (byte-exact anchors, two-phase commit, post-edit re-parse); per-pack change-sets of 4/3/1/1/1 objects (Rule 5 compliant). Backups: `backups/pack_{a,b,c,d,e}_corrected.js.bak-DL047-20260905143918` (all non-zero, verified pre-write).

| # | QID | Key flip | Slots repaired | CC slot | State |
|---|-----|----------|----------------|---------|-------|
| A1 | P1-F-009 | D→**C** | EW_C→`""`; EW_D authored (validity refutation) | `""` ✓ | Certified + stamps |
| A2 | P1-E-056 | D→**B** | EC rewritten (SoD physical count); EW_B→`""`; EW_C/D authored | `""` ✓ | Certified + stamps |
| A3 | P1-F-054 | A→**D** | EW_D→`""`; EW_A authored (Metric 1 risk-vs-error) | `""` ✓ | Certified + stamps |
| A4 | P1-EC-001 | D→**A** | EW_A→`""`; EW_B/C/D authored (override, cost-benefit, risk-acceptance refutations) | `""` ✓ | Certified + stamps |
| A5 | P1-EC-005 | B→**A** | EW_A→`""`; EW_B/C/D authored | `""` ✓ | Certified + stamps |
| A6 | P1-EC-010 | C→**B** | EW_B→`""`; EW_A/C/D authored (ToC, BSC, DMAIC refutations) | `""` ✓ | Certified + stamps |
| A7 | P1-EC-055 | D→**C** | EW_C→`""`; EW_A/B/D authored | `""` ✓ | Certified + stamps |
| B1 | P1-DD-022 | B intact | EW_A/C/D rewritten (cause-and-effect criterion) | `""` ✓ | Certified + stamps |
| B2 | P1B-B-102 | B intact | EW_A/C/D rewritten (financial-vs-operating per choice) | `""` ✓ | Certified + stamps |
| C1 | P1E-C-092 | D intact | Stem completed ($500K/$4.5M/$5M ⇒ exactly 10%, matching EC/EW); choice D rewritten | `""` ✓ | Certified + stamps |

Post-fix verification: per-item asserts (state, CC, exact EW/EC text, CC-slot empty, all non-CC slots ≥ 50 chars) ALL PASS; 4-screen re-run shows all 10 signatures gone (B 24→16 residual = documented FP set; C 1→0; D 14→12 residual = documented style set; A fingerprints confined to fixed source items); preflight 0 divergences (2,620 Certified); `npm run pipeline` GREEN. No CognitiveLevel/DifficultyScore/Part1OnlyFlag/QID changes (Rules 12/13/14 clean); no Yes/No choice edits except C1's affirmatively-aligned D (Rule 9 clean). Rule 4 notes: per-item independent derivations recorded in REVISION_HISTORY.md 2026-09-05 DL-047 entry.

### Regression test

- Re-run the 4 screens: expect only the documented FP set (17 + 12 style-only) and zero new key-contradiction flags.
- Independent derivation audit of CorrectChoice on any future certification batch (human + six-dimension verification per CAQS §1.6 — structural gates are necessary but not sufficient).
- Preflight 0 divergences; QID counts unchanged.

### Observations (non-blocking)

- Pack E leading-space choice pattern (`" work to date"` E-D-005-D, `" costs incurred"` E-D-026-D, `" manufacturing costs"` E-D-073-B, `" > 10% of "` E-C-092-D): cosmetic DL-046-family marker; only E-C-092 rises to defect. Monitor in future choice-text screens.
- Missing certification provenance on 8/10 items (no batch/date stamp) weakens wave attribution; recommend stamping provenance on all future certification writes.

### Cross-References

- DL-030 (CorrectChoice answer-key errors — resolved 2026-07-24; DL-047 is its Certified-pool recurrence through structural gates)
- DL-010 (misassigned choice explanations — B2 class; A2 EW shift)
- DL-016 (rotation-shift contamination family — A2 EC; B1)
- DL-046 (fragment/corrupted-choice family — C1; Pack E leading-space observation)
- DL-002 (keyword-overlap heuristic confidence caveat — why Screen B FPs required manual adjudication)
- DL-029 (within-object extraction methodology — no forward-scan; CC read from same object as EW)
- DL-045 (positive-evidence doctrine — per-item pack:line evidence above; deterministic screen yields; QID lists)
- REVISION_HISTORY.md: 2026-09-05 DL-047 audit entry (this session)

---

## Template for New Entries

```markdown
## DL-NNN

```
Defect ID        DL-NNN
Class            <Structural | Content | Pedagogical>
Domain           <Semantic Accuracy | Distractor Quality | Explanation Consistency | ...>
Severity         <Critical | High | Medium | Low | Informational>
Detected By      <Manual Review | Build-Time AI Verification | PsychometricValidator | ...>
Status           <Open | Resolved>
```

**Question IDs:** <list>

**File:** `<filename>`

**Stem:** "<stem text>"

### Issue

<description>

### Root Cause

<cause>

### Pattern

```
<problematic text>
```

**Correct pattern:** <correct text>

### Detection Rule

<regex or rule description>

### Validator

<module name>

### Correction

<description or table>

### Regression Test

<steps>

### Resolved

<date>
```
