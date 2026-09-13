const fs = require('fs');
let s = fs.readFileSync('scripts/tier3_wave11b.js', 'utf8');
const oldA = s.match(/"A": "\$900,000 released[^"]*"/);
console.log('OLD A: ' + (oldA ? oldA[0].substring(0, 80) : 'NOT FOUND'));
if (oldA) {
  s = s.replace(oldA[0], '"A": "$480,000 released (DIO $140,000 + DSO $240,000 + DPO $100,000 at per-leg daily rates); unilateral DPO stretch without terms risks supply disruption that DIO/DSO gains cannot offset"');
}
const oldEC = s.match(/"ExplanationCorrect": "Cash released: DIO[^"]*?see correction note\."/);
console.log('OLD EC repair note present: ' + !!oldEC);
if (oldEC) {
  s = s.replace(oldEC[0], '"ExplanationCorrect": "Cash released: DIO -7 days at COGS daily rate $20,000 = $140,000 (inventory funds at cost); DSO -8 days at sales daily rate $30,000 = $240,000 (receivables fund at sales value); DPO +5 days at COGS rate $20,000 = $100,000 (payables fund purchases at cost). Total = $140,000 + $240,000 + $100,000 = $480,000 of permanently released cash (until growth re-traps it). Uniform-rate pricing (option B: 20 days at $30,000 = $600,000) misprices DIO/DPO legs at sales value. No-release claims (option C) deny that 20 fewer cycle days on $20,000-$30,000 daily flows free cash. Stacked-rate option D ($1,200,000 at $60,000 combined) double-counts days across legs with an invented rate. Business interpretation: price each CCC leg at its own daily flow (COGS for inventory/payables, sales for receivables) — and caveat DPO gains with supplier-terms risk. Common trap: uniform daily rates across heterogeneous legs."');
}
fs.writeFileSync('scripts/tier3_wave11b.js', s, 'utf8');
console.log('done');