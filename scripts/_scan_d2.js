const fs = require("fs");
const src = fs.readFileSync("C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/p2/pack_p2_d.js", "utf8");
const items = new Function(src + "\nreturn pack_p2_d_questions;")();
// assertion regexes: capture a concluded answer letter
const patterns = [
  /(?:the correct answer is|the answer is|the correct choice is|is the correct option|the correct option is|the correct decision is|the correct letter is)\s+([A-D])\b/i,
  /([A-D])\s+is the correct\b/i,
  /([A-D])\s+is correct\b/i,
  /correct answer:\s*([A-D])\b/i,
  /(?:therefore|thus),?\s+(?:option\s+)?([A-D])\s+(?:is correct|is the correct|is right)/i,
  /the correct answer is ([A-D])\./i,
  /\b([A-D])\.\s+.*\b(correct|right)\b/i,
];
function ecArgued(ec) {
  let last = null, lastIdx = -1;
  for (const re of patterns) {
    let m;
    const g = new RegExp(re.source, "gi");
    while ((m = g.exec(ec)) !== null) {
      if (m.index > lastIdx) { lastIdx = m.index; last = m[1].toUpperCase(); }
    }
  }
  return last;
}
let n = 0;
for (const it of items) {
  if (it.question_state !== "Unprocessed") continue;
  const cc = it.CorrectChoice;
  const ec = it.ExplanationCorrect || "";
  const a = ecArgued(ec);
  if (a && a !== cc) {
    n++;
    // snippet around last match
    const r = new RegExp(patterns.find(r0=>new RegExp(r0.source,'i').test(ec)).source, "i");
    const m = ec.match(r);
    const at = m ? ec.indexOf(m[0]) : ec.length-40;
    const snip = ec.slice(Math.max(0,at-20), at+50).replace(/\s+/g," ");
    console.log(it.QuestionID + " CC=" + cc + " EC-argued=" + a + " :: " + snip.substring(0,70));
  }
}
console.log("total coherence defects: " + n);
