/**
 * Fix Title corruption in all scored_cases*.js files.
 * The fix-missing-commas script replaced "Title": with NNNN: (byte offset).
 * This script restores "Title": before each Title value.
 */
const fs = require("fs");
const path = require("path");
const config = require("./config");

// First-case CaseIDs for each pack
const FIRST_CASE = {
  scored_cases: "CBQ-A1",
  scored_cases2: "CBQ2-B2",
  scored_cases3: "CBQ3-B2",
  scored_cases4: "CBQ4-B2",
  scored_cases5: "CBQ5-B2",
};

// Missing fields for Pack 1 first case (Title, SectionTags, EstimatedMinutes were lost)
const MISSING_PACK1_FIRST_CASE = {
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

  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  let c = content;

  const isPack1 = file === "scored_cases.js";
  const isPack2plus = !isPack1;

  // 1. Remove the stray `,` at line 5 (after header)
  //    Pattern: blank line then `,` then blank line
  c = c.replace(/^,\n/m, "");

  // 2. Fix Title corruption for ALL cases
  //    For Packs 2-5: `NNNN: "value"` → `"Title": "value"`
  //    For Pack 1: `NNNN: 'value'` → `Title: 'value'`
  //
  //    The pattern is: after `LearningObjectives: [...]` or after `],\n      ],`
  //    We need to find all `NNNN: "value"` that are NOT inside exhibit/item objects
  //
  //    Approach: find all lines matching `\s*\d+:\s*("|')` at the case level
  //    The pattern occurs on lines before "SectionTags" or "SectionTags":

  if (isPack2plus) {
    // Replace `NNNN: "value"` with `"Title": "value"` when followed by SectionTags
    // This pattern: `\n\s*\d+:\s*(".*"),\n\s*"SectionTags":`
    c = c.replace(/\n(\s*)\d+:\s*(".*"),\n(\s*)"SectionTags":/g, '\n$1"Title": $2,\n$3"SectionTags":');
  } else {
    // Pack 1 uses single quotes
    c = c.replace(/\n(\s*)\d+:\s*('.*'),\n(\s*)SectionTags:/g, '\n$1Title: $2,\n$3SectionTags:');
  }

  // 3. Remove doubled `],` (from the fix script adding `],` after an existing `]`)
  //    Pattern: `],\n      ],` → keep only one `],`
  //    But only at case level, not inside exhibit/item arrays
  c = c.replace(/\n(\s*)\],\n\s*\],/g, '\n$1],');

  // 4. Fix first case: add `{` and CaseID
  //    After the array opening `const ENHANCED_CASE_BASE... = [\n`
  //    Data starts with `\s*NNNN:`
  //    We need: `{ \n    CaseID: '...', \n    Title: '...' or "Title": "..."
  //    But we also need Title if it was lost (Pack 1)
  //    The fix in step 2 already handles the Title numeric key

  // For Pack 1: first line data starts with the numeric key (Title was lost, so it's actually ScenarioText)
  // After step 2's fix, Pack 1's numeric key would have become `Title:` but the value is wrong (it's ScenarioText)
  // So we need a special fix for Pack 1 first case

  // Actually, let's just rebuild the first case header for all files:
  
  const baseName = file.replace(".js", "");
  const firstCaseID = FIRST_CASE[baseName];

  if (isPack1) {
    // Pack 1: first case has ScenarioText where Title should be
    // After step 2: `Title: 'Northstar...',` - wrong value!
    // Fix: replace the wrong Title with correct fields
    const missing = MISSING_PACK1_FIRST_CASE;
    const fixTitle = `Title: '${missing.Title}',\n    SectionTags: [${missing.SectionTags.map(t => `'${t}'`).join(", ")}],\n    EstimatedMinutes: ${missing.EstimatedMinutes},\n    ScenarioText: '`;

    // Current line after step 2: `    Title: 'Northstar...',`
    // We need: `CaseID: 'CBQ-A1',\n    Title: 'Revenue...',\n    SectionTags: [...],\n    EstimatedMinutes: 30,\n    ScenarioText: 'Northstar...',`
    c = c.replace(
      /CaseID: '[^']+',?\n\s*Title: '([^']*)'/,
      (match, scenarioText) => {
        return `CaseID: '${firstCaseID}',\n    ${fixTitle}${scenarioText}'`;
      }
    );

    // If the above doesn't match (no CaseID in first case), try the raw data start
    c = c.replace(
      /(\n\s*)Title: 'Northstar/m,
      (match, ws) => {
        return `${ws}CaseID: '${firstCaseID}',\n${ws}Title: '${missing.Title}',\n${ws}SectionTags: [${missing.SectionTags.map(t => `'${t}'`).join(", ")}],\n${ws}EstimatedMinutes: ${missing.EstimatedMinutes},\n${ws}ScenarioText: 'Northstar`;
      }
    );

    // Also add opening {
    c = c.replace(
      /(const ENHANCED_CASE_BASE = \[\n)\s*CaseID:/,
      '$1  {\n    CaseID:'
    );
  } else {
    // Packs 2-5: Add opening { and CaseID before Title
    c = c.replace(
      /(const ENHANCED_CASE_BASE\d* = \[\n)/,
      (match) => {
        return match + '  {\n    "CaseID": "' + firstCaseID + '",\n    ';
      }
    );

    // But if the file already has "CaseID" for the first case (it might after step 2),
    // we need to ensure we don't double-add
  }

  // 5. Verify the result parses
  let result;
  try {
    result = eval(c);
  } catch (e) {
    console.log(`${file}: PARSE FAILED: ${e.message.substring(0, 200)}`);
    // Save diagnostic output
    fs.writeFileSync(filePath + ".debug", c, "utf8");
    return false;
  }

  // 6. Write the fixed file
  fs.writeFileSync(filePath, c, "utf8");
  console.log(`${file}: ${result.length} cases, ${result.filter(x => x.CaseID).length} with CaseID`);
  if (result.length > 0) {
    console.log(`  First: ${result[0].CaseID}, Last: ${result[result.length - 1].CaseID}`);
  }

  return true;
}

// Process all files
const banks = config.caseBanks;
let ok = true;
banks.forEach((f) => {
  if (!fixFile(f)) ok = false;
});

console.log(ok ? "\n=== ALL PARSED OK ===" : "\n=== ERRORS ===");
