// S250.1 — Work Queue Manager
// Builds unified 5-lane queue from all scan/candidate/readiness/remediation outputs.
// Consumes: certification_scan_artifact.json, remediation_queue.json,
//           readiness_scoring.json, certification_candidates.json,
//           recommendation_registry.json, governance_event_registry.json
// Produces: scripts/output/work_queue.json
//
// Lanes: ARCHIVE | CERTIFY | BLOCKED | REMEDIATE | READY
//
// Run: node scripts/work_queue_manager.js [--json] [--verbose]
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const qsm = require('./engine/queue_state_machine');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(__dirname, 'output');
const KNOWLEDGE_DIR = path.join(ROOT, 'knowledge');

const INPUT_FILES = [
  'certification_scan_artifact.json',
  'remediation_queue.json',
  'readiness_scoring.json',
  'certification_candidates.json',
  'recommendation_registry.json',
  'governance_event_registry.json',
  'identity_validation_report.json'
];

function loadJson(fileName) {
  const filePath = path.join(OUTPUT_DIR, fileName);
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.error(`Failed to parse ${fileName}: ${e.message}`);
    return null;
  }
}

function loadInputs() {
  const inputs = {};
  for (const fileName of INPUT_FILES) {
    inputs[fileName] = loadJson(fileName);
  }
  return inputs;
}

function buildItemIndex(inputs) {
  const index = {};

  const scanArtifact = inputs['certification_scan_artifact.json'];
  if (scanArtifact && scanArtifact.perItemResults) {
    for (const item of scanArtifact.perItemResults) {
      const qid = item.qid || item.QuestionID;
      if (!qid) continue;
      if (!index[qid]) index[qid] = { qid };

      index[qid].gate_results = {
        gateNeg1: item.gateNeg1,
        gate0: item.gate0,
        gate1: item.gate1,
        gate2: item.gate2,
        gate3: item.gate3,
        gate4: item.gate4
      };
      index[qid].defect_flags = item.defectFlags || item.defects || [];
      index[qid].scan_status = item.status || item.readinessState;
      index[qid].pack = item.pack || (item.qid ? item.qid.split('-')[0] : '?');
    }
  }

  const remediation = inputs['remediation_queue.json'];
  if (remediation && remediation.queues) {
    for (const queue of remediation.queues) {
      for (const itemQid of (queue.items || [])) {
        if (!index[itemQid]) index[itemQid] = { qid: itemQid };
        index[itemQid].remediation_defect = queue.defectType;
        index[itemQid].remediation_tier = queue.tier;
        index[itemQid].remediation_priority = queue.priority;
        index[itemQid].remediation_queue_id = queue.queueId;
        index[itemQid].blocking_certification = queue.blockingCertification || false;
      }
    }
  }

  const readiness = inputs['readiness_scoring.json'];
  if (readiness && readiness.items) {
    for (const item of readiness.items) {
      const qid = item.qid || item.QuestionID;
      if (!qid) continue;
      if (!index[qid]) index[qid] = { qid };
      index[qid].readiness_state = item.readinessState || item.state;
      index[qid].readiness_score = item.readinessScore;
      index[qid].domain = item.domain || item.section || '?';
      index[qid].pack = item.pack || index[qid].pack || '?';
    }
  }

  const candidates = inputs['certification_candidates.json'];
  if (candidates && candidates.candidates) {
    for (const c of candidates.candidates) {
      const qid = c.qid || c.QuestionID;
      if (!qid) continue;
      if (!index[qid]) index[qid] = { qid };
      index[qid].certification_candidate = true;
      index[qid].candidate_score = c.score;
      index[qid].candidate_tier = c.tier;
    }
  }

  const recommendations = inputs['recommendation_registry.json'];
  if (recommendations && recommendations.recommendations) {
    for (const rec of recommendations.recommendations) {
      const qids = rec.questionIds || rec.qids || [];
      for (const qid of qids) {
        if (!index[qid]) index[qid] = { qid };
        if (!index[qid].recommendations) index[qid].recommendations = [];
        index[qid].recommendations.push({
          recId: rec.recId || rec.id,
          type: rec.type,
          severity: rec.severity,
          description: rec.description
        });
      }
    }
  }

  const events = inputs['governance_event_registry.json'];
  if (events && events.events) {
    for (const evt of events.events) {
      const qid = evt.qid || evt.questionId;
      if (!qid) continue;
      if (!index[qid]) index[qid] = { qid };
      if (!index[qid].governance_events) index[qid].governance_events = [];
      index[qid].governance_events.push({
        eventId: evt.eventId || evt.id,
        rule: evt.rule,
        level: evt.level,
        status: evt.status
      });
    }
  }

  return index;
}

