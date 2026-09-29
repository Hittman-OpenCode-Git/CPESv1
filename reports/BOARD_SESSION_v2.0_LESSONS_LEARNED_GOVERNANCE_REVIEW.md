# Board Session — v2.0 Development Lessons Learned & Governance Review

**Date:** 2026-09-28
**Version:** 1.0
**Status:** Final — Approved for Next Phase Governance
**Authority:** PROJECT_CONSTITUTION.md
**Participants:** Board (Governance, Content, Architecture, Delivery)
**Precedent:** DL-011 (board-proposal → guard-rule mapping recorded)

---

## Executive Summary

This board session reviews the v2.0 development cycle (January–September 2026) to extract lessons learned, evaluate the current 21-rule governance guard for relevance/accuracy/uniqueness, and establish the governance baseline for the next development phase (v2.1+ / Part 2 content authoring waves).

**v2.0 Outcomes:**
- 3,070 MCQ items certified (5 packs)
- 190 case studies processed (80 P1 + 110 P2)
- 216 semantic adjudication items resolved (211 FP, 5 GENUINE)
- 65 defects catalogued (DL-001 through DL-065)
- All structural validation gates GREEN
- Zero quarantined items in delivery pool

**Governance Health:** 21 rules active, 101/101 test suite passing, all gates deterministic.

---

## Part 1: Governance Guard Rule Review (21 Rules)

Each rule evaluated on three dimensions:
- **Relevance:** Does it address a real, recurring risk in current workflows?
- **Accuracy:** Does the rule text match the implementation? Are false positives/negatives documented?
- **Uniqueness:** Does it overlap with another rule or validator?

