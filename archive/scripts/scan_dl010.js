const fs = require('fs');
const path = require('path');

const packs = [
  'pack_a_corrected.js',
  'pack_b_corrected.js',
  'pack_c_corrected.js',
  'pack_d_corrected.js',
  'pack_e_corrected.js'
];

function loadQuestions(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Find the MCQ_BANK array start
  const startMarker = content.match(/(const\s+MCQ_BANK_\w+\s*=\s*\[)/);
  if (!startMarker) {
    console.error(`No MCQ_BANK found in ${filePath}`);
    return [];
  }
  const startIdx = startMarker.index + startMarker[0].length - 1; // position of '['
  // Find matching closing bracket by tracking depth
  let depth = 0;
  let endIdx = startIdx;
  for (let i = startIdx; i < content.length; i++) {
    if (content[i] === '[') depth++;
    else if (content[i] === ']') {
      depth--;
      if (depth === 0) {
        endIdx = i + 1;
        break;
      }
    }
  }
  if (depth !== 0) {
    console.error(`Unmatched brackets in ${filePath}`);
    return [];
  }
  const jsonStr = content.substring(startIdx, endIdx);
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error(`Parse error in ${filePath}: ${e.message}`);
    return [];
  }
}

function extractNumbers(text) {
  const nums = text.match(/\$?[\d,]+(?:\.\d+)?/g) || [];
  return nums.map(n => n.replace(/[$,]/g, '')).filter(n => n.length > 1);
}

function choiceText(q, letter) {
  if (!q.Choices) return '';
  if (Array.isArray(q.Choices)) return q.Choices[letter.charCodeAt(0) - 65] || '';
  return q.Choices[letter] || '';
}

function flagMismatches(questions, packLabel) {
  const findings = [];

  for (const q of questions) {
    if (!q.CorrectChoice || !q.ExplanationWrongA) continue;

    const correct = q.CorrectChoice;
    const wrongLetters = ['A', 'B', 'C', 'D'].filter(l => l !== correct);

    for (const letter of wrongLetters) {
      const explField = `ExplanationWrong${letter}`;
      const expl = q[explField];
      if (!expl || expl.trim() === '') continue;

      const thisChoice = choiceText(q, letter);
      const correctChoice = choiceText(q, correct);

      const flags = [];

      // Check 1: explicit letter reference to a different letter (word boundary required)
      const letterRefs = expl.match(/Option\s+([A-D])\b/gi);
      if (letterRefs) {
        for (const ref of letterRefs) {
          const refLetter = ref.match(/[A-D]/i)[0].toUpperCase();
          if (refLetter !== letter) {
            flags.push(`EXPLICIT_REF: text mentions "Option ${refLetter}" but assigned to ${letter}`);
          }
        }
      }

      // Check 2: explanation contains text that is verbatim from the correct choice
      if (correctChoice && correctChoice.length > 10) {
        const significant = correctChoice.replace(/[.,;:!?]/g, '').trim();
        const words = significant.split(/\s+/);
        const longPhrases = [];
        for (let i = 0; i <= words.length - 4; i++) {
          longPhrases.push(words.slice(i, i + 4).join(' '));
        }
        for (const phrase of longPhrases) {
          if (phrase.length > 15 && expl.toLowerCase().includes(phrase.toLowerCase())) {
            flags.push(`VERBATIM_MATCH: explanation contains text from correct choice "${phrase}"`);
            break;
          }
        }
      }

      // Check 3: explanation contains verbatim text from another distractor (not the assigned one)
      const otherChoices = ['A', 'B', 'C', 'D'].filter(l => l !== letter && l !== correct);
      for (const other of otherChoices) {
        const otherText = choiceText(q, other);
        if (otherText && otherText.length > 10) {
          const words = otherText.replace(/[.,;:!?]/g, '').trim().split(/\s+/);
          for (let i = 0; i <= words.length - 4; i++) {
            const phrase = words.slice(i, i + 4).join(' ');
            if (phrase.length > 15 && expl.toLowerCase().includes(phrase.toLowerCase())) {
              flags.push(`VERBATIM_MATCH: explanation contains text from choice ${other} "${phrase}"`);
              break;
            }
          }
        }
      }

      // Check 4: numeric mismatch — explanation's numbers don't match the distractor's numbers
      if (thisChoice) {
        const choiceNums = extractNumbers(thisChoice);
        const explNums = extractNumbers(expl);
        const correctNums = extractNumbers(correctChoice || '');
        if (choiceNums.length > 0 && explNums.length > 0) {
          const choiceNumsMatch = explNums.some(en => choiceNums.includes(en));
          const correctNumsMatch = explNums.some(en => correctNums.includes(en));
          if (!choiceNumsMatch && correctNumsMatch) {
            flags.push(`NUMERIC_MISMATCH: explanation uses correct-answer numbers (${explNums.filter(en => correctNums.includes(en)).join(',')}) not distractor numbers`);
          }
        }
      }

      // Check 5: explanation calls the choice "correct"
      if (/is\s+correct|correctly\s+applies|correctly\s+calculates/i.test(expl)) {
        flags.push(`PRAISES_CHOICE: explanation says the choice is correct (but this is a distractor slot)`);
      }

      if (flags.length > 0) {
        findings.push({
          QID: q.QuestionID || q.qid || 'unknown',
          letter,
          choice: thisChoice,
          explanation: expl.substring(0, 150),
          flags,
          pack: packLabel
        });
      }
    }

    // Check ExplanationCorrect: does it describe a wrong choice?
    const ec = q.ExplanationCorrect || '';
    if (ec) {
      const wrongLetters = ['A', 'B', 'C', 'D'].filter(l => l !== correct);
      const ecFlags = [];
      for (const letter of wrongLetters) {
        const wrongText = choiceText(q, letter);
        if (wrongText && wrongText.length > 10) {
          const words = wrongText.replace(/[.,;:!?]/g, '').trim().split(/\s+/);
          for (let i = 0; i <= words.length - 4; i++) {
            const phrase = words.slice(i, i + 4).join(' ');
            if (phrase.length > 15 && ec.toLowerCase().includes(phrase.toLowerCase())) {
              ecFlags.push(`EC_DESCRIBES_WRONG: ExplanationCorrect contains text from choice ${letter} "${phrase}"`);
              break;
            }
          }
        }
      }
      if (ecFlags.length > 0) {
        findings.push({
          QID: q.QuestionID || q.qid || 'unknown',
          letter: correct,
          choice: choiceText(q, correct),
          explanation: ec.substring(0, 150),
          flags: ecFlags,
          pack: packLabel
        });
      }
    }
  }

  return findings;
}

