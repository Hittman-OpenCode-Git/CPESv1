/**
 * structural_audit.js
 * Reads every question in every pack against QUESTION_PACK_STRUCTURAL_STANDARD.md.
 * Report-only mode — makes no modifications.
 *
 * Usage: node scripts/structural_audit.js
 * Output: reports/STRUCTURAL_AUDIT.md
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PACKS = [
    { file: 'pack_a_corrected.js', varName: 'MCQ_BANK_A' },
    { file: 'pack_b_corrected.js', varName: 'MCQ_BANK_B' },
    { file: 'pack_c_corrected.js', varName: 'MCQ_BANK_C' },
    { file: 'pack_d_corrected.js', varName: 'MCQ_BANK_D' },
    { file: 'pack_e_corrected.js', varName: 'MCQ_BANK_E' }
];

const CASE_PATTERNS = [
    { file: 'pack_a_corrected.js', varName: 'CASE_BANK_A' },
    { file: 'pack_b_corrected.js', varName: 'CASE_BANK_B' },
    { file: 'pack_c_corrected.js', varName: 'CASE_BANK_C' },
    { file: 'pack_d_corrected.js', varName: 'CASE_BANK_D' },
    { file: 'pack_e_corrected.js', varName: 'CASE_BANK_E' }
];

const VALID_DIFFICULTY = ['Easy', 'Moderate', 'Difficult', 'Very Difficult'];
const VALID_SECTIONS = ['A', 'B', 'C', 'D', 'E', 'F'];
const VALID_ITEM_TYPES = ['numeric', 'select', 'multi', 'fill', 'match'];
const VALID_COGNITIVE_LEVELS = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate'];
const VALID_PRODUCTION_STATUS = ['Draft', 'Review', 'QA', 'Production', 'Retired'];

// Batch 1 Exam-Ready questions for retro-check
const BATCH1_EXAM_READY = ['P1B-A-107', 'P1B-A-114', 'P1B-A-128', 'P1E-A-003', 'P1E-A-027', 'P1E-A-032', 'P1E-A-043'];

// ============================================================
// Question extractor (same strategy as ExplanationValidator)
// ============================================================
function extractArray(content, varName) {
    const re = new RegExp(`(?:const|let|var)\\s+${varName}\\s*=\\s*\\[`, 'm');
    const varMatch = content.match(re);
    if (!varMatch) return null;
    const arrStart = content.indexOf('[', varMatch.index);
    let depth = 0, pos = arrStart;
    do {
        if (content[pos] === '[') depth++;
        if (content[pos] === ']') depth--;
        pos++;
    } while (depth > 0 && pos < content.length);
    const jsStr = content.substring(arrStart, pos);
    try { return JSON.parse(jsStr); } catch (e) {
        try {
            const fn = new Function('return (' + jsStr + ')');
            return fn();
        } catch (e2) { return null; }
    }
}

function extractCaseArray(content, varName) {
    return extractArray(content, varName);
}

// ============================================================
// Structural audit rules
// ============================================================
class StructuralAuditor {
    constructor() {
        this.defects = [];
    }

    addDefect(qid, pack, ruleId, severity, field, message) {
        this.defects.push({ qid, pack, ruleId, severity, field, message });
    }

    auditMCQ(q, pack) {
        const qid = q.QuestionID || '?';

        // R1: Part must be 1
        if (q.Part === undefined || q.Part === null) this.addDefect(qid, pack, 'R1', 'Error', 'Part', 'Missing');
        else if (q.Part !== 1) this.addDefect(qid, pack, 'R1', 'Error', 'Part', `Expected 1, got ${q.Part}`);

        // R2: Section must be A-F
        if (q.Section === undefined || q.Section === null) this.addDefect(qid, pack, 'R2', 'Error', 'Section', 'Missing');
        else if (!VALID_SECTIONS.includes(q.Section)) this.addDefect(qid, pack, 'R2', 'Error', 'Section', `Invalid: "${q.Section}"`);

        // R4: Topic non-empty
        if (!q.Topic || String(q.Topic).trim() === '') this.addDefect(qid, pack, 'R4', 'Error', 'Topic', 'Empty or missing');

        // R5: MicroTopic non-empty
        if (!q.MicroTopic || String(q.MicroTopic).trim() === '') this.addDefect(qid, pack, 'R5', 'Warning', 'MicroTopic', 'Empty or missing');

        // R6: UniqueConceptKey pattern — handles all observed formats
        if (q.UniqueConceptKey) {
            if (!/^[A-Z](?:-[A-Z])?-?\d{3,4}-[A-Za-z0-9-]+$/.test(q.UniqueConceptKey)) {
                this.addDefect(qid, pack, 'R6', 'Warning', 'UniqueConceptKey', `Format mismatch: "${q.UniqueConceptKey}"`);
            }
        } else {
            this.addDefect(qid, pack, 'R6', 'Warning', 'UniqueConceptKey', 'Missing');
        }

        // R7: LOSTag should start with CMA-section.LOS or LOS: (non-standard → Info)
        if (q.LOSTag) {
            if (!/^(?:[A-F]\.\d|LOS:)/.test(q.LOSTag)) {
                this.addDefect(qid, pack, 'R7', 'Info', 'LOSTag', `Non-standard format: "${q.LOSTag}"`);
            }
        } else {
            this.addDefect(qid, pack, 'R7', 'Warning', 'LOSTag', 'Missing');
        }

        // R8: Difficulty enum
        if (q.Difficulty) {
            if (!VALID_DIFFICULTY.includes(q.Difficulty)) {
                this.addDefect(qid, pack, 'R8', 'Error', 'Difficulty', `Invalid: "${q.Difficulty}"`);
            }
        } else {
            this.addDefect(qid, pack, 'R8', 'Error', 'Difficulty', 'Missing');
        }

        // R9: ItemType must be MCQ
        if (q.ItemType && q.ItemType !== 'MCQ') {
            this.addDefect(qid, pack, 'R9', 'Error', 'ItemType', `Expected "MCQ", got "${q.ItemType}"`);
        }

        // R10: ItemStyle must be single-select
        if (q.ItemStyle && q.ItemStyle !== 'single-select') {
            this.addDefect(qid, pack, 'R10', 'Warning', 'ItemStyle', `Expected "single-select", got "${q.ItemStyle}"`);
        }

        // R11: Stem
        if (!q.Stem || String(q.Stem).trim() === '') {
            this.addDefect(qid, pack, 'R11', 'Error', 'Stem', 'Empty or missing');
        }

        // R12: Choices must have exactly 4 keys
        if (q.Choices) {
            const keys = Object.keys(q.Choices);
            const expected = ['A', 'B', 'C', 'D'];
            if (keys.length !== 4) {
                this.addDefect(qid, pack, 'R12', 'Warning', 'Choices', `Expected 4 choices, got ${keys.length}: [${keys.join(',')}]`);
            }
            for (const k of expected) {
                if (!q.Choices[k] || String(q.Choices[k]).trim() === '') {
                    this.addDefect(qid, pack, 'R12', 'Error', `Choices.${k}`, 'Empty or missing');
                }
            }
        } else {
            this.addDefect(qid, pack, 'R12', 'Error', 'Choices', 'Missing');
        }

        // R13: CorrectChoice
        if (q.CorrectChoice) {
            if (!['A', 'B', 'C', 'D'].includes(q.CorrectChoice)) {
                this.addDefect(qid, pack, 'R13', 'Error', 'CorrectChoice', `Invalid: "${q.CorrectChoice}"`);
            } else if (q.Choices && !q.Choices[q.CorrectChoice]) {
                this.addDefect(qid, pack, 'R13', 'Error', 'CorrectChoice', `References non-existent Choice key "${q.CorrectChoice}"`);
            }
        } else {
            this.addDefect(qid, pack, 'R13', 'Error', 'CorrectChoice', 'Missing');
        }

        // R14: ExplanationCorrect
        if (!q.ExplanationCorrect || String(q.ExplanationCorrect).trim() === '') {
            this.addDefect(qid, pack, 'R14', 'Error', 'ExplanationCorrect', 'Empty or missing');
        } else if (String(q.ExplanationCorrect).length < 50) {
            this.addDefect(qid, pack, 'R14', 'Warning', 'ExplanationCorrect', `Short (${String(q.ExplanationCorrect).length} chars, min 50)`);
        }

        // E3/E8: ExplanationWrong[CorrectChoice] must be empty
        if (q.CorrectChoice && ['A', 'B', 'C', 'D'].includes(q.CorrectChoice)) {
            const field = 'ExplanationWrong' + q.CorrectChoice;
            const val = q[field];
            if (val !== undefined && val !== null && String(val).trim() !== '') {
                this.addDefect(qid, pack, 'E3', 'Warning', field, `Non-empty (${String(val).length} chars). Must be "" per EV8. DL-008.`);
            }
        }

        // E1: Short distractor explanations (non-correct slots)
        if (q.CorrectChoice) {
            ['A', 'B', 'C', 'D'].forEach(letter => {
                if (letter === q.CorrectChoice) return;
                const field = 'ExplanationWrong' + letter;
                const val = q[field];
                if (val && String(val).length > 0 && String(val).length < 50) {
                    this.addDefect(qid, pack, 'E1', 'Warning', field, `Short (${String(val).length} chars, min 50)`);
                }
            });
        }

        // E2: Placeholder detection
        if (q.ExplanationCorrect) {
            this.checkPlaceholders(qid, pack, 'ExplanationCorrect', q.ExplanationCorrect);
        }
        ['A', 'B', 'C', 'D'].forEach(letter => {
            const field = 'ExplanationWrong' + letter;
            if (q[field]) this.checkPlaceholders(qid, pack, field, q[field]);
        });

        // E5: Uncertain language
        ['ExplanationCorrect', 'ExplanationWrongA', 'ExplanationWrongB', 'ExplanationWrongC', 'ExplanationWrongD'].forEach(field => {
            const val = q[field];
            if (val && typeof val === 'string') {
                if (/\bI think\b/i.test(val)) this.addDefect(qid, pack, 'E5', 'Warning', field, 'Contains "I think"');
                if (/\bprobably\b/i.test(val)) this.addDefect(qid, pack, 'E5', 'Warning', field, 'Contains "probably"');
                if (/\bmaybe\b/i.test(val)) this.addDefect(qid, pack, 'E5', 'Warning', field, 'Contains "maybe"');
            }
        });

        // R23: QuestionID pattern (handles P1-A-001, P1B-A-076, P1-AC-001, P1E-A-001)
        if (q.QuestionID) {
            if (!/^P1[A-Z]?-[A-Z]{1,2}-\d{3}$/.test(q.QuestionID)) {
                this.addDefect(qid, pack, 'R23', 'Warning', 'QuestionID', `Format mismatch: "${q.QuestionID}"`);
            }
        } else {
            this.addDefect(qid, pack, 'R23', 'Error', 'QuestionID', 'Missing');
        }

        // R24: CalculationItem must be boolean
        if (q.CalculationItem !== undefined && typeof q.CalculationItem !== 'boolean') {
            this.addDefect(qid, pack, 'R24', 'Warning', 'CalculationItem', `Expected boolean, got ${typeof q.CalculationItem}`);
        }

        // R25: VerifiedChecks
        if (q.VerifiedChecks) {
            if (!Array.isArray(q.VerifiedChecks)) {
                this.addDefect(qid, pack, 'R25', 'Warning', 'VerifiedChecks', 'Not an array');
            } else if (q.VerifiedChecks.some(c => !c || String(c).trim() === '')) {
                this.addDefect(qid, pack, 'R25', 'Warning', 'VerifiedChecks', 'Contains empty strings');
            }
        } else {
            this.addDefect(qid, pack, 'R25', 'Info', 'VerifiedChecks', 'Missing (optional)');
        }

        // R20: SourceDescription
        if (!q.SourceDescription || String(q.SourceDescription).trim() === '') {
            this.addDefect(qid, pack, 'R20', 'Warning', 'SourceDescription', 'Empty or missing');
        }

        // R21: Part1OnlyFlag
        if (q.Part1OnlyFlag !== undefined && typeof q.Part1OnlyFlag !== 'boolean') {
            this.addDefect(qid, pack, 'R21', 'Warning', 'Part1OnlyFlag', `Expected boolean, got ${typeof q.Part1OnlyFlag}`);
        }

        // R22: ReviewNote
        if (!q.ReviewNote || String(q.ReviewNote).trim() === '') {
            this.addDefect(qid, pack, 'R22', 'Info', 'ReviewNote', 'Empty or missing (optional)');
        }

        // R19: StudyLinks
        if (q.StudyLinks) {
            if (!Array.isArray(q.StudyLinks)) {
                this.addDefect(qid, pack, 'R19', 'Warning', 'StudyLinks', 'Not an array');
            } else {
                q.StudyLinks.forEach((sl, i) => {
                    if (!sl.label || !sl.url) {
                        this.addDefect(qid, pack, 'R19', 'Warning', `StudyLinks[${i}]`, 'Missing label or url');
                    }
                });
            }
        }

        // X2: Section matches QuestionID
        if (q.QuestionID && q.Section) {
            const sectionMatch = q.QuestionID.match(/-([A-Z])-/);
            if (sectionMatch && sectionMatch[1] !== q.Section) {
                this.addDefect(qid, pack, 'X2', 'Warning', 'Section', `QuestionID suggests section "${sectionMatch[1]}", but Section="${q.Section}"`);
            }
        }

        // R8 (Difficulty-score consistency is informational)
        if (q.Difficulty && q.DifficultyScore !== undefined) {
            const diffMap = { 'Easy': 1, 'Moderate-Easy': 2, 'Moderate': 3, 'Difficult': 4, 'Very Difficult': 5 };
            // If Difficulty is a standard value but we don't have a DifficultyScore enum match
        }
    }

    checkPlaceholders(qid, pack, field, text) {
        const val = String(text);
        const patterns = [
            { re: /This is the correct choice/i, label: '"This is the correct choice"' },
            { re: /Plausible distractor/i, label: '"Plausible distractor"' },
            { re: /Common misunderstanding/i, label: '"Common misunderstanding"' },
            { re: /This answer is correct because it is correct/i, label: '"This answer is correct because it is correct"' }
        ];
        for (const p of patterns) {
            if (p.re.test(val)) {
                this.addDefect(qid, pack, 'E2', 'Error', field, `Contains placeholder pattern ${p.label}`);
            }
        }
    }

    auditCase(c, pack) {
        const caseId = c.CaseID || '?';
        // C1: CaseID
        if (!caseId) this.addDefect(caseId, pack, 'C1', 'Error', 'CaseID', 'Missing');

        // C2: Title
        if (!c.Title || String(c.Title).trim() === '') this.addDefect(caseId, pack, 'C2', 'Error', 'Title', 'Missing');

        // C3: SectionTags
        if (c.SectionTags) {
            if (!Array.isArray(c.SectionTags)) {
                this.addDefect(caseId, pack, 'C3', 'Error', 'SectionTags', 'Not an array');
            } else {
                c.SectionTags.forEach((tag, i) => {
                    if (!VALID_SECTIONS.includes(tag)) {
                        this.addDefect(caseId, pack, 'C3', 'Warning', `SectionTags[${i}]`, `Invalid tag "${tag}"`);
                    }
                });
                if (c.SectionTags.length > 2) {
                    this.addDefect(caseId, pack, 'C3', 'Warning', 'SectionTags', `Expected 1-2 tags, got ${c.SectionTags.length}`);
                }
            }
        }

        // C4: EstimatedMinutes
        if (c.EstimatedMinutes !== undefined && (!Number.isInteger(c.EstimatedMinutes) || c.EstimatedMinutes < 1)) {
            this.addDefect(caseId, pack, 'C4', 'Warning', 'EstimatedMinutes', `Expected positive integer, got ${c.EstimatedMinutes}`);
        }

        // C5: ScenarioText
        if (!c.ScenarioText || String(c.ScenarioText).trim() === '') {
            this.addDefect(caseId, pack, 'C5', 'Error', 'ScenarioText', 'Missing');
        }

        // C6: Items
        if (!c.Items || !Array.isArray(c.Items)) {
            this.addDefect(caseId, pack, 'C6', 'Error', 'Items', 'Missing or not an array');
        } else if (c.Items.length === 0) {
            this.addDefect(caseId, pack, 'C6', 'Warning', 'Items', 'Empty array');
        } else {
            c.Items.forEach((item, i) => {
                const prefix = `${caseId}-I${i}`;
                // I1: Type
                if (item.Type && !VALID_ITEM_TYPES.includes(item.Type)) {
                    this.addDefect(prefix, pack, 'I1', 'Error', `Items[${i}].Type`, `Invalid type "${item.Type}"`);
                }
                // I2: Prompt
                if (!item.Prompt || String(item.Prompt).trim() === '') {
                    this.addDefect(prefix, pack, 'I2', 'Error', `Items[${i}].Prompt`, 'Missing');
                }
                // I3: Correct
                if (item.Correct === undefined || item.Correct === null) {
                    this.addDefect(prefix, pack, 'I3', 'Error', `Items[${i}].Correct`, 'Missing');
                }
                // I4: Explanation
                if (!item.Explanation || String(item.Explanation).trim() === '') {
                    this.addDefect(prefix, pack, 'I4', 'Error', `Items[${i}].Explanation`, 'Missing');
                } else if (String(item.Explanation).length < 50) {
                    this.addDefect(prefix, pack, 'I4', 'Warning', `Items[${i}].Explanation`, `Short (${String(item.Explanation).length} chars)`);
                }
                // I5: Topic
                if (!item.Topic || String(item.Topic).trim() === '') {
                    this.addDefect(prefix, pack, 'I5', 'Warning', `Items[${i}].Topic`, 'Missing');
                }
                // I6: Choices for select/multi
                if ((item.Type === 'select' || item.Type === 'multi') && (!item.Choices || !Array.isArray(item.Choices) || item.Choices.length < 3)) {
                    this.addDefect(prefix, pack, 'I6', 'Error', `Items[${i}].Choices`, `Expected 3-6 choices for type "${item.Type}"`);
                }
            });
        }
    }
}

// ============================================================
// Main
// ============================================================
function main() {
    const auditor = new StructuralAuditor();
    const mcqCounts = {};
    const caseCounts = {};
    let totalMCQs = 0;
    let totalCases = 0;
    let totalCaseItems = 0;

    // Audit MCQ packs
    for (const { file, varName } of PACKS) {
        const fullPath = path.join(ROOT, file);
        if (!fs.existsSync(fullPath)) { console.error(`Not found: ${file}`); continue; }
        const content = fs.readFileSync(fullPath, 'utf8');
        const questions = extractArray(content, varName);
        if (!questions) { console.error(`Could not extract ${varName} from ${file}`); continue; }
        mcqCounts[file] = questions.length;
        totalMCQs += questions.length;
        questions.forEach(q => auditor.auditMCQ(q, file));
    }

    // Audit case banks
    for (const { file, varName } of CASE_PATTERNS) {
        const fullPath = path.join(ROOT, file);
        if (!fs.existsSync(fullPath)) continue;
        const content = fs.readFileSync(fullPath, 'utf8');
        const cases = extractCaseArray(content, varName);
        if (!cases) continue;
        caseCounts[file] = cases.length;
        totalCases += cases.length;
        cases.forEach(c => {
            auditor.auditCase(c, file);
            if (c.Items) totalCaseItems += c.Items.length;
        });
    }

    // ============================================================
    // Batch 1 retro-check — identify Exam-Ready questions
    // ============================================================
    const batch1Defects = auditor.defects.filter(d => BATCH1_EXAM_READY.includes(d.qid));
    const batch1Set = new Set(batch1Defects.map(d => d.qid));

    // ============================================================
    // Build report
    // ============================================================
    const severityOrder = { Error: 0, Warning: 1, Info: 2 };
    const sortedDefects = [...auditor.defects].sort((a, b) => {
        const sev = severityOrder[a.severity] - severityOrder[b.severity];
        if (sev !== 0) return sev;
        return a.qid.localeCompare(b.qid);
    });

    // By pack
    const byPack = {};
    const byRule = {};
    const bySeverity = { Error: 0, Warning: 0, Info: 0 };
    for (const d of sortedDefects) {
        byPack[d.pack] = (byPack[d.pack] || 0) + 1;
        byRule[d.ruleId] = (byRule[d.ruleId] || 0) + 1;
        bySeverity[d.severity]++;
    }

    let report = `# Structural Audit Report\n\n`;
    report += `**Date:** ${new Date().toISOString().split('T')[0]}\n`;
    report += `**Standard:** QUESTION_PACK_STRUCTURAL_STANDARD.md v1.0\n`;
    report += `**Scope:** ${totalMCQs} MCQs across ${Object.keys(mcqCounts).length} packs + ${totalCases} cases (${totalCaseItems} items)\n\n`;

    // Summary
    report += `## Summary\n\n`;
    report += `| Metric | Value |\n`;
    report += `|--------|-------|\n`;
    report += `| Total Defects | ${sortedDefects.length} |\n`;
    report += `| Errors | ${bySeverity.Error} |\n`;
    report += `| Warnings | ${bySeverity.Warning} |\n`;
    report += `| Infos | ${bySeverity.Info} |\n`;
    report += `| MCQs Scanned | ${totalMCQs} |\n`;
    report += `| Cases Scanned | ${totalCases} |\n`;
    report += `| Case Items Scanned | ${totalCaseItems} |\n\n`;

    // By pack
    report += `### By Pack\n\n`;
    report += `| Pack | MCQs | Defects | Defects/MCQ |\n`;
    report += `|------|------|---------|-------------|\n`;
    for (const { file } of PACKS) {
        const count = mcqCounts[file] || 0;
        const defects = byPack[file] || 0;
        const ratio = count > 0 ? (defects / count).toFixed(2) : '-';
        report += `| ${file} | ${count} | ${defects} | ${ratio} |\n`;
    }
    // Case banks
    for (const { file, varName } of CASE_PATTERNS) {
        const count = caseCounts[file] || 0;
        if (count > 0) {
            const defects = byPack[file] || 0;
            report += `| ${file} (cases) | ${count} cases | ${defects} | - |\n`;
        }
    }
    report += '\n';

    // By defect type (rule)
    report += `### By Defect Type (Rule)\n\n`;
    report += `| Rule | Severity | Count | Description |\n`;
    report += `|------|----------|-------|-------------|\n`;
    const ruleDescriptions = {
        'R1': 'Part must be 1', 'R2': 'Section must be A-F', 'R4': 'Topic non-empty',
        'R5': 'MicroTopic non-empty', 'R6': 'UniqueConceptKey format',         'R7': 'LOSTag must start with section.number or LOS:',
        'R8': 'Difficulty enum', 'R9': 'ItemType MCQ', 'R10': 'ItemStyle single-select',
        'R11': 'Stem non-empty', 'R12': 'Choices 4 keys', 'R13': 'CorrectChoice valid',
        'R14': 'ExplanationCorrect min 50 chars', 'R19': 'StudyLinks array',
        'R20': 'SourceDescription', 'R21': 'Part1OnlyFlag boolean', 'R22': 'ReviewNote',
        'R23': 'QuestionID format', 'R24': 'CalculationItem boolean', 'R25': 'VerifiedChecks array',
        'E1': 'Explanation min 50 chars', 'E2': 'No placeholder phrases',
        'E3/E8': 'ExplanationWrong[CorrectChoice] must be empty (DL-008)',
        'E5': 'No uncertain language', 'X2': 'Section matches QuestionID',
        'C1': 'CaseID present', 'C2': 'Title present', 'C3': 'SectionTags valid',
        'C4': 'EstimatedMinutes integer', 'C5': 'ScenarioText present',
        'C6': 'Items array', 'I1': 'Item Type valid', 'I2': 'Item Prompt present',
        'I3': 'Item Correct present', 'I4': 'Item Explanation min 50 chars',
        'I5': 'Item Topic present', 'I6': 'Choices for select/multi'
    };
    // Sort rules by count descending
    const sortedRules = Object.entries(byRule).sort((a, b) => b[1] - a[1]);
    for (const [rule, count] of sortedRules) {
        const sev = sortedDefects.find(d => d.ruleId === rule)?.severity || '?';
        const desc = ruleDescriptions[rule] || rule;
        report += `| ${rule} | ${sev} | ${count} | ${desc} |\n`;
    }
    report += '\n';

    // By severity
    report += `### By Severity\n\n`;
    report += `| Severity | Count |\n`;
    report += `|----------|-------|\n`;
    for (const [sev, count] of Object.entries(bySeverity)) {
        if (count > 0) report += `| ${sev} | ${count} |\n`;
    }
    report += '\n';

    // Batch 1 retro-check
    report += `## Batch 1 Retro-Check\n\n`;
    report += `**Exam-Ready questions audited:** ${BATCH1_EXAM_READY.join(', ')}\n\n`;
    if (batch1Defects.length === 0) {
        report += `✅ All ${BATCH1_EXAM_READY.length} Batch 1 Exam-Ready questions are structurally sound. Zero structural defects.\n\n`;
    } else {
        report += `⚠️ ${batch1Defects.length} structural defect(s) found across ${batch1Set.size} Batch 1 question(s):\n\n`;
        for (const d of batch1Defects) {
            report += `- ${d.qid}: [${d.severity}] ${d.ruleId} — ${d.field}: ${d.message}\n`;
        }
        report += '\n';
    }

    // Per-question detail (only non-empty)
    report += `## Per-Question Detail\n\n`;
    let currentQid = '';
    for (const d of sortedDefects) {
        if (d.qid !== currentQid) {
            report += `### ${d.qid}\n\n`;
            currentQid = d.qid;
        }
        report += `- [${d.severity}] ${d.ruleId} — ${d.pack} — ${d.field}: ${d.message}\n`;
    }
    report += '\n';

    // Write report
    const reportPath = path.join(ROOT, 'reports', 'STRUCTURAL_AUDIT.md');
    fs.writeFileSync(reportPath, report, 'utf8');
    console.log(`Structural audit complete.`);
    console.log(`  MCQs scanned: ${totalMCQs}`);
    console.log(`  Cases scanned: ${totalCases} (${totalCaseItems} items)`);
    console.log(`  Total defects: ${sortedDefects.length}`);
    console.log(`    Errors:   ${bySeverity.Error}`);
    console.log(`    Warnings: ${bySeverity.Warning}`);
    console.log(`    Infos:    ${bySeverity.Info}`);
    console.log(`  Batch 1 Exam-Ready questions: ${BATCH1_EXAM_READY.length}`);
    console.log(`  Batch 1 structural defects: ${batch1Defects.length}`);
    if (batch1Set.size > 0) {
        console.log(`  Affected Batch 1 QIDs: ${[...batch1Set].join(', ')}`);
    }
    console.log(`\nReport written to: reports/STRUCTURAL_AUDIT.md`);
}

main();
