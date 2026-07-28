// Session 537 - Agent Q+S+T Analytics and Metrics
const fs = require('fs');
const path = require('path');

const scoredCasesPath = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026\\scored_cases.js';
const raw = fs.readFileSync(scoredCasesPath, 'utf8');

// Parse the file using Function constructor
let cases = [];
try {
    const wrapped = 'const exports = {}; ' + raw + '; exports.ENHANCED_CASE_BASE = ENHANCED_CASE_BASE; return ENHANCED_CASE_BASE;';
    const fn = new Function(wrapped);
    cases = fn();
} catch (e) {
    console.error('PARSE ERROR:', e.message);
    process.exit(1);
}

console.log('=== PARSE RESULT ===');
console.log('Cases parsed: ' + cases.length);
console.log('');

// ============================================================
// PART 1 — Pre-Flight Validation (Agent T)
// ============================================================
console.log('=========== PART 1: PRE-FLIGHT VALIDATION (Agent T) ===========');
console.log('');

let preflightPass = true;
let preflightErrors = [];

// 1. Can all 15 cases be parsed correctly?
console.log('1. PARSE CHECK');
if (cases.length === 15) {
    console.log('   PASS: 15 cases parsed successfully');
} else {
    console.log('   FAIL: Expected 15 cases, got ' + cases.length);
    preflightPass = false;
    preflightErrors.push('Parse count mismatch: expected 15, got ' + cases.length);
}

// Helper
let allItems = [];
let allCaseIDs = new Set();
let allItemIDs = new Set();
let caseDuplicateIDs = [];
let itemDuplicateIDs = [];

for (let c of cases) {
    // 2. CaseID present
    if (!c.CaseID) {
        preflightPass = false;
        preflightErrors.push('Missing CaseID in a case object');
    } else {
        if (allCaseIDs.has(c.CaseID)) {
            caseDuplicateIDs.push(c.CaseID);
        } else {
            allCaseIDs.add(c.CaseID);
        }
    }

    // Items
    if (!c.Items || !Array.isArray(c.Items)) {
        preflightPass = false;
        preflightErrors.push('Case ' + (c.CaseID || '?') + ' has no Items array');
        continue;
    }

    for (let item of c.Items) {
        item._CaseID = c.CaseID;
        allItems.push(item);

        // 3. ItemID present
        if (!item.ItemID) {
            preflightPass = false;
            preflightErrors.push('Missing ItemID in case ' + c.CaseID + ' Qu items');
        } else {
            if (allItemIDs.has(item.ItemID)) {
                itemDuplicateIDs.push(item.ItemID);
            } else {
                allItemIDs.add(item.ItemID);
            }
        }
    }
}

console.log('2. CaseID FIELDS');
console.log('   Unique CaseIDs: ' + allCaseIDs.size);
console.log('   All present: ' + (allCaseIDs.size === cases.length ? 'PASS' : 'FAIL'));
if (caseDuplicateIDs.length > 0) {
    console.log('   DUPLICATE CaseIDs: ' + caseDuplicateIDs.join(', '));
    preflightPass = false;
    preflightErrors.push('Duplicate CaseIDs: ' + caseDuplicateIDs.join(', '));
}

console.log('3. ItemID FIELDS');
console.log('   Unique ItemIDs: ' + allItemIDs.size);
console.log('   Total items: ' + allItems.length);
console.log('   All present & unique: ' + (allItemIDs.size === allItems.length ? 'PASS' : 'FAIL'));
if (itemDuplicateIDs.length > 0) {
    console.log('   DUPLICATE ItemIDs: ' + itemDuplicateIDs.join(', '));
    preflightPass = false;
    preflightErrors.push('Duplicate ItemIDs: ' + itemDuplicateIDs.join(', '));
}

// 5. All item Types are valid
const validTypes = ['numeric', 'select', 'multi', 'fill', 'match'];
let invalidTypeCount = 0;
let typeErrors = [];
for (let item of allItems) {
    if (!validTypes.includes(item.Type)) {
        invalidTypeCount++;
        typeErrors.push(item.ItemID + ': ' + (item.Type || 'MISSING'));
    }
}
console.log('5. ITEM TYPES');
console.log('   Valid types (' + validTypes.join(',') + ')');
console.log('   Invalid/missing: ' + invalidTypeCount + ' (' + (invalidTypeCount === 0 ? 'PASS' : 'FAIL') + ')');
if (invalidTypeCount > 0) {
    console.log('   Errors: ' + typeErrors.join('; '));
    preflightPass = false;
    preflightErrors.push('Invalid item types: ' + typeErrors.join('; '));
}

