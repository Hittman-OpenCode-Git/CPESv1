const fs = require("fs");
const path = require("path");
const ROOT = "C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026";
const pack = process.argv[2];
const qid = process.argv[3];
const fields = process.argv.slice(4);
const letter = pack.replace(/pack_p2_/, "").replace(/.js$/, "");
const src = fs.readFileSync(path.join(ROOT, "p2", "pack_p2_" + letter + ".js"), "utf8");
const items = new Function(src + "\nreturn pack_p2_" + letter + "_questions;")();
const it = items.find((x) => x.QuestionID === qid);
if (!it) { console.error("not found", qid); process.exit(1); }
console.log("QuestionID:", it.QuestionID);
console.log("CorrectChoice:", it.CorrectChoice);
console.log("CalculationItem:", it.CalculationItem);
for (const f of fields) {
  const v = it[f];
  if (f.startsWith("Choices")) {
    console.log(f + ": " + JSON.stringify(v));
  } else if (Array.isArray(v)) {
    console.log(f + " (" + v.length + "): " + JSON.stringify(v));
  } else {
    console.log(f + " (" + (v ? v.length : 0) + "): " + JSON.stringify(v));
  }
}
