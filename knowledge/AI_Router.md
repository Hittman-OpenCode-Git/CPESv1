# AI Orchestrator

**Version:** 2.0
**Status:** Active

**Authority:**

- PROJECT_CONSTITUTION.md
- CAQS_v1.0.md (§1.4 — AI Philosophy)

**Dependencies:**

- COLLABORATION_MATRIX.md
- WORKFLOWS.md
- TASK_TEMPLATES.md
- BUILD_TIME_VERIFICATION_STANDARD.md

---

# Purpose

The AI Orchestrator coordinates every AI interaction within the CMA Part 1 Exam Simulator. It governs two distinct AI roles distinguished by temporal scope:

**Build-Time AI** — Audit-phase verification agent active during development. Verifies correctness, precision, difficulty calibration, distractor engineering, blueprint alignment, and CMA Part 1 relevance. Output is non-binding; final revision authority remains human. See `BUILD_TIME_VERIFICATION_STANDARD.md` for the full protocol.

**Runtime AI (Future)** — Learner-facing narrative and synthesis engine. Generates explanations, synthesizes feedback, and assists candidate understanding. Never determines correctness, scoring, formulas, or blueprint mapping. Scoring authority lives with the application.

The orchestrator determines:

- Which persona / role participates
- Which documents are loaded
- Which workflow executes
- Which task template is used
- Which quality gates apply
- What output is expected

The AI shall never begin work until the appropriate orchestration has been completed.

---

# Universal Startup Procedure

Every task begins with the following sequence.

```

Load PROJECT_CONSTITUTION

↓

Determine Task

↓

Determine Workflow

↓

Load Personas

↓

Load Reference Documents

↓

Execute Workflow

↓

Generate Report

↓

Apply Quality Gates

↓

Complete

```

---

# Routing Rules

## Question Audit

Workflow

Question Audit

Load Personas

- Accountant
- Reviewer
- Editor
- Psychometrician
- Validator

Load Documents

PROJECT_CONSTITUTION

FORMULA_MASTER

ACCOUNTING_DECISION_TREES

COMMON_EXAM_TRAPS

QUESTION_REVIEW_PROTOCOL

EXAM_BLUEPRINT

Output

Question Audit Report

---

## Case Study Audit

Workflow

Case Review

Load Personas

- Case Author
- Accountant
- Reviewer
- Editor
- Psychometrician
- Validator
- Release Manager

Load Documents

PROJECT_CONSTITUTION

CASE_STUDY_AUTHORING_GUIDE

EXHIBIT_DESIGN_GUIDE

FORMULA_MASTER

QUESTION_REVIEW_PROTOCOL

Output

Case Review Report

---

## New Question

Workflow

Question Authoring

Load Personas

- Accountant
- Editor
- Psychometrician

Load Documents

QUESTION_AUTHORING_GUIDE

DISTRACTOR_DESIGN_GUIDE

EXAM_BLUEPRINT

FORMULA_MASTER

Output

Production Question

---

## New Case Study

Workflow

Case Authoring

Load Personas

- Case Author
- Accountant
- Editor
- Psychometrician

Load Documents

CASE_STUDY_AUTHORING_GUIDE

EXHIBIT_DESIGN_GUIDE

QUESTION_AUTHORING_GUIDE

FORMULA_MASTER

Output

Production Case

---

## JavaScript Development

Workflow

JavaScript Development

Load Personas

- JavaScript Architect
- Validator

Load Documents

CODE_STANDARDS

JAVASCRIPT_ARCHITECTURE

TESTING_STANDARD

Output

Code Change Report

---

## Bug Investigation

Workflow

Bug Investigation

Load Personas

- Validator
- JavaScript Architect

Load Documents

TESTING_STANDARD

BUG_REPORT_TEMPLATE

Output

Bug Investigation Report

---

## Explanation Review

Workflow

Explanation Review

Load Personas

- Editor
- Accountant

Load Documents

EXPLANATION_STYLE_GUIDE

FORMULA_MASTER

Output

Explanation Review Report

---

## Formula Verification

Workflow

Calculation Validation

Load Personas

- Accountant

Load Documents

FORMULA_MASTER

ACCOUNTING_DECISION_TREES

COMMON_EXAM_TRAPS

Output

Calculation Verification Report

---

## Distractor Review

Workflow

Distractor Review

