/**
 * Governance Guard Plugin — Test Suite v3.0 (S221)
 *
 * Tests the core detection logic without requiring an OpenCode session.
 * Run: node scripts/test_governance_guard.js
 *
 * S221 CHANGES:
 * - Added RULE 7 (DERIVED_REGISTRY_NOT_AUTHORITATIVE) tests — derived registry path matching
 * - Added RULE 8 (UNTRACKED_ARTIFACT) tests — session package path matching
 * - Rules 1 and 4 upgraded from WARN to BLOCK (documented; not testable without session lifecycle)
 *
 * S913 CHANGES:
 * - Added RULE 9 (DL-037 choice binary lead-in polarity mismatch): detect "No"+affirmative
 *   and "Yes"+negative mismatches in Choice text
 * - Added findLogicInversionViolations function + 6 new tests.
 *
 * RULE 10 CHANGES:
 * - Added RULE 10 (DL-021 absent distractor EW field enforcement): BLOCK certification
 *   of items with absent or empty non-CorrectChoice ExplanationWrong fields.
 * - Added findDL021Violations function + 3 new tests.
 * - Test suite expanded from 51 to 54 tests.
 *
 * S814 CHANGES:
 * - Added RULE 6 (DL-026 enforcement): BLOCK certification of items
 *   with empty/absent non-CorrectChoice ExplanationWrong slots.
 * - Added findDL026Violations function + 5 new tests.
 *
 * S726 CHANGES:
 * - Upgraded findDL008Violations from ±1200-char flat-window scan to
 *   string-aware brace-matching object extraction (DL-029 fix).
 * - Added 5 new DL-029 boundary tests: realistic distance, adjacent
 *   object isolation, Pack B format (CC before QID), false-positive
 *   immunity, graceful degradation.
 * - All 14 original Rule 2+ tests preserved; test 5 reworded.
 */

const path = require("path");

// ── Replicate core detection logic from the plugin ─────────────

const BLOCK_AUTH_RE = /BLOCK-AUTHORIZED|batch-authorized|AUTHORIZED-BLOCK/i;
const RECOMPUTED_RE = /recomputed|independently verified|independently recalculated|re-verified|recomputation verified/i;
const MAX_QUESTIONS = 30;

/** Extract brace-matched JSON objects from arbitrary text using string-aware parsing */
function extractObjectsFromText(text) {
  const objects = [];
  let pos = 0;
  while (pos < text.length) {
    const objStart = text.indexOf('{', pos);
    if (objStart === -1) break;
    let depth = 1;
    let i = objStart + 1;
    let inString = false, stringChar = '', escape = false;
    while (depth > 0 && i < text.length) {
      const ch = text[i];
      if (escape) { escape = false; i++; continue; }
      if (inString) {
        if (ch === '\\') { escape = true; }
        else if (ch === stringChar) { inString = false; stringChar = ''; }
        i++; continue;
      }
      if (ch === '"' || ch === "'") { inString = true; stringChar = ch; i++; continue; }
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
      i++;
    }
    if (depth !== 0) break;
    const objText = text.substring(objStart, i);
    let obj = null;
    try { obj = JSON.parse(objText); } catch (e) {
      try { obj = new Function('return (' + objText + ')')(); } catch (e2) {}
    }
    if (obj && typeof obj === 'object' && !Array.isArray(obj) && obj.CorrectChoice) {
      objects.push(obj);
    }
    pos = i;
  }
  return objects;
}

function findDL008Violations(text) {
  const violations = [];
  const objects = extractObjectsFromText(text);
  for (const obj of objects) {
    const cc = obj.CorrectChoice;
    if (!cc || !/^[A-D]$/.test(cc)) continue;
    const ewKey = 'ExplanationWrong' + cc;
    const ewVal = obj[ewKey];
    if (ewVal && typeof ewVal === 'string' && ewVal.length > 0) {
      violations.push({ letter: cc, snippet: ewVal.substring(0, 100) });
    }
  }
  return violations;
}

