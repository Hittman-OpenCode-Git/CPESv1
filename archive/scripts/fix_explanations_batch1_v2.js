/**
 * Sprint 5.9B — Explanation Standardization Framework (Batch 1, v2)
 * 
 * Handles ALL placeholder patterns:
 *   1. "This is the correct choice." (exact)
 *   2. "This is the correct choice: <content>"
 *   3. "This is the correct choice because <content>"
 *   4. "This is the correct choice. <content>"
 *   5. "Plausible distractor: this choice misapplies..." (fully generic)
 *   6. "Plausible distractor: <custom content>" (partially customized)
 * 
 * Usage: node scripts/fix_explanations_batch1_v2.js
 */

const fs = require('fs');
const path = require('path');

const DIR = 'C:\\Users\\BryanHolland\\Downloads\\CMA_Part_1_2026';

// ============================================================
// Accounting Principles by Topic (expanded)
// ============================================================
const TOPIC_MAP = {
  // Section A
  'balance sheet': 'ASC 210 (Balance Sheet)',
  'income statement': 'ASC 205 (Income Statement)',
  'cash flow': 'ASC 230 (Statement of Cash Flows)',
  'revenue recognition': 'ASC 606 (Revenue from Contracts with Customers)',
  'inventory': 'ASC 330 (Inventory)',
  'receivable': 'ASC 310 (Receivables)',
  'fixed asset': 'ASC 360 (Property, Plant, and Equipment)',
  'intangible': 'ASC 350 (Intangibles)',
  'lease': 'ASC 842 (Leases)',
  'consolidation': 'ASC 810 (Consolidation)',
  'equity method': 'ASC 323 (Equity Method and Investments)',
  'income tax': 'ASC 740 (Income Taxes)',
  'contingenc': 'ASC 450 (Contingencies)',
  'subsequent event': 'ASC 855 (Subsequent Events)',
  'accounting change': 'ASC 250 (Accounting Changes and Error Corrections)',
  'discontinued operation': 'ASC 205-20 (Discontinued Operations)',
  'noncontrolling': 'ASC 810-10 (Noncontrolling Interests)',
  'treasury stock': 'ASC 505-30 (Treasury Stock)',
  'warrant': 'ASC 450-20 (Loss Contingencies)',
  'investment security': 'ASC 320 (Investments — Debt and Equity Securities)',
  'comprehensive income': 'ASC 220 (Comprehensive Income)',
  'foreign currency': 'ASC 830 (Foreign Currency Matters)',
  'impairment': 'ASC 360-10 (Impairment of Long-Lived Assets)',
  'depreciation': 'ASC 360-10 (Depreciation)',
  'payroll': 'ASC 710 (Compensation)',
  'retirement benefit': 'ASC 715 (Retirement Benefits)',
  'deferred revenue': 'ASC 606-10-25 (Contract Liabilities)',
  'accrual': 'GAAP accrual accounting concepts',
  'prepaid': 'GAAP prepaid expense accounting',
  'equity': 'ASC 505 (Equity)',
  'liability': 'ASC 405 (Liabilities)',
  'current asset': 'ASC 210-10 (Current Assets)',
  'current liability': 'ASC 210-10 (Current Liabilities)',
  'earnings per share': 'ASC 260 (Earnings Per Share)',
  'segment reporting': 'ASC 280 (Segment Reporting)',
  'interim reporting': 'ASC 270 (Interim Reporting)',
  'classified balance sheet': 'ASC 210-10-45 (Classified Balance Sheet)',
  'bank reconciliation': 'Bank reconciliation and internal cash controls',
  'goodwill': 'ASC 350-20 (Goodwill)',
  'deferred tax': 'ASC 740-10 (Deferred Tax Assets and Liabilities)',
  'investment property': 'ASC 840 (Investment Property)',
  'governmental': 'GASB accounting standards',
  'not-for-profit': 'FASB ASC 958 (Not-for-Profit Entities)',
  'consignment': 'Consignment inventory accounting',
  'installment': 'ASC 606-10-55 (Installment Sales)',
  'franchise': 'ASC 952 (Franchisors)',
  'software revenue': 'ASC 985-605 (Software Revenue Recognition)',
  'construction contract': 'ASC 606-10 (Construction Contracts)',
  'capitalization': 'ASC 835-20 (Capitalization of Interest)',
  'research development': 'ASC 730 (Research and Development)',
  'startup cost': 'ASC 720-15 (Startup Costs)',
  'business combination': 'ASC 805 (Business Combinations)',
  'variable interest': 'ASC 810-10 (Variable Interest Entities)',
  'fair value': 'ASC 820 (Fair Value Measurement)',
  'derivative': 'ASC 815 (Derivatives and Hedging)',
  
  // Section B
  'budget': 'Budgeting concepts and methodologies',
  'forecast': 'Forecasting techniques',
  'cash budget': 'Cash budgeting methodology',
  'master budget': 'Master budget framework',
  'flexible budget': 'Flexible budgeting analysis',
  'static budget': 'Static budgeting analysis',
  'rolling budget': 'Rolling (continuous) budgeting',
  'learning curve': 'Learning curve analysis',
  'regression': 'Regression analysis in forecasting',
  'expected value': 'Expected value analysis',
  'probability': 'Probability-based forecasting',
  'scenario analysis': 'Scenario and sensitivity analysis',
  'pro forma': 'Pro forma financial statements',
  'cost behavior': 'Cost behavior analysis',
  'contribution margin': 'Contribution margin analysis',
  'breakeven': 'Breakeven analysis',
  'sales mix': 'Sales mix analysis',
  'theory of constraint': 'Theory of Constraints (TOC)',
  'throughput': 'Throughput accounting',
  'kaizen': 'Kaizen budgeting',
  'activity-based budget': 'Activity-based budgeting (ABB)',
  'zero-based': 'Zero-based budgeting',
  'incremental': 'Incremental budgeting',
  'continuous budget': 'Continuous budgeting',
  'strategic planning': 'Strategic planning process',
  'operational planning': 'Operational planning',
  'budgeting approach': 'Budgeting approaches and methodologies',
  'capital budget': 'Capital budgeting concepts',
  'cash flow forecast': 'Cash flow forecasting',
  'sensitivity': 'Sensitivity analysis in planning',
  'what-if': 'What-if analysis',

  // Section C
  'variance analysis': 'Variance analysis',
  'standard cost': 'Standard costing',
  'direct material variance': 'Direct material variance analysis',
  'direct labor variance': 'Direct labor variance analysis',
  'overhead variance': 'Overhead variance analysis',
  'volume variance': 'Volume variance analysis',
  'price variance': 'Price variance analysis',
  'efficiency variance': 'Efficiency variance analysis',
  'spending variance': 'Spending variance analysis',
  'budget variance': 'Budget variance analysis',
  'balanced scorecard': 'Balanced Scorecard framework (Kaplan and Norton)',
  'kpi': 'Key performance indicators (KPIs)',
  'roi': 'Return on investment (ROI)',
  'residual income': 'Residual income (RI)',
  'transfer pricing': 'Transfer pricing methods',
  'responsibility center': 'Responsibility accounting',
  'cost center': 'Cost center management',
  'profit center': 'Profit center management',
  'investment center': 'Investment center management',
  'benchmarking': 'Benchmarking practices',
  'quality management': 'Quality management and continuous improvement',
  'customer profitability': 'Customer profitability analysis',
  'profit margin': 'Profit margin analysis',
  'segment margin': 'Segment margin analysis',
  'productivity': 'Productivity measurement',
  'cycle time': 'Cycle time and throughput analysis',
  'performance measure': 'Performance measurement systems',

  // Section D
  'cost allocation': 'Cost allocation methods',
  'activity-based costing': 'Activity-based costing (ABC)',
  'job costing': 'Job order costing',
  'process costing': 'Process costing',
  'equivalent units': 'Equivalent units of production',
  'weighted-average': 'Weighted-average process costing',
  'fifo costing': 'FIFO process costing',
  'overhead allocation': 'Overhead allocation methods',
  'joint cost': 'Joint cost allocation',
  'byproduct': 'Byproduct costing',
  'variable costing': 'Variable costing',
  'absorption costing': 'Absorption costing',
  'throughput costing': 'Throughput costing',
  'lifecycle costing': 'Lifecycle costing',
  'target costing': 'Target costing',
  'just-in-time': 'Just-in-time (JIT) costing',
  'cost-volume-profit': 'Cost-volume-profit (CVP) analysis',
  'relevant cost': 'Relevant costing for decision making',
  'sunk cost': 'Sunk cost concept',
  'opportunity cost': 'Opportunity cost concept',
  'make or buy': 'Make-or-buy decision analysis',
  'keep or drop': 'Keep-or-drop segment analysis',
  'special order': 'Special order decision analysis',
  'scarce resource': 'Scarce resource (constraint) allocation',
  'cost driver': 'Cost driver identification',
  'value chain': 'Value chain analysis',
  'cost estimation': 'Cost estimation methods',
  'learning curve costing': 'Learning curve in cost estimation',

  // Section E
  'internal control': 'COSO Internal Control — Integrated Framework',
  'control environment': 'COSO control environment component',
  'risk assessment': 'COSO risk assessment component',
  'control activity': 'COSO control activities component',
  'information communication': 'COSO information and communication component',
  'monitoring': 'COSO monitoring activities',
  'segregation of duties': 'Segregation of duties (SoD)',
  'authorization': 'Authorization controls',
  'reconciliation': 'Reconciliation controls',
  'safeguarding': 'Asset safeguarding controls',
  'it general control': 'IT general controls (ITGC)',
  'application control': 'Application controls',
  'input control': 'Input controls',
  'processing control': 'Processing controls',
  'output control': 'Output controls',
  'access control': 'Access controls and identity management',
  'change management': 'Change management controls',
  'disaster recovery': 'Disaster recovery and business continuity planning',
  'sox': 'Sarbanes-Oxley Act of 2002 (SOX)',
  'fcpa': 'Foreign Corrupt Practices Act (FCPA)',
  'fraud': 'Fraud prevention, detection, and deterrence',
  'internal audit': 'Internal audit function',
  'governance': 'Corporate governance',
  'audit committee': 'Audit committee responsibilities',
  'risk management': 'Enterprise risk management (ERM)',
  'three-way match': 'Three-way matching in procurement',
  'purchasing control': 'Purchasing and disbursement controls',
  'treasury control': 'Treasury management controls',
  'vendor': 'Vendor master file controls',
  'payroll control': 'Payroll controls',

  // Section F
  'data governance': 'Data governance framework',
  'data quality': 'Data quality management',
  'data analytics': 'Data analytics techniques',
  'business intelligence': 'Business intelligence (BI) systems',
  'erp': 'Enterprise resource planning (ERP) systems',
  'cloud computing': 'Cloud computing models',
  'sdlc': 'Systems development life cycle (SDLC)',
  'agile development': 'Agile development methodology',
  'database': 'Database management systems',
  'cybersecurity': 'Cybersecurity principles and practices',
  'privacy': 'Data privacy regulations',
  'blockchain': 'Blockchain technology',
  'rpa': 'Robotic process automation (RPA)',
  'artificial intelligence': 'Artificial intelligence in accounting',
  'edi': 'Electronic data interchange (EDI)',
  'bpm': 'Business process management',
  'continuous auditing': 'Continuous auditing and monitoring',
  'visualization': 'Data visualization',
  'dashboard': 'Dashboard reporting and KPIs',
  'automation': 'Accounting automation technologies',
  'system development': 'System development methodologies',
  'it framework': 'IT governance frameworks (COBIT, ITIL)',
  'digital transformation': 'Digital transformation in finance',
};

