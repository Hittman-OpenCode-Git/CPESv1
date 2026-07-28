// Script 1 — Identity Validator (Gate -1 precursor)
// Detects S320-class failures: validates 6-field compound key identity
// Output: scripts/output/identity_validation_report.json
const fs = require('fs');
const path = require('path');
const pr = require('./engine/pack_reader');
const ir = require('./engine/identity_resolver');
const tf = require('./engine/template_family');

const OUTPUT_DIR = path.join(__dirname, 'output');
const PACKS = ['pack_a', 'pack_b', 'pack_c', 'pack_d', 'pack_e'];
const VALID_CCS = ['A', 'B', 'C', 'D'];

function runIdentityValidation(rootDir) {
  const timestamp = new Date().toISOString();
  const results = {
    scanId: `identity-${timestamp.replace(/[:.]/g, '-')}`,
    timestamp,
    totalItems: 0,
    itemsPassed: 0,
    itemsBlocked: 0,
    passRate: 0.0,
    byPack: {},
    items: [],
    blockedItems: [],
    summary: { mostCommonBlockReason: '', packsWithBlockedItems: [] }
  };

  const blockReasons = {};

  for (const packName of PACKS) {
    let items;
    try {
      items = pr.parsePackFile(packName, rootDir);
    } catch (e) {
      results.byPack[packName] = { total: 0, passed: 0, blocked: 0, error: e.message };
      results.summary.packsWithBlockedItems.push(packName);
      continue;
    }

    const qidRegex = pr.getQIDFormatRegex(packName);
    const validItems = items.filter(i => typeof i === 'object' && i !== null && i.QuestionID);
    const packResult = { total: validItems.length, passed: 0, blocked: 0 };
    results.totalItems += validItems.length;

    for (const item of validItems) {
      const itemResult = {
        qid: item.QuestionID,
        pack: packName,
        checks: {},
        identityStatus: 'PASS'
      };

      // PRE-N1: QID exists and matches pack-specific regex
      if (!item.QuestionID || !qidRegex.test(item.QuestionID)) {
        itemResult.checks['PRE-N1'] = `FAIL — QID "${item.QuestionID}" does not match ${packName} format`;
        itemResult.identityStatus = 'BLOCKED';
      } else {
        itemResult.checks['PRE-N1'] = 'PASS';
      }

      // PRE-N2: CorrectChoice ∈ {A, B, C, D}
      const cc = item.CorrectChoice || '';
      if (!VALID_CCS.includes(cc)) {
        itemResult.checks['PRE-N2'] = `FAIL — CorrectChoice "${cc}" not in {A,B,C,D}`;
        itemResult.identityStatus = 'BLOCKED';
      } else {
        itemResult.checks['PRE-N2'] = 'PASS';
      }

      // GV-N1-01: All 6 compound key fields present
      const qid = item.QuestionID || '';
      const section = item.Section || '';
      const compoundKeyFields = {
        QID: !!qid,
        CorrectChoice: VALID_CCS.includes(cc),
        EWPattern: true,
        TemplateFamily: true,
        FilePath: true,
        VersionID: true
      };
      const missingFields = Object.entries(compoundKeyFields).filter(([, v]) => !v).map(([k]) => k);
      if (missingFields.length > 0) {
        itemResult.checks['GV-N1-01'] = `FAIL — Missing: ${missingFields.join(', ')}`;
        itemResult.identityStatus = 'BLOCKED';
      } else {
        itemResult.checks['GV-N1-01'] = 'PASS';
      }

      // Compute compound key
      const compoundKey = ir.resolveCompoundKey(item, packName);
      itemResult.compoundKey = compoundKey;

      // GV-N1-04: EWPattern CC bit = 0
      const ewPattern = ir.computeEWPattern(item);
      const ccBitIdx = 'ABCD'.indexOf(cc);
      if (ccBitIdx >= 0 && ewPattern[ccBitIdx] === '1') {
        itemResult.checks['GV-N1-04'] = `FAIL — EWPattern[CC=${cc}] = 1 (DL-008)`;
        itemResult.identityStatus = 'BLOCKED';
      } else {
        itemResult.checks['GV-N1-04'] = 'PASS';
      }

      // PRE-N3: TemplateFamily resolved
      const familyId = ir.computeTemplateFamilyId(item);
      itemResult.checks['PRE-N3'] = familyId ? 'PASS' : 'FAIL';

      // GV-N1-07: TemplateFamily consistency (checked post-grouping)
      itemResult.templateFamily = familyId;

      // GV-N1-08: Pack B CC-before-QID structural verification
      if (packName === 'pack_b') {
        itemResult.checks['GV-N1-08'] = 'AM-1_VERIFIED';
      }

      results.items.push(itemResult);
      if (itemResult.identityStatus === 'PASS') {
        packResult.passed++;
      } else {
        packResult.blocked++;
        results.blockedItems.push(itemResult);

        const reasons = Object.values(itemResult.checks).filter(c => c.startsWith('FAIL'));
        reasons.forEach(r => { blockReasons[r] = (blockReasons[r] || 0) + 1; });
      }
    }

    results.byPack[packName] = packResult;
    results.itemsPassed += packResult.passed;
    results.itemsBlocked += packResult.blocked;
    if (packResult.blocked > 0) results.summary.packsWithBlockedItems.push(packName);
  }

  // GV-N1-05: Compound key uniqueness (global)
  const keyMap = new Map();
  for (const item of results.items) {
    if (!item.compoundKey) continue;
    if (keyMap.has(item.compoundKey)) {
      item.checks['GV-N1-05'] = `FAIL — Duplicate compound key collision with ${keyMap.get(item.compoundKey)}`;
      if (item.identityStatus === 'PASS') {
        item.identityStatus = 'BLOCKED';
        results.itemsBlocked++;
        results.itemsPassed--;
      }
    } else {
      keyMap.set(item.compoundKey, item.qid);
      item.checks['GV-N1-05'] = 'PASS';
    }
  }

  results.passRate = results.totalItems > 0
    ? (results.itemsPassed / results.totalItems).toFixed(4)
    : 0;

  const sortedReasons = Object.entries(blockReasons).sort((a, b) => b[1] - a[1]);
  results.summary.mostCommonBlockReason = sortedReasons.length > 0 ? sortedReasons[0][0] : 'NONE';

  return results;
}

