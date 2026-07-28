// Remediation Queue Manager — SESSION 850 Board B
// Builds prioritized remediation queues by defect type, tier, domain, and batch.
// Reads candidate engine output if available; otherwise runs independent scan.
// Output: scripts/output/remediation_queue.json
const fs = require('fs');
const path = require('path');
const pr = require('./engine/pack_reader');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(__dirname, 'output');
const PACKS = ['pack_a', 'pack_b', 'pack_c', 'pack_d', 'pack_e'];
const VALID_CCS = ['A', 'B', 'C', 'D'];
const DOMAINS = ['A', 'B', 'C', 'D', 'E', 'F'];
const MAX_BATCH_SIZE = 28;

const DEFECT_CONFIG = {
  'DL-008': { name: 'ExplanationWrong[CorrectChoice] Non-Empty', severity: 'High', priority: 1, tier: 'TIER_1_HIGH', blocksCertification: true },
  'DL-013': { name: 'Template Boilerplate Distractor Explanations', severity: 'High', priority: 3, tier: 'TIER_2_MEDIUM', blocksCertification: false },
  'DL-025': { name: 'Empty Non-CorrectChoice ExplanationWrong', severity: 'High', priority: 2, tier: 'TIER_1_HIGH', blocksCertification: true },
  'DL-026': { name: 'Empty Non-CorrectChoice ExplanationWrong (Cross-Pool)', severity: 'High', priority: 2, tier: 'TIER_1_HIGH', blocksCertification: true },
  'DL-021': { name: 'Missing Distractor ExplanationWrong Fields', severity: 'High', priority: 3, tier: 'TIER_1_HIGH', blocksCertification: true },
  'DL-030': { name: 'CorrectChoice Answer-Key Errors', severity: 'Critical', priority: 0, tier: 'TIER_0_CRITICAL', blocksCertification: true },
  'DL-031': { name: 'Difficulty Inflation (Systematic)', severity: 'High', priority: 4, tier: 'TIER_2_MEDIUM', blocksCertification: false },
  'DL-032': { name: 'Case Bank Uniform Difficulty', severity: 'Medium', priority: 5, tier: 'TIER_3_LOW', blocksCertification: false },
  'DL-018': { name: 'Missing ExplanationWrong[CorrectChoice] Field', severity: 'Medium', priority: 3, tier: 'TIER_2_MEDIUM', blocksCertification: true },
  'DL-034': { name: 'Missing Structural Fields', severity: 'Critical', priority: 0, tier: 'TIER_0_CRITICAL', blocksCertification: true }
};

const TIER_ORDER = ['TIER_0_CRITICAL', 'TIER_1_HIGH', 'TIER_2_MEDIUM', 'TIER_3_LOW'];

function loadCandidateResults() {
  const candidatePath = path.join(OUTPUT_DIR, 'certification_candidates.json');
  if (fs.existsSync(candidatePath)) {
    try {
      return JSON.parse(fs.readFileSync(candidatePath, 'utf8'));
    } catch (e) {}
  }
  return null;
}

function detectDefects(item, packName) {
  const defects = [];
  const cc = item.CorrectChoice || '';
  const qid = item.QuestionID || '';

  if (!qid) return defects;

  // DL-008: EW[CC] non-empty
  if (cc && VALID_CCS.includes(cc)) {
    const ewCC = item['ExplanationWrong' + cc];
    if (ewCC && typeof ewCC === 'string' && ewCC.trim().length > 0) {
      defects.push('DL-008');
    }
    // DL-018: EW[CC] absent
    if (ewCC === undefined || ewCC === null) {
      defects.push('DL-018');
    }
  }

  // DL-025/026: empty non-CC distractor slots
  for (const c of VALID_CCS) {
    if (c === cc) continue;
    const ew = item['ExplanationWrong' + c];
    if (ew === undefined || ew === null) {
      defects.push('DL-021');
    } else if (typeof ew === 'string' && ew.trim().length === 0) {
      defects.push('DL-025');
    }
  }

  // DL-013: template boilerplate
  for (const c of VALID_CCS) {
    if (c === cc) continue;
    const ew = item['ExplanationWrong' + c] || '';
    if (typeof ew === 'string' && (ew.includes('represents a plausible misconception') || ew.includes('does not align with'))) {
      defects.push('DL-013');
      break;
    }
  }

  // DL-034: missing structural fields
  if (!cc || !VALID_CCS.includes(cc)) {
    defects.push('DL-034');
  }
  if (!item.Stem || String(item.Stem).trim().length === 0) {
    if (!defects.includes('DL-034')) defects.push('DL-034');
  }
  if (!item.ExplanationCorrect || String(item.ExplanationCorrect).trim().length < 50) {
    if (!defects.includes('DL-034')) defects.push('DL-034');
  }

  // DL-031: difficulty inflation (Moderate on definition-match items)
  const diff = item.Difficulty || item.difficulty || '';
  const stem = (item.Stem || '').toLowerCase();
  if (diff === 'Moderate' && item.CorrectChoice && item.Choices) {
    const correctText = String(item.Choices[item.CorrectChoice] || '').toLowerCase();
    const stemWords = new Set(stem.split(/\s+/));
    const correctWords = correctText.split(/\s+/);
    let overlap = 0;
    for (const w of correctWords) {
      if (w.length > 3 && stemWords.has(w)) overlap++;
    }
    if (overlap >= 3) {
      defects.push('DL-031');
    }
  }

  return [...new Set(defects)];
}