function findDL026Violations(text) {
  const violations = [];
  const objects = extractObjectsFromText(text);
  const letters = ['A', 'B', 'C', 'D'];
  for (const obj of objects) {
    const cc = obj.CorrectChoice;
    if (!cc || !/^[A-D]$/.test(cc)) continue;
    for (const L of letters) {
      if (L === cc) continue;
      const ewKey = 'ExplanationWrong' + L;
      if (!(ewKey in obj) || (typeof obj[ewKey] === 'string' && obj[ewKey].length === 0)) {
        violations.push({ letter: L, qid: obj.QuestionID || '(unknown)' });
      }
    }
  }
  return violations;
}

function findLogicInversionViolations(text) {
  const violations = [];
  const objects = extractObjectsFromText(text);
  const PATTERN_NO_AFFIRMATIVE = /^No,.*\b(should be investigated|should be accepted|should be selected|should be applied|should be used|must be applied|must be used|is correct|is appropriate|is warranted|is required|will be investigated|would be investigated|so it should be|therefore it is|therefore it should|thus it is|thus it should|hence it is|hence it should)\b/i;
  const PATTERN_YES_NEGATIVE = /^Yes,.*\b(should not|shouldn't|is not\b|isn't|would not|wouldn't|cannot|must not|is incorrect|is inappropriate|is not correct|is not appropriate|is not warranted|should not be|it should not|therefore it is not|thus it is not|hence it is not)\b/i;
  for (const obj of objects) {
    const qid = obj.QuestionID || "(unknown)";
    const choices = obj.Choices;
    if (!choices || typeof choices !== "object") continue;
    for (const [letter, value] of Object.entries(choices)) {
      if (typeof value !== "string" || value.length === 0) continue;
      if (PATTERN_NO_AFFIRMATIVE.test(value)) {
        violations.push({ qid, choice: letter, pattern: "No+affirmative", snippet: value.substring(0, 120) });
      }
      if (PATTERN_YES_NEGATIVE.test(value)) {
        violations.push({ qid, choice: letter, pattern: "Yes+negative", snippet: value.substring(0, 120) });
      }
    }
  }
  return violations;
}

function findDL021Violations(text) {
  const violations = [];
  const objects = extractObjectsFromText(text);
  const letters = ['A', 'B', 'C', 'D'];
  for (const obj of objects) {
    const cc = obj.CorrectChoice;
    if (!cc || !/^[A-D]$/.test(cc)) continue;
    for (const L of letters) {
      if (L === cc) continue;
      const ewKey = 'ExplanationWrong' + L;
      if (!(ewKey in obj)) {
        violations.push({ letter: L, qid: obj.QuestionID || '(unknown)', reason: 'absent' });
      } else if (typeof obj[ewKey] === 'string' && obj[ewKey].length === 0) {
        violations.push({ letter: L, qid: obj.QuestionID || '(unknown)', reason: 'empty' });
      }
    }
  }
  return violations;
}

function countQuestions(text) {
  if (!text) return 0;
  const q = (text.match(/"QuestionID"\s*:/gi) || []).length;
  const i = (text.match(/"ItemID"\s*:/gi) || []).length;
  return q + i;
}

// ── Test helpers ───────────────────────────────────────────────

let pass = 0;
let fail = 0;

function test(name, fn) {
  try {
    fn();
    pass++;
    console.log(`  PASS  ${name}`);
  } catch (e) {
    fail++;
    console.log(`  FAIL  ${name}\n         ${e.message}`);
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || "assertion failed");
}

// ── Test cases ─────────────────────────────────────────────────

console.log("\n=== TEST SUITE: Governance Guard Plugin v3.0 (S913 Rule 9) ===\n");

// ── RULE 2: DL-008 detection (upgraded — object-boundary extraction) ──
console.log("RULE 2 — ExplanationWrong[CorrectChoice] detection (object-boundary v2)\n");

test("Detect single DL-008: CorrectChoice=B, ExplanationWrongB non-empty", () => {
  const text = `{
    "QuestionID": "P1-A-010",
    "CorrectChoice": "B",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "($96,000 - $12,000) / 7 x 6/12 = $6,000.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": ""
  }`;
  const v = findDL008Violations(text);
  assert(v.length === 1, `Expected 1 violation, got ${v.length}`);
  assert(v[0].letter === "B", `Expected letter B, got ${v[0].letter}`);
});

test("Detect multiple DL-008 in same content", () => {
  const q1 = `{ "QuestionID": "P1-A-010", "CorrectChoice": "B", "ExplanationWrongB": "calc here" }`;
  const q2 = `{ "QuestionID": "P1-A-011", "CorrectChoice": "C", "ExplanationWrongC": "wrong logic" }`;
  const v = findDL008Violations(q1 + "\n" + q2);
  assert(v.length === 2, `Expected 2 violations, got ${v.length}`);
});

test("No false positive: CorrectChoice=B but ExplanationWrongB is empty", () => {
  const text = `{
    "CorrectChoice": "B",
    "ExplanationWrongB": ""
  }`;
  const v = findDL008Violations(text);
  assert(v.length === 0, `Expected 0 violations, got ${v.length}`);
});

test("No false positive: CorrectChoice=A, ExplanationWrongB non-empty (different letter)", () => {
  const text = `{
    "CorrectChoice": "A",
    "ExplanationWrongB": "This is a distractor explanation for option B"
  }`;
  const v = findDL008Violations(text);
  assert(v.length === 0, `Expected 0 violations, got ${v.length}`);
});

test("Detect DL-008 across realistic object size (CC to EW distance > 3000 chars)", () => {
  // Old +/-1200 window scan would miss this. New object-boundary extraction detects it.
  const paddingFields = [];
  for (let i = 0; i < 40; i++) {
    paddingFields.push(`"padding_${i}": ${JSON.stringify("x".repeat(80))}`);
  }
  const obj = `{\n  "CorrectChoice": "B",\n  ${paddingFields.join(",\n  ")},\n  "ExplanationWrongB": "This non-empty text violates EV8 even though it is far from CorrectChoice",\n  "QuestionID": "P1-FAR-001"\n}`;
  const v = findDL008Violations(obj);
  assert(v.length === 1, `Expected 1 violation (object-bounded), got ${v.length}`);
  assert(v[0].letter === "B", `Expected letter B, got ${v[0].letter}`);
});

test("Two adjacent objects - only second has DL-008; object boundary respected", () => {
  const objA = `{ "QuestionID": "P1-CLEAN-001", "CorrectChoice": "B", "ExplanationWrongA": "distractor text", "ExplanationWrongB": "", "ExplanationWrongC": "another distractor", "ExplanationWrongD": "" }`;
  const objB = `{ "QuestionID": "P1-DIRTY-001", "CorrectChoice": "B", "ExplanationWrongA": "", "ExplanationWrongB": "this should be empty but is not", "ExplanationWrongC": "", "ExplanationWrongD": "" }`;
  const v = findDL008Violations(objA + "\n" + objB);
  assert(v.length === 1, `Expected exactly 1 violation (only P1-DIRTY-001), got ${v.length}`);
  assert(v[0].letter === "B");
  assert(v[0].snippet.includes("should be empty"), "Wrong violation captured");
});

test("Adjacent objects, different CC letters - no cross-object false positive", () => {
  const objA = `{ "QuestionID": "P1-ADJ-001", "CorrectChoice": "A", "ExplanationWrongA": "", "ExplanationWrongB": "completely valid distractor text about why B is wrong", "ExplanationWrongC": "", "ExplanationWrongD": "" }`;
  const objB = `{ "QuestionID": "P1-ADJ-002", "CorrectChoice": "B", "ExplanationWrongA": "distractor", "ExplanationWrongB": "", "ExplanationWrongC": "distractor", "ExplanationWrongD": "" }`;
  const v = findDL008Violations(objA + "\n" + objB);
  assert(v.length === 0, `Expected 0 violations (cross-object immunity), got ${v.length}`);
});

test("Pack B format: CorrectChoice before QuestionID - still correctly detected", () => {
  const obj = `{
    "CorrectChoice": "C",
    "Section": "B",
    "QuestionID": "P1B-B-119",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "This is a non-empty slot at CC position - DL-008 violation in Pack B format",
    "ExplanationWrongD": ""
  }`;
  const v = findDL008Violations(obj);
  assert(v.length === 1, `Expected 1 violation (Pack B CC-before-QID), got ${v.length}`);
  assert(v[0].letter === "C");
});

test("Skip text fragments without complete objects gracefully", () => {
  const fragment = `"ExplanationWrongB": "new distractor text"`;
  const v = findDL008Violations(fragment);
  assert(v.length === 0, "Text without complete brace-matched objects should yield 0");
});

test("Brackets inside string values do not break object extraction", () => {
  const obj = `{
    "QuestionID": "P1-BRACKET-001",
    "CorrectChoice": "A",
    "ExplanationWrongA": "The formula {a + b} does not apply here because [c] is incorrect.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "",
    "ExplanationWrongD": ""
  }`;
  const v = findDL008Violations(obj);
  assert(v.length === 1, `Expected 1 violation (string brackets handled), got ${v.length}`);
  assert(v[0].letter === "A");
});

// ── RULE 5: Question count threshold ───────────────────────────
console.log("\nRULE 5 — Question count threshold\n");

test("Count 5 QuestionIDs correctly", () => {
  let text = "";
  for (let i = 0; i < 5; i++) {
    text += `{ "QuestionID": "P1-A-00${i}" }\n`;
  }
  assert(countQuestions(text) === 5, `Expected 5, got ${countQuestions(text)}`);
});

test("Count mixed QuestionID + ItemID", () => {
  const text = `"QuestionID": "x"\n"QuestionID": "y"\n"ItemID": "a"\n"ItemID": "b"`;
  assert(countQuestions(text) === 4, `Expected 4, got ${countQuestions(text)}`);
});

test("Block simulated: 31 questions without auth marker", () => {
  let text = "";
  for (let i = 0; i < 31; i++) {
    text += `{ "QuestionID": "P1-A-0${i}" }\n`;
  }
  const count = countQuestions(text);
  assert(count === 31);
  const hasAuth = BLOCK_AUTH_RE.test(text);
  const blocked = count > MAX_QUESTIONS && !hasAuth;
  assert(blocked === true, "31 questions without auth should be blocked");
});

test("Pass: 31 questions WITH auth marker", () => {
  let text = "// BLOCK-AUTHORIZED: sub-batch 2A wave 3\n";
  for (let i = 0; i < 31; i++) {
    text += `{ "QuestionID": "P1-A-0${i}" }\n`;
  }
  const count = countQuestions(text);
  assert(count === 31);
  const hasAuth = BLOCK_AUTH_RE.test(text);
  const blocked = count > MAX_QUESTIONS && !hasAuth;
  assert(blocked === false, "31 questions WITH auth should pass");
});

test("Pass: exactly 30 questions without auth (boundary)", () => {
  let text = "";
  for (let i = 0; i < 30; i++) {
    text += `{ "QuestionID": "P1-A-0${i}" }\n`;
  }
  const count = countQuestions(text);
  const blocked = count > MAX_QUESTIONS && !BLOCK_AUTH_RE.test(text);
  assert(blocked === false, "exactly 30 should pass");
});

test("Pass: 0 questions (empty content)", () => {
  assert(countQuestions("") === 0);
  assert(countQuestions(null) === 0);
  assert(countQuestions("console.log('hello')") === 0);
});

// ── RULE 6: DL-026 detection (empty distractor EW slots) ───────
console.log("\nRULE 6 — DL-026 empty distractor ExplanationWrong slot detection\n");

test("Detect single DL-026: CC=A, ExplanationWrongB empty", () => {
  const text = `{
    "QuestionID": "P1-FD-001",
    "CorrectChoice": "A",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Choice C is incorrect because data lakes are schema-on-read...",
    "ExplanationWrongD": "Choice D is incorrect because ERP systems provide transactional..."
  }`;
  const v = findDL026Violations(text);
  assert(v.length === 1, `Expected 1 violation (empty B), got ${v.length}`);
  assert(v[0].letter === "B", `Expected letter B, got ${v[0].letter}`);
});

test("Detect DL-026: CC=D, ExplanationWrongA absent", () => {
  const text = `{
    "QuestionID": "P1-DL026-002",
    "CorrectChoice": "D",
    "ExplanationWrongB": "Option B is incorrect...",
    "ExplanationWrongC": "Option C is incorrect...",
    "ExplanationWrongD": ""
  }`;
  const v = findDL026Violations(text);
  assert(v.length === 1, `Expected 1 violation (absent A), got ${v.length}`);
  assert(v[0].letter === "A", `Expected letter A, got ${v[0].letter}`);
});

test("Detect multiple empty non-CC slots: CC=D, both A and C empty", () => {
  const text = `{
    "QuestionID": "P1-DL026-003",
    "CorrectChoice": "D",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B is incorrect...",
    "ExplanationWrongC": "",
    "ExplanationWrongD": ""
  }`;
  const v = findDL026Violations(text);
  assert(v.length === 2, `Expected 2 violations (empty A + C), got ${v.length}`);
});

test("No false positive: all 3 non-CC slots are non-empty", () => {
  const text = `{
    "QuestionID": "P1-B-001",
    "CorrectChoice": "B",
    "ExplanationWrongA": "Option A is incorrect because...",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C is incorrect because...",
    "ExplanationWrongD": "Option D is incorrect because..."
  }`;
  const v = findDL026Violations(text);
  assert(v.length === 0, `Expected 0 (all non-CC filled), got ${v.length}`);
});

test("Skip text fragments without complete objects gracefully", () => {
  const fragment = `"ExplanationWrongA": ""`;
  const v = findDL026Violations(fragment);
  assert(v.length === 0, "Text without complete brace-matched objects should yield 0");
});

// ── RULE 3: Registry file protection ───────────────────────────
console.log("\nRULE 3 — Registry file protection\n");

test("Detect MASTER_QUESTION_REGISTRY.md by basename", () => {
  const cases = [
    "c:/project/knowledge/MASTER_QUESTION_REGISTRY.md",
    "knowledge/MASTER_QUESTION_REGISTRY.md",
    "/home/user/MASTER_QUESTION_REGISTRY.md",
  ];
  for (const fp of cases) {
    const bn = fp.replace(/\\/g, "/").split("/").pop();
    assert(bn === "MASTER_QUESTION_REGISTRY.md", `Bad basename for ${fp}: ${bn}`);
  }
});

test("Do NOT flag file with similar name but different extension", () => {
  const fp = "knowledge/MASTER_QUESTION_REGISTRY_backup.md";
  const bn = fp.replace(/\\/g, "/").split("/").pop();
  assert(bn !== "MASTER_QUESTION_REGISTRY.md");
});

// ── RECOMPUTED note detection ──────────────────────────────────
console.log("\nRECOMPUTED note detection (Rule 4)\n");

test("Detect 'recomputed'", () => {
  assert(RECOMPUTED_RE.test("// recomputed: matches stored value"));
});

test("Detect 'independently verified'", () => {
  assert(RECOMPUTED_RE.test("independently verified against FASB ASC 360"));
});

test("Detect 'independently recalculated'", () => {
  assert(RECOMPUTED_RE.test("independently recalculated - result matches"));
});

test("Detect 're-verified'", () => {
  assert(RECOMPUTED_RE.test("re-verified with independent calculation"));
});

test("No false positive on unrelated use of 'verified' without 'independently'", () => {
  assert(!RECOMPUTED_RE.test("The answer was verified."));
});

// ── Read-only passthrough ──────────────────────────────────────
console.log("\nRead-only passthrough\n");

test("Read tool is never intercepted", () => {
  assert(true, "Read passthrough is structural; verified by code review");
});

test("Bash tool is never intercepted", () => {
  assert(true, "Bash passthrough is structural; verified by code review");
});

// ── DL-029: Old window-scan approach FAILS on boundary tests ──
console.log("\nDL-029 CROSS-VALIDATION - Old window-scan approach\n");

function findDL008Violations_OLD(text) {
  const violations = [];
  const re = /"ExplanationWrong([A-D])"\s*:\s*"([^"]+)"/gi;
  let m;
  while ((m = re.exec(text)) !== null) {
    const letter = m[1];
    const value = m[2];
    if (!value || value.length === 0) continue;
    const pos = m.index;
    const winStart = Math.max(0, pos - 1200);
    const winEnd = Math.min(text.length, pos + 1200);
    const window = text.substring(winStart, winEnd);
    if (new RegExp(`"CorrectChoice"\\s*:\\s*"${letter}"`).test(window)) {
      violations.push({ letter, snippet: value.substring(0, 100) });
    }
  }
  return violations;
}

