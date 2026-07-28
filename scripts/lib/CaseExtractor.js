const fs = require("fs");

class CaseExtractor {
    /**
     * Extracts case arrays from a JS case bank file.
     * Handles formats:
     *   const ENHANCED_CASE_BASE = [{...}, ...];
     *   const ENHANCED_CASE_BASE2 = [{...}, ...];
     *   const SCORED_CASES = [{...}, ...];
     */
    static extractCases(filePath) {
        if (!fs.existsSync(filePath)) return null;
        const content = fs.readFileSync(filePath, "utf8");
        return CaseExtractor.extractFromContent(content);
    }

    static extractFromContent(content) {
        try {
            // Find the array assignment pattern
            const patterns = [
                /const\s+ENHANCED_CASE_BASE\d*\s*=\s*(\[)/,
                /const\s+SCORED_CASES\s*=\s*(\[)/,
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

            if (startIdx === -1) return null;

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

            if (endIdx === -1) return null;

            let arrayText = content.substring(startIdx, endIdx + 1);

            // Strip JS comments
            arrayText = CaseExtractor.stripComments(arrayText);

            // Convert JS to JSON
            arrayText = CaseExtractor.normalizeToJSON(arrayText);

            const parsed = JSON.parse(arrayText);
            return Array.isArray(parsed) ? parsed : [parsed];
        } catch (e) {
            return null;
        }
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
