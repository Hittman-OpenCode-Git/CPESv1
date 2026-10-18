const fs = require("fs");
const src = fs.readFileSync("C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/p2/pack_p2_b.js", "utf8");
const items = new Function(src + "\nreturn pack_p2_b_questions;")();
for (const qid of ["P2-B-300","P2-B-330"]) {
  const it = items.find(x => x.QuestionID === qid);
  console.log("=== " + qid + " ===");
  console.log("question_state:", it.question_state);
  console.log("AuthoringHistory:", JSON.stringify(it.AuthoringHistory));
  console.log("VerifiedChecks:", JSON.stringify(it.VerifiedChecks));
  console.log("metadata keys:", Object.keys(it).join(","));
}