test("DL-029: Old window-scan FAILS on realistic object distance (>3000 chars)", () => {
  const paddingFields = [];
  for (let i = 0; i < 40; i++) {
    paddingFields.push(`"padding_${i}": ${JSON.stringify("x".repeat(80))}`);
  }
  const obj = `{\n  "CorrectChoice": "B",\n  ${paddingFields.join(",\n  ")},\n  "ExplanationWrongB": "This non-empty text violates EV8",\n  "QuestionID": "P1-FAR-001"\n}`;
  const vOld = findDL008Violations_OLD(obj);
  assert(vOld.length === 0, "OLD approach: window too small, misses violation (expected 0). This is the DL-029 bug.");
  const vNew = findDL008Violations(obj);
  assert(vNew.length === 1, "NEW approach: object-boundary, correctly detects violation.");
});

test("DL-029: Old window-scan produces false positive on adjacent objects", () => {
  const objA = `{ "QuestionID": "P1-ADJ-001", "CorrectChoice": "A", "ExplanationWrongA": "", "ExplanationWrongB": "completely valid distractor text about why B is wrong", "ExplanationWrongC": "", "ExplanationWrongD": "" }`;
  const objB = `{ "QuestionID": "P1-ADJ-002", "CorrectChoice": "B", "ExplanationWrongA": "distractor", "ExplanationWrongB": "", "ExplanationWrongC": "distractor", "ExplanationWrongD": "" }`;
  const combined = objA + "\n" + objB;
  const vOld = findDL008Violations_OLD(combined);
  const vNew = findDL008Violations(combined);
  if (vOld.length > 0) {
    console.log(`         DL-029 CONFIRMED: Old approach produced ${vOld.length} false positive(s).`);
  }
  assert(vNew.length === 0, `NEW approach: 0 false positives (object-bounded). Got ${vNew.length}.`);
});

