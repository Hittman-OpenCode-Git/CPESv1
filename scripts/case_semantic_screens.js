/**
 * case_semantic_screens.js — DL-051 Phase 1 v2 (2026-09-18).
 *
 * Semantic key/explanation-agreement screens for case-study items (P1 live
 * banks + P2 banks). Adapts the DL-047 MCQ screens to the case genre.
 *
 * v1 lesson (calibration sample 10+10+28): case Prompts are one-liners and
 * Explanations are 2500-char essays that legitimately refute distractors at
 * length — so v1's best-vs-stored inversion gate and prompt-only Jaccard
 * over-fired (FP patterns documented in DEFECT_LIBRARY DL-051 Phase 1 note).
 * v2 retune:
 *   B-select: two signals — INVERSION (best-recall != stored, recall>=0.50,
 *      margin>=0.40, DL-047 gates) and UNSUPPORTED-CORRECT (recall of the
 *      stored answer < 0.25 — the explanation never supports the key).
 *   B-multi: UNSUPPORTED-CORRECT (min stored recall < 0.25), DISJOINT
 *      (predicted set ∩ stored set = empty at >= 0.50), else
 *      EXTRA-REFUTED (weak — long essays refute distractors verbatim).
 *   B-num: exact match (tol 1e-6, %-aware) OR absolute-value match.
 *      Abs-only matches report SIGN-CONVENTION (info — accounting
 *      minus/paren convention, not a defect). No explanation numbers at
 *      all stays FLAG (unverifiable derivation). Other absences stay FLAG.
 *   C: scope = Prompt + choices + ScenarioText (one-line prompts carry no
 *      vocabulary on their own); Jaccard < 0.05 with >= 20 content words.
 *   Match: ORPHAN-CORRECT structural check (DL-038 class) unchanged.
 *
 * READ-ONLY. No writes. Deterministic (count stability per AGENTS.md S6).
 * Do NOT auto-remediate from output (DL-045).
 *
 * Usage: node scripts/case_semantic_screens.js [--json <path>]
 * Default output: scripts/output/case_semantic_flags.json
 */
'use strict';
const fs = require('fs');
const path = require('path');
const CaseExtractor = require('./lib/CaseExtractor');

const BASE = path.resolve(__dirname, '..');
const BANKS = [
  { file: 'content/cases/case_pack_1_corrected.js', part: 'P1' },
  { file: 'content/cases/case_pack_2_corrected.js', part: 'P1' },
  { file: 'content/cases/case_pack_3_corrected.js', part: 'P1' },
  { file: 'p2/case_pack_p2_1.js', part: 'P2' },
  { file: 'p2/case_pack_p2_2.js', part: 'P2' },
  { file: 'p2/case_pack_p2_3.js', part: 'P2' },
  { file: 'p2/case_pack_p2_authored.js', part: 'P2' },
  { file: 'p2/case_pack_p2_C4_C8.js', part: 'P2' }
];

const STOP = new Set(('a,an,the,and,or,of,to,in,on,for,with,by,as,at,from,is,are,was,were,be,been,being,it,its,this,that,these,those,which,what,when,where,who,whom,how,than,then,so,such,no,not,only,also,into,over,after,before,between,through,during,each,other,some,such,will,would,should,could,may,might,must,shall,do,does,did,have,has,had,having,all,any,both,few,more,most,own,same,too,very,can,just,per').split(','));

