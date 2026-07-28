// Script 12 — Question History Builder
// Builds per-question history combining certification, session, recommendation, challenge,
// and version data across all sources. Primary input to the future Admin Question Workbench.
// Output: scripts/output/question_history.json
const fs = require('fs');
const path = require('path');
const pr = require('./engine/pack_reader');

const OUTPUT_DIR = path.join(__dirname, 'output');
const KNOWLEDGE_DIR = path.join(__dirname, '..', 'knowledge');

function loadJSON(fileName) {
  const filePath = path.join(OUTPUT_DIR, fileName);
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function parseRevisionHistory(revisionPath) {
  if (!fs.existsSync(revisionPath)) return { sessions: [], questions: {} };

  const content = fs.readFileSync(revisionPath, 'utf8');
  const lines = content.split('\n');

  let currentSession = null;
  const sessions = [];
  const questionEvents = {};

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(S?\d+[A-Za-z.]*\d*)\s*(.*)/);
    const h3Match = line.match(/^###\s+(S?\d+[A-Za-z.]*\d*)\s*(.*)/);
    const match = h2Match || h3Match;

    if (match) {
      if (currentSession) sessions.push(currentSession);
      currentSession = {
        sessionId: match[1],
        title: (match[2] || match[1]).trim(),
        date: '',
        type: 'UNKNOWN',
        qids: [],
        rawLines: []
      };
      continue;
    }

    if (!currentSession) continue;

    currentSession.rawLines.push(line);

    if (line.match(/^\d{4}-\d{2}-\d{2}/) && !currentSession.date) {
      currentSession.date = line.trim().split(/\s+/)[0];
    }

    if (line.match(/READ-ONLY|read-only|Read-Only/i)) {
      currentSession.type = 'READ-ONLY';
    } else if (line.match(/IMPLEMENTATION|implementation|EXECUTION|Applied|Fixed|Remediated/i)) {
      currentSession.type = 'IMPLEMENTATION';
    }

    const qidMatch = line.match(/P1[A-Z]*?-[A-Z]+-\d{3,4}|P1[A-Z]*?-[A-Z]+-[A-Z]\d{2,3}|P1-[A-Z]-R\d{2}/gi);
    if (qidMatch) {
      for (const qid of qidMatch) {
        if (!currentSession.qids.includes(qid)) {
          currentSession.qids.push(qid);
        }
      }
    }
  }

  if (currentSession) sessions.push(currentSession);

  for (const session of sessions) {
    for (const qid of session.qids) {
      if (!questionEvents[qid]) {
        questionEvents[qid] = [];
      }
      questionEvents[qid].push({
        sessionId: session.sessionId,
        type: session.type,
        date: session.date,
        title: session.title
      });
    }
  }

  return { sessions, questionEvents };
}

function isCertificationEvent(sessionId, title, rawLines) {
  const keywords = /certif|certification|Certified|question_state.*Certified|transition.*Certified|In Audit.*Certified/i;
  return keywords.test(title) || (rawLines && rawLines.some(l => keywords.test(l)));
}

function extractVersionHistory(item) {
  const versions = [];
  if (item.Version) {
    versions.push({
      version: item.Version,
      date: item.ModifiedDate || item.CreatedDate || '',
      productionStatus: item.ProductionStatus || ''
    });
  }
  if (item.RevisionHistory && Array.isArray(item.RevisionHistory)) {
    for (const rev of item.RevisionHistory) {
      versions.push({
        version: rev.Version || '',
        date: rev.Date || '',
        author: rev.Author || '',
        summary: rev.Summary || ''
      });
    }
  }
  return versions;
}