function run() {
  const timestamp = new Date().toISOString();
  const candidateResults = loadCandidateResults();

  const results = {
    specId: 'SESSION850_REMEDIATION_QUEUE_SPEC',
    board: 'B',
    generatedTimestamp: timestamp,
    summary: { totalDefectiveItems: 0, totalQueues: 0, byTier: {}, byDefectType: {}, byDomain: {} },
    queues: [],
    perItem: []
  };

  for (const tier of TIER_ORDER) results.summary.byTier[tier] = 0;
  for (const dt of Object.keys(DEFECT_CONFIG)) results.summary.byDefectType[dt] = 0;
  for (const d of DOMAINS) results.summary.byDomain[d] = 0;

  // Collect all defective items
  const defectMap = {};
  for (const dt of Object.keys(DEFECT_CONFIG)) {
    defectMap[dt] = [];
  }

  for (const packName of PACKS) {
    let items;
    try {
      items = pr.parsePackFile(packName, ROOT);
    } catch (e) { continue; }

    for (const item of items) {
      if (!item.QuestionID) continue;
      const qid = item.QuestionID;
      const section = (item.Section || item.Topic || '?').toString().charAt(0).toUpperCase();
      const domain = DOMAINS.includes(section) ? section : '?';
      const qState = item.question_state || 'Unprocessed';

      const defects = detectDefects(item, packName);
      if (defects.length === 0) continue;

      results.summary.totalDefectiveItems++;

      const entry = { qid, pack: packName, section, domain, questionState: qState, defects, topic: item.Topic || '' };
      results.perItem.push(entry);

      for (const dt of defects) {
        if (defectMap[dt]) defectMap[dt].push(entry);
      }
    }
  }

  // Build queues
  let queueIdx = 1;
  for (const tier of TIER_ORDER) {
    for (const dt of Object.keys(DEFECT_CONFIG)) {
      const config = DEFECT_CONFIG[dt];
      if (config.tier !== tier) continue;
      const items = defectMap[dt] || [];
      if (items.length === 0) continue;

      // Sort by: Certified first (highest priority), then by domain
      const sorted = [...items].sort((a, b) => {
        const aCert = a.questionState === 'Certified' ? 0 : 1;
        const bCert = b.questionState === 'Certified' ? 0 : 1;
        if (aCert !== bCert) return aCert - bCert;
        return (a.domain || '').localeCompare(b.domain || '');
      });

      // Split into batches
      const numBatches = Math.ceil(sorted.length / MAX_BATCH_SIZE);
      for (let b = 0; b < numBatches; b++) {
        const batchItems = sorted.slice(b * MAX_BATCH_SIZE, (b + 1) * MAX_BATCH_SIZE);
        const qids = batchItems.map(i => i.qid);
        const domains = [...new Set(batchItems.map(i => i.domain))];

        const queueEntry = {
          queueId: `Q${String(queueIdx).padStart(4, '0')}`,
          defectType: dt,
          defectName: config.name,
          tier,
          priority: config.priority,
          domain: domains.join(','),
          itemCount: qids.length,
          batchSize: MAX_BATCH_SIZE,
          batchIndex: b + 1,
          totalBatches: numBatches,
          items: qids,
          certifiedCount: batchItems.filter(i => i.questionState === 'Certified').length,
          suggestedOwner: dt === 'DL-030' ? 'Accountant + Editor' : dt === 'DL-013' ? 'Content Author' : 'Remediation Agent',
          blockingCertification: config.blocksCertification,
          severity: config.severity
        };

        results.queues.push(queueEntry);
        results.summary.totalQueues++;
        results.summary.byTier[tier] = (results.summary.byTier[tier] || 0) + qids.length;
        results.summary.byDefectType[dt] = (results.summary.byDefectType[dt] || 0) + qids.length;

        for (const entry of batchItems) {
          results.summary.byDomain[entry.domain] = (results.summary.byDomain[entry.domain] || 0) + 1;
        }

        queueIdx++;
      }
    }
  }

  const outputPath = path.join(OUTPUT_DIR, 'remediation_queue.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');

  console.log(`Remediation Queue Manager complete.`);
  console.log(`  Defective items: ${results.summary.totalDefectiveItems}`);
  console.log(`  Queues built:    ${results.summary.totalQueues}`);
  console.log(`\nBy Tier:`);
  for (const tier of TIER_ORDER) {
    if (results.summary.byTier[tier] > 0) {
      console.log(`  ${tier}: ${results.summary.byTier[tier]} items`);
    }
  }
  console.log(`\nBy Defect Type:`);
  for (const dt of Object.keys(DEFECT_CONFIG).sort((a, b) => DEFECT_CONFIG[a].priority - DEFECT_CONFIG[b].priority)) {
    if (results.summary.byDefectType[dt] > 0) {
      console.log(`  ${dt}: ${results.summary.byDefectType[dt]} items (${defectMap[dt] ? defectMap[dt].filter(i => i.questionState === 'Certified').length : 0} Certified)`);
    }
  }
  console.log(`\nOutput: ${outputPath}`);

  return results;
}

if (require.main === module) {
  run();
}

module.exports = { run, detectDefects };
