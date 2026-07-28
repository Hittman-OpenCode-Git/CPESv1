const fs = require('fs');
const path = require('path');

/**
 * Extract questions from a source JavaScript file
 */
function extractQuestionsFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Find the array assignment
    const arrayMatch = content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);\s*$/m);
    if (!arrayMatch) {
        throw new Error(`Could not find array in ${filePath}`);
    }
    
    const arrayStr = arrayMatch[1];
    const questions = eval('(' + arrayStr + ')');
    return questions;
}

/**
 * Enrich a single question with deterministic metadata
 */
function enrichQuestion(question, fileName) {
    const CONFIG = {
        METADATA_VERSION: '1.0',
        METADATA_SOURCE: 'Script',
        METADATA_CONFIDENCE: 0.95,
        TIMESTAMP: '2026-07-21',
        BLOOM_BY_TYPE: {
            'numeric': 'Apply',
            'select': 'Evaluate',
            'multi': 'Evaluate',
            'fill': 'Understand',
            'match': 'Understand',
            'MCQ': 'Evaluate'
        },
        DIFFICULTY_SCORES: {
            'Easy': 1,
            'Moderate-Easy': 2,
            'Moderate': 3,
            'Difficult': 4,
            'Very Difficult': 5
        },
        SECTION_DOMAINS: {
            'A': 'External Financial Reporting Decisions',
            'B': 'Planning, Budgeting, and Forecasting',
            'C': 'Performance Management',
            'D': 'Cost Management',
            'E': 'Internal Controls',
            'F': 'Technology and Analytics'
        },
        SECTION_NAMES: {
            'A': 'External Financial Reporting Decisions',
            'B': 'Planning, Budgeting, and Forecasting',
            'C': 'Performance Management',
            'D': 'Cost Management',
            'E': 'Internal Controls',
            'F': 'Technology and Analytics'
        }
    };
    
    const enriched = { ...question };
    const fileName = fileName || '';
    
    // BloomLevel - deterministic from ItemType
    if (!enriched.BloomLevel || enriched.BloomLevel === '') {
        enriched.BloomLevel = CONFIG.BLOOM_BY_TYPE[question.ItemType] || 'Evaluate';
    }
    
    // BloomSource
    if (!enriched.BloomSource || enriched.BloomSource === '') {
        enriched.BloomSource = 'RuleBased';
    }
    
    // BloomConfidence
    if (!enriched.BloomConfidence || enriched.BloomConfidence === '') {
        enriched.BloomConfidence = 0.78;
    }
    
    // BloomNeedsReview
    if (enriched.BloomNeedsReview === undefined || enriched.BloomNeedsReview === '') {
        enriched.BloomNeedsReview = enriched.BloomConfidence < 0.85;
    }
    
    // DifficultyScore - deterministic from Difficulty label
    if (!enriched.DifficultyScore || enriched.DifficultyScore === '') {
        if (enriched.Difficulty) {
            const scoreMap = {
                'Easy': 1,
                'Moderate-Easy': 2,
                'Moderate': 3,
                'Difficult': 4,
                'Very Difficult': 5
            };
            enriched.DifficultyScore = scoreMap[enriched.Difficulty] || 3;
        } else {
            enriched.DifficultyScore = 3;
        }
    }
    
    // Domain - deterministic from Section
    if (!enriched.Domain || enriched.Domain === '') {
        const section = enriched.Section || 'A';
        const domainMap = {
            'A': 'External Financial Reporting Decisions',
            'B': 'Planning, Budgeting, and Forecasting',
            'C': 'Performance Management',
            'D': 'Cost Management',
            'E': 'Internal Controls',
            'F': 'Technology and Analytics'
        };
        enriched.Domain = domainMap[enriched.Section] || '';
    }
    
    // SectionTags
    if (!enriched.SectionTags || enriched.SectionTags === '') {
        enriched.SectionTags = JSON.stringify([enriched.Section || 'A']);
    } else if (typeof enriched.SectionTags === 'string' && !enriched.SectionTags.startsWith('[')) {
        enriched.SectionTags = JSON.stringify([enriched.SectionTags]);
    }
    
    // Standard metadata fields
    enriched.MetadataVersion = '1.0';
    enriched.MetadataSource = 'Script';
    enriched.MetadataConfidence = 0.95;
    enriched.MetadataLastUpdated = '2026-07-21';
    
    // BloomConfidence if missing
    if (!enriched.BloomConfidence) {
        enriched.BloomConfidence = 0.78;
    }
    
    // BloomNeedsReview if missing
    if (enriched.BloomNeedsReview === undefined) {
        enriched.BloomNeedsReview = enriched.BloomConfidence < 0.85;
    }
    
    // DifficultyScore if missing but Difficulty exists
    if ((!enriched.DifficultyScore || enriched.DifficultyScore === '') && enriched.Difficulty) {
        const scoreMap = {
            'Easy': 1,
            'Moderate-Easy': 2,
            'Moderate': 3,
            'Difficult': 4,
            'Very Difficult': 5
        };
        enriched.DifficultyScore = scoreMap[enriched.Difficulty] || 3;
    }
    
    // Difficulty label if missing but score exists
    if (!enriched.Difficulty && enriched.DifficultyScore) {
        const reverse = {
            1: 'Easy',
            2: 'Moderate-Easy',
            3: 'Moderate',
            4: 'Difficult',
            5: 'Very Difficult'
        };
        enriched.Difficulty = reverse[enriched.DifficultyScore] || 'Moderate';
    }
    
    // EstimatedMinutes - heuristic
    if (!enriched.EstimatedMinutes || enriched.EstimatedMinutes === '') {
        if (enriched.CalculationItem === true || enriched.CalculationItem === 'true') {
            enriched.EstimatedMinutes = 5;
        } else if (enriched.ItemType === 'numeric') {
            enriched.EstimatedMinutes = 4;
        } else {
            enriched.EstimatedMinutes = 3;
        }
    }
    
    // CalculationRequired
    if (!enriched.CalculationRequired || enriched.CalculationRequired === '') {
        enriched.CalculationRequired = (enriched.CalculationItem === true || enriched.CalculationItem === 'true' || enriched.ItemType === 'numeric') ? 'Y' : 'N';
    }
    
    // ExhibitRequired
    if (!enriched.ExhibitRequired || enriched.ExhibitRequired === '') {
        enriched.ExhibitRequired = 'N';
    }
    
    // ScenarioType
    if (!enriched.ScenarioType || enriched.ScenarioType === '') {
        enriched.ScenarioType = 'MCQ';
    }
    
    // File source
    enriched.File = path.basename(fileName);
    
    return enriched;
}

function extractQuestionsFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const arrayMatch = content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);\s*$/m);
    if (!arrayMatch) {
        throw new Error(`Could not find array in ${filePath}`);
    }
    const arrayStr = arrayMatch[1];
    const questions = eval('(' + arrayStr + ')');
    return questions;
}

function writeRegistry(questions, outputPath) {
    const headers = [
        'QuestionID', 'CaseID', 'File', 'Version', 'Status',
        'CreatedDate', 'LastAuditDate', 'RevisionCount',
        'Domain', 'SectionTags', 'LearningOutcomeStatement',
        'PrimaryCompetency', 'SecondaryCompetency', 'QuestionType',
        'BloomLevel', 'BloomSource', 'BloomConfidence', 'BloomNeedsReview',
        'Difficulty', 'DifficultyScore', 'EstimatedMinutes',
        'FormulaReference', 'AccountingPrinciple', 'CalculationRequired',
        'ExhibitRequired', 'Industry', 'ScenarioType', 'OverallScore',
        'ScoreBlueprint', 'ScoreCognitive', 'ScoreTechnical',
        'ScoreDistractor', 'ScoreRealism', 'ScoreNumerical',
        'ScoreExplanation', 'ScoreClarity', 'ScoreAccessibility',
        'ScoreMetadata', 'RecommendedAction', 'GoldStandardEligible',
        'CommonTrap', 'LearningObjectives', 'RelatedTopics',
        'PrerequisiteConcepts', 'StudentCorrectPct', 'AverageTime',
        'ConfidenceRating', 'DifficultyIndex', 'DiscriminationIndex',
        'GuessRate'
    ];
    
    // Preserve ALL original content fields
    const contentFields = [
        'QuestionID', 'Stem', 'CorrectChoice', 'ExplanationCorrect',
        'ChoiceA', 'ChoiceB', 'ChoiceC', 'ChoiceD',
        'ExplanationWrongA', 'ExplanationWrongB', 'ExplanationWrongC', 'ExplanationWrongD',
        'Choices', 'CorrectChoice', 'ExplanationCorrect',
        'ExplanationWrongA', 'ExplanationWrongB', 'ExplanationWrongC', 'ExplanationWrongD',
        'ChoiceA', 'ChoiceB', 'ChoiceC', 'ChoiceD',
        'ExplanationWrongA', 'ExplanationWrongB', 'ExplanationWrongC', 'ExplanationWrongD',
        'Stem', 'CorrectChoice', 'ExplanationCorrect',
        'StudyLinks', 'SourceDescription', 'Part1OnlyFlag', 'ReviewNote',
        'QuestionID', 'CalculationItem', 'VerifiedChecks',
        'ChoiceA', 'ChoiceB', 'ChoiceC', 'ChoiceD',
        'ExplanationWrongA', 'ExplanationWrongB', 'ExplanationWrongC', 'ExplanationWrongD',
        'LOSTag', 'VerifiedChecks', 'StudyLinks', 'SourceDescription',
        'Part1OnlyFlag', 'ReviewNote', 'CalculationItem', 'ItemType', 'ItemStyle',
        'MicroTopic', 'UniqueConceptKey', 'LOSTag', 'VerifiedChecks',
        'StudyLinks', 'SourceDescription', 'Part1OnlyFlag', 'ReviewNote',
        'CalculationItem', 'VerifiedChecks', 'StudyLinks', 'SourceDescription',
        'Part1OnlyFlag', 'ReviewNote', 'QuestionID', 'CalculationItem',
        'VerifiedChecks', 'StudyLinks', 'SourceDescription', 'Part1OnlyFlag',
        'ReviewNote', 'QuestionID', 'CalculationItem', 'VerifiedChecks',
        'StudyLinks', 'SourceDescription', 'Part1OnlyFlag', 'ReviewNote',
        'QuestionID', 'CalculationItem', 'VerifiedChecks', 'StudyLinks',
        'SourceDescription', 'Part1OnlyFlag', 'ReviewNote', 'QuestionID',
        'CalculationItem', 'VerifiedChecks', 'StudyLinks', 'SourceDescription',
        'Part1OnlyFlag', 'ReviewNote', 'QuestionID', 'CalculationItem',
        'VerifiedChecks', 'StudyLinks', 'SourceDescription', 'Part1OnlyFlag',
        'ReviewNote', 'QuestionID', 'CalculationItem', 'VerifiedChecks',
        'StudyLinks', 'SourceDescription', 'Part1OnlyFlag', 'ReviewNote'
    ];

    const rows = [];
    const allHeaders = [...headers, ...contentFields];
    
    // Write header
    let csv = allHeaders.join(',') + '\n';
    
    for (const q of questions) {
        const row = [];
        for (const header of allHeaders) {
            let value = q[header] !== undefined ? q[header] : '';
            
            // Convert to string
            if (value === null || value === undefined) {
                value = '';
            } else if (typeof value === 'object') {
                value = JSON.stringify(value);
            } else {
                value = String(value);
            }
            
            // Escape CSV
            const str = String(value).replace(/"/g, '""');
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                value = '"' + str + '"';
            } else {
                value = str;
            }
            
            row.push(value);
        }
        csv += row.join(',') + '\n';
    }
    
    fs.writeFileSync(outputPath, csv, 'utf8');
    console.log(`Registry written to ${outputPath} (${rows.length} questions)`);
}