function extractDefectHistory(qid) {
  const defectLibPath = path.join(KNOWLEDGE_DIR, 'DEFECT_LIBRARY.md');
  if (!fs.existsSync(defectLibPath)) return [];

  const content = fs.readFileSync(defectLibPath, 'utf8');
  const defects = [];

  const sections = content.split(/^## DL-\d{3}/m);
  const headerMatches = content.match(/^## (DL-\d{3})/gm);

  if (!headerMatches) return [];

  const defectIds = headerMatches.map(h => h.replace('## ', ''));
  const bodySections = content.split(/^## DL-\d{3}/m).slice(1);

  for (let i = 0; i < defectIds.length; i++) {
    const body = bodySections[i] || '';
    if (body.includes(qid)) {
      const severityMatch = body.match(/Severity\s+(Critical|High|Medium|Low|Informational)/i);
      const statusMatch = body.match(/Status\s+(Resolved|Open|In Progress).*?(?=\n|$)/i);
      defects.push({
        defectId: defectIds[i],
        severity: severityMatch ? severityMatch[1] : 'Unknown',
        status: statusMatch ? statusMatch[1] : 'Unknown'
      });
    }
  }

  return defects;
}

function extractTopicFromItem(item) {
  return item.Topic || item.Subtopic || '';
}

function buildQuestionHistory(rootDir) {
  const timestamp = new Date().toISOString();

  const allItems = pr.getAllItems(rootDir);

  const revisionPath = path.join(rootDir, 'knowledge', 'REVISION_HISTORY.md');
  const { sessions, questionEvents } = parseRevisionHistory(revisionPath);

  const q2sIndex = loadJSON('question_to_session_index.json') || {};
  const recs = (loadJSON('recommendation_registry.json') || {}).recommendations || [];
  const challenges = (loadJSON('challenge_registry.json') || {}).challenges || [];

  const questionHistory = {};
  const processed = new Set();

  for (const item of allItems) {
    const qid = item.QuestionID;
    if (!qid || processed.has(qid)) continue;
    processed.add(qid);

    const revHistoryEvents = questionEvents[qid] || [];
    const q2sEntry = q2sIndex[qid] || {};

    const certificationEvents = revHistoryEvents.filter(e =>
      isCertificationEvent(e.sessionId, e.title, [])
    );

    const linkedRecs = recs
      .filter(r => (r.questionIds || []).includes(qid))
      .map(r => ({
        recommendationId: r.recommendationId,
        type: r.type,
        severity: r.severity,
        status: r.status,
        sourceScan: r.sourceScan
      }));

    const linkedChallenges = challenges
      .filter(c => c.questionId === qid)
      .map(c => ({
        challengeId: c.challengeId,
        status: c.status,
        type: c.type,
        reportedDate: c.reportedDate,
        resolution: c.resolution
      }));

    const sessionRefs = [];
    if (Array.isArray(q2sEntry.sessions)) {
      sessionRefs.push(...q2sEntry.sessions.map(s => ({
        sessionId: typeof s === 'string' ? s : (s.sessionId || ''),
        activity: typeof s === 'string' ? '' : (s.activity || ''),
        date: typeof s === 'string' ? '' : (s.date || '')
      })));
    }
    if (sessionRefs.length === 0) {
      sessionRefs.push(...revHistoryEvents.map(e => ({
        sessionId: e.sessionId,
        activity: e.title,
        date: e.date
      })));
    }

    const versions = extractVersionHistory(item);
    const defectHistory = extractDefectHistory(qid);

    questionHistory[qid] = {
      questionId: qid,
      currentState: item.question_state || 'Unprocessed',
      pack: item.__pack || '',
      section: item.Section || '',
      topic: extractTopicFromItem(item),
      cognitiveLevel: item.CognitiveLevel || '',
      difficulty: item.Difficulty || '',
      difficultyScore: item.DifficultyScore || null,

      timeline: {
        totalSessions: sessionRefs.length,
        totalRecommendations: linkedRecs.length,
        totalChallenges: linkedChallenges.length,
        totalDefects: defectHistory.length,
        totalCertifications: certificationEvents.length,
        totalVersions: versions.length
      },

      sessions: sessionRefs,
      certificationHistory: certificationEvents,
      recommendations: linkedRecs,
      challenges: linkedChallenges,
      defectHistory,
      versions
    };
  }

  const summary = {
    totalQuestions: Object.keys(questionHistory).length,
    byState: {},
    byPack: {},
    questionsWithSessions: 0,
    questionsWithRecommendations: 0,
    questionsWithChallenges: 0,
    questionsWithDefects: 0,
    questionsWithCertifications: 0,
    questionsWithVersions: 0
  };

  for (const [qid, entry] of Object.entries(questionHistory)) {
    summary.byState[entry.currentState] = (summary.byState[entry.currentState] || 0) + 1;
    summary.byPack[entry.pack] = (summary.byPack[entry.pack] || 0) + 1;

    if (entry.timeline.totalSessions > 0) summary.questionsWithSessions++;
    if (entry.timeline.totalRecommendations > 0) summary.questionsWithRecommendations++;
    if (entry.timeline.totalChallenges > 0) summary.questionsWithChallenges++;
    if (entry.timeline.totalDefects > 0) summary.questionsWithDefects++;
    if (entry.timeline.totalCertifications > 0) summary.questionsWithCertifications++;
    if (entry.timeline.totalVersions > 0) summary.questionsWithVersions++;
  }

  return {
    schemaVersion: '2.0',
    generatedTimestamp: timestamp,
    sources: {
      packFiles: 'All pack_*_corrected.js via AM-1 Function Constructor Parse',
      revisionHistory: 'knowledge/REVISION_HISTORY.md',
      defects: 'knowledge/DEFECT_LIBRARY.md',
      sessions: 'session_linker.js → question_to_session_index.json',
      recommendations: 'recommendation_registry.json',
      challenges: 'challenge_registry.json'
    },
    summary,
    questions: questionHistory
  };
}

function runSelfTest() {
  console.log('=== Question History Builder Self-Test ===');
  const rootDir = path.resolve(__dirname, '..');
  const results = buildQuestionHistory(rootDir);

  console.log(`Total questions: ${results.summary.totalQuestions}`);
  console.log(`By state: ${JSON.stringify(results.summary.byState)}`);
  console.log(`By pack: ${JSON.stringify(results.summary.byPack)}`);
  console.log(`With sessions: ${results.summary.questionsWithSessions}`);
  console.log(`With recs:     ${results.summary.questionsWithRecommendations}`);
  console.log(`With challenges: ${results.summary.questionsWithChallenges}`);
  console.log(`With defects:  ${results.summary.questionsWithDefects}`);
  console.log(`With certs:    ${results.summary.questionsWithCertifications}`);

  const qids = Object.keys(results.questions);
  if (qids.length > 0) {
    const sample = results.questions[qids[0]];
    console.log(`Sample QID ${sample.questionId}:`);
    console.log(`  State: ${sample.currentState} | Pack: ${sample.pack} | Section: ${sample.section}`);
    console.log(`  Sessions: ${sample.timeline.totalSessions} | Recs: ${sample.timeline.totalRecommendations} | Challenges: ${sample.timeline.totalChallenges}`);

    const sample2 = results.questions[qids[Math.floor(qids.length / 2)]];
    if (sample2) {
      console.log(`Sample QID ${sample2.questionId}: Sessions=${sample2.timeline.totalSessions} Recs=${sample2.timeline.totalRecommendations}`);
    }
  }

  const pass = results.summary.totalQuestions > 0;
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
  console.log('Question History Builder — assembling per-question timelines');

  const results = buildQuestionHistory(rootDir);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const outPath = path.join(OUTPUT_DIR, 'question_history.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');

  console.log(`Questions: ${results.summary.totalQuestions} | With sessions: ${results.summary.questionsWithSessions}`);
  console.log(`With recs: ${results.summary.questionsWithRecommendations} | With challenges: ${results.summary.questionsWithChallenges}`);
  console.log(`Output: ${outPath}`);
}

module.exports = { buildQuestionHistory, runSelfTest };
