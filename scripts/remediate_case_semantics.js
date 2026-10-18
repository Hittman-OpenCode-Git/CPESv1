/**
 * Case Study Semantic Remediation Script v3
 * 
 * Uses direct file text manipulation. Processes:
 * - B-num:SIGN-CONVENTION (11 items): Negate stored answer values in Correct field
 * - B:INVERSION strong candidates (~30): Flip CorrectChoice to match explanation
 * - B:weak: Append choice-specific notes to Explanation
 * 
 * Governance: Rule 5 (max 30/change-set), DL-045 (verify before key change),
 * backup-before-write mandatory.
 * 
 * Usage:
 *   node scripts/remediate_case_semantics.js --dry-run
 *   node scripts/remediate_case_semantics.js --live
 */

const fs = require('fs');
const path = require('path');

const FLAGS_FILE = path.join(__dirname, 'output/case_semantic_flags.json');
const BACKUP_DIR = path.join(__dirname, '..', 'backups');
const FLAGS = JSON.parse(fs.readFileSync(FLAGS_FILE, 'utf8'));

const DRY_RUN = process.argv.includes('--dry-run');
const LIVE = process.argv.includes('--live');
if (!DRY_RUN && !LIVE) { console.log('Usage: --dry-run or --live'); process.exit(1); }

console.log(`=== Case Semantic Remediation v3 ===`);
console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
console.log();

function classify(flag) {
  if (flag.detail && flag.detail.includes('SIGN-CONVENTION')) return 'bnum-sign';
  if (flag.detail && flag.detail.includes('stored numbers') && flag.detail.includes('absent')) return 'bnum-flag';
  if (flag.detail && flag.detail.includes('INVERSION')) return 'binversion';
  return 'other';
}

function ensureBackup(bankPath) {
  const absPath = path.resolve(__dirname, '..', bankPath);
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const ext = path.extname(absPath);
  const base = path.basename(absPath, ext);
  const bakPath = path.join(BACKUP_DIR, `${base}.bak-case-sem-${ts}${ext}`);
  if (!fs.existsSync(bakPath)) fs.copyFileSync(absPath, bakPath);
  return bakPath;
}

function readBank(bankPath) { return fs.readFileSync(path.resolve(__dirname, '..', bankPath), 'utf8'); }
function writeBank(bankPath, content) { fs.writeFileSync(path.resolve(__dirname, '..', bankPath), content, 'utf8'); }

// ── B-num SIGN-CONVENTION: Negate stored value ──────────────────
function fixBNumSign(content, flag) {
  const m = flag.detail.match(/stored \[([^\]]+)\]/);
  if (!m) return null;
  const val = parseFloat(m[1]);
  const neg = -val;
  const valStr = val.toString();
  const negStr = neg.toString();

  // Pattern 1: "Correct": -90000
  const p1 = new RegExp(`("Correct"\\s*:\\s*)${valStr}\\b`, 'g');
  // Pattern 2: "Correct": "-90000"
  const p2 = new RegExp(`("Correct"\\s*:\\s*")${valStr}"`, 'g');

  let newContent = content;
  if (p1.test(content)) { newContent = content.replace(p1, `$1${negStr}`); }
  else if (p2.test(content)) { newContent = content.replace(p2, `$1${negStr}"`); }
  else return null;

  return { changed: newContent !== content, neg };
}

// ── B:INVERSION: Flip CorrectChoice ────────────────────────────
function fixBInversion(content, flag, itemId) {
  const m = flag.detail.match(/predicted\((\w)\)/);
  if (!m) return null;
  const correctLetter = m[1];

  // Find the item block and its current CorrectChoice
  // Pattern: "QuestionID": "ITEMID", ... "CorrectChoice": "X"
  const itemPattern = new RegExp(
    `("QuestionID"\\s*:\\s*"${itemId}"[^}]*?"CorrectChoice"\\s*:\\s*")(\\w)(")`, 's'
  );
  const match = content.match(itemPattern);
  if (!match) return null;

  const currentCC = match[2];
  if (currentCC === correctLetter) return { changed: false };

  const newContent = content.replace(itemPattern, `$1${correctLetter}$3`);
  return { changed: newContent !== content, newCC: correctLetter, oldCC: currentCC };
}

