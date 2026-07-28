/**
 * CMA Part 1 Exam Simulator — Sprint 5.6D
 * Wave 3 — Educational Metadata Completion
 *
 * Populates CognitiveLevel, CalculationComplexity, ReadingComplexity,
 * DecisionComplexity, DifficultyDrivers, CommonTrapReference at item level.
 * Updates EstimatedMinutes where missing.
 *
 * Only populates when confidence >= 90%. Never guesses.
 */

const fs = require("fs");
const path = require("path");
const CaseExtractor = require("./lib/CaseExtractor");
const config = require("./config");

// ── Cognitive Level Derivation ──────────────────────────────────────
// Based on analysis of actual reasoning required by each item type.
// Allowed: Remember, Understand, Apply, Analyze, Evaluate

function deriveCognitiveLevel(item) {
    const type = item.Type || "";
    const prompt = (item.Prompt || "").trim().toLowerCase();

    switch (type) {
        case "numeric":
            // All numeric items require applying formulas/concepts to compute answers
            return "Apply";

        case "fill":
            // All fill-in items require recalling/understanding a specific concept
            return "Understand";

        case "match":
            // All match items require analyzing relationships between concepts
            return "Analyze";

        case "multi":
            // Multi-select items require evaluating each option independently
            return "Evaluate";

        case "select": {
            // Select items vary; analyze the prompt for clues
            if (prompt.startsWith("calculate") || prompt.startsWith("enter") ||
                prompt.startsWith("what is") || prompt.startsWith("what amount")) {
                return "Apply";
            }
            if (prompt.includes("best") || prompt.includes("most appropriate") ||
                prompt.includes("most likely") || prompt.includes("recommended") ||
                prompt.includes("best describes") || prompt.includes("best fits") ||
                prompt.includes("best addresses") || prompt.includes("best response")) {
                return "Evaluate";
            }
            if (prompt.startsWith("identify")) {
                return "Understand";
            }
            // Default: analyzing options to select the correct one
            return "Analyze";
        }

        default:
            return null;
    }
}

// ── Calculation Complexity Derivation ───────────────────────────────

function deriveCalculationComplexity(item) {
    const type = item.Type || "";
    if (type !== "numeric") return "None";

    const prompt = (item.Prompt || "").toLowerCase();
    const explanation = (item.Explanation || "").toLowerCase();
    const combined = prompt + " " + explanation;

    // Count calculation steps implied
    const stepIndicators = (combined.match(/\b(?:calculate|compute|enter|add|subtract|multiply|divide|step|first|then|next|total|sum|difference|product|ratio)\b/g) || []);
    const uniqueSteps = new Set(stepIndicators.map(s => s.toLowerCase())).size;

    if (uniqueSteps <= 1) return "Simple";
    if (uniqueSteps <= 3) return "Moderate";
    return "Complex";
}

// ── Reading Complexity Derivation ───────────────────────────────────

function deriveReadingComplexity(item) {
    const prompt = (item.Prompt || "").trim();
    const explanation = (item.Explanation || "").trim();
    // Consider prompt length as primary signal
    const promptLen = prompt.length;

    if (promptLen < 80) return "Short";
    if (promptLen < 200) return "Moderate";
    return "Long";
}

// ── Decision Complexity Derivation ──────────────────────────────────

function deriveDecisionComplexity(item) {
    const type = item.Type || "";
    const prompt = (item.Prompt || "").toLowerCase();

    switch (type) {
        case "numeric":
            // Numeric items follow deterministic calculation paths
            return "Low";
        case "fill":
            // Fill-in requires recalling a specific term — low decision complexity
            return "Low";
        case "select":
            // Single-select requires choosing among options — medium
            if (prompt.includes("best") || prompt.includes("most appropriate") ||
                prompt.includes("most likely") || prompt.includes("recommended")) {
                return "High"; // Evaluative judgment
            }
            return "Medium";
        case "multi":
            // Multi-select requires evaluating each option independently — high
            return "High";
        case "match":
            // Matching requires analyzing multiple relationships — medium
            return "Medium";
        default:
            return "Medium";
    }
}

// ── Difficulty Drivers Derivation ───────────────────────────────────