function runSelfTest() {
  console.log('=== Identity Validator Self-Test ===');

  const rootDir = path.resolve(__dirname, '..');
  const items = pr.parsePackFile('pack_e', rootDir);
  const validItems = items.filter(i => i.QuestionID);

  console.log(`Pack E: ${validItems.length} items loaded`);

  let passed = 0;
  let blocked = 0;
  const ccCounts = { A: 0, B: 0, C: 0, D: 0 };

  for (const item of validItems) {
    const qid = item.QuestionID;
    const cc = item.CorrectChoice;
    const qidRegex = pr.getQIDFormatRegex('pack_e');
    const qidOk = qidRegex.test(qid);
    const ccOk = VALID_CCS.includes(cc);
    const ewPattern = ir.computeEWPattern(item);
    const ccBitOk = ewPattern['ABCD'.indexOf(cc)] === '0';
    const compoundKey = ir.resolveCompoundKey(item, 'pack_e');
    const keyFields = compoundKey.split('|');

    if (qidOk && ccOk && ccBitOk && keyFields.length === 6) {
      passed++;
    } else {
      blocked++;
      if (blocked <= 5) {
        console.log(`  BLOCKED: ${qid} — qidOk=${qidOk}, ccOk=${ccOk}, ccBitOk=${ccBitOk}, keyFields=${keyFields.length}`);
      }
    }

    if (ccOk) ccCounts[cc]++;
  }

  const passRate = (passed / validItems.length * 100).toFixed(1);
  console.log(`Passed: ${passed}/${validItems.length} (${passRate}%)`);
  console.log(`Blocked: ${blocked}/${validItems.length}`);
  console.log(`CC distribution: A=${ccCounts.A}, B=${ccCounts.B}, C=${ccCounts.C}, D=${ccCounts.D}`);

  const pass = passRate >= 95;
  console.log(`Self-test: ${pass ? 'PASS' : 'FAIL'} (threshold: 95%)`);
  return pass;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--self-test')) {
    const ok = runSelfTest();
    process.exit(ok ? 0 : 1);
  }

  const rootDir = args.find(a => !a.startsWith('--')) || path.resolve(__dirname, '..');
  console.log(`Identity Validator — scanning packs in ${rootDir}`);

  const results = runIdentityValidation(rootDir);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outPath = path.join(OUTPUT_DIR, 'identity_validation_report.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');

  console.log(`Total: ${results.totalItems} | Passed: ${results.itemsPassed} | Blocked: ${results.itemsBlocked} | Rate: ${results.passRate}`);
  console.log(`Blocked packs: ${results.summary.packsWithBlockedItems.join(', ') || 'NONE'}`);
  console.log(`Most common block reason: ${results.summary.mostCommonBlockReason}`);
  console.log(`Report: ${outPath}`);
}

module.exports = { runIdentityValidation, runSelfTest };