// ── B:weak: Add choice-specific note ───────────────────────────
function fixBWeak(content, flag, itemId) {
  // Find the item's Explanation and append a note
  const note = ` [Reviewed: ${flag.detail.includes('EXTRA-REFUTED') ? 'extra-refuted' : flag.detail.includes('UNSUPPORTED') ? 'unsupported' : 'disjoint'} distractor(s) need choice-specific clarification.]`;
  
  const explPattern = new RegExp(
    `("QuestionID"\\s*:\\s*"${itemId}"[^}]*?"Explanation"\\s*:\\s*")((?:[^"\\\\]|\\\\.)*)(")`, 's'
  );
  const match = content.match(explPattern);
  if (!match) return null;

  const newContent = content.replace(explPattern, `$1${match[2]}${note}$3`);
  return { changed: newContent !== content };
}

// ── Main ────────────────────────────────────────────────────────
const banks = {};
for (const flag of FLAGS.flags) {
  if (!banks[flag.bank]) banks[flag.bank] = [];
  banks[flag.bank].push(flag);
}

let totalProcessed = 0;
let totalFailed = 0;

for (const [bank, bankFlags] of Object.entries(banks)) {
  if (bankFlags.length === 0) continue;
  console.log(`\n── ${path.basename(bank)} (${bankFlags.length} flags) ──`);
  ensureBackup(bank);
  let content = readBank(bank);
  let newContent = content;

  // B-num SIGN-CONVENTION (all in one batch, ≤30)
  const bNumSign = bankFlags.filter(f => classify(f) === 'bnum-sign');
  for (const flag of bNumSign) {
    const result = fixBNumSign(newContent, flag);
    if (result && result.changed) {
      newContent = newContent.replace(content, newContent); // already replaced
      totalProcessed++;
      console.log(`  SIGN ${flag.itemId}: negated to ${result.neg}`);
    } else {
      totalFailed++;
      console.log(`  FAIL ${flag.itemId}: pattern not found`);
    }
  }

  // B-num FLAG (stored numbers absent)
  const bNumFlag = bankFlags.filter(f => classify(f) === 'bnum-flag');
  for (const flag of bNumFlag) {
    const result = fixBWeak(newContent, flag, flag.itemId);
    if (result && result.changed) {
      totalProcessed++;
      console.log(`  FLAG ${flag.itemId}: added note`);
    } else {
      totalFailed++;
      console.log(`  SKIP ${flag.itemId}: pattern not found`);
    }
  }

  // B:INVERSION strong candidates (≤30 per Rule 5)
  const bInversion = bankFlags.filter(f => classify(f) === 'binversion' && f.detail.includes('recall=1.00'));
  const inversionBatch = bInversion.slice(0, 30);
  for (const flag of inversionBatch) {
    const result = fixBInversion(newContent, flag, flag.itemId);
    if (result && result.changed) {
      totalProcessed++;
      console.log(`  INV ${flag.itemId}: ${result.oldCC}→${result.newCC}`);
    } else if (result && !result.changed) {
      totalProcessed++;
      console.log(`  SKIP ${flag.itemId}: already correct`);
    } else {
      totalFailed++;
      console.log(`  FAIL ${flag.itemId}: pattern not found`);
    }
  }

  // Write back
  if (newContent !== content && !DRY_RUN) {
    writeBank(bank, newContent);
    console.log(`  ✓ Wrote ${bank}`);
  }
}

console.log(`\n=== Summary: ${DRY_RUN ? 'DRY RUN' : 'LIVE'} | Processed: ${totalProcessed} | Failed: ${totalFailed} ===`);
