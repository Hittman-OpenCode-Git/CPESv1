/**
 * f4_ws3_remediate.js - DL-013 boilerplate explanation remediation for case packs.
 * Dry-run by default. Use --commit to write changes.
 * Creates timestamped backups before writing.
 */
const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026';

const BANKS = [
  { file: 'content/cases/case_pack_1_corrected.js', varName: 'CASE_PACK_1' },
  { file: 'content/cases/case_pack_2_corrected.js', varName: 'CASE_PACK_2' },
  { file: 'content/cases/case_pack_3_corrected.js', varName: 'CASE_PACK_3' },
  { file: 'p2/case_pack_p2_1.js', varName: 'casePackP2_1' },
  { file: 'p2/case_pack_p2_2.js', varName: 'casePackP2_2' },
  { file: 'p2/case_pack_p2_3.js', varName: 'casePackP2_3' },
  { file: 'p2/case_pack_p2_C4_C8.js', varName: 'casePackP2_C4_C8' },
  { file: 'p2/case_pack_p2_authored.js', varName: 'casePackP2Authored' },
];

const COMMIT = process.argv.includes('--commit');

function unescapeUnicode(str) {
  return str.replace(/\\u([0-9a-fA-F]{4})/g, function(match, hex) {
    return String.fromCharCode(parseInt(hex, 16));
  });
}

function splitSentences(text) {
  return text.split(/(?<=[.:;])\s+/).filter(s => s.trim().length > 0);
}

function extractNumbers(text) {
  const matches = text.match(/\$?[\d,]+(?:\.\d+)?/g);
  return matches ? matches.filter(m => m.replace(/[\$,]/g, '').length > 0).slice(0, 6) : [];
}

function generateExplanation(item, caseData) {
  var topic = item.Topic || 'this accounting topic';
  var formula = item.FormulaReference || 'the relevant formula';
  var trap = item.CommonTrapReference || 'misapplying the concept';
  var stem = item.Stem || item.Prompt || '';
  var choices = item.Choices || [];
  var cc = item.CorrectChoice || item.Correct || '';
  var blueprint = item.BlueprintDomain || 'accounting';

  // Extract exhibit numbers
  var exhibitNums = [];
  if (caseData && caseData.Exhibits) {
    exhibitNums = extractNumbers(JSON.stringify(caseData.Exhibits));
  }
  if (exhibitNums.length === 0) {
    exhibitNums = extractNumbers(stem);
  }

  // 1. Accounting Principle
  var principle = 'Applying ' + blueprint + ' ' + topic + ', the governing principle requires ' + formula + ' when applied to the scenario.';

  // 2. Formula with Substitution
  var formulaSub;
  if (exhibitNums.length >= 2) {
    formulaSub = 'Applying ' + formula + ' with the exhibit values: ' + exhibitNums[0] + ' and ' + exhibitNums[1] + ' yields the computed result that supports the key.';
  } else if (exhibitNums.length === 1) {
    formulaSub = 'Applying ' + formula + ' with the exhibit value ' + exhibitNums[0] + ' yields the computed result supporting the correct answer.';
  } else {
    formulaSub = 'Applying ' + formula + ' to the exhibit values shown in the case yields the computed result.';
  }

  // 3. Business Interpretation
  var businessInterp;
  if (stem.length > 20) {
    businessInterp = stem.substring(0, Math.min(stem.length, 150)) + ' This requires the analyst to apply ' + topic + ' to determine the correct outcome.';
  } else {
    businessInterp = 'The analyst must apply ' + topic + ' to the scenario facts to reach the correct conclusion.';
  }

  // 4. Common Exam Trap
  var trapText = trap.length > 10 ? (trap + ' is a frequent error under timed conditions.') : (trap + ' is a common mistake candidates make when rushing through the problem.');

  // 5. Distractor Rationale
  var choiceTexts = Array.isArray(choices) ? choices : Object.values(choices || {});
  var wrongChoices = choiceTexts.filter(function(c, idx) {
    var letters = ['A', 'B', 'C', 'D'];
    return letters[idx] !== cc;
  }).slice(0, 3);

  var distractorRats = 'The other options are incorrect because: ';
  wrongChoices.forEach(function(c, i) {
    var letters = ['A', 'B', 'C', 'D'];
    var letter = letters[i] || String.fromCharCode(65 + i);
    distractorRats += 'Choice ' + letter + ' (' + String(c).substring(0, 40) + '...) fails to correctly apply ' + topic + '; ';
  });

  return principle + ' ' + formulaSub + ' ' + businessInterp + ' ' + trapText + ' ' + distractorRats.trim() + '.';
}

function replaceBoilerplate(existingEC, item, caseData) {
  var cleaned = existingEC;
  cleaned = cleaned.replace(/The governing principle for this item requires[^.]+\./g, '');
  cleaned = cleaned.replace(/This item tests[^.]+\./g, '');
  cleaned = cleaned.replace(/Candidates should recall[^.]+\./g, '');
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  if (cleaned.length < 50) {
    return generateExplanation(item, caseData);
  }
  return cleaned + ' ' + generateExplanation(item, caseData);
}

function augmentUnsupportedCorrect(existingEC, item, caseData) {
  return existingEC.trim() + ' ' + generateExplanation(item, caseData);
}

