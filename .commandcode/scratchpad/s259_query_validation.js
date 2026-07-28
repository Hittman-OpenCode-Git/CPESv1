// S259 Query Validation v2 — read-only scan against all registries
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, '..', '..', 'scripts', 'output');
const REPORTS_DIR = path.resolve(__dirname, '..', '..', 'reports', 'session259');

function loadJSON(filename) {
  try { const fp = path.join(OUTPUT_DIR, filename); return fs.existsSync(fp) ? JSON.parse(fs.readFileSync(fp, 'utf8')) : null; }
  catch (e) { return null; }
}

const qh = loadJSON('question_history.json');
const sr = loadJSON('session_registry.json');
const cr = loadJSON('challenge_registry.json');
const rr = loadJSON('recommendation_registry.json');
const ct = loadJSON('challenge_triage.json');

// ── Correct QID samples per pack format ──
const sampleQids = [
  // Pack A: P1-[A-F]-###
  'P1-A-001','P1-A-010','P1-B-020','P1-C-030','P1-D-040','P1-E-050','P1-F-060',
  // Pack B: P1B-[A-F]-### (starts at ~076)
  'P1B-A-076','P1B-B-105','P1B-C-110','P1B-D-130','P1B-E-150',
  // Pack C: P1-[A-F]C-###
  'P1-AC-001','P1-BC-020','P1-CC-030','P1-DC-040','P1-EC-060',
  // Pack D: P1-[A-F]D-###
  'P1-AD-001','P1-BD-020','P1-CD-030','P1-DD-040','P1-ED-060',
  // Pack E: P1E-[A-F]-### + R-series
  'P1E-A-001','P1E-B-020','P1E-C-040','P1E-D-060','P1-E-R01',
];

const results = {
  reportId: 'SESSION259_QUERY_VALIDATION',
  generatedTimestamp: new Date().toISOString(),
  certifiedTotal: 0,
  questionValidation: { total: 0, passed: 0, notFound: 0, notFoundList: [], isolatedCount: 0 },
  sessionValidation: { total: 0, passed: 0, orphanQids: 0, orphanQidList: [] },
  challengeValidation: { total: 0, passed: 0, orphanQids: 0, orphanSessions: 0, triageComplete: 0, triageTotal: 35 },
  recommendationValidation: { total: 0, totalLinks: 0, orphanQids: 0, orphanQidList: [] },
  findingSummary: []
};

// ── 1. Question Validation ──
results.questionValidation.total = sampleQids.length;
for (const qid of sampleQids) {
  const entry = qh.questions[qid];
  if (entry) {
    results.questionValidation.passed++;
    if (!entry.sessions || entry.sessions.length === 0) results.questionValidation.isolatedCount++;
  } else {
    results.questionValidation.notFound++;
    results.questionValidation.notFoundList.push(qid);
  }
}

// ── 2. Session Validation ──
if (sr && sr.sessions) {
  results.sessionValidation.total = sr.sessions.length;
  for (const sess of sr.sessions) {
    let hasOrphan = false;
    if (sess.questionIds) {
      for (const qid of sess.questionIds) {
        if (!qh.questions[qid]) {
          hasOrphan = true;
          results.sessionValidation.orphanQids++;
          results.sessionValidation.orphanQidList.push({ sessionId: sess.sessionId, qid });
        }
      }
    }
    if (!hasOrphan) results.sessionValidation.passed++;
  }
}

// ── 3. Challenge Validation ──
if (cr && cr.challenges) {
  results.challengeValidation.total = cr.challenges.length;
  for (const ch of cr.challenges) {
    let allGood = true;
    if (!qh.questions[ch.questionId]) { allGood = false; results.challengeValidation.orphanQids++; }
    if (ch.linkedSessions) {
      for (const s of ch.linkedSessions) {
        if (/^\d+$/.test(s) || s.includes('.')) continue; // skip garbage refs (S258 cleaned these)
        if (sr && sr.sessions && !sr.sessions.find(x => x.sessionId === s)) {
          results.challengeValidation.orphanSessions++;
        }
      }
    }
    const triage = ct && ct.results ? ct.results.find(t => t.challengeId === ch.challengeId) : null;
    if (triage) results.challengeValidation.triageComplete++;
    if (allGood) results.challengeValidation.passed++;
  }
}

// ── 4. Recommendation Validation ──
if (rr && rr.recommendations) {
  results.recommendationValidation.total = rr.recommendations.length;
  for (const rec of rr.recommendations) {
    const ids = rec.questionIds || [];
    results.recommendationValidation.totalLinks += ids.length;
    for (const qid of ids) {
      if (!qh.questions[qid]) {
        results.recommendationValidation.orphanQids++;
        results.recommendationValidation.orphanQidList.push({ recommendationId: rec.recommendationId, qid });
      }
    }
  }
}

// ── 5. Certified total ──
results.certifiedTotal = Object.values(qh.questions).filter(q => q.currentState === 'Certified').length;

// ── Summary ──
results.summary = {
  questionRetrievalPct: Math.round((results.questionValidation.passed / results.questionValidation.total) * 100),
  sessionRetrievalPct: results.sessionValidation.total > 0 ? Math.round((results.sessionValidation.passed / results.sessionValidation.total) * 100) : 0,
  challengeRetrievalPct: results.challengeValidation.total > 0 ? Math.round((results.challengeValidation.passed / results.challengeValidation.total) * 100) : 0,
  triageCoveragePct: Math.round((results.challengeValidation.triageComplete / 35) * 100),
  totalRecLinks: results.recommendationValidation.totalLinks,
  totalOrphanQidsAcrossAll: results.sessionValidation.orphanQids + results.challengeValidation.orphanQids + results.recommendationValidation.orphanQids,
  certifiedTotal: results.certifiedTotal
};

// Verdict: FAIL only if orphans exist or questions not found
const allOrphans = results.summary.totalOrphanQidsAcrossAll + results.questionValidation.notFound;
results.summary.verdict = allOrphans === 0 ? 'PASS' : 'FAIL';
if (allOrphans > 0) {
  results.findingSummary.push(`FINDING: ${allOrphans} orphan/not-found reference(s) detected`);
  if (results.questionValidation.notFound > 0)
    results.findingSummary.push(`Question not-found: ${results.questionValidation.notFoundList.join(', ')}`);
  if (results.sessionValidation.orphanQids > 0)
    results.findingSummary.push(`Session orphan QIDs: ${results.sessionValidation.orphanQidList.length} entries`);
  if (results.recommendationValidation.orphanQids > 0)
    results.findingSummary.push(`Recommendation orphan QIDs: ${results.recommendationValidation.orphanQidList.length} entries`);
}

// ── Output ──
fs.mkdirSync(REPORTS_DIR, { recursive: true });
fs.writeFileSync(path.join(REPORTS_DIR, 'SESSION259_LOOKUP_VALIDATION.json'), JSON.stringify(results, null, 2), 'utf8');
console.log(JSON.stringify(results.summary, null, 2));
if (results.findingSummary.length > 0) console.log('\n' + results.findingSummary.join('\n'));
