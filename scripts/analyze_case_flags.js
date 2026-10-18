const fs = require('fs');
const path = 'scripts/output/case_semantic_flags.json';
const raw = fs.readFileSync(path, 'utf8');
const d = JSON.parse(raw);
const flags = d.flags;

if (!flags || !Array.isArray(flags)) {
  console.log('No flags array found');
  console.log('Top-level keys:', Object.keys(d));
  process.exit(0);
}

console.log('Total flags:', flags.length);
console.log('\nFirst flag structure:');
const sample = flags.find(f => JSON.stringify(f).length > 50);
if (sample) {
  const keys = Object.keys(sample);
  console.log('Keys:', keys.join(', '));
  for (const k of keys.slice(0, 15)) {
    const v = sample[k];
    if (typeof v === 'object') {
      console.log(`  ${k}: [object]`);
    } else {
      console.log(`  ${k}: ${String(v).substring(0, 100)}`);
    }
  }
}

// Count by screen type
const screens = {};
const severities = {};
const states = {};
for (const f of flags) {
  const s = f.screen || 'unknown';
  const sev = f.severity || 'unknown';
  const st = f.state || f.question_state || 'unknown';
  screens[s] = (screens[s] || 0) + 1;
  severities[sev] = (severities[sev] || 0) + 1;
  states[st] = (states[st] || 0) + 1;
}

console.log('\n=== Screens ===');
for (const [s,c] of Object.entries(screens).sort((a,b)=>b[1]-a[1])) console.log(`  ${s}: ${c}`);
console.log('\n=== Severities ===');
for (const [s,c] of Object.entries(severities).sort((a,b)=>b[1]-a[1])) console.log(`  ${s}: ${c}`);
console.log('\n=== States ===');
for (const [s,c] of Object.entries(states).sort((a,b)=>b[1]-a[1])) console.log(`  ${s}: ${c}`);

// Check for CaseID fields
const hasCaseId = flags.some(f => f.CaseID || f.caseID);
console.log('\nHas CaseID:', hasCaseId);
if (hasCaseId) {
  const qids = flags.filter(f => f.CaseID || f.caseID).slice(0, 5).map(f => f.CaseID || f.caseID);
  console.log('Sample QIDs:', qids);
}

// Get unique flag types
const flagTypes = {};
for (const f of flags) {
  const type = f.type || f.flag_type || Object.keys(f).filter(k => k !== 'severity' && k !== 'screen' && k !== 'state').slice(0,1)[0];
  if (type) flagTypes[type] = (flagTypes[type] || 0) + 1;
}
console.log('\n=== Flag Types ===');
for (const [s,c] of Object.entries(flagTypes).sort((a,b)=>b[1]-a[1]).slice(0,20)) console.log(`  ${s}: ${c}`);

// Write categorized summary
const summary = {
  total: flags.length,
  screens,
  severities,
  states,
  generated: new Date().toISOString(),
  remediation_plan: {
    batch_1_category: 'C:SHORT',
    batch_2_category: 'B:UNSUPPORTED-CORRECT',
    batch_3_category: 'B:EXTRA-REFUTED',
    batch_4_category: 'B:INVERSION (calibration FPs)',
    batch_5_category: 'B:DISJOINT + B-num',
  }
};
fs.writeFileSync('scripts/output/case_flag_analysis.json', JSON.stringify(summary, null, 2));
console.log('\nAnalysis saved to scripts/output/case_flag_analysis.json');
