// Verification only: parse each pack and compare Prompt fields directly (no Correct access).
const fs = require('fs');
function loadArray(p) {
  const src = fs.readFileSync(p, 'utf8');
  const expr = src.slice(src.indexOf('=') + 1).trim().replace(/;\s*$/, '');
  return new Function('return (' + expr + ')')();
}
const byId = {};
for (const f of ['case_pack_1_corrected.js', 'case_pack_2_corrected.js', 'case_pack_3_corrected.js']) {
  for (const c of loadArray('content/cases/' + f)) {
    for (const it of c.Items) byId[it.ItemID] = { prompt: it.Prompt, type: it.Type };
  }
}
const out = JSON.parse(fs.readFileSync('scripts/output/dl066_corrected_solutions.json', 'utf8'));
let bad = 0, checked = 0, skipped = 0;
for (const c of out) for (const it of c.items) {
  checked++;
  const src = byId[it.itemId];
  if (!src) { console.log('UNKNOWN', it.itemId); bad++; continue; }
  if (src.prompt !== it.prompt) { console.log('PROMPT MISMATCH', it.itemId); bad++; }
  if (src.type !== it.type) { console.log('TYPE MISMATCH', it.itemId); bad++; }
}
for (const id of ['CBQ4-A1-Q3']) if (byId[id]) skipped++;
console.log('checked', checked, 'bad', bad, 'skipped-known', skipped);
