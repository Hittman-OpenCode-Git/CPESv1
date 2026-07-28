// S250.2 — Recommendation Auto Router
// Routes findings, recommendations, governance events, and challenges
// into the correct work queue lanes before S250.1 queue assembly.
//
// Input chain:
//   recommendation_registry.json → REMEDIATE / READY / BLOCKED / CERTIFY / ARCHIVE
//   governance_event_registry.json → BLOCKED entries
//   challenge_registry.json → INVESTIGATION entries (sub-lane of BLOCKED)
//   certification_scan_artifact.json → per-item gate results for routing enrichment
//
// Output: scripts/output/recommendation_routing.json
//
// Routing rules sourced from: engine/queue_state_machine.js
//   RECOMMENDATION_ROUTING, DEFECT_ROUTING, PRIORITY_MATRIX
//
// Run: node scripts/recommendation_auto_router.js [--verbose] [--json]
const fs = require('fs');
const path = require('path');
const qsm = require('./engine/queue_state_machine');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(__dirname, 'output');
const KNOWLEDGE_DIR = path.join(ROOT, 'knowledge');

const INPUT_FILES = {
  recommendations: 'recommendation_registry.json',
  governance: 'governance_event_registry.json',
  challenges: 'challenge_registry.json',
  scanArtifact: 'certification_scan_artifact.json'
};

const ROUTING_CHAINS = {
  'DL-008_CHAIN': {
    description: 'Routing via severity + certification state from scan artifact',
    rules: ['severity=CRITICAL → REMEDIATE (blocking on Certified)', 'severity=HIGH → REMEDIATE']
  },
  'DL-026_CHAIN': {
    description: 'Empty non-CC ExplanationWrong slots — routed by severity',
    rules: ['severity=CRITICAL → REMEDIATE (blocking)', 'severity=HIGH → REMEDIATE (blocking)']
  },
  'DL-013_CHAIN': {
    description: 'Template boilerplate — routed by type',
    rules: ['REVIEW → READY (non-blocking)', 'REMEDIATE → REMEDIATE']
  },
  'EV3_CHAIN': {
    description: 'Missing accounting principle citation → routed by severity',
    rules: ['MEDIUM → READY (quality improvement, non-blocking)']
  },
  'INVESTIGATION_CHAIN': {
    description: 'OPEN/INVESTIGATING challenges → BLOCKED lane for read-only investigation',
    rules: ['OPEN → BLOCKED (investigation required)', 'INVESTIGATING → BLOCKED (in-progress)']
  },
  'GOVERNANCE_CHAIN': {
    description: 'Governance events with VIOLATION type → BLOCKED',
    rules: ['VIOLATION → BLOCKED', 'WARNING → REMEDIATE']
  }
};

