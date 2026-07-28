// Cross-Pack Consistency Audit S722A — Analysis Script
const fs = require('fs');

const allItems = JSON.parse(fs.readFileSync(__dirname + '/crosspack_extracted.json', 'utf-8'));

// === 1. OVERALL POOL STATISTICS ===
const clByPack = {};
const dsByPack = {};
const sectionDist = {};
const allCL = [];
const allDS = [];

const CL_MAP = { 'Remember': 1, 'Understand': 2, 'Apply': 3, 'Analyze': 4, 'Evaluate': 5 };

for (const item of allItems) {
  if (!clByPack[item.Pack]) { clByPack[item.Pack] = []; dsByPack[item.Pack] = []; }
  clByPack[item.Pack].push(item.CognitiveLevel);
  dsByPack[item.Pack].push(item.DifficultyScore);
  allCL.push(item.CognitiveLevel);
  allDS.push(item.DifficultyScore);
  
  const key = `${item.Pack}-${item.Section}`;
  if (!sectionDist[key]) sectionDist[key] = { items: 0, cl: [], ds: [] };
  sectionDist[key].items++;
  sectionDist[key].cl.push(item.CognitiveLevel);
  sectionDist[key].ds.push(item.DifficultyScore);
}

function mean(arr) { return arr.reduce((a,b)=>a+b,0)/arr.length; }
function mode(arr) {
  const freq = {};
  arr.forEach(v => { freq[v] = (freq[v]||0)+1; });
  let maxCount = 0, maxVal = null;
  for (const [k,v] of Object.entries(freq)) { if (v > maxCount) { maxCount = v; maxVal = k; } }
  return maxVal;
}
function clMean(arr) { return mean(arr.map(v => CL_MAP[v] || 0)); }
function clNum(v) { return CL_MAP[v] || 0; }
function clName(n) { return ['','Remember','Understand','Apply','Analyze','Evaluate'][Math.round(n)] || '?'; }

console.log('='.repeat(80));
console.log('CROSS-PACK CONSISTENCY AUDIT — S722A (Agent Q)');
console.log('='.repeat(80));
console.log(`\nPool: 2,500 items across 5 packs (500 each)`);
console.log(`Pack A Sections: A(75), B(100), C(75), D(75), E(75), F(100)`);
console.log(`Pack B Sections: A(75), B(100), C(100), D(75), E(75), F(75)`);
console.log(`Pack C Sections: A(75), B(100), C(100), D(75), E(75), F(75)`);
console.log(`Pack D Sections: A(75), B(100), C(100), D(75), E(75), F(75)`);
console.log(`Pack E Sections: A(75), B(75), C(100), D(75), E(75), F(100)\n`);

// === 2. POOL-LEVEL STATISTICS ===
console.log('─'.repeat(80));
console.log('POOL-LEVEL COGNITIVE LEVEL & DIFFICULTY DISTRIBUTION');
console.log('─'.repeat(80));

const poolCLFreq = {};
const poolDSFreq = {};
allCL.forEach(v => { poolCLFreq[v] = (poolCLFreq[v]||0)+1; });
allDS.forEach(v => { poolDSFreq[v] = (poolDSFreq[v]||0)+1; });

console.log('\nPool Cognitive Level:');
for (const [k,v] of Object.entries(poolCLFreq).sort((a,b) => CL_MAP[a[0]] - CL_MAP[b[0]])) {
  console.log(`  ${k.padEnd(12)}: ${String(v).padStart(4)} (${(v/25).toFixed(1)}%)`);
}
console.log(`  Pool CL mean: ${clMean(allCL).toFixed(2)} (${clName(clMean(allCL))})`);

console.log('\nPool Difficulty Score:');
for (let i = 1; i <= 5; i++) {
  const cnt = poolDSFreq[i] || 0;
  console.log(`  Score ${i}: ${String(cnt).padStart(4)} (${(cnt/25).toFixed(1)}%)`);
}
console.log(`  Pool DS mean: ${mean(allDS).toFixed(2)}`);

// === 3. PER-PACK PROFILE ===
console.log('\n' + '─'.repeat(80));
console.log('PER-PACK PROFILE');
console.log('─'.repeat(80));

