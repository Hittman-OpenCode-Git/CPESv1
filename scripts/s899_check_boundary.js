const fs = require('fs');
const raw = fs.readFileSync('pack_c_corrected.js', 'utf8');
// Find what comes BEFORE EC-001 metadata block (the line above "QuestionID": "P1-EC-001")
const ec1Idx = raw.indexOf('"QuestionID": "P1-EC-001"');
// Show 200 chars before
console.log('BEFORE EC-001 metadata:');
console.log(raw.substring(ec1Idx - 80, ec1Idx + 50));
console.log('\n---');
// Show what comes AFTER EC-001 content block "ReviewNote" (last 50 chars before EC-002 QID)  
const ec2Idx = raw.indexOf('"QuestionID": "P1-EC-002"');
console.log('BEFORE EC-002:');
console.log(raw.substring(ec2Idx - 80, ec2Idx + 50));
