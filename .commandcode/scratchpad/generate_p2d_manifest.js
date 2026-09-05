/**
 * generate_p2d_manifest.js — Deterministically builds p2d_sprint_manifest.json with
 * EXACT S121 mix targets per 30-item batch (coherent cl/diff pairing computed by
 * compute_patterns.js). Topic/LOS assignments preserved.
 */
const fs = require("fs");

// 90 topics with LOS (6 per LOS per batch). Ordered by batch.
const TOPICS = [
  // Batch 1 (P2-D-246..275)
  ["inherent-risk-register-screening", "D.3"], ["coso-erm-performance-component", "D.1"],
  ["expected-loss-pd-ead-lgd", "D.2"], ["risk-appetite-board-statement", "D.3"],
  ["risk-response-avoid-exit-decision", "D.4"], ["kri-leading-lagging-portfolio", "D.4"],
  ["heat-map-prioritization-likelihood-severity", "D.3"], ["three-lines-defense-role", "D.1"],
  ["appetite-tolerance-capacity-limit", "D.3"], ["residual-risk-control-strength", "D.4"],
  ["scenario-stress-testing-methodology", "D.2"], ["erm-strategy-objective-alignment", "D.5"],
  ["risk-register-update-cadence", "D.1"], ["insurance-deductible-tradeoff", "D.4"],
  ["enterprise-risk-aggregation-diversification", "D.5"], ["compliance-risk-regulation-mapping", "D.2"],
  ["var-parametric-confidence", "D.2"], ["board-risk-oversight-escalation", "D.1"],
  ["risk-response-share-via-insurance", "D.4"], ["risk-culture-tone-at-top", "D.1"],
  ["kri-threshold-trigger-response", "D.5"], ["cyber-risk-operational-classification", "D.2"],
  ["risk-adjusted-return-capital-allocation", "D.5"], ["fraud-triangle-pressure-opportunity", "D.1"],
  ["supply-chain-concentration-mitigation", "D.4"], ["risk-appetite-quantitative-threshold", "D.3"],
  ["emerging-risk-scanning-horizon", "D.5"], ["residual-risk-acceptance-decision", "D.3"],
  ["stress-test-capital-planning", "D.5"], ["risk-owner-accountability-remediation", "D.2"],
  // Batch 2 (P2-D-276..305)
  ["coso-erm-governance-culture-component", "D.1"], ["operational-risk-loss-event-types", "D.4"],
  ["expected-loss-two-risks-combined", "D.2"], ["risk-tolerance-band-application", "D.3"],
  ["risk-response-reduce-control-design", "D.4"], ["inherent-vs-residual-assessment", "D.2"],
  ["risk-score-multiplication", "D.2"], ["erm-information-communication-reporting", "D.1"],
  ["risk-capacity-financial-bounds", "D.3"], ["risk-response-accept-continue", "D.4"],
  ["residual-loss-control-effectiveness-calc", "D.2"], ["scenario-analysis-plausibility", "D.3"],
  ["strategy-risk-integration", "D.5"], ["risk-register-risk-owner", "D.1"],
  ["insurance-retention-cost-comparison", "D.4"], ["risk-correlation-portfolio-diversification", "D.5"],
  ["financial-risk-market-credit-liquidity", "D.2"], ["value-at-risk-portfolio-margin", "D.2"],
  ["board-committee-erm-oversight", "D.1"], ["hedging-futures-risk-transfer", "D.4"],
  ["risk-culture-incentive-alignment", "D.1"], ["kri-escalation-escalation-protocol", "D.5"],
  ["cyber-risk-transfer-insurance", "D.4"], ["risk-adjusted-performance-evaluate-unit", "D.5"],
  ["fraud-triangle-rationalization", "D.1"], ["supplier-concentration-single-source", "D.3"],
  ["appetite-statement-capital-metric", "D.3"], ["emerging-risk-signal-detection", "D.5"],
  ["residual-risk-appetite-reassessment", "D.3"], ["stress-test-liquidity-scenario", "D.5"],
  // Batch 3 (P2-D-306..335)
  ["coso-erm-strategy-objective-setting", "D.1"], ["strategic-risk-external-driver", "D.4"],
  ["expected-loss-multi-outcome-weighted", "D.2"], ["risk-tolerance-vs-appetite", "D.3"],
  ["risk-response-avoid-discontinue-line", "D.4"], ["risk-identification-methods", "D.2"],
  ["risk-score-threshold-applied", "D.2"], ["coso-erm-review-revision-substantial-change", "D.1"],
  ["risk-capacity-vs-appetite", "D.3"], ["risk-response-share-joint-venture", "D.4"],
  ["residual-loss-mitigation-net", "D.2"], ["scenario-stress-worst-case", "D.3"],
  ["erm-performance-strategy-alignment", "D.5"], ["risk-register-likelihood-impact", "D.1"],
  ["deductible-vs-premium-tradeoff", "D.4"], ["portfolio-risk-concentration-limit", "D.5"],
  ["operational-risk-control-failure", "D.2"], ["var-parametric-daily-loss", "D.2"],
  ["audit-committee-erm-separation", "D.1"], ["hedging-vs-insurance-choice", "D.4"],
  ["risk-culture-whistleblower", "D.1"], ["kri-selection-measurability", "D.5"],
  ["insurance-transfer-expected-value", "D.4"], ["risk-adjusted-capital-ranking", "D.5"],
  ["fraud-triangle-opportunity-control", "D.1"], ["supply-chain-dual-sourcing", "D.3"],
  ["appetite-tolerance-capacity-consistency", "D.3"], ["emerging-risk-review-routing", "D.5"],
  ["residual-risk-tolerance-test", "D.3"], ["stress-test-recovery-plan", "D.5"]
];

