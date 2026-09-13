const fs = require('fs');
const content = fs.readFileSync('pack_p2_f.js', 'utf8');

// Check P2-F-171 stem
const idx171 = content.indexOf('P2-F-171');
const stem171Match = content.substring(idx171, idx171 + 500).match(/"Stem":\s*"([^"]+)"/);
console.log('P2-F-171 Stem:', stem171Match ? stem171Match[1] : 'NOT FOUND');

// Check P2-F-195 difficulty
const idx195 = content.indexOf('P2-F-195');
const diff195Match = content.substring(idx195, idx195 + 500).match(/"Difficulty":\s*"([^"]+)"/);
const score195Match = content.substring(idx195, idx195 + 500).match(/"DifficultyScore":\s*(\d+)/);
console.log('P2-F-195 Difficulty:', diff195Match ? diff195Match[1] : 'NOT FOUND');
console.log('P2-F-195 DifficultyScore:', score195Match ? score195Match[1] : 'NOT FOUND');

// Verify QID count
const qids = content.match(/"QuestionID":\s*"P2-F-\d+"/g);
console.log('Total P2-F QIDs:', qids ? qids.length : 0);

// Verify certified count
const certified = content.match(/"question_state":\s*"Certified"/g);
console.log('Certified count:', certified ? certified.length : 0);