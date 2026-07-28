#!/usr/bin/env node
/**
 * Source Metadata Reconstruction - Phase 1 Batch 2B
 * Enriches JavaScript question files with deterministic metadata
 */

const fs = require('fs');
const path = require('path');

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

function extractQuestionsFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Find the array assignment
    const varMatch = content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\])\s*;\s*$/m);
    if (!varMatch) {
        throw new Error(`Could not find array in ${filePath}`);
    }
    
    const arrayStr = varMatch[1];
    const questions = eval('(' + arrayStr + ')');
    return questions;
}

function enrichQuestion(question, fileName) {
    const enriched = { ...question };
    
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
            enriched.DifficultyScore = CONFIG.DIFFICULTY_SCORES[enriched.Difficulty] || 3;
        } else {
            enriched.DifficultyScore = 3;
        }
    }
    
    // Domain - deterministic from Section
    if (!enriched.Domain || enriched.Domain === '') {
        const section = enriched.Section || 'A';
        enriched.Domain = CONFIG.SECTION_DOMAINS[section] || CONFIG.SECTION_NAMES[section] || '';
    }
    
    // SectionTags - array from Section
    if (!enriched.SectionTags || enriched.SectionTags === '') {
        enriched.SectionTags = JSON.stringify([enriched.Section || 'A']);
    } else if (typeof enriched.SectionTags === 'string' && !enriched.SectionTags.startsWith('[')) {
        enriched.SectionTags = JSON.stringify([enriched.SectionTags]);
    }
    
    // Standard metadata fields
    enriched.MetadataVersion = CONFIG.METADATA_VERSION;
    enriched.MetadataSource = CONFIG.METADATA_SOURCE;
    enriched.MetadataConfidence = CONFIG.METADATA_CONFIDENCE;
    enriched.MetadataLastUpdated = CONFIG.TIMESTAMP;
    
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
        enriched.DifficultyScore = CONFIG.DIFFICULTY_SCORES[enriched.Difficulty] || 3;
    }
    
    // Difficulty label if missing but score exists
    if (!enriched.Difficulty && enriched.DifficultyScore) {
        const reverse = Object.fromEntries(Object.entries(CONFIG.DIFFICULTY_SCORES).map(([k,v]) => [v,k]));
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
    if (!enriched.CalculationRequired) {
        enriched.CalculationRequired = enriched.CalculationItem === true || enriched.CalculationItem === 'true' || enriched.ItemType === 'numeric' ? 'Y' : 'N';
    }
    
    // ExhibitRequired
    if (!enriched.ExhibitRequired) {
        enriched.ExhibitRequired = 'N';
    }
    
    // ScenarioType
    if (!enriched.ScenarioType) {
        enriched.ScenarioType = 'MCQ';
    }
    
    // File source
    enriched.File = path.basename(fileName);
    
    return enriched;
}

function writeUpdatedSourceFile(filePath, questions, originalContent) {
    // Reconstruct the file with enriched questions
    const varMatch = originalContent.match(/(const\s+\w+\s*=\s*)(\[[\s\S]*?\]);/m);
    if (!varMatch) {
        throw new Error('Could not find array to replace');
    }
    
    const varPrefix = varMatch[1];
    const enrichedArrayStr = JSON.stringify(questions, null, 2)
        .replace(/"(\w+)":/g, '$1:')  // Convert JSON to JS object syntax
        .replace(/"([^"]*)"/g, (match, p1) => {
            // Keep strings as double-quoted
            return match;
        });
    
    const newContent = originalContent.replace(
        varMatch[2],
        enrichedArrayStr.replace(/"/g, '"').replace(/null/g, '""').replace(/false/g, 'false').replace(/true/g, 'true')
    );
    
    // Actually, let's use a safer approach - just append metadata to each object
    // without modifying the original structure
    // For now, let's just output the enriched questions as JSON for the registry
    return questions;
}