function tokens(s) {
  if (s === null || s === undefined) return [];
  // v2.1: pure-digit tokens (years, units, counts, amounts) are kept at any
  // length — the len>2 floor otherwise blinds recall to choice numbers
  // ("$73", "70 offer", "58 variable" all dropped their digits).
  return String(s).toLowerCase().split(/[^a-z0-9]+/)
    .filter(w => (w.length > 2 || /^\d+(\.\d+)?$/.test(w)) && !STOP.has(w));
}
function tokenSet(s) { return new Set(tokens(s)); }
function recall(choiceText, explSet) {
  const ct = tokens(choiceText);
  if (ct.length === 0 || explSet.size === 0) return 0;
  let hit = 0;
  for (const w of ct) if (explSet.has(w)) hit++;
  return hit / ct.length;
}
function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const w of a) if (b.has(w)) inter++;
  return inter / (a.size + b.size - inter);
}
function numbersOf(s) {
  if (s === null || s === undefined) return [];
  const out = [];
  const re = /\(?\s*\$?\s*-?[\d,]+(\.\d+)?\s*%?\s*\)?/g;
  let m;
  while ((m = re.exec(String(s))) !== null) {
    let t = m[0].trim();
    let neg = /^\(.*\)$/.test(t);
    t = t.replace(/[(),\s$]/g, '').replace(/%/g, '');
    if (!t || t === '-' || t === '.') continue;
    const v = parseFloat(t);
    if (Number.isFinite(v)) {
      out.push(neg ? -v : v);
      if (m[0].indexOf('%') !== -1) out.push((neg ? -v : v) / 100);
    }
  }
  return out;
}
function numMatch(a, b, absOnly) {
  for (const x of a) for (const y of b) {
    const u = absOnly ? Math.abs(x) : x, v = absOnly ? Math.abs(y) : y;
    if (Math.abs(u - v) < 1e-6) return true;
  }
  return false;
}
function normChoice(s) { return String(s === null || s === undefined ? '' : s).trim().replace(/\s+/g, ' '); }

const flags = [];
const census = { banks: {}, totalCases: 0, totalItems: 0, certifiedItems: 0 };
function flag(bank, part, caseObj, item, screen, detail, severity) {
  flags.push({
    bank, part,
    caseId: caseObj.CaseID || '?',
    caseState: caseObj.question_state || 'MISSING',
    itemId: item.ItemID || '?',
    itemType: item.Type || '?',
    itemState: item.question_state || null,
    screen, severity, detail
  });
}
function isCertified(caseObj, item) {
  return (item.question_state || caseObj.question_state) === 'Certified';
}

