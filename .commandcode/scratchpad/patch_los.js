// Patch TOPICS LOS assignments in generate_p2d_manifest.js to 6-per-LOS per batch.
const fs = require("fs");
const fp = __dirname + "/generate_p2d_manifest.js";
let src = fs.readFileSync(fp, "utf8");

// Batch 1 (indices 0..29): D.2 8->6 (-2), D.1 7->6 (-1), D.3 4->6 (+2), D.4 5->6 (+1)
// Swap LOS on topics that fit the target LOS:
//   P2-D-246 inherent-risk-register-screening: D.2 -> D.3 (risk register screening against appetite) fits D.3
//   P2-D-252 heat-map-prioritization-likelihood-severity: D.2 -> D.3 (heat map thresholds vs tolerance) fits D.3
//   P2-D-251 kri-leading-lagging-portfolio: D.2 -> D.4 (KRI selection as response monitoring) fits D.4
//   P2-D-275 risk-owner-accountability-remediation: D.1 -> D.2 (risk owner accountability is risk-assessment governance) fits D.2
const b1 = [
  ['"inherent-risk-register-screening", "D.2"', '"inherent-risk-register-screening", "D.3"'],
  ['"heat-map-prioritization-likelihood-severity", "D.2"', '"heat-map-prioritization-likelihood-severity", "D.3"'],
  ['"kri-leading-lagging-portfolio", "D.2"', '"kri-leading-lagging-portfolio", "D.4"'],
  ['"risk-owner-accountability-remediation", "D.1"', '"risk-owner-accountability-remediation", "D.2"']
];
// Batch 2 (indices 30..59): D.2 7->6 (-1), D.3 4->6 (+2), D.4 7->6 (-1)
//   P2-D-287 scenario-analysis-plausibility: D.2 -> D.3 (scenario plausibility bounds vs appetite) fits D.3
//   P2-D-301 supplier-concentration-single-source: D.4 -> D.3 (concentration headroom vs appetite) fits D.3
//   P2-D-277 operational-risk-loss-event-types: D.2 -> D.4 (loss event taxonomy feeds response selection) fits D.4
const b2 = [
  ['"scenario-analysis-plausibility", "D.2"', '"scenario-analysis-plausibility", "D.3"'],
  ['"supplier-concentration-single-source", "D.4"', '"supplier-concentration-single-source", "D.3"'],
  ['"operational-risk-loss-event-types", "D.2"', '"operational-risk-loss-event-types", "D.4"']
];
// Batch 3 (indices 60..89): same pattern
//   P2-D-317 scenario-stress-worst-case: D.2 -> D.3 (stress worst-case vs tolerance) fits D.3
//   P2-D-331 supply-chain-dual-sourcing: D.4 -> D.3 (dual-sourcing headroom vs appetite) fits D.3
//   P2-D-307 strategic-risk-external-driver: D.2 -> D.4 (external-driver response selection) fits D.4
const b3 = [
  ['"scenario-stress-worst-case", "D.2"', '"scenario-stress-worst-case", "D.3"'],
  ['"supply-chain-dual-sourcing", "D.4"', '"supply-chain-dual-sourcing", "D.3"'],
  ['"strategic-risk-external-driver", "D.2"', '"strategic-risk-external-driver", "D.4"']
];

for (const pair of [...b1, ...b2, ...b3]) {
  if (!src.includes(pair[0])) { console.error("NOT FOUND: " + pair[0]); process.exit(1); }
  src = src.replace(pair[0], pair[1]);
}
fs.writeFileSync(fp, src, "utf8");
console.log("Patched TOPICS LOS. Re-running generator...");