function enrichQuestions(questions, fileName) {
    return questions.map(q => enrichQuestion(q, fileName));
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
    
    const rows = [headers.join(',')];
    
    for (const q of questions) {
        const row = [
            q.QuestionID || '',
            q.CaseID || '',
            q.File || '',
            q.Version || '1.0',
            q.ProductionStatus || 'Draft',
            q.CreatedDate || '',
            q.LastValidated || q.ModifiedDate || '',
            q.RevisionCount || 0,
            q.Domain || '',
            q.SectionTags || '',
            q.LearningOutcomeStatement || q.LOSTag || '',
            q.PrimaryCompetency || '',
            q.SecondaryCompetency || '',
            q.ItemType || q.Type || '',
            q.BloomLevel || '',
            q.BloomSource || '',
            q.BloomConfidence || '',
            q.BloomNeedsReview || '',
            q.Difficulty || '',
            q.DifficultyScore || '',
            q.EstimatedMinutes || '',
            q.FormulaReference || '',
            q.AccountingPrinciple || '',
            q.CalculationRequired || '',
            q.ExhibitRequired || '',
            q.Industry || '',
            q.ScenarioType || '',
            q.OverallScore || '',
            q.ScoreBlueprint || '',
            q.ScoreCognitive || '',
            q.ScoreTechnical || '',
            q.ScoreDistractor || '',
            q.ScoreRealism || '',
            q.ScoreNumerical || '',
            q.ScoreExplanation || '',
            q.ScoreClarity || '',
            q.ScoreAccessibility || '',
            q.ScoreMetadata || '',
            q.RecommendedAction || 'Needs Baseline',
            q.GoldStandardEligible || 'N',
            q.CommonTrapReference || q.CommonTrap || '',
            q.LearningObjectives || '',
            q.RelatedTopics || '',
            q.PrerequisiteConcepts || '',
            q.StudentCorrectPct || '',
            q.AverageTime || '',
            q.ConfidenceRating || q.Confidence || '',
            q.DifficultyIndex || '',
            q.DiscriminationIndex || '',
            q.GuessRate || ''
        ].map(v => {
            if (v === null || v === undefined) return '';
            const str = String(v).replace(/"/g, '""');
            return str.includes(',') || str.includes('"') || str.includes('\n') ? `"${str}"` : str;
        }).join(',');
        
        rows.push(row);
    }
    
    fs.writeFileSync(outputPath, rows.join('\n'), 'utf8');
    console.log(`Registry written to ${outputPath} (${rows.length - 1} questions)`);
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
        const content = fs.readFileSync(filePath, 'utf8');
        const questions = extractQuestionsFromFile(filePath);
        
        console.log(`  Extracted ${questions.length} questions`);
        
        const enriched = enrichQuestions(questions, fileName);
        allQuestions.push(...enriched);
        
        console.log(`  Enriched ${enriched.length} questions`);
    }
    
    console.log(`\nTotal questions: ${allQuestions.length}`);
    
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
        withDifficultyScore: allQuestions.filter(q => q.DifficultyScore !== undefined && q.DifficultyScore !== '').length,
        withEstimatedMinutes: allQuestions.filter(q => q.EstimatedMinutes && q.EstimatedMinutes !== '').length,
        withCalculationRequired: allQuestions.filter(q => q.CalculationRequired && q.CalculationRequired !== '').length,
        withMetadataVersion: allQuestions.filter(q => q.MetadataVersion && q.MetadataVersion !== '').length
    };
    
    console.log('\n=== Enrichment Statistics ===');
    console.log(`Total questions: ${stats.total}`);
    console.log(`BloomLevel: ${stats.withBloom}/${stats.total} (${Math.round(stats.withBloom/stats.total*100)}%)`);
    console.log(`DifficultyScore: ${stats.withDifficultyScore}/${stats.total} (${Math.round(stats.withDifficultyScore/stats.total*100)}%)`);
    console.log(`Domain: ${stats.withDomain}/${stats.total} (${Math.round(stats.withDomain/stats.total*100)}%)`);
    console.log(`BloomSource: ${stats.withBloomSource}/${stats.total} (${Math.round(stats.withBloomSource/stats.total*100)}%)`);
    console.log(`EstimatedMinutes: ${stats.withEstimatedMinutes}/${stats.total} (${Math.round(stats.withEstimatedMinutes/stats.total*100)}%)`);
    console.log(`CalculationRequired: ${stats.withCalculationRequired}/${stats.total} (${Math.round(stats.withCalculationRequired/stats.total*100)}%)`);
    console.log(`MetadataVersion: ${stats.withMetadataVersion}/${stats.total} (${Math.round(stats.withMetadataVersion/stats.total*100)}%)`);
    
    // Sample output
    console.log('\n=== Sample Enriched Questions ===');
    for (let i = 0; i < Math.min(3, allQuestions.length); i++) {
        const q = allQuestions[i];
        console.log(`\nQ${i+1}: ${q.QuestionID}`);
        console.log(`  BloomLevel: ${q.BloomLevel} (Source: ${q.BloomSource}, Confidence: ${q.BloomConfidence}, NeedsReview: ${q.BloomNeedsReview})`);
        console.log(`  Difficulty: ${q.Difficulty} (Score: ${q.DifficultyScore})`);
        console.log(`  Domain: ${q.Domain}`);
        console.log(`  EstimatedMinutes: ${q.EstimatedMinutes}`);
        console.log(`  CalculationRequired: ${q.CalculationRequired}`);
        console.log(`  MetadataVersion: ${q.MetadataVersion} (Source: ${q.MetadataSource}, Confidence: ${q.MetadataConfidence})`);
    }
    
    // Idempotency test
    console.log('\n=== Idempotency Test ===');
    const reEnriched = enrichQuestions(allQuestions.map(q => ({...q})), 'test');
    let changes = 0;
    for (let i = 0; i < allQuestions.length; i++) {
        const orig = allQuestions[i];
        const re = reEnriched[i];
        if (orig.BloomLevel !== re.BloomLevel || orig.DifficultyScore !== re.DifficultyScore || 
            orig.BloomSource !== re.BloomSource || orig.MetadataVersion !== re.MetadataVersion) {
            changes++;
        }
    }
    console.log(`Changes on second run: ${changes}/${allQuestions.length}`);
    
    console.log('\n=== Enrichment Complete ===');
}

// Run
runEnrichment();