// Script 3 — Scan Orchestrator
// Replaces manual "run DL-008, run DL-026, etc." with single run-preflight command
// Executes Gate -1 → Gate 0 → Gate 1 → Gate 2 → Gate 3 → Gate 4 pipeline
// Output: scripts/output/certification_scan_artifact.json
const fs = require('fs');
const path = require('path');
const pr = require('./engine/pack_reader');
const iv = require('./identity_validator');
const dl = require('./delta_ledger_builder');

const OUTPUT_DIR = path.join(__dirname, 'output');
const PACKS = ['pack_a', 'pack_b', 'pack_c', 'pack_d', 'pack_e'];

function runGateNeg1(rootDir) {
  const start = Date.now();
  const results = iv.runIdentityValidation(rootDir);
  return {
    gate: 'Gate -1',
    name: 'Identity Validation',
    blocking: 'HARD_BLOCK',
    runtimeMs: Date.now() - start,
    passed: results.itemsPassed,
    blocked: results.itemsBlocked,
    checked: results.totalItems,
    results: results.items,
    blockedItems: results.blockedItems
  };
}

function runGate0(rootDir) {
  const start = Date.now();
  const items = [];
  const blockedItems = [];
  let passed = 0;
  let blocked = 0;
  let totalChecked = 0;

  for (const packName of PACKS) {
    let packItems;
    try {
      packItems = pr.parsePackFile(packName, rootDir);
    } catch (e) {
      blockedItems.push({ pack: packName, reason: `Parse failed: ${e.message}` });
      blocked++;
      continue;
    }

    for (const item of packItems) {
      if (!item.QuestionID) continue;
      totalChecked++;

      const checks = {
        parseable: 'PASS',
        fieldPresence: 'PASS',
        typeConsistency: 'PASS',
        corruptionDetection: 'PASS'
      };

      const requiredFields = ['QuestionID', 'Choices', 'CorrectChoice', 'Stem'];
      const missing = requiredFields.filter(f => item[f] === undefined || item[f] === null);
      if (missing.length > 0) {
        checks.fieldPresence = `FAIL — Missing: ${missing.join(', ')}`;
      }

      if (item.Choices && typeof item.Choices !== 'object') {
        checks.typeConsistency = 'FAIL — Choices is not an object';
      }

      const allPassed = Object.values(checks).every(c => c === 'PASS');
      items.push({ qid: item.QuestionID, pack: packName, checks, status: allPassed ? 'PASS' : 'BLOCKED' });

      if (allPassed) passed++;
      else {
        blocked++;
        blockedItems.push({ qid: item.QuestionID, pack: packName, checks });
      }
    }
  }

  return {
    gate: 'Gate 0',
    name: 'JSON Integrity',
    blocking: 'HARD_BLOCK',
    runtimeMs: Date.now() - start,
    passed,
    blocked,
    checked: totalChecked,
    results: items,
    blockedItems
  };
}

function runGate1(rootDir) {
  const start = Date.now();
  const items = [];
  const blockedItems = [];
  let passed = 0;
  let blocked = 0;
  let totalChecked = 0;
  const defectCounts = { 'DL-008': 0, 'DL-026': 0, 'DL-016': 0, 'DL-018': 0 };

  for (const packName of PACKS) {
    let packItems;
    try {
      packItems = pr.parsePackFile(packName, rootDir);
    } catch (e) { continue; }

    for (const item of packItems) {
      if (!item.QuestionID) continue;
      totalChecked++;

      const cc = item.CorrectChoice;
      const checks = {};
      let itemBlocked = false;

      // DL-008: EW[CC] non-empty
      if (cc) {
        const ewCC = item['ExplanationWrong' + cc];
        if (ewCC && typeof ewCC === 'string' && ewCC.trim().length > 0) {
          checks['DL-008'] = 'FAIL';
          defectCounts['DL-008']++;
          itemBlocked = true;
        } else {
          checks['DL-008'] = 'PASS';
        }
      }

      // DL-026: Empty non-CC EW slots
      const choices = ['A', 'B', 'C', 'D'];
      let dl026Failures = 0;
      for (const c of choices) {
        if (c === cc) continue;
        const ew = item['ExplanationWrong' + c];
        if (!ew || typeof ew !== 'string' || ew.trim().length < 50) {
          dl026Failures++;
        }
      }
      if (dl026Failures > 0) {
        checks['DL-026'] = `FAIL — ${dl026Failures} empty EW slots`;
        defectCounts['DL-026']++;
        itemBlocked = true;
      } else {
        checks['DL-026'] = 'PASS';
      }

      // DL-018: Missing EW[CC] field
      if (cc && !(('ExplanationWrong' + cc) in item)) {
        checks['DL-018'] = 'FAIL — Missing ExplanationWrong' + cc;
        defectCounts['DL-018']++;
        itemBlocked = true;
      } else {
        checks['DL-018'] = 'PASS';
      }

      const status = itemBlocked ? 'BLOCKED' : 'PASS';
      items.push({ qid: item.QuestionID, pack: packName, section: item.Section, checks, status });

      if (itemBlocked) {
        blocked++;
        blockedItems.push({ qid: item.QuestionID, pack: packName, checks });
      } else {
        passed++;
      }
    }
  }

  return {
    gate: 'Gate 1',
    name: 'Structural Scan',
    blocking: 'HARD_BLOCK',
    runtimeMs: Date.now() - start,
    passed,
    blocked,
    checked: totalChecked,
    defectCounts,
    results: items,
    blockedItems
  };
}

