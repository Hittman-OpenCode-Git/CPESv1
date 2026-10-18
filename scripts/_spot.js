const fs = require("fs");
const src = fs.readFileSync("C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/p2/pack_p2_b.js", "utf8");
const items = new Function(src + "\nreturn pack_p2_b_questions;")();
function head(v, n=55) { return String(v).slice(0, n); }
for (const qid of ["P2-B-311","P2-B-319","P2-B-386","P2-B-366","P2-B-399"]) {
  const it = items.find(x => x.QuestionID === qid);
  console.log("=== " + qid + " CC=" + it.CorrectChoice + " ===");
  console.log("  A: " + JSON.stringify(it.Choices.A));
  console.log("  B: " + JSON.stringify(it.Choices.B));
  console.log("  D: " + JSON.stringify(it.Choices.D));
  if (qid==="P2-B-311"||qid==="P2-B-319") console.log("  EWA head: " + head(it.ExplanationWrongA));
}
const b337 = items.find(x=>x.QuestionID==='P2-B-337');
console.log("=== P2-B-337 stem head: " + head(b337.Stem, 120));
