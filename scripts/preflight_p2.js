/**
 * preflight_p2.js — T0 Session Startup Governance Check for Part 2
 *
 * READ-ONLY. No writes to pack files, registries, or answer keys.
 * Per AGENTS.md §9: verifies QID counts, parse integrity, Certified counts,
 * and P2-specific governance (Part2OnlyFlag, schema conformance).
 *
 * Runs alongside Part 1 preflight.js — both parts independently validated.
 *
 * Usage:  node scripts/preflight_p2.js
 *         npm run preflight:p2
 * Exit:   0 if all checks pass, 1 if any divergence found.
 */

const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const P2_DIR = path.join(ROOT, "p2");

const PACKS = [
  { file: "pack_p2_a.js", label: "P2 Pack A", section: "a", targetQIDs: 500 },
  { file: "pack_p2_b.js", label: "P2 Pack B", section: "b", targetQIDs: 500 },
  { file: "pack_p2_c.js", label: "P2 Pack C", section: "c", targetQIDs: 750 },
  { file: "pack_p2_d.js", label: "P2 Pack D", section: "d", targetQIDs: 500 },
  { file: "pack_p2_e.js", label: "P2 Pack E", section: "e", targetQIDs: 500 },
  { file: "pack_p2_f.js", label: "P2 Pack F", section: "f", targetQIDs: 500 },
];

let divergences = 0;
const results = [];

function warn(msg) { results.push("  WARN: " + msg); divergences++; }
function ok(msg)   { results.push("  OK:   " + msg); }
function info(msg) { results.push("  INFO: " + msg); }

// ── 1. QID Count + Parse Check ──────────────────────────────────

let totalQIDs = 0;

for (const pack of PACKS) {
  const fp = path.join(P2_DIR, pack.file);
  if (!fs.existsSync(fp)) {
    info(pack.label + " — file not created (target: " + pack.targetQIDs + " items)");
    continue;
  }

  const content = fs.readFileSync(fp, "utf8");
  const qidMatches = content.match(/"QuestionID"\s*:/gi);
  const qidCount = qidMatches ? qidMatches.length : 0;
  totalQIDs += qidCount;

  ok(pack.label + " — QID count " + qidCount + " (target: " + pack.targetQIDs + ")");

  // Parse check via Function constructor
  const varName = "pack_p2_" + pack.section + "_questions";
  try {
    let itemCount = 0;
    if (qidCount > 0) {
      itemCount = new Function(content + "\nreturn " + varName + ".length;")();
      if (itemCount !== qidCount) {
        warn(pack.label + " — parse found " + itemCount + " items but grep found " + qidCount + " QIDs");
      }
      ok(pack.label + " — parse OK (" + itemCount + " items)");
    } else {
      // Empty pack — parse the array declaration only
      new Function(content + "\nreturn Array.isArray(" + varName + ");")();
      ok(pack.label + " — parse OK (empty)");
    }
  } catch (e) {
    warn(pack.label + " — parse FAILED: " + e.message.substring(0, 100));
  }

  // Schema: Part2OnlyFlag check
  if (qidCount > 0) {
    const p2FlagCount = (content.match(/"Part2OnlyFlag"\s*:\s*true/g) || []).length;
    if (p2FlagCount !== qidCount) {
      warn(pack.label + " — Part2OnlyFlag: " + p2FlagCount + "/" + qidCount + " true");
    } else {
      ok(pack.label + " — Part2OnlyFlag: " + p2FlagCount + "/" + qidCount + " true");
    }

    // Schema: ItemStyle (not legacy Type)
    const typeField = (content.match(/"Type"\s*:/g) || []).length;
    if (typeField > 0) {
      warn(pack.label + " — " + typeField + " legacy 'Type' fields (should be 'ItemStyle')");
    }

    // Schema: VerifiedChecks (not legacy VerificationChecks)
    const oldVC = (content.match(/"VerificationChecks"\s*:/g) || []).length;
    if (oldVC > 0) {
      warn(pack.label + " — " + oldVC + " legacy 'VerificationChecks' (should be 'VerifiedChecks')");
    }

    // Schema: UniqueConceptKey
    const uniqueKeys = (content.match(/"UniqueConceptKey"\s*:/g) || []).length;
    if (uniqueKeys !== qidCount) {
      warn(pack.label + " — " + uniqueKeys + " UniqueConceptKey fields (expected " + qidCount + ")");
    }

    // Cross-part: no P1- QIDs in P2 packs
    const p1Qids = content.match(/"QuestionID"\s*:\s*"P1[A-E]?-[A-F]-\d{3}"/g);
    if (p1Qids && p1Qids.length > 0) {
      warn(pack.label + " — " + p1Qids.length + " P1- QID(s) in P2 pack");
    }
  }
}

  info("Total P2 QIDs: " + totalQIDs + " (target: 3,250)");

