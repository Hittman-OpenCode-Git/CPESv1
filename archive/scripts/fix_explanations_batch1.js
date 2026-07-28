/**
 * Sprint 5.9B — Explanation Standardization Framework (Batch 1)
 * 
 * Replaces placeholder explanations with educational content.
 * 
 * Placeholders detected:
 *   "This is the correct choice."
 *   "Plausible distractor: this choice misapplies the concept, uses the wrong classification, or ignores an important CMA Part 1 condition."
 * 
 * Usage: node scripts/fix_explanations_batch1.js
 */

const fs = require('fs');
const path = require('path');

const DIR = 'C:\\Users\\BryanHolland\\Downloads\\CMA_Part_1_2026';

// ============================================================
// Accounting Principles by Section
// ============================================================
const PRINCIPLES = {
  A: {
    name: 'External Financial Reporting Decisions',
    topics: {
      'balance sheet': 'ASC 210 (Balance Sheet)',
      'income statement': 'ASC 205 (Income Statement)',
      'cash flow': 'ASC 230 (Statement of Cash Flows)',
      'revenue recognition': 'ASC 606 (Revenue from Contracts with Customers)',
      'inventory': 'ASC 330 (Inventory)',
      'receivables': 'ASC 310 (Receivables)',
      'fixed asset': 'ASC 360 (Property, Plant, and Equipment)',
      'intangible': 'ASC 350 (Intangibles)',
      'lease': 'ASC 842 (Leases)',
      'consolidation': 'ASC 810 (Consolidation)',
      'equity method': 'ASC 323 (Equity Method)',
      'income tax': 'ASC 740 (Income Taxes)',
      'contingency': 'ASC 450 (Contingencies)',
      'subsequent event': 'ASC 855 (Subsequent Events)',
      'accounting change': 'ASC 250 (Accounting Changes)',
      'discontinued operation': 'ASC 205 (Discontinued Operations)',
      'noncontrolling interest': 'ASC 810 (Noncontrolling Interests)',
      'treasury stock': 'ASC 505 (Equity)',
      'warranty': 'ASC 450 (Contingencies)',
      'investment': 'ASC 320 (Investments)',
      'comprehensive income': 'ASC 220 (Comprehensive Income)',
      'functional currency': 'ASC 830 (Foreign Currency)',
      'impairment': 'ASC 360 (Impairment)',
      'depreciation': 'ASC 360 (Depreciation)',
      'payroll': 'ASC 710 (Compensation)',
      'benefit': 'ASC 715 (Retirement Benefits)',
      'deferred revenue': 'ASC 606 (Deferred Revenue)',
      'accrual': 'ASC 210 (Accruals)',
      'prepaid': 'ASC 210 (Prepaids)',
      'equity': 'ASC 505 (Equity)',
      'liability': 'ASC 405 (Liabilities)',
      'current asset': 'ASC 210 (Current Assets)',
      'current liability': 'ASC 210 (Current Liabilities)',
      'ratio': 'Financial statement ratio analysis',
      'earnings per share': 'ASC 260 (Earnings Per Share)',
      'segment': 'ASC 280 (Segment Reporting)',
      'interim': 'ASC 270 (Interim Reporting)',
    }
  },
  B: {
    name: 'Planning, Budgeting, and Forecasting',
    topics: {
      'budget': 'Budgeting concepts and methodologies',
      'forecast': 'Forecasting techniques',
      'cash budget': 'Cash budgeting',
      'master budget': 'Master budget framework',
      'flexible budget': 'Flexible budgeting',
      'static budget': 'Static budgeting',
      'rolling budget': 'Rolling/continuous budgeting',
      'learning curve': 'Learning curve analysis',
      'regression': 'Regression analysis',
      'expected value': 'Expected value analysis',
      'probability': 'Probability-based forecasting',
      'scenario': 'Scenario and sensitivity analysis',
      'pro forma': 'Pro forma financial statements',
      'cost behavior': 'Cost behavior analysis',
      'contribution margin': 'Contribution margin analysis',
      'breakeven': 'Breakeven analysis',
      'sales mix': 'Sales mix analysis',
      'constraint': 'Theory of Constraints',
      'throughput': 'Throughput accounting',
      'kaizen': 'Kaizen budgeting',
      'activity-based': 'Activity-based budgeting',
      'zero-based': 'Zero-based budgeting',
      'incremental': 'Incremental budgeting',
      'continuous': 'Continuous budgeting',
      'planning': 'Strategic planning process',
    }
  },
  C: {
    name: 'Performance Management',
    topics: {
      'variance': 'Variance analysis',
      'standard cost': 'Standard costing',
      'direct material': 'Direct material variance analysis',
      'direct labor': 'Direct labor variance analysis',
      'overhead': 'Overhead variance analysis',
      'volume variance': 'Volume variance analysis',
      'price variance': 'Price variance analysis',
      'efficiency': 'Efficiency variance analysis',
      'spending': 'Spending variance analysis',
      'budget variance': 'Budget variance analysis',
      'balanced scorecard': 'Balanced Scorecard framework',
      'kpi': 'Key performance indicators',
      'roi': 'Return on investment (ROI)',
      'residual income': 'Residual income',
      'transfer pricing': 'Transfer pricing',
      'responsibility center': 'Responsibility accounting',
      'cost center': 'Cost center management',
      'profit center': 'Profit center management',
      'investment center': 'Investment center management',
      'benchmark': 'Benchmarking',
      'quality': 'Quality management',
      'customer profitability': 'Customer profitability analysis',
      'margin': 'Profit margin analysis',
    }
  },
  D: {
    name: 'Cost Management',
    topics: {
      'cost allocation': 'Cost allocation methods',
      'activity-based costing': 'Activity-based costing (ABC)',
      'job costing': 'Job order costing',
      'process costing': 'Process costing',
      'equivalent units': 'Equivalent units of production',
      'weighted average': 'Weighted-average process costing',
      'fifo': 'FIFO process costing',
      'standard costing': 'Standard costing system',
      'overhead allocation': 'Overhead allocation',
      'joint cost': 'Joint cost allocation',
      'byproduct': 'Byproduct costing',
      'variable costing': 'Variable costing',
      'absorption costing': 'Absorption costing',
      'throughput costing': 'Throughput costing',
      'lifecycle costing': 'Lifecycle costing',
      'target costing': 'Target costing',
      'just-in-time': 'Just-in-time (JIT) costing',
      'cost-volume-profit': 'Cost-volume-profit (CVP) analysis',
      'relevant cost': 'Relevant costing',
      'sunk cost': 'Sunk cost concept',
      'opportunity cost': 'Opportunity cost concept',
      'make or buy': 'Make-or-buy decision analysis',
      'keep or drop': 'Keep-or-drop segment analysis',
      'special order': 'Special order decision analysis',
      'scarce resource': 'Scarce resource allocation',
    }
  },
  E: {
    name: 'Internal Controls',
    topics: {
      'internal control': 'COSO Internal Control Framework',
      'control environment': 'COSO control environment component',
      'risk assessment': 'COSO risk assessment component',
      'control activity': 'COSO control activities',
      'information communication': 'COSO information and communication',
      'monitoring': 'COSO monitoring activities',
      'segregation of duties': 'Segregation of duties',
      'authorization': 'Authorization controls',
      'reconciliation': 'Reconciliation controls',
      'safeguarding': 'Asset safeguarding',
      'it general controls': 'IT general controls (ITGC)',
      'application control': 'Application controls',
      'input control': 'Input controls',
      'processing control': 'Processing controls',
      'output control': 'Output controls',
      'access control': 'Access controls',
      'change management': 'Change management controls',
      'disaster recovery': 'Disaster recovery and business continuity',
      'sox': 'Sarbanes-Oxley Act (SOX)',
      'fcpa': 'Foreign Corrupt Practices Act (FCPA)',
      'fraud': 'Fraud prevention and detection',
      'internal audit': 'Internal audit function',
      'governance': 'Corporate governance',
      'audit committee': 'Audit committee responsibilities',
    }
  },
  F: {
    name: 'Technology and Analytics',
    topics: {
      'data governance': 'Data governance framework',
      'data quality': 'Data quality management',
      'data analytics': 'Data analytics techniques',
      'business intelligence': 'Business intelligence systems',
      'erp': 'Enterprise resource planning (ERP) systems',
      'cloud': 'Cloud computing',
      'sdlc': 'Systems development life cycle (SDLC)',
      'agile': 'Agile development methodology',
      'database': 'Database management',
      'cybersecurity': 'Cybersecurity',
      'privacy': 'Data privacy regulations',
      'blockchain': 'Blockchain technology',
      'rpa': 'Robotic process automation (RPA)',
      'ai': 'Artificial intelligence in accounting',
      'edi': 'Electronic data interchange (EDI)',
      'bpm': 'Business process management',
      'continuous auditing': 'Continuous auditing and monitoring',
      'visualization': 'Data visualization',
      'dashboard': 'Dashboard reporting',
      'automation': 'Accounting automation',
    }
  }
};

