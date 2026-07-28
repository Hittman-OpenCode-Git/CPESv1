// S720 Agent I — Extract DifficultyScore × CognitiveLevel matrix from all 5 packs
const fs = require('fs');
const path = require('path');

const packs = ['pack_a_corrected.js', 'pack_b_corrected.js', 'pack_c_corrected.js', 'pack_d_corrected.js', 'pack_e_corrected.js'];

function loadPack(filename) {
    const src = fs.readFileSync(filename, 'utf-8');
    // Find the array assignment
    const match = src.match(/(?:const|let|var)\s+\w+\s*=\s*(\[[\s\S]*?\])\s*;?\s*$/);
    if (match) {
        return eval('(' + match[1] + ')');
    }
    // Try direct eval
    const arrMatch = src.match(/^\s*(\[[\s\S]*\])\s*;?\s*$/);
    if (arrMatch) {
        return eval('(' + arrMatch[1] + ')');
    }
    // Try Function constructor for complex files
    try {
        const fn = new Function(src + '; return typeof packData !== "undefined" ? packData : (typeof questions !== "undefined" ? questions : null);');
        return fn();
    } catch(e) {}
    // Last resort: find the outermost array
    const arr = src.match(/(\[[\s\S]*\])/);
    if (arr) {
        return eval('(' + arr[1] + ')');
    }
    return null;
}

function extractTriples(data, packName) {
    const results = [];
    if (!Array.isArray(data)) return results;
    
    for (const item of data) {
        if (!item || typeof item !== 'object') continue;
        
        // Some packs have nested objects with metadata blocks
        // Try direct fields first
        let cl = item.CognitiveLevel;
        let ds = item.DifficultyScore;
        let section = item.Section;
        let qid = item.QuestionID || 'unknown';
        
        // If not found, try Choices.CognitiveLevel etc (nested format)
        if (!cl && item.Choices && item.Choices.CognitiveLevel) {
            cl = item.Choices.CognitiveLevel;
        }
        if (!ds && item.Choices && item.Choices.DifficultyScore) {
            ds = item.Choices.DifficultyScore;
        }
        
        if (cl && ds !== undefined) {
            results.push({
                qid,
                section: section || '?',
                cl,
                ds,
                pack: packName
            });
        }
    }
    return results;
}

const allResults = [];

for (const packFile of packs) {
    const fullPath = path.join(__dirname, '..', packFile);
    try {
        const data = loadPack(fullPath);
        const triples = extractTriples(data, packFile);
        allResults.push(...triples);
        console.log(`Extracted ${triples.length} items from ${packFile}`);
    } catch(e) {
        console.error(`Failed to load ${packFile}: ${e.message}`);
    }
}

// Build pool-wide matrix
const matrix = {
    Remember: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
    Understand: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
    Apply: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
    Analyze: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
    Evaluate: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
};

// Per-pack matrices
const perPack = {};
for (const p of packs) {
    perPack[p] = JSON.parse(JSON.stringify(matrix));
}

// Per-section matrices
const sections = {};
for (const s of ['A','B','C','D','E','F']) {
    sections[s] = JSON.parse(JSON.stringify(matrix));
}

for (const item of allResults) {
    const { cl, ds, pack, section } = item;
    const dsKey = String(ds);
    if (matrix[cl] && matrix[cl][dsKey] !== undefined) {
        matrix[cl][dsKey]++;
    }
    if (perPack[pack] && perPack[pack][cl] && perPack[pack][cl][dsKey] !== undefined) {
        perPack[pack][cl][dsKey]++;
    }
    if (section && section !== '?' && sections[section] && sections[section][cl] && sections[section][cl][dsKey] !== undefined) {
        sections[section][cl][dsKey]++;
    }
}

// Count severe misalignments per DCS §3
// Severe = |default DS - assigned DS| >= 2
const defaultDS = { Remember: 2, Understand: 2, Apply: 3, Analyze: 4, Evaluate: 4 };

function countSevere(mat) {
    let count = 0;
    const details = [];
    for (const [cl, dsMap] of Object.entries(mat)) {
        const def = defaultDS[cl];
        for (const [dsStr, cnt] of Object.entries(dsMap)) {
            const ds = parseInt(dsStr);
            const gap = Math.abs(def - ds);
            if (gap >= 2 && cnt > 0) {
                count += cnt;
                details.push({ cl, assignedDS: ds, defaultDS: def, gap, count: cnt });
            }
        }
    }
    return { count, details };
}

const severeResult = countSevere(matrix);

// Per-section severe counts
const sectionSevere = {};
for (const [sec, mat] of Object.entries(sections)) {
    sectionSevere[sec] = countSevere(mat).count;
}

// Per-pack severe counts
const packSevere = {};
for (const [p, mat] of Object.entries(perPack)) {
    packSevere[p] = countSevere(mat).count;
}

// DCS compliance: items within 1 level of default = compliant
function countCompliant(mat) {
    let compliant = 0;
    let total = 0;
    for (const [cl, dsMap] of Object.entries(mat)) {
        const def = defaultDS[cl];
        for (const [dsStr, cnt] of Object.entries(dsMap)) {
            const ds = parseInt(dsStr);
            total += cnt;
            if (Math.abs(def - ds) <= 1) {
                compliant += cnt;
            }
        }
    }
    return { compliant, total };
}

const comp = countCompliant(matrix);
const complianceRate = comp.total > 0 ? (comp.compliant / comp.total) : 0;

// Output JSON
const output = {
    session: "S720",
    agent: "I",
    title: "Difficulty × CognitiveLevel Matrix Validation",
    total_items_extracted: allResults.length,
    pool_wide_matrix: matrix,
    per_pack_matrices: perPack,
    per_section_matrices: sections,
    severe_misalignments: {
        pre_s719: 244,
        post_s719_claimed: 0,
        current: severeResult.count,
        current_details: severeResult.details,
        verified_eliminated: severeResult.count === 0,
        by_section: sectionSevere,
        by_pack: packSevere
    },
    new_misalignments: severeResult.count,
    dcs_compliance_rate: complianceRate,
    compliant_items: comp.compliant,
    total_items_with_cl_ds: comp.total,
    sections_with_most_misalignments: Object.entries(sectionSevere)
        .sort((a, b) => b[1] - a[1])
        .map(([sec, cnt]) => ({ section: sec, severe_count: cnt })),
    read_only_attestation: "Zero files modified"
};

// Print summary to console
console.log(`\n=== S720 Matrix Validation Summary ===`);
console.log(`Total items extracted: ${allResults.length}`);
console.log(`Severe misalignments (gap >= 2): ${severeResult.count}`);
console.log(`DCS compliance rate: ${(complianceRate * 100).toFixed(1)}%`);
console.log(`\nPool-Wide Matrix:`);
console.log(JSON.stringify(matrix, null, 2));
console.log(`\nSevere Details:`);
console.log(JSON.stringify(severeResult.details, null, 2));
console.log(`\nPer-Section Severe:`);
console.log(JSON.stringify(sectionSevere, null, 2));
console.log(`\nPer-Pack Severe:`);
console.log(JSON.stringify(packSevere, null, 2));

// Write output file
const outPath = path.join(__dirname, '..', 'reports', 'systematic_testing', 'SESSION720_ALIGNMENT_MATRIX_VALIDATION.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log(`\nOutput written to: ${outPath}`);
