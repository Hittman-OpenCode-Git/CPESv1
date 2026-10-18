const fs = require("fs");
function load(L){const s=fs.readFileSync("C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/p2/pack_p2_"+L+".js","utf8");return new Function(s+"\nreturn pack_p2_"+L+"_questions;")();}
for (const L of ["b","d","f"]) {
  const items=load(L);
  const unproc=items.filter(x=>x.question_state==="Unprocessed").map(x=>x.QuestionID);
  const cert=items.filter(x=>x.question_state==="Certified").length;
  console.log("Pack "+L.toUpperCase()+": total="+items.length+" certified="+cert+" unprocessed="+unproc.length);
  console.log("  Unprocessed: " + (unproc.length? unproc.join(", ") : "(none)"));
  // batches
  const batches=items.filter(x=>x.question_state==="Certified").map(x=>x.certification_batch);
  const uniqB=[...new Set(batches)].sort();
  console.log("  certification_batches: " + uniqB.join(", "));
}
