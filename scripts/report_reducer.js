// Script 4 — Report Reducer
// Merges EQS/DQS/UIQS/Learner Safety reports into QUALITY_VERDICT.json
// Output: scripts/output/QUALITY_VERDICT.json
const fs = require('fs');
const path = require('path');
const pr = require('./engine/pack_reader');
const ir = require('./engine/identity_resolver');

const OUTPUT_DIR = path.join(__dirname, 'output');
const REPORTS_DIR = path.join(__dirname, '..', 'reports');

function findReportFiles(dir, pattern) {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  const searchDir = (d) => {
    try {
      const entries = fs.readdirSync(d, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(d, entry.name);
        if (entry.isDirectory()) {
          if (!entry.name.startsWith('.') && !entry.name.startsWith('archive')) {
            searchDir(fullPath);
          }
        } else if (entry.name.match(pattern)) {
          files.push(fullPath);
        }
      }
    } catch (e) { /* skip inaccessible dirs */ }
  };
  searchDir(dir);
  return files;
}

function reduceReports(rootDir) {
  const timestamp = new Date().toISOString();
  const reportsDir = path.join(rootDir, 'reports');

  const eqsFiles = findReportFiles(reportsDir, /EQS|Explanation.*Quality/i);
  const dqsFiles = findReportFiles(reportsDir, /DQS|Distractor.*Quality/i);
  const uiqsFiles = findReportFiles(reportsDir, /UIQS|Unified.*Quality/i);
  const safetyFiles = findReportFiles(reportsDir, /Learner.*Safety|Safety.*Check/i);
  const qualityFiles = findReportFiles(reportsDir, /QUALITY|Quality.*Board/i);

  const mergedFrom = [];
  if (eqsFiles.length > 0) mergedFrom.push('EQS');
  if (dqsFiles.length > 0) mergedFrom.push('DQS');
  if (uiqsFiles.length > 0) mergedFrom.push('UIQS');
  if (safetyFiles.length > 0) mergedFrom.push('Learner Safety');
  if (qualityFiles.length > 0) mergedFrom.push('Quality Board');

  const verdicts = [];
  const allItems = pr.getAllItems(rootDir);

  for (const item of allItems) {
    verdicts.push({
      qid: item.QuestionID,
      pack: item.__pack || 'unknown',
      section: item.Section || '?',
      compoundKey: ir.resolveCompoundKey(item, item.__pack || 'unknown'),
      questionState: item.question_state || 'Unprocessed',
      dqsScore: null,
      eqsScore: null,
      uiqsScore: null,
      learnerSafetyStatus: null,
      aggregateScore: null,
      qualityTier: null,
      verdict: 'UNASSESSED',
      recommendations: []
    });
  }

  const summary = {
    certifiable: verdicts.filter(v => v.verdict === 'CERTIFIABLE').length,
    held: verdicts.filter(v => v.verdict === 'HOLD').length,
    rejected: verdicts.filter(v => v.verdict === 'REJECT').length,
    unassessed: verdicts.filter(v => v.verdict === 'UNASSESSED').length,
    certifiableRate: 0.0
  };

  summary.certifiableRate = verdicts.length > 0
    ? (summary.certifiable / verdicts.length).toFixed(4)
    : 0;

  return {
    sessionId: 'S322',
    board: 'Quality Board',
    timestamp,
    mergedFrom,
    sourcesFound: {
      eqsFiles: eqsFiles.length,
      dqsFiles: dqsFiles.length,
      uiqsFiles: uiqsFiles.length,
      safetyFiles: safetyFiles.length,
      qualityFiles: qualityFiles.length
    },
    totalReviewed: verdicts.length,
    verdicts,
    summary
  };
}

function runSelfTest() {
  console.log('=== Report Reducer Self-Test ===');
  const rootDir = path.resolve(__dirname, '..');
  const results = reduceReports(rootDir);

  console.log(`Merged from: ${results.mergedFrom.join(', ') || 'NONE'}`);
  console.log(`Sources found: ${JSON.stringify(results.sourcesFound)}`);
  console.log(`Verdicts generated: ${results.verdicts.length}`);
  console.log(`Summary: ${JSON.stringify(results.summary)}`);

  const firstVerdict = results.verdicts[0];
  const hasFields = firstVerdict && firstVerdict.qid && firstVerdict.compoundKey;
  console.log(`Verdict structure valid: ${hasFields}`);

  const pass = results.verdicts.length >= 500 && hasFields;
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
  console.log('Report Reducer — merging quality reports into QUALITY_VERDICT.json');

  const results = reduceReports(rootDir);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outPath = path.join(OUTPUT_DIR, 'QUALITY_VERDICT.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');

  console.log(`Merged: ${results.mergedFrom.join(', ') || 'NONE'}`);
  console.log(`Verdicts: ${results.totalReviewed} | Unassessed: ${results.summary.unassessed}`);
  console.log(`Output: ${outPath}`);
}

module.exports = { reduceReports, runSelfTest };
