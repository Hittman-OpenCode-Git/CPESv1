const fs = require("fs");
function load(letter) {
  const src = fs.readFileSync("C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/p2/pack_p2_" + letter + ".js", "utf8");
  const items = new Function(src + "\nreturn pack_p2_" + letter + "_questions;")();
  return items;
}
const counts = {};
for (const L of ["a","b","c","d","e","f"]) {
  const items = load(L);
  const c = {}; items.forEach(x => { c[x.question_state] = (c[x.question_state]||0)+1; });
  counts[L.toUpperCase()] = { total: items.length, states: c };
}
console.log(JSON.stringify(counts, null, 2));
// F-specific defect signature scan
const f = load("f");
const TEMPLATE = "the correct analysis under the governing principle shows why this option is not the right conclusion";
let fFails = [];
for (const it of f) {
  for (const ew of ["ExplanationWrongA","ExplanationWrongB","ExplanationWrongC","ExplanationWrongD"]) {
    if (it[ew] && it[ew].includes(TEMPLATE)) fFails.push(it.QuestionID+" "+ew+" template");
  }
  const ec = it.ExplanationCorrect||"";
  const m = ec.match(/Correct answer:\s*([A-D])/);
  if (m && m[1]!==it.CorrectChoice) fFails.push(it.QuestionID+" EC letter "+m[1]+"!=CC "+it.CorrectChoice);
  if (ec.includes("(F.5 governance)")) fFails.push(it.QuestionID+" meta-text");
  if (ec.includes("SEC Regulation G") || (it.Authorities||[]).includes("SEC Regulation G")) fFails.push(it.QuestionID+" SEC Reg G");
}
console.log("F defect FAILs:", fFails.length, JSON.stringify(fFails));
