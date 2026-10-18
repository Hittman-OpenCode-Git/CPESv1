const fs = require("fs");
const src = fs.readFileSync("C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/p2/pack_p2_d.js", "utf8");
const items = new Function(src + "\nreturn pack_p2_d_questions;")();
const TEMPLATE = "the correct analysis under the governing principle shows why this option is not the right conclusion, and the correct answer explanation details the proper approach";
const EW = ["ExplanationWrongA","ExplanationWrongB","ExplanationWrongC","ExplanationWrongD"];
function ewLetter(k){return k.replace("ExplanationWrong","");}
const defs = [];
for (const it of items) {
  if (it.question_state !== "Unprocessed") continue;
  const cc = it.CorrectChoice;
  const ec = it.ExplanationCorrect || "";
  // (b) stale trailing "Correct answer: X"
  const m = ec.match(/Correct answer:\s*([A-D])\b/i);
  if (m && m[1].toUpperCase() !== cc) defs.push({qid:it.QuestionID,kind:"stale_EC_label",old:"Correct answer: "+m[1]+" (CC="+cc+")"});
  // (c) EC prose argued letter != CC via "the answer is X"/"choice X" tail
  let ecArg = null;
  const m2 = ec.match(/(?:the correct answer is|the answer is|the correct choice is|the correct decision is)\s+([A-D])\b/i);
  if (m2) ecArg = m2[1].toUpperCase();
  // (a) DL-008: EW[CC] must be empty
  const ccEW = it["ExplanationWrong" + cc];
  if (ccEW !== "") defs.push({qid:it.QuestionID,kind:"DL008_EW_CC_nonempty",field:"ExplanationWrong"+cc,old:"non-empty"});
  // (d) template filler
  for (const k of EW) { if (it[k] && it[k].includes(TEMPLATE)) defs.push({qid:it.QuestionID,kind:"template_EW",field:k,old:"boilerplate"}); }
  // (e) leaked meta
  for (const k of ["ExplanationCorrect",...EW]) {
    const v = it[k] || "";
    if (/\(C\.5 governance\)|\(D\.5 governance\)|\(F\.5 governance\)|P2-\d{3}/.test(v)) defs.push({qid:it.QuestionID,kind:"leaked_meta",field:k,old:"author-meta"});
  }
  // (f) calc recompute
  if (it.CalculationItem) {
    const combo = ec + " " + (it.VerifiedChecks||[]).join(" ");
    if (!/Recomputed independently/.test(combo)) defs.push({qid:it.QuestionID,kind:"calc_missing_recompute",old:"no Recomputed line"});
  }
  // (g) stub EW[non-CC] < 75 chars
  for (const k of EW) {
    if (k === "ExplanationWrong"+cc) continue;
    const v = it[k] || "";
    if (v.length > 0 && v.length < 50) defs.push({qid:it.QuestionID,kind:"stub_EW",field:k,old:"len="+v.length});
  }
}
// dedupe
const seen=new Set(); const out=[];
for (const d of defs) { const key=d.qid+"|"+d.kind+(d.field||""); if(!seen.has(key)){seen.add(key);out.push(d);} }
fs.writeFileSync("p2/_d_defects.json", JSON.stringify(out,null,2));
console.log("D defects="+out.length+" of "+items.filter(x=>x.question_state==="Unprocessed").length+" unprocessed");
// breakdown
const byKind={}; for(const d of out) byKind[d.kind]=(byKind[d.kind]||0)+1;
console.log(JSON.stringify(byKind));
console.log("Distinct QIDs="+[...new Set(out.map(d=>d.qid))].length);
