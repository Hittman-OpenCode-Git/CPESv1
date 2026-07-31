# Session 95P — Higher-Order Review Workflow

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Reference:** SESSION095P_EVALUATE_RUBRIC.md, SESSION095P_ANALYZE_RUBRIC.md, SESSION095P_HO_REVIEW_CHECKLIST.md

---

## 1. Purpose

This document defines the 4-stage certification workflow for Higher-Order (Analyze + Evaluate) cognitive level classification. It integrates the Evaluate Rubric, Analyze Rubric, and Review Checklist into a repeatable process usable by build-time AI verification, human certification reviewers, and future modernization campaign authors.

## 2. Workflow Overview

```
                                ITEM ENTERS REVIEW
                                       │
                                       ▼
                    ┌──────────────────────────────────┐
                    │  STAGE 1: COGNITIVE CLASSIFICATION │
                    │  Independent bloom's level assessment │
                    │  (Ignore stored label. Read stem +    │
                    │   choices + explanation. Classify.)   │
                    └──────────────┬───────────────────────┘
                                   │
                         ┌─────────┴─────────┐
                         │                   │
                    Remember /       Analyze / Evaluate
                    Understand /     (targeted)
                    Apply
                         │                   │
                         ▼                   ▼
              ┌──────────────────┐  ┌──────────────────────┐
              │  STAGE 1B:       │  │  STAGE 2:            │
              │  Reclassify      │  │  AUTOMATIC FAILURE   │
              │  Label matches   │  │  GATE                │
              │  true level.     │  │  Run AF-1 through    │
              │  DONE.           │  │  AF-6 checks.        │
              └──────────────────┘  └──────────┬───────────┘
                                               │
                                    ┌──────────┴──────────┐
                                    │                     │
                              AF triggered          0 AF triggered
                                    │                     │
                                    ▼                     ▼
                          ┌──────────────────┐  ┌──────────────────────┐
                          │  RECLASSIFY      │  │  STAGE 3:            │
                          │  Downgrade to    │  │  EVIDENCE COLLECTION │
                          │  true level.     │  │  Document which      │
                          │  DONE.           │  │  criteria are met    │
                          └──────────────────┘  │  with item-specific  │
                                                │  evidence.           │
                                                └──────────┬───────────┘
                                                           │
                                                           ▼
                                                ┌──────────────────────┐
                                                │  STAGE 4:            │
                                                │  CERTIFICATION       │
                                                │  DECISION            │
                                                │  All required        │
                                                │  criteria met?       │
                                                └──────────┬───────────┘
                                                           │
                                                ┌──────────┴──────────┐
                                                │                     │
                                          CERTIFY              BLOCK
                                                │                     │
                                                ▼                     ▼
                                    ┌──────────────────┐  ┌──────────────────────┐
                                    │  Item certified   │  │  Return to author    │
                                    │  with evidence    │  │  with reason and     │
                                    │  trail.           │  │  required fixes.     │
                                    └──────────────────┘  └──────────────────────┘
```

## 3. Stage Detail

### Stage 1: Cognitive Classification

**Who:** Build-time AI verification or Human Reviewer

**Input:** Item (stem + choices + correct answer + explanation)

**Process:**
1. Read the stem, all choices, and the correct answer explanation.
2. **Ignore the stored `CognitiveLevel` label.**
3. Determine the true cognitive level using the definitions in `SESSION095P_HO_CERTIFICATION_PLAN.md` §4.
4. Reference the Quick-Reference Red Flags table in `SESSION095P_HO_REVIEW_CHECKLIST.md` §E.
5. Record the true cognitive level.

**Output:** True cognitive level (Remember | Understand | Apply | Analyze | Evaluate)

**Classification guide (from PLAN §4):**

| What the candidate does | Level |
|------------------------|-------|
| Match definition to term | Remember |
| Explain, interpret, paraphrase | Understand |
| Execute formula/procedure/rule | Apply |
| Decompose, diagnose cause, detect pattern, compare | Analyze |
| Judge alternatives, make trade-off decision | Evaluate |

**Rule of thumb:** If you can answer by looking up one rule, formula, or definition → Apply or below. If you must think about what the data means or what should be done about it → Analyze or Evaluate.

---

### Stage 2: Automatic Failure Gate

**Who:** Build-time AI verification or automated script

**Input:** Item + claimed cognitive level (Analyze or Evaluate)

**Process:**
1. Run all 6 Automatic Failure conditions against the item.
2. For AF-1 (definition-match): compute stem→correct-choice lexical overlap.
3. For AF-2 (formula substitution): detect calculation verbs + single-step.
4. For AF-3 (rule application): detect deterministic standard application.
5. For AF-4 (classification): detect taxonomy-matching pattern.
6. For AF-5 (difficulty mismatch): check DifficultyScore.
7. For AF-6 (single-correct): evaluate distractor defensibility.

