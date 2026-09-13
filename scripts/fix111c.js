const fs = require('fs');
let s = fs.readFileSync('scripts/tier3_wave11b.js', 'utf8');
const oldEC = s.match(/"ExplanationCorrect": "Joint benefit math: labor[^"]*?Common trap: fitting all data on completeness principle\."/);
console.log('found: ' + !!oldEC);
if (oldEC) {
  s = s.replace(oldEC[0], '"ExplanationCorrect": "EOQ = \u221a(2\u00d748,000\u00d7100/4) = \u221a2,400,000 = 1,549.19 \u2248 1,549 units. Safety stock = 1.65 \u00d7 \u221a(10\u00d7400 + 131.5\u00b2\u00d74) = 1.65 \u00d7 \u221a(4,000 + 69,169) = 1.65 \u00d7 270.50 = 446.32 \u2248 446 units. ROP = 10\u00d7131.5 + 446 = 1,315 + 446 = 1,761 units. Zero-safety-stock EOQ (option B) confuses lot-sizing certainty with demand certainty. Single-annual-order (option C: 48,000 units) minimizes ordering cost ($100) while maximizing carrying cost (24,000 average units \u00d7 $4 = $96,000). Lead-time-only ROP (option D: 1,315) drops safety stock as double counting — EOQ sizes lots, safety stock covers variability; different jobs, both required. Business interpretation: pool both demand and lead-time variances under the root (LT\u00d7\u03c3d\u00b2 + d\u00b2\u00d7\u03c3LT\u00b2) — omitting either understates safety stock. Common trap: single-source variability modeling."');
  fs.writeFileSync('scripts/tier3_wave11b.js', s, 'utf8');
}
console.log('done');