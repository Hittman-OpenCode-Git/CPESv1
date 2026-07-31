# Session 99P — Reclassification Governance Framework

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Reference:** S95P (Certification Framework), S94P (Quality Gates), CAQS v1.0

---

## 1. Purpose

This document defines the governance framework for all future higher-order (HO) cognitive classification. It specifies the certification process, required evidence, reviewer signoff requirements, auto-fail workflow, and gate integration. This framework is designed to be adopted into the governance-guard plugin as Rule 10 and into the validator pipeline as a pre-certification audit step.

## 2. Future HO Certification Process

### 2.1 Overview

No item may carry `CognitiveLevel: "Evaluate"` or `CognitiveLevel: "Analyze"` without passing a formal cognitive audit. The audit is structured as a 4-stage pipeline:

```
Stage 1: Cognitive Classification
    ↓
Stage 2: Automatic Failure Gate
    ↓
Stage 3: Evidence Collection
    ↓
Stage 4: Certification Decision
```

### 2.2 Stage 1 — Cognitive Classification

**Performed by:** AI classification agent (build-time) or human reviewer.

**Process:**
1. Read the full item — stem, choices, correct answer, ExplanationCorrect, ExplanationWrong slots
2. Independently classify the item's true cognitive level against the S95P rubrics
3. Do NOT reference the item's current `CognitiveLevel` field — classify from raw content
4. Assign a classification confidence: HIGH (≥90%), MEDIUM (70-89%), LOW (<70%)

**Output:** `{ qid, true_level, confidence, classification_notes }`

### 2.3 Stage 2 — Automatic Failure Gate

**Performed by:** Automated gate engine (governance-guard Rule 10 or validator module).

**Gates applied (from S94P Quality Gates):**

| Gate | Rule | Action on Trigger |
|------|------|------------------|
| **G-DEF** | Stem→CorrectChoice lexical overlap > 70% → cap at Understand | **BLOCK** Analyze/Evaluate label |
| **G-EVAL-1** | No named stakeholder or decision-maker role → BLOCK Evaluate | **BLOCK** Evaluate label |
| **G-EVAL-2** | Fewer than 2 defensible answer choices → BLOCK Evaluate | **BLOCK** Evaluate label |
| **G-EVAL-3** | Single deterministic rule/standard produces answer → BLOCK Evaluate | **BLOCK** Evaluate label |
| **G-EVAL-4** | DifficultyScore ≤ 2 AND Evaluate → BLOCK | **BLOCK** Evaluate label |
| **G-ANALYZE** | Fewer than 2 of A1-A4 criteria met (with ≥1 core) → BLOCK Analyze | **BLOCK** Analyze label |
| **G-ANALYZE-DF** | DifficultyScore = 1 AND Analyze → BLOCK | **BLOCK** Analyze label |
| **G-STRUCT** | Missing stem, choices, or correct choice → BLOCK all HO labels | **BLOCK** all labels above Understand |

**Output:** `{ qid, gates_triggered: [...], pass: true|false }`

### 2.4 Stage 3 — Evidence Collection

**Performed by:** AI classification agent or human reviewer.

**For Evaluate candidates:**
- [ ] Evidence for E1 (Decision Maker): Quote the stem text identifying the stakeholder role
- [ ] Evidence for E2 (Competing Alternatives): List each choice and explain why it is defensible
- [ ] Evidence for E3 (Selection Rationale): Quote the explanation text showing trade-off reasoning
- [ ] Evidence for ≥1 additional criterion (E4/E5/E6): Document which and provide the specific evidence
- [ ] List any AF conditions that could apply and explain why they do NOT

**For Analyze candidates:**
- [ ] Document which 2+ of A1-A4 criteria are satisfied
- [ ] For A1 (Decomposition): Identify the sub-components the candidate must decompose
- [ ] For A2 (Cause-Effect): Quote the "why" question in the stem
- [ ] For A3 (Pattern): Count the data points that must be compared
- [ ] For A4 (Comparative): List the entities being compared and the comparison dimensions
- [ ] List any AF conditions and explain why they do NOT apply

**Output:** `{ qid, evidence_map: {...}, criteria_satisfied: [...], af_conditions_reviewed: [...] }`

### 2.5 Stage 4 — Certification Decision

**Performed by:** Human reviewer (release manager or designated certifier).

**Decision rules:**

| Stage 1 Result | Stage 2 Result | Stage 3 Result | Verdict |
|---------------|---------------|---------------|---------|
| Evaluate, HIGH confidence | All gates pass | All required evidence present | **CERTIFY as Evaluate** |
| Analyze, HIGH confidence | All gates pass | All required evidence present | **CERTIFY as Analyze** |
| Any | Any gate triggers | — | **REJECT — downgrade per AF table** |
| Any | All gates pass | Insufficient evidence | **HOLD — request additional evidence** |
| MEDIUM/LOW confidence | All gates pass | Evidence present | **FLAG — require second reviewer** |

## 3. Required Evidence Standard

### 3.1 Minimal Viable Evidence

Every certification submission must include:

