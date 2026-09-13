#!/usr/bin/env node
// p2_review_split.js — split a Part 2 pack into <=40KB verbatim parts for external model review.
// Usage (MCQ packs):   node scripts/p2_review_split.js --pack a
// Usage (case packs):  node scripts/p2_review_split.js --file p2/case_pack_p2_1.js --label CASE1 --out case1 --pattern "\"CaseID\"\\s*:\\s*\"([^\"]+)\""
//
// Implements AGENTS.md §18.2 (Third-Party Content Review Handoffs):
//   1. Split pack into verbatim parts of <=40KB each.
//   2. Emit a part->QID manifest (QID ranges per part, part count, source SHA256).
//   3. Prove no-gap/no-dup: Buffer.concat(all parts) === source, byte-for-byte.
//
// READ-ONLY with respect to pack content. It only writes split copies into a temp
// directory and a manifest + findings stub under p2/review/. It never touches the
// pack source file.

'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const REPO = path.resolve(__dirname, '..');
const PART_BYTES = 40 * 1024; // 40KB, per §18.2

function printHelp() {
  console.log('Usage: node scripts/p2_review_split.js --pack a|b|c|d|e|f');
  console.log('       node scripts/p2_review_split.js --file <repo-rel path> --label <LABEL> --out <dir> [--pattern <regex>]');
  console.log('  --pack <letter>  MCQ pack to split (a = pack_p2_a.js, etc.)');
  console.log('  --file <path>    Arbitrary pack file to split (repo-relative, e.g. p2/case_pack_p2_1.js)');
  console.log('  --label <LABEL>  Manifest/findings label (e.g. CASE1). Required with --file.');
  console.log('  --out <dir>      Temp subdir name for parts (e.g. case1). Required with --file.');
  console.log('  --pattern <re>   ID regex source with capture group 1 = the ID. Default: MCQ QuestionID pattern.');
  console.log('  --help           Show this help');
}

function parseArgs() {
  const args = process.argv.slice(2);
  const o = { pack: null, file: null, label: null, out: null, pattern: null };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--pack') o.pack = (args[++i] || '').toLowerCase();
    else if (args[i] === '--file') o.file = args[++i] || null;
    else if (args[i] === '--label') o.label = args[++i] || null;
    else if (args[i] === '--out') o.out = args[++i] || null;
    else if (args[i] === '--pattern') o.pattern = args[++i] || null;
    else if (args[i] === '--help') { printHelp(); process.exit(0); }
  }
  if (o.file) {
    if (!o.label || !o.out) {
      console.error('ERROR: --file requires --label and --out.');
      printHelp();
      process.exit(1);
    }
    return o;
  }
  if (!o.pack || !['a', 'b', 'c', 'd', 'e', 'f'].includes(o.pack)) {
    console.error('ERROR: --pack <a|b|c|d|e|f> or --file <path> is required.');
    printHelp();
    process.exit(1);
  }
  return o;
}

// Slice a Buffer into contiguous parts of <= maxBytes, breaking at newline
// boundaries where possible so no UTF-8 codepoint or line is split mid-byte.
// The slices are exact contiguous sub-ranges, so concat reproduces the source.
function sliceBuffer(buf, maxBytes) {
  const parts = [];
  let start = 0;
  while (start < buf.length) {
    let end = Math.min(start + maxBytes, buf.length);
    if (end < buf.length) {
      let lastNL = -1;
      for (let i = start + 1; i < end; i++) {
        if (buf[i] === 0x0a) lastNL = i;
      }
      if (lastNL > start) end = lastNL + 1; // include the trailing newline
    }
    parts.push(buf.slice(start, end));
    start = end;
  }
  return parts;
}

function qidsIn(text, idRe) {
  const out = [];
  let m;
  const re = new RegExp(idRe.source, 'g');
  while ((m = re.exec(text)) !== null) {
    const id = m[1] !== undefined ? m[1] : m[0];
    if (!out.includes(id)) out.push(id);
  }
  return out;
}

