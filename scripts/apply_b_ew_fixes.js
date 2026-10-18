// apply_b_ew_fixes.js — apply B-pack field rewrites (string fields only) from a JSON spec.
// CWD must be repo root. WRITES p2/pack_p2_b.js; backup must pre-exist.
// Spec: [{qid, field, new_text}] — replaces the ENTIRE string value of `field` in that QID's object.
const fs = require("fs");
const path = require("path");
const ROOT = "C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026";
const fp = path.join(ROOT, "p2", "pack_p2_b.js");

const specFp = process.argv[2];
if (!specFp) { console.error("usage: node apply_b_ew_fixes.js <spec.json>"); process.exit(2); }
const spec = JSON.parse(fs.readFileSync(path.resolve(specFp), "utf8"));
const src = fs.readFileSync(fp, "utf8");
const itemsBefore = new Function(src + "\nreturn pack_p2_b_questions;")();

const byQid = {};
for (const s of spec) { if (!byQid[s.qid]) byQid[s.qid] = []; byQid[s.qid].push(s); }

function objectSpanAt(text, qid) {
  const idx = '"QuestionID": "' + qid + '"';
  const qidx = text.indexOf(idx);
  if (qidx === -1) return null;
  let open = -1, depth = 0, i = qidx;
  for (; i >= 0; i--) {
    if (text[i] === "}") depth++;
    else if (text[i] === "{") { if (depth === 0) { open = i; break; } depth--; }
  }
  if (open === -1) return null;
  depth = 0; let inStr = false, esc = false, close = -1;
  for (let j = open; j < text.length; j++) {
    const ch = text[j];
    if (esc) { esc = false; continue; }
    if (ch === "\\") { esc = true; continue; }
    if (inStr) { if (ch === '"') inStr = false; continue; }
    if (ch === '"') { inStr = true; continue; }
    if (ch === "{") depth++;
    else if (ch === "}") { depth--; if (depth === 0) { close = j; break; } }
  }
  if (close === -1) return null;
  return { open, end: close + 1 };
}

// Verify each field name is a string field (not object/array) in this schema
const OBJECT_FIELDS = new Set(["Dependencies","DependenciesOnOtherItems","AnswerKeyCheck","Choices","AuthoringHistory","VerifiedChecks","AuthoringNotes","SourceIds","LOSTags","BlueprintDomain","BlueprintTopic","BlueprintLOS","LOSTagsV2","BlueprintDomainV2","BlueprintTopicV2","BlueprintLOSV2","DependenciesV2","DependenciesOnOtherItemsV2","AnswerKeyCheckV2"]);
let warned = false;
for (const s of spec) {
  if (OBJECT_FIELDS.has(s.field)) { console.error("ERROR: " + s.qid + "." + s.field + " is NOT a string field — cannot wholesale-replace. Abort."); process.exit(1); }
}

let out = src;
const edits = [];
for (const qid of Object.keys(byQid)) {
  const span = objectSpanAt(out, qid);
  if (!span) { console.error("cannot locate " + qid); process.exit(1); }
  let obj = out.slice(span.open, span.end);
  for (const s of byQid[qid]) {
    const re = new RegExp("(\"" + s.field + "\"\\s*:\\s*)\"((?:[^\"\\\\]|\\\\.)*)\"");
    const m = re.exec(obj);
    if (!m) { console.error("field " + s.field + " not found as string in " + qid); process.exit(1); }
    const escaped = s.new_text.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
    obj = obj.slice(0, m.index) + m[1] + '"' + escaped + '"' + obj.slice(m.index + m[0].length);
  }
  edits.push({ qid, start: span.open, end: span.end, replacement: obj });
}
edits.sort((a, b) => b.start - a.start);
for (const e of edits) out = out.slice(0, e.start) + e.replacement + out.slice(e.end);

const itemsAfter = new Function(out + "\nreturn pack_p2_b_questions;")();
if (itemsAfter.length !== itemsBefore.length) { console.error("PARSE FAIL count mismatch"); process.exit(1); }
for (const s of spec) {
  const it = itemsAfter.find((x) => x.QuestionID === s.qid);
  if (!it) { console.error("missing " + s.qid + " after apply"); process.exit(1); }
  if (it[s.field] !== s.new_text) { console.error("field not applied for " + s.qid + "." + s.field); process.exit(1); }
}
fs.writeFileSync(fp, out);
console.log("Applied " + spec.length + " field replacements across " + Object.keys(byQid).length + " items; parse OK " + itemsAfter.length);
