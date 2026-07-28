/**
 * corrected_ew_parser.js — Definitively Correct Choice-Offset-Aware EW Parser
 *
 * MISSION: Every prior scanning tool has been matching ExplanationWrong fields
 * to the wrong item's CorrectChoice because CorrectChoice appears BEFORE QuestionID
 * in each content block. Tools scanning forward from QuestionID find the NEXT item's
 * CorrectChoice, producing a systematic +1 offset error.
 *
 * THIS PARSER uses string-literal-aware brace-matching to extract complete JSON
 * objects, then JSON.parse() each one. Since CorrectChoice and QuestionID are in
 * the SAME object, there is no cross-item contamination risk.
 *
 * DESIGN:
 *   (a) String-literal-aware: tracks inString/escape state, does NOT count {/}
 *       inside quoted strings as object boundaries (DL-020 root cause fix).
 *   (b) Extracts complete JSON objects by brace-counting.
 *   (c) JSON.parse() each object — native, correct, no proximity heuristic.
 *   (d) For each item, reads ExplanationWrong at the exact CorrectChoice letter
 *       and independently checks the other 3 letters.
 *
 * USAGE:
 *   node scripts/corrected_ew_parser.js <pack_file> [--dl008] [--dl026] [--certified-only] [--all]
 *
 * OUTPUT:
 *   JSON array of per-item results to stdout, with summary stats to stderr.
 */

const fs = require('fs');
const path = require('path');

// ─── String-Aware JSON Object Extractor ───────────────────────────────

/**
 * Extract all top-level JSON objects from a JS array assignment like:
 *   const MCQ_BANK_X = [ { ... }, { ... } ];
 *
 * Returns an array of JSON strings (one per object).
 */
