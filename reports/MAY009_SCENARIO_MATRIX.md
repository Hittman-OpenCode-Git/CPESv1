# MAY-009 — Scenario Matrix (30 Synthetic Learners)

**Session:** MAY-009
**Created:** 2026-07-30
**Predecessor:** MAY-008 (5 archetypes)

---

## Design Philosophy

Each learner is designed to trigger a **specific primary decision ID** while remaining realistic. The priority chain (D1→D2→D3→D4→D5→D6→D7→D8→D9→D10) means earlier decisions preempt later ones. Learners targeting later decisions must fail all earlier rule conditions.

---

## Group 1 — Recovery Zone (D1, D2)

### L01 — SevereRecovery (D1-targeted)
- **DisplayName:** Riley
- **ExamPlan:** Part 1, 2026-11-15 (79 days)
- **Profile:** Very low accuracy (25-40%) across 5 sections, all declining, all ≥5 attempts
- **Expected:** D1 (readiness score << 50, band "Recovery needed")
- **Mode:** QUIZ

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 12 | 28% | declining |
| Inventory Valuation | A | 12 | 32% | declining |
| Budgeting Concepts | B | 12 | 35% | declining |
| Standard Costing | C | 12 | 40% | declining |
| Cost Behavior | D | 12 | 38% | declining |

### L02 — BroadRecovery (D1-targeted)
- **DisplayName:** Sam
- **ExamPlan:** Part 1, 2026-12-01 (95 days)
- **Profile:** Even worse — 20-35% across 6 sections, high attempts but persistent failure
- **Expected:** D1
- **Mode:** QUIZ

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 15 | 25% | declining |
| Statement of Cash Flows | A | 15 | 30% | declining |
| Cash Budget | B | 15 | 22% | declining |
| Standard Costing | C | 15 | 35% | declining |
| COSO Framework | E | 15 | 28% | declining |
| Data Analytics | F | 15 | 33% | declining |

### L03 — T1CriticalWeakness (D2-targeted)
- **DisplayName:** Quinn
- **ExamPlan:** None (planning)
- **Profile:** Overall moderate (55-75%), but ONE topic critically weak (38%, Tier 1). Must avoid D1 (readiness score ≥ 50).
- **Expected:** D2 (Tier 1 intervention on weakest topic)
- **Mode:** QUIZ

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 12 | 72% | stable |
| Inventory Valuation | A | 12 | 70% | stable |
| Budgeting Concepts | B | 12 | 38% | declining |
| Cash Budget | B | 12 | 68% | stable |
| Standard Costing | C | 12 | 75% | stable |
| CVP Analysis | D | 12 | 74% | stable |
| COSO Framework | E | 12 | 71% | stable |
| Data Analytics | F | 12 | 66% | stable |

### L04 — T1DoubleCritical (D2-targeted, 2 weak topics)
- **DisplayName:** Avery
- **ExamPlan:** Part 1, 2026-10-05 (67 days)
- **Profile:** Two topics in Tier 1. Overall readiness borderline but not Recovery.
- **Expected:** D2 (highest-priority Tier 1 intervention)
- **Mode:** QUIZ

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 12 | 42% | declining |
| Inventory Valuation | A | 12 | 38% | declining |
| Financial Ratio Analysis | A | 12 | 72% | stable |
| Budgeting Concepts | B | 12 | 68% | stable |
| Standard Costing | C | 12 | 66% | stable |
| Cost Behavior | D | 12 | 64% | stable |
| COSO Framework | E | 12 | 70% | stable |
| Data Analytics | F | 12 | 62% | stable |

### L05 — RecoveryNotDeclining (D1-vs-D2 edge case)
- **DisplayName:** Drew
- **ExamPlan:** Part 1, 2026-09-25 (57 days)
- **Profile:** Low accuracy (30-45%) BUT stable (not declining). Ready for band check edge.
- **Expected:** D1 (readiness < 50 regardless of trend direction — score check fires first)
- **Mode:** QUIZ

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 12 | 38% | stable |
| Inventory Valuation | A | 12 | 42% | stable |
| Cash Budget | B | 12 | 40% | stable |
| Standard Costing | C | 12 | 35% | stable |
| Cost Behavior | D | 12 | 45% | stable |

