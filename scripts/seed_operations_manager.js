// Seed Operations Manager — SESSION 850 Board F
// Manages seed inventory, readiness, certification, and promotion for DL-012 clone groups.
// Output: scripts/output/seed_operations.json
const fs = require('fs');
const path = require('path');
const pr = require('./engine/pack_reader');
const tf = require('./engine/template_family');

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
const STEM_SIMILARITY_THRESHOLD = 0.85;

function computeStemSimilarity(stem1, stem2) {
  if (!stem1 || !stem2) return 0;
  const s1 = String(stem1).toLowerCase().replace(/[^a-z0-9\s]/g, '');
  const s2 = String(stem2).toLowerCase().replace(/[^a-z0-9\s]/g, '');
  const words1 = new Set(s1.split(/\s+/).filter(w => w.length > 2));
  const words2 = new Set(s2.split(/\s+/).filter(w => w.length > 2));
  if (words1.size === 0 && words2.size === 0) return 0;
  let intersection = 0;
  for (const w of words1) { if (words2.has(w)) intersection++; }
  const union = new Set([...words1, ...words2]).size;
  return union > 0 ? intersection / union : 0;
}

function evaluateSeedReadiness(item) {
  const cc = item.CorrectChoice || '';
  const stem = item.Stem || '';
  const ec = item.ExplanationCorrect || '';
  const defects = [];

  if (!cc || !VALID_CCS.includes(cc)) defects.push('CC_MISSING');
  if (!stem || stem.trim().length === 0) defects.push('STEM_MISSING');
  if (!ec || ec.trim().length < 50) defects.push('EC_SHORT');

  if (cc && VALID_CCS.includes(cc)) {
    const ewCC = item['ExplanationWrong' + cc];
    if (ewCC && typeof ewCC === 'string' && ewCC.trim().length > 0) defects.push('DL-008');
  }

  for (const c of VALID_CCS) {
    if (c === cc) continue;
    const ew = item['ExplanationWrong' + c];
    if (ew === undefined || ew === null) defects.push('DL-021');
    else if (typeof ew === 'string' && ew.trim().length === 0) defects.push('DL-025');
  }

  if (defects.length === 0) return { state: 'READY', defects: [], score: 100 };
  if (defects.includes('CC_MISSING') || defects.includes('STEM_MISSING')) return { state: 'BLOCKED', defects, score: 0 };
  return { state: 'REMEDIATE', defects, score: 60 };
}

function findCloneGroups(items, packName) {
  const groups = [];
  const seen = new Set();

  const valid = items.filter(i => i.QuestionID);

  for (let i = 0; i < valid.length; i++) {
    const a = valid[i];
    if (seen.has(a.QuestionID)) continue;

    const cluster = [a];
    seen.add(a.QuestionID);

    for (let j = i + 1; j < valid.length; j++) {
      const b = valid[j];
      if (seen.has(b.QuestionID)) continue;
      const sim = computeStemSimilarity(a.Stem, b.Stem);
      if (sim >= STEM_SIMILARITY_THRESHOLD) {
        cluster.push(b);
        seen.add(b.QuestionID);
      }
    }

    if (cluster.length >= 2) {
      groups.push(cluster);
    }
  }

  return groups;
}

