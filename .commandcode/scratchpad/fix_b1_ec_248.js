const fs = require("fs");
const path = require("path");
const DIR = __dirname;
const contentFile = path.join(DIR, "p2d_batch1_content.json");
const items = JSON.parse(fs.readFileSync(contentFile, "utf8"));

// Fix P2-D-248 (item 3) EC to be consistent with CC=A
items[2].ec = "Under COSO ERM 2017 Performance (risk assessment), Expected Loss = Probability x Impact, and for credit risk the impact is Exposure x Loss-Given-Default. Recomputed: 0.04 x $1,200,000 = $48,000 expected exposure; then x 0.60 LGD = $28,800 expected loss. Option A states the correct answer, $28,800. $48,000 (Option B) is the expected exposure before applying LGD; $720,000 (Option C) is the conditional loss given default; $1,152,000 (Option D) inverts the probability.";
items[2].ssk_conclusion = "The correct expected loss is $28,800, which is Option A.";

fs.writeFileSync(contentFile, JSON.stringify(items, null, 2), "utf8");
console.log("Fixed item 3 (P2-D-248) EC to reference Option A as correct.");