// ── 2. Certified Counts ──────────────────────────────────────────

let totalCertified = 0;
for (const pack of PACKS) {
  const fp = path.join(P2_DIR, pack.file);
  if (!fs.existsSync(fp)) continue;
  const content = fs.readFileSync(fp, "utf8");
  const certMatches = content.match(/"question_state"\s*:\s*"Certified"/gi);
  const certCount = certMatches ? certMatches.length : 0;
  totalCertified += certCount;
  if (certCount > 0) {
    results.push("  CERT " + pack.label + ": " + certCount);
  }
}

if (totalCertified > 0) {
  info("Total P2 Certified: " + totalCertified + " (target: ≥2,375)");
} else {
  info("Total P2 Certified: 0 (no items certified yet)");
}

// ── 3. QID Uniqueness Cross-Pack ─────────────────────────────────

const allQids = new Set();
let dupCount = 0;
for (const pack of PACKS) {
  const fp = path.join(P2_DIR, pack.file);
  if (!fs.existsSync(fp)) continue;
  const content = fs.readFileSync(fp, "utf8");
  const qids = Array.from(content.matchAll(/"QuestionID"\s*:\s*"([^"]+)"/g), m => m[1]);
  for (const qid of qids) {
    if (allQids.has(qid)) {
      dupCount++;
      if (dupCount <= 5) warn("DUPLICATE QID: " + qid + " (in " + pack.file + ")");
    }
    allQids.add(qid);
  }
}
if (dupCount === 0) {
  ok("QID uniqueness — " + allQids.size + " unique, 0 duplicates");
} else {
  warn("QID uniqueness — " + dupCount + " duplicate(s)");
}

// ── 4. Governance Guard Test Suite ───────────────────────────────

try {
  const ggr = cp.execSync("node scripts/test_governance_guard.js", {
    cwd: ROOT, encoding: "utf8", timeout: 30000, maxBuffer: 10 * 1024 * 1024
  });
  const passMatch = ggr.match(/=== RESULTS: (\d+) PASS, (\d+) FAIL ===/);
  if (passMatch && parseInt(passMatch[2], 10) === 0) {
    ok("Governance guard tests — " + passMatch[1] + "/" + passMatch[1] + " PASS");
  } else {
    warn("Governance guard tests — FAIL (check output above)");
  }
} catch (e) {
  warn("Governance guard tests — FAILED: " + (e.message || "").substring(0, 60));
}

// ── 5. Report ─────────────────────────────────────────────────────

console.log("\n=== P2 PREFLIGHT — " + new Date().toISOString() + " ===");
console.log(results.join("\n"));
  console.log("\n  TOTAL P2 QIDs: " + totalQIDs + " / 3,250");
  console.log("  TOTAL P2 CERTIFIED: " + totalCertified + " / 2,375");
console.log("  PACKS ACTIVE: " + PACKS.filter(p => fs.existsSync(path.join(P2_DIR, p.file))).length + " / 6");
console.log("  DIVERGENCES: " + divergences);

if (divergences > 0) {
  console.log("\n*** HALT: " + divergences + " divergence(s). Reconcile from raw source files. ***\n");
  process.exit(1);
} else {
  console.log("\n*** P2 PREFLIGHT PASS — 0 divergences. Ready. ***\n");
  process.exit(0);
}
