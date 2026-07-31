// Session 67 — Apply 15 rewrites to pack files
// Reads pack files, finds target QIDs via brace-matching, replaces items

const fs = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '..');

// Rewritten item content — must match the pack file's tab-based indentation
const REWRITES = require('./s67_rewritten_items.js');

const PACK_MAP = {
  'A': 'pack_a_corrected.js',
  'B': 'pack_b_corrected.js',
  'C': 'pack_c_corrected.js',
  'D': 'pack_d_corrected.js',
  'E': 'pack_e_corrected.js',
};

// Build QID → Pack mapping
const qidPackMap = {};
for (const qid of Object.keys(REWRITES)) {
  // Pack is embedded in QID prefix
  if (qid.startsWith('P1-') && !qid.startsWith('P1B-') && !qid.startsWith('P1E-')) {
    qidPackMap[qid] = 'A';
  } else if (qid.startsWith('P1B-')) {
    qidPackMap[qid] = 'B';
  } else if (qid.startsWith('P1-') && qid.includes('-C')) {
    // These are Pack C items with QID format like P1-CC-xxx or P1-BC-xxx or P1-DC-xxx
    qidPackMap[qid] = 'C';
  } else if (qid.startsWith('P1-') && qid.includes('-D')) {
    // These are Pack D items with QID format like P1-CD-xxx or P1-DD-xxx or P1-BD-xxx
    qidPackMap[qid] = 'D';
  } else if (qid.startsWith('P1E-')) {
    qidPackMap[qid] = 'E';
  }
}

// Fix the mapping with more precise logic:
// Pack A: P1-B-xxx, P1-C-xxx, P1-D-xxx (single letter after dash)
// Pack C: P1-CC-xxx, P1-BC-xxx, P1-DC-xxx (double letter ending in C)
// Pack D: P1-CD-xxx, P1-BD-xxx, P1-DD-xxx (double letter ending in D)

for (const qid of Object.keys(REWRITES)) {
  const parts = qid.split('-');
  if (qid.startsWith('P1B-')) {
    qidPackMap[qid] = 'B';
  } else if (qid.startsWith('P1E-')) {
    qidPackMap[qid] = 'E';
  } else {
    // Format: P1-XX-NNN or P1-X-NNN
    const section = parts[1];
    if (section.length === 1) {
      qidPackMap[qid] = 'A';
    } else if (section.endsWith('C')) {
      qidPackMap[qid] = 'C';
    } else if (section.endsWith('D')) {
      qidPackMap[qid] = 'D';
    }
  }
}

console.log('QID → Pack mapping:');
for (const [qid, pack] of Object.entries(qidPackMap)) {
  console.log(`  ${qid} → Pack ${pack}`);
}

// Apply rewrites
let totalApplied = 0;
const results = [];

for (const [pack, filename] of Object.entries(PACK_MAP)) {
  const filePath = path.join(BASE, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  let packApplied = 0;

  for (const [qid, newItem] of Object.entries(REWRITES)) {
    if (qidPackMap[qid] !== pack) continue;

    // Find the QID in the file
    const qidPattern = `"QuestionID": "${qid}"`;
    const qidIndex = content.indexOf(qidPattern);
    if (qidIndex === -1) {
      console.log(`  WARNING: ${qid} not found in ${filename}`);
      continue;
    }

    // Find the enclosing object: scan backward for "{" and forward for matching "}"
    // We need to find the opening brace of this item's JSON object
    // Items are separated by "},\n\t{" — find the opening brace before the QID
    
    // First, find the start of this item (opening brace of the object containing the QID)
    // Scan backward from the QID to find an opening brace at the right depth
    let braceStart = qidIndex;
    let depth = 0;
    let inString = false;
    let escapeNext = false;
    
    // Scan forward from a position before this item to find the opening brace
    // We'll find the "{" that opens this item's object
    // Strategy: find the QID, then scan backward character by character to find the matching "{"
    let scanPos = qidIndex;
    let itemStart = -1;
    while (scanPos >= 0) {
      const ch = content[scanPos];
      
      if (ch === '}' && !inString) {
        depth++;
      } else if (ch === '{' && !inString) {
        if (depth === 0) {
          itemStart = scanPos;
          break;
        }
        depth--;
      } else if (ch === '"' && !escapeNext) {
        inString = !inString;
      }
      
      if (ch === '\\' && inString && !escapeNext) {
        escapeNext = true;
      } else {
        escapeNext = false;
      }
      
      scanPos--;
    }
    
    if (itemStart === -1) {
      console.log(`  ERROR: Could not find opening brace for ${qid}`);
      continue;
    }
    
    // Now scan forward from itemStart to find the matching closing brace
    let scanEnd = itemStart + 1;
    depth = 1;
    inString = false;
    escapeNext = false;
    
    while (scanEnd < content.length && depth > 0) {
      const ch = content[scanEnd];
      
      if (ch === '{' && !inString) {
        depth++;
      } else if (ch === '}' && !inString) {
        depth--;
        if (depth === 0) {
          break;
        }
      } else if (ch === '"' && !escapeNext) {
        inString = !inString;
      }
      
      if (ch === '\\' && inString && !escapeNext) {
        escapeNext = true;
      } else {
        escapeNext = false;
      }
      
      scanEnd++;
    }
    
    if (depth !== 0) {
      console.log(`  ERROR: Could not find closing brace for ${qid}`);
      continue;
    }
    
    const itemEnd = scanEnd;
    
    // Extract the old item
    const oldItem = content.substring(itemStart, itemEnd + 1);
    
    // The new item needs to have the same indentation context
    // Use the same leading whitespace as the old item's first line
    
    // Replace
    content = content.substring(0, itemStart) + newItem + content.substring(itemEnd + 1);
    
    console.log(`  ✓ ${qid} replaced in ${filename}`);
    packApplied++;
    totalApplied++;
    results.push({ qid, pack, filename, status: 'applied' });
  }
  
  if (packApplied > 0) {
    // Write back
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  Wrote ${filename} (${packApplied} items replaced)`);
  }
}

console.log(`\nTotal applied: ${totalApplied}/15`);
console.log('\nResults:');
for (const r of results) {
  console.log(`  ${r.qid} → ${r.filename}: ${r.status}`);
}

// Verify parse
for (const [pack, filename] of Object.entries(PACK_MAP)) {
  const filePath = path.join(BASE, filename);
  try {
    new Function(fs.readFileSync(filePath, 'utf8'));
    console.log(`  ${filename}: Parse PASS`);
  } catch(e) {
    console.log(`  ${filename}: Parse FAIL — ${e.message}`);
  }
}
