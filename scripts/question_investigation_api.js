#!/usr/bin/env node
/**
 * question_investigation_api.js
 * Session 252 — Board A
 * Single-query investigation endpoint for CMA Part 1 questions.
 * Usage: node scripts/question_investigation_api.js --qid=P1-A-001
 *
 * Reads from scripts/output/question_history.json as primary source,
 * falls back to direct pack file reading for content fields.
 * Outputs question_investigation.json to scripts/output/.
 */

const fs = require('fs');
const path = require('path');

const RESPACE = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(RESPACE, 'scripts', 'output');
const PACK_DIR = RESPACE;

const SECTION_NAMES = {
  A: 'External Financial Reporting Decisions',
  B: 'Planning, Budgeting, and Forecasting',
  C: 'Performance Management',
  D: 'Cost Management',
  E: 'Internal Controls',
  F: 'Technology and Analytics',
};

const PACK_FILES = {
  pack_a: { file: 'pack_a_corrected.js', var: 'MCQ_BANK_A' },
  pack_b: { file: 'pack_b_corrected.js', var: 'MCQ_BANK_B' },
  pack_c: { file: 'pack_c_corrected.js', var: 'MCQ_BANK_C' },
  pack_d: { file: 'pack_d_corrected.js', var: 'MCQ_BANK_D' },
  pack_e: { file: 'pack_e_corrected.js', var: 'MCQ_BANK_E' },
};

function parseQid(qid) {
  if (!qid || typeof qid !== 'string') return null;

  let match;
  let result = { qid, section: null, pack: null };

  match = qid.match(/^P1-E-R(\d+)$/i);
  if (match) {
    result.section = 'E';
    result.pack = 'pack_e';
    result.series = 'R';
    result.number = parseInt(match[1], 10);
    return result;
  }

  match = qid.match(/^P1B-([A-F])-(\d+)$/i);
  if (match) {
    result.section = match[1].toUpperCase();
    result.pack = 'pack_b';
    result.number = parseInt(match[2], 10);
    return result;
  }

  match = qid.match(/^P1E-([A-F])-(\d+)$/i);
  if (match) {
    result.section = match[1].toUpperCase();
    result.pack = 'pack_e';
    result.number = parseInt(match[2], 10);
    return result;
  }

  match = qid.match(/^P1-([A-F])(C)-(\d+)$/i);
  if (match) {
    result.section = match[1].toUpperCase();
    result.pack = 'pack_c';
    result.number = parseInt(match[3], 10);
    return result;
  }

  match = qid.match(/^P1-([A-F])(D)-(\d+)$/i);
  if (match) {
    result.section = match[1].toUpperCase();
    result.pack = 'pack_d';
    result.number = parseInt(match[3], 10);
    return result;
  }

  match = qid.match(/^P1-([A-F])-(\d+)$/i);
  if (match) {
    result.section = match[1].toUpperCase();
    result.pack = 'pack_a';
    result.number = parseInt(match[2], 10);
    return result;
  }

  return null;
}

