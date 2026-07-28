// Script 11 — Challenge & Investigation Registry
// Creates and manages student challenge records linked to questions, sessions, and recommendations.
// Output: scripts/output/challenge_registry.json, challenge_to_question.json,
//          challenge_to_session.json, challenge_to_recommendation.json
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const pr = require('./engine/pack_reader');

const OUTPUT_DIR = path.join(__dirname, 'output');

const CHALLENGE_STATUSES = ['OPEN', 'INVESTIGATING', 'RESOLVED', 'CLOSED', 'DISMISSED'];
const CHALLENGE_TYPES = [
  'CONTENT_ERROR',       // Student believes content has error
  'TECHNICAL_ISSUE',     // Application bug / rendering issue
  'ANSWER_DISPUTE',      // Student disagrees with answer key
  'EXPLANATION_ISSUE',   // Explanation is incomplete or confusing
  'AMBIGUITY',           // Question stem is ambiguous
  'OTHER'
];
const RESOLUTION_TYPES = [
  'CONFIRMED_DEFECT',    // Student was right — defect exists
  'CONFIRMED_VALID',     // Question is correct as-is; student misunderstood
  'INCONCLUSIVE',        // Cannot determine from available evidence
  'DUPLICATE',           // Same issue already reported
  'NO_ACTION'            // Administrative close, no investigation
];

function generateChallengeId(index) {
  const hash = crypto.createHash('sha256').update(`challenge-${index}-${Date.now()}`).digest('hex');
  return `CH-${hash.substring(0, 8).toUpperCase()}`;
}

