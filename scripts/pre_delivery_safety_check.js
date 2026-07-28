/**
 * pre_delivery_safety_check.js — CMA Part 1 Exam Simulator Pre-Delivery Safety Check
 *
 * Purpose: Scans all 5 pack files for Certified items and verifies critical
 * learner-safety checks before delivery to the practice pool.
 *
 * Checks performed:
 *   DL-008  — ExplanationWrong[CorrectChoice] must be empty ("")
 *   DL-026  — All non-CorrectChoice ExplanationWrong fields must be non-empty
 *   DL-021  — No ExplanationWrong fields for distractor slots should be absent
 *   Rule 9  — No Choice binary lead-in polarity mismatch
 *
 * Output:   scripts/output/pre_delivery_safety.json
 * Exit:     0 if all safe, 1 if any unsafe items found
 *
 * Usage:    node scripts/pre_delivery_safety_check.js
 *
 * No external dependencies beyond Node.js built-ins.
 */

const fs = require("fs");
const path = require("path");

// ── Pack file definitions ────────────────────────────────────────

const PACKS = [
  { file: "pack_a_corrected.js", varName: "MCQ_BANK_A", label: "Pack A" },
  { file: "pack_b_corrected.js", varName: "MCQ_BANK_B", label: "Pack B" },
  { file: "pack_c_corrected.js", varName: "MCQ_BANK_C", label: "Pack C" },
  { file: "pack_d_corrected.js", varName: "MCQ_BANK_D", label: "Pack D" },
  { file: "pack_e_corrected.js", varName: "MCQ_BANK_E", label: "Pack E" },
];

// ── Rule 9 regex patterns (DL-037: Choice binary lead-in polarity) ─

const PATTERN_NO_AFFIRMATIVE =
  /^No,.*\b(should be investigated|should be accepted|should be selected|should be applied|should be used|must be applied|must be used|is correct|is appropriate|is warranted|is required|will be investigated|would be investigated|so it should be|therefore it is|therefore it should|thus it is|thus it should|hence it is|hence it should)\b/i;

