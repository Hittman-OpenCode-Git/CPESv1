// Session 93P — Stratified sampling design for Evaluate/Analyze classification audit
// Read-only. Outputs the QID lists for the audit sample.

const fs = require('fs');
const path = require('path');

const framePath = path.join(__dirname, 'output', 'SESSION093P_SAMPLE_FRAME.json');
const frame = JSON.parse(fs.readFileSync(framePath, 'utf8'));

// Seeded random for reproducibility
function seededRandom(seed) {
  let s = seed;
  return function() {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
const rng = seededRandom(20260731);

function shuffle(arr, rngFn) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rngFn() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function stratify(items, totalTarget) {
  // Stratify by pack, then by section within pack
  const byPack = {};
  for (const item of items) {
    if (!byPack[item.pack]) byPack[item.pack] = {};
    if (!byPack[item.pack][item.section]) byPack[item.pack][item.section] = [];
    byPack[item.pack][item.section].push(item);
  }

  // Proportional allocation
  const total = items.length;
  const sample = [];
  const allocations = [];

  for (const [pack, sections] of Object.entries(byPack)) {
    for (const [section, sectionItems] of Object.entries(sections)) {
      const proportion = sectionItems.length / total;
      let n = Math.round(proportion * totalTarget);
      if (n < 1) n = 1; // minimum 1 per section
      if (n > sectionItems.length) n = sectionItems.length;
      
      const shuffled = shuffle(sectionItems, rng);
      const selected = shuffled.slice(0, n);
      
      allocations.push({
        pack, section,
        population: sectionItems.length,
        sample: n,
        proportion: (n / sectionItems.length * 100).toFixed(1) + '%'
      });
      
      sample.push(...selected);
    }
  }

  // Adjust if total sample size deviates from target (rounding errors)
  // Add or remove items to hit target
  while (sample.length < totalTarget) {
    // Find sections with remaining items
    const candidates = [];
    for (const [pack, sections] of Object.entries(byPack)) {
      for (const [section, sectionItems] of Object.entries(sections)) {
        const alreadySampled = new Set(sample.map(i => i.qid));
        const remaining = sectionItems.filter(i => !alreadySampled.has(i.qid));
        if (remaining.length > 0) candidates.push(...remaining);
      }
    }
    if (candidates.length === 0) break;
    sample.push(candidates[Math.floor(rng() * candidates.length)]);
  }
  
  while (sample.length > totalTarget) {
    sample.pop();
  }

  return { sample, allocations };
}

// Design Evaluate sample: target 75
const evalResult = stratify(frame.evaluateItems, 75);

// Design Analyze sample: target 75
const analyzeResult = stratify(frame.analyzeItems, 75);

// Output
console.log('=== EVALUATE SAMPLE (target 75) ===');
console.log(`Total sampled: ${evalResult.sample.length}`);
console.log('\nAllocations:');
for (const a of evalResult.allocations.sort((x,y) => x.pack.localeCompare(y.pack) || x.section.localeCompare(y.section))) {
  console.log(`  ${a.pack} Section ${a.section}: ${a.sample}/${a.population} (${a.proportion})`);
}

console.log('\n=== ANALYZE SAMPLE (target 75) ===');
console.log(`Total sampled: ${analyzeResult.sample.length}`);
console.log('\nAllocations:');
for (const a of analyzeResult.allocations.sort((x,y) => x.pack.localeCompare(y.pack) || x.section.localeCompare(y.section))) {
  console.log(`  ${a.pack} Section ${a.section}: ${a.sample}/${a.population} (${a.proportion})`);
}

// Output full sample data
const output = {
  session: 'SESSION093P',
  timestamp: new Date().toISOString(),
  methodology: 'Stratified random sampling (proportional allocation by pack×section)',
  seed: 20260731,
  evaluate: {
    population: frame.evaluateItems.length,
    target: 75,
    actual: evalResult.sample.length,
    allocations: evalResult.allocations,
    sample: evalResult.sample.map(i => ({
      qid: i.qid, pack: i.pack, section: i.section,
      cognitiveLevel: i.cognitiveLevel, topic: i.topic,
      difficulty: i.difficulty, difficultyScore: i.difficultyScore,
      questionState: i.questionState,
      stem: i.stem.substring(0, 300),
      choices: i.choices,
      correctChoice: i.correctChoice,
      explanationCorrect: i.explanationCorrect,
    })),
  },
  analyze: {
    population: frame.analyzeItems.length,
    target: 75,
    actual: analyzeResult.sample.length,
    allocations: analyzeResult.allocations,
    sample: analyzeResult.sample.map(i => ({
      qid: i.qid, pack: i.pack, section: i.section,
      cognitiveLevel: i.cognitiveLevel, topic: i.topic,
      difficulty: i.difficulty, difficultyScore: i.difficultyScore,
      questionState: i.questionState,
      stem: i.stem.substring(0, 300),
      choices: i.choices,
      correctChoice: i.correctChoice,
      explanationCorrect: i.explanationCorrect,
    })),
  },
};

const outPath = path.join(__dirname, 'output', 'SESSION093P_AUDIT_SAMPLE.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log(`\nOutput written to: ${outPath}`);
console.log(`Total items to audit: ${evalResult.sample.length + analyzeResult.sample.length}`);
