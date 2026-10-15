// Wave 2 — masked extraction for all unverified In Audit items (136 items, 31 cases).
// Same key-whitelist redaction as wave 1: stored Correct/Explanation cannot leak.
// Usage: node scripts/handsolve_wave2_masked_extract.js
const fs = require("fs");
const path = require("path");
const CaseExtractor = require("./lib/CaseExtractor.js");

const BANKS = [
  "content/cases/case_pack_1_corrected.js",
  "content/cases/case_pack_2_corrected.js",
  "content/cases/case_pack_3_corrected.js",
];

// Cases containing the 136 unverified In Audit items (all 31 DL-066 cases).
const TARGET_CASES = new Set([
  "CBQ-C2", "CBQ-C3", "CBQ-D2", "CBQ-E1", "CBQ-E2",
  "CBQ2-F1", "CBQ2-A3", "CBQ3-A1", "CBQ4-A1", "CBQ2-B2", "CBQ3-B2",
  "CBQ2-C3", "CBQ3-C3", "CBQ4-C1", "CBQ4-E1", "CBQ4-F1",
  "CBQ5-A2", "CBQ5-B2", "CBQ4-B1", "CBQ4-B2", "CBQ4-D3", "CBQ4-E2",
  "CBQ4-E3", "CBQ5-E1", "CBQ5-E2", "CBQ5-E3", "CBQ4-F2", "CBQ5-F2",
  "CBQ3-A3", "CBQ3-A4", "CBQ3-C4",
]);

// Wave-1 verified items — excluded from wave 2 (already independently solved 2026-10-14).
const WAVE1_VERIFIED = new Set([
  "CBQ-C2-Q1", "CBQ-C2-Q5", "CBQ-C3-Q1", "CBQ-D2-Q1", "CBQ-D2-Q5",
  "CBQ-E1-Q3", "CBQ-E1-Q4", "CBQ-E2-Q4", "CBQ2-A3-Q1", "CBQ2-A3-Q5",
  "CBQ3-A1-Q3", "CBQ3-B2-Q3", "CBQ4-A1-Q1", "CBQ4-C1-Q1", "CBQ4-C1-Q3",
  "CBQ5-A2-Q1", "CBQ5-A2-Q5", "CBQ5-B2-Q1", "CBQ5-B2-Q3", "CBQ5-B2-Q4",
  "CBQ4-B1-Q1", "CBQ5-E2-Q3", "CBQ3-C4-Q1", "CBQ3-C4-Q3", "CBQ3-A4-Q1",
  "CBQ4-B2-Q3", "CBQ4-B2-Q4",
]);

const out = [];
for (const bank of BANKS) {
  const r = CaseExtractor.extractFromContentDetailed(
    fs.readFileSync(path.resolve(__dirname, "..", bank), "utf8"),
    { strict: true }
  );
  if (!r.ok) { console.error(`FATAL: ${bank} failed: ${r.error}`); process.exit(1); }
  for (const c of r.cases) {
    if (!TARGET_CASES.has(c.CaseID)) continue;
    const inAudit = (c.Items || []).filter(it => it.question_state === "In Audit" && !WAVE1_VERIFIED.has(it.ItemID));
    if (!inAudit.length) continue;
    out.push({ _bank: bank, CaseID: c.CaseID, Title: c.Title, SectionTags: c.SectionTags, ScenarioText: c.ScenarioText });
    for (const e of c.Exhibits || []) {
      const ex = { _exhibit: true, ExhibitID: e.ExhibitID, Type: e.Type, Title: e.Title };
      if (e.Headers) ex.Headers = e.Headers;
      if (e.Rows) ex.Rows = e.Rows;
      if (e.Body) ex.Body = e.Body;
      out.push(ex);
    }
    for (const it of inAudit) {
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
if (caseCount !== 31 || itemCount !== 136) {
  console.error(`FATAL: expected 31 cases / 136 items, got ${caseCount}/${itemCount}`);
  process.exit(1);
}
fs.writeFileSync(path.resolve(__dirname, "output/handsolve_wave2_masked.json"), JSON.stringify(out, null, 1));
console.error(`# wave-2 masked extract: ${caseCount} cases, ${itemCount} items — written to scripts/output/handsolve_wave2_masked.json`);
console.error("# stored Correct/Explanation redacted by key whitelist — solver input only");
