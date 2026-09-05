const fs = require("fs");
const path = require("path");
const DIR = __dirname;
const contentFile = path.join(DIR, "p2d_batch1_content.json");
const items = JSON.parse(fs.readFileSync(contentFile, "utf8"));

// Item 10 (P2-D-255) cc=D — residual EL. Relocation moved correct figure to D.
items[9].ec = "Residual expected loss applies the control effectiveness to the inherent expected loss. Inherent expected loss = 0.40 x $5,000,000 = $2,000,000. With 70% control effectiveness, the residual is the 30% of inherent exposure not covered by controls: $2,000,000 x (1 - 0.70) = $600,000. Recomputed: 0.40 x 5,000,000 = 2,000,000; 2,000,000 x 0.30 = 600,000. Option D states the correct answer, $600,000.";
items[9].ssk_conclusion = "The residual expected loss is $600,000, which is Option D.";

// Item 14 (P2-D-259) cc=D — insurance deductible. Correct: Program A at $870,000 (Option D after relocation).
items[13].ec = "Total expected annual cost = premium + expected retained loss (the deductible). Program A: $620,000 + $250,000 = $870,000. Program B: $410,000 + $500,000 = $910,000. Program A minimizes cost at $870,000. Recomputed: 620,000 + 250,000 = 870,000; 410,000 + 500,000 = 910,000. Option D states the correct answer.";
items[13].ssk_conclusion = "Program A at $870,000 minimizes total expected cost — Option D.";

// Item 23 (P2-D-268) cc=A — RORAC. Correct: Unit Y at 30.0% (Option A after relocation).
items[22].ec = "Return on risk-adjusted capital = profit / risk capital. Unit X: $15M / $75M = 20.0%. Unit Y: $12M / $40M = 30.0%. Unit Y ranks higher because it earns more return per dollar of risk capital. Recomputed: 15/75 = 0.20; 12/40 = 0.30. Option A states the correct answer. Absolute profit is not the ranking criterion; the framework rewards capital efficiency relative to risk taken.";
items[22].ssk_conclusion = "Unit Y at 30.0% ranks higher — Option A.";

fs.writeFileSync(contentFile, JSON.stringify(items, null, 2), "utf8");
console.log("Fixed EC declarations for items 10, 14, 23.");
