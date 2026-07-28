/**
 * CMA Part 1 Exam Simulator — Sprint 5.6C
 * Wave 2 Blueprint and Accounting Metadata Migration
 *
 * Populates accounting and blueprint metadata requiring subject-matter expertise.
 * Only populates when confidence is HIGH (>= 90). Never guesses.
 *
 * POPULATES (case-level):
 *   BlueprintObjectives, Topic, Subtopic, PrimaryCompetency,
 *   SecondaryCompetencies, LearningObjectives
 *
 * POPULATES (item-level):
 *   FormulaReference, DecisionTreeReference, AccountingPrinciple,
 *   CalculationRequired (validate), BusinessInterpretation
 *
 * DO NOT MODIFY: Difficulty, DifficultyScore, CognitiveLevel,
 *   EstimatedMinutes, CommonTrapReference
 */

const fs = require("fs");
const path = require("path");
const CaseExtractor = require("./lib/CaseExtractor");
const config = require("./config");

// ── Reference Knowledge Maps ──────────────────────────────────────────

// Domain → major topics (from EXAM_BLUEPRINT.md)
const DOMAIN_TOPICS = {
    "A": ["Financial Statements", "Revenue Recognition", "Inventory Valuation",
          "Long-Lived Assets", "Intangible Assets", "Liabilities", "Equity",
          "Statement of Cash Flows", "Financial Ratios", "Financial Statement Analysis"],
    "B": ["Strategic Planning", "Budget Development", "Master Budget",
          "Operating Budget", "Financial Budget", "Sales Forecasting",
          "Production Budget", "Direct Materials Budget", "Direct Labor Budget",
          "Manufacturing Overhead Budget", "Cash Budget", "Flexible Budgets", "Forecast Revision"],
    "C": ["Standard Costing", "Cost Variances", "Responsibility Accounting",
          "Balanced Scorecard", "Key Performance Indicators", "Productivity Measures",
          "Benchmarking", "Transfer Pricing", "Performance Evaluation"],
    "D": ["Cost Behavior", "Cost Estimation", "Job Order Costing", "Process Costing",
          "Activity-Based Costing", "Joint Products", "Service Department Allocation",
          "Cost Allocation", "Cost Drivers", "Contribution Margin",
          "Cost-Volume-Profit Analysis", "Relevant Costs", "Differential Analysis", "Pricing Decisions"],
    "E": ["Corporate Governance", "Internal Control Objectives", "COSO Internal Control Framework",
          "COSO Enterprise Risk Management", "Risk Assessment", "Control Activities",
          "Information and Communication", "Monitoring", "Fraud Prevention", "Fraud Detection",
          "Segregation of Duties", "Ethics"],
    "F": ["Information Systems", "ERP Systems", "Data Governance", "Data Quality",
          "Cybersecurity", "Data Analytics", "Business Intelligence", "Artificial Intelligence",
          "Automation", "Emerging Technologies"]
};

// Topic → FormulaReference mapping (from FORMULA_MASTER.md)
const TOPIC_FORMULA = {
    "Revenue recognition": null,
    "Contract liabilities": null,
    "Statement of cash flows": null,
    "Deferred taxes": null,
    "External reporting judgment": null,
    "Consolidations": null,
    "Impairment": null,
    "OCI": null,
    "Financial reporting effects": null,
    "Production budget": "Production Budget",
    "Direct materials budget": "Direct Materials Purchases",
    "Cash budget": "Cash Budget",
    "Budgeting judgment": null,
    "Forecasting": null,
    "Sensitivity analysis": null,
    "Forecasting indicators": null,
    "Regression": "Regression Equation",
    "Rolling forecast": null,
    "Material price variance": "Material Price Variance",
    "Material quantity variance": "Material Quantity Variance",
    "Labor efficiency variance": "Labor Efficiency Variance",
    "Labor rate variance": "Labor Rate Variance",
    "Flexible budgeting": null,
    "Responsibility accounting": null,
    "Residual income": "Residual Income",
    "ROI": "Return on Investment",
    "Transfer pricing": null,
    "Performance measurement": null,
    "Performance management": null,
    "Activity-based costing": null,
    "Quality costs": null,
    "ABC distortion": null,
    "ABC": null,
    "Process costing": null,
    "Theory of constraints": null,
    "Lean operations": null,
    "Cost management": null,
    "CVP analysis": "Contribution Margin",
    "Break-even analysis": "Break-even Point (Units)",
    "Margin of safety": "Margin of Safety",
    "Operating leverage": "Degree of Operating Leverage",
    "Cash collections": "Cash Collections",
    "Cash disbursements": null,
    "Cash budget financing": null,
    "Cash budget analysis": null,
    "Cash budget management": null,
    "Sales forecasting": null,
    "Revenue budgeting": null,
    "Forecasting methods": null,
    "Cash collection analysis": null,
    "Cost classification": null,
    "Relevant costing": "Relevant Costs",
    "Contribution margin": "Contribution Margin",
    "Gross margin": null,
    "Product cost vs period cost": null,
    "Cost behavior": null,
    "Make or buy": "Relevant Costs",
    "Special order": "Relevant Costs",
    "Capital budgeting": null,
    "NPV": "Net Present Value",
    "IRR": "Internal Rate of Return",
    "Payback": "Payback Period",
    "Expected value": "Expected Value",
    "Standard deviation": "Standard Deviation",
    "Coefficient of variation": "Coefficient of Variation",
    "Inventory valuation": null,
    "LCM": null,
    "LCNRV": null,
    "FIFO": null,
    "LIFO": null,
    "Weighted average": null,
    "Inventory turnover": "Inventory Turnover",
    "Days inventory outstanding": "Days Inventory Outstanding",
    "AR turnover": "Accounts Receivable Turnover",
    "Days sales outstanding": "Days Sales Outstanding",
    "Joint cost allocation — NRV method": null,
    "Joint cost allocation — physical-units method": null,
    "Sell-or-process-further analysis": null,
    "Joint cost concepts": null,
    "Joint costing terminology": null,
    "Joint cost allocation methods": null,
    "Budget sequence": null,
    "Materials Budget": "Direct Materials Purchases",
    "Production Budget": "Production Budget",
    "Inventory": null,
    "Cash budget analysis": null,
    "Cash budget management": null,
    "Segregation of duties": null,
    "Fraud triangle": null,
    "COSO components": null,
    "Control environment": null,
    "Risk assessment": null,
    "Control activities": null,
    "Monitoring": null,
    "Information and communication": null,
    "ERM": null,
    "Data governance": null,
    "Data quality": null,
    "Cybersecurity": null,
    "Descriptive analytics": null,
    "Diagnostic analytics": null,
    "Predictive analytics": null,
    "Prescriptive analytics": null,
    "Joint cost allocation — NRV method": null,
    "Joint cost allocation — physical-units method": null
};

