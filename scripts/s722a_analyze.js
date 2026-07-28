const fs = require("fs");
const path = require("path");

const base = "C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026";
const raw = JSON.parse(fs.readFileSync(path.join(base, "reports", "s722a_distribution_raw.json"), "utf8"));

const poolTotal = 2500;
const caqsDifficulty = { "Easy": 15, "Moderate-Easy": 20, "Moderate": 30, "Difficult": 25, "Very Difficult": 10 };
const caqsCognitive = { "Remember": 5, "Understand": 15, "Apply": 40, "Analyze": 25, "Evaluate": 15 };

// Helper: map DifficultyScore -> label
const dsLabel = { 1: "Easy", 2: "Moderate-Easy", 3: "Moderate", 4: "Difficult", 5: "Very Difficult" };
const clOrder = ["Remember", "Understand", "Apply", "Analyze", "Evaluate"];
const dsOrder = [1, 2, 3, 4, 5];
const diffOrder = ["Easy", "Moderate-Easy", "Moderate", "Difficult", "Very Difficult"];

const results = {};

for (const [packFile, items] of Object.entries(raw)) {
    const packName = packFile.replace("_corrected.js", "").replace("pack_", "Pack ").toUpperCase();
    
    const diffDist = {};
    const clDist = {};
    const dcsMatrix = {}; // CL -> DS -> count
    const nullDiff = [];
    const nullCL = [];
    const nullDS = [];
    let certified = 0;
    let total = 0;
    
    for (const item of items) {
        total++;
        if (item.question_state === "Certified") certified++;
        
        const d = item.difficulty || "NULL";
        const cl = item.cognitiveLevel || "NULL";
        const ds = item.difficultyScore;
        
        diffDist[d] = (diffDist[d] || 0) + 1;
        clDist[cl] = (clDist[cl] || 0) + 1;
        
        if (cl !== "NULL" && ds !== null) {
            if (!dcsMatrix[cl]) dcsMatrix[cl] = {};
            dcsMatrix[cl][ds] = (dcsMatrix[cl][ds] || 0) + 1;
        }
        
        if (d === "NULL") nullDiff.push(item.qid);
        if (cl === "NULL") nullCL.push(item.qid);
        if (ds === null) nullDS.push(item.qid);
    }
    
    results[packName] = {
        total, certified,
        difficulty: diffDist,
        cognitiveLevel: clDist,
        dcsMatrix,
        nullDifficulty: nullDiff,
        nullCognitiveLevel: nullCL,
        nullDifficultyScore: nullDS
    };
}

// Compute pool-level
const poolDiff = {};
const poolCL = {};
const poolDCS = {};
let poolCertified = 0;
let poolNullDiff = [];
let poolNullCL = [];
let poolNullDS = [];

for (const [, items] of Object.entries(raw)) {
    for (const item of items) {
        const d = item.difficulty || "NULL";
        const cl = item.cognitiveLevel || "NULL";
        const ds = item.difficultyScore;
        
        if (item.question_state === "Certified") poolCertified++;
        
        poolDiff[d] = (poolDiff[d] || 0) + 1;
        poolCL[cl] = (poolCL[cl] || 0) + 1;
        
        if (cl !== "NULL" && ds !== null) {
            if (!poolDCS[cl]) poolDCS[cl] = {};
            poolDCS[cl][ds] = (poolDCS[cl][ds] || 0) + 1;
        }
    }
}

console.log("=".repeat(80));
console.log("REPORT: S722A Distribution Integrity Audit — Agent O");
console.log("Date: 2026-07-26 | Scope: 2,500 items across 5 packs");
console.log("=".repeat(80));

// === PART 1: POOL CERTIFICATION ===
console.log("\n=== PART 1: CERTIFICATION STATUS ===");
console.log(`Pool Certified: ${poolCertified}/2,500 (${(poolCertified/25).toFixed(1)}%)`);
for (const [pack, info] of Object.entries(results)) {
    console.log(`  ${pack}: ${info.certified}/500 (${(info.certified/5).toFixed(1)}%)`);
}

