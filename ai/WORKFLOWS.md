# AI Workflow Definitions

Version: 1.0

Status: Active

Authority:
- PROJECT_CONSTITUTION.md
- COLLABORATION_MATRIX.md

---

# Purpose

This document defines the standard workflows used by AI personas while developing, reviewing, testing, and maintaining the CMA Part 1 Exam Simulator.

These workflows ensure:

- Repeatability
- Consistency
- Traceability
- Quality
- Separation of responsibilities

Every workflow produces a documented output.

---

# Workflow Types

The repository supports eight standard workflows.

1. Question Audit
2. Case Study Review
3. New Question Authoring
4. New Case Authoring
5. JavaScript Development
6. Bug Investigation
7. Release Validation
8. Blueprint Coverage Review

---

# Workflow 1 – Question Audit

## Purpose

Validate an existing question.

## Input

One or more questions.

## Personas

1. Accountant
2. Editor
3. Psychometrician
4. Validator

## Process

Read question

↓

Ignore stored answer

↓

Identify accounting topic

↓

Select decision tree

↓

Select formula

↓

Solve independently

↓

Validate arithmetic

↓

Review wording

↓

Review distractors

↓

Review difficulty

↓

Run validation

↓

Produce audit report

## Output

Question Audit Report

Including:

- Accounting correctness
- Formula verification
- Difficulty
- Distractor quality
- Confidence
- Recommendations

## Quality Gate

PASS

or

FAIL

---

# Workflow 2 – Case Study Review

## Purpose

Validate an integrated case study.

## Personas

1. Case Author
2. Accountant
3. Editor
4. Psychometrician
5. Validator
6. Release Manager

## Process

Read scenario

↓

Read every exhibit

↓

Identify dependencies

↓

Solve every question

↓

Verify calculations

↓

Verify exhibit consistency

↓

Review wording

↓

Review realism

↓

Validate scoring

↓

Regression review

↓

Release decision

## Output

Case Study Review Report

---

# Workflow 3 – New Question Authoring

## Personas

1. Accountant
2. Editor
3. Psychometrician

## Process

Identify blueprint objective

↓

Choose accounting concept

↓

Write scenario

↓

Write question

↓

Write distractors

↓

Write explanation

↓

Review wording

↓

Validate blueprint alignment

↓

Assign metadata

## Output

Production-ready question

---

# Workflow 4 – New Case Authoring

## Personas

1. Case Author
2. Accountant
3. Editor
4. Psychometrician

## Process

Select blueprint objective

↓

Create business scenario

↓

Design exhibits

↓

Create question sequence

↓

Verify dependency chain

↓

Write explanations

↓

Validate realism

↓

Assign metadata

## Output

Production-ready case study

---

# Workflow 5 – JavaScript Development

## Personas

1. JavaScript Architect
2. Validator
3. Release Manager

## Process

Analyze issue

↓

Implement code

↓

Review architecture

↓

Run tests

↓

Run validation

↓

Regression testing

↓

Approve

## Output

Code Change Report

---

# Workflow 6 – Bug Investigation

## Personas

1. Validator
2. JavaScript Architect

## Process

Reproduce issue

↓

Collect evidence

↓

Determine root cause

↓

Recommend fix

↓

Implement fix

↓

Regression test

↓

Close issue

## Output

Bug Investigation Report

---

# Workflow 7 – Release Validation

## Personas

1. Validator
2. Release Manager

## Process

Run validation scripts

↓

Run accounting validation

↓

Run JavaScript tests

↓

Review documentation

↓

Verify changelog

↓

Approve release

## Output

Release Report

---

# Workflow 8 – Blueprint Coverage Review

## Personas

1. Psychometrician
2. Accountant

## Process

Review question metadata

↓

Count questions by domain

↓

Review topic balance

↓

Review calculation balance

↓

Review case coverage

↓

Identify gaps

↓

Recommend additions

## Output

Blueprint Coverage Report

---

# Standard Workflow Outputs

Every workflow produces:

- Summary
- Findings
- Recommendations
- Confidence
- Required Actions

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

Below 80

Manual Review Required

---

# Mandatory Quality Gates

Every workflow must verify:

✓ Accounting

✓ Grammar

✓ Consistency

✓ Metadata

✓ Blueprint alignment

✓ Documentation

If applicable:

✓ JavaScript

✓ Regression

✓ UI

✓ Accessibility

---

# Workflow Completion

A workflow is complete only when:

✓ All required personas have participated.

✓ Required quality gates pass.

✓ Confidence threshold is met.

✓ Output document generated.

✓ Release Manager approval obtained (if required).

---

# Workflow Principles

1. Solve before reviewing.
2. Evidence before opinion.
3. Validation before approval.
4. Specialists make specialist decisions.
5. Never skip a quality gate.
6. Never assume the stored answer is correct.
7. Never sacrifice accounting accuracy for implementation speed.