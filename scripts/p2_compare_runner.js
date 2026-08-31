#!/usr/bin/env node
// p2_compare_runner.js — Head-to-head: Muse Spark 1.2 vs Minimax M3 on same batch
// Usage: node scripts/p2_compare_runner.js --pack a --start 311 --count 15
// Dispatches via Task tool in an OpenCode session: launches 2 parallel general agents,
// each writes a staged file, then validates both through hardened gates.

const fs = require('fs');
const path = require('path');
const { spawnSync, spawn } = require('child_process');

const REPO = 'C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026';
const TEMP_BASE = path.join(process.env.TEMP || process.env.TMP || '/tmp', 'opencode', 'P2-066', 'compare');

function parseArgs() {
  const a = process.argv.slice(2);
  const o = { pack: 'a', start: 311, count: 15 };
  for (let i = 0; i < a.length; i++) {
    if (a[i] === '--pack') o.pack = a[++i].toLowerCase();
    else if (a[i] === '--start') o.start = Number(a[++i]);
    else if (a[i] === '--count') o.count = Number(a[++i]);
    else if (a[i] === '--help') { console.log('Usage: node scripts/p2_compare_runner.js --pack a --start 311 --count 15'); process.exit(0); }
  }
  return o;
}

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', ...opts });
  return r;
}

function validateBatch(stagedFile, pack, start, count) {
  const results = {};
  // Gate 1: solve_and_assert
  const gate1 = run('node', [path.join(TEMP_BASE, '..', 'solve_and_assert.js'), stagedFile]);
  results.gate1 = { ok: gate1.status === 0, stdout: gate1.stdout?.slice(0, 2000) || '', stderr: gate1.stderr?.slice(0, 800) || '' };
  // Gate 2-3: mcq_pipeline validate
  const gate23 = run('node', [path.join(TEMP_BASE, '..', 'mcq_pipeline.js'), 'validate', stagedFile, pack, String(start), String(count)]);
  results.gate23 = { ok: gate23.status === 0, stdout: gate23.stdout?.slice(0, 3000) || '', stderr: gate23.stderr?.slice(0, 1200) || '' };
  // Try parse JSON from stdout
  try { results.parsed = JSON.parse(gate23.stdout); } catch {}
  return results;
}

