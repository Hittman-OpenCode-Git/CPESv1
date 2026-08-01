// S886 Agent G — Extract Evaluate templates and Understand→Analyze/Evaluate upgrade candidates
// Sections C/D only. READ-ONLY.

const fs = require("fs");
const path = require("path");

const PACKS = [
  { file: "content/packs/pack_a_corrected.js", varName: "MCQ_BANK_A", label: "Pack A" },
  { file: "content/packs/pack_b_corrected.js", varName: "MCQ_BANK_B", label: "Pack B" },
  { file: "content/packs/pack_c_corrected.js", varName: "MCQ_BANK_C", label: "Pack C" },
  { file: "content/packs/pack_d_corrected.js", varName: "MCQ_BANK_D", label: "Pack D" },
  { file: "content/packs/pack_e_corrected.js", varName: "MCQ_BANK_E", label: "Pack E" },
];

const BASE_DIR = "C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026";

function parsePack(filePath, varName) {
  let raw = fs.readFileSync(filePath, "utf8");
  // Strip BOM
  if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
  // Replace the variable declaration so Function constructor returns the array
  let code = raw.replace(/^(var|const)\s+MCQ_BANK_\w+\s*=\s*/, "return ");
  // Remove the trailing semicolon(s) if present
  code = code.replace(/;\s*$/, "");
  try {
    let fn = new Function(code);
    return fn();
  } catch (e) {
    console.error(`  ERROR parsing ${filePath}: ${e.message}`);
    return [];
  }
}

function checkDL008(item) {
  if (!item.CorrectChoice) return { hasDL008: false, slots: [] };
  let cc = item.CorrectChoice;
  let slotKey = "ExplanationWrong" + cc;
  let val = item[slotKey];
  if (val !== undefined && val !== null && val !== "") {
    return { hasDL008: true, slots: [cc], textPreview: val.substring(0, 80) };
  }
  return { hasDL008: false, slots: [] };
}

function main() {
  let allItems = [];
  for (let pack of PACKS) {
    let filePath = path.join(BASE_DIR, pack.file);
    console.error(`Parsing ${pack.label}...`);
    let items = parsePack(filePath, pack.varName);
    console.error(`  ${items.length} items loaded`);
    for (let item of items) {
      item._pack = pack.label;
      item._file = pack.file;
    }
    allItems = allItems.concat(items);
  }
  console.error(`Total items across all packs: ${allItems.length}\n`);

  // --- TASK 1: Find all Evaluate items in Sections C/D ---
  let evaluateItems = allItems.filter(
    (q) =>
      (q.Section === "C" || q.Section === "D") &&
      q.CognitiveLevel === "Evaluate"
  );
  console.error(`Evaluate items in Sections C/D: ${evaluateItems.length}`);

  // --- DL-008 check on Evaluate items ---
  let dl008EvaluateItems = [];
  for (let item of evaluateItems) {
    let dl = checkDL008(item);
    item._dl008 = dl;
    if (dl.hasDL008) {
      dl008EvaluateItems.push(item);
    }
  }
  console.error(
    `  DL-008 on Evaluate items: ${dl008EvaluateItems.length} / ${evaluateItems.length}`
  );

  // --- TASK 2: Candidate items for upgrade ---
  // Criteria: Section C or D, CognitiveLevel "Understand", stem > 150 chars, question_state "Certified"
  let candidateItems = allItems.filter(
    (q) =>
      (q.Section === "C" || q.Section === "D") &&
      q.CognitiveLevel === "Understand" &&
      q.question_state === "Certified" &&
      q.Stem &&
      q.Stem.length > 150
  );
  console.error(
    `Understand-level Certified candidates (stem > 150 chars) in Sections C/D: ${candidateItems.length}`
  );

  // Sort: Pack E first, then by stem length descending (longer stems = more complex = better upgrade candidate)
  candidateItems.sort((a, b) => {
    // Pack E priority
    let packOrder = { "Pack E": 0, "Pack A": 1, "Pack B": 2, "Pack C": 3, "Pack D": 4 };
    let pa = packOrder[a._pack] ?? 99;
    let pb = packOrder[b._pack] ?? 99;
    if (pa !== pb) return pa - pb;
    // Then by stem length descending
    return (b.Stem || "").length - (a.Stem || "").length;
  });

  let topCandidates = candidateItems.slice(0, 15);

  // --- Count Pack E Section D Understand items specifically ---
  let packESecDUnderstand = allItems.filter(
    (q) =>
      q._pack === "Pack E" &&
      q.Section === "D" &&
      q.CognitiveLevel === "Understand"
  );
  console.error(
    `Pack E Section D Understand items: ${packESecDUnderstand.length}`
  );

  // --- Build Output ---
  let output = {
    meta: {
      script: "S886 Agent G — Template Extraction",
      sections: "C/D only",
      total_items_all_packs: allItems.length,
      evaluate_items_found: evaluateItems.length,
      dl008_on_evaluate: dl008EvaluateItems.length,
      candidate_pool_size: candidateItems.length,
      pack_e_section_d_understand: packESecDUnderstand.length,
      candidates_returned: topCandidates.length,
    },
    evaluate_items: evaluateItems.map((q) => ({
      QID: q.QuestionID,
      Topic: q.Topic,
      Section: q.Section,
      pack: q._pack,
      Difficulty: q.Difficulty,
      DifficultyScore: q.DifficultyScore,
      question_state: q.question_state || "(none)",
      Stem_preview: (q.Stem || "").substring(0, 200),
      Stem_length: (q.Stem || "").length,
      Choices: q.Choices,
      CorrectChoice: q.CorrectChoice,
      ExplanationCorrect_preview: (q.ExplanationCorrect || "").substring(0, 250),
      DL008: q._dl008,
      // Why Evaluate: look for judgment language, recommendation, evaluation keywords
      evaluate_markers: extractEvaluateMarkers(q),
    })),
    upgrade_candidates: topCandidates.map((q) => ({
      QID: q.QuestionID,
      Topic: q.Topic,
      Section: q.Section,
      pack: q._pack,
      Difficulty: q.Difficulty,
      DifficultyScore: q.DifficultyScore,
      CognitiveLevel: q.CognitiveLevel,
      Stem_preview: (q.Stem || "").substring(0, 150),
      Stem_length: (q.Stem || "").length,
      CorrectChoice: q.CorrectChoice,
      Choices: q.Choices,
      // Why it's a good upgrade candidate
      upgrade_rationale: buildUpgradeRationale(q),
    })),
  };

  console.log(JSON.stringify(output, null, 2));
}

