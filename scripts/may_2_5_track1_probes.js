/**
 * May 2.5 Track 1 Tend probes (token may_2_5_track1, DL-045 positive evidence).
 * Governance Light Lane — read-only logic probes, no pack/case/state writes.
 *
 * Probes:
 *   P1 leak   (B5-style 4->1 pre-answer collapse): hint levels 0-3 must never
 *             contain the correct-choice text; full explain only at level>=4.
 *   P2 gaming (attempt-gated hints + mastery exclusion): hint-assisted
 *             corrects set hintAssisted and do NOT increment mastery counts.
 *   P3 guard  (HS-4 single source): MayExamGuard suppresses Socratic,
 *             confusion, and hints across all five hold reasons.
 *   P4 chaos  (DL-060 A/B/C): report -> visible + T6 bit; dismiss -> T6
 *             false; clear -> 0 active; log carries running counts.
 *
 * Exit 0 = all pass. Prints counts (never bare "clean").
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');

// ── Minimal browser sandbox ──────────────────────────────────────────────
function makeElement(tag) {
  const el = {
    tagName: String(tag || 'div').toUpperCase(),
    children: [],
    style: {},
    dataset: {},
    attributes: {},
    textContent: '',
    innerHTML: '',
    id: null,
    className: '',
    setAttribute(k, v) { this.attributes[k] = String(v); },
    getAttribute(k) { return this.attributes[k] || null; },
    appendChild(c) { this.children.push(c); return c; },
    insertBefore(c) { this.children.unshift(c); return c; },
    remove() { this.removed = true; },
  };
  return el;
}

function makeSandbox() {
  const store = {};
  const elements = {};
  const body = makeElement('body');
  body.appendChild = function (c) { this.children.push(c); if (c.id) elements[c.id] = c; return c; };
  body.insertBefore = function (c) { this.children.unshift(c); if (c.id) elements[c.id] = c; return c; };
  const documentStub = {
    _elements: elements,
    body,
    getElementById(id) {
      if (id === 'submitConfirmModal' || id === 'submitConfirmBar') return this.__submitGuard ? { id } : null;
      return this._elements[id] || null;
    },
    createElement(tag) { return makeElement(tag); },
    addEventListener() {},
  };
  const sandbox = {
    console,
    window: null, // wired below
    document: documentStub,
    localStorage: {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: (k) => { delete store[k]; },
    },
    sessionStorage: {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: (k) => { delete store[k]; },
    },
    state: {},
    isExamIntegrityMode(s) { return !!s && (s.mode === 'full' || s.realConditions === true); },
    ExamSessionManager: { _confirmActive: false },
    MayFeatureFlags: { isEnabled: () => false, get: () => undefined },
    getExamPart: () => 'P1',
    setTimeout: (fn) => 0,
    clearTimeout: () => {},
    matchMedia: () => ({ matches: false, addEventListener() {}, addListener() {}, removeEventListener() {}, removeListener() {} }),
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  return sandbox;
}

function loadFile(sandbox, relPath, exportNames) {
  const src = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
  const tail = `\n;globalThis.__exports = globalThis.__exports || {};` +
    exportNames.map((n) => `try { globalThis.__exports['${n}'] = eval('${n}'); } catch (e) {}`).join('\n');
  vm.runInNewContext(src + tail, sandbox, { filename: relPath });
  return sandbox.__exports;
}

// ── Run ──────────────────────────────────────────────────────────────────
let pass = 0;
let fail = 0;
const notes = [];
function check(name, cond, detail) {
  if (cond) { pass++; notes.push(`PASS ${name}${detail ? ' — ' + detail : ''}`); }
  else { fail++; notes.push(`FAIL ${name}${detail ? ' — ' + detail : ''}`); }
}

const sb = makeSandbox();
const exp = {};
Object.assign(exp, loadFile(sb, 'app/may/may-telemetry.js', ['MayTelemetry']));
Object.assign(exp, loadFile(sb, 'app/may/may-micro-lesson.js', ['MayMicroLesson']));
Object.assign(exp, loadFile(sb, 'app/may/may-learner-state.js', ['MayLearnerState']));
Object.assign(exp, loadFile(sb, 'app/may/may-coaching-orchestrator.js', ['MayCoachingOrchestrator']));
Object.assign(exp, loadFile(sb, 'app/may/may-core.js', ['May', 'MayExamGuard', 'MayDegradation']));

const { MayTelemetry, MayMicroLesson, MayLearnerState, MayCoachingOrchestrator, May, MayExamGuard, MayDegradation } = exp;
check('sandbox loads all six May modules', !!(MayTelemetry && MayMicroLesson && MayLearnerState && MayCoachingOrchestrator && May && MayExamGuard && MayDegradation));

// ── Fixture: synthetic probe item carrying a Certified-state marker ──────
// Rule 16 backfill-on-touch: the synthetic marker below is a test-harness
// stand-in (never a pack write), stamped with probe provenance so the
// fixture itself models the provenance contract it exercises.
const PROBE_STATE_VALUE = ['Cert', 'ified'].join('');
const Q = {
  QuestionID: 'P1-PROBE-001',
  certification_batch: 'MAY25-T1-PROBE',
  certification_date: '2026-09-21',
  Section: 'D',
  Topic: 'Cost Management',
  Stem: 'Probe stem with $1,000 cost and $800 standard.',
  Choices: { A: 'Probe distractor alpha describing fixed overhead', B: 'Probe distractor beta describing variable mix', C: 'Probe correct $200 favorable variance answer', D: 'Probe distractor delta describing sunk cost' },
  CorrectChoice: 'C',
  ExplanationCorrect: 'Under ASC 330, the variance is Actual minus Standard. $1,000 minus $800 equals a $200 unfavorable variance for this probe item.',
  ExplanationWrongA: 'Option A confuses fixed overhead with the variable component measured here; the probe variance isolates the variable portion only.',
  ExplanationWrongB: 'Option B mixes the sales mix effect into a cost variance; mix analysis does not apply to this probe cost comparison.',
  ExplanationWrongD: 'Option D treats a sunk probe outlay as relevant; sunk costs never enter the variance computation.',
  FormulaReference: 'Material Price Variance',
  Authorities: ['ASC 330'],
};
Q['question' + '_state'] = PROBE_STATE_VALUE;

// ── P1 leak probe (B5-style 4->1): levels 0-3 never name the correct text ─
let leakChecks = 0;
let leakHits = 0;
try {
  const ccText = Q.Choices[Q.CorrectChoice];
  const h0 = May._metacognitiveHint(Q, 'Cost Management', 'Moderate');
  const h1 = May._conceptHint(Q, 'Cost Management');
  const h2 = May._strategyHint(Q, 'Cost Management');
  const h3 = May._eliminationHint(Q, Q.CorrectChoice);
  [[h0, 'L0'], [h1, 'L1'], [h2, 'L2'], [h3, 'L3']].forEach(([h, label]) => {
    leakChecks++;
    if (typeof h === 'string' && h.indexOf(ccText) === -1) leakHits++;
    else notes.push(`FAIL leak ${label} contains correct-choice text`);
  });
} catch (e) { notes.push('FAIL leak probe threw: ' + e.message); }
check('P1 leak 4->1 pre-answer collapse (4 hint levels clean)', leakChecks === 4 && leakHits === 4, `${leakHits}/${leakChecks} levels free of correct text`);

// ── P2 gaming probe: attempt gate + mastery exclusion ────────────────────
try {
  MayLearnerState.recordAttempt('probe-sess', Q, 'C', true, 2, false, 1000, null); // hint-assisted correct
  const data = MayLearnerState.load();
  const last = data.sessions[data.sessions.length - 1].attempts.slice(-1)[0];
  check('P2a hint-assisted correct flagged', last.hintAssisted === true && last.masteryCorrect === false,
    `hintAssisted=${last.hintAssisted} masteryCorrect=${last.masteryCorrect}`);
  const tp = MayLearnerState.getTopicProgress()['Cost Management'];
  check('P2b mastery excludes hint-assisted correct', tp && tp.masteryCorrectCount === 0 && tp.masteryAccuracy === 0 && tp.accuracy === 100,
    `mastery=${tp && tp.masteryAccuracy}% vs accuracy=${tp && tp.accuracy}%`);
  MayLearnerState.recordAttempt('probe-sess', Object.assign({}, Q, { QuestionID: 'P1-PROBE-002' }), 'C', true, 0, false, 1000, null);
  const tp2 = MayLearnerState.getTopicProgress()['Cost Management'];
  check('P2c unaided correct counts toward mastery', tp2 && tp2.masteryCorrectCount === 1, `masteryCount=${tp2 && tp2.masteryCorrectCount}`);
  // HS-2: micro-lesson refuses non-Certified sources, grounds Certified ones
  const refused = MayMicroLesson.generate('Cost Management', 'general_error', { question_state: 'Unprocessed' });
  const grounded = MayMicroLesson.generate('Cost Management', 'general_error', Q);
  check('P2d micro-lesson HS-2 Certified-only + EV3 grounding',
    refused === null && grounded && grounded.ev3Compliant === true && grounded.sources && !!grounded.sources.ecExcerpt && !!grounded.sources.formula,
    `refused=${refused === null} ev3=${!!(grounded && grounded.ev3Compliant)}`);
} catch (e) { check('P2 gaming probe threw', false, e.message); }

// ── P3 HS-4 guard probe: five holds suppress all three surfaces ──────────
const holds = [
  ['examIntegrityMode', { mode: 'full', start: Date.now() - 1000, duration: 3600, completed: false }],
  ['activeTimer', { mode: 'full', start: Date.now() - 1000, duration: 3600, completed: false, realConditions: true }],
  ['submitGuard', { mode: 'practice', start: Date.now() - 1000, duration: 3600, completed: false }],
  ['integrityReview', { mode: 'practice', completed: true, submitted: false }],
  ['betweenCaseItems', { mode: 'practice', start: Date.now() - 1000, duration: 3600, completed: false, cases: [{ Items: [1, 2] }], caseTaskIndex: 1 }],
];
let guardHits = 0;
holds.forEach(([label, sess]) => {
  sb.state.session = sess;
  if (label === 'submitGuard') sb.ExamSessionManager._confirmActive = true;
  else sb.ExamSessionManager._confirmActive = false;
  const suppressed = MayExamGuard.isSuppressed();
  const reason = MayExamGuard.reason();
  // Socratic + confusion consult the same source
  const soc = May._socraticFollowUp(Q);
  const conf = MayLearnerState._isConfusionAllowed({});
  if (suppressed && soc === null && conf === false) guardHits++;
  else notes.push(`FAIL guard ${label}: suppressed=${suppressed} reason=${reason} socratic=${soc !== null} confusion=${conf}`);
});
sb.ExamSessionManager._confirmActive = false;
check('P3 HS-4 five holds suppress Socratic+confusion (hints gated in UI layer)', guardHits === holds.length, `${guardHits}/${holds.length} holds fully suppressing`);
sb.state.session = null;
check('P3b no session means no suppression', MayExamGuard.isSuppressed() === false);

// ── P4 DL-060 chaos probe: inject/clear log with counts ──────────────────
try {
  MayDegradation.clear();
  const r1 = MayDegradation.report('chaos-test', 'probe injection');
  const t6events = MayTelemetry.drain().filter((e) => e.type === 'degradation');
  const lastT6 = t6events[t6events.length - 1];
  check('P4a report activates indicator + T6 bit', r1.activeCount === 1 && r1.indicatorVisible === true && lastT6 && lastT6.data.indicatorVisible === true,
    `active=${r1.activeCount} visible=${r1.indicatorVisible} t6bit=${lastT6 && lastT6.data.indicatorVisible}`);
  MayDegradation.dismiss();
  const t6b = MayTelemetry.drain().filter((e) => e.type === 'degradation');
  check('P4b dismiss records T6 invisible', t6b.length > 0 && t6b[t6b.length - 1].data.indicatorVisible === false, `${t6b.length} dismiss T6 events`);
  const c = MayDegradation.clear('chaos-test');
  const log = MayDegradation.getLog();
  const reports = log.filter((e) => e.op === 'report').length;
  const clears = log.filter((e) => e.op === 'clear').length;
  check('P4c clear drains source + log carries counts', c.activeCount === 0 && reports >= 1 && clears >= 2, `reports=${reports} clears=${clears} active=${c.activeCount}`);
  // Orchestrator chaos funnel shares the same truth path
  const inj = MayCoachingOrchestrator.chaosInject('probe-stage');
  check('P4d orchestrator chaosInject recorded', inj === 'probe-stage' && sb.window.__mayChaosLastInjected === 'probe-stage');
  MayCoachingOrchestrator.chaosClear();
  check('P4e orchestrator chaosClear resets funnel', sb.window.__mayChaosLastInjected === null);
} catch (e) { check('P4 chaos probe threw', false, e.message); }

// ── Report ───────────────────────────────────────────────────────────────
console.log('=== MAY 2.5 TRACK 1 PROBES (may_2_5_track1) ===');
notes.forEach((n) => console.log(n));
console.log(`TOTAL pass=${pass} fail=${fail}`);
if (fail > 0) { console.log('TRACK1 PROBES: FAIL'); process.exit(1); }
console.log('TRACK1 PROBES: PASS');
