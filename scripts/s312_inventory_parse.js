const fs = require('fs');

const packMap = {
  'pack_a_corrected.js': 'a',
  'pack_b_corrected.js': 'b',
  'pack_c_corrected.js': 'c',
  'pack_d_corrected.js': 'd',
  'pack_e_corrected.js': 'e',
};

const results = {};

for (const [file, tag] of Object.entries(packMap)) {
  let src = fs.readFileSync(file, 'utf8');
  // Strip const VARNAME = [ and trailing ];
  const jsonStart = src.indexOf('[');
  const jsonEnd = src.lastIndexOf(']');
  if (jsonStart === -1 || jsonEnd === -1) {
    console.error('Could not find array boundaries in ' + file);
    continue;
  }
  const jsonStr = src.substring(jsonStart, jsonEnd + 1);
  let arr;
  try {
    arr = JSON.parse(jsonStr);
  } catch(e) {
    console.error('JSON parse failed for ' + file + ': ' + e.message.substring(0, 100));
    continue;
  }
  
  const sectionE = arr.filter(q => q.Section === 'E');
  const summary = { total: sectionE.length, byState: {} };

  const items = sectionE.map(q => ({
    QuestionID: q.QuestionID || '',
    Topic: q.Topic || '',
    MicroTopic: q.MicroTopic || '',
    question_state: q.question_state || '',
    DifficultyScore: q.DifficultyScore,
    Difficulty: q.Difficulty || '',
    CognitiveLevel: q.CognitiveLevel || '',
    LOSTag: q.LOSTag || '',
    CorrectChoice: q.CorrectChoice || '',
    Stem: (q.Stem || '').substring(0, 120),
    hasEW_A: !!(q.ExplanationWrongA),
    hasEW_B: !!(q.ExplanationWrongB),
    hasEW_C: !!(q.ExplanationWrongC),
    hasEW_D: !!(q.ExplanationWrongD),
    EC_len: (q.ExplanationCorrect || '').length
  }));

  for (const item of items) {
    const st = item.question_state || 'unknown';
    summary.byState[st] = (summary.byState[st] || 0) + 1;
  }

  results[tag] = { summary, items };
}

// All items
const allItems = [];
for (const [pack, data] of Object.entries(results)) {
  for (const item of data.items) {
    allItems.push({ pack, ...item });
  }
}

// Clone groups by microtopic
const groups = {};
for (const item of allItems) {
  const key = item.MicroTopic || 'unknown';
  if (!groups[key]) groups[key] = [];
  groups[key].push(item);
}

const cloneGroups = Object.entries(groups).filter(([k,v]) => v.length > 1).sort((a,b) => b[1].length - a[1].length);

// Topic distribution
const topicCounts = {};
for (const item of allItems) {
  const t = item.Topic || 'unknown';
  topicCounts[t] = (topicCounts[t] || 0) + 1;
}

// EW coverage
const ewCoverage = {};
for (const [pack, data] of Object.entries(results)) {
  const ew = { totalItems: data.summary.total, ewComplete: 0, ewPartial: 0, ewNone: 0 };
  for (const item of data.items) {
    const count = [item.hasEW_A, item.hasEW_B, item.hasEW_C, item.hasEW_D].filter(Boolean).length;
    if (count === 4) ew.ewComplete++;
    else if (count > 0 && count < 4) ew.ewPartial++;
    else ew.ewNone++;
  }
  ewCoverage[pack] = ew;
}

// CognitiveLevel distribution
const clDist = {};
for (const item of allItems) {
  const cl = item.CognitiveLevel || 'unknown';
  clDist[cl] = (clDist[cl] || 0) + 1;
}

// Difficulty distribution
const diffDist = {};
for (const item of allItems) {
  const d = item.Difficulty || 'unknown';
  diffDist[d] = (diffDist[d] || 0) + 1;
}

const output = {
  title: "SESSION312_DOMAIN_E_REPLACEMENT_INVENTORY",
  session: "312",
  generated: new Date().toISOString(),
  methodology: "JSON parse of all 5 pack files, Section E filter, clone-group analysis by MicroTopic",
  packSummaries: Object.fromEntries(Object.entries(results).map(([k,v]) => [k, v.summary])),
  totalDomainE: allItems.length,
  distributions: {
    cognitiveLevel: clDist,
    difficulty: diffDist,
    difficultyScore: {
      1: allItems.filter(i => i.DifficultyScore === 1).length,
      2: allItems.filter(i => i.DifficultyScore === 2).length,
      3: allItems.filter(i => i.DifficultyScore === 3).length,
      4: allItems.filter(i => i.DifficultyScore === 4).length,
      5: allItems.filter(i => i.DifficultyScore === 5).length,
    }
  },
  cloneGroupCount: cloneGroups.length,
  cloneGroups_top15: cloneGroups.slice(0, 15).map(([k,v]) => ({
    microTopic: k,
    count: v.length,
    packs: [...new Set(v.map(x => x.pack))],
    states: [...new Set(v.map(x => x.question_state))],
    qids: v.map(x => x.QuestionID),
    topics: [...new Set(v.map(x => x.Topic))].slice(0, 3)
  })),
  ewCoverage: ewCoverage,
  actionableItems: {
    archivedCount: allItems.filter(i => i.question_state === 'Archived').length,
    unprocessedCount: allItems.filter(i => i.question_state === 'Unprocessed').length,
    certifiedCount: allItems.filter(i => i.question_state === 'Certified').length,
    archivedByPack: Object.fromEntries(
      ['a','b','c','d','e'].map(p => [
        p, allItems.filter(i => i.pack === p && i.question_state === 'Archived').length
      ])
    ),
    unprocessedByPack: Object.fromEntries(
      ['a','b','c','d','e'].map(p => [
        p, allItems.filter(i => i.pack === p && i.question_state === 'Unprocessed').length
      ])
    )
  }
};

console.log(JSON.stringify(output, null, 2));