function classifyItem(qid, data) {
  const defects = data.defect_flags || [];
  const remediationDefect = data.remediation_defect;
  const readinessState = data.readiness_state;
  const gateNeg1 = data.gate_results?.gateNeg1;
  const isCertified = data.readiness_state === 'CERTIFY';

  if (remediationDefect === 'DL-034') {
    return { lane: 'BLOCKED', reason: 'DL-034: Missing structural fields — TIER 0 CRITICAL' };
  }

  if (gateNeg1 === 'FAIL' || gateNeg1 === 'HARD_BLOCK') {
    return { lane: 'BLOCKED', reason: 'Gate -1 Identity Validation: FAILED' };
  }

  if (defects.includes('DL-008') && isCertified) {
    return { lane: 'BLOCKED', reason: 'DL-008 on Certified item: governance Rule 2 BLOCK' };
  }

  const blockingDefects = ['DL-008', 'DL-025', 'DL-026', 'DL-021', 'DL-030', 'DL-034'];
  const hasBlocking = defects.some(d => blockingDefects.includes(d));

  if (hasBlocking) {
    return { lane: 'REMEDIATE', reason: `Blocking defect(s): ${defects.filter(d => blockingDefects.includes(d)).join(', ')}` };
  }

  if (defects.includes('DL-013') || defects.includes('DL-031') || defects.includes('DL-032')) {
    return { lane: 'REMEDIATE', reason: `Non-blocking defect(s): ${defects.join(', ')}` };
  }

  if (readinessState === 'CERTIFY') {
    return { lane: 'CERTIFY', reason: 'Readiness state: CERTIFY — awaiting Quality Board' };
  }

  if (readinessState === 'READY') {
    return { lane: 'READY', reason: 'All gates pass — ready for certification review' };
  }

  if (readinessState === 'REMEDIATE' || readinessState === 'MINOR_FIX') {
    return { lane: 'REMEDIATE', reason: `Readiness state: ${readinessState}` };
  }

  if (readinessState === 'BLOCKED') {
    return { lane: 'BLOCKED', reason: 'Readiness state: BLOCKED' };
  }

  return { lane: 'READY', reason: 'No defects, gates pass — default READY' };
}

