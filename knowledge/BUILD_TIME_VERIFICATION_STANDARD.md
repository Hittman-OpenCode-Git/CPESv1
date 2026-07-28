# Build-Time AI Verification Standard

**Version:** 1.0
**Status:** Active
**Authority:** CAQS_v1.0.md (§1.4 — AI Philosophy, §1.6 — Build-Time AI Verification Standard)
**Applies to:** All content in the CAQS audit loop (MCQ banks, case studies, exhibits)

---

## 1. Purpose

This document defines the per-question verification protocol for build-time AI during the CAQS audit loop. Every question must receive AI verification across six dimensions before it can be designated Exam-Ready. Verification results are non-binding recommendations; final revision authority remains human.

---

## 2. Per-Question Verification Output Format

Each question receives a verification block with the following structure:

```
QID: [question ID]

1. Correctness
   Verification: [verified / flagged / uncertain]
   Authority: [FASB ASC citation / ICMA CSO section / textbook reference]
   Confidence: [high / medium / low]
   Notes: [any concerns, edge cases, or standards-drift flags]

2. Precision
   Internal consistency: [pass / fail]
   Fact pattern ambiguity: [none / minor / material]
   Numeric reconciliation: [verified / issue]

3. Difficulty Calibration
   Stated tier: [easy / medium / hard]
   Verified tier: [matches / recommend adjustment to X]
   LOS depth verb match: [pass / fail]

4. Distractor Engineering
   Distractor A tier: [A/B/C/D] — misconception tested: [description]
   Distractor B tier: [A/B/C/D] — misconception tested: [description]
   Distractor C tier: [A/B/C/D] — misconception tested: [description]
   Overall quality: [strong / adequate / weak / rewrite]

5. Blueprint Alignment
   Mapped LOS: [Section.Topic.LOS code]
   Alignment confidence: [high / medium / low]

6. CMA Part 1 Relevance
   In-scope: [yes / no / borderline]
   Notes: [any Part 2 drift or scope concerns]

AI Verification Confidence (overall): [high / medium / low]
Recommended action: [Exam-Ready / Revise / Rewrite / Hold pending source verification]
Human reviewer required for: [list any items where AI confidence is not high]
```

---

## 3. Confidence Flagging Rules

### 3.1 Confidence Scale

| Level | Meaning | Action Required |
|-------|---------|-----------------|
| High | AI is confident in this assessment. Standard references are clear and unambiguous. | No mandatory human re-check, but human review is recommended before Exam-Ready designation |
| Medium | AI has moderate confidence. Some ambiguity exists in the standard interpretation or fact pattern. | Human reviewer must verify this dimension |
| Low | AI is uncertain. Standard is unclear, fact pattern is ambiguous, or multiple defensible interpretations exist. | Human reviewer must verify AND document resolution before question can advance to Exam-Ready |

### 3.2 Non-Negotiable Rule

Any **low-confidence** claim in any dimension requires human verification before the question can advance to Exam-Ready. The human reviewer must document the resolution in the verification record.

### 3.3 Escalation

If AI confidence is low on:
- **Correctness** — Escalate to a human accountant with access to authoritative accounting references
- **Difficulty Calibration** — Escalate to a psychometric reviewer
- **Blueprint Alignment** — Escalate to a domain expert familiar with the ICMA CSO

---

## 4. Verification Workflow

```
Step 1: Run automated validators
  ↓
Step 2: AI reads question stem, choices, explanations, and metadata
  ↓
Step 3: AI produces verification block (six dimensions)
  ↓
Step 4: AI flags any low-confidence items
  ↓
Step 5: Human reviewer resolves flagged items
  ↓
Step 6: Human reviewer makes final Keep / Revise / Rewrite decision
  ↓
Step 7: If Keep or Revise → proceed to CAQS scoring
        If Rewrite → return to authoring
```

---

## 5. Permitted and Prohibited Actions

### Build-Time AI Permitted To:
- Verify correctness against GAAP / IFRS / ICMA CSO / standard managerial accounting
- Challenge the answer key with alternative interpretations
- Cross-reference against authoritative accounting sources
- Flag defects in distractor engineering, difficulty calibration, and blueprint alignment
- Recommend revision or rewrite actions (non-binding)
- Reference specific FASB ASC sections, ICMA CSO outcomes, CMA exam blueprint topics
- Identify standards-drift (content that was correct when written but no longer reflects current standards)

### Build-Time AI Prohibited From:
- Changing source files directly
- Overriding human revision authority
- Grading learner answers
- Determining exam-level scoring, formulas, or blueprint mapping
- Adding new validators or altering the validator pipeline
- Modifying runtime application code

---

### 3.4 HIGH-Confidence Requirement for Certified State

Effective Sub-batch 2A close-out (2026-07-22), transition to `question_state = Certified` requires:

- **HIGH confidence across ALL six dimensions** — no Medium or Low flags permitted
- **Distractor tier map** recorded per verification output (Section 4)
- **User approval** documented in `REVISION_HISTORY.md`

Any question that cannot achieve HIGH confidence on all six dimensions remains In Audit or Editorial Queue. The HIGH-confidence gate is non-negotiable per the correctness-over-throughput principle (CAQS_v1.0.md §1.7.3).

---

## 4. Distractor Tier Framework

Each distractor in a Certified question must be classified by misconception tier:

| Tier | Meaning | Example |
|------|---------|---------|
| A | Common, high-signal misconception that a well-prepared candidate might select | Confusing reasonably possible with remote (ASC 450) |
| B | Moderate-signal misconception; requires domain knowledge to recognize as wrong | Over-applying prudence by accruing maximum loss |
| C | Weak distractor; obviously wrong to most candidates | Gain contingency in a loss scenario |
| D | Throwaway; included only to fill the fourth slot | — |

Distractor tier maps are recorded in the certification entry format ($5).

---

## 5. Certification Entry Format

Every Certified question receives a certification entry in `REVISION_HISTORY.md` following this template:

```
[QID] — Certified [date]

  Verification: HIGH confidence, all six dimensions PASS
  Authority: [primary ASC citation / ICMA CSO reference]
  Axis: [pedagogical axis if applicable, e.g., "Probability = reasonably possible → disclose (no accrual)"]
  Distractor tier map:
    A: [tier] — [misconception label]
    B: [tier] — [misconception label]
    C: [tier] — [misconception label]
    D: [tier] — [misconception label]
  Pedagogical cluster: [if applicable, e.g., "ASC_450_axis_cluster"]
  Certifier: build-time AI verification + user approval
```

---

## 6. Relationship to Other Documents

| Document | Relationship |
|----------|-------------|
| CAQS_v1.0.md (§1.4) | Defines the build-time / runtime AI philosophy |
| CAQS_v1.0.md (§1.6) | Defines the six verification dimensions at a summary level |
| CAQS_v1.0.md (§1.7) | Certification Standard — defines the Certified state and its requirements |
| DEFECT_LIBRARY.md | Defects surfaced by AI verification follow the same schema with "Validator" field reading "Build-Time AI Verification" |
| AI_Router.md | Documents build-time AI workflow and permitted/prohibited actions |
| QUESTION_METADATA_STANDARD.md (§9) | Defines question_state and pedagogical_cluster field schema |
| VALIDATION_REPORT.md | AI verification is complementary to automated validator output; both feed into the CAQS review decision |

---

## 7. Revision History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-07-22 | Build-Time AI | Initial version. Defines per-question verification protocol for CAQS audit loop |
| 1.1 | 2026-07-22 | Build-Time AI | Added §3.4 HIGH-confidence Certified gate, §4 Distractor Tier Framework, §5 Certification Entry Format |
