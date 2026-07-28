// Extract a specific QID from a pack file for content inspection
const fs = require('fs');
const qid = process.argv[2];
const filePath = process.argv[3];

const content = fs.readFileSync(filePath, 'utf-8');
const idx = content.indexOf('"QuestionID": "' + qid + '"');
if (idx === -1) {
    console.log('QID not found: ' + qid);
    process.exit(1);
}

const chunk = content.slice(Math.max(0, idx - 50), idx + 5000);
console.log(chunk);
