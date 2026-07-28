const fs = require("fs");
const path = require("path");
const CaseExtractor = require("./CaseExtractor");
const config = require("../config");

const sectionToDomain = {
    "A": "External Financial Reporting Decisions",
    "B": "Planning, Budgeting, and Forecasting",
    "C": "Performance Management",
    "D": "Cost Management",
    "E": "Internal Controls",
    "F": "Technology and Analytics"
};

const sectionToShortDomain = {
    "A": "External Financial Reporting",
    "B": "Planning, Budgeting, Forecasting",
    "C": "Performance Management",
    "D": "Cost Management",
    "E": "Internal Controls",
    "F": "Technology and Analytics"
};

/**
 * Determines metadata fields from case content.
 */
function deriveMetadata(c) {
    const tags = c.SectionTags || [];
    const primarySection = tags[0] || "A";
    const domain = sectionToDomain[primarySection] || "Unknown";
    const shortDomain = sectionToShortDomain[primarySection] || "Unknown";

    // --- BlueprintObjectives & LearningObjectives from item topics ---
    const itemTopics = (c.Items || []).filter(i => i.Topic).map(i => i.Topic);
    const uniqueTopics = [...new Set(itemTopics)];
    const blueprintObjectives = uniqueTopics.length > 0
        ? uniqueTopics
        : ["Comprehensive " + shortDomain + " analysis"];

    const learningObjectives = itemTopics.length > 0
        ? itemTopics.map(t => "Analyze " + t.toLowerCase())
        : ["Apply " + shortDomain.toLowerCase() + " concepts"];

    // --- PrimaryCompetency from item types ---
    const types = (c.Items || []).map(i => i.Type);
    const calcCount = types.filter(t => t === "numeric").length;
    const selectCount = types.filter(t => t === "select").length;
    const matchCount = types.filter(t => t === "match").length;
    let competency = "Calculation";
    if (calcCount <= selectCount && calcCount <= matchCount) competency = "Conceptual";
    if (selectCount > calcCount && selectCount > matchCount) competency = "Judgment";
    if (matchCount > calcCount && matchCount > selectCount) competency = "Analysis";
    if (calcCount >= 3) competency = "Calculation";
    if (types.every(t => t === "match")) competency = "Analysis";

    // --- Difficulty from scenario and item complexity ---
    const itemCount = (c.Items || []).length;
    const hasMatch = types.includes("match");
    const hasMulti = types.includes("multi");
    let difficulty = "Moderate";
    let difficultyScore = 3;
    if (itemCount <= 5 && !hasMatch && !hasMulti) {
        difficulty = "Easy";
        difficultyScore = 1;
    } else if (itemCount >= 6 && hasMatch && hasMulti) {
        difficulty = "Difficult";
        difficultyScore = 4;
    }

    // --- Industry from scenario text keywords ---
    const text = (c.ScenarioText || "") + " " + (c.Title || "");
    const lower = text.toLowerCase();
    let industry = "General business";
    let companyType = "Company";
    let companyName = "";
    let stakeholder = "";
    let businessFunction = "";

    // Extract company name (first named entity in scenario)
    const nameMatch = text.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})/);
    if (nameMatch) companyName = nameMatch[1];

    const industryMap = [
        { kw: ["medical", "hospital", "pharma", "health", "device"], ind: "Medical devices", type: "Manufacturer" },
        { kw: ["food", "kitchen", "beverage", "drink", "fishery", "tuna"], ind: "Food and beverage", type: "Processor" },
        { kw: ["electronic", "component", "circuit", "apex electro"], ind: "Electronics manufacturing", type: "Manufacturer" },
        { kw: ["equipment", "machinery", "gear", "summit gear", "industrial"], ind: "Industrial equipment", type: "Manufacturer" },
        { kw: ["automotive", "bike", "bicycle", "keystone"], ind: "Transportation equipment", type: "Manufacturer" },
        { kw: ["furniture", "chair", "table"], ind: "Furniture manufacturing", type: "Manufacturer" },
        { kw: ["software", "cloud", "erp", "data", "analytics", "brightline"], ind: "Technology", type: "Technology provider" },
        { kw: ["appliance", "juniper"], ind: "Home appliances", type: "Manufacturer" },
        { kw: ["homeware", "granite"], ind: "Home goods", type: "Distributor" },
        { kw: ["lab", "vector labs"], ind: "Laboratory services", type: "Service provider" },
        { kw: ["instrument", "lakeside"], ind: "Scientific instruments", type: "Manufacturer" },
        { kw: ["supply", "harbor medical"], ind: "Medical supplies", type: "Distributor" },
        { kw: ["ventura", "electronics"], ind: "Consumer electronics", type: "Retailer" },
        { kw: ["medtech", "assembly"], ind: "Medical devices", type: "Manufacturer" },
        { kw: ["coastal", "drink"], ind: "Beverage manufacturing", type: "Manufacturer" },
        { kw: ["summit furniture"], ind: "Furniture manufacturing", type: "Manufacturer" },
        { kw: ["precision machining"], ind: "Precision manufacturing", type: "Manufacturer" },
        { kw: ["ironworks", "fabrication"], ind: "Metal fabrication", type: "Manufacturer" },
        { kw: ["metro component"], ind: "Industrial components", type: "Manufacturer" },
        { kw: ["gulf coast"], ind: "Food processing", type: "Processor" },
        { kw: ["northstar", "cobalt", "orion", "neogen"], ind: "Industrial manufacturing", type: "Manufacturer" },
        { kw: ["brightair"], ind: "Industrial services", type: "Service provider" },
        { kw: ["terr kitchen", "kitchen"], ind: "Consumer goods", type: "Manufacturer" },
        { kw: ["metromed"], ind: "Medical devices", type: "Manufacturer" },
        { kw: ["vertex", "solution"], ind: "Technology consulting", type: "Service provider" },
        { kw: ["apex control", "apex"], ind: "Industrial controls", type: "Manufacturer" }
    ];

    for (const entry of industryMap) {
        if (entry.kw.some(k => lower.includes(k))) {
            industry = entry.ind;
            companyType = entry.type;
            break;
        }
    }

    // --- Stakeholder from scenario ---
    const stakeholderMap = [
        { kw: ["controller"], role: "Controller" },
        { kw: ["cfo"], role: "CFO" },
        { kw: ["ceo"], role: "CEO" },
        { kw: ["coo"], role: "COO" },
        { kw: ["audit committee", "internal audit"], role: "Internal Audit Director" },
        { kw: ["operations manager", "plant manager"], role: "Operations Manager" },
        { kw: ["production manager"], role: "Production Manager" },
        { kw: ["budget director"], role: "Budget Director" },
        { kw: ["management"], role: "Management" },
        { kw: ["manufacturing manager"], role: "Manufacturing Manager" }
    ];
    for (const entry of stakeholderMap) {
        if (entry.kw.some(k => lower.includes(k))) {
            stakeholder = entry.role;
            break;
        }
    }
    if (!stakeholder) stakeholder = "Management";

    // --- BusinessFunction from domain ---
    const functionMap = {
        "A": "Financial reporting",
        "B": "Treasury and planning",
        "C": "Performance management",
        "D": "Cost accounting",
        "E": "Internal audit",
        "F": "Technology and analytics"
    };
    businessFunction = functionMap[primarySection] || "General management";

    // --- Tags ---
    const caseTags = [];

    // --- Key persons ---
    const personPattern = /([A-Z][a-z]+)\s+([A-Z][a-z]+)\s+(is|must|needs|wants|asked|preparing|evaluating|determine)/g;
    let personMatch;
    while ((personMatch = personPattern.exec(c.ScenarioText || "")) !== null) {
        const fullName = personMatch[1] + " " + personMatch[2];
        if (fullName !== "The Controller" && fullName !== "The CFO" &&
            !stakeholder.includes(fullName)) {
            stakeholder = fullName + " (" + stakeholder + ")";
        }
    }

    return {
        BlueprintDomain: domain,
        BlueprintObjectives: blueprintObjectives,
        PrimaryCompetency: competency,
        Difficulty: difficulty,
        DifficultyScore: difficultyScore,
        Industry: industry,
        CompanyType: companyType,
        CompanyName: companyName,
        Stakeholder: stakeholder,
        BusinessFunction: businessFunction,
        QuestionCount: (c.Items || []).length,
        ExhibitCount: (c.Exhibits || []).length,
        ProductionStatus: "Production",
        Version: "1.0",
        Tags: caseTags,
        CreatedDate: "2026-07-20",
        ModifiedDate: "2026-07-20",
        Author: "Case Author",
        Reviewer: "Accountant",
        QAReviewer: "Validator",
        Confidence: 100,
        RevisionHistory: [{
            Date: "2026-07-20",
            Version: "1.0",
            Author: "Case Author",
            Summary: "Initial creation with metadata schema"
        }],
        Dependencies: [],
        LearningObjectives: learningObjectives
    };
}

