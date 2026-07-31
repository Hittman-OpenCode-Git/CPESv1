// ============================================================
// MAY-013 Synthetic Learner Profiles — Full D1-D10 Coverage
// Consumed by may013_decision_runner.js
// Governance: Light Lane — no pack/case/content modifications
// ============================================================

// MAY-013 calibration: Recovery band narrowed (acc<50 only, or triple-fail 50-60+declining+unstble).
// D1 now excludes "Not enough data" band. Section roll-up allows single-recovery+2+ready = Approaching.

var may013Profiles = {
  // ═══════════════════════════════════════════════════════════════
  // D1 — Critical Remediation (score < 50 and band ≠ Not enough data)
  // ═══════════════════════════════════════════════════════════════
  L1: {
    archetype: 'D1 — Critical Remediation',
    description: 'Accuracy <50% across all topics — truly critical',
    learnerId: 'MAY013-L1',
    displayName: 'D1 — Critical Remediation',
    firstVisit: '2026-06-15T00:00:00.000Z',
    sessions: 5,
    examPlan: null,
    expectation: 'D1 QUIZ',
    topics: [
      { topic: 'Revenue Recognition',        section: 'A', qidPrefix: 'L1A', attempts: 20, accuracy: 42, trend: 'declining',              difficultyScore: 3 },
      { topic: 'Inventory Valuation',        section: 'A', qidPrefix: 'L1A2', attempts: 18, accuracy: 38, trend: 'declining',             difficultyScore: 3 },
      { topic: 'Budgeting Concepts',         section: 'B', qidPrefix: 'L1B', attempts: 22, accuracy: 45, trend: 'stable',                 difficultyScore: 2 },
      { topic: 'Standard Costing',           section: 'C', qidPrefix: 'L1C', attempts: 15, accuracy: 40, trend: 'declining',              difficultyScore: 3 },
      { topic: 'Cost Behavior',              section: 'D', qidPrefix: 'L1D', attempts: 20, accuracy: 48, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'COSO Framework',             section: 'E', qidPrefix: 'L1E', attempts: 12, accuracy: 35, trend: 'declining',              difficultyScore: 2 }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // D2 — Critical Weakness (tier 1 intervention — acc <50 + 5+ attempts)
  // ═══════════════════════════════════════════════════════════════
  L2: {
    archetype: 'D2 — Critical Weakness',
    description: 'One critical weakness (Standard Costing at 45%), rest strong',
    learnerId: 'MAY013-L2',
    displayName: 'D2 — Critical Weakness',
    firstVisit: '2026-06-01T00:00:00.000Z',
    sessions: 8,
    examPlan: null,
    expectation: 'D2 QUIZ on weak topic',
    topics: [
      { topic: 'Revenue Recognition',        section: 'A', qidPrefix: 'L2A', attempts: 25, accuracy: 87, trend: 'stable',                 difficultyScore: 4 },
      { topic: 'Cash Flow Statement',        section: 'A', qidPrefix: 'L2A2', attempts: 22, accuracy: 85, trend: 'stable',                difficultyScore: 4 },
      { topic: 'Budgeting Concepts',         section: 'B', qidPrefix: 'L2B', attempts: 20, accuracy: 90, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'Standard Costing',           section: 'C', qidPrefix: 'L2C', attempts: 24, accuracy: 45, trend: 'declining',              difficultyScore: 4 },
      { topic: 'Cost Behavior',              section: 'D', qidPrefix: 'L2D', attempts: 28, accuracy: 87, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'COSO Framework',             section: 'E', qidPrefix: 'L2E', attempts: 20, accuracy: 91, trend: 'stable',                 difficultyScore: 3 }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // D3 — SOCRATIC (stability <50, declining, 5+ attempts, NOT tier 1)
  // MAY-013: acc=52% with declining+stability<50 → band=Developing (not Recovery)
  // → tier 2 (acc 50-60 + declining + stability<50) → D2 doesn't fire → D3 fires!
  // ═══════════════════════════════════════════════════════════════
  S1_D3: {
    archetype: 'D3 — SOCRATIC Unstable Declining',
    description: 'Unstable declining at 52% — Developing band, tier 2, triggers D3',
    learnerId: 'MAY013-S1',
    displayName: 'D3 — SOCRATIC Mode',
    firstVisit: '2026-07-01T00:00:00.000Z',
    sessions: 7,
    examPlan: null,
    expectation: 'D3 SOCRATIC on unstable topic',
    topics: [
      { topic: 'Standard Costing',           section: 'C', qidPrefix: 'S1C', attempts: 10, accuracy: 52, trend: 'declining',              difficultyScore: 4 },
      { topic: 'Revenue Recognition',        section: 'A', qidPrefix: 'S1A', attempts: 8, accuracy: 75, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'Budgeting Concepts',         section: 'B', qidPrefix: 'S1B', attempts: 6, accuracy: 74, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'COSO Framework',             section: 'E', qidPrefix: 'S1E', attempts: 7, accuracy: 78, trend: 'stable',                 difficultyScore: 3 }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // D4 — STUDY_PLAN (exam within 30d, Developing band, no tier 1)
  // ═══════════════════════════════════════════════════════════════
  S2_D4: {
    archetype: 'D4 — Exam Strategy',
    description: 'Exam in 14 days, all topics 60-68%, no recovery → STUDY_PLAN',
    learnerId: 'MAY013-S2',
    displayName: 'D4 — Exam Strategy',
    firstVisit: '2026-06-01T00:00:00.000Z',
    sessions: 8,
    examPlan: { hasScheduledExam: true, examDate: '2026-08-13', examPart: 'Part 1', daysUntilExam: 14 },
    expectation: 'D4 STUDY_PLAN',
    topics: [
      { topic: 'Revenue Recognition',        section: 'A', qidPrefix: 'S2A', attempts: 10, accuracy: 62, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'Inventory Valuation',        section: 'A', qidPrefix: 'S2A2', attempts: 8, accuracy: 64, trend: 'stable',                difficultyScore: 3 },
      { topic: 'Cost Behavior',              section: 'D', qidPrefix: 'S2D', attempts: 6, accuracy: 65, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'COSO Framework',             section: 'E', qidPrefix: 'S2E', attempts: 7, accuracy: 68, trend: 'stable',                 difficultyScore: 3 }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // D5 — QUIZ Declining (topic declining, not tier 1)
  // ═══════════════════════════════════════════════════════════════
  S3_D5: {
    archetype: 'D5 — Declining Trend',
    description: 'Declining at 72%, not unstable enough for D3 → QUIZ',
    learnerId: 'MAY013-S3',
    displayName: 'D5 — Declining Trend',
    firstVisit: '2026-07-01T00:00:00.000Z',
    sessions: 5,
    examPlan: null,
    expectation: 'D5 QUIZ on declining topic',
    topics: [
      { topic: 'Revenue Recognition',        section: 'A', qidPrefix: 'S3A', attempts: 6, accuracy: 72, trend: 'declining',              difficultyScore: 3 },
      { topic: 'Budgeting Concepts',         section: 'B', qidPrefix: 'S3B', attempts: 8, accuracy: 78, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'COSO Framework',             section: 'E', qidPrefix: 'S3E', attempts: 6, accuracy: 74, trend: 'stable',                 difficultyScore: 3 }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // D6 — QUIZ Emerging Weakness (tier 2 — acc 50-60%)
  // ═══════════════════════════════════════════════════════════════
  S4_D6: {
    archetype: 'D6 — Emerging Weakness',
    description: 'Tier 2 at 55% with slightly declining → QUIZ',
    learnerId: 'MAY013-S4',
    displayName: 'D6 — Emerging Weakness',
    firstVisit: '2026-06-20T00:00:00.000Z',
    sessions: 6,
    examPlan: null,
    expectation: 'D6 QUIZ on emerging weakness',
    topics: [
      { topic: 'Cash Flow Statement',        section: 'A', qidPrefix: 'S4A', attempts: 8, accuracy: 55, trend: 'slightly_declining',     difficultyScore: 3 },
      { topic: 'Budgeting Concepts',         section: 'B', qidPrefix: 'S4B', attempts: 7, accuracy: 80, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'COSO Framework',             section: 'E', qidPrefix: 'S4E', attempts: 6, accuracy: 78, trend: 'stable',                 difficultyScore: 3 }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // D7 — EXPLAIN Fragile Knowledge (tier 3 — acc 60-75% + stability<50)
  // MAY-013: With narrower Recovery band, acc=62% with stability=45 stays Developing
  // → _classifyTier: acc 60-75, stability<50 → tier 3 fragile → D7 fires
  // ═══════════════════════════════════════════════════════════════
  S5_D7: {
    archetype: 'D7 — Fragile Knowledge',
    description: 'Tier 3 at 62% with low stability, slightly declining → EXPLAIN',
    learnerId: 'MAY013-S5',
    displayName: 'D7 — Fragile Knowledge',
    firstVisit: '2026-07-05T00:00:00.000Z',
    sessions: 5,
    examPlan: null,
    expectation: 'D7 EXPLAIN on fragile topic',
    topics: [
      { topic: 'Cost Behavior',              section: 'D', qidPrefix: 'S5D', attempts: 8, accuracy: 62, trend: 'slightly_declining',     difficultyScore: 3 },
      { topic: 'Revenue Recognition',        section: 'A', qidPrefix: 'S5A', attempts: 6, accuracy: 78, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'Budgeting Concepts',         section: 'B', qidPrefix: 'S5B', attempts: 7, accuracy: 82, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'COSO Framework',             section: 'E', qidPrefix: 'S5E', attempts: 5, accuracy: 76, trend: 'stable',                 difficultyScore: 3 }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // D8 — EXPLAIN Coverage Gap (<4 sections with data)
  // ═══════════════════════════════════════════════════════════════
  S6_D8: {
    archetype: 'D8 — Section Coverage Gap',
    description: 'Only 3 sections with data, no interventions → EXPLAIN',
    learnerId: 'MAY013-S6',
    displayName: 'D8 — Coverage Gap',
    firstVisit: '2026-07-10T00:00:00.000Z',
    sessions: 4,
    examPlan: null,
    expectation: 'D8 EXPLAIN exploratory',
    topics: [
      { topic: 'Revenue Recognition',        section: 'A', qidPrefix: 'S6A', attempts: 5, accuracy: 72, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'Budgeting Concepts',         section: 'B', qidPrefix: 'S6B', attempts: 5, accuracy: 78, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'Cost Behavior',              section: 'D', qidPrefix: 'S6D', attempts: 5, accuracy: 75, trend: 'stable',                 difficultyScore: 3 }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // D9 — QUIZ Challenge (all topics >=85%, stable, no tier 1-3)
  // ═══════════════════════════════════════════════════════════════
  S7_D9: {
    archetype: 'D9 — High Mastery',
    description: 'All topics >=85%, stable, no interventions at all → QUIZ challenge',
    learnerId: 'MAY013-S7',
    displayName: 'D9 — Challenge Mode',
    firstVisit: '2026-04-01T00:00:00.000Z',
    sessions: 14,
    examPlan: null,
    expectation: 'D9 QUIZ challenge',
    topics: [
      { topic: 'Revenue Recognition',        section: 'A', qidPrefix: 'S7A', attempts: 12, accuracy: 89, trend: 'stable',                 difficultyScore: 4 },
      { topic: 'Budgeting Concepts',         section: 'B', qidPrefix: 'S7B', attempts: 14, accuracy: 92, trend: 'stable',                 difficultyScore: 4 },
      { topic: 'COSO Framework',             section: 'E', qidPrefix: 'S7E', attempts: 10, accuracy: 86, trend: 'improving',              difficultyScore: 4 },
      { topic: 'Cost Behavior',              section: 'D', qidPrefix: 'S7D', attempts: 9, accuracy: 88, trend: 'stable',                 difficultyScore: 3 },
      { topic: 'Inventory Valuation',        section: 'A', qidPrefix: 'S7A2', attempts: 11, accuracy: 90, trend: 'stable',                difficultyScore: 3 },
      { topic: 'Standard Costing',           section: 'C', qidPrefix: 'S7C', attempts: 8, accuracy: 87, trend: 'stable',                  difficultyScore: 3 }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // D10 — EXPLAIN Fallback (minimal data, Not enough data band)
  // MAY-013: D1 now excludes Not enough data → D10 fires
  // ═══════════════════════════════════════════════════════════════
  S8_D10: {
    archetype: 'D10 — Insufficient Data',
    description: 'Minimal attempts, Not enough data band → D10 EXPLAIN',
    learnerId: 'MAY013-S8',
    displayName: 'D10 — Insufficient Data',
    firstVisit: '2026-07-28T00:00:00.000Z',
    sessions: 1,
    examPlan: null,
    expectation: 'D10 EXPLAIN fallback',
    topics: [
      { topic: 'Revenue Recognition',        section: 'A', qidPrefix: 'S8A', attempts: 2, accuracy: 80, trend: null,                      difficultyScore: 3 }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = may013Profiles;
}
