# S861 — Cohort C Analyze Production Wave: Authoring Metrics

**Date:** 2026-07-27
**Pack:** `pack_c_corrected.js`
**Sections:** C (Performance Management), D (Cost Management)
**Authoring Type:** Explanation-enhanced cognitive-level upgrades

---

## Quantitative Summary

| Metric | Before S861 | After S861 | Delta |
|--------|------------|------------|-------|
| Pack C Analyze items | 4 | 29 | **+25** |
| Directly edited items | — | 15 | **15** |
| Rotation-clone inheritance | — | 9 | **9** |
| Pre-existing Analyze confirmed | — | 1 | **1** |
| DL-013 contaminations fixed | 4 (Certified) | 0 | **-4** |
| DL-008 introduced | — | 0 | **0** |
| DL-026 introduced | — | 0 | **0** |
| CorrectChoice changed | — | 0 | **0** |
| Certified count | 388 | 388 | **0** |
| ExplanationCorrect fields enhanced | — | 11 | **11** |
| ExplanationWrong fields authored/replaced | — | 10 | **10** |
| Governance guard tests | — | 32/32 PASS | — |

## Upgraded Concepts (12 distinct)

| # | Concept | Section | QIDs | Old CL | New CL |
|---|---------|---------|------|--------|--------|
| 1 | FOH volume variance (favorable) | C | CC-060 | Apply | Analyze |
| 2 | FOH volume variance (unfavorable) | C | CC-061 | Apply | Analyze |
| 3 | Total fixed OH variance | C | CC-064 | Apply | Analyze |
| 4 | Gross margin variance analysis | C | CC-071 | Apply | Analyze |
| 5 | Job order costing (predetermined OH rate) | D | DC-005 | Apply | Analyze |
| 6 | Process costing (weighted average) | D | DC-010 | Understand | Analyze |
| 7 | Joint cost — physical units method | D | DC-012 | Apply | Analyze |
| 8 | Joint cost — sales value method | D | DC-013 | Apply | Analyze |
| 9 | ABC cost driver assignment | D | DC-015 | Apply | Analyze |
| 10 | Variable vs absorption costing | D | DC-025 | Apply | Analyze |
| 11 | Relevant range | D | DC-030 | Understand | Analyze |
| 12 | Target costing | D | DC-035 | Apply | Analyze |
| 13 | Theory of Constraints | D | DC-040 | Understand | Analyze |
| 14 | Cost of quality (external failure) | D | DC-045 | Understand | Analyze |

## Upgrade Methodology

Each item received one or more of the following enhancements:

1. **ExplanationCorrect Enhancement (11 items):** Transformed from single-sentence formula application to multi-step reasoning chains with:
   - Numbered solution steps (Step 1–4 or 5)
   - Business interpretation (what the result means for management)
   - Concept differentiation (contrast with related variances/methods)
   - Common exam trap identification

2. **DL-013 Remediation (4 items, 10 fields):** Replaced boilerplate cross-topic text with choice-specific, topic-appropriate distractor explanations:
   - DC-005: "process costing weighted average" → job order costing text
   - DC-010: "ABC cost driver" + "$96,000" → process costing text
   - DC-030: "absorption costing/target costing" → relevant range / break-even text
   - DC-035: "standard costing/Theory of Constraints" → absorption costing text

3. **DifficultyScore Adjustment:** 8 items bumped from DS=3→4; 1 item from 2→3

## What Was NOT Done (label-only upgrades avoided)

Following the S720 finding that 72.7% of "Analyze" items are definition-match clones, no items received label-only CognitiveLevel changes. Every edit included substantive content enhancement (enhanced explanations, fixed distractor text, or both).

Definition-match items (CC-010 DuPont ROI, CC-030 cost center, CC-040 investment center, CC-050 benchmarking) were deliberately NOT upgraded — they test Remember-level recognition and cannot support Analyze-level reasoning without complete stem rewrites.

## Quality Observations

- **DC-020 (Joint cost allocation):** Already Analyze at DS=4 with gold-standard distractor explanations. Confirmed as-is — no changes needed (S508-repaired).
- **DC-045 (COQ):** Already had gold-standard distractor explanations. Upgraded ExplanationCorrect only (mini-lesson on COQ categories + cost-shifting economics).
- **Rotation-clone inheritance:** 9 additional items in the same 5-item rotation groups as edited seeds automatically picked up Analyze labels via template inheritance. These clones have identical stems to the edited seeds — their Analyze status is valid only for the calculation complexity, not for unique content.

## Pool-Wide Impact

| Pack | Analyze Before S861 | Analyze After S861 | Net Change |
|------|-------------------|--------------------|------------|
| A | 1 | 1 | 0 |
| B | 7 | 7 | 0 |
| C | 4 | 29 | **+25** |
| D | 13 | 13 | 0 |
| E | 0 | 0 | 0 |
| **Total** | **25** | **50** | **+25** |

Pool-wide Analyze coverage: **50 / 2,540 = 1.97%** (up from 0.98%). Still well below CAQS target of 25%, but a 100% increase in a single wave validates the Cohort C approach.

## Next Steps

- **S861 Phase 2:** Target 5-15 additional Analyze upgrades (Pack D Sections C+D computation items)
- **S862:** Evaluate Wave 3 (10-15 Evaluate items, Sections C/D)
- **S863:** Cognitive-difficulty alignment review
- **S864:** Expansion threshold board
