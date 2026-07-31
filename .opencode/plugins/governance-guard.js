/**
 * Governance Guard Plugin — CMA Part 1 Exam Simulator
 *
 * Enforces governance rules at tool-execution level.
 * Rules 1-11 are all BLOCK level (S221 upgrade — Phase 1 execution).
 *
 * Depends on: CAQS_v1.0.md, DEFECT_LIBRARY.md (DL-008, DL-026, DL-037, DL-021)
 *
 * RULE 1  (BLOCK) — question_state changes must pair with REVISION_HISTORY.md updates
 * RULE 2  (BLOCK) — ExplanationWrong[CorrectChoice] must be "" (DL-008 enforcement)
 * RULE 3  (BLOCK) — MASTER_QUESTION_REGISTRY.md is generated, never edited
 * RULE 4  (BLOCK) — answer-key changes must include recomputed verification note
 * RULE 5  (BLOCK) — ≤30 question objects per change-set without block-authorization
 * RULE 6  (BLOCK) — non-CorrectChoice ExplanationWrong slots must be non-empty (DL-026 enforcement)
 * RULE 7  (BLOCK) — DERIVED_REGISTRY_NOT_AUTHORITATIVE (no hand-editing derived registries)
 * RULE 8  (BLOCK) — UNTRACKED_ARTIFACT (session packages must be registered)
 * RULE 9  (BLOCK) — Choice binary lead-in polarity mismatch (DL-037 enforcement)
 * RULE 10 (BLOCK) — non-CorrectChoice ExplanationWrong slots must be present and non-empty (DL-021 enforcement)
 * RULE 11 (BLOCK) — Cognitive classification gates (AF-3/4/5) — S109P
 */

const BLOCK_AUTH_RE = /BLOCK-AUTHORIZED|batch-authorized|AUTHORIZED-BLOCK/i;
const RECOMPUTED_RE = /recomputed|independently verified|independently recalculated|re-verified|recomputation verified/i;
const MAX_QUESTIONS = 30;

const SOURCE_FILE_RE = /^(pack_[a-e]_corrected\.js|scored_cases\d*\.js)$/i;

// RULE 7: Derived registry paths — must NOT be hand-edited
const DERIVED_REGISTRY_RE = /(registry[\\\/](packs|domains|cases)[\\\/]|MasterQuestionRegistry\.csv$|MASTER_QUESTION_REGISTRY\.md$|SESSION_STATUS_\d{4}-\d{2}-\d{2}\.md$|CURRENT_BASELINES\.md$|DEFECT_MANIFEST_DL008_DL026\.json$)/i;

// RULE 7: Regeneration scripts that are WHITELISTED to write to derived registries
const REGENERATION_SCRIPT_RE = /(build_master_registry|regenerate|rebuild|regen)_/i;

// RULE 8: Output paths that require session registry entries
const SESSION_PACKAGES_RE = /scripts[\\\/]output[\\\/]session_packages[\\\/]/i;

