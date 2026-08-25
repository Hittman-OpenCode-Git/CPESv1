/**
 * test_pack_parser.js — Phase A unit tests + corpus smoke for pack_parser.js
 *
 * Usage:
 *   node scripts/test_pack_parser.js             # unit tests (exit 0 = green)
 *   npm run test:parser                          # same
 *   node scripts/test_pack_parser.js --corpus    # live-pack read-only smoke pass
 *
 * Corpus mode is READ-ONLY by design. Any anomaly on live packs is a
 * FINDING to report to the Board — never a mid-build fix (Phase A touches
 * no existing consumers and no pack files).
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { parsePack, toCanonicalRecords, SEVERITY, CODES } = require('./lib/pack_parser.js');

const ROOT = path.resolve(__dirname, '..');
const FIXTURES = path.join(__dirname, 'lib', '__fixtures__', 'packparser');

// ── Minimal harness ──────────────────────────────────────────────────

let passed = 0;
let failed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log('  PASS  ' + name);
  } catch (e) {
    failed++;
    failures.push({ name, err: e });
    console.log('  FAIL  ' + name);
    console.log('        ' + String(e.message).split('\n')[0]);
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'assertion failed');
}

function norm(v) {
  if (Array.isArray(v)) return v.map(norm);
  if (v && typeof v === 'object') {
    const o = {};
    for (const k of Object.keys(v).sort()) o[k] = norm(v[k]);
    return o;
  }
  return v;
}

function deepEq(a, b) {
  return JSON.stringify(norm(a)) === JSON.stringify(norm(b));
}

function loadFixture(name) {
  return fs.readFileSync(path.join(FIXTURES, name), 'utf8');
}

// ── Synthetic builders ───────────────────────────────────────────────

function mkObj(i) {
  const cc = 'ABCD'[i % 4];
  const others = 'ABCD'.replace(cc, '');
  const o = {
    QuestionID: 'TST-' + String(i).padStart(3, '0'),
    question_state: 'Certified',
    Stem:
      'Synthetic stem ' + i + ' with [A, B, C] brackets, an \'apostrophe\', "quotes" and {braces}.',
    Choices: { A: 'opt A ' + i, B: 'opt B', C: 'opt C', D: 'opt D' },
    CorrectChoice: cc,
    ExplanationCorrect: 'Correct because ' + i + '.',
  };
  for (const L of 'ABCD') {
    o['ExplanationWrong' + L] =
      L === cc ? '' : 'Option ' + L + ' wrong because ' + i + '.';
  }
  return JSON.stringify(o);
}

function composeArray(poisonText, poisonPos, total) {
  const parts = [];
  for (let i = 0; i < total; i++) {
    parts.push(i === poisonPos ? poisonText : mkObj(i));
  }
  return 'var MCQ_BANK_T = [\n' + parts.join(',\n') + '\n];';
}

// ── Unit tests ───────────────────────────────────────────────────────

console.log('\n== pack_parser unit tests ==\n');

test('exports SEVERITY two-level enum + CODES', () => {
  assert(SEVERITY.ERROR === 'error' && SEVERITY.WARNING === 'warning', 'bad SEVERITY');
  assert(CODES.REGION_PARSE_FAILED && CODES.JS_FALLBACK_USED && CODES.TRUNCATED_ARRAY &&
    CODES.MISMATCHED_CLOSER && CODES.JUNK_TOKENS && CODES.NO_ARRAYS_FOUND, 'missing codes');
});

test('basic parse: 12 well-formed objects → 12 json records, 0 diagnostics', () => {
  const r = parsePack(composeArray(null, -1, 12));
  assert(r.records.length === 12, 'records=' + r.records.length);
  assert(r.diagnostics.length === 0, 'diagnostics=' + r.diagnostics.length);
  assert(r.stats.parsedJson === 12 && r.stats.parsedJsFallback === 0 && r.stats.failed === 0, 'stats');
  assert(r.stats.totalRegions === 12, 'totalRegions');
  assert(r.records.every((x) => x.parsedVia === 'json' && !x.degraded), 'parsedVia');
});

test('brackets-in-stems survive parsing intact (DL-020 trap)', () => {
  const stem = 'Stem with [A, B, C] list, "nested \"quotes\"", it\'s apostrophe, {braces}';
  const content =
    'var X = [' +
    JSON.stringify({ QuestionID: 'BRK-001', Stem: stem, Choices: { A: 'x[1]' }, CorrectChoice: 'A' }) +
    ']';
  const r = parsePack(content);
  assert(r.records.length === 1, 'records=' + r.records.length);
  assert(r.diagnostics.length === 0, 'diags=' + JSON.stringify(r.diagnostics));
  assert(r.records[0].object.Stem === stem, 'stem mangled');
});

test('CC-before-QID ordering: qid recovered regardless of field order (DL-029)', () => {
  const content =
    'var X = [{"CorrectChoice":"B","Choices":{"A":"a","B":"b"},"ExplanationWrongA":"x",' +
    '"QuestionID":"CCF-001"}]';
  const r = parsePack(content);
  assert(r.records.length === 1 && r.records[0].qid === 'CCF-001', 'qid=' + r.records[0] && r.records[0].qid);
  assert(r.records[0].object.CorrectChoice === 'B', 'cc');
});

test('role tagging: metadata / content / single', () => {
  const meta = JSON.stringify({
    QuestionID: 'R-001', question_state: 'Certified',
    ChoiceA: 'mA', ChoiceB: 'mB', ExplanationWrongA: 'wa',
  });
  const cont = JSON.stringify({
    Part: 1, Section: 'B', Stem: 's',
    Choices: { A: 'cA', B: 'cB' }, CorrectChoice: 'B', ExplanationCorrect: 'ec',
  });
  const single = JSON.stringify({
    QuestionID: 'R-003', ChoiceA: 's', Choices: { A: 't' }, CorrectChoice: 'A',
  });
  const exhibit = JSON.stringify({ ExhibitID: 'E1', Rows: [] });
  const r = parsePack('var X = [' + [meta, cont, single, exhibit].join(',\n') + ']');
  assert(r.records[0].role === 'metadata', 'r0=' + r.records[0].role);
  assert(r.records[1].role === 'content', 'r1=' + r.records[1].role);
  assert(r.records[2].role === 'single', 'r2=' + r.records[2].role);
  assert(r.records[3].role === null, 'r3=' + r.records[3].role);
});

test('NEIGHBOR ISOLATION mid-array: real DL-017 poison among 499 good objects', () => {
  const poison = loadFixture('fixture_dl017_P1B_B_101.txt');
  const content = composeArray(poison, 250, 500);
  let result;
  try {
    result = parsePack(content); // must not throw
  } catch (e) {
    throw new Error('parsePack threw: ' + e.message);
  }
  const errs = result.diagnostics.filter((d) => d.code === CODES.REGION_PARSE_FAILED);
  assert(result.records.length === 499, 'records=' + result.records.length);
  assert(errs.length >= 1, 'no error diagnostic emitted');
  assert(errs.some((d) => d.qid === 'P1B-B-101'), 'poison qid not recovered: ' +
    JSON.stringify(errs.map((d) => d.qid)));
  assert(errs.every((d) => d.severity === SEVERITY.ERROR), 'severity');
  // Neighbours before and after the poison are intact and ordered.
  // Poison replaced input index 250 (TST-250), so record #250 is TST-251.
  assert(result.records[249].object.QuestionID === 'TST-249', 'before neighbor');
  assert(result.records[250].object.QuestionID === 'TST-251', 'after neighbor');
  for (let k = 0; k < result.records.length; k++) {
    const expect = 'TST-' + String(k < 250 ? k : k + 1).padStart(3, '0');
    if (result.records[k].object.QuestionID !== expect) {
      throw new Error('order broken at ' + k + ': ' + result.records[k].object.QuestionID);
    }
  }
  // Invariant identity holds observably.
  const totalErrs = result.diagnostics.filter((d) => d.severity === SEVERITY.ERROR).length;
  assert(result.records.length + totalErrs === result.stats.totalRegions,
    'invariant identity: ' + (result.records.length + totalErrs) + ' vs ' + result.stats.totalRegions);
});

test('NEIGHBOR ISOLATION first-position variant', () => {
  const poison = loadFixture('fixture_dl017_P1B_C_150.txt');
  const r = parsePack(composeArray(poison, 0, 500));
  const errs = r.diagnostics.filter((d) => d.code === CODES.REGION_PARSE_FAILED);
  assert(r.records.length === 499, 'records=' + r.records.length);
  assert(errs.some((d) => d.qid === 'P1B-C-150'), 'qid not recovered');
  assert(r.records[0].object.QuestionID === 'TST-001', 'first neighbor shifted');
});

test('NEIGHBOR ISOLATION last-position variant', () => {
  const poison = loadFixture('fixture_dl017_P1B_F_100.txt');
  const r = parsePack(composeArray(poison, 499, 500));
  const errs = r.diagnostics.filter((d) => d.code === CODES.REGION_PARSE_FAILED);
  assert(r.records.length === 499, 'records=' + r.records.length);
  assert(errs.some((d) => d.qid === 'P1B-F-100'), 'qid not recovered');
  assert(r.records[498].object.QuestionID === 'TST-498', 'last good neighbor');
});

test('JS fallback: numeric-key artifact parses via function-constructor + WARNING (DL-017 second component)', () => {
  const content = 'var X = [{QuestionID:"NKF-001", 7:true, Stem:\'single quoted\', Choices:{A:"x"},}]';
  const r = parsePack(content);
  assert(r.records.length === 1, 'records=' + r.records.length);
  assert(r.records[0].parsedVia === 'function-constructor', 'parsedVia=' + r.records[0].parsedVia);
  assert(r.records[0].degraded === true, 'degraded flag');
  const warns = r.diagnostics.filter(
    (d) => d.code === CODES.JS_FALLBACK_USED && d.severity === SEVERITY.WARNING
  );
  assert(warns.length === 1, 'warnings=' + warns.length);
  assert(r.stats.parsedJsFallback === 1, 'stats distribution');
});

test('truncated EOF: prior records intact, ERROR diagnostic, no throw', () => {
  const truncatedTail = '{"QuestionID": "TST-001", "Stem": "unterminated str';
  const content = 'var X = [' + mkObj(0) + ',\n' + truncatedTail;
  const r = parsePack(content);
  assert(r.records.length === 1, 'records=' + r.records.length);
  assert(r.records[0].object.QuestionID === 'TST-000', 'first record wrong');
  assert(
    r.diagnostics.some((d) => d.code === CODES.TRUNCATED_ARRAY),
    'no array-level truncation diagnostic'
  );
  const regionErrs = r.diagnostics.filter(
    (d) =>
      d.severity === SEVERITY.ERROR &&
      d.code !== CODES.TRUNCATED_ARRAY &&
      d.code !== CODES.MISMATCHED_CLOSER
  );
  assert(regionErrs.length === 1, 'region errors=' + regionErrs.length);
  // Array-level diags annotate the array, not a region — invariant is region-scoped.
  assert(r.records.length + regionErrs.length === r.stats.totalRegions,
    'invariant identity broken');
});

test('mismatched closer: ERROR diagnostic, stats counter set', () => {
  const content = 'var X = [' + mkObj(0) + '}]';
  const r = parsePack(content);
  assert(r.diagnostics.some((d) => d.code === CODES.MISMATCHED_CLOSER), 'no mismatch diag');
  assert(r.stats.mismatchedClosers === 1, 'counter');
});

test('junk tokens between elements: JUNK_TOKENS ERROR, objects unaffected', () => {
  const content = 'var X = [' + mkObj(0) + ',,,42,' + mkObj(1) + ']';
  const r = parsePack(content);
  assert(r.records.length === 2, 'records=' + r.records.length);
  assert(r.diagnostics.some((d) => d.code === CODES.JUNK_TOKENS && d.severity === SEVERITY.ERROR),
    'no junk diag');
});

test('empty bank and no-bank input behave per contract', () => {
  const empty = parsePack('var E = [];');
  assert(empty.records.length === 0 && empty.stats.totalRegions === 0, 'empty bank');
  const none = parsePack('const x = 5;');
  assert(none.banks.length === 0, 'banks should be empty');
  assert(none.diagnostics.some(
    (d) => d.code === CODES.NO_ARRAYS_FOUND && d.severity === SEVERITY.WARNING
  ), 'no NO_ARRAYS_FOUND warning');
});

test('two banks in one file: both scanned, bank names attached', () => {
  const content = 'var B1 = [' + mkObj(0) + '];\nvar B2 = [' + mkObj(1) + ',' + mkObj(2) + '];';
  const r = parsePack(content);
  assert(r.banks.length === 2 && r.records.length === 3, 'banks/records');
  assert(r.records.filter((x) => x.bank === 'B1').length === 1, 'bank tag B1');
  assert(r.records.filter((x) => x.bank === 'B2').length === 2, 'bank tag B2');
});

test('canonical merge dual-block: pairing, provenance match=true', () => {
  const meta = JSON.stringify({
    QuestionID: 'DBX-001', question_state: 'Certified',
    ChoiceA: 'cA', ChoiceB: 'cB', ChoiceC: 'cC', ChoiceD: 'cD',
    ExplanationWrongA: 'wa', ExplanationWrongC: 'wc',
  });
  const cont = JSON.stringify({
    Part: 1, Section: 'B', Stem: 'dual stem',
    Choices: { A: 'cA', B: 'cB', C: 'cC', D: 'cD' },
    CorrectChoice: 'C', ExplanationCorrect: 'because.',
  });
  const parsed = parsePack('var X = [' + meta + ',\n' + cont + ']');
  const canon = toCanonicalRecords(parsed);
  assert(canon.length === 1, 'canon length=' + canon.length);
  const c = canon[0];
  assert(c.architecture === 'dual' && c.provenance.dualBlock === true, 'architecture');
  assert(c.correctChoice === 'C' && c.choices.B === 'cB', 'content fields');
  assert(c.explanationWrong.A === 'wa' && c.explanationWrong.C === 'wc', 'metadata EW slots');
  assert(c.provenance.contentChoicesMatchMetadata === true, 'match flag');
  assert(c.questionState === 'Certified', 'questionState from metadata block');
});

test('canonical merge dual-block: mismatch detected (contentChoicesMatchMetadata=false)', () => {
  const meta = JSON.stringify({
    QuestionID: 'DBX-002',
    ChoiceA: 'WRONG-META', ChoiceB: 'cB', ChoiceC: 'cC', ChoiceD: 'cD',
  });
  const cont = JSON.stringify({
    Choices: { A: 'cA', B: 'cB', C: 'cC', D: 'cD' }, CorrectChoice: 'A',
  });
  const canon = toCanonicalRecords(parsePack('var X = [' + meta + ',\n' + cont + ']'));
  assert(canon.length === 1, 'length');
  assert(canon[0].provenance.contentChoicesMatchMetadata === false, 'mismatch not detected');
});

test('canonical merge: unpaired metadata/content produce flagged standalone entries', () => {
  const meta = JSON.stringify({ QuestionID: 'LONELY-M', ChoiceA: 'a' });
  const cont = JSON.stringify({ Choices: { A: 'z' }, CorrectChoice: 'A', QuestionID: 'LONELY-C' });
  const canon = toCanonicalRecords(parsePack('var X = [' + meta + ',' + cont + ']'));
  assert(canon.length === 2, 'expected 2 standalone entries, got ' + canon.length);
  assert(canon[0].warnings.some((w) => /without following content/.test(w)), 'meta warning');
  assert(canon[1].warnings.some((w) => /without preceding metadata/.test(w)), 'content warning');
  assert(canon[0].contentMissing === true && canon[1].metadataMissing === true, 'flags');
});

test('unclassified objects preserved in canonical view (zero-drop extends here)', () => {
  const ex = JSON.stringify({ ExhibitID: 'E9', Rows: [[1, 2]] });
  const canon = toCanonicalRecords(parsePack('var X = [' + ex + ']'));
  assert(canon.length === 1 && canon[0].architecture === 'unclassified', 'dropped or mislabelled');
});

test('DETERMINISM: two runs deep-equal (condition 4)', () => {
  const poison = loadFixture('fixture_dl017_P1B_B_101.txt');
  const content = composeArray(poison, 120, 300);
  const a = parsePack(content);
  const b = parsePack(content);
  assert(deepEq(a, b), 'outputs differ between identical runs');
});

test('real-extract trio: all three isolate as ERROR with correct recovered QIDs', () => {
  const cases = [
    ['fixture_dl017_P1B_B_101.txt', 'P1B-B-101'],
    ['fixture_dl017_P1B_C_150.txt', 'P1B-C-150'],
    ['fixture_dl017_P1B_F_100.txt', 'P1B-F-100'],
  ];
  for (const [file, qid] of cases) {
    const poison = loadFixture(file);
    const r = parsePack(composeArray(poison, 5, 11)); // small scale; 500-scale covered above
    const hit = r.diagnostics.find(
      (d) => d.code === CODES.REGION_PARSE_FAILED && d.qid === qid
    );
    assert(hit, file + ': no REGION_PARSE_FAILED with qid ' + qid);
    assert(hit.line > 0 && typeof hit.line === 'number', 'line lookup failed');
  }
});

// ── Summary ──────────────────────────────────────────────────────────

console.log(
  '\n== Unit summary: ' + passed + ' passed, ' + failed + ' failed =='
);

if (failed > 0) {
  process.exit(1);
}

// ── Corpus mode (--corpus): read-only live-pack smoke pass ───────────

if (process.argv.includes('--corpus')) {
  console.log('\n== CORPUS PASS (read-only) ==\n');

  const PACKS = [
    { file: 'content/packs/pack_a_corrected.js', label: 'Pack A', expectedQIDs: 500 },
    { file: 'content/packs/pack_b_corrected.js', label: 'Pack B', expectedQIDs: 500 },
    { file: 'content/packs/pack_c_corrected.js', label: 'Pack C', expectedQIDs: 500 },
    { file: 'content/packs/pack_d_corrected.js', label: 'Pack D', expectedQIDs: 500 },
    { file: 'content/packs/pack_e_corrected.js', label: 'Pack E', expectedQIDs: 620 },
  ];

  let corpusFailures = 0;

  for (const pack of PACKS) {
    const fp = path.join(ROOT, pack.file);
    console.log('-- ' + pack.label + ' (' + pack.file + ')');
    try {
      const content = fs.readFileSync(fp, 'utf8');
      const rawGrepCount = (content.match(/"QuestionID"\s*:/g) || []).length;

      let result;
      try {
        result = parsePack(content, { sourceName: pack.label });
      } catch (e) {
        console.log('   INVARIANT THROW: ' + e.message);
        corpusFailures++;
        continue;
      }

      const errorDiags = result.diagnostics.filter((d) => d.severity === SEVERITY.ERROR).length;
      const warnDiags = result.diagnostics.filter((d) => d.severity === SEVERITY.WARNING).length;
      const distinctQids = new Set(result.records.map((r) => r.qid).filter(Boolean)).size;
      const identityOk = result.records.length + errorDiags === result.stats.totalRegions;
      const countOk = rawGrepCount === pack.expectedQIDs;
      const parserCountOk = distinctQids === pack.expectedQIDs;

      console.log(
        '   banks: ' + result.stats.banksFound +
        ' | regions: ' + result.stats.totalRegions +
        ' | records: ' + result.records.length +
        ' | errorDiags: ' + errorDiags +
        ' | warnDiags: ' + warnDiags
      );
      console.log(
        '   parsedVia: json=' + result.stats.parsedJson +
        ' | jsFallback=' + result.stats.parsedJsFallback +
        ' | failed=' + result.stats.failed
      );
      console.log(
        '   identity(records+errors===regions): ' + (identityOk ? 'OK' : 'VIOLATION') +
        ' | rawGrep QIDs: ' + rawGrepCount + (countOk ? '' : ' (MISMATCH vs expected ' + pack.expectedQIDs + ')') +
        ' | distinct parsed qids: ' + distinctQids + (parserCountOk ? '' : ' (MISMATCH)')
      );

      if (errorDiags > 0) {
        console.log('   FINDINGS (report-only, no fix in Phase A):');
        for (const d of result.diagnostics) {
          if (d.severity !== SEVERITY.ERROR) continue;
          console.log(
            '     [' + d.code + '] line ' + d.line +
            ' offset ' + d.offsets.start + '-' + d.offsets.end +
            (d.qid ? ' qid=' + d.qid : '') + ' :: ' + d.message.slice(0, 140)
          );
        }
      }

      if (!identityOk || !countOk || !parserCountOk) corpusFailures++;
    } catch (e) {
      console.log('   READ FAILURE: ' + e.message);
      corpusFailures++;
    }
    console.log('');
  }

  console.log(
    corpusFailures === 0
      ? '== CORPUS PASS — all five packs clean under canonical parser =='
      : '== CORPUS: ' + corpusFailures + ' pack(s) with findings — report to Board =='
  );
  process.exit(corpusFailures === 0 ? 0 : 1);
}

process.exit(0);