function loadIndex(fileName) {
  const filePath = path.join(OUTPUT_DIR, fileName);
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function loadSessionToQuestion() {
  const data = loadIndex('session_to_question_index.json');
  if (!data) return {};
  const result = {};
  for (const [sid, entry] of Object.entries(data)) {
    result[sid] = entry.questionIds || entry.QuestionIds || [];
  }
  return result;
}

function loadQuestionToSession() {
  const data = loadIndex('question_to_session_index.json');
  if (!data) return {};
  const result = {};
  for (const [qid, entry] of Object.entries(data)) {
    result[qid] = {
      sessions: (entry.sessions || []).map(s => s.sessionId || s.SessionId || s),
      currentState: entry.currentState || entry.CurrentState || 'Unknown',
      pack: entry.pack || entry.Pack || ''
    };
  }
  return result;
}

function loadRecommendations() {
  const data = loadIndex('recommendation_registry.json');
  if (!data) return [];
  return data.recommendations || data.Recommendations || [];
}

function loadSessionRegistry() {
  const data = loadIndex('session_registry.json');
  if (!data) return [];
  return data.sessions || data.Sessions || [];
}

function findSessionsForQuestion(qid, q2s) {
  const entry = q2s[qid];
  if (!entry) return [];
  return entry.sessions;
}

function findRecommendationsForQuestion(qid, recs) {
  return recs
    .filter(r => (r.questionIds || []).includes(qid))
    .map(r => r.recommendationId || r.RecommendationId || '');
}

function findQuestionsWithDefects(recs) {
  const qids = new Set();
  for (const r of recs) {
    for (const qid of (r.questionIds || [])) {
      qids.add(qid);
    }
  }
  return Array.from(qids);
}

function selectCandidateQuestions(rootDir, recs, q2s) {
  const candidates = [];

  const defectQids = findQuestionsWithDefects(recs);
  for (const qid of defectQids.slice(0, 25)) {
    if (q2s[qid]) {
      candidates.push({
        qid,
        reason: 'Known defect — likely to generate challenges',
        sessionCount: (q2s[qid].sessions || []).length,
        state: q2s[qid].currentState
      });
    }
  }

  const allItems = pr.getAllItems(rootDir);
  const certifiedItems = allItems.filter(i => i.question_state === 'Certified');

  const sampled = new Set(candidates.map(c => c.qid));
  for (const item of certifiedItems) {
    if (sampled.size >= 50) break;
    if (!sampled.has(item.QuestionID)) {
      sampled.add(item.QuestionID);
      candidates.push({
        qid: item.QuestionID,
        reason: 'Certified item — active in learner pool',
        sessionCount: (q2s[item.QuestionID]?.sessions || []).length,
        state: 'Certified'
      });
    }
  }

  return candidates;
}

function pickRandom(arr, n) {
  const copy = [...arr];
  const result = [];
  while (result.length < n && copy.length > 0) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}

function dateOffset(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
}

function generateSyntheticChallenges(rootDir) {
  const recs = loadRecommendations();
  const q2s = loadQuestionToSession();
  const sessions = loadSessionRegistry();
  const sessionIds = sessions.map(s => s.sessionId).filter(Boolean);

  const candidates = selectCandidateQuestions(rootDir, recs, q2s);
  const selected = candidates.slice(0, 35);

  const challenges = [];

  const statusFlow = ['OPEN', 'OPEN', 'OPEN', 'INVESTIGATING', 'INVESTIGATING',
    'RESOLVED', 'RESOLVED', 'CLOSED', 'CLOSED', 'DISMISSED'];

  for (let i = 0; i < selected.length; i++) {
    const candidate = selected[i];
    const status = statusFlow[i % statusFlow.length];
    const linkedRecs = findRecommendationsForQuestion(candidate.qid, recs);
    const linkedSessions = findSessionsForQuestion(candidate.qid, q2s);

    const resolver = linkedSessions.slice(0, 2).concat(
      pickRandom(sessionIds, 2 - Math.min(2, linkedSessions.length))
    );

    let resolutionType = null;
    let resolutionDetail = '';

    if (status === 'RESOLVED' || status === 'CLOSED' || status === 'DISMISSED') {
      const rtIdx = i % RESOLUTION_TYPES.length;
      resolutionType = RESOLUTION_TYPES[rtIdx];
      resolutionDetail = (rtIdx === 0) ?
        'Defect confirmed by independent verification. DL corrective action logged.' :
        (rtIdx === 1) ? 'Question reviewed — correct as-is. Student feedback provided.' :
        (rtIdx === 2) ? 'Insufficient evidence. Deferred to next certification wave.' :
        (rtIdx === 3) ? 'Duplicate of existing report. Merged.' :
        'No actionable issue. Challenge dismissed.';
    }

    const typeIdx = i % CHALLENGE_TYPES.length;
    const studentDescriptions = [
      'The correct answer shown doesn\'t match what I calculated independently.',
      'One of the distractor explanations appears to describe the wrong choice.',
      'The question stem has a typo — the numbers don\'t add up.',
      'The explanation references an ASC standard that doesn\'t apply here.',
      'The difficulty label doesn\'t match the question complexity.',
      'The application crashed when I submitted this question.'
    ];

    const challenge = {
      challengeId: generateChallengeId(i),
      status,
      type: CHALLENGE_TYPES[typeIdx],
      studentId: `USER-${(100 + i).toString().padStart(3, '0')}`,
      testAttemptId: `ATTEMPT-${(1000 + i).toString().padStart(4, '0')}`,
      questionId: candidate.qid,
      reportedDate: dateOffset(i * 3 + 1),
      studentDescription: studentDescriptions[typeIdx % studentDescriptions.length],
      source: i < 25 ? 'Student Report' : 'System Flag',
      priority: i < 15 ? 'HIGH' : (i < 30 ? 'MEDIUM' : 'LOW'),

      linkedSessions: resolver,
      linkedRecommendations: linkedRecs,
      linkedDefects: linkedRecs.length > 0 ? ['DL-008', 'DL-026', 'DL-013'].slice(0, Math.min(2, linkedRecs.length)) : [],

      assignedTo: status !== 'OPEN' ? `REVIEWER-${(i % 5) + 1}` : '',
      investigationNotes: status !== 'OPEN' ? `Investigated by automated scan S${800 + i}. Cross-referenced with REVISION_HISTORY.md entries.` : '',

      resolution: status === 'RESOLVED' || status === 'CLOSED' || status === 'DISMISSED' ? {
        type: resolutionType,
        resolvedDate: dateOffset(i * -1),
        resolvedBy: `RESOLVER-${(i % 3) + 1}`,
        resolutionSession: resolver[0] || '',
        detail: resolutionDetail
      } : null,

      createdDate: dateOffset(i * 5 + 2),
      lastModifiedDate: dateOffset(i * -1)
    };

    challenges.push(challenge);
  }

  return challenges;
}

function buildChallengeRegistry(rootDir) {
  const timestamp = new Date().toISOString();

  const challenges = generateSyntheticChallenges(rootDir);

  const challengeToQuestion = {};
  const challengeToSession = {};
  const challengeToRecommendation = {};

  for (const ch of challenges) {
    if (!challengeToQuestion[ch.questionId]) {
      challengeToQuestion[ch.questionId] = [];
    }
    challengeToQuestion[ch.questionId].push(ch.challengeId);

    for (const sid of ch.linkedSessions) {
      if (!challengeToSession[sid]) {
        challengeToSession[sid] = [];
      }
      if (!challengeToSession[sid].includes(ch.challengeId)) {
        challengeToSession[sid].push(ch.challengeId);
      }
    }

    for (const rid of ch.linkedRecommendations) {
      if (!challengeToRecommendation[rid]) {
        challengeToRecommendation[rid] = [];
      }
      if (!challengeToRecommendation[rid].includes(ch.challengeId)) {
        challengeToRecommendation[rid].push(ch.challengeId);
      }
    }
  }

  const summary = {
    totalChallenges: challenges.length,
    byStatus: {},
    byType: {},
    byResolution: CHALLENGE_STATUSES.reduce((acc, s) => ({ ...acc, [s]: 0 }), {}),
    questionsWithChallenges: Object.keys(challengeToQuestion).length,
    sessionsWithChallenges: Object.keys(challengeToSession).length,
    recommendationsWithChallenges: Object.keys(challengeToRecommendation).length,
    syntheticDataNote: 'This registry contains synthetic seed data for development and testing. Real student challenge data will replace this in production.'
  };

  for (const ch of challenges) {
    summary.byStatus[ch.status] = (summary.byStatus[ch.status] || 0) + 1;
    summary.byType[ch.type] = (summary.byType[ch.type] || 0) + 1;
  }

  const registry = {
    schemaVersion: '2.0',
    generatedTimestamp: timestamp,
    challengeSchema: {
      challengeId: 'CH-XXXXXXXX',
      status: CHALLENGE_STATUSES.join(' | '),
      type: CHALLENGE_TYPES.join(' | '),
      resolutionTypes: RESOLUTION_TYPES.join(' | '),
      flowStateMachine: {
        'OPEN →': ['INVESTIGATING', 'DISMISSED'],
        'INVESTIGATING →': ['RESOLVED', 'CLOSED', 'DISMISSED'],
        'RESOLVED →': ['CLOSED'],
        'CLOSED →': [],
        'DISMISSED →': []
      }
    },
    summary,
    challenges
  };

  return { registry, challengeToQuestion, challengeToSession, challengeToRecommendation };
}

function runSelfTest() {
  console.log('=== Challenge Registry Self-Test ===');
  const rootDir = path.resolve(__dirname, '..');
  const { registry, challengeToQuestion, challengeToSession, challengeToRecommendation } =
    buildChallengeRegistry(rootDir);

  console.log(`Total challenges: ${registry.summary.totalChallenges}`);
  console.log(`By status: ${JSON.stringify(registry.summary.byStatus)}`);
  console.log(`By type: ${JSON.stringify(registry.summary.byType)}`);
  console.log(`Questions with challenges: ${registry.summary.questionsWithChallenges}`);
  console.log(`Sessions with challenges: ${registry.summary.sessionsWithChallenges}`);
  console.log(`Recs with challenges: ${registry.summary.recommendationsWithChallenges}`);

  const challengeKeys = Object.keys(challengeToQuestion);
  if (challengeKeys.length > 0) {
    console.log(`Sample QID ${challengeKeys[0]}: ${challengeToQuestion[challengeKeys[0]].length} challenges`);
  }

  const pass = registry.summary.totalChallenges > 0;
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
  console.log('Challenge & Investigation Registry — generating synthetic seed data');

  const { registry, challengeToQuestion, challengeToSession, challengeToRecommendation } =
    buildChallengeRegistry(rootDir);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'challenge_registry.json'),
    JSON.stringify(registry, null, 2), 'utf8'
  );
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'challenge_to_question.json'),
    JSON.stringify(challengeToQuestion, null, 2), 'utf8'
  );
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'challenge_to_session.json'),
    JSON.stringify(challengeToSession, null, 2), 'utf8'
  );
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'challenge_to_recommendation.json'),
    JSON.stringify(challengeToRecommendation, null, 2), 'utf8'
  );

  console.log(`Challenges: ${registry.summary.totalChallenges} | Qs: ${registry.summary.questionsWithChallenges} | Ss: ${registry.summary.sessionsWithChallenges} | Rs: ${registry.summary.recommendationsWithChallenges}`);
  console.log(`Output: ${path.join(OUTPUT_DIR, 'challenge_registry.json')}`);
  console.log(`Index:  ${path.join(OUTPUT_DIR, 'challenge_to_question.json')}`);
  console.log(`Index:  ${path.join(OUTPUT_DIR, 'challenge_to_session.json')}`);
  console.log(`Index:  ${path.join(OUTPUT_DIR, 'challenge_to_recommendation.json')}`);
}

module.exports = { buildChallengeRegistry, runSelfTest };
