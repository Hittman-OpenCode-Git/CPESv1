"use strict";
const fs = require("fs");
const path = require("path");

function loadFile(name) {
  const fullPath = path.join(__dirname, "..", name);
  const src = fs.readFileSync(fullPath, "utf-8");
  const wrapped = "return (function() { " + src + "; return { ENHANCED_CASE_BASE: typeof ENHANCED_CASE_BASE !== 'undefined' ? ENHANCED_CASE_BASE : undefined, ENHANCED_CASE_BASE2: typeof ENHANCED_CASE_BASE2 !== 'undefined' ? ENHANCED_CASE_BASE2 : undefined, ENHANCED_CASE_BASE3: typeof ENHANCED_CASE_BASE3 !== 'undefined' ? ENHANCED_CASE_BASE3 : undefined, ENHANCED_CASE_BASE4: typeof ENHANCED_CASE_BASE4 !== 'undefined' ? ENHANCED_CASE_BASE4 : undefined, ENHANCED_CASE_BASE5: typeof ENHANCED_CASE_BASE5 !== 'undefined' ? ENHANCED_CASE_BASE5 : undefined }; })()";
  return new Function(wrapped)();
}

// Check which CBQ cases have 5 vs 6 items and their QuestionCount
console.log("=== CBQ cases with 5 items ===");
["content/cases/legacy/scored_cases.js","content/cases/legacy/scored_cases2.js","content/cases/legacy/scored_cases3.js","content/cases/legacy/scored_cases4.js","content/cases/legacy/scored_cases5.js"].forEach(f => {
  const d = loadFile(f);
  ["ENHANCED_CASE_BASE","ENHANCED_CASE_BASE2","ENHANCED_CASE_BASE3","ENHANCED_CASE_BASE4","ENHANCED_CASE_BASE5"].forEach(k => {
    if (!d[k]) return;
    d[k].forEach(c => {
      const il = (c.Items || []).length;
      if (il === 5) {
        console.log(f + "::" + c.CaseID + " QuestionCount=" + (c.QuestionCount||"?") + " ProductionStatus=" + (c.ProductionStatus||"?"));
      }
    });
  });
});

console.log("\n=== CBQ cases with 6 items ===");
["content/cases/legacy/scored_cases.js","content/cases/legacy/scored_cases2.js","content/cases/legacy/scored_cases3.js","content/cases/legacy/scored_cases4.js","content/cases/legacy/scored_cases5.js"].forEach(f => {
  const d = loadFile(f);
  ["ENHANCED_CASE_BASE","ENHANCED_CASE_BASE2","ENHANCED_CASE_BASE3","ENHANCED_CASE_BASE4","ENHANCED_CASE_BASE5"].forEach(k => {
    if (!d[k]) return;
    d[k].forEach(c => {
      const il = (c.Items || []).length;
      if (il === 6) {
        console.log(f + "::" + c.CaseID + " QuestionCount=" + (c.QuestionCount||"?") + " ProductionStatus=" + (c.ProductionStatus||"?"));
      }
    });
  });
});

// Tally
console.log("\n=== Summary ===");
let total5 = 0, total6 = 0;
["content/cases/legacy/scored_cases.js","content/cases/legacy/scored_cases2.js","content/cases/legacy/scored_cases3.js","content/cases/legacy/scored_cases4.js","content/cases/legacy/scored_cases5.js"].forEach(f => {
  const d = loadFile(f);
  ["ENHANCED_CASE_BASE","ENHANCED_CASE_BASE2","ENHANCED_CASE_BASE3","ENHANCED_CASE_BASE4","ENHANCED_CASE_BASE5"].forEach(k => {
    if (!d[k]) return;
    d[k].forEach(c => {
      const il = (c.Items || []).length;
      if (il === 5) total5++;
      if (il === 6) total6++;
    });
  });
});
console.log("Enhanced 5-item cases: " + total5);
console.log("Enhanced 6-item cases: " + total6);
console.log("Total enhanced: " + (total5 + total6));

// Check: does every enhanced case's QuestionCount match Items.length?
console.log("\n=== QuestionCount mismatches (enhanced) ===");
let mismatches = 0;
["content/cases/legacy/scored_cases.js","content/cases/legacy/scored_cases2.js","content/cases/legacy/scored_cases3.js","content/cases/legacy/scored_cases4.js","content/cases/legacy/scored_cases5.js"].forEach(f => {
  const d = loadFile(f);
  ["ENHANCED_CASE_BASE","ENHANCED_CASE_BASE2","ENHANCED_CASE_BASE3","ENHANCED_CASE_BASE4","ENHANCED_CASE_BASE5"].forEach(k => {
    if (!d[k]) return;
    d[k].forEach(c => {
      const qc = c.QuestionCount;
      const il = (c.Items || []).length;
      if (qc !== il) {
        mismatches++;
        console.log("MISMATCH: " + f + "::" + c.CaseID + " QuestionCount=" + qc + " Items.length=" + il);
      }
    });
  });
});
console.log("Total mismatches: " + mismatches);
