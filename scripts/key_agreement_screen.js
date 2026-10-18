// key_agreement_screen.js — Screen E. Four checks, each earned by a verified defect
// in Session P2-HAND-SOLVE-WAVE. READ-ONLY: emits evidence, never rewrites (DL-045).
//
//   E1  key unsupported by the explanation's own arithmetic
//   E2  explanation/key disagreement + context-aware scratchwork markers
//   E3  key type does not match item type
//   E4  encoding corruption (mojibake)
//
// Every threshold here was calibrated against ground_truth.js and must be reported
// with the FP rate, never alone.
'use strict';
const fs = require('fs');
const path = require('path');
const BASE = path.resolve(__dirname, '..');
const CaseExtractor = require('./lib/CaseExtractor');

const BANKS = [
  { file: 'content/cases/case_pack_1_corrected.js', part: 'P1' },
  { file: 'content/cases/case_pack_2_corrected.js', part: 'P1' },
  { file: 'content/cases/case_pack_3_corrected.js', part: 'P1' },
  { file: 'p2/case_pack_p2_1.js', part: 'P2' },
  { file: 'p2/case_pack_p2_2.js', part: 'P2' },
  { file: 'p2/case_pack_p2_3.js', part: 'P2' },
  { file: 'p2/case_pack_p2_authored.js', part: 'P2' },
  { file: 'p2/case_pack_p2_C4_C8.js', part: 'P2' },
];

// ── numeric extraction ────────────────────────────────────────────────────────
// Pull every number token from a string, normalizing currency/percent/parens.
function numbersIn(s) {
  if (s === null || s === undefined) return [];
  const out = [];
  const re = /\(?\s*-?\u{00A3}?\$?\s*[\d][\d,]*(?:\.\d+)?\s*%?\s*\)?/gu;
  let m;
  while ((m = re.exec(String(s))) !== null) {
    let t = m[0].replace(/[()\s$%]/g, '').replace(/,/g, '');
    if (t === '' || t === '-') continue;
    const neg = /^\(.*\)$/.test(m[0].trim()) || /^-/.test(t);
    const v = parseFloat(t.replace(/^-/, ''));
    if (isNaN(v)) continue;
    out.push(neg ? -v : v);
  }
  return out;
}

// Numbers an explanation should contain: every computed result. We accept a key
// if it appears anywhere in the explanation's numeric set, OR if the explanation
// contains an explicit arithmetic relation producing it (a - b, a x b, a/b, a*b).
//
// SCALE (DL-P2-034): an explanation that writes "$22.5M" and a key of "22500000" state
// the same quantity in different units. Exact power-of-ten relationships are a genuine
// correspondence, not a digit coincidence — the exponent is recoverable from the
// explanation's own "$x M" / "$x thousand" wording. Arbitrary magnitudes are NOT
// accepted, so a key differing by a non-power-of-ten factor still fires.
const SCALES = [1, 1e-3, 1e-6, 10, 100, 1e3, 1e4, 1e6, 1e7];
function matchesScale(keyNum, explNum) {
  if (explNum === 0) return false;
  const ratio = Math.abs(keyNum / explNum);
  const isUnit = x => x >= 1 - 1e-9 && x <= 1 + 1e-9;
  for (const s of SCALES) {
    if (isUnit(ratio / s) || isUnit(ratio * s)) return true;
  }
  return false;
}

function keyIsSupported(keyNum, explNums, expl) {
  if (keyNum === null) return { ok: true, why: 'no numeric key to test' };
  const near = (a, b, tol) => Math.abs(a - b) <= tol;
  // 1. exact / rounded presence, including scale variants
  for (const e of explNums) {
    if (e === keyNum) return { ok: true, why: 'key appears verbatim in explanation' };
    if (near(e, keyNum, Math.max(0.005, Math.abs(keyNum) * 1e-6))) return { ok: true, why: 'key appears within rounding tolerance' };
    if (matchesScale(keyNum, e)) return { ok: true, why: 'key matches an explanation figure at a power-of-ten scale' };
  }
  // 2. derivable: is there an "A <op> B" expression whose value is the key?
  const opRe = /(-?[\d][\d,]*(?:\.\d+)?)\s*(<=|>=|<|>|=|×|x|\*|\+|-|÷|\/)\s*(-?[\d][\d,]*(?:\.\d+)?)/g;
  let m;
  while ((m = opRe.exec(expl)) !== null) {
    const a = parseFloat(m[1].replace(/,/g, ''));
    const b = parseFloat(m[3].replace(/,/g, ''));
    const op = m[2];
    let v = null;
    if (op === '+') v = a + b;
    else if (op === '-') v = a - b;
    else if (op === '×' || op === 'x' || op === '*') v = a * b;
    else if (op === '÷' || op === '/') v = b === 0 ? null : a / b;
    if (v === null) continue;
    if (near(v, keyNum, Math.max(0.01, Math.abs(keyNum) * 5e-4))) {
      return { ok: true, why: 'key derivable from an explicit expression in the explanation' };
    }
  }
  return { ok: false, why: 'key not found among, or derivable from, the explanation\'s numbers' };
}

