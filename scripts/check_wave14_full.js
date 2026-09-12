const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./scripts/reports/output/ValidationReport.json', 'utf8'));
const want = ['P1-C-111', 'P1-C-112', 'P1-C-114', 'P1-C-116', 'P1-C-118', 'P1-C-120', 'P1-C-122', 'P1-C-128'];
const walk = (o) => {
  if (Array.isArray(o)) { o.forEach(walk); return; }
  if (o && typeof o === 'object') {
    for (const [k, v] of Object.entries(o)) {
      if (Array.isArray(v) && (k === 'warnings' || k === 'errors')) {
        v.forEach(m => {
          const s = '' + m;
          if (want.some(id => s.includes(id))) console.log('[' + k.toUpperCase() + '] ' + s + '\n---');
        });
      } else walk(v);
    }
  }
};
walk(data);