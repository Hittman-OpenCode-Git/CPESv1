const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./scripts/reports/output/ValidationReport.json', 'utf8'));
const walk = (o) => {
  if (Array.isArray(o)) { o.forEach(walk); return; }
  if (o && typeof o === 'object') {
    for (const [k, v] of Object.entries(o)) {
      if (Array.isArray(v) && (k === 'warnings' || k === 'errors')) {
        v.forEach(m => {
          const ids = ('' + m).match(/P1-C-1[0-3][0-9]/g) || [];
          if (ids.some(id => { const n = +id.slice(5); return n >= 101 && n <= 130; })) {
            console.log('[' + k.toUpperCase() + '] ' + ('' + m).slice(0, 220));
          }
        });
      } else walk(v);
    }
  }
};
walk(data);
console.log('done');