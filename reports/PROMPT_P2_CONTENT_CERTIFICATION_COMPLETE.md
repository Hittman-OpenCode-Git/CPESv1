# Prompt: P2 Content Certification, Polish, and Micropolis Completion

**Version:** 1.0
**Status:** Active — Next Phase Mandate
**Authority:** PROJECT_CONSTITUTION.md, AGENTS.md, Board Resolution 2026-09-29
**Depends on:** Governance baseline at commit `7f8f65f` (v2.0 governance amendments applied, tag rolled back)

---

## Objective

**Complete all remaining content certification, achieve full polish, and deliver Micropolis integration** — so that a genuine v2.0 Final tag represents **all content finalized**, not just governance baseline.

---

## Scope

| Content Area | Current State | Target |
|--------------|---------------|--------|
| P1 MCQ (5 packs) | ✅ 3,052 Certified | Maintain |
| P1 Cases (80) | ✅ 425 Certified | Maintain |
| P2 MCQ (6 packs) | ✅ 3,530 Certified | Maintain |
| **P2 Cases (110)** | ❌ 36 strict-eligible, 74 mixed | **110 strict-eligible (all items Certified)** |
| Micropolis integration | Unknown | **Complete per spec** |

---

## Phase 1: Prerequisites (Must Complete Before P2 Case Certification)

### 1.1 RULE 11 P2 Calibration (Mandatory per Board Resolution)
- Calibrate AF-3/4/5 cognitive gates on **S122 Gold Standard Library (100 items)** + **P2 gold items**
- Update `governance-guard.js` AF-3/4 regex patterns and AF-5 DifficultyScore thresholds
- Run calibration verification: zero false positives on gold standard
- **Gate:** No P2 case certification until calibration complete and verified

### 1.2 Build Case Certification Batch Process (Hybrid Model per Board Resolution)
- Define case batch schema: CaseID list, item semantic re-run gate at Tend
- Wire into `npm run pipeline` as Tend checkpoint:
  - `case_semantic_screens.js` v3 re-run on all items in batch
  - Zero new flags beyond documented FP set required for case-level certification
  - Case-level provenance stamps (Rule 16 extended to case items)
- **Gate:** No case batch certification without clean semantic re-run

### 1.3 Wire P2 Case Clone Gate (Board Resolution)
- Detection: exhibit structure fingerprint (header multiset + row count + type signature) + numeric multiset + Topic
- Integrate into pipeline alongside semantic screens
- Precedent: DL-046-P2 (P2-C-181 shared distractor padding error)
- **Gate:** No P2 case certification without clone scan

### 1.4 Coverage Assertion Hardening (Board Resolution)
- Current: WARNING mode, 1/2 clean runs
- Need: 2 consecutive clean `probe:parity` runs → harden to FAIL
- **Gate:** Coverage assertion must be FAIL-mode before final tag

---

## Phase 2: P2 Case Certification (74 Cases, ~600+ Items)

### 2.1 Case Inventory & Triage
For each of the 74 mixed-state P2 cases:
- Identify all items with `question_state` ≠ `Certified`
- Classify: `In Audit` (needs review) vs `Unprocessed` (needs authoring)
- Assign to certification sub-batches (max 30 items/change-set per Rule 5)

### 2.2 Sub-Batch Certification Workflow (Per Case)
For each case batch:
1. **T0:** `npm run preflight` (includes probe:parity, probe-model if local models)
2. **Author/Review:** Resolve all `Unprocessed`/`In Audit` items
   - Independent hand-solve for each item
   - Semantic screen re-run on all items in case
   - DL-047 adjudication for any flags
3. **Tend:** `npm run pipeline` (GREEN required)
   - validate → case-screens → build-registry → dashboard → baseline-coherence → coverage-assert
   - Case semantic screens: zero new flags beyond documented FP
   - Clone gate: PASS
4. **Certify:** Flip all items in case to `Certified` with Rule 16 stamps (`certification_batch`, `certification_date`)
5. **REVISION_HISTORY.md:** Entry per batch with CaseIDs, verification results, counts

### 2.3 Case Banks to Process
| Bank | Cases | Current Strict-Eligible | Remaining |
|------|-------|------------------------|-----------|
| casePackP2_1 | 33 | ~6 | ~27 |
| casePackP2_2 | 33 | ~5 | ~28 |
| casePackP2_3 | 34 | ~5 | ~29 |
| casePackP2_authored | 5 | 5 | 0 |
| casePackP2_C4_C8 | 5 | 5 | 0 |
| **Total** | **110** | **36** | **74** |

**Target:** All 110 cases strict-eligible (all items Certified).

---

## Phase 3: Full Polish (All Content)

### 3.1 MCQ Polish (P1 + P2)
- Run `semantic_key_verifier.js` — verify zero BLOCK flags, REVIEW flags documented
- Run `case_semantic_screens.js` v3 on all case items — verify zero BLOCK flags
- Answer position distribution: 22–28% per position per section (S121 dashboard)
- Cognitive level distribution: S121 targets per domain
- Difficulty distribution: CAQS §6.1 targets
- All DL-031 monitored residuals reviewed (no Certified-scope defects)

### 3.2 Case Polish (P1 + P2)
- All case items: `ExplanationCorrect` quality check (CAQS §4.4 — principle, formula, business interpretation, exam trap)
- Distractor explanations: choice-specific, ≥50 chars, no boilerplate (DL-013, DL-026, DL-055)
- Exhibit quality: professional format, no decorative data, all rows consumed
- Cognitive progression: numeric → select → multi → fill → match (Apply → Analyze → Evaluate)

