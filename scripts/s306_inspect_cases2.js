// Check scored_cases2-5 variable names
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

for (const file of ['scored_cases2.js', 'scored_cases3.js', 'scored_cases4.js', 'scored_cases5.js']) {
  const code = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const varMatches = code.match(/(?:var|const|let)\s+(\w+)\s*=/g) || [];
  const vars = [...new Set(varMatches.map(m => m.replace(/(?:var|const|let)\s+/, '').replace(/\s*=$/, '')))];
  console.log(`${file}: ${vars.join(', ')}`);
  
  // Try common names
  for (const vn of vars) {
    try {
      const fn = new Function(code + '; return typeof ' + vn + ' !== "undefined" ? ' + vn + ' : null;');
      const result = fn();
      if (result !== null && !(typeof result === 'function')) {
        const isArr = Array.isArray(result);
        console.log(`  >> ${vn}: ${isArr ? 'array[' + result.length + ']' : typeof result + ' keys=' + Object.keys(result).slice(0,3)}`);
        if (isArr && result.length > 0) {
          const e = result[0];
          console.log(`     First entry keys: ${Object.keys(e).slice(0,8).join(', ')}`);
          const items = e.Items || e.items || [];
          if (items.length > 0) console.log(`     Items[0] keys: ${Object.keys(items[0]).slice(0,8).join(', ')}`);
        }
      }
    } catch(e) {}
  }
  console.log('');
}