function loadJson(fileName) {
  const filePath = path.join(OUTPUT_DIR, fileName);
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function loadInputs() {
  const inputs = {};
  for (const [key, fileName] of Object.entries(INPUT_FILES)) {
    inputs[key] = loadJson(fileName);
  }
  return inputs;
}

function determineRoutingChain(recType, sourceScan, severity) {
  const chains = [];

  if (sourceScan === 'DL-008') {
    chains.push('DL-008_CHAIN');
  }
  if (sourceScan === 'DL-026') {
    chains.push('DL-026_CHAIN');
  }
  if (sourceScan === 'DL-013') {
    chains.push('DL-013_CHAIN');
  }
  if (sourceScan === 'EV3') {
    chains.push('EV3_CHAIN');
  }

  return chains;
}

function getTargetLane(recType, severity, sourceScan, qsmRouting) {
  if (sourceScan === 'DL-008' && severity === 'CRITICAL') {
    return 'REMEDIATE';
  }
  if (sourceScan === 'DL-008' && severity === 'HIGH') {
    return 'REMEDIATE';
  }
  if (sourceScan === 'DL-026') {
    return 'REMEDIATE';
  }
  if (sourceScan === 'DL-013') {
    return recType === 'REMEDIATE' ? 'REMEDIATE' : 'READY';
  }
  if (sourceScan === 'EV3') {
    return recType === 'REMEDIATE' ? 'REMEDIATE' : 'READY';
  }

  const routeConfig = qsm.RECOMMENDATION_ROUTING[recType];
  if (routeConfig) return routeConfig.targetLane;

  return 'READY';
}

function getPriority(severity, sourceScan) {
  if (severity === 'CRITICAL') return 0;
  if (severity === 'HIGH') return 1;
  if (severity === 'MEDIUM') return 2;
  if (severity === 'LOW') return 3;
  return 2;
}

function generateRoutingReason(recType, severity, sourceScan, targetLane, chains) {
  const chainLabel = chains.length > 0 ? chains.join(', ') : 'DEFAULT';
  return `Auto-routed by type=${recType}, severity=${severity}, source=${sourceScan} → ${targetLane} [${chainLabel}]`;
}

function routeRecommendations(inputs) {
  const registry = inputs.recommendations;
  if (!registry || !registry.recommendations) return [];

  const routingEntries = [];

  for (const rec of registry.recommendations) {
    const recType = rec.type || 'REMEDIATE';
    const severity = rec.severity || 'MEDIUM';
    const sourceScan = rec.sourceScan || 'UNKNOWN';
    const qids = rec.questionIds || [];

    const chains = determineRoutingChain(recType, sourceScan, severity);
    const targetLane = getTargetLane(recType, severity, sourceScan);
    const priority = getPriority(severity, sourceScan);
    const routingReason = generateRoutingReason(recType, severity, sourceScan, targetLane, chains);

    routingEntries.push({
      recId: rec.recommendationId,
      type: recType,
      severity,
      sourceScan,
      description: rec.description,
      targetLane,
      priority,
      questionIds: qids,
      questionCount: qids.length,
      routingRules: chains,
      routingReason,
      resolutionNote: null,
      routeTimestamp: new Date().toISOString()
    });
  }

  return routingEntries;
}

function routeGovernanceEvents(inputs) {
  const governance = inputs.governance;
  if (!governance || !governance.events) return [];

  const routingEntries = [];

  for (const evt of governance.events) {
    if (evt.status === 'CLOSED' || evt.status === 'RESOLVED') continue;

    const targetLane = evt.type === 'VIOLATION' ? 'BLOCKED' : 'REMEDIATE';
    const priority = evt.severity === 'HIGH' ? 1 : 2;
    const chains = ['GOVERNANCE_CHAIN'];

    routingEntries.push({
      recId: evt.id,
      type: 'GOVERNANCE',
      severity: evt.severity || 'MEDIUM',
      sourceScan: 'GOVERNANCE',
      description: evt.summary || 'Governance event',
      targetLane,
      priority,
      questionIds: evt.questionIds || [],
      questionCount: (evt.questionIds || []).length,
      routingRules: chains,
      routingReason: `Auto-routed: ${evt.type} → ${targetLane} [GOVERNANCE_CHAIN]`,
      resolutionNote: evt.resolution || null,
      routeTimestamp: new Date().toISOString()
    });
  }

  return routingEntries;
}

function routeChallenges(inputs) {
  const challengeRegistry = inputs.challenges;
  if (!challengeRegistry || !challengeRegistry.challenges) return [];

  const routingEntries = [];

  for (const ch of challengeRegistry.challenges) {
    if (ch.status === 'CLOSED' || ch.status === 'DISMISSED' || ch.status === 'RESOLVED') continue;

    const targetLane = 'BLOCKED';
    const priority = ch.priority === 'HIGH' ? 1 : ch.priority === 'CRITICAL' ? 0 : 2;
    const chains = ['INVESTIGATION_CHAIN'];

    routingEntries.push({
      recId: ch.challengeId,
      type: 'INVESTIGATION',
      severity: ch.priority || 'MEDIUM',
      sourceScan: ch.type || 'CHALLENGE',
      description: ch.studentDescription || 'Student-reported challenge',
      targetLane,
      priority,
      questionIds: [ch.questionId].filter(Boolean),
      questionCount: ch.questionId ? 1 : 0,
      routingRules: chains,
      routingReason: `Auto-routed: challenge status=${ch.status}, type=${ch.type} → ${targetLane} [INVESTIGATION_CHAIN]`,
      resolutionNote: null,
      routeTimestamp: new Date().toISOString()
    });
  }

  return routingEntries;
}

function buildRoutingManifest(inputs) {
  const timestamp = new Date().toISOString();

  const recRoutes = routeRecommendations(inputs);
  const govRoutes = routeGovernanceEvents(inputs);
  const challengeRoutes = routeChallenges(inputs);

  const allRoutes = [...recRoutes, ...govRoutes, ...challengeRoutes];

  const byLane = {};
  for (const lane of qsm.LANE_ORDER) {
    byLane[lane] = allRoutes.filter(r => r.targetLane === lane).length;
  }
  byLane['INVESTIGATION'] = challengeRoutes.length;

  let totalQuestionsRouted = 0;
  const routedQids = new Set();
  for (const entry of allRoutes) {
    for (const qid of entry.questionIds) {
      totalQuestionsRouted++;
      routedQids.add(qid);
    }
  }

  const bySource = {};
  for (const entry of allRoutes) {
    const source = entry.sourceScan || 'UNKNOWN';
    bySource[source] = (bySource[source] || 0) + 1;
  }

  return {
    specId: 'SESSION250_RECOMMENDATION_AUTO_ROUTER',
    board: 'B',
    generatedTimestamp: timestamp,
    inputSources: {
      recommendationRegistry: !!inputs.recommendations,
      governanceRegistry: !!inputs.governance,
      challengeRegistry: !!inputs.challenges,
      scanArtifact: !!inputs.scanArtifact
    },
    summary: {
      totalRoutingEntries: allRoutes.length,
      byLane,
      totalQuestionsRouted,
      uniqueQuestionsRouted: routedQids.size,
      bySource
    },
    routingEntries: allRoutes
  };
}

function validate(inputs) {
  const warnings = [];
  const errors = [];

  if (!inputs.recommendations) {
    warnings.push('recommendation_registry.json not found — no recommendations to route');
  } else if (!inputs.recommendations.recommendations || inputs.recommendations.recommendations.length === 0) {
    warnings.push('recommendation_registry.json has zero recommendations');
  }

  if (!inputs.governance) {
    warnings.push('governance_event_registry.json not found');
  }

  if (!inputs.challenges) {
    warnings.push('challenge_registry.json not found');
  }

  if (!inputs.scanArtifact) {
    warnings.push('certification_scan_artifact.json not found — routing enrichment disabled');
  }

  return { errors, warnings };
}

function main() {
  const args = process.argv.slice(2);
  const verbose = args.includes('--verbose');
  const jsonOnly = args.includes('--json');

  if (!jsonOnly) {
    console.log('=== S250.2 Recommendation Auto Router ===\n');
  }

  const inputs = loadInputs();

  const { errors, warnings } = validate(inputs);

  if (!jsonOnly) {
    const availInputs = Object.entries(inputs).filter(([, v]) => v !== null);
    console.log(`Input sources: ${availInputs.length}/4 available`);
    for (const [key] of availInputs) {
      const data = inputs[key];
      const count = data?.recommendations?.length || data?.events?.length || data?.challenges?.length || 0;
      console.log(`  ${INPUT_FILES[key]}: ${count} entries`);
    }

    if (warnings.length > 0) {
      console.log(`\nWarnings (${warnings.length}):`);
      for (const w of warnings) console.log(`  ! ${w}`);
    }
    if (errors.length > 0) {
      console.log(`\nErrors (${errors.length}):`);
      for (const e of errors) console.log(`  X ${e}`);
    }
  }

  const manifest = buildRoutingManifest(inputs);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const outputPath = path.join(OUTPUT_DIR, 'recommendation_routing.json');
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2), 'utf8');

  if (!jsonOnly) {
    console.log(`\nRouting complete:`);
    console.log(`  Total entries: ${manifest.summary.totalRoutingEntries}`);
    console.log(`  Questions routed: ${manifest.summary.totalQuestionsRouted} (${manifest.summary.uniqueQuestionsRouted} unique)`);
    console.log(`\n  By lane:`);
    for (const [lane, count] of Object.entries(manifest.summary.byLane)) {
      if (count > 0) console.log(`    [${lane}]: ${count}`);
    }
    console.log(`\nOutput written to: ${outputPath}`);
    console.log(`File size: ${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB`);
  }

  return manifest;
}

if (require.main === module) {
  const result = main();
  const jsonOnly = process.argv.includes('--json');
  if (jsonOnly) {
    console.log(JSON.stringify(result, null, 2));
  }
}

module.exports = { routeRecommendations, routeGovernanceEvents, routeChallenges, buildRoutingManifest };
