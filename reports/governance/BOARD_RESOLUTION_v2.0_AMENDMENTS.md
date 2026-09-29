# Board Resolution — v2.0 Governance Amendments

**Date:** 2026-09-29
**Session:** Board Governance Review — Final Vote
**Authority:** PROJECT_CONSTITUTION.md
**Status:** ADOPTED

---

## Vote Results

| Amendment | Subcommittee | Recommendation | Vote | Result |
|-----------|--------------|----------------|------|--------|
| **A** Consolidate RULE 6+10 | Governance/Process | REJECT | No (1–0) | **REJECTED** |
| **B** RULE 22 Evidence-Basis | Governance/Process | MODIFY → PASS | Yes (1–0) | **ADOPTED AS MODIFIED** |
| **C** RULE 23 Delivery Pool | Governance/Process | REJECT | No (1–0) | **REJECTED** |
| **D** RULE 11 P2 Calibration | Content/Psychometric | Option b | b (1–0) | **ADOPTED — Option b** |
| **E** Case Cert Batch Process | Content/Psychometric | Option c | c (1–0) | **ADOPTED — Option c (Hybrid)** |
| **F** P2 Case Clone Gate | Content/Psychometric | ADOPT | Yes (1–0) | **ADOPTED** |
| **G** Coverage Assertion Gate | Architecture/Validation | Option b | b (1–0) | **ADOPTED — Option b (Warning)** |
| **H** External Review Chunked-Part | Architecture/Validation | Option a | a (1–0) | **ADOPTED — Option a (Guard Rule)** |
| **I** Model/Token Probe Mandate | Architecture/Validation | Option a | a (1–0) | **ADOPTED — Option a (Mandate)** |

---

## Final Tally

| Result | Count |
|--------|-------|
| ADOPTED | 6 |
| ADOPTED AS MODIFIED | 1 |
| REJECTED | 2 |
| Total | 9 |

**All adopted amendments pass with unanimous subcommittee support (1–0 each).**

---

## Adopted Amendments — Effective Immediately

### 1. RULE 22 — Evidence-Basis Traceability (MODIFIED)
**Scope:** Required for:
- Any `question_state` transition to/from `Certified`
- Any `CorrectChoice` / `Correct` / `CorrectAnswer` change
- Any `ExplanationCorrect` or `ExplanationWrong` rewrite on `Certified` items

**Exempt:** Metadata-only fixes, formatting, typo corrections on non-Certified items.

**Evidence-basis categories:** stratified / context review / adjudicated / triage / candidate-list / independently derived / semantic-screen adjudicated

**Implementation:** Add to `governance-guard.js` as new rule; wire into session.idle check alongside RULE 1/4.

---

### 2. RULE 11 P2 Calibration — Option b
**Action:** Calibrate AF-3/4/5 gates on S122 Gold Standard Library (100 items) + P2 gold items before next authoring wave.
**Rationale:** Prevents P1 failure mode (58.7% cognitive misclassification); S122 False Positive Library (28 exemplars) trains on 5 inflation patterns.
**Implementation:** Psychometrician to run calibration; update AF-3/4 regex patterns and AF-5 DifficultyScore thresholds in `governance-guard.js`.

---

### 3. Case Certification Batch Process — Option c (Hybrid)
**Design:** Case batch certification with item-level semantic re-run gate at Tend.
- Case-level coherence preserved (items build on prior results)
- Item semantic screens (`case_semantic_screens.js` v3) re-run on all items in batch
- Forces resolution of 74/110 mixed-state P2 cases
- ~2-3s overhead per batch (deterministic screen)

**Implementation:** Define case batch schema; wire semantic re-run gate into `npm run pipeline` Tend checkpoint.

---

### 4. P2 Case Clone Gate
**Detection:** Exhibit structure fingerprint (header multiset + row count + type signature) + numeric multiset + Topic string.
**Precedent:** DL-046-P2 (P2-C-181 shared distractor padding error).
**Implementation:** Add to pipeline alongside semantic screens; O(n) fast fingerprint + numeric multiset extraction (already in case_semantic_screens.js v3).

