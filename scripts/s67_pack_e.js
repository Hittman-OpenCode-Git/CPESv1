// Apply Pack E rewrites
const fs = require('fs');
const epath = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026\\pack_e_corrected.js';
let c = fs.readFileSync(epath, 'utf8');

// Rewritten items from Agent 2 output (4-space indent format matches Pack E)
const rewrites = {};

// P1E-B-044 — moving average → Analyze (from agent output, converted 8→4 space indent)
rewrites['P1E-B-044'] = `{
        "StudyLinks": [
            {
                "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
                "label": "IMA CMA Learning Outcome Statements, Part 1 Section B"
            },
            {
                "url": "https://openstax.org/books/principles-managerial-accounting/pages/1-introduction",
                "label": "OpenStax Accounting"
            }
        ],
        "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
        "Section": "B",
        "Difficulty": "Difficult",
        "SectionName": "Planning, Budgeting, and Forecasting",
        "Topic": "E-B.044 Moving average calculation",
        "UniqueConceptKey": "E-B-044-Moving-average-calculation",
        "MicroTopic": "Moving average calculation",
        "CorrectChoice": "C",
        "Choices": {
            "A": "Recommend $159,500 \u2014 computed as a two-month moving average of February and March \u2014 because using fewer periods makes the forecast more responsive to the upward trend, even though it relies on the two oldest data points.",
            "B": "Recommend $182,333 \u2014 computed as a three-month moving average of April, May, and June \u2014 because including more observations reduces distortion from any single month's fluctuation and provides a more stable production target.",
            "C": "Recommend $189,500 \u2014 computed as a two-month moving average of May and June ($182,000 + $197,000) / 2 \u2014 because the shorter-period average using the most recent data responds more quickly to NovaTek's persistent upward sales trend.",
            "D": "Recommend $174,000 \u2014 computed as a three-month moving average of March, April, and May \u2014 because this balances recency against stability by using the three middle months of the five-month series."
        },
        "CalculationItem": false,
        "Part": 1,
        "ItemType": "MCQ",
        "LOSTag": "Part 1 Section B.3",
        "VerifiedChecks": [
            "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
            "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
            "Original practice item with unique micro-topic and stem",
            "Answer key distribution balanced across A/B/C/D",
            "Distractors written as plausible CMA-style traps"
        ],
        "Stem": "NovaTek Components' demand planner Raj Mehta must submit the July sales forecast for the flagship connector line before the monthly production scheduling meeting. Actual sales for the last five months show a clear growth pattern: February $142,000, March $155,000, April $168,000, May $182,000, and June $197,000. NovaTek is gaining market share and the production team has warned that underforecasting leads to costly expedited production runs while overforecasting ties up working capital in excess inventory. Mehta is debating between a two-month moving average and a three-month moving average. The CFO has cautioned that forecasts should not systematically lag in an environment with an established trend. Which forecast should Mehta recommend for July and why?",
        "ExplanationCorrect": "When sales exhibit a persistent upward trend as NovaTek's five consecutive monthly increases demonstrate, a shorter-period moving average responds more quickly to the trend direction than a longer-period average, which lags behind by incorporating older, lower data points. The two-month moving average uses the two most recent observations: ($182,000 + $197,000) / 2 = $189,500. By contrast, a three-month moving average of April-June yields ($168,000 + $182,000 + $197,000) / 3 = $182,333, which lags approximately $7,200 behind the two-month forecast. In a trending environment where stockout risk carries meaningful financial consequences, the shorter-period forecast provides superior responsiveness and better aligns with the CFO's directive to avoid systematic lag.",
        "QuestionID": "P1E-B-044",
        "Part1OnlyFlag": true,
        "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
        "ItemStyle": "single-select",
        "ExplanationWrongA": "$159,500 uses February and March data \u2014 months that are four and five periods behind the July forecast target. A two-month moving average for July must use the two most recent months (May and June), not the oldest available data. Selecting stale data points defeats the purpose of a moving average, which is designed to track recent conditions. Even the correct two-period method applied to outdated inputs produces a forecast that lags the trend by approximately $30,000.",
        "ExplanationWrongB": "A three-month moving average of April-June correctly yields $182,333, and the logic about smoothing is directionally valid. However, in NovaTek's specific case with five consecutive months of growth averaging $13,750 per month, the smoothing benefit of three periods works against forecast accuracy by averaging in the lower April figure of $168,000 that no longer reflects current demand conditions. The three-month forecast of $182,333 systematically understates likely July demand by roughly $7,200, increasing stockout risk.",
        "ExplanationWrongC": "",
        "ExplanationWrongD": "$174,000 does not correspond to any standard moving average calculation using these data. A three-month average of the middle three months (March, April, May) yields ($155,000 + $168,000 + $182,000) / 3 = $168,333, not $174,000. Even if it were correct, deliberately excluding the most recent data point (June at $197,000) while including older data would produce a forecast that lags the accelerating trend even more severely than a standard three-month trailing average.",
        "question_state": "Certified",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze"
    }`;

