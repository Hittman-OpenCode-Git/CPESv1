const fs = require("fs");
const path = require("path");
const DIR = __dirname;
const contentFile = path.join(DIR, "p2d_batch1_content.json");
const items = JSON.parse(fs.readFileSync(contentFile, "utf8"));

// P2-D-257 (item 11) cc=B — Choice D: remove "never"
items[11].choices.D = "Risk appetite is applied only at the individual-transaction level, not at the portfolio level";
// Update the associated EW.D to match the reworded choice (no forbidden term, still references Option D)
items[11].ew.D = "Option D is wrong because appetite cascades from the enterprise level to business units and portfolios; applying it only at the transaction level ignores the portfolio view that prevents risk concentration across the organization.";

// P2-D-263 (item 17) cc=D — Choice C: remove "always"
items[17].choices.C = "Escalation is unnecessary because management is best positioned to judge its own risk-taking";
// EW.C already references Option C and has no forbidden term — verify
if (/always|never|impossible|all of the above|none of the above/i.test(items[17].ew.C)) {
  console.error("item 17 ew.C still has forbidden term");
  process.exit(1);
}

fs.writeFileSync(contentFile, JSON.stringify(items, null, 2), "utf8");
console.log("Fixed forbidden terms in P2-D-257 Choice D and P2-D-263 Choice C.");
