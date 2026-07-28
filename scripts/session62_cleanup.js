// Session 62 — Case Metadata and Loader Cleanup
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const timestamp = () => {
  const d = new Date();
  return d.getFullYear() + String(d.getMonth()+1).padStart(2,'0') + String(d.getDate()).padStart(2,'0') +
    String(d.getHours()).padStart(2,'0') + String(d.getMinutes()).padStart(2,'0') + String(d.getSeconds()).padStart(2,'0');
};

function backup(fp) {
  const bak = fp + '.bak-s62-' + timestamp();
  fs.copyFileSync(fp, bak);
  console.log('Backup: ' + path.basename(bak) + ' (' + fs.statSync(bak).size + ' bytes)');
}

// ===== FIX 1: Add DifficultyScore to 4 CBQ cases =====
console.log('\n=== FIX 1: Adding DifficultyScore to 4 CBQ cases ===');

const diffScoreFixes = [
  { file: 'scored_cases2.js', caseId: 'CBQ2-A3', insertAfter: 'ProductionStatus: "Draft"' },
  { file: 'scored_cases3.js', caseId: 'CBQ3-A1', insertAfter: 'ProductionStatus: "Draft"' },
  { file: 'scored_cases4.js', caseId: 'CBQ4-A1', insertAfter: 'ProductionStatus: "Draft"' },
  { file: 'scored_cases5.js', caseId: 'CBQ5-B2', insertAfter: 'ProductionStatus: "Draft"' },
];

for (const fix of diffScoreFixes) {
  const fp = path.join(ROOT, fix.file);
  backup(fp);
  let content = fs.readFileSync(fp, 'utf8');
  
  // Find the case by CaseID, then find the insertAfter marker within that case's object
  const caseIdx = content.indexOf('CaseID: "' + fix.caseId + '"');
  if (caseIdx < 0) { console.log('  WARN: ' + fix.caseId + ' not found in ' + fix.file); continue; }
  
  // Find the next ProductionStatus after the CaseID
  const psIdx = content.indexOf(fix.insertAfter, caseIdx);
  if (psIdx < 0) {
    // Try ProductionStatus: "Draft" without quotes variation
    const psIdx2 = content.indexOf('ProductionStatus: "Draft"', caseIdx);
    if (psIdx2 < 0) { console.log('  WARN: ProductionStatus not found near ' + fix.caseId); continue; }
    
    const insertPoint = psIdx2 + 'ProductionStatus: "Draft"'.length;
    content = content.substring(0, insertPoint) + ',\n        DifficultyScore: 3' + content.substring(insertPoint);
  } else {
    const insertPoint = psIdx + fix.insertAfter.length;
    content = content.substring(0, insertPoint) + ',\n        DifficultyScore: 3' + content.substring(insertPoint);
  }
  
  fs.writeFileSync(fp, content, 'utf8');
  console.log('  Added DifficultyScore: 3 to ' + fix.caseId + ' in ' + fix.file);
}

// ===== FIX 2: Remove MIGRATED_CASE_BANK dead code from app.js =====
console.log('\n=== FIX 2: Removing MIGRATED_CASE_BANK dead code from app.js ===');

const appPath = path.join(ROOT, 'app.js');
backup(appPath);
let appContent = fs.readFileSync(appPath, 'utf8');

// Lines 1160-1164 have .concat(typeof MIGRATED_CASE_BANK_... at the end of each line
// Remove each occurrence
const deadPattern = /\.concat\(typeof MIGRATED_CASE_BANK_A !== 'undefined' \? MIGRATED_CASE_BANK_A : \[\]\)\.concat\(typeof MIGRATED_CASE_BANK_B !== 'undefined' \? MIGRATED_CASE_BANK_B : \[\]\)\.concat\(typeof MIGRATED_CASE_BANK_C !== 'undefined' \? MIGRATED_CASE_BANK_C : \[\]\)\.concat\(typeof MIGRATED_CASE_BANK_D !== 'undefined' \? MIGRATED_CASE_BANK_D : \[\]\)/g;

const before = appContent;
appContent = appContent.replace(deadPattern, '');
const removed = before.length - appContent.length;
console.log('  Removed ' + removed + ' chars of MIGRATED_CASE_BANK dead code (' + (before.match(deadPattern) || []).length + ' occurrences)');

// ===== FIX 3: Add Section F to enhanced_banks in app.js =====
console.log('\n=== FIX 3: Adding Section F to enhanced_banks in app.js ===');

// Find the enhanced_banks closing for section E (line 1164)
// After section E closes, we need to add section F
// Current: 'E': [].concat(...ENHANCED_CASE_BANK5_E...) ... MIGRATED_CASE_BANK_D : []),

// We need to add after section E:
// 'F': [].concat(typeof ENHANCED_CASE_BANK_F !== 'undefined' ? ENHANCED_CASE_BANK_F : [])...

// Find the enhanced_banks block end
const enhancedBanksStart = appContent.indexOf("let enhanced_banks = {");
const enhancedBanksEndMarker = "\n        };\n\n        let result = []";
const enhancedBanksEnd = appContent.indexOf(enhancedBanksEndMarker, enhancedBanksStart);