---

## Group 2 — Developing with Specific Issues (D3, D5, D6, D7)

### L06 — RepeatedUnstable (D3-targeted)
- **DisplayName:** Harper
- **ExamPlan:** Part 1, 2026-10-15 (77 days)
- **Profile:** Overall decent (60-80%), but ONE topic with accuracy<50, stability<30, declining, ≥8 attempts. Must avoid D1 (readiness ≥ 50) and D2 (the weak topic may or may not hit Tier 1 — depends on exact thresholds).
- **Expected:** D3 (weak + unstable + declining + ≥5 attempts)
- **Mode:** SOCRATIC

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 14 | 72% | stable |
| Inventory Valuation | A | 14 | 68% | stable |
| Cash Budget | B | 14 | 45% | declining |
| Flexible Budget Analysis | B | 14 | 75% | stable |
| Standard Costing | C | 14 | 80% | stable |
| CVP Analysis | D | 14 | 76% | stable |
| COSO Framework | E | 14 | 78% | stable |
| ERP Systems | F | 14 | 69% | stable |

### L07 — DecliningTrends (D5-targeted)
- **DisplayName:** Finley
- **ExamPlan:** Part 1, 2027-02-01 (186 days — far)
- **Profile:** Good overall (60-85%), no critical weakness, no unstable decline — but specific topics declining. Must avoid D1-D4.
- **Expected:** D5 (first declining topic triggers)
- **Mode:** QUIZ

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 14 | 78% | stable |
| Inventory Valuation | A | 14 | 76% | stable |
| Budgeting Concepts | B | 14 | 72% | declining |
| Cash Budget | B | 14 | 68% | declining |
| Standard Costing | C | 14 | 82% | stable |
| Cost Behavior | D | 14 | 74% | stable |
| COSO Framework | E | 14 | 80% | stable |
| Data Governance | F | 14 | 66% | declining |

### L08 — EmergingWeakness (D6-targeted)
- **DisplayName:** Rowan
- **ExamPlan:** None (planning)
- **Profile:** Overall decent (55-75%), no D1-D5 triggers. Has a Tier 2 topic (accuracy 55% with 6 attempts).
- **Expected:** D6 (Tier 2 intervention)
- **Mode:** QUIZ

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 14 | 71% | stable |
| Inventory Valuation | A | 14 | 68% | stable |
| Budgeting Concepts | B | 14 | 55% | stable |
| Cash Budget | B | 14 | 72% | stable |
| Standard Costing | C | 14 | 76% | stable |
| Cost Behavior | D | 14 | 73% | stable |
| COSO Framework | E | 14 | 74% | stable |
| Data Analytics | F | 14 | 70% | improving |

### L09 — FragileKnowledge (D7-targeted)
- **DisplayName:** Cameron
- **ExamPlan:** None (planning)
- **Profile:** Good overall (65-80%), no D1-D6 triggers. Has a Tier 3 topic (accuracy 68%, stability 35, 6 attempts).
- **Expected:** D7 (Tier 3 — fragile knowledge consolidation)
- **Mode:** EXPLAIN

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 14 | 78% | stable |
| Inventory Valuation | A | 14 | 75% | stable |
| Budgeting Concepts | B | 14 | 68% | slightly_declining |
| Cash Budget | B | 14 | 74% | stable |
| Standard Costing | C | 14 | 80% | stable |
| Cost Behavior | D | 14 | 76% | stable |
| COSO Framework | E | 14 | 72% | stable |
| ERP Systems | F | 14 | 70% | stable |

### L10 — FragileKnowledge2 (D7-targeted, stability < 50 trigger)
- **DisplayName:** Jesse
- **ExamPlan:** None (planning)
- **Profile:** Solid (70-85%) everywhere except one Tier 3 topic with accuracy 62%, stability 38, 5 attempts.
- **Expected:** D7
- **Mode:** EXPLAIN

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 14 | 82% | stable |
| Financial Ratio Analysis | A | 14 | 78% | stable |
| Budgeting Concepts | B | 14 | 62% | slightly_declining |
| Flexible Budget Analysis | B | 14 | 80% | stable |
| Standard Costing | C | 14 | 76% | stable |
| Activity Based Costing | D | 14 | 74% | stable |
| COSO Framework | E | 14 | 80% | stable |
| Data Analytics | F | 14 | 72% | stable |

