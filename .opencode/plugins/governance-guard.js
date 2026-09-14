/**
 * Governance Guard Plugin — CMA Part 1 & Part 2 Exam Simulator
 *
 * Enforces governance rules at tool-execution level.
 * Rules 1-21 are all BLOCK level (S221 upgrade; R15-R19 added 2026-09-10;
 * R20-R21 added 2026-09-13, coverage-hardening change-set).
 *
 * Depends on: CAQS_v1.0.md, DEFECT_LIBRARY.md (DL-008, DL-026, DL-037, DL-021,
 *             DL-047, DL-046, DL-048, DL-045, DL-049, DL-050),
 *             P2_SCHEMA_STANDARD.md (Rule 13, Rule 14)
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
 * RULE 12 (BLOCK) — Cognitive-First Assignment (cognitive relabeling without content change) — S121
 * RULE 13 (BLOCK) — Part2OnlyFlag must be true on every P2 MCQ item (P2 schema enforcement)
 * RULE 14 (BLOCK) — Cross-part QID boundary — P1-QIDs blocked in P2 packs and vice versa
 * RULE 15 (BLOCK) — Misfiled explanation-fragment text in distractor slots (DL-047 fingerprint)
 * RULE 16 (BLOCK) — Certification provenance stamp required on →Certified writes
 * RULE 17 (BLOCK) — Heuristic-screen admissibility note required on mass choice rewrites (DL-045 doctrine)
 * RULE 18 (BLOCK) — Choice-text hygiene floor (DL-046 family: whitespace/fragment)
 * RULE 19 (BLOCK) — Duplicate CaseID within a change-set (DL-048 intra-batch gate)
 * RULE 20 (BLOCK) — Legacy silent-drop extractor regression block (board R21 / DL-049 mechanism)
 * RULE 21 (BLOCK) — Semantic quarantine manifest enforcement on →Certified writes (board R25 / DL-047)
 */

import fs from "node:fs";
import path from "node:path";

const BLOCK_AUTH_RE = /BLOCK-AUTHORIZED|batch-authorized|AUTHORIZED-BLOCK/i;
const RECOMPUTED_RE = /recomputed|independently verified|independently recalculated|re-verified|recomputation verified/i;
const MAX_QUESTIONS = 30;

