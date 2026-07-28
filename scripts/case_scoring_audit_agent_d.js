// Agent D: Aggregate Case Scoring Audit (Session 61, READ-ONLY)
// Loads all 5 scored_cases files via Function constructor, mimics getCasePool(),
// and counts case items by source, section, and tier.

const fs = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '..');

// Stub out browser globals that app.js references at top level
global.localStorage = { getItem: () => 'light', setItem: () => {}, removeItem: () => {} };
global.document = {
    querySelectorAll: () => [],
    querySelector: () => null,
    getElementById: () => null,
    createElement: () => ({}),
    addEventListener: () => {},
    documentElement: { setAttribute: () => {}, getAttribute: () => null },
    body: { appendChild: () => {}, classList: { add: () => {}, remove: () => {} } }
};
global.window = { location: { href: '', reload: () => {} }, addEventListener: () => {} };

// Load app.js for function extraction
const appSrc = fs.readFileSync(path.join(BASE, 'app.js'), 'utf-8');

let scoreQuestionQuality, assignTier;
(function() {
    const fn = new Function(appSrc + '; return { sqq: typeof scoreQuestionQuality !== "undefined" ? scoreQuestionQuality : null, at: typeof assignTier !== "undefined" ? assignTier : null };');
    const result = fn();
    scoreQuestionQuality = result.sqq;
    assignTier = result.at;
})();

console.log("=== AGENT D: AGGREGATE CASE SCORING AUDIT (Session 61) ===\n");

// --- Load all 5 scored_cases*.js files via Function constructor ---
let allGlobals = {};