### 3.3 Metadata Completeness
- All items: required fields per QUESTION_METADATA_STANDARD.md §2.1/§3.1
- Difficulty ↔ DifficultyScore alignment
- CognitiveLevel ↔ DifficultyScore calibration
- Case-level: CaseID, BlueprintDomain, BlueprintObjectives, ScenarioText, CompanyName, Stakeholder, QuestionCount, ExhibitCount
- Exhibit-level: ExhibitID, Purpose, ReferencedBy, Headers/Rows

---

## Phase 4: Final Validation & Tag

### 5.1 Pre-Tag Validation Suite (All Must Pass)
| Gate | Required |
|------|----------|
| `npm run preflight` | 0 divergences, 3052+ Certified |
| `npm run pipeline` | GREEN (coverage-assert in FAIL mode) |
| `npm run validate` | 0 errors |
| `npm run smoke` | 34/34 PASS |
| `node scripts/test_governance_guard.js` | 101/101 PASS (now 104/104 with R22/R23) |
| `npm run probe:parity` | 0 divergences |
| `npm run probe-model` | PASS (if local models used) |
| Semantic screens | 0 BLOCK flags on full pool |
| Probe parity | 2 consecutive clean runs (coverage-assert FAIL mode) |

### 5.2 Count Verification
- P1 MCQ: 560 + 620 + 620 + 590 + 680 = 3,070 QIDs, 3,052 Certified
- P1 Cases: 80 cases, 425 items Certified
- P2 MCQ: 622 + 620 + 788 + 500 + 500 + 500 = 3,530 QIDs, 3,530 Certified
- **P2 Cases: 110 cases, all strict-eligible (all items Certified)**
- Delivery pool: Certified-only, known-defective excluded

### 5.3 Documentation Finalization
- `REVISION_HISTORY.md`: All certification batches, content changes, governance actions
- `DEFECT_LIBRARY.md`: All defects through DL-065+ resolved or documented
- `CURRENT_BASELINES.md`: Hashes, sizes, counts recaptured
- `MASTER_QUESTION_REGISTRY.md`: Regenerated, counts verified
- Board session docs: Archived

### 5.4 Tag & Push
```bash
git tag -a v2.0.0 -m "Phase 1+2 Complete — v2.0.0: All P1/P2 content certified, Micropolis integrated, all gates green"
git push origin v2.0.0
```

---

## Governance Lane

**Full Governance Lane throughout** — this session touches:
- Pack files, case files, answer keys, question_state, certification status
- `CURRENT_BASELINES.md`, `DEFECT_LIBRARY.md`, `REVISION_HISTORY.md`
- Governance-critical validation/guard logic

**All Full Lane requirements apply** (AGENTS.md §9.2):
- `npm run preflight` at T0 (mandatory)
- Backup-before-write (mandatory per §3)
- Raw evidence verification (mandatory per §5)
- `npm run pipeline` at Tend (mandatory)
- Semantic screens re-run at Tend (mandatory)
- Case certification batch gate at Tend (mandatory)
- REVISION_HISTORY.md entries (mandatory)
- DEFECT_LIBRARY.md entries for new defects (mandatory)

---

## Success Criteria (Definition of Done)

1. ✅ All 110 P2 cases strict-eligible (all items Certified)
2. ✅ All 3,070 P1 MCQ items Certified/Archived
3. ✅ All 425 P1 case items Certified
4. ✅ All 3,530 P2 MCQ items Certified
5. ✅ Micropolis integration complete per defined scope
6. ✅ All validation gates GREEN (preflight, pipeline, validate, smoke, guard, probe:parity, probe-model)
7. ✅ Coverage assertion in FAIL mode (2 clean probe:parity runs)
8. ✅ Semantic screens: 0 BLOCK flags on full pool
9. ✅ Documentation current (REVISION_HISTORY, DEFECT_LIBRARY, CURRENT_BASELINES, MASTER_QUESTION_REGISTRY)
10. ✅ v2.0.0 tag pushed with all content truly finalized

---

## Estimated Effort

| Phase | Estimate |
|-------|----------|
| Phase 1: Prerequisites | 2–3 sessions |
| Phase 2: P2 Case Certification | 6–8 sessions (74 cases in sub-batches) |
| Phase 3: Micropolish (Final Polish) | 2–3 sessions |
| Phase 4: Final Validation | 1 session |
| **Total** | **10–14+ sessions** |

---

## Authorization

This prompt authorizes **Full Governance Lane** work on all P2 case files, P2 MCQ packs, P1 content, governance infrastructure, and Micropolis integration.

**Explicit write authorization granted** for:
- All `content/packs/pack_*_corrected.js`
- All `content/cases/case_pack_*.js`
- All `p2/pack_p2_*.js`, `p2/case_pack_p2_*.js`
- `knowledge/CURRENT_BASELINES.md`, `knowledge/DEFECT_LIBRARY.md`, `knowledge/REVISION_HISTORY.md`, `knowledge/MASTER_QUESTION_REGISTRY.md`
- `scripts/validators/*`, `scripts/coverage_assert.js`, `scripts/case_semantic_screens.js`, `scripts/semantic_key_verifier.js`
- Micropolis integration files (once scope defined)

**Backup-before-write protocol mandatory per AGENTS.md §3.**

---

**Next Action:** Define Micropolis scope, then begin Phase 1 prerequisites.