// Topic → DecisionTreeReference mapping (from ACCOUNTING_DECISION_TREES.md)
const TOPIC_DECISION_TREE = {
    "Revenue recognition": null,
    "Contract liabilities": null,
    "Statement of cash flows": null,
    "Deferred taxes": null,
    "External reporting judgment": null,
    "Consolidations": null,
    "Impairment": null,
    "OCI": null,
    "Financial reporting effects": null,
    "Production budget": "Budget Sequence",
    "Direct materials budget": "Budget Sequence",
    "Cash budget": "Budget Sequence",
    "Budgeting judgment": null,
    "Forecasting": null,
    "Sensitivity analysis": null,
    "Forecasting indicators": null,
    "Regression": "Regression",
    "Rolling forecast": null,
    "Material price variance": "Variance Analysis",
    "Material quantity variance": "Variance Analysis",
    "Labor efficiency variance": "Variance Analysis",
    "Labor rate variance": "Variance Analysis",
    "Flexible budgeting": "Flexible Budget",
    "Responsibility accounting": "Responsibility Centers",
    "Residual income": "Responsibility Centers",
    "ROI": "Responsibility Centers",
    "Transfer pricing": "Transfer Pricing",
    "Performance measurement": "Responsibility Centers",
    "Performance management": null,
    "Activity-based costing": null,
    "Quality costs": null,
    "ABC distortion": null,
    "ABC": null,
    "Process costing": null,
    "Theory of constraints": null,
    "Lean operations": null,
    "Cost management": null,
    "CVP analysis": "Cost Behavior",
    "Break-even analysis": "Cost Behavior",
    "Margin of safety": "Cost Behavior",
    "Operating leverage": "Cost Behavior",
    "Cash collections": "Budget Sequence",
    "Cash disbursements": "Budget Sequence",
    "Cash budget financing": "Budget Sequence",
    "Cash budget analysis": "Budget Sequence",
    "Cash budget management": "Budget Sequence",
    "Sales forecasting": null,
    "Revenue budgeting": null,
    "Forecasting methods": null,
    "Cash collection analysis": null,
    "Cost classification": "Cost Classification",
    "Relevant costing": "Relevant Costing",
    "Contribution margin": "Contribution Margin vs Gross Margin",
    "Gross margin": "Contribution Margin vs Gross Margin",
    "Product cost vs period cost": "Product Cost vs Period Cost",
    "Cost behavior": "Cost Behavior",
    "Make or buy": "Relevant Costing",
    "Special order": "Relevant Costing",
    "Capital budgeting": "Capital Budgeting",
    "NPV": "Capital Budgeting",
    "IRR": "Capital Budgeting",
    "Payback": "Capital Budgeting",
    "Expected value": "Expected Value",
    "Standard deviation": "Expected Value",
    "Coefficient of variation": "Expected Value",
    "Inventory valuation": null,
    "LCM": null,
    "LCNRV": null,
    "FIFO": null,
    "LIFO": null,
    "Weighted average": null,
    "Inventory turnover": "Financial Statement Ratios",
    "Days inventory outstanding": "Financial Statement Ratios",
    "AR turnover": "Financial Statement Ratios",
    "Days sales outstanding": "Financial Statement Ratios",
    "Joint cost allocation — NRV method": null,
    "Joint cost allocation — physical-units method": null,
    "Sell-or-process-further analysis": null,
    "Joint cost concepts": null,
    "Joint costing terminology": null,
    "Joint cost allocation methods": null,
    "Budget sequence": "Budget Sequence",
    "Materials Budget": "Budget Sequence",
    "Production Budget": "Budget Sequence",
    "Inventory": null,
    "Segregation of duties": "Internal Controls (COSO)",
    "Fraud triangle": "Fraud",
    "COSO components": "Internal Controls (COSO)",
    "Control environment": "Internal Controls (COSO)",
    "Risk assessment": "Internal Controls (COSO)",
    "Control activities": "Internal Controls (COSO)",
    "Monitoring": "Internal Controls (COSO)",
    "Information and communication": "Internal Controls (COSO)",
    "ERM": "COSO ERM",
    "Data governance": null,
    "Data quality": null,
    "Cybersecurity": null,
    "Descriptive analytics": "Technology & Analytics",
    "Diagnostic analytics": "Technology & Analytics",
    "Predictive analytics": "Technology & Analytics",
    "Prescriptive analytics": "Technology & Analytics",
    "Joint cost allocation — NRV method": null
};

