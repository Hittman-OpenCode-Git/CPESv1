/**
 * Final recovery: Fixes all 5 scored_cases*.js files.
 *
 * Corruption patterns:
 *   Packs 2-5: NNNN: "Title value" → "Title": "Title value" (Title key lost)
 *   Pack 1:    NNNN: 'ScenarioText' → ScenarioText: 'value' (ScenarioText key lost)
 *   All: Array declaration deleted, extra `],` doubled bracket, first case missing `{` and CaseID
 */
const fs = require("fs");
const path = require("path");
const config = require("./config");

// First-case metadata for Pack 1 (Title, SectionTags, EstimatedMinutes were lost)
const PACK1_FIRST = {
  CaseID: "CBQ-A1",
  Title: "Revenue Recognition, Cash Flow, and Deferred Tax Review",
  SectionTags: ["A"],
  EstimatedMinutes: 30,
};

// First-case CaseID for each pack (CaseID was lost)
const FIRST_CASEID = {
  "scored_cases.js": "CBQ-A1",
  "scored_cases2.js": "CBQ2-B2",
  "scored_cases3.js": "CBQ3-B2",
  "scored_cases4.js": "CBQ4-B2",
  "scored_cases5.js": "CBQ5-B2",
};

// Array declaration name for each file
const DECL_NAME = {
  "scored_cases.js": "ENHANCED_CASE_BASE",
  "scored_cases2.js": "ENHANCED_CASE_BASE2",
  "scored_cases3.js": "ENHANCED_CASE_BASE3",
  "scored_cases4.js": "ENHANCED_CASE_BASE4",
  "scored_cases5.js": "ENHANCED_CASE_BASE5",
};

function fixFile(file) {
  const filePath = path.join(config.paths.root, file);
  if (!fs.existsSync(filePath)) {
    console.log(`${file}: NOT FOUND`);
    return false;
  }

  const isPack1 = file === "scored_cases.js";
  const isPack2plus = !isPack1;
  const content = fs.readFileSync(filePath, "utf8");
  const decl = DECL_NAME[file];
  const firstCID = FIRST_CASEID[file];

  let c = content;

  // -------------------------------------------------------
  // 1. Add missing array declaration after header comments
  //    The header is: 2 comment lines + blank lines
  //    Then data starts with `,\n   NNNN:`
  // -------------------------------------------------------
  c = c.replace(/^(\/\/.*\n\/\/.*\n\s*\n)\s*,?\n/m, (match, header) => {
    return header + `const ${decl} = [\n`;
  });

  // -------------------------------------------------------
  // 2. Remove the stray leading comma (leftover from corruption)
  // -------------------------------------------------------
  c = c.replace(/,\n(\s*\d+:)/, "\n$1");

  // -------------------------------------------------------
  // 3. Fix first case: add opening `{` and CaseID
  //    Pattern: after array declaration, first data line starts with spaces+digits+colon
  // -------------------------------------------------------
  if (isPack1) {
    // Pack 1 first case: need CaseID, Title, SectionTags, EstimatedMinutes, and fix ScenarioText
    // Current: `       1712: 'Northstar...'`
    // Need:    `  {\n    CaseID: 'CBQ-A1',\n    Title: 'Revenue...',\n    SectionTags: ['A'],\n    EstimatedMinutes: 30,\n    ScenarioText: 'Northstar...'`
    const pf = PACK1_FIRST;
    const firstCaseHead =
      `  {\n` +
      `    CaseID: '${pf.CaseID}',\n` +
      `    Title: '${pf.Title}',\n` +
      `    SectionTags: [${pf.SectionTags.map(t => `'${t}'`).join(", ")}],\n` +
      `    EstimatedMinutes: ${pf.EstimatedMinutes},\n` +
      `    ScenarioText: `;

    c = c.replace(/^(\s*\d+:\s*')([^']+)'/m, (match, prefix, value) => {
      return firstCaseHead + `'${value}'`;
    });
  } else {
    // Packs 2-5 first case: need `{` and CaseID, Title is already there (as numeric key)
    // Pattern: `\s*\d+: "Title value"`
    // Need:    `  {\n    "CaseID": "CBQ2-B2",\n    "Title": "Title value"`
    c = c.replace(/^(\s*)(\d+:)(\s*")([^"]+)"/m, (match, ws, num, quote, title) => {
      return "  {\n" + ws + `"CaseID": "${firstCID}",\n` + ws + `"Title": ${quote}${title}"`;
    });
  }

  // -------------------------------------------------------
  // 4. Fix remaining case data corruption
  // -------------------------------------------------------

  // Remove doubled `],` lines (extra closing bracket from fix script)
  // Pattern: `],\n      ],` → keep one `],`
  c = c.replace(/\n(\s*)\],\n\s*\],/g, "\n$1],");

  // Fix numeric keys for ALL cases
  if (isPack1) {
    // Pack 1: NNNN: 'value' → ScenarioText: 'value'
    c = c.replace(/\n(\s*)(\d+):\s*(')/g, "\n$1ScenarioText: $3");
  } else {
    // Packs 2-5: NNNN: "value" → "Title": "value"
    c = c.replace(/\n(\s*)(\d+):\s*(")/g, '\n$1"Title": $3');
  }

  // -------------------------------------------------------
  // 5. Verify the file parses
  // -------------------------------------------------------
  try {
    // Use a Function constructor to eval the module code
    const mod = { exports: {} };
    const fn = new Function("module", "exports", "require", c);
    fn(mod, mod.exports, require);
    const result = mod.exports;

    if (!Array.isArray(result)) {
      console.log(`${file}: PARSE ERROR - result is not an array (${typeof result})`);
      return false;
    }

    const caseIDs = result.map((x) => x.CaseID);
    const valid = caseIDs.filter(Boolean);

    console.log(`${file}: ${result.length} cases, ${valid.length} with CaseID`);
    console.log(`  IDs: ${caseIDs.join(", ")}`);

    // Write the fixed file
    fs.writeFileSync(filePath, c, "utf8");
    return true;
  } catch (e) {
    console.log(`${file}: PARSE FAILED: ${e.message.substring(0, 250)}`);

    // Save diagnostic
    const debugPath = filePath + ".debug";
    fs.writeFileSync(debugPath, c, "utf8");
    console.log(`  Debug saved to ${debugPath}`);

    return false;
  }
}

// Process all files
const banks = config.caseBanks;
let ok = true;
banks.forEach((f) => {
  if (!fixFile(f)) ok = false;
});

console.log(ok ? "\n=== ALL PARSED SUCCESSFULLY ===" : "\n=== ERRORS ENCOUNTERED ===");
