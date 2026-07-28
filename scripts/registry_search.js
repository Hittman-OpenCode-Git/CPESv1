// Script 8 — Registry Search API
// Search canonical registry by QID, domain, state, defect, or session
// Output: human-readable table (default) or JSON (--json flag)
const fs = require('fs');
const path = require('path');
const pr = require('./engine/pack_reader');
const ir = require('./engine/identity_resolver');

const OUTPUT_DIR = path.join(__dirname, 'output');

function buildRegistry(rootDir) {
  const timestamp = new Date().toISOString();
  const allItems = pr.getAllItems(rootDir);
  const entries = [];

  for (const item of allItems) {
    const qid = item.QuestionID;
    const packName = item.__pack || 'unknown';
    const compoundKey = ir.resolveCompoundKey(item, packName);

    entries.push({
      qid,
      pack: packName,
      section: item.Section || '?',
      sectionName: item.SectionName || '',
      domain: item.Section || '?',
      topic: item.Topic || '',
      compoundKey,
      questionState: item.question_state || 'Unprocessed',
      certificationDate: item.certification_date || null,
      certificationSession: item.certification_batch || null,
      deliveryPoolEligible: item.question_state === 'Certified',
      correctChoice: item.CorrectChoice || '',
      difficulty: item.Difficulty || '',
      cognitiveLevel: item.CognitiveLevel || '',
      ewPattern: ir.computeEWPattern(item),
      templateFamily: ir.computeTemplateFamilyId(item)
    });
  }

  return { generatedTimestamp: timestamp, totalEntries: entries.length, entries };
}

function searchRegistry(registry, query) {
  let results = registry.entries;

  if (query.qid) {
    const qidLower = query.qid.toLowerCase();
    results = results.filter(e => e.qid.toLowerCase().includes(qidLower));
  }
  if (query.compoundKey) {
    results = results.filter(e => e.compoundKey.includes(query.compoundKey));
  }
  if (query.domain) {
    const dom = query.domain.toUpperCase();
    results = results.filter(e => e.domain === dom || e.section === dom);
  }
  if (query.state) {
    results = results.filter(e => e.questionState === query.state);
  }
  if (query.section) {
    results = results.filter(e => e.sectionName && e.sectionName.toLowerCase().includes(query.section.toLowerCase()));
  }

  return results;
}

function formatTable(results) {
  if (results.length === 0) return '(no results)';

  const lines = [];
  lines.push(`${'QID'.padEnd(18)} ${'Domain'.padEnd(3)} ${'State'.padEnd(14)} ${'CC'.padEnd(3)} ${'Difficulty'.padEnd(12)} ${'Pack'.padEnd(7)}`);
  lines.push('-'.repeat(70));

  for (const r of results.slice(0, 50)) {
    lines.push(
      `${r.qid.padEnd(18)} ${(r.domain || '?').padEnd(3)} ${r.questionState.padEnd(14)} ` +
      `${(r.correctChoice || '?').padEnd(3)} ${(r.difficulty || '').padEnd(12)} ${r.pack.padEnd(7)}`
    );
  }

  if (results.length > 50) {
    lines.push(`... and ${results.length - 50} more results`);
  }

  return lines.join('\n');
}

function runSelfTest() {
  console.log('=== Registry Search API Self-Test ===');
  const rootDir = path.resolve(__dirname, '..');
  const registry = buildRegistry(rootDir);

  console.log(`Registry: ${registry.totalEntries} entries`);

  // Test search by QID
  const qidResults = searchRegistry(registry, { qid: 'P1E-A-001' });
  console.log(`Search "P1E-A-001": ${qidResults.length} result(s)`);
  if (qidResults.length > 0) console.log(`  Found: ${qidResults[0].qid} (${qidResults[0].questionState})`);

  // Test search by domain
  const domainResults = searchRegistry(registry, { domain: 'E' });
  console.log(`Search domain E: ${domainResults.length} result(s)`);

  // Test search by state
  const stateResults = searchRegistry(registry, { state: 'Certified' });
  console.log(`Search state Certified: ${stateResults.length} result(s)`);

  const pass = registry.totalEntries >= 500 && qidResults.length === 1 && domainResults.length > 0;
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
  const registry = buildRegistry(rootDir);

  const query = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--qid' && args[i + 1]) query.qid = args[++i];
    if (args[i] === '--compound-key' && args[i + 1]) query.compoundKey = args[++i];
    if (args[i] === '--domain' && args[i + 1]) query.domain = args[++i];
    if (args[i] === '--state' && args[i + 1]) query.state = args[++i];
    if (args[i] === '--section' && args[i + 1]) query.section = args[++i];
  }

  const results = searchRegistry(registry, query);
  const outputJson = args.includes('--json');

  if (outputJson) {
    console.log(JSON.stringify({ query, resultCount: results.length, results }, null, 2));
  } else {
    console.log(`Registry: ${registry.totalEntries} entries | Query: ${JSON.stringify(query)} | Results: ${results.length}`);
    console.log(formatTable(results));
  }
}

module.exports = { buildRegistry, searchRegistry, runSelfTest };