const packProfiles = {};
for (const pack of ['A','B','C','D','E']) {
  const cl = clByPack[pack];
  const ds = dsByPack[pack];
  const freq = {};
  cl.forEach(v => { freq[v] = (freq[v]||0)+1; });
  
  console.log(`\nPack ${pack}:`);
  console.log(`  CL: Remember=${freq['Remember']||0}(` + ((freq['Remember']||0)/5).toFixed(1) + `%) Understand=${freq['Understand']||0}(` + ((freq['Understand']||0)/5).toFixed(1) + `%) Apply=${freq['Apply']||0}(` + ((freq['Apply']||0)/5).toFixed(1) + `%) Analyze=${freq['Analyze']||0}(` + ((freq['Analyze']||0)/5).toFixed(1) + `%) Evaluate=${freq['Evaluate']||0}(` + ((freq['Evaluate']||0)/5).toFixed(1) + `%)`);
  console.log(`  CL mean: ${clMean(cl).toFixed(2)} (${clName(clMean(cl))})`);
  console.log(`  DS mean: ${mean(ds).toFixed(2)}`);
  console.log(`  DS mode: ${mode(ds)}`);
  
  packProfiles[pack] = { clMean: clMean(cl), dsMean: mean(ds), freq };
}

// === 4. PER-SECTION CL ANALYSIS ===
console.log('\n' + '─'.repeat(80));
console.log('PER-SECTION COGNITIVE LEVEL MEANS');
console.log('─'.repeat(80));

const sections = ['A','B','C','D','E','F'];
const packSectionCL = {};
for (const pack of ['A','B','C','D','E']) {
  packSectionCL[pack] = {};
  for (const sec of sections) {
    const key = `${pack}-${sec}`;
    if (sectionDist[key]) {
      packSectionCL[pack][sec] = clMean(sectionDist[key].cl);
    }
  }
}

// Header
let header = 'Section ';
for (const pack of ['A','B','C','D','E']) header += `  Pack${pack}  `;
header += '  Range   MaxDev';
console.log(header);
console.log('-'.repeat(header.length));

for (const sec of sections) {
  let row = `  ${sec}    `;
  const values = [];
  for (const pack of ['A','B','C','D','E']) {
    const val = packSectionCL[pack][sec];
    if (val !== undefined) {
      row += `  ${val.toFixed(2)}  `;
      values.push(val);
    } else {
      row += '   N/A  ';
    }
  }
  const range = Math.max(...values) - Math.min(...values);
  row += `  ${range.toFixed(2)}   `;
  // Which pack deviates most from the multi-pack mean?
  const multiMean = mean(values);
  let maxDev = 0, maxDevPack = '?';
  for (let i = 0; i < values.length; i++) {
    const dev = Math.abs(values[i] - multiMean);
    if (dev > maxDev) { maxDev = dev; maxDevPack = ['A','B','C','D','E'][i]; }
  }
  row += `${maxDevPack}(${(values[['A','B','C','D','E'].indexOf(maxDevPack)] - multiMean).toFixed(2)})`;
  console.log(row);
}

// === 5. PATTERN-BASED CLUSTERING ===
console.log('\n' + '─'.repeat(80));
console.log('PATTERN-BASED CONSISTENCY ANALYSIS');
console.log('─'.repeat(80));

// 5A: Definition-match items (stem contains "is:" "is the:" "refers to:" "defined as:")
function isDefinitionMatch(stem) {
  const patterns = [
    /^What is /i, /^Which of the following is /i, 
    /is (the |a |an )?(primary|key|main|core|fundamental|basic)?\s*(purpose|goal|objective|function|role|definition|measure|term|concept|principle|standard|component|element|step|process|method|approach|tool|technique|type|category|example|characteristic|feature|attribute)/i,
    /refers to/i, /is defined as/i, /is best described as/i, /is also known as/i,
    /is the (term|phrase) (used|given) to/i,
    /^Which (term|concept|principle|standard) /i,
    /^The (term|concept|phrase) /i
  ];
  return patterns.some(p => p.test(stem));
}

// 5B: Calculation items (contains numbers, formula operators, compute/determine/calculate)
function isCalculation(stem) {
  const calcPatterns = [
    /\$\d[\d,]*/, /\%/, /calculate/i, /compute/i, /determine/i, /what is the/i,
    /units? (produced|sold|transferred)/i, /per unit/i, /per hour/i, /annual/i,
    /budgeted/i, /actual/i, /standard/i, /variance/i, /cost of/i,
    /overhead/i, /contribution margin/i, /break-even/i, /margin of safety/i,
    /total (cost|revenue|sales|profit|income|assets|liabilities|equity)/i
  ];
  return calcPatterns.filter(p => p.test(stem)).length >= 2;
}