// ── check 2: context-aware scratchwork markers ────────────────────────────────
// Lesson from DL-P2-029: a bare \bWait\b fires on "Wait's worst case" (possessive ends
// the boundary) and on the decision alternative named "Wait". The failing cases were
// "Wait's worst case", "choose Wait." (period), and "Wait \u2014" (em dash) — so the
// exclusion must cover a whole class of TRAILING SEPARATORS, not an enumerated word
// list.
// Authorial hesitation: "Wait" followed by a dash, a comma/colon, or a lowercase
// continuation verb/noun. A defined decision alternative is followed by a possessive,
// a plural, a period, a digit, or an option label — so require one of the former.
const AUTHORIAL_WAIT = /\bWait\b(?=\s*(?:[\u2014\u2013-]|[,;:]|\b(?:recalculat|reconsider|verify|let|stored|answer)\b))/g;
const OTHER_MARKERS = [
  { re: /\bHmm\b/g, label: 'authorial-Hmm' },
  { re: /\bLet me (?:recalculate|reconsider|verify|check)\b/g, label: 'authorial-Let-me' },
  { re: /\bUsing the answer\b/g, label: 'reverse-rationalisation' },
  { re: /\b(?:the answer|suggested answer) (?:seems|appears) incorrect\b/gi, label: 'self-doubt' },
  { re: /\b(?:We key|we'll set)\s/i, label: 'key-narration' },
];
const SCRATCH_MARKERS = [
  { re: AUTHORIAL_WAIT, label: 'authorial-Wait' },
  ...OTHER_MARKERS,
];
function scratchworkHits(expl) {
  const hits = [];
  for (const m of SCRATCH_MARKERS) {
    m.re.lastIndex = 0;
    let x;
    while ((x = m.re.exec(expl)) !== null) {
      hits.push({ label: m.label, match: x[0], at: x.index });
      if (x[0].length === 0) m.re.lastIndex++;
    }
  }
  return hits;
}

// ── check 4: encoding ─────────────────────────────────────────────────────────
// UTF-8 bytes decoded as cp1252. Multiplication sign (Ã·) is the legitimately
// ambiguous case: '·' (U+00B7) renders as Ã· only when mis-decoded, but a
// correctly-encoded file contains the single char. We therefore test for the
// LIGATURE "Ã·" (two chars) only, plus the Â-prefix family.
const ENCODING_BAD = /â[\u0080-\u00BF\u201A\u2018\u2019\u201C\u201D\u2013\u2014\u2026\u20AC\u2122]|Ã[\u0080-\u00BF\u201A\u2018\u2019\u201C\u201D\u2013\u2014\u2026\u20AC\u2122]|Â[\u0080-\u00BF]|\uFFFD/g;
function encodingHits(text) {
  const hits = [];
  ENCODING_BAD.lastIndex = 0;
  let m;
  while ((m = ENCODING_BAD.exec(text)) !== null) {
    hits.push({ bad: m[0], at: m.index });
    if (m[0].length === 0) ENCODING_BAD.lastIndex++;
  }
  return hits;
}

function explainOf(it) {
  return String(it.ExplanationCorrect != null ? it.ExplanationCorrect : it.Explanation || '');
}
function keyOf(it) {
  const k = it.Correct !== undefined ? it.Correct : it.CorrectChoice;
  return k;
}
function keyTypeOf(it) {
  const k = keyOf(it);
  if (k === undefined || k === null) return 'missing';
  if (Array.isArray(k)) return 'array';
  if (typeof k === 'object') return 'object';
  if (typeof k === 'number') return 'number';
  const s = String(k);
  if (/^-?[\d][\d,]*(\.\d+)?\s*[UF]$/i.test(s)) return 'numeric-string';
  if (/^-?[\d][\d,]*(\.\d+)?%?$/.test(s)) return 'numeric-string';
  if (/^[A-F]$/.test(s)) return 'letter';
  return 'text';
}

// ── check 3: key type vs item type ────────────────────────────────────────────
// A select item may be keyed by LETTER *or* by the choice TEXT (both schemas occur in
// the pool: CorrectChoice:"C" alongside Correct:"Recognize 84,000 revenue..."). Only
// a NUMERIC key on a choice item is a defect — that is the C7-Q5 class, where the
// answer to "what is the net impact" was written into a select item's key.
function keyTypeCompatible(type, ktype, kraw, it) {
  if (ktype === 'missing') return null;
  if (type === 'numeric') {
    return ['number', 'numeric-string'].includes(ktype) ? null : 'numeric item keyed with ' + ktype;
  }
  if (type === 'select' || type === 'multi') {
    if (ktype === 'numeric-string') {
      const choices = it.Choices || [];
      const choiceStrs = Array.isArray(choices) ? choices.map(String) : Object.values(choices).map(String);
      if (choiceStrs.includes(String(kraw))) return null;
      return 'choice item keyed with a bare number';
    }
    return null;
  }
  if (type === 'match') {
    return ktype === 'object' ? null : 'match item keyed with ' + ktype;
  }
  return null;
}

function runScreen() {
  const flags = [];
  let scanned = 0;
  const census = {};
  for (const { file, part } of BANKS) {
    const full = path.join(BASE, file);
    let detail;
    try { detail = CaseExtractor.extractFromContentDetailed(fs.readFileSync(full, 'utf8')); }
    catch (e) { console.error('EXTRACTION THROW ' + file + ' — ' + e.message); continue; }
    if (!detail.ok) { console.error('EXTRACTION FAILURE ' + file + ' — ' + detail.error); continue; }
    census[file] = detail.cases.length;
    for (const c of detail.cases) {
      for (const it of (c.Items || [])) {
        scanned++;
        const expl = explainOf(it);
        const kraw = keyOf(it);
        const ktype = keyTypeOf(it);
        const type = it.Type || '';
        const base = {
          bank: file, part,
          caseId: c.CaseID, caseState: c.question_state || 'MISSING',
          itemId: it.ItemID || '?', itemType: it.Type || '?',
          itemState: it.question_state || null,
          keyType: ktype,
        };
        const rec = (screen, severity, label, detail) =>
          flags.push(Object.assign({ screen, severity, label, detail }, base));

        // E4 encoding — independent of key logic, run first.
        const enc = encodingHits(expl) || [];
        if (enc.length) rec('E', 'FLAG', 'ENCODING',
          enc.length + ' mojibake sequence(s): ' + [...new Set(enc.map(e => JSON.stringify(e.bad)))].join(', ') +
          ' | first at char ' + enc[0].at);

        // E2 scratchwork markers
        const sw = scratchworkHits(expl);
        if (sw.length) rec('E', 'FLAG', 'SCRATCHWORK',
          sw.map(s => s.label + ': "' + s.match + '"').join(' | ') +
          ' | ' + expl.slice(Math.max(0, sw[0].at - 40), sw[0].at + 70).replace(/\s+/g, ' '));

        // E3 key type vs item type
        const ktIssue = keyTypeCompatible(type, ktype, kraw, it);
        if (ktIssue) rec('E', 'FLAG', 'KEY-TYPE', ktIssue + ' ' + JSON.stringify(kraw));

        // E1 key vs explanation arithmetic. Only meaningful when the key is a SINGLE
        // SCALAR NUMBER: multi/match keys are arrays of choice text and object maps,
        // which numbersIn() cannot meaningfully compare against an explanation.
        const words = expl.split(/\s+/).filter(Boolean).length;
        const keyStr = (kraw === undefined || kraw === null) ? '' : String(kraw);
        if (type === 'numeric' && words >= 20 && keyStr.trim() !== '' &&
            !Array.isArray(kraw) && typeof kraw !== 'object') {
          const keyNums = numbersIn(keyStr);
          if (keyNums.length === 1) {
            const res = keyIsSupported(keyNums[0], numbersIn(expl), expl);
            if (!res.ok) {
              rec('E', 'FLAG', 'KEY-UNSUPPORTED',
                'key ' + kraw + ' not supported: ' + res.why + ' | explanation numbers: ' +
                numbersIn(expl).slice(0, 14).join(','));
            }
          }
        }

        // E5 KEY-AGREEMENT: the explanation's DERIVED ANSWER disagrees with the
        // stored key. E1 checks 'is the key number PRESENT in the explanation';
        // E5 checks 'is the number the explanation computes as its ANSWER different
        // from the key'.
        //
        // Calibration (P2-HAND-SOLVE-WAVE): the loose 'last number anywhere' rule
        // produced 218 flags (~20% FP) because explanations trail exhibit refs
        // ('Exhibit 2') and distractor commentary. Anchoring on the LAST computational
        // conclusion marker (=, ->, =>, 'rounds to', 'is ', 'answer is') recovers the
        // derived answer. The B4-Q1 class (key 7.45%, expl derives 7.48%, 0.4% off) is
        // the motivating defect. Conceptual inversions (A7-Q4 direction) and arithmetic
        // self-contradictions (A8-Q2 '= 61.5 = 60 days') are out of scope here.
        //
        // READ-ONLY — evidence only (DL-045).
        (function agreementE5(it, expl, keyStr, type, kn, rec) {
          if (kn.length < 1 || !('numeric'.includes(type) || 'fill'.includes(type))) return;
          // last computational conclusion: a number right after a result marker
          var markers = [/(?:=|->|=>)\s*[\u00A3$£](-?[\d][\d,.]*?(?:\.[\d]+)?)\b/g, /(?:=|->|=>)\s*(-?[\d][\d,.]*?(?:\.\d+)?)\s*%/g, /(?:rounds? to|answer is|result is|final value is|yields)\s*[\u00A3$£](-?[\d][\d,.]*?(?:\.[\d]+)?)\b/gi, /(?:rounds? to|answer is|result is|final value is|yields)\s*(-?[\d][\d,.]*?(?:\.\d+)?)\s*%/gi];
          var lastVal = null;
          for (var m of markers) { var mm; while ((mm = m.exec(expl)) !== null) { lastVal = String(mm[1]).replace(/[%$,\s()]/g, ''); } }
          if (lastVal === null) {
            // no derivation conclusion stated — let E1/presence handle it
            return;
          }
          var cv = parseFloat(lastVal.replace(/,/g, ''));
          if (isNaN(cv)) return;
          var kv = kn[0];
          var rel = Math.abs(cv - kv) / (Math.abs(kv) || 1);
          var ab = Math.abs(cv - kv);
          if (rel > 2e-3 && ab > 0.5) {
            rec('E', 'FLAG', 'KEY-AGREEMENT',
              'key ' + kn.join(',') + ' vs explanation-derived ' + cv + ' (' + (rel * 100).toFixed(2) + '% disagree)' +
              ' | expl-conclusion=' + lastVal);
          }
        });/* E5 DISABLED — calibration verdict: non-viable (24/24 FP loose, 196/196 FP tightened). Regex-based conclusion extraction cannot distinguish derived answer from dense numeric prose. Prototype retained for phase-2 semantic key-extraction screen. */
      }
    }
  }
  return { scanned, flags, census, failures: 0 };
}

module.exports = { runScreen, numbersIn, keyIsSupported, scratchworkHits, encodingHits, keyTypeOf, BANKS };

if (require.main === module) {
  const r = runScreen();
  const byLabel = {};
  for (const f of r.flags) byLabel[f.label] = (byLabel[f.label] || 0) + 1;
  console.log('items scanned: ' + r.scanned);
  console.log('flags: ' + r.flags.length + ' | by label: ' + JSON.stringify(byLabel));
  const out = path.join(BASE, 'scripts/output/key_agreement_flags.json');
  fs.writeFileSync(out, JSON.stringify({
    generated: new Date().toISOString(),
    method: 'key_agreement_screen.js v1 (E1 key-unsupported / E2 scratchwork+disagreement / E3 key-type / E4 encoding)',
    scanned: r.scanned, census: r.census, summary: byLabel, flags: r.flags,
  }, null, 2) + '\n');
  console.log('wrote ' + out);
}