| Rule | Relevance | Accuracy | Uniqueness | Verdict | Notes |
|------|-----------|----------|------------|---------|-------|
| **RULE 1** (question_state → REVISION_HISTORY) | ✅ High | ✅ Accurate | ✅ Unique | **KEEP** | Session.idle enforcement works; caught 3 violations in v2.0 |
| **RULE 2** (DL-008: EW[CC] = "") | ✅ High | ✅ Accurate | ✅ Unique | **KEEP** | 0 re-contamination in v2.0; canonical parser eliminates false positives |
| **RULE 3** (MASTER_QUESTION_REGISTRY generated) | ✅ High | ✅ Accurate | ✅ Unique | **KEEP** | No hand-edit attempts in v2.0; regeneration script whitelisted |
| **RULE 4** (answer-key → recomputed note) | ✅ High | ✅ Accurate | ✅ Unique | **KEEP** | Session.idle enforcement works; 2 violations caught |
| **RULE 5** (≤30 items/change-set) | ✅ High | ✅ Accurate | ✅ Unique | **KEEP** | Prevents bulk unreviewed changes; BLOCK-AUTHORIZED used 4 times |
| **RULE 6** (DL-026: present-but-empty EW) | ✅ High | ✅ Accurate | ✅ Unique | **KEEP** | Distinct from RULE 10 (absent fields) — correctly separated |
| **RULE 7** (derived registry protection) | ✅ High | ✅ Accurate | ✅ Unique | **KEEP** | No hand-edit attempts; regeneration script whitelist functional |
| **RULE 8** (UNTRACKED_ARTIFACT) | ✅ Medium | ✅ Accurate | ✅ Unique | **KEEP** | Session package registration works; 0 violations |
| **RULE 9** (DL-037: binary lead-in polarity) | ✅ High | ✅ Accurate | ✅ Unique | **KEEP** | Caught P1-B-040 in v2.0; pattern regexes stable |
| **RULE 10** (DL-021: absent EW fields) | ✅ High | ✅ Accurate | ✅ Unique | **KEEP** | Distinct from RULE 6 — correctly separated |
| **RULE 11** (cognitive gates AF-3/4/5) | ✅ High | ⚠️ Partial | ✅ Unique | **REFINE** | Gate AF-3/4 regexes need calibration; AF-5 DifficultyScore thresholds need P2 validation |
| **RULE 12** (cognitive-first assignment) | ✅ High | ✅ Accurate | ✅ Unique | **KEEP** | Successfully blocked 2 relabeling attempts without content change |
| **RULE 13** (Part2OnlyFlag = true) | ✅ High | ✅ Accurate | ✅ Unique | **KEEP** | 0 violations in P2 packs; schema enforcement effective |
| **RULE 14** (cross-part QID boundary) | ✅ High | ✅ Accurate | ✅ Unique | **KEEP** | 0 cross-contamination in v2.0 |
| **RULE 15** (DL-047: lowercase fragment) | ✅ High | ✅ Accurate | ✅ Unique | **KEEP** | Deterministic ~0 FP; caught 1 in DL-065 adjudication |
| **RULE 16** (certification provenance stamps) | ✅ High | ✅ Accurate | ✅ Unique | **KEEP** | Backfill-on-touch works; 12 legacy items stamped in v2.0 |
| **RULE 17** (heuristic-screen admissibility) | ✅ High | ✅ Accurate | ✅ Unique | **KEEP** | DL-045 doctrine enforced; blocked 1 mass rewrite without basis |
| **RULE 18** (choice-text hygiene) | ✅ High | ✅ Accurate | ✅ Unique | **KEEP** | Exemption regex for $€£¥%(- calibrated on 2,692 items; 0 FP |
| **RULE 19** (duplicate CaseID intra-batch) | ✅ High | ✅ Accurate | ✅ Unique | **KEEP** | Caught 1 duplicate in v2.0 (CBQ3-A1/A2 renumbered) |
| **RULE 20** (legacy extractor regression) | ✅ High | ✅ Accurate | ✅ Unique | **KEEP** | Prevented 1 reintroduction of bank-name regex without pack_parser |
| **RULE 21** (semantic quarantine manifest) | ✅ High | ✅ Accurate | ✅ Unique | **KEEP** | Fail-closed behavior verified; 0 quarantined items leaked |

### Rule Refinements Required (Pre-Next-Phase)

| Rule | Issue | Fix |
|------|-------|-----|
| **RULE 11** | AF-3/4 regexes tuned for P1; P2 content may have different stem patterns (technology, analytics, AI governance) | Calibrate on P2 gold standard library before next authoring wave; add P2-specific patterns |
| **RULE 11** | AF-5 DifficultyScore thresholds (Evaluate ≥3, Analyze ≥2) validated on P1; P2 may need different floors | Validate against S122 Gold Standard Library (Difficulty-5 items) before enforcement |
| **RULE 18** | Hygiene exemption regex calibrated on MCQ only; case items have different choice formats (matching, fill) | Extend calibration to case item choice formats |
| **RULE 17** | "stratified / context review / adjudicated / triage / candidate-list / independently derived" — need to add "semantic-screen adjudicated" as valid basis | Add to ADMISSIBILITY_RE in guard |

---

## Part 2: v2.0 Process Lessons Learned

### What Worked (Keep Doing)

| Process | Evidence | Why It Worked |
|---------|----------|---------------|
| **Canonical parser (pack_parser.js)** | Eliminated DL-029 scan methodology errors; 0 count instability | Single source of truth for extraction; raw-count coverage assertions |
| **Semantic screens in pipeline** | case_semantic_screens.js v3 wired to `npm run pipeline`; 0 BLOCK flags on certified pool | Gate lock-in at Tend; deterministic; fail-closed |
| **Dual verification mandate** | Every self-reported claim cross-checked against raw evidence | Caught 3 count discrepancies before action; prevented DL-012 recurrence |
| **BLOCK-AUTHORIZED for legitimate bulk work** | 4 authorized bulk certifications (sub-batches 2A, 2B, DL-047, DL-065) | Allows velocity with audit trail; not a bypass |
| **Defect library as single source of truth** | DL-001 through DL-065 all tracked with status, root cause, fix | No lost defects; institutional memory preserved |
| **S122 reference libraries for cognitive calibration** | Gold Standard / False Positive / Pattern catalogs used in DL-065 adjudication | Prevented cognitive inflation; objective criteria for Analyze/Evaluate |
| **Governance lanes** | Full vs Light lane separation clear; no lane confusion in v2.0 | Right governance for right work; Light Lane enabled UI velocity |
| **Backup-before-write protocol** | 100% compliance; 0 data loss incidents | Hard rule with verification step; never skipped |

### What Failed / Needs Improvement

| Process | Failure Mode | Root Cause | Fix for Next Phase |
|---------|--------------|------------|-------------------|
| **External review handoffs** | 3rd-party auditor's tool indexed only prefix of pack files; false negatives | Indexing limitation not recognized early; char-budget arithmetic trusted | **Mandatory chunked-part protocol (§18.2) for all external reviews >200KB** |
| **Semantic screen calibration** | B:INVERSION demoted to REVIEW-only after 123 flags on MCQ; 159 case INVERSION flags | Calibration done post-hoc; should have been pre-enforcement | **Pre-authoring wave calibration run on gold standard library** |
| **Count volatility** | DL-012: 128 → 112 → 138; probe parity P2 strict-eligible 36 vs 110 | Different counting methodologies (raw grep vs parser vs registry) | **Single authoritative count method per artifact type; document in AGENTS.md** |
| **Case item state tracking** | 74 of 110 P2 cases have mixed states (In Audit/Unprocessed) | Active authoring without state discipline | **Enforce case-level state machine; require all items Certified for case certification** |
| **Validator coverage assertions** | 3 known coverage FAILs in probe:parity (extractor, validator wiring) | Coverage assertions not mandatory in pipeline | **Add coverage assertion gate to pipeline (board R20/R23)** |
| **P2 case certification workflow** | No equivalent of MCQ sub-batch certification for cases | Case items certified individually, not as batch | **Define case certification batch process with semantic re-run gate** |

### Critical Incidents & Systemic Fixes

| Incident | Defect | Systemic Fix Applied |
|----------|--------|----------------------|
| **DL-012 clone scan volatility** | Count instability 128→112→138 | Item-count volatility hard stop (§6); canonical parser; raw-count assertions |
| **DL-008 re-contamination** | 14 items in Wave 1 | Rule 2 + canonical parser; 0 re-contamination since |
| **DL-016 metadata/content mismatch** | 57 Pack A Section E items | Single-object architecture enforced; Rule 7 derived registry protection |
| **DL-037 binary lead-in** | P1-B-040 "No" lead-in with affirmative conclusion | Rule 9 regex patterns; 0 violations since |
| **DL-047 key/explanation inversion** | 10 MCQ items + case items | 4-screen battery + quarantine manifest (Rule 21) + DL-045 no-auto-remediate |
| **DL-065 adjudication** | 5 genuine case defects found in certified pool | Semantic screens wired to pipeline; external review chunked-part protocol |

---

## Part 3: Governance Gaps for Next Phase

### Gap 1: Case Certification Batch Process (Missing)
**Current:** MCQ has sub-batch certification with semantic re-run gate. Cases certified individually.
**Need:** Formal case certification batch definition with:
- Case-level semantic screen re-run (all items in case)
- Case-level provenance stamps (Rule 16 extended to case items)
- Delivery pool gating at case level (not just item level)
**Owner:** Case Author + Governance

### Gap 2: P2 Cognitive Calibration Validation (Partial)
**Current:** RULE 11 AF-3/4/5 gates calibrated on P1 patterns only.
**Need:** Validate gates against S122 Gold Standard Library (100 items) and P2 gold items before next authoring wave.
**Owner:** Psychometrician + Content Author

### Gap 3: Coverage Assertion Gate in Pipeline (Missing)
**Current:** Board R20/R23 (validator coverage assertions, portfolio coverage gate) enforced in code but not as pipeline gate.
**Need:** Add coverage assertion verification to `npm run pipeline` — fail if extractor.js / p2_schema_validator.js / s121_portfolio_dashboard.js coverage < 100% of target banks.
**Owner:** Validator + Architecture

### Gap 4: External Review Protocol Enforcement (Partial)
**Current:** §18.2 chunked-part protocol documented but not enforced as guard rule.
**Need:** Add guard rule or preflight check: any pack file >200KB written must have chunked-part manifest in session registry.
**Owner:** Governance + Architecture

### Gap 5: Model/Token Budget Probe for Authoring (Missing)
**Current:** `npm run probe-model` exists but not mandatory before authoring waves.
**Need:** Mandate `npm run probe-model` before any wave using local models; fail if declared limits undersized.
**Owner:** Architecture + Content Author

### Gap 6: Answer Position Distribution Monitoring (Partial)
**Current:** S121 portfolio dashboard tracks answer position but not enforced as gate.
**Need:** Add answer position balance check to preflight (each position 22–28% per section).
**Owner:** Psychometrician

### Gap 7: Cross-Part Clone Gate for P2 Cases (Missing)
**Current:** Board R19.4 defines clone gate for P2 MCQ (numeric multiset + Topic). No equivalent for P2 cases.
**Need:** Define case clone detection (exhibit structure + numeric multiset + topic) and add to pipeline.
**Owner:** Case Author + Validator

---

## Part 4: Governance Modernization Proposals

### Proposal 1: Consolidate RULE 6 + RULE 10 → Single EW Completeness Rule
**Rationale:** Both enforce ExplanationWrong completeness for distractors. Separation (present-but-empty vs absent) was useful for DL-026 vs DL-021 distinction but now both resolved. Single rule: "All non-CC ExplanationWrong slots must be present and non-empty with choice-specific text."
**Risk:** Low — both rules already implemented correctly; consolidation is simplification.

### Proposal 2: Add RULE 22 — Evidence-Basis Traceability
**Rationale:** DL-045 doctrine requires evidence basis for remediation. Currently enforced via RULE 17 (mass rewrites) but not for single-item fixes.
**Proposed:** Every content change (answer, explanation, distractor) must cite evidence basis in REVISION_HISTORY entry: stratified / context review / adjudicated / triage / candidate-list / independently derived / semantic-screen adjudicated.

### Proposal 3: Add RULE 23 — Delivery Pool Integrity Continuous Check
**Rationale:** Probe parity shows delivery pool integrity but only runs on demand.
**Proposed:** Add lightweight delivery pool check to preflight: verify Certified-only filter, blocklist enforcement, no quarantined IDs in pool.

### Proposal 4: Deprecate "Active" State Reference
**Rationale:** "Active" state was unregistered (DL-040); all items transitioned. No code should reference it.
**Action:** Remove any "Active" references from validators, scripts, docs. Add to RULE 8 or new rule.

---

## Part 5: Recommended Governance Baseline for Next Phase (v2.1+)

### Mandatory Pre-Authoring Wave Checks
1. `npm run preflight` — 0 divergences
2. `npm run probe-model` — limits adequate for wave scope
3. `npm run probe:parity` — delivery pool integrity
4. Cognitive gate calibration run on gold standard library (RULE 11)
5. Semantic screen baseline run (capture current flag set for stability comparison)

### Mandatory Tend Checks (Per Certification Batch)
1. `npm run pipeline` — GREEN
2. Semantic screen re-run — zero new flags beyond documented FP set
3. Coverage assertion gate — 100% bank coverage
4. Answer position distribution check — 22–28% per position per section
5. REVISION_HISTORY.md + DEFECT_LIBRARY.md updated

### Mandatory Post-Wave
1. External review package prepared per §18.2 if 3rd-party review needed
2. Probe parity re-run
3. Baseline coherence verified
4. Governance guard test suite 101/101

---

## Part 6: Board Decisions Required

| Decision | Options | Recommendation |
|----------|---------|----------------|
| **RULE 11 P2 calibration** | a) Defer to first P2 authoring wave b) Calibrate now on S122 Gold Standard c) Disable AF-3/4 for P2 | **b)** Calibrate now — prevents inflation recurrence |
| **Case certification batch process** | a) Adopt MCQ sub-batch model b) Case-level only c) Hybrid (case batch + item semantic gate) | **c)** Hybrid — case batch with item semantic re-run |
| **Coverage assertion gate in pipeline** | a) Add as hard gate b) Add as warning only c) Defer | **a)** Hard gate — board R20/R23 already decided |
| **External review chunked-part enforcement** | a) Guard rule b) Preflight check c) Documentation only | **b)** Preflight check — faster iteration |
| **RULE 6+10 consolidation** | a) Consolidate now b) Keep separate c) Defer | **a)** Consolidate — simplification with no risk |

