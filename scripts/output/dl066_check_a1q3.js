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
const packs = [extractArray(fs.readFileSync('content/cases/case_pack_2_corrected.js', 'utf8'))];
const cs = packs[0].find(c => c.CaseID === 'CBQ4-A1');
const q3 = cs.Items.find(i => i.ItemID === 'CBQ4-A1-Q3');
console.log('PROMPT:', q3.Prompt);
console.log('TYPE:', q3.Type);
console.log('CORRECT:', JSON.stringify(q3.Correct));
(q3.Choices || []).forEach((c, i) => console.log('  [' + (i + 1) + ']', String(c).substring(0, 200)));
console.log('EXPLANATION:', String(q3.Explanation).substring(0, 800));
