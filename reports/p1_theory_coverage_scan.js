const fs = require('fs');
const path = require('path');
const base = path.join(__dirname, '..', 'content', 'packs');
const casebase = path.join(__dirname, '..', 'content', 'cases');
const pfiles = ['pack_a_corrected.js','pack_b_corrected.js','pack_c_corrected.js','pack_d_corrected.js','pack_e_corrected.js'];
const cfiles = ['case_pack_1_corrected.js','case_pack_2_corrected.js','case_pack_3_corrected.js'];

function loadPack(fn, dir){
  const src = fs.readFileSync(path.join(dir, fn), 'utf8');
  const m = src.match(/(?:var|const|let)\s+(\w+)\s*=\s*(\[[\s\S]*\])\s*;/);
  if(!m) return [];
  return eval('(' + m[2] + ')');
}

let all = [];
for(const fn of pfiles) all.push(...loadPack(fn, base));
for(const fn of cfiles) all.push(...loadPack(fn, casebase));

function fieldBlob(o){
  return [
    o.Section, o.SectionName, o.Topic, o.MicroTopic, o.LOSTag, o.Stem,
    o.ExplanationCorrect, o.ExplanationWrongA, o.ExplanationWrongB,
    o.ExplanationWrongC, o.ExplanationWrongD
  ].join(' ').toLowerCase();
}