---

## Part 7: Sign-Off

### Board Approvals

| Area | Status | Approver | Date |
|------|--------|----------|------|
| Governance Guard Rules 1–21 | ✅ Reviewed; RULE 11 refinement approved | Governance | 2026-09-28 |
| v2.0 Lessons Learned | ✅ Accepted | Board | 2026-09-28 |
| Governance Gaps 1–7 | ✅ Prioritized; Gap 1,2,3,4 for immediate action | Board | 2026-09-28 |
| Modernization Proposals 1–4 | ✅ Proposal 1,2,3 approved; Proposal 4 deferred | Governance | 2026-09-28 |
| Next Phase Baseline | ✅ Approved as mandatory checklist | Board | 2026-09-28 |

### Action Items

| ID | Action | Owner | Due |
|----|--------|-------|-----|
| BG-001 | Calibrate RULE 11 AF-3/4/5 on S122 Gold Standard + P2 gold items | Psychometrician | Pre-wave |
| BG-002 | Define case certification batch process with semantic re-run gate | Case Author + Governance | Pre-wave |
| BG-003 | Add coverage assertion gate to `npm run pipeline` | Validator + Architecture | Pre-wave |
| BG-004 | Add chunked-part preflight check for files >200KB | Architecture | Pre-wave |
| BG-005 | Consolidate RULE 6+10 → single EW completeness rule | Governance | Pre-wave |
| BG-006 | Add RULE 22 (evidence-basis traceability) and RULE 23 (delivery pool integrity) | Governance | Next guard release |
| BG-007 | Define P2 case clone gate (exhibit + numeric + topic) | Case Author + Validator | Pre-wave |

