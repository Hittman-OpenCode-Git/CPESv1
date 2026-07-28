const fs = require("fs");
const path = require("path");
const config = require("../config");

/**
 * Reconstructs case bank JS files by re-serializing all cases with metadata.
 * This is a complete rewrite approach to fix the broken metadata insertion.
 */
class FileReconstructor {
    static reconstructAll() {
        const root = config.paths.root;
        const banks = config.caseBanks;
        const gs = require("./MetadataMigrator");

        banks.forEach(file => {
            const filePath = path.join(root, file);
            if (!fs.existsSync(filePath)) {
                console.log(`File not found: ${file}`);
                return;
            }
            FileReconstructor.reconstructFile(filePath, gs);
        });
    }

    static reconstructFile(filePath, gs) {
        console.log(`Reconstructing: ${path.basename(filePath)}`);

        // Extract cases using CaseExtractor
        const CaseExtractor = require("./CaseExtractor");
        const content = fs.readFileSync(filePath, "utf8");

        // First, strip all comments from the file
        const cleanContent = CaseExtractor.stripComments(content);

        // Re-extract with the clean content
        const cases = CaseExtractor.extractFromContent(cleanContent);
        if (!cases || cases.length === 0) {
            // Try original content
            const cases2 = CaseExtractor.extractFromContent(content);
            if (!cases2 || cases2.length === 0) {
                console.log(`  ERROR: Cannot extract cases from ${path.basename(filePath)}`);
                return;
            }
            console.log(`  Found ${cases2.length} cases (using original content)`);
            FileReconstructor.writeFile(filePath, content, cases2, gs);
        } else {
            console.log(`  Found ${cases.length} cases`);
            FileReconstructor.writeFile(filePath, content, cases, gs);
        }
    }

