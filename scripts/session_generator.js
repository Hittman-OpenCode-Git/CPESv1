// S250.3 — Session Generator
// Converts work queue items into executable session packages.
// This is the final link in the operational pipeline:
//   Finding → Recommendation → Queue → Session Package → Execution
//
// Consumes: work_queue.json (post-routing), remediation_queue.json
// Optionally consumes: certification_candidates.json
// Produces: scripts/output/session_packages/*.json
//           scripts/output/session_package_index.json
//
// Session types generated:
//   REMEDIATION_SESSION — batch of items needing the same defect fix
//   CERTIFICATION_SESSION — batch of items ready for CAQS §1.6 review
//   INVESTIGATION_SESSION — individual blocked item investigation
//   ARCHIVE_SESSION — batch archival operation
//   READINESS_SESSION — batch of READY items for certification board
//
// Constraints enforced:
//   - Max 28 items per batch (governance-guard Rule 5)
//   - Backups required before any write (BACKUP_PROTOCOL.md)
//   - Within-pack batches preferred (avoids cross-pack writes)
//   - QuestionID preservation mandatory
//   - Explanations: minimum 50 char requirement (EV1)
//
// Run: node scripts/session_generator.js [--lane <name>] [--verbose]
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const qsm = require('./engine/queue_state_machine');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(__dirname, 'output');
const PACKAGES_DIR = path.join(OUTPUT_DIR, 'session_packages');
const MAX_BATCH_SIZE = 28;
const GOVERNANCE_GUARD_ENABLED = true;

const SESSION_TYPES = {
  REMEDIATION_SESSION: {
    label: 'REMEDIATION_SESSION',
    description: 'Batch of items needing the same defect fix',
    fromLanes: ['REMEDIATE'],
    requiredFields: ['qid', 'pack', 'defect_type', 'explanation_template'],
    preExecutionChecks: ['BACKUP_REQUIRED', 'GOVERNANCE_GUARD_RULE_5', 'IDENTITY_VALIDATOR'],
    postExecutionChecks: ['DL_008_RE_SCAN', 'REGRESSION_SUITE', 'REVISION_HISTORY']
  },
  CERTIFICATION_SESSION: {
    label: 'CERTIFICATION_SESSION',
    description: 'Batch of items for CAQS §1.6 six-dimension verification',
    fromLanes: ['CERTIFY', 'READY'],
    requiredFields: ['qid', 'pack', 'domain', 'current_state'],
    preExecutionChecks: ['GOVERNANCE_GUARD_RULE_2', 'DL_008_SCAN', 'IDENTITY_VALIDATOR'],
    postExecutionChecks: ['CERTIFIED_POOL_RECOUNT', 'REVISION_HISTORY', 'REGISTRY_UPDATE']
  },
  INVESTIGATION_SESSION: {
    label: 'INVESTIGATION_SESSION',
    description: 'Individual blocked item investigation',
    fromLanes: ['BLOCKED'],
    requiredFields: ['qid', 'pack', 'block_reason', 'investigation_steps'],
    preExecutionChecks: ['READ_ONLY', 'NO_WRITES'],
    postExecutionChecks: ['DEFECT_LIBRARY_UPDATE']
  },
  ARCHIVE_SESSION: {
    label: 'ARCHIVE_SESSION',
    description: 'Batch archival operation',
    fromLanes: ['ARCHIVE'],
    requiredFields: ['qid', 'pack', 'archive_reason', 'question_state'],
    preExecutionChecks: ['BACKUP_REQUIRED', 'GOVERNANCE_GUARD_RULE_3', 'QUESTION_STATE_CHANGE'],
    postExecutionChecks: ['REGISTRY_UPDATE', 'ARCHIVE_COUNT_RECOUNT', 'REVISION_HISTORY']
  },
  READINESS_SESSION: {
    label: 'READINESS_SESSION',
    description: 'Batch of READY items for certification board review',
    fromLanes: ['READY'],
    requiredFields: ['qid', 'pack', 'domain', 'readiness_score'],
    preExecutionChecks: ['IDENTITY_VALIDATOR', 'GOVERNANCE_GUARD_RULE_2'],
    postExecutionChecks: ['QUALITY_BOARD_DECISION', 'READINESS_SCORE_UPDATE']
  }
};