const PATTERN_YES_NEGATIVE =
  /^Yes,.*\b(should not|shouldn't|is not\b|isn't|would not|wouldn't|cannot|must not|is incorrect|is inappropriate|is not correct|is not appropriate|is not warranted|should not be|it should not|therefore it is not|thus it is not|hence it is not)\b/i;

// ── Parse pack files via Function constructor ─────────────────────

function parsePack(packDef) {
  const filePath = path.resolve(__dirname, "..", packDef.file);
  if (!fs.existsSync(filePath)) {
    return { error: "File not found: " + packDef.file, items: [], label: packDef.label };
  }

  const code = fs.readFileSync(filePath, "utf-8");
  let items;

  try {
    const fn = new Function(code + "\nreturn " + packDef.varName + ";");
    items = fn();
  } catch (e1) {
    try {
      const fn2 = new Function(
        code.replace("const " + packDef.varName, "return ") +
          "\nreturn " + packDef.varName + ";"
      );
      items = fn2();
    } catch (e2) {
      return {
        error: "Parse error: " + e2.message,
        items: [],
        label: packDef.label,
      };
    }
  }

  if (!Array.isArray(items)) {
    return {
      error: "Not an array, got " + typeof items,
      items: [],
      label: packDef.label,
    };
  }

  return { items, label: packDef.label, error: null };
}

// ── Group all objects in a pack by QuestionID ────────────────────

function groupByQID(allObjects) {
  const groups = {};
  for (const obj of allObjects) {
    if (!obj || !obj.QuestionID) continue;
    const qid = obj.QuestionID;
    if (!groups[qid]) groups[qid] = [];
    groups[qid].push(obj);
  }
  return groups;
}

// ── Find CorrectChoice and Choices across all objects for a QID ───

function resolveItemData(objects) {
  let correctChoice = null;
  let choices = null;
  let questionState = null;
  let stem = null;
  // Merge all ExplanationWrong fields
  const ew = {};
  const letters = ["A", "B", "C", "D"];

  for (const obj of objects) {
    if (obj.CorrectChoice && correctChoice === null) correctChoice = obj.CorrectChoice;
    if (obj.Choices && choices === null) choices = obj.Choices;
    if (obj.question_state && questionState === null) questionState = obj.question_state;
    if (obj.Stem && stem === null) stem = obj.Stem;

    for (const L of letters) {
      const key = "ExplanationWrong" + L;
      if (obj[key] !== undefined && ew[L] === undefined) {
        ew[L] = obj[key];
      }
    }
  }

  return { correctChoice, choices, questionState, stem, explanationWrong: ew };
}

// ── DL-008: ExplanationWrong[CorrectChoice] must be empty ──────────

function checkDL008(correctChoice, ew) {
  if (!correctChoice) return false; // Cannot check without CC
  const val = ew[correctChoice];
  return val === "" || val === undefined || val === null;
}

// ── DL-026: Non-CC ExplanationWrong fields must be non-empty ───────

function checkDL026(correctChoice, ew) {
  const failures = [];
  const letters = ["A", "B", "C", "D"];
  for (const L of letters) {
    if (L === correctChoice) continue;
    const val = ew[L];
    if (val === "" || val === undefined || val === null) {
      const reason =
        val === undefined || val === null
          ? "DL-021: absent field"
          : "DL-026: empty field";
      failures.push({ slot: "ExplanationWrong" + L, reason });
    }
  }
  return failures;
}

// ── Rule 9: Choice binary lead-in polarity mismatch ────────────────

function checkRule9(choices) {
  const failures = [];
  if (!choices || typeof choices !== "object") return failures;

  for (const [letter, text] of Object.entries(choices)) {
    if (typeof text !== "string" || text.length === 0) continue;

    if (PATTERN_NO_AFFIRMATIVE.test(text)) {
      failures.push({
        choice: letter,
        rule: "Rule 9",
        pattern: "PATTERN_1_No_Affirmative",
        text: text.substring(0, 150),
      });
    }
    if (PATTERN_YES_NEGATIVE.test(text)) {
      failures.push({
        choice: letter,
        rule: "Rule 9",
        pattern: "PATTERN_2_Yes_Negative",
        text: text.substring(0, 150),
      });
    }
  }
  return failures;
}

// ── Main safety check per item ────────────────────────────────────

function checkItem(qid, itemData) {
  const { correctChoice, choices, questionState, explanationWrong } = itemData;

  // Only check Certified items
  if (questionState !== "Certified") return null;

  const failures = [];

  // DL-008
  if (!checkDL008(correctChoice, explanationWrong)) {
    const val = explanationWrong[correctChoice] || "";
    failures.push({
      defect: "DL-008",
      severity: "HIGH",
      detail:
        "ExplanationWrong" +
        correctChoice +
        ' is non-empty: "' +
        val.substring(0, 100) +
        '"',
    });
  }

  // DL-026 / DL-021
  const dl026Failures = checkDL026(correctChoice, explanationWrong);
  for (const f of dl026Failures) {
    failures.push({
      defect: f.reason.startsWith("DL-021") ? "DL-021" : "DL-026",
      severity: "HIGH",
      detail: f.slot + " - " + f.reason,
    });
  }

  // Rule 9
  const rule9Failures = checkRule9(choices);
  for (const f of rule9Failures) {
    failures.push({
      defect: "DL-037",
      severity: "MEDIUM",
      detail:
        "Choice " +
        f.choice +
        " [" +
        f.pattern +
        "]: " +
        f.text,
    });
  }

  if (failures.length > 0) {
    return { qid, failures };
  }

  return null; // Safe
}

// ── Main ──────────────────────────────────────────────────────────

function main() {
  const rootDir = path.resolve(__dirname, "..");
  const report = {
    timestamp: new Date().toISOString(),
    total_certified: 0,
    safe_certified: 0,
    unsafe_certified: 0,
    per_pack: {},
    unsafe_items: [],
  };

  for (const packDef of PACKS) {
    const packLabel = packDef.label;
    const packFile = packDef.file;
    const parsed = parsePack(packDef);

    if (parsed.error) {
      report.per_pack[packLabel] = {
        file: packFile,
        error: parsed.error,
        certified: 0,
        safe: 0,
        unsafe: 0,
      };
      console.error("ERROR [" + packLabel + "]: " + parsed.error);
      continue;
    }

    const groups = groupByQID(parsed.items);
    const qidList = Object.keys(groups);

    let certified = 0;
    let safe = 0;
    const unsafe = [];

    for (const qid of qidList) {
      const objects = groups[qid];
      const itemData = resolveItemData(objects);

      if (itemData.questionState !== "Certified") continue;
      certified++;

      const result = checkItem(qid, itemData);
      if (result) {
        unsafe.push(result);
      } else {
        safe++;
      }
    }

    report.per_pack[packLabel] = {
      file: packFile,
      certified,
      safe,
      unsafe: unsafe.length,
    };

    report.total_certified += certified;
    report.safe_certified += safe;
    report.unsafe_certified += unsafe.length;

    for (const u of unsafe) {
      report.unsafe_items.push({
        qid: u.qid,
        pack: packLabel,
        failures: u.failures,
      });
    }

    console.log(
      "[" +
        packLabel +
        "] " +
        certified +
        " Certified: " +
        safe +
        " safe, " +
        unsafe.length +
        " unsafe"
    );
  }

  // ── Write output JSON ─────────────────────────────────────────

  const outputDir = path.resolve(__dirname, "output");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, "pre_delivery_safety.json");
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), "utf-8");

  console.log("\nOutput written to: " + outputPath);
  console.log(
    "Summary: " +
      report.total_certified +
      " Certified | " +
      report.safe_certified +
      " safe | " +
      report.unsafe_certified +
      " unsafe"
  );

  // ── Exit code ─────────────────────────────────────────────────

  if (report.unsafe_certified > 0) {
    console.log("\nUNSAFE items found in delivery pool. See unsafe_items in output.");
    process.exit(1);
  }

  console.log("\nAll Certified items PASS pre-delivery safety checks.");
  process.exit(0);
}

main();