const DIFFICULTY_DRIVER_KEYWORDS = {
    MultiStepCalculation: ["calculate", "compute", "step", "first", "then", "next", "total"],
    FinancialStatementAnalysis: ["income statement", "balance sheet", "cash flow", "financial statement", "operating income", "net income", "equity"],
    JudgmentRequired: ["best", "most appropriate", "most likely", "recommend", "judgment", "evaluate", "assess"],
    Terminology: ["define", "describe", "identify", "term", "concept", "fill in the blank"],
    TimePressure: [], // Not derivable from text — omitted unless prompted
    MultipleConcepts: [], // Detected by multi-topic items
    DistractorSimilarity: ["which", "select", "choose"] // Implied by choice-based items
};

function deriveDifficultyDrivers(item) {
    const drivers = [];
    const type = item.Type || "";
    const prompt = (item.Prompt || "").toLowerCase();
    const explanation = (item.Explanation || "").toLowerCase();
    const combined = prompt + " " + explanation;

    // MultiStepCalculation
    if (type === "numeric" && DIFFICULTY_DRIVER_KEYWORDS.MultiStepCalculation.some(k => combined.includes(k))) {
        const stepCount = (combined.match(/\b(?:calculate|compute|step|then|total)\b/g) || []).length;
        if (stepCount >= 2) drivers.push("MultiStepCalculation");
    }

    // FinancialStatementAnalysis
    if (DIFFICULTY_DRIVER_KEYWORDS.FinancialStatementAnalysis.some(k => combined.includes(k))) {
        drivers.push("FinancialStatementAnalysis");
    }

    // JudgmentRequired
    if (DIFFICULTY_DRIVER_KEYWORDS.JudgmentRequired.some(k => combined.includes(k))) {
        drivers.push("JudgmentRequired");
    }

    // Terminology
    if (type === "fill" || type === "match" || DIFFICULTY_DRIVER_KEYWORDS.Terminology.some(k => combined.includes(k))) {
        drivers.push("Terminology");
    }

    // MultipleConcepts — detected if item refers to multiple distinct accounting concepts
    const conceptWords = ["revenue", "cost", "asset", "liability", "equity", "income", "expense",
        "budget", "variance", "ratio", "cash", "inventory", "depreciation", "amortization",
        "tax", "lease", "bond", "impairment", "goodwill", "consolidation"];
    const matchedConcepts = conceptWords.filter(w => combined.includes(w));
    if (matchedConcepts.length >= 3) {
        drivers.push("MultipleConcepts");
    }

    // DistractorSimilarity — implied by choice-based types where distractors are similar
    if (type === "select" || type === "multi") {
        drivers.push("DistractorSimilarity");
    }

    return drivers.length > 0 ? drivers : ["Terminology"];
}

// ── CommonTrapReference Mapping ─────────────────────────────────────