// === PART 2: DIFFICULTY DISTRIBUTION ===
console.log("\n=== PART 2: DIFFICULTY DISTRIBUTION ===");
console.log("CAQS §6.1 Targets: Easy 15%, Moderate-Easy 20%, Moderate 30%, Difficult 25%, Very Difficult 10%");
console.log("");
console.log("POOL-LEVEL:");
for (const d of diffOrder) {
    const count = poolDiff[d] || 0;
    const pct = (count / poolTotal * 100).toFixed(1);
    const target = caqsDifficulty[d] || 0;
    const delta = (parseFloat(pct) - target).toFixed(1);
    console.log(`  ${d.padEnd(18)}: ${String(count).padStart(5)} (${pct}%)  Target: ${target}%  Δ: ${delta > 0 ? '+' : ''}${delta}pp`);
}
if (poolDiff["NULL"]) console.log(`  NULL              : ${poolDiff["NULL"]}`);
console.log("");

console.log("PER-PACK:");
console.log(`  ${'Pack'.padEnd(8)} ${'Easy'.padEnd(6)} ${'ModE'.padEnd(6)} ${'Mod'.padEnd(6)} ${'Diff'.padEnd(6)} ${'VD'.padEnd(6)} ${'NULL'.padEnd(6)}`);
for (const [pack, info] of Object.entries(results)) {
    const r = [];
    for (const d of diffOrder) r.push((info.difficulty[d] || 0));
    r.push(info.difficulty["NULL"] || 0);
    console.log(`  ${pack.padEnd(8)} ${r.map(x => String(x).padEnd(6)).join('')}`);
}

// === PART 3: COGNITIVE LEVEL DISTRIBUTION ===
console.log("\n=== PART 3: COGNITIVE LEVEL DISTRIBUTION ===");
console.log("CAQS §6.2 Targets: Remember 5%, Understand 15%, Apply 40%, Analyze 25%, Evaluate 15%");
console.log("");
console.log("POOL-LEVEL:");
for (const cl of clOrder) {
    const count = poolCL[cl] || 0;
    const pct = (count / poolTotal * 100).toFixed(1);
    const target = caqsCognitive[cl] || 0;
    const delta = (parseFloat(pct) - target).toFixed(1);
    console.log(`  ${cl.padEnd(15)}: ${String(count).padStart(5)} (${pct}%)  Target: ${target}%  Δ: ${delta > 0 ? '+' : ''}${delta}pp`);
}
if (poolCL["NULL"]) console.log(`  NULL             : ${poolCL["NULL"]}`);
console.log("");

console.log("PER-PACK:");
console.log(`  ${'Pack'.padEnd(8)} ${'Rem'.padEnd(6)} ${'Und'.padEnd(6)} ${'App'.padEnd(6)} ${'Ana'.padEnd(6)} ${'Eva'.padEnd(6)} ${'NULL'.padEnd(6)}`);
for (const [pack, info] of Object.entries(results)) {
    const r = [];
    for (const cl of clOrder) r.push((info.cognitiveLevel[cl] || 0));
    r.push(info.cognitiveLevel["NULL"] || 0);
    console.log(`  ${pack.padEnd(8)} ${r.map(x => String(x).padEnd(6)).join('')}`);
}

// === PART 4: DCS §3 MATRIX ===
console.log("\n=== PART 4: DCS §3 — COGNITIVE LEVEL vs DIFFICULTY SCORE MATRIX (POOL-WIDE) ===");
console.log("DCS v1.1 §3 mapping: Remember→DS2 (default), Understand→DS2, Apply→DS3, Analyze→DS4, Evaluate→DS4");
console.log("Gap >1 between CL default and assigned DS = severe violation");
console.log("");
console.log(`  ${'CL'.padEnd(15)} ${'DS1'.padEnd(6)} ${'DS2'.padEnd(6)} ${'DS3'.padEnd(6)} ${'DS4'.padEnd(6)} ${'DS5'.padEnd(6)} ${'Total'.padEnd(6)} ${'Default'.padEnd(8)} ${'Compliant?'.padEnd(12)}`);
console.log(`  ${''.padEnd(15)} ${'──────'.padEnd(6)} ${'──────'.padEnd(6)} ${'──────'.padEnd(6)} ${'──────'.padEnd(6)} ${'──────'.padEnd(6)} ${'──────'.padEnd(6)} ${'────────'.padEnd(8)} ${'────────────'.padEnd(12)}`);