// 6. All Correct values present
let missingCorrectCount = 0;
let missingCorrectIDs = [];
for (let item of allItems) {
    if (item.Correct === undefined || item.Correct === null) {
        missingCorrectCount++;
        missingCorrectIDs.push(item.ItemID);
    } else if (item.Type === 'multi' && (!Array.isArray(item.Correct) || item.Correct.length === 0)) {
        missingCorrectCount++;
        missingCorrectIDs.push(item.ItemID + ' (multi array empty)');
    }
}
console.log('6. Correct VALUES');
console.log('   Missing: ' + missingCorrectCount + ' (' + (missingCorrectCount === 0 ? 'PASS' : 'FAIL') + ')');
if (missingCorrectCount > 0) {
    preflightPass = false;
    preflightErrors.push('Missing Correct values: ' + missingCorrectIDs.join(', '));
}

// 7. All question_state values are valid
const validStates = ['Unprocessed', 'In Audit', 'Editorial Queue', 'Certified', 'Archived'];
let invalidStateCount = 0;
let invalidStateItems = [];
for (let item of allItems) {
    let qs = item.question_state;
    if (!qs) {
        invalidStateCount++;
        invalidStateItems.push(item.ItemID + ': MISSING');
    } else if (!validStates.includes(qs)) {
        invalidStateCount++;
        invalidStateItems.push(item.ItemID + ': "' + qs + '"');
    }
}
// Also check case-level question_state
let invalidCaseStateCount = 0;
for (let c of cases) {
    let qs = c.question_state;
    if (!qs) {
        invalidCaseStateCount++;
        invalidStateItems.push(c.CaseID + ' (case-level): MISSING');
    } else if (!validStates.includes(qs)) {
        invalidCaseStateCount++;
        invalidStateItems.push(c.CaseID + ' (case-level): "' + qs + '"');
    }
}
console.log('7. question_state VALIDITY');
console.log('   Item-level invalid: ' + invalidStateCount + ' (' + (invalidStateCount === 0 ? 'PASS' : 'FAIL') + ')');
console.log('   Case-level invalid: ' + invalidCaseStateCount + ' (' + (invalidCaseStateCount === 0 ? 'PASS' : 'FAIL') + ')');
if (invalidStateCount > 0 || invalidCaseStateCount > 0) {
    preflightPass = false;
    preflightErrors.push('Invalid question_state: ' + invalidStateItems.join('; '));
}

// 8. Governance Guard Rule 2: EW[CC] must be "" 
// For scored_cases, items are select/multi type - check ExplanationWrong fields
let dl008Count = 0;
let dl008Items = [];
for (let item of allItems) {
    let cc = item.Correct;
    if (!cc) continue;
    
    // For select type: cc is a string choice text
    if (item.Type === 'select') {
        let choices = item.Choices || [];
        let ccIndex = -1;
        for (let i = 0; i < choices.length; i++) {
            if (choices[i] === cc) ccIndex = i;
        }
        if (ccIndex >= 0) {
            let letters = ['A', 'B', 'C', 'D', 'E', 'F'];
            let ccLetter = letters[ccIndex];
            let ewField = 'ExplanationWrong' + ccLetter;
            if (item[ewField] && item[ewField] !== '') {
                dl008Count++;
                dl008Items.push(item.ItemID + ' (' + ewField + ' = "' + item[ewField].substring(0, 60) + '...")');
            }
        }
    }
    // For multi type: cc is array, each correct answer's EW should be ""
    if (item.Type === 'multi') {
        let choices = item.Choices || [];
        for (let correctVal of cc) {
            let ccIndex = choices.indexOf(correctVal);
            if (ccIndex >= 0) {
                let letters = ['A', 'B', 'C', 'D', 'E', 'F'];
                let ccLetter = letters[ccIndex];
                let ewField = 'ExplanationWrong' + ccLetter;
                if (item[ewField] && item[ewField] !== '') {
                    dl008Count++;
                    dl008Items.push(item.ItemID + ' multi-' + ccLetter);
                }
            }
        }
    }
}
console.log('8. GOVERNANCE GUARD RULE 2 (EW[CC] = "")');
console.log('   DL-008 violations: ' + dl008Count + ' (' + (dl008Count === 0 ? 'PASS' : 'FAIL') + ')');
if (dl008Count > 0) {
    preflightPass = false;
    preflightErrors.push('DL-008 violations: ' + dl008Items.join('; '));
    console.log('   Items: ' + dl008Items.slice(0, 10).join('\n          '));
}

