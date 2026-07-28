"use strict";
const fs = require("fs");
const path = require("path");

function loadFile(name) {
  const fullPath = path.join(__dirname, "..", name);
  const src = fs.readFileSync(fullPath, "utf-8");
  const wrapped = `return (function() { ${src}
  return {
    ENHANCED_CASE_BASE: typeof ENHANCED_CASE_BASE !== 'undefined' ? ENHANCED_CASE_BASE : undefined,
    ENHANCED_CASE_BASE2: typeof ENHANCED_CASE_BASE2 !== 'undefined' ? ENHANCED_CASE_BASE2 : undefined,
    ENHANCED_CASE_BASE3: typeof ENHANCED_CASE_BASE3 !== 'undefined' ? ENHANCED_CASE_BASE3 : undefined,
    ENHANCED_CASE_BASE4: typeof ENHANCED_CASE_BASE4 !== 'undefined' ? ENHANCED_CASE_BASE4 : undefined,
    ENHANCED_CASE_BASE5: typeof ENHANCED_CASE_BASE5 !== 'undefined' ? ENHANCED_CASE_BASE5 : undefined,
    MIGRATED_CASE_BASE_A: typeof MIGRATED_CASE_BASE_A !== 'undefined' ? MIGRATED_CASE_BASE_A : undefined,
    MIGRATED_CASE_BASE_B: typeof MIGRATED_CASE_BASE_B !== 'undefined' ? MIGRATED_CASE_BASE_B : undefined,
    MIGRATED_CASE_BASE_C: typeof MIGRATED_CASE_BASE_C !== 'undefined' ? MIGRATED_CASE_BASE_C : undefined,
    MIGRATED_CASE_BASE_D: typeof MIGRATED_CASE_BASE_D !== 'undefined' ? MIGRATED_CASE_BASE_D : undefined,
  }; })()`;
  return new Function(wrapped)();
}

const files = ["scored_cases.js","scored_cases2.js","scored_cases3.js","scored_cases4.js","scored_cases5.js"];

// Check migrated CASE-A* QuestionCount vs Items.length
console.log("=== MIGRATED_CASE_BASE_A: QCount vs Items.length ===");
const d1 = loadFile("scored_cases.js");
(d1.MIGRATED_CASE_BASE_A || []).forEach(c => {
  const qc = c.QuestionCount || "MISSING";
  const il = (c.Items || []).length;
  console.log(c.CaseID + ": QuestionCount=" + qc + " Items.length=" + il + (qc !== il ? " MISMATCH" : ""));
});

// Check CBQ cases missing DifficultyScore
console.log("\n=== CBQ Cases Missing DifficultyScore ===");
files.forEach(f => {
  const d = loadFile(f);
  const keys = ["ENHANCED_CASE_BASE","ENHANCED_CASE_BASE2","ENHANCED_CASE_BASE3","ENHANCED_CASE_BASE4","ENHANCED_CASE_BASE5"];
  keys.forEach(k => {
    (d[k] || []).forEach(c => {
      if (c.DifficultyScore === undefined || c.DifficultyScore === null) {
        console.log(f + "::" + c.CaseID + " DifficultyScore=MISSING ProductionStatus=" + c.ProductionStatus);
      }
    });
  });
});

// Enhanced cases: item-level question_state values
console.log("\n=== Enhanced Item question_state Distribution ===");
const enhStates = {};
files.forEach(f => {
  const d = loadFile(f);
  ["ENHANCED_CASE_BASE","ENHANCED_CASE_BASE2","ENHANCED_CASE_BASE3","ENHANCED_CASE_BASE4","ENHANCED_CASE_BASE5"].forEach(k => {
    (d[k] || []).forEach(c => {
      (c.Items || []).forEach(it => {
        const s = it.question_state || "MISSING";
        enhStates[s] = (enhStates[s] || 0) + 1;
      });
    });
  });
});
console.log(JSON.stringify(enhStates, null, 2));

// Migrated cases: item-level question_state distribution
console.log("\n=== Migrated Item question_state Distribution ===");
const migStates = {};
files.forEach(f => {
  const d = loadFile(f);
  ["MIGRATED_CASE_BASE_A","MIGRATED_CASE_BASE_B","MIGRATED_CASE_BASE_C","MIGRATED_CASE_BASE_D"].forEach(k => {
    (d[k] || []).forEach(c => {
      (c.Items || []).forEach(it => {
        const s = it.question_state || "MISSING";
        migStates[s] = (migStates[s] || 0) + 1;
      });
    });
  });
});
console.log(JSON.stringify(migStates, null, 2));

// Collect all enhanced items
const enhItems = [];
files.forEach(f => {
  const d = loadFile(f);
  ["ENHANCED_CASE_BASE","ENHANCED_CASE_BASE2","ENHANCED_CASE_BASE3","ENHANCED_CASE_BASE4","ENHANCED_CASE_BASE5"].forEach(k => {
    (d[k] || []).forEach(c => {
      (c.Items || []).forEach(it => enhItems.push(it));
    });
  });
});

// numeric with number vs string
const numStr = enhItems.filter(it => it.Type === "numeric" && typeof it.Correct === "string");
const numNum = enhItems.filter(it => it.Type === "numeric" && typeof it.Correct === "number");
console.log("\n=== Enhanced numeric Correct type ===");
console.log("numeric with string Correct: " + numStr.length + " (samples: " + numStr.slice(0,3).map(i => i.Correct).join(", ") + ")");
console.log("numeric with number Correct: " + numNum.length + " (samples: " + numNum.slice(0,3).map(i => i.Correct).join(", ") + ")");

