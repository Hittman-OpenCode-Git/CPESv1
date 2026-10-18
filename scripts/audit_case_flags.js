const fs = require('fs');
const path = 'scripts/output/case_semantic_flags.json';

try {
  const raw = fs.readFileSync(path, 'utf8');
  const d = JSON.parse(raw);
  
  const flags = d.flags || d;
  if (!Array.isArray(flags)) {
    console.log('Flags structure:', typeof flags);
    console.log('Keys:', Object.keys(flags).slice(0,10));
    process.exit(0);
  }
  
  console.log('Total flags:', flags.length);
  
  const byScreen = {};
  const bySeverity = {};
  const byState = {};
  const certifiedFlags = [];
  
  for (const f of flags) {
    const screen = f.screen || 'unknown';
    const severity = f.severity || 'unknown';
    const state = f.state || 'unknown';
    
    byScreen[screen] = (byScreen[screen] || 0) + 1;
    bySeverity[severity] = (bySeverity[severity] || 0) + 1;
    byState[state] = (byState[state] || 0) + 1;
    
    if (state === 'Certified') {
      certifiedFlags.push(f);
    }
  }
  
  console.log('\n=== By Screen ===');
  for (const [s, c] of Object.entries(byScreen).sort((a,b) => b[1]-a[1])) {
    console.log(`  ${s}: ${c}`);
  }
  
  console.log('\n=== By Severity ===');
  for (const [s, c] of Object.entries(bySeverity).sort((a,b) => b[1]-a[1])) {
    console.log(`  ${s}: ${c}`);
  }
  
  console.log('\n=== By State ===');
  for (const [s, c] of Object.entries(byState).sort((a,b) => b[1]-a[1])) {
    console.log(`  ${s}: ${c}`);
  }
  
  console.log('\n=== Certified-state flags ===');
  console.log('Count:', certifiedFlags.length);
  if (certifiedFlags.length > 0) {
    console.log('\nSample QIDs:');
    for (const f of certifiedFlags.slice(0, 20)) {
      console.log(`  ${f.CaseID || f.caseID || f.qid || 'unknown'}: ${f.screen} - ${f.severity}`);
    }
  }
  
  // Check for FLAG severity items specifically
  const flagItems = flags.filter(f => f.severity === 'FLAG' || (f.flag && f.flag === true));
  console.log('\n=== FLAG-level items ===');
  console.log('Count:', flagItems.length);
  if (flagItems.length > 0) {
    console.log('\nSample FLAG items:');
    for (const f of flagItems.slice(0, 20)) {
      console.log(`  ${f.CaseID || f.caseID || f.qid || 'unknown'}: ${f.screen} - ${f.severity}`);
    }
  }
  
} catch(e) {
  console.log('Error reading flags:', e.message);
  // Try to find the file
  const files = fs.readdirSync('scripts/output').filter(f => f.includes('case_semantic') || f.includes('semantic'));
  console.log('Available files:', files);
}
