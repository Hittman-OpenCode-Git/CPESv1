# AI Task Templates

Version: 1.0

Status: Active

Authority:

- PROJECT_CONSTITUTION.md
- COLLABORATION_MATRIX.md
- WORKFLOWS.md

---

# Purpose

Task Templates define standardized AI operations used throughout the CMA Part 1 Exam Simulator.

Unlike prompts, templates define:

- Objective
- Required Personas
- Workflow
- Inputs
- Outputs
- Quality Gates
- Success Criteria

Task Templates ensure that every AI performs work consistently regardless of model.

---

# Standard Task Lifecycle

Every task follows this lifecycle.

Receive Task

↓

Load Personas

↓

Load Required Documents

↓

Execute Workflow

↓

Generate Report

↓

Apply Quality Gates

↓

Complete

---

# Task Template 001

## Audit Existing Question

### Purpose

Verify that an existing question is technically correct and suitable for production.

### Personas

- Accountant
- Editor
- Psychometrician
- Validator

### Required References

- FORMULA_MASTER.md
- ACCOUNTING_DECISION_TREES.md
- COMMON_EXAM_TRAPS.md
- EXAM_BLUEPRINT.md

### Inputs

- Question
- Choices
- Explanation
- Metadata

### Workflow

QUESTION_AUDIT

### Output

Question Audit Report

Including:

- Accounting correctness
- Correct answer
- Formula validation
- Explanation review
- Distractor review
- Difficulty
- Confidence
- Recommendations

### Quality Gates

✓ Accounting

✓ Grammar

✓ Blueprint

✓ Metadata

✓ Validation

---

# Task Template 002

## Audit Case Study

### Personas

- Case Author
- Accountant
- Editor
- Psychometrician
- Validator

### Inputs

Entire case

Including:

- Scenario
- Exhibits
- Questions
- Explanations

### Workflow

CASE_REVIEW

### Output

Case Study Review Report

### Additional Checks

- Exhibit consistency
- Cross-question dependencies
- Progressive difficulty
- Scenario realism

---

# Task Template 003

## Create New Question

### Personas

- Accountant
- Editor
- Psychometrician

### Inputs

Blueprint objective

Difficulty

Topic

### Workflow

QUESTION_AUTHORING

### Output

Complete production-ready question.

Must include:

- metadata
- explanation
- distractors
- topic
- difficulty

---

# Task Template 004

## Create New Case Study

### Personas

- Case Author
- Accountant
- Editor
- Psychometrician

### Inputs

Blueprint objective

Target domain

Difficulty

### Workflow

CASE_AUTHORING

### Output

Integrated case study including:

- Scenario
- Exhibits
- Questions
- Explanations
- Metadata

---

# Task Template 005

## Improve Distractors

### Personas

- Psychometrician
- Accountant

### Inputs

Existing question

### Workflow

DISTRACTOR_REVIEW

### Objectives

Every distractor should represent:

- common accounting mistake
- incorrect formula
- conceptual misunderstanding
- arithmetic error
- unit error

Never create absurd distractors.

---

# Task Template 006

## Verify Calculations

### Personas

- Accountant

### Workflow

CALCULATION_VALIDATION

### Process

Identify concept

↓

Select formula

↓

Solve independently

↓

Compare

↓

Report

### Output

Calculation Verification Report

---

# Task Template 007

## Review Explanations

### Personas

- Editor
- Accountant

### Objectives

Every explanation answers:

Why correct?

Why incorrect?

What principle?

Common mistake?

Educational takeaway?

---

# Task Template 008

## JavaScript Refactoring

### Personas

- JavaScript Architect

### Workflow

CODE_REVIEW

### Never

Modify accounting

Modify metadata

Modify question wording

---

# Task Template 009

## Bug Investigation

### Personas

- Validator
- JavaScript Architect

### Output

Bug Report

Including:

- root cause

- evidence

- reproduction

- fix

- regression risk

---

# Task Template 010

## Regression Testing

### Personas

- Validator

### Verify

Navigation

Timer

Calculator

Scoring

Review mode

Question loading

Case loading

Persistence

---

# Task Template 011

## Blueprint Coverage Analysis

### Personas

- Psychometrician
- Accountant

### Output

Coverage Report

Including:

Question counts

Difficulty

Case studies

Missing topics

Recommendations

---

# Task Template 012

## Metadata Validation

### Personas

- Validator

### Verify

Question ID

Topic

Difficulty

Blueprint mapping

Explanation

Case references

Dependencies

---

# Task Template 013

## Release Candidate Review

### Personas

- Release Manager

### Verify

All quality gates passed.

Documentation updated.

Validation completed.

Regression completed.

Blueprint maintained.

### Output

Release Decision

PASS

FAIL

BLOCKED

---

# Standard Report Format

Every template produces:

## Summary

## Findings

## Evidence

## Confidence

## Required Actions

## Recommended Owner

## Completion Status

---

# Confidence Scale

100

Verified

95

Very High

90

High

80

Moderate

<80

Manual Review Required

---

# Escalation Rules

Accounting issue

↓

Accountant

Grammar issue

↓

Editor

Difficulty issue

↓

Psychometrician

Code issue

↓

JavaScript Architect

Validation issue

↓

Validator

Release issue

↓

Release Manager

---

# General Rules

Every task shall:

- Solve before reviewing.
- Validate before approving.
- Explain before modifying.
- Preserve repository consistency.
- Produce structured output.

No task may bypass the Project Constitution.