const fs = require("fs");

// ── DL-P2-025: silent parse-failure containment ─────────────────────────────
// Before: extractFromContent caught every error and returned `null`, and
// consumers treated `null` as "skip this bank". A bank containing a
// template literal, regex literal, function, `undefined`, or `NaN` therefore
// vanished from every downstream gate with no signal — the Rule 20
// silent-drop class (DL-049).
//
// Three changes:
//   1. `extractFromContentDetailed` returns { ok, cases, error, partial } so a
//      caller can distinguish a parse failure from an legitimately empty bank.
//   2. On failure it records the error and the offending offset — never a bare null.
//   3. `extractFromContent` keeps its original signature for back-compat but now
//      WARNS on stderr instead of failing silently, and supports an
//      { strict: true } option that throws instead of returning null.
//
// All-or-nothing is preserved deliberately: the extractor has never returned a
// PARTIAL array, so a non-null result is always the complete bank.
class CaseExtractor {
    /**
     * Extracts case arrays from a JS case bank file.
     * Handles formats:
     *   const ENHANCED_CASE_BASE = [{...}, ...];
     *   const ENHANCED_CASE_BASE2 = [{...}, ...];
     *   const SCORED_CASES = [{...}, ...];
     */
    static extractCases(filePath, opts) {
        if (!fs.existsSync(filePath)) return null;
        const content = fs.readFileSync(filePath, "utf8");
        const r = CaseExtractor.extractFromContentDetailed(content, opts);
        return r.ok ? r.cases : null;
    }

    /** Back-compat wrapper. See DL-P2-025 note above. */
    static extractFromContent(content, opts) {
        const r = CaseExtractor.extractFromContentDetailed(content, opts);
        if (r.ok) return r.cases;
        if (opts && opts.strict) {
            throw new Error("CaseExtractor: " + r.error);
        }
        // Loud, not silent. Consumers that ignore this will still see null,
        // but the failure is now visible in logs instead of vanishing.
        console.error(
            "CaseExtractor: FAILED to parse case bank (" + r.error + ")" +
            (r.hint ? " — " + r.hint : "") +
            "\n  Returning null. Callers MUST fail closed; treat this bank as unverified."
        );
        return null;
    }

