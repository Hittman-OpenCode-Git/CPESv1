const fs = require('fs');
function ea(raw) {
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
let seen = new Set(), tot = 0, cert = 0, itemC = 0, itemT = 0;
for (const n of ['1', '2', '3']) {
  const cases = ea(fs.readFileSync('content/cases/case_pack_' + n + '_corrected.js', 'utf8'));
  cases.forEach(c => {
    if (seen.has(c.CaseID)) console.log('DUPLICATE: ' + c.CaseID);
    seen.add(c.CaseID);
    tot++;
    if (c.question_state === 'Certified') cert++;
    for (const it of (c.Items || [])) {
      itemT++;
      if (it.question_state === 'Certified') itemC++;
    }
  });
}
console.log('P1 cases:', cert + '/' + tot, 'Certified | P1 case items:', itemC + '/' + itemT, 'Certified | unique CaseIDs:', seen.size);
