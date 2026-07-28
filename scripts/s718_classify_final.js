// Session 718 — Post-Processing Corrections for V1
// Applies Agent B's 4 bias corrections to V1 results
// Produces final VFINAL assignments ready for pack writes

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const v1Path = path.join(root, 'reports', 'session_status', 'SESSION718_COGNITIVELEVEL_ASSIGNMENTS.json');
const v1 = JSON.parse(fs.readFileSync(v1Path, 'utf8'));

const vfinal = {};
const corrections = {
  'Evaluate→Understand': 0, // Bias 1: "Which response is most appropriate?" 
  'Remember→Understand': 0, // Bias 2: Pack E short stems requiring discrimination
  'Analyze→Understand': 0, // Bias 3: "analyze" keyword → concept ID
  'Apply→Analyze': 0,      // Upgrade: multi-step with interpretation
  'Understand→Analyze': 0,  // Upgrade: genuine analysis patterns
  'Understand→Apply': 0,    // Upgrade: scenario+calc missed
  'Apply→Evaluate': 0,      // Upgrade: genuine judgment
  other: 0,
};

// BIAS 1: "Which response is most appropriate?" → Understand
function isBias1(a) {
  const s = (a.StemPreview || '').toLowerCase();
  if (a.v1Level !== 'Evaluate') return false;
  if (!/\bwhich (response|statement|action) is most appropriate\b/i.test(s)) return false;
  // Check if genuine judgment vs standard recognition
  if (/\b(recommend|advise|should (select|choose) between|trade.off|pros and cons)\b/i.test(s)) return false;
  return true;
}

// BIAS 2: Short "Which of the following" → Understand (not Remember)
function isBias2(a) {
  const s = (a.StemPreview || '').toLowerCase();
  if (a.v1Level !== 'Remember') return false;
  // Short stem + substantive choices = discrimination required
  if (s.length < 60 && /^which of the following/i.test(s)) return true;
  // "Under GAAP/IFRS/COSO" concept questions
  if (s.length < 80 && /\b(under |according to )/i.test(s)) return true;
  return false;
}

// BIAS 3: "analyze" keyword → concept identification (not Analyze)
function isBias3(a) {
  const s = (a.StemPreview || '').toLowerCase();
  if (a.v1Level !== 'Analyze') return false;
  // "wants to analyze... what approach/method" → naming technique
  if (/\banalyze\b/i.test(s) && /what (approach|method|technique|tool) (is|is being)/i.test(s)) return true;
  return false;
}

// Upgrade to Analyze: multi-step data interpretation
function shouldBeAnalyze(a) {
  const s = (a.StemPreview || '').toLowerCase();
  const t = (a.Topic || '').toLowerCase();
  // Already Analyze or Evaluate — don't downgrade
  if (a.v1Level === 'Analyze' || a.v1Level === 'Evaluate') return false;
  // Variance interpretation
  if (/\b(variance|favorable|unfavorable)\b/i.test(t) && /\b(indicate|reveal|explain|reason|cause|why)\b/i.test(s)) return true;
  // Data interpretation with multi-step
  if (/\b(based on the|given the following|provided|exhibit)\b/i.test(s) && /\b(indicate|conclude|reveal|imply)\b/i.test(s)) return true;
  // Multi-step financial analysis
  if (s.length > 150 && /\b(both|combining|considering|integrating|additionally)\b/i.test(s) && /\b(impact|effect|result|outcome|change)\b/i.test(s)) return true;
  return false;
}

// Upgrade to Evaluate: genuine judgment
function shouldBeEvaluate(a) {
  const s = (a.StemPreview || '').toLowerCase();
  if (a.v1Level === 'Evaluate') return false;
  // Recommendation + best approach
  if (/\b(recommend|advise|propose)\b/i.test(s) && /\b(best|most effective|optimal|preferable|most appropriate)\b/i.test(s)) return true;
  // Framework selection with trade-offs
  if (/\b(which (costing method|budgeting approach|transfer price|allocation method) (should|would be|is) (best|most appropriate|recommended))\b/i.test(s)) return true;
  return false;
}

