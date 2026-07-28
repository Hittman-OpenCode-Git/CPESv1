const fs = require('fs');
const src = fs.readFileSync('pack_c_corrected.js', 'utf8');
const fn = new Function(src + ';\nconst item = MCQ_BANK_C.find(i => i.QuestionID === "P1-FC-001");\nconsole.log("EW_A:", item.ExplanationWrongA ? item.ExplanationWrongA.substring(0,80) : (item.ExplanationWrongA === "" ? "EMPTY" : "undefined"));\nconsole.log("EW_B:", item.ExplanationWrongB ? item.ExplanationWrongB.substring(0,80) : (item.ExplanationWrongB === "" ? "EMPTY" : "undefined"));\nconsole.log("CC:", item.CorrectChoice);\nreturn true;');
fn();
