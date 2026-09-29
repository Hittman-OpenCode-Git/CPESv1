# Board Vote — v2.0 Governance Amendments

**Date:** 2026-09-29
**Session:** Board Governance Review
**Authority:** PROJECT_CONSTITUTION.md
**Quorum:** 4 subcommittees (Governance/Process, Content/Psychometric, Architecture/Validation, Delivery/Safety*)
**Voting Method:** Each amendment — Yes / No / Abstain per subcommittee. Simple majority carries.

*Note: Delivery/Safety subcommittee not separately convened; items C, G, I overlap with Architecture/Validation and Governance/Process recommendations.

---

## Amendment Summary & Subcommittee Recommendations

| ID | Amendment | Subcommittee | Recommendation | Vote |
|----|-----------|--------------|----------------|------|
| **A** | Consolidate RULE 6 + RULE 10 | Governance/Process | **REJECT** | No |
| **B** | Add RULE 22 — Evidence-Basis Traceability | Governance/Process | **MODIFY** | Yes (as modified) |
| **C** | Add RULE 23 — Delivery Pool Integrity | Governance/Process | **REJECT** | No |
| **D** | RULE 11 P2 Calibration | Content/Psychometric | **Option b** (Calibrate now on S122 + P2 gold) | b |
| **E** | Case Certification Batch Process | Content/Psychometric | **Option c** (Hybrid) | c |
| **F** | P2 Case Clone Gate | Content/Psychometric | **Adopt** | Yes |
| **G** | Coverage Assertion Gate in Pipeline | Architecture/Validation | **Option b** (Warning only) | b |
| **H** | External Review Chunked-Part Enforcement | Architecture/Validation | **Option a** (Guard rule) | a |
| **I** | Model/Token Budget Probe Mandate | Architecture/Validation | **Option a** (Mandate) | a |

---

## Detailed Amendment Texts for Vote

### AMENDMENT A: Consolidate RULE 6 + RULE 10 → Single EW Completeness Rule
**Proposal:** Merge RULE 6 (DL-026: present-but-empty ExplanationWrong) and RULE 10 (DL-021: absent ExplanationWrong) into single rule: "All non-CorrectChoice ExplanationWrong slots must be present and non-empty with choice-specific text."

**Governance/Process Subcommittee:** REJECT (No) — Diagnostic separation provides operational value; root causes differ (DL-021 = extractor gap, DL-026 = authoring gap); consolidation loses forensic precision.

**Board Vote:** ☐ Yes ☐ No ☐ Abstain

---

### AMENDMENT B: Add RULE 22 — Evidence-Basis Traceability (MODIFIED)
**Proposal (as modified):** Add RULE 22 requiring evidence-basis citation in REVISION_HISTORY.md for:
- Any `question_state` transition to/from `Certified`
- Any `CorrectChoice` / `Correct` / `CorrectAnswer` change
- Any `ExplanationCorrect` or `ExplanationWrong` rewrite on `Certified` items

**Exempt:** Metadata-only fixes, formatting, typo corrections on non-Certified items.

**Evidence-basis categories:** stratified / context review / adjudicated / triage / candidate-list / independently derived / semantic-screen adjudicated

**Governance/Process Subcommittee:** MODIFY → PASS (Yes) — Codifies DL-045 doctrine for certification-impacting changes; scoped to avoid editorial overhead; exemptions prevent loopholes for substantive changes.

**Board Vote:** ☐ Yes ☐ No ☐ Abstain

---

### AMENDMENT C: Add RULE 23 — Delivery Pool Integrity Continuous Check
**Proposal:** Add lightweight delivery pool check to preflight verifying Certified-only filter, blocklist enforcement, no quarantined IDs in pool.

**Governance/Process Subcommittee:** REJECT (No) — `probe:parity` already comprehensive; correct path is making `probe:parity` mandatory in preflight (package.json), not new rule. Rule 21 already gates certification.

**Board Vote:** ☐ Yes ☐ No ☐ Abstain

---

### AMENDMENT D: RULE 11 P2 Calibration — Option Selection
**Options:**
- **a)** Defer to first P2 authoring wave
- **b)** Calibrate now on S122 Gold Standard + P2 gold items
- **c)** Disable AF-3/4 for P2

**Content/Psychometric Subcommittee:** **Option b** (Calibrate now) — P1 failure mode (58.7% cognitive misclassification) must not repeat; S122 Gold Standard + False Positive Library provide strongest calibration corpus; one-time cost prevents 6+ session recovery.

**Board Vote:** ☐ Option a ☐ Option b ☐ Option c ☐ Abstain

---

### AMENDMENT E: Case Certification Batch Process — Option Selection
**Options:**
- **a)** Adopt MCQ sub-batch model
- **b)** Case-level only
- **c)** Hybrid: case batch with item semantic re-run gate

**Content/Psychometric Subcommittee:** **Option c** (Hybrid) — Cases are integrated scenarios; item interdependence real; hybrid preserves case integrity while enforcing item-level semantic re-run at Tend; forces resolution of 74/110 mixed-state P2 cases.

**Board Vote:** ☐ Option a ☐ Option b ☐ Option c ☐ Abstain

---

### AMENDMENT F: P2 Case Clone Gate
**Proposal:** Define case clone detection (exhibit structure fingerprint + numeric multiset + Topic) and add to pipeline. DL-046-P2 precedent confirms rotation-clone cases exist in P2 (P2-C-181 shared distractor padding error).

**Content/Psychometric Subcommittee:** ADOPT (Yes) — Clone cases degrade discrimination; exhibit structure comparison (header multiset + row count + type signature) is deterministic and fast; numeric multiset extraction already in case_semantic_screens.js v3.