1. **QID** — Unique question identifier
2. **Stem text** (first 100 characters, for audit trail)
3. **Current `CognitiveLevel`** (pre-audit)
4. **Proposed `CognitiveLevel`** (post-audit)
5. **S95P rubric criteria matched** (specific criterion IDs, e.g., "E1, E2, E3, E4")
6. **Classification confidence** (HIGH/MEDIUM/LOW)
7. **Auditor identity** (AI model, human reviewer, or tool name)
8. **Timestamp** (ISO 8601)

### 3.2 Enhanced Evidence (Required for Evaluate)

For Evaluate certification, enhanced evidence is required:

- **Distractor defensibility analysis:** Why each distractor is plausible for a candidate who misunderstands the situation
- **Trade-off documentation:** The specific trade-offs the candidate must weigh (e.g., "cost vs. quality vs. delivery reliability")
- **Anti-rule evidence:** Why this is NOT a deterministic rule application (i.e., why a reasonable professional could reach a different answer)

## 4. Required Reviewer Signoff

### 4.1 Certification Authority

| Role | Can Certify Evaluate | Can Certify Analyze | Notes |
|------|---------------------|--------------------|-------|
| AI Build-Time Verification (HIGH confidence) | Yes, with evidence documentation | Yes, with evidence documentation | Per CAQS §1.6 |
| Human Reviewer (any) | Yes | Yes | Override authority |
| Automated Gate (unreviewed) | No | No | Gates block, do not certify |

### 4.2 Two-Reviewer Rule

Items with MEDIUM or LOW classification confidence require a second reviewer:
- **MEDIUM confidence:** Second AI reviewer OR human reviewer
- **LOW confidence:** Human reviewer required (no AI-only signoff)

### 4.3 Audit Trail

Every certification decision must produce an audit trail entry:
```json
{
  "qid": "P1-XXX-YYY",
  "timestamp": "2026-07-31T12:00:00Z",
  "auditor": "cognitive-classifier-v1 / human-reviewer-name",
  "pre_audit_label": "Evaluate",
  "post_audit_label": "Analyze",
  "confidence": "HIGH",
  "rubric_match": ["A1", "A2", "A4"],
  "evidence_summary": "Multi-step decomposition of variance...",
  "reviewer_override": null
}
```

## 5. Auto-Fail Workflow

### 5.1 Automatic Failure Conditions

If ANY auto-fail condition triggers, the item is immediately rejected from HO classification. The true cognitive level is determined by the AF table:

| AF Condition | Trigger | True Cognitive Level |
|-------------|---------|---------------------|
| AF-E1 / AF-A1 (Definition Match) | Stem→Choice overlap > 70% | Remember (or Understand) |
| AF-E2 / AF-A2 (Formula Substitution) | Known formula with number plugging | Apply |
| AF-E3 / AF-A3 (Deterministic Rule) | Single ASC/COSO/IMA standard determines answer | Apply |
| AF-E4 / AF-A4 (Classification) | "What type of [X] is described?" | Apply (or Remember) |
| AF-E5 (Difficulty Mismatch) | Difficulty ≤ 2 + Evaluate | At minimum: upgrade difficulty. Likely: item is Apply at Moderate. |
| AF-A5 (Difficulty Mismatch) | Difficulty = 1 + Analyze | Upgrade difficulty OR item is Apply |
| AF-E6 (Single Correct Answer) | Only one choice defensible under known standard | Apply or Analyze (per multi-step complexity) |
| AF-A6 (Single-Step Interpretation) | "What does this mean?" with formula interpretation | Understand |
| G-STRUCT (Structural Defect) | Missing stem/choices/correctChoice | Unclassifiable — fix or archive |

### 5.2 Auto-Fail Resolution Path

1. **Block the HO label** — item is downgraded immediately
2. **Document the AF trigger** — which condition, which evidence
3. **Assign true cognitive level** — from AF table above
4. **Log to audit trail** — permanent record of the rejection
5. **Option: rewrite** — if the item is intended to be HO, rewrite to meet criteria, then re-submit to Stage 1

## 6. Gate Integration

### 6.1 Governance-Guard Rule 10

**Proposed implementation in `.opencode/plugins/governance-guard.js`:**

```javascript
// RULE 10: Cognitive Classification Gates
// Level: BLOCK
// Applies to: Any write/edit that changes CognitiveLevel field to "Evaluate" or "Analyze"
// 
// Block conditions:
//   - Stem-to-correct-choice lexical overlap > 70% (G-DEF)
//   - No decision maker on Evaluate candidate (G-EVAL-1)
//   - Difficulty <= 2 AND Evaluate (G-EVAL-4)
//   - Missing structural fields on HO candidate (G-STRUCT)
```

**Test suite expansion:** `test_governance_guard.js` adds ~12 tests for Rule 10.

### 6.2 Validator Pipeline

**Proposed `scripts/validators/CognitiveValidator.js`:**

A pre-certification audit module that:
1. Scans all items with `CognitiveLevel ∈ {Analyze, Evaluate}`
2. Runs automated gates (G-DEF, G-STRUCT)
3. Flags items for human review (G-EVAL-1 through G-EVAL-4, G-ANALYZE)
4. Produces `reports/cognitive_audit_report.md` with flagged items and reasons