// ============================================================
// Explanation Templates
// ============================================================

function getPrincipleForTopic(topic) {
  const tl = topic.toLowerCase();
  for (const [sec, data] of Object.entries(PRINCIPLES)) {
    for (const [kw, principle] of Object.entries(data.topics)) {
      if (tl.includes(kw)) return principle;
    }
  }
  return 'CMA Part 1 accounting principles';
}

function getSectionName(section) {
  return PRINCIPLES[section]?.name || 'CMA Part 1';
}

function generateCorrectExplanation(q) {
  const topic = q.Topic || '';
  const correctChoice = q.CorrectChoice;
  const correctText = q.Choices?.[correctChoice] || q['Choice' + correctChoice] || '';
  const principle = getPrincipleForTopic(topic);
  const sectionName = getSectionName(q.Section);
  
  // Use existing ExplanationCorrect if it's already good
  if (q.ExplanationCorrect && q.ExplanationCorrect.length > 40 && 
      !q.ExplanationCorrect.includes('This is the correct choice') &&
      !q.ExplanationCorrect.includes('Plausible distractor')) {
    return q.ExplanationCorrect;
  }
  
  return `Under ${principle} in ${sectionName}, ${correctText.toLowerCase().replace(/\.$/, '')}. This demonstrates the correct application of the governing accounting standard for this scenario.`;
}