function loadJson(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

let _packCache = {};
function loadPack(packName) {
  if (_packCache[packName]) return _packCache[packName];
  const cfg = PACK_FILES[packName];
  if (!cfg) return null;
  try {
    const filePath = path.join(PACK_DIR, cfg.file);
    if (!fs.existsSync(filePath)) return null;
    const src = fs.readFileSync(filePath, 'utf8');
    const fn = new Function(`${src}\nreturn ${cfg.var};`);
    const arr = fn();
    if (Array.isArray(arr)) {
      _packCache[packName] = arr;
      return arr;
    }
    return null;
  } catch (e) {
    return null;
  }
}

function findQuestionInPack(qid, packName) {
  const arr = loadPack(packName);
  if (!arr) return null;
  for (const q of arr) {
    if (q.QuestionID === qid) return q;
  }
  return null;
}

function buildIdentity(history, packItem) {
  const id = {};
  id.questionId = history.questionId;
  id.part = packItem ? (packItem.Part || 1) : 1;
  id.section = history.section;
  id.sectionName = SECTION_NAMES[history.section] || 'Unknown';
  id.pack = history.pack;
  id.topic = history.topic || (packItem ? packItem.Topic : null) || '';
  id.microTopic = packItem ? (packItem.MicroTopic || '') : '';
  id.difficulty = history.difficulty || (packItem ? packItem.Difficulty : null) || 'Moderate';
  id.difficultyScore =
    history.difficultyScore != null
      ? history.difficultyScore
      : packItem
        ? packItem.DifficultyScore
        : 3;
  id.cognitiveLevel =
    history.cognitiveLevel || (packItem ? packItem.CognitiveLevel : null) || 'Understand';
  id.questionState = history.currentState || (packItem ? packItem.question_state : null) || 'Unknown';
  id.certificationDate = packItem ? (packItem.certification_date || null) : null;
  id.certificationBatch = packItem ? (packItem.certification_batch || null) : null;
  id.losTag = packItem ? (packItem.LOSTag || null) : null;
  id.itemType = packItem ? (packItem.ItemType || null) : null;
  id.itemStyle = packItem ? (packItem.ItemStyle || null) : null;
  id.calculationItem = packItem
    ? packItem.CalculationItem != null
      ? packItem.CalculationItem
      : null
    : null;
  id.uniqueConceptKey = packItem ? (packItem.UniqueConceptKey || null) : null;
  return id;
}

function buildContent(packItem) {
  const content = {};
  content.stem = packItem ? packItem.Stem || '' : '';
  content.choices = {};
  if (packItem && packItem.Choices) {
    content.choices.A = packItem.Choices.A || '';
    content.choices.B = packItem.Choices.B || '';
    content.choices.C = packItem.Choices.C || '';
    content.choices.D = packItem.Choices.D || '';
  } else {
    content.choices = { A: '', B: '', C: '', D: '' };
  }
  content.correctChoice = packItem ? packItem.CorrectChoice || '?' : '?';
  const ecFull = packItem ? packItem.ExplanationCorrect || '' : '';
  content.explanationCorrectFull = ecFull.substring(0, 2000);
  content.explanationCorrectSummary = ecFull.substring(0, 200);
  content.distractorExplanations = { A: '', B: '', C: '', D: '' };
  if (packItem) {
    content.distractorExplanations.A = packItem.ExplanationWrongA || '';
    content.distractorExplanations.B = packItem.ExplanationWrongB || '';
    content.distractorExplanations.C = packItem.ExplanationWrongC || '';
    content.distractorExplanations.D = packItem.ExplanationWrongD || '';
  }
  return content;
}

function buildDefects(history, workQueueItem) {
  const defectHistory = (history.defectHistory || []).map((d) => ({
    defectId: d.defectId || '',
    severity: d.severity || 'Unknown',
    status: d.status || 'Unknown',
    class: d.class || null,
    domain: d.domain || null,
    description: d.description || null,
  }));
  const defectFlags = workQueueItem ? workQueueItem.defect_flags || [] : [];
  const blockedByDefects = defectFlags.length > 0;

  return {
    totalDefects: defectHistory.length,
    defectHistory,
    defectFlags,
    blockedByDefects,
  };
}

function buildRecommendations(recRegistry, qid) {
  if (!recRegistry || !recRegistry.recommendations) {
    return { totalRecommendations: 0, recommendations: [] };
  }
  const matches = [];
  for (const rec of recRegistry.recommendations) {
    if (rec.questionIds && rec.questionIds.includes(qid)) {
      matches.push({
        recommendationId: rec.recommendationId || '',
        type: rec.type || '',
        sourceScan: rec.sourceScan || '',
        severity: rec.severity || '',
        status: rec.status || 'Unknown',
        description: rec.description || '',
        targetSession: rec.targetSession || null,
      });
    }
  }
  return { totalRecommendations: matches.length, recommendations: matches };
}

function buildSessions(history, sessionRegistry) {
  const histSessions = history.sessions || [];
  const sessions = [];
  for (const hs of histSessions) {
    const sessionId = hs.sessionId || '';
    let mode = null;
    let title = null;
    let series = null;
    let date = hs.date || '';

    if (sessionRegistry && sessionRegistry.sessions) {
      const full = sessionRegistry.sessions.find((s) => s.sessionId === sessionId);
      if (full) {
        mode = full.mode || null;
        title = full.title || null;
        series = full.series || null;
        if (!date && full.date) date = full.date;
      }
    }
    sessions.push({
      sessionId,
      date,
      mode,
      title,
      series,
      activity: hs.activity || '',
    });
  }
  sessions.sort((a, b) => {
    const da = a.date || '0000';
    const db = b.date || '0000';
    if (da < db) return -1;
    if (da > db) return 1;
    return 0;
  });
  return { totalSessions: sessions.length, sessions };
}

function buildChallenges(challengeRegistry, qid) {
  if (!challengeRegistry || !challengeRegistry.challenges) {
    return { totalChallenges: 0, challenges: [] };
  }
  const matches = [];
  for (const ch of challengeRegistry.challenges) {
    if (ch.questionId === qid) {
      matches.push({
        challengeId: ch.challengeId || '',
        status: ch.status || 'Unknown',
        type: ch.type || 'OTHER',
        priority: ch.priority || 'MEDIUM',
        studentDescription: ch.studentDescription || '',
        reportedDate: ch.reportedDate || '',
        resolution: ch.resolution || null,
        linkedDefects: ch.linkedDefects || [],
      });
    }
  }
  return { totalChallenges: matches.length, challenges: matches };
}

function buildCertificationHistory(history, packItem) {
  const certs = (history.certificationHistory || []).map((c) => ({
    sessionId: c.sessionId || '',
    type: c.type || '',
    date: c.date || '',
    title: c.title || '',
  }));
  const stateTransitions = [];
  if (packItem && packItem.question_state) {
    stateTransitions.push(packItem.question_state);
  } else if (history.currentState) {
    stateTransitions.push(history.currentState);
  }
  if (certs.length > 0 && stateTransitions.length === 1) {
    stateTransitions.unshift('Unprocessed');
  }

  return {
    totalCertifications: certs.length,
    certifications: certs,
    stateTransitions,
  };
}

function buildReadiness(readinessData, workQueueItem, certWaves, qid, section) {
  const domReady = { domain: section || '?', readinessScore: '0.0', totalInDomain: 0, readyInDomain: 0 };
  let readinessState = 'CERTIFY';
  let blockReason = '';
  let transitionPath = 'Already Certified';
  let eligible = false;

  if (readinessData && readinessData.items) {
    const item = readinessData.items.find((i) => i.qid === qid);
    if (item) {
      readinessState = item.readinessState || 'CERTIFY';
      blockReason = item.blockReason || '';
      transitionPath = item.transitionPath || '';
      eligible = item.eligibleForCertification || false;
    }
  }

  if (readinessData && readinessData.perDomain && section) {
    const dd = readinessData.perDomain[section];
    if (dd) {
      domReady.domain = section;
      domReady.readinessScore = dd.readinessScore || '0.0';
      domReady.totalInDomain = dd.total || 0;
      domReady.readyInDomain = dd.ready || 0;
    }
  }

  let waveAssignment = null;
  if (certWaves && certWaves.waves) {
    for (const w of certWaves.waves) {
      if (w.items && w.items.includes(qid)) {
        waveAssignment = {
          waveId: w.waveId || '',
          waveTier: w.waveTier || '',
          waveLabel: w.label || '',
        };
        break;
      }
    }
  }

  let workQueue = null;
  if (workQueueItem) {
    workQueue = {
      lane: workQueueItem.lane || '',
      reason: workQueueItem.reason || '',
    };
  }

  return {
    readinessState,
    blockReason,
    transitionPath,
    eligibleForCertification: eligible,
    domainReadiness: domReady,
    waveAssignment,
    workQueue,
  };
}

function buildHealthSummary(dossier) {
  const id = dossier.sections['1_identity'] || {};
  const defects = dossier.sections['3_defects'] || {};
  const challenges = dossier.sections['6_challenges'] || {};
  const recs = dossier.sections['4_recommendations'] || {};
  const readiness = dossier.sections['8_readiness'] || {};
  const content = dossier.sections['2_content'] || {};

  const isArchived = id.questionState === 'Archived';
  const criticalDefects = (defects.defectHistory || []).filter(
    (d) => d.severity === 'Critical',
  ).length;
  const activeDefects = defects.defectFlags ? defects.defectFlags.length : 0;
  const openChallenges = (challenges.challenges || []).filter(
    (c) => c.status === 'OPEN' || c.status === 'INVESTIGATING',
  ).length;
  const pendingRecs = (recs.recommendations || []).filter(
    (r) => r.status === 'Open',
  ).length;
  const isBlocked =
    readiness.readinessState === 'BLOCKED' || readiness.readinessState === 'REMEDIATE';
  const inWave = readiness.waveAssignment !== null;

  const distractorExplanations = content.distractorExplanations || { A: '', B: '', C: '', D: '' };
  const cc = content.correctChoice || '';
  const distractorKeys = ['A', 'B', 'C', 'D'].filter((k) => k !== cc);
  const nonEmptyDistractors = distractorKeys.filter(
    (k) => distractorExplanations[k] && distractorExplanations[k].length > 0,
  ).length;
  let explanationQuality = 'COMPLETE';
  if (nonEmptyDistractors === 0) explanationQuality = 'MISSING';
  else if (nonEmptyDistractors < distractorKeys.length) explanationQuality = 'PARTIAL';

  const signals = {
    certified: id.questionState === 'Certified',
    activeDefects,
    criticalDefects,
    openChallenges,
    pendingRecommendations: pendingRecs,
    blockedReadiness: isBlocked,
    inCertificationWave: inWave,
    explanationQuality,
  };

  let verdict = 'HEALTHY';
  let verdictReason = 'Question is certified with no defects, challenges, or pending recommendations';

  if (criticalDefects > 0 || isArchived) {
    verdict = 'DEFECTIVE';
    verdictReason = isArchived
      ? 'Question is Archived — excluded from learner delivery pool'
      : 'Critical-severity defect present — unsafe for learner delivery';
  } else if (activeDefects > 0 || openChallenges > 0 || isBlocked || pendingRecs > 0) {
    verdict = 'NEEDS_REVIEW';
    const reasons = [];
    if (activeDefects > 0) reasons.push(`${activeDefects} active defect flag(s)`);
    if (openChallenges > 0) reasons.push(`${openChallenges} open challenge(s)`);
    if (pendingRecs > 0) reasons.push(`${pendingRecs} pending recommendation(s)`);
    if (isBlocked) reasons.push('readiness is BLOCKED/REMEDIATE');
    verdictReason = reasons.join('; ');
    if (!verdictReason) verdictReason = 'Requires review';
  }

  return { verdict, verdictReason, signals };
}

function main() {
  const args = process.argv.slice(2);
  let qid = null;
  for (const arg of args) {
    if (arg.startsWith('--qid=')) {
      qid = arg.slice(6).trim();
    } else if (!arg.startsWith('-') && !qid) {
      qid = arg.trim();
    }
  }

  if (!qid) {
    const err = {
      error: 'MISSING_ARGUMENT',
      message: 'Usage: node scripts/question_investigation_api.js --qid=<QuestionID>',
    };
    process.stdout.write(JSON.stringify(err, null, 2));
    process.exit(3);
  }

  const parsed = parseQid(qid);
  if (!parsed) {
    const err = {
      error: 'INVALID_QID_FORMAT',
      message: `QID "${qid}" does not match any known format`,
      requestedQid: qid,
      validFormats: [
        'P1-{S}-{NNN}  (Pack A)',
        'P1B-{S}-{NNN} (Pack B)',
        'P1-{S}C-{NNN} (Pack C)',
        'P1-{S}D-{NNN} (Pack D)',
        'P1E-{S}-{NNN} (Pack E)',
        'P1-E-R{NN}   (Pack E R-series)',
      ],
    };
    process.stdout.write(JSON.stringify(err, null, 2));
    process.exit(2);
  }

  const sourcesUsed = [];

  const historyData = loadJson(path.join(OUTPUT_DIR, 'question_history.json'));
  if (historyData) sourcesUsed.push('question_history.json');
  let historyEntry = null;
  if (historyData && historyData.questions) {
    historyEntry = historyData.questions[qid] || null;
  }

  const packItem = findQuestionInPack(qid, parsed.pack);
  if (packItem) sourcesUsed.push(`${parsed.pack}_corrected.js`);

  if (!historyEntry && !packItem) {
    const err = {
      error: 'QID_NOT_FOUND',
      message: `Question ID "${qid}" not found in any pack file or history`,
      requestedQid: qid,
    };
    process.stdout.write(JSON.stringify(err, null, 2));
    process.exit(1);
  }

  const DEFAULT_ENTRY = {
    questionId: qid,
    currentState: 'Unknown',
    pack: parsed.pack,
    section: parsed.section,
    topic: '',
    cognitiveLevel: 'Understand',
    difficulty: 'Moderate',
    difficultyScore: 3,
    timeline: { totalSessions: 0, totalRecommendations: 0, totalChallenges: 0, totalDefects: 0, totalCertifications: 0, totalVersions: 0 },
    sessions: [],
    certificationHistory: [],
    recommendations: [],
    challenges: [],
    defectHistory: [],
    versions: [],
  };
  const h = historyEntry || DEFAULT_ENTRY;

  const recRegistry = loadJson(path.join(OUTPUT_DIR, 'recommendation_registry.json'));
  if (recRegistry) sourcesUsed.push('recommendation_registry.json');

  const challengeRegistry = loadJson(path.join(OUTPUT_DIR, 'challenge_registry.json'));
  if (challengeRegistry) sourcesUsed.push('challenge_registry.json');

  const sessionRegistry = loadJson(path.join(OUTPUT_DIR, 'session_registry.json'));
  if (sessionRegistry) sourcesUsed.push('session_registry.json');

  const readinessData = loadJson(path.join(OUTPUT_DIR, 'readiness_scoring.json'));
  if (readinessData) sourcesUsed.push('readiness_scoring.json');

  const workQueueData = loadJson(path.join(OUTPUT_DIR, 'work_queue.json'));
  if (workQueueData) sourcesUsed.push('work_queue.json');

  const certWaves = loadJson(path.join(OUTPUT_DIR, 'certification_waves.json'));
  if (certWaves) sourcesUsed.push('certification_waves.json');

  let workQueueItem = null;
  if (workQueueData && workQueueData.lanes) {
    for (const lane of Object.values(workQueueData.lanes)) {
      if (Array.isArray(lane)) {
        const found = lane.find((wq) => wq.qid === qid);
        if (found) {
          workQueueItem = found;
          break;
        }
      }
    }
  }

  const timestamp = new Date().toISOString();
  const invId = `INV-${timestamp.replace(/[:-]/g, '').replace(/\..+$/, '')}-${qid}`;

  const identity = buildIdentity(h, packItem);
  const content = buildContent(packItem);
  const defects = buildDefects(h, workQueueItem);
  const recommendations = buildRecommendations(recRegistry, qid);
  const sessions = buildSessions(h, sessionRegistry);
  const challenges = buildChallenges(challengeRegistry, qid);
  const certHistory = buildCertificationHistory(h, packItem);
  const readiness = buildReadiness(readinessData, workQueueItem, certWaves, qid, parsed.section);

  const dossier = {
    investigationId: invId,
    timestamp,
    requestedQid: qid,
    sourcesUsed,
    sections: {
      '1_identity': identity,
      '2_content': content,
      '3_defects': defects,
      '4_recommendations': recommendations,
      '5_sessions': sessions,
      '6_challenges': challenges,
      '7_certificationHistory': certHistory,
      '8_readiness': readiness,
      '9_healthSummary': {},
    },
  };

  dossier.sections['9_healthSummary'] = buildHealthSummary(dossier);

  const outputJson = JSON.stringify(dossier, null, 2);

  const outputPath = path.join(OUTPUT_DIR, 'question_investigation.json');
  try {
    fs.writeFileSync(outputPath, outputJson, 'utf8');
    console.log(JSON.stringify({ status: 'OK', investigationId: invId, outputFile: outputPath, requestedQid: qid }, null, 2));
  } catch (writeErr) {
    console.error(JSON.stringify({ status: 'WRITE_ERROR', message: writeErr.message, investigationId: invId, requestedQid: qid }));
    process.stdout.write(outputJson);
  }
}

main();
