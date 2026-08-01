const fs = require('fs');
const raw = fs.readFileSync('content/cases/legacy/scored_cases.js', 'utf8');

// Find the array assignment
const jsonStart = raw.indexOf('[');
let depth = 0, inString = false, stringChar = null, esc = false;
let end = -1;

for (let i = jsonStart; i < raw.length; i++) {
    const ch = raw[i];
    if (esc) { esc = false; continue; }
    if (inString) {
        if (ch === '\\') { esc = true; continue; }
        if (ch === stringChar) { inString = false; continue; }
        continue;
    }
    if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
    if (ch === '{' || ch === '[') { depth++; continue; }
    if (ch === '}' || ch === ']') { depth--; if (depth === 0) { end = i + 1; break; } continue; }
}

const jsonBlock = raw.slice(jsonStart, end);
let cases;
try {
    cases = new Function('return ' + jsonBlock)();
} catch(e) {
    console.log('Function constructor FAILED:', e.message);
    process.exit(1);
}

const cbqCases = cases.filter(c => c && c.CaseID && String(c.CaseID).startsWith('CBQ-'));

console.error('CBQ cases found:', cbqCases.length);

let totalItems = 0;
const allItems = [];
const caseSummaries = [];

// Schema anomaly tracking
const anomalies = [];

for (const c of cbqCases) {
    const items = c.Items || [];
    totalItems += items.length;

    const caseSummary = {
        CaseID: c.CaseID,
        Domain: (c.SectionTags || []).join(','),
        Title: c.Title || 'MISSING',
        ItemCount: items.length,
        ExhibitCount: (c.Exhibits || []).length,
        ProductionStatus: c.ProductionStatus || 'MISSING',
        Difficulty: c.Difficulty || 'MISSING',
        DifficultyScore: c.DifficultyScore !== undefined ? c.DifficultyScore : 'MISSING',
        question_state: c.question_state || 'MISSING'
    };
    caseSummaries.push(caseSummary);

    for (const item of items) {
        // Check for missing/empty fields
        const missingFields = [];
        if (!item.ItemID) missingFields.push('ItemID');
        if (!item.Type) missingFields.push('Type');
        if (!item.Prompt) missingFields.push('Prompt');
        if (item.Correct === undefined || item.Correct === null) missingFields.push('Correct');
        if (!item.Explanation || item.Explanation.length === 0) missingFields.push('Explanation');
        if (!item.Topic) missingFields.push('Topic');
        if (!item.Difficulty) missingFields.push('Difficulty');
        if (item.DifficultyScore === undefined || item.DifficultyScore === null) missingFields.push('DifficultyScore');
        if (!item.CognitiveLevel) missingFields.push('CognitiveLevel');
        if (item.CalculationRequired === undefined || item.CalculationRequired === null) missingFields.push('CalculationRequired');

        // Schema anomaly check: look for empty string vs missing field
        const hasExplanation = item.hasOwnProperty('Explanation');
        if (hasExplanation && (item.Explanation === null || item.Explanation === undefined)) {
            anomalies.push({ CaseID: c.CaseID, ItemID: item.ItemID || 'MISSING', field: 'Explanation', issue: 'null/undefined value' });
        }

        const row = {
            CaseID: c.CaseID,
            ItemID: item.ItemID || 'MISSING',
            Domain: (c.SectionTags || []).join(','),
            Type: item.Type || 'MISSING',
            Difficulty: item.Difficulty || 'MISSING',
            DifficultyScore: item.DifficultyScore !== undefined ? item.DifficultyScore : 'MISSING',
            CognitiveLevel: item.CognitiveLevel || 'MISSING',
            question_state: item.question_state || 'MISSING',
            ExplanationLength: (item.Explanation || '').length,
            ProductionStatus: c.ProductionStatus || 'MISSING',
            CalculationRequired: item.CalculationRequired !== undefined ? item.CalculationRequired : 'MISSING',
            ExhibitCount: (c.Exhibits || []).length,
            MissingFields: missingFields.length > 0 ? missingFields : null
        };
        allItems.push(row);
    }
}

// Verification
const uniqueItemIDs = new Set(allItems.map(i => i.ItemID));
const uniqueCaseIDs = new Set(allItems.map(i => i.CaseID));

// Aggregate statistics
const domainDist = {};
const difficultyDist = {};
const cogLevelDist = {};
const stateDist = {};
let totalExplLen = 0;
let minExplLen = Infinity;
let maxExplLen = -Infinity;
let itemsMissingMeta = 0;
let itemsWithMissingFields = [];

for (const item of allItems) {
    // Domain distribution
    const dom = item.Domain;
    domainDist[dom] = (domainDist[dom] || 0) + 1;

    // Difficulty
    const diff = item.Difficulty;
    difficultyDist[diff] = (difficultyDist[diff] || 0) + 1;

    // CognitiveLevel
    const cog = item.CognitiveLevel;
    cogLevelDist[cog] = (cogLevelDist[cog] || 0) + 1;

    // Certification state
    const state = item.question_state;
    stateDist[state] = (stateDist[state] || 0) + 1;

    // Explanation length
    const elen = item.ExplanationLength;
    totalExplLen += elen;
    if (elen < minExplLen) minExplLen = elen;
    if (elen > maxExplLen) maxExplLen = elen;

    // Missing metadata
    if (item.MissingFields) {
        itemsMissingMeta++;
        itemsWithMissingFields.push({ ItemID: item.ItemID, CaseID: item.CaseID, MissingFields: item.MissingFields });
    }
}

const avgExplLen = totalItems > 0 ? Math.round(totalExplLen / totalItems) : 0;

const aggregates = {
    totalCaseIDs: uniqueCaseIDs.size,
    totalItemIDs: allItems.length,
    uniqueItemIDs: uniqueItemIDs.size,
    uniqueCaseIDs_verified: Array.from(uniqueCaseIDs).sort(),
    domainDistribution: domainDist,
    difficultyDistribution: difficultyDist,
    cognitiveLevelDistribution: cogLevelDist,
    certificationStateDistribution: stateDist,
    averageExplanationLength: avgExplLen,
    minExplanationLength: minExplLen === Infinity ? 0 : minExplLen,
    maxExplanationLength: maxExplLen === -Infinity ? 0 : maxExplLen,
    totalExplanationLength: totalExplLen,
    itemsWithMissingMetadata: itemsMissingMeta,
    itemsMissingMetadataList: itemsWithMissingFields,
    schemaAnomalies: anomalies,
    verification: {
        totalItemIDs_equal_90: allItems.length === 90,
        uniqueCaseIDs_equal_15: uniqueCaseIDs.size === 15,
        allItemIDs_unique: uniqueItemIDs.size === allItems.length,
        noDuplicateCaseIDs: uniqueCaseIDs.size === cbqCases.length,
        certifiedCount: stateDist['Certified'] || 0
    }
};

const output = {
    generated: new Date().toISOString(),
    source: 'scored_cases.js',
    agent: 'Agent A — Session 529 ENHANCED_CASE_BASE Full Census',
    methodology: 'Function-constructor parse, boundary-aware string parsing of array literal',
    caseSummaries: caseSummaries,
    aggregateStatistics: aggregates,
    items: allItems
};

fs.writeFileSync('reports/session_status/SESSION529_CENSUS_AGENT_A.json', JSON.stringify(output, null, 2));
console.log('Census written. Items:', allItems.length, 'Cases:', cbqCases.length);
console.log(JSON.stringify(aggregates, null, 2));
