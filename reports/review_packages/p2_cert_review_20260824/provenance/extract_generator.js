const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = 'C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026';
const OUT = path.join(ROOT, 'reports/review_packages/p2_cert_review_20260824');
fs.mkdirSync(path.join(OUT, 'chunks'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'provenance'), { recursive: true });

function extractObjects(text) {
  const objs = [];
  let pos = 0;
  while ((pos = text.indexOf('{', pos)) !== -1) {
    let depth = 1, i = pos + 1, ins = false, esc = false;
    while (depth > 0 && i < text.length) {
      const c = text[i];
      if (esc) { esc = false; i++; continue; }
      if (ins) { if (c === '\\') esc = true; else if (c === '"') ins = false; i++; continue; }
      if (c === '"') { ins = true; i++; continue; }
      if (c === '{') depth++;
      if (c === '}') depth--;
      i++;
    }
    try {
      const o = JSON.parse(text.slice(pos, i));
      if (o.QuestionID || o.CaseID) objs.push(o);
    } catch (e) { }
    pos = i;
  }
  return objs;
}

const sha256 = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex').toUpperCase();

// ---------- MCQ groups: split at <=8 items per chunk ----------
const mcqGroups = [
  { pack: 'p2/pack_p2_a.js', sec: 'A', ranges: [[176, 183], [184, 190]] },
  { pack: 'p2/pack_p2_c.js', sec: 'C', ranges: [[141, 148], [149, 155], [156, 163], [164, 170], [171, 178], [179, 185], [186, 193], [194, 200]] }
];

// ---------- case groups ----------
const caseGroups = [
  { out: 'CASES_p2_1_CBQ21-A1_D1.json', pack: 'p2/case_pack_p2_1.js', ids: ['CBQ21-A1', 'CBQ21-D1'] },
  { out: 'CASES_p2_1_CBQ21-B2_E2.json', pack: 'p2/case_pack_p2_1.js', ids: ['CBQ21-B2', 'CBQ21-E2'] },
  { out: 'CASES_p2_2_CBQ22-B1_F1.json', pack: 'p2/case_pack_p2_2.js', ids: ['CBQ22-B1', 'CBQ22-F1'] },
  { out: 'CASES_p2_2_CBQ22-A2_D2.json', pack: 'p2/case_pack_p2_2.js', ids: ['CBQ22-A2', 'CBQ22-D2'] },
  { out: 'CASES_p2_3_CBQ23-C1_E1.json', pack: 'p2/case_pack_p2_3.js', ids: ['CBQ23-C1', 'CBQ23-E1'] },
  { out: 'CASES_p2_3_CBQ23-C2_F2.json', pack: 'p2/case_pack_p2_3.js', ids: ['CBQ23-C2', 'CBQ23-F2'] }
];

const manifestRows = [];
let oversized = [];

for (const g of mcqGroups) {
  const src = path.join(ROOT, g.pack);
  const srcSha = sha256(src);
  const objs = extractObjects(fs.readFileSync(src, 'utf8')).filter(o => o.QuestionID && o.QuestionID.startsWith('P2-' + g.sec + '-'));
  const byId = new Map(objs.map(o => [o.QuestionID, o]));
  for (const [lo, hi] of g.ranges) {
    const expected = [];
    for (let n = lo; n <= hi; n++) expected.push('P2-' + g.sec + '-' + String(n).padStart(3, '0'));
    const picked = [], skippedCertified = [];
    for (const qid of expected) {
      const o = byId.get(qid);
      if (!o) throw new Error('MISSING ' + qid);
      if (o.question_state === 'Certified') skippedCertified.push(qid);
      else picked.push(o);
    }
    const gotIds = picked.map(o => o.QuestionID);
    const dups = gotIds.filter((v, i) => gotIds.indexOf(v) !== i);
    if (dups.length) throw new Error('dups: ' + dups);
    const first = expected[0].slice(-3), last = expected[expected.length - 1].slice(-3);
    const fname = 'MCQ_' + g.sec + '_' + first + '-' + last + '.json';
    const body = JSON.stringify(picked, null, 1);
    const fp = path.join(OUT, 'chunks', fname);
    fs.writeFileSync(fp, body, 'utf8');
    const bytes = fs.statSync(fp).size;
    if (bytes > 40000) oversized.push(fname);
    manifestRows.push({
      file: 'chunks/' + fname, kind: 'MCQ', ids: gotIds.join(', '), count: picked.length,
      bytes, sha: sha256(fp), sourcePack: g.pack, sourceSha: srcSha,
      skippedCertified: skippedCertified.join(',') || 'none'
    });
    console.log(fname, '->', picked.length, 'items,', bytes, 'B', skippedCertified.length ? '(cert skipped: ' + skippedCertified.join(',') + ')' : '');
  }
}

for (const g of caseGroups) {
  const src = path.join(ROOT, g.pack);
  const srcSha = sha256(src);
  const all = extractObjects(fs.readFileSync(src, 'utf8')).filter(o => o.CaseID && o.Items);
  const picked = [], skippedCertified = [];
  for (const id of g.ids) {
    const c = all.find(o => o.CaseID === id);
    if (!c) throw new Error('case not found: ' + id);
    if (c.question_state === 'Certified') skippedCertified.push(id);
    else picked.push(c);
  }
  const body = JSON.stringify(picked, null, 1);
  const fp = path.join(OUT, 'chunks', g.out);
  fs.writeFileSync(fp, body, 'utf8');
  const bytes = fs.statSync(fp).size;
  if (bytes > 40000) oversized.push(g.out);
  const itemCount = picked.reduce((s, c) => s + c.Items.length, 0);
  manifestRows.push({
    file: 'chunks/' + g.out, kind: 'CASE', ids: g.ids.join(', '), count: picked.length,
    bytes, sha: sha256(fp), sourcePack: g.pack, sourceSha: srcSha,
    itemsTotal: itemCount, skippedCertified: skippedCertified.join(',') || 'none'
  });
  console.log(g.out, '->', picked.length, 'cases /', itemCount, 'items,', bytes, 'B');
}

fs.copyFileSync(__filename, path.join(OUT, 'provenance/extract_generator.js'));
manifestRows.push({
  file: 'provenance/extract_generator.js', kind: 'PROVENANCE',
  ids: '-', count: '-', bytes: fs.statSync(path.join(OUT, 'provenance/extract_generator.js')).size,
  sha: sha256(path.join(OUT, 'provenance/extract_generator.js')), sourcePack: '-', sourceSha: '-'
});

fs.writeFileSync(path.join(OUT, 'manifest_data.json'), JSON.stringify({
  generated: new Date().toISOString(),
  scope: 'Uncertified Part 2 content authored in sessions P2-053..P2-057',
  rows: manifestRows
}, null, 1));

console.log('\nOVERSIZED:', oversized.length ? oversized : 'none');
console.log('Chunks total:', manifestRows.filter(r => r.kind !== 'PROVENANCE').length);
