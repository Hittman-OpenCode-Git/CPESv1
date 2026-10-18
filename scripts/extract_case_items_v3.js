/**
 * extract_case_items_v3.js — Extract full text of INVERSION-flagged case items
 * by parsing the Items array within each case object.
 * READ-ONLY.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const analysis = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/output/case_inversion_analysis.json'), 'utf8'));
const strong = analysis.strongItems;

// Group by bank file
const byBank = {};
for (const item of strong) {
  if (!byBank[item.bank]) byBank[item.bank] = [];
  byBank[item.bank].push(item);
}

for (const bankKey of Object.keys(byBank)) {
  const fp = path.join(ROOT, bankKey);
  const src = fs.readFileSync(fp, 'utf8');
  // Variable name varies; use Function constructor to parse
  let varName;
  const match = src.match(/const\s+(\w+)\s*=/);
  if (match) varName = match[1];
  const cases = new Function(src + `\nreturn ${varName};`)();

  // Build lookup: caseId -> array of items
  const caseMap = {};
  for (const c of cases) {
    if (!c) continue;
    const cid = c.CaseID;
    if (!cid) continue;
    caseMap[cid] = c;
  }

  console.log(`\n${'='.repeat(80)}`);
  console.log(`BANK: ${bankKey}  (${byBank[bankKey].length} strong candidates)`);
  console.log('='.repeat(80));

  for (const item of byBank[bankKey]) {
    const c = caseMap[item.caseId];
    if (!c) {
      console.log(`\n--- ${item.caseId} / ${item.itemId} ---`);
      console.log(`  [CASE NOT FOUND]`);
      continue;
    }
    const caseItems = c.Items || [];
    let o = caseItems.find(it => it && (it.ItemID === item.itemId || it.QuestionID === item.itemId));

    console.log(`\n--- ${item.caseId} / ${item.itemId} | caseState=${item.caseState} | itemState=${item.itemState} ---`);
    console.log(`  ${item.detail}`);

    if (!o) {
      console.log(`  [NOT FOUND in Items array]`);
      console.log(`  Available ItemIDs: ${caseItems.map(it => it.ItemID || it.QuestionID || '?').join(', ')}`);
      continue;
    }

    // Print full item content
    const caseType = o.Type;
    if (caseType === 'select' || caseType === 'multi') {
      console.log(`  Type: ${caseType}`);
      console.log(`  Prompt: ${(o.Prompt || o.questionText || '').toString().substring(0, 500)}`);
      if (o.Choices) {
        const ch = Array.isArray(o.Choices) ? o.Choices : (typeof o.Choices === 'string' ? JSON.parse(o.Choices) : o.Choices);
        for (let i = 0; i < ch.length; i++) {
          const l = String.fromCharCode(65 + i);
          console.log(`  Choice ${l}: ${ch[i].toString().substring(0, 200)}`);
        }
      }
      console.log(`  Correct: ${o.Correct}`);
      // Find which letter matches
      if (o.Choices && Array.isArray(o.Choices)) {
        const idx = o.Choices.indexOf(o.Correct);
        if (idx >= 0) console.log(`  CorrectLetter: ${String.fromCharCode(65 + idx)}`);
      }
      const ec = o.Explanation || o.ExplanationCorrect || o.EC;
      if (ec) console.log(`  EC: ${ec.toString().substring(0, 600)}`);
      for (const l of ['A','B','C','D']) {
        const ew = o[`ExplanationWrong${l}`];
        if (ew !== undefined) console.log(`  EW${l}: ${ew.toString().substring(0, 200)}`);
      }
    } else if (caseType === 'numeric') {
      console.log(`  Type: numeric`);
      console.log(`  Prompt: ${(o.Prompt || '').toString().substring(0, 500)}`);
      console.log(`  Correct: ${o.Correct}`);
      const ec = o.Explanation || o.ExplanationCorrect || o.EC;
      if (ec) console.log(`  EC: ${ec.toString().substring(0, 600)}`);
      for (const l of ['A','B','C','D']) {
        const ew = o[`ExplanationWrong${l}`];
        if (ew !== undefined) console.log(`  EW${l}: ${(ew||'').toString().substring(0, 200)}`);
      }
    } else {
      // Unknown type — dump all fields
      console.log(`  Type: ${caseType || 'unknown'}`);
      console.log(`  All fields: ${JSON.stringify(o).substring(0, 800)}`);
    }
  }
}