### L11 — PurelyTier3 (D7-targeted, cleaner trigger)
- **DisplayName:** Skyler
- **ExamPlan:** None (planning)
- **Profile:** All strong (70-85%) except one Tier 3 topic. Stability set low enough for Tier 3 but accuracy high enough to avoid T1/T2.
- **Expected:** D7
- **Mode:** EXPLAIN

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 14 | 75% | stable |
| Cash Budget | B | 14 | 72% | stable |
| Standard Costing | C | 14 | 70% | slightly_declining |
| CVP Analysis | D | 14 | 82% | stable |
| COSO Framework | E | 14 | 80% | stable |
| Data Analytics | F | 14 | 74% | stable |
| Job Order Costing | D | 14 | 78% | stable |
| Cybersecurity | F | 14 | 68% | stable |

### L12 — DecliningPlusEmerging (D5-should-fire, D6-fallback)
- **DisplayName:** River
- **ExamPlan:** None (planning)
- **Profile:** Declining topics exist AND Tier 2 topic exists. D5 fires first (declining trends check before Tier 2 check).
- **Expected:** D5
- **Mode:** QUIZ

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 14 | 74% | stable |
| Inventory Valuation | A | 14 | 68% | declining |
| Budgeting Concepts | B | 14 | 56% | stable |
| Cash Budget | B | 14 | 76% | stable |
| Standard Costing | C | 14 | 80% | stable |
| CVP Analysis | D | 14 | 78% | stable |
| COSO Framework | E | 14 | 72% | stable |
| Data Analytics | F | 14 | 70% | stable |

---

## Group 3 — Exam Pressured (D4)

### L13 — ExamImminent (D4-targeted)
- **DisplayName:** Parker
- **ExamPlan:** Part 1, **2026-08-14** (15 days!)
- **Profile:** Moderate accuracy (50-65%), all sections Developing, exam very soon.
- **Expected:** D4 (exam ≤ 30 days + Developing band)
- **Mode:** STUDY_PLAN

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 14 | 62% | declining |
| Inventory Valuation | A | 14 | 58% | declining |
| Budgeting Concepts | B | 14 | 65% | stable |
| Cash Budget | B | 14 | 55% | declining |
| Standard Costing | C | 14 | 60% | stable |
| CVP Analysis | D | 14 | 64% | stable |
| COSO Framework | E | 14 | 68% | stable |
| Data Analytics | F | 14 | 50% | declining |

### L14 — ExamRecovery (D4, D1-vs-D4 edge case)
- **DisplayName:** Blake
- **ExamPlan:** Part 1, **2026-08-05** (6 days!)
- **Profile:** Very low (30-45%). D1 fires first because readiness < 50. D4 is the backup.
- **Expected:** D1 (readiness < 50 fires before D4 exam check)
- **Mode:** QUIZ

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 12 | 35% | declining |
| Inventory Valuation | A | 12 | 42% | declining |
| Budgeting Concepts | B | 12 | 38% | declining |
| Standard Costing | C | 12 | 40% | declining |
| CVP Analysis | D | 12 | 45% | declining |

### L15 — ExamWithRecoveryBand (D4-targeted, Recovery band)
- **DisplayName:** Reese
- **ExamPlan:** Part 1, **2026-08-22** (23 days!)
- **Profile:** Moderate (55-65%) in some sections, but one section at "Recovery needed" on just 1-2 topics. Must check: does Recovery band OR Developing trigger D4?
- **Expected:** D4 (Recovery needed band + exam ≤ 30 days)
- **Mode:** STUDY_PLAN

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 12 | 62% | stable |
| Inventory Valuation | A | 12 | 58% | stable |
| Budgeting Concepts | B | 12 | 40% | declining |
| Cash Budget | B | 12 | 42% | declining |
| Standard Costing | C | 12 | 64% | stable |
| CVP Analysis | D | 12 | 60% | stable |
| COSO Framework | E | 12 | 66% | stable |
| Data Analytics | F | 12 | 55% | stable |