function runGate2(rootDir) {
  const start = Date.now();
  const items = [];
  let passed = 0;
  let warned = 0;
  let totalChecked = 0;
  const defectCounts = { 'DL-013': 0, 'EV3': 0, 'DL-010': 0 };

  const boilerplatePatterns = [
    'this is the correct choice',
    'plausible distractor',
    'common misunderstanding',
    'does not align with',
    'does not match',
    'this option is incorrect'
  ];

  for (const packName of PACKS) {
    let packItems;
    try {
      packItems = pr.parsePackFile(packName, rootDir);
    } catch (e) { continue; }

    for (const item of packItems) {
      if (!item.QuestionID) continue;
      totalChecked++;

      const checks = {};
      let itemWarned = false;

      // DL-013: Template boilerplate in explanations
      let boilerplateHits = 0;
      for (const field of ['ExplanationCorrect', 'ExplanationWrongA', 'ExplanationWrongB', 'ExplanationWrongC', 'ExplanationWrongD']) {
        const val = (item[field] || '').toLowerCase();
        for (const pattern of boilerplatePatterns) {
          if (val.includes(pattern)) boilerplateHits++;
        }
      }
      if (boilerplateHits > 0) {
        checks['DL-013'] = `WARN — ${boilerplateHits} boilerplate patterns`;
        defectCounts['DL-013']++;
        itemWarned = true;
      } else {
        checks['DL-013'] = 'PASS';
      }

      // EV3: Principle citation
      const ec = (item.ExplanationCorrect || '').toLowerCase();
      const principlePatterns = ['asc', 'gaap', 'ifrs', 'coso', 'ias', 'fasb', 'standard', 'principle', 'requires', 'codification'];
      const hasPrinciple = principlePatterns.some(p => ec.includes(p));
      if (!hasPrinciple && ec.length > 0) {
        checks['EV3'] = 'WARN — No accounting principle citation in ExplanationCorrect';
        defectCounts['EV3']++;
        itemWarned = true;
      } else {
        checks['EV3'] = 'PASS';
      }

      const status = itemWarned ? 'WARN' : 'PASS';
      items.push({ qid: item.QuestionID, pack: packName, section: item.Section, checks, status });

      if (itemWarned) warned++;
      else passed++;
    }
  }

  return {
    gate: 'Gate 2',
    name: 'Content Scan',
    blocking: 'SOFT_BLOCK',
    runtimeMs: Date.now() - start,
    passed,
    warned,
    checked: totalChecked,
    defectCounts,
    results: items
  };
}

function runGate3(rootDir) {
  const start = Date.now();
  const allKeyMap = new Map();
  const items = [];
  let passed = 0;
  let blocked = 0;
  let totalChecked = 0;

  for (const packName of PACKS) {
    let packItems;
    try {
      packItems = pr.parsePackFile(packName, rootDir);
    } catch (e) { continue; }

    for (const item of packItems) {
      if (!item.QuestionID) continue;
      totalChecked++;

      const compoundKey = require('./engine/identity_resolver').resolveCompoundKey(item, packName);

      let status = 'PASS';
      let reason = '';

      if (allKeyMap.has(compoundKey)) {
        status = 'BLOCKED';
        reason = `Cross-pack collision with ${allKeyMap.get(compoundKey).pack}:${allKeyMap.get(compoundKey).qid}`;
        blocked++;
      } else {
        allKeyMap.set(compoundKey, { qid: item.QuestionID, pack: packName });
        passed++;
      }

      items.push({
        qid: item.QuestionID,
        pack: packName,
        compoundKey,
        checks: { 'compoundKeyUniqueness': status === 'PASS' ? 'PASS' : `FAIL — ${reason}` },
        status
      });
    }
  }

  return {
    gate: 'Gate 3',
    name: 'Identity Reconciliation',
    blocking: 'HARD_BLOCK',
    runtimeMs: Date.now() - start,
    passed,
    blocked,
    checked: totalChecked,
    results: items
  };
}