console.log('');
console.log('PRE-FLIGHT OVERALL: ' + (preflightPass ? 'PASS' : 'FAIL - ' + preflightErrors.length + ' error(s)'));
if (!preflightPass) {
    console.log('Errors:');
    preflightErrors.forEach(e => console.log('  - ' + e));
}
console.log('');

// ============================================================
// PART 2 — Certification Analytics (Agent Q)
// ============================================================
console.log('=========== PART 2: CERTIFICATION ANALYTICS (Agent Q) ===========');
console.log('');

// Avg explanation length by type
let typeExplanations = {};
for (let item of allItems) {
    let t = item.Type;
    if (!typeExplanations[t]) typeExplanations[t] = { total: 0, count: 0, lengths: [] };
    let explen = (item.Explanation || '').length;
    typeExplanations[t].total += explen;
    typeExplanations[t].count++;
    typeExplanations[t].lengths.push(explen);
}

console.log('2.1 AVG EXPLANATION LENGTH BY TYPE');
for (let [t, data] of Object.entries(typeExplanations)) {
    let avg = Math.round(data.total / data.count);
    let min = Math.min(...data.lengths);
    let max = Math.max(...data.lengths);
    console.log('   ' + t + ': avg=' + avg + ' chars, range=' + min + '-' + max + ', count=' + data.count);
}
console.log('');

// ExplanationWrong coverage
let totalDistractorSlots = 0;
let filledDistractorSlots = 0;
let ewFieldsByItem = [];
for (let item of allItems) {
    let covered = 0;
    let total = 0;
    if (item.Type === 'select' && item.Choices) {
        let choices = item.Choices;
        let cc = item.Correct;
        for (let i = 0; i < choices.length; i++) {
            if (choices[i] !== cc) {
                total++;
                let ewField = 'ExplanationWrong' + String.fromCharCode(65 + i);
                if (item[ewField] && item[ewField].length > 0) covered++;
            }
        }
    }
    if (item.Type === 'multi' && item.Choices) {
        let choices = item.Choices;
        let cc = Array.isArray(item.Correct) ? item.Correct : [];
        for (let i = 0; i < choices.length; i++) {
            if (!cc.includes(choices[i])) {
                total++;
                let ewField = 'ExplanationWrong' + String.fromCharCode(65 + i);
                if (item[ewField] && item[ewField].length > 0) covered++;
            }
        }
    }
    totalDistractorSlots += total;
    filledDistractorSlots += covered;
    if (total > 0) {
        ewFieldsByItem.push({ id: item.ItemID, type: item.Type, total, covered, pct: Math.round(covered/total*100) });
    }
}

console.log('2.2 EXPLANATION WRONG COVERAGE');
console.log('   Total distractor slots: ' + totalDistractorSlots);
console.log('   Filled slots: ' + filledDistractorSlots);
console.log('   Coverage: ' + (totalDistractorSlots > 0 ? Math.round(filledDistractorSlots / totalDistractorSlots * 100) : 0) + '%');
let partialItems = ewFieldsByItem.filter(x => x.pct < 100);
let zeroItems = ewFieldsByItem.filter(x => x.pct === 0);
console.log('   Items with partial coverage (<100%): ' + partialItems.length);
console.log('   Items with zero EW coverage: ' + zeroItems.length);
if (zeroItems.length > 0) {
    console.log('   Zero-coverage items: ' + zeroItems.map(x => x.id).join(', '));
}
console.log('');

