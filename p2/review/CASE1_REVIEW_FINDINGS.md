# CASE1 Review Findings — Case Pack 1 (Integrated Case Studies)

**Reviewer:** In-process review (acting as senior management accountant and CMA Part 2 exam editor)
**Scope:** `p2/case_pack_p2_1.js` — 33 cases, 198 items
**Source SHA256:** `fcd3a4ed5b9dbcb400800f20308b954a4ff661ce2a55c8383502ce4e90c5f99d`
**Manifest:** 13 split parts, concat == source byte-for-byte (EXACT MATCH), no QID gaps/extras
**Review date:** 2026-09-07

---

## Summary

| Metric | Value |
|--------|-------|
| Cases reviewed | 33 |
| Items reviewed | 198 |
| Items by type | numeric:59, select:61, multi:22, match:23, mcq:33 |
| Critical findings | 1 |
| High findings | 0 |
| Medium findings | 0 |
| Low / Informational | 1 |
| DL-008 violations (non-empty EW[CC]) | 0 |
| DL-026 violations (EW[non-CC] < 75 chars) | 0 |
| Calculation errors found | 1 |

**Overall verdict:** The pack is well-constructed with strong governance compliance. One content error in a match explanation (CBQ21-B5-Q6) requires correction, plus one metadata completeness issue (missing exhibit reference). All independently recomputed numeric answers agree with stored values.

---

## Per-case findings

### [CBQ21-B5 / Q6] — Repurchase accretion match text states wrong value
- **Dimension:** 1 (Correctness)
- **Severity:** Critical
- **Evidence:** Q2 asks for repurchase accretion in EPS. Stored correct answer is `"0.78"` (before EPS = $14M/2M = $7.00; after repurchase of 200K shares at $30 = $6M, shares = 1.8M, EPS = $14M/1.8M = $7.78; accretion = $0.78). But Q6 match RightItems contains `" accretion ~$0.20 — P/E vs funding"` mapped to `"Repurchase 200k"`. The stated ~$0.20 contradicts the correct $0.78 derived in Q2.
- **Proposed fix:** Replace `" accretion ~$0.20 — P/E vs funding"` with `"accretion $0.78 — EPS rises from $7.00 to $7.78 as share count drops 10% while earnings stay flat"`.
- **Confidence:** High

---

### [CBQ21-A3 / Exhibit 2] — Missing Q5 reference in ReferencedBy
- **Dimension:** Structural
- **Severity:** Informational
- **Evidence:** Exhibit 2 `ReferencedBy` is `["CBQ21-A3-Q1","CBQ21-A3-Q2","CBQ21-A3-Q3","CBQ21-A3-Q4","CBQ21-A3-Q6"]` — Q5 is absent. But Q5's prompt reads: *"Which three conclusions are supported by the DuPont analysis of the two years shown in Exhibits 2 and 3?"* — Q5 explicitly consumes Exhibit 2. The reference is missing from the array.
- **Proposed fix:** Add `"CBQ21-A3-Q5"` to Exhibit 2's `ReferencedBy` array.
- **Confidence:** High

---

## Dimension-level assessment

### 1. Correctness
All independently recomputed numeric answers agree with stored values. Spot-checked: DSO (B1), CCC (B1), segment margin (C1), special order profit (C1), PI (E1), WACC (B2), EAA (E2), DuPont ROE (A2, A3), bond pricing (B3), NPV (E3), expected loss (D1, D4), RAROC (D3), forward premium (B6), money-market hedge (B6), WACM (C6), CV/z-score (E4), real options (E5), shadow price (C7), quality-of-income (A5), SGR (A5), inflation restatement (A6). **One error found:** CBQ21-B5-Q6 match text (see above).

### 2. Precision
Each item's fact pattern yields one defensible answer. Exhibits are internally consistent (subtotals reconcile). No missing assumptions detected. All exhibit rows are consumed by at least one item.

### 3. Difficulty Calibration
DifficultyScore values (2–5) align with cognitive demand. Items requiring multi-step calculation (EAA, bond amortization, DuPont, real options) are rated Difficult/Very Difficult (DS 4–5). Recall items (IMA standards, COSO components) are rated Moderate-Easy (DS 2–3). The pack uses exactly 5 canonical Difficulty strings (Easy, Moderate-Easy, Moderate, Difficult, Very Difficult) with zero variants. No misclassifications found.

### 4. Distractor Engineering
All wrong-choice explanations (EW slots) are choice-specific, address the exact error in that choice, and exceed 75 characters. MCQ distractors map to real misconceptions. No defects found.

### 5. Blueprint Alignment
SectionTags, BlueprintDomain, and BlueprintObjectives map to specific CSOs. Topics align with case content. No cross-domain drift detected.

### 6. Part 2 Relevance (tests Part 2 material; not from another exam part)
All cases test Part 2 material (corporate finance, decision analysis, risk management, investment decisions, ethics, financial statement analysis). `Part2OnlyFlag` is `true` on every case. No Part 1 content detected.

---

## Structural cross-checks

- **Scenario realism:** All cases feature named companies, named stakeholders with roles, business triggers, and clear tasks.
- **Exhibit quality:** Professional format; every exhibit referenced by at least one item.
- **ID uniqueness:** All CaseID, ItemID, ExhibitID values are unique within the pack and correctly patterned (`CBQ21-XN-QM`, `CBQ21-XN-EN`).
- **Metadata completeness:** CognitiveLevel and DifficultyScore present on every item. FormulaReference present on calculation items. One exhibit ReferencedBy array is missing a consumer (CBQ21-A3-E2 omitting Q5).
- **Governance compliance:** DL-008 (EW[CC] empty): 33/33 PASS. DL-026 (EW[non-CC] ≥75 chars): all PASS.

---

## Recommendations

1. **Fix CBQ21-B5-Q6 match text** (Critical) — the "~$0.20" figure contradicts the correct $0.78 derived in Q2. This is the only calculation-linked content error in the pack.
2. **Add missing Q5 reference in CBQ21-A3 Exhibit 2** (Informational) — Q5's prompt consumes "Exhibits 2 and 3" but E2's ReferencedBy omits it.

---

## Cross-check response

The following corrections were made after independent verification of contested findings:

| Original finding | Verdict | Action |
|---|---|---|
| Medium: CBQ21-D2-Q2 ExplanationWrongB misphrased | **Misfiled** — the quoted text is in EWA (choice A's slot), not EWB; it correctly explains why A is wrong | Removed |
| Info: spurious Q5 in A3 E2 ReferencedBy | **Inverted** — Q5 is *missing* from E2's ReferencedBy despite Q5's prompt consuming Exhibit 2 | Re-diagnosed; fix direction reversed |
| Info: Difficulty format inconsistency | **Unconfirmed** — census shows exactly 5 canonical strings, zero variants | Removed |
