/*
 * DL-003 Remediation V2 — Surgical text replacement on raw source
 * Avoids full re-serialization. Uses regex to find QID+choice and replace term.
 * Rule-5: processes each pack as a batch. pack_d (35 items) uses BLOCK-AUTHORIZED.
 */
const fs = require('fs');
const path = require('path');

const scratchDir = process.env.COMMANDCODE_SCRATCHPAD ||
  'C:/Users/User/AppData/Local/Temp/commandcode/C--Users-User-OneDrive-Desktop-CMA-Part-1-2026/4caceaa9-b5e6-47d5-ae1a-6221b5696ef8/scratchpad';

console.log('Scratchpad: ' + scratchDir);
const triage = JSON.parse(fs.readFileSync(path.join(scratchDir, 'dl003_triage_complete.json'), 'utf8'));

// Documented keeps (no rewrite at all)
const allKeeps = new Set([...triage.keeps.map(k => k.qid), 'P1B-E-150']);

// Collect all rewrite targets: for each non-keep QID, find distractor hits (not in CC)
var rewriteTargets = [];
const allQids = [...new Set([...triage.rewrites.map(r => r.qid), ...triage.keeps.map(k => k.qid)])];

allQids.forEach(qid => {
  if (allKeeps.has(qid)) return;
  
  // Find the hits for this QID
  const hit = [...triage.rewrites, ...triage.keeps].find(x => x.qid === qid);
  if (!hit) return;
  
  const pack = hit.pack;
  const bank = pack.replace('pack_', '').toUpperCase();
  const bankFile = path.join('content/packs', 'pack_' + bank.toLowerCase() + '_corrected.js');
  const src = fs.readFileSync(bankFile, 'utf8');
  const arr = new Function(src + '\nreturn MCQ_BANK_' + bank + ';')();
  const item = arr.find(q => q.QuestionID === qid);
  if (!item) return;
  var cc = String(item.CorrectChoice || '').toUpperCase();
  
  hit.hits.forEach(function(h) {
    // Parse hit: format "B \"never\"" or "Choice C \"always\""
    var m = h.match(/^(\w+)\s+"(.+)"$/);  // format: B "never"
    if (!m) {
      m = h.match(/Choice\s+(\w+)\s+"(.+)"$/);  // format: Choice C "always"
      if (!m) return;
    }
    var choiceLetter = m[1];
    var term = m[2];
    
    if (choiceLetter !== cc && item.Choices && item.Choices[choiceLetter]) {
      rewriteTargets.push({ qid, pack, bank, choice: choiceLetter, term: term });
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
console.log('\n=== REWRITE COUNT BY PACK ===');
Object.keys(byPack).sort().forEach(function(p) {
  var uniqueQids = new Set(byPack[p].map(function(x) { return x.qid; }));
  console.log('  ' + p + ': ' + byPack[p].length + ' rewrites (' + uniqueQids.size + ' unique QIDs)' + (uniqueQids.size > 30 ? ' [BLOCK-AUTHORIZED]' : ''));
});

// Reword function
function rewordTerm(text, term) {
  var replacements = { 'always': 'typically', 'never': 'rarely', 'impossible': 'highly impractical' };
  var re = new RegExp('\\b' + term + '\\b', 'gi');
  return String(text).replace(re, replacements[term]);
}

// Process each pack using surgical source replacement
var allChanges = [];

Object.keys(byPack).sort().forEach(function(packName) {
  var bank = packName.replace('pack_', '').toUpperCase();
  var bankFile = path.join('content/packs', 'pack_' + bank.toLowerCase() + '_corrected.js');
  var src = fs.readFileSync(bankFile, 'utf8');
  var originalSrc = src;
  
  console.log('\n=== Processing ' + packName + ' ===');
  
  // Apply surgical replacements
  byPack[packName].forEach(function(target) {
    var cc = null;
    // Find the QID and CC in a first pass
    var arr = new Function(src + '\nreturn MCQ_BANK_' + bank + ';')();
    var item = arr.find(function(q) { return q.QuestionID === target.qid; });
    if (!item) { console.log('  NOT FOUND: ' + target.qid); return; }
    cc = String(item.CorrectChoice || '').toUpperCase();
    
    if (target.choice === cc) return; // skip CC hits
    
    // Find the choice value in raw source
    // Pattern: "QuestionID": "P1-A-086", ... "Choice": "original text with term"
    // We need to find the QID, then within its object, find the choice letter
    
    // Find QID position
    var qidPattern = new RegExp('"QuestionID"\\s*:\\s*"' + target.qid.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"');
    var qidMatch = src.match(qidPattern);
    if (!qidMatch) { console.log('  QID NOT IN SOURCE: ' + target.qid); return; }
    
    var qidPos = qidMatch.index;
    
    // Find the choice letter pattern within this item
    // Choices may be in Choices object or individual fields
    // Look for "Choice X" near this QID (within reasonable distance)
    // Format: "Choice": "B" or "CorrectChoice": "C" or "Choices": {"A": "...", "B": "..."}
    
    // Actually, let me use a different approach: find the QID's object block and modify it
    // Find the start of the object (opening brace before QID)
    var objStart = src.lastIndexOf('{', qidPos);
    
    // Find the end of the object (matching closing brace)
    var braceCount = 1;
    var objEnd = objStart + 1;
    while (objEnd < src.length && braceCount > 0) {
      if (src[objEnd] === '{') braceCount++;
      if (src[objEnd] === '}') braceCount--;
      objEnd++;
    }
    
    var objSrc = src.substring(objStart, objEnd);
    
    // Re-parse just this object
    var objParsed = new Function('return ' + objSrc + ';')();
    if (!objParsed || !objParsed.Choices || !objParsed.Choices[target.choice]) {
      console.log('  NO CHOICE FOUND: ' + target.qid + ' Choice ' + target.choice);
      return;
    }
    
    var origText = String(objParsed.Choices[target.choice]);
    var newText = rewordTerm(origText, target.term);
    
    if (newText === origText) {
      console.log('  NO CHANGE: ' + target.qid + ' Choice ' + target.choice);
      return;
    }
    
    // Replace in source: find the choice in the object
    // Pattern: "B": "original text" → "B": "new text"
    // Escape special chars for regex
    var escapedOrig = origText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var escapedChoice = target.choice.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Find the choice value within the QID's object
    var choicePattern = new RegExp('"' + escapedChoice + '"\\s*:\\s*"' + escapedOrig + '"');
    var choiceMatchInObj = objSrc.match(choicePattern);
    
    if (!choiceMatchInObj) {
      // Try with escaped original text (may have newlines/special chars)
      console.log('  PATTERN NOT FOUND: ' + target.qid + ' Choice ' + target.choice + ' — skipping');
      return;
    }
    
    var choiceStart = objSrc.indexOf(choiceMatchInObj[0]);
    var choiceEnd = choiceStart + choiceMatchInObj[0].length;
    
    // Build the replacement
    var objStartInSrc = src.indexOf(objSrc, qidPos - 1000); // rough search
    // Actually, calculate the absolute position
    objStartInSrc = qidPos - (src.substring(0, qidPos).lastIndexOf('{'));
    // This is getting complex. Let me use a different approach.
    
    // Simple approach: replace in objSrc, then replace objSrc in src
    var newObjSrc = objSrc.substring(0, choiceStart) + '"' + target.choice + '": "' + newText + '"' + objSrc.substring(choiceEnd);
    
    // Find and replace this specific object in src
    // But objSrc may contain chars that don't match src exactly due to regex
    
    // Let me use a simpler string-based approach
    var origChoice = '"' + target.choice + '": "' + origText + '"';
    var newChoice = '"' + target.choice + '": "' + newText + '"';
    
    // Count occurrences before QID position to find the right one
    var beforeQid = src.substring(0, qidPos);
    var afterQid = src.substring(qidPos);
    
    var beforeCount = (beforeQid.match(new RegExp(origChoice.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    // Find the (beforeCount+1)th occurrence AFTER qidPos
    var remainingOccurrences = [];
    var searchStr = afterQid;
    var searchRegex = new RegExp(origChoice.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    var match;
    while ((match = searchRegex.exec(afterQid)) !== null) {
      remainingOccurrences.push(match.index);
    }
    
    if (remainingOccurrences.length === 0) {
      console.log('  CHOICE NOT FOUND AFTER QID: ' + target.qid + ' Choice ' + target.choice);
      return;
    }
    
    var absPos = qidPos + remainingOccurrences[0];
    src = src.substring(0, absPos) + newChoice + src.substring(absPos + origChoice.length);
    
    allChanges.push({ qid: target.qid, pack: packName, choice: target.choice, term: target.term });
    console.log('  REWROTE: ' + target.qid + ' Choice ' + target.choice + ' "' + target.term + '" → "' + newText.split(/\b/).filter(w => ['typically','rarely','highly impractical'].includes(w))[0] || '' + '"');
  });
  
  if (src !== originalSrc) {
    // Verify QID count unchanged
    var origCount = (originalSrc.match(/"QuestionID"/g) || []).length;
    var newCount = (src.match(/"QuestionID"/g) || []).length;
    console.log('  QID count: ' + origCount + ' → ' + newCount + ' ' + (origCount === newCount ? 'OK' : 'MISMATCH!'));
    
    if (origCount !== newCount) { console.error('  MISMATCH!'); process.exit(1); }
    
    // Verify re-parse
    var reparsed = new Function(src + '\nreturn MCQ_BANK_' + bank + ';')();
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
    
    fs.writeFileSync(bankFile, src);
    console.log('  WROTE ' + bankFile + (byPack[packName].length > 30 ? ' [BLOCK-AUTHORIZED]' : ''));
  } else {
    console.log('  No changes applied to this pack');
  }
});

console.log('\n=== REMEDIATION SUMMARY ===');
console.log('Total distractors rewritten: ' + allChanges.length);
console.log('Documented keeps: ' + allKeeps.size);
