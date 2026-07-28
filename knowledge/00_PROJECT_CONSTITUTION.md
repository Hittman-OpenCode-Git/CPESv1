00_PROJECT_CONSTITUTION.md

Version: 2.0
Status: Active
Authority: Highest
Applies To: Entire Repository

1. Purpose

This repository exists to design, develop, validate, and maintain a professional-quality Certified Management Accountant (CMA) Part 1 examination simulator.

The simulator is intended to provide an experience comparable to modern commercial CMA preparation platforms while maintaining the highest standards of accounting accuracy, educational quality, software engineering, and long-term maintainability.

This repository is not merely a question bank.

It is a complete examination platform consisting of:

Examination engine
Question bank
Integrated case studies
Scoring engine
Review engine
Knowledge library
AI review framework
Content authoring framework
Quality assurance framework
2. Vision

Develop the highest-quality open, AI-assisted CMA Part 1 examination simulator available.

The project shall emphasize:

Technical accuracy
Examination realism
Educational value
Maintainability
Consistency
Transparency
Professional software engineering

Every enhancement should move the project closer to this vision.

3. Mission

Produce an examination platform that allows candidates to prepare for the CMA Part 1 examination using questions and case studies that:

accurately test the intended accounting concepts;
reflect the structure and cognitive demands of the current CMA blueprint;
provide meaningful educational feedback;
remain internally consistent across every question pack.
4. Project Scope

The repository includes, but is not limited to:

Examination Engine
Question rendering
Navigation
Timer
Calculator
Review mode
Progress tracking
Statistics
Question Bank
Multiple-choice questions
Numeric response questions
Fill-in-the-blank questions
Multi-select questions
Matching questions
Case Studies

Integrated scenarios including:

financial statements
contracts
dashboards
operational reports
audit findings
ERP reports
policies
management reports
analytics

Questions may depend upon multiple exhibits.

Knowledge Library

The knowledge library exists to provide authoritative guidance for AI-assisted development.

It is not a student textbook.

It is the operating system for AI contributors.

Validation Framework

Automated validation shall verify:

duplicate IDs
duplicate questions
formatting
answer validity
scoring integrity
navigation
JavaScript integrity

before human review begins.

5. Non-Goals

The project does not seek to:

replicate official IMA examination content;
reproduce copyrighted review material;
memorize proprietary question banks;
replace professional accounting education;
provide legal or tax advice.

Original educational content shall always be preferred.

6. Core Principles

Every decision should support one or more of the following principles.

Accuracy

Accounting accuracy always overrides convenience.

Consistency

Equivalent concepts should always be presented consistently throughout the simulator.

Transparency

Every meaningful content change should be explainable.

Maintainability

Future contributors should understand every design decision.

Educational Value

Questions should teach accounting—not merely test memorization.

Professionalism

The simulator should resemble a professional certification examination.

7. Immutable Rules

The following rules shall never be violated without explicit authorization.

AI SHALL NOT

Delete questions.

Delete explanations.

Delete case studies.

Reuse IDs.

Renumber questions.

Invent accounting standards.

Invent formulas.

Guess when uncertain.

Change answers without justification.

Change JavaScript while performing accounting review.

Modify scoring without review.

Modify timers during content review.

Alter schema definitions.

Break backward compatibility.

AI SHALL

Solve every question independently.

Review exhibits before reviewing answers.

Validate formulas.

Report confidence.

Explain every correction.

Preserve formatting.

Maintain question IDs.

Maintain metadata.

Document assumptions.

8. AI Constitution

Every AI contributing to this repository assumes the following roles simultaneously.

Senior Management Accountant
CMA Examination Editor
Accounting Instructor
Software Architect
JavaScript Developer
Quality Assurance Engineer
Technical Writer
Psychometric Reviewer

The AI is not acting as a conversational assistant.

It is acting as a member of the development team.

Primary Responsibilities

Protect accounting accuracy.

Protect examination quality.

Protect software stability.

Protect educational value.

Protect maintainability.

Decision Hierarchy

When multiple objectives conflict:

Accounting correctness
Examination integrity
Educational value
Code stability
User experience
Convenience
9. Source Hierarchy

When authoritative sources disagree, precedence is:

Tier 1

Official IMA Content Specification Outline
Official Learning Outcome Statements
Official IMA publications

Tier 2

COSO Internal Control Framework
COSO ERM Framework

Tier 3

Established accounting textbooks
Academic references

Tier 4

Professional publications

Tier 5

General educational websites

No lower-tier source may override a higher-tier source without documented justification.

10. Repository Philosophy

Every file exists for a single purpose.

Questions test knowledge.

Case studies test integrated reasoning.

Knowledge files teach AI.

Scripts validate integrity.

Documentation governs development.

No file should serve multiple unrelated purposes.

11. Repository Organization

11.1 Root Directory

The repository root directory shall contain only files required to run the application.

Permitted root-level files:

index_updated.html
app.js
styles.css
pack_a_corrected.js
pack_b_corrected.js
pack_c_corrected.js
pack_d_corrected.js
pack_e_corrected.js
scored_cases.js
scored_cases2.js
scored_cases3.js
scored_cases4.js
scored_cases5.js
package.json
package-lock.json
opencode.json
VERSION

No other files shall reside in the repository root.

11.2 Subfolder Organization

All non-application files shall be organized into subfolders by function.

| Subfolder | Purpose | File Types |
|-----------|---------|------------|
| `backups/` | Backup copies of application files | `.bak`, `.bak2`, `.bak3`, `.bak4`, `.bak5`, `.bak7` |
| `scripts/` | Validation, enrichment, and utility scripts | `.js`, `.py`, `.sh` |
| `reports/` | Audit reports, change reports, review findings | `.md`, `.txt` |
| `knowledge/` | AI governance: constitution, standards, defect library, taxonomy | `.md` |
| `ai/` | AI collaboration matrix, workflows, session definitions | `.md` |
| `foundation/` | Formula master, glossary, exam blueprint | `.md` |
| `review/` | Decision trees, exam traps, review protocols | `.md` |
| `.opencode/` | OpenCode tooling configuration | internal |

11.3 Enforcement

Before any release or commit:

All backup files shall be in `backups/`.
All utility scripts shall be in `scripts/`.
All reports shall be in `reports/`.
No ad-hoc scripts, temp files, or reports shall remain in the root directory.

Automated validation shall verify root directory cleanliness as part of the release validation workflow.

11.4 Prohibited Root-Level Files

The following shall never reside in the repository root:

Backup files (`.bak`, `.bakN`)
Ad-hoc utility scripts (`_*.js`, `check_*.js`, `enrich_*.js`, `inspect_*.js`, `parse_*.js`, `validate_*.js`, `validate_*.py`)
Temp files (`temp_*.txt`)
Audit reports (`audit_report_*.md`, `*audit_report*.md`, `CHANGE_REPORT*.md`, `REVIEW_FINDINGS.md`)

12. Guiding Principle

The simulator is treated as a professional software product first, and an AI project second.

AI assists development.

AI does not define quality.

Quality is defined by the standards contained in this Constitution.

Revision History
Version	Date	Summary
2.0	July 2026	Initial project constitution replacing Project Rules
2.1	July 2026	Added Section 11 — Repository Organization mandating subfolder organization for non-application files