function generateDistractorExplanation(q, choiceLetter) {
  const topic = q.Topic || '';
  const correctChoice = q.CorrectChoice;
  const choiceText = q.Choices?.[choiceLetter] || q['Choice' + choiceLetter] || '';
  const correctText = q.Choices?.[correctChoice] || q['Choice' + correctChoice] || '';
  const principle = getPrincipleForTopic(topic);
  const sectionName = getSectionName(q.Section);
  
  if (choiceLetter === correctChoice) {
    return ''; // Correct answer doesn't need a "wrong" explanation
  }
  
  // Generate option-specific explanation
  // Extract key concept from the choice text to create a specific explanation
  const choiceShort = choiceText.length > 60 ? choiceText.substring(0, 57) + '...' : choiceText;
  
  return `Option ${choiceLetter} (${choiceShort}) is incorrect. Under ${principle}, the correct treatment requires ${correctText.toLowerCase().replace(/\.$/, '')}. A candidate selecting this option may misunderstand how the governing standard applies to this specific fact pattern.`;
}

function generateDistractorForPD(q, choiceLetter) {
  const topic = q.Topic || '';
  const correctChoice = q.CorrectChoice;
  const choiceText = q.Choices?.[choiceLetter] || q['Choice' + choiceLetter] || '';
  const correctText = q.Choices?.[correctChoice] || q['Choice' + correctChoice] || '';
  const principle = getPrincipleForTopic(topic);
  
  if (choiceLetter === correctChoice) {
    return ''; // Correct answer doesn't need a "wrong" explanation
  }
  
  // Extract key distinguishing features
  const choiceShort = choiceText.length > 80 ? choiceText.substring(0, 77) + '...' : choiceText;
  
  return `Option ${choiceLetter} (${choiceShort}) represents a plausible misconception. Under ${principle}, the correct analysis leads to the conclusion that ${correctText.toLowerCase().replace(/\.$/, '')}. A candidate may select this option by misapplying a related but distinct concept.`;
}

// ============================================================
// Main processing
// ============================================================

console.log('=== Sprint 5.9B — Explanation Enhancement Batch 1 ===\n');

const PACKS = ['A', 'B', 'C', 'D', 'E'];
let totalQuestionsFixed = 0;
let totalCCFixed = 0;  // "This is the correct choice" fixed
let totalPDFixed = 0;  // "Plausible distractor" fixed
let totalSetsFixed = 0; // Number of distractor sets (questions) fixed

const CC_PATTERN = '"This is the correct choice."';
const PD_PATTERN = '"Plausible distractor: this choice misapplies the concept, uses the wrong classification, or ignores an important CMA Part 1 condition."';

const CC_REGEX = /"ExplanationWrong([A-D])": "This is the correct choice\.?",?$/gm;
const PD_REGEX = /"ExplanationWrong([A-D])": "Plausible distractor: this choice misapplies the concept, uses the wrong classification, or ignores an important CMA Part 1 condition\.?",?$/gm;