function extractObjects(fileContent) {
    // Find the opening bracket of the array
    const arrayStartMatch = fileContent.match(/=\s*\[/);
    if (!arrayStartMatch) {
        throw new Error('Could not find array start pattern "= [" in file content');
    }

    let pos = arrayStartMatch.index + arrayStartMatch[0].length;
    const objects = [];
    const n = fileContent.length;

    while (pos < n) {
        // Skip whitespace and commas
        while (pos < n && /\s/.test(fileContent[pos])) pos++;
        if (pos >= n) break;

        if (fileContent[pos] === ']') break;       // end of array
        if (fileContent[pos] === ',') { pos++; continue; } // skip comma

        if (fileContent[pos] === '{') {
            const startPos = pos;
            let depth = 0;
            let inString = false;
            let stringChar = null;
            let escape = false;

            while (pos < n) {
                const ch = fileContent[pos];

                if (escape) {
                    escape = false;
                    pos++;
                    continue;
                }

                if (inString) {
                    if (ch === '\\') {
                        escape = true;
                    } else if (ch === stringChar) {
                        inString = false;
                        stringChar = null;
                    }
                    pos++;
                    continue;
                }

                // Not in a string — check for string start
                if (ch === '"' || ch === "'") {
                    inString = true;
                    stringChar = ch;
                    pos++;
                    continue;
                }

                // Not in a string — track braces
                if (ch === '{') {
                    depth++;
                } else if (ch === '}') {
                    depth--;
                    if (depth === 0) {
                        pos++; // consume closing brace
                        const objStr = fileContent.substring(startPos, pos);
                        objects.push(objStr);
                        break;
                    }
                }
                pos++;
            }

            if (depth !== 0) {
                throw new Error(`Unbalanced braces at position ${startPos}: depth=${depth} after extraction`);
            }
        } else if (fileContent[pos] === ']') {
            break;
        } else {
            // Unexpected character — skip
            pos++;
        }
    }

    return objects;
}

// ─── Item Analysis ────────────────────────────────────────────────────

/**
 * Parse a single JSON object string and extract the fields we need.
 * Returns null if JSON.parse fails.
 */
function safeParse(jsonStr) {
    // Try strict JSON first
    try {
        return JSON.parse(jsonStr);
    } catch (e1) {
        // Fallback: Function() constructor (handles JS object literals with
        // trailing commas, missing commas, etc.)
        try {
            const fn = new Function('return ' + jsonStr);
            return fn();
        } catch (e2) {
            throw e1; // Report the original JSON error
        }
    }
}

function analyzeItem(objStr, itemIndex) {
    let obj;
    try {
        obj = safeParse(objStr);
    } catch (e) {
        return {
            index: itemIndex,
            parse_error: true,
            error_message: e.message,
            raw_preview: objStr.substring(0, 200)
        };
    }

    const qid = obj.QuestionID || null;
    const cc = obj.CorrectChoice || null;
    const state = obj.question_state || 'MISSING';

    // Get all 4 ExplanationWrong fields
    const ew = {};
    for (const letter of ['A', 'B', 'C', 'D']) {
        const key = 'ExplanationWrong' + letter;
        const val = obj[key];
        if (val === undefined) {
            ew[letter] = { status: 'absent', value: null };
        } else if (val === '' || val === null) {
            ew[letter] = { status: 'empty', value: '' };
        } else {
            ew[letter] = { status: 'populated', value: val };
        }
    }

    // Identify CC slot and non-CC slots
    let ccSlot = null;
    const nonCCSlots = [];
    const emptyNonCCSlots = [];

    for (const letter of ['A', 'B', 'C', 'D']) {
        if (letter === cc) {
            ccSlot = {
                letter: cc,
                status: ew[letter].status,
                value_preview: ew[letter].value ? ew[letter].value.substring(0, 100) : null
            };
        } else {
            nonCCSlots.push(letter);
            if (ew[letter].status === 'empty' || ew[letter].status === 'absent') {
                emptyNonCCSlots.push({
                    letter: letter,
                    status: ew[letter].status
                });
            }
        }
    }

    return {
        index: itemIndex,
        QuestionID: qid,
        CorrectChoice: cc,
        question_state: state,
        ew_A: ew['A'].status,
        ew_B: ew['B'].status,
        ew_C: ew['C'].status,
        ew_D: ew['D'].status,
        cc_slot: ccSlot,
        non_cc_slots_status: {
            A: ew['A'].status,
            B: ew['B'].status,
            C: ew['C'].status,
            D: ew['D'].status
        },
        empty_non_cc_slots: emptyNonCCSlots,
        dl008: ccSlot && (ccSlot.status === 'populated'),
        dl026: emptyNonCCSlots.length > 0,
        dl026_count: emptyNonCCSlots.length
    };
}

// ─── Main ─────────────────────────────────────────────────────────────

function main() {
    const args = process.argv.slice(2);

    if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
        console.error('Usage: node scripts/corrected_ew_parser.js <pack_file> [options]');
        console.error('');
        console.error('Options:');
        console.error('  --dl008          Show only DL-008 items (non-empty EW at CC position)');
        console.error('  --dl026          Show only DL-026 items (empty/absent non-CC EW slots)');
        console.error('  --certified-only  Filter to Certified items only');
        console.error('  --all             Show all items (default: summary only)');
        console.error('  --qids-only       Output only QuestionID list (for piping)');
        console.error('  --json            Output full JSON (default if piping)');
        process.exit(1);
    }

    const filePath = args[0];
    const showDl008 = args.includes('--dl008');
    const showDl026 = args.includes('--dl026');
    const certifiedOnly = args.includes('--certified-only');
    const showAll = args.includes('--all');
    const qidsOnly = args.includes('--qids-only');
    const jsonOutput = args.includes('--json');

    if (!fs.existsSync(filePath)) {
        console.error(`ERROR: File not found: ${filePath}`);
        process.exit(1);
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const objStrings = extractObjects(content);

    console.error(`Extracted ${objStrings.length} objects from ${path.basename(filePath)}`);

    const results = [];
    let parseErrors = 0;

    for (let i = 0; i < objStrings.length; i++) {
        const result = analyzeItem(objStrings[i], i);
        if (result.parse_error) {
            parseErrors++;
            if (parseErrors <= 5) {
                console.error(`  Parse error at index ${i}: ${result.error_message}`);
            }
        }
        results.push(result);
    }

    if (parseErrors > 0) {
        console.error(`WARNING: ${parseErrors} parse errors out of ${results.length} objects`);
    }

    // Filter results
    let filtered = results;
    if (certifiedOnly) {
        filtered = filtered.filter(r => r.question_state === 'Certified');
        console.error(`Filtered to Certified: ${filtered.length} items`);
    }
    if (showDl008) {
        filtered = filtered.filter(r => r.dl008);
        console.error(`DL-008 items: ${filtered.length}`);
    }
    if (showDl026) {
        filtered = filtered.filter(r => r.dl026);
        console.error(`DL-026 items: ${filtered.length}`);
    }
    if (!showDl008 && !showDl026 && !showAll && !qidsOnly) {
        // Summary only mode
        const totalDL008 = results.filter(r => r.dl008).length;
        const totalDL026 = results.filter(r => r.dl026).length;
        const totalCertified = results.filter(r => r.question_state === 'Certified').length;
        const certifiedDL008 = results.filter(r => r.question_state === 'Certified' && r.dl008).length;
        const certifiedDL026 = results.filter(r => r.question_state === 'Certified' && r.dl026).length;

        console.error('');
        console.error('=== SUMMARY ===');
        console.error(`Total items:              ${results.length}`);
        console.error(`Total Certified:          ${totalCertified}`);
        console.error(`Parse errors:             ${parseErrors}`);
        console.error('');
        console.error(`DL-008 (all states):      ${totalDL008}`);
        console.error(`DL-008 (Certified only):  ${certifiedDL008}`);
        console.error(`DL-026 (all states):      ${totalDL026}`);
        console.error(`DL-026 (Certified only):  ${certifiedDL026}`);
        console.error('');

        if (qidsOnly) {
            // Output QIDs for all DL-008 and DL-026 items
        } else {
            // Output DL-008 QIDs
            if (totalDL008 > 0) {
                console.error('=== DL-008 QIDs ===');
                for (const r of results.filter(r => r.dl008)) {
                    console.log(`${r.QuestionID}  CC=${r.CorrectChoice}  state=${r.question_state}  EW_${r.CorrectChoice}=${r.cc_slot.status}`);
                }
            }
            // Output DL-026 QIDs
            if (totalDL026 > 0) {
                console.error('=== DL-026 QIDs ===');
                for (const r of results.filter(r => r.dl026)) {
                    const emptySlots = r.empty_non_cc_slots.map(s => `EW_${s.letter}=${s.status}`).join(', ');
                    console.log(`${r.QuestionID}  CC=${r.CorrectChoice}  state=${r.question_state}  ${emptySlots}`);
                }
            }
        }
        return;
    }

    // Output filtered results
    if (qidsOnly) {
        for (const r of filtered) {
            console.log(r.QuestionID);
        }
    } else {
        for (const r of filtered) {
            if (jsonOutput) {
                console.log(JSON.stringify(r));
            } else {
                const parts = [
                    r.QuestionID || `index_${r.index}`,
                    `CC=${r.CorrectChoice}`,
                    `state=${r.question_state}`,
                    `EW_A=${r.ew_A}`,
                    `EW_B=${r.ew_B}`,
                    `EW_C=${r.ew_C}`,
                    `EW_D=${r.ew_D}`,
                ];
                if (r.dl008) parts.push('DL008');
                if (r.dl026) {
                    const emptySlots = r.empty_non_cc_slots.map(s => s.letter).join('');
                    parts.push(`DL026(${emptySlots})`);
                }
                console.log(parts.join('  '));
            }
        }
    }
}

main();
