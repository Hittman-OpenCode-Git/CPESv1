const fs = require('fs');
const content = fs.readFileSync('pack_p2_f.js', 'utf8');
const regex = /"question_state"\s*:\s*"Certified"/g;
const matches = content.match(regex);
console.log('Pack F Certified:', matches ? matches.length : 0);

const qidRegex = /"QuestionID"\s*:\s*"P2-F-/g;
const qidMatches = content.match(qidRegex);
console.log('Pack F Total QIDs:', qidMatches ? qidMatches.length : 0);