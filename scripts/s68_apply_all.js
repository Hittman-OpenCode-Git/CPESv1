// Session 68 — Apply all rewrites to pack files (same approach as S67)
const fs = require('fs');
const path = require('path');
const BASE = path.resolve(__dirname, '..');

function loadPack(p) {
  const files = {A:'pack_a_corrected.js',B:'pack_b_corrected.js',C:'pack_c_corrected.js',D:'pack_d_corrected.js',E:'pack_e_corrected.js'};
  return fs.readFileSync(path.join(BASE, files[p]), 'utf8');
}
function savePack(p, c) {
  const files = {A:'pack_a_corrected.js',B:'pack_b_corrected.js',C:'pack_c_corrected.js',D:'pack_d_corrected.js',E:'pack_e_corrected.js'};
  fs.writeFileSync(path.join(BASE, files[p]), c, 'utf8');
}

function extractRewrites(filePath) {
  if (!fs.existsSync(filePath)) { console.log('  Not found: '+filePath); return {}; }
  const content = fs.readFileSync(filePath, 'utf8');
  const rewrites = {};
  let searchPos = 0;
  while (true) {
    const markerIdx = content.indexOf('REWRITTEN CONTENT:', searchPos);
    if (markerIdx === -1) break;
    const jsonStart = content.indexOf('{', markerIdx);
    if (jsonStart === -1) { searchPos = markerIdx + 1; continue; }
    let pos = jsonStart + 1, depth = 1, inString = false, esc = false;
    while (pos < content.length && depth > 0) {
      const ch = content[pos];
      if (ch === '{' && !inString) depth++;
      else if (ch === '}' && !inString) { depth--; if (depth === 0) break; }
      else if (ch === '"' && !esc) inString = !inString;
      esc = (ch === '\\' && inString && !esc);
      pos++;
    }
    if (depth !== 0) { searchPos = markerIdx + 1; continue; }
    const jsonText = content.substring(jsonStart, pos + 1);
    const qidMatch = jsonText.match(/"QuestionID":\s*"([^"]+)"/);
    if (qidMatch) {
      const tabbed = jsonText.replace(/^        /gm, '\t\t').replace(/^    /gm, '\t');
      rewrites[qidMatch[1]] = tabbed;
    }
    searchPos = pos + 1;
  }
  return rewrites;
}

function getPack(qid) {
  if (qid.startsWith('P1B-')) return 'B';
  if (qid.startsWith('P1E-')) return 'E';
  const parts = qid.split('-');
  const section = parts[1];
  if (section.length === 1) return 'A';
  if (section.endsWith('C')) return 'C';
  if (section.endsWith('D')) return 'D';
  return '?';
}

function replaceItem(content, qid, newItem) {
  const idx = content.indexOf('"QuestionID": "' + qid + '"');
  if (idx === -1) return { ok: false, reason: 'QID not found' };
  // Find Part field (reliable for Packs A-D)
  const partIdx = content.lastIndexOf('"Part": 1,', idx);
  if (partIdx === -1) return { ok: false, reason: 'Part not found' };
  const openBrace = content.substring(0, partIdx).lastIndexOf('{');
  if (openBrace === -1) return { ok: false, reason: 'Opening brace not found' };
  let pos = openBrace + 1, depth = 1, inString = false, esc = false;
  while (pos < content.length && depth > 0) {
    const ch = content[pos];
    if (ch === '{' && !inString) depth++;
    else if (ch === '}' && !inString) { depth--; if (depth === 0) break; }
    else if (ch === '"' && !esc) inString = !inString;
    esc = (ch === '\\' && inString && !esc);
    pos++;
  }
  if (depth !== 0) return { ok: false, reason: 'Closing brace not found' };
  const oldItem = content.substring(openBrace, pos + 1);
  if (!oldItem.includes('"QuestionID": "' + qid + '"')) return { ok: false, reason: 'Wrong item' };
  return { ok: true, content: content.substring(0, openBrace) + newItem + content.substring(pos + 1) };
}

// Pack E replacement (different field order)
function replacePackE(content, qid, newItem) {
  const idx = content.indexOf('"QuestionID": "' + qid + '"');
  if (idx === -1) return { ok: false, reason: 'QID not found' };
  // Find the { before QID — scan backward for \n    {\n
  const before = content.substring(0, idx);
  // Find all item boundary markers
  const boundaries = [];
  let p = 0;
  while ((p = content.indexOf('\n    {\n', p)) !== -1) {
    boundaries.push(p + 1);
    p++;
  }
  let itemStart = -1;
  for (let i = boundaries.length - 1; i >= 0; i--) {
    if (boundaries[i] < idx) { itemStart = boundaries[i]; break; }
  }
  if (itemStart === -1) return { ok: false, reason: 'Item start not found' };
  const endMark = content.indexOf('\n    },', idx);
  if (endMark === -1) return { ok: false, reason: 'Item end not found' };
  return { ok: true, content: content.substring(0, itemStart) + newItem + content.substring(endMark + 6) };
}

console.log('=== Session 68 Rewrite Application ===\n');

const agentOutputs = [
  'C:\\Users\\User\\.local\\share\\opencode\\tool-output\\tool_faee11749001YajOqxmZ2x3fJw',
  'C:\\Users\\User\\.local\\share\\opencode\\tool-output\\tool_faee135dd001qgt4bOUTNxcFod',
];

let allRewrites = {};
for (const outPath of agentOutputs) {
  const rewrites = extractRewrites(outPath);
  console.log('Extracted ' + Object.keys(rewrites).length + ' from ' + path.basename(outPath));
  Object.assign(allRewrites, rewrites);
}
console.log('Total: ' + Object.keys(allRewrites).length + ' rewrites\n');

const packs = {};
for (const p of ['A','B','C','D','E']) packs[p] = loadPack(p);

let applied = 0;
const results = [];
for (const [qid, newItem] of Object.entries(allRewrites)) {
  const pack = getPack(qid);
  if (pack === '?') { console.log('SKIP ' + qid); continue; }
  
  const result = (pack === 'E') ? replacePackE(packs[pack], qid, newItem) : replaceItem(packs[pack], qid, newItem);
  if (result.ok) {
    packs[pack] = result.content;
    applied++;
    console.log('OK   ' + qid + ' → Pack ' + pack);
    results.push({qid, pack, status: 'applied'});
  } else {
    console.log('FAIL ' + qid + ': ' + result.reason);
    results.push({qid, pack, status: 'failed', reason: result.reason});
  }
}

console.log('\nApplied: ' + applied + '/' + Object.keys(allRewrites).length);

const origPacks = {};
for (const p of ['A','B','C','D','E']) origPacks[p] = loadPack(p);
for (const [pack, content] of Object.entries(packs)) {
  if (content !== origPacks[pack]) {
    savePack(pack, content);
    console.log('SAVED Pack ' + pack);
    try { new Function(content); console.log('  Parse: PASS'); }
    catch(e) { console.log('  Parse: FAIL — ' + e.message.substring(0,100)); }
  }
}

fs.writeFileSync(path.join(__dirname, 'output', 'SESSION068_REWRITE_RESULTS.json'), JSON.stringify({
  session: '68', applied, target: 15, results
}, null, 2));
console.log('\nDone.');