const dcsDefaults = { "Remember": 2, "Understand": 2, "Apply": 3, "Analyze": 4, "Evaluate": 4 };

for (const cl of clOrder) {
    const row = poolDCS[cl] || {};
    const counts = dsOrder.map(ds => row[ds] || 0);
    const total = counts.reduce((a, b) => a + b, 0);
    if (total === 0) continue;
    const def = dcsDefaults[cl];
    let compliant = 0;
    let severe = 0;
    for (const ds of dsOrder) {
        const count = row[ds] || 0;
        const gap = Math.abs(ds - def);
        if (gap <= 1) compliant += count;
        if (gap > 1) severe += count;
    }
    const severity = severe > 0 ? `WARN (${severe})` : "OK";
    console.log(`  ${cl.padEnd(15)} ${counts.map(x => String(x).padEnd(6)).join('')} ${String(total).padEnd(6)} ${String('DS'+def).padEnd(8)} ${severity.padEnd(12)}`);
}

// === PART 5: PER-PACK DCS MATRIX ===
console.log("\n=== PART 5: DCS §3 — PER-PACK VIOLATION SUMMARY ===");
console.log("Severe = gap >1 between CL default DS and assigned DS");
console.log("");

const defaultDS = { "Remember": 2, "Understand": 2, "Apply": 3, "Analyze": 4, "Evaluate": 4 };

for (const [pack, info] of Object.entries(results)) {
    const severeItems = [];
    for (const [cl, dsMap] of Object.entries(info.dcsMatrix)) {
        const def = defaultDS[cl];
        if (def === undefined) continue;
        for (const [ds, count] of Object.entries(dsMap)) {
            const gap = Math.abs(parseInt(ds) - def);
            if (gap > 1) {
                severeItems.push(`${cl}@DS${ds}: ${count}`);
            }
        }
    }
    const severeTotal = severeItems.reduce((sum, s) => sum + parseInt(s.split(": ")[1]), 0);
    console.log(`  ${pack}: ${info.total} items, ${severeTotal} severe DCS violations`);
    if (severeItems.length > 0) {
        for (const s of severeItems) console.log(`    - ${s}`);
    }
}

// === PART 6: CAQS COMPLIANCE ===
console.log("\n=== PART 6: CAQS §6 TARGET COMPLIANCE ===");
console.log("");

// Difficulty compliance
console.log("DIFFICULTY DISTRIBUTION vs CAQS §6.1:");
let diffDeviations = [];
for (const d of diffOrder) {
    const actual = ((poolDiff[d] || 0) / poolTotal * 100).toFixed(1);
    const target = caqsDifficulty[d];
    const dev = Math.abs(parseFloat(actual) - target).toFixed(1);
    if (parseFloat(dev) > 5) diffDeviations.push(`${d}: ${actual}% vs target ${target}% (Δ${dev}pp)`);
}
if (diffDeviations.length === 0) {
    console.log("  [PASS] All difficulty tiers within ±5pp of CAQS §6.1 targets.");
} else {
    console.log("  [DEVIATION] Tiers outside ±5pp tolerance:");
    for (const d of diffDeviations) console.log(`    - ${d}`);
}

// CL compliance
console.log("\nCOGNITIVE LEVEL DISTRIBUTION vs CAQS §6.2:");
let clDeviations = [];
for (const cl of clOrder) {
    const actual = ((poolCL[cl] || 0) / poolTotal * 100).toFixed(1);
    const target = caqsCognitive[cl];
    const dev = Math.abs(parseFloat(actual) - target).toFixed(1);
    if (parseFloat(dev) > 10) clDeviations.push(`${cl}: ${actual}% vs target ${target}% (Δ${dev}pp)`);
}
if (clDeviations.length === 0) {
    console.log("  [PASS] All CL tiers within ±10pp of CAQS §6.2 targets.");
} else {
    console.log("  [DEVIATION] Tiers outside ±10pp tolerance:");
    for (const d of clDeviations) console.log(`    - ${d}`);
}

