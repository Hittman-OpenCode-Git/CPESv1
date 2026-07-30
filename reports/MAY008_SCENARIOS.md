# MAY-008 — Learner Scenario Profiles

**Session:** MAY-008  
**Governance Lane:** Light  
**Date:** 2026-07-30  

---

## Purpose

Define representative learner archetypes with realistic MayLearnerState data to validate that the adaptive coaching pipeline produces appropriate, differentiated outputs for each learner type.

---

## Scenario Data Format

Each archetype seeds `MayLearnerState` via `localStorage` with a `cmaP1LearnerState` key containing:
- `learnerId`
- `userName`
- `sessions[]` — historical session data with attempts
- `examPlan` — optional exam scheduling data
- Topic-level performance (populated via `recordAttempt()` calls)

---

## Scenario 1: Struggling Student

### Profile

| Attribute | Value |
|-----------|-------|
| `learnerId` | `MAY008-S1` |
| `displayName` | `Alex` |
| Exam plan | Taking Part 1, exam in 60 days |
| Total sessions | 8 |
| Total attempts | 240 |
| Overall accuracy | 38% |
| Study streak | 2 days |

### Topic Performance

| Topic | Section | Accuracy | Attempts | Stability | Direction |
|-------|---------|----------|----------|-----------|-----------|
| Revenue Recognition | A | 30% | 12 | 35 | declining |
| Inventory Valuation | A | 35% | 10 | 40 | declining |
| Cash Flow Statement | A | 42% | 8 | 30 | declining |
| Budget Development | B | 40% | 10 | 38 | declining |
| Standard Costing | C | 45% | 8 | 42 | slightly_declining |
| Cost Behavior | D | 50% | 10 | 35 | declining |
| Internal Controls | E | 55% | 10 | 55 | stable |
| Data Analytics | F | 48% | 8 | 40 | slightly_declining |

### Expected Coaching Output

- **Readiness band:** Recovery needed (score < 40)
- **Decision:** D1 (Readiness Critical) — overall readiness critically low
- **Coaching mode:** QUIZ (remediation)
- **Priority:** Critical
- **Top recommendation:** Focused remediation on weakest areas (Revenue Recognition, Cash Flow)
- **Recovery plan:** 3 topics at Easy difficulty, 15 questions each
- **Risk areas:** 4+ high-severity topic risks + exam timeline risk

---

## Scenario 2: Average Student

### Profile

| Attribute | Value |
|-----------|-------|
| `learnerId` | `MAY008-S2` |
| `displayName` | `Jordan` |
| Exam plan | Planning to take Part 1 (no date set) |
| Total sessions | 15 |
| Total attempts | 450 |
| Overall accuracy | 68% |
| Study streak | 5 days |

### Topic Performance

| Topic | Section | Accuracy | Attempts | Stability | Direction |
|-------|---------|----------|----------|-----------|-----------|
| Revenue Recognition | A | 75% | 15 | 65 | stable |
| Inventory Valuation | A | 65% | 12 | 55 | stable |
| Financial Ratios | A | 80% | 10 | 75 | improving |
| Budget Development | B | 60% | 14 | 48 | slightly_declining |
| Cash Budget | B | 72% | 10 | 60 | stable |
| Cost Variances | C | 55% | 12 | 42 | declining |
| Activity-Based Costing | D | 70% | 10 | 68 | stable |
| CVP Analysis | D | 85% | 14 | 80 | stable |
| COSO Framework | E | 68% | 8 | 55 | stable |
| Cybersecurity | F | 58% | 10 | 45 | slightly_declining |

### Expected Coaching Output

- **Readiness band:** Developing (score 50-65)
- **Decision:** D5 (Declining Trends) or D6 (Emerging Weakness)
- **Coaching mode:** QUIZ or EXPLAIN
- **Priority:** Medium
- **Top recommendation:** Address declining topics (Cost Variances, Cybersecurity)
- **Recovery plan:** 1-2 topics at Moderate difficulty
- **Risk areas:** 2-3 medium-severity risks (Cost Variances, Cybersecurity)
- **Strengths:** CVP Analysis, Financial Ratios → challenge recommendations

---

## Scenario 3: High Performer

### Profile

| Attribute | Value |
|-----------|-------|
| `learnerId` | `MAY008-S3` |
| `displayName` | `Taylor` |
| Exam plan | Taking Part 1, exam in 90 days |
| Total sessions | 25 |
| Total attempts | 750 |
| Overall accuracy | 88% |
| Study streak | 12 days |

### Topic Performance

| Topic | Section | Accuracy | Attempts | Stability | Direction |
|-------|---------|----------|----------|-----------|-----------|
| Revenue Recognition | A | 92% | 18 | 88 | stable |
| Inventory Valuation | A | 90% | 15 | 85 | stable |
| Cash Flow Statement | A | 88% | 16 | 82 | stable |
| Budget Development | B | 85% | 14 | 78 | stable |
| Cash Budget | B | 90% | 12 | 84 | stable |
| Flexible Budgets | B | 92% | 16 | 90 | stable |
| Cost Variances | C | 87% | 15 | 80 | stable |
| CVP Analysis | D | 95% | 18 | 92 | improving |
| Job Order Costing | D | 88% | 14 | 84 | stable |
| COSO Framework | E | 90% | 12 | 86 | stable |
| Data Analytics | F | 85% | 10 | 75 | stable |

### Expected Coaching Output