// Case-level per-item EW detail
for (let c of cases) {
    let caseItems = c.Items || [];
    let caseEW = caseItems.map(it => {
        let total = 0, covered = 0;
        if (it.Type === 'select' && it.Choices) {
            let cc = it.Correct;
            for (let i = 0; i < it.Choices.length; i++) {
                if (it.Choices[i] !== cc) {
                    total++;
                    let ewField = 'ExplanationWrong' + String.fromCharCode(65 + i);
                    if (it[ewField] && it[ewField].length > 0) covered++;
                }
            }
        }
        if (it.Type === 'multi' && it.Choices) {
            let cc = Array.isArray(it.Correct) ? it.Correct : [];
            for (let i = 0; i < it.Choices.length; i++) {
                if (!cc.includes(it.Choices[i])) {
                    total++;
                    let ewField = 'ExplanationWrong' + String.fromCharCode(65 + i);
                    if (it[ewField] && it[ewField].length > 0) covered++;
                }
            }
        }
        return { id: it.ItemID, type: it.Type, cov: total > 0 ? covered + '/' + total : 'N/A' };
    });
    console.log('   ' + c.CaseID + ': ' + caseEW.map(x => x.id + '(' + x.type + '=' + x.cov + ')').join(', '));
}
console.log('');

// Metadata completion
const requiredItemFields = [
    'ItemID', 'Type', 'Prompt', 'Correct', 'Explanation', 'Topic',
    'CognitiveLevel', 'QuestionState'  // question_state
];
console.log('2.3 METADATA COMPLETION');
let totalReqFields = 0;
let totalPresentFields = 0;
let fieldStats = {};

// Item-level required fields
const itemReq = ['ItemID', 'Type', 'Prompt', 'Correct', 'Explanation', 'Topic', 'CognitiveLevel', 'question_state', 'Difficulty', 'DifficultyScore'];
for (let field of itemReq) {
    fieldStats[field] = { total: allItems.length, present: 0 };
}
for (let item of allItems) {
    for (let field of itemReq) {
        if (item[field] !== undefined && item[field] !== null && item[field] !== '') {
            fieldStats[field].present++;
        }
    }
}

// Case-level required fields
const caseReq = ['CaseID', 'Title', 'SectionTags', 'BlueprintDomain', 'BlueprintObjectives', 'PrimaryCompetency', 'EstimatedMinutes', 'Difficulty', 'DifficultyScore', 'ScenarioText', 'Industry', 'CompanyType', 'CompanyName', 'Stakeholder', 'BusinessFunction', 'QuestionCount', 'ExhibitCount', 'ProductionStatus', 'Version', 'CreatedDate', 'ModifiedDate', 'Author', 'Confidence', 'LearningObjectives'];
let caseStats = {};
for (let field of caseReq) {
    caseStats[field] = { total: cases.length, present: 0 };
}
for (let c of cases) {
    for (let field of caseReq) {
        if (c[field] !== undefined && c[field] !== null) {
            // For arrays, check they have content
            if (Array.isArray(c[field]) && c[field].length === 0) continue;
            caseStats[field].present++;
        }
    }
}

console.log('   Item-level metadata:');
for (let [field, data] of Object.entries(fieldStats)) {
    let pct = Math.round(data.present / data.total * 100);
    let status = pct === 100 ? 'OK' : (pct >= 90 ? 'WARN' : 'FAIL');
    console.log('     ' + field + ': ' + data.present + '/' + data.total + ' (' + pct + '%) ' + status);
    totalReqFields += data.total;
    totalPresentFields += data.present;
}
console.log('   Case-level metadata:');
for (let [field, data] of Object.entries(caseStats)) {
    let pct = Math.round(data.present / data.total * 100);
    let status = pct === 100 ? 'OK' : (pct >= 90 ? 'WARN' : 'FAIL');
    console.log('     ' + field + ': ' + data.present + '/' + data.total + ' (' + pct + '%) ' + status);
    totalReqFields += data.total;
    totalPresentFields += data.present;
}
console.log('   Overall metadata completeness: ' + Math.round(totalPresentFields/totalReqFields*100) + '%');
console.log('');

// Difficulty distribution
let diffDist = {};
for (let item of allItems) {
    let d = item.Difficulty || 'Unspecified';
    diffDist[d] = (diffDist[d] || 0) + 1;
}
console.log('2.4 DIFFICULTY DISTRIBUTION (Item-level)');
for (let [d, count] of Object.entries(diffDist)) {
    console.log('   ' + d + ': ' + count + ' items (' + Math.round(count/allItems.length*100) + '%)');
}

