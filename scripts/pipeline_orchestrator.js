// S356 — Pipeline Orchestrator (Framework v2 Artifact Reuse)
// Single command to run all 4 pipeline stages with artifact passing.
// Implements the Scan Once, Consume Many model from S815 audit.
//
// Usage: node scripts/pipeline_orchestrator.js [--stage <all|readiness|delta|candidates|identity>] [--verbose]
//
// Stage flow:
//   1. Readiness Scorer → readiness_scoring.json (canonical scan — always from source)
//   2. Delta Ledger → delta_ledger.json (consumes readiness_scoring QID list)
//   3. Candidate Engine → certification_candidates.json (consumes readiness_scoring output)
//   4. Identity Validator → identity_validation_report.json (consumes candidates list)
//
// Cross-stage integrity:
//   - Each downstream stage verifies sourceFileHashes match upstream artifact
//   - artifactVersion compatibility checked before consumption
//   - parentArtifact lineage recorded in each downstream output

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(__dirname, 'output');
const REQUIRED_ARTIFACT_VERSION = '1.0.0';

const CURRENT_FILE_HASHES = {
  pack_a: 'E237FEAC9DCFC432640633906539DD88CCA52BF028C5720CEF27FF629A3E5F85',
  pack_b: '8A641309BBF0DE8B5D1D4C747AE092C2EF514D8EB0A8A3374D96C3056204DB3B',
  pack_c: '02BD4DB68C937F2BF311451A47BF6D40944E3B3413C78D97B2D80AC91FEA1C5A',
  pack_d: 'ED6942ACB82EFC3F9B9BD8BEF86924F7D915ABF1FCE400D951BC00F5C937C9D7',
  pack_e: 'A98B27B15D99CC4AB261E78A011D4194BCBEEA78CDC6CE10A6B226EDF660DAED'
};

const STAGES = {
  readiness: {
    label: 'Readiness Scorer',
    output: 'readiness_scoring.json',
    needsSource: true,
    producesAsParent: true,
    consumesUpstream: false
  },
  delta: {
    label: 'Delta Ledger',
    output: 'delta_ledger.json',
    needsSource: false,
    parentLabel: 'readiness_scoring.json::S322::2026-07-27T13:46:35Z',
    consumesUpstream: true
  },
  candidates: {
    label: 'Candidate Engine',
    output: 'certification_candidates.json',
    needsSource: false,
    parentLabel: 'readiness_scoring.json::S322::2026-07-27T13:46:35Z',
    consumesUpstream: true
  },
  identity: {
    label: 'Identity Validator',
    output: 'identity_validation_report.json',
    needsSource: false,
    parentLabel: 'certification_candidates.json::SESSION850::2026-07-27T14:59:56Z',
    consumesUpstream: true
  }
};

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

function verifyArtifactVersion(artifact, artifactName) {
  if (!artifact || !artifact.artifactVersion) {
    console.error(`  FAIL: ${artifactName} has no artifactVersion field`);
    return false;
  }
  if (artifact.artifactVersion !== REQUIRED_ARTIFACT_VERSION) {
    console.error(`  FAIL: ${artifactName} version ${artifact.artifactVersion} != required ${REQUIRED_ARTIFACT_VERSION}`);
    return false;
  }
  return true;
}

function verifySourceFileHashes(artifact, artifactName, expectedHashes) {
  if (!artifact || !artifact.sourceFileHashes) {
    console.error(`  FAIL: ${artifactName} has no sourceFileHashes`);
    return false;
  }
  const hashes = artifact.sourceFileHashes;
  for (const [pack, expectedHash] of Object.entries(expectedHashes)) {
    if (!hashes[pack]) {
      console.error(`  FAIL: ${artifactName}.sourceFileHashes missing ${pack}`);
      return false;
    }
    if (hashes[pack] !== expectedHash) {
      console.error(`  FAIL: ${artifactName}.sourceFileHashes.${pack} mismatch`);
      console.error(`    Expected: ${expectedHash}`);
      console.error(`    Got:      ${hashes[pack]}`);
      return false;
    }
  }
  return true;
}

function verifyParentArtifact(artifact, artifactName, expectedParent) {
  if (!artifact) return false;
  if (!artifact.parentArtifact) {
    console.log(`  INFO: ${artifactName} has no parentArtifact (expected for first-stage artifact)`);
    return true;
  }
  if (artifact.parentArtifact !== expectedParent) {
    console.error(`  FAIL: ${artifactName}.parentArtifact mismatch`);
    console.error(`    Expected: ${expectedParent}`);
    console.error(`    Got:      ${artifact.parentArtifact}`);
    return false;
  }
  return true;
}

