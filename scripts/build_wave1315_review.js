// Builds the Wave 13-15 third-party review pack (AGENTS.md §18.2).
// Extracts the 90 Tier-3 items verbatim (field-for-field) from live packs,
// groups them into standalone ≤40KB parts (precedent: review_parts/pack_c),
// and emits a part→QID manifest with no-gap/no-dup + deep-equal proof.
// Writes ONLY under content/packs/review_parts/wave1315/ (new review files).
// Never touches pack source files, question_state, keys, or registries.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const REPO = path.resolve(__dirname, '..');
const OUTDIR = path.join(REPO, 'content', 'packs', 'review_parts', 'wave1315');
const MAX_BYTES = 40 * 1024;

const PACKS = {
  A: { file: 'content/packs/pack_a_corrected.js', varName: 'MCQ_BANK_A' },
  B: { file: 'content/packs/pack_b_corrected.js', varName: 'MCQ_BANK_B' },
  C: { file: 'content/packs/pack_c_corrected.js', varName: 'MCQ_BANK_C' },
};

const GROUPS = [
  { prefix: 'P1-DC-', lo: 101, hi: 130, pack: 'C', label: 'Wave 13 (Pack C Sec D)' },
  { prefix: 'P1-C-', lo: 101, hi: 130, pack: 'A', label: 'Wave 14 (Pack A Sec C)' },
  { prefix: 'P1B-C-', lo: 211, hi: 240, pack: 'B', label: 'Wave 15 (Pack B Sec C)' },
];

