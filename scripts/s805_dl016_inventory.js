// S805 DL-016 Inventory Builder
// Extracts Pack A Section E items with Block1 EW fields + Block2 choices
// Identifies DL-016 shift (EW text != item's own topic)

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'pack_a_corrected.js');
const raw = fs.readFileSync(filePath, 'utf8');

// Parse via Function constructor
let packArray;
try {
    const fn = new Function(raw + '; return MCQ_BANK_A;');
    packArray = fn();
} catch(e) {
    console.error('Parse failed:', e.message);
    process.exit(1);
}

// Find all Section E items (each QID has 2 objects in array: meta + content)
const sectionEItems = [];

// Build index: for each QuestionID, find its meta block and content block
const metaMap = {};   // QID -> { idx, obj }
const contentMap = {}; // QID -> { idx, obj }

for (let i = 0; i < packArray.length; i++) {
    const obj = packArray[i];
    const qid = obj.QuestionID;
    if (!qid || !qid.startsWith('P1-E-')) continue;
    
    if (obj.ExplanationWrongA !== undefined || obj.ExplanationWrongB !== undefined) {
        // This is a metadata block (has ExplanationWrong fields)
        metaMap[qid] = { idx: i, obj };
    } else if (obj.Section === 'E' && obj.Stem) {
        // This is a content block (has Section + Stem)
        contentMap[qid] = { idx: i, obj };
    }
}

// For each QID, pair up meta + content
const allQIDs = [...new Set([...Object.keys(metaMap), ...Object.keys(contentMap)])].sort();

const results = [];
for (const qid of allQIDs) {
    const meta = metaMap[qid];
    const content = contentMap[qid];
    
    if (!meta && !content) continue;
    
    const state = meta ? (meta.obj.question_state || 'missing') : (content.obj.question_state || 'missing');
    
    if (state === 'Archived') continue; // Skip archived items
    
    const entry = {
        qid,
        state,
        hasMetaBlock: !!meta,
        hasContentBlock: !!content,
    };
    
    if (meta) {
        entry.block1 = {
            qid: meta.obj.QuestionID,
            state: meta.obj.question_state || 'missing',
            ewa: (meta.obj.ExplanationWrongA || '').substring(0, 120),
            ewb: (meta.obj.ExplanationWrongB || '').substring(0, 120),
            ewc: (meta.obj.ExplanationWrongC || '').substring(0, 120),
            ewd: (meta.obj.ExplanationWrongD || '').substring(0, 120),
            ewa_len: (meta.obj.ExplanationWrongA || '').length,
            ewb_len: (meta.obj.ExplanationWrongB || '').length,
            ewc_len: (meta.obj.ExplanationWrongC || '').length,
            ewd_len: (meta.obj.ExplanationWrongD || '').length,
        };
    }
    
    if (content) {
        entry.block2 = {
            topic: content.obj.Topic || '',
            stem: (content.obj.Stem || '').substring(0, 200),
            choices: content.obj.Choices || {},
            cc: content.obj.CorrectChoice || '',
            ec: (content.obj.ExplanationCorrect || '').substring(0, 200),
        };
    }
    
    results.push(entry);
}

// Count certified
const certified = results.filter(r => r.state === 'Certified');
console.log(`Total Section E items: ${results.length}`);
console.log(`Certified: ${certified.length}`);
console.log(`Archived: ${results.filter(r => r.state === 'Archived').length}`);
console.log(`Other: ${results.filter(r => r.state !== 'Certified' && r.state !== 'Archived').length}`);
console.log('');

// DL-016 analysis: For each Certified item with both blocks,
// check if EW text is topically aligned with its own choices
const dl016Items = [];
for (const item of certified) {
    if (!item.block1 || !item.block2) {
        dl016Items.push({ ...item, dl016: 'INCOMPLETE_BLOCKS', severity: 'UNKNOWN' });
        continue;
    }
    
    const { block1, block2 } = item;
    const cc = block2.cc;
    
    // Score each non-CC EW slot for topical alignment
    // We use simple keyword overlap between EW text and choice text
    const scores = {};
    for (const letter of ['A','B','C','D']) {
        if (letter === cc) {
            scores[letter] = { aligned: true, note: 'CC_slot_empty_or_empty' };
            continue;
        }
        
        const ewText = block1['ew' + letter.toLowerCase()] || '';
        const choiceText = block2.choices[letter] || '';
        
        // Check for generic/template patterns
        const genericPatterns = [
            'does not align with',
            'The correct approach involves',
            'represents a plausible misconception',
            'A candidate may select this option by misapplying',
            'does not address the specific',
            'is not the best response because',
            'Option ' + letter + ' is incorrect',
        ];
        
        const hasGeneric = genericPatterns.some(p => 
            ewText.toLowerCase().includes(p.toLowerCase())
        );
        
        // Check if EW mentions choice-specific content
        const choiceWords = new Set(choiceText.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 3));
        const ewWords = new Set(ewText.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 3));
        const overlap = [...choiceWords].filter(w => ewWords.has(w)).length;
        const overlapRatio = choiceWords.size > 0 ? overlap / choiceWords.size : 0;
        
        scores[letter] = {
            ew_empty: ewText.length === 0,
            ew_len: ewText.length,
            choice_text: choiceText.substring(0, 80),
            has_generic: hasGeneric,
            overlap_ratio: overlapRatio,
            aligned: overlapRatio > 0.15 && !hasGeneric,
        };
    }
    
    const nonCCLetters = ['A','B','C','D'].filter(l => l !== cc);
    const misalignedCount = nonCCLetters.filter(l => !scores[l].aligned).length;
    const emptyNonCCCount = nonCCLetters.filter(l => scores[l].ew_empty).length;
    const genericCount = nonCCLetters.filter(l => scores[l].has_generic).length;
    
    let dl016Status = 'CLEAN';
    if (misalignedCount >= 3) dl016Status = 'DL016_ALL_MISALIGNED';
    else if (misalignedCount >= 2) dl016Status = 'DL016_PARTIAL';
    else if (genericCount > 0) dl016Status = 'DL016_GENERIC';
    else if (emptyNonCCCount > 0) dl016Status = 'DL026_EMPTY_SLOTS';
    
    dl016Items.push({
        qid: item.qid,
        state: item.state,
        cc,
        topic: block2.topic,
        stem_snippet: block2.stem.substring(0, 100),
        scores,
        misaligned_count: misalignedCount,
        generic_count: genericCount,
        empty_noncc_count: emptyNonCCCount,
        dl016_status: dl016Status,
    });
}

console.log('=== DL-016 STATUS SUMMARY ===');
const statusCounts = {};
for (const item of dl016Items) {
    statusCounts[item.dl016_status] = (statusCounts[item.dl016_status] || 0) + 1;
}
for (const [status, count] of Object.entries(statusCounts).sort()) {
    console.log(`  ${status}: ${count}`);
}

console.log('');
console.log('=== FULL INVENTORY ===');
console.log(JSON.stringify(dl016Items, null, 2));

// Write inventory to file
const outputPath = path.join(__dirname, '..', 'reports', 'SESSION805_DL016_INVENTORY.json');
fs.writeFileSync(outputPath, JSON.stringify({
    session: '805',
    agent: 'B',
    date: '2026-07-26',
    certified_count: certified.length,
    total_section_e: results.length,
    inventory: dl016Items,
    status_summary: statusCounts,
}, null, 2));

console.log(`\nInventory written to: ${outputPath}`);