function main() {
  const opts = parseArgs();
  const idRe = opts.pattern ? new RegExp(opts.pattern) : /"QuestionID"\s*:\s*"([^"]+)"/;
  let srcFile, partLabel, outDir, partPrefix, displayName;
  if (opts.file) {
    srcFile = path.join(REPO, opts.file);
    partLabel = String(opts.label).toUpperCase();
    outDir = opts.out;
    partPrefix = path.basename(opts.file, '.js');
    displayName = opts.file.replace(/\\/g, '/');
  } else {
    const pack = opts.pack;
    srcFile = path.join(REPO, 'p2', `pack_p2_${pack}.js`);
    partLabel = String(pack).toUpperCase();
    outDir = pack;
    partPrefix = `pack_p2_${pack}`;
    displayName = `p2/pack_p2_${pack}.js`;
  }

  if (!fs.existsSync(srcFile)) {
    console.error(`ERROR: source pack not found: ${srcFile}`);
    process.exit(1);
  }

  const srcBuf = fs.readFileSync(srcFile);
  const srcText = srcBuf.toString('utf8');
  const sha = crypto.createHash('sha256').update(srcBuf).digest('hex');

  const parts = sliceBuffer(srcBuf, PART_BYTES);

  // Output dirs: split parts in temp (large verbatim copies stay out of the repo),
  // manifest + findings stub under p2/review/.
  const tempBase = path.join(os.tmpdir(), 'opencode', 'p2-review', outDir);
  const reviewDir = path.join(REPO, 'p2', 'review');
  fs.mkdirSync(tempBase, { recursive: true });
  fs.mkdirSync(reviewDir, { recursive: true });

  const partFiles = [];
  const partRows = [];
  const seenQids = new Set();

  parts.forEach((partBuf, i) => {
    const name = `${partPrefix}.part${String(i + 1).padStart(3, '0')}.js`;
    const fullPath = path.join(tempBase, name);
    fs.writeFileSync(fullPath, partBuf);
    partFiles.push(fullPath);

    const text = partBuf.toString('utf8');
    const qids = qidsIn(text, idRe);
    qids.forEach((q) => seenQids.add(q));
    partRows.push({
      part: i + 1,
      file: fullPath,
      startByte: parts.slice(0, i).reduce((n, p) => n + p.length, 0),
      endByte: parts.slice(0, i + 1).reduce((n, p) => n + p.length, 0),
      bytes: partBuf.length,
      qids,
    });
  });

  // --- No-gap / no-dup proof: concatenation must equal source byte-for-byte ---
  const recon = Buffer.concat(parts);
  const concatExact = recon.equals(srcBuf);

  // --- QID coverage: every QID in source appears in exactly the parts, no dup ---
  const srcQids = qidsIn(srcText, idRe);
  const missing = srcQids.filter((q) => !seenQids.has(q));
  const extra = [...seenQids].filter((q) => !srcQids.includes(q));

  const manifestJson = {
    source: srcFile,
    sourceBytes: srcBuf.length,
    sourceSha256: sha,
    sourceQidCount: srcQids.length,
    partCount: parts.length,
    partBytesMax: PART_BYTES,
    concatExact,
    missingQids: missing,
    extraQids: extra,
    parts: partRows,
  };

  fs.writeFileSync(
    path.join(tempBase, 'manifest.json'),
    JSON.stringify(manifestJson, null, 2),
    'utf8'
  );

  // --- Human-readable manifest ---
  let md = `# ${partLabel} Review Manifest (${partPrefix}.js)\n\n`;
  md += `- **Source:** \`${displayName}\`\n`;
  md += `- **Source bytes:** ${srcBuf.length}\n`;
  md += `- **SHA256:** \`${sha}\`\n`;
  md += `- **Items (IDs):** ${srcQids.length}\n`;
  md += `- **Parts:** ${parts.length} (max ${PART_BYTES} bytes each)\n`;
  md += `- **Concat == source (byte-for-byte):** ${concatExact ? 'EXACT MATCH' : 'MISMATCH — DO NOT USE'}\n`;
  md += `- **QID gaps:** ${missing.length ? missing.join(', ') : 'none'}\n`;
  md += `- **QID extras:** ${extra.length ? extra.join(', ') : 'none'}\n\n`;
  md += `| Part | QIDs | Bytes | File |\n|---|---|---|---|\n`;
  for (const r of partRows) {
    md += `| ${r.part} | ${r.qids.length} (${r.qids[0] || '—'} .. ${r.qids[r.qids.length - 1] || '—'}) | ${r.bytes} | \`${r.file}\` |\n`;
  }
  fs.writeFileSync(path.join(reviewDir, `${partLabel}_REVIEW_MANIFEST.md`), md, 'utf8');

  // --- Findings report stub (model fills this in) ---
  const findingsPath = path.join(reviewDir, `${partLabel}_REVIEW_FINDINGS.md`);
  if (!fs.existsSync(findingsPath)) {
    const stub = `# ${partLabel} Review Findings (${partPrefix}.js)\n\n`;
    fs.writeFileSync(findingsPath, stub, 'utf8');
  }

  console.log(`\n=== ${partLabel} Review Split Complete ===`);
  console.log(`Source:     ${srcFile}`);
  console.log(`Bytes:      ${srcBuf.length}  SHA256: ${sha}`);
  console.log(`Items:      ${srcQids.length}`);
  console.log(`Parts:      ${parts.length} (<=${PART_BYTES}B each)`);
  console.log(`Concat:     ${concatExact ? 'EXACT MATCH (no-gap/no-dup verified)' : 'MISMATCH — DO NOT USE'}`);
  console.log(`QID gaps:   ${missing.length ? missing.join(', ') : 'none'}`);
  console.log(`QID extras: ${extra.length ? extra.join(', ') : 'none'}`);
  console.log(`Parts dir:  ${tempBase}`);
  console.log(`Manifest:   ${path.join(reviewDir, partLabel + '_REVIEW_MANIFEST.md')}`);
  console.log(`Findings:   ${findingsPath}`);
  console.log(`\nDispatch the reviewer model with its prompt; parts are under: ${tempBase}`);
}

main();
