const fs = require("fs");
const ROOT = "C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026";
const fp = ROOT + "/p2/pack_p2_b.js";
const ops = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const src = fs.readFileSync(fp, "utf8");
const items = new Function(src + "\nreturn pack_p2_b_questions;")();

const edits = [];
for (const op of ops) {
  const it = items.find(x => x.QuestionID === op.qid);
  if (!it) { console.error("UNKNOWN QID: " + op.qid); process.exit(1); }
  if (it.question_state === "Certified") { console.error("ABORT: " + op.qid + " already Certified"); process.exit(1); }
  const count = src.split(op.find).length - 1;
  if (count !== 1) { console.error("ABORT: " + op.qid + " find-count=" + count + " for: " + op.find.slice(0, 60)); process.exit(1); }
  const start = src.indexOf(op.find);
  edits.push({ find: op.find, replace: op.replace, start });
}
edits.sort((a, b) => b.start - a.start);
let out = src;
for (const e of edits) out = out.slice(0, e.start) + e.replace + out.slice(e.start + e.find.length);

const itemsAfter = new Function(out + "\nreturn pack_p2_b_questions;")();
if (itemsAfter.length !== items.length) { console.error("PARSE FAIL count=" + itemsAfter.length); process.exit(1); }
for (const op of ops) {
  const it = itemsAfter.find(x => x.QuestionID === op.qid);
  if (!it) { console.error("lost " + op.qid); process.exit(1); }
}
fs.writeFileSync(fp, out);
console.log("Applied " + ops.length + " substring fixes. Re-parsed OK " + itemsAfter.length + " items.");
