/**
 * Validate P2C Wave 1 batch against governance rules before integration
 */
const fs = require("fs");
const path = require("path");

const batchPath = path.join(__dirname, "p2c_wave1_complete.json");
const items = JSON.parse(fs.readFileSync(batchPath, "utf-8"));

const issues = [];
const stats = { dl008: 0, dl026: 0, dl021: 0, dl037: 0, rule11: 0, ewLen: 0, qidFormat: 0 };
const answerPositions = [];
const cognitiveDist = {};
const difficultyDist = {};

for (let i = 0; i < items.length; i++) {
  const item = items[i];
  const qid = item.QuestionID || `item[${i}]`;
  const cc = item.CorrectChoice;

  // Rule 11: Part2OnlyFlag
  if (item.Part2OnlyFlag !== true) {
    issues.push(`${qid}: RULE 11 VIOLATION — Part2OnlyFlag is ${JSON.stringify(item.Part2OnlyFlag)}, not true`);
    stats.rule11++;
  }

  // Rule 11: QID format
  if (!/^P2-[A-F]-\d{3}$/.test(qid)) {
    issues.push(`${qid}: RULE 11 VIOLATION — QID format mismatch`);
    stats.qidFormat++;
  }

  // Rule 2 (DL-008): ExplanationWrong[CorrectChoice] must be ""
  for (const choice of ["A", "B", "C", "D"]) {
    const field = `ExplanationWrong${choice}`;
    const val = item[field];
    if (val === undefined) {
      issues.push(`${qid}: RULE 10 (DL-021) VIOLATION — ${field} is absent`);
      stats.dl021++;
    } else if (choice === cc) {
      if (val !== "") {
        issues.push(`${qid}: RULE 2 (DL-008) VIOLATION — ExplanationWrong${cc} is non-empty (${val.length} chars)`);
        stats.dl008++;
      }
    } else {
      // Rule 6 (DL-026): non-CC EW slots must be >= 75 chars
      if (val === "" || val.length < 75) {
        issues.push(`${qid}: RULE 6 (DL-026) VIOLATION — ExplanationWrong${choice} is ${val.length} chars (need >= 75)`);
        stats.dl026++;
      }
    }
  }

  // Rule 9 (DL-037): Choice binary lead-in polarity mismatch
  // Check "No, ... should..." patterns
  for (const choice of ["A", "B", "C", "D"]) {
    const val = item.Choices[choice] || "";
    if (/^No,?\s/i.test(val) && /\bshould\b/i.test(val)) {
      issues.push(`${qid}: RULE 9 (DL-037) POTENTIAL — Choice ${choice} has "No...should" pattern: "${val.substring(0, 80)}..."`);
      stats.dl037++;
    }
  }

  // Answer position tracking
  answerPositions.push(cc);

  // Cognitive distribution
  const cl = item.CognitiveLevel || "Unknown";
  cognitiveDist[cl] = (cognitiveDist[cl] || 0) + 1;

  // Difficulty distribution
  const diff = item.Difficulty || "Unknown";
  difficultyDist[diff] = (difficultyDist[diff] || 0) + 1;

  // Check Part field
  if (item.Part !== 2) {
    issues.push(`${qid}: Part field is ${item.Part}, should be 2`);
  }

  // Check Section field
  if (item.Section !== "C") {
    issues.push(`${qid}: Section field is "${item.Section}", should be "C"`);
  }
}

// Answer position streak check
let maxStreak = 0, currentStreak = 1;
for (let i = 1; i < answerPositions.length; i++) {
  if (answerPositions[i] === answerPositions[i - 1]) {
    currentStreak++;
  } else {
    maxStreak = Math.max(maxStreak, currentStreak);
    currentStreak = 1;
  }
}
maxStreak = Math.max(maxStreak, currentStreak);

// Answer position counts
const posCounts = {};
answerPositions.forEach(p => posCounts[p] = (posCounts[p] || 0) + 1);

console.log("=== P2C WAVE 1 GOVERNANCE VALIDATION ===");
console.log(`Items: ${items.length}`);
console.log(`Issues found: ${issues.length}`);
console.log("");
console.log("--- Distribution ---");
console.log("Answer positions:", JSON.stringify(posCounts));
console.log("Max same-letter streak:", maxStreak, maxStreak >= 4 ? "(BLOCKED — 4+ streak)" : "(OK)");
console.log("Cognitive:", JSON.stringify(cognitiveDist));
console.log("Difficulty:", JSON.stringify(difficultyDist));
console.log("");

console.log("--- Governance Rules ---");
console.log(`Rule 2 (DL-008): ${stats.dl008} violations`);
console.log(`Rule 6 (DL-026): ${stats.dl026} violations`);
console.log(`Rule 10 (DL-021): ${stats.dl021} violations`);
console.log(`Rule 9 (DL-037): ${stats.dl037} potential`);
console.log(`Rule 11 (Part2OnlyFlag): ${stats.rule11} violations`);
console.log(`Rule 11 (QID format): ${stats.qidFormat} violations`);
console.log("");

if (issues.length > 0) {
  console.log("--- VIOLATIONS ---");
  issues.forEach(iss => console.log("  " + iss));
  process.exit(1);
} else {
  console.log("ALL GOVERNANCE CHECKS PASSED");
  process.exit(0);
}