// Case-level difficulty
let caseDiffDist = {};
for (let c of cases) {
    let d = c.Difficulty || 'Unspecified';
    caseDiffDist[d] = (caseDiffDist[d] || 0) + 1;
}
console.log('   Case-level:');
for (let [d, count] of Object.entries(caseDiffDist)) {
    console.log('     ' + d + ': ' + count + ' cases (' + Math.round(count/cases.length*100) + '%)');
}
console.log('');

// Cognitive level distribution
let cogDist = {};
for (let item of allItems) {
    let cl = item.CognitiveLevel || 'Unspecified';
    cogDist[cl] = (cogDist[cl] || 0) + 1;
}
console.log('2.5 COGNITIVE LEVEL DISTRIBUTION');
for (let [cl, count] of Object.entries(cogDist)) {
    console.log('   ' + cl + ': ' + count + ' items (' + Math.round(count/allItems.length*100) + '%)');
}
console.log('');

// Explanation length quartile analysis
console.log('2.6 EXPLANATION LENGTH DISTRIBUTION');
let allExplLengths = allItems.map(x => (x.Explanation || '').length).sort((a, b) => a - b);
let p25 = allExplLengths[Math.floor(allExplLengths.length * 0.25)];
let p50 = allExplLengths[Math.floor(allExplLengths.length * 0.50)];
let p75 = allExplLengths[Math.floor(allExplLengths.length * 0.75)];
let p90 = allExplLengths[Math.floor(allExplLengths.length * 0.90)];
console.log('   Min: ' + allExplLengths[0] + ' chars');
console.log('   P25: ' + p25 + ' chars');
console.log('   P50 (median): ' + p50 + ' chars');
console.log('   P75: ' + p75 + ' chars');
console.log('   P90: ' + p90 + ' chars');
console.log('   Max: ' + allExplLengths[allExplLengths.length - 1] + ' chars');

// Items with short explanations (< 200 chars)
let shortExpls = allItems.filter(x => (x.Explanation || '').length < 200);
console.log('   Items with <200 char explanations: ' + shortExpls.length);
if (shortExpls.length > 0) {
    shortExpls.forEach(x => console.log('     ' + x.ItemID + ': ' + (x.Explanation || '').length + ' chars - ' + (x.Explanation || '').substring(0, 80)));
}
console.log('');

// ============================================================
// PART 3 — Closure Metrics (Agent S)
// ============================================================
console.log('=========== PART 3: CLOSURE METRICS (Agent S) ===========');
console.log('');

// Certified count
let certifiedCaseCount = 0;
let certifiedItemCount = 0;
let certCases = [];
let nonCertCases = [];
for (let c of cases) {
    if (c.question_state === 'Certified') certifiedCaseCount++;
    else nonCertCases.push(c.CaseID + '=' + (c.question_state || 'MISSING'));
}
for (let item of allItems) {
    if (item.question_state === 'Certified') certifiedItemCount++;
}
console.log('3.1 CERTIFICATION STATUS');
console.log('   Certified cases: ' + certifiedCaseCount + '/' + cases.length);
console.log('   Certified items: ' + certifiedItemCount + '/' + allItems.length);
console.log('   Total certified entries: ' + (certifiedCaseCount + certifiedItemCount));
if (nonCertCases.length > 0) {
    console.log('   Non-certified cases: ' + nonCertCases.join(', '));
}
console.log('');

// Case items per case
console.log('3.2 CASE COMPOSITION');
for (let c of cases) {
    let items = c.Items || [];
    let certItems = items.filter(it => it.question_state === 'Certified').length;
    let types = {};
    items.forEach(it => {
        if (!types[it.Type]) types[it.Type] = 0;
        types[it.Type]++;
    });
    console.log('   ' + c.CaseID + ' (' + c.Section + '): ' + items.length + ' items, ' + certItems + ' certified, types=' + JSON.stringify(types) + ', case_state=' + (c.question_state || '?'));
}
console.log('');

// Program completion
console.log('3.3 PROGRAM COMPLETION');
console.log('   Cases: ' + certifiedCaseCount + '/' + cases.length + ' certified (' + Math.round(certifiedCaseCount/cases.length*100) + '%)');
console.log('   Items: ' + certifiedItemCount + '/' + allItems.length + ' certified (' + Math.round(certifiedItemCount/allItems.length*100) + '%)');
console.log('   Certification gap: ' + (allItems.length - certifiedItemCount) + ' items + ' + (cases.length - certifiedCaseCount) + ' cases remaining');
console.log('');

