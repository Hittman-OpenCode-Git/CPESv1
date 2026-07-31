// ============================================================
// MAY-014 Synthetic Learner Profiles — 9/10 Decision Coverage
// Consumed by may014_decision_runner.js
// Governance: Light Lane — no pack/case/content modifications
// ============================================================

// MAY-014 fixes:
//   D3 fix: Removed tier-1 band catch-all from _classifyTier
//   D9 fix: Added acc>=80 guard before tier 3 classification
// Target: D3 (SOCRATIC) and D9 (challenge) reachable. D10 intentionally unreachable.

var may014Profiles = {
  // ═══════════════════════════════════════════════════════════════
  // D1 — Critical Remediation (score < 50 and band ≠ Not enough data)
  // ═══════════════════════════════════════════════════════════════
  L1_D1: {
    archetype: 'D1 — Critical Remediation',
    description: 'Accuracy <50% across all topics — truly critical',
    learnerId: 'MAY014-L1',
    displayName: 'D1 — Critical Remediation',
    firstVisit: '2026-06-15T00:00:00.000Z',
    sessions: 5,
    examPlan: null,
    expectation: 'D1 QUIZ',
    topics: [
      { topic: 'Revenue Recognition',        section: 'A', attempts: 20, accuracy: 42, trend: 'declining',              difficultyScore: 3 },
      { topic: 'Inventory Valuation',        section: 'A', attempts: 18, accuracy: 38, trend: 'declining',              difficultyScore: 3 },
      { topic: 'Budgeting Concepts',         section: 'B', attempts: 22, accuracy: 45, trend: 'stable',                 difficultyScore: 2 },
      { topic: 'Standard Costing',           section: 'C', attempts: 15, accuracy: 40, trend: 'declining',              difficultyScore: 3 },
      { topic: 'Cost Behavior',              section: 'D', attempts: 20, accuracy: 48, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'COSO Framework',             section: 'E', attempts: 12, accuracy: 35, trend: 'declining',              difficultyScore: 2 }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // D2 — Critical Weakness (tier 1 — acc <50 + 5+ attempts)
  // ═══════════════════════════════════════════════════════════════
  L2_D2: {
    archetype: 'D2 — Critical Weakness',
    description: 'One critical weakness (Standard Costing at 45%), rest strong',
    learnerId: 'MAY014-L2',
    displayName: 'D2 — Critical Weakness',
    firstVisit: '2026-06-01T00:00:00.000Z',
    sessions: 8,
    examPlan: null,
    expectation: 'D2 QUIZ on weak topic',
    topics: [
      { topic: 'Revenue Recognition',        section: 'A', attempts: 25, accuracy: 87, trend: 'stable',                 difficultyScore: 4 },
      { topic: 'Cash Flow Statement',        section: 'A', attempts: 22, accuracy: 85, trend: 'stable',                 difficultyScore: 4 },
      { topic: 'Budgeting Concepts',         section: 'B', attempts: 20, accuracy: 90, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'Standard Costing',           section: 'C', attempts: 24, accuracy: 45, trend: 'declining',              difficultyScore: 4 },
      { topic: 'Cost Behavior',              section: 'D', attempts: 28, accuracy: 87, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'COSO Framework',             section: 'E', attempts: 20, accuracy: 91, trend: 'stable',                 difficultyScore: 3 }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // D3 — SOCRATIC (MAY-014: tier-1 band rule removed; this now fires D3)
  // Profile: Standard Costing at 52%, declining, unstable, 10 attempts
  // Band: "Recovery needed" (acc 50-60 + declining + stability<50)
  // Tier: 2 (emerging) — NOT tier 1 because band-based catch-all removed
  // Decision path: D1(no: score>50) → D2(no: tier=2) → D3(YES)
  // ═══════════════════════════════════════════════════════════════
  L3_D3: {
    archetype: 'D3 — SOCRATIC Unstable Declining',
    description: 'Unstable declining at 52% — Recovery band, tier 2 emerging, triggers D3 SOCRATIC',
    learnerId: 'MAY014-L3',
    displayName: 'D3 — SOCRATIC Mode',
    firstVisit: '2026-07-01T00:00:00.000Z',
    sessions: 7,
    examPlan: null,
    expectation: 'D3 SOCRATIC on unstable topic',
    topics: [
      { topic: 'Standard Costing',           section: 'C', attempts: 10, accuracy: 52, trend: 'declining',              difficultyScore: 4 },
      { topic: 'Revenue Recognition',        section: 'A', attempts: 8, accuracy: 75, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'Budgeting Concepts',         section: 'B', attempts: 6, accuracy: 74, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'COSO Framework',             section: 'E', attempts: 7, accuracy: 78, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'Cost Behavior',              section: 'D', attempts: 9, accuracy: 80, trend: 'stable',                 difficultyScore: 3 }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // D4 — STUDY_PLAN (exam within 30d, Developing band, no tier 1)
  // ═══════════════════════════════════════════════════════════════
  L4_D4: {
    archetype: 'D4 — Exam Strategy',
    description: 'Exam in 14 days, all topics 60-68%, no recovery → STUDY_PLAN',
    learnerId: 'MAY014-L4',
    displayName: 'D4 — Exam Strategy',
    firstVisit: '2026-06-01T00:00:00.000Z',
    sessions: 8,
    examPlan: { hasScheduledExam: true, examDate: '2026-08-13', examPart: 'Part 1', daysUntilExam: 14 },
    expectation: 'D4 STUDY_PLAN',
    topics: [
      { topic: 'Revenue Recognition',        section: 'A', attempts: 10, accuracy: 62, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'Inventory Valuation',        section: 'A', attempts: 8, accuracy: 64, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'Cost Behavior',              section: 'D', attempts: 6, accuracy: 65, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'COSO Framework',             section: 'E', attempts: 7, accuracy: 68, trend: 'stable',                 difficultyScore: 3 }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // D5 — QUIZ Declining (topic declining, not tier 1)
  // ═══════════════════════════════════════════════════════════════
  L5_D5: {
    archetype: 'D5 — Declining Trend',
    description: 'Declining at 72%, not unstable enough for D3 → QUIZ',
    learnerId: 'MAY014-L5',
    displayName: 'D5 — Declining Trend',
    firstVisit: '2026-07-01T00:00:00.000Z',
    sessions: 5,
    examPlan: null,
    expectation: 'D5 QUIZ on declining topic',
    topics: [
      { topic: 'Revenue Recognition',        section: 'A', attempts: 6, accuracy: 72, trend: 'declining',              difficultyScore: 3 },
      { topic: 'Budgeting Concepts',         section: 'B', attempts: 8, accuracy: 78, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'COSO Framework',             section: 'E', attempts: 6, accuracy: 74, trend: 'stable',                 difficultyScore: 3 }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // D6 — QUIZ Emerging Weakness (tier 2 — acc 50-60%)
  // ═══════════════════════════════════════════════════════════════
  L6_D6: {
    archetype: 'D6 — Emerging Weakness',
    description: 'Tier 2 at 55% with slightly declining → QUIZ',
    learnerId: 'MAY014-L6',
    displayName: 'D6 — Emerging Weakness',
    firstVisit: '2026-06-20T00:00:00.000Z',
    sessions: 6,
    examPlan: null,
    expectation: 'D6 QUIZ on emerging weakness',
    topics: [
      { topic: 'Cash Flow Statement',        section: 'A', attempts: 8, accuracy: 55, trend: 'slightly_declining',     difficultyScore: 3 },
      { topic: 'Budgeting Concepts',         section: 'B', attempts: 7, accuracy: 80, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'COSO Framework',             section: 'E', attempts: 6, accuracy: 78, trend: 'stable',                 difficultyScore: 3 }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // D7 — EXPLAIN Fragile Knowledge (tier 3 — acc 60-75% + stability<50)
  // ═══════════════════════════════════════════════════════════════
  L7_D7: {
    archetype: 'D7 — Fragile Knowledge',
    description: 'Tier 3 at 62% with low stability, slightly declining → EXPLAIN',
    learnerId: 'MAY014-L7',
    displayName: 'D7 — Fragile Knowledge',
    firstVisit: '2026-07-05T00:00:00.000Z',
    sessions: 5,
    examPlan: null,
    expectation: 'D7 EXPLAIN on fragile topic',
    topics: [
      { topic: 'Cost Behavior',              section: 'D', attempts: 8, accuracy: 62, trend: 'slightly_declining',     difficultyScore: 3 },
      { topic: 'Revenue Recognition',        section: 'A', attempts: 6, accuracy: 78, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'Budgeting Concepts',         section: 'B', attempts: 7, accuracy: 82, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'COSO Framework',             section: 'E', attempts: 5, accuracy: 76, trend: 'stable',                 difficultyScore: 3 }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // D8 — EXPLAIN Coverage Gap (<4 sections with data)
  // ═══════════════════════════════════════════════════════════════
  L8_D8: {
    archetype: 'D8 — Section Coverage Gap',
    description: 'Only 3 sections with data, no interventions → EXPLAIN',
    learnerId: 'MAY014-L8',
    displayName: 'D8 — Coverage Gap',
    firstVisit: '2026-07-10T00:00:00.000Z',
    sessions: 4,
    examPlan: null,
    expectation: 'D8 EXPLAIN exploratory',
    topics: [
      { topic: 'Revenue Recognition',        section: 'A', attempts: 5, accuracy: 72, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'Budgeting Concepts',         section: 'B', attempts: 5, accuracy: 78, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'Cost Behavior',              section: 'D', attempts: 5, accuracy: 75, trend: 'stable',                 difficultyScore: 3 }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // D9 — QUIZ Challenge (MAY-014: acc>=80 guard prevents tier 3; D9 now reachable)
  // Profile: All 6 topics at 86-92%, stable, 8-14 attempts
  // Tier: 4 (mastered) on all topics — acc>=80 guard prevents tier 3
  // Decision path: D1(no) → D2(no) → D3(no: no weaknesses) → D4(no: no exam) →
  //                 D5(no: no declining) → D6(no: no tier 2) → D7(no: no tier 3) →
  //                 D8(no: 4+ sections) → D9(YES)
  // ═══════════════════════════════════════════════════════════════
  L9_D9: {
    archetype: 'D9 — High Mastery Challenge',
    description: 'All topics >=86%, stable, no interventions at all → QUIZ challenge',
    learnerId: 'MAY014-L9',
    displayName: 'D9 — Challenge Mode',
    firstVisit: '2026-04-01T00:00:00.000Z',
    sessions: 14,
    examPlan: null,
    expectation: 'D9 QUIZ challenge',
    topics: [
      { topic: 'Revenue Recognition',        section: 'A', attempts: 12, accuracy: 89, trend: 'stable',                 difficultyScore: 4 },
      { topic: 'Budgeting Concepts',         section: 'B', attempts: 14, accuracy: 92, trend: 'stable',                 difficultyScore: 4 },
      { topic: 'COSO Framework',             section: 'E', attempts: 10, accuracy: 86, trend: 'improving',              difficultyScore: 4 },
      { topic: 'Cost Behavior',              section: 'D', attempts: 9, accuracy: 88, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'Inventory Valuation',        section: 'A', attempts: 11, accuracy: 90, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'Standard Costing',           section: 'C', attempts: 8, accuracy: 87, trend: 'stable',                 difficultyScore: 3 }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // D10 — Intentionally unreachable (D8 always fires for sparse data)
  // Retained as safety net; documented as legitimate dead branch.
  // ═══════════════════════════════════════════════════════════════
  L10_D8_alt: {
    archetype: 'D8 — Section Gap (D10 unreachable)',
    description: 'Minimal data, <4 sections → D8 (D10 unreachable by design)',
    learnerId: 'MAY014-L10',
    displayName: 'D8 — Coverage Gap (alt)',
    firstVisit: '2026-07-28T00:00:00.000Z',
    sessions: 1,
    examPlan: null,
    expectation: 'D8 EXPLAIN (D10 unreachable)',
    topics: [
      { topic: 'Revenue Recognition',        section: 'A', attempts: 2, accuracy: 80, trend: null,                      difficultyScore: 3 }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = may014Profiles;
}