    /**
     * Detailed extraction. Returns:
     *   { ok: true,  cases: [...], error: null, hint: null }
     *   { ok: false, cases: null,   error: string, hint: string }
     * A successful result is ALWAYS the complete array (never partial).
     */
    static extractFromContentDetailed(content, opts) {
        try {
            // Find the array assignment pattern
            const patterns = [
                /const\s+ENHANCED_CASE_BASE\d*\s*=\s*(\[)/,
                /const\s+SCORED_CASES\s*=\s*(\[)/,
                // DL-050: live banks (previously fell through to null = silent skip).
                // NOTE: alias lines (CASE_BANK_X = CASE_PACK_N) are deliberately
                // NOT matched — only direct array declarations anchor extraction.
                /(?:const|var)\s+CASE_PACK_\d+\s*=\s*(\[)/,
                /(?:const|var)\s+casePackP2_\d+\s*=\s*(\[)/,
                /(?:const|var)\s+casePackP2Authored\s*=\s*(\[)/,
                /(?:const|var)\s+casePackP2_C4_C8\s*=\s*(\[)/,
                /(?:const|var)\s+casePackP2C4C8\s*=\s*(\[)/,
                /^(\s*\[)/m
            ];

            let startIdx = -1;
            for (const pattern of patterns) {
                const match = content.match(pattern);
                if (match) {
                    startIdx = match.index + match[0].length - 1; // position of '['
                    break;
                }
            }

            if (startIdx === -1) {
                return {
                    ok: false, cases: null,
                    error: "no case-array declaration found",
                    hint: "expected const/var CASE_PACK_N, casePackP2_N, " +
                          "casePackP2Authored, casePackP2_C4_C8, ENHANCED_CASE_BASE, " +
                          "SCORED_CASES, or a bare leading array",
                };
            }

            // Track bracket depth to find matching closing bracket
            let depth = 0;
            let inString = false;
            let stringChar = null;
            let endIdx = -1;

            for (let i = startIdx; i < content.length; i++) {
                const ch = content[i];
                const prev = i > 0 ? content[i - 1] : '';

                if (inString) {
                    if (ch === stringChar && prev !== '\\') {
                        inString = false;
                        stringChar = null;
                    }
                    continue;
                }

                if (ch === '"' || ch === "'" || ch === '`') {
                    inString = true;
                    stringChar = ch;
                    continue;
                }

                if (ch === '[') depth++;
                if (ch === ']') depth--;

                if (depth === 0) {
                    endIdx = i;
                    break;
                }
            }

            if (endIdx === -1) {
                return { ok: false, cases: null,
                    error: "unterminated array literal starting at offset " + startIdx,
                    hint: "no matching ']' — file may be truncated" };
            }

            let arrayText = content.substring(startIdx, endIdx + 1);

            // Strip JS comments
            arrayText = CaseExtractor.stripComments(arrayText);

            // Convert JS to JSON
            arrayText = CaseExtractor.normalizeToJSON(arrayText);

            let parsed;
            try {
                parsed = JSON.parse(arrayText);
            } catch (e) {
                // JSON.parse cannot handle JS-literal values (template literals,
                // regex, functions, undefined, NaN). Fall back to the JS
                // evaluator before declaring failure — this closes the gap that
                // made those values silently drop the whole bank.
                try {
                    parsed = new Function("return " + arrayText)();
                } catch (e2) {
                    return {
                        ok: false, cases: null,
                        error: "parse failed at offset ~" + startIdx + ": " + e2.message,
                        hint: "JS-literal value (template literal, regex, function, " +
                              "undefined, NaN) or malformed object literal. Source is " +
                              "not JSON-parseable and not valid JS either.",
                    };
                }
            }
            return {
                ok: true,
                cases: Array.isArray(parsed) ? parsed : [parsed],
                error: null, hint: null,
            };
        } catch (e) {
            return { ok: false, cases: null,
                error: "unexpected: " + (e && e.message ? e.message : String(e)),
                hint: null };
        }
    }

    /**
     * Normalizes P2 case items to P1-validator-compatible form.
     * Handles DL-051 schema variants (P2 authoring conventions, not defects):
     * - object-Choices → array (77 items have non-array object Choices)
     * - ExplanationCorrect → Explanation (3 items use ExplanationCorrect only)
     */
    static normalizeCaseItems(cases) {
        if (!Array.isArray(cases)) return cases;
        cases.forEach(c => {
            if (!c || !Array.isArray(c.Items)) return;
            c.Items.forEach(item => {
                if (item.Choices && typeof item.Choices === "object" && !Array.isArray(item.Choices)) {
                    item.Choices = Object.values(item.Choices);
                }
                if ((!item.Explanation || String(item.Explanation).trim() === "") && item.ExplanationCorrect) {
                    item.Explanation = item.ExplanationCorrect;
                }
            });
        });
        return cases;
    }

    /**
     * Strips JS comments (both // and /* *​/) from source text.
     * Handles comments inside strings by detecting string context.
     */
    static stripComments(text) {
        let result = "";
        let i = 0;
        let inString = false;
        let stringChar = null;

        while (i < text.length) {
            const ch = text[i];
            const next = i + 1 < text.length ? text[i + 1] : '';

            if (inString) {
                if (ch === '\\') {
                    result += ch + next;
                    i += 2;
                    continue;
                }
                if (ch === stringChar) {
                    inString = false;
                    stringChar = null;
                }
                result += ch;
                i++;
                continue;
            }

            if (ch === '"' || ch === "'" || ch === "`") {
                inString = true;
                stringChar = ch;
                result += ch;
                i++;
                continue;
            }

            if (ch === '/' && next === '/') {
                // Single-line comment: skip to end of line
                while (i < text.length && text[i] !== '\n') i++;
                result += '\n';
                i++;
                continue;
            }

            if (ch === '/' && next === '*') {
                // Multi-line comment: skip to *​/
                i += 2;
                while (i + 1 < text.length && !(text[i] === '*' && text[i + 1] === '/')) i++;
                i += 2;
                continue;
            }

            result += ch;
            i++;
        }

        return result;
    }

    /**
     * Converts JS object literal syntax to valid JSON.
     * Handles: unquoted keys, single-quoted strings, trailing commas.
     */
    static normalizeToJSON(text) {
        let result = "";
        let i = 0;

        while (i < text.length) {
            const ch = text[i];

            if (ch === "'") {
                // Convert single-quoted string to double-quoted
                let str = '"';
                i++;
                while (i < text.length) {
                    const c = text[i];
                    if (c === '\\') {
                        str += '\\\\';
                        i++;
                    } else if (c === "'") {
                        str += '"';
                        i++;
                        break;
                    } else if (c === '"') {
                        str += '\\"';
                        i++;
                    } else {
                        str += c;
                        i++;
                    }
                }
                result += str;
            } else if (ch === '"') {
                // Keep existing double-quoted strings
                let str = '"';
                i++;
                while (i < text.length) {
                    const c = text[i];
                    str += c;
                    i++;
                    if (c === '\\') {
                        str += text[i] || '';
                        i++;
                    } else if (c === '"') {
                        break;
                    }
                }
                result += str;
            } else if (/[a-zA-Z_$]/.test(ch)) {
                // Check if this is an unquoted key (word followed by ':')
                let word = ch;
                i++;
                while (i < text.length && /[a-zA-Z0-9_$]/.test(text[i])) {
                    word += text[i];
                    i++;
                }
                // Skip whitespace to check for ':'
                let j = i;
                while (j < text.length && /\s/.test(text[j])) j++;
                if (j < text.length && text[j] === ':') {
                    result += '"' + word + '"';
                    i = j;
                } else {
                    result += word;
                }
            } else {
                result += ch;
                i++;
            }
        }

        // Remove trailing commas before closing braces/brackets
        result = result.replace(/,(\s*[}\]])/g, '$1');

        return result;
    }
}

module.exports = CaseExtractor;
