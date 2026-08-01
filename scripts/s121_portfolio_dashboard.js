#!/usr/bin/env node
/**
 * S121 — Portfolio Distribution Dashboard
 *
 * Read-only scanner. Cross-checks all Part 1 + Part 2 pack files against
 * the immutable distribution targets defined in S121_PORTFOLIO_TARGETS.md.
 *
 * Output:
 *   scripts/output/S121_PORTFOLIO_DASHBOARD.json  — machine-readable
 *   scripts/output/S121_PORTFOLIO_DASHBOARD.md     — human-readable summary
 *
 * Zero writes to any pack file, case file, or governance-critical file.
 */

"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "scripts", "output");
const NOW = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");

// ── Immutable Targets (from S121_PORTFOLIO_TARGETS.md) ────────────

const DIFFICULTY_TARGETS = {
  "Easy":           0.15,
  "Moderate-Easy":  0.20,
  "Moderate":       0.30,
  "Difficult":      0.25,
  "Very Difficult": 0.10,
};

const DIFFICULTY_ORDER = ["Easy", "Moderate-Easy", "Moderate", "Difficult", "Very Difficult"];

const COGNITIVE_TARGETS_DEFAULT = {
  "Remember":   0.10,
  "Understand": 0.20,
  "Apply":      0.40,
  "Analyze":    0.20,
  "Evaluate":   0.10,
};

const COGNITIVE_TARGETS_BY_DOMAIN = {
  B: { Remember: 0.10, Understand: 0.20, Apply: 0.40, Analyze: 0.20, Evaluate: 0.10 },
  C: { Remember: 0.08, Understand: 0.17, Apply: 0.45, Analyze: 0.20, Evaluate: 0.10 },
};

const COGNITIVE_ORDER = ["Remember", "Understand", "Apply", "Analyze", "Evaluate"];

const ANSWER_POSITION_TARGET = { A: 0.25, B: 0.25, C: 0.25, D: 0.25 };
const ANSWER_TOLERANCE = 0.03; // 22–28%

// ── Pack Definitions ──────────────────────────────────────────────

const P1_PACKS = [
  { name: "Pack A",  file: "content/packs/pack_a_corrected.js",  variable: "MCQ_BANK_A" },
  { name: "Pack B",  file: "content/packs/pack_b_corrected.js",  variable: "MCQ_BANK_B" },
  { name: "Pack C",  file: "content/packs/pack_c_corrected.js",  variable: "MCQ_BANK_C" },
  { name: "Pack D",  file: "content/packs/pack_d_corrected.js",  variable: "MCQ_BANK_D" },
  { name: "Pack E",  file: "content/packs/pack_e_corrected.js",  variable: "MCQ_BANK_E" },
];

const P2_PACKS = [
  { name: "Pack P2-A", file: "p2/pack_p2_a.js", variable: "pack_p2_a_questions" },
  { name: "Pack P2-B", file: "p2/pack_p2_b.js", variable: "pack_p2_b_questions" },
];

// ── String-aware JSON object extraction ───────────────────────────

function extractObjects(text) {
  const objects = [];
  let pos = 0;
  while (pos < text.length) {
    const start = text.indexOf("{", pos);
    if (start === -1) break;
    let depth = 1;
    let i = start + 1;
    let inString = false, stringChar = "", escape = false;
    while (depth > 0 && i < text.length) {
      const ch = text[i];
      if (escape) { escape = false; i++; continue; }
      if (inString) {
        if (ch === "\\") { escape = true; }
        else if (ch === stringChar) { inString = false; stringChar = ""; }
        i++; continue;
      }
      if (ch === '"' || ch === "'") { inString = true; stringChar = ch; i++; continue; }
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
      i++;
    }
    if (depth !== 0) break;
    const objText = text.substring(start, i);
    let obj = null;
    try { obj = JSON.parse(objText); } catch (e) {
      try { obj = new Function("return (" + objText + ")")(); } catch (e2) {}
    }
    if (obj && typeof obj === "object" && !Array.isArray(obj) && (obj.QuestionID || obj.ItemID)) {
      objects.push(obj);
    }
    pos = i;
  }
  return objects;
}

// ── Pack Scanner ──────────────────────────────────────────────────