// Topic → AccountingPrinciple mapping
const TOPIC_PRINCIPLE = {
    "Revenue recognition": "ASC 606 requires revenue recognition when control transfers to the customer.",
    "Contract liabilities": "ASC 606 defines contract liabilities as obligations to transfer goods/services for which consideration has been received.",
    "Statement of cash flows": "ASC 230 requires classification of cash flows into operating, investing, and financing activities.",
    "Deferred taxes": "ASC 740 requires recognition of deferred tax liabilities for temporary differences that will result in future taxable amounts.",
    "Consolidations": "ASC 810 requires consolidation when a parent has controlling financial interest (usually >50% ownership).",
    "Impairment": "ASC 360 requires impairment testing when events indicate carrying amount may not be recoverable.",
    "OCI": "ASC 220 defines other comprehensive income as revenues/expenses excluded from net income under GAAP.",
    "Production budget": "Production budget formula: Budgeted Sales + Desired Ending Inventory - Beginning Inventory.",
    "Direct materials budget": "Direct materials purchases: Materials Needed + Desired Ending Materials - Beginning Materials.",
    "Cash budget": "Cash budget: Beginning Cash + Cash Receipts - Cash Disbursements = Ending Cash.",
    "Cash collections": "Cash collections include cash sales and collections of prior credit sales.",
    "Material price variance": "Material Price Variance = AQ x (AP - SP). Actual Quantity used, comparing actual vs standard price.",
    "Material quantity variance": "Material Quantity Variance = SP x (AQ - SQ). Standard Price used, comparing actual vs standard quantity.",
    "Labor efficiency variance": "Labor Efficiency Variance = SR x (AH - SH). Standard Rate used, comparing actual vs standard hours.",
    "Labor rate variance": "Labor Rate Variance = AH x (AR - SR). Actual Hours used, comparing actual vs standard rate.",
    "Flexible budgeting": "Flexible budgets compare actual results to budgeted amounts at actual activity level.",
    "Responsibility accounting": "Responsibility accounting assigns revenue/cost control to managers based on their decision authority.",
    "Residual income": "Residual Income = Operating Income - (Required Rate of Return x Average Operating Assets).",
    "ROI": "Return on Investment = Operating Income / Average Operating Assets.",
    "Transfer pricing": "Transfer price should promote goal congruence; minimum = variable cost + opportunity cost.",
    "Activity-based costing": "ABC assigns overhead using activity cost drivers rather than single volume-based allocation.",
    "Quality costs": "Quality costs are classified as prevention, appraisal, internal failure, or external failure.",
    "Process costing": "Process costing computes equivalent units = completed units + (WIP x completion%).",
    "Theory of constraints": "The bottleneck operation constrains throughput; improve the lowest-capacity resource.",
    "Lean operations": "Lean emphasizes waste reduction, continuous improvement, and pull-based production flow.",
    "CVP analysis": "Contribution Margin = Sales - Variable Costs. Used for break-even and target profit analysis.",
    "Cost classification": "Relevant costs are future costs that differ between alternatives; sunk costs are irrelevant.",
    "Relevant costing": "Only future costs that differ between alternatives are relevant for decision making.",
    "Contribution margin": "Contribution Margin = Sales - Variable Costs. Measures amount available to cover fixed costs.",
    "Joint cost allocation": "Joint costs are allocated to products using NRV, physical-units, or sales-value methods.",
    "Sell-or-process-further": "Process further only if incremental revenue exceeds incremental costs.",
    "Budget sequence": "Budgets follow sequence: Sales > Production > Materials > Labor > Overhead > Cash > Financial Statements.",
    "Sales forecasting": "Sales forecasting uses trend analysis, seasonal adjustment, or qualitative methods.",
    "Forecasting methods": "Forecasting methods include trend analysis, seasonal adjustment, moving average, and regression.",
    "Cost behavior": "Costs classified as variable, fixed, or mixed based on how total cost changes with activity.",
    "Capital budgeting": "NPV = PV of Cash Inflows - Initial Investment; accept if positive.",
    "NPV": "Net Present Value = Present Value of Cash Inflows - Initial Investment.",
    "IRR": "Internal Rate of Return is the discount rate that produces NPV = 0.",
    "Payback": "Payback Period = Initial Investment / Annual Cash Inflows; ignores time value of money.",
    "Expected value": "Expected Value = Sum of (Probability x Outcome) across all possible outcomes.",
    "Regression": "Regression analysis estimates relationship between variables: Y = a + bX.",
    "Inventory valuation": "FIFO inventory valued at lower of cost or NRV under GAAP.",
    "LCM": "Lower of cost or market applies to LIFO/retail inventory method.",
    "LCNRV": "Lower of cost or NRV applies to FIFO/average cost inventory method.",
    "Segregation of duties": "Incompatible duties (authorization, custody, recordkeeping) should be separated.",
    "Fraud triangle": "Fraud requires three elements: pressure, opportunity, and rationalization.",
    "COSO components": "COSO Internal Control Framework includes five components: Control Environment, Risk Assessment, Control Activities, Information & Communication, Monitoring.",
    "Control environment": "Control Environment sets the tone of the organization; includes ethics and integrity.",
    "Risk assessment": "Risk Assessment identifies and analyzes risks to achieving objectives.",
    "Control activities": "Control Activities are policies and procedures that ensure management directives are carried out.",
    "Monitoring": "Monitoring evaluates whether internal controls continue to operate effectively.",
    "Information and communication": "Information and Communication ensures relevant information flows through the organization.",
    "ERM": "COSO ERM integrates strategy, objectives, and performance across the enterprise.",
    "Cybersecurity": "Cybersecurity controls protect information systems; encryption complements access controls.",
    "Data governance": "Data governance establishes policies for data quality, security, and usage.",
    "Data analytics": "Analytics types: Descriptive (what happened), Diagnostic (why), Predictive (what will happen), Prescriptive (what to do).",
    "Descriptive analytics": "Descriptive analytics summarizes historical data to answer 'What happened?'",
    "Diagnostic analytics": "Diagnostic analytics examines data to answer 'Why did it happen?'",
    "Predictive analytics": "Predictive analytics uses models to answer 'What will happen?'",
    "Prescriptive analytics": "Prescriptive analytics recommends actions to answer 'What should we do?'"
};

// Item Type → PrimaryCompetency (derivation)
function derivePrimaryCompetencyFromType(type) {
    const map = {
        "numeric": "Calculation",
        "select": "Analysis",
        "multi": "Analysis",
        "fill": "Conceptual",
        "match": "Analysis"
    };
    return map[type] || "Analysis";
}

// Determine CalculationRequired
function isCalculationRequired(item) {
    if (item.Type === "numeric") return true;
    const prompt = (item.Prompt || "").toLowerCase();
    const explanation = (item.Explanation || "").toLowerCase();
    const calcKeywords = ["calculate", "compute", "enter ", "what is", "how much", "enter the",
        "total ", "amount", "cost ", "revenue", "variance", "budget", "forecast",
        "cash ", "ratio", "percentage", "return", "income", "profit"];
    if (calcKeywords.some(k => prompt.includes(k) || explanation.includes(k))) return true;
    return false;
}

