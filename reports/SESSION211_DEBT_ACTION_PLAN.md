# S211 Technical Debt Action Plan

**Session:** S211  
**Series:** 200-Series Architecture Stewardship  
**Date:** 2026-07-27  
**Type:** READ-ONLY Debt Classification and Action Planning  
**Verdict:** ALL 12 DEBT ITEMS CLASSIFIED — DEBT TRAJECTORY: STABLE/DECREASING

---

## Key Finding

**The technical debt register established in S208 has been comprehensively reclassified based on current state. Total debt is decreasing, not growing.** Two active learner-safety risks remain the highest priority. One item (TD-005, DL-012 clones) is escalated to the S212 Executive Board for architectural decision. Four items are accepted as going concerns (deployment milestones, cleanup tasks). The governance guard is preventing new defect classes from reaching the learner pool.

---

## Classification Results

| Classification | Count | Items |
|----------------|-------|-------|
| **MITIGATE** | 7 | TD-001, TD-002, TD-003, TD-004, TD-006, TD-007, TD-012 |
| **ACCEPT** | 4 | TD-008, TD-009, TD-010, TD-011 |
| **ESCALATE** | 1 | TD-005 |
| **RETIRE** | 0 | *(No items fully resolved)* |

---

## Immediate Action: Learner-Safety Items

### TD-001 — DL-016 Metadata Shift on Certified Pack A Items
**Severity: HIGH. Active learner-pool exposure.**
- Learners see wrong-item distractor explanations on Pack A Sections B, C, F.
- **Action:** Align metadata-block ChoiceA-D with content-block Choices.A-D. ~150 items, ≤30 per batch.
- **Target:** Before any further Pack A certification waves.
- **Classification: MITIGATE — cannot retire while active exposure exists.**

### TD-002 — 39 Domain F DL-026 Items
**Severity: HIGH. Active learner-pool exposure.**
- Learners see no distractor feedback on 39 Domain F items (~117 empty fields).
- Prevention active (Rule 6, S814). 0 new since. Content remediation not yet executed.
- **Action:** Execute scheduled S816-S818. Author ~117 choice-specific ExplanationWrong fields.
- **Classification: MITIGATE — scheduled, prevention active.**

---

## Escalated to S212 Executive Board

### TD-005 — DL-012 Clones: 140 Items, Architectural Decision Required
- **Option A:** Archive 112 clones, keep 28 seed items. Fast. Reduces total item count.
- **Option B:** Re-key with UniqueConceptKey. Preserves all items. Adds identity metadata.
- **Decision:** The debt review board cannot resolve this trade-off. Escalated to S212 Executive Board for architectural guidance.

---

## Accepted Risks (4 items)

| Item | Risk | Rationale |
|------|------|-----------|
| TD-008 — Student Data Bridge | Analytics blocked | Deployment milestone, not session work |
| TD-009 — Production Deployment | Untested at scale | Deployment milestone, not content debt |
| TD-010 — Report Proliferation | Discovery burden | Informational debt, 0 operational impact |
| TD-011 — Backup Files | Root clutter | Cleanup task, 0 operational impact |

Acceptance is provisional: if any accepted risk materializes into an actual incident, it must be reclassified to MITIGATE.

---

## Debt Trajectory

**STABLE → DECREASING.** Evidence:
- 0 new defect classes discovered since S208
- DL-013 scope: 851→163 fields (80% reduction)
- TD-012 resolved at S209 T0
- Governance guard preventing new DL-008/DL-026
- Rule 5 batch cap active

The framework is working. Technical debt is being retired faster than new debt is created.

---

## Recovery Roadmap (Priority-Ordered)

1. **TD-001:** DL-016 on Pack A B/C/F — next remediation session
2. **TD-002:** 39 DL-026 items — S816-S818
3. **TD-012:** Baseline maintenance — ongoing per-session
4. **TD-005:** ESCALATE to S212 Executive Board for decision
5. **TD-003/004/006:** Alongside natural certification waves
6. **TD-007:** S819-S820 as scheduled
7. **TD-008/009/010/011:** ACCEPT — deployment milestones and cleanup

---

*S211 closes. TD-005 decision deferred to S212 Executive Board. All other items classified and routed.*