### L16 — ExamReadyButClose (D4 boundary — should NOT fire if band OK)
- **DisplayName:** Sydney
- **ExamPlan:** Part 1, **2026-08-18** (19 days!)
- **Profile:** Strong (80-90%) — approaching review-ready. D4 should NOT fire (band >= "Approaching review-ready").
- **Expected:** D9 (high mastery since no D4 trigger)
- **Mode:** QUIZ

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 16 | 88% | stable |
| Inventory Valuation | A | 16 | 85% | stable |
| Cash Budget | B | 16 | 86% | stable |
| Standard Costing | C | 16 | 90% | stable |
| CVP Analysis | D | 16 | 92% | improving |
| COSO Framework | E | 16 | 87% | stable |
| Data Analytics | F | 16 | 84% | stable |
| ERP Systems | F | 16 | 88% | stable |

---

## Group 4 — High Performers (D9)

### L17 — StrongAllAround (D9-targeted)
- **DisplayName:** Devin
- **ExamPlan:** Part 1, 2026-12-15 (109 days)
- **Profile:** 85-95% across all topics, stable/improving, high stability. No declines, no weaknesses.
- **Expected:** D9 (all topics ≥ 85%, ≥ 6 attempts, not declining)
- **Mode:** QUIZ (challenge)

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 16 | 90% | stable |
| Inventory Valuation | A | 16 | 88% | stable |
| Cash Budget | B | 16 | 92% | improving |
| Standard Costing | C | 16 | 87% | stable |
| CVP Analysis | D | 16 | 94% | improving |
| COSO Framework | E | 16 | 91% | stable |
| Data Analytics | F | 16 | 89% | stable |
| ERP Systems | F | 16 | 86% | stable |

### L18 — StrongButDeclining (D9 blocked by decline)
- **DisplayName:** Kennedy
- **ExamPlan:** Part 1, 2027-01-20 (145 days)
- **Profile:** Strong overall (80-90%), but one topic declining. D9 requires direction !== 'declining' AND !== 'slightly_declining'.
- **Expected:** D5 (declining topic fires first, preempting D9)
- **Mode:** QUIZ

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 16 | 88% | stable |
| Inventory Valuation | A | 16 | 85% | stable |
| Cash Budget | B | 16 | 86% | stable |
| Standard Costing | C | 16 | 90% | declining |
| CVP Analysis | D | 16 | 92% | stable |
| COSO Framework | E | 16 | 88% | stable |
| Data Analytics | F | 16 | 84% | stable |

### L19 — NearPerfect (D9-targeted, maximum readiness)
- **DisplayName:** Phoenix
- **ExamPlan:** Part 1, 2027-03-01 (196 days)
- **Profile:** 90-98% across all 6 sections, all improving, all high stability.
- **Expected:** D9
- **Mode:** QUIZ

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 18 | 96% | improving |
| Inventory Valuation | A | 18 | 94% | improving |
| Cash Budget | B | 18 | 92% | stable |
| Flexible Budget | B | 18 | 95% | improving |
| Standard Costing | C | 18 | 93% | improving |
| CVP Analysis | D | 18 | 98% | improving |
| Job Order Costing | D | 18 | 91% | stable |
| COSO Framework | E | 18 | 94% | stable |
| Data Analytics | F | 18 | 90% | stable |

### L20 — MasteryPlusWeakness (D9-or-D2 edge case)
- **DisplayName:** Logan
- **ExamPlan:** Part 1, 2026-11-10 (103 days)
- **Profile:** Most topics strong (85%+), but one topic at Tier 1 (42%). D2 for the weak topic fires before D9.
- **Expected:** D2 (Tier 1 critical weakness preempts mastery challenge)
- **Mode:** QUIZ

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 16 | 90% | stable |
| Inventory Valuation | A | 16 | 85% | stable |
| Cash Budget | B | 16 | 42% | declining |
| Standard Costing | C | 16 | 88% | stable |
| CVP Analysis | D | 16 | 92% | stable |
| COSO Framework | E | 16 | 86% | stable |
| Data Analytics | F | 16 | 84% | stable |