for (const f of ['scored_cases.js', 'scored_cases2.js', 'scored_cases3.js', 'scored_cases4.js', 'scored_cases5.js']) {
    const src = fs.readFileSync(path.join(BASE, f), 'utf-8');
    try {
        const extractFn = new Function(`
            ${src}
            return {
                CASE_BANK_A: typeof CASE_BANK_A !== 'undefined' ? CASE_BANK_A : undefined,
                CASE_BANK_B: typeof CASE_BANK_B !== 'undefined' ? CASE_BANK_B : undefined,
                CASE_BANK_C: typeof CASE_BANK_C !== 'undefined' ? CASE_BANK_C : undefined,
                CASE_BANK_D: typeof CASE_BANK_D !== 'undefined' ? CASE_BANK_D : undefined,
                CASE_BANK_E: typeof CASE_BANK_E !== 'undefined' ? CASE_BANK_E : undefined,
                MIGRATED_CASE_BASE_A: typeof MIGRATED_CASE_BASE_A !== 'undefined' ? MIGRATED_CASE_BASE_A : undefined,
                MIGRATED_CASE_BASE_B: typeof MIGRATED_CASE_BASE_B !== 'undefined' ? MIGRATED_CASE_BASE_B : undefined,
                MIGRATED_CASE_BASE_C: typeof MIGRATED_CASE_BASE_C !== 'undefined' ? MIGRATED_CASE_BASE_C : undefined,
                MIGRATED_CASE_BASE_D: typeof MIGRATED_CASE_BASE_D !== 'undefined' ? MIGRATED_CASE_BASE_D : undefined,
                MIGRATED_CASE_BASE_E: typeof MIGRATED_CASE_BASE_E !== 'undefined' ? MIGRATED_CASE_BASE_E : undefined,
                MIGRATED_CASE_BANK_A: typeof MIGRATED_CASE_BANK_A !== 'undefined' ? MIGRATED_CASE_BANK_A : undefined,
                MIGRATED_CASE_BANK_B: typeof MIGRATED_CASE_BANK_B !== 'undefined' ? MIGRATED_CASE_BANK_B : undefined,
                MIGRATED_CASE_BANK_C: typeof MIGRATED_CASE_BANK_C !== 'undefined' ? MIGRATED_CASE_BANK_C : undefined,
                MIGRATED_CASE_BANK_D: typeof MIGRATED_CASE_BANK_D !== 'undefined' ? MIGRATED_CASE_BANK_D : undefined,
                ENHANCED_CASE_BASE: typeof ENHANCED_CASE_BASE !== 'undefined' ? ENHANCED_CASE_BASE : undefined,
                ENHANCED_CASE_BASE2: typeof ENHANCED_CASE_BASE2 !== 'undefined' ? ENHANCED_CASE_BASE2 : undefined,
                ENHANCED_CASE_BASE3: typeof ENHANCED_CASE_BASE3 !== 'undefined' ? ENHANCED_CASE_BASE3 : undefined,
                ENHANCED_CASE_BASE4: typeof ENHANCED_CASE_BASE4 !== 'undefined' ? ENHANCED_CASE_BASE4 : undefined,
                ENHANCED_CASE_BASE5: typeof ENHANCED_CASE_BASE5 !== 'undefined' ? ENHANCED_CASE_BASE5 : undefined,
                ENHANCED_CASE_BANK_A: typeof ENHANCED_CASE_BANK_A !== 'undefined' ? ENHANCED_CASE_BANK_A : undefined,
                ENHANCED_CASE_BANK_B: typeof ENHANCED_CASE_BANK_B !== 'undefined' ? ENHANCED_CASE_BANK_B : undefined,
                ENHANCED_CASE_BANK_C: typeof ENHANCED_CASE_BANK_C !== 'undefined' ? ENHANCED_CASE_BANK_C : undefined,
                ENHANCED_CASE_BANK_D: typeof ENHANCED_CASE_BANK_D !== 'undefined' ? ENHANCED_CASE_BANK_D : undefined,
                ENHANCED_CASE_BANK_E: typeof ENHANCED_CASE_BANK_E !== 'undefined' ? ENHANCED_CASE_BANK_E : undefined,
                ENHANCED_CASE_BANK2_A: typeof ENHANCED_CASE_BANK2_A !== 'undefined' ? ENHANCED_CASE_BANK2_A : undefined,
                ENHANCED_CASE_BANK2_B: typeof ENHANCED_CASE_BANK2_B !== 'undefined' ? ENHANCED_CASE_BANK2_B : undefined,
                ENHANCED_CASE_BANK2_C: typeof ENHANCED_CASE_BANK2_C !== 'undefined' ? ENHANCED_CASE_BANK2_C : undefined,
                ENHANCED_CASE_BANK2_D: typeof ENHANCED_CASE_BANK2_D !== 'undefined' ? ENHANCED_CASE_BANK2_D : undefined,
                ENHANCED_CASE_BANK2_E: typeof ENHANCED_CASE_BANK2_E !== 'undefined' ? ENHANCED_CASE_BANK2_E : undefined,
                ENHANCED_CASE_BANK3_A: typeof ENHANCED_CASE_BANK3_A !== 'undefined' ? ENHANCED_CASE_BANK3_A : undefined,
                ENHANCED_CASE_BANK3_B: typeof ENHANCED_CASE_BANK3_B !== 'undefined' ? ENHANCED_CASE_BANK3_B : undefined,
                ENHANCED_CASE_BANK3_C: typeof ENHANCED_CASE_BANK3_C !== 'undefined' ? ENHANCED_CASE_BANK3_C : undefined,
                ENHANCED_CASE_BANK3_D: typeof ENHANCED_CASE_BANK3_D !== 'undefined' ? ENHANCED_CASE_BANK3_D : undefined,
                ENHANCED_CASE_BANK3_E: typeof ENHANCED_CASE_BANK3_E !== 'undefined' ? ENHANCED_CASE_BANK3_E : undefined,
                ENHANCED_CASE_BANK4_A: typeof ENHANCED_CASE_BANK4_A !== 'undefined' ? ENHANCED_CASE_BANK4_A : undefined,
                ENHANCED_CASE_BANK4_B: typeof ENHANCED_CASE_BANK4_B !== 'undefined' ? ENHANCED_CASE_BANK4_B : undefined,
                ENHANCED_CASE_BANK4_C: typeof ENHANCED_CASE_BANK4_C !== 'undefined' ? ENHANCED_CASE_BANK4_C : undefined,
                ENHANCED_CASE_BANK4_D: typeof ENHANCED_CASE_BANK4_D !== 'undefined' ? ENHANCED_CASE_BANK4_D : undefined,
                ENHANCED_CASE_BANK4_E: typeof ENHANCED_CASE_BANK4_E !== 'undefined' ? ENHANCED_CASE_BANK4_E : undefined,
                ENHANCED_CASE_BANK5_A: typeof ENHANCED_CASE_BANK5_A !== 'undefined' ? ENHANCED_CASE_BANK5_A : undefined,
                ENHANCED_CASE_BANK5_B: typeof ENHANCED_CASE_BANK5_B !== 'undefined' ? ENHANCED_CASE_BANK5_B : undefined,
                ENHANCED_CASE_BANK5_C: typeof ENHANCED_CASE_BANK5_C !== 'undefined' ? ENHANCED_CASE_BANK5_C : undefined,
                ENHANCED_CASE_BANK5_D: typeof ENHANCED_CASE_BANK5_D !== 'undefined' ? ENHANCED_CASE_BANK5_D : undefined,
                ENHANCED_CASE_BANK5_E: typeof ENHANCED_CASE_BANK5_E !== 'undefined' ? ENHANCED_CASE_BANK5_E : undefined
            }
        `);
        const vars = extractFn();
        for (const [k, v] of Object.entries(vars)) {
            if (v !== undefined && !(k in allGlobals)) {
                allGlobals[k] = v;
            }
        }
    } catch (e) {
        console.log(`  WARNING: ${f} - ${e.message.substring(0, 100)}`);
    }
}