// 5C: Framework-application items (COSO, BSC, ASC, GAAP, IFRS, etc.)
function isFrameworkApp(stem) {
  const fwPatterns = [
    /COSO/i, /balanced scorecard/i, /BSC/i, /ASC 6\d\d/i, /ASC 3\d\d/i, /ASC 2\d\d/i,
    /GAAP/i, /IFRS/i, /IMA/i, /SOX/i, /Sarbanes/i, /FASB/i, /IAS/i,
    /internal control/i, /ERM/i, /enterprise risk/i, 
    /fraud/i, /ethics/i, /segregation of duties/i,
    /budget(ary)? control/i, /variance (analysis|investigation)/i,
    /transfer pricing/i, /responsibility (center|accounting)/i,
  ];
  return fwPatterns.some(p => p.test(stem));
}

// Classify all items
const defItems = allItems.filter(i => isDefinitionMatch(i.Stem));
const calcItems = allItems.filter(i => isCalculation(i.Stem));
const fwItems = allItems.filter(i => isFrameworkApp(i.Stem));

console.log(`\nPattern Groups (approximate):`);
console.log(`  Definition-match: ${defItems.length} items`);
console.log(`  Calculation: ${calcItems.length} items`);
console.log(`  Framework-application: ${fwItems.length} items`);

function patternStats(label, items) {
  const byPack = {};
  for (const item of items) {
    if (!byPack[item.Pack]) byPack[item.Pack] = { cl: [], ds: [] };
    byPack[item.Pack].cl.push(item.CognitiveLevel);
    byPack[item.Pack].ds.push(item.DifficultyScore);
  }
  
  console.log(`\n--- ${label} (${items.length} items) ---`);
  
  let poolCLVals = items.map(i => clNum(i.CognitiveLevel));
  let poolDSVals = items.map(i => i.DifficultyScore);
  let poolCLMean = mean(poolCLVals);
  let poolDSMean = mean(poolDSVals);
  
  console.log(`  Pool norm: CL=${clName(poolCLMean)}(${poolCLMean.toFixed(2)})  DS=${poolDSMean.toFixed(2)}`);
  console.log(`  Per-pack:`);
  
  const deviants = [];
  for (const pack of ['A','B','C','D','E']) {
    const d = byPack[pack];
    if (!d || d.cl.length === 0) continue;
    const pcl = mean(d.cl.map(v => clNum(v)));
    const pds = mean(d.ds);
    const clDiff = pcl - poolCLMean;
    const dsDiff = pds - poolDSMean;
    const clFlag = Math.abs(clDiff) >= 1.0 ? ' *** DEVIANT (CL)' : '';
    const dsFlag = Math.abs(dsDiff) >= 1.0 ? ' *** DEVIANT (DS)' : '';
    console.log(`    Pack ${pack}: n=${d.cl.length}  CL=${clName(pcl)}(${pcl.toFixed(2)})  DS=${pds.toFixed(2)}  ΔCL=${clDiff >= 0 ? '+' : ''}${clDiff.toFixed(2)}  ΔDS=${dsDiff >= 0 ? '+' : ''}${dsDiff.toFixed(2)}${clFlag}${dsFlag}`);
    
    if (Math.abs(clDiff) >= 1.0 || Math.abs(dsDiff) >= 1.0) {
      deviants.push({ pack, label: label, clDiff, dsDiff, pcl, pds, poolCLMean, poolDSMean });
    }
  }
  return deviants;
}

const allDeviants = [];
allDeviants.push(...patternStats('DEFINITION-MATCH', defItems));
allDeviants.push(...patternStats('CALCULATION', calcItems));
allDeviants.push(...patternStats('FRAMEWORK-APPLICATION', fwItems));

// === 6. SECTION-LEVEL CL BY PACK (Table) ===
console.log('\n' + '─'.repeat(80));
console.log('PER-PACK PER-SECTION CL MEANS (Deviants from Section Pool Mean)');
console.log('─'.repeat(80));

