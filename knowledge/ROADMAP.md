# Repository Roadmap

**Authority:** This document is the single authoritative phase numbering scheme for the repository. All reports, sprints, and tracking SHALL reference phases by the numbering defined here.

---

## Phase 1 — Content Audit & Correction

**Goal:** Every question in every pack passes Syntax, Integrity, and Metadata validation.

### Batch 1 — Packs A–E structural audit
- Syntax validation (JSON parse, required fields)
- Integrity validation (duplicate IDs, duplicate stems, orphan references)
- Metadata schema conformance
- Answer correction (FAIL items from audit)

### Batch 2 — Metadata enrichment
- Batch 2A: Packs A–C metadata fields
- Batch 2B: Packs D–E metadata fields
- Registry rebuild and diff verification

### Batch 3 — Case study audit
- Case structure validation
- Case metadata standardization
- Enhanced case bank reconciliation

### Batch 4 — Psychometric baseline
- First pass of `PsychometricValidator`
- Semantic, Distractor, and Explanation Consistency checks
- DEFECT_LIBRARY entries from findings

**Phase 1 gate:** Zero structural errors + zero Critical/High defects

---

## Phase 2 — PsychometricValidator Development

**Goal:** Automated detection of defect classes discovered in Phase 1.

### Modules (built incrementally)

| Module | Detects | Depends On |
|--------|---------|------------|
| `MathematicalValidator` | Incorrect formula usage ("variance equals standard") | DEFECT_LIBRARY patterns |
| `ExplanationConsistencyValidator` | Correct answer ↔ Explanation ↔ Formula ↔ Learning Objective ↔ Blueprint agreement | — |
| `AbsoluteLanguageValidator` | "Always"/"never"/"only"/"must"/"exactly" in choices and prompts | — |
| `AmbiguityValidator` | Vague qualifiers ("usually"/"normally"/"often"), overlapping distractors | — |
| `DistractorSimilarityValidator` | High Jaccard similarity between distractor pairs | — |
| `SemanticValidator` | Answer/explanation contradictions, mathematical inconsistencies | DEFECT_LIBRARY patterns |
| `BiasValidator` | Demographic/cultural assumptions in scenarios | — |
| `BlueprintValidator` | Question-to-blueprint alignment, LOS coverage gaps | — |

### Build order

1. ✅ `MathematicalValidator` (DL-001 pattern — simplest, highest value)
2. ✅ `ExplanationConsistencyValidator` (cross-field agreement)
3. ✅ `AbsoluteLanguageValidator` (absolute wording in choices/stems)
4. ✅ `AmbiguityValidator` (vague qualifiers + distractor overlap)
5. ✅ `DistractorSimilarityValidator` (Jaccard-based choice similarity)
6. `SemanticValidator` (answer/explanation mismatch detection)
7. `BiasValidator` + `BlueprintValidator` (coverage and fairness)

### LOSTag Standardization (Deferred to Phase 2)

**Status:** DEFERRED — post-September 2026
**Scope:** Standardize non-standard LOSTag fields across all packs (1,779 R7 info findings identified in structural audit)
**Rationale:** LOSTag is informational metadata only; no content defect. Deferred to avoid blocking higher-priority editorial work.
**Action:** Bulk regex update LOSTag values to match CMA Learning Outcome Statement format. Target: zero R7 findings.

**Phase 2 gate:** All modules produce actionable reports with <5% false-positive rate on known-clean content.

---

## Phase 3 — Full Repository Sweep

**Goal:** Every question (MCQ + case item) passes all validation layers.

### Sweep sequence

1. Run full validator pipeline on all packs (A–E)
2. Review all Critical/High findings
3. Fix and log in DEFECT_LIBRARY
4. Re-run until zero Critical/High defects
5. Run validator on all case banks (standard + enhanced)
6. Fix case-level findings
7. Update registry

**Phase 3 gate:** Zero Critical/High defects across the entire repository.

---

## Phase 4 — CAQS Certification

**Goal:** Every question holds a passing CAQS score.

### Criteria (per CAQS_v1.0)

- Technical Accuracy (40 pts)
- Psychometric Quality (25 pts)
- Explanation Quality (20 pts)
- Metadata Quality (10 pts)
- Blueprint Alignment (5 pts)

**Phase 4 gate:** 100% of questions scored ≥80/100 CAQS.

---

## Phase 5 — Release & Maintenance

**Goal:** Stable release artifacts with ongoing QA.

- Release versioning (MAJOR.MINOR.PATCH)
- Regression test suite
- DEFECT_LIBRARY-driven validator updates
- New content intake protocol

---

## Validator Pipeline (execution order)

```
Repository
    ↓
[1] SyntaxValidator        → Can the repository load?
    ↓
[2] IntegrityValidator     → Are the data structures sound?
    ↓
[3] MetadataValidator      → Are metadata fields complete?
    ↓
[4] ReferenceValidator     → Do cross-references resolve?
    ↓
[5] PsychometricValidator  → Should the repository be released?
        ├── MathematicalValidator
        ├── ExplanationConsistencyValidator
        ├── AbsoluteLanguageValidator
        ├── AmbiguityValidator
        ├── DistractorSimilarityValidator
        └── (future) SemanticValidator, BiasValidator, BlueprintValidator
    ↓
Release Candidate
```

## Sprint 6.x — Build-Time / Runtime AI Scope Distinction

**Introduced:** Governance amendment distinguishing build-time AI verification authority from runtime AI grading prohibition.

**Build-time AI:** Actively verifies question correctness, precision, difficulty, distractor quality, blueprint alignment, and CMA relevance during audit. Non-binding recommendations; human maintains final revision authority.

**Runtime AI (future):** Learner-facing synthesis only. Never determines correctness, scoring, formulas, or blueprint mapping.

**Impact:** The frozen rule "AI never determines correctness" is now two scoped rules. Validator order unchanged. No runtime code modified. See `CAQS_v1.0.md §1.4` and `AI_Router.md` for full definitions.

Phases 1–4 answer: *Can the repository run?*

Phase 5 answers: *Should the repository be released?*

---

## Severity Classification

| Severity      | Meaning                             | Action Required        |
| ------------- | ----------------------------------- | ---------------------- |
| Critical      | Wrong answer / incorrect accounting | Blocking — fix before release |
| High          | Multiple defensible answers         | Blocking — fix before release |
| Medium        | Weak distractors                    | Non-blocking — schedule fix |
| Low           | Grammar / wording                   | Non-blocking — schedule fix |
| Informational | Metadata only                        | Log only               |

---

## Repository Quality Metric

Tracked per sprint/release:

```
Critical defects:  N  →  trend (↓ ↑ →)
High defects:      N  →  trend
Medium defects:    N  →  trend
Low defects:       N  →  trend
CAQS coverage:     N% →  trend
```

Target: Zero Critical + High defects entering Phase 5.
