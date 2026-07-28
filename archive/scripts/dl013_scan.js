/**
 * DL-013 Remaining Scan — Boundary-safe QID-indexing
 * Scans Pack A/C/D Sections B-F for template text ("represents a plausible misconception")
 * Per reconciliation-audit.md §3a: block-parse at QuestionID → next QuestionID boundaries.
 * Read-only. No writes.
 */
const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026';
const PACKS = ['pack_a', 'pack_c', 'pack_d'];
const TEMPLATE_TEXT = 'represents a plausible misconception';

const results = {};

function getSectionFromQid(qid) {
    // Pack A: P1-X-NNN → section X
    // Pack B: P1B-X-NNN
    // Packs C/D: P1-AC-NNN (section A+C), P1-EC-NNN (section E+C)
    const m = qid.match(/P1[BCDE]?-([A-Z])[A-Z]?-\d{3}$/);
    return m ? m[1] : null;
}

function getPackFromQid(qid) {
    if (qid.startsWith('P1B-')) return 'pack_b';
    if (qid.startsWith('P1E-')) return 'pack_e';
    // Pack C/D have interleaved prefixes like P1-AC-, P1-EC- etc.
    // The pack file determines the pack, not the QID prefix
    return null; // determined by file
}

function scanPack(filename) {
    const filepath = path.join(BASE, filename);
    const content = fs.readFileSync(filepath, 'utf-8');
    
    const qidRe = /"QuestionID":\s*"(P1[A-Z]*-[A-Z]{1,2}-\d{3})"/g;
    const boundaries = [];
    let m;
    while ((m = qidRe.exec(content)) !== null) {
        boundaries.push({ qid: m[1], idx: m.index, len: m[0].length });
    }
    
    console.log(`  ${filename}: ${boundaries.length} QuestionIDs`);
    
    const sectionCounts = {};
    const sections = 'ABCDEF'.split('');
    for (const s of sections) {
        sectionCounts[s] = { total: 0, contaminated: 0, clean: 0, certifiedContaminated: [] };
    }
    
    let totalTemplate = 0;
    let certifiedHits = [];
    
    for (let i = 0; i < boundaries.length; i++) {
        const { qid, idx } = boundaries[i];
        const section = getSectionFromQid(qid);
        if (!section) continue;
        
        // Only B-F sections (A already resolved)
        if (!'BCDEF'.includes(section)) continue;
        
        sectionCounts[section].total++;
        
        // Define block boundary: from this QID to the next QID
        const nextIdx = (i + 1 < boundaries.length) 
            ? boundaries[i + 1].idx 
            : content.length;
        const block = content.substring(idx, nextIdx);
        
        // Check for template text
        const hasTemplate = block.includes(TEMPLATE_TEXT);
        if (hasTemplate) {
            sectionCounts[section].contaminated++;
            totalTemplate++;
            
            // Check question_state
            const stateMatch = block.match(/"question_state":\s*"([^"]*)"/);
            if (stateMatch && stateMatch[1] === 'Certified') {
                certifiedHits.push({ qid, section, state: stateMatch[1] });
                sectionCounts[section].certifiedContaminated.push(qid);
            }
        } else {
            sectionCounts[section].clean++;
        }
    }
    
    return { filename, sectionCounts, totalTemplate, certifiedHits };
}

console.log('=== DL-013 Remaining Scan (Sections B-F only) ===\n');

let grandTotalTemplate = 0;
let allCertifiedHits = [];

for (const pack of PACKS) {
    const path_ = path.join(BASE, `${pack}_corrected.js`);
    if (!fs.existsSync(path_)) {
        console.log(`  ${pack}_corrected.js: NOT FOUND, skipping`);
        continue;
    }
    console.log(`--- ${pack}_corrected.js ---`);
    const result = scanPack(`${pack}_corrected.js`);
    
    // Print per-section breakdown
    for (const s of 'BCDEF'.split('')) {
        const sc = result.sectionCounts[s];
        if (sc.total === 0) continue;
        const pct = ((sc.contaminated / sc.total) * 100).toFixed(1);
        const flag = sc.certifiedContaminated.length > 0 ? ' *** CERTIFIED + TEMPLATE ***' : '';
        console.log(`  Section ${s}: ${sc.total} items | ${sc.contaminated} contaminated (${pct}%) | ${sc.clean} clean${flag}`);
        if (sc.certifiedContaminated.length > 0) {
            sc.certifiedContaminated.forEach(q => console.log(`    CERTIFIED+Template: ${q}`));
        }
    }
    
    grandTotalTemplate += result.totalTemplate;
    allCertifiedHits.push(...result.certifiedHits);
    console.log(`  Subtotal: ${result.totalTemplate} template hits\n`);
}

console.log('=== GRAND TOTAL ===');
console.log(`Total template occurrences (Sections B-F): ${grandTotalTemplate}`);
console.log(`Certified items with template text: ${allCertifiedHits.length}`);

if (allCertifiedHits.length > 0) {
    console.log('\n*** CRITICAL STOP: Certified items found with unremediated template text ***');
    allCertifiedHits.forEach(h => console.log(`  ${h.qid} (Section ${h.section})`));
    console.log('*** HALT: These are live-pool quality defects. Do NOT proceed with batch plan. ***\n');
} else {
    console.log('\n✓ Zero Certified items with template text. Learner pool is clean.\n');
}

// Density ranking
console.log('=== DENSITY RANKING (by pack+section) ===');
const allRankings = [];
for (const pack of PACKS) {
    // Re-scan for rankings
    const filepath = path.join(BASE, `${pack}_corrected.js`);
    if (!fs.existsSync(filepath)) continue;
    const content = fs.readFileSync(filepath, 'utf-8');
    const qidRe = /"QuestionID":\s*"(P1[A-Z]*-[A-Z]{1,2}-\d{3})"/g;
    const boundaries = [];
    let m;
    while ((m = qidRe.exec(content)) !== null) {
        boundaries.push({ qid: m[1], idx: m.index, len: m[0].length });
    }
    
    for (const s of 'BCDEF'.split('')) {
        let total = 0, contaminated = 0;
        for (let i = 0; i < boundaries.length; i++) {
            const section = getSectionFromQid(boundaries[i].qid);
            if (section !== s) continue;
            total++;
            const nextIdx = (i + 1 < boundaries.length) ? boundaries[i + 1].idx : content.length;
            const block = content.substring(boundaries[i].idx, nextIdx);
            if (block.includes(TEMPLATE_TEXT)) contaminated++;
        }
        if (total > 0) {
            allRankings.push({
                pack: pack.replace('pack_', ''),
                section: s,
                total,
                contaminated,
                density: (contaminated / total * 100)
            });
        }
    }
}

allRankings.sort((a, b) => b.density - a.density);

console.log('Rank | Pack | Section | Total | Contaminated | Density');
console.log('-----|------|---------|-------|-------------|--------');
allRankings.forEach((r, i) => {
    console.log(`  ${(i+1).toString().padStart(2)}  |  ${r.pack.toUpperCase()}  |    ${r.section}    |  ${r.total.toString().padStart(3)} |     ${r.contaminated.toString().padStart(3)}     |  ${r.density.toFixed(1)}%`);
});
