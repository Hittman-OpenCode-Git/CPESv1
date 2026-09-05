/**
 * Fix Pattern 1: object Choices → array Choices
 *
 * The 19 Unprocessed cases have `"Choices": { "A": "...", "B": "...", ... }`
 * for select/multi items, but the engine expects `"Choices": ["...", "...", ...]`.
 * This script converts in-place using Object.values() ordered by key insertion.
 *
 * Run: node scripts/fix_pack1_choices_to_array.js
 *
 * The script:
 *   1. Parses p2/case_pack_p2_1.js
 *   2. For each item in the 9 Unprocessed cases:
 *      - If Type is select/multi AND Choices is an object, convert to array
 *   3. Serializes back to the file with the same formatting style
 */

const fs = require("fs");
const path = require("path");

const FILE = path.resolve(__dirname, "..", "p2", "case_pack_p2_1.js");
const raw = fs.readFileSync(FILE, "utf8");

// String-aware parse
const varMatch = raw.match(/(?:var|let|const)\s+(casePackP2_\d+)\s*=\s*\[/);
const arrStart = raw.indexOf("[", varMatch.index);
let depth = 0, pos = arrStart, inString = false, stringChar = "", escape = false;
do {
  const ch = raw[pos];
  if (escape) { escape = false; pos++; continue; }
  if (inString) {
    if (ch === "\\") { escape = true; pos++; continue; }
    if (ch === stringChar) { inString = false; pos++; continue; }
    pos++; continue;
  }
  if (ch === '"' || ch === "'" || ch === "`") { inString = true; stringChar = ch; pos++; continue; }
  if (ch === "[") depth++;
  if (ch === "]") depth--;
  pos++;
} while (depth > 0 && pos < raw.length);

const arrText = raw.slice(arrStart, pos);
let cases;
try { cases = JSON.parse(arrText); }
catch (e1) {
  cases = new Function("return (" + arrText + ")")();
}

const unprocIds = new Set(cases.filter(c => c.question_state === "Unprocessed").map(c => c.CaseID));

let fixedCount = 0;
const fixedList = [];

function convertObjToArr(obj) {
  // Sort by key: A,B,C,D,E,F,G,H...; fall back to insertion order otherwise
  const keys = Object.keys(obj);
  const sortedKeys = keys.sort((a, b) => {
    if (a.length === 1 && b.length === 1) return a.charCodeAt(0) - b.charCodeAt(0);
    return a.localeCompare(b);
  });
  return sortedKeys.map(k => obj[k]);
}

for (const c of cases) {
  if (!unprocIds.has(c.CaseID)) continue;
  for (const it of c.Items || []) {
    if ((it.Type === "select" || it.Type === "multi") &&
        it.Choices && !Array.isArray(it.Choices) && typeof it.Choices === "object") {
      const newChoices = convertObjToArr(it.Choices);
      console.log(`  ${c.CaseID} ${it.ItemID} (${it.Type}) — object with ${Object.keys(it.Choices).join(",")} → array of ${newChoices.length}`);
      it.Choices = newChoices;
      fixedCount++;
      fixedList.push({ caseID: c.CaseID, itemID: it.ItemID });
    }
  }
}

if (fixedCount === 0) {
  console.log("No object-format Choices found. Nothing to fix.");
  process.exit(0);
}

console.log(`\nFixing ${fixedCount} items.\n`);

// Re-serialize the array back. To preserve readability, format each case with
// 2-space indent matching the original style.
function serializeCase(c, indent) {
  const nl = "\n";
  const pad = " ".repeat(indent);
  const pad2 = " ".repeat(indent + 2);
  let s = "  {";
  for (const key of Object.keys(c)) {
    const val = c[key];
    if (key === "Items") {
      s += nl + pad + '"Items": [';
      for (let i = 0; i < val.length; i++) {
        s += nl + pad + "  " + JSON.stringify(val[i], null, 2).replace(/\n/g, nl + pad + "  ");
        s += i < val.length - 1 ? "," : "";
      }
      s += nl + pad + "]";
    } else if (key === "Exhibits") {
      s += nl + pad + '"Exhibits": [';
      for (let i = 0; i < val.length; i++) {
        s += nl + pad + "  " + JSON.stringify(val[i], null, 2).replace(/\n/g, nl + pad + "  ");
        s += i < val.length - 1 ? "," : "";
      }
      s += nl + pad + "]";
    } else if (key === "LearningObjectives" || key === "BlueprintObjectives" ||
               key === "Tags" || key === "SectionTags") {
      s += nl + pad + JSON.stringify(key) + ": " + JSON.stringify(val);
    } else if (key === "RevisionHistory") {
      s += nl + pad + '"RevisionHistory": [';
      for (let i = 0; i < val.length; i++) {
        s += nl + pad + "  " + JSON.stringify(val[i]);
        s += i < val.length - 1 ? "," : "";
      }
      s += nl + pad + "]";
    } else if (key === "Dependencies") {
      s += nl + pad + '"Dependencies": ' + JSON.stringify(val);
    } else {
      s += nl + pad + JSON.stringify(key) + ": " + JSON.stringify(val);
    }
    s += ",";
  }
  s = s.replace(/,$/, "");  // strip trailing comma on last field
  s += nl + "  }";
  return s;
}

let newArrayText = "[";
for (let i = 0; i < cases.length; i++) {
  newArrayText += "\n" + serializeCase(cases[i], 4);
  newArrayText += i < cases.length - 1 ? "," : "";
}
newArrayText += "\n]";

// Splice the new array into the raw file at the same position
const before = raw.slice(0, arrStart);
const after = raw.slice(arrStart + arrText.length);
const newRaw = before + newArrayText + after;

fs.writeFileSync(FILE, newRaw, "utf8");

const newSize = fs.statSync(FILE).size;
console.log(`Wrote ${FILE}: ${newSize} bytes`);
console.log(`Fixed ${fixedCount} items.`);
