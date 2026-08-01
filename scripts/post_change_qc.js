/**
 * post_change_qc.js — Post-Change Quality Control for CMA Part 1 Exam Simulator
 *
 * Runs governance guard tests, parse-checks all pack files, verifies QID counts
 * and certified counts, and writes a structured QC report to stdout and to
 * scripts/output/post_change_qc.json.
 *
 * Usage: node scripts/post_change_qc.js
 * Exit: 0 if overall PASS, 1 if FAIL
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(REPO_ROOT, "scripts", "output");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "post_change_qc.json");

const PACKS = [
  { name: "pack_a", file: "content/packs/pack_a_corrected.js", expected: 500 },
  { name: "pack_b", file: "content/packs/pack_b_corrected.js", expected: 500 },
  { name: "pack_c", file: "content/packs/pack_c_corrected.js", expected: 500 },
  { name: "pack_d", file: "content/packs/pack_d_corrected.js", expected: 500 },
  { name: "pack_e", file: "content/packs/pack_e_corrected.js", expected: 540 },
];

// ── Helpers ──────────────────────────────────────────────────────

function runCmd(cmd, cwd) {
  try {
    const out = execSync(cmd, { cwd: cwd || REPO_ROOT, encoding: "utf8", timeout: 60000, maxBuffer: 50 * 1024 * 1024 });
    return { output: out, failed: false };
  } catch (e) {
    return { output: (e.stdout || "") + (e.stderr || ""), failed: true };
  }
}

function grepCount(pattern, filePath) {
  const file = path.resolve(REPO_ROOT, filePath);
  if (!fs.existsSync(file)) return { count: 0, error: `File not found: ${file}` };
  const content = fs.readFileSync(file, "utf8");
  const re = new RegExp(pattern, "g");
  const matches = content.match(re);
  return { count: matches ? matches.length : 0, error: null };
}

// ── 1. Governance Guard ──────────────────────────────────────────

function runGovernanceGuard() {
  const result = runCmd("node scripts/test_governance_guard.js");

  const resultsMatch = result.output.match(/=== RESULTS: (\d+) PASS, (\d+) FAIL ===/);
  const testCount = resultsMatch ? parseInt(resultsMatch[1], 10) : 0;
  const failCount = resultsMatch ? parseInt(resultsMatch[2], 10) : 0;
  const pass = !result.failed && failCount === 0;

  return { pass, test_count: testCount, fail_count: failCount };
}

// ── 2. Parse Validation ─────────────────────────────────────────

function runParseValidation() {
  const failures = [];

  for (const pack of PACKS) {
    const file = path.resolve(REPO_ROOT, pack.file);
    const result = runCmd(`node --check "${file}"`);
    if (result.failed) {
      failures.push({
        pack: pack.name,
        file: pack.file,
        error: result.output.trim(),
      });
    }
  }

  return { pass: failures.length === 0, failures };
}

// ── 3. QID Counts ────────────────────────────────────────────────

function runQIDCounts() {
  const results = [];

  for (const pack of PACKS) {
    const g = grepCount('"QuestionID"', pack.file);
    const actual = g.error ? -1 : g.count;
    results.push({
      pack: pack.name,
      expected: pack.expected,
      actual,
      pass: actual === pack.expected,
    });
  }

  return results;
}

// ── 4. Certified Counts ──────────────────────────────────────────

function runCertifiedCounts() {
  const results = [];

  for (const pack of PACKS) {
    const g = grepCount('"question_state":\\s*"Certified"', pack.file);
    results.push({
      pack: pack.name,
      count: g.error ? -1 : g.count,
    });
  }

  return results;
}

// ── Main ─────────────────────────────────────────────────────────

function main() {
  const qc = {
    post_change_qc: {
      governance_guard: null,
      parse_validation: null,
      qid_counts: [],
      certified_counts: [],
      timestamp: new Date().toISOString(),
      overall: "FAIL",
    },
  };

  qc.post_change_qc.governance_guard = runGovernanceGuard();
  qc.post_change_qc.parse_validation = runParseValidation();
  qc.post_change_qc.qid_counts = runQIDCounts();
  qc.post_change_qc.certified_counts = runCertifiedCounts();

  const overall =
    qc.post_change_qc.governance_guard.pass &&
    qc.post_change_qc.parse_validation.pass &&
    qc.post_change_qc.qid_counts.every((q) => q.pass);

  qc.post_change_qc.overall = overall ? "PASS" : "FAIL";

  const json = JSON.stringify(qc, null, 2);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  fs.writeFileSync(OUTPUT_FILE, json + "\n", "utf8");

  console.log(json);

  return overall ? 0 : 1;
}

process.exit(main());
