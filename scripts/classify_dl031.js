/**
 * classify_dl031.js — DL-031 Definition-Match Difficulty Inflation Classifier
 * 
 * Scans all 5 packs for items where the stem is a textbook definition
 * and the correct answer is the term being defined, but the difficulty
 * is labeled "Moderate" (should be "Easy").
 * 
 * Classification categories (S372 model):
 *   Simple Relabel — Difficulty/DifficultyScore change only
 *   Calibration — Re-evaluate against all cognitive dimensions
 *   Rewrite Required — Stem or distractors need enhancement
 *   Replacement Required — Item is fundamentally too simple
 * 
 * Usage: node scripts/classify_dl031.js [--execute]
 *   Without --execute: classify only (read-only)
 *   With --execute: apply Simple Relabel batch
 */

const fs = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '..');
const PACK_FILES = ['pack_a_corrected.js','pack_b_corrected.js','pack_c_corrected.js','pack_d_corrected.js','pack_e_corrected.js'];

// Definition-match signals: stem contains definition language
const DEFINITION_MARKERS = [
  'is defined as', 'refers to', 'is known as', 'is called',
  'is a', 'are', 'is the term for', 'describes', 'what is',
  'which of the following best describes', 'this concept is',
  'is best described as', 'the term for', 'are referred to as',
  'this describes', 'this is an example of', 'what concept'
];

// Bloom's Remember/Understand levels — items at these levels with Moderate+ difficulty are suspect
const LOW_BLOOMS = ['Remember', 'Understand'];

function classifyItem(item) {
  const stem = (item.Stem || '').toLowerCase();
  const cc = item.CorrectChoice;
  const choices = item.Choices || {};
  const correctText = (choices[cc] || '').toLowerCase();
  const difficulty = item.Difficulty || '';
  const diffScore = item.DifficultyScore;
  const cognitive = item.CognitiveLevel || '';
  const topic = item.Topic || '';

  // Check for definition-match pattern
  let defMatch = false;
  for (const marker of DEFINITION_MARKERS) {
    if (stem.includes(marker.toLowerCase())) {
      defMatch = true;
      break;
    }
  }

  if (!defMatch) return null;

  // Must be labeled Moderate or higher
  if (difficulty !== 'Moderate' && difficulty !== 'Moderate-Easy' && 
      (diffScore !== 3 && diffScore !== 4)) return null;

  // Check lexical overlap between stem and correct answer
  const stemWords = new Set(stem.split(/\s+/).filter(w => w.length > 3));
  const ccWords = correctText.split(/\s+/).filter(w => w.length > 3 && !['which','that','this','with','from','when','what','where'].includes(w));
  let overlapCount = 0;
  for (const w of ccWords) {
    if (stemWords.has(w)) overlapCount++;
  }
  const overlapRatio = ccWords.length > 0 ? overlapCount / ccWords.length : 0;

  // Classification (S372 model)
  let classification;
  if (cognitive === 'Understand' || cognitive === 'Remember') {
    if (overlapRatio > 0.4) {
      classification = 'Simple Relabel'; // Definition-match, low Bloom's, clear overlap → just change difficulty
    } else {
      classification = 'Calibration'; // Definition-match but low overlap — needs review
    }
  } else if (cognitive === 'Apply') {
    classification = 'Calibration'; // Apply level with definition match — may need deeper review
  } else {
    classification = 'Rewrite Required'; // Higher Bloom's but definition match — mismatch
  }

  return {
    qid: item.QuestionID,
    section: item.Section,
    topic: topic,
    difficulty: difficulty,
    difficultyScore: diffScore,
    cognitiveLevel: cognitive,
    stemSnippet: item.Stem ? item.Stem.substring(0, 80) : '',
    correctTextSnippet: correctText.substring(0, 60),
    overlapRatio: overlapRatio.toFixed(2),
    classification
  };
}

function extractItems(packFile) {
  const filePath = path.join(BASE, packFile);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find all CorrectChoice positions and extract items by searching back for Stem
  const items = [];
  let searchPos = 0;
  while (true) {
    const ccIdx = content.indexOf('"CorrectChoice":', searchPos);
    if (ccIdx === -1) break;
    
    // Search backward for Stem
    const stemIdx = content.lastIndexOf('"Stem":', ccIdx);
    if (stemIdx === -1) { searchPos = ccIdx + 1; continue; }
    
    // Extract the content block
    const block = content.substring(stemIdx, ccIdx + 500);
    
    const stemMatch = block.match(/"Stem":\s*"([^"]*)"/);
    const qidMatch = block.match(/"QuestionID":\s*"([^"]+)"/) || 
                     content.substring(Math.max(0, stemIdx - 500), stemIdx).match(/"QuestionID":\s*"([^"]+)"/);
    const sectionMatch = block.match(/"Section":\s*"([^"]+)"/);
    const topicMatch = block.match(/"Topic":\s*"([^"]+)"/);
    const diffMatch = block.match(/"Difficulty":\s*"([^"]+)"/);
    const diffScoreMatch = block.match(/"DifficultyScore":\s*(\d+)/);
    const cogMatch = block.match(/"CognitiveLevel":\s*"([^"]+)"/);
    const ccMatch = block.match(/"CorrectChoice":\s*"([A-D])"/);
    
    if (stemMatch && ccMatch) {
      // Find choices
      const choicesIdx = block.indexOf('"Choices":');
      let choices = {};
      if (choicesIdx !== -1) {
        for (const letter of ['A','B','C','D']) {
          const choicePattern = new RegExp('"' + letter + '":\\s*"([^"]*)"');
          const cm = block.substring(choicesIdx).match(choicePattern);
          if (cm) choices[letter] = cm[1];
        }
      }
      
      items.push({
        QuestionID: qidMatch ? qidMatch[1] : 'unknown',
        Section: sectionMatch ? sectionMatch[1] : '',
        Topic: topicMatch ? topicMatch[1] : '',
        Difficulty: diffMatch ? diffMatch[1] : '',
        DifficultyScore: diffScoreMatch ? parseInt(diffScoreMatch[1]) : 0,
        CognitiveLevel: cogMatch ? cogMatch[1] : '',
        Stem: stemMatch[1],
        CorrectChoice: ccMatch[1],
        Choices: choices,
      });
    }
    
    searchPos = ccIdx + 1;
  }
  
  return items;
}