function extractEvaluateMarkers(q) {
  let stem = (q.Stem || "").toLowerCase();
  let ec = (q.ExplanationCorrect || "").toLowerCase();
  let markers = [];

  // Judgment/evaluation keywords
  let evalKw = [
    "should the company",
    "which recommendation",
    "evaluate",
    "assess",
    "which action",
    "best course",
    "most appropriate decision",
    "recommend",
    "justify",
    "which of the following would best",
    "which control",
    "which risk response",
    "would you recommend",
    "which is the best",
    "which policy",
    "most effective",
    "least effective",
    "most important",
    "which approach should",
    "what action should",
    "which response is most",
    "which statement best",
  ];
  for (let kw of evalKw) {
    if (stem.includes(kw)) {
      markers.push(`stem: "${kw}"`);
    }
  }
  if (markers.length === 0) {
    // Check EC for evaluation language
    let ecEval = ["judgment", "evaluate", "assessment", "recommendation", "professional judgment"];
    for (let kw of ecEval) {
      if (ec.includes(kw)) {
        markers.push(`explanation: "${kw}"`);
      }
    }
  }
  if (markers.length === 0) {
    // Broad evaluation signals: stem asks for decision, contains "should", "best", "appropriate" with context
    if (stem.includes("should") || stem.includes("best") || stem.includes("appropriate")) {
      if (stem.length > 200) {
        markers.push("long scenario with decision language");
      } else {
        markers.push("decision-oriented stem");
      }
    }
  }
  if (markers.length === 0) {
    markers.push("(no obvious evaluation markers detected)");
  }
  return markers;
}

function buildUpgradeRationale(q) {
  let reasons = [];
  let stem = q.Stem || "";
  let ec = q.ExplanationCorrect || "";

  reasons.push(`stem length: ${stem.length} chars`);

  // Does it already sound more like Analyze than Understand?
  let analyzeSignals = [
    "compare", "contrast", "difference between", "distinguish",
    "analyze", "interpret", "explain why", "which factor",
    "what is the effect", "impact on", "how does",
    "which of the following would result", "what would happen if",
    "calculate", "determine", "identify the",
  ];
  let matched = [];
  for (let s of analyzeSignals) {
    if (stem.toLowerCase().includes(s)) {
      matched.push(s);
    }
  }
  if (matched.length > 0) {
    reasons.push(`stem contains Analyze-level language: ${matched.join(", ")}`);
  }

  // Does EC mention application, analysis, or judgment?
  if (ec.length > 300) {
    reasons.push(`long explanation (${ec.length} chars) — suggests complex topic`);
  }

  // Is it a calculation item?
  if (q.CalculationItem) {
    reasons.push("calculation required — likely Apply or higher");
  }

  // Pack E bonus
  if (q._pack === "Pack E") {
    reasons.push("Pack E priority (100% Understand in Section D)");
  }

  // Section context
  if (q.Section === "C") {
    reasons.push("Section C (Performance Management) — natural fit for Analyze/Evaluate");
  } else if (q.Section === "D") {
    reasons.push("Section D (Cost Management) — natural fit for Analyze/Evaluate");
  }

  return reasons;
}

main();