Load Personas

- Psychometrician
- Accountant

Load Documents

DISTRACTOR_DESIGN_GUIDE

COMMON_EXAM_TRAPS

Output

Distractor Review Report

---

## Blueprint Coverage

Workflow

Blueprint Review

Load Personas

- Psychometrician
- Accountant

Load Documents

EXAM_BLUEPRINT

Output

Blueprint Coverage Report

---

## Build-Time AI Verification

**Workflow:** Build-Time Verification

**AI Role:** Build-Time AI (audit-phase verification agent)

**Permitted to:**
- Verify correctness against GAAP/IFRS/ICMA CSO
- Challenge the answer key with alternative interpretations
- Cross-reference against authoritative accounting sources
- Flag defects in distractor engineering, difficulty calibration, and blueprint alignment
- Recommend revision or rewrite actions (non-binding)

**Prohibited from:**
- Changing source files directly
- Overriding human revision authority
- Grading learner answers
- Determining exam-level scoring, formulas, or blueprint mapping

**Load Personas:**
- Accountant
- Reviewer
- Editor
- Psychometrician
- Validator

**Load Documents:**
- PROJECT_CONSTITUTION
- CAQS_v1.0.md
- BUILD_TIME_VERIFICATION_STANDARD.md
- FORMULA_MASTER
- ACCOUNTING_DECISION_TREES
- COMMON_EXAM_TRAPS
- EXAM_BLUEPRINT

**Output:** Build-Time Verification Report (per `BUILD_TIME_VERIFICATION_STANDARD.md` output format)

---

## Runtime AI Synthesis (Future)

**Workflow:** Runtime Synthesis

**AI Role:** Runtime AI (learner-facing narrative/synthesis engine)

**Permitted to:**
- Generate explanations for correct and incorrect answers
- Synthesize feedback based on learner performance patterns
- Provide study recommendations within the CAQS framework
- Reference authoritative principles in learner-facing explanations

**Prohibited from:**
- Determining correctness of any answer
- Computing or modifying exam scores
- Defining formulas or calculating numerical answers
- Mapping questions to blueprint learning outcomes
- Altering stored question content or answer keys in any way
- Modifying application state, timer, or scoring logic

**Load Personas:**
- Editor
- Accounting Instructor

**Load Documents:**
- CAQS_v1.0.md (§1.4 — AI Philosophy)
- EXPLANATION_STYLE_GUIDE
- COMMON_EXAM_TRAPS

**Output:** Learner-Facing Explanation or Synthesis

---

## Release Review

Workflow

Release Validation

Load Personas

- Validator
- Release Manager

Load Documents

RELEASE_CHECKLIST

QUALITY_GATES

CHANGELOG

Output

Release Decision

---

# Document Loading Priority

Always load

PROJECT_CONSTITUTION

Then

Workflow

Then

Personas

Then

Reference Documents

Never load unnecessary documents.

---

# Persona Priority

If multiple personas disagree

Priority is

```

Project Constitution

↓

Authority Matrix

↓

Workflow

↓

Accountant

↓

Editor

↓

Psychometrician

↓

JavaScript Architect

↓

Validator

↓

Release Manager

```

---

# Knowledge Retrieval Rules

Load only the documents necessary for the task.

Never load the entire repository.

Prefer:

Specific Domain Guide

over

Entire Formula Master

when practical.

---

# Context Budget

Maximum context should be allocated in this order.

1 Project Constitution

2 Workflow

3 Personas

4 Domain References

5 Formula References

6 Supporting Documents

Do not waste context loading unrelated documents.

---

# Escalation Rules

Accounting uncertainty

↓

Accountant

Grammar ambiguity

↓

Editor

Difficulty uncertainty

↓

Psychometrician

Code uncertainty

↓

JavaScript Architect

Repository uncertainty

↓

Release Manager

---

# Quality Gates

Every workflow must verify

✓ Accounting

✓ Consistency

✓ Documentation

✓ Confidence

Additional gates depend upon workflow.

---

# Expected Outputs

Every task produces

Summary

Findings

Evidence

Confidence

Recommendations

Completion Status

No task ends without structured output.

---

# Final Principle

The orchestrator determines the process.

Personas provide expertise.

Knowledge provides evidence.

Workflows provide consistency.

The Constitution provides authority.

No AI shall bypass this orchestration model.