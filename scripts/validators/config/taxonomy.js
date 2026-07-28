/**
 * CMA Part 1 Exam Simulator
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
    difficultyLevels: ["Easy", "Moderate", "Difficult", "Very Difficult"],

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
        "Technology and Analytics": "F"
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
    // Difficulty distribution targets (from EXAM_BLUEPRINT.md)
    //==========================================================================
    difficultyTargets: {
        "Easy": 0.15,
        "Moderate": 0.45,
        "Difficult": 0.30,
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