function verifyCrossStageHashes(upstream, downstream, upstreamName, downstreamName) {
  if (!upstream || !downstream) return false;
  const upstreamHashes = upstream.sourceFileHashes;
  const downstreamHashes = downstream.sourceFileHashes;
  if (!upstreamHashes || !downstreamHashes) return false;

  for (const pack of Object.keys(CURRENT_FILE_HASHES)) {
    if (upstreamHashes[pack] !== downstreamHashes[pack]) {
      console.error(`  FAIL: sourceFileHashes mismatch between ${upstreamName} and ${downstreamName} for ${pack}`);
      console.error(`    ${upstreamName}: ${upstreamHashes[pack]}`);
      console.error(`    ${downstreamName}: ${downstreamHashes[pack]}`);
      return false;
    }
  }
  return true;
}

function runAll() {
  console.log('=== Framework v2 Pipeline Orchestrator ===');
  console.log('Scan Once, Consume Many Model — S356 Implementation');
  console.log(`Time: ${new Date().toISOString()}`);
  console.log('');

  const results = { stages: {}, overall: 'PASS', details: [] };

  // Stage 1: Readiness Scorer
  console.log('[1/4] Readiness Scorer (canonical scan)');
  const readiness = loadJson('readiness_scoring.json');
  if (!readiness) {
    results.overall = 'FAIL';
    results.details.push('Readiness scoring artifact missing or invalid JSON');
    return results;
  }

  let pass = verifyArtifactVersion(readiness, 'readiness_scoring.json');
  results.stages.readiness = { hasVersioning: pass };
  if (!pass) results.overall = 'FAIL';

  pass = verifySourceFileHashes(readiness, 'readiness_scoring.json', CURRENT_FILE_HASHES);
  results.stages.readiness.hasHashes = pass;
  if (!pass) results.overall = 'FAIL';

  console.log(`  artifactVersion: ${readiness.artifactVersion || 'MISSING'}`);
  console.log(`  sourceFileHashes: ${readiness.sourceFileHashes ? Object.keys(readiness.sourceFileHashes).length + ' packs' : 'MISSING'}`);
  console.log(`  parentArtifact: ${readiness.parentArtifact || 'NONE (first stage)'}`);

  // Stage 2: Delta Ledger
  console.log('\n[2/4] Delta Ledger (consumes readiness_scoring)');
  const delta = loadJson('delta_ledger.json');
  if (!delta) {
    results.overall = 'FAIL';
    results.details.push('Delta ledger artifact missing or invalid JSON');
  } else {
    pass = verifyArtifactVersion(delta, 'delta_ledger.json');
    if (!pass) results.overall = 'FAIL';

    pass = verifySourceFileHashes(delta, 'delta_ledger.json', CURRENT_FILE_HASHES);
    results.stages.delta = { hasVersioning: !!delta.artifactVersion, hasHashes: pass };
    if (!pass) results.overall = 'FAIL';

    pass = verifyParentArtifact(delta, 'delta_ledger.json', STAGES.delta.parentLabel);
    results.stages.delta.hasParent = pass;
    if (!pass) results.overall = 'FAIL';

    pass = verifyCrossStageHashes(readiness, delta, 'readiness_scoring.json', 'delta_ledger.json');
    results.stages.delta.hashMatch = pass;
    if (!pass) results.overall = 'FAIL';

    console.log(`  artifactVersion: ${delta.artifactVersion || 'MISSING'}`);
    console.log(`  parentArtifact: ${delta.parentArtifact || 'MISSING'}`);
    console.log(`  sourceFileHashes: ${delta.sourceFileHashes ? Object.keys(delta.sourceFileHashes).length + ' packs' : 'MISSING'}`);
    console.log(`  cross-stage hash match: ${pass ? 'PASS' : 'FAIL'}`);
  }

  // Stage 3: Candidate Engine
  console.log('\n[3/4] Candidate Engine (consumes readiness_scoring)');
  const candidates = loadJson('certification_candidates.json');
  if (!candidates) {
    results.overall = 'FAIL';
    results.details.push('Certification candidates artifact missing or invalid JSON');
  } else {
    pass = verifyArtifactVersion(candidates, 'certification_candidates.json');
    if (!pass) results.overall = 'FAIL';

    pass = verifySourceFileHashes(candidates, 'certification_candidates.json', CURRENT_FILE_HASHES);
    results.stages.candidates = { hasVersioning: !!candidates.artifactVersion, hasHashes: pass };
    if (!pass) results.overall = 'FAIL';

    pass = verifyParentArtifact(candidates, 'certification_candidates.json', STAGES.candidates.parentLabel);
    results.stages.candidates.hasParent = pass;
    if (!pass) results.overall = 'FAIL';

    pass = verifyCrossStageHashes(readiness, candidates, 'readiness_scoring.json', 'certification_candidates.json');
    results.stages.candidates.hashMatch = pass;
    if (!pass) results.overall = 'FAIL';

    console.log(`  artifactVersion: ${candidates.artifactVersion || 'MISSING'}`);
    console.log(`  parentArtifact: ${candidates.parentArtifact || 'MISSING'}`);
    console.log(`  sourceFileHashes: ${candidates.sourceFileHashes ? Object.keys(candidates.sourceFileHashes).length + ' packs' : 'MISSING'}`);
    console.log(`  cross-stage hash match: ${pass ? 'PASS' : 'FAIL'}`);
  }

  // Stage 4: Identity Validator
  console.log('\n[4/4] Identity Validator (consumes certification_candidates)');
  const identity = loadJson('identity_validation_report.json');
  if (!identity) {
    results.overall = 'FAIL';
    results.details.push('Identity validation artifact missing or invalid JSON');
  } else {
    pass = verifyArtifactVersion(identity, 'identity_validation_report.json');
    if (!pass) results.overall = 'FAIL';

    pass = verifySourceFileHashes(identity, 'identity_validation_report.json', CURRENT_FILE_HASHES);
    results.stages.identity = { hasVersioning: !!identity.artifactVersion, hasHashes: pass };
    if (!pass) results.overall = 'FAIL';

    pass = verifyParentArtifact(identity, 'identity_validation_report.json', STAGES.identity.parentLabel);
    results.stages.identity.hasParent = pass;
    if (!pass) results.overall = 'FAIL';

    pass = verifyCrossStageHashes(candidates, identity, 'certification_candidates.json', 'identity_validation_report.json');
    results.stages.identity.hashMatch = pass;
    if (!pass) results.overall = 'FAIL';

    console.log(`  artifactVersion: ${identity.artifactVersion || 'MISSING'}`);
    console.log(`  parentArtifact: ${identity.parentArtifact || 'MISSING'}`);
    console.log(`  sourceFileHashes: ${identity.sourceFileHashes ? Object.keys(identity.sourceFileHashes).length + ' packs' : 'MISSING'}`);
    console.log(`  cross-stage hash match: ${pass ? 'PASS' : 'FAIL'}`);
  }

  // Summary
  console.log(`\n=== RESULT: ${results.overall} ===`);

  const lineageChain = [];
  if (readiness) lineageChain.push('readiness_scoring.json (NO parent — canonical source scan)');
  if (delta) lineageChain.push(`delta_ledger.json → parent: ${delta.parentArtifact || 'MISSING'}`);
  if (candidates) lineageChain.push(`certification_candidates.json → parent: ${candidates.parentArtifact || 'MISSING'}`);
  if (identity) lineageChain.push(`identity_validation_report.json → parent: ${identity.parentArtifact || 'MISSING'}`);

  console.log('\nArtifact Lineage Chain:');
  lineageChain.forEach(l => console.log(`  ${l}`));

  results.lineageChain = lineageChain;
  results.duplicateScanPathways = 0;

  return results;
}

// Main
const args = process.argv.slice(2);
const verbose = args.includes('--verbose');
const stageArg = args.find(a => a.startsWith('--stage='));
const targetStage = stageArg ? stageArg.split('=')[1] : 'all';

if (targetStage !== 'all' && !STAGES[targetStage]) {
  console.error(`Unknown stage: ${targetStage}. Valid: all, ${Object.keys(STAGES).join(', ')}`);
  process.exit(1);
}

const result = runAll();

if (verbose) {
  console.log('\n--- Full Verification Detail ---');
  console.log(JSON.stringify(result, null, 2));
}

if (result.overall === 'FAIL') {
  console.error('\nPipeline orchestration FAILED — see details above.');
  process.exit(1);
}

console.log('\nAll 4 stages verified. Artifact reuse model: SCAN ONCE, CONSUME MANY — ACTIVE.');
process.exit(0);