// --- Report: Variable State ---
console.log("--- FILE LOAD SUMMARY ---");
const varsToCheck = [
    'ENHANCED_CASE_BASE', 'ENHANCED_CASE_BASE2', 'ENHANCED_CASE_BASE3', 'ENHANCED_CASE_BASE4', 'ENHANCED_CASE_BASE5',
    'MIGRATED_CASE_BASE_A', 'MIGRATED_CASE_BASE_B', 'MIGRATED_CASE_BASE_C', 'MIGRATED_CASE_BASE_D', 'MIGRATED_CASE_BASE_E',
    'CASE_BANK_A', 'CASE_BANK_B', 'CASE_BANK_C', 'CASE_BANK_D', 'CASE_BANK_E',
    'MIGRATED_CASE_BANK_A', 'MIGRATED_CASE_BANK_B', 'MIGRATED_CASE_BANK_C', 'MIGRATED_CASE_BANK_D'
];
for (const v of varsToCheck) {
    const val = allGlobals[v];
    if (val !== undefined) {
        console.log(`  ${v}: ${Array.isArray(val) ? val.length + ' cases' : typeof val}`);
    }
}
// Enhanced clone banks
for (const v of ['ENHANCED_CASE_BANK_A','ENHANCED_CASE_BANK_B','ENHANCED_CASE_BANK_C','ENHANCED_CASE_BANK_D','ENHANCED_CASE_BANK_E',
    'ENHANCED_CASE_BANK2_A','ENHANCED_CASE_BANK3_A','ENHANCED_CASE_BANK4_A','ENHANCED_CASE_BANK5_A']) {
    const val = allGlobals[v];
    if (val !== undefined) console.log(`  ${v}: ${val.length} cases`);
}

console.log('');

// --- Build banks (getCasePool logic) ---
const banks = {
    'A': (allGlobals.CASE_BANK_A || allGlobals.MIGRATED_CASE_BASE_A || []),
    'B': (allGlobals.CASE_BANK_B || allGlobals.MIGRATED_CASE_BASE_B || []),
    'C': (allGlobals.CASE_BANK_C || allGlobals.MIGRATED_CASE_BASE_C || []),
    'D': (allGlobals.CASE_BANK_D || allGlobals.MIGRATED_CASE_BASE_D || []),
    'E': (allGlobals.CASE_BANK_E || allGlobals.MIGRATED_CASE_BASE_E || [])
};

