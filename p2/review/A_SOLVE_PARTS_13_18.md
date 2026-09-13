# Solve & Review: Parts 13–18 (P2-A-097 through P2-A-158)

## Review Methodology
- Independently solved each item from Stem + Choices only before revealing CorrectChoice
- Recomputed all calculations by two independent paths
- Verified each distractor is genuinely wrong and its ExplanationWrong refutes THAT specific choice
- Verified ExplanationCorrect derives the stored key with formula-and-substituted-values
- Verified Topic/LOSTag/BlueprintDomain match the stem content
- Structural cross-checks: EW[CC] empty, non-CC EW ≥50 chars, QID format, Part2OnlyFlag

---

## [P2-A-097] — Structurally incomplete item (missing Choices, CorrectChoice, Explanations)
- Check: structural
- Severity: Critical
- Evidence: Item P2-A-097 contains only LOSTag, Part, Part2OnlyFlag, QuestionID, Section, Stem, Topic, UniqueConceptKey, VerifiedChecks, and question_state. It is missing: Authorities, BlueprintDomain, CalculationItem, Choices (A/B/C/D), CognitiveLevel, CommonTrapReference, CorrectChoice, Difficulty, DifficultyScore, ExplanationCorrect, ExplanationWrongA, ExplanationWrongB, ExplanationWrongC, ExplanationWrongD, FormulaReference, and ItemStyle. The VerifiedChecks claim "Independent analysis: B correctly explains ROE parity through different business models" but there is no CorrectChoice field to verify against and no Choices array from which to derive an answer.
- Proposed fix: The complete item data for P2-A-097 must be restored. The item cannot be answered, reviewed, or used in its current state. The file pack_p2_a.part013.js ends at line 416 with a truncated subsequent item, suggesting the data loss occurred during file splitting.
- Confidence: High

---

## [P2-A-147] — ExplanationWrongA duplicated across file boundary
- Check: structural
- Severity: High
- Evidence: P2-A-147's ExplanationWrongA text ("Reported revenue is the trailing edge of the commercial story: Lumen's recognition lags its bookings, so today's recognized growth reflects contracts signed months ago. The shrinking deferred balance signals that new bookings are falling short of recognition — the forward-looking signal that Nguyen's model needs.") appears verbatim in BOTH pack_p2_a.part017.js (line 478) AND pack_p2_a.part018.js (line 1). The file split incorrectly cut through the ExplanationWrongA field, duplicating it. This creates a data integrity issue: the JSON array in part018.js begins mid-field, and the same string appears as the last line of part017.js.
- Proposed fix: Remove the duplicate ExplanationWrongA line from either part017.js (line 478) or part018.js (line 1) so the field appears exactly once. Verify that the remaining ExplanationWrongA in part018.js is properly preceded by the ExplanationCorrect field from part017.js.
- Confidence: High

---

## [P2-A-158] — Structurally incomplete item (truncated at file end)
- Check: structural
- Severity: Critical
- Evidence: Item P2-A-158 (Gordon growth model) in pack_p2_a.part018.js contains only Authorities, BlueprintDomain, CalculationItem, Choices, CognitiveLevel, CommonTrapReference, CorrectChoice (C), Difficulty, DifficultyScore, ExplanationCorrect, ExplanationWrongA, and ExplanationWrongB. It is missing: ExplanationWrongC (should be empty string for CorrectChoice C), ExplanationWrongD, FormulaReference, ItemStyle, LOSTag, Part, Part2OnlyFlag, QuestionID, Section, Stem, Topic, UniqueConceptKey, VerifiedChecks, and question_state. The file ends at line 480 mid-item.
- Proposed fix: The complete item data for P2-A-158 must be restored. The item cannot be fully reviewed without its identifying fields (Stem, QuestionID) and without ExplanationWrongC (which must be empty) and ExplanationWrongD (which must be ≥50 chars).
- Confidence: High

---

## [P2-A-107] — CommonTrapReference truncated at file boundary
- Check: structural
- Severity: Medium
- Evidence: P2-A-107's CommonTrapReference field reads: "Focusing on stable bottom-line margin while ignoring cost composition — gross margin deterioration o" — the text is cut off mid-word at the file boundary between pack_p2_a.part013.js and pack_p2_a.part014.js. The full text likely continues (e.g., "...often signals structural problems" or similar).
- Proposed fix: Restore the complete CommonTrapReference text. The full value should be reconstructed from the item's intent: the trap is focusing on the stable operating margin while ignoring that gross margin deterioration signals structural product-level economics problems.
- Confidence: Medium

