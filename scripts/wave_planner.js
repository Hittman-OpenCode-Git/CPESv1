// Wave Planner — SESSION 850 Board C
// Builds certification waves (A, B, C) using workload, complexity, readiness,
// and blueprint balance. Reads certification candidates and generates
// domain-balanced wave schedules.
// Output: scripts/output/certification_waves.json
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

const WAVE_CONFIG = {
  WAVE_A: { label: 'Wave A — Priority Certification', maxItemsPerWave: 150, maxItemsPerDomain: 75, strategy: 'Domain-balance-first', targetCoverage: 85 },
  WAVE_B: { label: 'Wave B — Expansion Certification', maxItemsPerWave: 200, maxItemsPerDomain: 100, strategy: 'Fill-domain-gaps', targetCoverage: 95 },
  WAVE_C: { label: 'Wave C — Completion Certification', maxItemsPerWave: 250, maxItemsPerDomain: 125, strategy: 'Maximum-throughput', targetCoverage: 100 }
};

function loadCandidateResults() {
  const candidatePath = path.join(OUTPUT_DIR, 'certification_candidates.json');
  if (fs.existsSync(candidatePath)) {
    try { return JSON.parse(fs.readFileSync(candidatePath, 'utf8')); } catch (e) {}
  }
  return null;
}

function computeCurrentCoverage() {
  const domainCounts = {};
  const domainCertified = {};
  for (const d of DOMAINS) {
    domainCounts[d] = 0;
    domainCertified[d] = 0;
  }

  for (const packName of PACKS) {
    let items;
    try { items = pr.parsePackFile(packName, ROOT); } catch (e) { continue; }
    for (const item of items) {
      if (!item.QuestionID) continue;
      const section = (item.Section || item.Topic || '?').toString().charAt(0).toUpperCase();
      const domain = DOMAINS.includes(section) ? section : '?';
      if (domain === '?') continue;
      domainCounts[domain] = (domainCounts[domain] || 0) + 1;
      if (item.question_state === 'Certified') {
        domainCertified[domain] = (domainCertified[domain] || 0) + 1;
      }
    }
  }

  const coverage = {};
  for (const d of DOMAINS) {
    coverage[d] = {
      total: domainCounts[d] || 0,
      certified: domainCertified[d] || 0,
      pct: domainCounts[d] > 0 ? parseFloat(((domainCertified[d] / domainCounts[d]) * 100).toFixed(1)) : 0,
      gap: domainCounts[d] > 0 ? domainCounts[d] - domainCertified[d] : 0
    };
  }
  return coverage;
}

function computeProjectedCoverage(coverage, waveItems) {
  const projected = {};
  for (const d of DOMAINS) {
    projected[d] = { ...coverage[d] };
  }
  for (const item of waveItems) {
    const domain = item.domain || item.section || '?';
    if (domain !== '?' && projected[domain]) {
      projected[domain].certified += 1;
      projected[domain].gap -= 1;
      projected[domain].pct = projected[domain].total > 0
        ? parseFloat(((projected[domain].certified / projected[domain].total) * 100).toFixed(1))
        : 0;
    }
  }
  return projected;
}

