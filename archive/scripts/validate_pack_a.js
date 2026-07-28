const fs = require('fs');

const content = fs.readFileSync('pack_a_corrected.js', 'utf8');
console.log('File size:', content.length);
console.log('Lines:', content.split('\n').length);

// Count question objects
const questionIds = content.match(/"QuestionID"\s*:\s*"([^"]+)"/g);
const ids = questionIds ? questionIds.map(m => m.match(/"QuestionID"\s*:\s*"([^"]+)"/)[1]) : [];
console.log('Question IDs found:', ids.length);
console.log('Unique IDs:', new Set(ids).size);
console.log('First 5 IDs:', ids.slice(0, 5));

// Check for difficulty values
const difficulties = content.match(/"Difficulty"\s*:\s*"([^"]+)"/g);
const diffValues = difficulties ? difficulties.map(m => m.match(/"Difficulty"\s*:\s*"([^"]+)"/)[1]) : [];
console.log('Difficulty values:', [...new Set(diffValues)]);

// Check for item types
const itemTypes = content.match(/"ItemType"\s*:\s*"([^"]+)"/g);
const itemTypeValues = itemTypes ? itemTypes.map(m => m.match(/"ItemType"\s*:\s*"([^"]+)"/)[1]) : [];
console.log('Item types:', [...new Set(itemTypeValues)]);

// Check for sections
const sections = content.match(/"Section"\s*:\s*"([^"]+)"/g);
const sectionValues = sections ? sections.map(m => m.match(/"Section"\s*:\s*"([^"]+)"/)[1]) : [];
console.log('Sections:', [...new Set(sectionValues)]);