**Board Vote:** ☐ Yes ☐ No ☐ Abstain

---

### AMENDMENT G: Coverage Assertion Gate in Pipeline — Option Selection
**Options:**
- **a)** Hard gate (pipeline FAIL if coverage < 100%)
- **b)** Warning only (pipeline PASS but log gaps)
- **c)** Defer

**Architecture/Validation Subcommittee:** **Option b** (Warning only) — 3 known probe:parity FAILs expected during active P2 authoring; hard gate would paralyze pipeline requiring BLOCK-AUTHORIZED bypasses; warning surfaces gaps in CI logs without blocking; harden after 2 clean probe:parity runs.

**Board Vote:** ☐ Option a ☐ Option b ☐ Option c ☐ Abstain

---

### AMENDMENT H: External Review Chunked-Part Enforcement — Option Selection
**Options:**
- **a)** Guard rule (blocks write if >200KB without manifest+concat proof)
- **b)** Preflight check (warns only)
- **c)** Documentation only

**Architecture/Validation Subcommittee:** **Option a** (Guard rule) — P2-030/031 precedent: auditor tool indexed only ~89/160 items, false-negative "not found" results, char-budget arithmetic produced wrong counts. Guard rule makes §18.2 protocol non-optional at write time. Only triggers on pack files >200KB.

**Board Vote:** ☐ Option a ☐ Option b ☐ Option c ☐ Abstain

---

### AMENDMENT I: Model/Token Budget Probe Mandate
**Options:**
- **a)** Mandate `npm run probe-model` before any wave using local models
- **b)** Recommend but not require
- **c)** Defer

**Architecture/Validation Subcommittee:** **Option a** (Mandate) — Probe measures real per-item emission, projects v1.1 evidence-package size, probes live provider endpoints for max context; read-only, ~15-30s; P2-059 near-miss (evidence package truncated at 32K vs 128K declared) proves static limits unreliable; provider-side regressions caught only by live probes.

**Board Vote:** ☐ Option a ☐ Option b ☐ Option c ☐ Abstain

---

## Vote Tally Sheet

| Amendment | Gov/Process | Content/Psych | Arch/Validation | Total Yes | Total No | Result |
|-----------|-------------|---------------|-----------------|-----------|----------|--------|
| A | No | — | — | 0 | 1 | |
| B | Yes (mod) | — | — | 1 | 0 | |
| C | No | — | — | 0 | 1 | |
| D | — | b | — | 1 | 0 | |
| E | — | c | — | 1 | 0 | |
| F | — | Yes | — | 1 | 0 | |
| G | — | — | b | 1 | 0 | |
| H | — | — | a | 1 | 0 | |
| I | — | — | a | 1 | 0 | |

---

## Board Resolution

**MOTION:** Approve the above amendments per subcommittee recommendations with the following implementation notes:

1. **Amendment A (Consolidate R6+R10):** REJECTED — Rules remain separate.
2. **Amendment B (RULE 22):** APPROVED AS MODIFIED — Implement with scoped requirement (certification transitions, answer-key changes, explanation rewrites on Certified items only).
3. **Amendment C (RULE 23):** REJECTED — Implement via making `probe:parity` mandatory in preflight (package.json).
4. **Amendment D (RULE 11):** APPROVE Option b — Calibrate now on S122 Gold Standard + P2 gold items before next authoring wave.
5. **Amendment E (Case Certification):** APPROVE Option c (Hybrid) — Case batch with item semantic re-run gate at Tend.
6. **Amendment F (P2 Case Clone Gate):** APPROVED — Wire into pipeline with exhibit fingerprint + numeric multiset + Topic.
7. **Amendment G (Coverage Assertion):** APPROVE Option b (Warning only) — Harden after 2 clean probe:parity runs.
8. **Amendment H (External Review):** APPROVE Option a — Guard rule for pack files >200KB requiring chunked-part manifest + concat verification.
9. **Amendment I (Model/Token Probe):** APPROVE Option a — Mandate `npm run probe-model` before any local-model authoring wave.

**Voting Record:**
- [ ] Governance/Process Subcommittee: _______________ Date: _________
- [ ] Content/Psychometric Subcommittee: _______________ Date: _________
- [ ] Architecture/Validation Subcommittee: _______________ Date: _________
- [ ] Board Chair: _______________ Date: _________

**Effective Date:** Upon Board Chair signature — governs next development phase (v2.1+ / P2 authoring waves).

---

## Implementation Tracking

| Amendment | Implementation Task | Owner | Due |
|-----------|---------------------|-------|-----|
| B | Redraft RULE 22 with scoped requirement; add to governance-guard.js | Governance | Pre-wave |
| C | Add `probe:parity` to preflight mandatory steps in package.json | Architecture | Pre-wave |
| D | Run RULE 11 calibration on S122 + P2 gold; update AF-3/4/5 patterns | Psychometrician | Pre-wave |
| E | Define case certification batch schema; wire semantic re-run gate | Case Author + Governance | Pre-wave |
| F | Implement case clone detection (exhibit fingerprint + numeric multiset + Topic) in pipeline | Validator | Pre-wave |
| G | Add coverage assertion throws to pipeline as WARNING level | Architecture | Pre-wave |
| H | Add RULE 22 (guard) for chunked-part enforcement on >200KB pack files | Governance | Pre-wave |
| I | Add `probe-model` to preflight mandatory steps for local-model waves | Architecture | Pre-wave |

---

*End of Board Vote Document*