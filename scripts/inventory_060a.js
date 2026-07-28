// SESSION060A Inventory Script
// Brace-matched (string-aware) object parser for pack_c_corrected.js and pack_d_corrected.js
// Extracts: QuestionID, Section, question_state, and for archived items: difficulty/cognitive/topic metadata.

const fs = require('fs');

function parseBraceMatchedObjects(text, packLabel) {
    // Find the start of the array: const MCQ_BANK_X = [
    const arrayStartMatch = text.match(/const MCQ_BANK_[CD]\s*=\s*\[/);
    if (!arrayStartMatch) {
        throw new Error(`Could not find MCQ_BANK array start in ${packLabel}`);
    }
    const startIdx = arrayStartMatch.index + arrayStartMatch[0].length;

    const objects = [];
    let i = startIdx;
    let depth = 0;
    let inString = false;
    let stringChar = '';
    let escape = false;
    let objStart = -1;
    let totalBraces = 0;

    while (i < text.length) {
        const ch = text[i];

        if (escape) {
            escape = false;
            i++;
            continue;
        }

        if (inString) {
            if (ch === '\\') {
                escape = true;
            } else if (ch === stringChar) {
                inString = false;
                stringChar = '';
            }
            i++;
            continue;
        }

        // Not in string — check for string start
        if (ch === '"' || ch === "'") {
            inString = true;
            stringChar = ch;
        } else if (ch === '{') {
            if (depth === 0) {
                objStart = i;
            }
            depth++;
            totalBraces++;
        } else if (ch === '}') {
            depth--;
            if (depth === 0 && objStart >= 0) {
                const objText = text.substring(objStart, i + 1);
                objects.push(objText);
                objStart = -1;
            }
            if (depth < 0) {
                // We've gone past the outer array — we're done
                break;
            }
        }

        i++;
    }

    console.log(`  ${packLabel}: ${objects.length} objects parsed (${totalBraces} braces tracked)`);
    return objects;
}

function extractFields(objText) {
    const result = {};

    // QuestionID
    const qidMatch = objText.match(/"QuestionID"\s*:\s*"([^"]+)"/);
    if (qidMatch) result.question_state_raw = undefined; // will check later

    // Section — from "Section" field
    const secMatch = objText.match(/"Section"\s*:\s*"([A-F])"/);
    if (!secMatch) {
        // Try from QuestionID pattern
        const qid2 = objText.match(/"QuestionID"\s*:\s*"P1-([A-F])/);
        if (qid2) result.section = qid2[1];
    } else {
        result.section = secMatch[1];
    }

    // QuestionID
    if (qidMatch) result.qid = qidMatch[1];

    // question_state
    const qsMatch = objText.match(/"question_state"\s*:\s*"([^"]+)"/);
    if (qsMatch) {
        result.question_state = qsMatch[1];
    } else {
        result.question_state = 'MISSING';
    }

    // For archived items, extract additional metadata
    if (result.question_state === 'Archived') {
        const diffMatch = objText.match(/"Difficulty"\s*:\s*"([^"]+)"/);
        if (diffMatch) result.difficulty = diffMatch[1];

        const dsMatch = objText.match(/"DifficultyScore"\s*:\s*(\d+)/);
        if (dsMatch) result.difficulty_score = parseInt(dsMatch[1], 10);

        const clMatch = objText.match(/"CognitiveLevel"\s*:\s*"([^"]+)"/);
        if (clMatch) result.cognitive_level = clMatch[1];

        const topicMatch = objText.match(/"Topic"\s*:\s*"([^"]+)"/);
        if (topicMatch) result.topic = topicMatch[1];
    }

    return result;
}