**Output:**
- `PASS` — 0 AF conditions triggered → proceed to Stage 3
- `FAIL` — ≥1 AF conditions triggered → reclassify to true level; item is **Blocked** from Analyze/Evaluate

**AF Detection Rules (automated):**

| AF | Regex / Rule |
|----|-------------|
| AF-1 | Stem words ∩ CorrectChoice words / Stem words > 0.4 |
| AF-2 | `/calculate|compute|find/i` in Stem AND numeric `Correct` AND single formula in ExplanationCorrect |
| AF-3 | `/Under (ASC|IFRS|COSO|GAAP|IAS)/i` in Stem AND no `"competing"|"best"|"trade.off"` in ExplanationCorrect |
| AF-4 | `/what type of|which (COSO|component|category)|classified as/i` in Stem |
| AF-5 | `DifficultyScore ∈ {1, 2}` AND `CognitiveLevel ∈ {"Analyze", "Evaluate"}` |
| AF-6 | Manual: ≥3 distractors unambiguously wrong under known standard |

---

### Stage 3: Evidence Collection

**Who:** Build-time AI verification or Human Reviewer

**Input:** Item + target cognitive level (Analyze or Evaluate)

**Process:**

**If target = Analyze:**
1. Assess each of A1–A4 criteria independently.
2. For each criterion met, collect specific evidence from the item:
   - Quote the stem passage that demonstrates decomposition
   - Identify the cause-effect relationship
   - List the data points supporting pattern recognition
   - Identify the entities and dimensions being compared
3. Count criteria met. **≥2 required.**

**If target = Evaluate:**
1. Assess E1–E3 (core criteria). **All 3 required.**
2. For each core criterion met, collect specific evidence:
   - E1: Identify the stakeholder role and decision verb
   - E2: For each distractor, explain why a reasonable candidate might select it
   - E3: Quote the trade-off rationale from ExplanationCorrect
3. Assess E4–E6 (additional criteria). **≥1 required.**
4. For each additional criterion met, collect specific evidence.

**Output:** Evidence record with:
- Criterion-by-criterion assessment (PASS/FAIL)
- Specific evidence quotes from the item
- Count of criteria met

**Evidence format:**

```
QID: P1-XX-XXX | Target: Evaluate
E1 (Decision Maker): PASS — "CFO Maria Chen must recommend which sourcing strategy..."
E2 (Competing Alternatives): PASS — Choice A (lowest price, poor quality) defensible for cost-first candidate. Choice B (highest quality, expensive) defensible for quality-first candidate.
E3 (Selection Rationale): PASS — ExplanationCorrect weighs price (25%), quality (40%), delivery (25%), and payment terms (10%).
E4 (Trade-Offs): PASS — Cost vs. quality vs. delivery reliability vs. payment terms.
Criteria met: 4/4 core + 1/3 additional → CERTIFY (≥3 core + ≥1 additional)
```

---

### Stage 4: Certification Decision

**Who:** Human Reviewer (final authority) or Build-Time AI Verification (recommendation)

**Input:** Evidence record from Stage 3

**Decision Logic:**

#### Analyze Decision

| Criteria Met (A1–A4) | AF Triggered | Verdict |
|----------------------|-------------|---------|
| ≥2 | 0 | **CERTIFY as Analyze** |
| 0–1 | 0 | **BLOCK — insufficient criteria** |
| Any | ≥1 | **RECLASSIFY to true level** |

#### Evaluate Decision

| E1 | E2 | E3 | E4–E6 (≥1) | AF Triggered | Verdict |
|----|----|----|-----------|-------------|---------|
| PASS | PASS | PASS | ≥1 | 0 | **CERTIFY as Evaluate** |
| PASS | PASS | PASS | 0 | 0 | **BLOCK — needs additional criterion** |
| FAIL any | — | — | — | 0 | **BLOCK — missing core criterion** |
| — | — | — | — | ≥1 | **RECLASSIFY to true level** |

**Output:** Certification decision with evidence trail.

---

## 4. Reclassification Protocol

When an item is reclassified (downgraded), the following must happen:

1. **CognitiveLevel field** — Update to true level
2. **Difficulty field** — Reassess difficulty against the true cognitive level:
   - Remember: normally Easy (1)
   - Understand: normally Easy or Moderate-Easy (1–2)
   - Apply: normally Moderate-Easy to Moderate (2–3)
   - Analyze: normally Moderate to Difficult (3–4)
   - Evaluate: normally Moderate to Difficult (3–4)
