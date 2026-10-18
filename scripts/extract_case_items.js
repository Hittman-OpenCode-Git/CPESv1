/**
 * extract_case_items.js — Extract full text of INVERSION-flagged case items for hand-solving.
 * READ-ONLY: parses case pack files, outputs item content for manual review.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const { parsePack } = require('./lib/pack_parser');

const analysis = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/output/case_inversion_analysis.json'), 'utf8'));
const strong = analysis.strongItems;

console.log(`=== Extracting ${strong.length} strong INVERSION candidates ===\n`);

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

  // Build lookup by CaseID + itemId
  const itemMap = {};
  for (const rec of parsed.records) {
    if (!rec.object) continue;
    const caseId = rec.object.CaseID || rec.object.caseId;
    const itemId = rec.object.QuestionID || rec.object.questionId || rec.object.itemId || rec.object.CaseQuestionID;
    const key = `${caseId}|${itemId}`;
    itemMap[key] = rec.object;
  }

  console.log(`\n${'='.repeat(80)}`);
  console.log(`BANK: ${bankKey}  (${byBank[bankKey].length} strong candidates)`);
  console.log('='.repeat(80));

  for (const item of byBank[bankKey]) {
    // Try to find the item
    const candidates = [
      `${item.caseId}|${item.itemId}`,
      `${item.caseId}|${item.itemId}`,
    ];
    let o = itemMap[candidates[0]];

    // If not found, try fuzzy matching by caseId
    if (!o) {
      for (const rec of parsed.records) {
        if (!rec.object) continue;
        const cid = rec.object.CaseID || rec.object.caseId;
        if (cid === item.caseId) {
          const qid = rec.object.QuestionID || rec.object.questionId || rec.object.itemId || rec.object.CaseQuestionID;
          if (qid === item.itemId || qid && qid.includes(item.itemId)) {
            o = rec.object;
            break;
          }
        }
      }
    }

    console.log(`\n--- ${item.caseId} / ${item.itemId} | state=${item.itemState} | case=${item.caseState} ---`);
    console.log(`  Inversion: ${item.detail}`);
    if (!o) {
      console.log(`  [NOT FOUND in pack — trying alternate lookup]`);
      // Try by caseId prefix
      for (const rec of parsed.records) {
        if (!rec.object) continue;
        const cid = rec.object.CaseID || rec.object.caseId;
        if (cid === item.caseId) {
          const qid = rec.object.QuestionID || rec.object.questionId || rec.object.itemId || rec.object.CaseQuestionID;
          console.log(`  Found alt: ${cid} / ${qid} (looking for ${item.itemId})`);
        }
      }
      continue;
    }

    // Print item content
    if (o.Scenario || o.scenario) console.log(`  Scenario: ${(o.Scenario||o.scenario||'').substring(0, 200)}`);
    if (o.Question || o.questionText) console.log(`  Question: ${(o.Question||o.questionText||'').substring(0, 300)}`);
    if (o.Stem) console.log(`  Stem: ${o.Stem.substring(0, 300)}`);
    if (o.Choices) {
      const ch = typeof o.Choices === 'string' ? JSON.parse(o.Choices) : o.Choices;
      for (const l of ['A','B','C','D']) {
        if (ch[l] !== undefined) console.log(`  Choice ${l}: ${ch[l].toString().substring(0, 120)}`);
      }
    }
    if (o.exhibit || o.Exhibit) console.log(`  Exhibit: ${(o.exhibit||o.Exhibit||'').toString().substring(0, 200)}`);
    if (o.Correct || o.CorrectChoice) console.log(`  Correct: ${o.Correct || o.CorrectChoice}`);
    const ec = o.ExplanationCorrect || o.Explanation || o.EC;
    if (ec) console.log(`  EC: ${ec.toString().substring(0, 300)}`);
    if (o.ExplanationWrongA !== undefined) console.log(`  EWA: ${(o.ExplanationWrongA||'').toString().substring(0, 120)}`);
    if (o.ExplanationWrongB !== undefined) console.log(`  EWB: ${(o.ExplanationWrongB||'').toString().substring(0, 120)}`);
    if (o.ExplanationWrongC !== undefined) console.log(`  EWC: ${(o.ExplanationWrongC||'').toString().substring(0, 120)}`);
    if (o.ExplanationWrongD !== undefined) console.log(`  EWD: ${(o.ExplanationWrongD||'').toString().substring(0, 120)}`);
  }
}
