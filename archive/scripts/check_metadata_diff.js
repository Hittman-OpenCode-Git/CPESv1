const fs = require('fs');
const path = require('path');

const origContent = fs.readFileSync('pack_a_corrected.js', 'utf8');
const arrayMatch = origContent.match(/const MCQ_BANK_A = (\[[\s\S]*?\]);\s*$/m);
const originalQuestions = eval('(' + arrayMatch[1] + ')');

const registryPath = path.join('reports', 'MasterQuestionRegistry.csv');
const registryContent = fs.readFileSync(registryPath, 'utf8');
const lines = registryContent.split('\n').filter(l => l.trim());
const header = lines[0].split(',');
const rows = lines.slice(1).map(line => {
    const obj = {};
    let inQuotes = false;
    let current = '';
    let fieldIndex = 0;
    
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
            if (i + 1 < line.length && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (ch === ',' && !inQuotes) {
            const fieldName = line.split(',')[fieldIndex];
            obj[header[fieldIndex]] = current;
            current = '';
            fieldIndex++;
        } else {
            current += ch;
        }
    }
    if (fieldIndex < header.length) {
        obj[header[fieldIndex]] = current;
    }
    return obj;
});

const registryById = {};
rows.forEach(r => { registryById[r.QuestionID] = r; });

console.log('=== METADATA DIFF (First 5 Questions) ===\n');
const origQuestions = eval('(' + fs.readFileSync('pack_a_corrected.js', 'utf8').match(/const MCQ_BANK_A = (\[[\s\S]*?\]);\s*$/m)[1] + ')');

originalQuestions.slice(0, 5).forEach(orig => {
    const reg = registryById[orig.QuestionID];
    if (!reg) {
        console.log(orig.QuestionID + ': NOT IN REGISTRY');
        return;
    }
    
    console.log(orig.QuestionID + ':');
    console.log('  Before:');
    console.log('    BloomLevel: ' + (orig.BloomLevel || '(empty)'));
    console.log('    DifficultyScore: ' + (orig.DifficultyScore || '(empty)'));
    console.log('    MetadataVersion: ' + (orig.MetadataVersion || '(empty)'));
    console.log('  After:');
    console.log('    BloomLevel: ' + (reg.BloomLevel || '(empty)'));
    console.log('    DifficultyScore: ' + (reg.DifficultyScore || '(empty)'));
    console.log('    MetadataVersion: ' + (reg.MetadataVersion || '(empty)'));
    console.log('    MetadataSource: ' + (reg.MetadataSource || '(empty)'));
    console.log('    MetadataConfidence: ' + (reg.MetadataConfidence || '(empty)'));
    console.log('');
});