function run() {
  const timestamp = new Date().toISOString();
  const candidateResults = loadCandidateResults();

  const coverage = computeCurrentCoverage();

  const results = {
    specId: 'SESSION850_WAVE_PLANNER_SPEC',
    board: 'C',
    generatedTimestamp: timestamp,
    summary: { totalWaves: 0, totalItemsPlanned: 0, wavesByTier: { WAVE_A: 0, WAVE_B: 0, WAVE_C: 0 } },
    domainCoverage: { before: coverage, after: null },
    waves: []
  };

  let readyItems = [];
  if (candidateResults && candidateResults.candidates) {
    readyItems = candidateResults.candidates.filter(c => c.state === 'READY');
  } else {
    // Fallback: direct scan
    for (const packName of PACKS) {
      let items;
      try { items = pr.parsePackFile(packName, ROOT); } catch (e) { continue; }
      for (const item of items) {
        if (!item.QuestionID || item.question_state === 'Certified' || item.question_state === 'Archived') continue;
        const section = (item.Section || item.Topic || '?').toString().charAt(0).toUpperCase();
        const domain = DOMAINS.includes(section) ? section : '?';
        readyItems.push({
          qid: item.QuestionID,
          pack: packName,
          section,
          domain,
          topic: item.Topic || '',
          readinessScore: 85,
          currentQuestionState: item.question_state || 'Unprocessed'
        });
      }
    }
  }

  // Sort: lowest-coverage domains first, then highest readiness scores
  const sorted = [...readyItems].sort((a, b) => {
    const covA = coverage[a.domain] ? coverage[a.domain].pct : 100;
    const covB = coverage[b.domain] ? coverage[b.domain].pct : 100;
    if (covA !== covB) return covA - covB;
    return (b.readinessScore || 0) - (a.readinessScore || 0);
  });

  // Build waves
  const waveTiers = ['WAVE_A', 'WAVE_B', 'WAVE_C'];
  const used = new Set();
  const allProjected = {};

  for (const waveTier of waveTiers) {
    const config = WAVE_CONFIG[waveTier];
    const remaining = sorted.filter(i => !used.has(i.qid));
    const domainCounts = {};
    for (const d of DOMAINS) domainCounts[d] = 0;

    const waveItems = [];
    for (const item of remaining) {
      if (waveItems.length >= config.maxItemsPerWave) break;
      const domain = item.domain || '?';
      if (domain === '?') continue;
      if (domainCounts[domain] >= config.maxItemsPerDomain) continue;

      // Check if domain needs more certification
      const currentCov = coverage[domain] ? coverage[domain].pct : 100;
      if (currentCov >= config.targetCoverage && waveTier !== 'WAVE_C') continue;

      waveItems.push(item);
      domainCounts[domain]++;
      used.add(item.qid);
    }

    if (waveItems.length === 0) continue;

    const domainDist = {};
    for (const d of DOMAINS) domainDist[d] = domainCounts[d];

    const projectedCov = computeProjectedCoverage(coverage, waveItems);
    allProjected[waveTier] = projectedCov;

    const scoreSum = waveItems.reduce((s, i) => s + (i.readinessScore || 85), 0);
    const scoreAvg = parseFloat((scoreSum / waveItems.length).toFixed(1));

    const wave = {
      waveId: `WAVE-${waveTier}-${String(results.waves.length + 1).padStart(2, '0')}`,
      waveTier,
      label: config.label,
      sequence: results.waves.length + 1,
      itemCount: waveItems.length,
      estimatedHours: Math.ceil(waveItems.length * 0.25),
      domainDistribution: domainDist,
      readinessScoreAvg: scoreAvg,
      items: waveItems.map(i => i.qid),
      strategy: config.strategy,
      notes: `Domain-balanced wave targeting ${config.targetCoverage}% coverage`
    };

    results.waves.push(wave);
    results.summary.totalItemsPlanned += waveItems.length;
    results.summary.wavesByTier[waveTier] += 1;
    results.summary.totalWaves++;
  }

  results.domainCoverage.after = computeProjectedCoverage(coverage, sorted);

  const outputPath = path.join(OUTPUT_DIR, 'certification_waves.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');

  console.log(`Wave Planner complete.`);
  console.log(`  Total waves built: ${results.summary.totalWaves}`);
  console.log(`  Total items planned: ${results.summary.totalItemsPlanned}`);
  console.log(`\nBy Tier:`);
  for (const tier of waveTiers) {
    if (results.summary.wavesByTier[tier] > 0) {
      console.log(`  ${tier}: ${results.summary.wavesByTier[tier]} waves`);
    }
  }
  console.log(`\nDomain Coverage (Before → After):`);
  for (const d of DOMAINS) {
    const c = coverage[d];
    if (c && c.total > 0) {
      console.log(`  Domain ${d}: ${c.pct}% (${c.certified}/${c.total})`);
    }
  }
  console.log(`\nOutput: ${outputPath}`);

  return results;
}

if (require.main === module) {
  run();
}

module.exports = { run, computeCurrentCoverage };