// Group 1: theory keywords -> which section they should belong to. We count occurrences across MCQ bank.
const theories = {
  'A. Revenue recognition (ASC 606 5-step)': ['revenue recognition','performance obligation','asc 606','step model'],
  'A. Inventory cost flow (FIFO/LIFO/weighted-avg)': ['fifo','lifo','weighted-average','weighted average','cost flow'],
  'A. LCM / lower of cost or market': ['lower of cost','lcm ','lower-of-cost'],
  'A. Depreciation methods': ['straight-line','accelerated','units-of-production','double-declining','declining balance'],
  'A. Impairment (ASC 360)': ['impairment','recoverable amount','asc 360'],
  'A. Lease accounting (ASC 842)': ['lease','asc 842','right-of-use','operating lease','finance lease'],
  'A. Bond effective-interest amortization': ['effective interest','bond amort','amortization of discount','amortization of premium','discount on bond','premium on bond'],
  'A. Equity method / consolidation / goodwill': ['equity method','consolidat','goodwill','acquisition method','business combination'],
  'A. Cash flow statement (indirect/direct)': ['statement of cash flows','operating activities','indirect method','direct method','cash flow'],
  'A. EPS (basic/diluted)': ['earnings per share','basic eps','diluted eps','treasury method','if-converted'],
  'B. Strategic planning frameworks (SWOT/PESTLE/Porter)': ['swot','pestle','pest ','porter','five forces','five-forces'],
  'B. Master/operating/financial budget sequencing': ['master budget','operating budget','financial budget','production budget','cash budget','direct materials','direct labor'],
  'B. ZBB / ABB / rolling forecasts / continuous budgeting': ['zero-based','activity-based budget','rolling forecast','continuous budget'],
  'B. Forecasting: regression/least-squares': ['regression','least squares','least-squares','r-squared','r squared','coefficient of determination'],
  'B. Forecasting: time series (moving avg, exp smoothing, seasonality, trend)': ['moving average','exponential smoothing','seasonal','time series','trend analysis'],
  'B. Forecasting: Delphi/naive/causal': ['delphi','naive forecast','causal model','leading indicator'],
  'B. Learning curve theory': ['learning curve','cumulative average','80% learning','incremental unit','experience curve'],
  'B. Flexible budget variance': ['flexible budget','flexible-budget','volume variance','sales-volume','static budget'],
  'B. Capacity concepts': ['theoretical capacity','practical capacity','normal capacity','expected capacity','unused capacity'],
  'C. Standard costing & variance framework': ['standard cost','price variance','quantity variance','rate variance','efficiency variance'],
  'C. Four-way overhead variance analysis': ['four-way','4-way','overhead variance','variable overhead','fixed overhead','spending variance','efficiency variance','volume variance'],
  'C. Sales variances (mix/market share)': ['sales mix variance','market share variance','market size variance','sales price variance','sales volume variance'],
  'C. Responsibility centers': ['responsibility center','cost center','revenue center','profit center','investment center'],
  'C. ROI/RI/EVA + DuPont decomposition': ['return on investment','residual income','economic value added','eva ','dupont','asset turnover','profit margin'],
  'C. Transfer pricing (market/cost/negotiated/dual/goal congruence)': ['transfer pric','general transfer','dual-rate','goal congruence','multinational transfer'],
  'C. Balanced Scorecard (4 perspectives/strategy map)': ['balanced scorecard','leadership perspective','lagging indicator','leading indicator','strategy map','four perspectives','customer perspective','learning and growth'],
  'C. Benchmarking types/process': ['benchmark','best practice'],
  'C. Management by exception / control limits': ['management by exception','control limit','statistical control','variance investigation'],
  'D. Cost behavior (fixed/var/mixed/step/relevant range)': ['cost behavior','relevant range','mixed cost','step cost','fixed cost','variable cost'],
  'D. Cost estimation (high-low/regression/engineering/scatter)': ['high-low','cost estimation','scatter','account analysis','engineering approach'],
  'D. Job order vs process costing (WA/FIFO equiv units)': ['job order','job costing','process costing','equivalent units','weighted-average method','fifo method','transferred-in'],
  'D. Activity-based costing (pools/drivers/hierarchy)': ['activity-based','activity based','cost driver','cost pool','abc cost','cost hierarchy'],
  'D. Joint products/byproducts (physical/sales value/NRV)': ['joint cost','joint product','byproduct','split-off','relative sales value','nrv method'],
  'D. Service dept allocation (direct/step-down/reciprocal)': ['service department','direct method','step-down','reciprocal method','reciprocal allocation'],
  'D. Overhead application (plantwide/departmental/multiple)': ['predetermined overhead','plantwide','departmental overhead','applied overhead','underapplied','overapplied'],
  'D. Absorption vs variable vs throughput costing': ['absorption costing','variable costing','throughput costing','inventoriable'],
  'D. CVP (breakeven/target profit/MOS/operating leverage/multi-product)': ['break-even','breakeven','contribution margin','margin of safety','degree of operating leverage','target profit','multi-product','multi product'],
  'D. Relevant/differential costing (make-or-buy/special/keep-drop/sell-process)': ['relevant cost','differential','make-or-buy','special order','keep-or-drop','sell-or-process','opportunity cost','sunk cost'],
  'D. Theory of Constraints / throughput accounting': ['theory of constraints','bottleneck','constraint','throughput accounting','drum-buffer-rope','drum buffer rope'],
  'E. COSO IC 2013 (5 components)': ['coso','control environment','risk assessment','control activities','monitoring','information and communication'],
  'E. COSO ERM (2017)': ['enterprise risk','erm ','risk appetite','risk tolerance'],
  'E. Segregation of duties / control activities': ['segregation of duties','segregation of duty','authorization','independent verification','reconciliation','physical control'],
  'E. Fraud triangle (Cressey) / fraud prevention-detection': ['fraud triangle','fraud','pressured','rationaliz','opportunity'],
  'E. SOX (302/404) / ICFR / audit committee': ['sarbanes','sox','icfr','audit committee','section 302','section 404'],
  'E. Three lines of defense / internal audit': ['three lines','internal audit','line of defense'],
  'E. IT general vs application controls / cybersecurity CIA': ['it general','application control','general control','cybersecurity','confidentiality','integrity','availability','cia triad'],
  'F. Information systems / ERP lifecycle': ['erp','information system','systems development','systems lifecycle','sdlc'],
  'F. Data governance / data quality dimensions': ['data governance','data quality','data mining','master data'],
  'F. Data analytics types (descriptive/diagnostic/predictive/prescriptive)': ['descriptive analytic','diagnostic analytic','predictive analytic','prescriptive analytic','data analytics'],
  'F. AI / Machine Learning / RPA': ['machine learning','artificial intelligence','robotic','rpa','neural'],
  'F. Cloud computing risks / blockchain': ['cloud comput','blockchain','distributed ledger'],
  'F. Privacy regs (GDPR/CCPA)': ['gdpr','ccpa','privacy regulation','data protection'],
};

const results = [];
for(const [name, kws] of Object.entries(theories)){
  let count = 0;
  for(const o of all){
    const blob = fieldBlob(o);
    if(kws.some(k => blob.includes(k))) count++;
  }
  results.push({theory: name, hits: count});
}

console.log('THEORY COVERAGE SCAN (keyword hits across all P1 items incl. cases)');
console.log('Total items scanned:', all.length);
console.log('');
results.sort((a,b)=>a.hits-b.hits).forEach(r=>{
  console.log(String(r.hits).padStart(4), ' ', r.theory);
});

const out = {totalItems: all.length, results};
fs.writeFileSync(path.join(__dirname,'p1_theory_coverage_out.json'), JSON.stringify(out,null,2));
console.log('\nWROTE p1_theory_coverage_out.json');