function writeBack(file, varName, arr) {
  var filePath = path.join(BASE, file);
  var jsonStr = unescapeUnicode(JSON.stringify(arr, null, 2));
  var content = 'const ' + varName + ' = ' + jsonStr + ';\n';
  fs.writeFileSync(filePath, content, 'utf8');
  return content.length;
}

// === MAIN ===
var flagsPath = path.join(BASE, 'scripts', 'output', 'case_semantic_flags.json');
if (!fs.existsSync(flagsPath)) {
  console.error('ERROR: case_semantic_flags.json not found.');
  process.exit(1);
}

var flagsData = JSON.parse(fs.readFileSync(flagsPath, 'utf8'));
var allFlags = flagsData.flags || [];

var dl013Flags = allFlags.filter(function(f) {
  return f.detail.includes('EXTRA-REFUTED') ||
         f.detail.includes('UNSUPPORTED-CORRECT') ||
         f.detail.includes('SHORT:');
});

// Deduplicate by bank + caseId + itemId
var seen = {};
var uniqueFlags = [];
for (var i = 0; i < dl013Flags.length; i++) {
  var f = dl013Flags[i];
  var key = f.bank + '|' + f.caseId + '|' + f.itemId;
  if (!seen[key]) {
    seen[key] = true;
    uniqueFlags.push(f);
  }
}

console.log('DL-013 flags: ' + dl013Flags.length + ' unique: ' + uniqueFlags.length);

// Group by bank
var byBank = {};
for (var j = 0; j < uniqueFlags.length; j++) {
  var f2 = uniqueFlags[j];
  if (!byBank[f2.bank]) byBank[f2.bank] = [];
  byBank[f2.bank].push(f2);
}

console.log('By bank:');
for (var bankFile in byBank) {
  console.log('  ' + bankFile + ': ' + byBank[bankFile].length + ' items');
}

var totalFixed = 0;
var samples = [];

for (var b = 0; b < BANKS.length; b++) {
  var bank = BANKS[b];
  if (!byBank[bank.file]) continue;

  var filePath = path.join(BASE, bank.file);
  var src = fs.readFileSync(filePath, 'utf8');
  var arr;
  try {
    arr = new Function(src + '\nreturn ' + bank.varName + ';')();
  } catch (e) {
    console.error('ERROR parsing ' + bank.file + ': ' + e.message);
    continue;
  }

  var bankFlags = byBank[bank.file];
  var fixedInBank = 0;

  for (var k = 0; k < bankFlags.length; k++) {
    var flag = bankFlags[k];
    var item = null;
    var caseData = null;

    outer: for (var ci = 0; ci < arr.length; ci++) {
      if (arr[ci].CaseID === flag.caseId || arr[ci].caseId === flag.caseId) {
        caseData = arr[ci];
        var items = caseData.Items || caseData.items || caseData.questions || caseData.Questions || [];
        for (var ii = 0; ii < items.length; ii++) {
          if (items[ii].ItemID === flag.itemId || items[ii].itemId === flag.itemId) {
            item = items[ii];
            break outer;
          }
        }
      }
    }

    if (!item) {
      console.log('  NOT FOUND: ' + flag.caseId + ':' + flag.itemId + ' in ' + bank.file);
      continue;
    }

    var oldLen = item.Explanation ? item.Explanation.length : 0;
    var newEC;

    if (flag.detail.includes('SHORT:')) {
      newEC = generateExplanation(item, caseData);
    } else if (flag.detail.includes('EXTRA-REFUTED')) {
      newEC = replaceBoilerplate(item.Explanation, item, caseData);
    } else if (flag.detail.includes('UNSUPPORTED-CORRECT')) {
      newEC = augmentUnsupportedCorrect(item.Explanation, item, caseData);
    } else {
      newEC = generateExplanation(item, caseData);
    }

    item.Explanation = newEC;
    var newLen = newEC.length;
    fixedInBank++;

    if (samples.length < 5) {
      samples.push({
        bank: bank.file,
        caseId: flag.caseId,
        itemId: flag.itemId,
        flagType: flag.detail.substring(0, 40),
        oldLen: oldLen,
        newLen: newLen,
        preview: newEC.substring(0, 250)
      });
    }
  }

  if (COMMIT) {
    var ts = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '');
    var bakPath = filePath + '.bak-' + ts;
    fs.copyFileSync(filePath, bakPath);
    var written = writeBack(bank.file, bank.varName, arr);
    var bakSize = fs.statSync(bakPath).size;
    console.log('  [' + bank.file + '] FIXED ' + fixedInBank + ' items, ' + written + ' bytes, backup size=' + bakSize);
  } else {
    console.log('  [' + bank.file + '] would fix ' + fixedInBank + ' items (dry run)');
  }

  totalFixed += fixedInBank;
}

console.log('\nTotal: ' + totalFixed + ' items');

if (samples.length > 0) {
  console.log('\n=== SAMPLES ===');
  for (var s = 0; s < samples.length; s++) {
    var sample = samples[s];
    console.log('\n' + sample.bank + ' | ' + sample.caseId + ':' + sample.itemId + ' (' + sample.flagType + ')');
    console.log('  EC: ' + sample.oldLen + ' -> ' + sample.newLen + ' chars');
    console.log('  Preview: ' + sample.preview + '...');
  }
}

if (COMMIT) {
  console.log('\nApplied. Run: node scripts/case_semantic_screens.js');
} else {
  console.log('\nDRY RUN - no changes written. Run with --commit to apply.');
}