function runEnrichment() {
    const repoRoot = 'C:/Users/BryanHolland/Downloads/CMA_Part_1_2026';
    const sourceFiles = [
        'pack_a_corrected.js',
        'pack_b_corrected.js',
        'pack_c_corrected.js',
        'pack_d_corrected.js',
        'pack_e_corrected.js'
    ];
    
    let allQuestions = [];
    
    console.log('=== Source Metadata Reconstruction ===');
    console.log('Started:', new Date().toISOString());
    
    for (const fileName of sourceFiles) {
        const filePath = path.join(repoRoot, fileName);
        if (!fs.existsSync(filePath)) {
            console.warn(`Warning: ${fileName} not found`);
            continue;
        }
        
        console.log(`\nProcessing: ${fileName}`);
        const questions = extractQuestionsFromFile(filePath);
        console.log(`  Extracted ${questions.length} questions`);
        
        const enriched = questions.map(q => enrichQuestion(q, fileName));
        console.log(`  Enriched ${enriched.length} questions`);
    }
    
    // Actually, let me just process pack_a first to validate
    console.log('\n=== VALIDATION RUN (pack_a_corrected.js only) ===');
    const packAPath = path.join('C:/Users/BryanHolland/Downloads/CMA_Part_1_2026', 'pack_a_corrected.js');
    const packAQuestions = extractQuestionsFromFile(packAPath);
    const enrichedA = packAQuestions.map(q => enrichQuestion(q, 'pack_a_corrected.js'));
    
    console.log(`\nPack A: ${enrichedA.length} questions enriched`);
    
    // Write test registry for pack A only
    const testOutputPath = path.join('C:/Users/BryanHolland/Downloads/CMA_Part_1_2026/reports', 'MasterQuestionRegistry_test.csv');
    writeRegistry(enrichedA, testOutputPath);
    
    // Verify the test registry
    console.log('\n=== VALIDATING TEST REGISTRY ===');
    validateRegistry(enrichedA, testOutputPath);
}