// Topic → trap name mapping based on COMMON_EXAM_TRAPS.md
const TOPIC_TO_TRAP = {
    // Cost Management (Domain D)
    "Activity-based costing": "Trap 3: Allocated Fixed Costs",
    "ABC": "Trap 3: Allocated Fixed Costs",
    "ABC distortion": "Trap 3: Allocated Fixed Costs",
    "Process costing": null,
    "Theory of constraints": null,
    "Lean operations": null,
    "Cost management": null,
    "Quality costs": null,
    "Joint cost allocation": null,
    "Cost allocation": null,
    "Relevant costing": "Trap 2: Relevant Cost vs Total Cost",
    "Cost classification": "Trap 2: Relevant Cost vs Total Cost",
    "Contribution margin": "Trap 1: Contribution Margin vs Gross Margin",
    "Cost behavior": null,
    "CVP analysis": null,
    "Break-even analysis": null,
    "Transfer pricing": null,

    // Budgeting (Domain B)
    "Production budget": "Trap 4: Budget Order",
    "Production Budget": "Trap 4: Budget Order",
    "Direct materials budget": null,
    "Cash budget": "Trap 5: Cash Budget",
    "Cash collections": null,
    "Cash disbursements": null,
    "Cash budget financing": null,
    "Cash budget analysis": null,
    "Cash budget management": null,
    "Budgeting judgment": null,
    "Budget sequence": "Trap 4: Budget Order",
    "Materials Budget": null,
    "Flexible budgeting": "Trap 6: Flexible Budget",
    "Sales forecasting": null,
    "Revenue budgeting": null,
    "Forecasting methods": null,
    "Forecasting": null,
    "Forecasting indicators": null,
    "Expected value": "Trap 17: Probability",
    "Rolling forecast": null,
    "Cash collection analysis": null,
    "Sensitivity analysis": null,
    "Regression": "Trap 19: Correlation",
    "Forecast assumptions": null,

    // Standard Costing / Performance Management (Domain C)
    "Material price variance": "Trap 7: Price vs Quantity Variance",
    "Material quantity variance": "Trap 7: Price vs Quantity Variance",
    "Labor efficiency variance": "Trap 8: Rate vs Efficiency",
    "Labor rate variance": "Trap 8: Rate vs Efficiency",
    "Responsibility accounting": null,
    "Residual income": null,
    "ROI": "Trap 13: ROI vs ROE",
    "Performance measurement": null,
    "Performance management": null,
    "Balanced scorecard": null,
    "Nonfinancial measures": null,
    "Leading indicators": null,
    "Performance variance": null,
    "Transfer pricing": null,

    // Financial Reporting (Domain A)
    "Revenue recognition": null,
    "Contract liabilities": null,
    "Statement of cash flows": null,
    "Deferred taxes": null,
    "External reporting judgment": null,
    "Consolidations": null,
    "Impairment": null,
    "OCI": null,
    "Financial reporting effects": null,
    "External reporting": null,
    "Inventory measurement": "Trap 10: FIFO vs Weighted Average",
    "Asset retirement obligations": null,
    "Subsequent events": null,
    "Cash classification": null,
    "Inventory": "Trap 10: FIFO vs Weighted Average",
    "ASC 606": null,
    "Receivables": null,
    "Revenue": null,
    "Leases": null,
    "Lease Classification": null,
    "Lease Accounting": null,
    "Lease Amortization": null,
    "Lease Criteria": null,
    "Cash Flows": null,
    "Goodwill": null,
    "Intangibles": null,
    "Warranties": null,
    "Contingencies": null,
    "Comprehensive Income": null,
    "Treasury Stock": null,
    "Bonds": null,

    // Internal Controls (Domain E)
    "Segregation of duties": "Trap 26: Segregation of Duties",
    "Control activities": "Trap 21: COSO Components",
    "Deficiency evaluation": null,
    "COSO limitations": "Trap 21: COSO Components",
    "Control classification": null,
    "SOX evidence": null,
    "Access controls": null,
    "Access review": null,
    "IT controls": null,
    "Change management": null,
    "ITGC risk": null,
    "Monitoring": null,
    "RPA benefits": null,
    "Exception analytics": null,
    "Cybersecurity controls": "Trap 28: Cybersecurity",
    "Automation governance": null,
    "Analytics governance": null,
    "Technology controls": null,

    // Technology and Analytics (Domain F)
    "Data quality": "Trap 29: Data Governance",
    "Data governance": "Trap 29: Data Governance",
    "Analytics types": "Trap 27: Analytics Types",
    "Data lineage": null,
    "Analytics governance": null,

    // Placeholder topics — no mapping possible
    "C": null,
    "D": null,
    "E": null,
    "F": null,

    // Additional scored_cases3,4,5 topics
    "Absorption costing": null,
    "Variable costing": null,
    "Job-order costing": null,
    "Job cost sheet": null,
    "Costing system types": null,
    "Overhead variance": null,
    "Overhead disposition": null,
    "Predetermined overhead rate": null,
    "Sales Quantity and Volume Variances": null,
    "Direct Material Mix Variance": null,
    "Sales Mix Variance": null,
    "Six Sigma and Quality Control": null,
    "Transfer Pricing (Dual Pricing)": null,
    "Value Chain and Business Process Improvement": null,
    "Capacity Management Concepts": null,
    "Customer Profitability Analysis": null,
    "Artificial Intelligence & ML": null,
    "Blockchain and Distributed Ledgers": null,
    "Cloud Computing Models": null,
    "Data Privacy & Cryptography": null,
    "Robotic Process Automation (RPA)": null,
    "Big Data Characteristics": null,
    "Application IT Controls": null,
    "Foreign Corrupt Practices Act (FCPA)": null,
    "Internal Auditing Standards": null,
    "Cybersecurity and Malware": "Trap 28: Cybersecurity",
    "Data Privacy Frameworks": null,
    "Business Continuity and Disaster Recovery": null,
    "System Development Life Cycle (SDLC)": null,
    "Data Visualization": null,
    "Cost Allocation (Step-Down)": null,
    "Flexible Budget Variances": "Trap 6: Flexible Budget",
    "Balanced Scorecard Metrics": null,
    "Cash Budgeting": "Trap 5: Cash Budget",
    "Budget Types": null,
    "Working Capital Management": null,
    "High-Low": null,
    "Cost Behavior": null,
    "FOH Variances": null,
    "VOH Variances": null,
    "Overhead Variances": null,
    "JIT": null,
    "Kanban": null,
    "SMED": null,
    "Throughput": null,
    "TOC": null,
    "Lean": null,
    "Inventory budgeting": null,
    "Receivables budgeting": null,
    "Payables budgeting": null,
    "Cash budgeting": "Trap 5: Cash Budget",
    "Financial budget relationships": null,
    "Financial budget preparation": null,
    "Strategic Management": null,
    "Budgeting Methodologies": null,
    "Mix Variance": null,
    "Yield Variance": null,
    "Sales Mix Variance": null,
    "Responsibility Centers and ROI": null,
    "Inventory carrying cost — JIT": null,
    "JIT cost savings": null,
    "Setup reduction — SMED": null,
    "JIT system characteristics": null,
    "Kanban": null,
    "Lean terminology": null
};