function main() {
  const opts = parseArgs();
  const { pack, start, count } = opts;
  const end = start + count - 1;
  const qidRange = `P2-${pack.toUpperCase()}-${String(start).padStart(3,'0')}..${String(end).padStart(3,'0')}`;

  console.log(`\n=== P2-066 Model Compare: ${qidRange} (${count} items, pack ${pack.toUpperCase()}) ===`);
  console.log(`Repo: ${REPO}`);
  console.log(`Temp: ${TEMP_BASE}`);

  // Ensure dirs
  fs.mkdirSync(path.join(TEMP_BASE, 'muse_spark'), { recursive: true });
  fs.mkdirSync(path.join(TEMP_BASE, 'minimax_m3'), { recursive: true });

  const fileA = path.join(TEMP_BASE, 'muse_spark', `pack_p2_${pack}_${start}.js`);
  const fileB = path.join(TEMP_BASE, 'minimax_m3', `pack_p2_${pack}_${start}.js`);

  console.log(`\nThis runner validates already-staged files.`);
  console.log(`Expected staged files (Task agents write these):`);
  console.log(`  Muse Spark 1.2: ${fileA}`);
  console.log(`  Minimax M3:     ${fileB}`);
  console.log(`\nIf files do not exist yet, dispatch 2 parallel Task agents:`);
  console.log(`  Task A: subagent_type="general", description="Compare Muse Spark ${qidRange}", prompt from prompts/compare_muse_spark.md`);
  console.log(`  Task B: subagent_type="general", description="Compare Minimax M3 ${qidRange}", prompt from prompts/compare_minimax_m3.md`);
  console.log(`  Each prompt: read AUTHOR_SPEC.md fully, write bare array of ${count} items to its staged path, slot table at p2/P2-066_CYCLE1_SLOTS.md Cycle 2 + scripts/generate_p2066_slots.js --cap-75`);

  const hasA = fs.existsSync(fileA);
  const hasB = fs.existsSync(fileB);
  console.log(`\nStaged file check: Muse Spark ${hasA ? 'FOUND' : 'NOT YET'} | Minimax M3 ${hasB ? 'FOUND' : 'NOT YET'}`);

  if (!hasA && !hasB) {
    console.log(`\nNo staged files yet — run as Task dispatch harness:`);
    console.log(`  1. Read p2/P2-066_CYCLE1_SLOTS.md for Pack ${pack.toUpperCase()} ${qidRange}`);
    console.log(`  2. Dispatch 2 Task(general) in parallel with prompts below`);
    console.log(`  3. Re-run this script to validate and generate report`);
    // Write report stub
    const stub = `# P2-066 Compare — ${qidRange} — Awaiting Batches\n\nNo staged files yet. Dispatch 2 parallel Task agents then re-run:\n\n\`node scripts/p2_compare_runner.js --pack ${pack} --start ${start} --count ${count}\`\n`;
    fs.writeFileSync(path.join(REPO, 'p2', 'P2-066_COMPARE_REPORT.md'), stub, 'utf8');
    console.log(`Stub report written to p2/P2-066_COMPARE_REPORT.md`);
    return;
  }

  // Validate each that exists
  const results = {};
  if (hasA) {
    console.log(`\n--- Validating Muse Spark 1.2: ${fileA} ---`);
    results.muse_spark = validateBatch(fileA, pack, start, count);
    console.log(JSON.stringify(results.muse_spark, null, 2).slice(0, 2500));
  }
  if (hasB) {
    console.log(`\n--- Validating Minimax M3: ${fileB} ---`);
    results.minimax_m3 = validateBatch(fileB, pack, start, count);
    console.log(JSON.stringify(results.minimax_m3, null, 2).slice(0, 2500));
  }

  // Generate report
  const report = `# P2-066 Model Comparison Report — ${qidRange} (${count} items)\n\n**Generated:** ${new Date().toISOString()}\n**Pack:** ${pack.toUpperCase()} ${qidRange} — Financial Statement Analysis (Cycle 2 pilot, testing cap 1,875)\n**Hardened gates:** Gate1 solve_and_assert + Gates 2-3 mcq_pipeline validate (EW verb, stem Flash+Name+Role, byte >${count*2000})\n\n---\n\n## Results\n\n| Model | Gate 1 (recompute vs CC) | Gate 2-3 (validate) | Overall | Errors (first 5) |\n|-------|--------------------------|---------------------|---------|------------------|\n`;
  let rows = '';
  for (const [name, r] of Object.entries(results)) {
    const g1 = r.gate1?.ok ? 'PASS' : 'FAIL';
    const g23 = r.gate23?.ok ? 'PASS' : 'FAIL';
    const overall = (r.gate1?.ok && r.gate23?.ok) ? 'CERTIFIABLE (first-pass)' : 'NEEDS FIX';
    const errs = r.parsed?.errors?.slice(0,5).map(e=>`\`${e.slice(0,80)}\``).join('<br>') || (r.gate1?.stderr?.slice(0,120) || '—');
    rows += `| ${name} | ${g1} | ${g23} | ${overall} | ${errs} |\n`;
  }
  const fullReport = report + rows +
    `\n---\n\n## Recommendation\n\n- If one model is CERTIFIABLE first-pass and the other NEEDS FIX, prefer the CERTIFIABLE model for remaining 445 MCQs to cap 1,875.\n- If both NEEDS FIX, compare error counts — prefer fewer Gate 1 (correctness) failures over Gate 2-3 (style) failures.\n- If both PASS, prefer the model with fewer warnings and deeper EC (principle + formula + business interpretation).\n\n## Artifacts\n\n- Muse Spark: \`${fileA}\`\n- Minimax M3: \`${fileB}\`\n- Slot table: \`p2/P2-066_CYCLE1_SLOTS.md\` Cycle 2 + \`scripts/generate_p2066_slots.js --cap-75\`\n- Gates: \`%TEMP%\\\\opencode\\\\P2-066\\\\solve_and_assert.js\` + \`%TEMP%\\\\opencode\\\\P2-066\\\\mcq_pipeline.js\`\n`;

  fs.writeFileSync(path.join(REPO, 'p2', 'P2-066_COMPARE_REPORT.md'), fullReport, 'utf8');
  console.log(`\nReport written to p2/P2-066_COMPARE_REPORT.md`);
  console.log(fullReport);
}

main();