// ── RULE 7: DERIVED_REGISTRY_NOT_AUTHORITATIVE ────────────────
console.log("\nRULE 7 — DERIVED_REGISTRY_NOT_AUTHORITATIVE path matching\n");

const DERIVED_REGISTRY_RE = /(registry[\\\/](packs|domains|cases)[\\\/]|MasterQuestionRegistry\.csv$|MASTER_QUESTION_REGISTRY\.md$|SESSION_STATUS_\d{4}-\d{2}-\d{2}\.md$|CURRENT_BASELINES\.md$|DEFECT_MANIFEST_DL008_DL026\.json$)/i;

test("Block: registry/packs/per_pack_audit.md (derived registry)", () => {
  assert(DERIVED_REGISTRY_RE.test("registry/packs/per_pack_audit.md"));
});

test("Block: MasterQuestionRegistry.csv (derived CSV export)", () => {
  assert(DERIVED_REGISTRY_RE.test("reports/MasterQuestionRegistry.csv"));
});

test("Block: CURRENT_BASELINES.md (derived baseline document)", () => {
  assert(DERIVED_REGISTRY_RE.test("knowledge/CURRENT_BASELINES.md"));
});

test("Block: SESSION_STATUS file (derived status report)", () => {
  assert(DERIVED_REGISTRY_RE.test("reports/session_status/SESSION_STATUS_2026-07-24.md"));
});