const enhanced_banks = {
    'A': [].concat(
        allGlobals.ENHANCED_CASE_BANK_A || [], allGlobals.ENHANCED_CASE_BANK2_A || [],
        allGlobals.ENHANCED_CASE_BANK3_A || [], allGlobals.ENHANCED_CASE_BANK4_A || [],
        allGlobals.ENHANCED_CASE_BANK5_A || [],
        allGlobals.MIGRATED_CASE_BANK_A || [], allGlobals.MIGRATED_CASE_BANK_B || [],
        allGlobals.MIGRATED_CASE_BANK_C || [], allGlobals.MIGRATED_CASE_BANK_D || []
    ),
    'B': [].concat(
        allGlobals.ENHANCED_CASE_BANK_B || [], allGlobals.ENHANCED_CASE_BANK2_B || [],
        allGlobals.ENHANCED_CASE_BANK3_B || [], allGlobals.ENHANCED_CASE_BANK4_B || [],
        allGlobals.ENHANCED_CASE_BANK5_B || [],
        allGlobals.MIGRATED_CASE_BANK_A || [], allGlobals.MIGRATED_CASE_BANK_B || [],
        allGlobals.MIGRATED_CASE_BANK_C || [], allGlobals.MIGRATED_CASE_BANK_D || []
    ),
    'C': [].concat(
        allGlobals.ENHANCED_CASE_BANK_C || [], allGlobals.ENHANCED_CASE_BANK2_C || [],
        allGlobals.ENHANCED_CASE_BANK3_C || [], allGlobals.ENHANCED_CASE_BANK4_C || [],
        allGlobals.ENHANCED_CASE_BANK5_C || [],
        allGlobals.MIGRATED_CASE_BANK_A || [], allGlobals.MIGRATED_CASE_BANK_B || [],
        allGlobals.MIGRATED_CASE_BANK_C || [], allGlobals.MIGRATED_CASE_BANK_D || []
    ),
    'D': [].concat(
        allGlobals.ENHANCED_CASE_BANK_D || [], allGlobals.ENHANCED_CASE_BANK2_D || [],
        allGlobals.ENHANCED_CASE_BANK3_D || [], allGlobals.ENHANCED_CASE_BANK4_D || [],
        allGlobals.ENHANCED_CASE_BANK5_D || [],
        allGlobals.MIGRATED_CASE_BANK_A || [], allGlobals.MIGRATED_CASE_BANK_B || [],
        allGlobals.MIGRATED_CASE_BANK_C || [], allGlobals.MIGRATED_CASE_BANK_D || []
    ),
    'E': [].concat(
        allGlobals.ENHANCED_CASE_BANK_E || [], allGlobals.ENHANCED_CASE_BANK2_E || [],
        allGlobals.ENHANCED_CASE_BANK3_E || [], allGlobals.ENHANCED_CASE_BANK4_E || [],
        allGlobals.ENHANCED_CASE_BANK5_E || [],
        allGlobals.MIGRATED_CASE_BANK_A || [], allGlobals.MIGRATED_CASE_BANK_B || [],
        allGlobals.MIGRATED_CASE_BANK_C || [], allGlobals.MIGRATED_CASE_BANK_D || []
    )
};

// Report raw sizes
console.log("--- BANKS (pre-filter) ---");
for (const s of ['A','B','C','D','E']) {
    console.log(`  Section ${s}: standard=${banks[s].length}, enhanced=${enhanced_banks[s].length}`);
}
console.log('');

// --- Apply tier filtering ---
const allPacks = ['A','B','C','D','E'];
let allPoolCases = [];

for (let p of allPacks) {
    let scored = (enhanced_banks[p] || []).map(c => {
        let copy = JSON.parse(JSON.stringify(c));
        let st = (copy.question_state || "").trim();
        if (st === "Certified") copy._tier = 1;
        else if (st === "Archived" || st === "In Audit" || st === "Editorial Queue") copy._tier = -1;
        else { copy._tier = 2; copy._qualityScore = scoreQuestionQuality ? scoreQuestionQuality(copy) : -99; }
        copy._isEnhanced = true;
        copy._sourceSection = p;
        return copy;
    });
    let standard = (banks[p] || []).map(c => {
        let copy = JSON.parse(JSON.stringify(c));
        let st = (copy.question_state || "").trim();
        if (st === "Certified") copy._tier = 1;
        else if (st === "Archived" || st === "In Audit" || st === "Editorial Queue") copy._tier = -1;
        else { copy._tier = 3; copy._qualityScore = scoreQuestionQuality ? scoreQuestionQuality(copy) : -99; }
        copy._isEnhanced = false;
        copy._sourceSection = p;
        return copy;
    });
    let active = [].concat(scored, standard).filter(c => c._tier >= 1);
    active.sort((a, b) => (a._tier || 3) - (b._tier || 3));
    allPoolCases = allPoolCases.concat(active);
}

// Deduplicate by CaseID
const seen = new Set();
const uniqueCases = [];
for (const c of allPoolCases) {
    const cid = c.CaseID || 'UNKNOWN';
    if (!seen.has(cid)) {
        seen.add(cid);
        uniqueCases.push(c);
    }
}

console.log("=== PART 2: CASE POOL ANALYSIS ===\n");

let totalItems = 0;
let enhancedItems = 0;
let standardItems = 0;
let enhancedCount = 0;
let standardCount = 0;
const sectionMap = {};