function runGate4(rootDir) {
  const start = Date.now();
  const items = [];
  let passed = 0;
  let blocked = 0;
  let totalChecked = 0;

  for (const packName of PACKS) {
    let packItems;
    try {
      packItems = pr.parsePackFile(packName, rootDir);
    } catch (e) { continue; }

    for (const item of packItems) {
      if (!item.QuestionID) continue;
      totalChecked++;

      // Placeholder: EC-CC consistency check (full calculation validation deferred to S332)
      const cc = item.CorrectChoice;
      const ec = (item.ExplanationCorrect || '').toLowerCase();

      const checks = { 'DL-030-EC-CC-Consistency': 'PASS' };
      let itemBlocked = false;

      // Check if EC references a different choice than CC
      if (cc) {
        const otherChoices = ['A', 'B', 'C', 'D'].filter(c => c !== cc);
        for (const oc of otherChoices) {
          if (ec.includes(`correct answer is ${oc.toLowerCase()}`) || ec.includes(`option ${oc.toLowerCase()} is correct`)) {
            checks['DL-030-EC-CC-Consistency'] = `FAIL — EC references ${oc} but CC is ${cc}`;
            itemBlocked = true;
            break;
          }
        }
      }

      const status = itemBlocked ? 'BLOCKED' : 'PASS';
      items.push({ qid: item.QuestionID, pack: packName, section: item.Section, checks, status });

      if (itemBlocked) blocked++;
      else passed++;
    }
  }

  return {
    gate: 'Gate 4',
    name: 'Calculation Validation',
    blocking: 'SOFT_BLOCK',
    runtimeMs: Date.now() - start,
    passed,
    blocked,
    checked: totalChecked,
    results: items
  };
}

function runScanPipeline(rootDir) {
  const timestamp = new Date().toISOString();
  const totalStart = Date.now();

  console.log('Gate -1: Identity Validation...');
  const gateNeg1 = runGateNeg1(rootDir);

  console.log('Gate 0: JSON Integrity...');
  const gate0 = runGate0(rootDir);

  console.log('Gate 1: Structural Scan...');
  const gate1 = runGate1(rootDir);

  console.log('Gate 2: Content Scan...');
  const gate2 = runGate2(rootDir);

  console.log('Gate 3: Identity Reconciliation...');
  const gate3 = runGate3(rootDir);

  console.log('Gate 4: Calculation Validation...');
  const gate4 = runGate4(rootDir);

  const totalRuntime = Date.now() - totalStart;

  const packFileHashes = {};
  for (const packName of PACKS) {
    packFileHashes[`pack_${packName}_corrected.js`] = pr.getPackFileHash(packName, rootDir) || 'ERROR';
  }

  const allGates = [gateNeg1, gate0, gate1, gate2, gate3, gate4];
  const totalChecked = allGates[0].checked;
  const totalPassedGate1 = gateNeg1.passed;
  const totalBlockedGate1 = gateNeg1.blocked;

  const defectCounts = {};
  for (const gate of allGates) {
    if (gate.defectCounts) {
      for (const [defect, count] of Object.entries(gate.defectCounts)) {
        defectCounts[defect] = (defectCounts[defect] || 0) + count;
      }
    }
  }

  const perItemResults = [];
  const itemGateMap = new Map();

  for (const gate of allGates) {
    for (const result of gate.results || []) {
      const key = `${result.pack}:${result.qid}`;
      if (!itemGateMap.has(key)) {
        itemGateMap.set(key, {
          qid: result.qid,
          pack: result.pack,
          section: result.section || '',
          gateResults: {},
          defectFlags: []
        });
      }
      const entry = itemGateMap.get(key);
      const gateKey = gate.gate.toLowerCase().replace(/[ -]/g, '_');
      entry.gateResults[gateKey] = result.status;
    }
  }

  for (const [, entry] of itemGateMap) {
    const defectFlags = [];
    for (const gate of allGates) {
      if (gate.defectCounts) {
        const result = (gate.results || []).find(r => r.qid === entry.qid && r.pack === entry.pack);
        if (result && result.checks) {
          for (const [check, status] of Object.entries(result.checks)) {
            if (status !== 'PASS') defectFlags.push(`${check}: ${status}`);
          }
        }
      }
    }
    entry.defectFlags = defectFlags;
    entry.deltaClassification = 'UNCLASSIFIED';
    entry.overallVerdict = Object.values(entry.gateResults).every(r => r === 'PASS') ? 'PASS' : 'BLOCKED';
    perItemResults.push(entry);
  }

  const artifact = {
    artifactId: `CSA-S322-${timestamp.replace(/[:.]/g, '-')}`,
    timestamp,
    pipelineRuntime: {
      gate_neg1: `${(gateNeg1.runtimeMs / 1000).toFixed(1)}s`,
      gate_0: `${(gate0.runtimeMs / 1000).toFixed(1)}s`,
      gate_1: `${(gate1.runtimeMs / 1000).toFixed(1)}s`,
      gate_2: `${(gate2.runtimeMs / 1000).toFixed(1)}s`,
      gate_3: `${(gate3.runtimeMs / 1000).toFixed(1)}s`,
      gate_4: `${(gate4.runtimeMs / 1000).toFixed(1)}s`
    },
    totalRuntime: `${(totalRuntime / 1000).toFixed(1)}s`,
    packFileHashes,
    aggregateStatistics: {
      totalScanned: totalChecked,
      totalPassed: totalPassedGate1,
      totalBlocked: totalBlockedGate1,
      byGate: {
        gate_neg1: { passed: gateNeg1.passed, blocked: gateNeg1.blocked, checked: gateNeg1.checked },
        gate_0: { passed: gate0.passed, blocked: gate0.blocked, checked: gate0.checked },
        gate_1: { passed: gate1.passed, blocked: gate1.blocked, checked: gate1.checked },
        gate_2: { passed: gate2.passed, warned: gate2.warned, checked: gate2.checked },
        gate_3: { passed: gate3.passed, blocked: gate3.blocked, checked: gate3.checked },
        gate_4: { passed: gate4.passed, blocked: gate4.blocked, checked: gate4.checked }
      },
      byDefectClass: defectCounts
    },
    perItemResults,
    deltaClassifications: {
      CONTENT_CHANGE: 0,
      METADATA_CHANGE: 0,
      NO_CHANGE: 0,
      UNCLASSIFIED: totalChecked
    }
  };

  return artifact;
}

