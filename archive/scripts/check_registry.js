const fs = require('fs');

const registryPath = 'reports/MasterQuestionRegistry.csv';
const content = fs.readFileSync(registryPath, 'utf8');
const lines = content.split('\n');
const header = lines[0].split(',');
const rows = lines.slice(1).filter(l => l.trim());

console.log('Registry total rows:', rows.length);

// Find Section A questions
const sectionA = rows.filter(r => {
    const fields = r.split(',');
    return fields[8] === 'External Financial Reporting Decisions';
});

console.log('Section A questions in registry:', sectionA.length);

// Check metadata completeness for Section A
let bloomCount = 0;
let diffScoreCount = 0;
let diffLabelCount = 0;
let bloomSourceCount = 0;

for (const row of sectionA) {
    const fields = row.split(',');
    if (fields[10] && fields[10] !== '') bloomCount++;
    if (fields[11] && fields[11] !== '') bloomSourceCount++;
    if (fields[13] && fields[13] !== '') diffScoreCount++;
    if (fields[14] && fields[14] !== '') diffLabelCount++;
}

console.log('\nSection A Metadata Completeness:');
console.log('BloomLevel:', bloomCount, '/', sectionA.length, `(${Math.round(bloomCount/sectionA.length*100)}%)`);
console.log('BloomSource:', bloomSourceCount, '/', sectionA.length, `(${Math.round(bloomSourceCount/sectionA.length*100)}%)`);
console.log('DifficultyScore:', diffScoreCount, '/', sectionA.length, `(${Math.round(diffScoreCount/sectionA.length*100)}%)`);
console.log('DifficultyLabel:', diffLabelCount, '/', sectionA.length, `(${Math.round(diffLabelCount/sectionA.length*100)}%)`);

// Sample questions
console.log('\nSample Section A questions from registry:');
sectionA.slice(0, 3).forEach((row, i) => {
    const f = row.split(',');
    console.log(`\nQ${i+1}: ${f[0]}`);
    console.log('  BloomLevel:', f[10] || '(empty)');
    console.log('  BloomSource:', f[11] || '(empty)');
    console.log('  BloomConfidence:', f[12] || '(empty)');
    console.log('  Difficulty:', f[13] || '(empty)');
    console.log('  DifficultyScore:', f[14] || '(empty)');
    console.log('  Domain:', f[8] || '(empty)');
});