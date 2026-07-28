const fs = require('fs');

const content = fs.readFileSync('pack_a_corrected.js', 'utf8');
const arrayMatch = content.match(/const MCQ_BANK_A = (\[[\s\S]*?\]);\s*$/m);
if (!arrayMatch) {
    console.log('Could not find array');
    process.exit(1);
}

const arrayStr = arrayMatch[1];
const questions = eval('(' + arrayStr + ')');

console.log('Total questions:', questions.length);

var itemTypes = {};
questions.forEach(function(q) {
    var t = q.ItemType || 'MISSING';
    itemTypes[t] = (itemTypes[t] || 0) + 1;
});
console.log('\nItemType distribution:');
for (var t in itemTypes) {
    console.log('  ' + t + ': ' + itemTypes[t]);
}

var difficulties = {};
questions.forEach(function(q) {
    var d = q.Difficulty || 'MISSING';
    difficulties[d] = (difficulties[d] || 0) + 1;
});
console.log('\nDifficulty distribution:');
for (var d in difficulties) {
    console.log('  ' + d + ': ' + difficulties[d]);
}

console.log('\nFirst 10 questions:');
questions.slice(0, 10).forEach(function(q, i) {
    console.log((i+1) + '. ID: ' + q.QuestionID + ', ItemType: ' + q.ItemType + ', Difficulty: ' + q.Difficulty + ', CalculationItem: ' + q.CalculationItem);
});

var sections = {};
questions.forEach(function(q) {
    var s = q.Section || 'MISSING';
    sections[s] = (sections[s] || 0) + 1;
});
console.log('\nSection distribution:');
for (var s in sections) {
    console.log('  ' + s + ': ' + sections[s]);
}