for (const { file, part } of BANKS) {
  const full = path.join(BASE, file);
  const cases = CaseExtractor.extractCases(full) || [];
  census.banks[file] = { cases: cases.length, items: 0, certified: 0 };
  census.totalCases += cases.length;
  for (const c of cases) {
    const items = c.Items || [];
    const scenario = c.ScenarioText || '';
    for (const it of items) {
      census.totalItems++;
      census.banks[file].items++;
      const cert = isCertified(c, it);
      if (cert) { census.certifiedItems++; census.banks[file].certified++; }
      const expl = it.Explanation || it.ExplanationCorrect || '';
      const explSet = tokenSet(expl);
      const explWords = tokens(expl).length;
      const type = it.Type || '?';

      if (type === 'select' || type === 'multi') {
        // v3: normalize Choices (array-P1 vs object-P2) to [{key,text}] and
        // resolve letter-Corrects (231 items) to texts before recall.
        // Schema audit 2026-09-18: object-Choices=67, letter-Correct=231,
        // ExplanationCorrect-only=3, duplicate ItemIDs=0.
        let norm = [];
        if (Array.isArray(it.Choices)) {
          norm = it.Choices.map((ch, i) => ({ key: String.fromCharCode(65 + i), text: normChoice(ch) }));
        } else if (it.Choices && typeof it.Choices === 'object') {
          norm = Object.keys(it.Choices).sort().map(k => ({ key: k, text: normChoice(it.Choices[k]) }));
        }
        if (norm.length === 0) {
          flag(file, part, c, it, 'B', 'NOCHOICES: ' + type + ' item has no Choices array/object', 'info');
        } else {
          const textByKey = {};
          norm.forEach(n => { textByKey[n.key] = n.text; });
          const resolveKey = (v) => {
            const t = normChoice(v);
            if (textByKey[t] !== undefined) return t;
            const hit = norm.find(n => n.text === t);
            return hit ? hit.key : null;
          };
          const recs = norm.map(n => ({ key: n.key, text: n.text, r: recall(n.text, explSet) }));
          recs.sort((a, b) => b.r - a.r);
          const best = recs[0].r;
          const margin = recs.length > 1 ? recs[0].r - recs[1].r : recs[0].r;
          if (type === 'select') {
            const storedKey = resolveKey(it.Correct);
            if (storedKey === null) {
              flag(file, part, c, it, 'B', 'UNRESOLVABLE-CORRECT: stored "' + normChoice(it.Correct).slice(0, 80) + '" matches no choice key or text', 'FLAG');
            } else {
              const storedText = textByKey[storedKey];
              const storedRec = recall(storedText, explSet);
              if (storedRec < 0.25) {
                flag(file, part, c, it, 'B', 'UNSUPPORTED-CORRECT: stored(' + storedKey + ') recall=' + storedRec.toFixed(2) + ' stored="' + storedText.slice(0, 80) + '"', 'FLAG');
              }
              const predKey = recs[0].key;
              if (predKey !== storedKey) {
                const sev = (best >= 0.50 && margin >= 0.40) ? 'FLAG' : 'weak';
                flag(file, part, c, it, 'B', 'INVERSION: predicted(' + predKey + ')="' + recs[0].text.slice(0, 80) + '" stored(' + storedKey + ')="' + storedText.slice(0, 80) + '" recall=' + best.toFixed(2) + ' margin=' + margin.toFixed(2), sev);
              }
            }
          } else {
            const correctArr = Array.isArray(it.Correct) ? it.Correct : [];
            const storedKeys = correctArr.map(resolveKey);
            if (storedKeys.some(k => k === null)) {
              flag(file, part, c, it, 'B', 'UNRESOLVABLE-CORRECT: stored ' + JSON.stringify(correctArr).slice(0, 100) + ' has entries matching no choice', 'FLAG');
            } else {
              const storedSet = new Set(storedKeys);
              const storedRecs = storedKeys.map(k => ({ key: k, text: textByKey[k], r: recall(textByKey[k], explSet) }));
              const minStored = storedRecs.length ? Math.min.apply(null, storedRecs.map(s => s.r)) : 1;
              const worst = storedRecs.length ? storedRecs.slice().sort((a, b) => a.r - b.r)[0] : null;
              if (storedRecs.length && minStored < 0.25) {
                flag(file, part, c, it, 'B', 'UNSUPPORTED-CORRECT: stored(' + (worst ? worst.key : '?') + ') recall=' + minStored.toFixed(2) + ' choice="' + (worst ? worst.text.slice(0, 80) : '?') + '"', 'FLAG');
              }
              const predSet = new Set(recs.filter(r => r.r >= 0.50).map(r => r.key));
              const inter = [...storedSet].filter(x => predSet.has(x));
              if (predSet.size > 0 && inter.length === 0) {
                flag(file, part, c, it, 'B', 'DISJOINT: predicted={' + [...predSet].join(',') + '} stored={' + [...storedSet].join(',') + '}', 'FLAG');
              } else if (predSet.size > storedSet.size && inter.length === storedSet.size) {
                flag(file, part, c, it, 'B', 'EXTRA-REFUTED (weak): explanation also covers ' + (predSet.size - storedSet.size) + ' distractor(s) at >=0.50', 'weak');
              } else if (predSet.size !== storedSet.size || inter.length !== storedSet.size) {
                flag(file, part, c, it, 'B', 'multi predicted={' + [...predSet].join(',') + '} stored={' + [...storedSet].join(',') + '} best=' + best.toFixed(2), 'weak');
              }
            }
          }
        }
      } else if (type === 'numeric' || type === 'fill') {
        const cn = numbersOf(it.Correct);
        const en = numbersOf(expl);
        if (type === 'numeric') {
          if (cn.length === 0) {
            flag(file, part, c, it, 'B-num', 'UNPARSEABLE-CORRECT: no number in stored Correct "' + String(it.Correct).slice(0, 60) + '"', 'info');
          } else if (numMatch(cn, en, false)) {
            // exact echo — clean, no flag
          } else if (numMatch(cn, en, true)) {
            flag(file, part, c, it, 'B-num', 'SIGN-CONVENTION (info): stored [' + cn.join(',') + '] matches by absolute value only', 'info');
          } else if (en.length === 0) {
            flag(file, part, c, it, 'B-num', 'NO-NUMBERS-IN-EXPL: stored [' + cn.join(',') + '], Explanation has zero numbers — derivation unverifiable', 'FLAG');
          } else {
            flag(file, part, c, it, 'B-num', 'stored numbers [' + cn.join(',') + '] absent from Explanation numbers [' + en.slice(0, 12).join(',') + (en.length > 12 ? '...' : '') + ']', 'FLAG');
          }
        } else {
          const cr = recall(it.Correct, explSet);
          if (cr < 0.25 && tokens(it.Correct).length > 0) {
            flag(file, part, c, it, 'B', 'UNSUPPORTED-CORRECT (fill): stored text recall=' + cr.toFixed(2) + ' stored="' + String(it.Correct).slice(0, 80) + '"', 'FLAG');
          }
        }
      } else if (type === 'match') {
        const correct = it.Correct && typeof it.Correct === 'object' ? it.Correct : {};
        const right = Array.isArray(it.RightItems) ? it.RightItems.map(normChoice) : [];
        const orphans = Object.values(correct).map(normChoice).filter(v => right.indexOf(v) === -1);
        if (orphans.length > 0) {
          flag(file, part, c, it, 'B', 'ORPHAN-CORRECT (DL-038 class): ' + orphans.length + ' Correct value(s) not in RightItems: ' + orphans.map(s => s.slice(0, 50)).join(' | '), 'FLAG');
        }
      }
      // Screen C: explanation scope = Prompt + choices + ScenarioText.
      if (explWords >= 20) {
        const scope = tokenSet((it.Prompt || '') + ' ' + (Array.isArray(it.Choices) ? it.Choices.join(' ') : '') + ' ' + scenario);
        const j = jaccard(explSet, scope);
        if (j < 0.05) {
          flag(file, part, c, it, 'C', 'jaccard=' + j.toFixed(4) + ' explWords=' + explWords, 'FLAG');
        }
      } else if (explWords > 0) {
        flag(file, part, c, it, 'C', 'SHORT: Explanation ' + explWords + ' content words (<20)', 'info');
      } else {
        flag(file, part, c, it, 'C', 'EMPTY: Explanation missing/empty', 'FLAG');
      }
    }
  }
}

