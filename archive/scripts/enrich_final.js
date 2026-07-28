const fs = require('fs');
const path = require('path');

function enrichQuestion(question, srcFileName) {
    const enriched = { ...question };
    
    // BloomLevel - deterministic from ItemType
    if (!enriched.BloomLevel || enriched.BloomLevel === '') {
        const bloomMap = {
            'numeric': 'Apply',
            'select': 'Evaluate',
            'multi': 'Evaluate',
            'fill': 'Understand',
            'match': 'Understand',
            'MCQ': 'Evaluate'
        };
        enriched.BloomLevel = bloomMap[question.ItemType] || 'Evaluate';
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
        enriched.BloomNeedsReview = (enriched.BloomConfidence || 0.78) < 0.85;
    }
    
    // DifficultyScore - deterministic from Difficulty label
    if (!enriched.DifficultyScore || enriched.DifficultyScore === '') {
        const scoreMap = {
            'Easy': 1,
            'Moderate-Easy': 2,
            'Moderate': 3,
            'Difficult': 4,
            'Very Difficult': 5
        };
        enriched.DifficultyScore = scoreMap[enriched.Difficulty] || 3;
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
        enriched.BloomNeedsReview = (enriched.BloomConfidence || 0.78) < 0.85;
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
    enriched.File = path.basename(arguments[1]);
    
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
    
    const contentFields = [
        'QuestionID', 'Stem', 'CorrectChoice', 'ExplanationCorrect',
        'ChoiceA', 'ChoiceB', 'ChoiceC', 'ChoiceD',
        'ExplanationWrongA', 'ExplanationWrongB', 'ExplanationWrongC', 'ExplanationWrongD',
        'Choices', 'CorrectChoice', 'ExplanationCorrect',
        'ExplanationWrongA', 'ExplanationWrongB', 'ExplanationWrongC', 'ExplanationWrongD',
        'ChoiceA', 'ChoiceB', 'ChoiceC', 'ChoiceD',
        'Stem', 'CorrectChoice', 'ExplanationCorrect',
        'StudyLinks', 'SourceDescription', 'Part1OnlyFlag', 'ReviewNote',
        'QuestionID', 'CalculationItem', 'VerifiedChecks',
        'ChoiceA', 'ChoiceB', 'ChoiceC', 'ChoiceD',
        'ExplanationWrongA', 'ExplanationWrongB', 'ExplanationWrongC', 'ExplanationWrongD',
        'Stem', 'CorrectChoice', 'ExplanationCorrect',
        'StudyLinks', 'SourceDescription', 'Part1OnlyFlag', 'ReviewNote',
        'QuestionID', 'CalculationItem', 'VerifiedChecks',
        'ChoiceA', 'ChoiceB', 'ChoiceC', 'ChoiceD',
        'ExplanationWrongA', 'ExplanationWrongB', 'ExplanationWrongC', 'ExplanationWrongD',
        'Stem', 'CorrectChoice', 'ExplanationCorrect',
        'StudyLinks', 'SourceDescription', 'Part1OnlyFlag', 'ReviewNote',
        'QuestionID', 'CalculationItem', 'VerifiedChecks',
        'StudyLinks', 'SourceDescription', 'Part1OnlyFlag', 'ReviewNote',
        'QuestionID', 'CalculationItem', 'VerifiedChecks',
        'StudyLinks', 'SourceDescription', 'Part1OnlyFlag', 'ReviewNote'
    ];

    const allHeaders = [...new Set([...headers, ...contentFields])];
    
    let csv = allHeaders.join(',') + '\n';
    
    for (const q of questions) {
        const row = [];
        for (const header of [...headers, ...contentFields]) {
            let value = q[header] !== undefined ? q[header] : '';
            
            if (value === null || value === undefined) {
                value = '';
            } else if (typeof value === 'object') {
                value = JSON.stringify(value);
            } else {
                value = String(value);
            }
            
            const str = String(value).replace(/"/g, '""');
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                value = '"' + str + '"';
            } else {
                value = str;
            }
            
            row.push(value);
        }
        
        // Write the row
        // We need to write to a stream for efficiency, but for simplicity just collect
    }
    
    // Actually write using a stream
    const ws = fs.createWriteStream(outputPath, { encoding: 'utf8' });
    ws.write(allHeaders.join(',') + '\n');
    
    let count = 0;
    for (const q of questions) {
        const row = [];
        for (const header of [...headers, ...contentFields]) {
            let value = q[header] !== undefined ? q[header] : '';
            
            if (value === null || value === undefined) {
                value = '';
            } else if (typeof value === 'object') {
                value = JSON.stringify(value);
            } else {
                value = String(value);
            }
            
            const str = String(value).replace(/"/g, '""');
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                value = '"' + str + '"';
            } else {
                value = str;
            }
            
            row.push(value);
        }
        
        process.stdout.write('\r  Writing row ' + (++count) + '/' + questions.length);
        
        // Write to stream
    }
    
    // Write all at once for simplicity
    let csvContent = allHeaders.join(',') + '\n';
    for (const q of questions) {
        const row = [];
        for (const header of [...headers, ...contentFields]) {
            let value = q[header] !== undefined ? q[header] : '';
            
            if (value === null || value === undefined) {
                value = '';
            } else if (typeof value === 'object') {
                value = JSON.stringify(value);
            } else {
                value = String(value);
            }
            
            const str = String(value).replace(/"/g, '""');
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                value = '"' + str + '"';
            } else {
                value = str;
            }
            
            row.push(value);
        }
        csvContent += row.join(',') + '\n';
    }
    
    fs.writeFileSync(outputPath, csvContent, 'utf8');
    console.log('\nRegistry written to ' + outputPath + ' (' + questions.length + ' questions)');
}

function extractQuestionsFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const arrayMatch = content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);\s*$/m);
    if (!arrayMatch) {
        throw new Error('Could not find array in ' + filePath);
    }
    const arrayStr = arrayMatch[1];
    const questions = eval('(' + arrayStr + ')');
    return questions;
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
    
    console.log('=== Source Metadata Reconstruction ===');
    console.log('Started:', new Date().toISOString());
    
    let allQuestions = [];
    
    for (const fileName of sourceFiles) {
        const filePath = path.join(repoRoot, fileName);
        if (!fs.existsSync(filePath)) {
            console.warn('Warning: ' + fileName + ' not found');
            continue;
        }
        
        console.log('\nProcessing: ' + fileName);
        const questions = extractQuestionsFromFile(filePath);
        console.log('  Extracted ' + questions.length + ' questions');
        
        const enriched = questions.map(q => enrichQuestion(q, fileName));
        console.log('  Enriched ' + enriched.length + ' questions');
        
        allQuestions = allQuestions.concat(enriched);
    }
    
    console.log('\nTotal questions: ' + allQuestions.length);
    
    // Write registry
    const outputPath = path.join(repoRoot, 'reports', 'MasterQuestionRegistry.csv');
    writeRegistry(allQuestions, outputPath);
    
    // Print statistics
    const stats = {
        total: allQuestions.length,
        withBloom: allQuestions.filter(q => q.BloomLevel && q.BloomLevel !== '').length,
        withDifficultyScore: allQuestions.filter(q => q.DifficultyScore && q.DifficultyScore !== '').length,
        withDomain: allQuestions.filter(q => q.Domain && q.Domain !== '').length,
        withBloomSource: allQuestions.filter(q => q.BloomSource && q.BloomSource !== '').length,
        withEstimatedMinutes: allQuestions.filter(q => q.EstimatedMinutes && q.EstimatedMinutes !== '').length,
        withCalculationRequired: allQuestions.filter(q => q.CalculationRequired && q.CalculationRequired !== '').length,
        withMetadataVersion: allQuestions.filter(q => q.MetadataVersion && q.MetadataVersion !== '').length
    };
    
    console.log('\n=== Enrichment Statistics ===');
    console.log('Total questions: ' + stats.total);
    console.log('BloomLevel: ' + stats.withBloom + '/' + stats.total + ' (' + Math.round(stats.withBloom/stats.total*100) + '%)');
    console.log('DifficultyScore: ' + stats.withDifficultyScore + '/' + stats.total + ' (' + Math.round(stats.withDifficultyScore/stats.total*100) + '%)');
    console.log('Domain: ' + stats.withDomain + '/' + stats.total + ' (' + Math.round(stats.withDomain/stats.total*100) + '%)');
    console.log('BloomSource: ' + stats.withBloomSource + '/' + stats.total + ' (' + Math.round(stats.withBloomSource/stats.total*100) + '%)');
    console.log('EstimatedMinutes: ' + stats.withEstimatedMinutes + '/' + stats.total + ' (' + Math.round(stats.withEstimatedMinutes/stats.total*100) + '%)');
    console.log('CalculationRequired: ' + stats.withCalculationRequired + '/' + stats.total + ' (' + Math.round(stats.withCalculationRequired/stats.total*100) + '%)');
    console.log('MetadataVersion: ' + stats.withMetadataVersion + '/' + stats.total + ' (' + Math.round(stats.withMetadataVersion/stats.total*100) + '%)');
    
    // Sample output
    console.log('\n=== Sample Enriched Questions ===');
    for (let i = 0; i < Math.min(3, allQuestions.length); i++) {
        const q = allQuestions[i];
        console.log('\nQ' + (i+1) + ': ' + q.QuestionID);
        console.log('  BloomLevel: ' + q.BloomLevel + ' (Source: ' + q.BloomSource + ', Confidence: ' + q.BloomConfidence + ', NeedsReview: ' + q.BloomNeedsReview + ')');
        console.log('  Difficulty: ' + q.Difficulty + ' (Score: ' + q.DifficultyScore + ')');
        console.log('  Domain: ' + q.Domain);
        console.log('  EstimatedMinutes: ' + q.EstimatedMinutes);
        console.log('  CalculationRequired: ' + q.CalculationRequired);
        console.log('  MetadataVersion: ' + q.MetadataVersion + ' (Source: ' + q.MetadataSource + ', Confidence: ' + q.MetadataConfidence + ')');
    }
    
    // Idempotency test
    console.log('\n=== Idempotency Test ===');
    const reEnriched = allQuestions.map(q => enrichQuestion({...q}, 'test'));
    let changes = 0;
    for (let i = 0; i < allQuestions.length; i++) {
        const orig = allQuestions[i];
        const re = reEnriched[i];
        if (orig.BloomLevel !== re.BloomLevel || orig.DifficultyScore !== re.DifficultyScore || 
            orig.BloomSource !== re.BloomSource || orig.MetadataVersion !== re.MetadataVersion) {
            changes++;
        }
    }
    console.log('Changes on second run: ' + changes + '/' + allQuestions.length);
    
    console.log('\n=== Enrichment Complete ===');
}

runEnrichment();