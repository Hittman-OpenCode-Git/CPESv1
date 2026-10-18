/**
 * May audit E08 probe (Tend extension, 2026-09-22).
 * Governance Light Lane — read-only logic probe, no pack/case/state writes.
 * Verifies E08 session-end safety instruments (vm-sandbox pattern from
 * scripts/may_audit_wiring_probe.js):
 *   (a) MayTelemetry.runSessionEndAudits exists + runs clean empty & populated
 *   (b) T5 cognitive-budget thresholds {15,20,7} + checkCognitiveBudget
 *       returns insufficient_data on empty buffer without throwing
 *   (c) scanBufferForPii catches injected email-value payload in decision event
 *   (d) MayMicroLesson.auditSample exists and runs
 * Exit 0 = all pass. Prints counts (DL-045 positive evidence).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.join(__dirname, '..');

let pass = 0, fail = 0; const notes = [];
function check(name, cond, detail) {
  if (cond) pass++;
  else { fail++; notes.push(`FAIL ${name}${detail ? ' — ' + detail : ''}`); }
}

const sb = { console };
sb.window = sb; sb.globalThis = sb;
for (const [f, names] of [
  ['app/may/may-telemetry.js', ['MayTelemetry']],
  ['app/may/may-micro-lesson.js', ['MayMicroLesson']],
]) {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  vm.runInNewContext(src + '\n;globalThis.__exports=globalThis.__exports||{};' +
    names.map(n => `try{globalThis.__exports['${n}']=eval('${n}')}catch(e){}`).join('\n'), sb, { filename: f });
}
const { MayTelemetry: T, MayMicroLesson: M } = sb.__exports;
check('loads MayTelemetry', !!T);
check('loads MayMicroLesson', !!M);

// (a) runSessionEndAudits exists + runs clean on empty buffer
check('E08 runSessionEndAudits exported', !!(T && T.runSessionEndAudits));
{
  try { T.reset(); } catch (e) {}
  let out = null, threw = false;
  try { out = T.runSessionEndAudits(); } catch (e) { threw = true; }
  check('E08 empty run no-throw', threw === false);
  check('E08 empty run ok', !!(out && out.ok === true), JSON.stringify(out && out.ok));
  check('E08 empty parts present', !!(out && out.parts && out.parts.cognitiveBudget && out.parts.bufferPII),
    JSON.stringify(out && out.parts && Object.keys(out.parts)));
}
// (a) populated buffer run
{
  try {
    for (let i = 0; i < 12; i++) T.trackCognitiveBudget({ sessionDurationMs: 3600000, abandoned: false, lengthBucket: 'long', surfaceAreaCount: 6 });
    for (let i = 0; i < 5; i++) T.trackSelfScoreSession({ losTag: 'P2-A.1', criteriaMetCount: 6, ev3CitedCount: 7 });
    T.trackEngagement({ action: 'micro_lesson', topic: 'CVP', authority: 'IMA CSO' });
  } catch (e) {}
  let out = null, threw = false;
  try { out = T.runSessionEndAudits(); } catch (e) { threw = true; }
  check('E08 populated run no-throw', threw === false);
  check('E08 populated run ok', !!(out && out.ok === true), JSON.stringify(out && out.ok));
}

// (b) T5 thresholds + insufficient_data on empty buffer
{
  const th = T && T.COGNITIVE_BUDGET_THRESHOLDS;
  check('E08 thresholds durationDropPct=15', !!(th && th.durationDropPct === 15), JSON.stringify(th));
  check('E08 thresholds abandonmentRisePct=20', !!(th && th.abandonmentRisePct === 20), JSON.stringify(th));
  check('E08 thresholds consecutiveDays=7', !!(th && th.consecutiveDays === 7), JSON.stringify(th));
  try { T.reset(); } catch (e) {}
  let r = null, threw = false;
  try { r = T.checkCognitiveBudget(); } catch (e) { threw = true; }
  check('E08 checkCognitiveBudget no-throw on empty', threw === false);
  check('E08 checkCognitiveBudget insufficient_data on empty', !!(r && r.reason === 'insufficient_data'), JSON.stringify(r));
}

// (c) scanBufferForPii catches injected email-value payload in a decision event
{
  try { T.reset(); } catch (e) {}
  check('E08 scanBufferForPii exported', !!(T && T.scanBufferForPii));
  try { T.trackDecision({ decisionId: 'e08-pii', note: 'reach me at jane.doe@example.com' }); } catch (e) {}
  let r = null, threw = false;
  try { r = T.scanBufferForPii(); } catch (e) { threw = true; }
  check('E08 scanBufferForPii no-throw', threw === false);
  const hits = (r && r.piiHits) || [];
  const hasEmailValue = hits.some(h => (h.fields || []).some(f => /:value$/.test(f)));
  const hasDecision = hits.some(h => h.type === 'decision');
  check('E08 email-value hit in decision event', hasEmailValue && hasDecision, JSON.stringify(hits));
}

// (d) MayMicroLesson.auditSample exists and runs
{
  check('E08 MayMicroLesson.auditSample exported', !!(M && M.auditSample));
  let r = null, threw = false;
  try { r = M.auditSample(50); } catch (e) { threw = true; }
  check('E08 auditSample no-throw', threw === false);
  check('E08 auditSample shape', !!(r && typeof r.compliant === 'boolean' && typeof r.total === 'number'), JSON.stringify(r));
}

console.log('=== MAY AUDIT-E08 PROBE ===');
console.log(`TOTAL pass=${pass} fail=${fail}`);
if (notes.length) console.log(notes.join('\n'));
process.exit(fail ? 1 : 0);
