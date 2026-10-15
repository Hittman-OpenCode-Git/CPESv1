// Independent hand-solve wave — masked extraction (CAQS §5.1).
// Prints ONLY scenario, exhibits, prompts, and choices for the target cases.
// Stored Correct/Explanation values are redacted by construction: output
// objects are built from a whitelist of keys, so a key cannot leak.
// Usage: node scripts/handsolve_wave_masked_extract.js
const path = require("path");
const CaseExtractor = require("./lib/CaseExtractor.js");

const BANKS = [
  "content/cases/case_pack_1_corrected.js",
  "content/cases/case_pack_2_corrected.js",
  "content/cases/case_pack_3_corrected.js",
];

const TARGET_CASES = new Set([
  "CBQ-C2", "CBQ-C3", "CBQ-D2", "CBQ-E1", "CBQ-E2",
  "CBQ2-A3", "CBQ4-A1", "CBQ4-C1", "CBQ5-A2", "CBQ5-B2",
  "CBQ4-B1", "CBQ5-E2", "CBQ3-C4", "CBQ3-A1", "CBQ3-B2",
  "CBQ3-A4", "CBQ4-B2",
]);

const out = [];
for (const bank of BANKS) {
  const r = CaseExtractor.extractFromContentDetailed(
    require("fs").readFileSync(path.resolve(__dirname, "..", bank), "utf8"),
    { strict: true }
  );
  if (!r.ok) { console.error(`FATAL: ${bank} failed: ${r.error}`); process.exit(1); }
  for (const c of r.cases) {
    if (!TARGET_CASES.has(c.CaseID)) continue;
    out.push({ _bank: bank, CaseID: c.CaseID, Title: c.Title, SectionTags: c.SectionTags, ScenarioText: c.ScenarioText });
    for (const e of c.Exhibits || []) {
      const ex = { ExhibitID: e.ExhibitID, Type: e.Type, Title: e.Title };
      if (e.Headers) ex.Headers = e.Headers;
      if (e.Rows) ex.Rows = e.Rows;
      if (e.Body) ex.Body = e.Body;
      out.push({ _exhibit: true, ...ex });
    }
    for (const it of c.Items || []) {
      const item = { _item: true, ItemID: it.ItemID, Type: it.Type };
      if (it.Topic) item.Topic = it.Topic;
      if (it.Prompt) item.Prompt = it.Prompt;
      if (it.Choices && Array.isArray(it.Choices) && it.Choices.length) item.Choices = it.Choices;
      if (it.LeftItems) item.LeftItems = it.LeftItems;
      if (it.RightItems) item.RightItems = it.RightItems;
      out.push(item);
    }
  }
}

const caseCount = out.filter(o => o.CaseID).length;
const itemCount = out.filter(o => o._item).length;
console.log(JSON.stringify(out, null, 1));
console.error(`\n# masked extract: ${caseCount} cases, ${itemCount} items from ${BANKS.length} banks`);
console.error("# stored Correct/Explanation redacted by key whitelist — solver input only");