---

### 5. Coverage Assertion Gate — Option b (Warning Only)
**Action:** Add extractor.js / p2_schema_validator.js / s121_portfolio_dashboard.js coverage throws to pipeline as WARNING level.
**Current:** 3 known probe:parity FAILs expected during active P2 authoring.
**Transition:** Harden to FAIL after 2 consecutive clean `probe:parity` runs.
**Implementation:** Modify `npm run pipeline` script; WARNING exits 0, logs gaps.

---

### 6. External Review Chunked-Part Enforcement — Option a (Guard Rule)
**Rule:** Any pack file write >200KB in `content/packs/` or `p2/` requires:
1. Chunked parts ≤40KB each (verbatim split)
2. Part→QID manifest (QID ranges, part count, source SHA256)
3. Concat verification proof (EXACT MATCH byte-for-byte)

**Precedent:** P2-030/031 — auditor tool indexed only ~89/160 items, false negatives, char-budget arithmetic wrong.
**Implementation:** Add RULE 22 (guard) to `governance-guard.js`; scoped to `content/packs/` and `p2/` paths.

---

### 7. Model/Token Budget Probe Mandate — Option a
**Requirement:** `npm run probe-model` mandatory before any authoring wave using local models.
**Probe:** Measures real per-item emission from P2 packs, projects v1.1 evidence-package size, probes live provider endpoints for max context.
**Precedent:** P2-059 near-miss — evidence package truncated at 32K vs 128K declared.
**Implementation:** Add to preflight mandatory steps for local-model waves; `--apply` auto-writes recommended limits with backup.

---

## Rejected Amendments

| Amendment | Reason |
|-----------|--------|
| **A** Consolidate RULE 6+10 | Diagnostic separation (absent vs present-but-empty) provides operational value; root causes differ (DL-021 extractor gap vs DL-026 authoring gap); forensic precision lost. |
| **C** RULE 23 Delivery Pool | `probe:parity` already comprehensive; correct path is making it mandatory in preflight (package.json), not new rule. Rule 21 already gates certification. |

---

## Implementation Tracking

| ID | Action | Owner | Due |
|----|--------|-------|-----|
| BG-001 | Redraft RULE 22 with scoped requirement; add to governance-guard.js | Governance | Pre-wave |
| BG-002 | Add `probe:parity` to preflight mandatory steps in package.json | Architecture | Pre-wave |
| BG-003 | Run RULE 11 calibration on S122 + P2 gold; update AF-3/4/5 patterns | Psychometrician | Pre-wave |
| BG-004 | Define case certification batch schema; wire semantic re-run gate | Case Author + Governance | Pre-wave |
| BG-005 | Implement case clone detection (exhibit fingerprint + numeric multiset + Topic) | Validator | Pre-wave |
| BG-006 | Add coverage assertion throws to pipeline as WARNING level | Architecture | Pre-wave |
| BG-007 | Add RULE 22 (guard) for chunked-part enforcement on >200KB pack files | Governance | Pre-wave |
| BG-008 | Add `probe-model` to preflight mandatory steps for local-model waves | Architecture | Pre-wave |

---

## Signatures

| Role | Signature | Date |
|------|-----------|------|
| Governance/Process Subcommittee Chair | ________________________ | 2026-09-29 |
| Content/Psychometric Subcommittee Chair | ________________________ | 2026-09-29 |
| Architecture/Validation Subcommittee Chair | ________________________ | 2026-09-29 |
| **Board Chair** | ________________________ | **2026-09-29** |

---

## Effective Date

**Upon Board Chair signature:** 2026-09-29

All adopted amendments govern the next development phase (v2.1+ / P2 authoring waves) effective immediately.

---

*End of Board Resolution*