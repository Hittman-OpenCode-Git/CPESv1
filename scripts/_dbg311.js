const fs = require("fs");
const src = fs.readFileSync("C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/p2/pack_p2_b.js", "utf8");
const idx = '"QuestionID": "P2-B-311"';
const i = src.indexOf(idx);
// count question_state occurrences and positions
const re = /"question_state"/g;
let m, pos = [];
while ((m = re.exec(src)) !== null) pos.push(m.index);
console.log("total question_state occurrences: " + pos.length);
// find which bracketed item B-311 is in: locate the object containing i
let open = -1, depth = 0, k = i;
for (; k >= 0; k--) { if (src[k] === "}") depth++; else if (src[k] === "{") { if (depth === 0) { open = k; break; } depth--; } }
let inStr=false, esc=false, close=-1, d2=0;
for (let m2 = open; m2 < src.length; m2++) {
  const c = src[m2];
  if (esc) { esc=false; continue; }
  if (c==="\\") { esc=true; continue; }
  if (inStr) { if (c==='"') inStr=false; continue; }
  if (c==='"') { inStr=true; continue; }
  if (c==="{") d2++; else if (c==="}") { d2--; if (d2===0) { close=m2; break; } }
}
const body = src.slice(open, close+1);
console.log("B-311 span chars:", body.length, "open@", open, "close@", close);
const qsInBody = (body.match(/"question_state"/g)||[]).length;
console.log("question_state within B-311 body:", qsInBody);
// show each occurrence's snippet
pos.forEach(p => { if (p >= open && p <= close) { console.log("  @"+p+":", JSON.stringify(src.slice(p, p+40))); } });