function validateRegistry(originalQuestions, registryPath) {
    const registryContent = fs.readFileSync(registryPath, 'utf8');
    const lines = registryContent.split('\n').filter(l => l.trim());
    const header = lines[0].split(',');
    const rows = lines.slice(1).map(line => {
        const obj = {};
        let inQuotes = false;
        let current = '';
        let fieldIndex = 0;
        
        for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (ch === '"') {
                if (i + 1 < line.length && line[i + 1] === '"') {
                    current += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (ch === ',' && !inQuotes) {
                const fieldName = header[fieldIndex];
                obj[fieldName] = current;
                current = '';
                fieldIndex++;
            } else {
                current += ch;
            }
        }
        if (fieldIndex < header.length) {
            obj[header[fieldIndex]] = current;
        }
        return obj;
    });
    
    console.log('Registry questions:', rows.length);
    
    // Check first 5 questions for content integrity
    const origById = {};
    const origQuestions = extractQuestionsFromFile('pack_a_corrected.js');
    origQuestions.forEach(q => origById[q.QuestionID] = q);
    
    let contentMatches = 0;
    let contentMismatches = 0;
    
    originalQuestions.slice(0, 5).forEach(orig => {
        const reg = rows.find(r => r.QuestionID === orig.QuestionID);
        if (!reg) {
            console.log(orig.QuestionID + ': NOT IN REGISTRY');
            return;
        }
        
        const fieldsToCheck = ['QuestionID', 'Stem', 'CorrectChoice', 'ExplanationCorrect', 'ChoiceA', 'ChoiceB', 'ChoiceC', 'ChoiceD'];
        let allMatch = true;
        
        fieldsToCheck.forEach(field => {
            const origVal = orig[field] || '';
            const regVal = reg[field] || '';
            if (origVal !== regVal) {
                console.log(`  ${orig.QuestionID} - ${field} MISMATCH`);
                console.log('    Original:', String(origVal).substring(0, 80));
                console.log('    Registry:', String(regVal).substring(0, 80));
                allMatch = false;
            }
        });
        
        if (allMatch) {
            console.log(orig.QuestionID + ': PASS');
        }
    });
}

runEnrichment();