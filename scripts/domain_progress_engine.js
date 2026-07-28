// Domain Progress Engine — SESSION 850 Board D
// Tracks Certified, READY, REMEDIATE, BLOCKED, Archived per Domain, Pack, Section.
// Output: scripts/output/domain_progress.json
const fs = require('fs');
const path = require('path');
const pr = require('./engine/pack_reader');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(__dirname, 'output');
const PACKS = ['pack_a', 'pack_b', 'pack_c', 'pack_d', 'pack_e'];
const DOMAINS = ['A', 'B', 'C', 'D', 'E', 'F'];
const DOMAIN_NAMES = {
  A: 'External Financial Reporting Decisions',
  B: 'Planning, Budgeting, and Forecasting',
  C: 'Performance Management',
  D: 'Cost Management',
  E: 'Internal Controls',
  F: 'Technology and Analytics'
};
const VALID_CCS = ['A', 'B', 'C', 'D'];

function classifyItem(item) {
  const qState = item.question_state || 'Unprocessed';

  if (qState === 'Certified') return { category: 'certified', label: 'Certified' };
  if (qState === 'Archived') return { category: 'archived', label: 'Archived' };

  // Evaluate readiness for non-certified items
  const cc = item.CorrectChoice || '';
  const stem = item.Stem || '';
  const ec = item.ExplanationCorrect || '';

  // Blocked checks
  if (!cc || !stem || !ec || ec.trim().length < 50) return { category: 'blocked', label: 'BLOCKED' };
  if (!item.QuestionID || String(item.QuestionID).trim().length === 0) return { category: 'blocked', label: 'BLOCKED' };

  // Remediate checks
  if (cc && VALID_CCS.includes(cc)) {
    const ewCC = item['ExplanationWrong' + cc];
    if (ewCC && typeof ewCC === 'string' && ewCC.trim().length > 0) return { category: 'remediate', label: 'REMEDIATE' };
  }

  for (const c of VALID_CCS) {
    if (c === cc) continue;
    const ew = item['ExplanationWrong' + c];
    if (ew === undefined || ew === null) return { category: 'remediate', label: 'REMEDIATE' };
    if (typeof ew === 'string' && ew.trim().length === 0) return { category: 'remediate', label: 'REMEDIATE' };
  }

  return { category: 'ready', label: 'READY' };
}

function run() {
  const timestamp = new Date().toISOString();

  const results = {
    specId: 'SESSION850_DOMAIN_PROGRESS_SPEC',
    board: 'D',
    generatedTimestamp: timestamp,
    overall: {
      totalItems: 0, certified: 0, ready: 0, remediate: 0, blocked: 0, archived: 0, unprocessed: 0, coveragePct: 0.0
    },
    byDomain: {},
    byPack: {},
    bySection: []
  };

  for (const d of DOMAINS) {
    results.byDomain[d] = {
      domainName: DOMAIN_NAMES[d] || 'Unknown',
      certified: 0, ready: 0, remediate: 0, blocked: 0, archived: 0, total: 0, coveragePct: 0.0, remainingToCertify: 0
    };
  }

  const sectionMap = new Map();

  for (const packName of PACKS) {
    let items;
    try { items = pr.parsePackFile(packName, ROOT); } catch (e) {
      results.byPack[packName] = { error: e.message, certified: 0, ready: 0, remediate: 0, blocked: 0, archived: 0, total: 0, coveragePct: 0.0 };
      continue;
    }

    const packResult = { certified: 0, ready: 0, remediate: 0, blocked: 0, archived: 0, unprocessed: 0, total: 0, coveragePct: 0.0 };

    for (const item of items) {
      if (!item.QuestionID) continue;
      const section = (item.Section || item.Topic || '?').toString().charAt(0).toUpperCase();
      const domain = DOMAINS.includes(section) ? section : '?';
      const qState = item.question_state || 'Unprocessed';
      const classification = (qState === 'Certified' || qState === 'Archived')
        ? { category: qState.toLowerCase(), label: qState }
        : classifyItem(item);

      results.overall.totalItems++;
      packResult.total++;

      switch (classification.category) {
        case 'certified':
          results.overall.certified++; packResult.certified++;
          if (domain !== '?') results.byDomain[domain].certified++;
          break;
        case 'ready':
          results.overall.ready++; packResult.ready++;
          if (domain !== '?') results.byDomain[domain].ready++;
          break;
        case 'remediate':
          results.overall.remediate++; packResult.remediate++;
          if (domain !== '?') results.byDomain[domain].remediate++;
          break;
        case 'blocked':
          results.overall.blocked++; packResult.blocked++;
          if (domain !== '?') results.byDomain[domain].blocked++;
          break;
        case 'archived':
          results.overall.archived++; packResult.archived++;
          if (domain !== '?') results.byDomain[domain].archived++;
          break;
        default:
          results.overall.unprocessed++; packResult.unprocessed++;
          break;
      }

      if (domain !== '?') {
        results.byDomain[domain].total++;

        const secKey = `${packName}-${section}`;
        if (!sectionMap.has(secKey)) {
          sectionMap.set(secKey, { pack: packName, section, certified: 0, ready: 0, remediate: 0, blocked: 0, archived: 0, total: 0 });
        }
        const secEntry = sectionMap.get(secKey);
        secEntry.total++;
        if (classification.category === 'certified') secEntry.certified++;
        else if (classification.category === 'ready') secEntry.ready++;
        else if (classification.category === 'remediate') secEntry.remediate++;
        else if (classification.category === 'blocked') secEntry.blocked++;
        else if (classification.category === 'archived') secEntry.archived++;
      }
    }

    packResult.coveragePct = packResult.total > 0
      ? parseFloat(((packResult.certified / packResult.total) * 100).toFixed(1))
      : 0.0;
    results.byPack[packName] = packResult;
  }

  for (const d of DOMAINS) {
    const dd = results.byDomain[d];
    dd.coveragePct = dd.total > 0 ? parseFloat(((dd.certified / dd.total) * 100).toFixed(1)) : 0.0;
    dd.remainingToCertify = dd.total - dd.certified - dd.archived;
  }

  results.overall.coveragePct = results.overall.totalItems > 0
    ? parseFloat(((results.overall.certified / results.overall.totalItems) * 100).toFixed(1))
    : 0.0;

  results.bySection = Array.from(sectionMap.values()).sort((a, b) => {
    if (a.pack !== b.pack) return a.pack.localeCompare(b.pack);
    return a.section.localeCompare(b.section);
  });

  const outputPath = path.join(OUTPUT_DIR, 'domain_progress.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');

  console.log(`Domain Progress Engine complete.`);
  console.log(`  Total:     ${results.overall.totalItems}`);
  console.log(`  Certified: ${results.overall.certified} (${results.overall.coveragePct}%)`);
  console.log(`  READY:     ${results.overall.ready}`);
  console.log(`  REMEDIATE: ${results.overall.remediate}`);
  console.log(`  BLOCKED:   ${results.overall.blocked}`);
  console.log(`  Archived:  ${results.overall.archived}`);
  console.log(`\nBy Domain:`);
  for (const d of DOMAINS) {
    const dd = results.byDomain[d];
    if (dd.total > 0) {
      console.log(`  ${d} (${dd.domainName}): ${dd.certified}/${dd.total} certified (${dd.coveragePct}%), ${dd.ready} READY, ${dd.remediate} REMEDIATE`);
    }
  }
  console.log(`\nOutput: ${outputPath}`);

  return results;
}

if (require.main === module) {
  run();
}

module.exports = { run, classifyItem };
