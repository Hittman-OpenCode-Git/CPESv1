# Defect Library — Part 2

**Purpose:** Catalog every Part 2 content defect discovered after initial authoring, with root cause, detection method, and correction. Entries drive governance-guard rules and improve future Part 2 authoring.

**Status:** Created 2026-08-21 during Session P2-028 (Packs A/B/C certification wave).

**Class Scale:** Structural (field-level rules) · Content (accounting/finance accuracy) · Pedagogical (psychometric issues).

**Severity Scale:** Critical (wrong answer) · High (multiple defensible answers / internally inconsistent) · Medium (leaked authoring notes, weak distractors) · Low (wording).

---

## DL-P2-001 — Leaked Authoring Meta-Commentary + Contradictory Answer Key

```
Defect ID        DL-P2-001
Class            Content
Domain           Explanation/Answer-Key Integrity
Severity         Critical
Detected By      Build-Time AI Verification (P2-028 certification scan)
Status           Open — routed to Editorial Queue (not Certified)
```

**Question ID:** P2-A-017

**File:** `p2/pack_p2_a.js`

### Issue

Two compounding defects:

1. **Leaked authoring meta-commentary.** Choice D text and the `VerifiedChecks` array contain the author's raw drafting notes verbatim: Choice D ends with *"…actually wait — no. Let me re-derive this carefully. … This is BELOW 7.0%, contradicting Choice B. Let me redesign Choice B with different numbers. … OK, I'll start fresh with consistent numbers below."* `VerifiedChecks` contains *"…numbers don't match. Let me fix Choice B … Ugh, I made an error in my drafting."*

2. **Contradictory answer key.** `CorrectChoice` is `D` (which claims "7.84%, exceeding the 7.0% hurdle"), but the `ExplanationCorrect` correctly computes the normalized margin as **6.73% (below the hurdle)**. None of the four choices states the true result (6.73%, below hurdle, symmetric normalization).

### Root Cause

The item was authored in an iterative drafting loop (concurrent session) and the self-correction notes were never removed before the item was finalized. The answer key was never reconciled with the corrected computation.

### Correction

Rewrite the item end-to-end: remove all meta-commentary from `Choices.D`, `ExplanationCorrect`, and `VerifiedChecks`; recompute the normalized margin; set the correct choice to reflect "≈6.73%, below the 7.0% hurdle, with symmetric normalization of all four items." Re-run six-dimension verification before re-certifying.

---

## DL-P2-002 — Leaked "Wait — let me recalculate" + Ambiguous Stem

```
Defect ID        DL-P2-002
Class            Content
Domain           Explanation Integrity / Precision
Severity         High
Detected By      Build-Time AI Verification (P2-028 certification scan)
Status           Open — routed to Editorial Queue
```

**Question ID:** P2-A-084

**File:** `p2/pack_p2_a.js`

### Issue

`ExplanationCorrect` contains leaked meta-commentary: *"…ROA = ($800,000 + $200,000) / $10,000,000 = 10.0%. Wait — that gives 10%. Let me recalculate…"* and waffles between 10.0% and 9.5%. The stem's phrasing *"interest expense of $200,000 (net of 25% tax rate)"* is ambiguous — it is unclear whether $200,000 is pre-tax or after-tax interest, which materially changes the ROA (9.5% vs. 10.0%).

### Root Cause

Unresolved drafting ambiguity over the interpretation of "net of tax" in the interest-expense figure; the author's deliberation leaked into the explanation.

### Correction

Clarify the stem (state explicitly whether $200,000 is the pre-tax or after-tax interest), remove the meta-commentary, and fix the single correct ROA with a consistent add-back.

---

## DL-P2-003 — Unreconciled WACC Answer + Leaked "need to verify"

```
Defect ID        DL-P2-003
Class            Content
Domain           Numerical Accuracy / Explanation Integrity
Severity         High
Detected By      Build-Time AI Verification (P2-028 certification scan)
Status           Open — routed to Editorial Queue
```

**Question ID:** P2-B-024

**File:** `p2/pack_p2_b.js`

### Issue

Choice D and `ExplanationCorrect` contain leaked meta-commentary (*"(but need to re-check)"*, *"(this appears small relative to equity — need to verify)"*). The stored answer "9.88%" does not reconcile with the stem: equity 50M × $36 = $1,800M vs. debt 25,000 × $965 ≈ $24.1M and preferred $80M yields a WACC of approximately **10.9%**, not 9.88%.

### Root Cause

Drafting iteration with an implausible capital structure (debt ≈ 1.3% of capital); the WACC was not recomputed after the numbers were adjusted.

### Correction

Either rebalance the capital structure to make 9.88% correct, or recompute the correct WACC (~10.9%) and update the answer + all distractor explanations.

---

## DL-P2-004 — Leaked "recalculate carefully" in ExplanationCorrect

```
Defect ID        DL-P2-004
Class            Content
Domain           Explanation Integrity
Severity         Medium
Detected By      Build-Time AI Verification (P2-028 certification scan)
Status           Open — routed to Editorial Queue
```

**Question ID:** P2-B-048

**File:** `p2/pack_p2_b.js`

### Issue

`ExplanationCorrect` opens with leaked drafting instruction: *"Actually let me recalculate carefully and provide distinct options. DIO = Average Inventory / (COGS/365)…"*. The underlying cash-conversion-cycle calculation appears correct, but the explanation contains the author's internal instruction to themselves.

### Root Cause

Same iterative-drafting root cause as DL-P2-001/002/003 — the concurrent session's content pipeline did not strip self-instruction text.

### Correction

Remove the opening meta-commentary; retain the (correct) calculation with a clean, authoritative opening.

---

## DL-P2-005 — Leaked "Wait —" Self-Correction in Correct-Answer Choice

```
Defect ID        DL-P2-005
Class            Content
Domain           Explanation/Answer-Key Integrity
Severity         High
Detected By      Build-Time AI Verification (P2-028 certification scan)
Status           Open — routed to Editorial Queue
```

**Question ID:** P2-B-055

**File:** `p2/pack_p2_b.js`

### Issue

Choice B (the designated correct answer) contains leaked self-correction: *"Cost of preferred = 8.70% (annual dividend $8 / net proceeds $92). Wait — the net proceeds after flotation cost are $92 − $3 = $89? No, … Kp = $8/$89 = 8.99%."* The lead-in value (8.70%) contradicts the recomputed value (8.99%), leaving the correct cost of preferred ambiguous.

### Root Cause

Flotation-cost handling was corrected mid-draft; the earlier 8.70% figure was never reconciled out of the choice text.

### Correction

Compute the cost of preferred consistently (net proceeds after flotation → 8.99%), update Choice B, and align the distractor explanations.

---

## Cross-Cutting Finding

All five defects share one root cause: **the concurrent authoring session that produced Packs A/B/C left iterative drafting notes and unreconciled answer keys in the content.** The pattern-based scan found zero equivalent artifacts in Packs D/E/F (authored under the CAQS-compliant workflow this session). Remediation recommendation: run a dedicated correctness audit of the A/B/C packs independent of the artifact-pattern scan (pattern-matching cannot detect silent answer-key errors that lack a leaked note).
