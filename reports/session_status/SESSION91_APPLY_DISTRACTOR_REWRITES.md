# Session 91 — Application of Session 90 Distractor Rewrites

**Date:** 2026-07-25 09:30 UTC
**Type:** High-Precision Edit Pass — apply approved distractor rewrites from Session 90 staging.
**Status:** Complete — zero edits applied. Systematic QID mapping offset confirmed.

---

## 1. Summary

| Metric | Value |
|--------|-------|
| Candidates extracted from staging | 10 (3 Pack A, 7 Pack C) |
| Mapping verified (Y) | 0 |
| Mapping uncertain / mismatch | 10 |
| Rewrites applied | **0** |
| Pack files modified | **None** |
| CorrectChoice changed | **No** |
| question_state changed | **No** |
| Governance guard tests | 20/20 PASS |

**Outcome:** All 10 CANDIDATE_REWRITE entries from Session 90 staging carry a systematic +1 QID offset due to the dual-block architecture (metadata block → content block, each with own QuestionID). The staging JSON's QID associations point to metadata blocks that do not contain stems or Choices. The actual distractor text exists in the content blocks at QID+1.

Per instructions §3.1 and §4.1, items with stem mismatch or missing distractor text are classified as "Mapping Uncertain — no change in Session 91." No pack file was modified.

---

## 2. Pre-Flight

### Staging Files Inspected

| File | Path | Status |
|------|------|--------|
| Session 90 Review Report | `reports/session_status/SESSION90_DISTRACTOR_QUALITY_REVIEW.md` | Read |
| Candidate Rewrites (MD) | `knowledge/DISTRACTOR_REWRITE_CANDIDATES_S90.md` | Read |
| Candidate Rewrites (JSON) | `knowledge/DISTRACTOR_REWRITE_CANDIDATES_S90.json` | Read |

### Candidates Extracted

**Pack A (Certified, DL-016 caveat):**
- P1-A-008, P1-B-074, P1-D-004

**Pack C (Unprocessed, DL-012 clone group):**
- P1-CC-021 through P1-CC-027

### Backups Created

| File | Backup |
|------|--------|
| `pack_a_corrected.js` | `backups/pack_a_corrected.js.bak-s91-20260725093019` (1,798,369 bytes) |
| `pack_c_corrected.js` | `backups/pack_c_corrected.js.bak-s91-20260725093019` (1,685,651 bytes) |
| `REVISION_HISTORY.md` | `backups/REVISION_HISTORY.md.bak-s91-20260725093019` (509,296 bytes) |

### Mapping Verification Method

For each candidate QID:
1. Located the pack file object by `"QuestionID"` match (grep).
2. Read the full JSON object at that location.
3. Compared: `Stem` vs. `stem_excerpt` from JSON.
4. Compared: `Choices.[A-D]` vs. `original_distractor` from JSON.
5. Checked for dual-block architecture (metadata block vs. content block divergence).

---

## 3. Pack A — DL-016 Mapping Verification

All three Pack A candidates exhibit the documented DL-016 dual-block offset. Pack A stores a **metadata block** (QuestionID, question_state, ExplanationWrong[A-D]) followed by the **next item's content block** (Topic, Stem, Choices, CorrectChoice, ExplanationCorrect, with the NEXT QID). The scanner associated the content block's distractor with the preceding metadata block's QID, producing a +1 offset.

### P1-A-008

| Verification Step | Result |
|-------------------|--------|
| QID located at | Line 392 (`pack_a_corrected.js`) |
| Stem in QID block | "Yukon has FIFO inventory whose replacement value fell below selling price..." |
| Expected stem_excerpt | "Zephyr reduced inventory quantities below older LIFO layers during a period of rising costs." |
| Stem matches? | **NO.** P1-A-008's metadata block describes a FIFO/NRV (lower of cost) question. |
| Expected original distractor | "Assume LIFO liquidation always decreases income" |
| Distractor found at QID block? | **NO.** Choice A at P1-A-008 is "Ignore declines unless inventory has been sold." |
| Actual location of distractor | Content block for P1-A-009 (line 423, Choice A), topic "A.009 LIFO liquidation effect", stem "Zephyr reduced inventory..." |