function main() {
  const execute = process.argv.includes('--execute');
  console.log('=== DL-031 Difficulty Inflation Classifier ===');
  console.log('Mode: ' + (execute ? 'EXECUTE (Simple Relabel)' : 'CLASSIFY ONLY'));
  console.log('');

  let allFindings = [];
  let simpleRelabels = [];

  for (const pf of PACK_FILES) {
    console.log('Scanning ' + pf + '...');
    const items = extractItems(pf);
    for (const item of items) {
      const finding = classifyItem(item);
      if (finding) {
        finding.pack = pf.replace('_corrected.js', '').replace('pack_', '');
        allFindings.push(finding);
        if (finding.classification === 'Simple Relabel') {
          simpleRelabels.push(finding);
        }
      }
    }
  }

  // Summary by classification
  const byClass = {};
  for (const f of allFindings) {
    byClass[f.classification] = (byClass[f.classification] || 0) + 1;
  }

  console.log('\n=== CLASSIFICATION SUMMARY ===');
  for (const [cls, count] of Object.entries(byClass)) {
    console.log(cls + ': ' + count);
  }
  console.log('TOTAL: ' + allFindings.length);

  console.log('\n=== SIMPLE RELABEL CANDIDATES (' + simpleRelabels.length + ' items) ===');
  for (const sr of simpleRelabels.slice(0, 20)) {
    console.log(sr.qid + ' | ' + sr.pack + '/' + sr.section + ' | ' + sr.cognitiveLevel + 
                ' | ' + sr.difficulty + '→Easy | ' + sr.stemSnippet);
  }
  if (simpleRelabels.length > 20) console.log('... and ' + (simpleRelabels.length - 20) + ' more');

  // Write classification report
  const reportPath = path.join(BASE, 'scripts', 'output', 'dl031_classification.json');
  const reportDir = path.dirname(reportPath);
  if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    total_scanned: allFindings.length + simpleRelabels.length, // approximate
    by_classification: byClass,
    simple_relabels: simpleRelabels.map(sr => ({ qid: sr.qid, pack: sr.pack, section: sr.section })),
    calibation: allFindings.filter(f => f.classification === 'Calibration').length,
    rewrite_required: allFindings.filter(f => f.classification === 'Rewrite Required').length,
  }, null, 2));
  console.log('\nReport written to: scripts/output/dl031_classification.json');

  if (execute && simpleRelabels.length > 0) {
    console.log('\n=== EXECUTING SIMPLE RELABELS ===');
    let applied = 0;
    for (const pf of PACK_FILES) {
      const packQIDs = simpleRelabels.filter(sr => sr.pack === pf.replace('_corrected.js','').replace('pack_',''));
      if (packQIDs.length === 0) continue;
      
      const filePath = path.join(BASE, pf);
      let content = fs.readFileSync(filePath, 'utf8');
      
      for (const sr of packQIDs) {
        const qidIdx = content.indexOf('"QuestionID": "' + sr.qid + '"');
        if (qidIdx === -1) continue;
        
        // Search for Difficulty near QID
        const window = content.substring(qidIdx, qidIdx + 2000);
        const diffIdx = window.indexOf('"Difficulty": "Moderate"');
        if (diffIdx === -1) continue;
        
        const absIdx = qidIdx + diffIdx;
        content = content.substring(0, absIdx) + '"Difficulty": "Easy"' + content.substring(absIdx + '"Difficulty": "Moderate"'.length);
        
        // Also update DifficultyScore 3 → 1
        const scoreIdx = content.indexOf('"DifficultyScore": 3', qidIdx);
        if (scoreIdx !== -1 && scoreIdx < qidIdx + 3000) {
          content = content.substring(0, scoreIdx) + '"DifficultyScore": 1' + content.substring(scoreIdx + '"DifficultyScore": 3'.length);
        }
        
        applied++;
      }
      
      // Backup
      const ts = new Date().toISOString().replace(/[:.]/g, '').slice(0, 15);
      const backupPath = path.join(BASE, 'backups', pf + '.bak-DL031-' + ts);
      fs.copyFileSync(filePath, backupPath);
      
      fs.writeFileSync(filePath, content);
      console.log(pf + ': ' + packQIDs.length + ' relabels applied. Backup: ' + path.basename(backupPath));
    }
    console.log('Total relabels: ' + applied);
  }
}

main();
