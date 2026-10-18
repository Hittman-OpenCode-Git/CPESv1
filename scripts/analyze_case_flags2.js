const fs = require('fs');
const d = JSON.parse(fs.readFileSync('scripts/output/case_semantic_flags.json', 'utf8'));
const flags = d.flags;

// Get actual state values
const caseStates = new Set();
const itemStates = new Set();
const screens = {};
const severityByScreen = {};

for (const f of flags) {
  caseStates.add(f.caseState);
  itemStates.add(f.itemState);
  const s = f.screen;
  screens[s] = (screens[s] || 0) + 1;
  if (!severityByScreen[s]) severityByScreen[s] = {};
  const sev = f.severity || 'unknown';
  severityByScreen[s][sev] = (severityByScreen[s][sev] || 0) + 1;
}

console.log('Case states:', [...caseStates]);
console.log('Item states:', [...itemStates]);
console.log('');

// Detailed breakdown by screen
for (const [screen, count] of Object.entries(screens).sort((a,b)=>b[1]-a[1])) {
  console.log(`\n=== Screen ${screen} (${count} flags) ===`);
  console.log('  Severity breakdown:', JSON.stringify(severityByScreen[screen]));
  
  // Get samples
  const samples = flags.filter(f => f.screen === screen).slice(0, 5);
  for (const s of samples) {
    console.log(`  ${s.caseId}/${s.itemId} (${s.itemState}): ${s.severity} - ${s.detail.substring(0, 80)}`);
  }
}

// Get FLAG severity items specifically
const flagItems = flags.filter(f => f.severity === 'FLAG');
console.log(`\n=== FLAG items (${flagItems.length}) ===`);
const flagByScreen = {};
for (const f of flagItems) {
  flagByScreen[f.screen] = (flagByScreen[f.screen] || 0) + 1;
}
console.log('By screen:', JSON.stringify(flagByScreen));

// Get certified-state items
const certifiedItems = flags.filter(f => f.caseState === 'Certified' || f.itemState === 'Certified');
console.log(`\n=== Certified-state items (${certifiedItems.length}) ===`);
const certByScreen = {};
for (const f of certifiedItems) {
  certByScreen[f.screen] = (certByScreen[f.screen] || 0) + 1;
}
console.log('By screen:', JSON.stringify(certByScreen));

// Get B:INVERSION details
const inversionItems = flags.filter(f => f.screen === 'B' && f.detail && f.detail.includes('INVERSION'));
console.log(`\n=== B:INVERSION (${inversionItems.length}) ===`);
const invByState = {};
for (const f of inversionItems) {
  invByState[f.itemState] = (invByState[f.itemState] || 0) + 1;
}
console.log('By itemState:', JSON.stringify(invByState));

// Write summary
const output = {
  total: flags.length,
  caseStates: [...caseStates],
  itemStates: [...itemStates],
  screens,
  severityByScreen,
  flagItems: flagItems.length,
  certifiedItems: certifiedItems.length,
  inversionItems: inversionItems.length,
  inversionByState: invByState,
  timestamp: new Date().toISOString()
};
fs.writeFileSync('scripts/output/case_flag_breakdown.json', JSON.stringify(output, null, 2));
console.log('\nBreakdown saved.');
