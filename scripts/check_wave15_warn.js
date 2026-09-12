const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./scripts/reports/output/ValidationReport.json', 'utf8'));
const walk = (o) => {
  if (Array.isArray(o)) { o.forEach(walk); return; }
  if (o && typeof o === 'object') {
    for (const [k, v] of Object.entries(o)) {
      if (Array.isArray(v) && (k === 'warnings' || k === 'errors')) {
        v.forEach(m => {
          const s = '' + m;
          const ids = s.match(/P1B-C-2[123][0-9]/g) || [];
          if (ids.some(id => { const n = +id.slice(6); return n >= 211 && n <= 240; })) {
            console.log('[' + k.toUpperCase() + '] ' + s.slice(0, 200));
          }
        });
      } else walk(v);
    }
  }
};
walk(data);
console.log('done');