console.log('=== DL-010 Repository-Wide Scan ===\n');

let totalFindings = 0;
const byPack = {};

for (const packFile of packs) {
  const filePath = path.join(__dirname, '..', packFile);
  if (!fs.existsSync(filePath)) {
    console.log(`${packFile}: NOT FOUND`);
    continue;
  }
  const questions = loadQuestions(filePath);
  console.log(`${packFile}: ${questions.length} questions loaded`);
  const findings = flagMismatches(questions, packFile);
  byPack[packFile] = findings;
  totalFindings += findings.length;

  console.log(`  DL-010 findings: ${findings.length}`);
  if (findings.length > 0) {
    const sample = findings.slice(0, 5);
    for (const f of sample) {
      console.log(`  [${f.QID}] slot ExplanationWrong${f.letter}`);
      console.log(`    Choice: "${f.choice}"`);
      console.log(`    Flags: ${f.flags.join('; ')}`);
    }
    if (findings.length > 5) {
      console.log(`    ... and ${findings.length - 5} more`);
    }
  }
  console.log('');
}

console.log(`=== TOTAL: ${totalFindings} DL-010 findings across ${packs.length} packs ===\n`);

// Assessment
if (totalFindings > 20) {
  console.log('ASSESSMENT: >20 findings — triage protocol required');
  console.log('Recommendation: Bucket by fix confidence');
  const explicitRefs = [];
  const numericMismatches = [];
  const verbatimMatches = [];
  const praisesChoice = [];
  for (const pack of Object.values(byPack)) {
    for (const f of pack) {
      if (f.flags.some(fl => fl.startsWith('EXPLICIT_REF'))) explicitRefs.push(f);
      if (f.flags.some(fl => fl.startsWith('NUMERIC_MISMATCH'))) numericMismatches.push(f);
      if (f.flags.some(fl => fl.startsWith('VERBATIM_MATCH'))) verbatimMatches.push(f);
      if (f.flags.some(fl => fl.startsWith('PRAISES_CHOICE'))) praisesChoice.push(f);
    }
  }
  console.log(`  Mechanical (explicit ref mismatch): ${explicitRefs.length}`);
  console.log(`  High confidence (numeric mismatch): ${numericMismatches.length}`);
  console.log(`  Medium confidence (verbatim match): ${verbatimMatches.length}`);
  console.log(`  Review required (praises wrong): ${praisesChoice.length}`);
} else if (totalFindings > 10) {
  console.log('ASSESSMENT: 10-20 findings — moderate, review individually');
} else if (totalFindings > 0) {
  console.log('ASSESSMENT: <10 findings — isolated cases, remediate alongside Wave 3');
} else {
  console.log('ASSESSMENT: Zero findings — no DL-010 issues detected');
}

// Output detailed per-pack
for (const packFile of packs) {
  const findings = byPack[packFile];
  if (findings.length === 0) continue;
  console.log(`\n--- ${packFile} — ${findings.length} findings ---`);
  for (const f of findings) {
    console.log(`\n${f.QID} (${f.pack}) slot ExplanationWrong${f.letter}`);
    console.log(`  Choice: "${f.choice}"`);
    console.log(`  Explanation: "${f.explanation}${f.explanation.length >= 150 ? '...' : ''}"`);
    console.log(`  Flags:`);
    for (const fl of f.flags) {
      console.log(`    - ${fl}`);
    }
  }
}
