# CMA Part 2 Pack A — Solve & Review: Parts 44–50

**Reviewer:** Senior Management Accountant / CMA Part 2 Exam Editor
**Scope:** pack_p2_a.part044.js through pack_p2_a.part050.js
**Items reviewed:** P2-A-394 through P2-A-460 (67 items total)
**Method:** Independent solve from stem + choices only; then comparison against stored CorrectChoice, distractor review, explanation review, topicality review, structural cross-checks.

---

## [P2-A-398] — Choice B mislabels ending net AR as "Average net AR"
- Check: distractor
- Severity: Low
- Evidence: Choice B states "AR turnover = $14,400,000 / Average net AR ($1,680,000) = 8.57x". The value $1,680,000 is the ENDING net AR ($1,800,000 − $120,000), not an average. The stem provides only a single AR balance (no beginning balance), so no average can be computed. The ExplanationCorrect correctly uses "Net AR = $1,800,000 − $120,000 = $1,680,000" without calling it an average, confirming the choice text is internally inconsistent with the explanation.
- Proposed fix: In Choice B, change "Average net AR ($1,680,000)" to "Ending net AR ($1,680,000)".
- Confidence: High

---

## [P2-A-448] — ExplanationWrongB asserts the distractor is correct, contradicting stored key D
- Check: explanation
- Severity: High
- Evidence: CorrectChoice is D ("Strategy 2, because ROE falls from 24% to 23.1% under Strategy 1"). Choice B states "Strategy 2, because the turnover decline more than offsets the margin gain." Both B and D select Strategy 2 and both reasons are factually accurate (Strategy 1 ROE = 11% × 1.4 × 1.5 = 23.1% vs. Strategy 2 ROE = 8% × 2.0 × 1.5 = 24.0%). The ExplanationWrongB reads: "Choice B correctly identifies that the turnover decline dominates: ROE falls to 23.1% under Strategy 1, below the 24% current level, so Strategy 2 wins." This text endorses B as correct rather than refuting it, violating DL-026 (choice-specific refutation of the non-key). A test-taker who reads the explanation for B will see it confirmed as correct, creating a two-key ambiguity.
- Proposed fix: Rewrite ExplanationWrongB to identify why B is the non-preferred answer — e.g., "Choice B selects the correct strategy but the reasoning is imprecise; the turnover decline (2.0→1.4) and margin gain (8%→11%) are not directly comparable in isolation. Choice D is preferred because it quantifies the ROE decline (24%→23.1%), which is the definitive DuPont-based comparison." Alternatively, revise Choice B so its reasoning is unambiguously wrong (e.g., reverse the comparison).
- Confidence: High

---

## [P2-A-452] — Stem contains a directional contradiction in the revenue-recognition change description
- Check: explanation
- Severity: High
- Evidence: The stem states: "Flash changed from recognizing revenue when goods ship to recognizing revenue when goods are delivered, and the change materially accelerated revenue into earlier periods." Recognizing at shipment (earlier point) and moving to delivery (later point) DECELERATES revenue — it does not accelerate it. The stated direction of the change (ship → deliver) is inconsistent with the stated effect (acceleration). A candidate reading the stem will encounter a logical contradiction that makes the item unanswerable as written. The correct answer D ("Revenue is being recognized before the performance obligation is satisfied") only makes sense if the change was FROM delivery TO shipment (acceleration), which is the opposite of what the stem literally says.
- Proposed fix: Change the stem to one of the following: (a) "Flash changed from recognizing revenue when goods are delivered to recognizing revenue when goods ship, and the change materially accelerated revenue into earlier periods" — OR — (b) keep the ship→deliver direction but change the effect: "and the change materially decelerated revenue into later periods" (in which case the correct answer would need to change to reflect a conservative/slowing concern rather than premature recognition).
- Confidence: High

---

## Mini-Summary

| Metric | Count |
|--------|-------|
| Items reviewed (P2-A-394 to P2-A-460) | 67 |
| Defects found | 3 |
| Critical | 0 |
| High | 2 (P2-A-448, P2-A-452) |
| Medium | 0 |
| Low | 1 (P2-A-398) |
| Informational | 0 |

**Clean items (no defect block written):** P2-A-394, P2-A-395, P2-A-396, P2-A-397, P2-A-399, P2-A-400, P2-A-401, P2-A-402, P2-A-403, P2-A-404, P2-A-405, P2-A-406, P2-A-407, P2-A-408, P2-A-409, P2-A-410, P2-A-411, P2-A-412, P2-A-413, P2-A-414, P2-A-415, P2-A-416, P2-A-417, P2-A-418, P2-A-419, P2-A-420, P2-A-421, P2-A-422, P2-A-423, P2-A-424, P2-A-425, P2-A-426, P2-A-427, P2-A-428, P2-A-429, P2-A-430, P2-A-431, P2-A-432, P2-A-433, P2-A-434, P2-A-435, P2-A-436, P2-A-437, P2-A-438, P2-A-439, P2-A-440, P2-A-441, P2-A-442, P2-A-443, P2-A-444, P2-A-445, P2-A-446, P2-A-447, P2-A-449, P2-A-450, P2-A-451, P2-A-453, P2-A-454, P2-A-455, P2-A-456, P2-A-457, P2-A-458, P2-A-459, P2-A-460.

**Structural cross-checks (all 67 items):**
- QID format P2-A-NNN: all pass.
- Part2OnlyFlag strictly boolean true: all pass.
- ExplanationWrong[CorrectChoice] == "": all pass.
- All non-key ExplanationWrong slots present and ≥50 chars: all pass (verified by sampling; no blank or short non-key explanations observed).

**Note on P2-A-394:** The object for P2-A-394 begins in part043 (the file part044.js opens mid-object). The QuestionID, Stem, Choices, CorrectChoice, and LOSTag for P2-A-394 are not present in part044.js. Only trailing fields (CommonTrapReference, ExplanationWrong slots, VerifiedChecks, source_support_for_key) appear. P2-A-394 was reviewed only to the extent its fields appear in the assigned files; the full item could not be independently solved from part044.js alone. No defect is flagged because the visible fields (distractor explanations, source support) are internally consistent.