- **Readiness band:** Ready for focused review (score > 80)
- **Decision:** D9 (High Mastery) — challenge with advanced content
- **Coaching mode:** QUIZ (challenge)
- **Priority:** Low
- **Top recommendation:** Challenge on mastered topics at Difficult level
- **Recovery plan:** Empty (no recovery needed)
- **Risk areas:** None
- **Strengths:** CVP Analysis, Budget Development, Inventory Valuation

---

## Scenario 4: Exam-Cram Student

### Profile

| Attribute | Value |
|-----------|-------|
| `learnerId` | `MAY008-S4` |
| `displayName` | `Morgan` |
| Exam plan | Taking Part 1, exam in 10 days |
| Total sessions | 6 |
| Total attempts | 180 |
| Overall accuracy | 62% |
| Study streak | 6 days |

### Topic Performance

| Topic | Section | Accuracy | Attempts | Stability | Direction |
|-------|---------|----------|----------|-----------|-----------|
| Revenue Recognition | A | 65% | 12 | 50 | slightly_declining |
| Cash Flow Statement | A | 55% | 10 | 40 | declining |
| Budget Development | B | 60% | 12 | 48 | declining |
| Standard Costing | C | 68% | 8 | 52 | stable |
| Cost Variances | C | 58% | 10 | 42 | slightly_declining |
| CVP Analysis | D | 72% | 10 | 60 | stable |
| Internal Controls | E | 70% | 8 | 58 | stable |
| COSO ERM | E | 55% | 6 | 38 | declining |

### Expected Coaching Output

- **Readiness band:** Developing (score 45-60)
- **Decision:** D4 (Exam Approaching with Gaps) — high priority due to 10-day timeline
- **Coaching mode:** STUDY_PLAN
- **Priority:** High
- **Top recommendation:** Focused high-yield review with exam timeline pressure
- **Recovery plan:** 3 topics prioritized by exam weight (Section A, B, C first)
- **Risk areas:** 3+ medium-severity risks + HIGH exam timeline risk
- **Exam timeline:** 10 days → urgency multiplier active

---

## Scenario 5: Topic-Specific Weakness Student

### Profile

| Attribute | Value |
|-----------|-------|
| `learnerId` | `MAY008-S5` |
| `displayName` | `Casey` |
| Exam plan | Taking Part 1, exam in 45 days |
| Total sessions | 12 |
| Total attempts | 360 |
| Overall accuracy | 72% |
| Study streak | 4 days |

### Topic Performance

| Topic | Section | Accuracy | Attempts | Stability | Direction |
|-------|---------|----------|----------|-----------|-----------|
| Revenue Recognition | A | 82% | 14 | 78 | stable |
| Inventory Valuation | A | 78% | 12 | 72 | stable |
| Financial Ratios | A | 85% | 10 | 80 | improving |
| Budget Development | B | 80% | 12 | 75 | stable |
| Cash Budget | B | 75% | 10 | 68 | stable |
| Cost Variances | C | 35% | 14 | 25 | declining |
| Standard Costing | C | 55% | 12 | 40 | slightly_declining |
| CVP Analysis | D | 88% | 14 | 84 | improving |
| Job Order Costing | D | 82% | 12 | 78 | stable |
| COSO Framework | E | 75% | 10 | 65 | stable |
| Data Governance | F | 72% | 8 | 58 | stable |

### Expected Coaching Output

- **Readiness band:** Approaching review-ready (score 65-80) — dragged down by Section C
- **Decision:** D2 (Critical Weakness — Tier 1) — Specific topic at critical level
- **Coaching mode:** QUIZ (remediation)
- **Priority:** Critical
- **Topic:** Cost Variances
- **Top recommendation:** Immediate remediation on Cost Variances (35% accuracy, declining, unstable)
- **Recovery plan:** Cost Variances at Easy difficulty, 15 questions
- **Risk areas:** 1 high-severity topic risk (Cost Variances)
- **Strengths:** CVP Analysis, Financial Ratios, Revenue Recognition → mixed profile

---

## Scenario Comparison Matrix

| Archetype | Readiness | Decision | Coaching Mode | Priority | Key Insight |
|-----------|-----------|----------|---------------|----------|-------------|
| Struggling (S1) | Recovery needed | D1 | QUIZ | Critical | Global weakness in fundamentals |
| Average (S2) | Developing | D5/D6 | QUIZ/EXPLAIN | Medium | Mixed with specific declining areas |
| High Performer (S3) | Ready | D9 | QUIZ | Low | Ready for challenge, no remediation |
| Exam-Cram (S4) | Developing | D4 | STUDY_PLAN | High | Time pressure dominates decision |
| Topic-Specific (S5) | Approaching | D2 | QUIZ | Critical | One deep weakness in otherwise strong profile |

---

## Data Construction Notes

Each scenario's `MayLearnerState` data will be constructed programmatically:

1. Initialize `MayLearnerState` with `clear()` and then `load()` fresh
2. Call `setUserName()` and `setExamPlan()` for exam context
3. Iterate through simulated `recordAttempt()` calls per topic:
   - Distribute correct/incorrect according to the target accuracy
   - Vary difficulty to influence stability metrics
   - Space attempts across sessions to build direction trends
4. Capture via `MayLearnerState.load()` snapshot
5. Seed into the test harness via `localStorage.setItem('cmaP1LearnerState', JSON.stringify(data))`

---

## Expected Differentiation

The 5 archetypes should produce **5 distinct decision IDs** demonstrating that the decision engine and orchestrator are genuinely adaptive — not returning the same output for all inputs.

If any two archetypes produce the same decision ID, the evaluation should document why and assess whether the differentiation is appropriate given the profile data.
