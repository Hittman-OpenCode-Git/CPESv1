// Session 60 — Case-Study Migration Script
// Extracts CASE_BANK_A-D from pack files and inserts into scored_cases files
// with governance metadata. Removes CASE_BANK arrays from packs.
// Run: node scripts/migrate_cases_session60.js

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Mapping: pack file → case variable → scored_cases destination → new variable name
const MIGRATIONS = [
  { pack: 'pack_a_corrected.js', caseVar: 'CASE_BANK_A', dest: 'scored_cases.js', newVar: 'MIGRATED_CASE_BASE_A' },
  { pack: 'pack_b_corrected.js', caseVar: 'CASE_BANK_B', dest: 'scored_cases2.js', newVar: 'MIGRATED_CASE_BASE_B' },
  { pack: 'pack_c_corrected.js', caseVar: 'CASE_BANK_C', dest: 'scored_cases3.js', newVar: 'MIGRATED_CASE_BASE_C' },
  { pack: 'pack_d_corrected.js', caseVar: 'CASE_BANK_D', dest: 'scored_cases4.js', newVar: 'MIGRATED_CASE_BASE_D' },
];

function timestamp() {
  const d = new Date();
  return d.getFullYear() +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0') +
    String(d.getHours()).padStart(2, '0') +
    String(d.getMinutes()).padStart(2, '0') +
    String(d.getSeconds()).padStart(2, '0');
}

function backup(filePath) {
  const bak = filePath + '.bak-' + timestamp();
  fs.copyFileSync(filePath, bak);
  console.log(`  Backup: ${path.basename(bak)} (${fs.statSync(bak).size} bytes)`);
  return bak;
}

function addGovernanceMetadata(caseObj) {
  // Add governance fields that standard cases lack
  const c = Object.assign({}, caseObj);
  
  if (!c.question_state) c.question_state = 'Unprocessed';
  if (!c.ProductionStatus) c.ProductionStatus = 'Draft';
  if (!c.DifficultyScore) c.DifficultyScore = 3; // Moderate default
  if (!c.Version) c.Version = '1.0';
  if (!c.CreatedDate) c.CreatedDate = '2026-07-24';
  if (!c.ModifiedDate) c.ModifiedDate = '2026-07-24';
  if (!c.Author) c.Author = 'Migration Agent';
  if (!c.Confidence) c.Confidence = 85;
  if (!c.RevisionHistory) c.RevisionHistory = [{
    Date: '2026-07-24',
    Version: '1.0',
    Author: 'Session 60 Migration',
    Summary: 'Migrated from MCQ pack to scored_cases file. Added governance metadata.'
  }];
  
  // Add per-item governance metadata
  if (c.Items && Array.isArray(c.Items)) {
    c.Items = c.Items.map((item, idx) => {
      const it = Object.assign({}, item);
      if (!it.question_state) it.question_state = 'Unprocessed';
      if (!it.ItemID) it.ItemID = `${c.CaseID}-Q${idx + 1}`;
      if (!it.CognitiveLevel) {
        // Derive from item type position
        const types = ['numeric', 'numeric', 'select', 'select', 'multi', 'fill', 'match'];
        const index = Math.min(idx, types.length - 1);
        it.Type = it.Type || types[index] || 'select';
      }
      return it;
    });
  }
  
  c.QuestionCount = (c.Items && c.Items.length) || c.QuestionCount || 0;
  
  return c;
}