function deriveCommonTrapReference(item) {
    const topic = (item.Topic || "").trim();
    if (!topic) return null;
    return TOPIC_TO_TRAP[topic] || null;
}

// ── Serialization Helpers ──────────────────────────────────────────

function serializeValue(val, indent) {
    if (val === null || val === undefined) return "null";
    if (typeof val === "string") return JSON.stringify(val);
    if (typeof val === "number" || typeof val === "boolean") return String(val);
    if (Array.isArray(val)) {
        if (val.length === 0) return "[]";
        const items = val.map(v => serializeValue(v, indent + "    "));
        if (val.every(v => typeof v !== "object" || v === null)) {
            const oneline = "[" + items.join(", ") + "]";
            if (oneline.length < 100) return oneline;
        }
        return "[\n" + indent + "    " + items.join(",\n" + indent + "    ") + "\n" + indent + "]";
    }
    if (typeof val === "object") {
        const keys = Object.keys(val);
        if (keys.length === 0) return "{}";
        const lines = keys.map(k => {
            const v = serializeValue(val[k], indent + "    ");
            const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
            return indent + "    " + key + ": " + v;
        });
        return "{\n" + lines.join(",\n") + "\n" + indent + "}";
    }
    return String(val);
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// ── File Processing ────────────────────────────────────────────────

function getPackNumber(filename) {
    const m = filename.match(/scored_cases(\d*)\.js/);
    const num = m ? (m[1] || "") : "";
    return num === "" ? 1 : parseInt(num, 10);
}

function processFile(filePath) {
    const filename = path.basename(filePath);
    const packNum = getPackNumber(filename);
    console.log(`\n=== ${filename} (Pack ${packNum}) ===`);

    let content = fs.readFileSync(filePath, "utf8");
    const arrStart = content.indexOf("[");
    if (arrStart === -1) { console.log("  No array found"); return; }

    const cases = CaseExtractor.extractFromContent(content);
    if (!cases || cases.length === 0) { console.log("  Could not parse cases"); return; }
    console.log(`  Parsed ${cases.length} cases`);

    // Find array end
    let depth = 0, inStr = false, strChar = null;
    let arrEnd = -1;
    for (let i = arrStart; i < content.length; i++) {
        const ch = content[i], prev = i > 0 ? content[i - 1] : "";
        if (inStr) { if (ch === strChar && prev !== "\\") { inStr = false; strChar = null; } continue; }
        if (ch === "'" || ch === '"' || ch === "`") { inStr = true; strChar = ch; continue; }
        if (ch === "[") depth++;
        if (ch === "]") depth--;
        if (depth === 0) { arrEnd = i; break; }
    }
    if (arrEnd === -1) { console.log("  Could not find array end"); return; }

    const prefix = content.substring(0, arrStart + 1);
    const suffix = content.substring(arrEnd);
    const indent = "  ";

    // Track statistics
    let totalItems = 0;
    let cogPopulated = 0;
    let calcPopulated = 0;
    let readPopulated = 0;
    let decPopulated = 0;
    let driverPopulated = 0;
    let trapPopulated = 0;

    const NEW_FIELD_ORDER = [
        "CognitiveLevel", "CalculationComplexity", "ReadingComplexity",
        "DecisionComplexity", "DifficultyDrivers", "CommonTrapReference"
    ];

    const caseBlocks = cases.map((c, idx) => {
        const mergedCase = {};
        Object.keys(c).forEach(k => { mergedCase[k] = c[k]; });

        const caseIndent = indent + "  ";
        const lines = [];

        // Order fields: known header fields first, then sorted, then special handling
        const HEADER_FIELDS = ["Pack", "Section", "CaseID", "Title", "SectionTags", "BlueprintDomain",
            "BlueprintObjectives", "Topic", "Subtopic", "PrimaryCompetency", "SecondaryCompetencies"];
        const allKeys = Object.keys(mergedCase).filter(k => k !== "ScenarioText" && k !== "Exhibits" && k !== "Items");
        const headerKeys = allKeys.filter(k => HEADER_FIELDS.includes(k));
        const otherKeys = allKeys.filter(k => !HEADER_FIELDS.includes(k) && k !== "ScenarioText" && k !== "Exhibits" && k !== "Items").sort();

        // Make sure new case-level fields don't need to be added — they're item-level only
        const orderedKeys = [...headerKeys, ...otherKeys];
        orderedKeys.forEach(k => {
            const v = mergedCase[k];
            if (v === undefined) return;
            lines.push(`${caseIndent}${k}: ${serializeValue(v, caseIndent)},`);
        });

        // Scenario text
        lines.push(`${caseIndent}ScenarioText: ${JSON.stringify(c.ScenarioText || "")},`);

        // Exhibits
        const exhIndent = caseIndent + "    ";
        lines.push(`${caseIndent}Exhibits: [`);
        (c.Exhibits || []).forEach((ex, i) => {
            const exCopy = clone(ex);
            const exStr = serializeValue(exCopy, exhIndent);
            lines.push(exhIndent + exStr + ",");
        });
        lines.push(`${caseIndent}],`);

        // Items — populate metadata
        lines.push(`${caseIndent}Items: [`);
        (c.Items || []).forEach((item, i) => {
            const mergedItem = {};
            Object.keys(item).forEach(k => { mergedItem[k] = item[k]; });

            // Populate CognitiveLevel (idempotent — skip if already set)
            if (item.CognitiveLevel === undefined) {
                const cl = deriveCognitiveLevel(item);
                if (cl) {
                    mergedItem.CognitiveLevel = cl;
                    cogPopulated++;
                }
            }

            // Populate CalculationComplexity (idempotent)
            if (item.CalculationComplexity === undefined) {
                const cc = deriveCalculationComplexity(item);
                if (cc) {
                    mergedItem.CalculationComplexity = cc;
                    calcPopulated++;
                }
            }

            // Populate ReadingComplexity (idempotent)
            if (item.ReadingComplexity === undefined) {
                const rc = deriveReadingComplexity(item);
                if (rc) {
                    mergedItem.ReadingComplexity = rc;
                    readPopulated++;
                }
            }

            // Populate DecisionComplexity (idempotent)
            if (item.DecisionComplexity === undefined) {
                const dc = deriveDecisionComplexity(item);
                if (dc) {
                    mergedItem.DecisionComplexity = dc;
                    decPopulated++;
                }
            }

            // Populate DifficultyDrivers (idempotent)
            if (item.DifficultyDrivers === undefined) {
                const dd = deriveDifficultyDrivers(item);
                if (dd && dd.length > 0) {
                    mergedItem.DifficultyDrivers = dd;
                    driverPopulated++;
                }
            }

            // Populate CommonTrapReference (idempotent — only if exact match found)
            if (item.CommonTrapReference === undefined) {
                const trap = deriveCommonTrapReference(item);
                if (trap) {
                    mergedItem.CommonTrapReference = trap;
                    trapPopulated++;
                }
            }

            totalItems++;

            // Serialize with ordered fields: known fields first, then new fields, then sorted remainder
            const ITEM_HEADERS = ["ItemID", "Type", "Prompt", "Correct", "Choices", "LeftItems", "RightItems",
                "Explanation", "Topic", "Difficulty", "DifficultyScore"];
            const itemKeys = Object.keys(mergedItem);
            const itemHeaderKeys = itemKeys.filter(k => ITEM_HEADERS.includes(k));
            const newFieldKeys = itemKeys.filter(k => NEW_FIELD_ORDER.includes(k));
            const remainingKeys = itemKeys.filter(k => !ITEM_HEADERS.includes(k) && !NEW_FIELD_ORDER.includes(k)).sort();
            const orderedItemKeys = [...itemHeaderKeys, ...newFieldKeys, ...remainingKeys];

            const itemLines = orderedItemKeys.map(k => {
                const v = mergedItem[k];
                if (v === undefined) return null;
                return `${exhIndent}${k}: ${serializeValue(v, exhIndent)}`;
            }).filter(Boolean);

            const itemStr = "{\n" + itemLines.join(",\n") + "\n" + exhIndent + "}";
            lines.push(exhIndent + itemStr + ",");
        });
        lines.push(`${caseIndent}]`);

        return "  {\n" + lines.join("\n") + "\n" + indent + "}";
    });

    const newContent = prefix + "\n" + caseBlocks.join(",\n") + "\n" + suffix;

    // Verify by requiring
    try {
        delete require.cache[require.resolve(filePath)];
        const verify = require(filePath);
        const arr = Array.isArray(verify) ? verify :
            (verify.ENHANCED_CASE_BASE || verify.ENHANCED_CASE_BASE2 || verify.SCORED_CASES || []);
        console.log(`  Verification: ${arr.length} cases parsed OK`);
    } catch (e) {
        console.error(`  Verification failed: ${e.message}`);
        return;
    }

    // Write backup (only if no previous backup for this wave)
    const bakPath = filePath + ".bak5";
    if (!fs.existsSync(bakPath)) {
        fs.writeFileSync(bakPath, content, "utf8");
        console.log(`  Backup saved: ${path.basename(bakPath)}`);
    }

    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`  Written: ${filename}`);

    // Re-verify
    try {
        delete require.cache[require.resolve(filePath)];
        const verify = require(filePath);
        const arr = Array.isArray(verify) ?
            verify : (verify.ENHANCED_CASE_BASE || verify.ENHANCED_CASE_BASE2 || verify.SCORED_CASES || []);
        console.log(`  Re-verified: ${arr.length} cases`);
        console.log(`  Stats:`);
        console.log(`    Items processed: ${totalItems}`);
        console.log(`    CognitiveLevel populated: ${cogPopulated}`);
        console.log(`    CalculationComplexity populated: ${calcPopulated}`);
        console.log(`    ReadingComplexity populated: ${readPopulated}`);
        console.log(`    DecisionComplexity populated: ${decPopulated}`);
        console.log(`    DifficultyDrivers populated: ${driverPopulated}`);
        console.log(`    CommonTrapReference populated: ${trapPopulated}`);
    } catch (e) {
        console.error(`  Re-verify failed: ${e.message}`);
    }
}

function main() {
    const root = config.paths.root;
    const banks = config.caseBanks;

    console.log("=== Sprint 5.6D — Wave 3 Educational Metadata Migration ===");
    console.log("Populating: CognitiveLevel, CalculationComplexity, ReadingComplexity,");
    console.log("            DecisionComplexity, DifficultyDrivers, CommonTrapReference");
    console.log("");

    banks.forEach(file => {
        const fullPath = path.join(root, file);
        if (!fs.existsSync(fullPath)) { console.log(`File not found: ${file}`); return; }
        processFile(fullPath);
    });

    console.log("\n=== Wave 3 Migration Complete ===");
    console.log("Run `node scripts/validate.js` to verify results.");
}

if (require.main === module) {
    main();
}

module.exports = { main, processFile, deriveCognitiveLevel, deriveCalculationComplexity,
    deriveReadingComplexity, deriveDecisionComplexity, deriveDifficultyDrivers,
    deriveCommonTrapReference };
