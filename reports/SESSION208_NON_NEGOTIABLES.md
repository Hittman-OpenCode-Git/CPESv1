# Framework v2 Non-Negotiable Architectural Principles

**Session:** S208 (Architecture Stewardship)
**Board:** A — Principle Certification
**Status:** FROZEN
**Date:** 2026-07-27

---

## What This Document Is

This document enumerates the architectural principles that **may not be violated** in the CMA Part 1 Exam Simulator. These principles were extracted from Framework v2's design (S200-S207), validated against operational evidence (2,298 certified items, 32/32 governance guard tests), and are now frozen as the architectural constitution of the project.

**Any violation of these principles is grounds for automatic certification block.**

---

## The Six Non-Negotiable Principles

### P1: Identity Before Trust

**No item, entity, or record shall be trusted as uniquely identified by QID alone.**

All identity resolution must use the compound-key model: `QID + CorrectChoice + ExplanationWrong_Pattern + Template_Family + File_Path`. Identity is verified before any certification, remediation, or delivery decision.

**Why this exists:** QID-only trust caused:
- 257 false-positive DL-008 flags on Pack B (DL-029)
- Wrong remediation targets (S320)
- 40-item routing divergence (DL-036)

**Violation indicator:** Any tool that uses QID alone as a unique identifier.

---

### P2: Scan Once, Consume Many

**Every scan of raw content files shall produce a re-consumable artifact.**

Downstream consumers (readiness scorer, certification engine, delivery mechanism) shall consume artifacts, never re-scan raw files independently. One scan → one artifact → many consumers.

**Why this exists:** Independent re-scanning caused:
- 22 redundant DL-008 scans across 15 sessions
- 18 redundant DL-026 scans with divergent counts (632/1,005/1,056)
- 40-item pipeline routing divergence (DL-036)

**Violation indicator:** Two tools reporting different results for the same metric from the same source file.

---

### P3: Delta Review

**Only items that have changed since the last certification wave shall be reviewed.**

SHA-256 content hashing identifies unchanged items (typically 80%). Full re-review of entire packs is waste.

**Why this exists:** Full re-review caused:
- S809: 38 seeds, 4 sessions, 60 agent-spawns — 0 writes
- 4-7 agents re-auditing same ExplanationWrong fields per session
- 6.2:1 peak duplication ratio

**Violation indicator:** (items_reviewed / items_changed) > 1.5 in any certification wave.

---

### P4: Readiness Before Certification

**No item shall enter the Certified state without passing all pre-flight structural gates.**

Structural cleanliness is a prerequisite for content quality review. The pre-flight pipeline (Gates 0-4) must complete with zero blocking errors before any Quality Board review begins.

**Why this exists:** Pre-Framework v2 certification without readiness gates caused:
- 539 DL-008 occurrences in Certified pool
- 1,005 DL-026 items
- 100 Pack E Section C items with zero distractor explanations (DL-021)
- 5 answer-key errors (DL-030)

**Violation indicator:** Any item with `question_state="Certified"` and no corresponding readiness gate PASS record.

---

### P5: Governance Automation

**Content governance rules shall be enforced at the tool-execution level by automated guards, not by human discipline.**

Every defect class with a known detection pattern shall have a corresponding BLOCK-level governance guard rule. The governance guard test suite must maintain 100% pass rate.

**Why this exists:** Manual governance failed:
- Items certified with DL-008 because no rule blocked them
- 39 Domain F items certified because DL-026 wasn't blocked (Rule 6 deployed retroactively S814)
- Batch operations exceeding safe limits (Rule 5 activated)

**Violation indicator:** New defect class discovered without corresponding governance guard rule within one session.

---

### P6: Traceability Everywhere

**Every entity in the system shall be traceable through registries.**

No entity shall exist without a registry entry. Every state transition, certification decision, and remediation action shall be recorded in REVISION_HISTORY.md with before/after evidence.

**Why this exists:** Traceability gaps caused:
- P1-EC-004 state inconsistency between registry and raw file (S254)
- Investigation chains without full paper trail (pre-S252)
- Concurrent-write data loss without detection (DL-019)

**Violation indicator:** Registry-vs-raw-file question_state mismatch. Entity referenced in one registry but absent from another.

---

## Automatic Stop Conditions

These conditions are derived from the six principles. Any condition that triggers HALT blocks all write operations.

| # | Condition | Principle | Verdict |
|---|-----------|-----------|---------|
| 1 | Governance Guard != PASS | P5 | HALT |
| 2 | Identity < 99% | P1 | HALT |
| 3 | Certified DL-008 Exists | P4 | HALT |
| 4 | Certified DL-026 Exists (new, untracked) | P4 | HALT |
| 5 | Traceability Failure | P6 | HALT |
| 6 | Registry Authority Conflict | P6 + P2 | HALT |

---

## Amendment Process

These principles are FROZEN. Any modification requires:

1. Formal Architecture Amendment Session with Governance Board authorization
2. Documented rationale with operational evidence
3. Impact analysis on all existing content and processes
4. Updated principle document with version bump
5. Governance guard rule alignment (new rules for new principles)

**Frozen means frozen.** These are not guidelines. They are the architectural constitution.

---

*Certified by S208 Board A, 2026-07-27*
