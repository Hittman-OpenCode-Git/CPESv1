// Script 10 — Modernization Progress Tracker
// Auto-calculates domain certification progress without manual reporting
// Tracks Certified / Remaining / Ready / Blocked / Archived per domain
// Output: scripts/output/modernization_progress.json
const fs = require('fs');
const path = require('path');
const pr = require('./engine/pack_reader');

const OUTPUT_DIR = path.join(__dirname, 'output');
const PACKS = ['pack_a', 'pack_b', 'pack_c', 'pack_d', 'pack_e'];

function trackProgress(rootDir, previousProgressPath) {
  const timestamp = new Date().toISOString();

  const results = {
    generatedTimestamp: timestamp,
    overall: {
      totalItems: 0,
      certified: 0,
      unprocessed: 0,
      archived: 0,
      remaining: 0,
      blockingDefects: 0,
      certifiedPct: 0.0,
      domainCoverage: 0
    },
    byDomain: {},
    bySection: {},
    byPack: {},
    blockers: [],
    trend: null
  };

  let totalDefectFlags = 0;
  let domainsWithCertified = 0;
  const totalDomains = new Set();

  for (const packName of PACKS) {
    let items;
    try {
      items = pr.parsePackFile(packName, rootDir);
    } catch (e) {
      results.byPack[packName] = { error: e.message };
      continue;
    }

    const validItems = items.filter(i => i.QuestionID);
    const packResult = { total: validItems.length, certified: 0, unprocessed: 0, archived: 0 };

    for (const item of validItems) {
      const qid = item.QuestionID;
      const section = item.Section || '?';

      results.overall.totalItems++;
      totalDomains.add(section);

      const domainKey = section;
      if (!results.byDomain[domainKey]) {
        results.byDomain[domainKey] = {
          total: 0, certified: 0, unprocessed: 0, archived: 0, other: 0, pct: 0.0
        };
      }
      results.byDomain[domainKey].total++;

      const sectionKey = `${packName}-${section}`;
      if (!results.bySection[sectionKey]) {
        results.bySection[sectionKey] = { pack: packName, section, total: 0, certified: 0, unprocessed: 0, archived: 0 };
      }
      results.bySection[sectionKey].total++;

      const state = item.question_state || 'Unprocessed';

      if (state === 'Certified') {
        results.overall.certified++;
        packResult.certified++;
        results.byDomain[domainKey].certified++;
        results.bySection[sectionKey].certified++;
      } else if (state === 'Unprocessed') {
        results.overall.unprocessed++;
        packResult.unprocessed++;
        results.byDomain[domainKey].unprocessed++;
        results.bySection[sectionKey].unprocessed++;
      } else if (state === 'Archived') {
        results.overall.archived++;
        packResult.archived++;
        results.byDomain[domainKey].archived++;
        results.bySection[sectionKey].archived++;
      } else {
        results.byDomain[domainKey].other = (results.byDomain[domainKey].other || 0) + 1;
      }
    }

    results.byPack[packName] = packResult;
  }

  results.overall.remaining = results.overall.totalItems - results.overall.certified - results.overall.archived;
  results.overall.certifiedPct = results.overall.totalItems > 0
    ? parseFloat((results.overall.certified / results.overall.totalItems * 100).toFixed(1))
    : 0;

  for (const d of totalDomains) {
    if (results.byDomain[d] && results.byDomain[d].certified > 0) {
      domainsWithCertified++;
    }
    if (results.byDomain[d]) {
      const dd = results.byDomain[d];
      dd.pct = dd.total > 0 ? parseFloat((dd.certified / dd.total * 100).toFixed(1)) : 0;
    }
  }

  results.overall.domainCoverage = totalDomains.size > 0
    ? parseFloat((domainsWithCertified / totalDomains.size * 100).toFixed(1))
    : 0;

  // Identify blockers (domains/sections with high Unprocessed counts)
  for (const [sectionKey, data] of Object.entries(results.bySection)) {
    if (data.unprocessed > data.total * 0.3) {
      results.blockers.push({
        domain: data.section,
        section: sectionKey,
        reason: `${data.unprocessed}/${data.total} Unprocessed`,
        count: data.unprocessed
      });
    }
  }

  // Trend from previous progress
  if (previousProgressPath && fs.existsSync(previousProgressPath)) {
    try {
      const prev = JSON.parse(fs.readFileSync(previousProgressPath, 'utf8'));
      results.trend = {
        previousCertified: prev.overall?.certified || 0,
        currentCertified: results.overall.certified,
        delta: results.overall.certified - (prev.overall?.certified || 0),
        previousPct: prev.overall?.certifiedPct || 0,
        currentPct: results.overall.certifiedPct,
        pctDelta: parseFloat((results.overall.certifiedPct - (prev.overall?.certifiedPct || 0)).toFixed(1))
      };
    } catch (e) {
      console.log(`Could not load previous progress: ${e.message}`);
    }
  }

  return results;
}

function runSelfTest() {
  console.log('=== Modernization Progress Tracker Self-Test ===');
  const rootDir = path.resolve(__dirname, '..');
  const results = trackProgress(rootDir, null);

  console.log(`Overall: ${results.overall.certified}/${results.overall.totalItems} (${results.overall.certifiedPct}%)`);
  console.log(`  Unprocessed: ${results.overall.unprocessed}`);
  console.log(`  Archived: ${results.overall.archived}`);
  console.log(`  Remaining: ${results.overall.remaining}`);
  console.log(`  Domain coverage: ${results.overall.domainCoverage}%`);

  console.log('\nBy Domain:');
  for (const [domain, data] of Object.entries(results.byDomain).sort()) {
    console.log(`  ${domain}: ${data.certified}/${data.total} (${data.pct}%) | Unprocessed: ${data.unprocessed} | Archived: ${data.archived}`);
  }

  console.log(`\nBlockers: ${results.blockers.length}`);
  for (const b of results.blockers.slice(0, 5)) {
    console.log(`  ${b.section}: ${b.reason}`);
  }

  const pass = results.overall.totalItems >= 2000 && results.overall.certified > 0;
  console.log(`\nSelf-test: ${pass ? 'PASS' : 'FAIL'}`);
  return pass;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--self-test')) {
    const ok = runSelfTest();
    process.exit(ok ? 0 : 1);
  }

  const rootDir = path.resolve(__dirname, '..');
  console.log('Modernization Progress Tracker — scanning all packs');

  const previousPath = path.join(OUTPUT_DIR, 'modernization_progress.json');
  const results = trackProgress(rootDir, fs.existsSync(previousPath) ? previousPath : null);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outPath = path.join(OUTPUT_DIR, 'modernization_progress.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');

  console.log(`\nOverall: ${results.overall.certifiedPct}% certified (${results.overall.certified}/${results.overall.totalItems})`);
  console.log(`Remaining: ${results.overall.remaining} | Archived: ${results.overall.archived}`);
  console.log(`Blockers: ${results.blockers.length}`);
  if (results.trend) {
    console.log(`Trend: ${results.trend.delta > 0 ? '+' : ''}${results.trend.delta} (${results.trend.pctDelta > 0 ? '+' : ''}${results.trend.pctDelta}%)`);
  }
  console.log(`Output: ${outPath}`);
}

module.exports = { trackProgress, runSelfTest };