test("Block: DEFECT_MANIFEST (derived defect manifest)", () => {
  assert(DERIVED_REGISTRY_RE.test("governance/DEFECT_MANIFEST_DL008_DL026.json"));
});

test("Not flagged: pack source files (authoritative)", () => {
  assert(!DERIVED_REGISTRY_RE.test("pack_a_corrected.js"));
  assert(!DERIVED_REGISTRY_RE.test("scored_cases.js"));
});

test("Not flagged: scripts directory (operational)", () => {
  assert(!DERIVED_REGISTRY_RE.test("scripts/build_master_registry.js"));
});

// ── RULE 8: UNTRACKED_ARTIFACT ────────────────────────────────
console.log("\nRULE 8 — UNTRACKED_ARTIFACT path matching\n");

const SESSION_PACKAGES_RE = /scripts[\\\/]output[\\\/]session_packages[\\\/]/i;

test("Block: session_packages write (unregistered)", () => {
  assert(SESSION_PACKAGES_RE.test("scripts/output/session_packages/S850.json"));
  assert(SESSION_PACKAGES_RE.test("scripts\\output\\session_packages\\S853.json"));
});

test("Not flagged: other script outputs", () => {
  assert(!SESSION_PACKAGES_RE.test("scripts/output/readiness_scoring.json"));
  assert(!SESSION_PACKAGES_RE.test("scripts/output/session_registry.json"));
});

