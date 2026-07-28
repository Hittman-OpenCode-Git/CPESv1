// Script 9 — Session Registry Generator
// Auto-generates session lookup from REVISION_HISTORY.md and session_status
// Output: scripts/output/session_registry.json
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'output');
const REPORTS_DIR = path.join(__dirname, '..', 'reports');

function parseRevisionHistory(revisionPath) {
  if (!fs.existsSync(revisionPath)) return [];

  const content = fs.readFileSync(revisionPath, 'utf8');
  const sessions = [];
  const lines = content.split('\n');

  let currentSession = null;

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(S?\d+[A-Za-z.]*\d*)\s*(.*)/);
    const h3Match = line.match(/^###\s+(S?\d+[A-Za-z.]*\d*)\s*(.*)/);

    const match = h2Match || h3Match;
    if (match) {
      if (currentSession) sessions.push(currentSession);
      currentSession = {
        sessionId: match[1],
        title: match[2] || match[1],
        date: '',
        mode: 'UNKNOWN',
        qids: [],
        description: '',
        series: classifySeries(match[1])
      };
      continue;
    }

    if (!currentSession) continue;

    if (line.match(/^\d{4}-\d{2}-\d{2}/)) {
      currentSession.date = line.trim().split(/\s+/)[0];
    }

    if (line.match(/READ-ONLY|read-only|Read-Only/i)) {
      currentSession.mode = 'READ-ONLY';
    } else if (line.match(/IMPLEMENTATION|implementation|EXECUTION/i)) {
      currentSession.mode = 'IMPLEMENTATION';
    }

    const qidMatch = line.match(/P1[A-Z]*?-[A-Z]+-\d{3,4}|P1[A-Z]*?-[A-Z]+-[A-Z]\d{2,3}|P1-[A-Z]-R\d{2}/gi);
    if (qidMatch) {
      for (const qid of qidMatch) {
        if (!currentSession.qids.includes(qid)) {
          currentSession.qids.push(qid);
        }
      }
    }

    if (!currentSession.description && line.trim().length > 20 && !line.startsWith('|') && !line.startsWith('-')) {
      currentSession.description = line.trim().substring(0, 200);
    }
  }

  if (currentSession) sessions.push(currentSession);
  return sessions;
}

function classifySeries(sessionId) {
  const num = parseInt(sessionId.replace(/^S/, '').split('.')[0]);
  if (isNaN(num)) return 'Unknown';
  if (num <= 99) return 'Early Content Audit';
  if (num <= 135) return '100-Series — May Coaching Layer';
  if (num <= 203 || sessionId.includes('S321')) return '200-Series — Framework v2 Design';
  if (num <= 399) return '300-Series — Certification Architecture';
  if (num <= 599) return '500-Series — Certification Waves';
  if (num <= 605) return '600-Series — Content Operations';
  if (num <= 727) return '700-Series — Governance & Enforcement';
  if (num <= 899) return '800-Series — Execution Lane';
  return '900+';
}

function generateSessionRegistry(rootDir) {
  const timestamp = new Date().toISOString();
  const revisionPath = path.join(rootDir, 'knowledge', 'REVISION_HISTORY.md');

  const sessions = parseRevisionHistory(revisionPath);

  const seriesIndex = {};
  for (const session of sessions) {
    if (!seriesIndex[session.series]) {
      seriesIndex[session.series] = [];
    }
    seriesIndex[session.series].push(session.sessionId);
  }

  for (const [series, ids] of Object.entries(seriesIndex)) {
    ids.sort((a, b) => {
      const na = parseInt(a.replace(/^S/, '').split('.')[0]) || 0;
      const nb = parseInt(b.replace(/^S/, '').split('.')[0]) || 0;
      return na - nb;
    });
  }

  return {
    generatedTimestamp: timestamp,
    revisionHistorySource: revisionPath,
    totalSessions: sessions.length,
    sessions: sessions.map(s => ({
      sessionId: s.sessionId,
      series: s.series,
      title: s.title,
      date: s.date,
      mode: s.mode,
      questionIds: s.qids,
      questionCount: s.qids.length,
      description: s.description
    })),
    seriesIndex
  };
}

function runSelfTest() {
  console.log('=== Session Registry Generator Self-Test ===');
  const rootDir = path.resolve(__dirname, '..');
  const results = generateSessionRegistry(rootDir);

  console.log(`Total sessions: ${results.totalSessions}`);
  console.log(`Series: ${Object.keys(results.seriesIndex).join(', ')}`);

  for (const [series, ids] of Object.entries(results.seriesIndex)) {
    console.log(`  ${series}: ${ids.length} sessions (${ids.slice(0, 3).join(', ')}${ids.length > 3 ? '...' : ''})`);
  }

  const firstSession = results.sessions[0];
  console.log(`First session: ${firstSession?.sessionId} — ${firstSession?.title}`);

  const pass = results.totalSessions > 0 && Object.keys(results.seriesIndex).length >= 2;
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
  console.log('Session Registry Generator');

  const results = generateSessionRegistry(rootDir);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outPath = path.join(OUTPUT_DIR, 'session_registry.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');

  console.log(`Sessions: ${results.totalSessions} | Series: ${Object.keys(results.seriesIndex).length}`);
  console.log(`Output: ${outPath}`);
}

module.exports = { generateSessionRegistry, runSelfTest };