// === PART 7: NULL FIELD AUDIT ===
console.log("\n=== PART 7: NULL FIELD AUDIT ===");
let nullDiffItems = [];
let nullCLItems = [];
let nullDSItems = [];
for (const [pack, info] of Object.entries(results)) {
    nullDiffItems = nullDiffItems.concat(info.nullDifficulty.map(q => ({ pack, qid: q })));
    nullCLItems = nullCLItems.concat(info.nullCognitiveLevel.map(q => ({ pack, qid: q })));
    nullDSItems = nullDSItems.concat(info.nullDifficultyScore.map(q => ({ pack, qid: q })));
}
console.log(`  NULL Difficulty: ${nullDiffItems.length} items`);
console.log(`  NULL CognitiveLevel: ${nullCLItems.length} items`);
console.log(`  NULL DifficultyScore: ${nullDSItems.length} items`);
if (nullDiffItems.length > 0 || nullCLItems.length > 0 || nullDSItems.length > 0) {
    console.log("  [WARN] Some items have NULL metadata fields.");
}

// === PART 8: S722A DELTA (theoretical) ===
console.log("\n=== PART 8: S722A PROJECTION — 198 SEVERE REMAINING ===");
console.log("Post-S722A Batch E0 would address 6 Und@DS4→DS2 items");
console.log("");
console.log("Current severe breakdown (from S722A residual inventory):");
console.log("  Apply@DS1:    171");
console.log("  Evaluate@DS1:  12");
console.log("  Understand@DS4: 6");
console.log("  Analyze@DS1:    5");
console.log("  Evaluate@DS2:   3");
console.log("  Analyze@DS2:    1");
console.log(`  Total:         198`);
console.log("");
console.log("Post-E0 (if 6 Und@DS4→DS2 executed):");
console.log("  Understand@DS4: 0 (was 6)");
console.log("  Understand@DS2: +6");
console.log("  Remaining severe: 192");
console.log("  DCS compliance: 92.3% (2,308/2,500)");

// === PART 9: S722 WAVE 2 REPLAY (22 Und@DS4→DS2) ===
console.log("\n=== PART 9: S722 WAVE 2 REPLAY — VERIFYING 22 Und@DS4→DS2 ===");
console.log("Checking current Understand@DS4 count across all packs...");
let totalUndDS4 = 0;
const undDS4byPack = {};
for (const [pack, info] of Object.entries(results)) {
    const count = (info.dcsMatrix["Understand"] && info.dcsMatrix["Understand"][4]) || 0;
    undDS4byPack[pack] = count;
    totalUndDS4 += count;
}
console.log(`  Current Understand@DS4: ${totalUndDS4} (expected 0 from S722A inventory, but S722 Wave 2 claimed 22 fixed)`);
for (const [pack, count] of Object.entries(undDS4byPack)) {
    console.log(`    ${pack}: ${count}`);
}
if (totalUndDS4 > 0) {
    console.log(`  [DISCREPANCY] S722 Wave 2 fixed 22 Und@DS4→DS2 but ${totalUndDS4} remain. Inventory has 6 in S722A. Check: maybe Wave 2 fixed a different subset.`);
}

// === PART 10: CERTIFIED POOL DCS SEVERE RISK ===
console.log("\n=== PART 10: CERTIFIED POOL DCS SEVERE RISK ===");
// For this we need to cross-reference the raw DCS scan
const severeInCertified = [];
for (const [packFile, items] of Object.entries(raw)) {
    for (const item of items) {
        if (item.question_state !== "Certified") continue;
        const cl = item.cognitiveLevel;
        const ds = item.difficultyScore;
        if (cl === null || ds === null || !defaultDS[cl]) continue;
        const gap = Math.abs(ds - defaultDS[cl]);
        if (gap > 1) {
            severeInCertified.push(`${item.qid}: ${cl}@DS${ds} (gap=${gap})`);
        }
    }
}
console.log(`  Certified items with severe DCS violation: ${severeInCertified.length}`);
if (severeInCertified.length <= 30) {
    for (const s of severeInCertified) console.log(`    ${s}`);
} else {
    console.log(`  (${severeInCertified.length} items — showing first 30)`);
    for (const s of severeInCertified.slice(0, 30)) console.log(`    ${s}`);
}

console.log("\n" + "=".repeat(80));
console.log("END OF REPORT — Agent O, S722A Distribution Integrity Audit");
console.log("=".repeat(80));