function processPack(filePath, packLabel) {
    const text = fs.readFileSync(filePath, 'utf8');
    const objects = parseBraceMatchedObjects(text, packLabel);

    const parsed = objects.map(objText => extractFields(objText));

    // Count by section and state
    const sections = {};
    const archivedItems = [];

    for (const item of parsed) {
        const sec = item.section || '?';
        const state = item.question_state || 'MISSING';

        if (!sections[sec]) {
            sections[sec] = { total: 0, Certified: 0, Archived: 0, MISSING: 0, Unprocessed: 0, 'In Audit': 0, 'Editorial Queue': 0 };
        }

        sections[sec].total++;
        sections[sec][state] = (sections[sec][state] || 0) + 1;

        if (state === 'Archived') {
            archivedItems.push({
                qid: item.qid || '?',
                section: item.section || '?',
                difficulty: item.difficulty || '?',
                difficulty_score: item.difficulty_score ?? null,
                cognitive_level: item.cognitive_level || '?',
                topic: item.topic || '?'
            });
        }
    }

    const total = parsed.length;
    console.log(`  Sections found:`, Object.keys(sections).sort());
    console.log(`  Section breakdown:`);
    for (const [sec, counts] of Object.entries(sections).sort()) {
        console.log(`    Section ${sec}: total=${counts.total}, Certified=${counts.Certified}, Archived=${counts.Archived}, MISSING=${counts.MISSING}, Unprocessed=${counts.Unprocessed}, InAudit=${counts['In Audit']}, EditorialQueue=${counts['Editorial Queue']}`);
    }
    console.log(`  Archived items: ${archivedItems.length}`);

    return { total, sections, archivedItems };
}

// Main
console.log('=== SESSION060A INVENTORY ===');
console.log('');

console.log('Processing pack_c_corrected.js...');
const packC = processPack('pack_c_corrected.js', 'Pack C');

console.log('');
console.log('Processing pack_d_corrected.js...');
const packD = processPack('pack_d_corrected.js', 'Pack D');

const totalArchived = packC.archivedItems.length + packD.archivedItems.length;

// Build summary — collect all state values dynamically
const allStateKeys = new Set();
for (const [sec, data] of Object.entries(packC.sections)) {
    Object.keys(data).filter(k => k !== 'total').forEach(k => allStateKeys.add(k));
}
for (const [sec, data] of Object.entries(packD.sections)) {
    Object.keys(data).filter(k => k !== 'total').forEach(k => allStateKeys.add(k));
}
const summaryStates = {};
for (const state of Array.from(allStateKeys).sort()) {
    let count = 0;
    for (const [sec, data] of Object.entries(packC.sections)) {
        count += data[state] || 0;
    }
    for (const [sec, data] of Object.entries(packD.sections)) {
        count += data[state] || 0;
    }
    summaryStates[state] = count;
}

// Sections with archived items
const sectionsWithArchived = new Set();
for (const item of packC.archivedItems) sectionsWithArchived.add(item.section);
for (const item of packD.archivedItems) sectionsWithArchived.add(item.section);

// Build section strings: e.g., "EC" = Section E in Pack C
const sectionPackMap = function(section, packLabel) {
    if (packLabel === 'pack_c') return section + 'C';
    return section + 'D';
};
const sectionLabels = [];
for (const sec of sectionsWithArchived) {
    if (packC.sections[sec] && packC.sections[sec].Archived > 0) sectionLabels.push(sec + 'C');
    if (packD.sections[sec] && packD.sections[sec].Archived > 0) sectionLabels.push(sec + 'D');
}

const output = {
    session: 'SESSION060A',
    date: '2026-07-28',
    pack_c: {
        total: packC.total,
        sections: packC.sections,
        archived_items: packC.archivedItems
    },
    pack_d: {
        total: packD.total,
        sections: packD.sections,
        archived_items: packD.archivedItems
    },
    summary: {
        total_archived: totalArchived,
        pack_c_archived: packC.archivedItems.length,
        pack_d_archived: packD.archivedItems.length,
        sections_with_archived: sectionLabels.sort(),
        other_states_total: summaryStates
    }
};

// Write output
const outPath = 'reports/SESSION060A_ARCHIVE_INVENTORY.json';
fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
console.log('');
console.log('Wrote output to:', outPath);
console.log('');
console.log('=== TOTALS ===');
console.log('Pack C total:', packC.total, '(expected 500)');
console.log('Pack D total:', packD.total, '(expected 500)');
console.log('Total archived:', totalArchived);
console.log('Pack C archived:', packC.archivedItems.length);
console.log('Pack D archived:', packD.archivedItems.length);
console.log('Sections with archived:', sectionLabels.sort().join(', '));
console.log('State summary:', JSON.stringify(summaryStates));
