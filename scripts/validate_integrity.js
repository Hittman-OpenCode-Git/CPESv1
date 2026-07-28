const fs = require('fs');
const path = require('path');

// Read original source file
const origContent = fs.readFileSync('pack_a_corrected.js', 'utf8');
const arrayMatch = origContent.match(/const MCQ_BANK_A = (\[[\s\S]*?\]);\s*$/m);
const originalQuestions = eval('(' + arrayMatch[1] + ')');

// Read enriched registry
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
            const fieldName = header[fieldIndex];
            obj[fieldName] = current;
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

console.log('=== INTEGRITY VALIDATION ===\n');

// Map original questions by ID
const origById = {};
originalQuestions.forEach(q => {
    origById[q.QuestionID] = q;
});

let contentMatches = 0;
let contentMismatches = 0;
let missingInRegistry = 0;
let extraInRegistry = 0;

const registryById = {};
rows.forEach(r => {
    registryById[r.QuestionID] = r;
});

console.log('Original questions:', Object.keys(origById).length);
console.log('Registry questions:', Object.keys(registryById).length);

// Check for missing IDs
Object.keys(origById).forEach(id => {
    if (!registryById[id]) {
        missingInRegistry++;
        console.log('MISSING in registry:', id);
    }
});

Object.keys(registryById).forEach(id => {
    if (!origById[id]) {
        extraInRegistry++;
        console.log('EXTRA in registry:', id);
    }
});

console.log('\nMissing in registry:', missingInRegistry);
console.log('Extra in registry:', extraInRegistry);

// Check integrity for first 5 questions
console.log('\n=== INTEGRITY CHECK (First 5 questions) ===');
originalQuestions.slice(0, 5).forEach(orig => {
    const reg = registryById[orig.QuestionID];
    if (!reg) {
        console.log(orig.QuestionID + ': NOT IN REGISTRY');
        return;
    }
    
    const fieldsToCheck = ['QuestionID', 'Stem', 'CorrectChoice', 'ExplanationCorrect'];
    let allMatch = true;
    
    fieldsToCheck.forEach(field => {
        const origVal = orig[field] || '';
        const regVal = reg[field] || '';
        if (origVal !== regVal) {
            console.log(`  ${orig.QuestionID} - ${field} MISMATCH`);
            console.log('    Original:', origVal.substring(0, 80));
            console.log('    Registry:', regVal.substring(0, 80));
            allMatch = false;
        }
    });
    
    // Check choices
    const choiceFields = ['ChoiceA', 'ChoiceB', 'ChoiceC', 'ChoiceD'];
    choiceFields.forEach(f => {
        const origVal = orig[f] || '';
        const regVal = reg[f] || '';
        if (origVal !== regVal) {
            console.log(`  ${orig.QuestionID} - ${f} MISMATCH`);
            console.log('    Original:', origVal.substring(0, 80));
            console.log('    Registry:', regVal.substring(0, 80));
            allMatch = false;
        }
    });
    
    if (allMatch) {
        contentMatches++;
        console.log(orig.QuestionID + ': PASS');
    } else {
        contentMismatches++;
    }
});

console.log('\nContent matches:', contentMatches);
console.log('Content mismatches:', contentMismatches);

// Check choices integrity
console.log('\n=== CHOICES INTEGRITY ===');
let choiceMatches = 0;
let choiceMismatches = 0;
originalQuestions.slice(0, 10).forEach(orig => {
    const reg = registryById[orig.QuestionID];
    if (!reg) return;
    
    const origChoices = orig.Choices || {};
    const regChoices = {
        A: reg.ChoiceA || '',
        B: reg.ChoiceB || '',
        C: reg.ChoiceC || '',
        D: reg.ChoiceD || ''
    };
    
    let match = true;
    ['A', 'B', 'C', 'D'].forEach(key => {
        if (origChoices[key] !== regChoices[key]) {
            match = false;
            console.log(`  ${orig.QuestionID} Choice ${key} MISMATCH`);
            console.log('    Original:', origChoices[key]?.substring(0, 80));
            console.log('    Registry:', regChoices[key]?.substring(0, 80));
        }
    });
    if (match) choiceMatches++;
    else choiceMismatches++;
});

console.log('Choice matches:', choiceMatches);
console.log('Choice mismatches:', choiceMismatches);