function scanPack(packDef, partLabel) {
  const filePath = path.join(ROOT, packDef.file);
  if (!fs.existsSync(filePath)) {
    return { name: packDef.name, part: partLabel, error: "FILE_NOT_FOUND", items: 0 };
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const objects = extractObjects(raw);

  const result = {
    name: packDef.name,
    part: partLabel,
    file: packDef.file,
    totalItems: objects.length,
    itemsScanned: 0,
    difficulty: {},
    cognitive: {},
    correctChoice: { A: 0, B: 0, C: 0, D: 0 },
    certified: 0,
    unprocessed: 0,
    bySection: {},
    diffs: [],
    warnings: [],
  };

  const MISSING = "(missing)";
  let missingDifficulty = 0;
  let missingCognitive = 0;

  for (const obj of objects) {
    result.itemsScanned++;

    const section = obj.Section || "?";
    if (!result.bySection[section]) {
      result.bySection[section] = {
        difficulty: {},
        cognitive: {},
        correctChoice: { A: 0, B: 0, C: 0, D: 0 },
      };
    }
    const sec = result.bySection[section];

    // Difficulty
    const diff = obj.Difficulty || MISSING;
    result.difficulty[diff] = (result.difficulty[diff] || 0) + 1;
    sec.difficulty[diff] = (sec.difficulty[diff] || 0) + 1;
    if (diff === MISSING) missingDifficulty++;

    // Cognitive
    const cog = obj.CognitiveLevel || MISSING;
    result.cognitive[cog] = (result.cognitive[cog] || 0) + 1;
    sec.cognitive[cog] = (sec.cognitive[cog] || 0) + 1;
    if (cog === MISSING) missingCognitive++;

    // CorrectChoice
    const cc = obj.CorrectChoice;
    if (cc && /^[A-D]$/.test(cc)) {
      result.correctChoice[cc]++;
      sec.correctChoice[cc]++;
    }

    // State
    const qs = obj.question_state;
    if (qs === "Certified") result.certified++;
    else if (qs === "Unprocessed") result.unprocessed++;
  }

  // ── Calculate gaps ──────────────────────────────────────────
  const n = result.itemsScanned;
  if (n === 0) return result;

  // Difficulty gaps
  for (const [label, target] of Object.entries(DIFFICULTY_TARGETS)) {
    const actual = (result.difficulty[label] || 0) / n;
    const delta = actual - target;
    if (Math.abs(delta) > 0.03) {
      result.diffs.push({
        dimension: "difficulty",
        label,
        actual: +(actual * 100).toFixed(1),
        target: +(target * 100).toFixed(1),
        delta: +(delta * 100).toFixed(1),
        flag: delta > 0 ? "OVER" : "UNDER",
      });
    }
  }

  // Cognitive gaps
  const cogTargets = COGNITIVE_TARGETS_BY_DOMAIN[getDominantSection(objects)] || COGNITIVE_TARGETS_DEFAULT;
  for (const [label, target] of Object.entries(cogTargets)) {
    const actual = (result.cognitive[label] || 0) / n;
    const delta = actual - target;
    if (Math.abs(delta) > 0.03) {
      result.diffs.push({
        dimension: "cognitive",
        label,
        actual: +(actual * 100).toFixed(1),
        target: +(target * 100).toFixed(1),
        delta: +(delta * 100).toFixed(1),
        flag: delta > 0 ? "OVER" : "UNDER",
      });
    }
  }

  // Answer position gaps
  for (const [letter, target] of Object.entries(ANSWER_POSITION_TARGET)) {
    const actual = (result.correctChoice[letter] || 0) / n;
    const delta = actual - target;
    if (Math.abs(delta) > ANSWER_TOLERANCE) {
      result.diffs.push({
        dimension: "answer_position",
        label: letter,
        actual: +(actual * 100).toFixed(1),
        target: +(target * 100).toFixed(1),
        delta: +(delta * 100).toFixed(1),
        flag: delta > 0 ? "OVER" : "UNDER",
      });
    }
  }

  // Warnings
  if (missingDifficulty > 0) {
    result.warnings.push(`Missing Difficulty field: ${missingDifficulty} items`);
  }
  if (missingCognitive > 0) {
    result.warnings.push(`Missing CognitiveLevel field: ${missingCognitive} items`);
  }
  if (result.difficulty[MISSING] > 0) {
    delete result.difficulty[MISSING];
  }
  if (result.cognitive[MISSING] > 0) {
    delete result.cognitive[MISSING];
  }

  return result;
}

function getDominantSection(objects) {
  const tally = {};
  for (const obj of objects) {
    const s = obj.Section || "?";
    tally[s] = (tally[s] || 0) + 1;
  }
  let best = "A";
  let bestN = 0;
  for (const [s, n] of Object.entries(tally)) {
    if (n > bestN) { best = s; bestN = n; }
  }
  return best;
}

// ── Cross-Pool Aggregation ────────────────────────────────────────

function aggregate(results, label) {
  const agg = {
    label,
    totalItems: 0,
    difficulty: {},
    cognitive: {},
    correctChoice: { A: 0, B: 0, C: 0, D: 0 },
    certified: 0,
    unprocessed: 0,
  };

  for (const r of results) {
    if (r.error) continue;
    agg.totalItems += r.totalItems;
    agg.certified += r.certified;
    agg.unprocessed += r.unprocessed;

    for (const [k, v] of Object.entries(r.difficulty)) {
      agg.difficulty[k] = (agg.difficulty[k] || 0) + v;
    }
    for (const [k, v] of Object.entries(r.cognitive)) {
      agg.cognitive[k] = (agg.cognitive[k] || 0) + v;
    }
    for (const [k, v] of Object.entries(r.correctChoice)) {
      agg.correctChoice[k] += v;
    }
  }
  return agg;
}

// ── Markdown Report ───────────────────────────────────────────────

function pct(n, total) {
  if (total === 0) return "0.0%";
  return (n / total * 100).toFixed(1) + "%";
}

function bar(n, total, width) {
  const filled = Math.round(n / total * width);
  return "█".repeat(filled) + "░".repeat(width - filled);
}

function renderMarkdown(results, p1Agg, p2Agg) {
  const lines = [];

  lines.push(`# S121 — Portfolio Distribution Dashboard`);
  lines.push("");
  lines.push(`**Generated:** ${NOW}`);
  lines.push(`**Authority:** S121_PORTFOLIO_TARGETS.md`);
  lines.push(`**Packs scanned:** ${P1_PACKS.length + P2_PACKS.length} (${P1_PACKS.length} P1, ${P2_PACKS.length} P2)`);
  lines.push("");

  // ── Pool totals ─────────────────────────────────────────────
  lines.push("## 0. Pool Totals");
  lines.push("");
  lines.push("| Pool | Packs | Total Items | Certified | Unprocessed |");
  lines.push("|------|-------|------------|-----------|-------------|");
  lines.push(`| **Part 1** | 5 | ${p1Agg.totalItems} | ${p1Agg.certified} (${pct(p1Agg.certified, p1Agg.totalItems)}) | ${p1Agg.unprocessed} (${pct(p1Agg.unprocessed, p1Agg.totalItems)}) |`);
  lines.push(`| **Part 2** | 2 | ${p2Agg.totalItems} | ${p2Agg.certified} (${pct(p2Agg.certified, p2Agg.totalItems)}) | ${p2Agg.unprocessed} (${pct(p2Agg.unprocessed, p2Agg.totalItems)}) |`);
  lines.push(`| **Combined** | 7 | ${p1Agg.totalItems + p2Agg.totalItems} | ${p1Agg.certified + p2Agg.certified} | ${p1Agg.unprocessed + p2Agg.unprocessed} |`);
  lines.push("");

  // ── Per-pack summaries ──────────────────────────────────────
  lines.push("## 1. Per-Pack Difficulty Distribution");
  lines.push("");
  const diffHeader = ["Pack", "Items", ...DIFFICULTY_ORDER, "Diffs"];
  lines.push("| " + diffHeader.join(" | ") + " |");
  lines.push("|" + diffHeader.map(() => "---").join("|") + "|");

  for (const r of results) {
    if (r.error) {
      lines.push(`| ${r.name} | ${r.error} | | | | | | |`);
      continue;
    }
    const cols = [r.name, r.totalItems.toString()];
    for (const d of DIFFICULTY_ORDER) {
      cols.push(pct(r.difficulty[d] || 0, r.itemsScanned));
    }
    cols.push(r.diffs.filter(d => d.dimension === "difficulty").length.toString());
    lines.push("| " + cols.join(" | ") + " |");
  }
  lines.push("");

  // ── Difficulty target reference ─────────────────────────────
  lines.push("### Target Difficulty Distribution");
  lines.push("");
  lines.push("| Level | Target % |");
  lines.push("|-------|---------|");
  for (const [label, target] of Object.entries(DIFFICULTY_TARGETS)) {
    lines.push(`| ${label} | ${(target * 100).toFixed(0)}% |`);
  }
  lines.push("");

  // ── Cognitive ───────────────────────────────────────────────
  lines.push("## 2. Per-Pack Cognitive Level Distribution");
  lines.push("");
  const cogHeader = ["Pack", "Items", ...COGNITIVE_ORDER, "Diffs"];
  lines.push("| " + cogHeader.join(" | ") + " |");
  lines.push("|" + cogHeader.map(() => "---").join("|") + "|");

  for (const r of results) {
    if (r.error) {
      lines.push(`| ${r.name} | ${r.error} | | | | | | |`);
      continue;
    }
    const cols = [r.name, r.totalItems.toString()];
    for (const c of COGNITIVE_ORDER) {
      cols.push(pct(r.cognitive[c] || 0, r.itemsScanned));
    }
    cols.push(r.diffs.filter(d => d.dimension === "cognitive").length.toString());
    lines.push("| " + cols.join(" | ") + " |");
  }
  lines.push("");

  lines.push("### Target Cognitive Distribution (Default)");
  lines.push("");
  lines.push("| Level | Target % |");
  lines.push("|-------|---------|");
  for (const [label, target] of Object.entries(COGNITIVE_TARGETS_DEFAULT)) {
    lines.push(`| ${label} | ${(target * 100).toFixed(0)}% |`);
  }
  lines.push("");

  // ── Answer position ─────────────────────────────────────────
  lines.push("## 3. Per-Pack CorrectChoice Distribution");
  lines.push("");
  const ccHeader = ["Pack", "Items", "A", "B", "C", "D", "Balance"];
  lines.push("| " + ccHeader.join(" | ") + " |");
  lines.push("|" + ccHeader.map(() => "---").join("|") + "|");

  for (const r of results) {
    if (r.error) {
      lines.push(`| ${r.name} | ${r.error} | | | | | |`);
      continue;
    }
    const cols = [r.name, r.totalItems.toString()];
    for (const l of ["A","B","C","D"]) {
      cols.push(pct(r.correctChoice[l] || 0, r.itemsScanned));
    }
    const max = Math.max(...["A","B","C","D"].map(l => r.correctChoice[l] || 0));
    const min = Math.min(...["A","B","C","D"].map(l => r.correctChoice[l] || 0));
    const spread = r.itemsScanned > 0 ? ((max - min) / r.itemsScanned * 100).toFixed(1) + "pp" : "N/A";
    cols.push(spread);
    lines.push("| " + cols.join(" | ") + " |");
  }
  lines.push("");
  lines.push(`**Tolerance:** 22–28% per position (±3pp from 25% target). Spread > 6pp flagged.`);
  lines.push("");

  // ── Per-section detail ──────────────────────────────────────
  lines.push("## 4. Per-Section Answer Position Audit");
  lines.push("");
  for (const r of results) {
    if (r.error || Object.keys(r.bySection).length === 0) continue;
    lines.push(`### ${r.name}`);
    lines.push("");
    const secHeader = ["Section", "Items", "A", "B", "C", "D", "Spread"];
    lines.push("| " + secHeader.join(" | ") + " |");
    lines.push("|" + secHeader.map(() => "---").join("|") + "|");

    for (const [sec, data] of Object.entries(r.bySection).sort()) {
      const secN = ["A","B","C","D"].reduce((s, l) => s + (data.correctChoice[l] || 0), 0);
      if (secN === 0) continue;
      const cols = [sec, secN.toString()];
      for (const l of ["A","B","C","D"]) {
        cols.push(pct(data.correctChoice[l] || 0, secN));
      }
      const max = Math.max(...["A","B","C","D"].map(l => data.correctChoice[l] || 0));
      const min = Math.min(...["A","B","C","D"].map(l => data.correctChoice[l] || 0));
      cols.push(((max - min) / secN * 100).toFixed(1) + "pp");
      lines.push("| " + cols.join(" | ") + " |");
    }
    lines.push("");
  }

  // ── Flagged divergences ─────────────────────────────────────
  lines.push("## 5. Divergence Flags (>3pp from target)");
  lines.push("");
  let anyDiv = false;
  for (const r of results) {
    if (r.error || r.diffs.length === 0) continue;
    if (!anyDiv) { anyDiv = true; }
    lines.push(`### ${r.name} (${r.part})`);
    lines.push("");
    for (const d of r.diffs) {
      lines.push(`- **${d.dimension}** \`${d.label}\`: ${d.actual}% actual vs ${d.target}% target (${d.flag} by ${Math.abs(d.delta)}pp)`);
    }
    lines.push("");
  }
  if (!anyDiv) {
    lines.push("**No divergences beyond ±3pp tolerance across all packs.**");
    lines.push("");
  }

  // ── Warnings ────────────────────────────────────────────────
  lines.push("## 6. Structural Warnings");
  lines.push("");
  let anyWarn = false;
  for (const r of results) {
    if (r.error || r.warnings.length === 0) continue;
    if (!anyWarn) { anyWarn = true; }
    lines.push(`### ${r.name} (${r.part})`);
    for (const w of r.warnings) {
      lines.push(`- ${w}`);
    }
    lines.push("");
  }
  if (!anyWarn) {
    lines.push("**No structural warnings across all packs.**");
    lines.push("");
  }

  lines.push("---");
  lines.push(`*Generated by S121 Portfolio Dashboard — ${NOW}*`);

  return lines.join("\n");
}

// ── Main ──────────────────────────────────────────────────────────

function main() {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  console.log("=== S121 Portfolio Dashboard ===\n");

  const allResults = [];

  // Part 1
  console.log("--- Part 1 ---");
  for (const pack of P1_PACKS) {
    const r = scanPack(pack, "Part 1");
    allResults.push(r);
    const di = r.error ? `ERROR: ${r.error}` : `${r.itemsScanned} items, ${r.certified} Certified`;
    console.log(`  ${r.name}: ${di}`);
    for (const w of r.warnings) console.log(`    WARN: ${w}`);
    for (const d of r.diffs) console.log(`    DIV: ${d.dimension}/${d.label}: ${d.actual}% vs ${d.target}% (${d.flag} ${d.delta}pp)`);
  }

  // Part 2
  console.log("\n--- Part 2 ---");
  for (const pack of P2_PACKS) {
    const r = scanPack(pack, "Part 2");
    allResults.push(r);
    const di = r.error ? `ERROR: ${r.error}` : `${r.itemsScanned} items, ${r.certified} Certified`;
    console.log(`  ${r.name}: ${di}`);
    for (const w of r.warnings) console.log(`    WARN: ${w}`);
    for (const d of r.diffs) console.log(`    DIV: ${d.dimension}/${d.label}: ${d.actual}% vs ${d.target}% (${d.flag} ${d.delta}pp)`);
  }

  const p1Results = allResults.filter(r => r.part === "Part 1");
  const p2Results = allResults.filter(r => r.part === "Part 2");
  const p1Agg = aggregate(p1Results, "Part 1");
  const p2Agg = aggregate(p2Results, "Part 2");

  console.log(`\n=== Pool Totals ===`);
  console.log(`  Part 1: ${p1Agg.totalItems} items, ${p1Agg.certified} Certified`);
  console.log(`  Part 2: ${p2Agg.totalItems} items, ${p2Agg.certified} Certified`);
  console.log(`  Combined: ${p1Agg.totalItems + p2Agg.totalItems} items`);

  // Write outputs
  const jsonPath = path.join(OUT, "S121_PORTFOLIO_DASHBOARD.json");
  const mdPath = path.join(OUT, "S121_PORTFOLIO_DASHBOARD.md");

  const jsonOutput = {
    generated: NOW,
    session: "S121",
    pools: {
      part1: p1Agg,
      part2: p2Agg,
    },
    packs: allResults,
  };

  fs.writeFileSync(jsonPath, JSON.stringify(jsonOutput, null, 2), "utf8");
  console.log(`\n  JSON: ${jsonPath}`);

  const md = renderMarkdown(allResults, p1Agg, p2Agg);
  fs.writeFileSync(mdPath, md, "utf8");
  console.log(`  MD:   ${mdPath}`);

  // Exit code: non-zero if any divergence found
  const totalDivs = allResults.reduce((s, r) => s + (r.diffs ? r.diffs.length : 0), 0);
  console.log(`\n  Total divergence flags: ${totalDivs}`);
  if (totalDivs > 0) {
    console.log("  (Divergences exceed ±3pp tolerance from S121 targets)");
  }
  process.exit(totalDivs > 0 ? 1 : 0);
}

main();
