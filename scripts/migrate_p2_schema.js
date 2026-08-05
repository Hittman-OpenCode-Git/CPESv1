// migrate_p2_schema.js — P2 Schema Lock Migration (2026-08-04)
// Applies 3 changes to all P2 pack files:
//   1. "Type": "select" → "ItemStyle": "single-select"
//   2. "VerificationChecks" → "VerifiedChecks"
//   3. Add "UniqueConceptKey" derived from Topic field
//
// Usage: node scripts/migrate_p2_schema.js
// Dry-run: node scripts/migrate_p2_schema.js --dry-run

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const P2_DIR = path.join(__dirname, '..', 'p2');
const PACKS = ['pack_p2_a.js', 'pack_p2_b.js', 'pack_p2_c.js'];

function deriveUniqueConceptKey(topic) {
  if (!topic) return 'unknown-key';
  const parts = topic.split(/[—–\s]+/);
  const numericPart = parts[0].replace(/\./g, '-');
  const rest = parts.slice(1)
    .map(w => w.replace(/[^a-zA-Z0-9-]/g, ''))
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  if (rest.length > 64) {
    return numericPart + '-' + rest.substring(0, 64).replace(/-$/, '');
  }
  return numericPart + (rest ? '-' + rest : '');
}

function migrateFile(filePath) {
  const base = path.basename(filePath);
  console.log(`\n${DRY_RUN ? '[DRY RUN] ' : ''}Processing ${base}...`);

  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Change 1: "Type": "select" → "ItemStyle": "single-select"
  const typeCount = (content.match(/"Type":\s*"select"/g) || []).length;
  content = content.replace(/"Type":\s*"select"/g, '"ItemStyle": "single-select"');
  console.log(`  Type → ItemStyle: ${typeCount} replacements`);

  // Change 2: "VerificationChecks" → "VerifiedChecks"
  const vcCount = (content.match(/"VerificationChecks"/g) || []).length;
  content = content.replace(/"VerificationChecks"/g, '"VerifiedChecks"');
  console.log(`  VerificationChecks → VerifiedChecks: ${vcCount} replacements`);

  // Change 3: Add UniqueConceptKey after Part2OnlyFlag
  // Extract Topic values and generate UniqueConceptKey
  const topicRe = /"Topic":\s*"([^"]+)"/g;
  const partFlagRe = /"Part2OnlyFlag":\s*true/;
  let topicMatch;
  let addedKeys = 0;

  // Process each item: find Topic→generate key→insert after Part2OnlyFlag
  // We work backwards through matches to avoid offset issues
  const items = [];
  let pos = 0;
  while ((topicMatch = topicRe.exec(content)) !== null) {
    items.push({
      topic: topicMatch[1],
      topicIdx: topicMatch.index
    });
  }

  // For each item, find Part2OnlyFlag that follows the Topic, and insert UniqueConceptKey after it
  let result = '';
  let lastIdx = 0;
  for (const item of items) {
    // Find the Part2OnlyFlag between this topic and the next topic (or end)
    const searchStart = item.topicIdx;
    const searchEnd = items.indexOf(item) < items.length - 1
      ? items[items.indexOf(item) + 1].topicIdx
      : content.length;
    const slice = content.substring(searchStart, searchEnd);
    const pfMatch = slice.match(partFlagRe);

    if (pfMatch) {
      const pfIdx = searchStart + pfMatch.index;
      // Copy everything up to and including Part2OnlyFlag
      result += content.substring(lastIdx, pfIdx + pfMatch[0].length);
      // Insert UniqueConceptKey
      const key = deriveUniqueConceptKey(item.topic);
      result += `,\n    "UniqueConceptKey": "${key}"`;
      lastIdx = pfIdx + pfMatch[0].length;
      addedKeys++;
    }
  }
  result += content.substring(lastIdx);

  console.log(`  UniqueConceptKey: ${addedKeys} added`);

  if (DRY_RUN) {
    console.log('  Dry run — no file written');
    return null;
  }

  fs.writeFileSync(filePath, result, 'utf8');
  console.log(`  Written: ${filePath} (${result.length} bytes)`);
  return { before: original.length, after: result.length, typeChanges: typeCount, vcChanges: vcCount, ucKeys: addedKeys };
}

function verifyFiles(files) {
  console.log('\n--- Verification ---');
  let totalQids = 0;
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const qids = (content.match(/"QuestionID"/g) || []).length;
    console.log(`  ${path.basename(file)}: ${qids} QIDs`);
    totalQids += qids;

    // Check no old fields remain
    if (content.includes('"Type": "select"')) {
      console.log(`    WARNING: Residual "Type": "select" found!`);
    }
    if (content.includes('"VerificationChecks"')) {
      console.log(`    WARNING: Residual "VerificationChecks" found!`);
    }

    // Check new fields are present
    const itemStyle = (content.match(/"ItemStyle":\s*"single-select"/g) || []).length;
    const verified = (content.match(/"VerifiedChecks"/g) || []).length;
    const uniqueKeys = (content.match(/"UniqueConceptKey"/g) || []).length;
    console.log(`    ItemStyle: ${itemStyle}, VerifiedChecks: ${verified}, UniqueConceptKey: ${uniqueKeys}`);
  }
  console.log(`  Total QIDs: ${totalQids}`);
  return totalQids;
}

// Main
console.log(`${DRY_RUN ? 'DRY RUN' : 'LIVE RUN'} — Schema Lock Migration 2026-08-04\n`);
console.log('Target packs: ' + PACKS.join(', '));

const files = PACKS.map(p => path.join(P2_DIR, p));

// Check all files exist
for (const f of files) {
  if (!fs.existsSync(f)) {
    console.error(`ERROR: File not found: ${f}`);
    process.exit(1);
  }
}

for (const f of files) {
  migrateFile(f);
}

if (!DRY_RUN) {
  const total = verifyFiles(files);
  if (total !== 155) {
    console.error(`\nERROR: Expected 155 QIDs, got ${total}`);
    process.exit(1);
  }
  console.log('\nMigration complete. Total QIDs verified: 155');
} else {
  console.log('\nDry run complete. No files modified.');
}