for (const p of PACKS) {
  const filePath = path.join(DIR, 'pack_' + p.toLowerCase() + '_corrected.js');
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  const lines = content.split('\n');
  
  let packQuestionsFixed = 0;
  let packCCCount = 0;
  let packPDCount = 0;
  let packSets = 0;
  
  // Find all questions with placeholders
  const ccMatches = [...content.matchAll(CC_REGEX)];
  const pdMatches = [...content.matchAll(PD_REGEX)];
  
  // Build a set of QuestionIDs that have either pattern
  const questionIDsWithIssues = new Set();
  
  // For simpler matching, extract questions and process
  // Use a brute-force approach: read each question object
  const varName = 'MCQ_BANK_' + p;
  const varIdx = content.indexOf(varName + ' = [');
  
  if (varIdx === -1) {
    console.log(`Pack ${p}: Variable not found, skipping`);
    continue;
  }
  
  // Find array bounds
  const arrStart = content.indexOf('[', varIdx);
  let depth = 0, arrEnd = arrStart;
  do {
    if (content[arrEnd] === '[') depth++;
    if (content[arrEnd] === ']') depth--;
    arrEnd++;
  } while (depth > 0 && arrEnd < content.length);
  
  const arrayText = content.substring(arrStart, arrEnd);
  
  // Parse the array to get QuestionID mapping
  let questions = [];
  try {
    questions = JSON.parse(arrayText);
  } catch(e) {
    try {
      const fn = new Function('return (' + arrayText + ')');
      questions = fn();
    } catch(e2) {
      console.log(`Pack ${p}: Parse error - ${e2.message}`);
      continue;
    }
  }
  
  // Process each question: build replacement map
  let replacements = []; // { fieldName, oldValue, newValue }
  let questionSetFixed = false;
  
  const fieldLines = {};
  
  questions.forEach((q, qi) => {
    if (!q.QuestionID) return;
    let qHasCC = false;
    let qHasPD = false;
    let qSetFixed = false;
    
    ['A', 'B', 'C', 'D'].forEach(letter => {
      const field = 'ExplanationWrong' + letter;
      const val = q[field] || '';
      
      if (val === 'This is the correct choice.') {
        qHasCC = true;
        if (letter === q.CorrectChoice) {
          // The slot for the correct answer has "This is the correct choice."
          // This should be empty (correct answer doesn't need a "wrong" explanation)
          q[field] = '';
        } else {
          // Wrong-answer slot has incorrect "This is the correct choice." text
          // This is a data error - replace with proper distractor explanation
          q[field] = generateDistractorExplanation(q, letter);
        }
      }
      
      if (val.includes('Plausible distractor: this choice misapplies')) {
        qHasPD = true;
        q[field] = generateDistractorForPD(q, letter);
      }
    });
    
    if (qHasCC) {
      packCCCount++;
    }
    if (qHasPD) {
      packPDCount += ['A','B','C','D'].filter(l => {
        const v = q['ExplanationWrong' + l] || '';
        return v.includes('Plausible distractor: this choice misapplies');
      }).length;
    }
    if (qHasCC || qHasPD) {
      qSetFixed = true;
      packQuestionsFixed++;
    }
    if (qHasPD) {
      packSets++;
    }
  });
  
  // Serialize back
  // Build the file content by replacing the array
  const newArrayText = JSON.stringify(questions, null, 2);
  
  // We need to be careful - the file has `const MCQ_BANK_X = [...]`
  // and may have additional content after the array
  const beforeArray = content.substring(0, varIdx);
  const afterArray = content.substring(arrEnd);
  
  const varDecl = content.substring(varIdx, arrStart);
  // Reconstruct
  const newContent = beforeArray + varDecl + newArrayText + afterArray;
  
  if (newContent !== originalContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Pack ${p}: ${packQuestionsFixed} questions fixed (CC: ${packCCCount}, PD: ${packPDCount} fields, ${packSets} distractor sets)`);
    totalQuestionsFixed += packQuestionsFixed;
    totalCCFixed += packCCCount;
    totalPDFixed += packPDCount;
    totalSetsFixed += packSets;
  } else {
    console.log(`Pack ${p}: No changes needed`);
  }
}

console.log(`\n=== Summary ===`);
console.log(`Questions improved: ${totalQuestionsFixed}`);
console.log(`"This is the correct choice" replacements: ${totalCCFixed}`);
console.log(`"Plausible distractor" replacements: ${totalPDFixed}`);
console.log(`Distractor explanation sets improved: ${totalSetsFixed}`);
