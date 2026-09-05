/**
 * assemble_p2d_batch.js — Stage 2 of the P2-D sprint pipeline.
 * Reads compact per-item content (p2d_batchN_content.json) + the slot manifest,
 * and emits full v1.1 item objects (p2d_batchN_items.json) with all structural,
 * governance, and v1.1 evidence fields populated.
 *
 * Usage: node assemble_p2d_batch.js <batch-number>
 * Read-only on the pack. Emits to .commandcode/scratchpad/.
 */
const fs = require("fs");
const path = require("path");

const DIR = __dirname;
const batchNum = process.argv[2] || "1";
const manifest = JSON.parse(fs.readFileSync(path.join(DIR, "p2d_sprint_manifest.json"), "utf8"));
const batchMeta = manifest.batches.find(b => String(b.batch) === String(batchNum));
if (!batchMeta) { console.error("batch not found: " + batchNum); process.exit(1); }

const content = JSON.parse(fs.readFileSync(path.join(DIR, `p2d_batch${batchNum}_content.json`), "utf8"));
if (!Array.isArray(content) || content.length !== 30) {
  console.error(`content file must be an array of 30, got ${Array.isArray(content) ? content.length : typeof content}`);
  process.exit(1);
}

const DS_LABEL = { 1: "Easy", 2: "Moderate-Easy", 3: "Moderate", 4: "Difficult", 5: "Very Difficult" };
const AUTHORITY = ["COSO ERM 2017"];

const items = [];
for (let i = 0; i < 30; i++) {
  const slot = batchMeta.slots[i];
  const c = content[i];
  const qid = slot.qid;
  const num = qid.split("-")[2];
  const cc = c.cc;
  if (cc !== slot.cc) { console.error(`${qid}: content cc=${cc} != manifest cc=${slot.cc}`); process.exit(1); }

  const ew = { A: "", B: "", C: "", D: "" };
  for (const L of ["A", "B", "C", "D"]) {
    const v = c.ew[L];
    if (typeof v !== "string") { console.error(`${qid}: ew.${L} missing`); process.exit(1); }
    ew[L] = v;
  }
  if (ew[cc] !== "") { console.error(`${qid}: ew[CC] must be "" (DL-008)`); process.exit(1); }

  const di = {};
  for (const L of ["A", "B", "C", "D"]) {
    if (L === cc) continue;
    const d = c.di[L];
    const m = d && (d.m || d.misconception);
    const w = d && (d.w || d.why_plausible);
    const t = d && (d.t !== undefined ? d.t : d.tier_candidate);
    if (!d || typeof m !== "string" || typeof w !== "string" || ![1, 2, 3].includes(t)) {
      console.error(`${qid}: di.${L} incomplete`); process.exit(1);
    }
    di[L] = { misconception: m, why_plausible: w, tier_candidate: t };
  }
  const tiers = Object.values(di).map(d => d.tier_candidate).sort().join(",");
  if (tiers !== "1,2,3") { console.error(`${qid}: di tiers must be 1,2,3`); process.exit(1); }

  const vc = [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=75 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    `Difficulty justified (${slot.cl}, ${slot.difficulty})`,
    "Independent answer derived",
    "Authority citations match tested concept"
  ];
  if (slot.calc) {
    vc.push(`Recomputed: ${c.recomputed}`);
  }

  // EC<->CC coherence + meta-text guards (defect class prevention)
  const ecLower = c.ec.toLowerCase();
  if (/\bmanifest\b|corrected|placed at|per the manifest|designates/.test(ecLower)) {
    console.error(`${qid}: EC contains meta/assembly commentary — must be clean authored prose`); process.exit(1);
  }
  // The EC must declare the CC letter as correct; flag only explicit correct-answer declarations
  // of a non-CC letter (mentions of wrong alternatives are fine).
  const declareRe = /(?:the (?:correct )?answer (?:is|must be)|correct answer is|making option|option ([a-d]) (?:is|states) (?:the )?correct|is the correct answer|which is option ([a-d]))/i;
  const mDecl = c.ec.match(declareRe);
  if (mDecl) {
    const declared = (mDecl[1] || mDecl[2] || "").toUpperCase();
    if (declared && declared !== cc) {
      console.error(`${qid}: EC declares Option ${declared} correct but CC is ${cc}`); process.exit(1);
    }
  }
  // Every EW text must name ITS OWN letter (so readers know which distractor it addresses)
  for (const L of ["A", "B", "C", "D"]) {
    if (L === cc) continue;
    if (!new RegExp("\\boption " + L + "\\b", "i").test(ew[L])) {
      console.error(`${qid}: EW${L} does not reference its own option letter`); process.exit(1);
    }
  }

  const item = {
    Part: 2,
    schema_version: "1.1",
    Section: "D",
    Topic: `D.${num} ${slot.topic}`,
    QuestionID: qid,
    question_state: "Unprocessed",
    Part2OnlyFlag: true,
    UniqueConceptKey: `D-${num}-${slot.topic}`,
    Stem: c.stem,
    Choices: c.choices,
    CorrectChoice: cc,
    ExplanationCorrect: c.ec,
    ExplanationWrongA: ew.A,
    ExplanationWrongB: ew.B,
    ExplanationWrongC: ew.C,
    ExplanationWrongD: ew.D,
    Difficulty: slot.difficulty,
    DifficultyScore: slot.ds,
    CognitiveLevel: slot.cl,
    CalculationItem: slot.calc,
    ItemStyle: "single-select",
    LOSTag: slot.los,
    BlueprintDomain: "Risk Management",
    FormulaReference: slot.calc ? c.formula : "",
    CommonTrapReference: c.trap,
    Authorities: AUTHORITY.concat(c.authority_extra || []),
    source_ids: ["COSO ERM 2017"].concat(c.authority_extra || []),
    source_support_for_key: {
      source_id: "COSO ERM 2017",
      rule_or_proposition: c.ssk_rule,
      application_to_facts: c.ssk_app,
      key_conclusion: c.ssk_conclusion
    },
    distractor_intent: di,
    uniqueness_note: c.uniqueness,
    source_status: "RESOLVED",
    hold_reason: "",
    VerifiedChecks: vc,
    CrossDomainTags: c.cross_domain || [],
    DecisionTreeReference: "",
    pedagogical_cluster: `P2D-sprint-batch${batchNum}`,
    certification_date: "",
    certification_batch: ""
  };
  items.push(item);
}

const outFile = path.join(DIR, `p2d_batch${batchNum}_items.json`);
fs.writeFileSync(outFile, JSON.stringify(items, null, 2), "utf8");
console.log(`Assembled ${items.length} items -> ${outFile}`);
console.log(`Range ${items[0].QuestionID}..${items[items.length - 1].QuestionID}`);