// select Correct format  
const selStr = enhItems.filter(it => it.Type === "select" && typeof it.Correct === "string");
console.log("\nselect with string Correct: " + selStr.length + " (samples: " + selStr.slice(0,3).map(i => i.Correct.substring(0,30)).join(", ") + ")");

// match Correct format
const matchObj = enhItems.filter(it => it.Type === "match" && typeof it.Correct === "object" && it.Correct !== null);
console.log("\nmatch with object Correct: " + matchObj.length);
if (matchObj.length > 0) {
  console.log("  sample keys: " + Object.keys(matchObj[0].Correct).join(", "));
}

// Collect all migrated items
const migItems = [];
files.forEach(f => {
  const d = loadFile(f);
  ["MIGRATED_CASE_BASE_A","MIGRATED_CASE_BASE_B","MIGRATED_CASE_BASE_C","MIGRATED_CASE_BASE_D"].forEach(k => {
    (d[k] || []).forEach(c => {
      (c.Items || []).forEach(it => migItems.push(it));
    });
  });
});

const migNumStr = migItems.filter(it => it.Type === "numeric" && typeof it.Correct === "string");
const migNumNum = migItems.filter(it => it.Type === "numeric" && typeof it.Correct === "number");
console.log("\n=== Migrated numeric Correct type ===");
console.log("numeric with string Correct: " + migNumStr.length);
console.log("numeric with number Correct: " + migNumNum.length);

const migMatch = migItems.filter(it => it.Type === "match");
console.log("match items: " + migMatch.length + " Correct formats: " + [...new Set(migMatch.map(i => typeof i.Correct))]);
if (migMatch.length > 0) {
  console.log("  sample keys: " + (migMatch[0].Correct ? Object.keys(migMatch[0].Correct).join(", ") : "null"));
}

// Check for None/empty values in Correct
console.log("\n=== Items with empty/None Correct ===");
const emptyC = [...enhItems, ...migItems].filter(it => it.Correct === "" || it.Correct === "None" || it.Correct === "none");
console.log("Count: " + emptyC.length);
emptyC.slice(0,10).forEach(it => console.log("  Type=" + it.Type + " Correct=" + JSON.stringify(it.Correct) + " Prompt=" + (it.Prompt||"").substring(0,60)));

// Check migrated cases for Exhibits
console.log("\n=== Migrated Cases Exhibits Check ===");
const migExhibits = [];
files.forEach(f => {
  const d = loadFile(f);
  ["MIGRATED_CASE_BASE_A","MIGRATED_CASE_BASE_B","MIGRATED_CASE_BASE_C","MIGRATED_CASE_BASE_D"].forEach(k => {
    (d[k] || []).forEach(c => {
      const exh = c.Exhibits;
      migExhibits.push({ file: f, caseId: c.CaseID, exhibits: exh ? exh.length : "MISSING" });
    });
  });
});
const noExh = migExhibits.filter(e => e.exhibits === "MISSING" || e.exhibits === 0);
console.log("Migrated cases without Exhibits: " + noExh.length);
const withExh = migExhibits.filter(e => typeof e.exhibits === "number" && e.exhibits > 0);
console.log("Migrated cases with Exhibits: " + withExh.length);

// Case-level question_state distribution
console.log("\n=== Case-Level question_state ===");
const caseStates = {};
files.forEach(f => {
  const d = loadFile(f);
  Object.values(d).forEach(arr => {
    if (!arr || !Array.isArray(arr)) return;
    arr.forEach(c => {
      const s = c.question_state || "MISSING";
      caseStates[s] = (caseStates[s] || 0) + 1;
    });
  });
});
console.log(JSON.stringify(caseStates, null, 2));

// Enhanced DifficultyScore detailed
console.log("\n=== Enhanced DifficultyScore by file ===");
files.forEach(f => {
  const d = loadFile(f);
  const keys = ["ENHANCED_CASE_BASE","ENHANCED_CASE_BASE2","ENHANCED_CASE_BASE3","ENHANCED_CASE_BASE4","ENHANCED_CASE_BASE5"];
  keys.forEach(k => {
    if (!d[k]) return;
    const dist = {};
    d[k].forEach(c => {
      const ds = c.DifficultyScore !== undefined ? c.DifficultyScore : "MISSING";
      dist[ds] = (dist[ds] || 0) + 1;
    });
    console.log(f + " > " + k + ": " + JSON.stringify(dist));
  });
});

// Migrated DifficultyScore detailed
console.log("\n=== Migrated DifficultyScore by file ===");
files.forEach(f => {
  const d = loadFile(f);
  ["MIGRATED_CASE_BASE_A","MIGRATED_CASE_BASE_B","MIGRATED_CASE_BASE_C","MIGRATED_CASE_BASE_D"].forEach(k => {
    if (!d[k]) return;
    const dist = {};
    d[k].forEach(c => {
      const ds = c.DifficultyScore !== undefined ? c.DifficultyScore : "MISSING";
      dist[ds] = (dist[ds] || 0) + 1;
    });
    console.log(f + " > " + k + ": " + JSON.stringify(dist));
  });
});

console.log("\n=== DONE ===");
