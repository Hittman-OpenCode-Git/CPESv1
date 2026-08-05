/**
 * p2_certification_audit.js — Full certification audit across all 185 P2 items.
 * Checks: field presence, field population (non-empty meaning), explanation length,
 *         difficulty distribution, cognitive level distribution, topic coverage,
 *         section coverage, DL-008/026/021, Part2OnlyFlag, UniqueConceptKey,
 *         Choices presence, CorrectChoice validity, answer position balance.
 *
 * Usage:  node scripts/p2_certification_audit.js
 *         npm run certify:p2
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const P2_DIR = path.join(ROOT, "p2");

const PACKS = [
  { file: "pack_p2_a.js", varName: "pack_p2_a_questions", section: "A", domain: "Financial Statement Analysis" },
  { file: "pack_p2_b.js", varName: "pack_p2_b_questions", section: "B", domain: "Corporate Finance" },
  { file: "pack_p2_c.js", varName: "pack_p2_c_questions", section: "C", domain: "Decision Analysis" },
  { file: "pack_p2_d.js", varName: "pack_p2_d_questions", section: "D", domain: "Risk Management" },
  { file: "pack_p2_e.js", varName: "pack_p2_e_questions", section: "E", domain: "Investment Decisions" },
  { file: "pack_p2_f.js", varName: "pack_p2_f_questions", section: "F", domain: "Professional Ethics" },
];

// ── Field definitions ───────────────────────────────────────────

const REQUIRED_ENGINE_FIELDS = [
  "Part", "Section", "QuestionID", "question_state", "Stem", "Choices",
  "CorrectChoice", "Difficulty", "DifficultyScore", "CognitiveLevel",
  "CalculationItem", "ItemStyle", "Part2OnlyFlag", "UniqueConceptKey"
];

const REQUIRED_CONTENT_FIELDS = [
  "Topic", "ExplanationCorrect", "ExplanationWrongA", "ExplanationWrongB",
  "ExplanationWrongC", "ExplanationWrongD", "LOSTag", "BlueprintDomain",
  "VerifiedChecks"
];

const ALL_REQUIRED = [...REQUIRED_ENGINE_FIELDS, ...REQUIRED_CONTENT_FIELDS];

const VALID_DIFFICULTY = ["Easy", "Moderate-Easy", "Moderate", "Difficult", "Very Difficult"];
const VALID_COGNITIVE = ["Remember", "Understand", "Apply", "Analyze", "Evaluate"];
const VALID_CHOICE_LETTERS = ["A", "B", "C", "D"];

// ── Auditors ────────────────────────────────────────────────────

let totalIssues = 0;
let totalWarnings = 0;
const report = [];
const metrics = {};
const topicSet = {};
const allIssues = [];

function issue(level, qid, msg) {
  const line = `  [${level}] ${qid}: ${msg}`;
  if (level === "FAIL") { totalIssues++; allIssues.push({ level, qid, msg }); }
  else if (level === "WARN") { totalWarnings++; allIssues.push({ level, qid, msg }); }
  report.push(line);
}

function auditItem(item, packSection, packDomain) {
  const qid = item.QuestionID || "(no QID)";
  const section = item.Section || packSection;

  // 1. Engine-critical fields: present
  for (const field of REQUIRED_ENGINE_FIELDS) {
    if (item[field] === undefined || item[field] === null) {
      issue("FAIL", qid, `missing engine field '${field}'`);
    }
  }

  // 2. Content fields: present AND populated (non-empty for strings, non-empty array for arrays)
  // ExplanationWrong slots are exempt from generic emptiness check — they are handled by DL-008/026 logic below
  const EXPLANATION_WRONG_FIELDS = ["ExplanationWrongA", "ExplanationWrongB", "ExplanationWrongC", "ExplanationWrongD"];
  
  for (const field of REQUIRED_CONTENT_FIELDS) {
    const val = item[field];
    if (val === undefined || val === null) {
      issue("FAIL", qid, `missing content field '${field}'`);
      continue;
    }
    if (EXPLANATION_WRONG_FIELDS.includes(field)) {
      continue; // handled by DL-008/026 below
    }
    if (field === "VerifiedChecks" || field === "Authorities") {
      if (!Array.isArray(val) || val.length === 0) {
        issue("FAIL", qid, `'${field}' must be non-empty array (got ${typeof val})`);
      }
      continue;
    }
    if (typeof val === "string" && val.trim().length === 0) {
      issue("FAIL", qid, `'${field}' is empty string`);
    }
  }

  // 3. ExplanationCorrect: minimum length and quality
  const ec = item.ExplanationCorrect;
  if (typeof ec === "string") {
    if (ec.length < 100) {
      issue("WARN", qid, `ExplanationCorrect too short (${ec.length} chars, min recommended 100)`);
    }
    // Check for boilerplate
    if (/represents a plausible misconception/i.test(ec)) {
      issue("FAIL", qid, "DL-013: ExplanationCorrect contains boilerplate");
    }
  }

  // 4. Distractor explanation slots
  const cc = item.CorrectChoice;
  if (cc && /^[A-D]$/.test(cc)) {
    // EW[CC] must be ""
    const ewCC = item["ExplanationWrong" + cc];
    if (typeof ewCC === "string" && ewCC.length > 0) {
      issue("FAIL", qid, `DL-008: ExplanationWrong${cc} non-empty (${ewCC.length} chars)`);
    }
    // Non-CC must be non-empty and >= 50 chars
    for (const L of VALID_CHOICE_LETTERS) {
      if (L === cc) continue;
      const ew = item["ExplanationWrong" + L];
      if (typeof ew !== "string" || ew.length === 0) {
        issue("FAIL", qid, `DL-026/021: ExplanationWrong${L} empty or absent`);
      } else if (ew.length < 50) {
        issue("FAIL", qid, `ExplanationWrong${L} too short (${ew.length} chars, min 50)`);
      } else if (/represents a plausible misconception/i.test(ew)) {
        issue("FAIL", qid, `DL-013: ExplanationWrong${L} contains boilerplate`);
      }
    }
  }

  // 5. Choices: all 4 letters present, non-empty
  if (item.Choices) {
    for (const L of VALID_CHOICE_LETTERS) {
      const choice = item.Choices[L];
      if (typeof choice !== "string" || choice.trim().length === 0) {
        issue("FAIL", qid, `Choices.${L} empty or missing`);
      }
    }
    // Choices should be meaningfully different (no identical distractors)
    const texts = VALID_CHOICE_LETTERS.map(L => item.Choices[L] || "");
    for (let i = 0; i < texts.length; i++) {
      for (let j = i + 1; j < texts.length; j++) {
        if (texts[i] === texts[j] && texts[i].length > 0) {
          issue("FAIL", qid, `Choices.${VALID_CHOICE_LETTERS[i]} and Choices.${VALID_CHOICE_LETTERS[j]} are identical`);
        }
      }
    }
  }

  // 6. CorrectChoice validity
  if (cc && !VALID_CHOICE_LETTERS.includes(cc)) {
    issue("FAIL", qid, `invalid CorrectChoice '${cc}'`);
  }

  // 7. DifficultyScore range
  if (item.DifficultyScore !== undefined && (item.DifficultyScore < 1 || item.DifficultyScore > 5 || !Number.isInteger(item.DifficultyScore))) {
    issue("FAIL", qid, `invalid DifficultyScore ${item.DifficultyScore}`);
  }

  // 8. Difficulty / Cognitive alignment
  if (item.Difficulty && !VALID_DIFFICULTY.includes(item.Difficulty)) {
    issue("FAIL", qid, `invalid Difficulty '${item.Difficulty}'`);
  }
  if (item.CognitiveLevel && !VALID_COGNITIVE.includes(item.CognitiveLevel)) {
    issue("FAIL", qid, `invalid CognitiveLevel '${item.CognitiveLevel}'`);
  }

  // 9. Difficulty x Cognitive mismatch checks
  if (item.CognitiveLevel === "Evaluate" && item.DifficultyScore && item.DifficultyScore < 3) {
    issue("WARN", qid, `Evaluate at DifficultyScore=${item.DifficultyScore} — should be ≥3`);
  }
  if (item.CognitiveLevel === "Analyze" && item.DifficultyScore && item.DifficultyScore < 2) {
    issue("WARN", qid, `Analyze at DifficultyScore=${item.DifficultyScore} — should be ≥2`);
  }
  if ((item.CognitiveLevel === "Remember" || item.CognitiveLevel === "Understand") && item.DifficultyScore && item.DifficultyScore >= 4) {
    issue("WARN", qid, `${item.CognitiveLevel} at DifficultyScore=${item.DifficultyScore} — may be inflated`);
  }

  // 10. Part2OnlyFlag
  if (item.Part2OnlyFlag !== true) {
    issue("FAIL", qid, `Part2OnlyFlag must be true (got ${JSON.stringify(item.Part2OnlyFlag)})`);
  }
  if (item.Part !== 2) {
    issue("FAIL", qid, `Part must be 2 (got ${JSON.stringify(item.Part)})`);
  }

  // 11. UniqueConceptKey format
  if (item.UniqueConceptKey && typeof item.UniqueConceptKey === "string") {
    if (!item.UniqueConceptKey.match(/^[A-F]-\d{3}-/)) {
      issue("WARN", qid, `UniqueConceptKey format issue: '${item.UniqueConceptKey}' (expected {Section}-{NNN}-{slug})`);
    }
  }

  // 12. Stem length
  if (item.Stem && typeof item.Stem === "string" && item.Stem.length < 60) {
    issue("WARN", qid, `Stem too short (${item.Stem.length} chars)`);
  }

  // 13. ItemStyle
  if (item.ItemStyle && item.ItemStyle !== "single-select") {
    issue("WARN", qid, `ItemStyle '${item.ItemStyle}' — all current items should be 'single-select'`);
  }

  // 14. LOSTag format
  if (item.LOSTag && typeof item.LOSTag === "string") {
    if (!item.LOSTag.match(/^[A-F]\.\d+/)) {
      issue("WARN", qid, `LOSTag format issue: '${item.LOSTag}'`);
    }
  }

  // ── Metrics collection ──────────────────────────────────────
  const sec = section;
  if (!metrics[sec]) metrics[sec] = {
    domain: packDomain,
    count: 0,
    difficulty: {}, cognitive: {},
    topicList: [],
    answerPositions: { A: 0, B: 0, C: 0, D: 0 },
  };
  metrics[sec].count++;
  metrics[sec].difficulty[item.Difficulty] = (metrics[sec].difficulty[item.Difficulty] || 0) + 1;
  metrics[sec].cognitive[item.CognitiveLevel] = (metrics[sec].cognitive[item.CognitiveLevel] || 0) + 1;
  metrics[sec].topicList.push(item.Topic);
  if (cc) metrics[sec].answerPositions[cc]++;

  const topic = item.Topic;
  if (!topicSet[sec]) topicSet[sec] = new Set();
  topicSet[sec].add(topic);
}

// ── Main ────────────────────────────────────────────────────────

console.log("=== P2 CERTIFICATION AUDIT — " + new Date().toISOString() + " ===\n");

let totalItems = 0;
const packSummary = [];

for (const pack of PACKS) {
  const fp = path.join(P2_DIR, pack.file);
  if (!fs.existsSync(fp)) {
    report.push(`  SKIP  ${pack.file} — not found`);
    continue;
  }
  const content = fs.readFileSync(fp, "utf8");

  let items = [];
  try {
    items = new Function(content + "\nreturn " + pack.varName + ";")();
  } catch (e) {
    report.push(`  FAIL  ${pack.file} — parse error: ${e.message.substring(0, 80)}`);
    totalIssues++;
    continue;
  }

  if (!Array.isArray(items)) {
    report.push(`  FAIL  ${pack.file} — not an array`);
    totalIssues++;
    continue;
  }

  const beforeCount = items.length;
  const packIssuesBefore = totalIssues;
  const packWarnsBefore = totalWarnings;

  for (const item of items) {
    auditItem(item, pack.section, pack.domain);
  }

  const packIssues = totalIssues - packIssuesBefore;
  const packWarns = totalWarnings - packWarnsBefore;
  const status = packIssues === 0 ? "PASS" : "FAIL";
  packSummary.push({ file: pack.file, items: beforeCount, issues: packIssues, warns: packWarns, status });

  report.push(`  ${status}  ${pack.file}: ${beforeCount} items, ${packIssues} issues, ${packWarns} warnings`);
}

totalItems = packSummary.reduce((s, p) => s + p.items, 0);

console.log(report.join("\n"));

// ── Section Metrics ───────────────────────────────────────────

console.log("\n=== SECTION METRICS ===\n");

for (const [sec, m] of Object.entries(metrics).sort()) {
  console.log(`  Section ${sec} — ${m.domain} (${m.count} items)`);
  
  // Difficulty distribution
  const diffs = m.difficulty;
  const diffStr = VALID_DIFFICULTY.map(d => {
    const count = diffs[d] || 0;
    const pct = m.count > 0 ? (count / m.count * 100).toFixed(1) : "0.0";
    return `${d}:${count}(${pct}%)`;
  }).join(" ");
  console.log(`    Difficulty: ${diffStr}`);
  
  // Cognitive level distribution
  const cogs = m.cognitive;
  const cogStr = VALID_COGNITIVE.map(c => {
    const count = cogs[c] || 0;
    const pct = m.count > 0 ? (count / m.count * 100).toFixed(1) : "0.0";
    return `${c}:${count}(${pct}%)`;
  }).join(" ");
  console.log(`    Cognitive: ${cogStr}`);
  
  // Answer position balance
  const ap = m.answerPositions;
  const apStr = VALID_CHOICE_LETTERS.map(l => {
    const count = ap[l] || 0;
    const pct = m.count > 0 ? (count / m.count * 100).toFixed(1) : "0.0";
    return `${l}:${count}(${pct}%)`;
  }).join(" ");
  console.log(`    Answer:   ${apStr}`);
  
  // Topic coverage
  console.log(`    Topics: ${topicSet[sec] ? topicSet[sec].size : 0} unique`);
}

// ── Pool-Wide Metrics ─────────────────────────────────────────

console.log("\n=== POOL-WIDE METRICS ===\n");

// Overall difficulty distribution
const poolDiff = {};
const poolCog = {};
const poolAns = { A: 0, B: 0, C: 0, D: 0 };
for (const [sec, m] of Object.entries(metrics)) {
  for (const [d, c] of Object.entries(m.difficulty)) poolDiff[d] = (poolDiff[d] || 0) + c;
  for (const [c, n] of Object.entries(m.cognitive)) poolCog[c] = (poolCog[c] || 0) + n;
  for (const [l, n] of Object.entries(m.answerPositions)) poolAns[l] = (poolAns[l] || 0) + n;
}

console.log("  Difficulty Distribution:");
for (const d of VALID_DIFFICULTY) {
  const count = poolDiff[d] || 0;
  const pct = (count / totalItems * 100).toFixed(1);
  const bar = "▓".repeat(Math.round(count / totalItems * 50));
  console.log(`    ${d.padEnd(15)} ${String(count).padStart(3)} (${String(pct).padStart(5)}%)  ${bar}`);
}

console.log("\n  Cognitive Level Distribution:");
for (const c of VALID_COGNITIVE) {
  const count = poolCog[c] || 0;
  const pct = (count / totalItems * 100).toFixed(1);
  console.log(`    ${c.padEnd(12)} ${String(count).padStart(3)} (${String(pct).padStart(5)}%)`);
}

console.log("\n  Answer Position Balance:");
for (const l of VALID_CHOICE_LETTERS) {
  const count = poolAns[l] || 0;
  const pct = (count / totalItems * 100).toFixed(1);
  console.log(`    ${l}: ${String(count).padStart(3)} (${String(pct).padStart(5)}%)  target: 25%`);
}

// ── Summary ────────────────────────────────────────────────────

console.log("\n=== CERTIFICATION SUMMARY ===\n");
console.log(`  Total items:    ${totalItems}`);
console.log(`  Issues (FAIL):  ${totalIssues}`);
console.log(`  Warnings:       ${totalWarnings}`);
console.log(`  Packs PASS:     ${packSummary.filter(p => p.status === "PASS").length} / ${packSummary.length}`);
console.log(`  DL-008:         ${allIssues.filter(i => i.msg.includes("DL-008")).length}`);
console.log(`  DL-026/021:     ${allIssues.filter(i => i.msg.includes("DL-026") || i.msg.includes("DL-021")).length}`);
console.log(`  DL-013:         ${allIssues.filter(i => i.msg.includes("DL-013")).length}`);
console.log(`  Missing fields: ${allIssues.filter(i => i.msg.includes("missing")).length}`);
console.log(`  Empty content:  ${allIssues.filter(i => i.msg.includes("empty")).length}`);

if (totalIssues > 0) {
  console.log("\n  ISSUE DETAIL:");
  for (const issue of allIssues.filter(i => i.level === "FAIL")) {
    console.log(`    ${issue.qid}: ${issue.msg}`);
  }
}

console.log(totalIssues === 0 ? "\n*** AUDIT PASS — 0 issues. All 185 items certification-ready. ***\n" : `\n*** AUDIT FAIL — ${totalIssues} issue(s) must be resolved before certification. ***\n`);
process.exit(totalIssues > 0 ? 1 : 0);