function loadWorkQueue() {
  const wqPath = path.join(OUTPUT_DIR, 'work_queue.json');
  if (!fs.existsSync(wqPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(wqPath, 'utf8'));
  } catch (e) {
    console.error(`Failed to load work queue: ${e.message}`);
    return null;
  }
}

function loadRemediationQueue() {
  const rqPath = path.join(OUTPUT_DIR, 'remediation_queue.json');
  if (!fs.existsSync(rqPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(rqPath, 'utf8'));
  } catch (e) {
    return null;
  }
}

let sessionIdCounter = 0;

function generateSessionId(sessionType, index) {
  sessionIdCounter++;
  const hash = crypto.createHash('sha256')
    .update(`${sessionType}-${index}-${Date.now()}-${sessionIdCounter}`)
    .digest('hex');
  return `S250-${sessionType.split('_')[0].substring(0, 4)}-${hash.substring(0, 6).toUpperCase()}`;
}

function createBatch(items, maxSize) {
  const batches = [];
  let currentBatch = [];
  let currentPack = null;

  for (const item of items) {
    if (currentBatch.length >= maxSize) {
      batches.push(currentBatch);
      currentBatch = [];
      currentPack = null;
    }

    if (currentPack && item.pack !== currentPack && currentBatch.length > 0) {
      if (currentBatch.length > 0) {
        batches.push(currentBatch);
        currentBatch = [];
      }
      currentPack = null;
    }

    currentBatch.push(item);
    currentPack = currentPack || item.pack;
  }

  if (currentBatch.length > 0) {
    batches.push(currentBatch);
  }

  return batches;
}

function buildRemediationSession(items, defectType, tier) {
  const timestamp = new Date().toISOString();
  const defectConfig = qsm.DEFECT_ROUTING[defectType] || {};

  const qids = items.map(i => i.qid);
  const pack = items[0]?.pack || '?';

  const session = {
    sessionId: generateSessionId('REMEDIATION', items.length),
    sessionType: 'REMEDIATION_SESSION',
    generatedTimestamp: timestamp,
    status: 'PENDING',
    defect: {
      type: defectType,
      tier,
      blocking: defectConfig.isBlocking || false,
      certifiedOnlyBlock: defectConfig.certifiedOnlyBlock || false
    },
    pack,
    qids,
    itemCount: qids.length,
    preExecutionChecks: [
      { step: 'BACKUP', description: 'Create timestamped backup per BACKUP_PROTOCOL.md', required: true },
      { step: 'GOVERNANCE_GUARD', description: 'Confirm Rule 5: batch ≤ 28 items', required: true },
      { step: 'IDENTITY_VALIDATOR', description: 'Run identity_validator.js on target pack', required: true },
      { step: 'VERIFY_QIDS', description: 'Confirm all QIDs exist in target pack', required: true }
    ],
    executionSteps: [],
    postExecutionChecks: [
      { step: 'DL_008_RESCAN', description: 'Re-scan for DL-008 on remediated items', required: true },
      { step: 'DL_026_RESCAN', description: 'Re-scan for DL-026 on remediated items if applicable', required: defectType === 'DL-026' },
      { step: 'REGRESSION_SUITE', description: 'Run governance guard test suite', required: true },
      { step: 'REVISION_HISTORY', description: 'Write REVISION_HISTORY.md entry', required: true }
    ],
    itemDetails: items.map(i => ({
      qid: i.qid,
      pack: i.pack,
      domain: i.domain,
      currentState: i.readiness_state,
      remediationDefect: i.remediation_defect,
      recommendations: i.recommendations || [],
      routes: i.routes || []
    }))
  };

  if (defectType === 'DL-008') {
    session.executionSteps = [
      { step: 1, action: 'Clear ExplanationWrong[CorrectChoice] field', field: `ExplanationWrong[CC]`, newValue: '""' },
      { step: 2, action: 'Verify ExplanationCorrect remains intact and contains full explanation' },
      { step: 3, action: 'Verify no content loss in distractor explanations' }
    ];
  } else if (defectType === 'DL-026') {
    session.executionSteps = [
      { step: 1, action: 'Author choice-specific distractor explanation for each empty non-CC slot' },
      { step: 2, action: 'Minimum 50 characters per EW field (EV1 compliance)' },
      { step: 3, action: 'Reference item Choices text, not metadata ChoiceA-D (DL-016 avoidance)' },
      { step: 4, action: 'Verify CorrectChoice slot remains empty (DL-008 compliance)' }
    ];
  } else if (defectType === 'DL-013') {
    session.executionSteps = [
      { step: 1, action: 'Replace template boilerplate with choice-specific distractor explanation' },
      { step: 2, action: 'Each explanation must reference the specific error in that choice' },
      { step: 3, action: 'Each explanation must identify the likely misconception' },
      { step: 4, action: 'Minimum 50 characters per field (EV1 compliance)' }
    ];
  }

  return session;
}

