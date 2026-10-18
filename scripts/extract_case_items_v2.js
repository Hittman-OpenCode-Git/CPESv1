/**
 * extract_case_items_v2.js — Extract full text of INVERSION-flagged case items.
 * Case items use ItemID/Correct/Explanation, not QuestionID/CorrectChoice/ExplanationCorrect.
 * READ-ONLY: parses case pack files, outputs item content for manual review.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const { parsePack } = require('./lib/pack_parser');

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
  const parsed = parsePack(src, { sourceName: path.basename(bankKey) });

  // Build lookup by CaseID + ItemID (case items are nested in items array)
  // Also check top-level records
  const itemMap = {};
  for (const rec of parsed.records) {
    if (!rec.object) continue;
    const cid = rec.object.CaseID;
    const iid = rec.object.ItemID || rec.object.QuestionID || rec.object.CaseQuestionID;
    if (cid && iid) itemMap[`${cid}|${iid}`] = rec.object;
    if (cid && !iid && rec.object.Type) {
      // Might be a question object without explicit ItemID
    }
  }

  // Also try to find items by searching raw text
  console.log(`\n${'='.repeat(80)}`);
  console.log(`BANK: ${bankKey}  (${byBank[bankKey].length} strong candidates)`);
  console.log('='.repeat(80));

  for (const item of byBank[bankKey]) {
    const key = `${item.caseId}|${item.itemId}`;
    let o = itemMap[key];

    if (!o) {
      // Try case-insensitive matching
      for (const rec of parsed.records) {
        if (!rec.object) continue;
        const cid = rec.object.CaseID;
        const iid = rec.object.ItemID || rec.object.QuestionID || rec.object.CaseQuestionID;
        if (cid === item.caseId && iid === item.itemId) {
          o = rec.object;
          break;
        }
        // Try partial match on itemId
        if (cid === item.caseId && iid && item.itemId &&
            iid.toLowerCase().includes(item.itemId.toLowerCase())) {
          o = rec.object;
          break;
        }
      }
    }

    console.log(`\n--- ${item.caseId} / ${item.itemId} | state=${item.itemState || '?'} ---`);
    console.log(`  ${item.detail}`);

    if (!o) {
      console.log(`  [NOT FOUND]`);
      // Print all records for this CaseID to see available ItemIDs
      const sameCase = parsed.records.filter(r => r.object && r.object.CaseID === item.caseId);
      if (sameCase.length > 0) {
        console.log(`  Available ItemIDs for ${item.caseId}:`);
        for (const rec of sameCase) {
          const iid = rec.object.ItemID || rec.object.QuestionID || rec.object.CaseQuestionID;
          const type = rec.object.Type;
          console.log(`    ${iid || '(no ID)'} [${type||'?'}]`);
        }
      }
      continue;
    }

    // Print item content using case item field names
    const prompt = o.Prompt || o.Question || o.questionText;
    const choices = o.Choices;
    const correct = o.Correct || o.CorrectChoice;
    const explanation = o.Explanation || o.ExplanationCorrect || o.EC;
    const caseType = o.Type || o.itemType;

    if (prompt) console.log(`  Prompt: ${prompt.toString().substring(0, 400)}`);
    if (choices) {
      if (Array.isArray(choices)) {
        for (let i = 0; i < choices.length; i++) {
          const l = String.fromCharCode(65 + i);
          console.log(`  Choice ${l}: ${choices[i].toString().substring(0, 150)}`);
        }
      } else if (typeof choices === 'object') {
        for (const l of ['A','B','C','D']) {
          if (choices[l] !== undefined) console.log(`  Choice ${l}: ${choices[l].toString().substring(0, 150)}`);
        }
      }
    }
    if (correct) {
      if (Array.isArray(correct)) {
        console.log(`  Correct (multiple): ${correct.join(', ')}`);
      } else {
        // For "select" type, Correct is the choice text
        let correctLetter = '?';
        if (Array.isArray(choices)) {
          correctLetter = choices.indexOf(correct) >= 0 ? String.fromCharCode(65 + choices.indexOf(correct)) : '?';
        } else if (typeof choices === 'object' && choices) {
          for (const l of ['A','B','C','D']) {
            if (choices[l] === correct) { correctLetter = l; break; }
          }
        }
        console.log(`  Correct: [${correctLetter}] ${correct.toString().substring(0, 150)}`);
      }
    }
    if (explanation) console.log(`  EC: ${explanation.toString().substring(0, 400)}`);
    for (const l of ['A','B','C','D']) {
      const ew = o[`ExplanationWrong${l}`] || o[`ExplanationWrong${l.toLowerCase()}`];
      if (ew !== undefined) console.log(`  EW${l}: ${ew.toString().substring(0, 150)}`);
    }
    if (o.CaseQuestionID) console.log(`  CaseQuestionID: ${o.CaseQuestionID}`);
  }
}
