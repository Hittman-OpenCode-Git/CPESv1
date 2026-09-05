/**
 * Pre-existing defect remediation: object Choices → array Choices for 9 items
 * in 3 already-Certified cases (CBQ21-A2, CBQ21-C2, CBQ21-F1 Q3/Q4/Q5 each).
 *
 * These defects were discovered by the post-fix sanity check at the end of
 * the pack1 certification run. Same fix pattern as the Unprocessed remediation.
 *
 * Run: node scripts/fix_pack1_pre_existing_choices.js
 */
const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '..', 'p2', 'case_pack_p2_1.js');
const raw = fs.readFileSync(FILE, 'utf8');

const m = raw.match(/(?:var|let|const)\s+(casePackP2_\d+)\s*=\s*\[/);
const arrStart = raw.indexOf('[', m.index);
let depth=0, pos=arrStart, inString=false, stringChar='', escape=false;
do {
  const ch=raw[pos];
  if(escape){escape=false;pos++;continue;}
  if(inString){if(ch==='\\'){escape=true;pos++;continue;} if(ch===stringChar){inString=false;pos++;continue;} pos++;continue;}
  if(ch==='"'||ch==='\''){inString=true;stringChar=ch;pos++;continue;}
  if(ch==='[')depth++;
  if(ch===']')depth--;
  pos++;
} while(depth>0 && pos<raw.length);
const arrText = raw.slice(arrStart, pos);
const cases = JSON.parse(arrText);

function convertObjToArr(obj) {
  const keys = Object.keys(obj);
  const sortedKeys = keys.sort((a, b) => {
    if (a.length === 1 && b.length === 1) return a.charCodeAt(0) - b.charCodeAt(0);
    return a.localeCompare(b);
  });
  return sortedKeys.map(k => obj[k]);
}

const targetCertCases = new Set(['CBQ21-A2','CBQ21-C2','CBQ21-F1']);
let fixed = 0;
for (const c of cases) {
  if (!targetCertCases.has(c.CaseID)) continue;
  for (const it of c.Items || []) {
    if ((it.Type === 'select' || it.Type === 'multi') &&
        it.Choices && !Array.isArray(it.Choices) && typeof it.Choices === 'object') {
      const newChoices = convertObjToArr(it.Choices);
      console.log(`  ${c.CaseID} ${it.ItemID} (${it.Type}) — ${Object.keys(it.Choices).join(',')} → array[${newChoices.length}]`);
      it.Choices = newChoices;
      fixed++;
    }
  }
}

if (fixed === 0) {
  console.log('Nothing to fix.');
  process.exit(0);
}

// Re-serialise
function serializeCase(c, indent) {
  const nl = "\n";
  const pad = " ".repeat(indent);
  let s = "  {";
  for (const key of Object.keys(c)) {
    const val = c[key];
    if (key === "Items" || key === "Exhibits") {
      s += nl + pad + JSON.stringify(key) + ": [";
      for (let i = 0; i < val.length; i++) {
        s += nl + pad + "  " + JSON.stringify(val[i], null, 2).replace(/\n/g, nl + pad + "  ");
        s += i < val.length - 1 ? "," : "";
      }
      s += nl + pad + "]";
    } else {
      s += nl + pad + JSON.stringify(key) + ": " + JSON.stringify(val);
    }
    s += ",";
  }
  s = s.replace(/,$/, "");
  s += nl + "  }";
  return s;
}

let newArrayText = "[";
for (let i = 0; i < cases.length; i++) {
  newArrayText += "\n" + serializeCase(cases[i], 4);
  newArrayText += i < cases.length - 1 ? "," : "";
}
newArrayText += "\n]";

const before = raw.slice(0, arrStart);
const after = raw.slice(arrStart + arrText.length);
fs.writeFileSync(FILE, before + newArrayText + after, "utf8");
console.log(`Wrote ${FILE}: ${fs.statSync(FILE).size} bytes; fixed ${fixed} items.`);