// Extract BusinessInterpretation from explanation
function extractBusinessInterpretation(explanation) {
    if (!explanation || explanation.length < 50) return null;
    // Look for interpretive phrases in the explanation
    const interpretationMarkers = [
        /(?:means that|indicates that|shows that|suggests that|implies that|results? in|leads? to|therefore,?|thus,?|consequently|this means)/i,
        /(?:the (?:company|firm|business|division|product) (?:should|must|will|needs? to|can|could|would|has|have|faces|requires|benefits|saves|incurs|reports|recognizes|records|eliminates|reduces|increases|decreases))/i,
        /(?:to (?:maintain|meet|achieve|avoid|prevent|ensure|determine|calculate))/i,
        /(?:is (?:above|below|equal to|greater than|less than|higher than|lower than|consistent with|inconsistent with|appropriate|required|necessary))/i,
        /(?:a common (?:error|mistake|trap) (?:is|would be))/i
    ];
    for (const marker of interpretationMarkers) {
        const m = explanation.match(marker);
        if (m) {
            const idx = m.index;
            // Extract a meaningful sentence fragment
            const start = Math.max(0, idx - 20);
            const end = Math.min(explanation.length, idx + 120);
            let fragment = explanation.substring(start, end).trim();
            if (fragment.length > 120) fragment = fragment.substring(0, 120) + "...";
            return fragment;
        }
    }
    // Fallback: use the last sentence of the explanation if it's interpretive
    const sentences = explanation.split(/[.!?]+/).filter(s => s.trim().length > 20);
    const lastSentence = sentences[sentences.length - 1];
    if (lastSentence && lastSentence.length > 30 && lastSentence.length < 200) {
        // Check if it sounds interpretive rather than procedural
        const interpretiveWords = ["should", "must", "will", "requires", "indicates",
            "means", "therefore", "common error", "common mistake"];
        if (interpretiveWords.some(w => lastSentence.toLowerCase().includes(w))) {
            return lastSentence.trim() + ".";
        }
    }
    return null;
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

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

const TODAY = "2026-07-20";

// ── Case-Level Derivation ────────────────────────────────────────────

function getSection(c) {
    const tags = c.SectionTags || [];
    return tags.length > 0 ? tags[0] : "";
}

/**
 * Derive BlueprintObjectives from case title, scenario text, and section.
 * Uses keyword matching against blueprint topics per domain.
 */
function deriveBlueprintObjectives(c) {
    const section = getSection(c);
    const domainTopics = DOMAIN_TOPICS[section] || [];
    if (domainTopics.length === 0) return null;

    const title = (c.Title || "").toLowerCase();
    const scenario = (c.ScenarioText || "").toLowerCase();
    const combined = title + " " + scenario;

    const matched = [];

    // Map domain topics to blueprint objective strings
    const topicToBlueprint = {};
    if (section === "A") {
        topicToBlueprint["Financial Statements"] = "Financial statement preparation and analysis";
        topicToBlueprint["Revenue Recognition"] = "Revenue recognition under ASC 606";
        topicToBlueprint["Inventory Valuation"] = "Inventory valuation methods (FIFO, LIFO, weighted average)";
        topicToBlueprint["Long-Lived Assets"] = "Long-lived asset accounting including impairment";
        topicToBlueprint["Intangible Assets"] = "Intangible asset recognition and amortization";
        topicToBlueprint["Liabilities"] = "Liability recognition and measurement";
        topicToBlueprint["Equity"] = "Equity transactions and reporting";
        topicToBlueprint["Statement of Cash Flows"] = "Statement of cash flows preparation and analysis";
        topicToBlueprint["Financial Ratios"] = "Financial ratio computation and interpretation";
        topicToBlueprint["Financial Statement Analysis"] = "Financial statement analysis for decision-making";
    } else if (section === "B") {
        topicToBlueprint["Strategic Planning"] = "Strategic planning process";
        topicToBlueprint["Budget Development"] = "Budget development process";
        topicToBlueprint["Master Budget"] = "Master budget components and preparation";
        topicToBlueprint["Operating Budget"] = "Operating budget preparation";
        topicToBlueprint["Financial Budget"] = "Financial budget preparation";
        topicToBlueprint["Sales Forecasting"] = "Sales forecasting methods";
        topicToBlueprint["Production Budget"] = "Production budget preparation";
        topicToBlueprint["Direct Materials Budget"] = "Direct materials budget calculation";
        topicToBlueprint["Direct Labor Budget"] = "Direct labor budget preparation";
        topicToBlueprint["Manufacturing Overhead Budget"] = "Manufacturing overhead budgeting";
        topicToBlueprint["Cash Budget"] = "Cash budget preparation";
        topicToBlueprint["Flexible Budgets"] = "Flexible budget preparation and analysis";
        topicToBlueprint["Forecast Revision"] = "Forecast revision and rolling forecasts";
    } else if (section === "C") {
        topicToBlueprint["Standard Costing"] = "Standard costing systems";
        topicToBlueprint["Cost Variances"] = "Cost variance analysis";
        topicToBlueprint["Responsibility Accounting"] = "Responsibility center performance evaluation";
        topicToBlueprint["Balanced Scorecard"] = "Balanced scorecard framework";
        topicToBlueprint["Key Performance Indicators"] = "KPI identification and interpretation";
        topicToBlueprint["Productivity Measures"] = "Productivity measurement";
        topicToBlueprint["Benchmarking"] = "Benchmarking analysis";
        topicToBlueprint["Transfer Pricing"] = "Transfer pricing methods";
        topicToBlueprint["Performance Evaluation"] = "Performance evaluation techniques";
    } else if (section === "D") {
        topicToBlueprint["Cost Behavior"] = "Cost behavior analysis";
        topicToBlueprint["Cost Estimation"] = "Cost estimation methods";
        topicToBlueprint["Job Order Costing"] = "Job order costing";
        topicToBlueprint["Process Costing"] = "Process costing";
        topicToBlueprint["Activity-Based Costing"] = "Activity-based costing";
        topicToBlueprint["Joint Products"] = "Joint product costing";
        topicToBlueprint["Service Department Allocation"] = "Service department cost allocation";
        topicToBlueprint["Cost Allocation"] = "Cost allocation methods";
        topicToBlueprint["Cost Drivers"] = "Cost driver identification";
        topicToBlueprint["Contribution Margin"] = "Contribution margin analysis";
        topicToBlueprint["Cost-Volume-Profit Analysis"] = "CVP analysis for decision-making";
        topicToBlueprint["Relevant Costs"] = "Relevant cost analysis";
        topicToBlueprint["Differential Analysis"] = "Differential analysis";
        topicToBlueprint["Pricing Decisions"] = "Pricing decisions";
    } else if (section === "E") {
        topicToBlueprint["Corporate Governance"] = "Corporate governance principles";
        topicToBlueprint["Internal Control Objectives"] = "Internal control objectives";
        topicToBlueprint["COSO Internal Control Framework"] = "COSO internal control framework";
        topicToBlueprint["COSO Enterprise Risk Management"] = "COSO ERM framework";
        topicToBlueprint["Risk Assessment"] = "Risk assessment process";
        topicToBlueprint["Control Activities"] = "Control activities";
        topicToBlueprint["Information and Communication"] = "Information and communication";
        topicToBlueprint["Monitoring"] = "Monitoring of controls";
        topicToBlueprint["Fraud Prevention"] = "Fraud prevention";
        topicToBlueprint["Fraud Detection"] = "Fraud detection";
        topicToBlueprint["Segregation of Duties"] = "Segregation of duties";
        topicToBlueprint["Ethics"] = "Ethical considerations";
    } else if (section === "F") {
        topicToBlueprint["Information Systems"] = "Information systems in management accounting";
        topicToBlueprint["ERP Systems"] = "ERP system implementation and use";
        topicToBlueprint["Data Governance"] = "Data governance";
        topicToBlueprint["Data Quality"] = "Data quality management";
        topicToBlueprint["Cybersecurity"] = "Cybersecurity controls";
        topicToBlueprint["Data Analytics"] = "Data analytics for decision-making";
        topicToBlueprint["Business Intelligence"] = "Business intelligence tools";
        topicToBlueprint["Artificial Intelligence"] = "AI in accounting";
        topicToBlueprint["Automation"] = "Automation of accounting processes";
        topicToBlueprint["Emerging Technologies"] = "Emerging technology evaluation";
    }

    // Match keywords from title and scenario to blueprint objectives
    for (const [topic, blueprint] of Object.entries(topicToBlueprint)) {
        const topicLower = topic.toLowerCase();
        // Extract key terms from the topic
        const terms = topicLower.split(/\s+/).filter(w => w.length > 3 && w !== "and" && w !== "for");
        const matchCount = terms.filter(t => combined.includes(t)).length;
        const ratio = terms.length > 0 ? matchCount / terms.length : 0;
        if (ratio >= 0.5 && matchCount >= 1) {
            matched.push(blueprint);
        }
    }

    // Also check item topics
    (c.Items || []).forEach(item => {
        const itemTopic = (item.Topic || "").toLowerCase();
        for (const [topic, blueprint] of Object.entries(topicToBlueprint)) {
            const topicLower = topic.toLowerCase();
            if (itemTopic.includes(topicLower) || topicLower.includes(itemTopic)) {
                if (!matched.includes(blueprint)) matched.push(blueprint);
            }
        }
    });

    // Extended topic-to-blueprint mappings for common accounting topics not in the blueprint master list
    const extendedBPs = {
        "Consolidations": "Consolidated financial statements",
        "Impairment": "Long-lived asset impairment testing",
        "OCI": "Other comprehensive income classification",
        "Leases": "Lease accounting under ASC 842",
        "Bonds": "Bond payable accounting and amortization",
        "Deferred taxes": "Deferred tax accounting",
        "Revenue recognition": "Revenue recognition under ASC 606",
        "Statement of cash flows": "Statement of cash flows preparation and analysis",
        "Goodwill": "Goodwill impairment testing",
        "Intangibles": "Intangible asset accounting",
        "Warranties": "Warranty liability estimation",
        "Contingencies": "Contingent liability recognition",
        "ASC 606": "Revenue recognition under ASC 606",
        "Inventory": "Inventory valuation methods",
        "Receivables": "Receivables valuation and allowance for doubtful accounts",
        "Cash Flows": "Statement of cash flows preparation and analysis",
        "Comprehensive Income": "Other comprehensive income items",
        "Treasury Stock": "Equity transactions and reporting",
        "Bonds Payable": "Bond payable accounting and amortization"
    };
    const titleLower = (c.Title || "").toLowerCase();
    const scenarioLower = (c.ScenarioText || "").toLowerCase();
    for (const [keyword, bp] of Object.entries(extendedBPs)) {
        const kw = keyword.toLowerCase();
        if (titleLower.includes(kw) || scenarioLower.includes(kw)) {
            if (!matched.includes(bp)) matched.push(bp);
        }
    }
    // Check item topics against extended list
    (c.Items || []).forEach(item => {
        const itemTopic = (item.Topic || "").toLowerCase();
        for (const [keyword, bp] of Object.entries(extendedBPs)) {
            const kw = keyword.toLowerCase();
            if (itemTopic.includes(kw) || kw.includes(itemTopic)) {
                if (!matched.includes(bp)) matched.push(bp);
            }
        }
    });

    if (matched.length === 0) return null;

    // Deduplicate and limit to reasonable number
    const unique = [...new Set(matched)];
    return unique.length <= 8 ? unique : unique.slice(0, 8);
}

/**
 * Derive Topic from case title and primary focus.
 */
function deriveCaseTopic(c) {
    // Use the most common item topic if available
    const itemTopics = (c.Items || []).map(i => i.Topic).filter(Boolean);
    if (itemTopics.length > 0) {
        const topicCounts = {};
        itemTopics.forEach(t => { topicCounts[t] = (topicCounts[t] || 0) + 1; });
        const sorted = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]);
        const best = sorted[0];
        // If there's a clear dominant topic (> 30% of items), use it
        if (best && best[1] >= itemTopics.length * 0.3) {
            // Verify it's not a placeholder topic (single letter like C, D, E, F)
            if (best[0].length > 1) return best[0];
        }
    }

    const title = (c.Title || "");
    const scenario = (c.ScenarioText || "");

    // Try to derive from title using pattern matching
    const titleLower = title.toLowerCase();
    const scenarioLower = scenario.toLowerCase();

    // Domain-specific topic derivation
    const section = getSection(c);
    const domainTopics = DOMAIN_TOPICS[section] || [];

    // Also support common accounting-specific topics not in the domain master list
    const extendedTopics = {
        "A": [...domainTopics, "Consolidations", "Impairment", "Leases", "Bonds",
              "Deferred Taxes", "OCI", "Revenue Recognition", "Cash Flows",
              "Inventory Valuation", "Warranties", "Contingencies", "Goodwill", "Intangibles"],
        "B": [...domainTopics, "Cash Budgeting", "CVP Analysis", "Contribution Margin",
              "Break-even Analysis", "Forecasting", "High-Low Method", "Cost Behavior"],
        "C": [...domainTopics, "Variance Analysis", "Flexible Budget", "Balanced Scorecard",
              "Customer Profitability", "Sales Variances", "Mix and Yield Variances"],
        "D": [...domainTopics, "Absorption Costing", "Variable Costing", "Job Order Costing",
              "Throughput", "TOC", "JIT", "Lean", "Quality Costs", "Transfer Pricing",
              "Value Chain", "Six Sigma", "Capacity Management", "Supply Chain"],
        "E": [...domainTopics, "Segregation of Duties", "Fraud", "IT Controls",
              "Business Continuity", "Internal Audit", "Cybersecurity", "Data Privacy",
              "RPA", "FCPA", "Application Controls"],
        "F": [...domainTopics, "Big Data", "Cloud Computing", "AI", "Machine Learning",
              "Data Visualization", "Blockchain", "RPA", "System Development Life Cycle"]
    };
    const searchTopics = extendedTopics[section] || domainTopics;

    // Score each topic against the combined text
    let bestTopic = null;
    let bestScore = 0;
    for (const topic of searchTopics) {
        const terms = topic.toLowerCase().split(/\s+/).filter(w => w.length > 3 && w !== "and");
        let score = 0;
        for (const term of terms) {
            if (titleLower.includes(term)) score += 3;
            if (scenarioLower.includes(term)) score += 1;
        }
        if (score > bestScore) {
            bestScore = score;
            bestTopic = topic;
        }
    }

    if (bestScore >= 2) return bestTopic;

    // Last resort: use first non-placeholder item topic
    if (itemTopics.length > 0) {
        const real = itemTopics.find(t => t.length > 1 && !/^[A-F]$/.test(t));
        if (real) return real;
    }

    return null;
}