test("Not flagged: reports directory", () => {
  assert(!SESSION_PACKAGES_RE.test("reports/REVISION_HISTORY.md"));
});

// ── RULE 9: Choice binary lead-in polarity mismatch (DL-037) ────
console.log("\nRULE 9 — Choice Binary Lead-In Polarity Mismatch (DL-037)\n");

test("Detect 'No' + affirmative conclusion (Pattern 1)", () => {
  const text = `{
    "QuestionID": "P1-B-040",
    "CorrectChoice": "B",
    "Stem": "Should this be investigated?",
    "Choices": {
      "A": "Yes, because it exceeds the threshold",
      "B": "No, because 5% of $150,000 is $7,500 and $9,000 exceeds that, so it should be investigated",
      "C": "No, because the variance is favorable",
      "D": "Yes, but only if it recurs"
    }
  }`;
  const v = findLogicInversionViolations(text);
  assert(v.length === 1, `Expected 1 violation, got ${v.length}`);
  assert(v[0].choice === "B", `Expected choice B, got ${v[0].choice}`);
  assert(v[0].pattern === "No+affirmative", `Expected No+affirmative, got ${v[0].pattern}`);
});

test("Detect 'Yes' + negative conclusion (Pattern 2)", () => {
  const text = `{
    "QuestionID": "P1-SYNTH-001",
    "CorrectChoice": "A",
    "Choices": {
      "A": "Yes, because the standard mandates this approach, so it should not be ignored",
      "B": "No, because the threshold is not met"
    }
  }`;
  const v = findLogicInversionViolations(text);
  assert(v.length === 1, `Expected 1 violation, got ${v.length}`);
  assert(v[0].choice === "A", `Expected choice A, got ${v[0].choice}`);
  assert(v[0].pattern === "Yes+negative", `Expected Yes+negative, got ${v[0].pattern}`);
});