export const GovernanceGuard = async ({ client }) => {

  // ── Per-session state ────────────────────────────────────────
  const sessions = new Map();

  const getState = (id) => {
    const key = String(id ?? "default");
    if (!sessions.has(key)) {
      sessions.set(key, {
        qsChanges: { files: new Set(), count: 0 },
        revHistTouched: false,
        answerKeyFiles: new Set(),
        recomputedSeen: false,
      });
    }
    return sessions.get(key);
  };

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

  /** Return array of { letter, snippet } for any DL-008 violations in text */
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

  /** Return array of { letter } for any DL-026 violations (empty non-CC EW slots) */
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

  /** Return array of { qid, choice, pattern, snippet } for choice binary lead-in mismatches */
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

  /** Return array of { letter, qid, reason } for DL-021 violations (absent/empty non-CC EW fields) */
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

  /** Return array of { qid, cog, gate, reason, actual } for cognitive classification violations */
  function findCognitiveViolations(text) {
    const violations = [];
    const objects = extractObjectsFromText(text);
    for (const obj of objects) {
      const cog = obj.CognitiveLevel;
      if (!cog || !/^(Analyze|Evaluate)$/.test(cog)) continue;

      const qid = obj.QuestionID || '(unknown)';
      const stem = obj.Stem || '';
      const ec = obj.ExplanationCorrect || '';
      const diff = obj.DifficultyScore;

      // GATE 3 (AF-3) — Deterministic Rule Application → BLOCK
      const hasRuleRef = /Under (ASC|IFRS|COSO|GAAP|IAS)/i.test(stem);
      const hasTradeOff = /competing|best option|weigh|trade.off|balance/i.test(ec);
      if (hasRuleRef && !hasTradeOff) {
        violations.push({ qid, cog, gate: 'AF-3', reason: 'Deterministic rule application without trade-off language', actual: 'Apply' });
      }

      // GATE 4 (AF-4) — Taxonomy Classification → BLOCK
      if (/what type of|which (COSO|component|category|cost)|classified as/i.test(stem)) {
        violations.push({ qid, cog, gate: 'AF-4', reason: 'Taxonomy/classification question', actual: 'Apply' });
      }

      // GATE 5 (AF-5) — Difficulty-Cognitive Mismatch → BLOCK
      if (cog === 'Evaluate' && diff !== undefined && diff <= 2) {
        violations.push({ qid, cog, gate: 'AF-5', reason: `Evaluate requires DifficultyScore >= 3 (got ${diff})`, actual: cog === 'Evaluate' ? 'Analyze' : 'Apply' });
      }
      if (cog === 'Analyze' && diff !== undefined && diff == 1) {
        violations.push({ qid, cog, gate: 'AF-5', reason: `Analyze requires DifficultyScore >= 2 (got ${diff})`, actual: 'Apply' });
      }
    }
    return violations;
  }

  /** Count QuestionID + ItemID markers in text */
  function countQuestions(text) {
    if (!text) return 0;
    const q = (text.match(/"QuestionID"\s*:/gi) || []).length;
    const i = (text.match(/"ItemID"\s*:/gi) || []).length;
    return q + i;
  }

  /** Extract basename regardless of platform */
  function basename(filePath) {
    const normalised = String(filePath || "").replace(/\\/g, "/");
    const parts = normalised.split("/");
    return parts[parts.length - 1] || "";
  }

  // ── Hooks ────────────────────────────────────────────────────

  return {
    "tool.execute.before": async (input, output) => {
      const tool = input?.tool;
      if (tool !== "edit" && tool !== "write") return;

      const args = output?.args || {};
      const filePath = args.filePath || "";
      const sessionID = String(input?.sessionID || "default");
      const state = getState(sessionID);

      const newContent = tool === "write"
        ? (args.content || "")
        : (args.newString || "");
      const oldContent = tool === "edit"
        ? (args.oldString || "")
        : "";

      // Content scope for Rule 5: total scope of the change-set
      const scopeContent = tool === "write"
        ? args.content || ""
        : `${oldContent}\n${newContent}`;

      // ── RULE 3: BLOCK MASTER_QUESTION_REGISTRY.md writes ─────
      if (basename(filePath) === "MASTER_QUESTION_REGISTRY.md") {
        throw new Error(
          "GOVERNANCE RULE 3 — BLOCKED\n" +
          "MASTER_QUESTION_REGISTRY.md is generated by scripts/build_master_registry.js.\n" +
          "It must never be hand-edited. Re-run:  npm run build-registry\n" +
          "Source data lives in pack_*_corrected.js and scored_cases*.js."
        );
      }

      // ── RULE 7: BLOCK DERIVED_REGISTRY_NOT_AUTHORITATIVE ─────
      const fileBase = basename(filePath);
      if (DERIVED_REGISTRY_RE.test(filePath) && !REGENERATION_SCRIPT_RE.test(newContent) && !REGENERATION_SCRIPT_RE.test(oldContent)) {
        throw new Error(
          `GOVERNANCE RULE 7 — BLOCKED (DERIVED_REGISTRY_NOT_AUTHORITATIVE)\n` +
          `File: ${fileBase}\n` +
          "This file is a DERIVED registry. It must never be hand-edited.\n" +
          "Derived registries are regenerated from authoritative sources:\n" +
          "  - Raw pack files (pack_*_corrected.js, scored_cases*.js)\n" +
          "  - session_registry.json\n" +
          "  - investigation_registry.json\n" +
          "To regenerate: run the appropriate build/regeneration script.\n" +
          "To authorize a regeneration, include 'regenerate' or 'rebuild' in the content."
        );
      }

      // ── RULE 8: BLOCK UNTRACKED_ARTIFACT ────────────────────
      if (SESSION_PACKAGES_RE.test(filePath)) {
        const sessionID = String(input?.sessionID || "default");
        throw new Error(
          `GOVERNANCE RULE 8 — BLOCKED (UNTRACKED_ARTIFACT)\n` +
          `File: ${fileBase}\n` +
          "Session packages must be registered in session_registry.json before writing.\n" +
          "Registration is MANDATORY — every session package needs a registry entry.\n" +
          "Run: node scripts/register_session.js <session-id> <description> first.\n" +
          `Current session: ${sessionID}`
        );
      }

      // ── RULE 2: BLOCK DL-008 re-contamination ─────────────────
      // Object-boundary extraction: scan only newContent to avoid
      // false positives from oldContent that is being removed.
      const checkText = newContent;
      const dl008 = findDL008Violations(checkText);
      if (dl008.length > 0) {
        const lines = dl008
          .map(v => `  ExplanationWrong${v.letter}: "${v.snippet}..."`)
          .join("\n");
        throw new Error(
          `GOVERNANCE RULE 2 — BLOCKED (DL-008 re-contamination)\n` +
          `${dl008.length} ExplanationWrong slot(s) match CorrectChoice with non-empty content:\n` +
          `${lines}\n\n` +
          "Per EV8 (CAQS_v1.0.md §4.4): the ExplanationWrong slot that matches\n" +
          "CorrectChoice must be \"\" (empty). Move content to ExplanationCorrect\n" +
          "or to a distractor ExplanationWrong slot."
        );
      }

      // ── RULE 6: BLOCK DL-026 (empty distractor EW slots) ──────
      const dl026 = findDL026Violations(checkText);
      if (dl026.length > 0) {
        const lines = dl026
          .map(v => `  ExplanationWrong${v.letter} is empty/absent on ${v.qid}`)
          .join("\n");
        throw new Error(
          `GOVERNANCE RULE 6 — BLOCKED (DL-026 empty distractor slot)\n` +
          `${dl026.length} non-CorrectChoice ExplanationWrong slot(s) are empty or absent:\n` +
          `${lines}\n\n` +
          "Per CAQS_v1.0.md §4.4: every distractor ExplanationWrong slot\n" +
          "(the 3 slots NOT matching CorrectChoice) must contain choice-specific\n" +
          "explanatory text. Empty/missing distractor slots deprive learners of\n" +
          "educational feedback on incorrect selections."
        );
      }

      // ── RULE 9: BLOCK choice binary lead-in polarity mismatch ──
      const logicInversions = findLogicInversionViolations(checkText);
      if (logicInversions.length > 0) {
        const lines = logicInversions
          .map(v => `  ${v.qid} Choice ${v.choice}: "${v.snippet}..." (${v.pattern})`)
          .join("\n");
        throw new Error(
          `GOVERNANCE RULE 9 — BLOCKED (DL-037 choice binary lead-in polarity mismatch)\n` +
          `${logicInversions.length} choice(s) have mismatched binary lead-in vs conclusion:\n` +
          `${lines}\n\n` +
          "Per DL-037: a choice starting with \"No\" must conclude with a negative\n" +
          "action or non-action; a choice starting with \"Yes\" must conclude with\n" +
          "an affirmative action. Verify the lead-in matches the logical conclusion."
        );
      }

      // ── RULE 10: BLOCK DL-021 (absent distractor EW fields) ────
      const dl021 = findDL021Violations(checkText);
      if (dl021.length > 0) {
        const lines = dl021
          .map(v => `  ExplanationWrong${v.letter} is ${v.reason} on ${v.qid}`)
          .join("\n");
        throw new Error(
          `GOVERNANCE RULE 10 — BLOCKED (DL-021 absent distractor ExplanationWrong)\n` +
          `${dl021.length} non-CorrectChoice ExplanationWrong slot(s) are absent or empty:\n` +
          `${lines}\n\n` +
          "Per DL-021: every distractor ExplanationWrong slot must be present\n" +
          "and contain choice-specific text. Absent distractor slots deprive\n" +
          "learners of educational feedback on incorrect selections (see\n" +
          "DEFECT_LIBRARY.md DL-021 — Pack E Section C)."
        );
      }

      // ── RULE 11: BLOCK cognitive classification inflation (AF-3/4/5) ──
      const cogViolations = findCognitiveViolations(checkText);
      if (cogViolations.length > 0) {
        const lines = cogViolations
          .map(v => `  ${v.qid} — CognitiveLevel: ${v.cog} triggered ${v.gate}: ${v.reason} (suggested: ${v.actual})`)
          .join("\n");
        throw new Error(
          `GOVERNANCE RULE 11 — BLOCKED (Cognitive Classification Gate)\n` +
          `${cogViolations.length} item(s) with inflated CognitiveLevel:\n` +
          `${lines}\n\n` +
          "Per CAQS §1.6 dimension 3 (Difficulty Calibration) and S95P HO Framework:\n" +
          "  AF-3: Deterministic rule application → not Analyze/Evaluate (use Apply)\n" +
          "  AF-4: Taxonomy/classification → not Analyze/Evaluate (use Apply)\n" +
          "  AF-5: DifficultyScore too low for claimed CognitiveLevel\n" +
          "Override: include BLOCK-AUTHORIZED marker with certification evidence."
        );
      }

      // ── RULE 5: BLOCK >30 question objects without auth ───────
      const qCount = countQuestions(scopeContent);
      if (qCount > MAX_QUESTIONS) {
        if (!BLOCK_AUTH_RE.test(scopeContent)) {
          throw new Error(
            `GOVERNANCE RULE 5 — BLOCKED\n` +
            `Change-set touches ${qCount} question objects (limit: ${MAX_QUESTIONS}).\n` +
            "Add a block-authorization marker in the content, e.g.:\n" +
            "  BLOCK-AUTHORIZED: sub-batch 2A wave 3 — certified batch\n" +
            "Or split into smaller change-sets of ≤30 questions each."
          );
        }
      }

      // ── RULE 1: TRACK question_state writes ──────────────────
      if (newContent && /"question_state"\s*:/i.test(newContent)) {
        state.qsChanges.files.add(filePath);
        state.qsChanges.count += (newContent.match(/"question_state"\s*:/gi) || []).length;
      }
      if (basename(filePath).toLowerCase() === "revision_history.md") {
        state.revHistTouched = true;
      }

      // ── RULE 4: TRACK answer-key writes ──────────────────────
      const isSourceFile = SOURCE_FILE_RE.test(basename(filePath));
      if (newContent && isSourceFile && /"(CorrectChoice|Correct(?:Answer)?)"/.test(newContent)) {
        state.answerKeyFiles.add(filePath);
        if (RECOMPUTED_RE.test(newContent)) {
          state.recomputedSeen = true;
        }
      }
    },

    "session.idle": async (event) => {
      const sessionID = String(event?.sessionID || "default");
      const state = sessions.get(sessionID);
      if (!state) return;

      const errors = [];

      if (state.qsChanges.count > 0 && !state.revHistTouched) {
        errors.push(
          `RULE 1 (question_state → REVISION_HISTORY.md) — BLOCKED\n` +
          `  ${state.qsChanges.count} question_state change(s) detected.\n` +
          `  Files: ${[...state.qsChanges.files].map(basename).join(", ")}\n` +
          `  knowledge/REVISION_HISTORY.md was not updated in this session.\n` +
          `  Per governance (S221 upgrade): every question_state change MUST\n` +
          `  pair with a knowledge/REVISION_HISTORY.md entry. Write the entry\n` +
          `  contemporaneously — do not batch for later.`
        );
      }

      if (state.answerKeyFiles.size > 0 && !state.recomputedSeen) {
        errors.push(
          `RULE 4 (answer-key → recomputed note) — BLOCKED\n` +
          `  CorrectChoice/CorrectAnswer modified in: ` +
          `${[...state.answerKeyFiles].map(basename).join(", ")}\n` +
          `  No "recomputed" / "independently verified" note found.\n` +
          `  Per governance (S221 upgrade): every answer-key change MUST\n` +
          `  include a verification note (recomputed, independently verified,\n` +
          `  re-verified, or independently recalculated).`
        );
      }

      if (errors.length > 0) {
        const body = `\n=== GOVERNANCE GUARD — ${errors.length} BLOCKED violation(s) ===\n` +
          errors.join("\n\n") +
          `\n==========================================\n`;
        throw new Error(body);
      }
    },

    "session.deleted": async (event) => {
      sessions.delete(String(event?.sessionID || "default"));
    },
  };
};
