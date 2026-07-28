const fs = require("fs");

let c = fs.readFileSync("scored_cases2.js", "utf8");

// Remove stray comma on line 5 (the `,\n` after the header)
c = c.replace(/^,\n/m, "");

// Add opening brace and CaseID for first case
const head = '  {\n    "CaseID": "CBQ2-B2",\n    "Title": ';
c = c.replace(/^\s*\d+:/m, head);

try {
  const m = eval(c);
  console.log("EVAL OK:", m.length, "cases");
  console.log("CaseIDs:", m.slice(0, 3).map((x) => x.CaseID).join(", "));
} catch (e) {
  console.log("EVAL FAIL:", e.message.substring(0, 300));
}
