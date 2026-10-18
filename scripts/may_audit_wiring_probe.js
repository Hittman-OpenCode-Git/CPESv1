/**
 * May audit-wiring probe (P-01/P-02, 2026-09-22).
 * Governance Light Lane — read-only logic probe, no pack/case/state writes.
 * Asserts the session-end safety instruments are wired, not dormant:
 *   W1 runSessionEndAudits exists + runs clean empty and populated
 *   W2 scanBufferForPii catches field + value PII across event types
 *   W3 finish() calls the hook (static anchor)
 *   W4 breaker/EV3/micro-lesson parts present in hook output
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
check('W1 runSessionEndAudits exported', !!(T && T.runSessionEndAudits));
check('W2 scanBufferForPii exported', !!(T && T.scanBufferForPii));

// W1: empty buffer run
{
  const out = T.runSessionEndAudits();
  check('W1 empty run ok', out && out.ok === true && !!out.parts.cognitiveBudget && !!out.parts.selfScoreEV3 && !!out.parts.bufferPII,
    JSON.stringify(out && Object.keys(out.parts || {})));
}
// W1+W4: populated run (breaker data + self-score + micro-lesson engagement)
{
  for (let i = 0; i < 12; i++) T.trackCognitiveBudget({ sessionDurationMs: 3600000, abandoned: false, lengthBucket: 'long', surfaceAreaCount: 6 });
  for (let i = 0; i < 5; i++) T.trackSelfScoreSession({ losTag: 'P2-A.1', criteriaMetCount: 6, ev3CitedCount: 7 });
  T.trackEngagement({ action: 'micro_lesson', topic: 'CVP', authority: 'IMA CSO' });
  const out = T.runSessionEndAudits();
  check('W1 populated run ok', out && out.ok === true, JSON.stringify(out && out.ok));
  check('W4 breaker part present', out.parts.cognitiveBudget && typeof out.parts.cognitiveBudget.reason === 'string',
    JSON.stringify(out.parts.cognitiveBudget && out.parts.cognitiveBudget.reason));
  check('W4 EV3 part compliant', out.parts.selfScoreEV3 && out.parts.selfScoreEV3.compliant === true,
    JSON.stringify(out.parts.selfScoreEV3));
  check('W4 buffer PII clean', out.parts.bufferPII && out.parts.bufferPII.piiHits.length === 0,
    JSON.stringify(out.parts.bufferPII && out.parts.bufferPII.piiHits));
  check('W4 micro-lesson part present', out.parts.microLesson && typeof out.parts.microLesson.compliant === 'boolean',
    JSON.stringify(out.parts.microLesson));
}
// W2: buffer-wide PII (field + value, non-self_score type)
{
  T.trackDecision({ decisionId: 'd1', note: 'reach me at jane.doe@example.com' });
  T.trackEngagement({ action: 'x', sessionId: 'S-1' });
  const r = T.scanBufferForPii();
  const hasValue = r.piiHits.some(h => h.fields.some(f => /:value$/.test(f)));
  const hasField = r.piiHits.some(h => h.fields.includes('sessionId'));
  check('W2 value-pattern hit (email)', hasValue, JSON.stringify(r.piiHits));
  check('W2 field-name hit (sessionId)', hasField, JSON.stringify(r.piiHits));
}
// W3: finish() hook anchor in app.js
{
  const app = fs.readFileSync(path.join(ROOT, 'app/app.js'), 'utf8');
  check('W3 finish() calls runSessionEndAudits (guarded)', app.includes('MayTelemetry.runSessionEndAudits'),
    'anchor');
  check('W3 no "nine files" residue', !/nine files|nine P2|all nine/i.test(app), 'copy');
}

console.log('=== MAY AUDIT-WIRING PROBE (P-01/P-02) ===');
console.log(`TOTAL pass=${pass} fail=${fail}`);
if (notes.length) console.log(notes.join('\n'));
process.exit(fail ? 1 : 0);
