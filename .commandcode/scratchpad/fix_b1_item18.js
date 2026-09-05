const fs = require("fs");
const path = require("path");
const DIR = __dirname;
const contentFile = path.join(DIR, "p2d_batch1_content.json");
const items = JSON.parse(fs.readFileSync(contentFile, "utf8"));

// Item 18 (index 17), P2-D-263, cc=D. Choices: A=delegate-to-CRO, B=annual-only, C=self-assess, D=correct.
const it = items[17];
it.ew = {
  A: "Option A is wrong because delegating all risk decisions to the CRO abdicates board oversight. The board retains accountability for risk governance and must challenge management, not outsource the decision entirely to a single executive.",
  B: "Option B is wrong because limiting board risk information to the annual meeting would starve the board of timely material-risk updates. Escalation of material breaches requires timely information, not deferring all reporting to an annual cadence.",
  C: "Option C is wrong because management is a key risk owner, but the board's independent oversight exists precisely because management can be biased toward its own risk-taking. Escalation of material breaches provides the check the framework requires.",
  D: ""
};
it.di = {
  A: { misconception: "Delegates board risk decisions to the CRO", why_plausible: "The CRO is the risk expert, making delegation seem efficient", tier_candidate: 1 },
  B: { misconception: "Defers risk reporting to the annual meeting", why_plausible: "Annual reporting is familiar governance practice, but material breaches need timely escalation", tier_candidate: 2 },
  C: { misconception: "Trusts management self-assessment exclusively", why_plausible: "Management closeness to the business feels like an advantage, but independence is the point of board oversight", tier_candidate: 3 }
};
it.uniqueness = "Option A delegates to the CRO; Option B defers to annual reporting; Option C trusts management alone; Option D states the timely-information oversight principle.";
fs.writeFileSync(contentFile, JSON.stringify(items, null, 2), "utf8");
console.log("Item 18 (P2-D-263) ew/di/uniqueness fixed with correct letter references.");