function buildCertificationSession(items) {
  const timestamp = new Date().toISOString();
  const qids = items.map(i => i.qid);
  const pack = items[0]?.pack || '?';
  const domains = [...new Set(items.map(i => i.domain))];

  return {
    sessionId: generateSessionId('CERTIFICATION', items.length),
    sessionType: 'CERTIFICATION_SESSION',
    generatedTimestamp: timestamp,
    status: 'PENDING',
    pack,
    domains,
    qids,
    itemCount: qids.length,
    preExecutionChecks: [
      { step: 'GOVERNANCE_GUARD_RULE_2', description: 'Confirm zero DL-008 on all items', required: true },
      { step: 'DL_008_SCAN', description: 'Run ExplanationValidator on target items', required: true },
      { step: 'IDENTITY_VALIDATOR', description: 'Run identity_validator.js on target pack', required: true },
      { step: 'DL_013_CHECK', description: 'Confirm no DL-013 boilerplate on items', required: true }
    ],
    verificationDimensions: [
      { dimension: 1, name: 'Correctness', description: 'Against GAAP / IFRS / ICMA CSO', required: true },
      { dimension: 2, name: 'Precision', description: 'Internal consistency, unambiguous fact pattern', required: true },
      { dimension: 3, name: 'Difficulty Calibration', description: 'Matches stated tier and LOS depth', required: true },
      { dimension: 4, name: 'Distractor Engineering', description: 'Each distractor maps to real misconception', required: true },
      { dimension: 5, name: 'Blueprint Alignment', description: 'Maps to specific Part 1 CSO LOS', required: true },
      { dimension: 6, name: 'CMA Part 1 Relevance', description: 'In scope, not accidentally Part 2', required: true }
    ],
    postExecutionChecks: [
      { step: 'CERTIFIED_POOL_RECOUNT', description: 'Re-count certified items via grep', required: true },
      { step: 'REVISION_HISTORY', description: 'Write certification batch entry with before/after counts', required: true },
      { step: 'REGISTRY_UPDATE', description: 'Update MASTER_QUESTION_REGISTRY.md if certified count changed', required: false }
    ],
    itemDetails: items.map(i => ({
      qid: i.qid,
      domain: i.domain,
      readinessState: i.readiness_state,
      readinessScore: i.readiness_score,
      certificationCandidate: i.certification_candidate
    }))
  };
}

function buildInvestigationSession(item) {
  const timestamp = new Date().toISOString();

  return {
    sessionId: generateSessionId('INVESTIGATION', 1),
    sessionType: 'INVESTIGATION_SESSION',
    generatedTimestamp: timestamp,
    status: 'PENDING',
    qid: item.qid,
    pack: item.pack,
    domain: item.domain,
    blockReason: item.reason || 'Unknown',
    defectFlags: item.defect_flags || [],
    governanceEvents: item.governance_events || [],
    preExecutionChecks: [
      { step: 'READ_ONLY', description: 'Investigation is read-only — no content writes', required: true },
      { step: 'NO_WRITES', description: 'Do not modify pack files during investigation', required: true }
    ],
    investigationSteps: [
      { step: 1, action: 'Direct file inspection of the item\'s JSON object' },
      { step: 2, action: 'Identify root cause of block' },
      { step: 3, action: 'Determine if block is genuine or a scan false positive (DL-016/029)' },
      { step: 4, action: 'Produce investigation report with findings and recommended disposition' }
    ],
    postExecutionChecks: [
      { step: 'DEFECT_LIBRARY_UPDATE', description: 'Log finding to DEFECT_LIBRARY.md if new defect discovered', required: true }
    ]
  };
}

