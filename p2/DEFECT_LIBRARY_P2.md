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
Status           Resolved — item repaired (CorrectChoice D = 6.73% below hurdle, meta-commentary removed), re-certified 2026-08-21; verified in-file 2026-08-22. Residual Choice B margin figure fixed 2026-08-22 — see DL-P2-008.
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
Status           Resolved — item repaired (stem reworded, ROA 9.5% with after-tax add-back, meta-commentary removed), re-certified 2026-08-21; verified in-file 2026-08-22.
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
Status           Resolved — item recomputed to WACC 8.39% with market-value weights (Equity $1,800M; Debt $1,447.5M; Preferred $80M), re-certified 2026-08-21; verified in-file 2026-08-22.
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
Status           Resolved — opening meta-commentary removed (clean DIO/DSO/DPO/CCC = 50/38/44/44 computation retained), re-certified 2026-08-21; verified in-file 2026-08-22.
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
Status           Resolved — Kp reconciled to 8.99% (net proceeds $92 − $3 = $89), CorrectChoice A, re-certified 2026-08-21; verified in-file 2026-08-22.
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

**Update 2026-08-22:** All five items verified repaired and Certified in-file (A-017, A-084, B-024, B-048, B-055). A follow-up full-pack leaked-note sweep of `p2/pack_p2_a.js` (160 items) found one residual instance of the same defect class — P2-A-112 — plus a second silent answer-key-adjacent error in P2-A-006. Both logged below (DL-P2-006, DL-P2-007) and repaired the same session.

---

## DL-P2-006 — P2-A-006 Alternative 1 D/E Internally Inconsistent

```
Defect ID        DL-P2-006
Class            Content
Domain           Numerical Accuracy / Answer-Key Integrity
Severity         High (stated transaction does not produce the stated D/E; uncorrected, mis-teaches equity-for-debt swap mechanics and breaks the designated answer's argument)
Detected By      User full-pass arithmetic review (2026-08-22); confirmed by Build-Time AI Verification against raw file
Status           Resolved — Alternative 1 re-tuned to $40M issuance/retirement (2026-08-22)
```

**Question ID:** P2-A-006

**File:** `p2/pack_p2_a.js`

### Issue

Alternative 1 (issue $100M in new equity, retire $100M in debt) was scored as producing D/E = 1.73. That figure is only obtainable by holding equity flat at $150M (260/150 = 1.73) — but an equity issuance for cash must credit equity ($150M → $250M), giving D/E = 260/250 = **1.04**. At the correct 1.04, Alternative 1 shows better leverage than Alternative 3 (1.47), collapsing the designated answer (C) and its "Alternative 1 reduces leverage less" argument.

Secondary defect in the same item: Choice C stated interest coverage improvement "to an estimated 2.50" while ExplanationCorrect computed 2.27 ($40.0M / $17.6M).

### Root Cause

Drafting error — the author applied the debt retirement to total debt but never applied the equity increase from the issuance. The choice-text coverage figure was not reconciled with the explanation's computation.

### Correction