const out = {
  generated: new Date().toISOString(),
  method: 'case_semantic_screens.js DL-051 Phase 1 v3: expl=Explanation||ExplanationCorrect; B-select/B-multi normalized (array|object Choices, letter-Correct resolved; INVERSION r>=0.50/m>=0.40 + UNSUPPORTED<0.25 + DISJOINT + UNRESOLVABLE + EXTRA-weak) B-num(exact|abs-info|no-numbers-FLAG|absent-FLAG) C(scope=prompt+choices+scenario,j<0.05,>=20w)',
  census,
  flags
};
const byScreen = {}, bySev = {}, byKind = {};
for (const f of flags) {
  byScreen[f.screen] = (byScreen[f.screen] || 0) + 1;
  bySev[f.severity] = (bySev[f.severity] || 0) + 1;
  const kind = (f.detail.split(':')[0] || f.screen);
  const kk = f.screen + ':' + kind;
  byKind[kk] = (byKind[kk] || 0) + 1;
}
const certFlags = flags.filter(f => f.caseState === 'Certified' || f.itemState === 'Certified').length;
out.summary = { totalFlags: flags.length, byScreen, bySev, byKind, certifiedStateFlags: certFlags };

let jsonPath = path.join(BASE, 'scripts', 'output', 'case_semantic_flags.json');
const ai = process.argv.indexOf('--json');
if (ai !== -1 && process.argv[ai + 1]) jsonPath = path.resolve(process.argv[ai + 1]);
fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
fs.writeFileSync(jsonPath, JSON.stringify(out, null, 1));
console.log('cases=' + census.totalCases + ' items=' + census.totalItems + ' certified=' + census.certifiedItems);
console.log('flags=' + flags.length + ' ' + JSON.stringify(byScreen) + ' severity=' + JSON.stringify(bySev));
console.log(JSON.stringify(byKind, null, 1));
console.log('certified-state flags=' + certFlags);
console.log('wrote ' + jsonPath);