// P1E-C-011 — material price variance → Analyze
rewrites['P1E-C-011'] = `{
        "StudyLinks": [
            {
                "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
                "label": "IMA CMA Learning Outcome Statements, Part 1 Section C"
            },
            {
                "url": "https://openstax.org/books/principles-managerial-accounting/pages/1-introduction",
                "label": "OpenStax Accounting"
            }
        ],
        "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
        "Section": "C",
        "Difficulty": "Difficult",
        "SectionName": "Performance Management",
        "Topic": "E-C.011 Material price variance calculation",
        "UniqueConceptKey": "E-C-011-Material-price-variance-calculation",
        "MicroTopic": "Material price variance calculation",
        "CorrectChoice": "A",
        "Choices": {
            "A": "Net $9,900 favorable \u2014 the $31,500 price savings outweigh the $21,600 unfavorable quantity variance from the higher rejection rate. Vasquez's supplier change was financially beneficial despite the production complication because the $0.60 per pound discount on all 52,500 pounds more than compensates for the extra 4,500 pounds consumed.",
            "B": "Net $31,500 favorable \u2014 only the price variance should be considered when evaluating a purchasing decision. The $21,600 unfavorable quantity variance reflects a production issue within David Chen's stamping department and is not attributable to the supplier selection. The price variance alone confirms the purchasing decision was sound.",
            "C": "Net $7,200 favorable \u2014 the price variance should be computed on the standard quantity allowed of 48,000 pounds rather than the actual 52,500 pounds purchased, yielding 48,000 x ($4.20 - $4.80) = $28,800 F. Netting this against the $21,600 U quantity variance produces a smaller benefit that may not justify the operational disruption.",
            "D": "Net $9,900 favorable is technically correct but amounts to only 4.5% of the $220,500 total material cost for March. At this magnitude, the savings do not justify the operational disruption of changing suppliers, retooling the stamping line, and managing higher rejection rates. The CFO should recommend reverting to the original supplier."
        },
        "CalculationItem": false,
        "Part": 1,
        "ItemType": "MCQ",
        "LOSTag": "Part 1 Section C.1",
        "VerifiedChecks": [
            "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
            "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
            "Original practice item with unique micro-topic and stem",
            "Answer key distribution balanced across A/B/C/D",
            "Distractors written as plausible CMA-style traps"
        ],
        "Stem": "Northrup Kitchenware's purchasing director Elena Vasquez sourced a new stainless steel supplier offering Grade 304 coil at $4.20 per pound, well below Northrup's standard cost of $4.80 per pound. During March, the stamping department produced 15,000 cookware sets, using 52,500 pounds of the new supplier's steel. The production standard allows 3.2 pounds per set. Production manager David Chen reports that the thinner-gauge steel caused a higher rejection rate at the stamping press \u2014 consuming roughly 0.3 additional pounds per set beyond the standard. Vasquez argues the $0.60 per pound discount more than compensates for the extra usage. The CFO must independently determine the net materials cost impact before deciding whether to renew the supplier contract. Which conclusion is best supported?",
        "ExplanationCorrect": "Materials price variance = (AP - SP) x AQ = ($4.20 - $4.80) x 52,500 = $31,500 favorable. Materials quantity variance = (AQ - SQ) x SP = (52,500 - 48,000) x $4.80 = $21,600 unfavorable, where SQ = 15,000 units x 3.2 lbs = 48,000 lbs. Net variance = $31,500 F + (-$21,600 U) = $9,900 favorable. The $0.60 per pound discount applied to all 52,500 pounds generates sufficient savings to cover the cost of the extra 4,500 pounds consumed at the standard rate. Vasquez's purchasing decision was financially sound \u2014 the lower unit price more than compensates for the higher usage rate. The CFO should renew the contract while tasking production engineering with reducing the rejection rate to capture even greater savings.",
        "QuestionID": "P1E-C-011",
        "Part1OnlyFlag": true,
        "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
        "ItemStyle": "single-select",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "While responsibility accounting appropriately separates purchasing from production performance for individual manager evaluation, the CFO's question is about Northrup's total financial outcome \u2014 not individual accountability. The $21,600 unfavorable quantity variance is a direct and foreseeable consequence of selecting a thinner-gauge material. Ignoring this cost when evaluating the supplier change would systematically favor cheaper, lower-quality inputs and overstate the net benefit. Both variances must be netted to determine whether the company as a whole benefited.",
        "ExplanationWrongC": "The materials price variance formula uses actual quantity purchased, not standard quantity allowed. Purchasing decisions affect the price paid on every pound actually bought \u2014 all 52,500 pounds, not just the 48,000 that met the original specification. Using standard quantity would understate the price savings by 4,500 lbs x $0.60 = $2,700 and produce an incorrect assessment that undervalues the purchasing discount by nearly 10%. The correct computation is ($4.20 - $4.80) x 52,500 = $31,500 F.",
        "ExplanationWrongD": "A $9,900 favorable net variance on standard material costs of $230,400 (48,000 lbs x $4.80) represents a 4.3% cost reduction \u2014 a meaningful improvement in a manufacturing environment where materials typically represent the single largest cost category. A 4.3% materials cost reduction would be considered significant in virtually any industrial operation. Dismissing it as insufficient to justify the supplier change would cause Northrup to forgo genuine cost savings that directly improve gross margin.",
        "question_state": "Certified",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze"
    }`;

