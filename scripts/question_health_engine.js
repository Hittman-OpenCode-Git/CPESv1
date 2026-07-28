// ============================================================
// Question Health Engine — Board E Session 252
// Aggregates multiple health signals into a unified 0-100
// health score for every CMA Part 1 question.
// ============================================================

const fs = require('fs');
const path = require('path');

// ── Constants ─────────────────────────────────────────────────
const OUTPUT_DIR = path.join(__dirname, 'output');
const DEFAULT_OUTPUT = path.join(OUTPUT_DIR, 'question_health.json');
const HISTORY_PATH = path.join(OUTPUT_DIR, 'question_history.json');
const WORK_QUEUE_PATH = path.join(OUTPUT_DIR, 'work_queue.json');

const HEALTH_TIERS = [
  { tier: 'HEALTHY',   color: 'green',  min: 90, max: 100 },
  { tier: 'FAIR',      color: 'yellow', min: 70, max: 89  },
  { tier: 'NEEDS ATTENTION', color: 'orange', min: 40, max: 69 },
  { tier: 'CRITICAL',  color: 'red',    min: 0,  max: 39  }
];

const CERTIFICATION_STATE_MAP = {
  'Certified':    100,
  'In Audit':     85,
  'Unprocessed':  70,
  'Archived':     50
};
const DEFAULT_CERTIFICATION_SCORE = 80;

const DEFECT_PENALTIES = {
  'Critical': 100,
  'High':     60,
  'Medium':   30,
  'Low':      10
};

const CHALLENGE_TIERS = [
  { max: 0,   score: 100 },
  { max: 2,   score: 80  },
  { max: 5,   score: 50  },
  { max: Infinity, score: 20 }
];

// ── CLI Argument Parsing ──────────────────────────────────────
function parseArgs(argv) {
  const args = {
    mode: null,
    target: null,
    summary: false,
    outputPath: DEFAULT_OUTPUT
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--all') {
      args.mode = 'all';
    } else if (a.startsWith('--qid=')) {
      args.mode = 'qid';
      args.target = a.slice('--qid='.length);
    } else if (a.startsWith('--section=')) {
      args.mode = 'section';
      args.target = a.slice('--section='.length).toUpperCase();
    } else if (a.startsWith('--pack=')) {
      args.mode = 'pack';
      args.target = a.slice('--pack='.length).toLowerCase();
    } else if (a === '--summary') {
      args.summary = true;
    } else if (a.startsWith('--output=')) {
      args.outputPath = a.slice('--output='.length);
    } else if (a === '--help' || a === '-h') {
      printHelp();
      process.exit(0);
    }
  }
  if (!args.mode) {
    console.error('ERROR: No mode specified. Use --all, --qid=, --section=, or --pack=');
    printHelp();
    process.exit(2);
  }
  return args;
}

function printHelp() {
  console.log([
    'Question Health Engine — Board E Session 252',
    '',
    'Usage:',
    '  node scripts/question_health_engine.js [mode] [options]',
    '',
    'Modes (one required):',
    '  --all                 Score all 2,540 questions in the pool',
    '  --qid=P1-A-001        Score a single question by QuestionID',
    '  --section=A           Score all questions in a blueprint section (A-F)',
    '  --pack=A              Score all questions in a pack (a-e)',
    '',
    'Options:',
    '  --summary             Output only aggregate stats (tier distribution, worst 10, best 10)',
    '  --output=<path>       Override output path (default: scripts/output/question_health.json)',
    '  --help, -h            Show this help',
    '',
    'Examples:',
    '  node scripts/question_health_engine.js --all',
    '  node scripts/question_health_engine.js --qid=P1-A-001',
    '  node scripts/question_health_engine.js --section=E --summary',
    '  node scripts/question_health_engine.js --pack=d',
    ''
  ].join('\n'));
}

