/*
 * DL-003 Remediation V3 — Clean parse-modify-reserialize
 * For each pack: parse array → modify distractor choices → reserialize as var MCQ_BANK_X = [...];
 * Rule-5: pack_d (35 unique QIDs) → BLOCK-AUTHORIZED marker in change log
 */
const fs = require('fs');
const path = require('path');

const scratchDir = process.env.COMMANDCODE_SCRATCHPAD ||
  'C:/Users/User/AppData/Local/Temp/commandcode/C--Users-User-OneDrive-Desktop-CMA-Part-1-2026/4caceaa9-b5e6-47d5-ae1a-6221b5696ef8/scratchpad';

const triage = JSON.parse(fs.readFileSync(path.join(scratchDir, 'dl003_triage_complete.json'), 'utf8'));

// Documented keeps (no rewrite at all — all CC absolutes + "all of the above" + explicit keep)
const allKeeps = new Set([...triage.keeps.map(k => k.qid), 'P1B-E-150']);

// Build rewrite targets: for each non-keep QID, find DISTRACTOR hits only (not CC)
var rewriteTargets = [];
var allQids = [...new Set([...triage.rewrites.map(r => r.qid), ...triage.keeps.map(k => k.qid)])];

allQids.forEach(qid => {
  if (allKeeps.has(qid)) return;
  
  var hit = [...triage.rewrites, ...triage.keeps].find(x => x.qid === qid);
  if (!hit) return;
  
  var pack = hit.pack;
  var bank = pack.replace('pack_', '').toUpperCase();
  var bankFile = path.join('content/packs', 'pack_' + bank.toLowerCase() + '_corrected.js');
  var src = fs.readFileSync(bankFile, 'utf8');
  var arr = new Function(src + '\nreturn MCQ_BANK_' + bank + ';')();
  var item = arr.find(q => q.QuestionID === qid);
  if (!item) return;
  var cc = String(item.CorrectChoice || '').toUpperCase();
  
  hit.hits.forEach(function(h) {
    // Parse hit: "B \"never\"" or "Choice C \"always\""
    var m = h.match(/^(\w+)\s+"(.+)"$/);
    if (!m) { m = h.match(/Choice\s+(\w+)\s+"(.+)"$/); if (!m) return; }
    var choiceLetter = m[1];
    var term = m[2];
    
    if (choiceLetter !== cc) {
      rewriteTargets.push({ qid: qid, pack: pack, bank: bank, choice: choiceLetter, term: term });
    }
  });
});

console.log('Total rewrite targets: ' + rewriteTargets.length);

// Group by pack
var byPack = {};
rewriteTargets.forEach(function(r) {
  if (!byPack[r.pack]) byPack[r.pack] = [];
  byPack[r.pack].push(r);
});

function rewordTerm(text, term) {
  var replacements = { 'always': 'typically', 'never': 'rarely', 'impossible': 'highly impractical' };
  var re = new RegExp('\\b' + term + '\\b', 'gi');
  return String(text).replace(re, replacements[term]);
}

var allChanges = [];

Object.keys(byPack).sort().forEach(function(packName) {
  var bank = packName.replace('pack_', '').toUpperCase();
  var bankFile = path.join('content/packs', 'pack_' + bank.toLowerCase() + '_corrected.js');
  var src = fs.readFileSync(bankFile, 'utf8');
  var arr = new Function(src + '\nreturn MCQ_BANK_' + bank + ';')();
  
  // Deduplicate by QID (some have multiple distractor hits)
  var uniqueQids = new Set();
  byPack[packName].forEach(r => uniqueQids.add(r.qid));
  
  console.log('\n=== ' + packName + ': ' + uniqueQids.size + ' unique QIDs, ' + byPack[packName].length + ' choices ===');
  console.log('  Rule 5: ' + (uniqueQids.size > 30 ? 'EXCEEDS (BLOCK-AUTHORIZED)' : 'OK (<=30)'));
  
  var modified = 0;
  
  byPack[packName].forEach(function(target) {
    var item = arr.find(q => q.QuestionID === target.qid);
    if (!item || !item.Choices || !item.Choices[target.choice]) return;
    
    var origText = String(item.Choices[target.choice]);
    var newText = rewordTerm(origText, target.term);
    
    if (newText !== origText) {
      item.Choices[target.choice] = newText;
      allChanges.push({ qid: target.qid, pack: packName, choice: target.choice, term: target.term });
      modified++;
      if (modified <= 5 || modified === uniqueQids.size) {
        console.log('  REWROTE: ' + target.qid + ' Choice ' + target.choice + ' "' + target.term + '"');
      } else if (modified === 6) {
        console.log('  ... (more rewrites)');
      }
    }
  });
  
  console.log('  Modified: ' + modified + ' choices');
  
  if (modified > 0) {
    // Re-serialize
    var jsonOut = JSON.stringify(arr, null, 2);
    jsonOut = jsonOut.replace(/\\u2014/g, '\u2014').replace(/\\u2013/g, '\u2013')
      .replace(/\\u201c/g, '\u201c').replace(/\\u201d/g, '\u201d')
      .replace(/\\u2026/g, '\u2026').replace(/\\u00a0/g, '\u00a0')
      .replace(/\\u2018/g, '\u2018').replace(/\\u2019/g, '\u2019');
    
    var newSrc = 'var MCQ_BANK_' + bank.toUpperCase() + ' = ' + jsonOut + ';\n';
    
    // Verify QID count
    var origCount = (src.match(/"QuestionID"/g) || []).length;
    var newCount = (newSrc.match(/"QuestionID"/g) || []).length;
    console.log('  QID count: ' + origCount + ' -> ' + newCount + ' ' + (origCount === newCount ? 'OK' : 'MISMATCH!'));
    if (origCount !== newCount) { console.error('  MISMATCH!'); process.exit(1); }
    
    // Reparse
    var reparsed = new Function(newSrc + '\nreturn MCQ_BANK_' + bank + ';')();
    console.log('  Reparse OK: ' + reparsed.length + ' items');
    
    // Count remaining distractor absolutes
    var remaining = 0;
    reparsed.forEach(function(q) {
      if (!q.Choices) return;
      var cc2 = String(q.CorrectChoice || '').toUpperCase();
      ['A','B','C','D'].forEach(function(L) {
        if (L !== cc2 && q.Choices[L]) {
          var v = String(q.Choices[L]).toLowerCase();
          if (/\b(always|never|impossible)\b/.test(v)) remaining++;
        }
      });
    });
    console.log('  Remaining distractor absolutes in pack: ' + remaining);
    
    fs.writeFileSync(bankFile, newSrc);
    console.log('  WROTE ' + bankFile + (uniqueQids.size > 30 ? ' [BLOCK-AUTHORIZED]' : ''));
  } else {
    console.log('  No changes needed');
  }
});

// Save change log
fs.writeFileSync(path.join(scratchDir, 'dl003_remediation_changes.json'), JSON.stringify({
  totalRewritten: allChanges.length,
  changes: allChanges,
  documentedKeeps: Array.from(allKeeps),
  keepCount: allKeeps.size
}, null, 2));

console.log('\n=== REMEDIATION COMPLETE ===');
console.log('Total distractors rewritten: ' + allChanges.length);
console.log('Documented keeps (no action): ' + allKeeps.size);