for (const sec of sections) {
  const packCLs = [];
  for (const pack of ['A','B','C','D','E']) {
    const key = `${pack}-${sec}`;
    if (sectionDist[key]) packCLs.push({ pack, mean: clMean(sectionDist[key].cl), dsMean: mean(sectionDist[key].ds), count: sectionDist[key].items });
  }
  const sectionPoolCL = mean(packCLs.map(p => p.mean));
  const sectionPoolDS = mean(packCLs.map(p => p.dsMean));
  
  console.log(`\nSection ${sec} — Pool CL=${clName(sectionPoolCL)}(${sectionPoolCL.toFixed(2)})  Pool DS=${sectionPoolDS.toFixed(2)}`);
  for (const p of packCLs) {
    const clDiff = p.mean - sectionPoolCL;
    const dsDiff = p.dsMean - sectionPoolDS;
    const flags = [];
    if (Math.abs(clDiff) >= 1.0) flags.push(`DEVIANT CL: ${clDiff >= 0 ? '+' : ''}${clDiff.toFixed(1)} levels`);
    if (Math.abs(dsDiff) >= 1.0) flags.push(`DEVIANT DS: ${dsDiff >= 0 ? '+' : ''}${dsDiff.toFixed(1)} levels`);
    const flagStr = flags.length > 0 ? ` ← ${flags.join(', ')}` : '';
    console.log(`  Pack ${p.pack}: n=${p.count}  CL=${clName(p.mean)}(${p.mean.toFixed(2)})  DS=${p.dsMean.toFixed(2)}  ΔCL=${clDiff.toFixed(2)}  ΔDS=${dsDiff.toFixed(2)}${flagStr}`);
  }
}

// === 7. CLONE GROUP ANALYSIS (DL-012 pattern: Section E in Packs C/D) ===
console.log('\n' + '─'.repeat(80));
console.log('DL-012 CLONE GROUP ANALYSIS (Pack C Section E vs Pack D Section E)');
console.log('─'.repeat(80));

const cloneC = allItems.filter(i => i.Pack === 'C' && i.Section === 'E');
const cloneD = allItems.filter(i => i.Pack === 'D' && i.Section === 'E');

if (cloneC.length > 0 && cloneD.length > 0) {
  const ccCL = clMean(cloneC.map(i => i.CognitiveLevel));
  const cdCL = clMean(cloneD.map(i => i.CognitiveLevel));
  const ccDS = mean(cloneC.map(i => i.DifficultyScore));
  const cdDS = mean(cloneD.map(i => i.DifficultyScore));
  
  console.log(`\nPack C Section E: n=${cloneC.length}  CL=${clName(ccCL)}(${ccCL.toFixed(2)})  DS=${ccDS.toFixed(2)}`);
  console.log(`Pack D Section E: n=${cloneD.length}  CL=${clName(cdCL)}(${cdCL.toFixed(2)})  DS=${cdDS.toFixed(2)}`);
  console.log(`Clone-group delta: ΔCL=${(ccCL-cdCL).toFixed(2)}  ΔDS=${(ccDS-cdDS).toFixed(2)}`);
  
  // Check Section E clones against pool Section E norm
  const allE = allItems.filter(i => i.Section === 'E');
  const poolECL = clMean(allE.map(i => i.CognitiveLevel));
  const poolEDS = mean(allE.map(i => i.DifficultyScore));
  console.log(`Pool Section E norm:  CL=${clName(poolECL)}(${poolECL.toFixed(2)})  DS=${poolEDS.toFixed(2)}`);
  console.log(`\nDeviation of clone packs from Section E pool norm:`);
  console.log(`  Pack C: ΔCL=${(ccCL-poolECL).toFixed(2)}  ΔDS=${(ccDS-poolEDS).toFixed(2)}${Math.abs(ccCL-poolECL) >= 1.0 ? ' *** DEVIANT' : ''}`);
  console.log(`  Pack D: ΔCL=${(cdCL-poolECL).toFixed(2)}  ΔDS=${(cdDS-poolEDS).toFixed(2)}${Math.abs(cdCL-poolECL) >= 1.0 ? ' *** DEVIANT' : ''}`);
}

// === 8. TOPIC-NORMALIZED CROSS-PACK COMPARISON ===
console.log('\n' + '─'.repeat(80));
console.log('TOPIC-NORMALIZED CROSS-PACK CL ANALYSIS');
console.log('─'.repeat(80));

