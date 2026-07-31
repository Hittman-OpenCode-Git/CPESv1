// Session 81 — Apply cognitive upgrades to Pack D Section B
// Approach: Parse pack via eval, replace items, serialize back.
const fs = require('fs');

const packPath = 'pack_d_corrected.js';
const upgradesPath = 'scripts/session081_upgrades.json';
const backupPath = 'backups/pack_d_corrected.js.bak-20260729224015';

// Confirm backup exists
if (!fs.existsSync(backupPath)) exit('Backup missing');
let backupSize = fs.statSync(backupPath).size;
console.log('Backup: ' + backupPath + ' (' + backupSize + ' bytes)');

// Read the upgrades
if (!fs.existsSync(upgradesPath)) exit('Upgrades file missing: ' + upgradesPath);
let upgrades = JSON.parse(fs.readFileSync(upgradesPath, 'utf8'));
console.log('Upgrades loaded: ' + upgrades.length + ' items');

// Parse pack file using Function constructor (established pattern)
let packCode = fs.readFileSync(packPath, 'utf8');
let packVarName = packCode.match(/(?:var|const|let)\s+(\w+)\s*=/);
if (!packVarName) exit('Cannot identify pack variable name');
let name = packVarName[1];
let fn = new Function(packCode + '; return ' + name + ';');
let items = fn();
console.log('Pack parsed: ' + items.length + ' items');

// Build QID → index map
let qidToIdx = {};
items.forEach((item, i) => {
    if (item.QuestionID) qidToIdx[item.QuestionID] = i;
});

// Apply upgrades
let applied = 0;
upgrades.forEach(up => {
    let idx = qidToIdx[up.qid];
    if (idx === undefined) { console.log('NOT FOUND: ' + up.qid); return; }
    
    let item = items[idx];
    
    // Update content fields
    if (up.Stem) item.Stem = up.Stem;
    if (up.Choices) item.Choices = up.Choices;
    if (up.CorrectChoice) item.CorrectChoice = up.CorrectChoice;
    if (up.ExplanationCorrect) item.ExplanationCorrect = up.ExplanationCorrect;
    if (up.Difficulty) item.Difficulty = up.Difficulty;
    if (up.DifficultyScore) item.DifficultyScore = up.DifficultyScore;
    if (up.CognitiveLevel) item.CognitiveLevel = up.CognitiveLevel;
    
    // Update VerifiedChecks
    item.VerifiedChecks = (up.VerifiedChecks || item.VerifiedChecks || []);
    
    // Update ExplanationWrong fields
    if (up.ExplanationWrongA !== undefined) item.ExplanationWrongA = up.ExplanationWrongA;
    if (up.ExplanationWrongB !== undefined) item.ExplanationWrongB = up.ExplanationWrongB;
    if (up.ExplanationWrongC !== undefined) item.ExplanationWrongC = up.ExplanationWrongC;
    if (up.ExplanationWrongD !== undefined) item.ExplanationWrongD = up.ExplanationWrongD;
    
    // Preserve certification
    if (!item.question_state) item.question_state = 'Certified';
    
    applied++;
    console.log('UPGRADED: ' + up.qid + ' → ' + (up.CognitiveLevel || 'unchanged'));
});

// Reconstruct the pack file
let beforeQidCount = (packCode.match(/"QuestionID"/g) || []).length;
let json = JSON.stringify(items, null, 2);
let newCode = 'var ' + name + ' = ' + json + ';';
let afterQidCount = (newCode.match(/"QuestionID"/g) || []).length;

console.log('\nQID count: ' + beforeQidCount + ' → ' + afterQidCount);
if (beforeQidCount !== afterQidCount) {
    console.log('WARNING: QID count changed! ABORTING.');
    process.exit(1);
}

// Write
fs.writeFileSync(packPath, newCode, 'utf8');
console.log('Applied: ' + applied + '/' + upgrades.length);
console.log('Done.');

function exit(msg) { console.log(msg); process.exit(1); }