if (enhancedBanksEnd > 0) {
  const sectionFLine = "\n            'F': [].concat(typeof ENHANCED_CASE_BANK_F !== 'undefined' ? ENHANCED_CASE_BANK_F : []).concat(typeof ENHANCED_CASE_BANK2_F !== 'undefined' ? ENHANCED_CASE_BANK2_F : []).concat(typeof ENHANCED_CASE_BANK3_F !== 'undefined' ? ENHANCED_CASE_BANK3_F : []).concat(typeof ENHANCED_CASE_BANK4_F !== 'undefined' ? ENHANCED_CASE_BANK4_F : []).concat(typeof ENHANCED_CASE_BANK5_F !== 'undefined' ? ENHANCED_CASE_BANK5_F : []),";
  appContent = appContent.substring(0, enhancedBanksEnd) + sectionFLine + appContent.substring(enhancedBanksEnd);
  console.log('  Added Section F to enhanced_banks');
} else {
  console.log('  WARN: Could not find enhanced_banks end marker');
}

fs.writeFileSync(appPath, appContent, 'utf8');
console.log('  app.js: ' + appContent.length + ' bytes');

// ===== FIX 4: Add ENHANCED_CASE_BANK_F cloning to each scored_cases file =====
console.log('\n=== FIX 4: Adding Section F bank cloning to scored_cases files ===');

const caseFiles = [
  { file: 'scored_cases.js', base: 'ENHANCED_CASE_BASE' },
  { file: 'scored_cases2.js', base: 'ENHANCED_CASE_BASE2' },
  { file: 'scored_cases3.js', base: 'ENHANCED_CASE_BASE3' },
  { file: 'scored_cases4.js', base: 'ENHANCED_CASE_BASE4' },
  { file: 'scored_cases5.js', base: 'ENHANCED_CASE_BASE5' },
];

for (const cf of caseFiles) {
  const fp = path.join(ROOT, cf.file);
  let content = fs.readFileSync(fp, 'utf8');
  
  // Find the last ENHANCED_CASE_BANK_E declaration to add F after it
  const bankE = 'const ENHANCED_CASE_BANK' + (cf.file.includes('2') ? '2' : cf.file.includes('3') ? '3' : cf.file.includes('4') ? '4' : cf.file.includes('5') ? '5' : '') + '_E';
  const bankEIdx = content.lastIndexOf(bankE);
  if (bankEIdx < 0) { console.log('  WARN: ' + bankE + ' not found in ' + cf.file); continue; }
  
  // Find end of that line
  let lineEnd = content.indexOf('\n', bankEIdx);
  if (lineEnd < 0) lineEnd = bankEIdx + 100;
  
  const suffix = cf.file.includes('2') ? '2' : cf.file.includes('3') ? '3' : cf.file.includes('4') ? '4' : cf.file.includes('5') ? '5' : '';
  const bankFName = 'ENHANCED_CASE_BANK' + suffix + '_F';
  
  // Check if already exists
  if (content.includes(bankFName)) {
    console.log('  SKIP ' + cf.file + ': ' + bankFName + ' already exists');
    continue;
  }
  
  const fLine = '\nconst ' + bankFName + ' = ' + cf.base + '.map((c, i) => cloneEnhancedCase(c, \'F\', i));';
  content = content.substring(0, lineEnd) + fLine + content.substring(lineEnd);
  
  fs.writeFileSync(fp, content, 'utf8');
  console.log('  Added ' + bankFName + ' to ' + cf.file + ' (' + content.length + ' bytes)');
}

// ===== VERIFICATION =====
console.log('\n=== VERIFICATION ===');
const filesToCheck = ['pack_a_corrected.js','pack_b_corrected.js','pack_c_corrected.js','pack_d_corrected.js','pack_e_corrected.js',
  'scored_cases.js','scored_cases2.js','scored_cases3.js','scored_cases4.js','scored_cases5.js','app.js'];

let allPass = true;
for (const f of filesToCheck) {
  const fp = path.join(ROOT, f);
  try {
    const c = fs.readFileSync(fp, 'utf8');
    new Function(c);
    console.log('  OK ' + f);
  } catch (e) {
    console.log('  FAIL ' + f + ': ' + e.message.substring(0, 80));
    allPass = false;
  }
}

// Specific checks
console.log('\n=== SPECIFIC CHECKS ===');
const appC = fs.readFileSync(appPath, 'utf8');
console.log('  MIGRATED_CASE_BANK references: ' + ((appC.match(/MIGRATED_CASE_BANK/g) || []).length));
console.log('  ENHANCED_CASE_BANK_F references: ' + ((appC.match(/ENHANCED_CASE_BANK[0-9]*_F/g) || []).length));

for (const cf of caseFiles) {
  const fp = path.join(ROOT, cf.file);
  const c = fs.readFileSync(fp, 'utf8');
  const suffix = cf.file.includes('2') ? '2' : cf.file.includes('3') ? '3' : cf.file.includes('4') ? '4' : cf.file.includes('5') ? '5' : '';
  console.log('  ' + cf.file + ': ENHANCED_CASE_BANK' + suffix + '_F present: ' + c.includes('ENHANCED_CASE_BANK' + suffix + '_F'));
}

console.log('\nAll files pass: ' + allPass);