---

## Group 5 — Sparse/New Data (D8, D10)

### L21 — SectionGap (D8-targeted)
- **DisplayName:** Arden
- **ExamPlan:** None (planning)
- **Profile:** Good accuracy (65-80%) but only 3 sections have data. D8 fires if < 4 sections have data.
- **Expected:** D8 (< 4 sections with data)
- **Mode:** EXPLAIN

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 14 | 72% | stable |
| Inventory Valuation | A | 14 | 68% | stable |
| Budgeting Concepts | B | 14 | 75% | stable |
| Cash Budget | B | 14 | 70% | stable |
| Standard Costing | C | 14 | 78% | improving |
| CVP Analysis | D | 0 | — | — |

Note: zero attempts on sections D, E, F.

### L22 — TwoSectionGap (D8-targeted, extreme)
- **DisplayName:** Sage
- **ExamPlan:** None (planning)
- **Profile:** Only 2 sections (A+B) have data. Sections C-F empty.
- **Expected:** D8
- **Mode:** EXPLAIN

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 14 | 65% | stable |
| Inventory Valuation | A | 14 | 62% | stable |
| Budgeting Concepts | B | 14 | 70% | stable |

### L23 — InsufficientData (D10-targeted — brand new learner)
- **DisplayName:** Ellis
- **ExamPlan:** Part 1, 2027-05-01 (275 days)
- **Profile:** Brand new. 1 session, 1 topic with 3 attempts. Almost no data.
- **Expected:** D10 (fallback — no rule matches with minimal data)
- **Mode:** EXPLAIN

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 3 | 66% | stable |

### L24 — BarelyStarted (D10-targeted — single section, low attempts)
- **DisplayName:** Marley
- **ExamPlan:** None (planning)
- **Profile:** 2 sessions, 6 attempts across 2 topics. Not enough for any rule.
- **Expected:** D10 (D8 may or may not fire with < 4 sections — depends on D1-D7 failures)
- **Mode:** EXPLAIN

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 4 | 75% | stable |
| Cash Budget | B | 2 | 50% | stable |

### L25 — ReturningLearner (D8 or D10 — 1 section with data after break)
- **DisplayName:** Jules
- **ExamPlan:** Part 1, 2026-09-30 (62 days)
- **Profile:** 1 section heavily practiced, others untouched. Section A at high mastery, no other sections.
- **Expected:** D8 (1 section with data) — unless D9 fires first (single section with mastery topic might trigger D9 before D8)
- **Mode:** EXPLAIN or QUIZ

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 16 | 90% | stable |
| Inventory Valuation | A | 16 | 86% | stable |
| Statement of Cash Flows | A | 16 | 88% | stable |
| Financial Ratio Analysis | A | 16 | 92% | stable |

---

## Group 6 — Edge Cases & Calibration Boundaries

### L26 — TopicSpecialist (D9-targeted, single domain depth)
- **DisplayName:** Indigo
- **ExamPlan:** Part 1, 2027-02-15 (200 days)
- **Profile:** Extremely strong in Section A (95%+), adequate elsewhere (60-70%). Has ≥6 attempts on strength topics.
- **Expected:** D9 (highest mastery topic triggers challenge)
- **Mode:** QUIZ

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 18 | 96% | stable |
| Inventory Valuation | A | 18 | 94% | stable |
| Statement of Cash Flows | A | 18 | 92% | stable |
| Financial Ratio Analysis | A | 18 | 95% | improving |
| Budgeting Concepts | B | 10 | 68% | stable |
| Standard Costing | C | 10 | 65% | stable |
| CVP Analysis | D | 10 | 70% | stable |

