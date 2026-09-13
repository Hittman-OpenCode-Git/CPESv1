// Coherence audit: for each staged Wave-9 item, check (1) EW label matches slot,
// (2) EW text keyword-overlaps its slot choice (refutation signal), (3) CC slot empty.
const fs = require('fs');
function words(t) {
  return new Set((t || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 3));
}
const files = ['tier3_wave9a.js', 'tier3_wave9b.js', 'tier3_wave9c.js'];
for (const f of files) {
  const arr = require('./' + f);
  for (const o of arr) {
    const issues = [];
    for (const L of ['A', 'B', 'C', 'D']) {
      const v = o['ExplanationWrong' + L] || '';
      const ch = (o.Choices || {})[L] || '';
      if (L === o.CorrectChoice) {
        if (v !== '') issues.push('EW[CC=' + L + '] non-empty');
        continue;
      }
      if (!v) { issues.push('EW' + L + ' empty'); continue; }
      const m = v.match(/^Option ([A-D])\b/);
      if (m && m[1] !== L) issues.push('EW' + L + ' labeled Option ' + m[1]);
      if (!m) issues.push('EW' + L + ' no Option-label');
      const ws = words(ch), vs = words(v);
      let hit = 0;
      for (const w of ws) if (vs.has(w)) hit++;
      const recall = ws.size ? hit / ws.size : 0;
      if (recall < 0.2) issues.push('EW' + L + ' low-overlap(' + recall.toFixed(2) + ')');
    }
    console.log(o.QuestionID + ' CC=' + o.CorrectChoice + (issues.length ? ' ISSUES: ' + issues.join('; ') : ' coherent'));
  }
}