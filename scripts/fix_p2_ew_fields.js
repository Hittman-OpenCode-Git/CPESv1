#!/usr/bin/env node
/**
 * fix_p2_ew_fields.js — Surgical fix for 67 P2 base-schema ERROR items.
 *
 * Root cause: ExplanationWrong<CorrectChoice> field is ABSENT from 67 P2-A/C/E
 * items. Per Rule 2 (DL-008), EW[CC] must be "" (empty string).
 * Per Rule 10 (DL-021), all 4 EW fields must be present.
 *
 * Inserts `"ExplanationWrong<CC>": ""` at the correct alphabetical position.
 *
 * Full Governance Lane — Full backup before each file edit (BACKUP_PROTOCOL.md).
 * Dry-run by default. Pass --commit to apply.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const { parsePack } = require('./lib/pack_parser');
const errors = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/output/p2f_schema_errors.json'), 'utf8'));

const COMMIT = process.argv.includes('--commit');
const TIMESTAMP = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

// Group items by file
const byFile = {};
for (const item of errors.items) {
  if (!byFile[item.file]) byFile[item.file] = [];
  byFile[item.file].push(item);
}

console.log(`=== P2 EW Field Fix Script ===`);
console.log(`Mode: ${COMMIT ? 'COMMIT (applying fixes)' : 'DRY-RUN (no writes)'}`);
console.log(`Affected packs: ${Object.keys(byFile).join(', ')}`);
console.log(`Total items: ${errors.items.length}\n`);

const report = { timestamp: new Date().toISOString(), mode: COMMIT ? 'commit' : 'dry-run', files: {} };

for (const fileKey of Object.keys(byFile)) {
  const items = byFile[fileKey];
  const fp = path.join(ROOT, fileKey);
  const src = fs.readFileSync(fp, 'utf8');
  const srcHash = sha256(src);
  const parsed = parsePack(src, { sourceName: path.basename(fileKey) });

  const recordMap = {};
  for (const rec of parsed.records) {
    if (rec.object && rec.object.QuestionID) recordMap[rec.object.QuestionID] = rec;
  }

  // For line-based approach: split into lines, track which lines belong to each item
  const lines = src.split('\n');
  // Build a map: for each character offset, the line number
  const lineStarts = [0];
  for (let i = 0; i < src.length; i++) {
    if (src[i] === '\n') lineStarts.push(i + 1);
  }
  const offsetToLine = (offset) => {
    // Binary search: find the last lineStart <= offset
    let lo = 0, hi = lineStarts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (lineStarts[mid] <= offset) lo = mid;
      else hi = mid - 1;
    }
    return lo; // 0-indexed line number
  };

  // Collect line insertions: { lineNum, text }
  // Process in reverse line order to preserve line numbers
  const lineInsertions = [];

  for (const item of items) {
    const rec = recordMap[item.qid];
    if (!rec) {
      console.log(`  WARN: ${item.qid} not found — skipping`);
      continue;
    }
    const o = rec.object;
    const cc = o.CorrectChoice;
    const missingField = 'ExplanationWrong' + cc;

    if (missingField in o) {
      console.log(`  WARN: ${item.qid} — ${missingField} already present — skipping`);
      continue;
    }

    // Find the item's line range
    const startLine = offsetToLine(rec.offsets.start);
    const endLine = offsetToLine(rec.offsets.end);

    // Find existing EW field lines within this item's range
    const ewLines = []; // { lineIdx, letter }
    for (let li = startLine; li <= endLine; li++) {
      const line = lines[li];
      const m = line.match(/^(\s*)"ExplanationWrong([A-D])"\s*:/);
      if (m) {
        ewLines.push({ lineIdx: li, letter: m[2], indent: m[1] });
      }
    }

    if (ewLines.length === 0) {
      console.log(`  ERROR: ${item.qid} — no EW lines found — skipping`);
      continue;
    }

    const missingLetter = cc;
    let insertLineNum;
    let indent;

    // Find the first EW with letter > missingLetter → insert before it
    // If none found, insert after the last EW line
    const insertBefore = ewLines.find(e => e.letter > missingLetter);
    if (insertBefore) {
      insertLineNum = insertBefore.lineIdx;
      indent = insertBefore.indent;
      lineInsertions.push({
        lineNum: insertLineNum,
        text: `${indent}"ExplanationWrong${missingLetter}": "",`,
        qid: item.qid,
        field: missingField
      });
    } else {
      // Insert after the last EW line
      const lastEw = ewLines[ewLines.length - 1];
      insertLineNum = lastEw.lineIdx + 1;
      indent = lastEw.indent;
      lineInsertions.push({
        lineNum: insertLineNum,
        text: `${indent}"ExplanationWrong${missingLetter}": "",`,
        qid: item.qid,
        field: missingField
      });
    }

    console.log(`  ${item.qid} (CC=${cc}): insert "${missingField}: "" at line ${insertLineNum}`);
  }

  // Sort insertions in reverse line order
  lineInsertions.sort((a, b) => b.lineNum - a.lineNum);

  report.files[fileKey] = {
    itemsProcessed: lineInsertions.length,
    itemsSkipped: items.length - lineInsertions.length,
    originalHash: srcHash,
    insertions: lineInsertions
  };

  if (COMMIT && lineInsertions.length > 0) {
    // Backup
    const bakPath = fp + '.bak-' + TIMESTAMP;
    fs.writeFileSync(bakPath, src, 'utf8');
    const bakSize = fs.statSync(bakPath).size;
    if (bakSize === 0) throw new Error(`Backup verification failed: ${bakPath} has 0 bytes`);
    console.log(`  Backup: ${path.basename(bakPath)} (${bakSize} bytes) — verified non-zero`);

    // Apply insertions (reverse line order preserves earlier line numbers)
    for (const ins of lineInsertions) {
      lines.splice(ins.lineNum, 0, ins.text);
    }
    const modified = lines.join('\n');
    const newHash = sha256(modified);
    fs.writeFileSync(fp, modified, 'utf8');
    report.files[fileKey].backupPath = path.basename(bakPath);
    report.files[fileKey].originalHash = srcHash;
    report.files[fileKey].newHash = newHash;
    report.files[fileKey].originalSize = src.length;
    report.files[fileKey].newSize = modified.length;
    console.log(`  WRITTEN: ${path.basename(fp)} (${src.length} → ${modified.length} bytes)`);
  }
}

fs.writeFileSync(path.join(ROOT, 'scripts/output/fix_ew_fields_report.json'), JSON.stringify(report, null, 1), 'utf8');
console.log(`\nReport: scripts/output/fix_ew_fields_report.json`);
if (COMMIT) console.log('DONE — fixes applied.');
else console.log('DRY-RUN complete. Run with --commit to apply.');