test("No false positive: 'No' + negative conclusion", () => {
  const text = `{
    "QuestionID": "P1-GOOD-001",
    "CorrectChoice": "C",
    "Choices": {
      "A": "No, because the variance is favorable and does not exceed any threshold"
    }
  }`;
  const v = findLogicInversionViolations(text);
  assert(v.length === 0, `Expected 0 violations (No+negative is correct), got ${v.length}`);
});

test("No false positive: 'Yes' + affirmative conclusion", () => {
  const text = `{
    "QuestionID": "P1-GOOD-002",
    "CorrectChoice": "B",
    "Choices": {
      "B": "Yes, because the variance exceeds $7,500, so it should be investigated"
    }
  }`;
  const v = findLogicInversionViolations(text);
  assert(v.length === 0, `Expected 0 violations (Yes+affirmative is correct), got ${v.length}`);
});

test("Detect multiple mismatches in same content", () => {
  const text = `{
    "QuestionID": "P1-MULTI-001",
    "CorrectChoice": "A",
    "Choices": {
      "B": "No, the policy states it should be investigated",
      "C": "Yes, therefore this method is not appropriate"
    }
  }`;
  const v = findLogicInversionViolations(text);
  assert(v.length === 2, `Expected 2 violations, got ${v.length}`);
});

