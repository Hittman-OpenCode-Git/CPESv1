# 800-Series: Asset Recovery & Cohort C Expansion — Execution Plan

**Status:** PENDING APPROVAL
**Plan Date:** 2026-07-27
**Depends On:** S267-S270 (May Admin COMPLETE), Pre-Session 0 (Pack C Rollback COMPLETE)

---

## Ground Truth: What We Know

### Current Pack C State (post-rollback to S829 backup)

| Metric | Value |
|--------|-------|
| Total items | 500 |
| Certified | 388 |
| Archived | 112 |
| XXXMARKER artifacts | 42 instances (DL-016 Section F rotation artifacts) |
| Section F items | 75 (mix of Certified/Archived) |
| Sections | A(75), B(100), C(100), D(75), E(75), F(75) |

### Lost Edits (documented in REVISION_HISTORY.md)

**S861 — 15 Analyze Upgrades (Pack C Sections C+D):**
- 14 items: CognitiveLevel Apply/Understand → Analyze with expanded ExplanationCorrect
- 1 item (P1-DC-020): already Analyze, kept at Analyze
- 4 DL-013 contaminations fixed (P1-DC-005, P1-DC-010, P1-DC-030, P1-DC-035)

**S862 — 1 Evaluate Upgrade (Pack C Section C):**
- P1-CC-065: Apply → Evaluate with full framework (evaluation criteria, tradeoff analysis, recommendation, all EW fields rewritten)
- DS 1→2

**S864 — Governance Only (no content lost)**

### Critical Pre-Flight Question

The S829 backup restored in Pre-Session 0 was taken AFTER S829 (Section F DL-016 remediation) but supposedly BEFORE S861/S862/S864. However, the current fileSHOWS some items at Analyze level (e.g., CC-060 at Analyze, DS 4) that the REVISION_HISTORY S861 table claims were upgraded FROM Apply. This means:

1. Either S829 ALREADY contained some Analyze items from an even earlier session, OR
2. The restored backup is actually a different version than described

**Pre-flight MUST verify current state of all 15 S861 target QIDs** before any reconstruction begins to avoid re-doing work that survived.

---

## Scope Boundaries