function buildArchiveSession(items) {
  const timestamp = new Date().toISOString();
  const qids = items.map(i => i.qid);
  const pack = items[0]?.pack || '?';

  return {
    sessionId: generateSessionId('ARCHIVE', items.length),
    sessionType: 'ARCHIVE_SESSION',
    generatedTimestamp: timestamp,
    status: 'PENDING',
    pack,
    qids,
    itemCount: qids.length,
    preExecutionChecks: [
      { step: 'BACKUP', description: 'Create timestamped backup per BACKUP_PROTOCOL.md', required: true },
      { step: 'GOVERNANCE_GUARD_RULE_3', description: 'MASTER_QUESTION_REGISTRY.md will be auto-generated after archival', required: false },
      { step: 'QUESTION_STATE', description: 'Confirm question_state will change to "Archived"', required: true }
    ],
    executionSteps: [
      { step: 1, action: 'Set question_state: "Archived" on all target QIDs' },
      { step: 2, action: 'Content preserved — no deletion of stems, choices, or explanations' },
      { step: 3, action: 'Record archive reason per item' }
    ],
    postExecutionChecks: [
      { step: 'REGISTRY_UPDATE', description: 'Rebuild MASTER_QUESTION_REGISTRY.md', required: true },
      { step: 'ARCHIVE_COUNT', description: 'Confirm archived count matches expected', required: true },
      { step: 'REVISION_HISTORY', description: 'Write REVISION_HISTORY.md entry', required: true }
    ],
    itemDetails: items.map(i => ({
      qid: i.qid,
      domain: i.domain,
      currentState: i.readiness_state,
      archiveReason: i.reason || 'Unspecified'
    }))
  };
}

function generateSessionPackages(workQueue, filterLane) {
  const timestamp = new Date().toISOString();

  if (!workQueue || !workQueue.lanes) {
    return {
      specId: 'SESSION250_SESSION_GENERATOR',
      board: 'C',
      generatedTimestamp: timestamp,
      error: 'No work queue available',
      packages: []
    };
  }

  const packages = [];
  const lanes = filterLane ? [filterLane] : qsm.LANE_ORDER;

  for (const lane of lanes) {
    const items = (workQueue.lanes[lane] || []).filter(i => i.qid);

    if (items.length === 0) continue;

    if (lane === 'REMEDIATE') {
      const byDefect = {};
      for (const item of items) {
        const defect = item.remediation_defect || item.defect_flags?.[0] || 'DL-013';
        if (!byDefect[defect]) byDefect[defect] = [];
        byDefect[defect].push(item);
      }

      for (const [defectType, defectItems] of Object.entries(byDefect)) {
        const tier = defectItems[0]?.remediation_tier || 'TIER_2_MEDIUM';
        const batches = createBatch(defectItems, MAX_BATCH_SIZE);

        for (let i = 0; i < batches.length; i++) {
          const batch = batches[i];
          const session = buildRemediationSession(batch, defectType, tier);
          session.batchIndex = i + 1;
          session.totalBatches = batches.length;
          packages.push(session);
        }
      }
    }

    else if (lane === 'CERTIFY' || lane === 'READY') {
      const certItems = items.filter(i => i.certification_candidate || i.readiness_state === 'READY' || i.readiness_state === 'CERTIFY');
      if (certItems.length === 0) continue;

      const byPack = {};
      for (const item of certItems) {
        const pack = item.pack || '?';
        if (!byPack[pack]) byPack[pack] = [];
        byPack[pack].push(item);
      }

      for (const [packName, packItems] of Object.entries(byPack)) {
        const batches = createBatch(packItems, MAX_BATCH_SIZE);
        for (let i = 0; i < batches.length; i++) {
          const batch = batches[i];
          const session = buildCertificationSession(batch);
          session.batchIndex = i + 1;
          session.totalBatches = batches.length;
          session.sourceLane = lane;
          packages.push(session);
        }
      }
    }

    else if (lane === 'BLOCKED') {
      for (const item of items) {
        packages.push(buildInvestigationSession(item));
      }
    }

    else if (lane === 'ARCHIVE') {
      const byPack = {};
      for (const item of items) {
        const pack = item.pack || '?';
        if (!byPack[pack]) byPack[pack] = [];
        byPack[pack].push(item);
      }

      for (const [packName, packItems] of Object.entries(byPack)) {
        const batches = createBatch(packItems, MAX_BATCH_SIZE);
        for (let i = 0; i < batches.length; i++) {
          const batch = batches[i];
          const session = buildArchiveSession(batch);
          session.batchIndex = i + 1;
          session.totalBatches = batches.length;
          packages.push(session);
        }
      }
    }
  }

  const index = {
    specId: 'SESSION250_SESSION_PACKAGE_INDEX',
    board: 'C',
    generatedTimestamp: timestamp,
    totalPackages: packages.length,
    byType: {
      REMEDIATION_SESSION: packages.filter(p => p.sessionType === 'REMEDIATION_SESSION').length,
      CERTIFICATION_SESSION: packages.filter(p => p.sessionType === 'CERTIFICATION_SESSION').length,
      INVESTIGATION_SESSION: packages.filter(p => p.sessionType === 'INVESTIGATION_SESSION').length,
      ARCHIVE_SESSION: packages.filter(p => p.sessionType === 'ARCHIVE_SESSION').length
    },
    byStatus: {
      PENDING: packages.filter(p => p.status === 'PENDING').length,
      READY: 0,
      EXECUTING: 0,
      COMPLETED: 0,
      FAILED: 0
    },
    totalItemsInPackages: packages.reduce((sum, p) => sum + (p.itemCount || 1), 0),
    totalQids: packages.reduce((sum, p) => sum + (p.qids?.length || 0), 0),
    packages: packages.map(p => ({
      sessionId: p.sessionId,
      sessionType: p.sessionType,
      pack: p.pack,
      itemCount: p.itemCount,
      defect: p.defect?.type,
      lane: p.sourceLane,
      status: p.status,
      batchIndex: p.batchIndex,
      totalBatches: p.totalBatches
    }))
  };

  return { index, packages };
}