// Group by topic keyword
function topicKey(topic) {
  // Normalize: strip section prefix and trailing numbers
  return topic.replace(/^[A-F]\.\d+\s+/, '').replace(/\s+\d+$/, '').toLowerCase();
}

const topicGroups = {};
for (const item of allItems) {
  const key = topicKey(item.Topic);
  if (!topicGroups[key]) topicGroups[key] = [];
  topicGroups[key].push(item);
}

// Find topics present in multiple packs with divergent CL
console.log('\nTopics spanning multiple packs with CL variance ≥ 0.5:');
let crossPackTopicCount = 0;
const topicDeviants = [];

for (const [topic, items] of Object.entries(topicGroups)) {
  if (items.length < 3) continue;
  const packSet = new Set(items.map(i => i.Pack));
  if (packSet.size < 2) continue;
  
  crossPackTopicCount++;
  const byPackCL = {};
  const byPackDS = {};
  for (const item of items) {
    if (!byPackCL[item.Pack]) { byPackCL[item.Pack] = []; byPackDS[item.Pack] = []; }
    byPackCL[item.Pack].push(clNum(item.CognitiveLevel));
    byPackDS[item.Pack].push(item.DifficultyScore);
  }
  
  const packMeans = {};
  for (const [pack, vals] of Object.entries(byPackCL)) {
    packMeans[pack] = { cl: mean(vals), ds: mean(byPackDS[pack]) };
  }
  
  const clValues = Object.values(packMeans).map(m => m.cl);
  const clRange = Math.max(...clValues) - Math.min(...clValues);
  
  if (clRange >= 0.5) {
    console.log(`\n  Topic: "${topic}" (${items.length} items, ${packSet.size} packs)`);
    for (const [pack, m] of Object.entries(packMeans).sort((a,b) => a[0].localeCompare(b[0]))) {
      console.log(`    Pack ${pack}: CL=${clName(m.cl)}(${m.cl.toFixed(2)})  DS=${m.ds.toFixed(2)}  n=${byPackCL[pack].length}`);
    }
    console.log(`    CL Range: ${clRange.toFixed(2)} (${clRange >= 1.0 ? '*** ≥1 level DEVIATION' : '≥0.5 moderate variance'})`);
    
    // Find deviant pack
    const allPacksCL = mean(clValues);
    let maxDevPack = '', maxDev = 0;
    for (const [pack, m] of Object.entries(packMeans)) {
      if (Math.abs(m.cl - allPacksCL) > maxDev) {
        maxDev = Math.abs(m.cl - allPacksCL);
        maxDevPack = pack;
      }
    }
    if (clRange >= 1.0) {
      topicDeviants.push({ topic, range: clRange, deviantPack: maxDevPack, packMeans });
    }
  }
}

console.log(`\nTotal cross-pack topics found: ${crossPackTopicCount}`);
console.log(`Topics with CL range ≥ 0.5: ${topicDeviants.length + Object.values(topicGroups).filter(items => {
  if (items.length < 3) return false;
  const packSet = new Set(items.map(i => i.Pack));
  if (packSet.size < 2) return false;
  const byPackCL = {};
  for (const item of items) {
    if (!byPackCL[item.Pack]) byPackCL[item.Pack] = [];
    byPackCL[item.Pack].push(clNum(item.CognitiveLevel));
  }
  const clVals = Object.values(byPackCL).map(vals => mean(vals));
  return Math.max(...clVals) - Math.min(...clVals) >= 0.5;
}).length}`);

// === 9. PACK A SECTION A "EVALUATE" INFLATION ===
console.log('\n' + '─'.repeat(80));
console.log('SPECIFIC FINDING: Pack A Section A — Evaluate Inflation');
console.log('─'.repeat(80));