---

## [P2-A-113] — CommonTrapReference truncated at file boundary
- Check: structural
- Severity: Medium
- Evidence: P2-A-113's CommonTrapReference field reads: "Treating higher SGR as always superior — SGR is a constraint, not an objective; dividend policy invo" — the text is cut off mid-word at the file boundary between pack_p2_a.part013.js and pack_p2_a.part014.js. The full text likely continues (e.g., "...involves trade-offs between retention and shareholder payouts" or similar).
- Proposed fix: Restore the complete CommonTrapReference text. The full value should be reconstructed from the item's intent: the trap is treating higher SGR as always superior when SGR is a constraint, not an objective, and dividend policy involves trade-offs.
- Confidence: Medium

---

## [P2-A-115] — CommonTrapReference truncated at file boundary
- Check: structural
- Severity: Medium
- Evidence: P2-A-115's CommonTrapReference field reads: "Comparing ROA across companies with different fixed-asset vintages during inflationary periods witho" — the text is cut off mid-word at the file boundary between pack_p2_a.part014.js and pack_p2_a.part015.js. The full text likely continues (e.g., "...without adjusting for the distortion" or similar).
- Proposed fix: Restore the complete CommonTrapReference text. The full value should be reconstructed from the item's intent: the trap is comparing ROA across companies with different fixed-asset vintages during inflationary periods without adjusting for the historical-cost distortion.
- Confidence: Medium

---

## Clean Items (No Defects Found)

The following items passed all solve, distractor, explanation, topicalness, and structural checks:

**Part 13:** P2-A-098, P2-A-099, P2-A-100, P2-A-101, P2-A-102, P2-A-103, P2-A-104, P2-A-105, P2-A-106

**Part 14:** P2-A-108, P2-A-109, P2-A-110, P2-A-111, P2-A-112, P2-A-114

**Part 15:** P2-A-116, P2-A-117, P2-A-118, P2-A-119, P2-A-120, P2-A-121, P2-A-122, P2-A-123, P2-A-124, P2-A-125

**Part 16:** P2-A-126, P2-A-127, P2-A-128, P2-A-129, P2-A-130, P2-A-131, P2-A-132, P2-A-133, P2-A-134, P2-A-135, P2-A-136

**Part 17:** P2-A-137, P2-A-138, P2-A-139, P2-A-140, P2-A-141, P2-A-142, P2-A-143, P2-A-144, P2-A-145, P2-A-146

**Part 18:** P2-A-148, P2-A-149, P2-A-150, P2-A-151, P2-A-152, P2-A-153, P2-A-154, P2-A-155, P2-A-156, P2-A-157

---

## Mini-Summary

| Metric | Count |
|--------|-------|
| Items reviewed (P2-A-097 to P2-A-158) | 62 |
| Items fully clean | 56 |
| Items with defects | 6 |
| **Critical defects** | 2 (P2-A-097, P2-A-158 — structurally incomplete) |
| **High defects** | 1 (P2-A-147 — duplicated field) |
| **Medium defects** | 3 (P2-A-107, P2-A-113, P2-A-115 — truncated CommonTrapReference) |
| Low defects | 0 |
| Informational | 0 |

### Root Cause Analysis
All 6 defects are structural/data-integrity issues caused by file splitting:
- The pack files were split at arbitrary byte boundaries without respecting JSON object boundaries
- This caused 2 items to lose fields at file boundaries (P2-A-097, P2-A-158)
- 1 item had a field duplicated across the boundary (P2-A-147)
- 3 items had text fields truncated mid-word at boundaries (P2-A-107, P2-A-113, P2-A-115)

### Content Quality Notes
For the 56 clean items:
- All calculation items were independently verified; computed values match stored keys in every case
- All distractors are genuinely wrong and each ExplanationWrong correctly refutes its specific choice
- No misassigned/transposed explanations were found
- No logically equivalent distractor pairs were found
- All ExplanationCorrect entries derive the stored key with appropriate formula-and-substituted-values
- Authority citations (ASC standards, DuPont framework, Altman Z-Score, etc.) are appropriate for the tested concepts
- Topic, LOSTag, and BlueprintDomain accurately describe what each stem tests
- All QIDs match P2-A-NNN format; all Part2OnlyFlag values are strictly boolean true
- All EW[CC] slots are empty; all non-CC EW slots are ≥50 chars