/**
 * Derive Subtopic from case content.
 */
function deriveSubtopic(c) {
    const section = getSection(c);
    const title = (c.Title || "").toLowerCase();
    const scenario = (c.ScenarioText || "").toLowerCase();
    const combined = title + " " + scenario;

    // Known subtopic patterns
    const subtopicPatterns = [
        // Domain A - Financial Reporting
        { keywords: ["asc 606", "performance obligation", "contract"], value: "Revenue recognition under ASC 606" },
        { keywords: ["fifo", "lifo", "weighted average", "inventory cost"], value: "Inventory cost flow assumptions" },
        { keywords: ["lower of cost", "nrv", "lcm", "write-down"], value: "Inventory valuation and write-downs" },
        { keywords: ["impairment", "recoverability", "fair value"], value: "Asset impairment testing" },
        { keywords: ["deferred tax", "temporary difference", "tax basis"], value: "Deferred tax accounting" },
        { keywords: ["consolidation", "intercompany", "noncontrolling", "subsidiary"], value: "Consolidation accounting" },
        { keywords: ["cash flow", "indirect method", "operating"], value: "Statement of cash flows preparation" },
        { keywords: ["oci", "other comprehensive income", "translation"], value: "Other comprehensive income items" },
        // Domain B - Budgeting
        { keywords: ["production budget", "required production", "units to produce"], value: "Production planning" },
        { keywords: ["materials budget", "purchases budget", "raw material"], value: "Direct materials planning" },
        { keywords: ["cash budget", "borrowing", "financing", "collections", "disbursements"], value: "Cash flow forecasting" },
        { keywords: ["sales forecast", "trend growth", "seasonal"], value: "Sales forecasting techniques" },
        { keywords: ["rolling forecast", "planning horizon"], value: "Rolling forecast methodology" },
        { keywords: ["regression", "r-squared", "cost formula"], value: "Regression analysis for forecasting" },
        // Domain C - Performance
        { keywords: ["material price variance", "mpv"], value: "Direct material variance analysis" },
        { keywords: ["material quantity variance", "mqv"], value: "Direct material usage analysis" },
        { keywords: ["labor efficiency", "labor rate"], value: "Direct labor variance analysis" },
        { keywords: ["flexible budget", "static budget", "actual vs"], value: "Flexible budget analysis" },
        { keywords: ["roi", "return on investment", "residual income"], value: "Investment center performance" },
        { keywords: ["transfer price", "idle capacity"], value: "Transfer pricing with idle capacity" },
        // Domain D - Cost
        { keywords: ["activity-based", "abc", "cost driver", "activity pool"], value: "Activity-based costing" },
        { keywords: ["process costing", "equivalent units", "wip"], value: "Process costing" },
        { keywords: ["joint cost", "split-off", "nrv method", "physical units"], value: "Joint cost allocation" },
        { keywords: ["sell or process further", "further processing"], value: "Sell-or-process-further decisions" },
        { keywords: ["bottleneck", "theory of constraints", "capacity"], value: "Bottleneck analysis" },
        { keywords: ["quality cost", "prevention", "appraisal", "failure"], value: "Quality cost classification" },
        { keywords: ["relevant cost", "sunk cost", "opportunity cost"], value: "Relevant cost analysis" },
        // Domain E - Internal Controls
        { keywords: ["coso", "control environment", "control activities", "monitoring"], value: "COSO internal control components" },
        { keywords: ["erm", "enterprise risk", "risk appetite"], value: "COSO ERM framework" },
        { keywords: ["fraud triangle", "pressure", "opportunity", "rationalization"], value: "Fraud risk assessment" },
        { keywords: ["segregation of duties", "incompatible duties"], value: "Segregation of duties" },
        // Domain F - Technology
        { keywords: ["data governance", "data quality"], value: "Data management and governance" },
        { keywords: ["cybersecurity", "encryption", "access control"], value: "Cybersecurity controls" },
        { keywords: ["descriptive", "diagnostic", "predictive", "prescriptive"], value: "Data analytics classification" },
        { keywords: ["erp", "enterprise resource"], value: "ERP systems" }
    ];

    for (const pattern of subtopicPatterns) {
        if (pattern.keywords.some(k => combined.includes(k))) {
            return pattern.value;
        }
    }

    return null;
}