// Blueprint coverage
let sectionItems = {};
for (let item of allItems) {
    let sec = item.Section || '?';
    if (!sectionItems[sec]) sectionItems[sec] = { total: 0, certified: 0 };
    sectionItems[sec].total++;
    if (item.question_state === 'Certified') sectionItems[sec].certified++;
}
// Also per case
let sectionCases = {};
for (let c of cases) {
    let sec = c.Section || '?';
    if (!sectionCases[sec]) sectionCases[sec] = { total: 0, certified: 0 };
    sectionCases[sec].total++;
    if (c.question_state === 'Certified') sectionCases[sec].certified++;
}
console.log('3.4 BLUEPRINT COVERAGE BY DOMAIN');
for (let sec of ['A', 'B', 'C', 'D', 'E', 'F']) {
    let caseData = sectionCases[sec] || { total: 0, certified: 0 };
    let itemData = sectionItems[sec] || { total: 0, certified: 0 };
    console.log('   Section ' + sec + ': ' + caseData.certified + '/' + caseData.total + ' cases certified, ' + itemData.certified + '/' + itemData.total + ' items certified');
}
console.log('');

// Governance statistics
console.log('3.5 GOVERNANCE STATISTICS');
let dl008ItemsFinal = [];
let allSelectMulti = allItems.filter(x => x.Type === 'select' || x.Type === 'multi');
for (let item of allSelectMulti) {
    let choices = item.Choices || [];
    if (item.Type === 'select') {
        let cc = item.Correct;
        let idx = choices.indexOf(cc);
        if (idx >= 0) {
            let ewField = 'ExplanationWrong' + String.fromCharCode(65 + idx);
            if (item[ewField] && item[ewField] !== '') {
                dl008ItemsFinal.push(item.ItemID);
            }
        }
    }
    if (item.Type === 'multi' && Array.isArray(item.Correct)) {
        for (let correctVal of item.Correct) {
            let idx = choices.indexOf(correctVal);
            if (idx >= 0) {
                let ewField = 'ExplanationWrong' + String.fromCharCode(65 + idx);
                if (item[ewField] && item[ewField] !== '') {
                    dl008ItemsFinal.push(item.ItemID);
                }
            }
        }
    }
}
console.log('   DL-008 (EW[CC] non-empty): ' + dl008ItemsFinal.length + ' select/multi items (' + (dl008ItemsFinal.length === 0 ? 'PASS' : 'FAIL') + ')');
if (dl008ItemsFinal.length > 0) console.log('     ' + dl008ItemsFinal.join(', '));

// EW coverage summary
console.log('   EW Coverage (distractor slots): ' + filledDistractorSlots + '/' + totalDistractorSlots + ' (' + Math.round(filledDistractorSlots/Math.max(1,totalDistractorSlots)*100) + '%)');

// Metadata completeness score
console.log('   Metadata completeness: ' + Math.round(totalPresentFields/Math.max(1,totalReqFields)*100) + '%');

// Question type distribution
let typeDist = {};
for (let item of allItems) {
    typeDist[item.Type] = (typeDist[item.Type] || 0) + 1;
}
console.log('   Question type distribution: ' + JSON.stringify(typeDist));
console.log('');