// ── File I/O ───────────────────────────────────────────────────
function loadJSON(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

function writeJSON(filePath, data) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// ── Work Queue QID Lookup Builder ──────────────────────────────
function buildWorkQueueLookup(workQueue) {
  const lookup = {};
  const lanes = workQueue.lanes || {};
  const laneNames = ['CERTIFY', 'BLOCKED', 'REMEDIATE', 'ARCHIVE'];
  for (const lane of laneNames) {
    const items = lanes[lane];
    if (!Array.isArray(items)) continue;
    for (const item of items) {
      if (item.qid) {
        lookup[item.qid] = {
          lane: item.lane || lane,
          defect_flags: item.defect_flags || [],
          readiness_state: item.readiness_state || '',
          block_reason: item.reason || '',
          recommendations: item.recommendations || []
        };
      }
    }
  }
  return lookup;
}

// ── Signal Computation ─────────────────────────────────────────
function computeDefectScore(defectHistory) {
  if (!Array.isArray(defectHistory) || defectHistory.length === 0) return 100;
  let hasCritical = false;
  let totalPenalty = 0;
  for (const d of defectHistory) {
    const severity = (d.severity || '').trim();
    const penalty = DEFECT_PENALTIES[severity];
    if (severity === 'Critical') hasCritical = true;
    if (typeof penalty === 'number') totalPenalty += penalty;
  }
  if (hasCritical) return 0;
  return Math.max(0, 100 - totalPenalty);
}

function computeChallengeScore(challenges) {
  if (!Array.isArray(challenges) || challenges.length === 0) return 100;
  let openCount = 0;
  for (const c of challenges) {
    if (c.status === 'OPEN') openCount++;
  }
  for (const tier of CHALLENGE_TIERS) {
    if (openCount <= tier.max) return tier.score;
  }
  return 20;
}

function computeRecommendationScore(recommendations) {
  if (!Array.isArray(recommendations) || recommendations.length === 0) return 100;
  let pendingCount = 0;
  for (const r of recommendations) {
    if (r.status === 'Open' || r.status === 'Pending') pendingCount++;
  }
  return Math.max(0, 100 - pendingCount * 15);
}

function computeCertificationScore(currentState) {
  const state = (currentState || '').trim();
  return CERTIFICATION_STATE_MAP[state] !== undefined
    ? CERTIFICATION_STATE_MAP[state]
    : DEFAULT_CERTIFICATION_SCORE;
}

function computeStructuralScore(defectFlags) {
  if (!Array.isArray(defectFlags) || defectFlags.length === 0) return 100;
  let totalPenalty = 0;
  for (const flag of defectFlags) {
    const f = (flag || '').trim();
    if (/DL-?008/i.test(f)) {
      totalPenalty += 50;
    } else if (/DL-?026/i.test(f)) {
      const match = f.match(/(\d+)\s+empty/);
      const emptySlots = match ? parseInt(match[1], 10) : 1;
      totalPenalty += Math.min(emptySlots * 30, 90);
    } else if (/EV3/i.test(f)) {
      totalPenalty += 20;
    } else if (f.length > 0) {
      totalPenalty += 10;
    }
  }
  return Math.max(0, 100 - totalPenalty);
}

function computeUsageScore(totalSessions) {
  return 100;
}

// ── Health Score Aggregation ───────────────────────────────────
function computeHealthScore(componentScores) {
  const weights = {
    defect: 0.30,
    challenge: 0.20,
    recommendation: 0.15,
    certification: 0.15,
    structural: 0.10,
    usage: 0.10
  };
  let weighted = 0;
  for (const [key, weight] of Object.entries(weights)) {
    weighted += weight * (componentScores[key] || 100);
  }
  const raw = Math.round(weighted);
  return Math.max(0, Math.min(100, raw));
}

function getHealthTier(score) {
  for (const tier of HEALTH_TIERS) {
    if (score >= tier.min && score <= tier.max) return tier.tier;
  }
  return 'CRITICAL';
}

// ── Diagnosis Generator ────────────────────────────────────────
function generateDiagnosis(qData, componentScores, details) {
  const issues = [];

  if (componentScores.defect < 90) {
    const highDefects = details.defect_codes.filter((_, i) => {
      const d = qData.defectHistory[i];
      return d && (d.severity === 'Critical' || d.severity === 'High');
    });
    if (highDefects.length > 0) {
      issues.push(highDefects.length + ' ' + (highDefects.length === 1 ? 'High/Critical-severity defect' : 'High/Critical-severity defects') + ' (' + highDefects.join(', ') + ')');
    } else {
      issues.push(details.defect_codes.length + ' defect(s) (' + details.defect_codes.join(', ') + ')');
    }
  }

  if (details.open_challenge_count > 0) {
    issues.push(details.open_challenge_count + ' open challenge' + (details.open_challenge_count !== 1 ? 's' : ''));
  }

  if (details.pending_recommendation_count > 0) {
    issues.push(details.pending_recommendation_count + ' pending recommendation' + (details.pending_recommendation_count !== 1 ? 's' : ''));
  }

  if (componentScores.structural < 90) {
    const structuralFlags = details.structural_flags;
    const dl008 = structuralFlags.filter(f => /DL-?008/i.test(f)).length;
    const dl026 = structuralFlags.filter(f => /DL-?026/i.test(f)).length;
    const ev3 = structuralFlags.filter(f => /EV3/i.test(f)).length;
    const parts = [];
    if (dl008 > 0) parts.push('DL-008');
    if (dl026 > 0) parts.push('DL-026');
    if (ev3 > 0) parts.push('EV3');
    if (parts.length > 0) issues.push('Structural flags: ' + parts.join(', '));
  }

  if (qData.currentState === 'Archived') {
    issues.push('Archived state');
  } else if (qData.currentState === 'Unprocessed') {
    issues.push('Unprocessed — not yet certified');
  } else if (!qData.currentState || qData.currentState === '') {
    issues.push('Missing governance state');
  }

  if (issues.length === 0) {
    if (componentScores.defect === 100 && componentScores.challenge === 100 &&
        componentScores.certification === 100) {
      return 'No health issues. Fully certified with zero defects or open challenges.';
    }
    return 'No significant health issues detected.';
  }

  return issues.join('; ') + '.';
}

// ── Single Question Scoring ────────────────────────────────────
function scoreQuestion(qData, workQueueLookup) {
  const defectHistory = qData.defectHistory || [];
  const challenges = qData.challenges || [];
  const recommendations = qData.recommendations || [];
  const currentState = qData.currentState || '';
  const totalSessions = (qData.timeline && qData.timeline.totalSessions) || 0;

  const wqEntry = workQueueLookup[qData.questionId];
  const defectFlags = wqEntry ? wqEntry.defect_flags : [];

  const componentScores = {
    defect: computeDefectScore(defectHistory),
    challenge: computeChallengeScore(challenges),
    recommendation: computeRecommendationScore(recommendations),
    certification: computeCertificationScore(currentState),
    structural: computeStructuralScore(defectFlags),
    usage: computeUsageScore(totalSessions)
  };

  const healthScore = computeHealthScore(componentScores);
  const healthTier = getHealthTier(healthScore);

  const defectCodes = defectHistory.map(d => d.defectId).filter(Boolean);
  const openChallengeCount = challenges.filter(c => c.status === 'OPEN').length;
  const pendingRecCount = recommendations.filter(r => r.status === 'Open' || r.status === 'Pending').length;

  const details = {
    defect_codes: defectCodes,
    open_challenge_count: openChallengeCount,
    pending_recommendation_count: pendingRecCount,
    structural_flags: defectFlags,
    total_sessions: totalSessions,
    cognitive_level: qData.cognitiveLevel || '',
    difficulty: qData.difficulty || ''
  };

  const diagnosis = generateDiagnosis(qData, componentScores, details);

  return {
    qid: qData.questionId,
    section: qData.section || '?',
    topic: qData.topic || '',
    question_state: currentState || 'Unknown',
    pack: qData.pack || '',
    health_score: healthScore,
    health_tier: healthTier,
    component_scores: componentScores,
    details: details,
    diagnosis: diagnosis
  };
}

// ── Filter Functions ───────────────────────────────────────────
function matchesSection(qData, section) {
  return (qData.section || '').toUpperCase() === section.toUpperCase();
}

function matchesPack(qData, packName) {
  const normalizedPack = 'pack_' + packName.toLowerCase().replace(/^pack_/, '');
  return (qData.pack || '').toLowerCase() === normalizedPack;
}

// ── Summary Generation ─────────────────────────────────────────
function generateSummary(records) {
  const sorted = [...records].sort((a, b) => a.health_score - b.health_score);
  const worst10 = sorted.slice(0, 10);
  const best10 = [...records].sort((a, b) => b.health_score - a.health_score).slice(0, 10);

  const tierDist = { HEALTHY: 0, FAIR: 0, 'NEEDS ATTENTION': 0, CRITICAL: 0 };
  let sum = 0;
  const scores = [];

  const byState = {};
  const bySection = {};

  for (const r of records) {
    tierDist[r.health_tier] = (tierDist[r.health_tier] || 0) + 1;
    sum += r.health_score;
    scores.push(r.health_score);

    const st = r.question_state || 'Unknown';
    if (!byState[st]) byState[st] = { count: 0, sum: 0 };
    byState[st].count++;
    byState[st].sum += r.health_score;

    const sec = r.section || '?';
    if (!bySection[sec]) bySection[sec] = { count: 0, sum: 0 };
    bySection[sec].count++;
    bySection[sec].sum += r.health_score;
  }

  scores.sort((a, b) => a - b);
  const mid = Math.floor(scores.length / 2);
  const median = scores.length % 2 === 0
    ? Math.round((scores[mid - 1] + scores[mid]) / 2)
    : scores[mid];

  const mean = Math.round(sum / records.length);

  const byStateOut = {};
  for (const [st, d] of Object.entries(byState)) {
    byStateOut[st] = { count: d.count, mean_health: Math.round(d.sum / d.count) };
  }

  const bySectionOut = {};
  for (const [sec, d] of Object.entries(bySection)) {
    bySectionOut[sec] = { count: d.count, mean_health: Math.round(d.sum / d.count) };
  }

  return {
    generated_timestamp: new Date().toISOString(),
    total_questions: records.length,
    tier_distribution: tierDist,
    mean_health_score: mean,
    median_health_score: median,
    worst_10: worst10,
    best_10: best10,
    by_state: byStateOut,
    by_section: bySectionOut
  };
}

// ── Main ───────────────────────────────────────────────────────
function main() {
  const args = parseArgs(process.argv);

  console.log('Question Health Engine — Board E Session 252');
  console.log('Loading data sources...');

  if (!fs.existsSync(HISTORY_PATH)) {
    console.error('ERROR: question_history.json not found at ' + HISTORY_PATH);
    process.exit(1);
  }
  if (!fs.existsSync(WORK_QUEUE_PATH)) {
    console.error('ERROR: work_queue.json not found at ' + WORK_QUEUE_PATH);
    process.exit(1);
  }

  const history = loadJSON(HISTORY_PATH);
  const workQueue = loadJSON(WORK_QUEUE_PATH);

  const questions = history.questions || {};
  const workQueueLookup = buildWorkQueueLookup(workQueue);

  const allQids = Object.keys(questions);
  console.log('Loaded ' + allQids.length + ' questions from history.');
  console.log('Loaded ' + Object.keys(workQueueLookup).length + ' QIDs from work queue.');

  let targetQids = [];

  switch (args.mode) {
    case 'all':
      targetQids = allQids;
      break;
    case 'qid':
      if (!questions[args.target]) {
        console.error('ERROR: QID not found: ' + args.target);
        process.exit(1);
      }
      targetQids = [args.target];
      break;
    case 'section':
      targetQids = allQids.filter(qid => matchesSection(questions[qid], args.target));
      if (targetQids.length === 0) {
        console.error('ERROR: No questions found for section: ' + args.target);
        process.exit(1);
      }
      break;
    case 'pack':
      targetQids = allQids.filter(qid => matchesPack(questions[qid], args.target));
      if (targetQids.length === 0) {
        console.error('ERROR: No questions found for pack: ' + args.target);
        process.exit(1);
      }
      break;
  }

  console.log('Scoring ' + targetQids.length + ' question(s)...');

  const records = [];
  for (const qid of targetQids) {
    const qData = questions[qid];
    const record = scoreQuestion(qData, workQueueLookup);
    records.push(record);
  }

  records.sort((a, b) => a.health_score - b.health_score);

  let outputData;

  if (args.summary) {
    outputData = generateSummary(records);
    console.log('Summary generated.');
    console.log('  Total: ' + outputData.total_questions);
    console.log('  Mean health: ' + outputData.mean_health_score);
    console.log('  Median health: ' + outputData.median_health_score);
    console.log('  Tier distribution: ' + JSON.stringify(outputData.tier_distribution));
  } else {
    const summary = generateSummary(records);
    outputData = {
      specId: 'SESSION252_QUESTION_HEALTH',
      board: 'E',
      version: '1.0.0',
      generated_timestamp: new Date().toISOString(),
      mode: args.mode,
      target: args.target || 'all',
      records: records,
      summary: summary
    };
    console.log('Scored ' + records.length + ' question(s).');
    console.log('  HEALTHY: ' + summary.tier_distribution.HEALTHY);
    console.log('  FAIR: ' + summary.tier_distribution.FAIR);
    console.log('  NEEDS ATTENTION: ' + summary.tier_distribution['NEEDS ATTENTION']);
    console.log('  CRITICAL: ' + summary.tier_distribution.CRITICAL);
  }

  writeJSON(args.outputPath, outputData);
  console.log('Output written to: ' + args.outputPath);
}

main();
