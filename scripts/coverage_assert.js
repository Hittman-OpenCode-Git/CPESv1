#!/usr/bin/env node
/**
 * Coverage Assertion Gate — board v2.0 Final / R20/R23
 * Enforces validator coverage assertions as WARNING gate in pipeline.
 * Hardens to FAIL after 2 consecutive clean probe:parity runs.
 *
 * Checks:
 * 1. extractor.js raw-count coverage (all banks scanned)
 * 2. p2_schema_validator.js bank coverage
 * 3. s121_portfolio_dashboard.js domain coverage
 * 4. case_semantic_screens.js case bank coverage
 * 5. semantic_key_verifier.js MCQ bank coverage
 *
 * WARNING mode: logs gaps but exits 0.
 * FAIL mode: exits 1 on any gap (after 2 clean probe:parity runs).
 */

import fs from "node:fs";
import path from "node:path";

const COVERAGE_STATE_FILE = "scripts/output/coverage_gate_state.json";

function readState() {
  try {
    const raw = fs.readFileSync(COVERAGE_STATE_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return { cleanRuns: 0, lastRun: null };
  }
}

function writeState(state) {
  fs.writeFileSync(COVERAGE_STATE_FILE, JSON.stringify(state, null, 2));
}

// FAIL mode is armed only after the board's precondition is actually met:
// 2 consecutive clean probe:parity runs. Persisted in the state file rather
// than hardcoded, so the gate can be re-armed deliberately after any change
// that invalidates coverage evidence.
const CLEAN_RUNS_REQUIRED = 2;

function isArmed(state) {
  return state.cleanRuns >= CLEAN_RUNS_REQUIRED;
}

function loadProbeParity() {
  try {
    const raw = fs.readFileSync("scripts/output/coverage_summary.v1.json", "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function main() {
  const probe = loadProbeParity();
  const state = readState();
  const armed = isArmed(state);

  console.log("=== COVERAGE ASSERTION GATE (v2.0 Final) ===");
  console.log(armed
    ? "Mode: FAIL (armed — coverage gaps now block the pipeline)"
    : "Mode: WARNING (arms to FAIL after " + CLEAN_RUNS_REQUIRED + " clean probe:parity runs)");
  console.log("");

  const gaps = [];

  if (!probe) {
    console.log("WARN: coverage_summary.v1.json not found — probe:parity may not have run");
    if (armed) {
      console.log("FAIL: coverage evidence missing while gate is armed — coverage cannot be asserted.");
      state.cleanRuns = 0;
      state.lastRun = new Date().toISOString();
      writeState(state);
      return 1;
    }
    console.log("WARNING: coverage gate incomplete (not armed — exiting 0)");
    return 0;
  }

  // Check for gaps in probe:parity
  if (probe.divergences && probe.divergences.length > 0) {
    gaps.push(...probe.divergences.map(d => `probe:parity: ${d}`));
  }
  if (probe.missingBanks && probe.missingBanks.length > 0) {
    gaps.push(...probe.missingBanks.map(b => `missing bank: ${b}`));
  }
  if (probe.coverageGaps && probe.coverageGaps.length > 0) {
    gaps.push(...probe.coverageGaps.map(g => `coverage gap: ${g}`));
  }

  // Check extractor coverage (raw-count == scanned)
  if (probe.extractorCoverage) {
    for (const [bank, { raw, scanned }] of Object.entries(probe.extractorCoverage)) {
      if (raw !== scanned) {
        gaps.push(`extractor: ${bank} raw=${raw} scanned=${scanned} (delta=${raw - scanned})`);
      }
    }
  }

  // Check case semantic screens coverage
  if (probe.caseScreenCoverage) {
    for (const [bank, { cases, items }] of Object.entries(probe.caseScreenCoverage)) {
      if (cases === 0 || items === 0) {
        gaps.push(`case-screens: ${bank} has zero coverage (cases=${cases}, items=${items})`);
      }
    }
  }

  // Check MCQ semantic key verifier coverage
  if (probe.mcqSemanticCoverage) {
    for (const [bank, { items }] of Object.entries(probe.mcqSemanticCoverage)) {
      if (items === 0) {
        gaps.push(`semantic-key-verifier: ${bank} has zero coverage`);
      }
    }
  }

  // Check s121 portfolio dashboard coverage
  if (probe.portfolioCoverage) {
    for (const [domain, covered] of Object.entries(probe.portfolioCoverage)) {
      if (!covered) {
        gaps.push(`s121-dashboard: ${domain} not covered`);
      }
    }
  }

  if (gaps.length > 0) {
    console.log((armed ? "COVERAGE GAPS DETECTED (FAIL mode):" : "COVERAGE GAPS DETECTED (WARNING mode):"));
    for (const gap of gaps) {
      console.log(`  - ${gap}`);
    }
    console.log("");
    // Any gap resets the clean-run counter, so FAIL mode re-arms only after a
    // fresh pair of clean probe:parity runs.
    const wasArmed = armed;
    state.cleanRuns = 0;
    state.lastRun = new Date().toISOString();
    writeState(state);
    if (wasArmed) {
      console.log("FAIL: coverage gaps present while gate is armed — pipeline must not proceed.");
      return 1;
    }
    console.log("WARNING: coverage gaps present. Gate arms to FAIL after " +
                CLEAN_RUNS_REQUIRED + " consecutive clean probe:parity runs.");
    return 0; // WARNING mode: exit 0
  } else {
    console.log("All coverage checks PASSED — no gaps detected.");
    state.cleanRuns += 1;
    state.lastRun = new Date().toISOString();
    writeState(state);
    console.log(`Clean runs: ${state.cleanRuns}/${CLEAN_RUNS_REQUIRED}`);
    if (state.cleanRuns >= CLEAN_RUNS_REQUIRED) {
      console.log("Gate ARMED to FAIL mode — coverage gaps will now block the pipeline.");
    }
    return 0;
  }
}

process.exit(main());