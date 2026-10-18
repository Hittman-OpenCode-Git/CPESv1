// Bank consolidation (2026-10-18): move 10 Certified cases from
// case_pack_p2_authored.js + case_pack_p2_C4_C8.js into case_pack_p2_2.js
// (all CBQ22-* prefix). Banks 4/5 become empty shims with deprecation headers.
// Rule 5: 10 case objects (?30 items) — within BLOCK-AUTHORIZED threshold edge;
// verbatim move only, zero content edits, post-asserts mandatory.
const fs = require('fs');

const MOVE_PACK2 = [
  { file: 'p2/case_pack_p2_authored.js', name: 'casePackP2Authored', ids: ['CBQ22-A7', 'CBQ22-A8', 'CBQ22-F8', 'CBQ22-F9', 'CBQ22-F10'] },
  { file: 'p2/case_pack_p2_C4_C8.js', name: 'casePackP2_C4_C8', ids: ['CBQ22-C9', 'CBQ22-C10', 'CBQ22-C11', 'CBQ22-C12', 'CBQ22-C13'] }
];
const targetPath = 'p2/case_pack_p2_2.js';

// 1) Pre-assert target state
const t0 = fs.readFileSync(targetPath, 'utf8');
const bank0 = new Function(t0 + '; return casePackP2_2;')();
if (bank0.length !== 33) throw new Error('target pre-state expected 33 cases, got ' + bank0.length);
if (bank0.filter(c => c.question_state === 'Certified').length !== 24) throw new Error('target pre-state certified expected 24');

// 2) Extract verbatim object text spans from each source bank
let moved = 0;
const spansPerSrc = {};
for (const src of MOVE_PACK2) {
  const raw = fs.readFileSync(src.file, 'utf8');
  const bank = new Function(raw + '; return ' + src.name + ';')();
  if (bank.length !== 5) throw new Error(src.file + ' expected 5 cases, got ' + bank.length);
  const spans = [];
  for (const id of src.ids) {
    const c = bank.find(x => x.CaseID === id);
    if (!c) throw new Error(id + ' not found in ' + src.file);
    if (c.question_state !== 'Certified') throw new Error(id + ' not Certified (' + c.question_state + ')');
    // object starts at the '{' opening the case object and ends before next '  {' at same level
    const anchor = '"CaseID": "' + id + '"';
    const aIdx = raw.indexOf(anchor);
    if (aIdx < 0) throw new Error('anchor for ' + id + ' not found');
    // walk back to the object opener
    const open = raw.lastIndexOf('{', aIdx);
    if (open < 0) throw new Error('opener for ' + id + ' not found');
    // object closes at the ",\n  {" boundary just past the item's own JSON
    const nextOpen = raw.indexOf('\n  {', aIdx);
    const closeIdx = nextOpen >= 0 ? raw.lastIndexOf('}', nextOpen) : -1;
    const tail = raw.indexOf('}\n]', aIdx);
    if (closeIdx < 0 && tail < 0) throw new Error('closer for ' + id + ' not found');
    let end;
    if (nextOpen >= 0 && closeIdx < nextOpen) end = closeIdx;
    else end = tail;
    if (end <= open) throw new Error('bad span for ' + id);
    spans.push(raw.slice(open, end + 1));
  }
  spansPerSrc[src.name] = spans;
  moved += spans.length;
}
if (moved !== 10) throw new Error('expected 10 spans, got ' + moved);

// 3) Insert into target before its closing "];"
const closeSel = t0.lastIndexOf('];');
if (closeSel < 0) throw new Error('target close not found');
// previous non-whitespace char before "];" must be handled:
// walk back over whitespace from closeSel; caller often ends last case "  }"
// (no trailing comma). If last non-ws char is '}', start insertion with ','.
const head = t0.slice(0, closeSel);
const tail2 = head.replace(/\s+$/, '');
let needsComma = tail2.endsWith('}');
let insertion = needsComma ? '  ,' : '';
for (const name of Object.keys(spansPerSrc)) {
  for (const s of spansPerSrc[name]) {
    insertion += (needsComma ? '  ' : '  ') + s.replace(/\n/g, '\n  ') + ',\n';
    needsComma = false;
  }
}
const t1 = t0.slice(0, closeSel) + insertion + t0.slice(closeSel);
fs.writeFileSync(targetPath, t1);

// 4) Convert the two source banks to empty shims
for (const src of MOVE_PACK2) {
  const raw = fs.readFileSync(src.file, 'utf8');
  const firstLine = raw.slice(0, Math.max(raw.indexOf(src.name), 0));
  const headerCaret = raw.slice(0, raw.indexOf('var ' + src.name + ' = '));
  const header = headerCaret.length > 0 ? headerCaret : '';
  const shim = (header || '') + 'var ' + src.name + ' = []; // CONSOLIDATED 2026-10-18: ' +
    src.ids.join(', ') +
    ' moved verbatim to p2/case_pack_p2_2.js (section 1b restoration). Case-level archive stamps of superseded duplicates remain there. Do not author here; add cases to case_pack_p2_2.js.';
  fs.writeFileSync(src.file, shim);
}

// 5) Post-asserts
const t2 = fs.readFileSync(targetPath, 'utf8');
const bank2 = new Function(t2 + '; return casePackP2_2;')();
const ids = bank2.map(c => c.CaseID);
if (new Set(ids).size !== ids.length) throw new Error('CaseID dupes after merge');
if (bank2.length !== 43) throw new Error('post-merge case count expected 43, got ' + bank2.length);
const cert = bank2.filter(c => c.question_state === 'Certified').length;
const arch = bank2.filter(c => c.question_state === 'Archived').length;
if (cert !== 34 || arch !== 9) throw new Error('post-merge state census wrong: cert=' + cert + ' arch=' + arch);
const items = bank2.reduce((s, c) => s + (c.Items || []).length, 0);
if (items !== 258) throw new Error('post-merge item count expected 258, got ' + items);
const s1 = new Function(fs.readFileSync('p2/case_pack_p2_authored.js', 'utf8') + '\nreturn casePackP2Authored;')();
const s2 = new Function(fs.readFileSync('p2/case_pack_p2_C4_C8.js', 'utf8') + '\nreturn casePackP2_C4_C8;')();
if (s1.length !== 0 || s2.length !== 0) throw new Error('shims not empty');
console.log('MERGE OK: pack2 = 43 cases (' + cert + ' Certified / ' + arch + ' Archived), ' + items + ' items; shims empty.');