/**
 * Serializes metadata fields to JS property string.
 */
function serializeMetadata(meta, indent) {
    const lines = [];
    const pad = indent + "    ";
    const pad2 = pad + "    ";

    lines.push(`${pad}BlueprintDomain: '${escapeJS(meta.BlueprintDomain)}',`);
    lines.push(`${pad}BlueprintObjectives: [`);
    meta.BlueprintObjectives.slice(0, 5).forEach((o, i) => {
        const comma = i < meta.BlueprintObjectives.slice(0, 5).length - 1 ? "," : "";
        lines.push(`${pad2}'${escapeJS(o)}'${comma}`);
    });
    lines.push(`${pad}],`);
    lines.push(`${pad}PrimaryCompetency: '${escapeJS(meta.PrimaryCompetency)}',`);
    lines.push(`${pad}Difficulty: '${escapeJS(meta.Difficulty)}',`);
    lines.push(`${pad}DifficultyScore: ${meta.DifficultyScore},`);
    lines.push(`${pad}Industry: '${escapeJS(meta.Industry)}',`);
    lines.push(`${pad}CompanyType: '${escapeJS(meta.CompanyType)}',`);
    lines.push(`${pad}CompanyName: '${escapeJS(meta.CompanyName)}',`);
    lines.push(`${pad}Stakeholder: '${escapeJS(meta.Stakeholder)}',`);
    lines.push(`${pad}BusinessFunction: '${escapeJS(meta.BusinessFunction)}',`);
    lines.push(`${pad}QuestionCount: ${meta.QuestionCount},`);
    lines.push(`${pad}ExhibitCount: ${meta.ExhibitCount},`);
    lines.push(`${pad}ProductionStatus: '${meta.ProductionStatus}',`);
    lines.push(`${pad}Version: '${meta.Version}',`);
    lines.push(`${pad}Tags: ${JSON.stringify(meta.Tags)},`);
    lines.push(`${pad}CreatedDate: '${meta.CreatedDate}',`);
    lines.push(`${pad}ModifiedDate: '${meta.ModifiedDate}',`);
    lines.push(`${pad}Author: '${meta.Author}',`);
    lines.push(`${pad}Reviewer: '${meta.Reviewer}',`);
    lines.push(`${pad}QAReviewer: '${meta.QAReviewer}',`);
    lines.push(`${pad}Confidence: ${meta.Confidence},`);
    lines.push(`${pad}RevisionHistory: [`);
    lines.push(`${pad2}{Date: '${meta.RevisionHistory[0].Date}', Version: '${meta.RevisionHistory[0].Version}', Author: '${meta.RevisionHistory[0].Author}', Summary: '${escapeJS(meta.RevisionHistory[0].Summary)}'}`);
    lines.push(`${pad}],`);
    lines.push(`${pad}Dependencies: ${JSON.stringify(meta.Dependencies)},`);
    lines.push(`${pad}LearningObjectives: [`);
    meta.LearningObjectives.slice(0, 6).forEach((o, i) => {
        const comma = i < meta.LearningObjectives.slice(0, 6).length - 1 ? "," : "";
        lines.push(`${pad2}'${escapeJS(o)}'${comma}`);
    });
    lines.push(`${pad}],`);

    return lines.join("\n");
}

