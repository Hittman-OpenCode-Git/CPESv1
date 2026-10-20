const fs = require('fs');
const crypto = require('crypto');
const banks = ['case_pack_p2_1.js','case_pack_p2_2.js','case_pack_p2_3.js'];
const MAX = 40000;
const manifest = [];
for (const b of banks) {
  const src = fs.readFileSync('p2/' + b);
  const hash = crypto.createHash('sha256').update(src).digest('hex');
  const parts = [];
  let offset = 0, partNum = 1;
  while (offset < src.length) {
    const end = Math.min(offset + MAX, src.length);
    const chunk = src.slice(offset, end);
    const partName = b.replace('.js', '_part' + String(partNum).padStart(2, '0') + '.js');
    const partPath = 'review/keyless_parts/' + partName;
    fs.writeFileSync(partPath, chunk);
    parts.push({ part: partNum, file: partName, startByte: offset, endByte: end - 1, size: chunk.length });
    offset = end;
    partNum++;
  }
  let recon = Buffer.alloc(0);
  for (const p of parts) { recon = Buffer.concat([recon, fs.readFileSync('review/keyless_parts/' + p.file)]); }
  const reconHash = crypto.createHash('sha256').update(recon).digest('hex');
  const match = reconHash === hash;
  manifest.push({ sourceFile: 'p2/' + b, sourceSize: src.length, sourceSHA256: hash, partCount: parts.length, parts, concatVerified: match, reconSHA256: reconHash });
  console.log(b + ': ' + parts.length + ' parts, concat verified=' + match);
}
fs.writeFileSync('review/keyless_parts/MANIFEST.json', JSON.stringify(manifest, null, 2));
console.log('Manifest written.');
console.log('Total parts:', manifest.reduce((s, m) => s + m.partCount, 0));
