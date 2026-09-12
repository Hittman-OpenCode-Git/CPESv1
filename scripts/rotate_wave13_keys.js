const fs = require('fs');
const path = require('path');
// Mechanical choice-position rotation: swap Choices.B<->Choices.T + EW_B<->EW_T, flip CC B->T.
// No content changed; only answer-letter positions move.
const plan = [
  { file: 'tier3_wave13a2.js', qid: 'P1-DC-108', t: 'D' },
  { file: 'tier3_wave13b2.js', qid: 'P1-DC-114', t: 'D' },
  { file: 'tier3_wave13b2.js', qid: 'P1-DC-119', t: 'D' },
  { file: 'tier3_wave13c.js', qid: 'P1-DC-122', t: 'D' },
  { file: 'tier3_wave13c.js', qid: 'P1-DC-128', t: 'D' },
  { file: 'tier3_wave13b2.js', qid: 'P1-DC-116', t: 'C' },
  { file: 'tier3_wave13c.js', qid: 'P1-DC-125', t: 'C' },
];
for (const { file, qid, t } of plan) {
  const fp = path.join(__dirname, file);
  const src = fs.readFileSync(fp, 'utf8');
  const qidMarker = `"QuestionID": "${qid}"`;
  const qi = src.indexOf(qidMarker);
  if (qi === -1) throw new Error(`QID not found: ${qid}`);
  // item block: from prior '"Part": 1,' ... use window: start at previous '  {\n' before qi
  const objStart = src.lastIndexOf('  {\n    "Part": 1,', qi);
  let nextQ = src.indexOf('"QuestionID": "P1-DC-', qi + qidMarker.length);
  if (nextQ === -1) nextQ = src.length;
  const objEndHint = src.lastIndexOf('  {', nextQ); // not needed; block = objStart..(next '  {')
  const nextObj = src.indexOf('  {\n    "Part": 1,', qi + qidMarker.length);
  const blockEnd = (nextObj !== -1 && nextObj < nextQ + 5000) ? nextObj : nextQ;
  let block = src.slice(objStart, nextObj !== -1 ? nextObj : src.length);
  // Pre-asserts
  if (!block.includes('"CorrectChoice": "B"')) throw new Error(`Pre-assert CC!=B: ${qid}`);
  const ewBRe = /("ExplanationWrongB": ")((?:[^"\\]|\\.)*)(")/;
  const ewTRe = new RegExp(`("ExplanationWrong${t}": ")((?:[^"\\\\]|\\\\.)*)(")`);
  const eB = block.match(ewBRe);
  const eT = block.match(ewTRe);
  if (!eB || !eT) throw new Error(`EW extract fail: ${qid}`);
  if (eB[2] !== '') throw new Error(`Pre-assert EW_B not empty: ${qid}: ${eB[2].slice(0, 60)}`);
  if (eT[2].length < 50) throw new Error(`Pre-assert EW_${t} thin: ${qid}`);
  const chBRe = /("B": ")((?:[^"\\]|\\.)*)(")/;
  const chTRe = new RegExp(`("${t}": ")((?:[^"\\\\]|\\\\.)*)(")`);
  // Restrict choice swap to Choices block only
  const chStart = block.indexOf('"Choices": {');
  const chEnd = block.indexOf('},', chStart);
  let chBlock = block.slice(chStart, chEnd);
  const cB = chBlock.match(chBRe);
  const cT = chBlock.match(chTRe);
  if (!cB || !cT) throw new Error(`Choice extract fail: ${qid}`);
  chBlock = chBlock.replace(chBRe, `"B": "__TMP__"`).replace(chTRe, `"${t}": "${cB[2]}"`).replace(`"B": "__TMP__"`, `"B": "${cT[2]}"`);
  block = block.slice(0, chStart) + chBlock + block.slice(chEnd);
  // EW swap with placeholder
  block = block.replace(ewBRe, `"ExplanationWrongB": "__TMP__"`);
  const ewTRe2 = new RegExp(`"ExplanationWrong${t}": "${eT[2].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`);
  if (!ewTRe2.test(block)) throw new Error(`EW_T literal re-find fail: ${qid}`);
  block = block.replace(ewTRe2, `"ExplanationWrong${t}": ""`).replace(`"ExplanationWrongB": "__TMP__"`, `"ExplanationWrongB": "${eT[2]}"`);
  // Flip CC
  block = block.replace('"CorrectChoice": "B"', `"CorrectChoice": "${t}"`);
  // Post-asserts
  const ewNewCC = new RegExp(`"ExplanationWrong${t}": ""`).test(block);
  const ewNewDist = new RegExp(`"ExplanationWrongB": "((?:[^"\\\\]|\\\\.){50,})"`).test(block);
  if (!ewNewCC || !ewNewDist) throw new Error(`Post-assert fail: ${qid}`);
  const out = src.slice(0, objStart) + block + src.slice(nextObj !== -1 ? nextObj : src.length);
  fs.writeFileSync(fp, out);
  console.log(`rotated ${qid}: B->${t}`);
}
console.log('done');