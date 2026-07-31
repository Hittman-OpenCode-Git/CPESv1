// S96P — Pack C Section EC metadata extraction
// Read-only audit. Uses Function constructor to load Pack C.
const fs = require('fs');
const src = fs.readFileSync('pack_c_corrected.js', 'utf8');
const fn = new Function(src + '; return MCQ_BANK_C;');
const bank = fn();

// Filter Section EC items (P1-EC-NNN)
const ecItems = bank.filter(q => q.QuestionID && /^P1-EC-\d{3}$/.test(q.QuestionID));

console.log(`=== PACK C SECTION EC — COGNITIVE AUDIT (S96P) ===`);
console.log(`Total items in Pack C: ${bank.length}`);
console.log(`Section EC items found: ${ecItems.length}`);
console.log('');

// Distributions
const cognitiveCounts = {};
const stateCounts = {};
const diffCounts = {};

ecItems.forEach(r => {
    const c = r.CognitiveLevel || 'MISSING';
    cognitiveCounts[c] = (cognitiveCounts[c] || 0) + 1;
    const s = r.question_state || 'MISSING';
    stateCounts[s] = (stateCounts[s] || 0) + 1;
    const d = r.Difficulty || 'MISSING';
    diffCounts[d] = (diffCounts[d] || 0) + 1;
});

console.log('--- CognitiveLevel Distribution ---');
Object.entries(cognitiveCounts).sort((a,b) => b[1]-a[1]).forEach(([k,v]) => console.log(`  ${k}: ${v}`));
console.log('');
console.log('--- question_state Distribution ---');
Object.entries(stateCounts).sort().forEach(([k,v]) => console.log(`  ${k}: ${v}`));
console.log('');
console.log('--- Difficulty Distribution ---');
Object.entries(diffCounts).sort().forEach(([k,v]) => console.log(`  ${k}: ${v}`));
console.log('');

// Detailed per-item output
ecItems.sort((a,b) => a.QuestionID.localeCompare(b.QuestionID));
ecItems.forEach(r => {
    const hasStem = !!r.Stem;
    const hasChoices = !!(r.Choices && Object.keys(r.Choices).length > 0);
    const hasEC = !!r.ExplanationCorrect;
    const renderable = hasStem && hasChoices && !!r.CorrectChoice;
    console.log(`${r.QuestionID} | state:${r.question_state || '?'} | cognitive:${r.CognitiveLevel || '?'} | diff:${r.Difficulty || '?'}(${r.DifficultyScore || '?'}) | stem:${hasStem ? 'YES' : 'NO'} | choices:${hasChoices ? 'YES' : 'NO'} | EC:${hasEC ? 'YES' : 'NO'} | topic:${(r.Topic || 'MISSING').substring(0,60)}`);
});

// Write full extract
fs.writeFileSync('scripts/output/session96p_raw_extract.json', JSON.stringify(ecItems, null, 2));
console.log('');
console.log(`JSON written to scripts/output/session96p_raw_extract.json (${ecItems.length} items)`);

// Additional stats
const missingStem = ecItems.filter(r => !r.Stem);
const missingChoices = ecItems.filter(r => !r.Choices || Object.keys(r.Choices).length === 0);
const evaluateItems = ecItems.filter(r => r.CognitiveLevel === 'Evaluate');
const analyzeItems = ecItems.filter(r => r.CognitiveLevel === 'Analyze');

console.log('');
console.log('--- Structural Health ---');
console.log(`  Items with NO Stem: ${missingStem.length}`);
console.log(`  Items with NO Choices: ${missingChoices.length}`);
console.log(`  Items labeled Evaluate: ${evaluateItems.length}`);
console.log(`  Items labeled Analyze: ${analyzeItems.length}`);
console.log(`  Items labeled Apply: ${ecItems.filter(r => r.CognitiveLevel === 'Apply').length}`);
console.log(`  Items labeled Understand: ${ecItems.filter(r => r.CognitiveLevel === 'Understand').length}`);
console.log(`  Items with MISSING CognitiveLevel: ${ecItems.filter(r => !r.CognitiveLevel).length}`);
