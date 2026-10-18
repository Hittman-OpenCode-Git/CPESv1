const fs = require('fs');
const content = fs.readFileSync('content/packs/pack_a_corrected.js', 'utf8');

// Find Section E items (P1-E-*)
const sectionE = content.match(/\{[\s\S]*?"QuestionID"\s*:\s*"P1-E-\d+"[\s\S]*?\}/g);
if (sectionE) {
  const dist = {A:0,B:0,C:0,D:0};
  for (const item of sectionE) {
    const ccMatch = item.match(/"CorrectChoice"\s*:\s*"([A-D])"/);
    if (ccMatch) dist[ccMatch[1]]++;
  }
  console.log('P1 Section E CorrectChoice distribution:', dist);
  const total = dist.A + dist.B + dist.C + dist.D;
  console.log('B position %:', (dist.B/total*100).toFixed(1) + '%');
}