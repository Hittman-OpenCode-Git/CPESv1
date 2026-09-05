const fs = require("fs");
const items = JSON.parse(fs.readFileSync(".commandcode/scratchpad/p2d_batch1_items.json", "utf8"));
const bad = [];
for (const it of items) {
  const cc = it.CorrectChoice;
  const ds = it.DifficultyScore;
  const cl = it.CognitiveLevel;
  if (cl === "Evaluate" && ds < 4) bad.push(it.QuestionID + " Evaluate DS" + ds);
  if (cl === "Analyze" && (ds < 3 || ds > 4)) bad.push(it.QuestionID + " Analyze DS" + ds);
  if (cl === "Apply" && (ds < 2 || ds > 4)) bad.push(it.QuestionID + " Apply DS" + ds);
  if ((cl === "Remember" || cl === "Understand") && ds > 3) bad.push(it.QuestionID + " RU DS" + ds);
  if (it["ExplanationWrong" + cc] !== "") bad.push(it.QuestionID + " DL-008 EW[" + cc + "] non-empty");
  for (const L of ["A", "B", "C", "D"]) {
    if (L === cc) continue;
    const e = it["ExplanationWrong" + L];
    if (typeof e !== "string" || e.trim().length < 50) bad.push(it.QuestionID + " DL-026 " + L + " len " + (e ? e.length : 0));
  }
  if (it.Part2OnlyFlag !== true) bad.push(it.QuestionID + " flag");
  if (!it.schema_version || it.schema_version !== "1.1") bad.push(it.QuestionID + " schema_version");
  if (!Array.isArray(it.source_ids) || it.source_ids.length === 0) bad.push(it.QuestionID + " source_ids");
  if (it.source_status !== "RESOLVED") bad.push(it.QuestionID + " source_status");
  if (it.hold_reason !== "") bad.push(it.QuestionID + " hold_reason");
  const diKeys = Object.keys(it.distractor_intent || {}).sort().join(",");
  const nonCC = ["A", "B", "C", "D"].filter(L => L !== cc).sort().join(",");
  if (diKeys !== nonCC) bad.push(it.QuestionID + " di keys " + diKeys + " != " + nonCC);
  const tiers = Object.values(it.distractor_intent || {}).map(d => d.tier_candidate).sort().join(",");
  if (tiers !== "1,2,3") bad.push(it.QuestionID + " di tiers " + tiers);
  const un = it.uniqueness_note || "";
  for (const L of ["A", "B", "C", "D"]) {
    if (L === cc) continue;
    if (!new RegExp("\\b" + L + "\\b").test(un)) bad.push(it.QuestionID + " uniqueness missing " + L);
  }
}
console.log(bad.length ? bad.join("\n") : "ALL STRUCTURAL + V1.1 + COGNITIVE GATES PASS");
process.exit(bad.length ? 1 : 0);