function writePackageFiles(index, packages) {
  if (!fs.existsSync(PACKAGES_DIR)) {
    fs.mkdirSync(PACKAGES_DIR, { recursive: true });
  }

  for (const pkg of packages) {
    const filePath = path.join(PACKAGES_DIR, `${pkg.sessionId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2), 'utf8');
  }

  const indexPath = path.join(OUTPUT_DIR, 'session_package_index.json');
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf8');
}

function main() {
  const args = process.argv.slice(2);
  const verbose = args.includes('--verbose');
  const jsonOnly = args.includes('--json');

  const laneIdx = args.indexOf('--lane');
  const filterLane = laneIdx !== -1 ? args[laneIdx + 1] : null;

  if (!jsonOnly) {
    console.log('=== S250.3 Session Generator ===\n');
    if (filterLane) {
      console.log(`Filter lane: ${filterLane}`);
    }
  }

  const workQueue = loadWorkQueue();
  if (!workQueue) {
    console.log('No work queue found. Run work_queue_manager.js first.');
    return null;
  }

  if (!jsonOnly) {
    const laneCounts = {};
    for (const lane of qsm.LANE_ORDER) {
      laneCounts[lane] = (workQueue.lanes[lane] || []).length;
    }
    console.log(`Queue items available: ${Object.values(laneCounts).reduce((a, b) => a + b, 0)}`);
    for (const [lane, count] of Object.entries(laneCounts)) {
      console.log(`  [${lane}]: ${count}`);
    }
  }

  const { index, packages } = generateSessionPackages(workQueue, filterLane);

  if (!jsonOnly) {
    console.log(`\nGenerated ${packages.length} session packages:`);
    for (const [type, count] of Object.entries(index.byType)) {
      if (count > 0) console.log(`  ${type}: ${count}`);
    }
    console.log(`Total items across all packages: ${index.totalItemsInPackages}`);
    console.log(`Total unique QIDs: ${index.totalQids}`);
  }

  writePackageFiles(index, packages);

  if (!jsonOnly) {
    console.log(`\nSession package files written to: ${PACKAGES_DIR}`);
    console.log(`Session package index written to: ${path.join(OUTPUT_DIR, 'session_package_index.json')}`);
  }

  return { index, packages };
}

if (require.main === module) {
  const result = main();
  const jsonOnly = process.argv.includes('--json');
  if (jsonOnly) {
    console.log(JSON.stringify(result?.index || {}, null, 2));
  }
}

module.exports = { generateSessionPackages, SESSION_TYPES, createBatch };
