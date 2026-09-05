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