for (const c of uniqueCases) {
    const n = (c.Items || []).length;
    totalItems += n;
    if (c._isEnhanced) { enhancedItems += n; enhancedCount++; }
    else { standardItems += n; standardCount++; }
    
    const sec = c._sourceSection || c.SectionTags?.[0] || '?';
    if (!sectionMap[sec]) sectionMap[sec] = { cases: 0, items: 0, enhanced: 0, standard: 0, enhancedItems: 0, standardItems: 0 };
    sectionMap[sec].cases++;
    sectionMap[sec].items += n;
    if (c._isEnhanced) { sectionMap[sec].enhanced++; sectionMap[sec].enhancedItems += n; }
    else { sectionMap[sec].standard++; sectionMap[sec].standardItems += n; }
}

console.log(`Total unique case objects in pool: ${uniqueCases.length}`);
console.log(`Total case items: ${totalItems}`);
console.log(`  Enhanced (Tier 2): ${enhancedCount} cases, ${enhancedItems} items`);
console.log(`  Standard/Migrated (Tier 3): ${standardCount} cases, ${standardItems} items`);
console.log('');

// Section distribution
console.log("--- Distribution by Section ---");
const sectionOrder = ['A','B','C','D','E','F'];
for (const s of sectionOrder) {
    if (sectionMap[s]) {
        const m = sectionMap[s];
        console.log(`  Section ${s}: ${m.cases} cases, ${m.items} items (enhanced=${m.enhanced} cases/${m.enhancedItems} items, standard=${m.standard} cases/${m.standardItems} items)`);
    }
}
for (const s of Object.keys(sectionMap).sort()) {
    if (!sectionOrder.includes(s)) {
        const m = sectionMap[s];
        console.log(`  Section ${s}: ${m.cases} cases, ${m.items} items`);
    }
}

// Tier distribution
console.log('\n--- Tier Distribution ---');
const tierCounts = {};
for (const c of uniqueCases) {
    const t = c._tier || '?';
    if (!tierCounts[t]) tierCounts[t] = { cases: 0, items: 0 };
    tierCounts[t].cases++;
    tierCounts[t].items += (c.Items || []).length;
}
for (const t of [1, 2, 3]) {
    if (tierCounts[t]) {
        const label = t === 1 ? 'Tier 1 (Certified)' : t === 2 ? 'Tier 2 (Enhanced)' : 'Tier 3 (Standard/Migrated)';
        console.log(`  ${label}: ${tierCounts[t].cases} cases, ${tierCounts[t].items} items`);
    }
}

// Sample cases
console.log('\n--- Sample Cases (first 5) ---');
for (const c of uniqueCases.slice(0, 5)) {
    console.log(`  ${c.CaseID}: section=${c._sourceSection}, tier=${c._tier}, enhanced=${c._isEnhanced}, items=${(c.Items||[]).length}, state="${c.question_state||'MISSING'}"`);
}

// Enhanced base analysis
console.log('\n--- ENHANCED Base Sizes (seed cases, BEFORE cloning) ---');
const enhancedBases = {
    'ENHANCED_CASE_BASE': allGlobals.ENHANCED_CASE_BASE,
    'ENHANCED_CASE_BASE2': allGlobals.ENHANCED_CASE_BASE2,
    'ENHANCED_CASE_BASE3': allGlobals.ENHANCED_CASE_BASE3,
    'ENHANCED_CASE_BASE4': allGlobals.ENHANCED_CASE_BASE4,
    'ENHANCED_CASE_BASE5': allGlobals.ENHANCED_CASE_BASE5
};
let totalSeedItems = 0;
let totalSeedCases = 0;
for (const [name, base] of Object.entries(enhancedBases)) {
    if (base) {
        const items = base.reduce((sum, c) => sum + (c.Items || []).length, 0);
        totalSeedItems += items;
        totalSeedCases += base.length;
        console.log(`  ${name}: ${base.length} seed cases, ${items} items total`);
    }
}
console.log(`  Total seed cases: ${totalSeedCases}, seed items: ${totalSeedItems}`);
console.log(`  After 5x section cloning: ~${totalSeedCases * 5} cases in enhanced banks`);