**Verdict: Mapping Uncertain — no change in Session 91.** The distractor text exists at P1-A-009, not P1-A-008.

### P1-B-074

| Verification Step | Result |
|-------------------|--------|
| QID located at | Line 7430 (`pack_a_corrected.js`) |
| Stem in QID block | "A company expects to sell 18,000 units in July and 20,000 units in August..." |
| Expected stem_excerpt | "Oakhaven uses participative budgeting, allowing department managers to set their own targets." |
| Stem matches? | **NO.** P1-B-074's metadata block describes a production budget calculation. |
| Expected original distractor | "It guarantees higher employee morale in every case" |
| Distractor found at QID block? | **NO.** Choices at P1-B-074 are unit amounts (A=18,000, B=19,000, C=22,000, D=17,000). |
| Actual location of distractor | Content block for P1-B-075 (line 7462, Choice D), topic "B.075 participative budgeting drawback", stem "Oakhaven uses participative budgeting..." |

**Verdict: Mapping Uncertain — no change in Session 91.** The distractor text exists at P1-B-075, not P1-B-074.

### P1-D-004

| Verification Step | Result |
|-------------------|--------|
| QID located at | Line 13802 (`pack_a_corrected.js`) |
| Stem in QID block | "Vanguard applies manufacturing overhead using a predetermined rate of $30 per direct labor hour..." |
| Expected stem_excerpt | "Yukon has partially completed units at period-end. Which response is most appropriate?" |
| Stem matches? | **NO.** P1-D-004's metadata block describes an overhead variance calculation. |
| Expected original distractor | "Count partially completed units as zero in all cases" |
| Distractor found at QID block? | **NO.** Choices at P1-D-004 are overhead variance amounts. |
| Actual location of distractor | Content block for P1-D-005 (line 13832, Choice B), topic "D.005 equivalent units concept", stem "Yukon has partially completed units at period-end." |

**Verdict: Mapping Uncertain — no change in Session 91.** The distractor text exists at P1-D-005, not P1-D-004.

---

## 4. Pack C — DL-012 Clone Group Verification

All seven Pack C candidates exhibit the **same** +1 QID offset pattern as Pack A. Pack C uses a dual-block architecture: a metadata block (QuestionID, question_state, ExplanationWrong[A-D]) followed by a content block (Topic, Stem, Choices, CorrectChoice, ExplanationCorrect) with its own (next) QuestionID.

The distractor text "It guarantees goal congruence in all cases" exists in the content blocks but is associated with the preceding metadata block's QID.

### Mapping Table

| Candidate QID | Content Block QID | Stem (Company) | Distractor Slot | Distractor Found at Candidate QID? | Verdict |
|---|---|---|---|---|---|
| P1-CC-021 | P1-CC-022 | Vesper | Choice D | **No** — metadata block, no Choices | Clone-group mismatch |
| P1-CC-022 | P1-CC-023 | Westbrook | Choice D | **No** — metadata block, no Choices | Clone-group mismatch |
| P1-CC-023 | P1-CC-024 | Yarrow | Choice C | **No** — metadata block, no Choices | Clone-group mismatch |
| P1-CC-024 | P1-CC-025 | Zenith Bay | Choice C | **No** — metadata block, no Choices | Clone-group mismatch |
| P1-CC-025 | P1-CC-026 | Ashgrove | Choice A | **No** — metadata block, no Choices | Clone-group mismatch |
| P1-CC-026 | P1-CC-027 | Birchwood | Choice D | **No** — metadata block, no Choices | Clone-group mismatch |
| P1-CC-027 | P1-CC-028 | Copperline | Choice C | **No** — metadata block, no Choices | Clone-group mismatch |

**All seven candidate QIDs** map to metadata-only blocks (no Stem, no Choices). The actual distractor text is in the content block of the next QID. Per §4.1: "If the original distractor isn't found in the expected slot, do not guess. Mark that QID as clone-group mismatch."