function getPrinciple(topic) {
  if (!topic) return 'CMA Part 1 accounting principles';
  const tl = topic.toLowerCase();
  // Sort keywords by length (longest first) to match most specific first
  const sorted = Object.entries(TOPIC_MAP).sort((a, b) => b[0].length - a[0].length);
  for (const [kw, principle] of sorted) {
    if (tl.includes(kw)) return principle;
  }
  return 'CMA Part 1 accounting principles';
}

// ============================================================
// Helper: clean up "This is the correct choice" prefix
// ============================================================
function stripCCPrefix(text) {
  let t = text.trim();
  // Order matters: handle longer patterns first
  t = t.replace(/^This is the correct choice because\s*/i, '');
  t = t.replace(/^This is the correct choice:\s*/i, '');
  t = t.replace(/^This is the correct choice\.\s*/i, '');
  t = t.replace(/^This is the correct choice\.?\s*/i, '');
  t = t.replace(/^:\s*/, ''); // Clean up leading colon if left behind
  return t.trim();
}

// ============================================================
// Generate explanations
// ============================================================

function generateCorrectExplanation(q) {
  const correctLetter = q.CorrectChoice;
  const correctText = q.Choices?.[correctLetter] || q['Choice' + correctLetter] || '';
  const principle = getPrinciple(q.Topic);
  
  // Use existing ExplanationCorrect if it's already good and not a placeholder
  if (q.ExplanationCorrect && q.ExplanationCorrect.length > 40 &&
      !q.ExplanationCorrect.match(/This is the correct choice/i) &&
      !q.ExplanationCorrect.includes('Plausible distractor')) {
    return q.ExplanationCorrect;
  }
  
  // Clean existing if it has the prefix
  if (q.ExplanationCorrect) {
    const cleaned = stripCCPrefix(q.ExplanationCorrect);
    if (cleaned.length > 30) return cleaned;
  }
  
  // Generate from choice text
  if (correctText) {
    return `Under ${principle}, ${correctText.charAt(0).toLowerCase() === correctText.charAt(0) ? correctText : correctText.toLowerCase()} represents the correct application of the governing standard.`;
  }
  
  return '';
}

