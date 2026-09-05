#!/usr/bin/env node
// certify_pack_range.js -- Certify a contiguous QID range (<=30 items) in a P2 pack.
// Safety: backups first; aborts if any target is already Certified; aborts if count != 30 (Rule 5 cap);
// re-parses after write; verifies each target flipped. READS/WRITES p2/pack_p2_<L>.js only.
const fs = require("fs");
const path = require("path");
const ROOT = "C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026";

function parseArgs(argv) {
  const a = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--pack") a.pack = argv[++i];
    else if (argv[i] === "--qids") a.qids = argv[++i];
    else if (argv[i] === "--batch") a.batch = argv[++i];
    else if (argv[i] === "--date") a.date = argv[++i];
  }
  return a;
}
const args = parseArgs(process.argv);
if (!args.pack || !args.qids || !args.batch || !args.date) {
  console.error("usage: --pack <letter> --qids <X-###..X-###> --batch <label> --date YYYY-MM-DD");
  process.exit(2);
}

function expandRange(token) {
  // token like "B-311..B-340"
  const m = token.match(/^([A-F])-(\d+)\.\.([A-F])-(\d+)$/);
  if (!m) { console.error("bad range: " + token); process.exit(2); }
  const letter = m[1];
  if (letter !== m[3]) { console.error("range letters differ: " + token); process.exit(2); }
  const lo = parseInt(m[2]), hi = parseInt(m[4]);
  const out = [];
  for (let n = lo; n <= hi; n++) out.push("P2-" + m[1] + "-" + n);
  return out;
}
const expected = expandRange(args.qids);
const letter = args.pack;
const varName = "pack_p2_" + letter + "_questions";
const fp = path.join(ROOT, "p2", "pack_p2_" + letter + ".js");

const src = fs.readFileSync(fp, "utf8");
const items = new Function(src + "\nreturn " + varName + ";")();

function itemSpan(text, qid) {
  const idx = '"QuestionID": "' + qid + '"';
  const i = text.indexOf(idx);
  if (i === -1) return null;
  let open = -1, depth = 0, k = i;
  for (; k >= 0; k--) {
    if (text[k] === "}") depth++;
    else if (text[k] === "{") { if (depth === 0) { open = k; break; } depth--; }
  }
  if (open === -1) return null;
  depth = 0; let inStr = false, esc = false, close = -1;
  for (let m = open; m < text.length; m++) {
    const c = text[m];
    if (esc) { esc = false; continue; }
    if (c === "\\") { esc = true; continue; }
    if (inStr) { if (c === '"') inStr = false; continue; }
    if (c === '"') { inStr = true; continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) { close = m; break; } }
  }
  return close === -1 ? null : { start: open, end: close + 1 };
}

function setOrInsertField(objText, field, newValue) {
  const re = new RegExp('("' + field + '"\\s*:\\s*)"((?:[^"\\\\]|\\\\.)*)"');
  const count = (objText.match(new RegExp(re.source, "g")) || []).length;
  const esc = String(newValue).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  if (count === 1) return objText.replace(re, '$1"' + esc + '"');
  if (count === 0) {
    const qre = /"question_state"\s*:\s*"(?:[^"\\]|\\.)*"/;
    if (!qre.test(objText)) { console.error("no question_state to anchor insert of " + field); process.exit(1); }
    return objText.replace(qre, m => m + ',\n    "' + field + '": "' + esc + '"');
  }
  console.error("field " + field + " count=" + count + " (>1). Abort.");
  process.exit(1);
}

// Validate targets
let missing = [];
let alreadyCert = [];
for (const qid of expected) {
  const it = items.find(x => x.QuestionID === qid);
  if (!it) missing.push(qid);
  else if (it.question_state === "Certified") alreadyCert.push(qid);
}
if (missing.length) { console.error("MISSING QIDs: " + missing.join(",")); process.exit(1); }
if (alreadyCert.length) { console.error("ALREADY CERTIFIED (abort): " + alreadyCert.join(",")); process.exit(1); }
if (expected.length > 30) { console.error("Rule 5 cap: " + expected.length + " > 30. Abort."); process.exit(1); }
for (const qid of expected) {
  const it = items.find(x => x.QuestionID === qid);
  if (it.question_state !== "Unprocessed") { console.error(qid + " state=" + it.question_state + " (expected Unprocessed). Abort."); process.exit(1); }
}

// Backup
const ts = new Date().toISOString().replace(/[-:T.]/g, "").slice(0, 14);
const bak = path.join(ROOT, "backups", "pack_p2_" + letter + ".js.bak-" + args.batch + "-" + ts);
fs.mkdirSync(path.join(ROOT, "backups"), { recursive: true });
fs.copyFileSync(fp, bak);
const bakSize = fs.statSync(bak).size, srcSize = fs.statSync(fp).size;
if (bakSize !== srcSize || bakSize === 0) { console.error("backup size mismatch " + bakSize + " vs " + srcSize); process.exit(1); }
console.log("backup: " + path.basename(bak) + " bytes=" + bakSize);

// Apply state/batch/date to each item object
let out = src;
const spans = [];
for (const qid of expected) {
  const sp = itemSpan(out, qid);
  if (!sp) { console.error("cannot locate " + qid); process.exit(1); }
  spans.push({ qid, start: sp.start, end: sp.end });
}
spans.sort((a, b) => b.start - a.start);
for (const s of spans) {
  let body = out.slice(s.start, s.end);
  body = setOrInsertField(body, "question_state", "Certified");
  body = setOrInsertField(body, "certification_batch", args.batch);
  body = setOrInsertField(body, "certification_date", args.date);
  out = out.slice(0, s.start) + body + out.slice(s.end);
}

// Re-parse & verify
const after = new Function(out + "\nreturn " + varName + ";")();
if (after.length !== items.length) { console.error("PARSE FAIL count=" + after.length); process.exit(1); }
let stamped = 0, wrong = 0;
for (const qid of expected) {
  const it = after.find(x => x.QuestionID === qid);
  if (it.question_state === "Certified" && it.certification_batch === args.batch && it.certification_date === args.date) stamped++;
  else wrong++;
}
// Ensure no OTHER item's state changed: count Certified delta == expected.length
const certifiedDelta = after.filter(x => x.question_state === "Certified").length - items.filter(x => x.question_state === "Certified").length;
if (stamped !== expected.length || wrong > 0 || certifiedDelta !== expected.length) {
  console.error("VERIFY FAIL stamped=" + stamped + " wrong=" + wrong + " delta=" + certifiedDelta);
  process.exit(1);
}
fs.writeFileSync(fp, out);
const newCert = after.filter(x => x.question_state === "Certified").length;
console.log("OK " + args.batch + ": certified " + stamped + "/" + expected.length + " | pack Certified=" + newCert + "/" + after.length);