function extractCasesFromPack(packPath, caseVarName) {
  const content = fs.readFileSync(packPath, 'utf8');
  
  // Find the CASE_BANK declaration
  const varDecl = `const ${caseVarName} = [`;
  const startIdx = content.indexOf(varDecl);
  if (startIdx < 0) {
    console.log(`  WARNING: ${caseVarName} not found in ${path.basename(packPath)}`);
    return { cases: [], packContent: content };
  }
  
  // Find the closing ]; for the array — we need to find the matching bracket
  // Find the line before where CASE_BANK starts
  const beforeStart = content.substring(0, startIdx);
  const linesBefore = beforeStart.split('\n');
  
  // Find the end of the array (the matching ] followed by ;)
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let escapeNext = false;
  let endIdx = -1;
  
  for (let i = startIdx + varDecl.length - 1; i < content.length; i++) {
    const ch = content[i];
    
    if (escapeNext) {
      escapeNext = false;
      continue;
    }
    
    if (ch === '\\') {
      escapeNext = true;
      continue;
    }
    
    if (inString) {
      if (ch === stringChar) {
        inString = false;
      }
      continue;
    }
    
    if (ch === '"' || ch === "'") {
      inString = true;
      stringChar = ch;
      continue;
    }
    
    if (ch === '[') {
      depth++;
    } else if (ch === ']') {
      depth--;
      if (depth === 0) {
        // Check for semicolon after
        let j = i + 1;
        while (j < content.length && (content[j] === ' ' || content[j] === '\t')) j++;
        if (j < content.length && content[j] === ';') {
          endIdx = j + 1;
          break;
        } else {
          endIdx = i + 1;
          break;
        }
      }
    }
  }
  
  if (endIdx < 0) {
    console.log(`  ERROR: Could not find end of ${caseVarName}`);
    return { cases: [], packContent: content };
  }
  
  // Extract the array text (everything between [ and ])
  const arrayText = content.substring(startIdx + varDecl.length - 1, endIdx);
  
  // Log the segment
  console.log(`  Found ${caseVarName} from char ${startIdx} to ${endIdx} (${endIdx - startIdx} bytes)`);
  
  // Build new pack content without the CASE_BANK
  // Find what's between MCQ_BANK end and CASE_BANK start (whitespace/comments)
  const before = content.substring(0, startIdx);
  
  // Trim trailing whitespace from before
  const trimmedBefore = before.replace(/\s+$/g, '\n');
  
  // What comes after CASE_BANK
  const after = content.substring(endIdx);
  
  const newPackContent = trimmedBefore + after;
  
  return { arrayText, packContent: newPackContent };
}

function insertIntoScoredCases(destPath, newVarName, casesArray) {
  let content = fs.readFileSync(destPath, 'utf8');
  
  // Add governance metadata to each case
  const enrichedCases = casesArray.map(addGovernanceMetadata);
  
  // Serialize the cases array
  const casesJson = JSON.stringify(enrichedCases, null, 2);
  const newDeclaration = `\n// === MIGRATED STANDARD CASES (Session 60) ===\nconst ${newVarName} = ${casesJson};\n`;
  
  // Find the last section-cloning block to insert before it
  const cloningMarker = 'const ENHANCED_CASE_BANK_';
  const cloneIdx = content.indexOf(cloningMarker);
  
  if (cloneIdx >= 0) {
    // Insert before the section-cloning
    content = content.substring(0, cloneIdx) + newDeclaration + '\n' + content.substring(cloneIdx);
  } else {
    // No cloning block — append at end
    content += '\n' + newDeclaration;
  }
  
  return content;
}

function updateAppJs(appPath) {
  let content = fs.readFileSync(appPath, 'utf8');
  
  // The standard 'banks' section at lines 1152-1158 references CASE_BANK_A through E directly
  // After migration, CASE_BANK_* are removed from packs, so those will return []
  // We need to add the migrated cases to the 'banks' fallback so they still load
  // Each migrated base variable is per-pack: MIGRATED_CASE_BASE_A (from Pack A), etc.
  // The SectionTags field on each case handles section filtering — no cloning needed.
  
  const sections = ['A', 'B', 'C', 'D', 'E'];
  
  for (const sec of sections) {
    // Pattern: typeof CASE_BANK_${sec} !== 'undefined' ? CASE_BANK_${sec} : []
    const pattern = `typeof CASE_BANK_${sec} !== 'undefined' ? CASE_BANK_${sec} : []`;
    
    // Add fallback to migrated case bases
    const migratedFallback = `(typeof CASE_BANK_${sec} !== 'undefined' ? CASE_BANK_${sec} : (typeof MIGRATED_CASE_BASE_${sec} !== 'undefined' ? MIGRATED_CASE_BASE_${sec} : []))`;
    
    if (content.includes(pattern)) {
      content = content.replace(pattern, migratedFallback);
      console.log(`  Updated banks fallback for section ${sec}`);
    }
  }
  
  return content;
}