**IS:**
- Verify current Pack C state for S861/S862 target QIDs (pre-flight)
- Reconstruct only the edits that were actually lost
- Author new Analyze-level MCQs (40 items) for content throughput
- Author new Evaluate-level case studies (items should be MCQs not case studies since that's the format)
- Validate all outputs via governance guard, DL-008, DL-026, parse checks
- Write REVISION_HISTORY entries for all changes
- Generate deliverable artifacts per session

**IS NOT:**
- Modifying packs other than Pack C (unless new content requires placement in other packs)
- Changing answer keys or Certified/Archived question_state values
- Running full pool-wide certification (deferred to post-expansion)
- Manual admin platform operation (already certified for general use)
- DL-016 XXXMARKER remediation (pre-existing, tracked separately)

---

## Execution Pipeline — 4 Sessions

### SESSION 869: Asset Reconstruction & Pre-Flight

**Goal:** Verify what survived, reconstruct only what was lost.

**Phase 1 — Pre-Flight Audit (T0):**
1. Read current CognitiveLevel, DifficultyScore, and EW fields for ALL 15 S861 target QIDs
2. Read CC-065 (S862 target) for current CL, DS, EC content
3. Read the 4 DL-013 target QIDs for current EW contaminated state
4. Compare against REVISION_HISTORY S861/S862 tables
5. Produce a RECONSTRUCTION_QUEUE.json listing ONLY items needing rework
6. Verify governance guard baseline (should be 45/45)

**Phase 2 — Reconstruction (if needed):**
1. Backup Pack C (per AGENTS.md §3)
2. For each item in RECONSTRUCTION_QUEUE:
   - Upgrade CognitiveLevel: Apply/Understand → Analyze or Evaluate
   - Expand ExplanationCorrect with multi-step analysis/tradeoff reasoning
   - Upgrade DifficultyScore per S861 table
   - Rewrite all non-CC ExplanationWrong fields (must NOT describe the correct answer)
   - Ensure ExplanationWrong[CorrectChoice] = "" (DL-008 compliance)
3. For DL-013 items: Replace contaminated EW fields with choice-specific distractor text
4. Verify: parse check, DL-008 scan, DL-026 scan

**Phase 3 — Section F Assessment:**
- Audit Section F current state (75 items, 42 XXXMARKER)
- Determine if S829-level remediation was already applied
- Flag items needing Section F remediation as deferred (non-blocking for this chain)

**Deliverables:**
- `reports/session869/SESSION869_RECONSTRUCTION_QUEUE.json`
- `reports/session869/SESSION869_RECOVERY_MANIFEST.json`

**Halt Conditions:**
- Governance guard < 45 PASS
- Any DL-008 introduced
- Any DL-026 introduced
- Parse error detected
- See §Automatic Stop Conditions below

---

### SESSION 870: Analyze Candidate Generation

**Goal:** Generate 40 new Analyze-level MCQ candidate objects in Framework v2 format.

**Phase 1 — Topic Selection:**
- Scan remaining Pack C items (Sections A-F) for non-Analyze items with Analyze potential
- Cross-reference against CMA Part 1 Learning Outcome Statements
- Select 40 topics across Sections A-F with balanced topic distribution
- Avoid topics already covered by existing Analyze items

**Phase 2 — MCQ Authoring:**
For each item:
1. Knowledge/Skill/Ability verb: Analyze (per IMA taxonomy)
2. Stem: Scenario-based requiring multi-step reasoning, NOT definition recall
3. Choices: 4 options (A-D), all plausible, one clearly correct
4. ExplanationCorrect: Multi-step reasoning path with intermediate conclusions
5. ExplanationWrong[A-D]: Choice-specific distractor text (non-CC must not describe correct answer)
6. DL-008 compliance: ExplanationWrong[CorrectChoice] = ""
7. Metadata: All Framework v2 fields (Part, Section, Topic, MicroTopic, UniqueConceptKey, LOSTag, Difficulty, ItemType, ItemStyle, etc.)
8. CognitiveLevel: "Analyze"
9. DifficultyScore: 3-4 (Moderate to Difficult)

**Output format:** Single JS array `MCQ_BANK_ANALYZE_CANDIDATES` in Framework v2 format

**Deliverables:**
- `reports/session870/SESSION870_ANALYZE_CANDIDATES.json`
- Generated JS file: `registry/analyze_candidates_cohort_c.js`

---

### SESSION 871: Evaluate Candidate Generation

**Goal:** Generate 20 new Evaluate-level MCQ items in Framework v2 format.

**Phase 1 — Topic Selection:**
- Identify complex, multi-variable topics suitable for Evaluate level
- Focus on judgment, recommendation, tradeoff analysis, and criteria application
- Balanced across CMA Part 1 blueprint sections

**Phase 2 — Evaluate MCQ Authoring:**
For each item (Evaluate = highest cognitive level in MCQ format):
1. Stem: Multi-variable scenario requiring judgment, recommendation, or tradeoff analysis
2. Must include explicit evaluation criteria, tradeoff analysis, or recommendation framework
3. Choices: Competing valid recommendations with subtle distinctions
4. ExplanationCorrect: Includes evaluation criteria (a-c), tradeoff analysis, and recommended approach
5. ExplanationWrong: Why each competing recommendation is inferior (with specific reasoning)
6. DL-008: ExplanationWrong[CorrectChoice] = ""
7. CognitiveLevel: "Evaluate"
8. DifficultyScore: 4 (Difficult) — Evaluate items should challenge
9. All Framework v2 metadata fields

**Output format:** Single JS array `MCQ_BANK_EVALUATE_CANDIDATES` in Framework v2 format

**Deliverables:**
- `reports/session871/SESSION871_EVALUATE_CANDIDATES.json`
- Generated JS file: `registry/evaluate_candidates_cohort_c.js`

---

### SESSION 872: Quality Validation & Master Commit

**Goal:** Validate all reconstructed and generated items, commit to pack files.

**Phase 1 — Parse Validation:**
- Verify `MCQ_BANK_C` parses as valid JavaScript (no XXXMARKER, no missing commas)
- Verify `MCQ_BANK_ANALYZE_CANDIDATES` parses
- Verify `MCQ_BANK_EVALUATE_CANDIDATES` parses

**Phase 2 — Governance Scans:**
- DL-008: ExplanationWrong[CorrectChoice] = "" for ALL items (0 exposure)
- DL-026: All non-CC EW fields have choice-specific content (0 exposure)
- DL-030: Answer accuracy (all CorrectChoice values verified)
- Governance guard: Must return 45/45 PASS

**Phase 3 — Pool Integrity:**
- Certified count: Must not decrease (2,298 baseline)
- No new question_state regressions
- All new items default to `question_state: "Unprocessed"` (not in learner pool until certified)

**Phase 4 — Commit:**
1. Backup all modified pack files
2. Merge reconstructed edits into `pack_c_corrected.js`
3. Append new candidate items to appropriate pack files OR to staging registry
4. Write REVISION_HISTORY.md entries for all changes
5. Update CURRENT_BASELINES.md hashes

**Deliverables:**
- `reports/session872/SESSION872_QUALITY_VALIDATION.json`
- `reports/session872/SESSION872_MASTER_MERGE.json`
- `reports/session872/EXPANSION_READINESS_SCORE.md`

---

## Automatic Stop Conditions

Execution of this chain must immediately HALT and ROLLBACK if:

| # | Condition | Verdict on Failure |
|---|-----------|-------------------|
| 1 | `governance_guard < 45_PASS` | HALT |
| 2 | `new_content_dl_008_exposure > 0` | HALT |
| 3 | `new_content_dl_026_exposure > 0` | HALT |
| 4 | `parse_error_detected == TRUE` | HALT |
| 5 | `certified_pool_count < 2298` | HALT |
| 6 | `answer_key_change_detected == TRUE` | HALT |
| 7 | `content_corruption_introduced == TRUE` | HALT (XXXMARKER, missing commas, unclosed braces) |

---

## Success Criteria

- [ ] All S861/S862 lost edits reconstructed and verified
- [ ] 40 new Analyze-level MCQ candidates generated
- [ ] 20 new Evaluate-level MCQ candidates generated
- [ ] Governance guard 45/45 PASS across all sessions
- [ ] DL-008: 0 new exposures
- [ ] DL-026: 0 new exposures
- [ ] 0 answer-key changes
- [ ] 0 pack file corruption
- [ ] Certified pool stable at ≥ 2,298
- [ ] REVISION_HISTORY.md entries written for all sessions
- [ ] All deliverable files produced (one JSON + one MD per session)

---

## Risk Register

| Risk | Severity | Mitigation |
|------|----------|------------|
| Current Pack C already partially upgraded (ambiguous rollback) | MEDIUM | Pre-flight audit (S869 Phase 1) verifies each QID before reconstruction |
| XXXMARKER artifacts in Section F affect new content | LOW | Section F remediation deferred; new content placed in different sections |
| Sub-agent write-permission failures | MEDIUM | Direct in-process execution as fallback (per taste: "pivot to direct execution") |
| Evaluate MCQ quality too low (definition-recall vs. genuine judgment) | HIGH | Follow S862 Evaluate framework; Classification Board review if available |
| Content throughput underestimation (AI generation ≠ validated content) | MEDIUM | Each item requires complete Framework v2 metadata; quality over quantity |
| File corruption during multi-session writes | HIGH | Backup before every write (AGENTS.md §3); parse check after every write |