// Function: find and replace by QID in Pack E
function replaceInPackE(content, qid, newItem) {
  const pattern = '"QuestionID": "' + qid + '"';
  const idx = content.indexOf(pattern);
  if (idx === -1) return { ok: false, reason: 'QID not found' };

  // For Pack E, items are separated by \n    },\n    {\n
  // Find the { that opens this item: scan backward for \n    {\n
  const before = content.substring(0, idx);
  // Find the last occurrence of "\n    {\n" before the QID
  // This is the start of an item
  const sectionMark = '\n    {\n';
  
  // More reliable: scan backward from QID to find the enclosing object
  // Pack E uses consistent 4-space indent, items start with "    {"
  // Find the opening brace by looking for "    {\n" before the QID that's NOT inside a string
  
  // Simple approach: use lastIndexOf for "\n    {\n" which marks item boundaries
  const boundaries = [];
  let pos = 0;
  while (true) {
    pos = content.indexOf('\n    {\n', pos);
    if (pos === -1) break;
    boundaries.push(pos + 1); // position of "{" (after \n)
    pos++;
  }
  
  // Find the boundary { that is before the QID and closest to it
  let itemStart = -1;
  for (let i = boundaries.length - 1; i >= 0; i--) {
    if (boundaries[i] < idx) {
      // Check if the next boundary is after the QID (confirming this is the right item)
      if (i + 1 >= boundaries.length || boundaries[i + 1] > idx + 100) {
        itemStart = boundaries[i];
        break;
      }
    }
  }
  
  if (itemStart === -1) return { ok: false, reason: 'Item start not found' };
  
  // Find the end: next "    }," after QID
  const afterIdx = content.indexOf('\n    },', idx);
  if (afterIdx === -1) return { ok: false, reason: 'Item end not found' };
  const itemEnd = afterIdx + 6; // include "    },"
  
  const newContent = content.substring(0, itemStart) + newItem + content.substring(itemEnd);
  return { ok: true, content: newContent };
}

let applied = 0;
for (const [qid, newItem] of Object.entries(rewrites)) {
  const result = replaceInPackE(c, qid, newItem);
  if (result.ok) {
    c = result.content;
    applied++;
    console.log('OK   ' + qid);
  } else {
    console.log('FAIL ' + qid + ': ' + result.reason);
  }
}

console.log('\nApplied: ' + applied + '/' + Object.keys(rewrites).length);

// Save
fs.writeFileSync(epath, c, 'utf8');
console.log('SAVED pack_e_corrected.js');

// Verify
try { new Function(c); console.log('Parse: PASS'); }
catch(e) { console.log('Parse: FAIL — ' + e.message.substring(0,100)); }