// Main execution
console.log('=== Session 60 — Case-Study Migration ===\n');

// PHASE 1: Extract cases from all packs (read-only)
console.log('Phase 1: Extracting cases from packs...\n');
const extracted = {};

for (const mig of MIGRATIONS) {
  const packPath = path.join(ROOT, mig.pack);
  console.log(`Processing ${mig.pack}...`);
  
  // Backup
  backup(packPath);
  
  const result = extractCasesFromPack(packPath, mig.caseVar);
  
  if (result.arrayText) {
    // Parse the array text to get the actual case objects
    // Use Function constructor — pack files are JavaScript object literals, not strict JSON
    try {
      const cases = (new Function('return ' + result.arrayText))();
      console.log(`  Extracted ${cases.length} cases`);
      
      // Show CaseIDs
      const ids = cases.map(c => c.CaseID).join(', ');
      console.log(`  CaseIDs: ${ids}`);
      
      extracted[mig.caseVar] = { cases, packPath, newContent: result.packContent };
    } catch (e) {
      console.log(`  ERROR parsing cases: ${e.message}`);
      console.log(`  Array text starts: ${result.arrayText.substring(0, 200)}`);
    }
  }
}

// PHASE 2: Insert into scored_cases files and write updated packs
console.log('\nPhase 2: Inserting cases into scored_cases files and cleaning packs...\n');

for (const mig of MIGRATIONS) {
  const data = extracted[mig.caseVar];
  if (!data || !data.cases || data.cases.length === 0) {
    console.log(`  SKIP ${mig.caseVar}: no cases extracted`);
    continue;
  }
  
  const destPath = path.join(ROOT, mig.dest);
  console.log(`Inserting ${data.cases.length} cases into ${mig.dest}...`);
  
  // Backup destination
  backup(destPath);
  
  // Insert cases
  const newDestContent = insertIntoScoredCases(destPath, mig.newVar, data.cases);
  fs.writeFileSync(destPath, newDestContent, 'utf8');
  console.log(`  Updated ${mig.dest} (${newDestContent.length} bytes)`);
  
  // Write cleaned pack
  fs.writeFileSync(data.packPath, data.newContent, 'utf8');
  console.log(`  Cleaned ${mig.pack} (${data.newContent.length} bytes)`);
}

// PHASE 3: Update app.js
console.log('\nPhase 3: Updating app.js...');
const appPath = path.join(ROOT, 'app.js');
backup(appPath);
const newAppContent = updateAppJs(appPath);
fs.writeFileSync(appPath, newAppContent, 'utf8');
console.log(`  Updated app.js (${newAppContent.length} bytes)`);

// PHASE 4: Verify
console.log('\nPhase 4: Verification...');
console.log('  Running syntax checks...');

for (const f of ['pack_a_corrected.js', 'pack_b_corrected.js', 'pack_c_corrected.js', 'pack_d_corrected.js', 'pack_e_corrected.js',
  'scored_cases.js', 'scored_cases2.js', 'scored_cases3.js', 'scored_cases4.js', 'scored_cases5.js', 'app.js']) {
  try {
    const content = fs.readFileSync(path.join(ROOT, f), 'utf8');
    new Function(content); // Will throw if syntax error
    console.log(`  ✓ ${f} — syntax OK`);
  } catch (e) {
    console.log(`  ✗ ${f} — SYNTAX ERROR: ${e.message.substring(0, 100)}`);
  }
}

console.log('\n=== Migration Complete ===');
