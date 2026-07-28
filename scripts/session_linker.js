// Script 6 — Session Linker
// Builds bidirectional indexes: question → sessions, session → questions
// Output: scripts/output/question_to_session_index.json, session_to_question_index.json
const fs = require('fs');
const path = require('path');
const pr = require('./engine/pack_reader');

const OUTPUT_DIR = path.join(__dirname, 'output');
const KNOWLEDGE_DIR = path.join(__dirname, '..', 'knowledge');
const PACKS = ['pack_a', 'pack_b', 'pack_c', 'pack_d', 'pack_e'];

function parseRevisionHistory(revisionPath) {
  if (!fs.existsSync(revisionPath)) return [];

  const content = fs.readFileSync(revisionPath, 'utf8');
  const sessions = [];
  const lines = content.split('\n');

  let currentSession = null;
  let section = '';

  for (const line of lines) {
    const sessionMatch = line.match(/S(\d+[A-Za-z.]*\d*)/);
    if (sessionMatch && (line.startsWith('##') || line.startsWith('###') || line.includes('Session'))) {
      if (currentSession && currentSession.qids.length > 0) {
        sessions.push(currentSession);
      }
      currentSession = {
        sessionId: 'S' + sessionMatch[1],
        rawTitle: line.replace(/^#+\s*/, '').trim(),
        qids: [],
        activities: [],
        date: ''
      };
      section = 'session';
      continue;
    }

    if (!currentSession) continue;

    if (line.match(/^\d{4}-\d{2}-\d{2}/)) {
      currentSession.date = line.trim().split(/\s+/)[0];
    }

    const qidMatch = line.match(/P1[A-Z]*?-[A-Z]+-\d{3,4}|P1[A-Z]*?-[A-Z]+-[A-Z]\d{2,3}|P1-[A-Z]-R\d{2}/gi);
    if (qidMatch) {
      for (const qid of qidMatch) {
        if (!currentSession.qids.includes(qid)) {
          currentSession.qids.push(qid);
        }
      }
    }

    const actionMatch = line.match(/Certified|Certified:|Certified pool:|Archived|Remediated|Fixed|Audited|Scanned|Reviewed/gi);
    if (actionMatch) {
      currentSession.activities.push(line.trim().substring(0, 120));
    }
  }

  if (currentSession && currentSession.qids.length > 0) {
    sessions.push(currentSession);
  }

  return sessions;
}

function buildSessionLinker(rootDir) {
  const timestamp = new Date().toISOString();
  const revisionPath = path.join(rootDir, 'knowledge', 'REVISION_HISTORY.md');

  const sessions = parseRevisionHistory(revisionPath);

  // Build question-to-session index
  const questionToSession = {};
  for (const session of sessions) {
    for (const qid of session.qids) {
      if (!questionToSession[qid]) {
        questionToSession[qid] = {
          qid,
          sessions: [],
          defectReferences: [],
          currentState: 'Unknown'
        };
      }
      questionToSession[qid].sessions.push({
        sessionId: session.sessionId,
        activity: session.rawTitle || session.activities[0] || 'Unknown',
        date: session.date || ''
      });
    }
  }

  // Enrich with current state from pack files
  for (const packName of PACKS) {
    let items;
    try {
      items = pr.parsePackFile(packName, rootDir);
    } catch (e) { continue; }

    for (const item of items) {
      if (!item.QuestionID) continue;
      if (questionToSession[item.QuestionID]) {
        questionToSession[item.QuestionID].currentState = item.question_state || 'Unknown';
        questionToSession[item.QuestionID].pack = packName;
        questionToSession[item.QuestionID].section = item.Section;
      }
    }
  }

  // Build session-to-question index
  const sessionToQuestion = {};
  for (const session of sessions) {
    sessionToQuestion[session.sessionId] = {
      sessionId: session.sessionId,
      title: session.rawTitle,
      questionIds: session.qids,
      questionCount: session.qids.length,
      activityType: session.activities[0] || 'Unknown',
      date: session.date || ''
    };
  }

  return {
    generatedTimestamp: timestamp,
    revisionHistorySource: revisionPath,
    questionToSession,
    sessionToQuestion,
    summary: {
      totalSessions: Object.keys(sessionToQuestion).length,
      totalQuestionsLinked: Object.keys(questionToSession).length
    }
  };
}

function runSelfTest() {
  console.log('=== Session Linker Self-Test ===');
  const rootDir = path.resolve(__dirname, '..');
  const results = buildSessionLinker(rootDir);

  console.log(`Sessions found: ${results.summary.totalSessions}`);
  console.log(`Questions linked: ${results.summary.totalQuestionsLinked}`);

  const sessionKeys = Object.keys(results.sessionToQuestion).slice(0, 5);
  for (const key of sessionKeys) {
    const s = results.sessionToQuestion[key];
    console.log(`  ${key}: ${s.questionCount} questions — ${s.title}`);
  }

  // Check known QID has session references
  const knownQids = Object.keys(results.questionToSession).filter(q => q.startsWith('P1-'));
  if (knownQids.length > 0) {
    const sample = results.questionToSession[knownQids[0]];
    console.log(`Sample QID ${knownQids[0]}: ${sample.sessions.length} sessions, state=${sample.currentState}`);
  }

  const pass = results.summary.totalSessions > 0;
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
  console.log('Session Linker — building bidirectional indexes');

  const results = buildSessionLinker(rootDir);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const q2sPath = path.join(OUTPUT_DIR, 'question_to_session_index.json');
  fs.writeFileSync(q2sPath, JSON.stringify(results.questionToSession, null, 2), 'utf8');

  const s2qPath = path.join(OUTPUT_DIR, 'session_to_question_index.json');
  fs.writeFileSync(s2qPath, JSON.stringify(results.sessionToQuestion, null, 2), 'utf8');

  console.log(`Sessions: ${results.summary.totalSessions} | Questions linked: ${results.summary.totalQuestionsLinked}`);
  console.log(`Output: ${q2sPath}`);
  console.log(`Output: ${s2qPath}`);
}

module.exports = { buildSessionLinker, runSelfTest };
