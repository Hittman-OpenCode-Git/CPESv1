const fs = require('fs');
const path = require('path');

function enrichQuestion(question, srcFileName) {
    const enriched = { ...question };
    
    const bloomMap = {
        'numeric': 'Apply',
        'select': 'Evaluate',
        'multi': 'Evaluate',
        'fill': 'Understand',
        'match': 'Understand',
        'MCQ': 'Evaluate'
    };
    
    if (!enriched.BloomLevel || enriched.BloomLevel === '') {
        enriched.BloomLevel = bloomMap[question.ItemType] || 'Evaluate';
    }
    if (!enriched.BloomSource || enriched.BloomSource === '') {
        enriched.BloomSource = 'RuleBased';
    }
    if (!enriched.BloomConfidence || enriched.BloomConfidence === '') {
        enriched.BloomConfidence = 0.78;
    }
    if (enriched.BloomNeedsReview === undefined || enriched.BloomNeedsReview === '') {
        enriched.BloomNeedsReview = (enriched.BloomConfidence || 0.78) < 0.85;
    }
    
    const scoreMap = { 'Easy': 1, 'Moderate-Easy': 2, 'Moderate': 3, 'Difficult': 4, 'Very Difficult': 5 };
    if (!enriched.DifficultyScore || enriched.DifficultyScore === '') {
        if (enriched.Difficulty) {
            enriched.DifficultyScore = scoreMap[enriched.Difficulty] || 3;
        } else {
            enriched.DifficultyScore = 3;
        }
    }
    
    const domainMap = {
        'A': 'External Financial Reporting Decisions',
        'B': 'Planning, Budgeting, and Forecasting',
        'C': 'Performance Management',
        'D': 'Cost Management',
        'E': 'Internal Controls',
        'F': 'Technology and Analytics'
    };
    if (!enriched.Domain || enriched.Domain === '') {
        const section = enriched.Section || 'A';
        enriched.Domain = domainMap[enriched.Section] || '';
    }
    
    if (!enriched.SectionTags || enriched.SectionTags === '') {
        enriched.SectionTags = JSON.stringify([enriched.Section || 'A']);
    } else if (typeof enriched.SectionTags === 'string' && !enriched.SectionTags.startsWith('[')) {
        enriched.SectionTags = JSON.stringify([enriched.SectionTags]);
    }
    
    enriched.MetadataVersion = '1.0';
    enriched.MetadataSource = 'Script';
    enriched.MetadataConfidence = 0.95;
    enriched.MetadataLastUpdated = '2026-07-21';
    
    if (!enriched.BloomConfidence) {
        enriched.BloomConfidence = 0.78;
    }
    if (enriched.BloomNeedsReview === undefined) {
        enriched.BloomNeedsReview = (enriched.BloomConfidence || 0.78) < 0.85;
    }
    if ((!enriched.DifficultyScore || enriched.DifficultyScore === '') && enriched.Difficulty) {
        enriched.DifficultyScore = { 'Easy': 1, 'Moderate-Easy': 2, 'Moderate': 3, 'Difficult': 4, 'Very Difficult': 5 }[enriched.Difficulty] || 3;
    }
    if (!enriched.Difficulty && enriched.DifficultyScore) {
        const reverse = { 1: 'Easy', 2: 'Moderate-Easy', 3: 'Moderate', 4: 'Difficult', 5: 'Very Difficult' };
        enriched.Difficulty = reverse[enriched.DifficultyScore] || 'Moderate';
    }
    if (!enriched.EstimatedMinutes || enriched.EstimatedMinutes === '') {
        enriched.EstimatedMinutes = enriched.CalculationItem === true ? 5 : (enriched.ItemType === 'numeric' ? 4 : 3);
    }
    if (!enriched.CalculationRequired || enriched.CalculationRequired === '') {
        enriched.CalculationRequired = (enriched.CalculationItem === true || enriched.ItemType === 'numeric') ? 'Y' : 'N';
    }
    if (!enriched.ExhibitRequired || enriched.ExhibitRequired === '') {
        enriched.ExhibitRequired = 'N';
    }
    if (!enriched.ScenarioType || enriched.ScenarioType === '') {
        enriched.ScenarioType = 'MCQ';
    }
    enriched.MetadataVersion = '1.0';
    enriched.MetadataSource = 'Script';
    enriched.MetadataConfidence = 0.95;
    enriched.MetadataLastUpdated = '2026-07-21';
    if (!enriched.BloomConfidence) enriched.BloomConfidence = 0.78;
    if (enriched.BloomNeedsReview === undefined) {
        enriched.BloomNeedsReview = (enriched.BloomConfidence || 0.78) < 0.85;
    }
    enriched.File = path.basename(arguments[1] || '');
    return enriched;
}

function extractQuestionsFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const arrayMatch = content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);\s*$/m);
    if (!arrayMatch) throw new Error('Could not find array in ' + filePath);
    const arrayStr = arrayMatch[1];
    return eval('(' + arrayStr + ')');
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
        'StudyLinks', 'SourceDescription', 'Part1OnlyFlag', 'ReviewNote',
        'QuestionID', 'CalculationItem', 'VerifiedChecks',
        'ChoiceA', 'ChoiceB', 'ChoiceC', 'ChoiceD',
        'ExplanationWrongA', 'ExplanationWrongB', 'ExplanationWrongC', 'ExplanationWrongD',
        'Stem', 'CorrectChoice', 'ExplanationCorrect',
        'StudyLinks', 'SourceDescription', 'Part1OnlyFlag', 'ReviewNote',
        'QuestionID', 'CalculationItem', 'VerifiedChecks',
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
    
    const allHeaders = [...headers, ...contentFields];
    
    let csv = allHeaders.join(',') + '\n';
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
        
        csv += row.join(',') + '\n';
    }
    
    console.log('\nWriting CSV to disk...');
    fs.writeFileSync(outputPath, csv, 'utf8');
    console.log('\nRegistry written to ' + outputPath + ' (' + questions.length + ' questions)');
}

function extractQuestionsFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const arrayMatch = content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);\s*$/m);
    if (!arrayMatch) throw new Error('Could not find array in ' + filePath);
    const arrayStr = arrayMatch[1];
    return eval('(' + arrayStr + ')');
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
        
        const enriched = questions.map(function(q) { return enrichQuestion(q, fileName); });
        console.log('  Enriched ' + enriched.length + ' questions');
        
        allQuestions = allQuestions.concat(enriched);
    }
    
    console.log('\nTotal questions: ' + allQuestions.length);
    
    // Write registry
    const outputPath = path.join(repoRoot, 'reports', 'MasterQuestionRegistry.csv');
    writeRegistry(allQuestions, outputPath);
    
    // Statistics
    const stats = {
        total: allQuestions.length,
        withBloom: allQuestions.filter(function(q) { return q.BloomLevel && q.BloomLevel !== ''; }).length,
        withDifficultyScore: allQuestions.filter(function(q) { return q.DifficultyScore && q.DifficultyScore !== ''; }).length,
        withDomain: allQuestions.filter(function(q) { return q.Domain && q.Domain !== ''; }).length,
        withBloomSource: allQuestions.filter(function(q) { return q.BloomSource && q.BloomSource !== ''; }).length,
        withEstimatedMinutes: allQuestions.filter(function(q) { return q.EstimatedMinutes && q.EstimatedMinutes !== ''; }).length,
        withCalculationRequired: allQuestions.filter(function(q) { return q.CalculationRequired && q.CalculationRequired !== ''; }).length,
        withMetadataVersion: allQuestions.filter(function(q) { return q.MetadataVersion && q.MetadataVersion !== ''; }).length
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
    const reEnriched = allQuestions.map(function(q) { return enrichQuestion({...q}, 'test'); });
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