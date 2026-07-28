// Extract stem, CL, DS, Topic, Section from all 5 packs for cross-pack consistency audit
const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026';
const packs = [
  { file: 'pack_a_corrected.js', varName: 'MCQ_BANK_A', label: 'A' },
  { file: 'pack_b_corrected.js', varName: 'MCQ_BANK_B', label: 'B' },
  { file: 'pack_c_corrected.js', varName: 'MCQ_BANK_C', label: 'C' },
  { file: 'pack_d_corrected.js', varName: 'MCQ_BANK_D', label: 'D' },
  { file: 'pack_e_corrected.js', varName: 'MCQ_BANK_E', label: 'E' },
];

const allItems = [];

for (const pack of packs) {
  const filePath = path.join(BASE, pack.file);
  console.error(`Reading: ${pack.file}...`);
  
  let source = fs.readFileSync(filePath, 'utf-8');
  
  // Strip BOM if present
  if (source.charCodeAt(0) === 0xFEFF) source = source.substring(1);
  
  // Replace the const declaration so eval returns the array
  source = source.replace(/^const\s+\w+\s*=\s*/, '');
  
  let data;
  try {
    // Add return statement
    data = new Function('return ' + source)();
  } catch (e) {
    console.error(`FAIL: ${pack.file} - ${e.message}`);
    continue;
  }
  
  if (!Array.isArray(data)) {
    console.error(`FAIL: ${pack.file} - not an array, got ${typeof data}`);
    continue;
  }
  
  console.error(`  Got ${data.length} items`);
  
  for (const item of data) {
    const stem = (item.Stem || '').trim();
    
    allItems.push({
      Pack: pack.label,
      QuestionID: item.QuestionID || '',
      Section: item.Section || '',
      Topic: item.Topic || '',
      Stem: stem.substring(0, 500), // truncated
      CognitiveLevel: item.CognitiveLevel || '',
      DifficultyScore: item.DifficultyScore || 0,
      Difficulty: item.Difficulty || '',
      CorrectChoice: item.CorrectChoice || '',
    });
  }
}

console.error(`\nTotal items extracted: ${allItems.length}`);
fs.writeFileSync(path.join(BASE, 'scripts', 'crosspack_extracted.json'), JSON.stringify(allItems, null, 2));
console.error('Written to scripts/crosspack_extracted.json');
