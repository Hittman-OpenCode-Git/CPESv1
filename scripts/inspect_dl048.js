const fs = require('fs');
function load(f) {
  const src = fs.readFileSync(f, 'utf8');
  const s = src.indexOf('[');
  let d = 0, e = -1;
  for (let i = s; i < src.length; i++) {
    if (src[i] === '[') d++;
    else if (src[i] === ']') { d--; if (d === 0) { e = i; break; } }
  }
  return (new Function('return ' + src.substring(s, e + 1)))();
}
const ids = ['CBQ3-A1', 'CBQ3-A2'];
for (const f of ['content/cases/case_pack_2_corrected.js', 'content/cases/case_pack_3_corrected.js']) {
  const arr = load(f);
  for (const c of arr) {
    if (!ids.includes(c.CaseID)) continue;
    console.log('FILE ' + f);
    console.log('  CaseID=' + c.CaseID + ' Title=' + c.Title + ' items=' + (c.Items || []).length + ' exhibits=' + (c.Exhibits || []).length);
    console.log('  ItemIDs=' + JSON.stringify((c.Items || []).map(x => x.ItemID)));
    console.log('  ExhibitIDs=' + JSON.stringify((c.Exhibits || []).map(x => x.ExhibitID)));
    console.log('  ReferencedBy=' + JSON.stringify((c.Exhibits || []).map(x => x.ReferencedBy)));
    console.log('  Dependencies=' + JSON.stringify((c.Items || []).map(x => x.Dependencies)));
  }
}