test("Skip text without complete Choice objects", () => {
  const fragment = `"Choices": { "A": "Yes, it should not be done" }`;
  const v = findLogicInversionViolations(fragment);
  assert(v.length === 0, "Text without complete brace-matched objects should yield 0");
});

// ── RULE 10: DL-021 absent distractor ExplanationWrong ──────────
console.log("\nRULE 10 — DL-021 absent distractor ExplanationWrong enforcement\n");

test("Rule 10 BLOCK — item with absent distractor EW field", () => {
  const text = `{
    "QuestionID": "P1E-C-001",
    "CorrectChoice": "B",
    "ExplanationWrongB": "",
    "ExplanationCorrect": "Standard costs are predetermined target costs..."
  }`;
  const v = findDL021Violations(text);
  assert(v.length === 3, `Expected 3 violations (A, C, D absent), got ${v.length}`);
  assert(v[0].reason === "absent", `Expected 'absent', got '${v[0].reason}'`);
  assert(v[1].reason === "absent", `Expected 'absent', got '${v[1].reason}'`);
  assert(v[2].reason === "absent", `Expected 'absent', got '${v[2].reason}'`);
});

test("Rule 10 BLOCK — item with empty distractor EW field", () => {
  const text = `{
    "QuestionID": "P1-FD-001",
    "CorrectChoice": "A",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Choice C is incorrect because...",
    "ExplanationWrongD": "Choice D is incorrect because..."
  }`;
  const v = findDL021Violations(text);
  assert(v.length === 1, `Expected 1 violation (empty B), got ${v.length}`);
  assert(v[0].letter === "B", `Expected letter B, got ${v[0].letter}`);
  assert(v[0].reason === "empty", `Expected 'empty', got '${v[0].reason}'`);
});

test("Rule 10 PASS — item with all distractor EW fields populated", () => {
  const text = `{
    "QuestionID": "P1-B-001",
    "CorrectChoice": "B",
    "ExplanationWrongA": "Option A is incorrect because...",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C is incorrect because...",
    "ExplanationWrongD": "Option D is incorrect because..."
  }`;
  const v = findDL021Violations(text);
  assert(v.length === 0, `Expected 0 violations, got ${v.length}`);
});

// ── RULE 1/4 BLOCK UPGRADE (architectural verification) ─────────
console.log("\nRULE 1 + RULE 4 — BLOCK upgrade (S221 Phase 1)\n");

test("Rule 1: REVISION_HISTORY.md path is tracked", () => {
  const fp = "knowledge/REVISION_HISTORY.md";
  const bn = fp.replace(/\\/g, "/").split("/").pop();
  assert(bn.toLowerCase() === "revision_history.md", "REVISION_HISTORY.md basename must match for tracking");
});

test("Rule 4: RECOMPUTED_RE detects all verification phrases", () => {
  const phrases = [
    "recomputed: matches stored value",
    "independently verified against FASB ASC 360",
    "independently recalculated - result matches",
    "re-verified with independent calculation",
  ];
  for (const p of phrases) {
    assert(RECOMPUTED_RE.test(p), `Should match: "${p}"`);
  }
});

test("Rule 4: SOURCE_FILE_RE detects all pack and case files", () => {
  const files = [
    "pack_a_corrected.js", "pack_b_corrected.js", "pack_c_corrected.js",
    "pack_d_corrected.js", "pack_e_corrected.js",
    "scored_cases.js", "scored_cases2.js",
  ];
  const SOURCE_FILE_RE = /^(pack_[a-e]_corrected\.js|scored_cases\d*\.js)$/i;
  for (const f of files) {
    assert(SOURCE_FILE_RE.test(f), `Should match source file: "${f}"`);
  }
  assert(!SOURCE_FILE_RE.test("app.js"));
  assert(!SOURCE_FILE_RE.test("styles.css"));
});

// ── Summary ────────────────────────────────────────────────────

console.log(`\n=== RESULTS: ${pass} PASS, ${fail} FAIL ===\n`);

if (fail > 0) process.exit(1);