### L27 — AcrossTheBoardWeak (D1-or-D2, borderline readiness)
- **DisplayName:** Remy
- **ExamPlan:** None (planning)
- **Profile:** Uniformly 45-55% across 6 sections. Might hit D1 (readiness < 50) or might just pass threshold.
- **Expected:** D1 or D2 (readiness boundary check)
- **Mode:** QUIZ

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 14 | 48% | declining |
| Inventory Valuation | A | 14 | 52% | declining |
| Budgeting Concepts | B | 14 | 49% | declining |
| Standard Costing | C | 14 | 51% | declining |
| Cost Behavior | D | 14 | 47% | declining |
| COSO Framework | E | 14 | 54% | declining |
| Data Analytics | F | 14 | 50% | declining |

### L28 — StabilityExplorer (D3-boundary, stability exactly 49)
- **DisplayName:** Wren
- **ExamPlan:** None (planning)
- **Profile:** One topic at stability 49 (D3 requires < 50), accuracy 52%, declining, 8 attempts. Right at boundary.
- **Expected:** D3 (stability 49 < 50 — fires) or D5 (if D3 fails on some other condition)
- **Mode:** SOCRATIC or QUIZ

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 14 | 72% | stable |
| Inventory Valuation | A | 14 | 68% | stable |
| Budgeting Concepts | B | 14 | 52% | declining |
| Cash Budget | B | 14 | 75% | stable |
| Standard Costing | C | 14 | 78% | stable |
| CVP Analysis | D | 14 | 74% | stable |
| COSO Framework | E | 14 | 80% | stable |
| Data Analytics | F | 14 | 70% | stable |

### L29 — ExamEdgeCase (D4-boundary, exactly 31 days)
- **DisplayName:** Halston
- **ExamPlan:** Part 1, **2026-08-31** (32 days!)
- **Profile:** Developing band, exam at 32 days. D4 only fires at ≤ 30 days — this is just outside.
- **Expected:** Whatever fires before D4 (likely D5 or D6). D4 should NOT fire.
- **Mode:** Depends

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 14 | 72% | stable |
| Inventory Valuation | A | 14 | 68% | stable |
| Budgeting Concepts | B | 14 | 62% | declining |
| Cash Budget | B | 14 | 70% | stable |
| Standard Costing | C | 14 | 75% | stable |
| CVP Analysis | D | 14 | 74% | stable |
| COSO Framework | E | 14 | 76% | stable |
| Data Analytics | F | 14 | 60% | stable |

### L30 — LargeVolumeMixed (comprehensive calibration)
- **DisplayName:** Emerson
- **ExamPlan:** Part 1, 2026-10-20 (82 days)
- **Profile:** Large data (12 topics, 6 sections, 30 attempts/topic), wide range (30-95%), multiple trends. Complex calibration check.
- **Expected:** Most reliable diagnosis — many data points.
- **Mode:** Depends (likely D2 or D5)

| Topic | Section | Attempts | Accuracy | Trend |
|-------|---------|----------|----------|-------|
| Revenue Recognition | A | 30 | 88% | stable |
| Inventory Valuation | A | 30 | 85% | stable |
| Statement of Cash Flows | A | 30 | 42% | declining |
| Budgeting Concepts | B | 30 | 78% | stable |
| Cash Budget | B | 30 | 55% | declining |
| Flexible Budget | B | 30 | 82% | stable |
| Standard Costing | C | 30 | 76% | stable |
| Cost Variance Analysis | C | 30 | 90% | improving |
| CVP Analysis | D | 30 | 92% | stable |
| Job Order Costing | D | 30 | 68% | slightly_declining |
| COSO Framework | E | 30 | 85% | stable |
| Data Analytics | F | 30 | 58% | declining |

---

## Summary Matrix