const aA = allItems.filter(i => i.Pack === 'A' && i.Section === 'A');
if (aA.length > 0) {
  const freq = {};
  aA.forEach(i => { freq[i.CognitiveLevel] = (freq[i.CognitiveLevel]||0)+1; });
  console.log('\nPack A Section A CL distribution:');
  for (const [k,v] of Object.entries(freq).sort((a,b) => CL_MAP[a[0]] - CL_MAP[b[0]])) {
    console.log(`  ${k.padEnd(12)}: ${v} (${(v/aA.length*100).toFixed(1)}%)`);
  }
  
  // Compare to other packs' Section A
  for (const pack of ['B','C','D','E']) {
    const otherA = allItems.filter(i => i.Pack === pack && i.Section === 'A');
    if (otherA.length === 0) continue;
    const otherFreq = {};
    otherA.forEach(i => { otherFreq[i.CognitiveLevel] = (otherFreq[i.CognitiveLevel]||0)+1; });
    console.log(`\n  vs Pack ${pack} Section A:`);
    for (const [k,v] of Object.entries(otherFreq).sort((a,b) => CL_MAP[a[0]] - CL_MAP[b[0]])) {
      console.log(`    ${k.padEnd(12)}: ${v} (${(v/otherA.length*100).toFixed(1)}%)`);
    }
  }
  
  // Pool Section A norm
  const poolA = allItems.filter(i => i.Section === 'A');
  const poolAFreq = {};
  poolA.forEach(i => { poolAFreq[i.CognitiveLevel] = (poolAFreq[i.CognitiveLevel]||0)+1; });
  console.log('\n  Pool Section A norm:');
  for (const [k,v] of Object.entries(poolAFreq).sort((a,b) => CL_MAP[a[0]] - CL_MAP[b[0]])) {
    console.log(`    ${k.padEnd(12)}: ${v} (${(v/poolA.length*100).toFixed(1)}%)`);
  }
}

// === 10. PACK E "REMEMBER" INFLATION ===
console.log('\n' + '─'.repeat(80));
console.log('SPECIFIC FINDING: Pack E — Remember Inflation');
console.log('─'.repeat(80));

const packE = allItems.filter(i => i.Pack === 'E');
const eFreq = {};
packE.forEach(i => { eFreq[i.CognitiveLevel] = (eFreq[i.CognitiveLevel]||0)+1; });
console.log('\nPack E CL distribution (overall):');
for (const [k,v] of Object.entries(eFreq).sort((a,b) => CL_MAP[a[0]] - CL_MAP[b[0]])) {
  console.log(`  ${k.padEnd(12)}: ${v} (${(v/packE.length*100).toFixed(1)}%)`);
}

// Compare with pool
console.log('\nPool CL distribution (minus Pack E):');
const poolMinusE = allItems.filter(i => i.Pack !== 'E');
const pmeFreq = {};
poolMinusE.forEach(i => { pmeFreq[i.CognitiveLevel] = (pmeFreq[i.CognitiveLevel]||0)+1; });
for (const [k,v] of Object.entries(pmeFreq).sort((a,b) => CL_MAP[a[0]] - CL_MAP[b[0]])) {
  console.log(`  ${k.padEnd(12)}: ${v} (${(v/poolMinusE.length*100).toFixed(1)}%)`);
}

console.log('\nPool vs Pack E CL delta:');
for (const [k,v] of Object.entries(eFreq).sort((a,b) => CL_MAP[a[0]] - CL_MAP[b[0]])) {
  const poolVal = (pmeFreq[k]||0) / poolMinusE.length * 100;
  const eVal = v / packE.length * 100;
  const delta = eVal - poolVal;
  console.log(`  ${k.padEnd(12)}: Pool=${poolVal.toFixed(1)}%  PackE=${eVal.toFixed(1)}%  Δ=${delta >= 0 ? '+' : ''}${delta.toFixed(1)}%${Math.abs(delta) >= 5 ? ' ***' : ''}`);
}

// === 11. CONSISTENCY GRADE ===
console.log('\n' + '─'.repeat(80));
console.log('DCS v1.1 CONSISTENCY GRADE');
console.log('─'.repeat(80));

// Calculate how many sections have CL deviation >= 1.0 from their section pool norm
let totalSections = 0;
let deviantSections = 0;
const deviantSectionDetails = [];