function run() {
  const timestamp = new Date().toISOString();

  const results = {
    specId: 'SESSION850_SEED_OPERATIONS_SPEC',
    board: 'F',
    generatedTimestamp: timestamp,
    summary: {
      totalSeedGroups: 0, totalSeeds: 0,
      seedsReady: 0, seedsRemediate: 0, seedsBlocked: 0, seedsCertified: 0,
      totalClones: 0, clonesArchived: 0
    },
    seedGroups: [],
    byDomain: {}
  };

  for (const d of DOMAINS) {
    results.byDomain[d] = { domainName: DOMAIN_NAMES[d] || 'Unknown', seedGroups: 0, seedsReady: 0, totalClones: 0, clonesArchived: 0 };
  }

  const allItems = {};
  for (const packName of PACKS) {
    let items;
    try { items = pr.parsePackFile(packName, ROOT); } catch (e) { continue; }
    for (const item of items) {
      if (item.QuestionID) allItems[item.QuestionID] = { ...item, __pack: packName };
    }
  }

  let groupIdx = 1;
  for (const packName of PACKS) {
    let items;
    try { items = pr.parsePackFile(packName, ROOT); } catch (e) { continue; }
    const cloneGroups = findCloneGroups(items, packName);

    for (const cluster of cloneGroups) {
      const seedItem = cluster[0];
      const cloneItems = cluster.slice(1);
      const section = (seedItem.Section || seedItem.Topic || '?').toString().charAt(0).toUpperCase();
      const domain = DOMAINS.includes(section) ? section : '?';
      const seedReadiness = evaluateSeedReadiness(seedItem);
      const qState = seedItem.question_state || 'Unprocessed';

      const seedState = qState === 'Certified' ? 'Certified'
        : qState === 'Archived' ? 'Archived'
        : seedReadiness.state;

      const grade = {
        groupId: `SG-${String(groupIdx).padStart(4, '0')}`,
        groupType: cluster.length >= 5 ? 'dl012_clone' : 'template_rotation',
        domain,
        section,
        seedQID: seedItem.QuestionID,
        seedPack: packName,
        seedState,
        seedReadinessScore: seedReadiness.score,
        seedDefects: seedReadiness.defects,
        seedQuestionState: qState,
        cloneQIDs: cloneItems.map(c => c.QuestionID),
        cloneStates: cloneItems.map(c => c.question_state || 'Unprocessed'),
        totalMembers: cluster.length,
        archivedCount: cluster.filter(c => c.question_state === 'Archived').length,
        recommendedAction: ''
      };

      // Determine recommended action
      if (qState === 'Certified') {
        grade.recommendedAction = 'Seed certified. Archive clones.';
      } else if (qState === 'Archived') {
        grade.recommendedAction = 'Seed archived. Verify replacement seed exists.';
      } else if (seedReadiness.state === 'READY') {
        grade.recommendedAction = 'Seed ready. Certify seed, then archive clones.';
      } else if (seedReadiness.state === 'BLOCKED') {
        grade.recommendedAction = 'Seed blocked. Fix structural defects before certification.';
      } else {
        grade.recommendedAction = 'Remediate seed defects, then certify.';
      }

      results.seedGroups.push(grade);
      results.summary.totalSeedGroups++;
      results.summary.totalSeeds++;
      results.summary.totalClones += cloneItems.length;
      results.summary.clonesArchived += grade.archivedCount;

      if (seedState === 'READY') results.summary.seedsReady++;
      else if (seedState === 'REMEDIATE') results.summary.seedsRemediate++;
      else if (seedState === 'BLOCKED') results.summary.seedsBlocked++;
      else if (seedState === 'Certified') results.summary.seedsCertified++;
      else if (qState === 'Unprocessed') results.summary.seedsRemediate++;

      if (domain !== '?' && results.byDomain[domain]) {
        results.byDomain[domain].seedGroups++;
        if (seedState === 'READY') results.byDomain[domain].seedsReady++;
        results.byDomain[domain].totalClones += cloneItems.length;
        results.byDomain[domain].clonesArchived += grade.archivedCount;
      }

      groupIdx++;
    }
  }

  const outputPath = path.join(OUTPUT_DIR, 'seed_operations.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');

  console.log(`Seed Operations Manager complete.`);
  console.log(`  Seed groups:  ${results.summary.totalSeedGroups}`);
  console.log(`  Total seeds:  ${results.summary.totalSeeds}`);
  console.log(`  Seeds READY:  ${results.summary.seedsReady}`);
  console.log(`  Seeds REMEDIATE: ${results.summary.seedsRemediate}`);
  console.log(`  Seeds BLOCKED: ${results.summary.seedsBlocked}`);
  console.log(`  Seeds Certified: ${results.summary.seedsCertified}`);
  console.log(`  Total clones: ${results.summary.totalClones}`);
  console.log(`  Clones Archived: ${results.summary.clonesArchived}`);
  console.log(`\nOutput: ${outputPath}`);

  return results;
}

if (require.main === module) {
  run();
}

module.exports = { run, evaluateSeedReadiness, findCloneGroups };
