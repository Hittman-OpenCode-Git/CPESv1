const c = require("./p2d_batch1_content.json");
const calcQids = ["P2-D-246", "P2-D-250", "P2-D-253", "P2-D-257", "P2-D-261", "P2-D-264", "P2-D-268", "P2-D-271", "P2-D-275"];
const idxOf = q => parseInt(q.split("-")[2], 10) - 246;
console.log("BOARD DECISION — truthful CalculationItem assessment for the 9 flagged slots:");
for (const q of calcQids) {
  const it = c[idxOf(q)];
  const stem = it.stem;
  const hasComputationVerb = /\b(compute|calculate|what is|how much|net benefit|score|total expected|expected loss|var|rorac|percentage|percent|earn|cost)\b/i.test(stem);
  const asksForNumber = /(what is|how much|compute|calculate|net benefit|total|expected annual|the dollar amount|the amount)/i.test(stem);
  const verdict = (asksForNumber && hasComputationVerb) ? "TRUE calc (requires arithmetic)" : "conceptual (flag=false)";
  console.log(`\n${q} [${verdict}]`);
  console.log(`  stem: ${stem.slice(0, 140)}...`);
}
