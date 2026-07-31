/**
 * ============================================================================
 * CMA Part 1 Exam Simulator
 * Validation Framework Configuration
 * ============================================================================
 *
 * This file contains all configurable settings used by the validation
 * framework. Validators should never hard-code filenames, directories,
 * thresholds, or repository structure.
 *
 * Version: 2.0
 * ============================================================================
 */

const path = require("path");

const ROOT = path.resolve(__dirname, "..");

module.exports = {

    //==========================================================================
    // Project Information
    //==========================================================================

    project: {

        name: "CMA Part 1 Exam Simulator",

        version: "2.0",

        author: "Bryan Holland",

        repositoryRoot: ROOT

    },

    //==========================================================================
    // Repository Structure
    //==========================================================================

    paths: {

        root: ROOT,

        knowledge: path.join(ROOT, "knowledge"),

        scripts: path.join(ROOT, "scripts"),

        reports: path.join(ROOT, "scripts", "reports"),

        output: path.join(ROOT, "scripts", "reports", "output"),

        validators: path.join(ROOT, "scripts", "validators"),

        lib: path.join(ROOT, "scripts", "lib")

    },

    //==========================================================================
    // Required Repository Files
    //==========================================================================

    requiredFiles: [

        "app.js",

        "styles.css",

        "index_updated.html"

    ],

    //==========================================================================
    // Required Directories
    //==========================================================================

    requiredDirectories: [

        "knowledge",

        "scripts"

    ],

    //==========================================================================
    // Question Banks
    //==========================================================================

    questionPacks: [

        "pack_a_corrected.js",

        "pack_b_corrected.js",

        "pack_c_corrected.js",

        "pack_d_corrected.js",

        "pack_e_corrected.js"

    ],

    //==========================================================================
    // Case Study Banks
    //==========================================================================

    caseBanks: [

        "scored_cases.js",

        "scored_cases2.js",

        "scored_cases3.js",

        "scored_cases4.js",

        "scored_cases5.js"

    ],

    //==========================================================================
    // Knowledge Library
    //==========================================================================

    requiredKnowledgeFiles: [

        "00_PROJECT_CONSTITUTION.md",

        "TAXONOMY_REGISTRY.md",

        "05_COMMON_EXAM_TRAPS.md",

        "QUESTION_METADATA_STANDARD.md"

    ],

    //==========================================================================
    // AI Framework
    //==========================================================================

    requiredAIFiles: [

        "COLLABORATION_MATRIX.md",

        "WORKFLOWS.md",

        "TASK_TEMPLATES.md",

        "accountant.md",

        "editor.md",

        "reviewer.md",

        "psychometrician.md",

        "case_author.md",

        "javascript_architect.md",

        "validator.md",

        "release_manager.md",

        "student.md"

    ],

    //==========================================================================
    // Supported Question Types
    //==========================================================================

    supportedQuestionTypes: [

        "select",

        "multi",

        "numeric",

        "fill",

        "match"

    ],

    //==========================================================================
    // Valid Answer Letters
    //==========================================================================

    answerLetters: [

        "A",

        "B",

        "C",

        "D"

    ],

    //==========================================================================
    // Metadata Requirements (QUESTION_METADATA_STANDARD.md)
    //==========================================================================

    metadata: {

        // Required case-level fields
        requiredCaseFields: [
            "CaseID", "Title", "SectionTags", "BlueprintDomain",
            "PrimaryCompetency", "EstimatedMinutes", "Difficulty", "DifficultyScore",
            "ScenarioText", "Industry", "CompanyType", "CompanyName",
            "Stakeholder", "BusinessFunction", "QuestionCount", "ExhibitCount",
            "ProductionStatus", "Version", "CreatedDate", "ModifiedDate",
            "Author", "Confidence", "LearningObjectives", "Items", "Exhibits"
        ],

        // Optional case-level fields
        optionalCaseFields: [
            "Tags", "Reviewer", "QAReviewer", "RevisionHistory", "Dependencies",
            "BlueprintObjectives"
        ],

        // Required item-level fields
        requiredItemFields: [
            "ItemID", "Type", "Prompt", "Correct", "Explanation",
            "Topic", "Difficulty", "DifficultyScore"
        ],

        // Optional item-level fields
        optionalItemFields: [
            "Choices", "LeftItems", "RightItems", "FormulaReference",
            "CommonTrapReference", "AccountingPrinciple", "BusinessInterpretation",
            "CognitiveLevel", "CalculationRequired", "EstimatedMinutes",
            "ExplanationVersion", "ExhibitReference",
            "CalculationComplexity", "ReadingComplexity", "DecisionComplexity",
            "DifficultyDrivers"
        ],

        // Required exhibit-level fields
        requiredExhibitFields: [
            "ExhibitID", "Type", "Title"
        ],

        // Optional exhibit-level fields
        optionalExhibitFields: [
            "Headers", "Rows", "Body", "Tags", "Source"
        ],

        // Allowed values
        allowedTypes: ["numeric", "select", "multi", "fill", "match"],
        allowedDifficulties: ["Easy", "Moderate", "Difficult", "Very Difficult"],
        allowedProductionStatuses: ["Draft", "Review", "QA", "Production", "Retired"],
        allowedCognitiveLevels: ["Remember", "Understand", "Apply", "Analyze", "Evaluate"],
        allowedCalculationComplexity: ["None", "Simple", "Moderate", "Complex"],
        allowedReadingComplexity: ["Short", "Moderate", "Long"],
        allowedDecisionComplexity: ["Low", "Medium", "High"],
        allowedDifficultyDrivers: ["MultiStepCalculation", "FinancialStatementAnalysis", "JudgmentRequired",
            "Terminology", "TimePressure", "MultipleConcepts", "DistractorSimilarity"],
        allowedSectionTags: ["A", "B", "C", "D", "E", "F"],
        allowedExhibitTypes: ["table", "text", "chart", "dashboard", "financial-statement", "contract", "policy", "email", "erp-report"],

        // Cognitive progression sequence (item type → default cognitive level)
        typeCognitiveDefault: {
            "numeric": "Apply",
            "select": "Analyze",
            "multi": "Evaluate",
            "fill": "Understand",
            "match": "Analyze"
        },

        // Difficulty score → label mapping
        difficultyScoreMap: {
            1: "Easy",
            2: "Moderate-Easy",
            3: "Moderate",
            4: "Difficult",
            5: "Very Difficult"
        },

        // Section → BlueprintDomain mapping
        sectionToDomain: {
            "A": "External Financial Reporting Decisions",
            "B": "Planning, Budgeting, and Forecasting",
            "C": "Performance Management",
            "D": "Cost Management",
            "E": "Internal Controls",
            "F": "Technology and Analytics"
        },

        // Heuristics
        minItemsPerCase: 5,
        maxItemsPerCase: 7,
        minChoices: 3,
        maxChoices: 6,
        minExhibitCount: 0,
        maxExhibitCount: 6,
        minEstimatedMinutes: 20,
        maxEstimatedMinutes: 40,
        minExplanationLength: 50,
        minConfidence: 0,
        maxConfidence: 100,

        // Difficulty distribution targets (from EXAM_BLUEPRINT.md)
        difficultyTargets: {
            "Easy": 0.15,
            "Moderate": 0.45,
            "Difficult": 0.30,
            "Very Difficult": 0.10
        },

        // Cognitive skill distribution targets (from EXAM_BLUEPRINT.md)
        cognitiveTargets: {
            "Remember": 0.05,
            "Understand": 0.15,
            "Apply": 0.35,
            "Analyze": 0.30,
            "Evaluate": 0.15
        },

        // Coverage tolerance
        coverageTolerance: 0.30 // 30% deviation allowed from balanced distribution
    },

    // Legacy compatibility
    requiredMetadata: [
        "QuestionID",
        "Topic",
        "Difficulty",
        "Explanation"
    ],

    //==========================================================================
    // Validation Thresholds
    //==========================================================================

    thresholds: {

        numericTolerance: 0.01,

        percentageTolerance: 0.001,

        similarity: 0.92,

        minimumConfidence: 90,

        maxSequentialAnswers: 4,

        duplicateQuestionSimilarity: 0.95,

        duplicateExplanationSimilarity: 0.95

    },

    //==========================================================================
    // Reporting
    //==========================================================================

    reports: {

        html: "ValidationReport.html",

        json: "ValidationReport.json",

        markdown: "ValidationSummary.md"

    },

    //==========================================================================
    // Logging
    //==========================================================================

    logging: {

        showTimestamp: true,

        verbose: true,

        colors: true

    },

    //==========================================================================
    // Validators
    //==========================================================================

    enabledValidators: [

        "RepositoryValidator",

        "MetadataValidator",

        "BlueprintValidator",

        "Part2BlueprintValidator",

        "DifficultyValidator",

        "ReferenceValidator",

        "ExplanationValidator",

        "CaseIntegrityValidator",

        "PsychometricValidator"

    ]

};