// RULE 17: mass choice-rewrite admissibility — change-set must cite its evidence basis
const ADMISSIBILITY_RE = /stratified|context review|adjudicated|triage|candidate-list|independently derived/i;
// RULE 18: choice-text hygiene floor (DL-046 family)
const HYGIENE_MIN_LEN = 8;
// R18 narrowing (2026-09-10 patch): leading currency / grouping / sign runs are
// legitimate choice openers — pool census of all 2,692 Certified items found the
// only non-alphanumeric starts are $ (963: dollar amounts), ( (19: parenthesized
// negatives, "(1)…" enumerations, "(AQ-SQ) formulas"), - (2: negative amounts),
// every one verified legitimate. Strip that run before the alphanumeric check.
// Whitespace + length clauses are unchanged and already cover the DL-046
// fragment pattern (" securities").
const HYGIENE_LEAD_EXEMPT_RE = /^[$\u20AC\u00A3\u00A5%(-]+/;

const P1_SOURCE_FILE_RE = /^(pack_[a-e]_corrected\.js|scored_cases\d*\.js|case_pack_\d+_corrected\.js)$/i;
const P2_SOURCE_FILE_RE = /^pack_p2_[a-f]\.js$/i;
const SOURCE_FILE_RE = /^(pack_[a-e]_corrected\.js|scored_cases\d*\.js|case_pack_\d+_corrected\.js|pack_p2_[a-f]\.js)$/i;

const P1_QID_RE = /\bP1[A-E]?-[A-F]-(?:R\d{2}|\d{3})\b/;
const P2_QID_RE = /\bP2-[A-F]-\d{3}\b/;

// RULE 7: Derived registry paths — must NOT be hand-edited
const DERIVED_REGISTRY_RE = /(registry[\\\/](packs|domains|cases)[\\\/]|MasterQuestionRegistry\.csv$|MASTER_QUESTION_REGISTRY\.md$|SESSION_STATUS_\d{4}-\d{2}-\d{2}\.md$|CURRENT_BASELINES\.md$|DEFECT_MANIFEST_DL008_DL026\.json$)/i;

// RULE 7: Regeneration scripts that are WHITELISTED to write to derived registries
const REGENERATION_SCRIPT_RE = /(build_master_registry|regenerate|rebuild|regen)_/i;

// RULE 8: Output paths that require session registry entries
const SESSION_PACKAGES_RE = /scripts[\\\/]output[\\\/]session_packages[\\\/]/i;

// RULE 20 (board R21): validator/screen script paths + legacy bank-regex shape.
// Matches only regex-literal shapes (backslash-bracket), never prose mentions
// ("MCQ_BANK_C" in a comment does not fire). Exempt when pack_parser present.
const VALIDATOR_SCREEN_PATH_RE = /scripts[\\\/](validators|lib)[\\\/]|scripts[\\\/](phase0_census|semantic_key_audit_p2|semantic_screens|s121_portfolio_dashboard|baseline_coherence|[^\\\/]*extractor[^\\\/]*\.js|[^\\\/]*scan_[^\\\/]*\.js)/i;
const LEGACY_BANK_RE = /BANK_\\[A-Z\\]|\(\?:MCQ\|CASE\)_BANK/;

// RULE 21 (board R25): semantic quarantine manifest (DL-047 enforcement).
// Fail-open on missing/unparseable manifest is an explicit documented behavior:
// a guard that breaks the pipeline on a transient missing file is worse than
// failing open (board determination 2026-09-13).
const QUARANTINE_MANIFEST_RELPATH = "scripts/output/semantic_quarantine.json";

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
        // DL-026 = present-but-empty ONLY. Absent fields are DL-021 (Rule 10).
        if (ewKey in obj && typeof obj[ewKey] === 'string' && obj[ewKey].length === 0) {
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
        // DL-021 = ABSENT only. Present-but-empty fields are DL-026 (Rule 6).
        if (!(ewKey in obj)) {
          violations.push({ letter: L, qid: obj.QuestionID || '(unknown)', reason: 'absent' });
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

  /** Return array of { qid, reason } for RULE 13 violations — P2 items missing Part2OnlyFlag: true */
  function findPart2OnlyFlagViolations(text) {
    const violations = [];
    const objects = extractObjectsFromText(text);
    for (const obj of objects) {
      const qid = obj.QuestionID || '(unknown)';
      if (!P2_QID_RE.test(qid)) continue;
      if (obj.Part2OnlyFlag !== true) {
        violations.push({ qid, reason: `Part2OnlyFlag is ${JSON.stringify(obj.Part2OnlyFlag)} (must be true)` });
      }
    }
    return violations;
  }

  /** Return array of { qid, reason } for RULE 14 violations — cross-part QID contamination */
  function findCrossPartQIDViolations(text) {
    const violations = [];
    const objects = extractObjectsFromText(text);
    for (const obj of objects) {
      const qid = obj.QuestionID || '(unknown)';
      if (P2_QID_RE.test(qid) && obj.Part !== 2) {
        violations.push({ qid, reason: `P2- QID format but Part field is ${JSON.stringify(obj.Part)} (expected 2)` });
      }
      if (P1_QID_RE.test(qid) && obj.Part === 2) {
        violations.push({ qid, reason: `P1- QID format in Part 2 item` });
      }
    }
    return violations;
  }

  /** RULE 15 — Misfiled explanation-fragment text (DL-047 fingerprint).
   *  A non-empty distractor EW slot whose trimmed text starts with a lowercase
   *  letter is a justification continuation filed in a wrong-answer slot
   *  (precedent: P1-F-009 EW_C "because the data arrive after managers…").
   *  Deterministic, ~0 FP: genuine distractor explanations start uppercase. */
  function findFragmentViolations(text) {
    const violations = [];
    const objects = extractObjectsFromText(text);
    const letters = ['A', 'B', 'C', 'D'];
    for (const obj of objects) {
      const cc = obj.CorrectChoice;
      if (!cc || !/^[A-D]$/.test(cc)) continue;
      const qid = obj.QuestionID || '(unknown)';
      for (const L of letters) {
        if (L === cc) continue;
        const ewKey = 'ExplanationWrong' + L;
        const val = obj[ewKey];
        if (typeof val !== 'string' || val.length === 0) continue;
        const trimmed = val.trim();
        if (/^[a-z]/.test(trimmed)) {
          violations.push({ qid, slot: L, snippet: trimmed.substring(0, 100) });
        }
      }
    }
    return violations;
  }

  /** RULE 16 — Certification provenance stamp required on →Certified writes.
   *  Every object carrying question_state "Certified" must also carry a batch
   *  stamp (certification_batch or recertification_batch) AND a date stamp
   *  (certification_date or recertification_date). Backfill-on-touch: touching
   *  a legacy unstamped Certified item requires adding stamps. */
  function findUnstampedCertViolations(text) {
    const violations = [];
    const objects = extractObjectsFromText(text);
    for (const obj of objects) {
      if (obj.question_state !== 'Certified') continue;
      if (!obj.CorrectChoice) continue; // MCQ scope; case items use a different schema
      const qid = obj.QuestionID || '(unknown)';
      const hasBatch = obj.certification_batch || obj.recertification_batch;
      const hasDate = obj.certification_date || obj.recertification_date;
      if (!hasBatch || !hasDate) {
        const missing = (!hasBatch ? 'batch' : '') + (!hasBatch && !hasDate ? '+' : '') + (!hasDate ? 'date' : '');
        violations.push({ qid, reason: `Certified without ${missing} stamp` });
      }
    }
    return violations;
  }

  /** RULE 18 — Choice-text hygiene floor (DL-046 family).
   *  Flags: leading/trailing whitespace, trimmed length < 8, or first
   *  character not alphanumeric (orphan fragments like " securities"). */
  function findChoiceHygieneViolations(text) {
    const violations = [];
    const objects = extractObjectsFromText(text);
    for (const obj of objects) {
      if (!obj.CorrectChoice) continue;
      const qid = obj.QuestionID || '(unknown)';
      const choices = obj.Choices;
      if (!choices || typeof choices !== 'object') continue;
      for (const [letter, value] of Object.entries(choices)) {
        if (typeof value !== 'string') continue;
        if (value.length === 0) continue;
        const trimmed = value.trim();
        if (trimmed !== value) {
          violations.push({ qid, choice: letter, reason: 'leading/trailing whitespace', snippet: value.substring(0, 60) });
        } else if (trimmed.length < HYGIENE_MIN_LEN) {
          violations.push({ qid, choice: letter, reason: `fragment (trimmed length ${trimmed.length} < ${HYGIENE_MIN_LEN})`, snippet: trimmed.substring(0, 60) });
        } else if (/^[^A-Za-z0-9]/.test(trimmed.replace(HYGIENE_LEAD_EXEMPT_RE, ''))) {
          violations.push({ qid, choice: letter, reason: 'non-alphanumeric start (orphan fragment)', snippet: trimmed.substring(0, 60) });
        }
      }
    }
    return violations;
  }

  /** RULE 20 — Legacy silent-drop extractor regression block (board R21 / DL-049).
   *  Returns array of { snippet } when a validator/screen script write
   *  reintroduces bank-name-regex extraction without the canonical parser
   *  substrate (the Pack C comment-blindness / P2 bank-name mechanism). */
  function findLegacyExtractorViolations(filePath, text) {
    const p = String(filePath || "").replace(/\\/g, "/");
    if (!VALIDATOR_SCREEN_PATH_RE.test(filePath || "") && !VALIDATOR_SCREEN_PATH_RE.test(p)) return [];
    if (/pack_parser/.test(text || "")) return [];
    const src = text || "";
    const hits = [];
    const re = new RegExp(LEGACY_BANK_RE.source, "g");
    let m;
    while ((m = re.exec(src)) !== null) {
      hits.push({ snippet: src.substring(Math.max(0, m.index - 40), m.index + 60).replace(/\s+/g, " ") });
      if (hits.length >= 5) break;
    }
    return hits;
  }

  /** RULE 21 — Semantic quarantine manifest enforcement (board R25 / DL-047).
   *  Returns array of { qid } for objects flipped to Certified while listed
   *  in the manifest active set. Pure function of (text, manifest) so the
   *  test suite exercises it without filesystem access. */
  function findQuarantinedCertViolations(text, manifest) {
    const active = new Set(((manifest && manifest.active) || []).map(e => e && e.qid).filter(Boolean));
    if (active.size === 0) return [];
    const objects = extractObjectsFromText(text);
    const out = [];
    for (const obj of objects) {
      if (obj.question_state !== "Certified") continue;
      const qid = obj.QuestionID || "";
      if (qid && active.has(qid)) out.push({ qid });
    }
    return out;
  }

  function loadQuarantineManifest() {
    try {
      const raw = fs.readFileSync(path.join(process.cwd(), QUARANTINE_MANIFEST_RELPATH), "utf8");
      const m = JSON.parse(raw);
      if (m && Array.isArray(m.active)) return m;
    } catch (e) { /* fail-open: documented behavior, see constant note */ }
    return { active: [] };
  }

  /** RULE 19 — Duplicate CaseID within a change-set (DL-048 intra-batch gate).
   *  Cross-file uniqueness is enforced by CaseIdentityValidator at pipeline
   *  time; this blocks the duplicate from being authored in one change-set. */
  function findDuplicateCaseIDViolations(text) {
    const seen = new Map();
    const dupes = new Map();
    const re = /"CaseID"\s*:\s*"([^"]+)"/g;
    let m;
    while ((m = re.exec(text || '')) !== null) {
      const id = m[1];
      if (seen.has(id)) {
        dupes.set(id, (dupes.get(id) || 1) + 1);
      } else {
        seen.set(id, true);
      }
    }
    return [...dupes.entries()].map(([caseId, extra]) => ({ caseId, count: extra + 1 }));
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

      // ── RULE 6: BLOCK DL-026 (present-but-empty distractor EW slots) ──────
      const dl026 = findDL026Violations(checkText);
      if (dl026.length > 0) {
        const lines = dl026
          .map(v => `  ExplanationWrong${v.letter} is empty on ${v.qid}`)
          .join("\n");
        throw new Error(
          `GOVERNANCE RULE 6 — BLOCKED (DL-026 empty distractor slot)\n` +
          `${dl026.length} non-CorrectChoice ExplanationWrong slot(s) are present but empty:\n` +
          `${lines}\n\n` +
          "Per CAQS_v1.0.md §4.4: every distractor ExplanationWrong slot\n" +
          "(the 3 slots NOT matching CorrectChoice) must contain choice-specific\n" +
          "explanatory text. (Absent fields are DL-021 / RULE 10.) Empty distractor\n" +
          "slots deprive learners of educational feedback on incorrect selections."
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
          `${dl021.length} non-CorrectChoice ExplanationWrong slot(s) are absent from the object:\n` +
          `${lines}\n\n` +
          "Per DL-021: every distractor ExplanationWrong slot must be present\n" +
          "and contain choice-specific text. (Present-but-empty fields are\n" +
          "DL-026 / RULE 6.) Absent distractor slots deprive\n" +
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

      // ── RULE 12: BLOCK cognitive relabeling without content change ──
      // Cognitive-First Assignment (S121). If a pack-file edit changes CognitiveLevel
      // but does NOT also change Stem, Choices, ExplanationCorrect, or any
      // ExplanationWrong field, BLOCK the edit. Cognitive gaps must be filled by
      // authoring new content at the target level, not by relabeling existing items.
      if (tool === "edit" && SOURCE_FILE_RE.test(basename(filePath))) {
        const oldCL = (oldContent.match(/"CognitiveLevel"\s*:\s*"([^"]+)"/) || [])[1];
        const newCL = (newContent.match(/"CognitiveLevel"\s*:\s*"([^"]+)"/) || [])[1];
        if (oldCL && newCL && oldCL !== newCL) {
          const contentFields = ["Stem", "Choices", "ExplanationCorrect",
            "ExplanationWrongA", "ExplanationWrongB", "ExplanationWrongC", "ExplanationWrongD"];
          const contentChanged = contentFields.some(f => {
            const r = new RegExp('"' + f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"');
            const hadOld = r.test(oldContent);
            const hadNew = r.test(newContent);
            if (!hadOld || !hadNew) return false;
            const valRe = new RegExp('"' + f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"\\s*:\\s*');
            const oldIdx = oldContent.search(valRe);
            const newIdx = newContent.search(valRe);
            if (oldIdx === -1 || newIdx === -1) return false;
            const oldSlice = oldContent.substring(oldIdx, oldIdx + 200);
            const newSlice = newContent.substring(newIdx, newIdx + 200);
            return oldSlice !== newSlice;
          });
          if (!contentChanged) {
            throw new Error(
              `GOVERNANCE RULE 12 — BLOCKED (Cognitive-First Assignment)\n` +
              `CognitiveLevel changed from "${oldCL}" to "${newCL}" but no content fields changed.\n\n` +
              "Per S121 S121_PORTFOLIO_TARGETS.md §5 (Rule 12):\n" +
              "  Cognitive level must be determined by question demand, not portfolio gaps.\n" +
              "  Prohibited: changing CognitiveLevel without changing question content.\n" +
              "  Required: author new content at the target level, or change the content\n" +
              "  (Stem, Choices, ExplanationCorrect, or ExplanationWrong) to justify\n" +
              "  a higher cognitive classification.\n" +
              "Override: include BLOCK-AUTHORIZED marker with documented independent\n" +
              "cognitive review confirming the reclassification is a correction, not inflation."
            );
          }
        }
      }

      // ── RULE 13: BLOCK Part2OnlyFlag missing/false on P2 items ──
      const p2pFlags = findPart2OnlyFlagViolations(checkText);
      if (p2pFlags.length > 0) {
        const lines = p2pFlags
          .map(v => `  ${v.qid}: ${v.reason}`)
          .join("\n");
        throw new Error(
          `GOVERNANCE RULE 13 — BLOCKED (Part2OnlyFlag)\n` +
          `${p2pFlags.length} P2 item(s) with missing/false Part2OnlyFlag:\n` +
          `${lines}\n\n` +
          "Per P2_SCHEMA_STANDARD.md §2: every Part 2 MCQ item must carry\n" +
          "Part2OnlyFlag: true (strict boolean). This gates cross-part\n" +
          "certification and prevents Part 1 content from entering P2 packs.\n" +
          "Add: \"Part2OnlyFlag\": true"
        );
      }

      // ── RULE 14: BLOCK cross-part QID contamination ─────────────
      const cpart = findCrossPartQIDViolations(checkText);
      if (cpart.length > 0) {
        const lines = cpart
          .map(v => `  ${v.qid}: ${v.reason}`)
          .join("\n");
        throw new Error(
          `GOVERNANCE RULE 14 — BLOCKED (Cross-Part QID Boundary)\n` +
          `${cpart.length} cross-part QID violation(s):\n` +
          `${lines}\n\n` +
          "Per P2_SCHEMA_STANDARD.md §5: QIDs are namespaced by exam part.\n" +
          "P2- prefixed QIDs must only appear in P2 packs (pack_p2_[a-f].js)\n" +
          "with \"Part\": 2. P1- prefixed QIDs must not appear in P2 packs.\n" +
          "Each exam part is a separate content domain."
        );
      }

      // ── RULE 15: BLOCK misfiled explanation-fragment text (DL-047 fingerprint) ──
      const fragments = findFragmentViolations(checkText);
      if (fragments.length > 0) {
        const lines = fragments
          .map(v => `  ${v.qid} ExplanationWrong${v.slot}: "${v.snippet}..."`)
          .join("\n");
        throw new Error(
          `GOVERNANCE RULE 15 — BLOCKED (misfiled explanation fragment)\n` +
          `${fragments.length} distractor ExplanationWrong slot(s) start with a lowercase letter:\n` +
          `${lines}\n\n` +
          "Per DL-047: a lowercase-starting EW slot is a justification continuation\n" +
          "filed in a wrong-answer slot (precedent: P1-F-009 EW_C \"because the\n" +
          "data arrive after managers…\"). Genuine distractor explanations start\n" +
          "uppercase. Rewrite the slot with choice-specific refutation, or record\n" +
          "an independent-derivation adjudication with a BLOCK-AUTHORIZED marker.\n" +
          "Broader semantic agreement (EC lead-recall vs CorrectChoice) must be\n" +
          "human-adjudicated before any →Certified flip (DL-047 4-screen protocol)."
        );
      }

      // ── RULE 18: BLOCK choice-text hygiene violations (DL-046 family) ──
      const hygiene = findChoiceHygieneViolations(checkText);
      if (hygiene.length > 0) {
        const lines = hygiene
          .map(v => `  ${v.qid} Choice ${v.choice}: ${v.reason} — "${v.snippet}..."`)
          .join("\n");
        throw new Error(
          `GOVERNANCE RULE 18 — BLOCKED (choice-text hygiene)\n` +
          `${hygiene.length} choice(s) fail the hygiene floor:\n` +
          `${lines}\n\n` +
          "Per DL-046: every Choice value must be trimmed, ≥8 characters, and\n" +
          "start with an alphanumeric character (a leading $€£¥%(- run — dollar\n" +
          "amounts, parenthesized negatives, enumerations — is exempt).\n" +
          "Trim whitespace, reconstruct\n" +
          "orphan fragments from topic context, and re-verify before certifying."
        );
      }

      // ── RULE 19: BLOCK duplicate CaseID within a change-set (DL-048) ──
      const dupeCases = findDuplicateCaseIDViolations(scopeContent);
      if (dupeCases.length > 0) {
        const lines = dupeCases
          .map(v => `  ${v.caseId} appears ${v.count}x in this change-set`)
          .join("\n");
        throw new Error(
          `GOVERNANCE RULE 19 — BLOCKED (duplicate CaseID)\n` +
          `${lines}\n\n` +
          "Per DL-048 and Constitution §7 (AI SHALL NOT reuse IDs): CaseIDs must\n" +
          "be unique across live banks. Allocate the new ID registry-first\n" +
          "(scan DEFECT_LIBRARY.md for the highest ID; check CaseIdentityValidator)\n" +
          "before authoring. Cross-file duplicates are additionally caught by\n" +
          "scripts/validators/CaseIdentityValidator.js at pipeline time."
        );
      }

      // ── RULE 20: BLOCK legacy silent-drop extractor patterns ──
      const legacyExt = findLegacyExtractorViolations(filePath, newContent);
      if (legacyExt.length > 0 && !BLOCK_AUTH_RE.test(scopeContent)) {
        throw new Error(
          `GOVERNANCE RULE 20 — BLOCKED (legacy silent-drop extractor)\n` +
          `Validator/screen write reintroduces bank-name-regex extraction without pack_parser:\n` +
          legacyExt.map(v => `  ...${v.snippet}...`).join("\n") + "\n\n" +
          "Per board R21 / DL-049: bank-declaration regexes silently blind whole packs " +
          "(Pack C comment-blindness, P2 bank names, archived-vs-live case banks). " +
          "Route all extraction through scripts/lib/pack_parser.js with a raw-count " +
          "coverage assertion (board R20), or mark BLOCK-AUTHORIZED with justification."
        );
      }

      // ── RULE 21: BLOCK →Certified writes for quarantined QIDs ──
      if (SOURCE_FILE_RE.test(basename(filePath)) && /"question_state"\s*:\s*"Certified"/.test(newContent || "")) {
        const qcert = findQuarantinedCertViolations(checkText, loadQuarantineManifest());
        if (qcert.length > 0 && !BLOCK_AUTH_RE.test(scopeContent)) {
          throw new Error(
            `GOVERNANCE RULE 21 — BLOCKED (semantic quarantine)\n` +
            `${qcert.length} quarantined item(s) cannot re-enter Certified:\n` +
            qcert.map(v => `  ${v.qid}`).join("\n") + "\n\n" +
            "Per board R25 / DL-047: items confirmed defective by semantic audit stay out " +
            "of the delivery pool until adjudicated remediation + restore with " +
            "Rule-16 stamps. Remove the QID from scripts/output/semantic_quarantine.json " +
            "active list only after the fix verifies, or proceed BLOCK-AUTHORIZED."
          );
        }
      }

      // ── RULE 16: BLOCK →Certified writes without provenance stamps ──
      const unstamped = findUnstampedCertViolations(checkText);
      if (unstamped.length > 0 && !BLOCK_AUTH_RE.test(scopeContent)) {
        const lines = unstamped
          .map(v => `  ${v.qid}: ${v.reason}`)
          .join("\n");
        throw new Error(
          `GOVERNANCE RULE 16 — BLOCKED (certification provenance stamp)\n` +
          `${unstamped.length} Certified item(s) lack provenance stamps:\n` +
          `${lines}\n\n` +
          "Every →Certified write must carry certification_batch + certification_date\n" +
          "(remediation re-certs: preserve the original and add recertification_batch\n" +
          "+ recertification_date). Backfill-on-touch: adding stamps to a legacy\n" +
          "unstamped item is part of the same change-set. Override only with a\n" +
          "BLOCK-AUTHORIZED marker and a REVISION_HISTORY.md entry explaining why."
        );
      }

      // ── RULE 17: BLOCK mass choice rewrites without admissibility note (DL-045) ──
      const isSourceFileForR17 = SOURCE_FILE_RE.test(basename(filePath));
      const touchesChoices = /"Choices"\s*:/.test(newContent || '');
      if (isSourceFileForR17 && touchesChoices && countQuestions(scopeContent) >= 3 &&
          !ADMISSIBILITY_RE.test(scopeContent) && !BLOCK_AUTH_RE.test(scopeContent)) {
        throw new Error(
          `GOVERNANCE RULE 17 — BLOCKED (heuristic-screen admissibility)\n` +
          `Change-set rewrites Choices on ${countQuestions(scopeContent)} question object(s) with no\n` +
          "evidence-basis note.\n\n" +
          "Per DL-045 doctrine and DL-031/DLC-043 precedent, unstratified screens\n" +
          "(containment, absolute-term, polarity, Jaccard) are inadmissible as\n" +
          "rewrite evidence. The change-set must cite its basis with one of:\n" +
          "  stratified | context review | adjudicated | triage | candidate-list |\n" +
          "  independently derived\n" +
          "Single/double-item fixes (<3 objects) are exempt. Bulk rewrites without\n" +
          "stratification must instead carry a BLOCK-AUTHORIZED marker."
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