// Exact coherent patterns (computed by compute_patterns.js)
const CL_SEQ = ["Remember","Remember","Remember","Understand","Understand","Understand","Understand","Understand","Understand","Apply","Apply","Apply","Apply","Apply","Apply","Apply","Apply","Apply","Apply","Apply","Apply","Analyze","Analyze","Analyze","Analyze","Analyze","Analyze","Evaluate","Evaluate","Evaluate"];
const DIFF_SEQ = ["Moderate","Moderate","Moderate","Moderate-Easy","Moderate","Easy","Easy","Easy","Easy","Difficult","Difficult","Difficult","Moderate-Easy","Moderate","Difficult","Moderate-Easy","Moderate","Difficult","Moderate-Easy","Moderate-Easy","Moderate-Easy","Moderate","Difficult","Moderate","Difficult","Moderate","Difficult","Very Difficult","Very Difficult","Very Difficult"];
const CC_SEQ = ["B","C","A","B","C","D","A","B","C","D","A","B","C","D","A","B","C","D","A","B","C","D","A","B","C","D","A","B","C","D"];
const CALC_IDX = [0, 4, 7, 11, 15, 18, 22, 25, 29];

const DS = { "Easy": 1, "Moderate-Easy": 2, "Moderate": 3, "Difficult": 4, "Very Difficult": 5 };
const CL_DIFF_OK = {
  "Remember": ["Easy", "Moderate-Easy", "Moderate"],
  "Understand": ["Easy", "Moderate-Easy", "Moderate"],
  "Apply": ["Moderate-Easy", "Moderate", "Difficult"],
  "Analyze": ["Moderate", "Difficult"],
  "Evaluate": ["Difficult", "Very Difficult"]
};

function count(arr, key) { const c = {}; for (const x of arr) c[x[key]] = (c[x[key]] || 0) + 1; return c; }

function build() {
  const batches = [];
  for (let b = 0; b < 3; b++) {
    const slots = [];
    const base = 246 + b * 30;
    for (let i = 0; i < 30; i++) {
      const n = base + i;
      const [topic, los] = TOPICS[b * 30 + i];
      const cl = CL_SEQ[i];
      const diff = DIFF_SEQ[i];
      if (!CL_DIFF_OK[cl].includes(diff)) { console.error(`incoherent ${b}-${i}`); process.exit(1); }
      slots.push({
        qid: "P2-D-" + n,
        topic,
        los,
        difficulty: diff,
        ds: DS[diff],
        cl,
        cc: CC_SEQ[i],
        calc: CALC_IDX.includes(i)
      });
    }
    const d = count(slots, "difficulty"), c = count(slots, "cl"), cc = count(slots, "cc");
    const calcT = slots.filter(s => s.calc).length;
    const los = count(slots, "los");
    let streak = 1, maxStreak = 1;
    for (let i = 1; i < 30; i++) { if (slots[i].cc === slots[i-1].cc) { streak++; if (streak > maxStreak) maxStreak = streak; } else streak = 1; }
    const ok = Object.entries({ "Easy": 4, "Moderate-Easy": 6, "Moderate": 9, "Difficult": 8, "Very Difficult": 3 }).every(([k, v]) => d[k] === v) &&
      Object.entries({ "Remember": 3, "Understand": 6, "Apply": 12, "Analyze": 6, "Evaluate": 3 }).every(([k, v]) => c[k] === v) &&
      Object.entries({ "A": 7, "B": 8, "C": 8, "D": 7 }).every(([k, v]) => cc[k] === v) &&
      calcT === 9 && Object.keys(los).length === 5 && Object.values(los).every(v => v === 6) && maxStreak <= 2;
    if (!ok) { console.error(`batch ${b+1} FAIL: ${JSON.stringify({d, c, cc, calcT, los, maxStreak})}`); process.exit(1); }
    console.log(`batch ${b+1} OK: diff ${JSON.stringify(d)} cog ${JSON.stringify(c)} cc ${JSON.stringify(cc)} calc ${calcT} streak ${maxStreak}`);
    batches.push({ batch: b + 1, staging_file: "p2d_batch" + (b + 1) + "_items.json", qids: slots.map(s => s.qid), slots });
  }
  return {
    sprint: "P2-D 3x30 Sprint (P2-D-246..335)",
    schema: "P2_SCHEMA_STANDARD.md v1.1",
    question_state: "Unprocessed",
    domain: "Risk Management",
    stakeholder_cast: {
      controller: "Mariela Hoffmann", cfo: "Adaeze Onuorah", segment_analyst: "Priya Ramaswamy",
      credit_analyst: "Lena Fischer", treasurer: "Maya Caldwell", pm: "Naomi Castellanos",
      entity_prefix: ["Flash Manufacturing", "Flash Capital", "Flash Industrial", "Flash Logistics", "Flash Holdings"]
    },
    source_ids_authority: "COSO ERM 2017",
    formula_ids: { "RM-01": "Expected Loss = Probability x Impact", "RM-02": "Risk Score = Likelihood x Severity", "RM-03": "Value at Risk (parametric)" },
    batches
  };
}

const manifest = build();
fs.writeFileSync("./p2d_sprint_manifest.json", JSON.stringify(manifest, null, 2), "utf8");
console.log("\nManifest written (exact-target).");
