const fs = require('fs');
const src = fs.readFileSync('content/packs/pack_a_corrected.js', 'utf8');
const re = /"QuestionID": "P1-C-001"[\s\S]{0,300}?"LOSTag": "([^"]+)"/;
const m = src.match(/"Topic": "([^"]+)",\s*\n\s*"MicroTopic"[\s\S]{0,400}?"QuestionID": "P1-C-001"/);
console.log('topic-block:', m ? m[1] : 'no');
const i = src.indexOf('"QuestionID": "P1-C-001"');
console.log(src.slice(Math.max(0, i - 2600), i - 1400));