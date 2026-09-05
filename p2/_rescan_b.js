const fs = require("fs");
const src = fs.readFileSync("C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/p2/pack_p2_b.js", "utf8");
const items = new Function(src + "\nreturn pack_p2_b_questions;")();
const TEMPLATE = "the correct analysis under the governing principle shows why this option is not the right conclusion, and the correct answer explanation details the proper approach";
const EW = ["ExplanationWrongA","ExplanationWrongB","ExplanationWrongC","ExplanationWrongD"];
let fails = 0;
for (const it of items) {
  for (const f of EW) {
    if (it[f] && it[f].includes(TEMPLATE)) { console.log("FAIL " + it.QuestionID + " " + f + " template"); fails++; }
  }
  const ec = it.ExplanationCorrect || "";
  const m = ec.match(/Correct answer:\s*([A-D])/);
  if (m && m[1] !== it.CorrectChoice) { console.log("FAIL " + it.QuestionID + " EC letter " + m[1] + " != CC " + it.CorrectChoice); fails++; }
  if (it.QuestionID === "P2-B-330" && /so option A \u2014 which/.test(ec)) { console.log("FAIL B-330 stale EC"); fails++; }
  if (it.QuestionID === "P2-B-337" && (it.Stem||"").includes("currently trades at a premium")) { console.log("FAIL B-337 stem premium"); fails++; }
  if (it.QuestionID === "P2-B-349" && /A \(9\.90%\) is closest/.test(ec)) { console.log("FAIL B-349 stale EC"); fails++; }
  if (it.QuestionID === "P2-B-386" && (/3\.07/.test(ec) || /3\.07/.test(JSON.stringify(it.Choices)))) { console.log("FAIL B-386 3.07"); fails++; }
  if (it.QuestionID === "P2-B-366" && (it.Choices.A.includes("1,127,451") || it.Choices.D.includes("1,127,451"))) { console.log("FAIL B-366 1,127,451"); fails++; }
  if (it.QuestionID === "P2-B-399" && it.Choices.A.includes("$51,000")) { console.log("FAIL B-399 A 51000"); fails++; }
  if (["P2-B-311","P2-B-319"].includes(it.QuestionID) && !it.ExplanationWrongA.startsWith("Choice A")) { console.log("FAIL " + it.QuestionID + " EWA label"); fails++; }
  if (it.QuestionID === "P2-B-353" && it.ExplanationWrongA.startsWith("Choice A reflects")) { console.log("FAIL B-353 template"); fails++; }
  // EC↔CC coherence: correct-choice's EW must be empty string
  const cc = it.CorrectChoice;
  const ccEW = it["ExplanationWrong" + cc];
  if (ccEW !== "") { console.log("FAIL " + it.QuestionID + " EW[" + cc + "] not empty"); fails++; }
  // Spot-check recompute presence only on the arithmetic items that were repaired
  if (["P2-B-366","P2-B-386","P2-B-399"].includes(it.QuestionID) && !/Recomputed independently/.test(ec)) { console.log("FAIL " + it.QuestionID + " calc missing recompute"); fails++; }
}
console.log("B-RESCAN FAIL count = " + fails + " (items=" + items.length + ")");
