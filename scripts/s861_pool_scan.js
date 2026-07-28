// S861 Pool Scan — Analyze candidates in Sections C+D
const fs = require('fs');
const path = require('path');

const packs = {
  'pack_a': 'pack_a_corrected.js',
  'pack_c': 'pack_c_corrected.js',
  'pack_d': 'pack_d_corrected.js'
};

for (const [name, file] of Object.entries(packs)) {
  const code = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  
  // Extract QID ranges for Section C and D using their patterns
  let secPattern;
  if (name === 'pack_a') secPattern = /"QuestionID"\s*:\s*"(P1-[CD]-\d+)"/g;
  else if (name === 'pack_c') secPattern = /"QuestionID"\s*:\s*"(P1-[CD]C-\d+)"/g;
  else secPattern = /"QuestionID"\s*:\s*"(P1-[CD]D-\d+)"/g;
  
  const qids = [];
  let m;
  while ((m = secPattern.exec(code)) !== null) {
    qids.push(m[1]);
  }
  
  console.log('=== ' + name + ' (Section C+D QIDs: ' + qids.length + ') ===');
  
  // Count by cognitive level
  const clCount = {};
  let certified = 0, unprocessed = 0, missing = 0;
  
  // Sample first 5
  for (let i = 0; i < Math.min(5, qids.length); i++) {
    const qid = qids[i];
    const idx = code.indexOf('"' + qid + '"');
    const block = code.substring(idx, idx + 2000);
    const clMatch = block.match(/"CognitiveLevel"\s*:\s*"(\w+)"/);
    const qsMatch = block.match(/"question_state"\s*:\s*"(\w+)"/);
    const topicMatch = block.match(/"Topic"\s*:\s*"([^"]+)"/);
    const diffMatch = block.match(/"DifficultyScore"\s*:\s*(\d+)/);
    console.log('  ' + qid + ' CL=' + (clMatch ? clMatch[1] : 'N/A') + 
      ' state=' + (qsMatch ? qsMatch[1] : 'MISSING') + 
      ' diff=' + (diffMatch ? diffMatch[1] : '?') + 
      ' topic=' + (topicMatch ? topicMatch[1].substring(0, 60) : '?'));
  }
  
  for (const qid of qids) {
    const idx = code.indexOf('"' + qid + '"');
    const block = code.substring(idx, idx + 2000);
    const clMatch = block.match(/"CognitiveLevel"\s*:\s*"(\w+)"/);
    const qsMatch = block.match(/"question_state"\s*:\s*"(\w+)"/);
    const cl = clMatch ? clMatch[1] : 'Unknown';
    clCount[cl] = (clCount[cl] || 0) + 1;
    if (qsMatch) {
      if (qsMatch[1] === 'Certified') certified++;
      else if (qsMatch[1] === 'Unprocessed') unprocessed++;
    } else { missing++; }
  }
  console.log('  CL distribution:', JSON.stringify(clCount));
  console.log('  States: Certified=' + certified + ' Unprocessed=' + unprocessed + ' Missing=' + missing);
  
  // List items that are NOT Analyze — these are upgrade candidates
  const nonAnalyze = [];
  for (const qid of qids) {
    const idx = code.indexOf('"' + qid + '"');
    const block = code.substring(idx, idx + 2000);
    const clMatch = block.match(/"CognitiveLevel"\s*:\s*"(\w+)"/);
    if (!clMatch || (clMatch[1] !== 'Analyze' && clMatch[1] !== 'Evaluate')) {
      nonAnalyze.push(qid);
    }
  }
  console.log('  Non-Analyze/Evaluate candidates: ' + nonAnalyze.length);
  if (nonAnalyze.length <= 30) {
    console.log('  QIDs: ' + nonAnalyze.join(', '));
  } else {
    console.log('  First 20: ' + nonAnalyze.slice(0, 20).join(', '));
    console.log('  Last 5: ' + nonAnalyze.slice(-5).join(', '));
  }
  
  // Also check Pack B Section C+D (fully certified)
  console.log('');
}

// Also scan Pack B Sections C+D and Pack E Sections C+D
const packBFile = path.join(__dirname, '..', 'pack_b_corrected.js');
const packEFile = path.join(__dirname, '..', 'pack_e_corrected.js');

for (const [name, file] of [['pack_b', packBFile], ['pack_e', packEFile]]) {
  if (!fs.existsSync(file)) continue;
  const code = fs.readFileSync(file, 'utf8');
  const qids = [];
  let secPattern;
  if (name === 'pack_b') secPattern = /"QuestionID"\s*:\s*"(P1B-[CD]-\d+)"/g;
  else secPattern = /"QuestionID"\s*:\s*"(P1E-[CD]-\d+)"/g;
  let m;
  while ((m = secPattern.exec(code)) !== null) {
    qids.push(m[1]);
  }
  
  const clCount = {};
  let certified = 0;
  for (const qid of qids) {
    const idx = code.indexOf('"' + qid + '"');
    if (idx === -1) continue;
    const block = code.substring(idx, idx + 2000);
    const clMatch = block.match(/"CognitiveLevel"\s*:\s*"(\w+)"/);
    const qsMatch = block.match(/"question_state"\s*:\s*"(\w+)"/);
    const cl = clMatch ? clMatch[1] : 'Unknown';
    clCount[cl] = (clCount[cl] || 0) + 1;
    if (qsMatch && qsMatch[1] === 'Certified') certified++;
  }
  console.log('=== ' + name + ' Section C+D (QIDs: ' + qids.length + ') ===');
  console.log('  CL distribution:', JSON.stringify(clCount));
  console.log('  Certified: ' + certified);
}