function generateDistractorExplanation(q, letter, currentVal) {
  const correctLetter = q.CorrectChoice;
  const choiceText = q.Choices?.[letter] || q['Choice' + letter] || '';
  const correctText = q.Choices?.[correctLetter] || q['Choice' + correctLetter] || '';
  const principle = getPrinciple(q.Topic);
  
  if (letter === correctLetter) {
    return ''; // Correct answer slot should be empty
  }
  
  // If there's existing content (with "Plausible distractor:" prefix or "This is the correct choice" prefix)
  if (currentVal) {
    // Extract any specific reasoning that might exist after the prefix
    let specific = '';
    if (currentVal.includes('Plausible distractor:')) {
      specific = currentVal.split('Plausible distractor:')[1]?.trim() || '';
    } else {
      specific = stripCCPrefix(currentVal);
    }
    
    // If there's specific content after the prefix, use it as-is
    if (specific.length > 20 && !specific.includes('this choice misapplies the concept')) {
      return specific;
    }
  }
  
  // Generate explanation based on choice text
  if (choiceText && correctText) {
    const shortChoice = choiceText.length > 100 ? choiceText.substring(0, 97) + '...' : choiceText;
    const shortCorrect = correctText.length > 80 ? correctText.substring(0, 77) + '...' : correctText;
    return `Option ${letter} suggests that ${shortChoice.charAt(0).toLowerCase()}${shortChoice.slice(1)}. This is incorrect because under ${principle}, the correct treatment is ${shortCorrect.charAt(0).toLowerCase()}${shortCorrect.slice(1)}.`;
  }
  
  return `Option ${letter} is incorrect. Under ${principle}, the facts in this scenario require a different accounting treatment.`;
}