function buildWorkQueue(inputs) {
  const timestamp = new Date().toISOString();
  const index = buildItemIndex(inputs);

  const lanes = {};
  for (const laneName of qsm.LANE_ORDER) {
    lanes[laneName] = [];
  }

  let totalItems = 0;
  const itemsByLane = {};

  for (const [qid, data] of Object.entries(index)) {
    totalItems++;
    const classification = classifyItem(qid, data);
    const lane = classification.lane;

    if (!lanes[lane]) lanes[lane] = [];

    lanes[lane].push({
      qid,
      pack: data.pack || '?',
      domain: data.domain || '?',
      lane,
      reason: classification.reason,
      defect_flags: data.defect_flags || [],
      readiness_state: data.readiness_state,
      remediation_defect: data.remediation_defect,
      remediation_tier: data.remediation_tier,
      certification_candidate: data.certification_candidate || false,
      recommendations: data.recommendations || [],
      governance_events: data.governance_events || [],
      route_timestamp: timestamp
    });
  }

  for (const lane of qsm.LANE_ORDER) {
    itemsByLane[lane] = lanes[lane].length;
  }

  const priorityOrder = ['BLOCKED', 'REMEDIATE', 'CERTIFY', 'READY', 'ARCHIVE'];
  const statistics = {
    totalItems,
    itemsByLane,
    priorityDistribution: {},
    breakdownByDomain: {},
    blockedCount: itemsByLane['BLOCKED'] || 0,
    remediationCount: itemsByLane['REMEDIATE'] || 0,
    readyCount: itemsByLane['READY'] || 0,
    certifyCount: itemsByLane['CERTIFY'] || 0,
    archiveCount: itemsByLane['ARCHIVE'] || 0
  };

  for (const lane of priorityOrder) {
    statistics.priorityDistribution[lane] = itemsByLane[lane] || 0;
  }

  for (const [qid, data] of Object.entries(index)) {
    const dom = data.domain || '?';
    if (!statistics.breakdownByDomain[dom]) {
      statistics.breakdownByDomain[dom] = { BLOCKED: 0, REMEDIATE: 0, READY: 0, CERTIFY: 0, ARCHIVE: 0 };
    }
    statistics.breakdownByDomain[dom][classifyItem(qid, data).lane]++;
  }

  const output = {
    specId: 'SESSION250_WORK_QUEUE_MANAGER',
    board: 'A',
    generatedTimestamp: timestamp,
    inputSources: Object.keys(inputs).filter(k => inputs[k] !== null),
    lanes,
    laneConfiguration: qsm.QUEUE_LANES,
    statistics,
    summary: `S250.1 Work Queue: ${totalItems} items across 5 lanes. ` +
      `${statistics.blockedCount} BLOCKED, ${statistics.remediationCount} REMEDIATE, ` +
      `${statistics.readyCount} READY, ${statistics.certifyCount} CERTIFY, ${statistics.archiveCount} ARCHIVE.`
  };

  return output;
}

function main() {
  const args = process.argv.slice(2);
  const verbose = args.includes('--verbose');
  const jsonOnly = args.includes('--json');

  if (!jsonOnly) {
    console.log('=== S250.1 Work Queue Manager ===\n');
  }

  const inputs = loadInputs();
  const availableInputs = Object.keys(inputs).filter(k => inputs[k] !== null);

  if (!jsonOnly) {
    console.log(`Input sources loaded: ${availableInputs.length}/${INPUT_FILES.length}`);
    for (const k of availableInputs) {
      const data = inputs[k];
      const itemCount = data?.perItemResults?.length || data?.queues?.length || data?.recommendations?.length || data?.candidates?.length || 0;
      console.log(`  ${k}: ${itemCount} entries`);
    }
  }

  const missing = INPUT_FILES.filter(f => !inputs[f]);
  if (missing.length > 0) {
    if (!jsonOnly) console.log(`\nMissing inputs: ${missing.join(', ')}`);
  }

  const output = buildWorkQueue(inputs);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const outputPath = path.join(OUTPUT_DIR, 'work_queue.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');

  if (!jsonOnly) {
    console.log(`\n${output.summary}`);
    console.log(`\nLane distribution:`);
    for (const lane of qsm.LANE_ORDER) {
      const count = output.statistics.itemsByLane[lane] || 0;
      const config = qsm.QUEUE_LANES[lane];
      const colorLabel = config ? config.color : 'white';
      console.log(`  [${lane}]: ${count} items (${colorLabel})`);
    }

    console.log(`\nOutput written to: ${outputPath}`);
    console.log(`File size: ${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB`);
  }

  return output;
}

if (require.main === module) {
  const result = main();
  const jsonOnly = process.argv.includes('--json');
  if (jsonOnly) {
    console.log(JSON.stringify(result, null, 2));
  }
}

module.exports = { buildWorkQueue, classifyItem, buildItemIndex };
