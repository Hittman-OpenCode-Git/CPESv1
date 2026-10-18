/**
 * DL-066 certification flip — wave runner.
 * Flips '"question_state": "In Audit"' -> '"Certified"' for target P1 cases,
 * inserting Rule 16 certification stamps. One wave per invocation (<=30 objects).
 *
 * Run: node scripts/dl066_certify_flip.js --wave N
 */
const fs = require('fs');
const path = require('path');

const TARGET_CASES = new Set(['CBQ-C2','CBQ-C3','CBQ-D2','CBQ-E1','CBQ-E2','CBQ2-F1','CBQ2-A3','CBQ3-A1','CBQ4-A1','CBQ2-B2','CBQ3-B2','CBQ2-C3','CBQ3-C3','CBQ4-C1','CBQ4-E1','CBQ4-F1','CBQ5-A2','CBQ5-B2','CBQ4-B1','CBQ4-B2','CBQ4-D3','CBQ4-E2','CBQ4-E3','CBQ5-E1','CBQ5-E2','CBQ5-E3','CBQ4-F2','CBQ5-F2','CBQ3-A3','CBQ3-A4','CBQ3-C4']);

const CERT_BATCH = 'DL-066-HANDSOLVE';
const CERT_DATE = '2026-10-17';

function extractArray(raw) {
  const m = raw.match(/=\s*\[/);
  const arrStart = raw.indexOf('[', m.index);
  let depth = 0, pos = arrStart, inString = false, stringChar = '', escape = false;
  do {
    const ch = raw[pos];
    if (escape) { escape = false; pos++; continue; }
    if (inString) {
      if (ch === '\\') { escape = true; pos++; continue; }
      if (ch === stringChar) { inString = false; }
      pos++; continue;
    }
    if (ch === '"' || ch === "'") { inString = true; stringChar = ch; pos++; continue; }
    if (ch === '[') depth++;
    if (ch === ']') depth--;
    pos++;
  } while (depth > 0 && pos < raw.length);
  return { arr: JSON.parse(raw.slice(arrStart, pos)), arrStart, arrEnd: pos };
}

// Build deterministic chunk manifest: greedy <=30 objects per chunk, per file, document order
function buildChunks() {
  const chunks = [];
  for (const n of ['1', '2', '3']) {
    const file = 'content/cases/case_pack_' + n + '_corrected.js';
    const raw = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    const { arr } = extractArray(raw);
    let current = [];
    let currentCount = 0;
    for (const c of arr) {
      if (!TARGET_CASES.has(c.CaseID)) continue;
      if (c.question_state === 'Certified') continue;
      const occ = 1 + (c.Items || []).filter(it => it.question_state === 'In Audit').length;
      if (currentCount > 0 && currentCount + occ > 30) {
        chunks.push({ file, cases: current });
        current = [];
        currentCount = 0;
      }
      current.push(c.CaseID);
      currentCount += occ;
    }
    if (current.length) chunks.push({ file, cases: current });
  }
  return chunks;
}

// Locate case-block spans: case-level CaseID is followed by "Title"
function caseSpans(raw) {
  const starts = [];
  const caseRe = /"CaseID":\s*"([^"]+)"\s*,\s*"Title"/g;
  let m;
  while ((m = caseRe.exec(raw)) !== null) starts.push({ id: m[1], pos: m.index });
  const spans = new Map();
  for (let i = 0; i < starts.length; i++) {
    const end = i + 1 < starts.length ? starts[i + 1].pos : raw.length;
    spans.set(starts[i].id, [starts[i].pos, end]);
  }
  return spans;
}

const chunks = buildChunks();
console.log('Chunk manifest (' + chunks.length + ' waves):');
chunks.forEach((ch, i) => {
  const raw = fs.readFileSync(path.join(__dirname, '..', ch.file), 'utf8');
  const { arr } = extractArray(raw);
  const occ = ch.cases.reduce((s, id) => {
    const c = arr.find(x => x.CaseID === id);
    return s + 1 + (c.Items || []).filter(it => it.question_state === 'In Audit').length;
  }, 0);
  console.log('  Wave ' + (i + 1) + ': ' + ch.file + ' [' + ch.cases.join(', ') + '] = ' + occ + ' objects');
});

const waveArg = process.argv.indexOf('--wave');
if (waveArg === -1) { console.log('\nNo --wave given — manifest only. Exiting.'); process.exit(0); }
const wave = parseInt(process.argv[waveArg + 1], 10);
if (!(wave >= 1 && wave <= chunks.length)) { console.error('Invalid wave ' + wave); process.exit(1); }

const ch = chunks[wave - 1];
const filePath = path.join(__dirname, '..', ch.file);
const raw = fs.readFileSync(filePath, 'utf8');
const { arr } = extractArray(raw);
const byId = new Map(arr.map(c => [c.CaseID, c]));
const spans = caseSpans(raw);

let out = raw;
let replaced = 0;
const stampRe = /^([ \t]*)"question_state": "In Audit",((?:\r?\n))/gm;

// Apply in REVERSE document order so earlier spans keep valid coordinates
for (const id of [...ch.cases].reverse()) {
  const span = spans.get(id);
  const parsed = byId.get(id);
  if (!span || !parsed) { console.error('ASSERT FAIL: span/parse missing for ' + id); process.exit(1); }
  const expected = 1 + (parsed.Items || []).filter(it => it.question_state === 'In Audit').length;
  let count = 0;
  const seg = out.substring(span[0], span[1]);
  const repl = seg.replace(stampRe, (all, indent, eol) => {
    count++;
    return indent + '"question_state": "Certified",' + eol
      + indent + '"certification_batch": "' + CERT_BATCH + '",' + eol
      + indent + '"certification_date": "' + CERT_DATE + '",' + eol;
  });
  if (count !== expected) {
    console.error('ASSERT FAIL: ' + id + ' expected ' + expected + ' replacements, got ' + count);
    process.exit(1);
  }
  out = out.substring(0, span[0]) + repl + out.substring(span[1]);
  replaced += count;
  console.log('  ' + id + ': ' + count + ' -> Certified (batch=' + CERT_BATCH + ', date=' + CERT_DATE + ')');
}

fs.writeFileSync(filePath, out, 'utf8');
console.log('Wave ' + wave + ' complete: ' + replaced + ' objects flipped in ' + ch.file);

// Post-assert via parse
const post = extractArray(fs.readFileSync(filePath, 'utf8')).arr;
let fail = 0;
for (const id of ch.cases) {
  const c = post.find(x => x.CaseID === id);
  if (!c) { console.error('POST-FAIL missing case ' + id); fail++; continue; }
  if (c.question_state !== 'Certified') { console.error('POST-FAIL case ' + id + ' = ' + c.question_state); fail++; }
  if (c.certification_batch !== CERT_BATCH || c.certification_date !== CERT_DATE) { console.error('POST-FAIL case stamps ' + id); fail++; }
  for (const it of (c.Items || [])) {
    if (it.question_state !== 'Certified') { console.error('POST-FAIL item ' + it.ItemID + ' = ' + it.question_state); fail++; }
    if (it.certification_batch !== CERT_BATCH || it.certification_date !== CERT_DATE) { console.error('POST-FAIL stamps ' + it.ItemID); fail++; }
  }
}
console.log(fail === 0 ? 'Post-asserts: PASS (' + ch.cases.length + ' cases)' : 'Post-asserts: ' + fail + ' FAILURES');
process.exit(fail === 0 ? 0 : 1);
