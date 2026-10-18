const fs = require("fs");
const ROOT = "C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026";
const src = fs.readFileSync(ROOT + "/p2/pack_p2_b.js", "utf8");
const items = new Function(src + "\nreturn pack_p2_b_questions;")();
function show(qid, fields) {
  const it = items.find(x => x.QuestionID === qid);
  if (!it) { console.log(qid + ": NOT FOUND"); return; }
  console.log("=== " + qid + " (CC=" + it.CorrectChoice + ") ===");
  for (const f of fields) {
    const v = it[f];
    const txt = Array.isArray(v) ? v.join(" | ") : (v === undefined ? "<undefined>" : String(v));
    console.log("  " + f + " (" + txt.length + "): " + txt.slice(-140));
  }
}
show("P2-B-311", ["ExplanationCorrect", "ExplanationWrongA"]);
show("P2-B-319", ["ExplanationCorrect", "ExplanationWrongA"]);
show("P2-B-325", ["ExplanationCorrect"]);
show("P2-B-330", ["ExplanationCorrect"]);
show("P2-B-337", ["Stem"]);
show("P2-B-338", ["ExplanationCorrect"]);
show("P2-B-349", ["ExplanationCorrect"]);
show("P2-B-353", ["ExplanationWrongA"]);
show("P2-B-397", ["ExplanationWrongA", "ExplanationWrongB"]);
show("P2-B-366", ["Choices", "ExplanationCorrect"]);
show("P2-B-386", ["Choices", "ExplanationWrongA"]);
show("P2-B-399", ["Choices", "ExplanationCorrect"]);
