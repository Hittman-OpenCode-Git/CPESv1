// Certification Candidate Engine — SESSION 850 Board A
// Scans all packs and identifies READY inventory for certification waves.
// Applies structural, identity, and governance readiness checks.
// Output: scripts/output/certification_candidates.json
const fs = require('fs');
const path = require('path');
const pr = require('./engine/pack_reader');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(__dirname, 'output');
const PACKS = ['pack_a', 'pack_b', 'pack_c', 'pack_d', 'pack_e'];
const QID_PATTERNS = {
  pack_a: /^P1-[A-F]-\d{3}$/,
  pack_b: /^P1B-[A-F]-\d{3}$/,
  pack_c: /^P1-[A-F]C-\d{3}$/,
  pack_d: /^P1-[A-F]D-\d{3}$/,
  pack_e: /^P1E-[A-F]-\d{3}$/
};
const VALID_CCS = ['A', 'B', 'C', 'D'];
const DOMAINS = ['A', 'B', 'C', 'D', 'E', 'F'];
const DOMAIN_NAMES = {
  A: 'External Financial Reporting Decisions',
  B: 'Planning, Budgeting, and Forecasting',
  C: 'Performance Management',
  D: 'Cost Management',
  E: 'Internal Controls',
  F: 'Technology and Analytics'
};
const MIN_EXPLANATION_LENGTH = 50;

