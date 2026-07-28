// Queue State Machine Engine — S250.1/.2/.3 Shared Foundation
// Defines the 5-lane queue model, state transitions, priority ordering,
// and routing rules for the 250-Series operational pipeline.
//
// Lanes: READY | REMEDIATE | BLOCKED | CERTIFY | ARCHIVE
//
// Transition rules:
//   READY → CERTIFY (passes CAQS §1.6 six-dimension verification)
//   READY → BLOCKED (governance guard rule violation detected)
//   REMEDIATE → READY (all defects resolved, DL-008/026 cleared)
//   REMEDIATE → BLOCKED (new governance block detected mid-remediation)
//   BLOCKED → REMEDIATE (block resolved, defects now addressable)
//   CERTIFY ↔ REMEDIATE (re-verification request, per metadata standard §9.2)
//   Any → ARCHIVE (consolidation/retirement)
//   ARCHIVE → READY (restoration — requires explicit authorization)
//
// Priority: ARCHIVE (0) > CERTIFY (1) > BLOCKED (2) > REMEDIATE (3) > READY (4)

const QUEUE_LANES = {
  READY: {
    label: 'READY',
    order: 4,
    description: 'Items passing all structural gates, ready for certification review',
    entryCriteria: [
      'Zero DL-008 violations (EW[CC] empty)',
      'Zero DL-025/026 violations (no empty non-CC slots on Certified items)',
      'Zero DL-018 violations (all EW fields present)',
      'Identity validator: PASS',
      'JSON parseable via AM-1 Function Constructor',
      'Governance Rule 2: PASS',
      'CorrectChoice field present and non-empty'
    ],
    exitActions: ['CERTIFY', 'BLOCKED'],
    color: 'green'
  },

  REMEDIATE: {
    label: 'REMEDIATE',
    order: 3,
    description: 'Items with known structural/content defects requiring fix',
    entryCriteria: [
      'Has one or more defect flags (DL-008, DL-025, DL-026, DL-013, DL-021, DL-010, DL-030, DL-031)',
      'Required fields present (identity checks pass)',
      'Not blocked by governance guard'
    ],
    exitActions: ['READY', 'BLOCKED'],
    color: 'yellow'
  },

  BLOCKED: {
    label: 'BLOCKED',
    order: 2,
    description: 'Items blocked from further processing by governance guard or identity failure',
    entryCriteria: [
      'Identity validator: FAIL (Gate -1 HARD_BLOCK)',
      'Or: Governance Rule 2 BLOCK (DL-008 on Certified item)',
      'Or: Governance Rule 3 BLOCK (MASTER_QUESTION_REGISTRY.md manual edit)',
      'Or: Critical structural corruption (parse failure)',
      'Or: Missing CorrectChoice with question_state: "Certified"'
    ],
    exitActions: ['REMEDIATE'],
    color: 'red'
  },

  CERTIFY: {
    label: 'CERTIFY',
    order: 1,
    description: 'Items submitted for CAQS §1.6 six-dimension verification',
    entryCriteria: [
      'question_state: "Unprocessed" or "In Audit"',
      'All READY criteria satisfied',
      'Quality Board review: PASS',
      'No known defects',
      'Not a known DL-012 clone'
    ],
    exitActions: ['CERTIFY', 'REMEDIATE'],
    color: 'blue'
  },

  ARCHIVE: {
    label: 'ARCHIVE',
    order: 0,
    description: 'Items removed from active pool (content preserved)',
    entryCriteria: [
      'DL-012 clone redundancy: marked for archival',
      'Or: Consolidated/retired by authorized decision',
      'Or: Duplicate QID in deliverable pool'
    ],
    exitActions: ['READY'],
    color: 'gray'
  }
};

const LANE_ORDER = ['ARCHIVE', 'CERTIFY', 'BLOCKED', 'REMEDIATE', 'READY'];

