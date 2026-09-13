const fs = require('fs');
let s = fs.readFileSync('scripts/tier3_wave11b.js', 'utf8');
// BC-112: choice A 412/1,727 -> 446/1,761
const oldA = s.match(/"A": "EOQ 1,549 units; safety stock 412 units; ROP 1,727 units[^"]*"/);
console.log('OLD 112A: ' + (oldA ? oldA[0].substring(0, 80) : 'NOT FOUND'));
if (oldA) {
  s = s.replace(oldA[0], '"A": "EOQ 1,549 units; safety stock 446 units; ROP 1,761 units — independent-demand math with both variabilities"');
}
// BC-112 EC: clean the repair note; correct numbers 446/1,761
const oldEC = s.match(/"ExplanationCorrect": "EOQ =[^"]*?see correction note\."/);
console.log('OLD 112EC repair note present: ' + !!oldEC);
if (oldEC) {
  s = s.replace(oldEC[0], '"ExplanationCorrect": "EOQ = sqrt(2x48,000x100/4) = sqrt(2,400,000) = 1,549.19, about 1,549 units. Safety stock = 1.65 x sqrt(10x400 + 131.5-squared-x4) = 1.65 x sqrt(4,000 + 69,169) = 1.65 x 270.50 = 446.32, about 446 units. ROP = 10x131.5 + 446 = 1,315 + 446 = 1,761 units. Zero-safety-stock EOQ (option B) confuses lot-sizing certainty with demand certainty. Single-annual-order (option C: 48,000 units) minimizes ordering cost ($100) while maximizing carrying cost (24,000 average units x $4 = $96,000). Lead-time-only ROP (option D: 1,315) drops safety stock as double counting — EOQ sizes lots, safety stock covers variability; different jobs, both required. Business interpretation: let theory choose specification (through-origin where zero-means-zero for rates; full variance pooling for safety stock), then estimate within it. Common trap: fitting all data on completeness principle."');
}
fs.writeFileSync('scripts/tier3_wave11b.js', s, 'utf8');
console.log('done');