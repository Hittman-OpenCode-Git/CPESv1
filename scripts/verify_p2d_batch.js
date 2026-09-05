/**
 * verify_p2d_batch.js — Validates a staged Pack D batch JSON against sprint constraints.
 * Read-only. Usage: node scripts/verify_p2d_batch.js <path-to-batch-json> <batch-number>
 * Exits 0 on all-checks-pass, 1 on any failure.
 */
const fs = require("fs");

const file = process.argv[2];
const batchNum = process.argv[3] || "?";
if (!file) { console.error("usage: node scripts/verify_p2d_batch.js <json> <batchNum>"); process.exit(2); }

const items = JSON.parse(fs.readFileSync(file, "utf8"));
const errors = [];
const warn = [];
const ok = [];

const DIFF = { "Easy": 1, "Moderate-Easy": 2, "Moderate": 3, "Difficult": 4, "Very Difficult": 5 };
const COG_DIFF_OK = {
  "Remember": [1, 2, 3], "Understand": [1, 2, 3],
  "Apply": [2, 3, 4], "Analyze": [3, 4], "Evaluate": [4, 5]
};
const FORBIDDEN = /\b(always|never|impossible|all of the above|none of the above)\b/i;

// 1. count + QID contiguity
const qids = items.map(i => i.QuestionID);
if (items.length !== 30) errors.push(`count=${items.length} expected 30`);
const nums = qids.map(q => parseInt(q.split("-")[2], 10));
for (let k = 1; k < nums.length; k++) {
  if (nums[k] !== nums[k-1] + 1) errors.push(`QID gap between ${qids[k-1]} and ${qids[k]}`);
}
if (new Set(qids).size !== qids.length) errors.push("duplicate QIDs");

// 2. mix counts
const diffCounts = {}, cogCounts = {}, ccCounts = {}, calcCounts = { true: 0, false: 0 }, losCounts = {};
let maxStreak = 0, curStreak = 0, prevCC = "";
for (const it of items) {
  diffCounts[it.Difficulty] = (diffCounts[it.Difficulty] || 0) + 1;
  cogCounts[it.CognitiveLevel] = (cogCounts[it.CognitiveLevel] || 0) + 1;
  ccCounts[it.CorrectChoice] = (ccCounts[it.CorrectChoice] || 0) + 1;
  calcCounts[String(it.CalculationItem)]++;
  losCounts[it.LOSTag] = (losCounts[it.LOSTag] || 0) + 1;
  curStreak = (it.CorrectChoice === prevCC) ? curStreak + 1 : 1;
  if (curStreak > maxStreak) maxStreak = curStreak;
  prevCC = it.CorrectChoice;
}
const expectDiff = { "Easy": 4, "Moderate-Easy": 6, "Moderate": 9, "Difficult": 8, "Very Difficult": 3 };
const expectCog = { "Remember": 3, "Understand": 6, "Apply": 12, "Analyze": 6, "Evaluate": 3 };
const expectCC = { "A": 7, "B": 8, "C": 8, "D": 7 };
for (const k of Object.keys(expectDiff)) if (diffCounts[k] !== expectDiff[k]) errors.push(`difficulty ${k}=${diffCounts[k]||0} expected ${expectDiff[k]}`);
for (const k of Object.keys(expectCog)) if (cogCounts[k] !== expectCog[k]) errors.push(`cognitive ${k}=${cogCounts[k]||0} expected ${expectCog[k]}`);
for (const k of Object.keys(expectCC)) if (ccCounts[k] !== expectCC[k]) errors.push(`CC position ${k}=${ccCounts[k]||0} expected ${expectCC[k]}`);
for (const k of ["D.1","D.2","D.3","D.4","D.5"]) if (losCounts[k] !== 6) errors.push(`LOSTag ${k}=${losCounts[k]||0} expected 6`);
if (calcCounts.true + calcCounts.false !== 30) errors.push(`calc/conceptual total ${calcCounts.true + calcCounts.false} != 30`);
// Board decision (2026-09-01): CalculationItem is truthful per content demand, not a quota.
// Calc distribution is reported but not gated against a fixed ratio.
if (maxStreak > 2) errors.push(`CC streak=${maxStreak} exceeds 2`);