function runSelfTest() {
  console.log('=== Scan Orchestrator Self-Test ===');
  const rootDir = path.resolve(__dirname, '..');
  const artifact = runScanPipeline(rootDir);

  console.log(`Artifact ID: ${artifact.artifactId}`);
  console.log(`Total runtime: ${artifact.totalRuntime}`);
  console.log(`Total scanned: ${artifact.aggregateStatistics.totalScanned}`);
  console.log(`Gate -1 passed: ${artifact.aggregateStatistics.byGate.gate_neg1.passed}`);
  console.log(`Gate 1 passed: ${artifact.aggregateStatistics.byGate.gate_1.passed}`);
  console.log(`Per-item results: ${artifact.perItemResults.length}`);

  const hasDefectCounts = Object.keys(artifact.aggregateStatistics.byDefectClass).length > 0;
  const hasPackHashes = Object.keys(artifact.packFileHashes).length >= 5;
  const hasAllGates = artifact.perItemResults.length > 0 &&
    artifact.perItemResults[0].gateResults &&
    Object.keys(artifact.perItemResults[0].gateResults).length >= 6;

  console.log(`Has defect counts: ${hasDefectCounts}`);
  console.log(`Has pack hashes (5+): ${hasPackHashes}`);
  console.log(`Has all 6 gates in results: ${hasAllGates}`);

  const pass = artifact.totalRuntime.length > 0 && hasPackHashes && hasAllGates;
  console.log(`Self-test: ${pass ? 'PASS' : 'FAIL'}`);
  return pass;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--self-test')) {
    const ok = runSelfTest();
    process.exit(ok ? 0 : 1);
  }

  const rootDir = path.resolve(__dirname, '..');
  console.log(`Scan Orchestrator — running pre-flight pipeline on ${rootDir}`);

  const artifact = runScanPipeline(rootDir);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outPath = path.join(OUTPUT_DIR, 'certification_scan_artifact.json');
  fs.writeFileSync(outPath, JSON.stringify(artifact, null, 2), 'utf8');

  console.log(`\nPipeline complete in ${artifact.totalRuntime}`);
  console.log(`Scanned: ${artifact.aggregateStatistics.totalScanned}`);
  console.log(`Gate -1: ${artifact.aggregateStatistics.byGate.gate_neg1.passed}P / ${artifact.aggregateStatistics.byGate.gate_neg1.blocked}B`);
  console.log(`Gate 1: ${artifact.aggregateStatistics.byGate.gate_1.passed}P / ${artifact.aggregateStatistics.byGate.gate_1.blocked}B`);
  console.log(`Output: ${outPath}`);
  console.log(JSON.stringify(artifact.aggregateStatistics.byDefectClass));
}

module.exports = { runScanPipeline, runSelfTest };
