const fs = require('fs');
const raw = fs.readFileSync('./scripts/reports/output/ValidationReport.json', 'utf8');
let data;
try { data = JSON.parse(raw); } catch (e) { console.log('not plain JSON, keys:', raw.slice(0, 200)); process.exit(0); }
const dump = (o, path) => {
  if (Array.isArray(o)) { o.forEach((v, i) => dump(v, path + '[' + i + ']')); return; }
  if (o && typeof o === 'object') {
    const s = JSON.stringify(o);
    if (/P1-C-1(0[2-9]|[12][0-9]|30)/.test(s) && !/P1-C-10[0-1][^0-9]/.test(s)) {
      // filter to actual wave-14 range hits
      const ids = s.match(/P1-C-1[0-3][0-9]/g) || [];
      const inRange = ids.filter(id => { const n = +id.slice(5); return n >= 101 && n <= 130; });
      if (inRange.length) console.log(path, '=>', [...new Set(inRange)].join(','), '|', s.slice(0, 300));
    }
    Object.entries(o).forEach(([k, v]) => dump(v, path + '.' + k));
  }
};
dump(data, 'root');