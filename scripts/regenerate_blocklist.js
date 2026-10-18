const fs = require('fs');
const path = require('path');

const PACK_FILES = [
  'content/packs/pack_a_corrected.js',
  'content/packs/pack_b_corrected.js',
  'content/packs/pack_c_corrected.js',
  'content/packs/pack_d_corrected.js',
  'content/packs/pack_e_corrected.js'
];

function extractObjectsFromText(text) {
  const objects = [];
  let pos = 0;
  while (pos < text.length) {
    const objStart = text.indexOf('{', pos);
    if (objStart === -1) break;
    let depth = 1;
    let i = objStart + 1;
    let inString = false, stringChar = '', escape = false;
    while (depth > 0 && i < text.length) {
      const ch = text[i];
      if (escape) { escape = false; i++; continue; }
      if (inString) {
        if (ch === '\\') { escape = true; }
        else if (ch === stringChar) { inString = false; stringChar = ''; }
        i++; continue;
      }
      if (ch === '"' || ch === "'") { inString = true; stringChar = ch; i++; continue; }
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
      i++;
    }
    if (depth !== 0) break;
    const objText = text.substring(objStart, i);
    let obj = null;
    try { obj = JSON.parse(objText); } catch (e) {
      try { obj = new Function('return (' + objText + ')')(); } catch (e2) {}
    }
    if (obj && typeof obj === 'object' && !Array.isArray(obj) && obj.CorrectChoice) {
      objects.push(obj);
    }
    pos = i;
  }
  return objects;
}

const blocked = [];
let totalCertified = 0;

for (const pf of PACK_FILES) {
  const content = fs.readFileSync(pf, 'utf8');
  const objects = extractObjectsFromText(content);
  for (const obj of objects) {
    if (obj.question_state !== 'Certified') continue;
    totalCertified++;
    const qid = obj.QuestionID;
    const cc = obj.CorrectChoice;
    if (!cc || !/^[A-D]$/.test(cc)) continue;

    // DL-008: non-empty ExplanationWrong[CorrectChoice]
    const ewKey = 'ExplanationWrong' + cc;
    const ewVal = obj[ewKey];
    if (ewVal && typeof ewVal === 'string' && ewVal.length > 0) {
      blocked.push({ qid, pack: pf.includes('pack_a')?'A':pf.includes('pack_b')?'B':pf.includes('pack_c')?'C':pf.includes('pack_d')?'D':'E', defect_code: 'DL-008', state: 'Certified', block_from_delivery: true, block_from_recommendation: true, reason: 'QUALITY_DEFECT: Non-empty ExplanationWrong[CorrectChoice] — DL-008' });
      continue;
    }

    // DL-026: empty non-CC ExplanationWrong slots
    let hasEmptyNonCC = false;
    for (const L of ['A','B','C','D']) {
      if (L === cc) continue;
      const ewK = 'ExplanationWrong' + L;
      if (ewK in obj && typeof obj[ewK] === 'string' && obj[ewK].length === 0) {
        hasEmptyNonCC = true;
        break;
      }
    }
    if (hasEmptyNonCC) {
      blocked.push({ qid, pack: pf.includes('pack_a')?'A':pf.includes('pack_b')?'B':pf.includes('pack_c')?'C':pf.includes('pack_d')?'D':'E', defect_code: 'DL-026', state: 'Certified', block_from_delivery: true, block_from_recommendation: true, reason: 'QUALITY_DEFECT: Empty non-CorrectChoice ExplanationWrong slot — DL-026' });
      continue;
    }

    // DL-047: semantic key/explanation inversion (B:INVERSION check)
    if (obj.ExplanationCorrect && obj.Choices) {
      const ec = obj.ExplanationCorrect.toLowerCase();
      const ecWords = new Set(ec.match(/[a-z0-9]+/g) || []);
      let ccRecall = 0;
      const ccChoice = obj.Choices[cc] || '';
      const ccWords = new Set(ccChoice.toLowerCase().match(/[a-z0-9]+/g) || []);
      for (const w of ccWords) if (ecWords.has(w)) ccRecall++;
      ccRecall = ccWords.size > 0 ? ccRecall / ccWords.size : 0;

      let bestOtherRecall = 0;
      let bestOtherLetter = null;
      for (const [letter, choiceText] of Object.entries(obj.Choices)) {
        if (letter === cc) continue;
        const cWords = new Set(choiceText.toLowerCase().match(/[a-z0-9]+/g) || []);
        let recall = 0;
        for (const w of cWords) if (ecWords.has(w)) recall++;
        recall = cWords.size > 0 ? recall / cWords.size : 0;
        if (recall > bestOtherRecall) { bestOtherRecall = recall; bestOtherLetter = letter; }
      }

      if (bestOtherRecall > ccRecall + 0.15 && bestOtherRecall > 0.3) {
        blocked.push({ qid, pack: pf.includes('pack_a')?'A':pf.includes('pack_b')?'B':pf.includes('pack_c')?'C':pf.includes('pack_d')?'D':'E', defect_code: 'DL-047', state: 'Certified', block_from_delivery: true, block_from_recommendation: true, reason: 'QUALITY_DEFECT: ExplanationCorrect semantically matches distractor ' + bestOtherLetter + ' over CorrectChoice ' + cc + ' — DL-047' });
        continue;
      }
    }
  }
}

console.log('Total Certified scanned:', totalCertified);
console.log('Total blocked:', blocked.length);

// Load existing to get sections
const existing = JSON.parse(fs.readFileSync('governance/DELIVERY_BLOCKLIST_AND_SIMILARITY_FLAGS.json', 'utf8'));
const sectionMap = {};
for (const entry of existing.blocked) {
  sectionMap[entry.qid] = entry.section;
}

// Add section if missing
for (const b of blocked) {
  if (!b.section && sectionMap[b.qid]) b.section = sectionMap[b.qid];
}

const out = {
  description: existing.description,
  generated: new Date().toISOString(),
  session: 'S8-regeneration',
  blocked
};

fs.writeFileSync('governance/DELIVERY_BLOCKLIST_AND_SIMILARITY_FLAGS.json', JSON.stringify(out, null, 2) + '\n');
console.log('Blocklist regenerated:', blocked.length, 'entries');