function escapeJS(s) {
    if (typeof s !== "string") return "";
    return s.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

/**
 * Adds ItemID and CognitiveLevel to items, ExhibitID to exhibits.
 */
function buildItemExhibitMetadata(c) {
    const caseID = c.CaseID || "";
    const itemMeta = [];
    const exhibitMeta = [];

    const typeCognitive = {
        "numeric": "Apply",
        "select": "Analyze",
        "multi": "Evaluate",
        "fill": "Understand",
        "match": "Synthesize"
    };

    (c.Items || []).forEach((item, idx) => {
        const cognitive = typeCognitive[item.Type] || "Apply";
        itemMeta.push({
            ItemID: `${caseID}-Q${idx + 1}`,
            CognitiveLevel: cognitive,
            CalculationRequired: item.Type === "numeric",
            EstimatedMinutes: 5,
            ExplanationVersion: 1
        });
    });

    (c.Exhibits || []).forEach((_, idx) => {
        exhibitMeta.push({
            ExhibitID: `${caseID}-E${idx + 1}`
        });
    });

    return { itemMeta, exhibitMeta };
}

/**
 * Modified the file content to insert metadata into each case.
 */
function migrateFile(filePath) {
    console.log(`Migrating: ${filePath}`);
    let content = fs.readFileSync(filePath, "utf8");
    let cases = CaseExtractor.extractFromContent(content);
    if (!cases || cases.length === 0) {
        console.log(`  No cases found, skipping.`);
        return { total: 0, modified: 0, skipped: 0 };
    }

    let modifiedCount = 0;
    let skippedCount = 0;

    // Process from last to first to preserve positions
    const casePositions = [];

    cases.forEach((c, idx) => {
        const caseID = c.CaseID || `case_${idx}`;
        const lower = (c.ScenarioText || "").toLowerCase() + " " + (c.Title || "").toLowerCase();

        // Skip placeholders (short/empty scenarios)
        const isPlaceholder = !c.ScenarioText || c.ScenarioText.length < 20 || lower.includes("placeholder");
        if (isPlaceholder) {
            skippedCount++;
            return;
        }

        // Skip if already has metadata
        if (c.BlueprintDomain && c.DifficultyScore && c.CreatedDate) {
            skippedCount++;
            return;
        }

        const meta = deriveMetadata(c);
        const { itemMeta, exhibitMeta } = buildItemExhibitMetadata(c);

        // Find this case in the file text
        const casePos = findCaseInText(content, c, idx);
        if (!casePos) {
            console.log(`  Could not find position for ${caseID}, skipping.`);
            skippedCount++;
            return;
        }

        casePositions.push({
            idx,
            caseID,
            ...casePos,
            meta,
            itemMeta,
            exhibitMeta
        });
    });

    // Apply from last to first to preserve positions
    casePositions.sort((a, b) => b.insertPos - a.insertPos);

    for (const cp of casePositions) {
        const metaLines = serializeMetadata(cp.meta, cp.indent);
        const insertText = "\n" + metaLines;
        content = content.slice(0, cp.insertPos) + insertText + content.slice(cp.insertPos);
        modifiedCount++;

        // Update content for item/exhibit metadata
        content = addItemExhibitMetadata(content, cp.caseID, cp.itemMeta, cp.exhibitMeta);
    }

    fs.writeFileSync(filePath, content, "utf8");
    console.log(`  Modified: ${modifiedCount}, Skipped: ${skippedCount}`);
    return { total: cases.length, modified: modifiedCount, skipped: skippedCount };
}

/**
 * Finds the position to insert metadata in the file text.
 */
function findCaseInText(content, c, idx) {
    const caseID = c.CaseID;
    if (!caseID) return null;

    // Try multiple patterns to find CaseID in the file
    const patterns = [
        `CaseID: "${caseID}"`,
        `CaseID: '${caseID}'`,
        `CaseID:"${caseID}"`,
        `CaseID:'${caseID}'`,
        `"CaseID": "${caseID}"`,
        `"CaseID":"${caseID}"`
    ];

    let pos = -1;
    for (const p of patterns) {
        pos = content.indexOf(p);
        if (pos !== -1) break;
    }

    if (pos === -1) return null;

    // Find the opening { of this case (search backwards)
    let bracePos = content.lastIndexOf("{", pos);
    if (bracePos === -1) return null;

    // Find the end of the CaseID line (insert after it)
    let lineEnd = content.indexOf("\n", pos);
    if (lineEnd === -1) lineEnd = content.length;

    // Determine indent from the opening brace line
    const braceLine = content.substring(0, bracePos);
    const lastNewline = braceLine.lastIndexOf("\n");
    const indentStr = lastNewline >= 0 ? braceLine.substring(lastNewline + 1) : "";

    return { insertPos: lineEnd + 1, indent: indentStr };
}

/**
 * Adds ItemID to items and ExhibitID to exhibits.
 */
function addItemExhibitMetadata(content, caseID, itemMeta, exhibitMeta) {
    // Add ExhibitID to exhibits
    exhibitMeta.forEach((em, idx) => {
        const exPattern = new RegExp(`(Type:\\s*'[^']+'(?:,\\s*|\\s+))Title:\\s*'([^']+)'`);
        // More targeted: find Exhibit that doesn't already have ExhibitID
        // Search for exhibits within this case
        const caseStart = content.indexOf(`CaseID:'${caseID}'`) !== -1
            ? content.indexOf(`CaseID:'${caseID}'`)
            : content.indexOf(`CaseID:"${caseID}"`);

        if (caseStart === -1) return;

        const caseBlock = content.substring(caseStart);
        // Find the Nth exhibit in this case
        const exStartPattern = /{Type:\s*'/g;
        let exCount = 0;
        let exPos = -1;
        let match;
        while ((match = exStartPattern.exec(caseBlock)) !== null) {
            if (exCount === idx) {
                exPos = caseStart + match.index;
                break;
            }
            exCount++;
        }
        if (exPos === -1) return;

        // Check if already has ExhibitID
        const afterEx = content.substring(exPos, exPos + 200);
        if (afterEx.includes("ExhibitID")) return;

        // Insert ExhibitID after the opening {
        let openBrace = content.indexOf("{", exPos);
        if (openBrace === -1) return;
        const idText = `ExhibitID: '${em.ExhibitID}', `;
        content = content.slice(0, openBrace + 1) + idText + content.slice(openBrace + 1);
    });

    // Add ItemID and CognitiveLevel to items
    itemMeta.forEach((im, idx) => {
        const caseStart = content.indexOf(`CaseID:'${caseID}'`) !== -1
            ? content.indexOf(`CaseID:'${caseID}'`)
            : content.indexOf(`CaseID:"${caseID}"`);
        if (caseStart === -1) return;

        const caseBlock = content.substring(caseStart);
        const itemStartPattern = /{Type:\s*'/g;
        let itemCount = 0;
        let itemPos = -1;
        let match;
        while ((match = itemStartPattern.exec(caseBlock)) !== null) {
            if (itemCount === idx) {
                itemPos = caseStart + match.index;
                break;
            }
            itemCount++;
        }
        if (itemPos === -1) return;

        // Check if already has ItemID
        const afterItem = content.substring(itemPos, itemPos + 200);
        if (afterItem.includes("ItemID")) return;

        // Insert ItemID after the opening {
        let openBrace = content.indexOf("{", itemPos);
        if (openBrace === -1) return;
        const idText = `ItemID:'${im.ItemID}', Type:'${extractType(content, openBrace)}', `;
        // Actually, we need to insert before Type, not replace it
        // Simpler: add ItemID after the opening {
        const itemIdInsert = `ItemID: '${im.ItemID}', `;
        content = content.slice(0, openBrace + 1) + itemIdInsert + content.slice(openBrace + 1);
    });

    return content;
}

function extractType(content, pos) {
    const snippet = content.substring(pos, pos + 100);
    const match = snippet.match(/Type:\s*'([^']+)'/);
    return match ? match[1] : "numeric";
}

// ----- MAIN -----
function migrateAll() {
    const root = config.paths.root;
    const banks = config.caseBanks;

    let totalCases = 0;
    let totalModified = 0;
    let totalSkipped = 0;

    banks.forEach(file => {
        const fullPath = path.join(root, file);
        if (!fs.existsSync(fullPath)) {
            console.log(`File not found: ${file}`);
            return;
        }
        const result = migrateFile(fullPath);
        totalCases += result.total;
        totalModified += result.modified;
        totalSkipped += result.skipped;
    });

    console.log("\n=== Migration Summary ===");
    console.log(`Files processed: ${banks.length}`);
    console.log(`Total cases: ${totalCases}`);
    console.log(`Modified: ${totalModified}`);
    console.log(`Skipped (placeholder/has metadata): ${totalSkipped}`);
    console.log("Migration complete.");
}

if (require.main === module) {
    migrateAll();
}

module.exports = { migrateAll, deriveMetadata, serializeMetadata };