| ID | Name | D-Target | Mode | Band | Exam | Key Feature |
|----|------|----------|------|------|------|-------------|
| L01 | Riley | D1 | QUIZ | Recovery needed | Nov 15 | Severe low accuracy |
| L02 | Sam | D1 | QUIZ | Recovery needed | Dec 1 | Broad persistent failure |
| L03 | Quinn | D2 | QUIZ | Developing | None | Single T1 topic, otherwise ok |
| L04 | Avery | D2 | QUIZ | Developing | Oct 5 | Double T1 topics |
| L05 | Drew | D1 | QUIZ | Recovery needed | Sep 25 | Low but stable |
| L06 | Harper | D3 | SOCRATIC | Developing | Oct 15 | One unstable declining topic |
| L07 | Finley | D5 | QUIZ | Developing | Feb 2027 | Multiple declining, no crisis |
| L08 | Rowan | D6 | QUIZ | Developing | None | Tier 2 emerging weakness |
| L09 | Cameron | D7 | EXPLAIN | Approaching review-ready | None | Tier 3 fragile knowledge |
| L10 | Jesse | D7 | EXPLAIN | Approaching review-ready | None | Tier 3, stability < 50 |
| L11 | Skyler | D7 | EXPLAIN | Approaching review-ready | None | Cleaner Tier 3 trigger |
| L12 | River | D5 | QUIZ | Developing | None | Declining preempts Tier 2 |
| L13 | Parker | D4 | STUDY_PLAN | Developing | Aug 14 (15d) | Exam imminent |
| L14 | Blake | D1 | QUIZ | Recovery needed | Aug 5 (6d) | D1 preempts D4 |
| L15 | Reese | D4 | STUDY_PLAN | Developing | Aug 22 (23d) | Exam close + Recovery |
| L16 | Sydney | D9 | QUIZ | Approaching review-ready | Aug 18 (19d) | Ready despite exam |
| L17 | Devin | D9 | QUIZ | Ready for focused review | Dec 15 | Strong all-around |
| L18 | Kennedy | D5 | QUIZ | Approaching review-ready | Jan 2027 | Strong but declining |
| L19 | Phoenix | D9 | QUIZ | Ready for focused review | Mar 2027 | Near-perfect |
| L20 | Logan | D2 | QUIZ | Approaching review-ready | Nov 10 | Mastery + weak spot |
| L21 | Arden | D8 | EXPLAIN | Developing | None | Only 3 sections |
| L22 | Sage | D8 | EXPLAIN | Not enough data | None | Only 2 sections |
| L23 | Ellis | D10 | EXPLAIN | Not enough data | May 2027 | Brand new, 3 attempts |
| L24 | Marley | D10 | EXPLAIN | Not enough data | None | Barely started |
| L25 | Jules | D8/D9 | EXPLAIN/QUIZ | Developing | Sep 30 | 1-section specialist |
| L26 | Indigo | D9 | QUIZ | Approaching review-ready | Feb 2027 | Section A specialist |
| L27 | Remy | D1/D2 | QUIZ | Boundary | None | Readiness boundary |
| L28 | Wren | D3 | SOCRATIC | Developing | None | Stability = 49 |
| L29 | Halston | D5/D6 | QUIZ | Developing | Aug 31 (32d) | Exam 32 days out |
| L30 | Emerson | D2/D5 | QUIZ | Developing | Oct 20 | 30-attempt calibration |

---

## Coverage Map

| Dimension | MAY-008 | MAY-009 Target | Scenarios |
|-----------|---------|---------------|-----------|
| **D1** | S1 | ≥3 | L01, L02, L05, L14, L27 |
| **D2** | S1, S5 | ≥4 | L03, L04, L20, L27, L30 |
| **D3** | S5 | ≥3 | L06, L28 |
| **D4** | S4 | ≥3 | L13, L15 |
| **D5** | S2 | ≥4 | L07, L12, L18, L29, L30 |
| **D6** | S2 | ≥3 | L08, L29, L30 |
| **D7** | S2 | ≥3 | L09, L10, L11 |
| **D8** | — | ≥3 | L21, L22, L25 |
| **D9** | S3 | ≥4 | L16, L17, L19, L25, L26 |
| **D10** | — | ≥2 | L23, L24 |
| **QUIZ** | S1, S2, S4, S5 | ≥5 | L01-L05, L07-L08, L12, L14, L16-L18, L20, L26-L27, L29-L30 |
| **SOCRATIC** | S5 | ≥3 | L06, L28 |
| **STUDY_PLAN** | S4 | ≥3 | L13, L15 |
| **EXPLAIN** | S2 | ≥4 | L09-L11, L21-L24 |
| **MOTIVATE** | — | TBD | Context-driven only |
| **EXAM_REVIEW** | — | TBD | Context-driven only |