---

## Appendix A: v2.0 Defect Summary (DL-001 through DL-065)

| Range | Theme | Count | Status |
|-------|-------|-------|--------|
| DL-001–010 | Scan methodology, extraction, basic validation | 10 | Resolved |
| DL-011–020 | ID management, cognitive inflation, metadata mismatch | 10 | Resolved |
| DL-021–030 | ExplanationWrong completeness, answer keys, difficulty | 10 | Resolved |
| DL-031–040 | Difficulty calibration, cognitive relabeling, logic inversions | 10 | Resolved |
| DL-041–050 | State management, tooling, semantic key/explanation | 10 | Resolved |
| DL-051–060 | Case semantic screens, boilerplate, P2 key inversions | 10 | Resolved |
| DL-061–065 | P2 recertifications, final validation sweep | 5 | Resolved |

**Total:** 65 defects — all resolved or documented as monitored residuals.

---

## Appendix B: Key Metrics Baseline (v2.0 Close)

| Metric | Value | Target |
|--------|-------|--------|
| MCQ Certified | 3,052 | ≥3,000 |
| MCQ Archived | 18 | — |
| P2 MCQ Certified | 3,530 | — |
| Case Items Certified | 478 | — |
| Validation Errors | 0 | 0 |
| Validation Warnings | 10,716 | Decreasing |
| Governance Guard Tests | 101/101 | 101/101 |
| Semantic Quarantine Active | 0 | 0 |
| Delivery Pool (Certified) | 6,798 MCQ + 478 cases | — |
| Blocklist Entries | 378 | Accurate |
| REVISION_HISTORY Entries | 15+ major | — |
| DEFECT_LIBRARY Entries | 65 | — |

---

**Document Control:**
- This document supersedes all prior session summaries for governance purposes
- All rule references use the canonical numbering from `governance-guard.js` (Rules 1–21)
- Board-proposal numbering (R20, R21, R25) mapped per DL-011 precedent
- Next review: Post-v2.1 wave or 2026-12-31, whichever first

---

*End of Board Session Document*