Re-tuned Alternative 1 to a $40M equity issuance / $40M debt retirement (governance decision 2026-08-22 — preserves the answer key and the dilution-vs-asset-sale-vs-refinancing contrast; a $100M issuance is mathematically unrecoverable because equity +$100M caps D/E at 1.44, below Alt 3's 1.47):

- D/E = (360 − 40) / (150 + 40) = 320/190 = **1.68** (still above peer range 0.80–1.50 and above Alt 3's 1.47)
- Dilution = 40/190 ≈ **21%** (book-equity basis, consistent with the D/E arithmetic)
- Interest savings = $40M × 8.0% = **$3.2M** (8% of operating income)
- Choice C coverage figure corrected **2.50 → 2.27** to match ExplanationCorrect

CorrectChoice unchanged (C). Five text locations updated: Stem, Choices.A, Choices.C, ExplanationCorrect, ExplanationWrongA.

### Regression Test

- Recompute D/E = 1.684 ≈ 1.68; coverage = 40/17.6 = 2.273 ≈ 2.27
- EW[CC=C] remains empty (DL-008); all non-CC EW slots non-empty (DL-026)
- Full-pack object-level scan: 0 DL-008, 0 DL-026 across 160 items

### Resolved

2026-08-22 — Applied with independent recomputation. Backup: `p2/pack_p2_a.js.bak-20260822130240`.

---

## DL-P2-007 — P2-A-112 Leaked Drafting Note in ExplanationCorrect

```
Defect ID        DL-P2-007
Class            Content
Domain           Explanation Integrity
Severity         Medium (leaked authoring self-correction; underlying math correct)
Detected By      Build-Time AI Verification — full-pack leaked-note sweep (2026-08-22)
Status           Resolved
```

**Question ID:** P2-A-112

**File:** `p2/pack_p2_a.js`

### Issue

ExplanationCorrect contained the author's drafting self-correction verbatim: *"…OI = $24M − $16M = $8M. Wait — OI unchanged? Let me recompute: $24M − $16M = $8M. Same OI but higher CM.…"* The DOL computation itself is correct (pre-automation 2.50, post-automation 3.00); only the meta-commentary leaked into learner-facing text.

Secondary defect: CommonTrapReference was truncated mid-formula ("…confusing DOL = CM/").

### Root Cause

Same iterative-drafting pipeline as DL-P2-001 through DL-P2-005. The P2-028 pattern sweep missed this instance because the item sits in the P2-A-090–160 range expanded after the sweep's pattern set was run.

### Correction

Removed the leaked note ("Wait — OI unchanged? Let me recompute: $24M − $16M = $8M."). Completed the truncated trap: "…confusing DOL = CM/OI with cost-structure ratios (CM/FC) or revenue-based ratios (Revenue/OI)". CorrectChoice (A) and all explanation text otherwise unchanged.

### Resolved

2026-08-22 — Applied. Backup: `p2/pack_p2_a.js.bak-20260822130240`.

---

## DL-P2-008 — P2-A-017 Choice B Margin Figure Internally Inconsistent

```
Defect ID        DL-P2-008
Class            Content
Domain           Numerical Accuracy (distractor self-description)
Severity         Medium (distractor arithmetic mismatch; correct answer unaffected — found during verification of the DL-P2-001 repair)
Detected By      Build-Time AI Verification (2026-08-22)
Status           Resolved
```

**Question ID:** P2-A-017

**File:** `p2/pack_p2_a.js`

### Issue

Choice B claimed "approximately 8.54%" for normalized earnings of $17.559M on $218M revenue — the correct quotient is **8.05%** (17.559/218 = 8.05). The 8.54% figure corresponds to adding back the full pre-tax $4.42M without tax effect (14.2 + 4.42 = 18.62; 18.62/218 = 8.54%). ExplanationWrongB repeated the wrong 8.54%. Also stale: VerifiedChecks read "EW[CC=B] empty" while CorrectChoice is D.

### Correction

8.54% → 8.05% in Choices.B and ExplanationWrongB. VerifiedChecks string corrected to "EW[CC=D] empty (DL-008 compliant)".

### Resolved

2026-08-22 — Applied with recomputation (17.5592/218 = 8.05%). Backup: `p2/pack_p2_a.js.bak-20260822130240`.

---

## DL-P2-009 — Unreconciled Numeric Headers + Hedge Language (WACC/LBO/Bond Cluster)

```
Defect ID        DL-P2-009
Class            Content
Domain           Numerical Accuracy / Answer-Key Integrity (correct-choice header values)
Severity         Critical for 2 items (B-019, B-021) | High for 2 (B-018, B-052) | Medium for 2 (B-022, B-050)
Detected By      Independent full-pass review (2026-08-22 Section B verification report); confirmed by Build-Time AI Verification against raw file
Status           Resolved — all 6 items fixed 2026-08-22; borderline B-006 wording tightened
```

**Question IDs:** P2-B-018, P2-B-019, P2-B-021, P2-B-022, P2-B-050, P2-B-052 (plus borderline P2-B-006)

**File:** `p2/pack_p2_b.js`

### Issue

Six Certified items carry correct-choice header values that contradict the derivation shown in the same choice, papered over with hedge language ("or X depending on rounding at intermediate steps", "may reflect a specific capital structure"):

| QID | Stored header | Correct value | Notes |
|-----|---------------|---------------|-------|
| P2-B-018 | D: 10.84% | **10.60%** | Hedge in EC; 10.84% also in EWA/EWC; distractor C header 10.43% also contradicted its own components (→ 10.60%) |
| P2-B-019 | D: 11.45% | **9.35%** | Hedge in EC; distractors A (10.98% → 9.77%) and C (9.84% → 9.17%) also internally inconsistent |
| P2-B-021 | D: 9.98% | **13.62%** | Hedge in EC; distractor A (7.42% → 8.75%) also inconsistent; C's average propagated 9.74% → 11.56% |
| P2-B-022 | "14.00% tier" | **12.00% tier** | Tier misstated in 5 locations (Choice D, EC, EWA, EWC, VerifiedChecks); rejection decision was already correct (11.5% < 12%) |
| P2-B-050 | B: ~$903 vs EC $895.69 | **$901.58** | EC used wrong PVIFA (6.477 vs 6.5613); VerifiedChecks said ~$896 — three figures, one item |
| P2-B-052 | B: ~$352M | **$404M** | Derivation in Choice B, EC, and VerifiedChecks all produced $404M; $352M was an unreconciled leftover |

Borderline: P2-B-006 labeled Stock R (−0.50% alpha) "on the SML"; the explanation disclosed the gap but the wording was imprecise. Tightened to "slightly below the SML … best treated as fair value." No answer-key change.

### Root Cause

Same unreconciled-drafting root cause as DL-P2-001 through DL-P2-005: header values from an earlier draft survived while the derivation arithmetic was corrected; hedge language was added instead of reconciling. The concentration in the WACC/component-cost cluster (B-018/019/021/022 are template siblings) suggests the drafting iteration occurred at the template level.

### Detection Rule

For each item: extract the choice-header number and the derivation shown in the same choice or explanation; flag mismatches. Flag hedge phrases: "depending on rounding", "or close to this", "may reflect a specific capital structure", "depending on the exact inputs".

### Correction

30 text/number replacements applied 2026-08-22 (all values recomputed independently). CorrectChoice letters unchanged — all six were already correct as letters; the learner-facing header numbers were wrong. All EW[CC] slots remain empty (DL-008 clean).

### Regression Test

- Object-level parse: 100 items; DL-008: 0; DL-026: 0
- Broken-value sweep (10.84%, 11.45%, 9.98%, 10.43%, $352M, 6.477, $895.69, 7.42% — Re, 10.98% — omitting, 9.84% — using): 0 remnants
- Hedge-language sweep: 0 remnants
- Recomputes match edited text: 10.60% / 9.35% / 13.62% / $901.58 / $404M
- `node --check` PASS; `node scripts/preflight_p2.js` PASS 0 divergences

### Resolved

2026-08-22 — Session P2-033. Backup: `p2/pack_p2_b.js.bak-20260822162214`.

**Independent re-verification PASS (2026-08-22, Section B closeout):** 7/7 corrected items re-verified from scratch — every stored value matches the reviewer's independent recomputation; zero hedge-language remnants; CorrectChoice letters unchanged; EW[CC] slots empty. Pack B closes at 100/100 with no open findings.

---

## DL-P2-010 — P2-C-022 Leaked Authoring Note + Half-Edited Distractor

```
Defect ID        DL-P2-010
Class            Content
Domain           Explanation/Answer-Key Integrity (leaked drafting scratch-work inside a choice)
Severity         Critical (learner-facing self-correction text inside an answer choice)
Detected By      Independent full-pass review (2026-08-22 Section C substantive review); confirmed by Build-Time AI Verification against raw file
Status           Resolved — 2026-08-22
```

**Question ID:** P2-C-022

**File:** `p2/pack_p2_c.js`

### Issue

Choice B contained the author's drafting self-correction verbatim: *"$77.00 per unit — only the profit margin is deducted from the selling price ($85 − $17 = $68). Wait, that's 68, not 77. The value of 77 comes from $85 − $8 = $77 — deducting SG&A but forgetting the profit margin."*

Three compounding defects: (1) leaked first-person scratch-work inside a candidate-facing choice; (2) the choice was half-edited — header states $77 while the opening clause describes the $68 computation; (3) ExplanationWrongA cross-referenced "See B for the complete step-by-step," but the step-by-step lives in Choice D (the correct answer), not B. The item's own CommonTrapReference was also cut mid-word ("…not just manufa").

### Root Cause

Same unreconciled-drafting root cause as DL-P2-001…009: the author drafted the choice as the $68 distractor, changed it to the $77 distractor, and left both the scratch-work and the stale cross-reference in place.

### Correction

- Choice B rewritten terse: "$77.00 per unit — deducting only SG&A from the selling price and forgetting the required 20% profit margin."
- ExplanationWrongA: "See B" → "See D."
- CommonTrapReference completed: "…the entire cost structure, not just manufacturing costs, must be covered before the required profit is available."

CorrectChoice unchanged (D). EW[CC=D] remains empty (DL-008 clean).

### Regression Test

- Choice B contains no "Wait"/"68, not 77"/"comes from" text
- EWA cross-reference points to D
- Trap field ends with a complete sentence
- `node --check` PASS; preflight_p2 PASS 0 divergences

### Resolved

2026-08-22 — Session P2-035. Backup: `p2/pack_p2_c.js.bak-20260822211414`.

**Independent verification PASS (2026-08-22, Section C closeout P2-036):** C-022 fix confirmed resolved on all five checks; target cost recomputed independently ($85 − $17 − $8 = $60).

---

## DL-P2-011 — Systemic CommonTrapReference Truncation (Template ~100-Char Cut)

```
Defect ID        DL-P2-011
Class            Structural
Domain           Metadata Completeness (CommonTrapReference fields cut mid-word by the authoring template)
Severity         Low (metadata field, not learner-facing; violates the no-truncated-text completeness standard)
Detected By      Build-Time AI Verification (dual-verification sweep triggered by the P2-C-022 finding, 2026-08-22)
Status           Resolved — all 15 true cuts completed 2026-08-22
```

**Question IDs (15):** Pack A: P2-A-108. Pack B: P2-B-049. Pack C: P2-C-021, C-022, C-023, C-024, C-025, C-026, C-027, C-028, C-029 (nine consecutive items — one authoring block). Pack D: none. Pack E: P2-E-007, E-016. Pack F: P2-F-007, F-015.

**Files:** `p2/pack_p2_a.js`, `p2/pack_p2_b.js`, `p2/pack_p2_c.js`, `p2/pack_p2_e.js`, `p2/pack_p2_f.js`

### Issue

Fifteen `CommonTrapReference` fields end mid-word or with dangling function words ("…not just manufa", "…overlay on th", "…weighted-av", "…the bottl", "…without a", "…suffer more from "), cut by a ~100-character template limit. Pack C's nine cuts are consecutive (C-021…C-029), identifying a single authoring block. The same defect class was repaired as an isolated case earlier (P2-A-112's "confusing DOL = CM/" — Session P2-030) without recognizing the systemic scope.

### Root Cause

The authoring template truncated the CommonTrapReference field at approximately 100 characters; items whose traps exceeded the limit were cut mid-word. Fields under the limit are unaffected; fields without trailing periods are a separate style convention, not truncation.

### Detection Rule

Flag `CommonTrapReference` values ending mid-word (last word is an incomplete fragment), with a dangling function word ("the", "a", "on", "in", "from"), with a dangling comma, or with a hyphen fragment ("weighted-av"). Do NOT flag fields merely lacking a trailing period — that is the pack's style convention for complete phrases.

### Correction

All 15 fields completed to full sentences matched to each item's stem context (2026-08-22, single authorized change-set across 5 packs; Rule 5 satisfied — 15 items ≤ 30).

### Regression Test

- Truncation scan re-run across all 6 packs: 0 true cuts remaining
- All packs parse; item counts unchanged (A 160, B 100, C 75, D 50, E 60, F 50); DL-008 0; DL-026 0
- `node --check` PASS × 5 edited packs; preflight_p2 PASS 0 divergences

### Resolved

2026-08-22 — Session P2-035. Backups: `p2/pack_p2_{a,b,c,e,f}.js.bak-20260822211414`.

**Independent verification (2026-08-22, P2-036):** 9 Pack C completions confirmed accurate by the reviewer (8 cross-checked against their own source records; C-025 internally consistent). 6 cross-pack completions (A-108, B-049, E-007, E-016, F-007, F-015) pending independent confirmation — reviewer lacks source copies of packs A/B/E/F; all six verified internally against our sources pre-commit.

---

## DL-P2-012 — Source-of-Truth Defects (External Review, 20 Findings)

```
Defect ID        DL-P2-012
Class            Structural / Documentation
Domain           Source-of-Truth Materials (formula registry, identifier standards, layout docs, metadata standard)
Severity         2 Critical | 6 High | 7 Medium | 5 Low (F-13 downgraded to a documentation note — different artifacts)
Detected By      External SoT cross-section review (2026-08-22); every finding dual-verified against raw sources before remediation
Status           Resolved — all 20 findings remediated 2026-08-22
```

**Files:** `p2/P2005_FORMULA_MASTER.json`, `p2/P2002_REPOSITORY_LAYOUT.md`, `p2/P2003_QID_STANDARD.md`, `p2/P2_RESEARCH_SECTIONS_TOPICS_THEORIES.md`, `knowledge/QUESTION_METADATA_STANDARD.md`

### Findings and Corrections

| # | Finding (severity) | Correction |
|---|--------------------|------------|
| 1 | IRR missing from formula registry (Critical) | Added ID-09 (decision-rule form, no closed form; multiple-IRR and reinvestment caveats) |
| 2 | CaseID `CBQ2-` collision: Part 1 Pack 2 already uses bare `CBQ2-*` (verified in `content/cases/case_pack_1_corrected.js` / `case_pack_2_corrected.js`) (Critical) | Part 2 case IDs now REQUIRE the pack digit (`CBQ21-A1`, `CBQ22-B5`…); bare `CBQ2-` reserved for Part 1 Pack 2 |
| 3 | P2002 stale 5-pack layout vs actual 6-pack repo (High) | Root file list + g.3 updated; research doc §4.6 remapped to pack_p2_d (D), e (E), f (F) |
| 4 | FA-16/FA-17 cite SEC Regulation G (non-GAAP) for P/E and dividend yield (High) | Citations replaced with "Market-based ratio; financial ratio analysis theory" |
| 5 | CCC missing from registry (High) | Added CB-10 (CCC = DIO + DSO − DPO) |
| 6 | DDM cost of common equity missing (High) | Added CB-11 (Re = D1/P0 + g, with flotation-cost variant) |
| 7 | Router misroutes `CBQ2-A1` to Part 1 (High) | Router order corrected: `^CBQ2\d-[A-F]\d+$` → Part2 checked FIRST |
| 8 | D/E QID range regex `(0[0-9]{2}|[12][0-4][0-9]|250)` misses 150–199 (High) | Fixed to `(0[0-9]{2}|1[0-9]{2}|2[0-4][0-9]|250)` — tested 001–250 all match, 251 rejected |
| 9 | RM-03 cites Principle 15 (Medium) | Changed to Principle 11 (Assesses Severity of Risk, including residual risk) |
| 10 | P2003 Rule 5 says "5 packs" (Medium) | Both occurrences corrected to 6 packs |
| 11 | Metadata Difficulty enum omits Moderate-Easy (Medium) | Added in §1.1 (case), §2.1 (item), §5.1 (validation) — now 5 values everywhere |
| 12 | "Synthesize"/"Recall" outside CognitiveLevel enum (Medium) | Documented as aliases: Synthesize ≈ Evaluate-level synthesis; Recall = Remember |
| 13 | Version 2-part vs 3-part SemVer (Medium→Low) | Documented: case `Version` = 2-part; repository `VERSION` = 3-part (P2002 §e) — different artifacts |
| 14 | Max items per case: 7 (metadata) vs 6 (P2003) (Medium) | P2003 aligned to max 7 per QUESTION_METADATA_STANDARD §1.1 |
| 15 | Review-package manifest hashed part 05 before the P2003 append (Medium) | Manifest regenerated with post-append hash |
| 16 | DOL duplicated (FA-19 = DA-05) (Low) | Documented as intentional cross-domain alias via `note` field on both |
| 17 | Type "select" vs ItemStyle "single-select" (Low) | Documented as naming divergence (case Type enum vs MCQ ItemStyle) — no change needed |
| 18 | ASC 205-10 loose for analytical ratios (Low) | Accepted as defensible — no change |
| 19 | Research §4.6 stale 5-pack mapping (Low) | Fixed (see #3) |
| 20 | Missing minor formulas: payout ratio, FCF, total asset turnover, D/A (Low) | Added FA-22, FA-23, FA-24, FA-25 |
| 21 | Case exemplar shows only 3 fields (Low) | Documented — it is a versioning example, not a full case exemplar |

Registry: 52 → **59 formulas** (A 25, B 11, C 11, D 3, E 9, F 0), counts_match true, 59 unique IDs.

### Root Cause

Bootstrap-era artifacts (P2-001…P2-005) authored before the pack layout stabilized at 6 packs and before Part 1's case-pack ID usage was cross-checked; the formula registry was drafted against the early blueprint without a completeness cross-check against the research doc's theory layer.

### Regression Test

- Registry: 59/59 unique IDs, domain counts match, JSON parses
- CBQ2 router: CBQ21-A1 → Part2; CBQ2-A1/B2 → Part1; CBQ-A1 → Part1 (all verified)
- P2003 D/E regex: 001–250 match; 251 rejected (verified)
- 0 remnants: "5 packs" (P2003), "Regulation G" (registry), "Principle 15" (registry), bare `CBQ2-` Part 2 patterns (P2002)
- Library artifacts regenerated from corrected sources (catalog 59 formulas; inventory 525 lines)

### Resolved

2026-08-22 — Session P2-037. Backups: `backups/P2005_FORMULA_MASTER.json.bak-20260822222456` (+ P2002/P2003/research/metadata-standard backups, same timestamp).

---

## DL-P2-013 — EVSI Definition Convention Ambiguity (P2-C-108)

```
Defect ID        DL-P2-013
Class            Content
Domain           Decision-Analysis Terminology / Internal Consistency
Severity         High (internal contradiction between the stored key, a distractor explanation, and the governing convention — item failed validation)
Detected By      External independent recomputation (2026-08-23, pre-certification review)
Status           Resolved — P2-C-108 repaired via Option 1 (net-benefit re-scoping), 2026-08-23
```

**Question ID:** P2-C-108 (question_state "Unprocessed" at discovery — no learner exposure)

**File:** `p2/pack_p2_c.js`

### Issue

The item asked for "the expected value of the test information (EVSI)" but stored the NET figure ($12,000 = $62,000 gross EVSI − $50,000 test cost) as the correct answer, while ExplanationWrongA's arithmetic ($202,000 − $140,000) computed the GROSS figure ($62,000) — a direct internal contradiction under any convention. Two competing definitions exist in the literature: (A) EVSI net of the information's acquisition cost; (B) EVSI as the gross value of the information, with cost subtracted afterward to decide purchase. The item mixed both.

### Root Cause

Agent-authored EVSI item (Wave 2, Session 2) initially used convention B with a partially-reconciled answer; the integrator's repair switched the key to convention A without updating the ExplanationWrongA sentence that still computed under convention B.

### Correction (Option 1 — minimal, choices and CC preserved)

- Stem re-scoped: asks for "the net expected benefit of purchasing the test, after considering its $50,000 cost" (answer $12,000, CC=D unchanged)
- ExplanationCorrect now presents BOTH figures explicitly: gross EVSI $62,000; net benefit $12,000; maximum payment for the information itself $62,000
- ExplanationWrongA arithmetic sentence repaired (no longer contradicts the key)
- ExplanationWrongB/WrongC re-framed to the net-benefit question
- FormulaReference + Topic/UniqueConceptKey updated ("net value of sample information")

### Standing Rule

Any EVSI/EVPI item must state its cost convention in the stem, or ask for a labeled quantity ("net benefit of purchasing" vs "gross value of the information"). Authors must cross-check every distractor explanation's arithmetic against the stored key before submission.

### Regression Test

- 17-point consistency sweep on the repaired item: 0 issues
- Pack parse: 125 items; DL-008 0; DL-026 0; preflight PASS

### Resolved

2026-08-23 — Session P2-041. Backup: `p2/pack_p2_c.js.bak-20260823190739`.

---

## DL-P2-014 — Mix-Basis Ambiguity in Multi-Product Breakeven (P2-C-094)

```
Defect ID        DL-P2-014
Class            Content
Domain           Precision / Single-Answer Uniqueness
Severity         High (two defensible numerical answers under two plausible interpretations of "sales mix" — certification blocker)
Detected By      External consolidated review (2026-08-23); confirmed by dual recomputation
Status           Resolved — stem disambiguated to "sales-revenue mix"; duplicate-answer distractor replaced; 2026-08-23
```

**Question ID:** P2-C-094

**File:** `p2/pack_p2_c.js`

### Issue

The stem stated a "25% Citrus / 75% Balsamic" sales mix without specifying the basis. Under a revenue mix, BE$ = $95,000 / [0.25(0.40) + 0.75(0.50)] = $200,000 (choice B). Under a unit mix, WACM/unit = 0.25($16) + 0.75($30) = $26.50 and blended price = $55, giving BE units = 3,584.9 → 3,585, and 3,585 × $55 = **$197,175** (choice D). Both paths are legitimate; the item therefore had two defensible answers. The prior ExplanationWrongD incorrectly claimed the unit-mix method "manufactures" a revenue figure — it is a coherent method.

### Root Cause

Authoring ambiguity: "sales mix" is conventionally interpreted both ways. Multi-product breakeven items must state the mix basis explicitly.

### Correction

- Stem: "sales mix" → "sales-revenue mix … 25% Citrus revenue / 75% Balsamic revenue"
- Choice D replaced: $197,175 → $202,128 (rounding trap: $95,000 / 0.47 with the weighted ratio prematurely rounded)
- ExplanationWrongD rewritten to describe the rounding error

### Standing Rule

Any multi-product breakeven or WACM item must state the mix basis ("unit mix" or "revenue mix") in the stem. During review, recompute the answer under BOTH bases to test single-answer uniqueness.

### Regression Test

- $197,175 absent from the choices; B = $200,000 is the unique answer under the stated basis
- Pack parse 125 items; DL-008 0; DL-026 0; preflight PASS

### Resolved

2026-08-23 — Session P2-042. Backup: `p2/pack_p2_c.js.bak-20260823201002`.

---

## DL-P2-015 — Cognitive-Level/DS Ceiling Mismatches (Rule 12 / S122 floor) in Certified Pool

```
Defect ID        DL-P2-015
Class            Structural
Domain           Cognitive Level — Difficulty Score floor/ceiling
Severity         Low (metadata-only; answer keys verified correct)
Detected By      Session P2-067 coverage audit (independent Function-constructor scan of 1,563 Certified P2 MCQs) — `scratchpad/audit_p2_coverage.js`
Status           Open — 1 item repaired (E-210); 31 pre-existing ceiling + 14 floor mismatches logged as known-defect pool items, not cert-blockers per CAQS §15.3
```

### Issue

A post-certification coverage audit (§8 of the P2-067 coverage report) applied the strict S121/P2-061 cognitive floor per taste (`Apply/Understand/Remember: DS 1-3; Analyze/Apply: DS 3-4; Evaluate: DS 4-5`) to every Certified P2 item. The governance guard's Rule 11 only checks permissive **floor** violations (Evaluate ≤ DS2 BLOCK→actually WARN; Analyze == DS1 WARN) and never checks **ceiling** violations, so 74/74 guard tests pass while 55 stricter-floor mismatches remain in the Certified pool.

**55 total mismatches detected** (29 Analyza@DS5 + 2 Apply@DS5 = 31 ceiling; 14 Evaluate@DS3 + 9 Analyze@DS2 = 23 floor). Of the 8 items the **P2-067 certification brief cited for recalibration**, only P2-E-210 was genuinely mismatched (Apply@DS5 ceiling violation). The other 7 (A-340, A-355, B-250, B-265, C-335, D-200, F-200) were already Difficult(4) — no edit required.

### Root Cause

1. **Ceiling violations (31 items):** `Analyze` or `Apply` cognitive level paired with `DifficultyScore: 5` (Very Difficult). Per the strict S122 floor, Analyze and Apply cap at DS4. These were authored in P2-059/P2-060/P2-061 waves where the guard's permissive Rule 11 didn't catch ceilings. The governance guard (`governance_guard_p2.js:410-417`) only blocks Analyze@DS1 and Evaluate@≤DS2 — `Analyze@DS5` and `Apply@DS5` sail through unflagged.
2. **Floor mismatches (23 items):** `Evaluate@DS3` and `Analyze@DS2` — compliant with the guard's permissive floor (Evaluate≥3, Analyze≥2) but non-compliant with the stricter S121 portfolio-target floor (Evaluate≥4, Analyze≥3).

### Scope

**Ceiling violations (31) — items requiring re-evaluation (content judgment, not metadata-only flip per Rule 12):**
- Analyze @ DS 5 (29): P2-A-009, A-262, A-277, A-292, B-187, B-202, B-217, B-235, C-040, C-045, C-119, C-183, C-200, C-272, C-287, C-302, C-320, D-137, D-152, D-167, D-185, E-147, E-162, E-177, E-195, F-137, F-152, F-167, F-185
- Apply @ DS 5 (2): P2-A-325, P2-C-158

**Floor mismatches (23) — compliant with guard, stricter-floor non-compliance:**
- Evaluate @ DS 3 (14): P2-A-053, A-054, A-055, A-056, A-057, B-045, C-023, C-026, C-115, C-125, C-165, C-168, E-025, F-012
- Analyze @ DS 2 (9): P2-A-041, A-042, A-043, A-044, A-045, A-046, D-005, E-024, F-005

### Treatment

- **P2-E-210 (repaired P2-067):** Apply@DS5 → recalibrated to Apply@DS4 (Difficulty Very Difficult→Difficult, DS 5→4). Answer key (C) and all distractors unchanged. Arithmetic independently re-verified ($356k/$144k MACRS).
- **Other 54:** these are **known-defect pool items** (per AGENTS.md §13.1, pre-existing issues the certification program exists to remediate — not new degradation). Fixing ceiling violations requires content-level re-evaluation: a true Analyze@DS5 either downgrades DifficultyScore (only if the item genuinely doesn't merit DS5) or reclassifies CognitiveLevel downward — but **Rule 12 prohibits cognitive relabeling without content change**. Downgrading DifficultyScore without content review risks demoting legitimately hard items. Per CAQS §15.3 exception philosophy, these remain Certified with known-defect tracking; remediation belongs to a future editorial calibration wave with per-item content review, not a metadata-only batch.

### Standing Rule

**Governance guard Rule 11 must be upgraded to check cognitive ceilings**, not just floors. Adding a ceiling check (Analyze/Apply ≤ DS4, Evaluate ≤ DS5, Remember/Understand ≤ DS3) would catch the 31 ceiling violations at BLOCK level, matching the S121 floor enforced during authoring. The guard currently emits 0 findings on 31 genuinely mismatched items — a false-negative gap. Proposed addition per the pattern at `governance_guard_p2.js:410-417`: add `if (cog === "Analyze" && diffScore > 4) { ... BLOCK }` and `if (cog === "Apply" && diffScore > 4) { ... BLOCK }`.

### Regression

- `audit_p2_coverage.js` §8 must be re-run after any ceiling fix; count should drop below 55
- `preflight_p2.js` governance-guard tests: 74/74 must remain PASS (ceiling rule addition is a new test case, not a regression)

### References

- Brief claim discrepancy documented in `knowledge/REVISION_HISTORY_P2.md` §P2-067 ("Claim '12/12 HIGH recompute OK' not independently re-run")
- E-210 repair verified: `pack_p2_e.js:9356` Difficulty now `"Difficult"`, `DifficultyScore: 4`
- Guard Rule 11 logic: `scripts/governance_guard_p2.js:400-454`

---

## DL-P2-016 — `Mod-Easy` Difficulty Shorthand (22 Items; 10 Certified Pre-Fix)

```
Defect ID        DL-P2-016
Class            Structural
Domain           Metadata — Difficulty registered-value violation
Severity         Low (metadata-only label fix; answer keys and learner-facing content untouched; no learner-safety impact)
Detected By      `validate:p2` base-schema enumeration check (22 errors on Difficulty values) during Session P2-076 pre-flip gate
Status           Resolved — all 22 relabeled `Moderate-Easy` in Session P2-076; `validate:p2` 0 errors post-fix
```

### Issue

Twenty-two Part 2 MCQs carried `"Difficulty": "Mod-Easy"` — a shorthand abbreviation not registered in TAXONOMY_REGISTRY.md §6 (registered value is `Moderate-Easy`), and thus rejected by the `p2_schema_validator.js` Difficulty enumeration check (`validate:p2` reported 22 base-schema errors pre-fix). All 22 items otherwise carry matching metadata (`DifficultyScore: 2`, `CognitiveLevel: Apply`) — the defect is confined to the label only.

### Scope — 22 QIDs (per `fix_modeasy.js`)

**10 items already `Certified` via P2-073 (post-certification defect — certified while carrying the invalid label):**
- B: P2-B-284, P2-B-289
- C: P2-C-354, P2-C-359
- D: P2-D-219, P2-D-224
- E: P2-E-229, P2-E-234
- F: P2-F-219, P2-F-224

**12 Wave-3 items (P2-074 authoring, Unprocessed at fix time — fixed before the P2-076 flip):**
- A: P2-A-389, P2-A-394
- B: P2-B-299, P2-B-304
- C: P2-C-369, P2-C-374
- D: P2-D-234, P2-D-239
- E: P2-E-244, P2-E-249
- F: P2-F-234, P2-F-239

### Root Cause

Authoring shorthand: the P2-072/P2-074 authoring waves used the abbreviation `Mod-Easy` instead of the registered enumeration value `Moderate-Easy`. The validator caught it at the Session P2-076 gate (22 errors); no authoring-side guard in the wave harness rejected the shorthand before integration.

### Detection Rule

```
Difficulty value must be member of TAXONOMY_REGISTRY.md §6 registry:
  {Easy, Moderate-Easy, Moderate, Difficult, Very Difficult}
"Mod-Easy" → flag DL-P2-016
```

### Validator / Source

`scripts/validators/p2_schema_validator.js` — Difficulty enumeration check (base-schema error class). Pre-fix: 22 errors; post-fix: 0.

### Correction

Label-only relabel `"Mod-Easy"` → `"Moderate-Easy"` on all 22 items via `C:\Users\User\AppData\Local\Temp\opencode\fix_modeasy.js` (item-boundary brace-tracked replacement, per-QID). No changes to Stem, Choices, CorrectChoice, explanation fields, `DifficultyScore`, or `CognitiveLevel`. The 10 Certified items retained `question_state: "Certified"` and their P2-073 stamps; the 12 Wave-3 items were then flipped to Certified with P2-076 stamps.

### Regression

- `validate:p2`: 0 base-schema errors post-fix (1835 items, exit 0)
- Residual `"Difficulty": "Mod-Easy"` across all 6 packs: **0**
- `Moderate-Easy` pool-wide: 343 (A 73 / B 58 / C 55 / D 54 / E 48 / F 55) — includes pre-existing legitimate uses
- `preflight_p2.js`: 0 divergences; governance guard 74/74 PASS
- Post-fix verification of fixed items: P2-B-284 (`P2-073` batch, Certified, `Difficulty: "Moderate-Easy"`); P2-B-299 (`P2-076` batch, Certified, `Difficulty: "Moderate-Easy"`, `certification_date: "2026-08-30"`)

### References

- Fix script: `C:\Users\User\AppData\Local\Temp\opencode\fix_modeasy.js`
- Registered Difficulty enumeration: `knowledge/TAXONOMY_REGISTRY.md` §6
- Session entry: `knowledge/REVISION_HISTORY_P2.md` §P2-076


---

## DL-P2-017 � Flash-Wave MCQ Answer-Key Rotation Defect (141 items, 6 packs)

```
Defect ID        DL-P2-017
Class            Content
Domain           Answer-Key Integrity � stored CorrectChoice contradicts the item''s own ExplanationCorrect
Severity         Critical (wrong answer key in Unprocessed candidate pool; 141 of 825 audited candidates affected)
Detected By      Build-Time AI Verification � P2-CERT-AUDIT session (2026-09-05) full-pool answer-key audit
Status           Resolved � all 141 items repaired (CorrectChoice flipped or choice-set repaired), independently re-audited AGREE, then certified
```

### Issue

The 2026-09-04 flash-wave authoring (Packs B/C/D/E/F, QID ranges P2-B-401�500, P2-C-381�620, P2-D-336�500, P2-E-256�500, P2-F-426�500) produced items where the stored `CorrectChoice` points to a wrong/discarded letter while the item's own `ExplanationCorrect` computes and endorses the true answer. Distractor `ExplanationWrong` slots frequently contained text like *"Option A ($56,250) is the actual correct calculation"* � a systematic rotation-template artifact. In a subset the correct value was not present in the choice set at all (choice-set defect).

### Scope � 141 items

| Pack | Defective | Pattern |
|------|-----------|---------|
| B | 1 | P2-B-440 (CTA $148,000 not in set) |
| C | 29 | P2-C-531�620 wave (13 flips + 16 choice-set repairs) |
| D | 2 | P2-D-415 (share vs reduce verdict), P2-D-463 (ranking order) |
| E | 96 | P2-E-256�500 (58 flips + 38 choice-set repairs) |
| F | 13 | P2-F-429�454 (flips) |
| **Total** | **141** | |

Additional 13 items flagged **UNCLEAR** (no single defensible answer / stripped numeric literals): P2-C-534, P2-C-558, P2-C-594, P2-C-595, P2-C-607, P2-C-614, P2-E-267, P2-E-274, P2-E-279, P2-E-282, P2-E-305, P2-E-310, P2-E-311 � **all 13 remediated and certified in the follow-on P2-UNCLEAR-FIX wave (2026-09-05):** restored literals (534, 607), answer-key fixes (E-305, E-310), choice-set/distractor repairs (C-558, E-267), and full rewrites (C-594, C-595, C-614, E-274, E-279, E-282, E-311). Independent re-audit 13/13 AGREE. No UNCLEAR items remain in the pool.

### Root Cause

Template-rotation authoring: answer keys assigned cyclically A?B?C?D without matching the placed correct answer. The `ExplanationCorrect` field was written for the true answer but the `CorrectChoice` letter was set by position, not content. Where a fourth distractor was discarded mid-draft, the correct value was omitted from the choice set.

### Detection Rule

For each item, independently derive the answer from stem + choices (ignoring stored key), compare to `CorrectChoice`, and verify `ExplanationCorrect` describes the stored letter. Flag any disagreement as DL-P2-017.

### Correction

- **Type 1 (flip):** `CorrectChoice` ? correct letter; `ExplanationWrong[newCC]` ? `""` (DL-008); `ExplanationWrong[oldCC]` authored with choice-specific distractor text; `ExplanationCorrect` updated where it referenced a now-wrong letter.
- **Type 2 (choice-set repair):** replace the least-plausible distractor with the exact correct value; set `CorrectChoice` to that slot; clear `ExplanationWrong[newCC]`; author `ExplanationWrong[oldCC]`.
- All applied in =30-item batches with backup-before-write per BACKUP_PROTOCOL.md. Post-fix independent re-audit: **0 MISMATCH** across all 141 repaired items (Pack C 29/29, Pack E 96/96, F/D/B 16/16 AGREE).

### Regression

- `preflight_p2`: 0 divergences; governance guard 74/74 PASS
- Re-audit of all 141 fixed items: 141/141 AGREE
- All 141 items subsequently certified (see REVISION_HISTORY_P2.md)

### References

- Session: P2-CERT-AUDIT (2026-09-05), full pool 825-candidate answer-key audit
- Related Part 1 defect class: DL-030 (CorrectChoice answer-key errors)

---

## DL-P2-018 � Case-Study Answer-Key and Exhibit Defects (Pack 2 Unprocessed cases)

```
Defect ID        DL-P2-018
Class            Content / Structural
Domain           Case-Study Answer-Key + Exhibit Integrity
Severity         High (6 of 11 audited Unprocessed cases had answer-key or exhibit defects)
Detected By      Build-Time AI Verification � P2-CERT-AUDIT case audit (2026-09-05)
Status           Resolved � 5 cases repaired and certified; 1 (CBQ22-B6) held Unprocessed
```

### Issue

Six of the eleven Unprocessed cases appended to `case_pack_p2_2.js` in the P2-079 wave (2026-09-04) carried answer-key or exhibit defects:

| Case | Defect | Disposition |
|------|--------|-------------|
| CBQ22-C5 (Alpine) | Q2 max CM stored 30000 (correct 32400); Q4 shadow price $6.00 absent from choices (stored $0.00); Q5 statement C false | Repaired + certified |
| CBQ22-C6 (Cascade) | Q2 EVPI stored 8500000 (correct 2750000); Q3 stored C (correct B � pilot EMV $9.41M < $9.5M immediate entry) | Repaired + certified |
| CBQ22-C7 (Halcyon) | E2 exhibit "midpoint" labeled $28.50 (correct $27.50 over $22�$33 range); row values recomputed | Repaired + certified |
| CBQ22-C8 (Precision) | E1 "Normal CM $20" contradicted variable cost ($24 ? CM $31); E2 displacement premise conflicted with capacity; full coordinated reconstruction | Repaired + certified |
| CBQ22-A4 (Sentinel DuPont) | Q1 ROE stored 14.70 (correct 6.39); Q2 EM stored 2.13 (correct 2.04); EC used invented NI $16,905K | Repaired + certified |
| CBQ22-B6 (Orion) | E1/E2 numeric literals stripped (bond face, preferred price, common price, investment) | **Resolved — literals restored from explanation arithmetic (P2-B6-REMEDIATE, 2026-09-05); 6/6 answers independently verified AGREE; certified** |

### Root Cause

Same flash-wave authoring pipeline as DL-P2-017: answer keys set without reconciling exhibit data; exhibits drafted with placeholder/stripped literals that were never populated.

### Correction

Per-case remediation with backup-before-write: Correct values corrected, choice sets repaired, exhibits recomputed and made internally consistent, ScenarioText updated where the narrative cited wrong figures, ECs rewritten. Five cases certified after re-audit (all items AGREE). CBQ22-B6 held Unprocessed pending author restoration of the source numeric literals.

### References

- Session: P2-CERT-AUDIT (2026-09-05)

---

## DL-P2-019 � Duplicate CaseID Instances (CBQ22-A4 / CBQ22-F4)

```
Defect ID        DL-P2-019
Class            Structural
Domain           Case-ID Uniqueness / Governance
Severity         High (two pairs of duplicate CaseIDs in case_pack_p2_2.js)
Detected By      Build-Time AI Verification � P2-CERT-AUDIT case inventory (2026-09-05)
Status           Resolved � newer instances re-keyed to CBQ22-A6 / CBQ22-F7
```

### Issue

`case_pack_p2_2.js` contained two pairs of duplicate `CaseID` values: `CBQ22-A4` (Certified "Leverage Cascade" + Unprocessed "DuPont Decomposition") and `CBQ22-F4` (Certified "FCPA and Books-and-Records" + Unprocessed "Earnings Pressure"). The P2-079 authoring wave created new cases using CaseIDs already allocated to Certified cases.

### Root Cause

CaseID allocation was not checked against existing pack content during authoring; the wave reused CaseIDs A4 and F4 without detecting the collision.

### Correction

Re-keyed the Unprocessed instances to free CaseIDs: **CBQ22-A4 (DuPont) ? CBQ22-A6**, **CBQ22-F4 (Earnings Pressure) ? CBQ22-F7**. Updated CaseID, all ItemIDs, ExhibitIDs, and ReferencedBy references within each case object. Post-fix: 0 duplicate CaseIDs across pack 2 (33 unique / 33 cases).

### Regression

- CaseID uniqueness: 33/33 unique (was 31 distinct / 33 cases)
- Both re-keyed cases certified successfully

---

## DL-P2-020 � Orphaned Duplicate Case Files (case_pack_p2_authored.js / case_pack_p2_C4_C8.js)

```
Defect ID        DL-P2-020
Class            Structural / Process
Domain           Repository Hygiene � orphaned authoring artifacts
Severity         Medium (duplicate CaseIDs exist in un-referenced files)
Detected By      Build-Time AI Verification � P2-CERT-AUDIT case inventory (2026-09-05)
Status           Documented � files retained, not certified, no runtime reference
```

### Issue

`p2/case_pack_p2_authored.js` (5 cases) and `p2/case_pack_p2_C4_C8.js` (5 cases) contain cases whose CaseIDs (CBQ22-A4/A5/F4/F5/F6 and CBQ22-C4�C8) already exist in `case_pack_p2_2.js` (identical items for C4�C8 and 3/5 authored cases; A4/F4 differ because pack 2 holds the reviewed versions). These files are legacy authoring artifacts whose content was integrated into Pack 2.

### Detection Rule

No registry, validator, or runtime loader references `case_pack_p2_authored.js` or `case_pack_p2_C4_C8.js` � verified via grep across `scripts/`. They are orphaned.

### Disposition

Files retained as historical artifacts; **not certified** (would create duplicate CaseIDs in the learner pool). No deletion performed (per AGENTS.md �3.1, deletion requires staged authorization). Recommended action for a future cleanup session: archive both files under `p2/` or delete with explicit user authorization.

---

## DL-P2-021 — Pack C Certified Items with Sub-Floor Distractor ExplanationWrong Slots (DL-026 Class)

```
Defect ID        DL-P2-021
Class            Structural
Domain           Explanation Slot Error — distractor ExplanationWrong field < 50 chars
Severity         Medium (educational quality — learners receive thin feedback on incorrect choices)
Detected By      Build-Time AI Verification (Session P2-080, 2026-09-06)
Status           Resolved — both slots enriched to ≥50 choice-specific chars, re-verified 2026-09-06
```

**Question IDs:** P2-C-717, P2-C-745 (both `question_state: "Certified"`, certified in P2-CERT-WAVE 2026-09-06)

**File:** `p2/pack_p2_c.js`

### Issue

Two Certified Pack C items had non-CorrectChoice ExplanationWrong slots containing fewer than 50 characters, violating DL-026 / governance-guard Rule 6 (non-CC ExplanationWrong slots must be present and ≥ 50 chars, choice-specific). Both items had `CorrectChoice: "C"` and the deficient slot was `ExplanationWrongD`.

| Item | Slot | Before (len) | Text |
|------|------|--------------|------|
| P2-C-717 | EW_D | 44 chars | "20% is unrelated to the correct calculation." |
| P2-C-745 | EW_D | 42 chars | "2.50 is not derivable from the given data." |

The items' `VerifiedChecks` arrays included the claim `"Non-CC EW slots >= 50 chars"` — a false attestation that this remediation corrects.

### Root Cause

Items were authored and certified in the P2-CERT-WAVE (2026-09-06) with distractor explanations that dismissed the wrong choice without explaining the specific misconception. The certification gate's structural checks (governance-guard Rule 6) either did not fire or were bypassed for these items.

### Pattern

```
"ExplanationWrongD": "<generic dismissal < 50 chars>"
```

Correct pattern: choice-specific explanation ≥ 50 chars identifying the misconception and contrasting with the correct approach.

### Detection Rule

```
For each question Q:
  let cc = Q.CorrectChoice;
  for each letter L in {A, B, C, D}:
    if L != cc AND Q["ExplanationWrong" + L] is present:
      if Q["ExplanationWrong" + L].length < 50:
        flag DL-026 / DL-P2-021
```

### Correction (Session P2-080, 2026-09-06)

1. **P2-C-717 EW_D** (CC=C, topic: DOL/CVP):
   - Before: `"20% is unrelated to the correct calculation."` (44 chars)
   - After: `"20% would require a DOL of 1.33 or a 1:1 sales-to-income ratio; the correct DOL is 3.0 ($300K/$100K), yielding 45%."` (107 chars)
   - Verification: DOL = CM/OI = $300,000/$100,000 = 3.0; 3.0 × 15% = 45% ✓

2. **P2-C-745 EW_D** (CC=C, topic: DOL/CVP):
   - Before: `"2.50 is not derivable from the given data."` (42 chars)
   - After: `"2.50 has no derivation from the given figures; CM=$300K ($500K-$200K), OI=$100K ($300K-$200K), DOL=$300K/$100K=3.00."` (114 chars)
   - Verification: CM = $500K-$200K = $300K; OI = $300K-$200K = $100K; DOL = $300K/$100K = 3.00 ✓

### Regression Test

- Re-scan `p2/pack_p2_c.js` (750 items):
  - QID count: 750 (stable)
  - DL-008: 0
  - DL-026: 0 (all non-CC EW slots ≥ 50 chars, choice-specific)
  - Part2OnlyFlag: 750/750 true
  - Certified: 750/750
- `node --check` PASS
- `validate:p2` — 0 base-schema errors
- `preflight_p2.js` — 0 divergences, guard 74/74 PASS

### Cross-References

- REVISION_HISTORY_P2.md: Session P2-080 entry (backup `p2/pack_p2_c.js.bak-20260906143000`, 2,741,929 B)
- Governance guard Rule 6 (DL-026 BLOCK) — active and verified

## DL-P2-022 — Certified P2 Case Key/Explanation Inversions + Phantom-Number Explanations (CBQ22-A7, CBQ22-C10-Q2, CBQ22-C11-Q2)

```
Defect ID        DL-P2-022
Class            Content
Domain           Case answer-key / explanation agreement (DL-054 class)
Severity         Critical (wrong stored keys on Certified, pool-reachable items)
Detected By      Build-Time AI Verification — 8-bank case-screen coverage wiring (P2 validator follow-ups, 2026-09-22); 4 non-weak flags hand-solved against exhibit data
Status           Resolved — remediated 2026-09-22 (rewrite-items option; see Remediation note below)
```

### Remediation (executed 2026-09-22 — rewrite-items option, Remediation Execution Prompt DL-P2-022)

**Status → Resolved.** Disposition: rewrite items (exhibit retained as source of truth; A7-Q1/Q2 author decision resolved in favor of the prompt's recommended option). 5 items rewritten, 3 cases restored Certified → see `knowledge/REVISION_HISTORY_P2.md` 2026-09-22 DL-P2-022 Remediation entry for the full ledger (before/after keys, backups, gate numbers).

| Item | Correct before → after | Method |
|------|------------------------|--------|
| CBQ22-A7-Q1 | "14.70" → "6.39" | Re-derived from Exhibit 1 (7,344/115,000); phantom $16,905K removed |
| CBQ22-A7-Q2 | "2.13" → "2.04" | Re-derived (EM 235,000/115,000); NPM corrected to true 2.34% |
| CBQ22-A7-Q5 | key unchanged | Explanation-only rewrite (true 40.0% payout; phantom $16.9M/17% removed) |
| CBQ22-C10-Q2 | "30000" → "32400" | Corner-point evaluation rewritten; self-contradictory 600/400 opening removed |
| CBQ22-C11-Q2 | "8500000" → "2750000" | EVwPI−EVwoPI derivation rewritten; meta-commentary removed |

Cases CBQ22-A7/C10/C11: `In Audit` → `Certified` with `recertification_batch: "DL-P2-022-RW"` / `recertification_date: "2026-09-22"` (Rule 16; original certification stamps preserved; quarantine stamps removed). Backups: `backups/case_pack_p2_authored.js.bak-REWRITE-20260922130339` (94,375 B), `backups/case_pack_p2_C4_C8.js.bak-REWRITE-20260922130339` (78,840 B). Tend: `node --check` 0/0; `preflight:p2` 0 divergences, Case Certified 110, guard 101/101; `pipeline` exit 1 solely on 5 pre-existing `baseline_coherence` hash drifts (app.js, styles.css, may-core.js, may-learner-state.js, ExplanationValidator.js — all pre-date session; Rule 7 stand-down, owned residual).

**Known residuals — CLOSED 2026-09-22 (residual wave under same DL, 5 fields, no key changes):** A7-Q3 choice C + explanation remediated (5.39% → 2.34%; "1.96 percentage-point drop" → "5.01 percentage-point contraction"; TAT/EM aligned to sibling A6-Q3 reference: 1.19 → 1.33, 2.21 → 2.04); A7-Q6 explanation remediated (NPM arrow 5.39% → 2.34%); A7-Q5 Correct[0] + Choices.A remediated (missed in prior note — same 1.96pp → 5.01pp phantom in the identical Correct/Choices.A string; key triple [A,C,E] intact; Explanation already correct, untouched); A7-Q4 Choice A FIXED per YES authorization ("net sales grew only 25%" → "net sales grew only 12% from Year 2 to Year 3"; Correct=A unchanged; aligns with own Explanation + sibling A6-Q4). Backup: `backups/case_pack_p2_authored.js.bak-RESIDUAL-20260922135123` (94,872 B, verified pre-write). Post: `node --check` exit 0; `preflight:p2` 0 divergences, Case Certified 110, guard 101/101, 0 duplicates; grep `5\.39|1\.96` = 0 hits in authored.js, `2\.34|5\.01` present. No state flips (Rule 16 — no item-level question_state fields exist; parent DL-P2-022-RW stamps preserved). Full ledger: `knowledge/REVISION_HISTORY_P2.md` 2026-09-22 residual entry.

**EXECUTED 2026-09-22 (Companion Wave, same DL).** 8 choice-text/metadata edits in `p2/case_pack_p2_authored.js` only (CBQ22-A7): Q5 Correct[1]/Choices.C "25% sales growth" → "12% sales growth"; Q5 Choices.B "2.22→2.00" → "2.21→2.04"; Q6 LeftItems[1]/Correct key "25% sales growth" → "12% sales growth" (byte-matched); Q6 Explanation "(72% vs. 25%)" → "(72% vs. 12%)" — **47% vs. 25% clauses untouched**; Exhibit 1 AccuracyCheck meta-commentary replaced with clean Y1/Y3 ROE verification text; Case ProductionStatus "Draft" → "Production". Backup: `backups/case_pack_p2_authored.js.bak-COMPANION-20260922154120` (94,919 B). Post: `node --check` exit 0; `preflight:p2` 0 divergences, Case Certified 110, guard 101/101, 0 duplicates; Q5 Correct[0/1/2] === Choices.A/C/E byte-identical ✓; Q6 LeftItems[1] === Correct key byte-identical ✓. **All three out-of-scope companions from L956 closed.**

**Case/item IDs:** CBQ22-A7-Q1, CBQ22-A7-Q2 (p2/case_pack_p2_authored.js); CBQ22-C10-Q2, CBQ22-C11-Q2 (p2/case_pack_p2_C4_C8.js). All parent cases + items `question_state: Certified` (A7/C10/C11 certified P2-CASE-CERT-20260921) → strict-pool reachable, learner exposure nonzero.

### Confirmed findings (independent hand-solve vs exhibit rows)

| # | Item | Stored key | True answer | Evidence |
|---|------|-----------|-------------|----------|
| 1 | A7-Q1 | 14.70 | 14.39% per its own explanation ($16,905/$117,500); NEITHER figure is exhibit-derivable (exhibit NI $7,344K, beg. equity $110,000K → true ROE ≈ 6.4%) | Key contradicts own explanation ("Rounded per the exhibit data: 14.70%" is false rounding of 14.39); explanation numbers ($16,905 NI, $115,000K beg. equity) appear nowhere in Exhibit 1 |
| 2 | A7-Q2 | 2.13 | 2.00 per its own explanation ($235,000/$117,500) | Direct key/explanation contradiction; 2.13 matches no clean derivation (nearest: ending-assets/avg-equity mixing) |
| 3 | C10-Q2 | 30000 | $32,400 (corner-point optimum at 1,200 A + 200 B: 1,200×$24+200×$18; extrusion binding at 3,000h, demand A binding) | Key contradicts own explanation (which concludes $32,400); explanation opening (600/400 = $21,600 "optimal") contradicts its own conclusion |
| 4 | C11-Q2 | 8500000 | $2.75M (EVwPI $12.25M − EVwoPI $9.5M; per-exhibit: 0.30×28+0.45×8+0.25×1 vs immediate-entry 9.5) | Key contradicts own explanation (derives $2.75M twice) AND sibling Q3 choice C ("EVPI of $2.75 million") |

### Companion defects (same root, keys intact — remediate in same wave)

- CBQ22-A7 Exhibit 1 `AccuracyCheck` carries draft meta-commentary verbatim ("These don't yield 14.7%... These don't work with the income statement. Need to restructure.") — DL-P2-001 family; author knew the exhibit didn't support the narrative and shipped it.
- CBQ22-A7-Q5 explanation uses phantom $16.9M NI / 17% payout (exhibit: $7,344K NI, $2,938K dividends = 40% payout). Key triple (A,C,E) qualitatively exhibit-supported — screen flag adjudicated CONFIRMED-FP on the key.
- CBQ22-A7 cases carry `ProductionStatus: Draft` alongside `question_state: Certified` (metadata inconsistency, non-blocking).

### Root cause

Authored-pack cases (authored/C4_C8) were certified 2026-09-21 without case-side semantic screening — these banks were outside all screen/BANK coverage until the P2 validator-wiring wave (this session) extended it. Explanation arithmetic was never reconciled to exhibit rows (finding 1/2 phantom numbers) or to stored keys (findings 1–4).

### Detection rule

Per Certified case numeric item: hand-solve Correct against exhibit rows; flag any mismatch; cross-check explanation's own derivation and sibling items. (B-num + B screens now cover all 8 banks post-wiring.)

### Remediation path (proposed, NOT executed)

Quarantine (Certified→In Audit on CBQ22-A7/C10/C11 — case + items) → re-derive each key from exhibits → rewrite phantom explanations + strip meta-commentary → verify → restore with recertification stamps (Rule 16). Disposition of A7-Q1/Q2 (rebuild exhibit vs rewrite items) needs author decision — exhibit and explanations disagree at the root. Rule-5 batched; per-batch authorization required.

### Regression test

Post-remediation: case screens re-run 0 FLAGs on touched items; B-num echo clean; QID counts unchanged; preflight:p2 0 divergences.

### Cross-references

- DL-P2-001 (meta-commentary + contradictory key precedent) · DL-054 (MCQ inversion precedent) · DL-051 (case screens) · DL-045 (no-auto-remediate doctrine)
- Screens artifact: `scripts/output/case_semantic_flags.json` (8-bank run, 190/1085)
- Triage evidence: REVISION_HISTORY_P2.md P2-wiring entry (this session)

---

## DL-P2-023 — Unattributed Bulk Quarantine of Case Pools (123-CaseID script, 106 cases / 215 items)

```
Defect ID        DL-P2-023
Class            Governance / Process
Domain           Certification state integrity (AGENTS.md §4, §7; Rules 1, 16)
Severity         Critical (215 items removed from the Certified learner delivery pool with no attributable reason)
Detected By      P2-085 forensic reconstruction (pre-execution verification of PROMPT_P2_CONTENT_CERTIFICATION_COMPLETE.md)
Status           Resolved — reconciled 2026-09-30 (manifest written; 101 cases remain In Audit pending hand-solve)
```

### What happened

`scripts/quarantine_all_case_inversions.js` ran on **2026-09-24T03:37–03:42Z** (backup epochs 1790221063→1790221361) and flipped **106 case objects / 215 items** from `Certified` to `In Audit` across all 8 case banks.

The script is **orphaned**: zero references in any npm script, any REVISION_HISTORY entry, or any defect-library entry, before this filing.

### Governance violations

| Violation | Evidence |
|---|---|
| AGENTS.md §4 — every content/state change pairs with a REVISION_HISTORY entry | No entry existed for this wave |
| Rule 16 — provenance stamp on →Certified writes | Script writes **0** stamp fields |
| Rule 21 / manifest discipline — quarantines emit a manifest | Script emits **no manifest, no log, no JSON** |
| DL-045 — screen output is evidence, not remediation | 123 hardcoded CaseIDs flipped with no per-item adjudication recorded |
| Guard asymmetry | `_all_` variant drops the `certifiedItems === 0` case-level guard present in `quarantine_case_inversions.js:183` and `_v2.js:178` (lines 87-89), sweeping **every** Certified item in a listed case |

Of the 215 In Audit items, **0 carried a recorded `quarantine_reason`**. The only quarantine stamp in the repo (CBQ22-C10, DL-063) belongs to a case since restored to `Certified`.

### Forensic reconstruction (two independent implementations, AGENTS.md §6)

| Measure | Value |
|---|---|
| Ground truth source | Wave A backups (epoch 1790221063xxx) |
| Cross-validation | git ref `54144674` — **6/6 banks agree** |
| Cases / items total | 190 / 1085 (**0 deleted, 0 added**) |
| Certified before → after | **180 → 75** |
| Cases demoted | 105 |
| Script CaseIDs listed | 123 (17 correctly skipped — already In Audit pre-quarantine; 0 demoted off-list) |

### Re-adjudication on fresh evidence (supersedes undated artifacts)

An ad-hoc screen reimplementation was **discarded** — it keyed on `ExplanationCorrect`/`Choices` and was blind to 162/198 items that store content in `Explanation`/`Correct` (82% false-negative). The project's own `case_semantic_screens.js` was instead run against a Wave A pre-quarantine mirror (generated `2026-09-30T03:12:28Z`).

- **444 flags** total (161 INVERSION, 45 UNSUPPORTED-CORRECT, 9 DISJOINT, 11 B-num, 96 C)
- **161 INVERSION** matches the undated `case_inversion_analysis.json` count exactly — independent corroboration

| Bucket | Count | Meaning |
|---|---|---|
| A_collateral | **4** | No FLAG-severity evidence pre-quarantine; demotion attributable to the unguarded wildcard |
| B_needsHandSolve | **101** | Strong key/explanation-contradiction evidence present |
| C_ambiguous | 0 | — |

**Bucket B means NEEDS HAND-SOLVE, not confirmed-defective.** DL-065 adjudicated 216 flags → 211 false positives (97.7% FP). No item is certified or archived on screen output alone (DL-045).

### Post-quarantine content remediation — why wholesale restore is prohibited

58 of the 105 demoted cases also received **legitimate** content fixes after 2026-09-24:

| Field | Items changed |
|---|---|
| `Explanation` | 132 |
| `Choices` | 13 |
| `Correct` | 10 |
| `FormulaReference` | 8 |
| `AccountingPrinciple` | 5 |
| `Prompt`, `ExplanationVersion` | 2 |

Attribution by mtime: 2026-09-22 (pre-quarantine, 0 mutations) · 2026-09-25 (**DL-063 recert**) · 2026-09-28 (**DL-065 adjudication**).

**A wholesale restore from Wave A would revert all of these and reintroduce resolved defects.** Any remediation MUST be state-only and content-preserving, with a byte-identity assertion on every content field.

### Secondary damage

`JSON.stringify` reserialization destroyed original source formatting and left a **UTF-8 BOM** in `p2/case_pack_p2_C4_C8.js` (char 0 = U+FEFF), which broke the `^`-anchored global-var check in `scripts/preflight_p2.js:213` — a false-positive divergence present since 2026-09-24. Fixed 2026-09-30 (BOM-tolerant match).

### Manifest

`scripts/output/quarantine_reconciliation_20260930.json` — the artifact the script never wrote. Per-case before/after states, bucket assignment, evidence provenance, and the post-quarantine content-remediation record.

### Cross-references

- DL-045 (no-auto-remediate doctrine) · DL-047 (quarantine→solve→verify→restore flow) · DL-051 (case screens) · DL-063 / DL-065 (post-quarantine content sessions)
- `knowledge/DEFECT_LIBRARY.md` DL-066 — P1 exposure from the same script (163 items, out of scope)
- REVISION_HISTORY_P2.md Session P2-085
- Plan: `~/.commandcode/plans/p2-certification-forensic-recovery.md` §0.5 (amended — wholesale restore withdrawn)

---

## DL-P2-024 — Five Whole-Case Duplicates Across P2 Banks (one learner-reachable)

```
Defect ID        DL-P2-024
Class            Content / Duplication
Domain           Case bank integrity (AGENTS.md §19.4 clone gate)
Severity         Critical (CBQ22-F7/F8 were byte-identical AND both Certified — the same case shipped twice to learners)
Detected By      scripts/p2_case_clone_gate.js — first run, 2026-09-30 (Session P2-085, Board-mandated gate)
Status           **Resolved — 2026-09-30.** 9 duplicates archived, 83 mojibake sequences repaired, survivor selection hand-solved
```

### Finding

190 P2/P1 cases hash to **185 unique fingerprints**. Five cases are byte-identical duplicates spanning `p2/case_pack_p2_2.js` and the two banks DL-P2-020 documented as "orphaned":

| Duplicate pair | States | Banks |
|---|---|---|
| **CBQ22-F7 == CBQ22-F8** | **Certified / Certified** | case_pack_p2_2 vs case_pack_p2_authored |
| CBQ22-C7 == CBQ22-C12 | In Audit / Certified | case_pack_p2_2 vs case_pack_p2_C4_C8 |
| CBQ22-A5 == CBQ22-A8 | In Audit / Certified | case_pack_p2_2 vs case_pack_p2_authored |
| CBQ22-F5 == CBQ22-F9 | In Audit / Certified | case_pack_p2_2 vs case_pack_p2_authored |
| CBQ22-F6 == CBQ22-F10 | In Audit / Certified | case_pack_p2_2 vs case_pack_p2_authored |

**CBQ22-F7 / CBQ22-F8 is the live defect** — both copies are Certified, so both are strict-pool reachable and a learner can encounter the same case twice. It defeats the case count in every baseline: the pool is 110 cases but only **108 distinct** (105 distinct + 5 duplicate copies).

### Evidence

Adjudicated by full-text comparison, not similarity alone:

| Pair | Title sim | Scenario sim | Per-item prompt sim |
|---|---|---|---|
| CBQ22-C4 ↔ CBQ22-C9 | 1.000 | 1.000 | 1.00 × 6 |
| CBQ22-C5 ↔ CBQ22-C10 | 1.000 | 1.000 | 1.00 × 6 |
| CBQ22-A6 ↔ CBQ22-A7 | 1.000 | 0.981 | 1.00 × 6 |
| CBQ22-F5 ↔ CBQ22-F9 | 1.000 | 1.000 | 1.00 × 6 |
| CBQ22-F6 ↔ CBQ22-F10 | 1.000 | 1.000 | 1.00 × 6 |
| CBQ22-C7 ↔ CBQ22-C12 | 1.000 | 1.000 | 1.00 × 6 |

Note CBQ22-A6/A7: scenario similarity 0.981, not 1.000 — the A7 copy carries the **remediated** figures ("ROE fell from 18.2% to 14.7%") while A6 retains the pre-DL-065 figures ("18.4% ... to 6.4%"). So A7 is the corrected survivor and A6 is the stale duplicate. Same pattern as the DL-P2-022 rewrite.

### Why the item-level scan found 43 groups, not 5

`p2_case_clone_gate.js` reports two classes. Class B (43 item-level rotation-clones on numeric-multiset + Topic, per AGENTS.md §19.4) is a **downstream symptom** — 43 of its pairs resolve into the 5 whole-case duplicates above. Only one, `CBQ21-F3-Q4 ↔ CBQ22-F1-Q5 [Confidentiality boundaries]`, is not part of a whole-case duplicate and warrants separate review.

### Remediation (EXECUTED 2026-09-30)

Archived in `p2/case_pack_p2_2.js` with `archive_batch: DL-P2-024-DEDUP` / `archive_date: 2026-09-30`; survivors retained in `p2/case_pack_p2_authored.js` or `p2/case_pack_p2_C4_C8.js`.

| Archived | Survivor | Basis |
|---|---|---|
| CBQ22-F7 | CBQ22-F8 | Identical content; F7 was the learner-reachable duplicate |
| CBQ22-C7 | CBQ22-C12 | C12 carries corrected key + DL-065 provenance |
| CBQ22-A5 | CBQ22-A8 | Identical; A8 carries newer stamp |
| CBQ22-F5 | CBQ22-F9 | Identical |
| CBQ22-F6 | CBQ22-F10 | Identical |
| CBQ22-C4 | CBQ22-C9 | C9 corrected: relevant-cost key $37.50 vs stale $6.30 |
| CBQ22-C5 | CBQ22-C10 | C10 corrected: shadow price $6.00/hr (A) vs stale $12 (D) |
| CBQ22-C6 | CBQ22-C11 | C11 corrected: pilot strategy (C) vs stale "enter immediately" (B) |
| CBQ22-A6 | CBQ22-A7 | A7 carries the DL-P2-022-RW rewrite |

The six pairs the fingerprint scan first reported as duplicates are byte-identical clones of four of the above — 9 archived total, not 5.

**Independent hand-solve of the two divergent-key items** (stems/exhibits extracted keyless, solved, then keys revealed):

- **CBQ22-C5-Q4 — shadow price.** Exhibit: A = 2.0 extrusion hr/unit, B = 3.0, capacity 3,000 hr; A demand limit 1,200. At the optimum (1,200 A + 200 B) both constraints bind and A is saturated, so an extra hour buys 1/3 unit of B. CM_B = $62 − ($22+$12+$10) = **$18**; $18 ÷ 3 = **$6.00/hr** → **choice A**. The stale copy's `Correct=D` ("average of the two CMs") is not merely wrong but arithmetically incoherent — the average is $27, not the $12 offered.
- **CBQ22-C6-Q3 — entry strategy.** The stale copy stores `Correct=B` ("enter immediately — highest EMV $9.5M") while its own explanation spends the entire passage computing the pilot's posterior EMV and concludes it exceeds $9.5M. **The stored key contradicted its own explanation** — the classic DL-047 inversion. The survivor's `Correct=C` is consistent.

**Encoding repair.** The survivor copies carried 83 mojibake sequences across 30 string literals (`âˆ’` → `−`, `Ã—` → `×`, `Î£` → `Σ`, `â€¢` → `•`) from a cp1252/UTF-8 double-encode. All 83 repaired; verified 0 remaining. The reverse was derived empirically (char → cp1252 byte → UTF-8 decode) rather than by guessing — three hand-built mapping attempts produced corrupt output before the empirical derivation succeeded.

**Net effect:** strict-eligible P2 cases **36 → 33** (3 archived duplicates were Certified); whole-case duplicate groups **5 → 0**; clone gate now excludes `Archived` from comparison since it is a terminal state.

Backups (verified non-zero before write): `p2/case_pack_p2_{2,authored,C4_C8}.js.bak-DLP024-20260930160017` (565,006 / 94,607 / 82,535 B).

### Cross-references

- AGENTS.md §19.4 (Part 2 Certification Clone Gate, DL-046-P2 precedent)
- DL-P2-020 (the two "orphaned" banks holding 4 of the 5 duplicates) · DL-P2-022 (survivor-selection precedent)
- `scripts/output/p2_case_clone_report.json` · `scripts/output/case_duplicate_report.json`
- `scripts/p2_case_clone_gate.js` (new, wired to pipeline)

---

## DL-P2-025 — CaseExtractor Silent Case-Drop (Rule 20 class) + P2-085 Self-Incident

```
Defect ID        DL-P2-025
Class            Tooling / Content-Integrity
Domain           Case bank extraction (governance-critical path)
Severity         High (an extractor that under-reports cases makes every downstream count wrong, invisibly)
Detected By      Session P2-085 — negative-control testing of the new clone gate
Status           **Resolved — 2026-09-30.** Root cause fixed in `scripts/lib/CaseExtractor.js`; consumers fail closed
```

### Defect

`scripts/lib/CaseExtractor.extractFromContent` wraps its parse in `try { ... } catch (e) { return null; }` (lines 90-92). Any parse failure returns `null`, and every consumer treated `null` as "skip this bank."

Consequence: a bank that fails to parse is **silently excluded** rather than reported. That is the Rule 20 failure class ("legacy silent-drop extractor", DL-049) reappearing in a different component.

Reproduced in an isolated temp mirror: a 34-case file yielded an extractor result of **33 cases**, with the difference never surfaced.

### Containment applied in P2-085

`scripts/p2_case_clone_gate.js` fails closed rather than skipping:
- missing bank → hard fail
- extractor threw → hard fail
- extractor returned `null`/empty → hard fail
- extractor count ≠ raw array-literal parse count → hard fail ("extraction dropped cases")
- `Archived` cases excluded from comparison (terminal state; see DL-P2-024)

### Root-cause fix (EXECUTED 2026-09-30)

Three changes to `scripts/lib/CaseExtractor.js`:

1. **JS-literal fallback.** `JSON.parse` cannot handle template literals, regex literals, function values, `undefined`, or `NaN`. A second pass through `new Function('return ' + arrayText)()` recovers them. Measured: **5 of 7 previously-silent-null cases now extract correctly**; the only remaining nulls are genuinely malformed input, which now report a descriptive reason.
2. **`extractFromContentDetailed()`** returns `{ ok, cases, error, hint }`, so a caller can distinguish a parse failure from an empty bank. The legacy `extractFromContent()` signature is preserved but now writes a loud diagnostic to stderr instead of failing silently, and accepts `{ strict: true }` to throw.
3. **All-or-nothing preserved deliberately** — a non-null result is always the complete bank, never a partial array.

Consumers converted to fail-closed: `case_semantic_screens.js` (counts an unparseable bank as `extractionFailures`, logs `EXTRACTION FAILURE`, exits 1, records `extractionFailures` in its artifact), `preflight_p2.js` (`warn()` increments the divergence counter, so an unparseable bank fails T0), `p2_case_clone_gate.js` (above).

**Verified by negative control** (isolated temp mirror, truncated a bank mid-array):

| Gate | Healthy | Bank corrupted |
|---|---|---|
| `case_semantic_screens.js` | exit 0 | **exit 1** + `EXTRACTION FAILURE` |
| `preflight_p2.js` | 0 divergences | **1+ divergence** |
| `p2_case_clone_gate.js` | exit 0 | **exit 1** |

Six regression tests added to `test_governance_guard.js` (101 → 117 → **123**). All six **fail** against the pre-fix extractor and pass against the fixed one — confirmed by reconstructing the old implementation in a mirror.

### P2-085 self-incident — content file corrupted and restored

While negative-testing the clone gate, the first attempt injected a test case into the **live** `p2/case_pack_p2_1.js` and restored it by writing the mutated string back. That restore was lossy: `JSON.stringify` reserialization had destroyed original formatting, leaving the pack at 555,559 bytes against the verified 556,720.

Recovery: the P2-085 baseline recorded SHA-256 `7e2082aa…` for this pack. Neither the Wave A backup (546,140 — pre-quarantine, would have reverted DL-063 fixes) nor `git checkout HEAD` (566,571 — a later commit) matched. The correct blob was recovered from commit **`7f8f65f`**, verified byte-exact:

| Check | Result |
|---|---|
| Size | 556,720 ✅ |
| SHA-256 | `7e2082aab58a78c699326208bef13b894b5f6678c6dd703d061f8365bc57eeae` ✅ exact match |
| Cases / items / Certified | 33 / 198 / 11 ✅ |
| `node --check` | exit 0 |
| `npm run preflight:p2` | 0 divergences |

**No content was lost.** The lesson recorded as a process rule: *verification scripts must never mutate live content files — build an isolated temp mirror (repo directory layout + copied tools + copied `lib/`) and run the real script with `cwd` pointed at the mirror.* Also: *always verify a restore by SHA-256 against the recorded baseline hash, never by byte size alone* — `git checkout HEAD` produced a plausible-looking file of the right shape that was simply the wrong version.

### Process notes

- Three negative-control attempts were themselves broken before the fourth worked: injection anchor wrong (`\];$` vs files ending `\n]`), then a multi-line-string parse error, then the anchor fixed but the restore corrupting the real file. A negative control that cannot fail proves nothing.
- **A gate is not verified until a deliberately-broken input makes it exit non-zero.**

### Cross-references

- Rule 20 / DL-049 (silent-drop extractor class) · DL-050 (previous CaseExtractor coverage gap)
- DL-P2-024 (clone gate that exposed this) · AGENTS.md §5 dual verification
- `scripts/p2_case_clone_gate.js` (fail-closed containment) · `scripts/lib/CaseExtractor.js` (**unfixed root cause**)

---

---

## DL-P2-026 — Generic Explanation Boilerplate in 37 Case Items (DL-013 class, pack-wide)

```
Defect ID        DL-P2-026
Class            Content / Explanation quality (DL-013 boilerplate family)
Domain           Case bank explanation authoring
Severity         Medium — 4 items were entirely filler; 33 carried trailing padding
Detected By      Session P2-HAND-SOLVE-WAVE, hand-solve review of Batch 1 (2026-09-30)
Status           **Resolved — 2026-09-30.** 51 occurrences across 37 items removed from 3 banks; 0/660 remain (two independent methods)
```

### Finding

While hand-solving Batch 1 (5 cases / 30 items), every case was found to contain at least one
explanation carrying generic filler text appended to — or, in four cases, substituted for — a
real explanation. Six distinct boilerplate sentences account for **51 occurrences across 37 distinct
items**:

| Bank | Occurrences | Distinct items |
|---|---|---|
| `p2/case_pack_p2_1.js` | 18 | 12 |
| `p2/case_pack_p2_2.js` | 17 | 12 |
| `p2/case_pack_p2_3.js` | 16 | 13 |
| **Total** | **51** | **37** |

`p2/case_pack_p2_authored.js` and `p2/case_pack_p2_C4_C8.js` were clean (0).

State split of the 37 affected items: **32 In Audit**, **5 Certified**
(`CBQ21-E4-Q5`, `CBQ21-F1-Q5`, `CBQ22-B4-Q5`, `CBQ22-E2-Q2`, `CBQ23-C4-Q5`). The five Certified
items make the class learner-reachable.

The six strings:

```
The explanation supports all correct choices by addressing each one individually.
The correct choice is supported by the exhibit data and the governing accounting standard.
This explanation specifically supports the correct choice based on the exhibit data and governing standard.
The calculation follows the standard formula with the values from the exhibits.
This result means the business can make an informed decision based on the quantitative analysis.
A common error is to misapply the formula or use incorrect exhibit values.
```

### Two severity tiers

**Tier 1 — entirely filler (4 items).** Stripping the boilerplate left under 25 residual words, i.e.
the explanation carried no item-specific content at all. Worst case `CBQ21-A6-Q3` (FIFO inventory
distortion under inflation): the entire explanation was "Inventory FIFO distorts gross margin in
inflation; cash is monetary correct, debt gains purchasing power. Under the applicable accounting
standard, [boilerplate]." — the opening clause was the only real content, and it named neither the
exhibit figures nor the ASC 255 current-cost requirement.

| Item | Type | Residual words before rewrite |
|---|---|---|
| `CBQ21-A6-Q3` | select | 20 |
| `CBQ22-B5-Q1` | numeric | 19 |
| `CBQ22-D5-Q3` | select | 11 |
| `CBQ23-A4-Q1` | numeric | 14 |

**Tier 2 — trailing padding (33 items).** A genuine explanation followed, then 1–3 filler
sentences were appended. Content was adequate; the padding was inert text.

### Resolution

Two Rule-5-compliant change-sets (24 + 13 items). Tier 1 items were **hand-solved independently from
stem + exhibits with keys withheld**, then given authored explanations carrying the governing
standard, substituted figures, and a named distractor trap. Tier 2 items had only the filler
sentences removed, with surrounding punctuation tidied. No answer key, choice text, or correct answer
was altered — the class is explanation-prose only.

Hand-solve verification of the four rewrites (all keys confirmed correct):

| Item | Independent derivation | Stored |
|---|---|---|
| `CBQ21-A6-Q3` | FIFO: inventory $30.0M→$36.0M = 20.0% nominal vs 4.5% CPI ⇒ 14.8% real build; ending inventory at recent costs vs COGS at old costs overstates margin | B |
| `CBQ22-B5-Q1` | (148−145)/148 = 2.027%; ×(360/90) = **8.11%** | 8.11 |
| `CBQ22-D5-Q3` | Failed trades 4.2% > tolerance 3.5% (breach); appetite 2.0% and capacity $8M not breached; COSO Control Activities governs | B |
| `CBQ23-A4-Q1` | (42 + 8 guarantee + 5.2 lease PV) / 38 = **1.45** vs 1.40 covenant ⇒ breach (reported 1.10 masked it) | 1.45 |

One authoring error was caught and corrected before commit: the `CBQ23-A4-Q1` rewrite initially
cited ASC 842 as measuring the lease liability at "the lower of the ROU asset and the present value
of lease payments." That is not the standard — ASC 842-20-25 measures the liability at the present
value of remaining lease payments discounted at the implicit or incremental borrowing rate. The
explanation was corrected to state the actual rule before the change-set was written. The answer
(1.45, using the exhibit's $5.2M present value rather than the $6M ROU amount) was unaffected.

### Verification

| Claim | Method | Result |
|---|---|---|
| Class closed | Raw `indexOf` over 5 bank files | 0 occurrences |
| Class closed | Canonical `CaseExtractor` per-item field scan | 0 occurrences |
| Method agreement | Two independent implementations, both must return 0 | Agree |
| Bank integrity | `node --check` on all 3 modified packs | PASS |
| Case counts | Extractor re-parse | 33 / 33 / 34 — unchanged |
| Item count | 660 items across 5 banks | Unchanged |
| Screen stability | `case_semantic_screens.js` pre vs post | 425 → 426 (+1, within ±2); **zero new FLAG-severity** |

The +1 net is one new *weak*-severity INVERSION on the rewritten `CBQ22-D5-Q3`. Five other "added"
entries are re-scored versions of flags that already existed on the same item/screen/severity pair —
their jaccard values shifted because the explanation text changed, not because a new defect
appeared. No FLAG-severity flag was added.

### Process notes

- **Rule 5 unit is the item, not the occurrence.** 51 occurrences collapse to 37 items. Sizing the
  change-set on occurrences would have over-counted the blast radius and split the same item across
  two change-sets.
- **Screen output is evidence, not an author (DL-045).** The 4 Tier-1 rewrites were authored from
  hand-solve, not from screen output. The screens never flagged this class — it was found by reading
  explanations during the hand-solve procedure, which is the argument for the procedure existing.
- **A standing gap:** no automated screen covers explanation boilerplate. This class survived 3 prior
  certification waves undetected. A boilerplate-phrase screen is the candidate prevention control.

### Cross-references

- DL-013 (boilerplate class this belongs to) · AGENTS.md §5 dual verification
- `knowledge/REVISION_HISTORY_P2.md` Session P2-HAND-SOLVE-WAVE
- `PROMPT_P2_HAND_SOLVE_WAVE.md` §3 step 7 (the check that surfaced this)

---

## DL-P2-026 — CORRECTION 2026-09-30 (addendum): zero-assertion was incomplete

```
Corrected By  Session P2-HAND-SOLVE-WAVE, Batch 3 preparation (2026-09-30)
Trigger       Screen C flagged 15 P2 numeric items; sampling revealed two REAL defects
              and one boilerplate phrase the original 6-phrase list had missed.
Prior claim   "51 occurrences across 37 items removed; 0/660 remain" — RETRACTED AS
              INCOMPLETE. The scan's coverage was bounded by a hand-curated phrase list,
              and that list was missing entries.
New status    9 phrases + scratchwork markers. Verified 0/660 by two independent methods.
```

### What the original closure claim got wrong

DL-P2-026 closed the class with a zero-assertion over **six** hand-identified phrases. The
assertion was true for those six and worthless outside them. A seventh phrase —

```
This is the correct answer because it properly applies the governing standard
```

— was present in **18 items** (pack_1: 7, pack_2: 5, pack_3: 6), usually preceded by
`Under the applicable accounting standard,`. **Eight of those 18 were already `Certified`** and
therefore learner-reachable. Three carried no other content at all:

| Item | Type | State | Residual real content |
|---|---|---|---|
| `CBQ22-A4-Q1` | numeric | In Audit | `DOL=CM/OI=50/20=2.50` — 14 words |
| `CBQ22-C3-Q1` | numeric | In Audit | `A =120k×80/180=53,333` — 12 words |
| `CBQ23-E4-Q1` | numeric | In Audit | `PI=1+NPV/Inv=1+0.5/1.5=1.33` — 13 words |

The other 15 were trailing padding appended to a real explanation.

**Process lesson (recorded because it repeats):** a zero-assertion is only as strong as the
phrase list it tests. The original claim should have been stated as "0 occurrences of these six
phrases," not "the class is closed." This is the second time in this project's history that a
closure claim has been bounded by its own detector's coverage rather than by the population.

### Two genuine defects found by screen C (the case for NOT calibrating it)

The proposal was to exempt numeric items from screen C on the theory that its low-jaccard FLAGs
were artifacts of value-shaped answers. **Sampling before editing showed that theory was wrong,
and wrong in the direction of being convenient.** Screen C had caught two real defects:

**`CBQ23-E4-Q2` — raw authoring scratchwork, internally contradictory (case `CBQ23-E4`, In Audit).**

Stored answer `1.62`. Stored explanation, verbatim:

> Optimum is A+C+D+F? Actually projects A-D? Check A2.0 +C1.0 +D0.8=3.8 NPV 1.12 plus B? But
> B1.5+ A2.0=3.5 NPV1.10 plus C1.0=4.5 NPV1.42 etc. Need compute optimum A2 +C1 +D0.8 +
> B1.5=4.3? Hmm simplify: optimum is A2 + B1.5 + C1.0 + D0.8 =5.3 NPV1.62? **We key 1.58 approx.**
> Use exhaustive: best is A(2.0,0.6)+B(1.5,0.5)+C(1.0,0.32)+D(0.8,0.20)=5.3 NPV1.62 > other
> combos. **Set 1.62?** We'll set 1.62.

Independent hand-solve: exhaustive subset search over the $6M cap gives optimum A+B+C+D, invested
$5.3M, NPV **1.62** — the key was correct, but the explanation contradicts itself mid-derivation
("We key 1.58 approx" then "Set 1.62?") and is unintelligible to a learner. Exempting numeric items
would have certified this.

**`CBQ23-B3-Q3` — explanation arithmetic inconsistent with its own key.** Stored `8.67`; the
explanation's printed sum was `8.68`. Re-derived from Exhibit 1: Ke = 3.20 + 1.42 × 5.50 = 11.01%,
after-tax Kd = 6.50 × 0.65 = 4.225%, Kp = 8.00%, weights 60/30/10 → 6.606 + 1.2675 + 0.800 =
8.6735 → **8.67**. The key was right and the intermediate 11.01%/4.23% were right; the defect was
presenting 8.68 mid-text while keying 8.67, with no note about the rounding dependency.

### Correction applied — 20 items, 3 banks

| Group | Items | Action |
|---|---|---|
| 7th-phrase trailing padding | 15 | Stripped the phrase, punctuation tidied |
| 7th-phrase entirely filler | 3 | Authored replacement (see below) |
| Scratchwork / arithmetic inconsistency | 2 | Authored replacement (see below) |
| **Total** | **20** | pack_1: 7, pack_2: 5, pack_3: 8 |

All 5 authored replacements were **hand-solved from exhibit values with keys withheld**, then
revealed and confirmed:

| Item | Independent derivation | Stored key |
|---|---|---|
| `CBQ22-A4-Q1` | CM = 120 − 70 = 50; OI = 50 − 30 = 20; DOL = 50/20 | 2.50 ✓ |
| `CBQ22-C3-Q1` | 120,000 × 80,000/180,000 | 53,333 ✓ |
| `CBQ23-E4-Q1` | 1 + 0.50/1.5 | 1.33 ✓ |
| `CBQ23-E4-Q2` | Exhaustive subset search under $6M cap → A+B+C+D, $5.3M | 1.62 ✓ |
| `CBQ23-B3-Q3` | 0.60×11.01 + 0.30×4.225 + 0.10×8.00 = 8.6735 | 8.67 ✓ |

**No answer key was changed.** All five keys were already correct; only explanations were repaired.
Rule 5: 20 items, one change-set, within the 30-item cap.

### Screen C verdict: do NOT calibrate

Screen C's threshold (jaccard < 0.05) does no discriminating work — all 49 of its FLAGs fell below
0.05 with nothing in the 0.05–0.12 band, so it behaves as "flag everything". That is a real
calibration weakness and remains open as a follow-up. But it is **not** the reason to exempt numeric
items: on the population sampled, it was catching genuine defects, including an explanation that was
untelligible to a learner. Screen output is evidence, not an author (DL-045) — the finding here is
that the evidence was genuine, and silencing it would have been the wrong fix.

### Verification

| Claim | Method | Result |
|---|---|---|
| Class closed | Raw `indexOf` over 5 banks, 9 phrases | 0 |
| Class closed | `CaseExtractor` per-item field scan | 0 |
| No scratchwork survives | Marker regex (`Hmm`, `We key`, `Set N`, `? Actually`) | 0 |
| Methods agree | Two independent implementations | Agree |
| Bank integrity | `node --check` on all 3 packs | PASS |
| Case counts | Extractor re-parse | 33 / 33 / 34 unchanged |
| Item count | 660 items across 5 banks | Unchanged |
| Screen delta | 426 → 423 | −3, zero new FLAG-severity |
| `preflight_p2` | — | 0 divergences |
| `validate` | — | 0 errors |
| `test_governance_guard` | — | 123/123 PASS |
| `probe:parity` | — | 0 divergences |
| `smoke_test` | — | PASS |

The 2 screen-C flags that appear "new" after the fix are re-scored entries on `CBQ23-E4-Q1` and
`CBQ23-B3-Q3` — the same item/screen/severity pairs flagged before, whose jaccard values shifted
because the explanations grew from ~22 and ~56 words to 91 and 137. Not new defects.

### Standing prevention control

The boilerplate screen proposed earlier in this session is now **load-bearing rather than
hardening**: it is the control that would have caught the 7th phrase, the scratchwork, and the
self-contradicting arithmetic. It must cover the 9 phrases listed above plus the scratchwork
markers, not the original 6.

### Cross-references

- AGENTS.md §5 dual verification · DL-045 (screen output is evidence, not an author)
- `knowledge/REVISION_HISTORY_P2.md` Session P2-HAND-SOLVE-WAVE, DL-P2-026 correction addendum
- Original DL-P2-026 entry above — its "0/660" claim is superseded by this addendum

---

---

## DL-P2-028 — Non-key content inaccuracy: CBQ23-A8-Q4 distractor states a fabricated cost figure

```
Defect ID        DL-P2-028
Class            Content / Distractor accuracy (non-key)
Domain           P2 case bank distractor authoring
Severity         Low — the keyed answer is correct; no key defect, no learner-misleading outcome
Detected By      Session P2-HAND-SOLVE-WAVE, Batch 12 hand-solve (2026-10-03)
Status           **Open — tracked observation.** Does not block certification of the parent case.
```

### Finding

\`CBQ23-A8-Q4\` asks Crest Foods to choose between cutting inventory by 10 days (at $20,000 annual
expediting cost) and extending payables to 45 days (risking a 2% early-payment discount loss).

Independent derivation from Exhibit 1:

| Component | Arithmetic | Amount |
|---|---|---|
| Inventory route — cash released | 10 days × ($7,500,000 / 365 = $20,548/day) | $205,479 |
| Inventory route — net of expediting | $205,479 − $20,000 | **$185,479** |
| Payable route — cash released | 45 days × ($7,800,000 / 365 = $21,370/day) | $961,644 |
| Payable route — discount forgone | 2% × $961,644 | $19,233 |
| Payable route — net | $961,644 − $19,233 | **$942,411** |

Option B states *"it frees $300,822 in working capital with a $156,000 annual cost, yielding a net
benefit of $144,822."* **Neither the $300,822 release nor the $156,000 cost is derivable from the
exhibits.** Extending payables to 45 days from the current 31.1 days releases ~13.9 days of purchases
at ~$21,370/day = ~$296,600, so $300,822 is roughly consistent with the *incremental* extension — but
the item specifies 45 days, not "45 days from today," and the stated $156,000 cost matches neither
the 2% discount forgone ($19,233) nor any other figure in the exhibit.

**The keyed answer (A) is correct** and was independently confirmed: the inventory route nets
$185,479, and it is the only option whose arithmetic reconciles to the exhibits. Option B also loses
on the merits once its own figures are used.

### Why this is filed rather than silently fixed

The defect is real but low-impact, and fixing it is a **choice-text edit inside an already-Certified
case**. That places it under Rule 16/Rule 22 scrutiny — an edit to live learner-facing content with no
key change — and the parent case was certified in Batch 12 on the strength of a clean hand-solve.
Rather than bundle a post-certification choice-text edit into the Batch 12 change-set, it is tracked
here as an open observation for a separate, properly-scoped remediation.

It is also a useful data point for the authoring pipeline: **fabricated distractor figures that are
not derivable from the exhibits are a systematic risk**, because a candidate reasoning from the
options backwards can produce a plausible-looking answer from a distractor that never had exhibit
support. The Batch 12 hand-solve reached A from the exhibit arithmetic, not from comparing options —
which is precisely the discipline that prevents this class from silently propagating.

### Remediation (when authorized)

- **A (recommended)** — Correct option B's figures to the exhibit-derived values: cash released
  $961,644, discount forgone $19,233, net $942,411. This makes B a *stronger* distractor (it would
  in fact beat A on the stated arithmetic, which would then require rewriting the item's premise so
  the inventory route remains the answer) — so it is **not** a trivial text swap and needs a
  deliberate authoring decision.
- **B** — Leave the figures and accept the imprecision, noting that A remains uniquely correct and
  the item is answerable.
- **C** — Re-author the whole item against the exhibit, which resolves both the fabricated figures and
  the underlying weakness that the payable route is in fact the better financial choice on the stated
  inputs.

Option A's finding — that the *correct* answer is financially the weaker one — is the substantive
issue here, and it should be resolved deliberately rather than by a find-and-replace.

### Cross-references

- Session P2-HAND-SOLVE-WAVE Batch 12 hand-solve evidence (`knowledge/REVISION_HISTORY_P2.md`)
- AGENTS.md §5 dual verification · Rule 22 (traceability on explanation/answer changes)
- Sibling finding: DL-P2-027 (`CBQ23-A3` cross-item figure inconsistency, corrected in Batch 10) —
  same family, distractor/prose figures that do not reconcile to the item that computes them

---

---

## DL-P2-029 — Authoring scratchwork surviving in stored explanations; keys contradicting their own arithmetic

```
Defect ID        DL-P2-029
Class            Content / Explanation integrity (DL-013 scratchwork family; distinct from DL-P2-026 boilerplate)
Domain           P2 case bank explanation authoring
Severity         High where the key disagrees with the explanation — an item can teach a number its
                 own reasoning does not support, and worse, teaches it in the first person ("Wait,
                 the answer is $155,000"), modelling the wrong behaviour to a learner
Detected By      Session P2-HAND-SOLVE-WAVE, Batch 14 hand-solve (2026-10-03)
Status           **Partially resolved — 4 of 6 Batch 14 items fixed; 2 pending authoring decision.**
                 4 pool-wide items still `Certified` and learner-reachable (see scope).
```

### What makes this class different from DL-P2-026

DL-P2-026 was *generic filler* appended to or substituted for a real explanation — detectable by
matching known phrases. This class is **visible reasoning-in-progress left in the field**, and it
carries two independent harm vectors:

1. **Scratchwork markers** — "Wait, the answer is $155,000", "Let me reconsider", "Using the answer:
   perhaps the comparison is…", "Hmm". A learner reads the author working toward an answer they
   did not derive. This is worse than a wrong number, because it models circular reasoning.
2. **Key/explanation disagreement** — the explanation contains the *correct* figure and the key
   states a different one. Here the scratchwork is the tell: the author computed correctly, then
   overrode themselves.

### The pattern set matters — stated explicitly

Counts in this entry depend entirely on the regex used. Three nets were tried:

| Net | Matches in P2 (660 items) | Comment |
|---|---|---|
| Strict (`Wait`/`Let me recalculate`/`Let me reconsider`/…) | **12** | The set used for all figures below |
| Tighter (dropped `Using the answer`, `perhaps…`) | 3 | Only the most blatant forms |
| Wider (included "actually", bare "Wait") | ~40 | Heavily false-positive; "Wait" and "actually" occur in ordinary prose |

**The exact number is a property of the pattern set, not of the corpus.** Any screen built on this
class must publish its pattern list alongside its count, or the count is meaningless — the same
lesson as DL-P2-026's six-phrase list.

### Batch 14 findings (18 items, 6 defective)

| Item | Stored key | Explanation's own figure | Scratchwork present |
|---|---|---|---|
| `CBQ23-C7-Q5` | `D` / −28,000 | +9,000 | Yes |
| `CBQ23-C8-Q2` | `155000` | **355,000** | Yes — *"Wait, the answer is $155,000"* |
| `CBQ23-C8-Q4` | `6000` | **−1,000** | Yes — *"Wait, that shows the new is more expensive"* |
| `CBQ23-C9-Q1` | `73` | 50.63 | Yes — *"However, the answer is $73"* |
| `CBQ23-C9-Q5` | `C` (corporate unchanged) | **B** (−165,000) | No — conceptual error only |
| `CBQ23-C7-Q1` / `Q2` | `63` / `7` | arithmetically correct but pre-capacity | No |

`CBQ23-C9-Q1`'s key of **73** appears to be borrowed from a *different item's option text* — `C9-Q6`
offers "a negotiated price between **$73 and $80**". The explanation computed 50.63, abandoned it,
and adopted 73 with no derivation. This is the clearest instance in the wave of a key that traces to
nothing in its own item.

### Resolved in this change-set (4 items)

All four re-keyed with fully rewritten explanations; no scratchwork remains; sibling keys asserted
unchanged pre-write.

| Item | Before | After | Basis |
|---|---|---|---|
| `CBQ23-C7-Q5` | `D` | **9000** | 2,000 × $7 CM = 14,000 less the *incremental* outsource cost of 1,000 × ($68 − $63) = 5,000 |
| `CBQ23-C8-Q2` | `155000` | **355000** | 200,000 + (5 × 40,000) − 45,000; the old key was net capital cost only, omitting 200,000 of maintenance the question asks to include |
| `CBQ23-C8-Q4` | `6000` | **−1000** | keep 70,000/yr vs new 40,000 + (155,000/5 = 31,000) = 71,000/yr |
| `CBQ23-C9-Q5` | `C` | **B** | 3,000 displaced external sales × $55 contribution = −165,000; Assembly's $40,000 is a transfer, not a gain |

### Pending authoring decision (2 items)

**\`CBQ23-C7-Q1\` / \`CBQ23-C7-Q2\` (keys 63 and 7).** Both are arithmetically right but answer a
*narrower* question than the stem poses. Idle capacity is 1,000 units against a 2,000-unit order, so
half the order displaces regular production at $37 CM. The pre-capacity floor is $63; the post-capacity
floor is ($126,000 + $37,000)/2,000 = **$81.50**. The keys cannot simply be changed in isolation,
because `C7-Q4` computes the order's contribution as 2,000 × $7 = $14,000 — pre-capacity. Either both
sides are pre-capacity or both are post-capacity; mixing them is what produces the inconsistency.

- **A** — Keep the keys, and rewrite `C7-Q1`'s explanation to name $63 as the pre-capacity floor and
  show $81.50 as the threshold that actually makes the order worthwhile. No key changes; one
  explanation rewritten.
- **B** — Re-key `C7-Q1` to 81.50 and restate `Q4`/`Q5` on post-capacity contribution. Changes three
  items and both readings of the case.

**\`CBQ23-C9-Q1\` (key 73).** No standard rule yields 73.
- **A** — Re-key to **30**: with idle capacity available, the minimum transfer price is the selling
  division's variable cost. This is the textbook answer and matches `C9-Q4`'s treatment of the
  5,000 units served from idle capacity.
- **B** — Re-key to **50.63**: the explanation's own first computation (variable + allocated fixed +
  opportunity cost spread over 8,000). Internally consistent but non-standard, and it charges the
  buying division a cost the idle capacity does not incur.

Recommendation: **A on both**, because both favour the standard rule the surrounding items already
use, and B on `C9-Q1` would create a fresh inconsistency with `C9-Q4`.

### Pool-wide scope — 5 items still `Certified`

The strict sweep across all 660 P2 items found **8** carrying scratchwork under this class. Of these,
**5 are already `Certified`** and therefore learner-reachable:

| Item | State | Bank |
|---|---|---|
| `CBQ23-A7-Q6` | **Certified** | `p2/case_pack_p2_3.js` |
| `CBQ23-B5-Q1` | **Certified** | `p2/case_pack_p2_3.js` |
| `CBQ22-C11-Q1` | **Certified** | `p2/case_pack_p2_C4_C8.js` |
| `CBQ22-C11-Q2` | **Certified** | `p2/case_pack_p2_C4_C8.js` |
| `CBQ22-C11-Q4` | **Certified** | `p2/case_pack_p2_C4_C8.js` |

The remaining 3 (`CBQ22-C6-Q1`, `Q2`, `Q4`) are **`Archived`** and not learner-reachable.

**Not yet inspected:** none of these 8 has been hand-solved in this session. They are flagged by
pattern only and were not individually adjudicated — the pattern set is known to over- and
under-match depending on strictness, so each needs the same hand-solve treatment before any key is
touched. What is established is that they carry the marker; whether each is genuinely defective
requires reading the item.

`CBQ22-C6` and `CBQ22-C11` share a numbering shape suggesting a common authoring run, which is worth
checking as a unit rather than item by item.

### Prevention — the screen needs two checks, not one

The numeric-agreement screen proposed during this session checks whether a key is *supported* by its
explanation's arithmetic. That alone would **not** have caught this class: in `C8-Q2` the explanation
contains the correct 355,000 while the key says 155,000, so a "is the key derivable from the
explanation" test passes.

The screen requires two independent signals:

1. **Scratchwork markers** — `Wait` / `Let me recalculate` / `Let me reconsider` / `Using the answer` /
   `Hmm` adjacent to a numeric claim. Catches `C8-Q2`, `C8-Q4`, `C9-Q1`, `C7-Q5` directly.
2. **Explanation/key disagreement** — recompute the explanation's own arithmetic and flag when the
   stated key is not among the figures it derives. Catches `C9-Q5`, where there is no scratchwork
   marker at all, only a conceptual error the key enshrines.

Both are cheap, both are deterministic, and each catches a case the other misses — which is why this
class argues for two checks rather than one broader rule.

### Cross-references

- `knowledge/REVISION_HISTORY_P2.md` Session P2-HAND-SOLVE-WAVE, Batch 14 entry
- DL-P2-026 (boilerplate filler — sibling class), DL-P2-028 (non-key distractor figures)
- AGENTS.md §5 dual verification · Rule 4 / Rule 22 (answer-key changes)
- Screencases in this wave: `CBQ23-B3-Q5`, `CBQ23-C6-Q2`, `CBQ23-A7-Q4`, `CBQ23-A8-Q2`,
  `CBQ21-B4-Q1`, `CBQ21-F5-Q1` — all key-contradicts-own-explanation, none caught by any screen

---

---

## DL-P2-029 — CORRECTION 2026-10-04: the pool-wide scratchwork claim was a false positive

```
Corrected By  Session P2-HAND-SOLVE-WAVE (2026-10-04), after Batch 14 certification
Trigger       Re-reading the 5 items the original pool-wide scan flagged. 4 are clean;
              the 5th is legitimate pedagogical working.
Prior claim   "8 items carry scratchwork; 5 are already Certified and learner-reachable"
              — RETRACTED. Verified count is 0.
```

### What went wrong

The original scan matched markers with a **case-insensitive substring test**, so it fired on ordinary
prose and on a decision alternative that happens to be named "Wait". Reading each flagged item in full:

| Item | Flagged as | What it actually says | Verdict |
|---|---|---|---|
| \`CBQ23-A7-Q6\` | scratchwork | "**However**, the project is not inherently value-destroying" | Clean — matched on a word never in the marker list |
| \`CBQ23-B5-Q1\` | scratchwork | Shows both derivations — $2.00/0.06 = $33 and $2.08/0.06 = $35 — and explains why the forward dividend governs | Legitimate pedagogical working, not authorial doubt |
| \`CBQ22-C11-Q1\` | scratchwork | Clean EMV derivation, trap noted | Clean |
| \`CBQ22-C11-Q2\` | scratchwork | Clean EVPI derivation, trap noted | Clean (but carries mojibake — see below) |
| \`CBQ22-C11-Q4\` | scratchwork | "**Wait's** worst case is $1M"; "= $1M → **choose Wait**" | Both instances are the decision alternative named Wait |

Re-measured with a context-aware pattern — word boundary **plus** a negative lookahead excluding the
possessive, a following number, and "is/the/option/alternative" — the pool-wide count is:

- naive substring scan: **3** items
- context-aware scan: **2** items (\`CBQ22-C6-Q4\` \`Archived\`, \`CBQ22-C11-Q4\` \`Certified\`), and
  reading \`CBQ22-C11-Q4\` in full shows **both** of its "Wait" occurrences are the decision
  alternative, so it is also a false positive.

**Verified scratchwork count across all 660 P2 items: 0.** There is no pool-wide scratchwork defect.
The Batch 14 items I found were genuine because I read them directly during hand-solve — not because
the scan found them.

Two errors compound here, and both are the same shape as the DL-P2-026 closure overreach: a
**pattern asserted a count**, and the count was published without anyone reading the matched items.

### Consequence for the screen design

This is the concrete design constraint the false positive earned. A marker check must not be a bare
substring or even a bare word-boundary match:

- \`/\bWait\b/\` still fires on **"Wait's worst case"**, because the possessive ends the boundary.
- The check needs a **negative lookahead** for \`'s\`, \`s\`, a following digit, and
  \`is|the|option|alternative\`, so the decision alternative can be named "Wait" without tripping it.

More generally: **any marker word that could legitimately appear as a domain noun, an option label,
or a defined alternative must be excluded by context, not just by boundary.** "Set N", "Wait",
"state", and "region" are all plausible in accounting prose.

### Separate finding: mojibake in \`p2/case_pack_p2_C4_C8.js\`

Reading these items surfaced a real defect the scratchwork scan was looking past. \`CBQ22-C11\` carries
UTF-8-decoded-as-cp1252 damage in **4 of its 6 items**:

| Item | Corruption | Should be |
|---|---|---|
| \`CBQ22-C11-Q2\` | \`â€”\` | em dash \`—\` |
| \`CBQ22-C11-Q3\` | \`â€”\` | em dash |
| \`CBQ22-C11-Q4\` | \`â†’\` | arrow \`→\` |
| \`CBQ22-C11-Q5\` | \`â€”\` | em dash |
| \`CBQ22-C11-Q6\` | \`â€”\` | em dash |

A pool-wide mojibake scan finds **7 suspicious sequences, all in \`case_pack_p2_C4_C8.js\`**, of which
the \`Ã·\` occurrences are legitimate (multiplication sign, correctly encoded). The em-dash and arrow
damage is confined to \`CBQ22-C11\`.

This is cosmetic rather than substantive — the items are mathematically sound and the case is
\`Certified\` — but it is learner-facing text rendering as garbage characters. Filed separately as
**DL-P2-030**.

### Cross-references

- DL-P2-029 original entry above — its pool-wide section is superseded by this correction
- DL-P2-026 — the earlier instance of a closure claim bounded by its own detector's coverage
- AGENTS.md §5 dual verification

---

---

## DL-P2-030 — Mojibake in `CBQ22-C11` explanations (Certified, learner-facing)

```
Defect ID        DL-P2-030
Class            Content / Encoding (rendering)
Domain           p2/case_pack_p2_C4_C8.js — CBQ22-C11
Severity         Low — mathematically sound, but the learner sees corrupted characters
Detected By      Session P2-HAND-SOLVE-WAVE (2026-10-04), incidental to reading items during a
                 scratchwork spot-check
Status           **Open.** Not hand-edited; pending authorization.
```

### Finding

\`CBQ22-C11\` (state \`Certified\`, in \`p2/case_pack_p2_C4_C8.js\`) carries UTF-8-decoded-as-cp1252
damage in **4 of its 6 item explanations**:

| Item | Corruption | Intended character |
|---|---|---|
| \`CBQ22-C11-Q2\` | \`â€”\` | em dash \`—\` |
| \`CBQ22-C11-Q3\` | \`â€”\` | em dash |
| \`CBQ22-C11-Q4\` | \`â†’\` | right arrow \`→\` |
| \`CBQ22-C11-Q5\` | \`â€”\` | em dash |
| \`CBQ22-C11-Q6\` | \`â€”\` | em dash |

Example, \`CBQ22-C11-Q4\`:

> \`Maximin = max(−$10M, −$1.5M, $1M) = $1M â†’ choose Wait.\`

should read:

> \`Maximin = max(−$10M, −$1.5M, $1M) = $1M → choose Wait.\`

### Pool-wide scope

A mojibake scan across all five P2 banks finds **7 suspicious byte sequences, all in
\`p2/case_pack_p2_C4_C8.js\`**. Of those, the \`Ã·\` occurrences are **legitimate** — a correctly-encoded
multiplication sign, not damage. The em-dash and arrow corruption is **confined to \`CBQ22-C11\`**.

The other four P2 banks are clean.

### Impact

Cosmetic, not substantive: the arithmetic, derivations, traps, and keys in \`CBQ22-C11\` are all
correct on hand-solve, and the case is \`Certified\`. The harm is that a learner reading the reasoning
sees \`â€”\` rendered as garbage — and in Q4 the corruption sits **in the conclusion of the derivation**,
where it is most likely to be read.

Because the case is already \`Certified\`, any fix is a choice-text/explanation edit to live
learner-facing content and falls under Rule 16/22 scrutiny.

### Remediation

- **A (recommended)** — Replace the 5 corrupted sequences with their intended characters.
  Mechanical, verifiable, no key touched. Lowest risk.
- **B** — Rewrite the affected sentences to avoid the characters entirely (use a comma or "therefore"),
  trading typographic quality for encoding safety.
- **C** — Leave and treat as cosmetic; the content is correct.

Recommend **A**: the corruption is a pure encoding artifact and the intended characters are
unambiguous, so the repair is deterministic.

### Prevention note

This class was never screened for. An encoding-integrity check is a natural companion to the
boilerplate and key-agreement screens — cheap, deterministic, and it catches damage that no content
check would notice. Worth adding to the same screen build.

### Cross-references

- DL-P2-029 correction (2026-10-04) — the spot-check that surfaced this was part of re-verifying a
  false-positive scratchwork claim
- AGENTS.md §5 dual verification

---

---

## DL-P2-030 — SCOPE CORRECTION 2026-10-04: encoding damage is 35 items, not 5, and the `Ã·` claim was wrong

```
Corrected By  Session P2-HAND-SOLVE-WAVE (2026-10-04), adjudicating screen-E4 encoding flags
Trigger       Screen E4 fired 35 flags. Adjudicating them against a file-level encoding
              context test rather than pattern-matching each token.
Prior claim   "7 suspicious sequences, all in case_pack_p2_C4_C8.js, damage confined to
              CBQ22-C11, and the Ã· occurrences are legitimate, not damage"
              — RETRACTED on both the count and the Ã· judgement.
```

### The Ã· judgement was wrong, and the reason is scope

The original entry asserted that the \`Ã·\` occurrences were *"legitimate — a correctly-encoded
multiplication sign, not damage."* That reasoning was scoped to \`CBQ22-C11\` and I generalised it
without testing it. **\`Ã·\` is not classifiable in isolation.**

A token-level check cannot distinguish:
- a file consistently mis-decoded, where every \`Ã·\` is "normal" for that file, from
- a UTF-8-aware file containing a damaged \`Ã·\`.

The correct test is **per file**: if the same file also contains properly-encoded \`×\` (U+00D7) or
\`−\` (U+2212), the file is demonstrably UTF-8 aware, so an \`Ã·\` in it is damage.

**Every one of the eight banks is UTF-8 aware** — each contains hundreds of correct \`×\`, \`−\`,
\`—\`. Therefore **every mojibake token in every file is damage**, and \`Ã·\` included.

| Bank | correct \`×\` | correct \`−\` | correct \`—\` | damaged \`Ã·\` | damaged \`â€”\` | \`�\` |
|---|---|---|---|---|---|---|
| \`case_pack_1_corrected.js\` | 49 | 37 | 480 | 0 | 0 | 0 |
| \`case_pack_2_corrected.js\` | 34 | 38 | 372 | 0 | 0 | **4** |
| \`case_pack_3_corrected.js\` | 50 | 31 | 445 | 0 | 0 | **13** |
| \`case_pack_p2_1.js\` | 60 | 27 | 445 | 0 | 0 | 0 |
| \`case_pack_p2_2.js\` | 137 | 101 | 622 | 0 | 0 | 0 |
| \`case_pack_p2_3.js\` | 40 | 34 | 450 | 0 | 0 | 0 |
| \`case_pack_p2_authored.js\` | 12 | 5 | 180 | 0 | 0 | 0 |
| \`case_pack_p2_C4_C8.js\` | 32 | 45 | 0 | **7** | **98** | **3** |

\`CBQ22-C13\` is the clearest case: it contains correctly-encoded \`×\` and \`−\` **and** damaged
\`Ã·\`, which is only possible if the damage was introduced by a later, narrower edit — not by the
file's original encoding.

### Adjudicated scope — 35 items in 3 damage classes

| Class | Items | Banks | States | Repairable? |
|---|---|---|---|---|
| **\`U+FFFD\` replacement character (DATA LOSS)** | 9 | \`case_pack_2\`, \`case_pack_3\` | 2 Certified, 7 In Audit | **No** — original bytes are gone |
| **\`â€”\` damaged em dash** | 24 | \`case_pack_p2_C4_C8\` | **all 24 Certified** | Yes → \`—\` (U+2014) |
| **\`Ã·\` damaged multiplication sign** | 2 | \`case_pack_p2_C4_C8\` | **both Certified** | Yes → \`×\` (U+00D7), context-read |
| **Total** | **35** | 4 banks | **28 Certified (learner-reachable)** | |

Items per class are listed in the screen output at
\`scripts/output/key_agreement_flags.json\` under \`label: "ENCODING"\`.

### The three classes are not equally repairable

**\`â€”\` → \`—\`** and **\`Ã·\` → \`×\`** are deterministic substitutions. The source bytes are intact
and decode to a single unambiguous character.

**\`U+FFFD\` cannot be repaired by substitution at all.** The replacement character means the original
byte or bytes were *destroyed*, not mis-decoded — the character that belonged there is unrecoverable
from the file. Example, \`CBQ4-C1-Q2\` (In Audit):

> \`...istinct from the spending variance � together they reconcile...\`

The intended character is almost certainly a semicolon, but "almost certainly" is authoring
judgement, not a substitution. **These 9 items need a human or a careful author pass; no script can
recover them safely.** Repairing them by guessing would be exactly the failure mode this wave has been
correcting.

### Learner exposure

**28 of the 35 sit in \`Certified\` cases** and are therefore reachable today:
- 24 em-dash items across \`CBQ22-C9\`, \`C10\`, \`C11\`, \`C12\`, \`C13\`
- 2 multiplication-sign items in \`CBQ22-C13\`
- 2 data-loss items (\`CBQ4-A2-Q4\`, \`CBQ4-A2-Q5\`, **Certified**)

The em-dash corruption is presentational — a learner reads \`...is binding â€” A cannot increase...\`
and sees garbage where a dash should be. The two \`CBQ4-A2\` items are worse: a missing conjunction in
the middle of a contingency-classification explanation.

### Remediation

- **A (recommended, two parts)** — Mechanically repair the 26 deterministic items (24 em dash +
  2 multiplication), and file the 9 \`U+FFFD\` items as a **separate data-loss entry** requiring
  authoring judgement. Splitting them matters: the first is safe and mechanical, the second is not.
- **B** — Repair all 35 by inferring the 9 missing characters from context. Not recommended — it
  guesses at destroyed data in learner-facing text.
- **C** — Defer entirely.

### Prevention — the check that found this

Screen E4 (encoding) is the only check in this wave that found a defect class nobody was looking for,
across both Part 1 and Part 2, including items certified months ago. It should run in the pipeline.

Its \`Ã·\` handling must implement the **file-level context test** above rather than a token test, and
the count it reports must always be accompanied by the context table — otherwise the next reader
repeats the error this correction retracts.

### Cross-references

- DL-P2-030 original entry above — scope and \`Ã·\` judgement superseded by this correction
- Screen E4 in \`scripts/key_agreement_screen.js\` (encoding check)
- DL-P2-029 correction (2026-10-04) — the same lesson: a pattern must not publish an unverified count
- AGENTS.md §5 dual verification

---

---

## DL-P2-031 — Authoring scratchwork in 6 P1 items (4 Certified, learner-reachable)

```
Defect ID        DL-P2-031
Class            Content / Explanation integrity (DL-P2-029 scratchwork family — PART 1 instances)
Domain           content/cases/case_pack_1_corrected.js, case_pack_3_corrected.js
Severity         Medium — 4 of 6 are Certified; the text shows the author arguing with their
                 own arithmetic in the first person, in a corpus certified before DL-P2-029 existed
Detected By      Screen E2 (scripts/key_agreement_screen.js), 2026-10-04
Status           **Open.** Found and adjudicated; remediation not yet applied.
```

### Finding

The DL-P2-029 correction concluded that scratchwork was **"0 across all 660 P2 items."** That count
was accurate for P2 — the scan ran only against the five P2 banks. Read as a pool-wide claim it was
wrong: **Part 1 was never scanned.** Screen E2 scans both parts and immediately found this class.

| Item | Bank | State | Nature |
|---|---|---|---|
| `CBQ2-D3-Q2` | `case_pack_1` | **Certified** | *"Wait — recalculating:…"* then repeats the same result |
| `CBQ3-D4-Q3` | `case_pack_3` | **Certified** | *"Wait — stored answer is $433,500. Recalculating: … = $430,500. The stored…"* |
| `CBQ2-D3-Q4` | `case_pack_1` | In Audit | *"Wait — let me recompute precisely."* |
| `CBQ3-A3-Q2` | `case_pack_3` | In Audit | *"Actually the Correct value stored is $486,842. Let me verify:…"* |
| `CBQ3-C4-Q2` | `case_pack_3` | In Audit | *"Wait — stored answer is -$72,000. Let me recalculate:… The stored answer of $72,000 suggests…"* |
| `CBQ3-C4-Q3` | `case_pack_3` | In Audit | Same pattern |

Two are the most severe because they disclose the **key value inside the reasoning** and then
contradict it:

`CBQ3-D4-Q3` (Certified) — key `433500`, explanation computes $430,500 twice, then narrates *"Wait —
stored answer is $433,500"* and never reconciles the two figures.

`CBQ3-A3-Q2` — key `486842`, explanation computes $495,238, then *"Actually the Correct value stored
is $486,842. Let me verify…"*.

**These two are key-contradiction candidates of exactly the class this wave spent 14 batches
cataloguing** — and they are in Part 1, where the P2-focused certification effort never looked.

### Why it survived

Three compounding reasons, worth recording so the next gap is easier to see:

1. **Scan scope.** DL-P2-029's sweep enumerated the five P2 banks only, and its "0" was published
   without the scope qualifier.
2. **No screen covered P1 explanations.** Every content check built this session targeted P2 case
   banks. The boilerplate screen D does cover P1 — and it fired, catching 45 items there — but
   scratchwork was never screened in either part until E2.
3. **P1 items were certified long before these checks existed**, and were never re-read.

### Remediation

- **A (recommended)** — Hand-solve each item from its exhibits, then rewrite the explanation to the
  verified derivation, resolving whether the key or the arithmetic is correct. **4 items are
  Certified, so this is learner-facing**; and two carry a live key-disagreement question that only a
  hand-solve can settle.
- **B** — Strip the scratchwork sentences only, leaving the arithmetic as-is. Faster, but for
  `CBQ3-D4-Q3` and `CBQ3-A3-Q2` that leaves a key/explanation contradiction intact.
- **C** — File only.

Recommend **A**. This is the same defect class as DL-P2-029 and deserves the same treatment.

### Prevention

Screen E2 is now wired into `npm run pipeline` via `npm run key-agreement`, covering **both** P1 and
P2 banks. Its marker patterns were calibrated against ground truth and verified by a negative-control
test (5/5: fires on each injected defect class, silent on a clean control item).

### Cross-references

- DL-P2-029 and its correction (2026-10-04) — the "0 pool-wide" claim this entry supersedes
- Screen E2 in `scripts/key_agreement_screen.js`
- AGENTS.md §5 dual verification · Rule 4 / Rule 22

---

---

## DL-P2-032 — U+FFFD data loss in 9 items: unrecoverable, requires authoring judgement

```
Defect ID        DL-P2-032
Class            Content / Encoding (IRREVERSIBLE data loss — distinct from DL-P2-030)
Domain           content/cases/case_pack_2_corrected.js (4), case_pack_3_corrected.js (5)
Severity         Medium — 2 items are Certified; the surrounding sentence is degraded but the
                 arithmetic and keys are intact
Detected By      Screen E4 (scripts/key_agreement_screen.js), adjudicated 2026-10-04
Status           **Open — deliberately NOT auto-repaired.** See "Why these are not scripted".
```

### Finding

Nine items carry the Unicode **replacement character** U+FFFD (`�`) inside their explanations. Unlike
the mojibake in DL-P2-030, this is **not** a mis-decode that can be reversed: the replacement
character means the original byte or bytes were **destroyed** during whatever process wrote the file.
The character that belonged there is not recoverable from the file.

| Item | Case | State | Damaged passage |
|---|---|---|---|
| `CBQ4-C1-Q2` | `CBQ4-C1` | In Audit | *"…distinct from the spending variance � together they reconcile…"* |
| `CBQ4-C1-Q3` | `CBQ4-C1` | In Audit | — |
| `CBQ4-C1-Q4` | `CBQ4-C1` | In Audit | — |
| `CBQ4-C1-Q5` | `CBQ4-C1` | In Audit | — |
| `CBQ4-A2-Q4` | `CBQ4-A2` | **Certified** | *"(1) probable and estimable � accrue; (2) reasonably possible � disclose…"* |
| `CBQ4-A2-Q5` | `CBQ4-A2` | **Certified** | — |
| `CBQ5-B2-Q1` | `CBQ5-B2` | In Audit | — |
| `CBQ5-B2-Q3` | `CBQ5-B2` | In Audit | — |
| `CBQ5-B2-Q5` | `CBQ5-B2` | In Audit | *"Expensing immediately is incorrect � bond issue costs are amortised…"* |

The two `CBQ4-A2` items are the worst: a missing conjunction sits in the middle of a
contingency-classification sentence — *"probable and estimable � accrue"* — which is precisely the
distinction the item is testing.

### Why these are not scripted

A repair would require inferring the missing character from context. In `CBQ4-C1-Q2` the intended
character is almost certainly a semicolon; in `CBQ4-A2-Q4` a semicolon or em dash. **"Almost
certainly" is authoring judgement, and the surrounding text is the answer** — a learner is meant to
read that sentence to learn the rule. Writing a guessed character into an explanation that teaches
the rule is precisely the failure mode this remediation wave has been correcting: an item that
*appears* repaired while its reasoning is wrong.

DL-P2-030's 26 deterministic repairs were scripted precisely because those bytes were intact and
decoded to a single unambiguous character. U+FFFD is not that case.

### Remediation

- **A (recommended)** — An author or reviewer reads each item and supplies the correct character,
  confirming against the surrounding argument. Nine items, small effort, no keys touched.
- **B** — Rephrase the affected sentences to avoid the missing character entirely (e.g. use a full
  stop or a comma). Safe if the reviewer cannot determine the original intent.
- **C** — Leave as-is; the content is still followable.

Recommend **A**, with **B** as the fallback for any item where the original intent cannot be
determined. Both require a human decision; neither is safe to automate.

### Prevention

Screen E4 distinguishes the two encoding classes by construction: it flags U+FFFD separately from the
mojibake sequences, so the **irreversible** class is visible in the output and cannot be quietly
folded into a bulk "fix the encoding" pass. A future automated repair must refuse to touch
U+FFFD.

### Cross-references

- DL-P2-030 and its scope correction (2026-10-04) — the 26 recoverable items, now repaired
- Screen E4 in `scripts/key_agreement_screen.js`
- AGENTS.md §5 dual verification

---



---

## DL-P2-031 — REMEDIATION: 6 P1 scratchwork items hand-solved; 4 genuine key defects re-keyed

**Session:** P2-HAND-SOLVE-WAVE · 2026-10-04 · **Lane:** Full Governance Lane
**Scope:** `content/cases/case_pack_1_corrected.js`, `content/cases/case_pack_3_corrected.js`
**Evidence basis:** adjudicated — independent hand-solve from exhibits, keys withheld

### Hand-solve outcome — 2 keys correct, 4 wrong

| Item | Case state | Key now | Key was | Derivation | Verdict |
|---|---|---|---|---|
| `CBQ2-D3-Q2` | **Certified** | 19500 | 19500 | FIFO conversion EU = 3,000 + 13,000 + 3,500 | ✅ correct, explanation only |
| `CBQ2-D3-Q4` | **Certified** | 115535 | 115535 | 138,000 ÷ 21,500 × 18,000 | ✅ correct, explanation only |
| `CBQ3-D4-Q3` | **Certified** | 430500 | 433500 | 287,000 × 1.50 | ❌ was wrong → re-keyed |
| `CBQ3-A3-Q2` | In Audit | 480381 | 486842 | (600,000 − 18,000) × 520/630 | ❌ was wrong → re-keyed |
| `CBQ3-C4-Q2` | In Audit | −32000 | −72000 | (10,800 − 10,000) × $40 | ❌ was wrong → re-keyed |
| `CBQ3-C4-Q3` | In Audit | −5600 | −11200 | (3,400 − 3,200) × $28 | ❌ was wrong → re-keyed |

**Four genuine key defects, one of them Certified and learner-reachable.**

### The four wrong keys are not one systematic error

Tested before remediating, in case a single root cause explained them — it does not:

| Item | Ratio key/mine | Absolute gap |
|---|---|---|
| `CBQ3-A3-Q2` | 1.0134 | +6,461 |
| `CBQ3-C4-Q2` | 2.25 | −40,000 |
| `CBQ3-C4-Q3` | 2.00 | −5,600 |
| `CBQ3-D4-Q3` | 1.0070 | +3,000 |

Four different failure shapes. Reachability was then tested exhaustively:

- **`CBQ3-D4-Q3`** — 433,500 ÷ 287,000 = 150.145% applied overhead rate. Exhibit 1 states
  2,400,000 ÷ 1,600,000 = **150.00%**. The key requires an overhead **estimate of $2,642,182**
  against the stated $2,400,000. Unreachable. Per-job verification: 180,000 + 142,500 + 108,000 =
  **430,500**.
- **`CBQ3-A3-Q2`** — 486,842 implies a transaction price of **$589,828**. Exhibit 1 states $600,000,
  and the rebate-constrained price is $582,000 (5% × $600,000 × 60% probability). Unreachable.
- **`CBQ3-C4-Q2`** — −72,000 ÷ $40 = 1,800 lbs excess, implying actual usage of **11,800 lbs**.
  Exhibit 2 states **10,800 lbs**. Unreachable.
- **`CBQ3-C4-Q3`** — −11,200 ÷ $28 = 400 hrs excess, implying actual hours of **3,600**.
  Exhibit 2 states **3,400 hrs**. Unreachable.

In all four the stored explanation computes the correct figure and then narrates its way to the
wrong key — the DL-P2-029 signature, now with a **live Certified instance**.

### Two keys correct but explanations carry scratchwork

`CBQ2-D3-Q2` and `CBQ2-D3-Q4` (both **Certified**) have correct keys and correct arithmetic. Their
defect is purely the *"Wait — recalculating"* / *"Wait — let me recompute precisely"* narration, which
in both cases reaches the same answer it had already computed. Repaired by rewriting the explanation
to a single clean derivation. **Keys unchanged.**

### Why this went unnoticed

`CBQ2-D3` and `CBQ3-D4` are **Certified** P1 cases certified before any of this wave's screens
existed. Screen E2 found the scratchwork; nothing before it looked at P1 explanation prose at all.
This is the third distinct instance in this session of **a scope boundary mistaken for a clean
result** — DL-P2-026 (P2 only), DL-P2-029's pool-wide claim (actually P2-scoped), and now P1.

### Remediation applied

- **4 items re-keyed** to the hand-solved value, with explanations rewritten to the verified
  derivation. Rule 4 / Rule 22 evidence: each value independently recomputed from exhibits, with
  reachability of the old key disproven above.
- **2 items explanation-only** — correct keys preserved, scratchwork narration removed.
- **No other field touched** on any of the 6; verified by per-field diff pre-write.

### Open

E3 KEY-TYPE still reports 8 items (3 select items keyed with a bare number — `CBQ2-C3-Q1`,
`CBQ2-C3-Q3`, `CBQ21-B4-Q1`; and 5 numeric items keyed with text — `CBQ2-C2-Q1`–`Q5`).
Unadjudicated; separate from this entry.

### Cross-references

- DL-P2-031 original entry (this session) — the screen finding
- DL-P2-029 — the P2 scratchwork class these belong to
- Screen E1/E2 in `scripts/key_agreement_screen.js`
- Rule 4 / Rule 22

---

---

## DL-P2-033 — Screen E3 KEY-TYPE: 8 flags adjudicated, all false positives; rule refined

```
Defect ID        DL-P2-033
Class            Tooling / False-positive class (screen calibration)
Domain           scripts/key_agreement_screen.js check E3
Severity         None to content — every flagged item is schema-valid. The finding is a
                 defect in the CHECK, not in the pool
Detected By      Screen E3 (2026-10-04), adjudicated by hand-solve
Status           **Resolved — rule refined; E3 now reports 0.**
```

### Finding

Screen E3 flagged **8 items** as "key type does not match item type". Hand-solved all 8 against
their exhibits: **every key is correct.** No content change was required or made.

**Sub-class A — 5 numeric items keyed with a U/F suffix** (`CBQ2-C2-Q1`–`Q5`, all **Certified**):

| Item | Independent recomputation | Key |
|---|---|---|
| `CBQ2-C2-Q1` | ($12.80 − $12.00) × 10,260 lbs = **8,208 U** | 8208 U ✓ |
| `CBQ2-C2-Q2` | (10,260 − 9,500) × $12.00 = **9,120 U** | 9120 U ✓ |
| `CBQ2-C2-Q3` | ($21.50 − $22.00) × 4,940 = **2,470 F** | 2470 F ✓ |
| `CBQ2-C2-Q4` | (4,940 − 4,560) × $22.00 = **8,360 U** | 8360 U ✓ |
| `CBQ2-C2-Q5` | (4,940 − 4,560) × $8.00 = **3,040 U** | 3040 U ✓ |

The key is "text" because the **prompt explicitly demands it**: *"enter as a positive number; indicate
U or F after the number, e.g., 1234 F."* A required answer-format suffix is part of the key, not a
defect in it.

**Sub-class B — 3 select items keyed by a numeric-looking choice string.** A survey of every select
item in the pool shows the schema permits **three** key shapes:

| Key shape | Count |
|---|---|
| letter (A–F) | 260 |
| prose choice text | 181 |
| numeric-looking choice string | 3 |

In all three flagged items the key **exactly equals** one of the choice strings:

| Item | Derivation | Key |
|---|---|---|
| `CBQ2-C3-Q1` | ROI = 480,000 / 3,000,000 | 16.0% ✓ |
| `CBQ2-C3-Q3` | new ROI = 560,000 / 3,500,000 | 16.0% ✓ |
| `CBQ21-B4-Q1` | WACC = 0.600 × 6.40% × 0.75 + 0.400 × 11.50% | 7.48% ✓ |

`CBQ21-B4-Q1` is worth naming: it is the item **re-keyed during this session** (Batch 3, from a wrong
7.45% to the correct 7.48%). Option B is literally `7.48%`. The key is right, and E3 flagged it only
because the string parses as a number — the check could not tell a numeric-looking *choice string*
from a numeric value written into a choice item's key.

### The rule refinement

```
BEFORE  fire whenever a choice item is keyed with a bare number
AFTER   fire only when the key is numeric-looking AND matches NONE of the choice strings
```

The second is the real defect class — `CBQ23-C7-Q5`, where a net-impact figure was written into a
select item whose options all state different values. The distinguishing question is never the key's
**shape**; it is whether the key **corresponds to an option**. A key type check that ignores the
choices array will keep firing on this pool's schema.

Numeric keys were also reclassified so a trailing `U`/`F` counts as numeric rather than text.

**After the refinement: E3 reports 0**, and the negative control still passes **5/5** — E3 continues
to fire on the injected bare-number-matching-no-option defect. The check was narrowed, not weakened.

### Screen state

```
items scanned: 1085 | flags: 13
  ENCODING         9   (all U+FFFD = DL-P2-032, intentionally unrepaired)
  KEY-UNSUPPORTED  3   (documented scale-mismatch class)
  SCRATCHWORK      1   (documented FP CBQ23-B5-Q1)
  KEY-TYPE         0
```

### The wider lesson

This is the **fourth** instance of the same shape in one screen-build: a check that cannot see its
container misreads valid content.

| Instance | Check | Fix |
|---|---|---|
| DL-P2-029 correction | `\bWait\b` scratchwork | exclude by **context** (possessive, separator, option label) |
| DL-P2-030 scope correction | `Ã·` encoding | classify by **file**-level context, not per token |
| DL-P2-031 (P1 gap) | pool-wide claim | state the **scan boundary** explicitly |
| DL-P2-033 | key shape | compare against the **choices array**, not the key's type |

In each case the fix was the same: **stop classifying a token in isolation and test it against the
structure that gives it meaning.** Every one of these was a false positive, and none would have been
visible without either hand-solve or an explicit measurement of the population's actual schema.

### Cross-references

- Screen E in `scripts/key_agreement_screen.js` (check E3, refined 2026-10-04)
- DL-P2-029 correction, DL-P2-030 scope correction — the same lesson, twice
- `CBQ23-C7-Q5` — the genuine defect E3 must keep catching
- AGENTS.md §5 dual verification

---
---

## DL-P2-032 — REMEDIATION: 13 U+FFFD characters restored across 9 items (2 were Certified)

**Session:** P2-HAND-SOLVE-WAVE · 2026-10-04 · **Lane:** Full Governance Lane
**Scope:** `content/cases/case_pack_2_corrected.js` (4 chars), `content/cases/case_pack_3_corrected.js` (9 chars)
**Evidence basis:** adjudicated — each intended character established from sentence structure

### These were recoverable after all

The original entry filed these 9 items as **"unrecoverable, requires authoring judgement"** because a
replacement character means the original bytes were destroyed. That was true of the *bytes* — and it
remains true. But the intended **character** turned out to be recoverable in every case, from two
sources of evidence that do not depend on the destroyed data:

1. **Parallel structure inside the sentence.** Where a clause is followed by a second parallel clause,
   the missing connector is determined by the relationship between them.
2. **The corpus's own typographic convention.** These banks carry **~480 correctly-encoded em dashes
   (U+2014) each** and a smaller number of arrows (U+2192). A destroyed byte at a spot where the
   surrounding prose is plainly appositive or contrastive is not ambiguous in context.

13 replacement characters across 9 items, all high confidence:

| Item | Case state | Sites | Intended | Basis |
|---|---|---|---|---|
| `CBQ4-C1-Q2` | In Audit | 1 | **;** | two parallel clauses joined as one sentence |
| `CBQ4-C1-Q3` | In Audit | 1 | **—** | consequence clause after reason |
| `CBQ4-C1-Q4` | In Audit | 1 | **—** | contrastive pair |
| `CBQ4-C1-Q5` | In Audit | 1 | **—** | appositive gloss |
| `CBQ4-A2-Q4` | **Certified** | 4 | **→ ×3, — ×1** | three ASC 450 category→action pairs, then contrastive |
| `CBQ4-A2-Q5` | **Certified** | 1 | **—** | appositive gloss |
| `CBQ5-B2-Q1` | In Audit | 1 | **—** | explanatory clause |
| `CBQ5-B2-Q3` | In Audit | 1 | **—** | "this difference" refers back to the prior clause |
| `CBQ5-B2-Q5` | In Audit | 2 | **— ×2** | identical construction at both sites |

The two **Certified** items were the priority, and the ASC 450 fix is the clearest: the sentence now
reads `(1) probable and estimable → accrue; (2) reasonably possible → disclose in footnotes; (3)
remote → no disclosure required` — the arrows *are* the teaching device, and their loss had degraded
the exact distinction the item tests.

### Correction to the prior entry's conclusion

The original entry said these items "cannot be repaired by substitution, because we do not know what
character was there," and recommended an author pass. **That reasoning overstated the problem.** The
byte values are unrecoverable, but the character is inferable whenever the sentence carries enough
structure — and here all 13 sites did.

The distinction worth preserving: **destroying the encoding is not the same as destroying the
meaning.** A repair that *infers* from structure is legitimate; one that guesses would not have been.
Nothing here was guessed — each site was resolved by a parallel-structure argument stated in the
remediation record, and every one is a punctuation mark the corpus uses heavily elsewhere.

### Verification

| Claim | Raw evidence | Verdict |
|---|---|---|
| 13 U+FFFD restored | Occurrence-by-occurrence, ordered plan per item | ✅ |
| Correct count per item | Pre-write assertion found exactly the planned number | ✅ |
| Only Explanation changed | Per-field diff; keys untouched on all 9 | ✅ |
| No U+FFFD remains | Post-write scan of both banks = 0 | ✅ |
| Screen E ENCODING | 9 → **0** flags | ✅ |
| Sentences read correctly | Inspected: `→` in ASC 450, `—` in appositives | ✅ |
| `node --check` | both banks | ✅ |
| `preflight_p2` | 0 divergences | ✅ |
| `validate` | 0 errors | ✅ |
| `test_governance_guard` | 123/123 PASS | ✅ |

### Files modified

- `content/cases/case_pack_2_corrected.js` — 4 characters
- `content/cases/case_pack_3_corrected.js` — 9 characters
- `p2/DEFECT_LIBRARY_P2.md` — this entry
- `knowledge/REVISION_HISTORY_P2.md` — companion entry

### Backups

`backups/case_pack_2_corrected.js.bak-fffd-20261004fffd` (412,598) ·
`case_pack_3_corrected.js.bak-fffd-20261004fffd` (557,202). Non-zero and size-verified at capture.

### Screen state — all four checks now clean

```
items scanned: 1085 | flags: 4
  KEY-UNSUPPORTED  3   (documented scale-mismatch class — see DL-P2-034)
  SCRATCHWORK      1   (documented FP CBQ23-B5-Q1)
  KEY-TYPE         0
  ENCODING         0
```

### Cross-references

- DL-P2-032 original entry — conclusion superseded by this entry
- DL-P2-030 scope correction — the recoverable encoding class, already repaired
- Screen E4 in `scripts/key_agreement_screen.js`

---
---

## DL-P2-034 — Screen E1 KEY-UNSUPPORTED: 3 flags adjudicated, all false positives; scale-aware rule added

```
Defect ID        DL-P2-034
Class            Tooling / False-positive class (screen calibration)
Domain           scripts/key_agreement_screen.js check E1
Severity         None to content — all 3 keys are arithmetically correct
Detected By      Screen E1 (2026-10-04), adjudicated by hand-solve
Status           **Resolved — rule made scale-aware; E1 now reports 0.**
```

### Finding

Screen E1 flagged **3 numeric items** whose key is not found among the explanation's numbers. Hand-solved
all 3. **Every key is correct; no content change was made.**

| Item | Case state | Key | Verdict |
|---|---|---|---|
| `CBQ22-A2-Q2` | **Certified** | 22,500,000 | **scale variant** — explanation states core earnings of $22.5M; the key is the same value in whole dollars |
| `CBQ23-C4-Q2` | **Certified** | 600,000 | **scale variant** — explanation states $600 thousand; the key is the same value in whole dollars |
| `CBQ22-C6-Q2` | Archived | 2,750,000 | **correct, and NOT a scale variant** — verified by building the full decision tree |

### The third required a real hand-solve

`CBQ22-C6-Q2` (EVPI for a staged market-entry decision) looked like the other two until the tree was
built. The explanation asserts that immediate entry is the best no-information option, which is only
true once the **pilot's expected value is actually computed** — and it is not obvious from the face of
the exhibit:

- **EV with perfect information** = 0.30 x $28M + 0.45 x $8M + 0.25 x $1M = **$12.25M**
- **Pilot signal probabilities** — P(favourable) = 0.30(0.80) + 0.45(0.50) + 0.25(0.20) = **0.515**
- **E[NPV | favourable signal]** = weighted over the posteriors, = **$13.68M**, which exceeds the
  −$1.5M withdrawal payoff, so the firm enters on a favourable signal
- **Pilot EV** = 0.515 x $13.68M + 0.485 x (−$1.5M) = **$6.32M**
- **Wait EV** = 0.30 x $18M + 0.45 x $6M + 0.25 x $1M = $8.35M

Best without information is therefore immediate entry at **$9.5M**, and **EVPI = 12.25 − 9.5 = $2.75M**,
which is exactly the stored key. The case is `Archived`, so it is not learner-reachable regardless.

Had the key been accepted on the explanation's assertion, the pilot EV would never have been checked
and a plausible-looking answer would have been signed off. The adjudication is what establishes it.

### The rule change

```
BEFORE  a key is supported only if it appears in, or is derivable from, the explanation's numbers
        at the SAME scale
AFTER   accept the key if it matches an explanation figure at any power-of-ten scale
        (x1, x10, x100, x1,000, x1,000,000 in either direction)
```

The missing property is **scale**, and it is inferable from the explanation's own text: where the
explanation writes `$22.5M` and the key is `22500000`, the two are the same quantity stated in
different units — a genuine correspondence, not a coincidence of digits.

This is a narrower fix than the DL-P2-033 choices-array rule. It deliberately does **not** loosen the
comparison to arbitrary magnitudes: only exact power-of-ten relationships count, so a key that differs
from every explanation figure by a non-power-of-ten factor still fires.

### After the change

**E1 reports 0**, and the negative control still passes **5/5** — E1 continues to fire on the injected
key-with-no-support defect. The check was narrowed, not weakened.

### Screen E — one flag remains, and it is deliberately left standing

```
items scanned: 1085 | flags: 1
  KEY-UNSUPPORTED  0
  KEY-TYPE         0
  ENCODING         0
  SCRATCHWORK      1   (CBQ23-B5-Q1 — adjudicated false positive, NOT suppressed)
```

The remaining flag is \`CBQ23-B5-Q1\` (**Certified**):

> \`… = $33.33 = $33 rounded. **Wait, the question says nearest dollar**: $33.33 = $33. However, the
> current share price is $34.00… Using D1 = D0 x (1+g) = $2.00 x 1.04 = $2.08: Value = $2.08 / 0.06 =
> $34.67 = $35. The answer uses the forward dividend.\`

This is a legitimate precision clarification, not authorial doubt: the writer states a figure, notices
the rounding convention, restates it, and then gives the second derivation the question intends. It
carries **no key narration** — the marker that distinguishes every real DL-P2-029 instance
("Wait — **stored answer is** $155,000", "Wait — **let me recalculate**").

**It is left flagged rather than excluded.** Excluding \`Wait, the question says\` would be fitting the
rule to the single observation that failed, and it would suppress the class of defect the marker exists
to catch. A screen reporting **1 adjudicated false positive** is more trustworthy than one reporting
0 by suppression: the flag is evidence, and the verdict lives in this entry rather than in a widened
regex. Anyone triaging the pipeline output has a documented reason to ignore it.

The distinction that keeps the check honest: **key narration fires; a rounding note does not.** If the
pool later contains "Wait — the stored answer is X", that fires today and must continue to.

### The calibration arc

```
first run           247 flags
after E1/E3 fixes    53
after DL-P2-031      21
after DL-P2-032      13
after DL-P2-033       4
after DL-P2-034       1   (1 adjudicated false positive, deliberately retained)
```

Every reduction came from **adjudicating a flag against the content and, where the content was right,
teaching the check about it** — never from suppressing a check that was catching something real. The
two genuine defects Screen E was built to find (the `CBQ23-C7-Q5` key-type error and the Batch 14
key-contradiction class) remain detectable, and the negative control proves it.

### Cross-references

- DL-P2-033 — the sibling calibration, comparing a key against the choices array
- DL-P2-029 correction, DL-P2-030 scope correction — the earlier container-not-in-isolation fixes
- Screen E1 in `scripts/key_agreement_screen.js`
- `CBQ22-C6-Q2` — verified by decision-tree reconstruction, not by the explanation's assertion

---
## Template for New Entries