### P1-CC-027 — Deferred

Per §4.3, P1-CC-027 has `proposed_distractor: null` in the staging JSON and was already flagged for deferral. No approved replacement exists. Even if the QID mapping were correct, this item would not receive an edit in Session 91.

---

## 5. Technical Accuracy Validation

Although zero rewrites were applied, all nine proposed replacements (excluding P1-CC-027's null proposal) were reviewed against CMA Part 1 doctrine:

| Proposed Replacement | Wrong? | Plausible? | CMA-consistent? |
|---|---|---|---|
| "Consider whether the decline in replacement cost is temporary" | Yes — LIFO liquidation income effect is independent of replacement cost trends | Yes — candidate might conflate LIFO liquidation with impairment/recoverability | Yes |
| "It consistently leads to higher employee satisfaction with the budget process" | Yes — participative budgeting can increase satisfaction, but "consistently" overstates the certainty | Yes — realistic common claim | Yes |
| "Exclude partially completed units from the equivalent unit calculation" | Yes — equivalent units exist precisely to include partially completed units | Yes — candidate might confuse process costing with job costing | Yes |
| "It eliminates all transfer pricing disputes between divisions" | Yes — negotiation can reduce but not eliminate disputes | Yes — plausible overstatement | Yes |
| "It automatically aligns divisional goals with corporate objectives" | Yes — alignment requires active negotiation, not automatic | Yes — common misconception | Yes |
| "It eliminates the need for top management intervention in transfer pricing" | Yes — intervention may still be needed if divisions deadlock | Yes — confuses autonomy with independence | Yes |
| "It automatically results in the same transfer price as market-based pricing" | Yes — negotiated prices can deviate from market | Yes — plausible confusion | Yes |
| "It prevents all suboptimization by selling divisions" | Yes — negotiation helps but cannot prevent all suboptimization | Yes — overstatement of negotiation's power | Yes |
| "It makes the transfer price irrelevant to divisional performance evaluation" | Yes — transfer price directly affects performance metrics | Yes — candidate might think negotiation neutralizes price impact | Yes |

All proposals are technically sound as wrong-but-plausible distractors. Validation deferred to the session that applies them with corrected QID mapping.

---

## 6. Tests

### Governance Guard

```
Command: node scripts/test_governance_guard.js
Result: 20 PASS, 0 FAIL
```

No validator suite changes needed — no pack files were modified.

### CorrectChoice / question_state Invariance

Confirmed by direct file inspection:
- No pack file was modified — all CorrectChoice and question_state values are unchanged.
- Certified counts unchanged — zero items transitioned.

---

## 7. Governance

| Check | Status |
|-------|--------|
| No CorrectChoice values changed | **Confirmed** |
| No question_state values changed | **Confirmed** |
| Only targeted distractor text modifications | **N/A — zero edits applied** |
| Backup protocol followed | **Confirmed** (3 backups created) |
| REVISION_HISTORY.md entry appended | **Pending** (see below) |
| Governance guard tests pass | **20/20 PASS** |
| Rule 5 batch cap respected | **N/A — zero items modified** |

---

## 8. Risks and Follow-ups

### Blocking — QID Mapping Offset

The Session 90 staging files map all 10 distractor candidates to QID - 1 of their actual location. This is a systematic offset caused by the dual-block architecture (metadata block → content block, each carrying its own QuestionID). The offset pattern is identical across Pack A and Pack C.

**Corrected QID mapping:**

| Staging QID | Actual QID | Distractor |
|---|---|---|
| P1-A-008 | **P1-A-009** | "Assume LIFO liquidation always decreases income" |
| P1-B-074 | **P1-B-075** | "It guarantees higher employee morale in every case" |
| P1-D-004 | **P1-D-005** | "Count partially completed units as zero in all cases" |
| P1-CC-021 | **P1-CC-022** | "It guarantees goal congruence in all cases" |
| P1-CC-022 | **P1-CC-023** | "It guarantees goal congruence in all cases" |
| P1-CC-023 | **P1-CC-024** | "It guarantees goal congruence in all cases" |
| P1-CC-024 | **P1-CC-025** | "It guarantees goal congruence in all cases" |
| P1-CC-025 | **P1-CC-026** | "It guarantees goal congruence in all cases" |
| P1-CC-026 | **P1-CC-027** | "It guarantees goal congruence in all cases" |
| P1-CC-027 | **P1-CC-028** | "It guarantees goal congruence in all cases" (proposal: null) |

### Recommendation

A future session should:
1. Relabel the staging file entries with corrected QIDs.
2. For Pack A: re-verify that P1-A-009, P1-B-075, and P1-D-005 are eligible for distractor rewrites (all are Certified, in learner pool).
3. For Pack C: re-confirm P1-CC-022 through P1-CC-027 are Unprocessed and eligible.
4. Author a replacement for P1-CC-028 (Copperline) — currently deferred.
5. Apply rewrites with corrected QID mapping and full backup protocol.

---

## 9. Deferred REVISION_HISTORY Block

```markdown
## Session 91 — Apply Session 90 Distractor Rewrites (2026-07-25)

**Type:** High-Precision Edit Pass — apply approved distractor rewrites from Session 90 staging.
**Outcome:** Zero edits applied. Systematic +1 QID mapping offset confirmed for all 10 candidates.

**Pre-flight:**
- Staging files read: SESSION90_DISTRACTOR_QUALITY_REVIEW.md, DISTRACTOR_REWRITE_CANDIDATES_S90.md, DISTRACTOR_REWRITE_CANDIDATES_S90.json
- 10 CANDIDATE_REWRITE entries extracted (3 Pack A, 7 Pack C)
- Backups created: pack_a_corrected.js.bak-s91-20260725093019, pack_c_corrected.js.bak-s91-20260725093019, REVISION_HISTORY.md.bak-s91-20260725093019

**Mapping verification (all 10 items — direct file inspection):**
- Pack A (P1-A-008, P1-B-074, P1-D-004): All 3 exhibit DL-016 +1 QID offset. Metadata block (staging QID) does not contain the stem or distractor listed in staging files. Actual locations: P1-A-009, P1-B-075, P1-D-005. Verdict: Mapping Uncertain — no change.
- Pack C (P1-CC-021 through P1-CC-027): All 7 exhibit same +1 QID offset. Metadata blocks contain no Stems or Choices. Actual locations: P1-CC-022 through P1-CC-028. Verdict: Clone-group mismatch — no change.
- P1-CC-027: Additionally deferred (proposed_distractor = null in staging JSON).

**Corrected QID mapping:**
- P1-A-008 → P1-A-009 (LIFO liquidation)
- P1-B-074 → P1-B-075 (participative budgeting)
- P1-D-004 → P1-D-005 (equivalent units)
- P1-CC-021 → P1-CC-022 (Vesper — transfer pricing)
- P1-CC-022 → P1-CC-023 (Westbrook — transfer pricing)
- P1-CC-023 → P1-CC-024 (Yarrow — transfer pricing)
- P1-CC-024 → P1-CC-025 (Zenith Bay — transfer pricing)
- P1-CC-025 → P1-CC-026 (Ashgrove — transfer pricing)
- P1-CC-026 → P1-CC-027 (Birchwood — transfer pricing)
- P1-CC-027 → P1-CC-028 (Copperline — transfer pricing, deferred)

**Technical validation:** All 9 proposed replacements (excl. null) reviewed — all are wrong-but-plausible distractors consistent with CMA Part 1 doctrine. Validation deferred to application session.

**Tests:** Governance guard 20/20 PASS. Zero pack files modified — no CorrectChoice or question_state changes.
**Governance:** Rule 5 N/A (zero edits). Backups confirmed. Report: reports/session_status/SESSION91_APPLY_DISTRACTOR_REWRITES.md
**Next:** Relabel staging files with corrected QIDs → apply rewrites in a follow-up session.
```
