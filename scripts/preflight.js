/**
 * preflight.js — T0 Session Startup Governance Check
 *
 * READ-ONLY. No writes to pack files, case files, registries, or answer keys.
 * Per AGENTS.md §9: verifies QID counts, Certified counts, and parse integrity
 * across all pack files. Cross-checks against knowledge/CURRENT_BASELINES.md §2.
 *
 * Usage:  node scripts/preflight.js
 *         npm run preflight
 * Exit:   0 if all checks pass, 1 if any divergence found.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const PACKS = [
  { file: "pack_a_corrected.js", label: "Pack A", expectedQIDs: 500 },
  { file: "pack_b_corrected.js", label: "Pack B", expectedQIDs: 500 },
  { file: "pack_c_corrected.js", label: "Pack C", expectedQIDs: 500 },
  { file: "pack_d_corrected.js", label: "Pack D", expectedQIDs: 500 },
  { file: "pack_e_corrected.js", label: "Pack E", expectedQIDs: 545 },
];

const BASELINES_PATH = path.join(ROOT, "knowledge", "CURRENT_BASELINES.md");

let divergences = 0;
const results = [];

function warn(msg) { results.push("  WARN: " + msg); divergences++; }
function ok(msg)   { results.push("  OK:   " + msg); }

// ── 1. QID Counts (direct grep) + Parse Check ───────────────────

for (const pack of PACKS) {
  const fp = path.join(ROOT, pack.file);
  if (!fs.existsSync(fp)) { warn(pack.label + " — FILE MISSING"); continue; }

  const content = fs.readFileSync(fp, "utf8");
  const qidMatches = content.match(/"QuestionID"\s*:/gi);
  const qidCount = qidMatches ? qidMatches.length : 0;

  if (qidCount !== pack.expectedQIDs) {
    warn(pack.label + " — QID count " + qidCount + " (expected " + pack.expectedQIDs + ")");
  } else {
    ok(pack.label + " — QID count " + qidCount);
  }

  // Parse check via Function constructor
  const varName = "MCQ_BANK_" + pack.label.slice(-1);
  try {
    new Function(content + "\nreturn " + varName + ".length;")();
    ok(pack.label + " — parse OK");
  } catch (e) {
    warn(pack.label + " — parse FAILED: " + e.message.substring(0, 80));
  }
}

// ── 2. Certified Counts (direct grep) ────────────────────────────

let totalCertified = 0;
for (const pack of PACKS) {
  const fp = path.join(ROOT, pack.file);
  if (!fs.existsSync(fp)) continue;
  const content = fs.readFileSync(fp, "utf8");
  const certMatches = content.match(/"question_state"\s*:\s*"Certified"/gi);
  const certCount = certMatches ? certMatches.length : 0;
  totalCertified += certCount;
  results.push("  CERT " + pack.label + ": " + certCount);
}

// ── 3. Cross-check against CURRENT_BASELINES.md §2 ───────────────

if (fs.existsSync(BASELINES_PATH)) {
  const bl = fs.readFileSync(BASELINES_PATH, "utf8");
  const totalMatch = bl.match(/\*\*Total\*\*\s*\|\s*\*?\*?([\d,]+)\*?\*?\s*\|\s*\*?\*?([\d,]+)\*?\*?\s*\|/);
  if (totalMatch) {
    const blTotal = parseInt(totalMatch[2].replace(/,/g, ""), 10);
    if (blTotal !== totalCertified) {
      warn("Certified divergence: baseline " + blTotal + " vs raw grep " + totalCertified +
        " (delta: " + (totalCertified - blTotal) + ")");
    } else {
      ok("Certified total matches baseline: " + totalCertified);
    }
  } else {
    warn("Could not parse baseline Certified total from CURRENT_BASELINES.md");
  }
} else {
  warn("CURRENT_BASELINES.md not found — cannot cross-check");
}

// ── 4. Governance Guard Test Suite ────────────────────────────────

try {
  const cp = require("child_process");
  const ggr = cp.execSync("node scripts/test_governance_guard.js", {
    cwd: ROOT, encoding: "utf8", timeout: 30000, maxBuffer: 10 * 1024 * 1024
  });
  const passMatch = ggr.match(/=== RESULTS: (\d+) PASS, (\d+) FAIL ===/);
  if (passMatch && parseInt(passMatch[2], 10) === 0) {
    ok("Governance guard tests — " + passMatch[1] + "/" + passMatch[1] + " PASS");
  } else {
    warn("Governance guard tests — FAIL (see output above)");
  }
} catch (e) {
  warn("Governance guard tests — FAILED to execute: " + (e.message || "").substring(0, 60));
}

// ── 5. Report ─────────────────────────────────────────────────────

console.log("\n=== PREFLIGHT — " + new Date().toISOString() + " ===");
console.log(results.join("\n"));
console.log("\n  TOTAL CERTIFIED: " + totalCertified);
console.log("  DIVERGENCES: " + divergences);

if (divergences > 0) {
  console.log("\n*** HALT: " + divergences + " divergence(s) detected. Reconcile from raw source files before proceeding. ***\n");
  process.exit(1);
} else {
  console.log("\n*** PREFLIGHT PASS — 0 divergences. Ready. ***\n");
  process.exit(0);
}