/**
 * Derive PrimaryCompetency from the case's items.
 */
function derivePrimaryCompetency(c) {
    // Count by item type → competency
    const types = (c.Items || []).map(i => i.Type);
    if (types.length === 0) return null;

    const competencyCounts = {};
    types.forEach(t => {
        const comp = derivePrimaryCompetencyFromType(t);
        competencyCounts[comp] = (competencyCounts[comp] || 0) + 1;
    });

    const sorted = Object.entries(competencyCounts).sort((a, b) => b[1] - a[1]);
    return sorted[0][0];
}

/**
 * Derive SecondaryCompetencies from item types (secondary competency types used).
 */
function deriveSecondaryCompetencies(c) {
    const primary = derivePrimaryCompetency(c);
    const types = (c.Items || []).map(i => i.Type);
    const seen = new Set();
    types.forEach(t => {
        const comp = derivePrimaryCompetencyFromType(t);
        if (comp !== primary) seen.add(comp);
    });
    return seen.size > 0 ? [...seen] : [];
}

/**
 * Generate LearningObjectives from BlueprintObjectives.
 */
function deriveLearningObjectives(c, blueprintObjectives) {
    if (!blueprintObjectives || blueprintObjectives.length === 0) return null;
    return blueprintObjectives.map(obj => {
        // Convert blueprint objective to learning objective
        const lower = obj.toLowerCase();
        if (lower.startsWith("analyze ") || lower.startsWith("evaluate ") ||
            lower.startsWith("calculate ") || lower.startsWith("prepare ") ||
            lower.startsWith("apply ")) return obj;
        return "Analyze " + obj.charAt(0).toLowerCase() + obj.slice(1);
    });
}

