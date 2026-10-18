const fs = require('fs');
function extractArray(raw) {
  const m = raw.match(/=\s*\[/);
  const arrStart = raw.indexOf('[', m.index);
  let depth = 0, pos = arrStart, inString = false, stringChar = '', escape = false;
  do {
    const ch = raw[pos];
    if (escape) { escape = false; pos++; continue; }
    if (inString) {
      if (ch === '\\') { escape = true; pos++; continue; }
      if (ch === stringChar) { inString = false; }
      pos++; continue;
    }
    if (ch === '"' || ch === "'") { inString = true; stringChar = ch; pos++; continue; }
    if (ch === '[') depth++;
    if (ch === ']') depth--;
    pos++;
  } while (depth > 0 && pos < raw.length);
  return JSON.parse(raw.slice(arrStart, pos));
}
const packs = [extractArray(fs.readFileSync('content/cases/case_pack_1_corrected.js', 'utf8'))];
const cs = packs[0].find(c => c.CaseID === 'CBQ-C3');
console.log('=== CASE CBQ-C3 Exhibits ===');
for (const ex of (cs.Exhibits || [])) {
  console.log('---', ex.Title || ex.ExhibitID, '(' + ex.Type + ')');
  if (ex.Headers) console.log('Headers:', JSON.stringify(ex.Headers));
  if (ex.Rows) ex.Rows.forEach(r => console.log('  ', JSON.stringify(r).substring(0, 200)));
  if (ex.Body) console.log('Body:', String(ex.Body).substring(0, 600));
}
const q5 = cs.Items.find(i => i.ItemID === 'CBQ-C3-Q5');
console.log('\n=== Q5 PROMPT ===\n', q5.Prompt);
console.log('\n=== Q5 CHOICES ===');
(q5.Choices || []).forEach((c, i) => console.log('  [' + (i + 1) + ']', String(c).substring(0, 150)));
console.log('\n=== Q5 LEFT/RIGHT ===');
if (q5.LeftItems) console.log('Left:', JSON.stringify(q5.LeftItems));
if (q5.RightItems) (q5.RightItems || []).forEach(r => console.log('  ', String(r).substring(0, 150)));