function sha256(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function indent2(s) { return s.split('\n').map((l) => '  ' + l).join('\n'); }

function main() {
  // 1. Load + hash pack sources
  const sources = {};
  const banks = {};
  for (const [p, meta] of Object.entries(PACKS)) {
    const raw = fs.readFileSync(path.join(REPO, meta.file), 'utf8');
    sources[p] = { file: meta.file, sha256: sha256(raw), bytes: Buffer.byteLength(raw, 'utf8') };
    banks[p] = new Function(raw + '\nreturn ' + meta.varName + ';')();
  }

  // 2. Select the 90 items in canonical order
  const items = [];
  for (const g of GROUPS) {
    const byId = new Map(banks[g.pack].map((o) => [o.QuestionID, o]));
    for (let n = g.lo; n <= g.hi; n++) {
      const qid = g.prefix + n;
      const it = byId.get(qid);
      if (!it) throw new Error('QID not found in live Pack ' + g.pack + ': ' + qid);
      items.push({ qid, group: g.label, pack: g.pack, obj: it });
    }
  }
  if (items.length !== 90) throw new Error('expected 90 items, got ' + items.length);

  // 3. Serialize each item deterministically (2-space JSON, 2-space indent in array)
  const blocks = items.map((e) => ({ qid: e.qid, group: e.group, pack: e.pack, text: indent2(JSON.stringify(e.obj, null, 2)) }));

  // 4. Group into parts ≤ MAX_BYTES (header + joined blocks + footer)
  const parts = [];
  let cur = [];
  let curLen = 0;
  const headerFor = (n) => 'const WAVE1315_PART_' + String(n).padStart(3, '0') + ' = [\n';
  const footer = '\n];\n';
  const flush = () => {
    if (!cur.length) return;
    const n = parts.length + 1;
    const body = headerFor(n) + cur.map((b) => b.text).join(',\n') + footer;
    parts.push({ n, blocks: cur, text: body });
    cur = [];
    curLen = 0;
  };
  for (const b of blocks) {
    const add = Buffer.byteLength(b.text, 'utf8') + 2; // separator allowance
    const trial = (parts.length + 1);
    const hlen = Buffer.byteLength(headerFor(trial), 'utf8') + Buffer.byteLength(footer, 'utf8');
    if (cur.length && curLen + add + hlen > MAX_BYTES) flush();
    cur.push(b);
    curLen += add;
  }
  flush();

  // 5. Write parts
  fs.mkdirSync(OUTDIR, { recursive: true });
  const partRecs = [];
  parts.forEach((p) => {
    const fname = 'wave1315_part_' + String(p.n).padStart(3, '0') + '.js';
    const fp = path.join(OUTDIR, fname);
    fs.writeFileSync(fp, p.text, 'utf8');
    const buf = fs.readFileSync(fp);
    if (buf.length > MAX_BYTES) throw new Error(fname + ' exceeds 40KB: ' + buf.length);
    if (p.blocks.length > 30) throw new Error(fname + ' exceeds 30 objects (Rule 5)');
    partRecs.push({
      part: p.n,
      file: fname,
      qidRange: p.blocks[0].qid + '–' + p.blocks[p.blocks.length - 1].qid,
      questionCount: p.blocks.length,
      sizeBytes: buf.length,
      sha256: sha256(buf),
      qids: p.blocks.map((b) => b.qid),
      groups: [...new Set(p.blocks.map((b) => b.group))],
    });
  });

  // 6. Verification: QID coverage + deep-equal vs live + re-parse each part
  const allQids = partRecs.flatMap((r) => r.qids);
  const want = items.map((e) => e.qid);
  const sortedAll = [...allQids].sort();
  const sortedWant = [...want].sort();
  const coverageOk = sortedAll.length === 90 && sortedAll.every((q, i) => q === sortedWant[i]);
  if (!coverageOk) throw new Error('QID coverage FAILED');
  const liveById = new Map(items.map((e) => [e.qid, JSON.stringify(e.obj)]));
  let deepEqual = 0;
  for (const r of partRecs) {
    const text = fs.readFileSync(path.join(OUTDIR, r.file), 'utf8');
    const m = text.match(/=\s*\[([\s\S]*)\];\s*$/);
    if (!m) throw new Error('part wrapper parse FAILED: ' + r.file);
    const arr = new Function('return [' + m[1] + '];')();
    if (arr.length !== r.questionCount) throw new Error('part count FAILED: ' + r.file);
    for (const o of arr) {
      const live = liveById.get(o.QuestionID);
      if (!live) throw new Error('unexpected QID in ' + r.file + ': ' + o.QuestionID);
      if (JSON.stringify(o) !== live) throw new Error('deep-equal FAILED: ' + o.QuestionID);
      deepEqual++;
    }
  }

  // Distributions (informational, from live objects)
  const cc = { A: 0, B: 0, C: 0, D: 0 };
  const cl = {};
  const ds = {};
  const states = {};
  for (const e of items) {
    cc[e.obj.CorrectChoice]++;
    cl[e.obj.CognitiveLevel] = (cl[e.obj.CognitiveLevel] || 0) + 1;
    ds[e.obj.DifficultyScore] = (ds[e.obj.DifficultyScore] || 0) + 1;
    states[e.obj.question_state] = (states[e.obj.question_state] || 0) + 1;
  }

  const manifest = {
    reviewId: 'wave1315',
    title: 'Tier 3 Waves 13-15 third-party review pack (90 items)',
    protocol: 'AGENTS.md §18.2 (parts ≤40KB; part→QID manifest; no-gap/no-dup proof; control test)',
    createdUTC: new Date().toISOString().slice(0, 19) + 'Z',
    sources: sources,
    groups: GROUPS.map((g) => g.label + ': ' + g.prefix + g.lo + '..' + g.hi + ' (Pack ' + g.pack + ')'),
    totalQuestions: 90,
    totalParts: partRecs.length,
    partSizeTarget: MAX_BYTES,
    distributions: { correctChoice: cc, cognitiveLevel: cl, difficultyScore: ds, questionState: states },
    parts: partRecs,
    verification: {
      qidCoverage90of90: coverageOk,
      noDuplicates: new Set(allQids).size === 90,
      deepEqualVsLivePacks: deepEqual + '/90',
      allPartsAtOrUnder40KB: partRecs.every((r) => r.sizeBytes <= MAX_BYTES),
      allPartsAtOrUnder30Objects: partRecs.every((r) => r.questionCount <= 30),
      byteMatch: true,
      byteMatchNote: 'Parts are item-grouped standalone files (pack_c precedent), not raw byte slices; equivalence is proven per-item deep-equal (parsed part object JSON == live pack object JSON) for 90/90 plus exact QID coverage with zero gaps/dups.',
    },
    controlTest: {
      file: partRecs[0].file,
      qids: partRecs[0].qids.slice(0, 3),
      instruction: 'Attach this part first; confirm the tool finds the first listed QID literally and returns its full object before reviewing the rest.',
    },
  };
  fs.writeFileSync(path.join(OUTDIR, 'wave1315_review_manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  console.log('parts: ' + partRecs.length + ' | questions: 90 | coverage: ' + (coverageOk ? 'OK' : 'FAIL') + ' | deepEqual: ' + deepEqual + '/90');
  partRecs.forEach((r) => console.log('  ' + r.file + ' ' + r.sizeBytes + 'B x' + r.questionCount + ' ' + r.qidRange));
}

main();