3. **ExplanationCorrect** — Verify explanation is appropriate for the downgraded level (shorter explanations are acceptable for Remember/Understand/Apply)
4. **REVISION_HISTORY.md entry** — Document the reclassification with reason and evidence
5. **Pre-delivery safety check** — Reclassification is not a certification change (item may already be Certified). Verify no learner-safety impact.

---

## 5. Quality Gates

### 5.1 Pre-Certification Gate (for New Items)

Before a newly authored item can be certified as Analyze or Evaluate:
- [ ] Stage 1 classification completed with documented true level
- [ ] Stage 2 AF gate passed (0 AF conditions)
- [ ] Stage 3 evidence collected for all required criteria
- [ ] Stage 4 certification decision recorded
- [ ] Reviewer sign-off on `SESSION095P_HO_REVIEW_CHECKLIST.md` Section D

### 5.2 Post-Certification Gate (for Existing Certified Items)

For items already certified as Analyze or Evaluate that undergo re-audit:
- [ ] Stage 1 re-classification completed (ignore stored label)
- [ ] Stage 2 AF gate re-run
- [ ] If AF triggered or criteria not met → flag for reclassification
- [ ] If still valid → document confirmation with evidence
- [ ] Do NOT revoke certification without human authorization (per CAQS §9.2: Certified→In Audit requires explicit re-verification request)

### 5.3 Batch Review Gate

For modernization campaigns that upgrade multiple items:
- [ ] At least 20% of upgraded items must undergo independent Stage 1–4 full review
- [ ] If batch accuracy falls below 70%, entire batch is suspect and must be fully re-reviewed
- [ ] Per-item evidence trail required for all certified items
- [ ] Batch summary: count reviewed, count certified, count blocked, accuracy rate

---

## 6. Roles and Responsibilities

| Role | Stages | Authority |
|------|--------|-----------|
| Build-Time AI | 1, 2, 3 (recommendation) | Can classify, flag AF, collect evidence. Cannot make final certification decision. |
| Human Reviewer | 1, 2, 3, 4 | Final authority on certification. Signs off on Section D of checklist. |
| Release Manager | 4 (gate) | Verifies reviewer sign-off exists. Does not re-evaluate cognitive classification. |
| Modernization Campaign Author | — | Must follow this workflow for all Analyze/Evaluate items produced. |

## 7. Integration with Existing Governance

### 7.1 Relationship to Existing Certification Process

This workflow supplements, not replaces, the CAQS §1.7 certification process:
- CAQS §1.7 governs the *state transition* (In Audit → Certified)
- This workflow governs the *cognitive classification* within that transition

An item cannot transition to Certified as Analyze or Evaluate unless:
1. It passes the CAQS §1.6 six-dimension verification
2. It passes this workflow's 4-stage cognitive certification

### 7.2 Relationship to Governance Guard

This workflow does not create new governance guard rules. It is a procedural framework operated by build-time AI and human reviewers. Future sessions may encode AF-1 through AF-5 as automated guard rules if desired.

### 7.3 Relationship to DEFECT_LIBRARY.md

Existing defect entries relevant to this workflow:
- **DL-031** — Definition-Match Difficulty Inflation (systematic mislabeling of definition items as Moderate)
- **DL-032** — Case Bank Uniform Difficulty (all case items labeled Moderate)
- **DL-035** — Governance Guard DL-026 Coverage Gap (certification pipeline missed empty EW slots)

No new DL entries are created by this session (no defects discovered — this is a framework definition, not a defect investigation).

---

## 8. Appendices

### A. Quick Reference: Bloom's Verbs by Level

| Level | Representative Verbs |
|-------|---------------------|
| Remember | define, list, recall, identify, recognize, match, label |
| Understand | explain, describe, interpret, summarize, classify, paraphrase, compare (basic) |
| Apply | calculate, compute, execute, implement, solve, use, apply, determine (by formula) |
| Analyze | differentiate, distinguish, examine, decompose, diagnose, attribute, organize, compare (multi-dimensional) |
| Evaluate | judge, recommend, select the best, prioritize, critique, defend, weigh, decide |

### B. Quick Reference: Question Templates by Level

| Level | Typical Question Format |
|-------|------------------------|
| Remember | "What is [term]?" / "Which of the following is [definition]?" |
| Understand | "Which of the following best describes [concept]?" / "How does [X] differ from [Y]?" |
| Apply | "Calculate [result] given [data]." / "Under [standard], what is the treatment for [situation]?" |
| Analyze | "What is the primary cause of [variance/trend]?" / "Which component of [report] indicates [problem]?" |
| Evaluate | "[Stakeholder] must recommend [decision] considering [trade-offs]." / "Which [strategy] best balances [competing objectives]?" |

---

*Generated: 2026-07-31 | Session 95P Implementer Phase — Review Workflow*