    static writeFile(filePath, originalContent, cases, gs) {
        // Read the file header (everything before the first array)
        const arrayMatch = originalContent.match(/(const\s+\w+\s*=\s*\[)/);
        if (!arrayMatch) {
            console.log(`  ERROR: Cannot find array declaration in ${path.basename(filePath)}`);
            return;
        }

        const headerEnd = arrayMatch.index + arrayMatch[0].length;
        const header = originalContent.substring(0, headerEnd);

        // Find the file footer (everything after the last closing bracket of the array)
        let footer = "";
        const arrayEndIdx = FileReconstructor.findArrayEnd(originalContent, headerEnd);
        if (arrayEndIdx > 0) {
            footer = originalContent.substring(arrayEndIdx + 1).trimEnd();
        }

        // Build the new file content
        const lines = [header];

        // Determine indentation from original file
        const sampleLine = originalContent.split("\n").find(l => l.trim().startsWith("{"));
        const indent = sampleLine ? sampleLine.match(/^(\s*)/)[1] : "  ";

        cases.forEach((c, idx) => {
            const comma = idx < cases.length - 1 ? "," : "";
            const meta = gs.deriveMetadata(c);
            lines.push("");
            lines.push(FileReconstructor.serializeCase(c, meta, indent, comma));
        });

        lines.push("");

        // Add any remaining footer content (functions, exports, etc.)
        if (footer) {
            lines.push(footer);
        }

        const newContent = lines.join("\n");
        fs.writeFileSync(filePath, newContent, "utf8");
        console.log(`  Written: ${lines.length} lines`);
    }

    static serializeCase(c, meta, indent, comma) {
        const pad = indent;
        const itemPad = indent + "  ";
        const lines = [];

        lines.push(`${pad}{`);

        // Original fields first
        lines.push(`${itemPad}CaseID: '${escapeJS(c.CaseID)}',`);

        // Insert metadata fields after CaseID
        const metaLines = [];
        metaLines.push(`BlueprintDomain: '${escapeJS(meta.BlueprintDomain)}',`);
        metaLines.push(`BlueprintObjectives: [${meta.BlueprintObjectives.slice(0, 5).map(o => "'" + escapeJS(o) + "'").join(", ")}],`);
        metaLines.push(`PrimaryCompetency: '${escapeJS(meta.PrimaryCompetency)}',`);
        metaLines.push(`Difficulty: '${escapeJS(meta.Difficulty)}',`);
        metaLines.push(`DifficultyScore: ${meta.DifficultyScore},`);
        metaLines.push(`EstimatedMinutes: ${c.EstimatedMinutes || 30},`);
        metaLines.push(`Industry: '${escapeJS(meta.Industry)}',`);
        metaLines.push(`CompanyType: '${escapeJS(meta.CompanyType)}',`);
        metaLines.push(`CompanyName: '${escapeJS(meta.CompanyName)}',`);
        metaLines.push(`Stakeholder: '${escapeJS(meta.Stakeholder)}',`);
        metaLines.push(`BusinessFunction: '${escapeJS(meta.BusinessFunction)}',`);
        metaLines.push(`QuestionCount: ${meta.QuestionCount},`);
        metaLines.push(`ExhibitCount: ${meta.ExhibitCount},`);
        metaLines.push(`ProductionStatus: '${meta.ProductionStatus}',`);
        metaLines.push(`Version: '${meta.Version}',`);
        metaLines.push(`Tags: ${JSON.stringify(meta.Tags)},`);
        metaLines.push(`CreatedDate: '${meta.CreatedDate}',`);
        metaLines.push(`ModifiedDate: '${meta.ModifiedDate}',`);
        metaLines.push(`Author: '${meta.Author}',`);
        metaLines.push(`Reviewer: '${meta.Reviewer}',`);
        metaLines.push(`QAReviewer: '${meta.QAReviewer}',`);
        metaLines.push(`Confidence: ${meta.Confidence},`);
        metaLines.push(`RevisionHistory: [{Date: '${meta.RevisionHistory[0].Date}', Version: '${meta.RevisionHistory[0].Version}', Author: '${meta.RevisionHistory[0].Author}', Summary: '${escapeJS(meta.RevisionHistory[0].Summary)}'}],`);
        metaLines.push(`Dependencies: ${JSON.stringify(meta.Dependencies)},`);
        const loItems = meta.LearningObjectives.slice(0, 6).map(o => "'" + escapeJS(o) + "'").join(", ");
        metaLines.push(`LearningObjectives: [${loItems}],`);

        metaLines.forEach(ml => lines.push(`${itemPad}${ml}`));

        // Title
        lines.push(`${itemPad}Title: '${escapeJS(c.Title || "")}',`);

        // SectionTags
        const tags = (c.SectionTags || []).map(t => "'" + t + "'").join(", ");
        lines.push(`${itemPad}SectionTags: [${tags}],`);

        // ScenarioText
        lines.push(`${itemPad}ScenarioText: '${escapeJS(c.ScenarioText || "")}',`);
        lines.push(``);

        // Exhibits
        lines.push(`${itemPad}Exhibits: [`);
        (c.Exhibits || []).forEach((ex, ei) => {
            const exComma = ei < c.Exhibits.length - 1 ? "," : "";
            lines.push(`${itemPad}  {`);
            const exhibitID = `${c.CaseID}-E${ei + 1}`;
            lines.push(`${itemPad}    ExhibitID: '${exhibitID}',`);
            lines.push(`${itemPad}    Type: '${escapeJS(ex.Type || "table")}',`);
            lines.push(`${itemPad}    Title: '${escapeJS(ex.Title || "")}'`);

            if (ex.Headers && Array.isArray(ex.Headers)) {
                lines.push(`${itemPad}    Headers: ${JSON.stringify(ex.Headers)},`);
            }
            if (ex.Rows && Array.isArray(ex.Rows)) {
                const rowsStr = JSON.stringify(ex.Rows);
                lines.push(`${itemPad}    Rows: ${rowsStr}`);
            }
            if (ex.Body) {
                lines.push(`${itemPad}    Body: '${escapeJS(ex.Body)}'`);
            }

            lines.push(`${itemPad}  }${exComma}`);
        });
        lines.push(`${itemPad}],`);
        lines.push(``);

        // Items
        lines.push(`${itemPad}Items: [`);
        (c.Items || []).forEach((item, ii) => {
            const itemComma = ii < c.Items.length - 1 ? "," : "";
            lines.push(`${itemPad}  {`);

            const itemID = `${c.CaseID}-Q${ii + 1}`;
            const typeMap = { "numeric": "Apply", "select": "Analyze", "multi": "Evaluate", "fill": "Understand", "match": "Synthesize" };
            const cognitiveLevel = typeMap[item.Type] || "Apply";

            lines.push(`${itemPad}    ItemID: '${itemID}',`);
            lines.push(`${itemPad}    Type: '${item.Type}',`);
            lines.push(`${itemPad}    CognitiveLevel: '${cognitiveLevel}',`);
            if (item.Type === "numeric") {
                lines.push(`${itemPad}    CalculationRequired: true,`);
            }

            if (item.Prompt !== undefined) {
                lines.push(`${itemPad}    Prompt: '${escapeJS(String(item.Prompt))}',`);
            }
            if (item.Correct !== undefined) {
                if (Array.isArray(item.Correct)) {
                    lines.push(`${itemPad}    Correct: ${JSON.stringify(item.Correct)},`);
                } else if (typeof item.Correct === "object") {
                    lines.push(`${itemPad}    Correct: ${JSON.stringify(item.Correct)},`);
                } else {
                    const corr = String(item.Correct);
                    if (/^\d+$/.test(corr)) {
                        lines.push(`${itemPad}    Correct: ${corr},`);
                    } else {
                        lines.push(`${itemPad}    Correct: '${escapeJS(corr)}',`);
                    }
                }
            }
            if (item.Explanation !== undefined) {
                lines.push(`${itemPad}    Explanation: '${escapeJS(String(item.Explanation))}',`);
            }
            if (item.Topic !== undefined) {
                lines.push(`${itemPad}    Topic: '${escapeJS(item.Topic)}',`);
            }

            if (item.Choices && Array.isArray(item.Choices)) {
                lines.push(`${itemPad}    Choices: ${JSON.stringify(item.Choices)},`);
            }
            if (item.LeftItems && Array.isArray(item.LeftItems)) {
                lines.push(`${itemPad}    LeftItems: ${JSON.stringify(item.LeftItems)},`);
            }
            if (item.RightItems && Array.isArray(item.RightItems)) {
                lines.push(`${itemPad}    RightItems: ${JSON.stringify(item.RightItems)}`);
            }

            // Remove trailing comma from last property
            lines.push(`${itemPad}  }${itemComma}`);
        });
        lines.push(`${itemPad}]`);

        lines.push(`${pad}}${comma}`);

        return lines.join("\n");
    }

    static findArrayEnd(content, startPos) {
        let depth = 0;
        let inString = false;
        let stringChar = null;

        for (let i = startPos; i < content.length; i++) {
            const ch = content[i];
            const prev = i > 0 ? content[i - 1] : "";

            if (inString) {
                if (ch === stringChar && prev !== "\\") {
                    inString = false;
                    stringChar = null;
                }
                continue;
            }

            if (ch === '"' || ch === "'" || ch === "`") {
                inString = true;
                stringChar = ch;
                continue;
            }

            if (ch === "[") depth++;
            if (ch === "]") depth--;

            if (depth === 0) return i;
        }
        return -1;
    }
}

function escapeJS(s) {
    if (typeof s !== "string") return "";
    return s.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n");
}

if (require.main === module) {
    FileReconstructor.reconstructAll();
}

module.exports = FileReconstructor;