const DEFECT_ROUTING = {
  'DL-008': { targetLane: 'REMEDIATE', isBlocking: true, certifiedOnlyBlock: true },
  'DL-010': { targetLane: 'REMEDIATE', isBlocking: false },
  'DL-013': { targetLane: 'REMEDIATE', isBlocking: false },
  'DL-018': { targetLane: 'REMEDIATE', isBlocking: false },
  'DL-021': { targetLane: 'REMEDIATE', isBlocking: true },
  'DL-025': { targetLane: 'REMEDIATE', isBlocking: true },
  'DL-026': { targetLane: 'REMEDIATE', isBlocking: true },
  'DL-030': { targetLane: 'REMEDIATE', isBlocking: true },
  'DL-031': { targetLane: 'REMEDIATE', isBlocking: false },
  'DL-032': { targetLane: 'REMEDIATE', isBlocking: false },
  'DL-034': { targetLane: 'REMEDIATE', isBlocking: true },
  'IDENTITY_FAIL': { targetLane: 'BLOCKED', isBlocking: true },
  'PARSE_FAIL': { targetLane: 'BLOCKED', isBlocking: true },
  'GOVERNANCE_BLOCK': { targetLane: 'BLOCKED', isBlocking: true }
};

const RECOMMENDATION_ROUTING = {
  'REMEDIATE': { targetLane: 'REMEDIATE', description: 'Route to remediation queue' },
  'REVIEW': { targetLane: 'READY', description: 'Route for certification review board' },
  'ESCALATE': { targetLane: 'BLOCKED', description: 'Escalate to governance investigation' },
  'HOLD': { targetLane: 'BLOCKED', description: 'Hold pending further investigation' },
  'CERTIFY': { targetLane: 'CERTIFY', description: 'Route directly to certification board' },
  'ARCHIVE': { targetLane: 'ARCHIVE', description: 'Route to archival queue' }
};

const PRIORITY_MATRIX = {
  TIER_0_CRITICAL: { priority: 0, lane: 'BLOCKED', label: 'TIER 0 — Critical (immediate action)' },
  TIER_1_HIGH: { priority: 1, lane: 'REMEDIATE', label: 'TIER 1 — High (certification-blocking)' },
  TIER_2_MEDIUM: { priority: 2, lane: 'REMEDIATE', label: 'TIER 2 — Medium (quality improvement)' },
  TIER_3_LOW: { priority: 3, lane: 'READY', label: 'TIER 3 — Low (cosmetic/documentation)' }
};

function getLaneForDefect(defectType, isCertified) {
  const config = DEFECT_ROUTING[defectType];
  if (!config) return 'READY';

  if (config.certifiedOnlyBlock && !isCertified) {
    return 'REMEDIATE';
  }

  return config.targetLane;
}

function getLaneForRecommendation(recType) {
  const config = RECOMMENDATION_ROUTING[recType];
  if (!config) return 'READY';
  return config.targetLane;
}

function getPriorityForTier(tier) {
  const config = PRIORITY_MATRIX[tier];
  if (!config) return 99;
  return config.priority;
}

function validateLaneTransition(fromLane, toLane) {
  if (fromLane === toLane) return { valid: true, reason: 'No-op (same lane)' };

  const from = QUEUE_LANES[fromLane];
  if (!from) return { valid: false, reason: `Unknown source lane: ${fromLane}` };

  if (!from.exitActions.includes(toLane)) {
    return {
      valid: false,
      reason: `Invalid transition: ${fromLane} → ${toLane}. Allowed: ${from.exitActions.join(', ')}`,
      allowedTransitions: from.exitActions
    };
  }

  return { valid: true, reason: `${fromLane} → ${toLane} (valid transition)` };
}

module.exports = {
  QUEUE_LANES,
  LANE_ORDER,
  DEFECT_ROUTING,
  RECOMMENDATION_ROUTING,
  PRIORITY_MATRIX,
  getLaneForDefect,
  getLaneForRecommendation,
  getPriorityForTier,
  validateLaneTransition
};