// ── Build Case Metadata ──────────────────────────────────────────────

function buildCaseMetadata(c) {
    const fields = {};
    let confidence = 100;

    // BlueprintObjectives
    if (!c.BlueprintObjectives || c.BlueprintObjectives.length === 0) {
        const bos = deriveBlueprintObjectives(c);
        if (bos && bos.length > 0) {
            fields.BlueprintObjectives = bos;
        } else {
            confidence = Math.min(confidence, 70);
        }
    }

    // Topic (case-level)
    if (!c.Topic) {
        const topic = deriveCaseTopic(c);
        if (topic) {
            fields.Topic = topic;
        } else {
            confidence = Math.min(confidence, 70);
        }
    }

    // Subtopic (case-level, optional)
    if (!c.Subtopic) {
        const subtopic = deriveSubtopic(c);
        if (subtopic) {
            fields.Subtopic = subtopic;
        }
    }

    // PrimaryCompetency
    if (!c.PrimaryCompetency) {
        const comp = derivePrimaryCompetency(c);
        if (comp) {
            fields.PrimaryCompetency = comp;
        } else {
            confidence = Math.min(confidence, 80);
        }
    }

    // SecondaryCompetencies (new field)
    if (!c.SecondaryCompetencies) {
        const sec = deriveSecondaryCompetencies(c);
        if (sec.length > 0) {
            fields.SecondaryCompetencies = sec;
        } else {
            fields.SecondaryCompetencies = [];
        }
    }

    // LearningObjectives
    if (!c.LearningObjectives || c.LearningObjectives.length === 0) {
        const los = deriveLearningObjectives(c, fields.BlueprintObjectives || c.BlueprintObjectives);
        if (los && los.length > 0) {
            fields.LearningObjectives = los;
        } else {
            confidence = Math.min(confidence, 75);
        }
    }

    // Confidence (update only if missing)
    if (c.Confidence === undefined) {
        fields.Confidence = confidence;
    }

    return fields;
}

// ── Item-Level Derivation ────────────────────────────────────────────

