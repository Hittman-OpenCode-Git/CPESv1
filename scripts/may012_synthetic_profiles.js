// ============================================================
// MAY-012 Synthetic Learner Profiles — Decision Path Expansion
// Consumed by may012_calibration_runner.js
// Governance: Light Lane — no pack/case/content modifications
// ============================================================
// These profiles intentionally trigger D3-D10 which do not fire
// on the original MAY-011 archetype set.

var may012SyntheticProfiles = {
  // Profile S1 — D3: Repeated Weakness with Instability → SOCRATIC
  S1: {
    archetype: 'D3 — Unstable Declining',
    description: 'Weakness with stability <50, declining, 5+ attempts → SOCRATIC mode',
    learnerId: 'MAY012-S1',
    displayName: 'D3 — Unstable Declining',
    firstVisit: '2026-06-15T00:00:00.000Z',
    sessions: 6,
    examPlan: null,
    expectation: 'D3 socratic mode on lowest-accuracy unstable topic',
    topics: [
      { topic: 'Revenue Recognition', section: 'A', qidPrefix: 'S1-A', attempts: 7, accuracy: 58, trend: 'declining', difficultyScore: 3 },
      { topic: 'Budgeting Concepts', section: 'B', qidPrefix: 'S1-B', attempts: 5, accuracy: 75, trend: 'stable', difficultyScore: 3 },
      { topic: 'Standard Costing', section: 'C', qidPrefix: 'S1-C', attempts: 8, accuracy: 55, trend: 'declining', difficultyScore: 3 }
    ]
  },

  // Profile S2 — D4: Exam Approaching with Gaps, No Critical Weaknesses → STUDY_PLAN
  S2: {
    archetype: 'D4 — Exam Strategy',
    description: 'Exam in 14 days, Developing band, no tier 1 interventions → STUDY_PLAN',
    learnerId: 'MAY012-S2',
    displayName: 'D4 — Exam Strategy',
    firstVisit: '2026-06-01T00:00:00.000Z',
    sessions: 8,
    examPlan: { hasScheduledExam: true, examDate: '2026-08-13', examPart: 'Part 1', daysUntilExam: 14 },
    expectation: 'D4 study_plan mode',
    topics: [
      { topic: 'Revenue Recognition', section: 'A', qidPrefix: 'S2-A', attempts: 10, accuracy: 62, trend: 'stable', difficultyScore: 3 },
      { topic: 'Inventory Valuation', section: 'A', qidPrefix: 'S2-A2', attempts: 8, accuracy: 64, trend: 'stable', difficultyScore: 3 },
      { topic: 'Cost Behavior', section: 'D', qidPrefix: 'S2-D', attempts: 6, accuracy: 65, trend: 'stable', difficultyScore: 3 },
      { topic: 'COSO Framework', section: 'E', qidPrefix: 'S2-E', attempts: 7, accuracy: 63, trend: 'stable', difficultyScore: 3 }
    ]
  },

  // Profile S3 — D5: Declining Topic Trends → QUIZ
  S3: {
    archetype: 'D5 — Declining Trends',
    description: 'Topic declining but not unstable enough for D3 → QUIZ remediation',
    learnerId: 'MAY012-S3',
    displayName: 'D5 — Declining Trends',
    firstVisit: '2026-07-01T00:00:00.000Z',
    sessions: 5,
    examPlan: null,
    expectation: 'D5 remediation on declining topic',
    topics: [
      { topic: 'Revenue Recognition', section: 'A', qidPrefix: 'S3-A', attempts: 6, accuracy: 72, trend: 'declining', difficultyScore: 3 },
      { topic: 'Budgeting Concepts', section: 'B', qidPrefix: 'S3-B', attempts: 8, accuracy: 78, trend: 'stable', difficultyScore: 3 },
      { topic: 'COSO Framework', section: 'E', qidPrefix: 'S3-E', attempts: 6, accuracy: 74, trend: 'stable', difficultyScore: 3 }
    ]
  },

  // Profile S4 — D6: Emerging Weakness → QUIZ
  S4: {
    archetype: 'D6 — Emerging Weakness',
    description: 'Tier 2 intervention (accuracy 50-60%), no tier 1 → QUIZ',
    learnerId: 'MAY012-S4',
    displayName: 'D6 — Emerging Weakness',
    firstVisit: '2026-06-20T00:00:00.000Z',
    sessions: 6,
    examPlan: null,
    expectation: 'D6 quiz mode on tier 2 topic',
    topics: [
      { topic: 'Cash Flow Statement', section: 'A', qidPrefix: 'S4-A', attempts: 8, accuracy: 55, trend: 'slightly_declining', difficultyScore: 3 },
      { topic: 'Budgeting Concepts', section: 'B', qidPrefix: 'S4-B', attempts: 7, accuracy: 80, trend: 'stable', difficultyScore: 3 },
      { topic: 'COSO Framework', section: 'E', qidPrefix: 'S4-E', attempts: 6, accuracy: 78, trend: 'stable', difficultyScore: 3 }
    ]
  },

  // Profile S5 — D8: Section Coverage Gap → EXPLAIN
  S5: {
    archetype: 'D8 — Section Coverage Gap',
    description: 'Only 3 of 6 sections with data, no critical weaknesses → EXPLAIN',
    learnerId: 'MAY012-S5',
    displayName: 'D8 — Section Coverage Gap',
    firstVisit: '2026-07-05T00:00:00.000Z',
    sessions: 4,
    examPlan: null,
    expectation: 'D8 exploratory mode',
    topics: [
      { topic: 'Revenue Recognition', section: 'A', qidPrefix: 'S5-A', attempts: 5, accuracy: 72, trend: 'stable', difficultyScore: 3 },
      { topic: 'Budgeting Concepts', section: 'B', qidPrefix: 'S5-B', attempts: 5, accuracy: 78, trend: 'stable', difficultyScore: 3 },
      { topic: 'Cost Behavior', section: 'D', qidPrefix: 'S5-D', attempts: 5, accuracy: 75, trend: 'stable', difficultyScore: 3 }
    ]
  },

  // Profile S6 — D9: High Mastery Challenge → QUIZ
  S6: {
    archetype: 'D9 — High Mastery',
    description: 'Topics at >=85% accuracy, stable, 6+ attempts → QUIZ challenge',
    learnerId: 'MAY012-S6',
    displayName: 'D9 — High Mastery',
    firstVisit: '2026-04-01T00:00:00.000Z',
    sessions: 12,
    examPlan: null,
    expectation: 'D9 challenge mode on highest-accuracy topic',
    topics: [
      { topic: 'Revenue Recognition', section: 'A', qidPrefix: 'S6-A', attempts: 10, accuracy: 89, trend: 'stable', difficultyScore: 4 },
      { topic: 'Budgeting Concepts', section: 'B', qidPrefix: 'S6-B', attempts: 12, accuracy: 92, trend: 'stable', difficultyScore: 4 },
      { topic: 'COSO Framework', section: 'E', qidPrefix: 'S6-E', attempts: 9, accuracy: 86, trend: 'stable', difficultyScore: 3 },
      { topic: 'Cost Behavior', section: 'D', qidPrefix: 'S6-D', attempts: 6, accuracy: 78, trend: 'stable', difficultyScore: 3 }
    ]
  },

  // Profile S7 — D10: Insufficient Data Fallback → EXPLAIN
  S7: {
    archetype: 'D10 — Insufficient Data',
    description: 'Minimal attempts, no other rule matches → EXPLAIN fallback',
    learnerId: 'MAY012-S7',
    displayName: 'D10 — Insufficient Data',
    firstVisit: '2026-07-28T00:00:00.000Z',
    sessions: 1,
    examPlan: null,
    expectation: 'D10 exploratory fallback',
    topics: [
      { topic: 'Revenue Recognition', section: 'A', qidPrefix: 'S7-A', attempts: 2, accuracy: 80, trend: null, difficultyScore: 3 }
    ]
  },

  // Profile S8 — L2-Recalibrated: High-readiness learner with exam date
  S8: {
    archetype: 'L2R — High-Readiness + Exam',
    description: 'L2 profile with exam scheduled — test D9 vs D4 priority',
    learnerId: 'MAY012-S8',
    displayName: 'L2R — High-Readiness + Exam',
    firstVisit: '2026-05-01T00:00:00.000Z',
    sessions: 10,
    examPlan: { hasScheduledExam: true, examDate: '2026-08-15', examPart: 'Part 1', daysUntilExam: 16 },
    expectation: 'D9 challenge (no critical weaknesses, high mastery > exam strategy)',
    topics: [
      { topic: 'Revenue Recognition', section: 'A', qidPrefix: 'S8-A', attempts: 25, accuracy: 88, trend: 'improving', difficultyScore: 4 },
      { topic: 'Cash Flow Statement', section: 'A', qidPrefix: 'S8-A2', attempts: 22, accuracy: 85, trend: 'stable', difficultyScore: 4 },
      { topic: 'Budgeting Concepts', section: 'B', qidPrefix: 'S8-B', attempts: 20, accuracy: 90, trend: 'stable', difficultyScore: 3 },
      { topic: 'Standard Costing', section: 'C', qidPrefix: 'S8-C', attempts: 24, accuracy: 82, trend: 'improving', difficultyScore: 4 },
      { topic: 'Cost Behavior', section: 'D', qidPrefix: 'S8-D', attempts: 28, accuracy: 87, trend: 'stable', difficultyScore: 3 },
      { topic: 'COSO Framework', section: 'E', qidPrefix: 'S8-E', attempts: 20, accuracy: 91, trend: 'stable', difficultyScore: 3 }
    ]
  },

  // Profile S9 — D4-Dominant: Exam approaching, no weaknesses, not quite D9
  S9: {
    archetype: 'D4D — Exam-Only Strategy',
    description: 'Exam in 10 days, all topics near 60-70%, no tier 1 — D4 should fire',
    learnerId: 'MAY012-S9',
    displayName: 'D4D — Exam-Only Strategy',
    firstVisit: '2026-06-15T00:00:00.000Z',
    sessions: 8,
    examPlan: { hasScheduledExam: true, examDate: '2026-08-09', examPart: 'Part 1', daysUntilExam: 10 },
    expectation: 'D4 study_plan mode',
    topics: [
      { topic: 'Revenue Recognition', section: 'A', qidPrefix: 'S9-A', attempts: 8, accuracy: 68, trend: 'stable', difficultyScore: 3 },
      { topic: 'Inventory Valuation', section: 'A', qidPrefix: 'S9-A2', attempts: 7, accuracy: 65, trend: 'stable', difficultyScore: 3 },
      { topic: 'COSO Framework', section: 'E', qidPrefix: 'S9-E', attempts: 8, accuracy: 62, trend: 'stable', difficultyScore: 3 }
    ]
  },

  // Profile S10 — SOCRATIC-Prime: Clear D3 trigger
  S10: {
    archetype: 'S10 — Clear SOCRATIC',
    description: 'Maximally unstable declining weakness → strong D3 trigger',
    learnerId: 'MAY012-S10',
    displayName: 'S10 — SOCRATIC Prime',
    firstVisit: '2026-07-01T00:00:00.000Z',
    sessions: 7,
    examPlan: null,
    expectation: 'D3 socratic mode',
    topics: [
      { topic: 'Standard Costing', section: 'C', qidPrefix: 'S10-C', attempts: 10, accuracy: 48, trend: 'declining', difficultyScore: 4 },
      { topic: 'Budgeting Concepts', section: 'B', qidPrefix: 'S10-B', attempts: 5, accuracy: 75, trend: 'stable', difficultyScore: 3 },
      { topic: 'COSO Framework', section: 'E', qidPrefix: 'S10-E', attempts: 5, accuracy: 72, trend: 'stable', difficultyScore: 3 }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = may012SyntheticProfiles;
}
