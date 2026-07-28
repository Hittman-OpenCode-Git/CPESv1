# S317 — Domain E Wave 3 Certification Review Plan

## Discovery Summary

| Finding | Detail |
|---------|--------|
| Certified baseline | 2,201 (Pack A:481, B:500, C:350, D:350, E:520) — confirmed via direct grep |
| Wave 3 items | 10 items in `reports/SESSION316_AUTHORING_BATCH_WAVE3.json` only |
| pack_e status | 520 items, none are Wave 3 candidates (R26-R40 not present) |
| Item state | All 10 have `question_state: "Unprocessed"`, `ProductionStatus: "Draft"` |
| Gate 0 | DUPLICATE_PREVENTION_PASS (S316 verified, collision detection caught R21-R25/R28/R33) |
| Gate 1 | COMPLETE (Draft + quality pre-audit done in S316) |
| Gates 2-4 | DEFERRED_TO_S317_CERTIFICATION_REVIEW |

## Critical Reality Check

The 28-agent A-Z staffing model in the S317 program spec is aspirational. In practice, this is a single-session execution that must:

1. Insert 10 Wave 3 items into pack_e (510→520) — **ERROR: pack_e is already at 520. Wave 3 must go to 530.**
2. Run certification review on each item
3. Generate all output files
4. Update REVISION_HISTORY.md

**Capacity note:** The prior S313 and S315 sessions each certified one wave (10 items) and were completed as single sessions with focused execution, not 28 parallel agents. S317 follows the same pattern.

## Execution Plan — 8 Phases

### Phase 1: Startup Governance (Agent A equivalent)
- Verify certified baseline = 2,201 via direct grep
- Verify governance guard 27/27 PASS
- Verify pack_e size = 520 parse-count
- Verify current baselines vs CURRENT_BASELINES.md
- Read S316 outputs for context

### Phase 2: Production Insertion
- Backup pack_e_corrected.js (per BACKUP_PROTOCOL.md)
- Insert 10 Wave 3 items from SESSION316_AUTHORING_BATCH_WAVE3.json into pack_e
- Verify pack_e parses correctly (520 → 530 items)
- Re-verify DL-008, DL-026, DL-013 on the 10 new items

### Phase 3: Certification Review (Agents B-K equivalent)
Per-item review across all dimensions:

**For each of the 10 items (R26, R27, R29, R34-R40):**
- Technical accuracy (COSO, SOX, control concepts, risk assessment, systems controls)
- Explanation quality (EC coaching, EW choice-specific instructional value)
- EW integrity (100% coverage, distractor alignment, misconception correction)
- Blueprint mapping (LO tag correctness)
- Difficulty/CognitiveLevel alignment
- Learner safety assessment
- Duplicate prevention re-verification

### Phase 4: Quality Gate Certification (Agents F, K, L, M equivalent)
- Gate 0: Duplicate prevention re-certification
- Gate 1: Draft completeness
- Gate 2: Technical accuracy + DL compliance
- Gate 3: Blueprint coverage (confirm no imbalance across E.1.a/i/d/h/b)
- Gate 4: QA review (scanner observations adjudicated)
- UIQS scoring of wave inventory
- Distractor Quality Score (DQS) review
- Explanation Quality Score (EQS) review

### Phase 5: Certification Board (Agent N-P equivalent)
- Per-item CERTIFY / HOLD / ESCALATE decisions
- Require evidence packages per item
- Cross-pack consistency check vs Pack B benchmark
- Portfolio impact analysis

### Phase 6: Simulation Program (Agent U equivalent)
- Simulate strong learner, average learner, misconception-prone learner
- Validate educational outcomes for all 10 items

### Phase 7: Output Generation (Agent X equivalent)
Generate all required deliverables:
- SESSION317_CANDIDATE_INVENTORY.json
- SESSION317_DUPLICATE_PREVENTION_CERTIFICATION.json
- SESSION317_TECHNICAL_REVIEW.json
- SESSION317_EW_INTEGRITY_AUDIT.json
- SESSION317_QUALITY_GATE_CERTIFICATION.json
- SESSION317_UIQS_VALIDATION.json
- SESSION317_CERTIFICATION_RESULTS.json
- SESSION317_PORTFOLIO_IMPACT_ANALYSIS.json
- SESSION317_DASHBOARD.json
- SESSION317_SESSION_SUMMARY.md

### Phase 8: Closure (Agent Z equivalent)
- Update REVISION_HISTORY.md
- Generate governance attestation (no answer-key changes, no scoring changes, no duplicates)
- Update certified count: 2,201 → 2,211 (projected)
- Update Domain E: 228 → 238 (projected)
- Clone groups: 20/33 → 30/33 (projected)
- Prepare S318 execution package placeholder

## Governance Requirements

- No answer-key changes (CorrectChoice must remain as authored)
- No scoring logic changes (app.js, may-core.js, may-learner-state.js untouched)
- No duplicate creation (verify all 10 QIDs are unique in pack_e)
- Governance guard must remain 27/27 PASS
- All 10 items must be Certified with correct question_state
- DL-008: ExplanationWrong[CorrectChoice] must equal "" for all 10 items
- No unauthorized certification drift

## Files to Modify
- `pack_e_corrected.js` — insert 10 items (520 → 530), certify 10 Unprocessed items
- `knowledge/REVISION_HISTORY.md` — prepend S317 entry

## Files to Create
- 9 JSON reports + 1 MD summary + S318 execution package placeholder

## Files NOT to Touch
- pack_a/b/c/d_corrected.js, scored_cases*.js, app.js, may-core.js, may-learner-state.js, index_updated.html, styles.css, governance-guard.js, MASTER_QUESTION_REGISTRY.md

## Success Criteria
- All 10 Wave 3 items reviewed and CERTIFY/HOLD/ESCALATE decisions rendered
- Duplicate-prevention certification PASS
- Quality gates validated
- EW integrity preserved (100% EW coverage, DL-008 clean)
- Learner-safety validated
- No answer-key changes
- No scoring changes
- No duplicate creation
- Governance guard PASS maintained
