const fs = require('fs');

// Map Section E CSO topics
const csomap = {
  'corporate governance': { cso: 'E.1.a', category: 'Corporate Governance' },
  'internal control framework': { cso: 'E.1.b', category: 'Internal Control Framework (COSO 2013)' },
  'coso internal control framework': { cso: 'E.1.b', category: 'Internal Control Framework (COSO 2013)' },
  'control environment': { cso: 'E.1.c', category: 'Control Environment' },
  'tone at top': { cso: 'E.1.c', category: 'Control Environment' },
  'risk assessment': { cso: 'E.1.d', category: 'Risk Assessment' },
  'inherent risk': { cso: 'E.1.d', category: 'Risk Assessment' },
  'control risk': { cso: 'E.1.d', category: 'Risk Assessment' },
  'control activities': { cso: 'E.1.e', category: 'Control Activities' },
  'segregation of duties': { cso: 'E.1.e', category: 'Control Activities' },
  'segregation': { cso: 'E.1.e', category: 'Control Activities' },
  'physical controls': { cso: 'E.1.e', category: 'Control Activities' },
  'bank reconciliation': { cso: 'E.1.e', category: 'Control Activities' },
  'information and communication': { cso: 'E.1.f', category: 'Information & Communication' },
  'information & communication': { cso: 'E.1.f', category: 'Information & Communication' },
  'whistleblower': { cso: 'E.1.f', category: 'Information & Communication' },
  'monitoring': { cso: 'E.1.g', category: 'Monitoring' },
  'internal audit': { cso: 'E.1.g', category: 'Monitoring' },
  'management override': { cso: 'E.1.c', category: 'Control Environment' },
  'sox': { cso: 'E.1.h', category: 'Sarbanes-Oxley Act (SOX)' },
  'sarbanes': { cso: 'E.1.h', category: 'Sarbanes-Oxley Act (SOX)' },
  'external auditing': { cso: 'E.1.i', category: 'External Auditing' },
  'external audit': { cso: 'E.1.i', category: 'External Auditing' },
  'systems controls': { cso: 'E.1.j', category: 'Systems Controls' },
  'it general controls': { cso: 'E.1.j', category: 'Systems Controls' },
  'it controls': { cso: 'E.1.j', category: 'Systems Controls' },
  'erm risk appetite': { cso: 'E.1.d', category: 'Risk Assessment' },
  'fraud triangle': { cso: 'E.1.c', category: 'Control Environment' },
  'three lines of defense': { cso: 'E.1.g', category: 'Monitoring' },
  'compensating control': { cso: 'E.1.e', category: 'Control Activities' },
  'remediation of control deficiency': { cso: 'E.1.g', category: 'Monitoring' },
  'preventive detective controls': { cso: 'E.1.e', category: 'Control Activities' },
  'application controls': { cso: 'E.1.j', category: 'Systems Controls' },
};

function classifyTopic(topic) {
  if (!topic) return { cso: 'unknown', category: 'Unclassified' };
  const t = topic.toLowerCase();
  for (const [key, val] of Object.entries(csomap)) {
    if (t.includes(key)) return val;
  }
  return { cso: 'E.1', category: 'Internal Controls (General)' };
}

// Parse pack B and pack C
function parsePack(file) {
  const src = fs.readFileSync(file, 'utf8');
  const jsonStart = src.indexOf('[');
  const jsonEnd = src.lastIndexOf(']');
  return JSON.parse(src.substring(jsonStart, jsonEnd + 1));
}

const packB = parsePack('pack_b_corrected.js').filter(q => q.Section === 'E');
const packC = parsePack('pack_c_corrected.js').filter(q => q.Section === 'E');
const packD = parsePack('pack_d_corrected.js').filter(q => q.Section === 'E');

// Coverage from gold-standard Pack B
const packBCoverage = {};
for (const item of packB) {
  const cls = classifyTopic(item.Topic);
  if (!packBCoverage[cls.category]) packBCoverage[cls.category] = [];
  packBCoverage[cls.category].push(item.QuestionID);
}

// Clone group topics from Packs C/D
const cloneTopics = {};
for (const item of [...packC, ...packD]) {
  const mt = item.MicroTopic || 'unknown';
  if (!cloneTopics[mt]) cloneTopics[mt] = { count: 0, category: '', items: [] };
  cloneTopics[mt].count++;
  cloneTopics[mt].category = classifyTopic(item.Topic).category;
  cloneTopics[mt].items.push(item.QuestionID);
}

// Filter to actual clones (> 1 item)
const actualClones = Object.entries(cloneTopics).filter(([k,v]) => v.count > 1);

// Coverage gap analysis
const categories = [...new Set(Object.values(csomap).map(v => v.category))];
const coverageMatrix = {};
for (const cat of categories) {
  const packBitems = packBCoverage[cat] || [];
  const cloneItems = actualClones.filter(([k,v]) => v.category === cat);
  const cloneTotal = cloneItems.reduce((sum, [k,v]) => sum + v.count, 0);
  coverageMatrix[cat] = {
    coverage: 'COVERED',
    packB_benchmark_items: packBitems.length,
    clone_items_requiring_replacement: cloneTotal,
    clone_groups: cloneItems.length,
    cloneTopicList: cloneItems.map(([k,v]) => k)
  };
}

// Also flag coverage gaps
const gap = categories.filter(cat => !packBCoverage[cat] || packBCoverage[cat].length === 0);

const output = {
  title: "SESSION312_BLUEPRINT_COVERAGE_MATRIX",
  session: "312",
  generated: new Date().toISOString(),
  csoBlueprint: {
    section: "E — Internal Controls",
    topics: [
      "E.1.a Corporate Governance",
      "E.1.b Internal Control Framework (COSO 2013)",
      "E.1.c Control Environment",
      "E.1.d Risk Assessment",
      "E.1.e Control Activities",
      "E.1.f Information & Communication",
      "E.1.g Monitoring",
      "E.1.h Sarbanes-Oxley Act (SOX)",
      "E.1.i External Auditing",
      "E.1.j Systems Controls"
    ]
  },
  coverageMatrix: coverageMatrix,
  packB_benchmark: {
    totalSectionE: packB.length,
    allCertified: packB.every(q => q.question_state === 'Certified'),
    // Extract DL-008 check
    hasDL008: packB.filter(q => {
      const cc = q.CorrectChoice;
      const ew = q['ExplanationWrong' + cc];
      return ew && ew.length > 0;
    }).length,
    // Topic distribution
    topicsCovered: [...new Set(packB.map(q => classifyTopic(q.Topic).category))],
    // Difficulty distribution
    difficultyDist: packB.reduce((acc, q) => {
      acc[q.Difficulty || 'unknown'] = (acc[q.Difficulty || 'unknown'] || 0) + 1;
      return acc;
    }, {}),
    // CL distribution
    clDist: packB.reduce((acc, q) => {
      acc[q.CognitiveLevel || 'unknown'] = (acc[q.CognitiveLevel || 'unknown'] || 0) + 1;
      return acc;
    }, {})
  },
  replacementCoverageGaps: gap,
  summary: {
    totalCategories: categories.length,
    coveredByPackB: categories.length - gap.length,
    gaps: gap,
    totalCloneItemsNeedingReplacement: actualClones.reduce((sum, [,v]) => sum + v.count, 0),
    uniqueCloneTopics: actualClones.length
  }
};

console.log(JSON.stringify(output, null, 2));