function loadDefectManifest() {
  const manifestPath = path.join(ROOT, 'governance', 'DEFECT_MANIFEST_DL008_DL026.json');
  if (!fs.existsSync(manifestPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function isBlockedInManifest(qid, manifest) {
  if (!manifest) return false;
  const blockers = manifest.blockedQIDs || manifest.blocked || manifest.items || [];
  for (const entry of blockers) {
    const id = entry.qid || entry.QID || entry.QuestionID || entry;
    if (typeof id === 'string' && id === qid) return true;
  }
  return false;
}

function computeEWPattern(item) {
  const cc = item.CorrectChoice || '';
  const slots = VALID_CCS.map(c => {
    if (c === cc) return 'C';
    const ew = item['ExplanationWrong' + c];
    if (ew && typeof ew === 'string' && ew.trim().length > 0) return '1';
    if (ew !== undefined && ew !== null && typeof ew === 'string' && ew.trim() === '') return '0';
    return 'M';
  });
  return slots.join('');
}

function evaluateReadiness(item, packName, qidPattern, manifest) {
  const qid = item.QuestionID || '';
  const defects = [];
  const warnings = [];

  if (!qid || !qidPattern.test(qid)) {
    defects.push('QID_INVALID_OR_MISSING');
    return { state: 'BLOCKED', reason: 'QuestionID invalid or missing', defects, score: 0 };
  }

  const section = (item.Section || item.Topic || '?').toString().charAt(0).toUpperCase();
  const domain = DOMAINS.includes(section) ? section : '?';
  const currentState = item.question_state || 'Unprocessed';
  const cc = item.CorrectChoice || '';
  const stem = item.Stem || '';
  const ec = item.ExplanationCorrect || '';

  if (currentState === 'Certified') {
    return { state: 'CERTIFY', reason: 'Already Certified', defects: [], score: 100, certified: true };
  }
  if (currentState === 'Archived') {
    return { state: 'BLOCKED', reason: 'Item is Archived', defects: ['ARCHIVED'], score: 0 };
  }

  let score = 0;
  let maxScore = 10;

  // Gate -1: Identity validation
  if (!cc || !VALID_CCS.includes(cc)) {
    defects.push('CC_MISSING_OR_INVALID');
  } else {
    score++;
  }

  if (!stem || stem.trim().length === 0) {
    defects.push('STEM_MISSING');
  } else {
    score++;
  }

  if (!ec || ec.trim().length < MIN_EXPLANATION_LENGTH) {
    defects.push('EXPLANATION_MISSING_OR_SHORT');
  } else {
    score++;
  }

  // Gate 0: Choices completeness
  const choices = item.Choices || {};
  let choicesComplete = true;
  for (const c of VALID_CCS) {
    const choiceVal = choices[c] || item['Choice' + c];
    if (!choiceVal || String(choiceVal).trim().length === 0) {
      choicesComplete = false;
      defects.push(`CHOICE_${c}_MISSING`);
    }
  }
  if (choicesComplete) score++;

  // Gate 1: DL-008 — ExplanationWrong[CorrectChoice] must be empty
  if (cc && VALID_CCS.includes(cc)) {
    const ewCC = item['ExplanationWrong' + cc];
    if (ewCC && typeof ewCC === 'string' && ewCC.trim().length > 0) {
      defects.push('DL-008:EW_CC_NON_EMPTY');
    } else {
      score++;
    }
    // DL-018: field must exist
    if (ewCC === undefined || ewCC === null) {
      warnings.push('DL-018:EW_CC_FIELD_ABSENT');
      defects.push('DL-018:EW_CC_MISSING');
    } else {
      score++;
    }
  }

  // Gate 2: DL-026/DL-025 — non-CC ExplanationWrong slots must not be empty
  let allNonCCNonEmpty = true;
  for (const c of VALID_CCS) {
    if (c === cc) continue;
    const ew = item['ExplanationWrong' + c];
    if (ew === undefined || ew === null) {
      allNonCCNonEmpty = false;
      defects.push(`DL-021/026:EW_${c}_ABSENT`);
    } else if (typeof ew === 'string' && ew.trim().length === 0) {
      allNonCCNonEmpty = false;
      defects.push(`DL-025/026:EW_${c}_EMPTY`);
    } else if (typeof ew === 'string' && ew.trim().length < MIN_EXPLANATION_LENGTH) {
      warnings.push(`EW_${c}_SHORT`);
    }
  }
  if (allNonCCNonEmpty) score++;

  // Gate 3: DL-013 — template boilerplate
  for (const c of VALID_CCS) {
    if (c === cc) continue;
    const ew = item['ExplanationWrong' + c] || '';
    if (typeof ew === 'string' && (ew.includes('represents a plausible misconception') || ew.includes('does not align with'))) {
      warnings.push(`DL-013:EW_${c}_BOILERPLATE`);
    }
  }
  score++;

  // Gate 4: Defect manifest check
  if (isBlockedInManifest(qid, manifest)) {
    defects.push('BLOCKED_IN_MANIFEST');
    maxScore--;
  } else {
    score++;
  }

  // Gate 5: Governance (question_state validity)
  const validStates = ['Unprocessed', 'In Audit', 'Editorial Queue', 'Certified', 'Archived'];
  if (currentState && validStates.includes(currentState)) {
    score++;
  } else if (!currentState) {
    warnings.push('NO_QUESTION_STATE');
  }

  const normalizedScore = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const readinessScore = normalizedScore;

  let state;
  if (defects.includes('QID_INVALID_OR_MISSING') || defects.includes('CC_MISSING_OR_INVALID') || defects.includes('STEM_MISSING')) {
    state = 'BLOCKED';
  } else if (defects.includes('DL-008:EW_CC_NON_EMPTY') || defects.includes('DL-021/026:EW') || defects.includes('DL-025/026:EW')) {
    state = 'REMEDIATE';
  } else if (defects.includes('BLOCKED_IN_MANIFEST')) {
    state = 'REMEDIATE';
  } else if (readinessScore >= 85) {
    state = 'READY';
  } else {
    state = 'REMEDIATE';
  }

  const blockReason = defects.join('; ') || (state === 'READY' ? 'All gates passed' : 'Unknown');

  return {
    state,
    reason: blockReason,
    defects,
    warnings,
    score: readinessScore,
    ewPattern: computeEWPattern(item),
    certified: false
  };
}

function run() {
  const timestamp = new Date().toISOString();
  const manifest = loadDefectManifest();

  const results = {
    specId: 'SESSION850_CANDIDATE_ENGINE_SPEC',
    board: 'A',
    generatedTimestamp: timestamp,
    summary: { totalScanned: 0, totalReady: 0, totalRemediate: 0, totalBlocked: 0, totalAlreadyCertified: 0, totalArchived: 0 },
    byDomain: {},
    byPack: {},
    candidates: [],
    blockedItems: [],
    remediationItems: [],
    certifiedItems: []
  };

  for (const d of DOMAINS) {
    results.byDomain[d] = { ready: 0, remediate: 0, blocked: 0, certified: 0, archived: 0, total: 0 };
  }

  for (const packName of PACKS) {
    let items;
    try {
      items = pr.parsePackFile(packName, ROOT);
    } catch (e) {
      results.byPack[packName] = { error: e.message, total: 0, ready: 0 };
      continue;
    }

    const validItems = items.filter(i => i && i.QuestionID);
    const packResult = { total: validItems.length, ready: 0, remediate: 0, blocked: 0, certified: 0, archived: 0, pct: 0.0 };
    const qidPattern = QID_PATTERNS[packName];

    for (const item of validItems) {
      const readiness = evaluateReadiness(item, packName, qidPattern, manifest);
      const qid = item.QuestionID;
      const section = (item.Section || item.Topic || '?').toString().charAt(0).toUpperCase();
      const domain = DOMAINS.includes(section) ? section : '?';

      results.summary.totalScanned++;

      const entry = {
        qid,
        pack: packName,
        section,
        domain,
        domainName: DOMAIN_NAMES[domain] || 'Unknown',
        state: readiness.state,
        currentQuestionState: item.question_state || 'Unprocessed',
        topic: item.Topic || '',
        correctChoice: item.CorrectChoice || '',
        defectFlags: readiness.defects,
        warnings: readiness.warnings || [],
        blockReason: readiness.reason,
        readinessScore: readiness.score,
        ewPattern: readiness.ewPattern
      };

      const targetDomain = results.byDomain[domain] || results.byDomain['?'] || { ready: 0, remediate: 0, blocked: 0, certified: 0, archived: 0, total: 0 };
      if (!results.byDomain[domain] && domain !== '?') results.byDomain[domain] = { ready: 0, remediate: 0, blocked: 0, certified: 0, archived: 0, total: 0 };
      const domRef = results.byDomain[domain] || targetDomain;

      switch (readiness.state) {
        case 'READY':
          results.summary.totalReady++;
          packResult.ready++;
          domRef.ready++;
          results.candidates.push(entry);
          break;
        case 'REMEDIATE':
          results.summary.totalRemediate++;
          packResult.remediate++;
          domRef.remediate++;
          results.remediationItems.push(entry);
          break;
        case 'BLOCKED':
          results.summary.totalBlocked++;
          packResult.blocked++;
          domRef.blocked++;
          results.blockedItems.push(entry);
          break;
        case 'CERTIFY':
          results.summary.totalAlreadyCertified++;
          packResult.certified++;
          domRef.certified++;
          results.certifiedItems.push(entry);
          break;
        default:
          break;
      }

      domRef.total++;
      if (readiness.certified) {
        domRef.certified++;
      }
      if (item.question_state === 'Archived') {
        results.summary.totalArchived++;
        packResult.archived++;
        if (results.byDomain[domain]) results.byDomain[domain].archived++;
      }
    }

    packResult.pct = packResult.total > 0 ? parseFloat((packResult.ready / packResult.total * 100).toFixed(1)) : 0.0;
    results.byPack[packName] = packResult;
  }

  const outputPath = path.join(OUTPUT_DIR, 'certification_candidates.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');

  console.log(`Certification Candidate Engine complete.`);
  console.log(`  Scanned: ${results.summary.totalScanned}`);
  console.log(`  READY:   ${results.summary.totalReady}`);
  console.log(`  REMEDIATE: ${results.summary.totalRemediate}`);
  console.log(`  BLOCKED: ${results.summary.totalBlocked}`);
  console.log(`  Certified: ${results.summary.totalAlreadyCertified}`);
  console.log(`  Archived: ${results.summary.totalArchived}`);
  console.log(`\nBy Domain:`);
  for (const d of DOMAINS) {
    const dd = results.byDomain[d];
    console.log(`  Domain ${d}: ${dd.ready} READY, ${dd.remediate} REMEDIATE, ${dd.blocked} BLOCKED, ${dd.certified} Certified (${dd.total} total)`);
  }
  console.log(`\nOutput: ${outputPath}`);

  return results;
}

if (require.main === module) {
  run();
}

module.exports = { run, evaluateReadiness };
