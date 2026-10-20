const fs = require('fs');
const manifest = JSON.parse(fs.readFileSync('review/keyless_parts/MANIFEST.json', 'utf8'));
for (const m of manifest) {
  for (const p of m.parts) {
    const src = fs.readFileSync('review/keyless_parts/' + p.file, 'utf8');
    const qids = [];
    const re = /"ItemID":\s*"([^"]+)"/g;
    let match;
    while ((match = re.exec(src)) !== null) {
      qids.push(match[1]);
    }
    p.qidRange = qids.length > 0 ? qids[0] + ' to ' + qids[qids.length - 1] : 'none';
    p.qidCount = qids.length;
    p.qids = qids;
  }
}
fs.writeFileSync('review/keyless_parts/MANIFEST.json', JSON.stringify(manifest, null, 2));
console.log('Updated manifest with QID ranges');
const m2 = JSON.parse(fs.readFileSync('review/keyless_parts/MANIFEST.json', 'utf8'));
let total = 0;
for (const m of m2) {
  for (const p of m.parts) {
    total += p.qidCount;
  }
}
console.log('Total QIDs:', total);