for (const sec of sections) {
  const packMeans = [];
  for (const pack of ['A','B','C','D','E']) {
    const key = `${pack}-${sec}`;
    if (sectionDist[key]) packMeans.push({ pack, cl: clMean(sectionDist[key].cl), ds: mean(sectionDist[key].ds) });
  }
  if (packMeans.length < 2) continue;
  totalSections++;
  const sectionCLMean = mean(packMeans.map(p => p.cl));
  for (const p of packMeans) {
    if (Math.abs(p.cl - sectionCLMean) >= 1.0) {
      deviantSections++;
      deviantSectionDetails.push(`Section ${sec} Pack ${p.pack}: CL=${clName(p.cl)}(${p.cl.toFixed(2)}) vs pool=${clName(sectionCLMean)}(${sectionCLMean.toFixed(2)})  Δ=${(p.cl-sectionCLMean).toFixed(2)}`);
    }
  }
}

console.log(`\nSection-level CL deviations ≥ 1.0 from section pool mean:`);
console.log(`  Deviant sections: ${deviantSections} of ${totalSections} sections (${(deviantSections/totalSections*100).toFixed(1)}%)`);
for (const d of deviantSectionDetails) {
  console.log(`    ${d}`);
}

// Pack-level CL mean vs pool
console.log('\nPack-level CL mean vs pool norm:');
const poolCLMean = clMean(allCL);
for (const pack of ['A','B','C','D','E']) {
  const pcl = clMean(clByPack[pack]);
  const diff = pcl - poolCLMean;
  console.log(`  Pack ${pack}: ${clName(pcl)}(${pcl.toFixed(2)})  Δ=${diff >= 0 ? '+' : ''}${diff.toFixed(2)}${Math.abs(diff) >= 0.5 ? ' ***' : ''}`);
}

// Consistency grade calculation
const deviantRate = deviantSections / totalSections;
let grade, gradeDesc;
if (deviantRate <= 0.1) { grade = 'A'; gradeDesc = 'Excellent — minimal cross-pack CL drift'; }
else if (deviantRate <= 0.2) { grade = 'B'; gradeDesc = 'Good — isolated deviations, batch recalibration recommended'; }
else if (deviantRate <= 0.35) { grade = 'C'; gradeDesc = 'Fair — systematic CL inconsistency across multiple sections'; }
else if (deviantRate <= 0.5) { grade = 'D'; gradeDesc = 'Poor — pervasive CL inconsistency, major recalibration needed'; }
else { grade = 'F'; gradeDesc = 'Failing — CL assignment is not functioning as a cross-pack standard'; }

console.log(`\nDCS v1.1 Consistency Grade: ${grade}`);
console.log(`  ${gradeDesc}`);
console.log(`  ${deviantSections} sections exceed ±1.0 CL deviation from section pool norm`);

// === 12. RECOMMENDATIONS ===
console.log('\n' + '─'.repeat(80));
console.log('RECOMMENDATIONS FOR BATCH CL RECALIBRATION');
console.log('─'.repeat(80));

console.log(`
1. PACK A SECTION A — EVALUATE INFLATION
   Pack A Section A assigns Evaluate to items that are Apply/Analyze elsewhere.
   Action: Recalibrate Pack A Section A items using pool Section A norm as baseline.
   Expected impact: ~15-20 items downgraded from Evaluate → Analyze/Apply.

2. PACK E — REMEMBER INFLATION
   Pack E over-assigns Remember compared to all other packs.
   Action: Recalibrate Pack E Remember items; most should be Understand.
   Expected impact: ~30-50 items upgraded from Remember → Understand.

3. DL-012 CLONE PACKS (C/D Section E)
   Clone packs are internally consistent with each other but inflated vs. pool Section E norm.
   Action: Batch recalibrate both Pack C and D Section E to pool Section E CL mean.

4. CROSS-PACK TOPIC NORMALIZATION
   Topics with CL range ≥ 1.0 across packs should be standardized.
   Each such topic needs a single CL assigned at the pool level.
`);

// Write detailed output
fs.writeFileSync(__dirname + '/crosspack_consistency_audit_S722A.json', JSON.stringify({
  timestamp: new Date().toISOString(),
  poolStats: {
    totalItems: 2500,
    poolCLMean: poolCLMean,
    poolDSMean: mean(allDS),
    poolCLFreq,
    poolDSFreq,
  },
  packProfiles,
  sectionCLMeans: packSectionCL,
  deviants: allDeviants,
  topicDeviants,
  grade,
  gradeDesc,
  deviantSections,
  totalSections,
  deviantSectionDetails,
}, null, 2));

console.log('\nDetailed JSON written to scripts/crosspack_consistency_audit_S722A.json');