// ============================================================
// Process a single pack file
// ============================================================
function processPack(packLetter) {
  const filePath = path.join(DIR, 'pack_' + packLetter.toLowerCase() + '_corrected.js');
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  const varName = 'MCQ_BANK_' + packLetter;
  
  // Find the array in the file
  let varIdx = content.indexOf(varName + ' = [');
  if (varIdx === -1) {
    // Try with const
    varIdx = content.indexOf('const ' + varName + ' = [');
    if (varIdx === -1) return { fixed: false };
  }
  
  const arrStart = content.indexOf('[', varIdx);
  let depth = 0, arrEnd = arrStart;
  do {
    if (content[arrEnd] === '[') depth++;
    if (content[arrEnd] === ']') depth--;
    arrEnd++;
  } while (depth > 0 && arrEnd < content.length);
  
  const arrayText = content.substring(arrStart, arrEnd);
  
  // Parse questions
  let questions;
  try {
    questions = JSON.parse(arrayText);
  } catch(e) {
    try {
      const fn = new Function('return (' + arrayText + ')');
      questions = fn();
    } catch(e2) {
      console.log(`  Pack ${packLetter}: Parse error - ${e2.message.substring(0, 80)}`);
      return { fixed: false };
    }
  }
  
  let ccCount = 0;
  let pdCount = 0;
  let questionCount = 0;
  
  questions.forEach(q => {
    if (!q.QuestionID) return;
    let qChanged = false;
    
    ['A', 'B', 'C', 'D'].forEach(letter => {
      const field = 'ExplanationWrong' + letter;
      const val = q[field] || '';
      let newVal = val;
      
      // Detect if this is the correct answer slot
      const isCorrectSlot = (letter === q.CorrectChoice);
      
      // Pattern 1: Exact "This is the correct choice."
      if (val === 'This is the correct choice.') {
        if (isCorrectSlot) {
          newVal = '';
        } else {
          newVal = generateDistractorExplanation(q, letter, '');
        }
        ccCount++;
        qChanged = true;
      }
      // Pattern 2: Starts with "This is the correct choice" or leading colon/dot from partial fix
      else if (val.match(/^This is the correct choice/i) || val.match(/^:\s*/)) {
        const specific = stripCCPrefix(val);
        if (specific.length > 15) {
          newVal = specific;
        } else if (isCorrectSlot) {
          newVal = '';
        } else {
          newVal = generateDistractorExplanation(q, letter, val);
        }
        ccCount++;
        qChanged = true;
      }
      // Pattern 3: Fully generic "Plausible distractor: this choice misapplies..."
      else if (val.includes('Plausible distractor: this choice misapplies the concept')) {
        newVal = generateDistractorExplanation(q, letter, val);
        pdCount++;
        qChanged = true;
      }
      // Pattern 4: "Plausible distractor:" with custom content
      else if (val.match(/^Plausible distractor:/i)) {
        const specific = val.replace(/^Plausible distractor:\s*/i, '').trim();
        if (specific.length > 15 && !specific.includes('misapplies the concept')) {
          newVal = specific;
          pdCount++;
          qChanged = true;
        }
      }
      
      if (newVal !== val) {
        q[field] = newVal;
      }
    });
    
    if (qChanged) questionCount++;
  });
  
  // Serialize back
  const beforeArray = content.substring(0, varIdx);
  // Find where the variable declaration ends and array begins
  const beforeArrContent = content.substring(varIdx, arrStart);
  const afterArray = content.substring(arrEnd);
  
  const newArrayJson = JSON.stringify(questions, null, 2);
  const newContent = beforeArray + beforeArrContent + newArrayJson + afterArray;
  
  if (newContent !== originalContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    return { fixed: true, questions: questionCount, ccCount, pdCount };
  }
  
  return { fixed: false };
}

// ============================================================
// Main
// ============================================================
console.log('=== Sprint 5.9B — Explanation Enhancement Batch 1 v2 ===\n');

const PACKS = ['A', 'B', 'C', 'D', 'E'];
let totalQ = 0, totalCC = 0, totalPD = 0;

for (const p of PACKS) {
  const result = processPack(p);
  if (result.fixed) {
    console.log(`Pack ${p}: ${result.questions} questions, ${result.ccCount} CC fixes, ${result.pdCount} PD fixes`);
    totalQ += result.questions;
    totalCC += result.ccCount;
    totalPD += result.pdCount;
  } else {
    console.log(`Pack ${p}: No changes needed`);
  }
}

console.log(`\n=== Summary ===`);
console.log(`Questions improved: ${totalQ}`);
console.log(`"This is the correct choice" fixes: ${totalCC}`);
console.log(`"Plausible distractor" fixes: ${totalPD}`);