### 6.3 Certification Campaign Integration

Every future certification campaign must include a **Cognitive Audit** step before `question_state` transitions:

```
Current Campaign Pipeline:
  validate → build-registry → dashboard

Proposed Campaign Pipeline:
  validate → cognitive-audit → build-registry → dashboard
```

The cognitive audit is read-only and does not modify `question_state`. It produces a report that the campaign leader reviews before approving certification.

## 7. Difficulty-Cognitive Consistency Rule

### 7.1 Minimum Difficulty by Cognitive Level

| Cognitive Level | Minimum Difficulty | Minimum DifficultyScore |
|----------------|-------------------|------------------------|
| Remember | Easy | 1 |
| Understand | Easy | 1 |
| Apply | Easy | 1 |
| Analyze | Moderate-Easy | 2 |
| Evaluate | Moderate | 3 |

### 7.2 Inconsistency Detection

Any item with `DifficultyScore` below the minimum for its `CognitiveLevel` is flagged. This catches items like:
- EC-031: `CognitiveLevel: "Evaluate"`, `DifficultyScore: 1` — impossible (scores 1 or 3 depending on interpretation)
- Items labeled Evaluate at Easy or Moderate-Easy — structurally impossible per S95P rubrics

### 7.3 Dual Correction Principle

When both `CognitiveLevel` and `DifficultyScore` are inconsistent, correct both together:
- If CognitiveLevel is misclassified → correct CognitiveLevel, then reassess DifficultyScore
- If CognitiveLevel is correct → upgrade DifficultyScore to match the minimum
- Never correct one without checking the other

## 8. CAQS Alignment

### 8.1 CAQS §1.6.3 — Difficulty Calibration

This governance framework directly satisfies CAQS §1.6.3's requirement: "Difficulty Calibration — matches stated tier and LOS depth verb." The automated gates ensure consistency between CognitiveLevel and DifficultyScore at certification time.

### 8.2 CAQS §2.2 Dimension 2 — Cognitive Level

The framework satisfies CAQS §2.2 Dimension 2 (15% weight): "Cognitive level must be correct and aligned with prompt and answer choices." The 4-stage pipeline provides verifiable evidence of correct cognitive classification.

### 8.3 CAQS §6.1 and §6.2 — Distribution Targets

The corrected baseline (219 true HO / 8.6%) provides an honest measurement against CAQS targets:
- Remember: 5% → target 127 → corrected ~115 (on target)
- Understand: 15% → target 382 → corrected ~1,105 (overrepresented)
- Apply: 40% → target 1,018 → corrected ~1,135 (on target)
- Analyze: 25% → target 636 → corrected ~117 (deficit 519)
- Evaluate: 15% → target 382 → corrected ~102 (deficit 280)

## 9. Monitoring and Drift Detection

### 9.1 Pre-Campaign Audit

Before any modernization campaign begins:
1. Run a sample cognitive audit on the target section (sample size proportional to section population)
2. Establish baseline accuracy rate
3. Set a conversion-rate target (minimum 70%)

### 9.2 Post-Campaign Audit

After each modernization campaign:
1. Run a full cognitive audit on the newly created/rewritten items
2. Report true HO output alongside labeled output
3. Flag any item where labeled level ≠ audited level
4. Recalculate section accuracy rate

### 9.3 Periodic Pool Audit

Every 10th modernization wave or after any certification wave adding ≥25 HO items:
- Run a full-pool cognitive sample audit (75 Evaluate + 75 Analyze items)
- Compare against the authoritative corrected baseline
- Flag any drift > 5 percentage points for investigation

## 10. Current State — Governance Readiness

| Element | Status |
|---------|--------|
| Evaluate Rubric | **DEFINED** — S95P_EVALUATE_RUBRIC.md |
| Analyze Rubric | **DEFINED** — S95P_ANALYZE_RUBRIC.md |
| Quality Gates (7 automated) | **DEFINED** — S94P_QUALITY_GATES.md |
| Review Workflow (4-stage) | **DEFINED** — S95P_REVIEW_WORKFLOW.md |
| QA Checklist | **DEFINED** — S95P_HO_REVIEW_CHECKLIST.md |
| Misclassification Examples | **CATALOGUED** — S95P_MISCLASSIFICATION_EXAMPLES.md |
| Genuine Exemplars | **CATALOGUED** — 4 Evaluate + 4 Analyze |
| Governance Guard Rule 10 | **NOT YET DEPLOYED** — code ready for implementation |
| Validator Integration | **NOT YET DEPLOYED** — CognitiveValidator design complete |
| Campaign Pipeline Integration | **NOT YET DEPLOYED** — proposal documented |
| Corrected Baseline | **GENERATED** — SESSION099P_CORRECTED_BASELINE.md |
| Recovery Queue | **GENERATED** — SESSION099P_RECOVERY_EXECUTION_QUEUE.json |

---

*Generated: 2026-07-31 | Session 99P — Implementer Phase*