// ============================================================
// BUILD JSON REPORT
// ============================================================
const report = {
    meta: {
        generated: new Date().toISOString(),
        agent: 'Agent Q+S+T Combined - Session 537',
        file: 'scored_cases.js',
        casesParsed: cases.length,
        totalItems: allItems.length
    },
    preflight: {
        pass: preflightPass,
        errors: preflightErrors,
        checks: {
            parse: { pass: cases.length === 15, count: cases.length, expected: 15 },
            caseIDs: { pass: allCaseIDs.size === cases.length, unique: allCaseIDs.size, total: cases.length },
            itemIDs: { pass: allItemIDs.size === allItems.length, unique: allItemIDs.size, total: allItems.length },
            types: { pass: invalidTypeCount === 0, invalid: invalidTypeCount, errors: typeErrors },
            correctValues: { pass: missingCorrectCount === 0, missing: missingCorrectCount, items: missingCorrectIDs },
            questionState: { pass: invalidStateCount === 0 && invalidCaseStateCount === 0, itemInvalid: invalidStateCount, caseInvalid: invalidCaseStateCount },
            dl008Rule2: { pass: dl008Count === 0, violations: dl008Count, items: dl008Items }
        }
    },
    analytics: {
        explanationLengthByType: {},
        explanationWrongCoverage: {
            totalDistractorSlots: totalDistractorSlots,
            filledDistractorSlots: filledDistractorSlots,
            coveragePercent: Math.round(filledDistractorSlots / Math.max(1, totalDistractorSlots) * 100),
            partialCoverageItems: partialItems.length,
            zeroCoverageItems: zeroItems.length,
            zeroCoverageIDs: zeroItems.map(x => x.id)
        },
        metadataCompletion: {
            itemLevel: {},
            caseLevel: {},
            overallPercent: Math.round(totalPresentFields / Math.max(1, totalReqFields) * 100)
        },
        difficultyDistribution: diffDist,
        caseDifficultyDistribution: caseDiffDist,
        cognitiveLevelDistribution: cogDist,
        explanationStats: {
            min: allExplLengths[0],
            p25: p25,
            p50: p50,
            p75: p75,
            p90: p90,
            max: allExplLengths[allExplLengths.length - 1],
            shortCount: shortExpls.length
        }
    },
    closure: {
        certificationStatus: {
            certifiedCases: certifiedCaseCount,
            totalCases: cases.length,
            certifiedItems: certifiedItemCount,
            totalItems: allItems.length,
            totalCertifiedEntries: certifiedCaseCount + certifiedItemCount,
            nonCertifiedCases: nonCertCases
        },
        programCompletion: {
            caseCompletionPercent: Math.round(certifiedCaseCount / cases.length * 100),
            itemCompletionPercent: Math.round(certifiedItemCount / allItems.length * 100),
            remainingCases: cases.length - certifiedCaseCount,
            remainingItems: allItems.length - certifiedItemCount
        },
        blueprintCoverage: {},
        governance: {
            dl008Violations: dl008ItemsFinal.length,
            dl008Items: dl008ItemsFinal,
            ewCoveragePercent: Math.round(filledDistractorSlots / Math.max(1, totalDistractorSlots) * 100),
            metadataCompletenessPercent: Math.round(totalPresentFields / Math.max(1, totalReqFields) * 100),
            typeDistribution: typeDist
        }
    }
};

// Fill in analytics by type
for (let [t, data] of Object.entries(typeExplanations)) {
    report.analytics.explanationLengthByType[t] = {
        count: data.count,
        avgChars: Math.round(data.total / data.count),
        minChars: Math.min(...data.lengths),
        maxChars: Math.max(...data.lengths)
    };
}

// Fill in metadata by field
for (let [field, data] of Object.entries(fieldStats)) {
    report.analytics.metadataCompletion.itemLevel[field] = {
        present: data.present,
        total: data.total,
        percent: Math.round(data.present / data.total * 100)
    };
}
for (let [field, data] of Object.entries(caseStats)) {
    report.analytics.metadataCompletion.caseLevel[field] = {
        present: data.present,
        total: data.total,
        percent: Math.round(data.present / data.total * 100)
    };
}

// Fill in blueprint coverage
for (let sec of ['A', 'B', 'C', 'D', 'E', 'F']) {
    let caseData = sectionCases[sec] || { total: 0, certified: 0 };
    let itemData = sectionItems[sec] || { total: 0, certified: 0 };
    report.closure.blueprintCoverage[sec] = {
        cases: caseData,
        items: itemData
    };
}

// Write report
const outPath = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026\\reports\\session_status\\SESSION537_ANALYTICS_AND_METRICS.json';
fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8');
console.log('Report written to: ' + outPath);
console.log('');
console.log('=== FINAL SUMMARY ===');
console.log('Pre-flight: ' + (preflightPass ? 'PASS' : 'FAIL'));
console.log('Certified: ' + certifiedCaseCount + ' cases, ' + certifiedItemCount + ' items');
console.log('DL-008: ' + dl008Count + ' violations');
console.log('EW coverage: ' + Math.round(filledDistractorSlots/Math.max(1,totalDistractorSlots)*100) + '%');
console.log('Metadata: ' + Math.round(totalPresentFields/Math.max(1,totalReqFields)*100) + '%');