// Upgrade to Apply: missed calculation/procedure items
function shouldBeApply(a) {
  const s = (a.StemPreview || '').toLowerCase();
  const t = (a.Topic || '').toLowerCase();
  if (a.v1Level === 'Apply' || a.v1Level === 'Analyze' || a.v1Level === 'Evaluate') return false;
  // Numbers + calculation verb
  if (/\$\d/.test(s) && /\b(calculate|compute|what is|how much|amount)\b/i.test(s)) return true;
  // Cost/budget items with numbers
  if (/(costing|allocation|budget|overhead|variance)\b/i.test(t) && /\$\d/.test(s)) return true;
  return false;
}

for (const [qid, a] of Object.entries(v1.assignments)) {
  let newCL = a.CognitiveLevel;
  let corrected = '';
  
  // Apply corrections in priority order
  if (isBias1(a)) {
    newCL = 'Understand';
    corrected = 'Evaluate→Understand';
    corrections[corrected]++;
  } else if (isBias2(a)) {
    newCL = 'Understand';
    corrected = 'Remember→Understand';
    corrections[corrected]++;
  } else if (isBias3(a)) {
    newCL = 'Understand';
    corrected = 'Analyze→Understand';
    corrections[corrected]++;
  } else if (shouldBeEvaluate(a)) {
    const oldCL = a.CognitiveLevel;
    newCL = 'Evaluate';
    corrected = oldCL + '→Evaluate';
    corrections[corrected] = (corrections[corrected] || 0) + 1;
  } else if (shouldBeAnalyze(a)) {
    const oldCL = a.CognitiveLevel;
    newCL = 'Analyze';
    corrected = oldCL + '→Analyze';
    corrections[corrected] = (corrections[corrected] || 0) + 1;
  } else if (shouldBeApply(a)) {
    const oldCL = a.CognitiveLevel;
    newCL = 'Apply';
    corrected = oldCL + '→Apply';
    corrections[corrected] = (corrections[corrected] || 0) + 1;
  }
  
  vfinal[qid] = {
    ...a,
    CognitiveLevel: newCL,
    v1Level: a.CognitiveLevel,
    corrected: corrected || '',
    changed: newCL !== a.CognitiveLevel,
  };
  
  if (newCL !== a.CognitiveLevel && !corrections[corrected]) {
    corrections.other++;
  }
}

// Stats
const stats = {
  total: Object.keys(vfinal).length,
  corrected: 0,
  byLevel: { Remember: 0, Understand: 0, Apply: 0, Analyze: 0, Evaluate: 0 },
  byPack: {},
};

for (const [qid, a] of Object.entries(vfinal)) {
  if (a.changed) stats.corrected++;
  stats.byLevel[a.CognitiveLevel]++;
  if (!stats.byPack[a.Pack]) stats.byPack[a.Pack] = { total: 0, changed: 0, byLevel: { Remember: 0, Understand: 0, Apply: 0, Analyze: 0, Evaluate: 0 } };
  stats.byPack[a.Pack].total++;
  stats.byPack[a.Pack].byLevel[a.CognitiveLevel]++;
  if (a.changed) stats.byPack[a.Pack].changed++;
}

const outPath = path.join(root, 'reports', 'session_status', 'SESSION718_COGNITIVELEVEL_ASSIGNMENTS_VFINAL.json');
fs.writeFileSync(outPath, JSON.stringify({ assignments: vfinal, stats, corrections }, null, 2));

console.log('=== S718 VFINAL (V1 + Corrections) ===\n');
console.log(`Total: ${stats.total} | Corrected: ${stats.corrected} (${(stats.corrected/stats.total*100).toFixed(1)}%)`);
console.log('\nBy CognitiveLevel:');
for (const [level, count] of Object.entries(stats.byLevel)) {
  console.log(`  ${level}: ${count} (${(count/stats.total*100).toFixed(1)}%)`);
}
console.log('\nCorrections applied:');
for (const [corr, count] of Object.entries(corrections)) {
  if (count > 0) console.log(`  ${corr}: ${count}`);
}
console.log('\nBy Pack:');
for (const [pack, pdata] of Object.entries(stats.byPack)) {
  const parts = [];
  for (const [level, count] of Object.entries(pdata.byLevel)) {
    if (count > 0) parts.push(`${level}:${count}`);
  }
  console.log(`  ${pack}: ${pdata.total} (${pdata.changed} changed) — ${parts.join(', ')}`);
}
console.log(`\nWritten to: ${outPath}`);
