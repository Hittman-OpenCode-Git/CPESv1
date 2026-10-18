// Read-only extraction for DL-066 hand-solve.
// Parses the P1 case packs, strips every item "Correct" field BEFORE output,
// so the solver never reads the stored answer key.
const fs = require('fs');

const packs = {
  'case_pack_1_corrected.js': 1,
  'case_pack_2_corrected.js': 2,
  'case_pack_3_corrected.js': 3,
};

const targets = [
  'CBQ-C2','CBQ-C3','CBQ-D2','CBQ-E1','CBQ-E2','CBQ2-F1','CBQ2-A3','CBQ3-A1',
  'CBQ4-A1','CBQ2-B2','CBQ3-B2','CBQ2-C3','CBQ3-C3','CBQ4-C1','CBQ4-E1','CBQ4-F1',
  'CBQ5-A2','CBQ5-B2','CBQ4-B1','CBQ4-B2','CBQ4-D3','CBQ4-E2','CBQ4-E3','CBQ5-E1',
  'CBQ5-E2','CBQ5-E3','CBQ4-F2','CBQ5-F2','CBQ3-A3','CBQ3-A4','CBQ3-C4'
];

function loadArray(path) {
  const src = fs.readFileSync(path, 'utf8');
  const eq = src.indexOf('=');
  const expr = src.slice(eq + 1).trim().replace(/;\s*$/, '');
  // eslint-disable-next-line no-new-func
  return new Function('return (' + expr + ')')();
}

const out = [];
for (const [file, bank] of Object.entries(packs)) {
  const arr = loadArray('content/cases/' + file);
  for (const c of arr) {
    if (!targets.includes(c.CaseID)) continue;
    const items = (c.Items || []).map(it => {
      const o = {};
      o.ItemID = it.ItemID;
      o.Type = it.Type;
      o.Prompt = it.Prompt;
      if (it.Choices) o.Choices = it.Choices;
      if (it.LeftItems) o.LeftItems = it.LeftItems;
      if (it.RightItems) o.RightItems = it.RightItems;
      if (it.Explanation) o.Explanation = it.Explanation;
      if (it.ExplanationWrongA) o.EW_A = it.ExplanationWrongA;
      if (it.ExplanationWrongB) o.EW_B = it.ExplanationWrongB;
      if (it.ExplanationWrongC) o.EW_C = it.ExplanationWrongC;
      if (it.ExplanationWrongD) o.EW_D = it.ExplanationWrongD;
      if (it.ExplanationWrongE) o.EW_E = it.ExplanationWrongE;
      return o;
    });
    out.push({
      bank,
      file,
      caseId: c.CaseID,
      title: c.Title,
      scenario: c.ScenarioText,
      exhibits: c.Exhibits || [],
      items,
    });
  }
}

fs.writeFileSync('scripts/output/dl066_case_extract.json', JSON.stringify(out, null, 2));
console.log('wrote', out.length, 'cases');
for (const c of out) console.log(c.caseId, 'bank', c.bank, 'items', c.items.length);