// Migrated base analysis
console.log('\n--- MIGRATED Case Base Sizes ---');
const migratedBases = {
    'MIGRATED_CASE_BASE_A': allGlobals.MIGRATED_CASE_BASE_A,
    'MIGRATED_CASE_BASE_B': allGlobals.MIGRATED_CASE_BASE_B,
    'MIGRATED_CASE_BASE_C': allGlobals.MIGRATED_CASE_BASE_C,
    'MIGRATED_CASE_BASE_D': allGlobals.MIGRATED_CASE_BASE_D,
};
for (const [name, base] of Object.entries(migratedBases)) {
    if (base) {
        const items = base.reduce((sum, c) => sum + (c.Items || []).length, 0);
        console.log(`  ${name}: ${base.length} cases, ${items} items`);
    }
}

// === PART 4: SIMULATED SCORING ===
console.log('\n\n=== PART 4: SIMULATED SCORING WALKTHROUGH ===\n');

function practiceScores(mcqResults, caseResults, difficultyPreset) {
    const presets = {
        standard: { mcqFactor: 1.00, cbqFactor: 1.00, scaleOffset: 0 },
        easier:   { mcqFactor: 0.98, cbqFactor: 0.98, scaleOffset: -8 },
        harder:   { mcqFactor: 1.02, cbqFactor: 1.02, scaleOffset: 8 }
    };
    const preset = presets[difficultyPreset] || presets.standard;
    
    let mcqC = 0, caseC = 0, caseT = 0;
    for (const r of mcqResults) { mcqC += r.correct ? 1 : 0; }
    for (const r of caseResults) { caseT += r.total; caseC += r.correct; }
    
    const mcqLen = mcqResults.length;
    let mcqPct = mcqLen ? mcqC / mcqLen : null;
    let casePct = caseT ? caseC / caseT : null;
    
    let weighted = (mcqPct !== null && casePct !== null)
        ? (mcqPct * 0.75 + casePct * 0.25)
        : ((mcqC + caseC) / Math.max(1, mcqLen + caseT));
    
    let calibrated = (mcqPct !== null && casePct !== null)
        ? (mcqPct * preset.mcqFactor * 0.75 + casePct * preset.cbqFactor * 0.25)
        : weighted;
    
    let raw = (mcqC + caseC) / Math.max(1, mcqLen + caseT);
    let scaled = Math.max(0, Math.min(500, Math.round(calibrated * 500 + preset.scaleOffset)));
    let passed = scaled >= 360;
    let grade = scaled >= 420 ? 'Strong pass range'
        : scaled >= 360 ? 'Passing range'
        : scaled >= 300 ? 'Near pass range'
        : 'Needs substantial review';
    
    return { mcqC, caseC, caseT, mcqPct, casePct, raw, weighted, calibrated, scaled, passed, grade, difficultyPreset };
}

// Session 1
const s1 = practiceScores(
    Array(100).fill(null).map((_, i) => ({ correct: i < 50 })),
    [{ caseId: 'CBQ-A1-A', total: 6, correct: 6 }, { caseId: 'CASE-A1', total: 6, correct: 6 }],
    'standard'
);
console.log("Session 1: 100 MCQs at 50% | 2 cases (6+6 items, all correct)");
console.log(`  mcqC=${s1.mcqC} | caseC=${s1.caseC} | caseT=${s1.caseT}`);
console.log(`  mcqPct=${(s1.mcqPct*100).toFixed(1)}% | casePct=${(s1.casePct*100).toFixed(1)}%`);
console.log(`  raw=${(s1.raw*100).toFixed(1)}% | weighted=${(s1.weighted*100).toFixed(1)}% | calibrated=${(s1.calibrated*100).toFixed(1)}%`);
console.log(`  scaled=${s1.scaled} | passed=${s1.passed} | grade="${s1.grade}"`);
console.log(`  Formula: (0.50 * 0.75) + (1.00 * 0.25) = 0.375 + 0.250 = 0.625 * 500 = ${Math.round(0.625 * 500)}\n`);

// Session 2
const s2 = practiceScores(
    Array(100).fill(null).map(() => ({ correct: true })),
    [{ caseId: 'CBQ-A1-A', total: 6, correct: 0 }, { caseId: 'CASE-A1', total: 6, correct: 0 }],
    'standard'
);
console.log("Session 2: 100 MCQs at 100% | 2 cases (6+6 items, all wrong)");
console.log(`  mcqC=${s2.mcqC} | caseC=${s2.caseC} | caseT=${s2.caseT}`);
console.log(`  mcqPct=${(s2.mcqPct*100).toFixed(1)}% | casePct=${(s2.casePct*100).toFixed(1)}%`);
console.log(`  raw=${(s2.raw*100).toFixed(1)}% | weighted=${(s2.weighted*100).toFixed(1)}% | calibrated=${(s2.calibrated*100).toFixed(1)}%`);
console.log(`  scaled=${s2.scaled} | passed=${s2.passed} | grade="${s2.grade}"`);
console.log(`  Formula: (1.00 * 0.75) + (0.00 * 0.25) = 0.75 + 0.00 = 0.75 * 500 = ${Math.round(0.75 * 500)}\n`);

