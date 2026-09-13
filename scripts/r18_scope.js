const fs = require('fs');
const files = ['content/packs/pack_a_corrected.js', 'content/packs/pack_b_corrected.js', 'content/packs/pack_c_corrected.js', 'content/packs/pack_d_corrected.js', 'content/packs/pack_e_corrected.js'];
let nonAlpha = 0, short = 0, untrimmed = 0, total = 0;
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  const re = /"Choices":\s*\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const body = m[1];
    const vre = /"([A-D])":\s*"((?:[^"\\]|\\.)*)"/g;
    let vm;
    while ((vm = vre.exec(body)) !== null) {
      total++;
      const v = vm[2];
      if (v.length === 0) continue;
      const t = v.trim();
      if (t !== v) untrimmed++;
      else if (t.length < 8) short++;
      else if (/^[^A-Za-z0-9]/.test(t)) nonAlpha++;
    }
  }
}
console.log('total choices=' + total + ' untrimmed=' + untrimmed + ' short=' + short + ' nonAlphaStart=' + nonAlpha);