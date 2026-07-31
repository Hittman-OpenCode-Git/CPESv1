/**
 * Stem Similarity Guard — CMA Part 1 & Part 2 Exam Simulator
 *
 * Prevents accidental duplicate or near-duplicate question stems during content
 * authoring. Compares stems in new content (edit/write operations) against all
 * existing stems across Part 1 and Part 2 pack files.
 *
 * Uses Jaccard similarity on tokenized, stop-word-filtered stem text.
 * Default threshold: 0.80 (80% token overlap).
 *
 * Supported pack files:
 *   - pack_a_corrected.js through pack_e_corrected.js (Part 1, 2,545 items)
 *   - pack_p2_a.js through pack_p2_e.js (Part 2, growing)
 *
 * Exemptions:
 *   - SIMILARITY-AUTHORIZED marker in content allows intentional near-duplicates
 *     (e.g., company-name-substitution variations in rotation groups)
 *   - BLOCK-AUTHORIZED marker allows batch authoring
 *   - Stems under 20 tokens (too short for meaningful similarity)
 *
 * Hooks:
 *   - tool.execute.before (BLOCK on high-similarity stems in edit/write)
 */

export const StemSimilarityGuard = async ({ client }) => {

  // ── Constants ──────────────────────────────────────────────────

  const SIMILARITY_THRESHOLD = 0.80;
  const MIN_TOKENS_FOR_CHECK = 20;
  const AUTHORIZED_RE = /SIMILARITY-AUTHORIZED|BLOCK-AUTHORIZED|batch-authorized/i;

  /** Pack files to scan for existing stems */
  const PACK_FILES = [
    "pack_a_corrected.js",
    "pack_b_corrected.js",
    "pack_c_corrected.js",
    "pack_d_corrected.js",
    "pack_e_corrected.js",
    "pack_p2_a.js",
    "pack_p2_b.js",
    "pack_p2_c.js",
    "pack_p2_d.js",
    "pack_p2_e.js",
  ];

  /** Stop words filtered from tokenization */
  const STOP_WORDS = new Set([
    "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "with", "by", "from", "is", "are", "was", "were", "be", "been",
    "being", "have", "has", "had", "having", "do", "does", "did", "doing",
    "will", "would", "shall", "should", "may", "might", "must", "can", "could",
    "it", "its", "they", "them", "their", "this", "that", "these", "those",
    "which", "who", "whom", "what", "when", "where", "how", "if", "then",
    "than", "as", "so", "not", "no", "also", "per", "each", "all",
    "year", "years", "company", "companies", "inc", "corp", "corporation",
    "ltd", "llc", "following", "follows", "based", "using", "used",
  ]);

  // ── State ──────────────────────────────────────────────────────

  let stemIndex = null;      // Array of { qid, tokens: Set, stem: string }
  let indexLoaded = false;
  let loadError = null;

  // ── Utility Functions ──────────────────────────────────────────

  /**
   * Tokenize stem text: lowercase, strip punctuation, split, filter stop words.
   * Returns a Set of unique significant tokens.
   */
  function tokenize(text) {
    if (!text || typeof text !== "string") return new Set();
    const cleaned = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const tokens = cleaned.split(" ").filter(t => {
      return t.length > 1 && !STOP_WORDS.has(t) && !/^\d+$/.test(t);
    });
    return new Set(tokens);
  }

  /**
   * Compute Jaccard similarity between two token Sets.
   * J(A, B) = |A ∩ B| / |A ∪ B|
   * Returns 0-1 range.
   */
  function jaccard(setA, setB) {
    if (setA.size === 0 && setB.size === 0) return 0;
    let intersection = 0;
    for (const token of setA) {
      if (setB.has(token)) intersection++;
    }
    const union = setA.size + setB.size - intersection;
    return union === 0 ? 0 : intersection / union;
  }

  /**
   * Extract brace-matched JSON objects from text using string-aware parsing.
   */
  function extractObjectsFromText(text) {
    const objects = [];
    let pos = 0;
    while (pos < text.length) {
      const objStart = text.indexOf("{", pos);
      if (objStart === -1) break;
      let depth = 1;
      let i = objStart + 1;
      let inString = false, stringChar = "", escape = false;
      while (depth > 0 && i < text.length) {
        const ch = text[i];
        if (escape) { escape = false; i++; continue; }
        if (inString) {
          if (ch === "\\") { escape = true; }
          else if (ch === stringChar) { inString = false; stringChar = ""; }
          i++; continue;
        }
        if (ch === '"' || ch === "'") { inString = true; stringChar = ch; i++; continue; }
        if (ch === "{") depth++;
        else if (ch === "}") depth--;
        i++;
      }
      if (depth !== 0) break;
      const objText = text.substring(objStart, i);
      let obj = null;
      try { obj = JSON.parse(objText); } catch (e) {
        try { obj = new Function("return (" + objText + ")")(); } catch (e2) {}
      }
      if (obj && typeof obj === "object" && !Array.isArray(obj)) {
        objects.push(obj);
      }
      pos = i;
    }
    return objects;
  }

  /**
   * Extract stems from text content (edit newString or write content).
   * Returns array of { stem, qid } for all question objects found.
   */
  function extractStemsFromText(text) {
    const results = [];
    const objects = extractObjectsFromText(text);
    for (const obj of objects) {
      const stem = obj.Stem || obj.Prompt;
      const qid = obj.QuestionID || obj.ItemID || "(new)";
      if (stem && typeof stem === "string" && stem.length > 0) {
        results.push({ stem, qid });
      }
    }
    return results;
  }

  /**
   * Load and index all existing stems from pack files.
   * Runs once, caches in stemIndex.
   */
  function loadStemIndex(workspaceRoot) {
    if (indexLoaded) return;
    stemIndex = [];
    loadError = null;

    for (const packFile of PACK_FILES) {
      let fullPath;
      try {
        // Try workspace root first, then relative
        const { join } = require("path");
        const { existsSync, readFileSync } = require("fs");
        fullPath = join(workspaceRoot || process.cwd(), packFile);
        if (!existsSync(fullPath)) continue;

        const content = readFileSync(fullPath, "utf8");
        const objects = extractObjectsFromText(content);
        for (const obj of objects) {
          const stem = obj.Stem || obj.Prompt;
          const qid = obj.QuestionID || obj.ItemID || "?";
          if (stem && typeof stem === "string" && stem.length > 0) {
            stemIndex.push({
              qid,
              tokens: tokenize(stem),
              stem: stem.substring(0, 120),
              file: packFile
            });
          }
        }
      } catch (e) {
        // File not found or parse error — skip this pack
        if (loadError === null) loadError = [];
        loadError.push(`${packFile}: ${e.message}`);
      }
    }

    indexLoaded = true;
  }

  /**
   * Check new stems against the index for high similarity.
   * Returns array of { newQid, newStem, matchQid, matchStem, similarity }.
   */
  function checkSimilarity(newStems) {
    const violations = [];
    if (!stemIndex || stemIndex.length === 0) return violations;

    for (const newItem of newStems) {
      const newTokens = tokenize(newItem.stem);
      if (newTokens.size < MIN_TOKENS_FOR_CHECK) continue;

      for (const existing of stemIndex) {
        const sim = jaccard(newTokens, existing.tokens);
        if (sim >= SIMILARITY_THRESHOLD) {
          violations.push({
            newQid: newItem.qid,
            newStem: newItem.stem.substring(0, 120),
            matchQid: existing.qid,
            matchStem: existing.stem,
            similarity: (sim * 100).toFixed(1),
            matchFile: existing.file,
          });
        }
      }
    }

    return violations;
  }

  // ── Hooks ──────────────────────────────────────────────────────

  return {
    "tool.execute.before": async (input, output) => {
      const tool = input?.tool;
      if (tool !== "edit" && tool !== "write") return;

      const args = output?.args || {};
      const filePath = args.filePath || "";
      const newContent = tool === "write"
        ? (args.content || "")
        : (args.newString || "");

      // Only check pack source files
      if (!/pack_(p2_)?[a-e](_corrected)?\.js$/i.test(filePath)) return;

      // SIMILARITY-AUTHORIZED bypass
      if (AUTHORIZED_RE.test(newContent)) return;

      // Load index on first invocation
      const workspaceRoot = input?.workspaceRoot || process.cwd();
      try {
        loadStemIndex(workspaceRoot);
      } catch (e) {
        // Index load failure — warn but don't block
        console.warn("[stem-similarity-guard] Could not load stem index:", e.message);
        return;
      }

      if (!stemIndex || stemIndex.length === 0) return;

      const newStems = extractStemsFromText(newContent);
      if (newStems.length === 0) return;

      const violations = checkSimilarity(newStems);
      if (violations.length > 0) {
        const lines = violations.map(v =>
          `  New: ${v.newQid} "${v.newStem}..."\n` +
          `  Match: ${v.matchQid} in ${v.matchFile} — ${v.similarity}% similar\n` +
          `  Existing: "${v.matchStem}..."`
        ).join("\n\n");

        throw new Error(
          `STEM SIMILARITY GUARD — BLOCKED\n` +
          `${violations.length} stem(s) exceed ${(SIMILARITY_THRESHOLD * 100).toFixed(0)}% similarity threshold:\n\n` +
          `${lines}\n\n` +
          "These stems are too similar to existing items. This may indicate:\n" +
          "  - Accidental duplicate content\n" +
          "  - Near-duplicate rewrite of an existing question\n" +
          "  - Blueprint crowding (same concept, indistinguishable scenario)\n\n" +
          "If this is intentional (e.g., rotation-group company-name variation),\n" +
          "add SIMILARITY-AUTHORIZED marker to the content."
        );
      }
    },
  };
};