function buildItemMetadata(item) {
    const fields = {};
    const topic = (item.Topic || "").trim();
    const prompt = (item.Prompt || "").trim();
    const explanation = (item.Explanation || "").trim();
    const type = (item.Type || "").trim();

    // FormulaReference
    if (!item.FormulaReference && topic) {
        // Try exact match first
        let formula = TOPIC_FORMULA[topic] || null;
        // Fallback: try partial match
        if (!formula) {
            for (const [key, val] of Object.entries(TOPIC_FORMULA)) {
                if (val && (topic.toLowerCase().includes(key.toLowerCase()) ||
                    key.toLowerCase().includes(topic.toLowerCase()))) {
                    formula = val;
                    break;
                }
            }
        }
        if (formula) fields.FormulaReference = formula;
    }

    // DecisionTreeReference
    if (!item.DecisionTreeReference && topic) {
        let dt = TOPIC_DECISION_TREE[topic] || null;
        if (!dt) {
            for (const [key, val] of Object.entries(TOPIC_DECISION_TREE)) {
                if (val && (topic.toLowerCase().includes(key.toLowerCase()) ||
                    key.toLowerCase().includes(topic.toLowerCase()))) {
                    dt = val;
                    break;
                }
            }
        }
        if (dt) fields.DecisionTreeReference = dt;
    }

    // AccountingPrinciple
    if (!item.AccountingPrinciple && topic) {
        let principle = TOPIC_PRINCIPLE[topic] || null;
        if (!principle) {
            for (const [key, val] of Object.entries(TOPIC_PRINCIPLE)) {
                if (topic.toLowerCase().includes(key.toLowerCase()) ||
                    key.toLowerCase().includes(topic.toLowerCase())) {
                    principle = val;
                    break;
                }
            }
        }
        if (principle) fields.AccountingPrinciple = principle;
    }

    // CalculationRequired (validate existing or set new)
    if (item.CalculationRequired === undefined) {
        fields.CalculationRequired = isCalculationRequired(item);
    } else {
        // Validate existing value
        const expected = isCalculationRequired(item);
        if (item.CalculationRequired !== expected) {
            // Only override if it's clearly wrong
            if (type === "numeric" && item.CalculationRequired !== true) {
                fields.CalculationRequired = true;
            } else if (type !== "numeric" && item.CalculationRequired === true) {
                // Check if it really needs calculation
                const calcPrompt = isCalculationRequired(item);
                if (!calcPrompt) {
                    // Keep existing value — could be a conceptual question about a calculation
                }
            }
        }
    }

    // BusinessInterpretation
    if (!item.BusinessInterpretation) {
        const interp = extractBusinessInterpretation(explanation);
        if (interp) fields.BusinessInterpretation = interp;
    }

    return fields;
}

// ── File Processing ──────────────────────────────────────────────────

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
    let bpPopulated = 0;
    let topicPopulated = 0;
    let compPopulated = 0;
    let loPopulated = 0;
    let formulaPopulated = 0;
    let dtPopulated = 0;
    let principlePopulated = 0;
    let calcSet = 0;
    let bizInterp = 0;
    let skipLowConf = 0;

    const caseBlocks = cases.map((c, idx) => {
        // Build case-level additions
        const caseMeta = buildCaseMetadata(c);
        if (caseMeta.BlueprintObjectives && !c.BlueprintObjectives) bpPopulated++;
        if (caseMeta.Topic && !c.Topic) topicPopulated++;
        if (caseMeta.PrimaryCompetency && !c.PrimaryCompetency) compPopulated++;
        if (caseMeta.LearningObjectives && !c.LearningObjectives) loPopulated++;

        // Apply case-level fields
        const mergedCase = {};
        Object.keys(c).forEach(k => { mergedCase[k] = c[k]; });
        Object.keys(caseMeta).forEach(k => { mergedCase[k] = caseMeta[k]; });

        const caseIndent = indent + "  ";
        const lines = [];

        // Order fields: headers, then alpha
        const HEADER_FIELDS = ["Pack", "Section", "CaseID", "Title", "SectionTags", "BlueprintDomain",
            "BlueprintObjectives", "Topic", "Subtopic", "PrimaryCompetency", "SecondaryCompetencies"];
        const allKeys = Object.keys(mergedCase).filter(k => k !== "ScenarioText" && k !== "Exhibits" && k !== "Items");
        const headerKeys = allKeys.filter(k => HEADER_FIELDS.includes(k));
        const otherKeys = allKeys.filter(k => !HEADER_FIELDS.includes(k)).sort();

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

        // Items
        lines.push(`${caseIndent}Items: [`);
        (c.Items || []).forEach((item, i) => {
            const itemMeta = buildItemMetadata(item);
            const mergedItem = {};
            Object.keys(item).forEach(k => { mergedItem[k] = item[k]; });
            Object.keys(itemMeta).forEach(k => { mergedItem[k] = itemMeta[k]; });

            if (itemMeta.FormulaReference && !item.FormulaReference) formulaPopulated++;
            if (itemMeta.DecisionTreeReference && !item.DecisionTreeReference) dtPopulated++;
            if (itemMeta.AccountingPrinciple && !item.AccountingPrinciple) principlePopulated++;
            if (itemMeta.CalculationRequired !== undefined && item.CalculationRequired === undefined) calcSet++;
            if (itemMeta.BusinessInterpretation && !item.BusinessInterpretation) bizInterp++;

            totalItems++;
            const itemStr = serializeValue(mergedItem, exhIndent);
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
    const bakPath = filePath + ".bak3";
    if (!fs.existsSync(bakPath)) {
        fs.writeFileSync(bakPath, content, "utf8");
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
        console.log(`    Cases: BlueprintObjectives=${bpPopulated}, Topic=${topicPopulated}, Competency=${compPopulated}, LearningObj=${loPopulated}`);
        console.log(`    Items: FormulaRef=${formulaPopulated}, DecisionTree=${dtPopulated}, Principle=${principlePopulated}, CalcReq=${calcSet}, BizInterp=${bizInterp}`);
        console.log(`    Total items processed: ${totalItems}`);
    } catch (e) {
        console.error(`  Re-verify failed: ${e.message}`);
    }
}

function main() {
    const root = config.paths.root;
    const banks = config.caseBanks;

    console.log("=== Sprint 5.6C — Wave 2 Metadata Migration ===");
    console.log("Populating: BlueprintObjectives, Topic, Subtopic, PrimaryCompetency,");
    console.log("            SecondaryCompetencies, LearningObjectives (case)");
    console.log("            FormulaReference, DecisionTreeReference, AccountingPrinciple,");
    console.log("            CalculationRequired, BusinessInterpretation (item)");
    console.log("");

    banks.forEach(file => {
        const fullPath = path.join(root, file);
        if (!fs.existsSync(fullPath)) { console.log(`File not found: ${file}`); return; }
        processFile(fullPath);
    });

    console.log("\n=== Wave 2 Migration Complete ===");
    console.log("Run `node scripts/validate.js` to verify results.");
}

if (require.main === module) {
    main();
}

module.exports = { main, processFile, buildCaseMetadata, buildItemMetadata };
