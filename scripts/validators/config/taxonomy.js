/**
 * CMA Exam Simulator
 * Shared Taxonomy Configuration — Single Source of Truth for Enumeration Values
 *
 * All validators shall import this configuration rather than maintaining
 * duplicate hardcoded lists. This is the JavaScript mirror of
 * knowledge/TAXONOMY_REGISTRY.md.
 *
 * Version: 1.0
 * Last Updated: 2026-07-21
 */

module.exports = {

    //==========================================================================
    // Cognitive Level (Bloom's Updated Taxonomy)
    //==========================================================================
    cognitiveLevels: ["Remember", "Understand", "Apply", "Analyze", "Evaluate"],

    cognitiveOrder: {
        "Remember": 0,
        "Understand": 1,
        "Apply": 2,
        "Analyze": 3,
        "Evaluate": 4
    },

    //==========================================================================
    // Calculation Complexity
    //==========================================================================
    calculationComplexityLevels: ["None", "Simple", "Moderate", "Complex"],

    //==========================================================================
    // Reading Complexity
    //==========================================================================
    readingComplexityLevels: ["Short", "Moderate", "Long"],

    //==========================================================================
    // Decision Complexity
    //==========================================================================
    decisionComplexityLevels: ["Low", "Medium", "High"],

    //==========================================================================
    // Difficulty Drivers
    //==========================================================================
    difficultyDrivers: [
        "MultiStepCalculation",
        "FinancialStatementAnalysis",
        "JudgmentRequired",
        "Terminology",
        "TimePressure",
        "MultipleConcepts",
        "DistractorSimilarity"
    ],

    //==========================================================================
    // Difficulty
    //==========================================================================
    difficultyLevels: ["Easy", "Moderate-Easy", "Moderate", "Difficult", "Very Difficult"],

    difficultyScoreMap: {
        1: "Easy",
        2: "Moderate-Easy",
        3: "Moderate",
        4: "Difficult",
        5: "Very Difficult"
    },

    //==========================================================================
    // Blueprint Domains
    //==========================================================================
    sectionToDomain: {
        "A": "External Financial Reporting Decisions",
        "B": "Planning, Budgeting, and Forecasting",
        "C": "Performance Management",
        "D": "Cost Management",
        "E": "Internal Controls",
        "F": "Technology and Analytics"
    },

    domainToSection: {
        "External Financial Reporting Decisions": "A",
        "Planning, Budgeting, and Forecasting": "B",
        "Performance Management": "C",
        "Cost Management": "D",
        "Internal Controls": "E",
        "Technology and Analytics": "F",
        // P2 domain aliases (SectionTag-derived; DL-050 P2 case-schema wiring)
        "Financial Statement Analysis": "A",
        "Corporate Finance": "B",
        "Decision Analysis": "C",
        "Risk Management": "D",
        "Investment Decisions": "E",
        "Professional Ethics": "F"
    },

    validSectionTags: ["A", "B", "C", "D", "E", "F"],

    //==========================================================================
    // Blueprint Domain Topics (from EXAM_BLUEPRINT.md)
    //==========================================================================
    domainTopics: {
        "External Financial Reporting Decisions": [
            "Financial Statements", "Revenue Recognition", "Inventory Valuation",
            "Long-Lived Assets", "Intangible Assets", "Liabilities", "Equity",
            "Statement of Cash Flows", "Financial Ratios", "Financial Statement Analysis"
        ],
        "Planning, Budgeting, and Forecasting": [
            "Strategic Planning", "Budget Development", "Master Budget",
            "Operating Budget", "Financial Budget", "Sales Forecasting",
            "Production Budget", "Direct Materials Budget", "Direct Labor Budget",
            "Manufacturing Overhead Budget", "Cash Budget", "Flexible Budgets",
            "Forecast Revision"
        ],
        "Performance Management": [
            "Standard Costing", "Cost Variances", "Responsibility Accounting",
            "Balanced Scorecard", "Key Performance Indicators", "Productivity Measures",
            "Benchmarking", "Transfer Pricing", "Performance Evaluation"
        ],
        "Cost Management": [
            "Cost Behavior", "Cost Estimation", "Job Order Costing", "Process Costing",
            "Activity-Based Costing", "Joint Products", "Service Department Allocation",
            "Cost Allocation", "Cost Drivers", "Contribution Margin",
            "Cost-Volume-Profit Analysis", "Relevant Costs", "Differential Analysis",
            "Pricing Decisions"
        ],
        "Internal Controls": [
            "Corporate Governance", "Internal Control Objectives",
            "COSO Internal Control Framework", "COSO Enterprise Risk Management",
            "Risk Assessment", "Control Activities", "Information and Communication",
            "Monitoring", "Fraud Prevention", "Fraud Detection",
            "Segregation of Duties", "Ethics"
        ],
        "Technology and Analytics": [
            "Information Systems", "ERP Systems", "Data Governance", "Data Quality",
            "Cybersecurity", "Data Analytics", "Business Intelligence",
            "Artificial Intelligence", "Automation", "Emerging Technologies"
        ],
        // P2 Domain Topics (aligned to P1 sections via domainToSection aliases)
        "Financial Statement Analysis": [
            "Ratio Analysis", "Common-Size Statements", "Trend Analysis",
            "Cash Flow Analysis", "Earnings Quality", "Segment Reporting",
            "Revenue Recognition Analysis", "Asset Quality", "Liquidity Metrics",
            "Solvency Metrics", "Profitability Metrics", "Efficiency Metrics"
        ],
        "Corporate Finance": [
            "Capital Budgeting", "Cost of Capital", "Capital Structure",
            "Working Capital Management", "Dividend Policy", "Mergers & Acquisitions",
            "Valuation Methods", "Risk-Adjusted Returns", "Real Options",
            "Financial Distress", "Restructuring", "Corporate Governance"
        ],
        "Decision Analysis": [
            "Cost-Volume-Profit Analysis", "Relevant Costing", "Make-or-Buy",
            "Sell-or-Process-Further", "Special Orders", "Pricing Decisions",
            "Transfer Pricing", "Constrained Resource Allocation",
            "Uncertainty Analysis", "Sensitivity Analysis", "Scenario Analysis",
            "Decision Trees", "Expected Value", "Value of Information"
        ],
        "Risk Management": [
            "Enterprise Risk Management", "Risk Identification", "Risk Assessment",
            "Risk Response", "COSO ERM", "Internal Control Design",
            "Control Activities", "Monitoring", "Fraud Risk", "Cyber Risk",
            "Business Continuity", "Crisis Management", "Risk Appetite",
            "Risk Reporting", "Key Risk Indicators"
        ],
        "Investment Decisions": [
            "Net Present Value", "Internal Rate of Return", "Payback Period",
            "Discounted Payback", "Profitability Index", "Modified IRR",
            "Capital Rationing", "Mutually Exclusive Projects", "Replacement Decisions",
            "Risk-Adjusted Discount Rate", "Certainty Equivalent", "Simulation",
            "Real Options", "Post-Audit", "Performance Measurement"
        ],
        "Professional Ethics": [
            "IMA Statement of Ethical Professional Practice",
            "Competence", "Confidentiality", "Integrity", "Credibility",
            "Conflict of Interest", "Ethical Decision Making",
            "Whistleblowing", "Corporate Social Responsibility",
            "Sustainability Reporting", "Governance Ethics", "Code of Conduct"
        ]
    },

    //==========================================================================
    // Competencies (PrimaryCompetency / SecondaryCompetencies)
    //==========================================================================
    competencies: ["Calculation", "Conceptual", "Analysis", "Judgment"],

    //==========================================================================
    // Question Types
    //==========================================================================
    questionTypes: ["numeric", "select", "multi", "fill", "match"],

    //==========================================================================
    // Production Status
    //==========================================================================
    productionStatuses: ["Draft", "Review", "QA", "Production", "Retired"],

    //==========================================================================
    // Exhibit Types
    //==========================================================================
    exhibitTypes: [
        "table", "text", "chart", "dashboard", "financial-statement",
        "contract", "policy", "email", "erp-report"
    ],

    //==========================================================================
    // Type → Cognitive Level Default
    //==========================================================================
    typeCognitiveDefault: {
        "numeric": "Apply",
        "select": "Analyze",
        "multi": "Evaluate",
        "fill": "Understand",
        "match": "Analyze"
    },

    //==========================================================================
    // FormulaReference — canonical names from foundation/FORMULA_MASTER.md
    //==========================================================================
    formulaNames: [
        "Contribution Margin", "Break-even Point (Units)", "Break-even Sales Dollars",
        "Target Operating Income", "Margin of Safety", "Degree of Operating Leverage",
        "Sales Budget", "Production Budget", "Direct Materials Purchases",
        "Direct Labor Budget", "Cash Collections", "Cash Budget",
        "Material Price Variance", "Material Quantity Variance",
        "Labor Rate Variance", "Labor Efficiency Variance",
        "Variable Overhead Spending Variance", "Variable Overhead Efficiency Variance",
        "Fixed Overhead Budget Variance", "Fixed Overhead Volume Variance",
        "Inventory Turnover", "Days Inventory Outstanding",
        "Accounts Receivable Turnover", "Days Sales Outstanding",
        "Return on Investment", "Residual Income", "Economic Order Quantity",
        "Net Present Value", "Internal Rate of Return", "Payback Period",
        "Expected Value", "Regression Equation", "Correlation Coefficient",
        "Standard Deviation", "Coefficient of Variation"
    ],

    //==========================================================================
    // DecisionTreeReference — canonical names from review/ACCOUNTING_DECISION_TREES.md
    //==========================================================================
    decisionTreeNames: [
        "Cost Classification", "Product Cost vs Period Cost", "Cost Behavior",
        "Relevant Costing", "Contribution Margin vs Gross Margin",
        "Budget Sequence", "Variance Analysis",
        "Material Price Variance", "Material Quantity Variance",
        "Labor Rate Variance", "Labor Efficiency Variance",
        "Flexible Budget", "Responsibility Centers", "Transfer Pricing",
        "Capital Budgeting", "Expected Value", "Regression",
        "Internal Controls (COSO)", "COSO ERM", "Fraud",
        "Financial Statement Ratios", "Technology & Analytics"
    ],

    //==========================================================================
    // P2 Case Pack Reference Convention — DL-059 FP-C remediation (2026-09-21)
    // P2 items use different reference naming conventions than P1 canonical
    // names from FORMULA_MASTER.md / ACCOUNTING_DECISION_TREES.md /
    // 05_COMMON_EXAM_TRAPS.md:
    //   - FormulaReference: ID codes (CB-XX, DA-XX, etc.), section refs
    //     (ASC, SOX, COSO, IMA), prose formulas (with =), descriptive phrases
    //   - CommonTrapReference: prose sentence descriptions
    //   - DecisionTreeReference: descriptive hyphenated names
    // For P2 case packs, accept any non-empty reference value instead of
    // requiring exact matches against P1 canonical names.
    //==========================================================================
    p2UseDescriptiveReferences: true,

    // P2 Exhibit Prose Patterns — DL-059 FP-D remediation (2026-09-21)
    // P2 items reference exhibits via prose text (e.g., "see the table below",
    // "as shown in the chart") rather than by ExhibitID format strings.
    // These patterns detect prose-based exhibit references for P2 case packs.
    p2ExhibitProsePatterns: [
        /\bexhibit\b/i,
        /\bshown below\b/i,
        /\bas shown\b/i,
        /\btable\b/i,
        /\bchart\b/i,
        /\bfigure\b/i,
        /\babove\b/i,
        /\bbelow\b/i,
        /\bindicated\b/i,
        /\billustrated\b/i,
        /\bdepicted\b/i
    ],

    //==========================================================================
    // Difficulty distribution targets (from EXAM_BLUEPRINT.md)
    //==========================================================================
    difficultyTargets: {
        "Easy": 0.15,
        "Moderate-Easy": 0.20,
        "Moderate": 0.30,
        "Difficult": 0.25,
        "Very Difficult": 0.10
    },

    //==========================================================================
    // Cognitive skill distribution targets (from EXAM_BLUEPRINT.md)
    //==========================================================================
    cognitiveTargets: {
        "Remember": 0.05,
        "Understand": 0.15,
        "Apply": 0.35,
        "Analyze": 0.30,
        "Evaluate": 0.15
    }
};
