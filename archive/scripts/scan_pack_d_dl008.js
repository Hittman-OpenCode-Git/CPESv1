const fs = require('fs');
const code = fs.readFileSync('pack_d_corrected.js', 'utf8');

// String-aware brace-based object extraction
function extractObjects(text) {
  const objects = [];
  let i = text.indexOf('MCQ_BANK_D = [');
  if (i === -1) { console.log('Cannot find MCQ_BANK_D'); return objects; }
  
  // Find first {
  i = text.indexOf('{', i);
  let depth = 0;
  let inString = false;
  let stringChar = null;
  let escape = false;
  let start = -1;
  
  while (i < text.length) {
    const ch = text[i];
    
    if (escape) {
      escape = false;
      i++;
      continue;
    }
    
    if (ch === '\\' && inString) {
      escape = true;
      i++;
      continue;
    }
    
    if (inString) {
      if (ch === stringChar) {
        inString = false;
        stringChar = null;
      }
      i++;
      continue;
    }
    
    if (ch === '"' || ch === "'") {
      inString = true;
      stringChar = ch;
      i++;
      continue;
    }
    
    if (ch === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0 && start >= 0) {
        const objStr = text.substring(start, i + 1);
        try {
          const obj = JSON.parse(objStr);
          objects.push(obj);
        } catch(e) {
          // Skip unparseable objects
        }
        start = -1;
      }
    }
    i++;
  }
  
  return objects;
}

const bank = extractObjects(code);
console.log('Items extracted:', bank.length);

if (bank.length === 0) {
  console.log('Extraction failed - trying alternate method...');
  process.exit(1);
}

// Count by question_state
const states = {};
bank.forEach(q => {
  const s = q.question_state || 'MISSING';
  states[s] = (states[s] || 0) + 1;
});
console.log('\n=== question_state distribution ===');
Object.keys(states).sort().forEach(k => console.log('  ' + k + ': ' + states[k]));

// Filter for Certified
const certified = bank.filter(q => q.question_state === 'Certified');
const hold = bank.filter(q => q.question_state === 'Hold');

console.log('\nCertified items:', certified.length);
console.log('Hold items:', hold.length);

// Display Hold items
if (hold.length > 0) {
  console.log('\n=== HOLD ITEMS ===');
  hold.forEach(h => {
    console.log('  QID: ' + h.QuestionID + ' | CC: ' + h.CorrectChoice + ' | Section: ' + (h.Section || '?') + ' | Topic: ' + h.Topic);
  });
}

// DL-008 scan
console.log('\n=== DL-008 SCAN (Certified only) ===');
const dl008Items = [];
const dl018Items = [];
const dl025Items = [];

certified.forEach(q => {
  const cc = q.CorrectChoice;
  const ewKey = 'ExplanationWrong' + cc;
  const ewVal = q[ewKey];
  
  // DL-008
  if (ewVal !== undefined && ewVal !== null && typeof ewVal === 'string' && ewVal.trim() !== '') {
    dl008Items.push({
      qid: q.QuestionID,
      section: q.Section,
      cc: cc,
      slot: ewKey,
      ewPreview: ewVal.substring(0, 150)
    });
  }
  
  // DL-018
  if (ewVal === undefined) {
    dl018Items.push({
      qid: q.QuestionID,
      section: q.Section,
      cc: cc,
      slot: ewKey
    });
  }
  
  // DL-025/026
  const emptyNonCC = [];
  ['A','B','C','D'].forEach(letter => {
    if (letter !== cc) {
      const nccKey = 'ExplanationWrong' + letter;
      const nccVal = q[nccKey];
      if (nccVal === undefined || nccVal === null || (typeof nccVal === 'string' && nccVal.trim() === '')) {
        emptyNonCC.push({
          slot: nccKey,
          state: nccVal === undefined ? 'ABSENT' : 'EMPTY'
        });
      }
    }
  });
  
  if (emptyNonCC.length > 0) {
    dl025Items.push({
      qid: q.QuestionID,
      section: q.Section,
      cc: cc,
      emptySlots: emptyNonCC
    });
  }
});

console.log('\nTotal DL-008 (non-empty EW[CC]):', dl008Items.length);
if (dl008Items.length > 0) {
  console.log('\n--- DL-008 QID LIST ---');
  dl008Items.forEach(item => {
    console.log('  ' + item.qid + ' | Sec: ' + item.section + ' | CC: ' + item.cc + ' | ' + item.slot + ': ' + item.ewPreview.substring(0, 120));
  });
}

console.log('\nTotal DL-018 (missing EW[CC]):', dl018Items.length);
if (dl018Items.length > 0) {
  console.log('\n--- DL-018 QID LIST ---');
  dl018Items.forEach(item => {
    console.log('  ' + item.qid + ' | Sec: ' + item.section + ' | CC: ' + item.cc + ' | ' + item.slot + ' is ABSENT');
  });
}

console.log('\nTotal DL-025/026 (empty non-CC EW slots):', dl025Items.length);
if (dl025Items.length > 0) {
  console.log('\n--- DL-025/026 QID LIST ---');
  dl025Items.forEach(item => {
    console.log('  ' + item.qid + ' | Sec: ' + item.section + ' | CC: ' + item.cc + ' | Empty: ' + item.emptySlots.map(s => s.slot + '(' + s.state + ')').join(', '));
  });
}

// Section-level summary
console.log('\n=== SECTION-LEVEL SUMMARY ===');
const sections = {};
certified.forEach(q => {
  const sec = q.Section || '?';
  if (!sections[sec]) sections[sec] = { total: 0 };
  sections[sec].total++;
});

dl008Items.forEach(item => {
  if (!sections[item.section]) sections[item.section] = { total: 0 };
  sections[item.section].dl008 = (sections[item.section].dl008 || 0) + 1;
});

dl025Items.forEach(item => {
  if (!sections[item.section]) sections[item.section] = { total: 0 };
  sections[item.section].dl025 = (sections[item.section].dl025 || 0) + 1;
});

dl018Items.forEach(item => {
  if (!sections[item.section]) sections[item.section] = { total: 0 };
  sections[item.section].dl018 = (sections[item.section].dl018 || 0) + 1;
});

Object.keys(sections).sort().forEach(sec => {
  const s = sections[sec];
  console.log('  Section ' + sec + ': Certified=' + s.total + ' | DL-008=' + (s.dl008 || 0) + ' | DL-018=' + (s.dl018 || 0) + ' | DL-025/026=' + (s.dl025 || 0));
});

// Anomalies
console.log('\n=== ANOMALIES ===');
const ccDist = {};
certified.forEach(q => {
  const cc = q.CorrectChoice;
  ccDist[cc] = (ccDist[cc] || 0) + 1;
});
console.log('CorrectChoice distribution in Certified:');
Object.keys(ccDist).sort().forEach(k => console.log('  ' + k + ': ' + ccDist[k]));

const allEmpty = certified.filter(q => {
  return ['A','B','C','D'].every(l => {
    const v = q['ExplanationWrong' + l];
    return v === undefined || v === null || (typeof v === 'string' && v.trim() === '');
  });
});
console.log('Certified items with ALL 4 EW slots empty/missing:', allEmpty.length);
allEmpty.forEach(q => console.log('  ' + q.QuestionID));

console.log('\n=== DONE ===');
