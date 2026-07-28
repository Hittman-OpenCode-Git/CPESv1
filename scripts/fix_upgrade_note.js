const fs = require('fs');
const path = require('path');
const BASE = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026';
const outPath = path.join(BASE, 'scripts', 'output', 's886_analyze_upgrades.js');
const upgrades = require(outPath);
upgrades.forEach(item => {
  if (!item.upgrade_note) item.upgrade_note = 'S886 Analyze upgrade - 2026-07-28';
});
fs.writeFileSync(outPath, 'const S886_ANALYZE_UPGRADES = ' + JSON.stringify(upgrades, null, 2) + ';\n\nif (typeof module !== "undefined") module.exports = S886_ANALYZE_UPGRADES;\n', { encoding: 'utf8' });
console.log('Done. All ' + upgrades.length + ' items have upgrade_note.');
