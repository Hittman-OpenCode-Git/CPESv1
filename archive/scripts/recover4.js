/**
 * Recovery v4: Fix all 5 scored_cases*.js files.
 *
 * Key fixes:
 * 1. Add missing `const ENHANCED_CASE_BASE... = [` after header
 * 2. Fix first case: add `{`, CaseID, and fix Title
 * 3. Fix numeric keys for ALL cases (replace NNNN: with proper field name)
 * 4. Remove doubled `],` (extra closing bracket from fix script)
 * 5. Remove unused stray comma removal that was corrupting data
 */
const fs = require("fs");
const path = require("path");
const config = require("./config");

const FIRST_CASEID = {
  "scored_cases.js": "CBQ-A1",
  "scored_cases2.js": "CBQ2-B2",
  "scored_cases3.js": "CBQ3-B2",
  "scored_cases4.js": "CBQ4-B2",
  "scored_cases5.js": "CBQ5-B2",
};

const DECL_NAME = {
  "scored_cases.js": "ENHANCED_CASE_BASE",
  "scored_cases2.js": "ENHANCED_CASE_BASE2",
  "scored_cases3.js": "ENHANCED_CASE_BASE3",
  "scored_cases4.js": "ENHANCED_CASE_BASE4",
  "scored_cases5.js": "ENHANCED_CASE_BASE5",
};

// Pack 1 first case: Title, SectionTags, EstimatedMinutes were all lost
const PACK1_FIRST = {
  Title: "Revenue Recognition, Cash Flow, and Deferred Tax Review",
  SectionTags: ["A"],
  EstimatedMinutes: 30,
};

function fixFile(file) {
  const filePath = path.join(config.paths.root, file);
  if (!fs.existsSync(filePath)) {
    console.log(`${file}: NOT FOUND`);
    return false;
  }

  const isPack1 = file === "scored_cases.js";
  const decl = DECL_NAME[file];
  const firstCID = FIRST_CASEID[file];
  const content = fs.readFileSync(filePath, "utf8");
  let c = content;

  // -------------------------------------------------------
  // 1. Add missing array declaration after header comments
  //    Also removes the stray `,\n` at line 5
  // -------------------------------------------------------
  c = c.replace(/^(\/\/.*\n\/\/.*\n\s*\n)\s*,?\n/m, (match, header) => {
    return header + `const ${decl} = [\n`;
  });

  // -------------------------------------------------------
  // 2. Fix first case: add `{` and CaseID
  //    - Packs 2-5: first numeric key is Title value
  //    - Pack 1: first numeric key is ScenarioText value (Title was lost)
  // -------------------------------------------------------
  if (isPack1) {
    // Pack 1: first case lost Title, SectionTags, EstimatedMinutes
    // Line: `    NNNN: 'ScenarioText value',`
    // Need: `  {\n    CaseID: '...',\n    Title: '...',\n    SectionTags: [...],\n    EstimatedMinutes: N,\n    ScenarioText: 'value'`
    const pf = PACK1_FIRST;
    const tagStr = pf.SectionTags.map((t) => "'" + t + "'").join(", ");
    const head =
      "  {\n" +
      "    CaseID: '" + firstCID + "',\n" +
      "    Title: '" + pf.Title + "',\n" +
      "    SectionTags: [" + tagStr + "],\n" +
      "    EstimatedMinutes: " + pf.EstimatedMinutes + ",\n" +
      "    ScenarioText: ";

    c = c.replace(/^(\s*)\d+:\s*'/m, head + "'");
  } else {
    // Packs 2-5: first numeric key is Title value
    // Line: `    NNNN: "Title value",`
    // Need: `  {\n    "CaseID": "...",\n    "Title": "Title value"`
    const titleRe = /^(\s*)\d+:\s*("[^"]+")/m;
    c = c.replace(titleRe, (match, ws, titleVal) => {
      return '  {\n' + ws + '"CaseID": "' + firstCID + '",\n' + ws + '"Title": ' + titleVal;
    });
  }

  // -------------------------------------------------------
  // 3. Fix numeric keys for remaining cases
  //    - Packs 2-5: NNNN: "Title" → "Title": "Title"
  //    - Pack 1: NNNN: 'ScenarioText' → ScenarioText: 'value'
  // -------------------------------------------------------
  if (isPack1) {
    c = c.replace(/\n(\s*)\d+:\s+'/g, "\n$1ScenarioText: '");
  } else {
    c = c.replace(/\n(\s*)\d+:\s+"/g, '\n$1"Title": "');
  }

  // -------------------------------------------------------
  // 4. Remove doubled `],` (extra closing bracket from fix script)
  //    Pattern: `\n      ],\n      ],` → `\n      ],`
  // -------------------------------------------------------
  c = c.replace(/\n(\s*)\],\n\s*\],/g, "\n$1],");

  // -------------------------------------------------------
  // 5. Add missing module.exports (deleted by previous recovery scripts)
  // -------------------------------------------------------
  if (!c.includes("module.exports")) {
    // Find the function definitions and add export before them
    const funcIdx = c.search(/\nfunction clone/);
    if (funcIdx > 0) {
      c = c.slice(0, funcIdx) + "\nmodule.exports = " + decl + ";\n" + c.slice(funcIdx);
    } else {
      // No functions found; add at end
      c = c.trimRight() + "\n\nmodule.exports = " + decl + ";\n";
    }
  }

  // -------------------------------------------------------
  // 6. Validate by requiring the file
  // -------------------------------------------------------
  // Write to a temp file for validation
  const tempPath = filePath + ".valid";
  fs.writeFileSync(tempPath, c, "utf8");

  try {
    delete require.cache[require.resolve(tempPath)];
    const cases = require(tempPath);
    fs.unlinkSync(tempPath);

    if (!Array.isArray(cases)) {
      console.log(`${file}: Not an array (${typeof cases})`);
      return false;
    }

    const withID = cases.filter((x) => x && x.CaseID);

    console.log(`${file}: ${cases.length} cases, ${withID.length} with CaseID`);
    console.log("  IDs: " + cases.map((x) => x.CaseID).join(", "));

    // Write to the actual file
    fs.writeFileSync(filePath, c, "utf8");
    return true;
  } catch (e) {
    console.log(`${file}: PARSE FAILED: ${e.message.substring(0, 300)}`);
    const debugPath = filePath + ".debug";
    fs.writeFileSync(debugPath, c, "utf8");
    console.log(`  Debug: ${debugPath}`);
    try { fs.unlinkSync(tempPath); } catch (_) {}
    return false;
  }
}

// Process all files
const banks = config.caseBanks;
let ok = true;
banks.forEach((f) => {
  if (!fixFile(f)) ok = false;
});

console.log(ok ? "\n=== ALL PARSED OK ===" : "\n=== ERRORS ===");
