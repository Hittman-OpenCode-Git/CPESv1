// Read-only formatter for DL-066 hand-solve.
// Reads dl066_case_extract.json (which has no Correct fields) and emits a
// line-wrapped plain-text report so long explanations are not truncated.
const fs = require('fs');
const cases = JSON.parse(fs.readFileSync('scripts/output/dl066_case_extract.json', 'utf8'));

function wrap(s, width) {
  s = String(s);
  const words = s.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > width) { lines.push(cur.trim()); cur = w; }
    else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur.trim());
  return lines.join('\n');
}

const out = [];
for (const c of cases) {
  out.push('='.repeat(90));
  out.push(`CASE ${c.caseId}  (bank ${c.bank}, ${c.file})  — ${c.title}`);
  out.push('SCENARIO: ' + wrap(c.scenario, 110));
  for (const ex of c.exhibits) {
    out.push('-'.repeat(90));
    out.push(`EXHIBIT ${ex.ExhibitID} [${ex.Type}] ${ex.Title}`);
    if (ex.Headers) out.push('HEADERS: ' + JSON.stringify(ex.Headers));
    if (ex.Rows) {
      for (const r of ex.Rows) out.push('ROW: ' + JSON.stringify(r));
    }
    if (ex.Body) out.push('BODY: ' + wrap(ex.Body, 110));
  }
  for (const it of c.items) {
    out.push('-'.repeat(90));
    out.push(`ITEM ${it.ItemID}  TYPE=${it.Type}`);
    out.push('PROMPT>>>' + it.Prompt + '<<<');
    if (it.Choices) it.Choices.forEach((ch, i) => out.push(`  CHOICE[${i}] ${ch}`));
    if (it.LeftItems) it.LeftItems.forEach((ch, i) => out.push(`  LEFT[${i}] ${ch}`));
    if (it.RightItems) it.RightItems.forEach((ch, i) => out.push(`  RIGHT[${i}] ${ch}`));
    out.push('EXPL: ' + wrap(it.Explanation, 110));
    for (const k of ['EW_A','EW_B','EW_C','EW_D','EW_E']) {
      if (it[k]) out.push(`${k}: ` + wrap(it[k], 110));
    }
  }
}
fs.writeFileSync('scripts/output/dl066_readable.txt', out.join('\n'));
console.log('wrote dl066_readable.txt', out.length, 'lines');