// 3. per-item structural checks
items.forEach((it, idx) => {
  const id = it.QuestionID || `#${idx}`;
  const cc = it.CorrectChoice;
  if (it.Part !== 2) errors.push(`${id}: Part=${it.Part}`);
  if (it.Section !== "D") errors.push(`${id}: Section=${it.Section}`);
  if (it.Part2OnlyFlag !== true) errors.push(`${id}: Part2OnlyFlag=${it.Part2OnlyFlag}`);
  if (it.ItemStyle !== "single-select") errors.push(`${id}: ItemStyle=${it.ItemStyle}`);
  if (it.BlueprintDomain !== "Risk Management") errors.push(`${id}: BlueprintDomain=${it.BlueprintDomain}`);
  if (it.question_state !== "Unprocessed") errors.push(`${id}: question_state=${it.question_state}`);
  if (!/^P2-D-\d{3}$/.test(id)) errors.push(`${id}: bad QID format`);
  if (!/^D\.\d{3}\s/.test(it.Topic || "")) errors.push(`${id}: Topic format="${it.Topic}"`);
  if (it.UniqueConceptKey !== "D-" + (id.split("-")[2]) + "-" + it.Topic.replace(/^D\.\d{3}\s*/, "").toLowerCase().replace(/\s+/g, "-")) {
    warn.push(`${id}: UniqueConceptKey pattern check — key="${it.UniqueConceptKey}" topic="${it.Topic}"`);
  }
  if (!/^[A-D]$/.test(cc)) { errors.push(`${id}: CorrectChoice="${cc}"`); return; }
  if (DIFF[it.Difficulty] !== it.DifficultyScore) errors.push(`${id}: Difficulty ${it.Difficulty} vs score ${it.DifficultyScore}`);
  if (!COG_DIFF_OK[it.CognitiveLevel] || !COG_DIFF_OK[it.CognitiveLevel].includes(DIFF[it.Difficulty])) {
    errors.push(`${id}: cognitive ${it.CognitiveLevel} + difficulty ${it.Difficulty} incoherent`);
  }
  if (it.CalculationItem !== true && it.CalculationItem !== false) errors.push(`${id}: CalculationItem=${it.CalculationItem}`);
  if (!(it.Stem || "").trim() || (it.Stem || "").length < 30) errors.push(`${id}: Stem too short`);
  for (const L of ["A","B","C","D"]) {
    const c = (it.Choices || {})[L];
    if (!c || !c.trim()) errors.push(`${id}: Choice ${L} empty`);
    if (FORBIDDEN.test(c || "")) errors.push(`${id}: Choice ${L} contains forbidden term`);
  }
  if (!(it.ExplanationCorrect || "").trim() || (it.ExplanationCorrect || "").length < 50) errors.push(`${id}: ExplanationCorrect <50 chars`);
  if (it.CalculationItem === true && !/Recomputed:/.test(it.ExplanationCorrect || "")) errors.push(`${id}: calc item missing Recomputed: line`);
  for (const L of ["A","B","C","D"]) {
    const e = it["ExplanationWrong" + L] || "";
    if (L === cc) {
      if (e !== "") errors.push(`${id}: EW[${L}] (CC) not empty — DL-008`);
    } else {
      if (e.length < 50) errors.push(`${id}: EW[${L}] <50 chars (DL-026)`);
      if (FORBIDDEN.test(e)) errors.push(`${id}: EW[${L}] contains forbidden term`);
    }
  }
  if (FORBIDDEN.test(it.Stem || "")) errors.push(`${id}: Stem contains forbidden term`);
  if (!Array.isArray(it.Authorities) || it.Authorities.length === 0) errors.push(`${id}: Authorities empty`);
  if (!Array.isArray(it.VerifiedChecks) || it.VerifiedChecks.length === 0) errors.push(`${id}: VerifiedChecks empty`);
  if (!it.CommonTrapReference || !it.CommonTrapReference.trim()) warn.push(`${id}: CommonTrapReference empty`);
});

console.log(`=== P2D BATCH ${batchNum} VERIFY — ${file} ===`);
console.log(`items=${items.length}  qids=${qids[0]}..${qids[qids.length-1]}`);
console.log(`difficulty: ${JSON.stringify(diffCounts)}`);
console.log(`cognitive:  ${JSON.stringify(cogCounts)}`);
console.log(`ccPos:      ${JSON.stringify(ccCounts)} (maxStreak=${maxStreak})`);
console.log(`calc:       ${JSON.stringify(calcCounts)}`);
console.log(`los:        ${JSON.stringify(losCounts)}`);
console.log(`warnings:   ${warn.length}`);
warn.forEach(w => console.log("  WARN " + w));
if (errors.length) {
  console.log(`\nFAIL — ${errors.length} error(s):`);
  errors.forEach(e => console.log("  ERR " + e));
  process.exit(1);
}
console.log("\nPASS — all checks green.");
