const fs = require("fs");
const src = fs.readFileSync("C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/p2/pack_p2_f.js", "utf8");
const items = new Function(src + "\nreturn pack_p2_f_questions;")();
for (const qid of ["P2-F-269","P2-F-283","P2-F-307","P2-F-405"]) {
  const it = items.find(x => x.QuestionID === qid);
  console.log("=== " + qid + " (CC=" + it.CorrectChoice + ") ===");
  console.log("Authorities:", JSON.stringify(it.Authorities));
  console.log("source_ids:", JSON.stringify(it.source_ids));
  console.log("source_support_for_key.source_id:", JSON.stringify(it.source_support_for_key && it.source_support_for_key.source_id));
  console.log("EWB:", JSON.stringify(it.ExplanationWrongB));
  console.log("EWC:", JSON.stringify(it.ExplanationWrongC));
  console.log("EWD:", JSON.stringify(it.ExplanationWrongD));
  console.log("EC:", JSON.stringify(it.ExplanationCorrect));
  console.log();
}
