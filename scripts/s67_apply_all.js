// Session 67 — Apply rewrites v4 — fixed via Part search
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
  if (!fs.existsSync(filePath)) { console.log(`  WARN: not found: ${filePath}`); return {}; }
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

// Find item boundaries using "Part" field then forward brace-match
function replaceItem(content, qid, newItemText) {
  // Find QID
  const qidPattern = `"QuestionID": "${qid}"`;
  const qidIdx = content.indexOf(qidPattern);
  if (qidIdx === -1) return { success: false, reason: 'QID not found' };

  // Find the "Part" field that belongs to this item (search backward from QID)
  // Each item starts with "Part": 1,
  const partIdx = content.lastIndexOf('"Part": 1,', qidIdx);
  if (partIdx === -1) return { success: false, reason: 'Part field not found before QID' };

  // The item's opening { should be on the line before "Part"
  // Find the { right before Part — scan backward from Part
  const beforePart = content.substring(0, partIdx);
  const openBrace = beforePart.lastIndexOf('{');
  if (openBrace === -1) return { success: false, reason: 'Opening brace not found before Part' };
  
  // Verify this { is the item start (it should be at the top level of the array)
  // Check if there's content between the { and "Part" that looks like the item start
  const between = content.substring(openBrace + 1, partIdx).trim();
  if (between !== '') {
    // There's content between { and "Part" — this { might be a nested object
    // Try scanning forward from this { to confirm it's the item
  }

  // Find the closing } — scan forward from qidIdx using string-aware brace counter
  // But for forward scanning, the escape logic is correct!
  let pos = openBrace + 1, depth = 1, inString = false, esc = false;
  while (pos < content.length && depth > 0) {
    const ch = content[pos];
    if (ch === '{' && !inString) depth++;
    else if (ch === '}' && !inString) { depth--; if (depth === 0) break; }
    else if (ch === '"' && !esc) inString = !inString;
    esc = (ch === '\\' && inString && !esc);
    pos++;
  }
  if (depth !== 0) return { success: false, reason: 'Closing brace not found (forward scan)' };
  const itemEnd = pos;

  // Verify this item contains the QID
  const oldItem = content.substring(openBrace, itemEnd + 1);
  if (!oldItem.includes(qidPattern)) return { success: false, reason: 'Item does not contain QID' };

  return { success: true, content: content.substring(0, openBrace) + newItemText + content.substring(itemEnd + 1) };
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

// === Main ===
console.log('=== Session 67 Rewrite Application v4 ===\n');

const agentOutputs = [
  'C:\\Users\\User\\.local\\share\\opencode\\tool-output\\tool_fae7b6f090012NqtRo4KFqGPTO',
  'C:\\Users\\User\\.local\\share\\opencode\\tool-output\\tool_fae8315bf001dbwWu93WErkxgS',
];

let allRewrites = {};
for (const outPath of agentOutputs) {
  const rewrites = extractRewrites(outPath);
  console.log(`Extracted ${Object.keys(rewrites).length} from ${path.basename(outPath)}`);
  Object.assign(allRewrites, rewrites);
}
console.log(`Total: ${Object.keys(allRewrites).length} rewrites\n`);

const packs = {};
for (const p of ['A','B','C','D','E']) packs[p] = loadPack(p);

let applied = 0;
const results = [];
for (const [qid, newItem] of Object.entries(allRewrites)) {
  const pack = getPack(qid);
  if (pack === '?') { console.log(`SKIP ${qid}`); continue; }
  const result = replaceItem(packs[pack], qid, newItem);
  if (result.success) {
    packs[pack] = result.content;
    applied++;
    console.log(`OK   ${qid} → Pack ${pack}`);
    results.push({qid, pack, status: 'applied'});
  } else {
    console.log(`FAIL ${qid}: ${result.reason}`);
    results.push({qid, pack, status: 'failed', reason: result.reason});
  }
}

console.log(`\nApplied: ${applied}/${Object.keys(allRewrites).length}`);

const origPacks = {};
for (const p of ['A','B','C','D','E']) origPacks[p] = loadPack(p);
for (const [pack, content] of Object.entries(packs)) {
  if (content !== origPacks[pack]) {
    savePack(pack, content);
    console.log(`SAVED Pack ${pack}`);
    try { new Function(content); console.log(`  Parse: PASS`); }
    catch(e) { console.log(`  Parse: FAIL — ${e.message.substring(0,100)}`); }
  }
}

fs.writeFileSync(path.join(__dirname, 'output', 'SESSION067_REWRITE_RESULTS.json'), JSON.stringify({
  session: '67', applied, target: 15, results
}, null, 2));
console.log('\nDone.');