// Session 3: No cases (caseT = 0)
const s3 = practiceScores(
    Array(100).fill(null).map((_, i) => ({ correct: i < 75 })),
    [],
    'standard'
);
console.log("Session 3: 100 MCQs at 75% | 0 cases (caseT=0)");
console.log(`  mcqC=${s3.mcqC} | caseC=${s3.caseC} | caseT=${s3.caseT}`);
console.log(`  mcqPct=${s3.mcqPct !== null ? (s3.mcqPct*100).toFixed(1)+'%' : 'null'} | casePct=${s3.casePct !== null ? (s3.casePct*100).toFixed(1)+'%' : 'null'}`);
console.log(`  Falls through to ALL-ITEMS formula: (mcqC + caseC) / (mcqLen + caseT)`);
console.log(`  weighted = (75 + 0) / (100 + 0) = ${(75/100*100).toFixed(1)}%`);
console.log(`  raw=${(s3.raw*100).toFixed(1)}% | weighted=${(s3.weighted*100).toFixed(1)}% | calibrated=${(s3.calibrated*100).toFixed(1)}%`);
console.log(`  scaled=${s3.scaled} | passed=${s3.passed} | grade="${s3.grade}"\n`);

// Session 4: No MCQs (mcqPct = null)
const s4 = practiceScores(
    [],
    [{ caseId: 'CBQ-A1-A', total: 6, correct: 5 }, { caseId: 'CASE-A1', total: 6, correct: 4 }],
    'standard'
);
console.log("Session 4: 0 MCQs (mcqPct=null) | 2 cases (6+6 items, 9/12 = 75%)");
console.log(`  mcqC=${s4.mcqC} | caseC=${s4.caseC} | caseT=${s4.caseT}`);
console.log(`  mcqPct=${s4.mcqPct !== null ? (s4.mcqPct*100).toFixed(1)+'%' : 'null'} | casePct=${s4.casePct !== null ? (s4.casePct*100).toFixed(1)+'%' : 'null'}`);
console.log(`  Falls through to ALL-ITEMS formula: (mcqC + caseC) / (mcqLen + caseT)`);
console.log(`  weighted = (0 + 9) / (0 + 12) = ${(9/12*100).toFixed(1)}%`);
console.log(`  raw=${(s4.raw*100).toFixed(1)}% | weighted=${(s4.weighted*100).toFixed(1)}% | calibrated=${(s4.calibrated*100).toFixed(1)}%`);
console.log(`  scaled=${s4.scaled} | passed=${s4.passed} | grade="${s4.grade}"\n`);

// Session 5: Both null
const s5 = practiceScores([], [], 'standard');
console.log("Session 5: Empty session (0 MCQs, 0 cases)");
console.log(`  mcqC=${s5.mcqC} | caseC=${s5.caseC} | caseT=${s5.caseT}`);
console.log(`  mcqPct=${s5.mcqPct !== null ? s5.mcqPct : 'null'} | casePct=${s5.casePct !== null ? s5.casePct : 'null'}`);
console.log(`  weighted = (0 + 0) / Math.max(1, 0 + 0) = 0/1 = 0`);
console.log(`  scaled=${s5.scaled} | passed=${s5.passed} | grade="${s5.grade}"`);

// Bonus: Check difficulty preset impact on Session 1
console.log('\n--- Difficulty Preset Impact (Session 1) ---');
for (const preset of ['standard', 'easier', 'harder']) {
    const s = practiceScores(
        Array(100).fill(null).map((_, i) => ({ correct: i < 50 })),
        [{ caseId: 'CBQ-A1-A', total: 6, correct: 6 }, { caseId: 'CASE-A1', total: 6, correct: 6 }],
        preset
    );
    console.log(`  ${preset}: weighted=${(s.weighted*100).toFixed(1)}%, calibrated=${(s.calibrated*100).toFixed(1)}%, scaled=${s.scaled}, passed=${s.passed}`);
}

console.log('\n=== AUDIT COMPLETE ===');
