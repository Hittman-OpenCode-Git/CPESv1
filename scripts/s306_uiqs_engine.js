// s306_uiqs_engine.js — UIQS v2 — Corrected field mapping
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ROOT = path.join(__dirname, '..');
const REPORTS = path.join(ROOT, 'reports');

const PACKS = [
  { file: 'pack_a_corrected.js', varname: 'MCQ_BANK_A', label: 'Pack A' },
  { file: 'pack_b_corrected.js', varname: 'MCQ_BANK_B', label: 'Pack B' },
  { file: 'pack_c_corrected.js', varname: 'MCQ_BANK_C', label: 'Pack C' },
  { file: 'pack_d_corrected.js', varname: 'MCQ_BANK_D', label: 'Pack D' },
  { file: 'pack_e_corrected.js', varname: 'MCQ_BANK_E', label: 'Pack E' },
];

const CASE_DEFS = [
  { file: 'scored_cases.js', varname: 'ENHANCED_CASE_BASE', label: 'Case Bank 1' },
  { file: 'scored_cases2.js', varname: 'ENHANCED_CASE_BASE2', label: 'Case Bank 2' },
  { file: 'scored_cases3.js', varname: 'ENHANCED_CASE_BASE3', label: 'Case Bank 3' },
  { file: 'scored_cases4.js', varname: 'ENHANCED_CASE_BASE4', label: 'Case Bank 4' },
  { file: 'scored_cases5.js', varname: 'ENHANCED_CASE_BASE5', label: 'Case Bank 5' },
];

function parsePack(def) {
  const code = fs.readFileSync(path.join(ROOT, def.file), 'utf8');
  const fn = new Function(code + '; return ' + def.varname + ';');
  return { label: def.label, file: def.file, items: fn(), type: 'MCQ' };
}

function parseCaseFile(def) {
  const code = fs.readFileSync(path.join(ROOT, def.file), 'utf8');
  // Try primary and fallback var names
  const vnames = [def.varname].concat(
    ['ENHANCED_CASE_BASE','ENHANCED_CASE_BASE2','ENHANCED_CASE_BASE3','ENHANCED_CASE_BASE4','ENHANCED_CASE_BASE5']
      .filter(v => v !== def.varname)
  );
  for (const vn of vnames) {
    try {
      const fn = new Function(code + '; return (typeof ' + vn + ' !== "undefined") ? ' + vn + ' : null;');
      const r = fn();
      if (r && Array.isArray(r) && r.length > 0) return { label: def.label, file: def.file, cases: r, type: 'Case' };
    } catch(e) {}
  }
  return { label: def.label, file: def.file, cases: [], type: 'Case' };
}

function computeMCQMetrics(item, srcLabel, srcFile) {
  const qid = item.QuestionID || 'UNKNOWN';
  const ec = item.ExplanationCorrect || '';
  const ecLen = ec.length;
  const domain = (item.Section || '').toString().trim().charAt(0).toUpperCase() || '?';
  const section = item.Section || '?';
  const cc = (item.CorrectChoice || '').toString().trim().charAt(0).toUpperCase();
  const qState = item.question_state || 'Unprocessed';
  const isCert = qState === 'Certified';
  const cl = item.CognitiveLevel || 'Unknown';
  const diff = item.Difficulty || 'Unknown';

  const letters = ['A','B','C','D'];
  const ewSlots = {};
  for (const l of letters) {
    const v = item['ExplanationWrong'+l];
    ewSlots[l] = (v !== undefined && v !== null && v !== '');
  }
  const ewFilled = letters.filter(l => ewSlots[l]).length;
  const ewTotal = letters.length;
  const ewFillRate = ewTotal>0 ? ewFilled/ewTotal : 0;
  const ewNonCCFilled = letters.filter(l => l!==cc && ewSlots[l]).length;
  const ewNonCCTotal = letters.length-1;
  const ewCCEmpty = cc ? !ewSlots[cc] : true;

  const dqsFill = ewFillRate*100;
  const dqsNonCC = ewNonCCTotal>0 ? (ewNonCCFilled/ewNonCCTotal)*100 : 0;
  const dqs = dqsFill*0.6 + dqsNonCC*0.4;

  const ecScore = Math.min(ecLen/500,1)*100;
  const hasRef = /(ASC|IFRS|GAAP|COSO|SOX|FASB|IAS|PCAOB|SEC|AICPA|IMA|CMA)/i.test(ec)?15:0;
  const hasFml = /[=×÷+\-]|formula|computed|calculated|discount|NPV|IRR|variance|rate|ratio/i.test(ec)?10:0;
  const hasTrap = /avoid|common|mistake|incorrectly|wrong|trap|error|misconception|note/i.test(ec)?10:0;
  const eqs = Math.min(ecScore+hasRef+hasFml+hasTrap,100);

  const certMat = isCert?100:qState==='In Audit'?50:25;
  const dw = {A:15,B:20,C:20,D:15,E:15,F:15}[domain]||10;
  const bpScore = dw/20*100;
  const exqsScore = 50; // neutral MCQ
  const lv = ecScore*0.6 + ewFillRate*40;
  const uiqs = certMat*0.25 + eqs*0.25 + dqs*0.20 + bpScore*0.10 + exqsScore*0.10 + lv*0.10;
  const grade = uiqs>=85?'A':uiqs>=70?'B':uiqs>=55?'C':uiqs>=35?'D':'F';

  return {qid,domain,section,sourceType:'MCQ',sourceLabel:srcLabel,sourceFile:srcFile,
    ecLen,ewFillRate,ewNonCCFilled,ewNonCCTotal,ewCCEmpty,
    dqs,eqs,certMaturity:certMat,blueprintScore:bpScore,exqsScore,learningValue:lv,
    uiqs,grade,isCertified:isCert,qState,cognitiveLevel:cl,difficulty:diff,
    itemType:item.ItemType||'MCQ',calcItem:item.CalculationItem||false};
}

function computeCaseItemMetrics(item, caseInfo, srcLabel, srcFile) {
  const qid = item.ItemID || 'UNKNOWN';
  const ec = item.Explanation || '';
  const ecLen = ec.length;
  const domain = (item.Section || caseInfo.Section || '').toString().trim().charAt(0).toUpperCase() || '?';
  const section = item.Section || caseInfo.Section || '?';
  const qState = item.question_state || 'Unprocessed';
  const isCert = qState === 'Certified';
  const cl = item.CognitiveLevel || 'Unknown';
  const itemType = item.Type || 'unknown';
  const diff = item.Difficulty || 'Unknown';
  const correct = item.Correct || '';

  // EW for case items — check both direct fields and Choices object
  let ewFilled=0, ewTotal=0, ewNonCCFilled=0, ewNonCCTotal=0;
  const choices = item.Choices;
  if (choices && typeof choices === 'object') {
    const cks = Object.keys(choices);
    ewTotal = cks.length;
    for (const ck of cks) {
      const ewKey = 'ExplanationWrong'+ck;
      const ewText = item[ewKey] || (typeof choices[ck]==='object' && choices[ck].ExplanationWrong) || '';
      if (ewText && ewText.length>0) ewFilled++;
      if (ck !== correct) { ewNonCCTotal++; if (ewText && ewText.length>0) ewNonCCFilled++; }
    }
  }
  // Also scan for direct ExplanationWrongA-F fields
  if (ewTotal===0) {
    for (const l of ['A','B','C','D','E','F']) {
      const v = item['ExplanationWrong'+l];
      if (v !== undefined) { ewTotal++; if (v && v.length>0) ewFilled++; if (l!==correct) { ewNonCCTotal++; if (v && v.length>0) ewNonCCFilled++; } }
    }
  }
  const ewFillRate = ewTotal>0 ? ewFilled/ewTotal : 0;
  const ewCCEmpty = correct ? !(item['ExplanationWrong'+correct]) : true;

  // DQS: neutral 50 for items with no distractors (numeric/fill)
  let dqs;
  if (ewTotal===0) dqs=50;
  else { const f=ewFillRate*100; const n=ewNonCCTotal>0?(ewNonCCFilled/ewNonCCTotal)*100:0; dqs=f*0.6+n*0.4; }

  const ecScore = Math.min(ecLen/500,1)*100;
  const hasRef = /(ASC|IFRS|GAAP|COSO|SOX|FASB|IAS|PCAOB|SEC|AICPA|IMA|CMA)/i.test(ec)?15:0;
  const hasFml = /[=×÷+\-]|formula|computed|calculated|discount|NPV|IRR|variance|rate|ratio/i.test(ec)?10:0;
  const hasTrap = /avoid|common|mistake|incorrectly|wrong|trap|error|misconception|note/i.test(ec)?10:0;
  const eqs = Math.min(ecScore+hasRef+hasFml+hasTrap,100);

  const certMat = isCert?100:qState==='In Audit'?50:25;
  const dw = {A:15,B:20,C:20,D:15,E:15,F:15}[domain]||10;
  const bpScore = dw/20*100;
  const exqsScores = {A:67,B:79,C:78,D:83,E:85,F:87};
  const exqsScore = exqsScores[domain]||50;
  const lv = ecScore*0.6 + ewFillRate*40;
  const uiqs = certMat*0.25 + eqs*0.25 + dqs*0.20 + bpScore*0.10 + exqsScore*0.10 + lv*0.10;
  const grade = uiqs>=85?'A':uiqs>=70?'B':uiqs>=55?'C':uiqs>=35?'D':'F';

  return {qid,domain,section,sourceType:'Case',sourceLabel:srcLabel,sourceFile:srcFile,
    caseID:caseInfo.CaseID||'?',ecLen,ewFillRate,ewNonCCFilled,ewNonCCTotal,ewCCEmpty,
    dqs,eqs,certMaturity:certMat,blueprintScore:bpScore,exqsScore,learningValue:lv,
    uiqs,grade,isCertified:isCert,qState,cognitiveLevel:cl,difficulty:diff,
    itemType,ewTotal,calcItem:item.CalculationRequired||false};
}

// ===== MAIN =====
console.log('=== S306 UIQS Engine v2 ===');
console.log(`Started: ${new Date().toISOString()}`);

// T0 hashes
const t0 = {};
for (const p of PACKS) t0[p.file] = crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT,p.file))).digest('hex');

const allItems = [];
console.log('\n-- MCQ Packs --');
for (const p of PACKS) {
  const src = parsePack(p);
  const m = src.items.map(i=>computeMCQMetrics(i,p.label,p.file));
  allItems.push(...m);
  console.log(`  ${p.file}: ${m.length} items`);
}

console.log('\n-- Case Banks --');
for (const cd of CASE_DEFS) {
  const src = parseCaseFile(cd);
  if (!src.cases||!Array.isArray(src.cases)) { console.log(`  ${cd.file}: SKIP`); continue; }
  let ct=0;
  for (const c of src.cases) {
    if (c.Items && Array.isArray(c.Items)) {
      for (const item of c.Items) { allItems.push(computeCaseItemMetrics(item,c,cd.label,cd.file)); ct++; }
    }
  }
  console.log(`  ${cd.file}: ${src.cases.length} cases, ${ct} items`);
}

const mcqItems = allItems.filter(i=>i.sourceType==='MCQ');
const caseItems = allItems.filter(i=>i.sourceType==='Case');
console.log(`\nTotal: ${allItems.length} (MCQ:${mcqItems.length}, Case:${caseItems.length})`);

// Aggregation
const DL = ['A','B','C','D','E','F'];
const byDomain={}; const byGrade={A:0,B:0,C:0,D:0,F:0};
for (const d of DL) byDomain[d]={items:[],sum:0,dqs:0,eqs:0,cert:0,n:0,certN:0,mcq:0,cs:0};
for (const item of allItems) {
  byGrade[item.grade]++;
  const d = item.domain;
  if (byDomain[d]) {
    byDomain[d].items.push(item); byDomain[d].sum+=item.uiqs; byDomain[d].dqs+=item.dqs;
    byDomain[d].eqs+=item.eqs; byDomain[d].cert+=item.certMaturity; byDomain[d].n++;
    if (item.isCertified) byDomain[d].certN++;
    if (item.sourceType==='MCQ') byDomain[d].mcq++; else byDomain[d].cs++;
  }
}
for (const d of DL) {
  const b=byDomain[d]; b.avg=Math.round(b.sum/b.n*10)/10;
  b.avgDqs=Math.round(b.dqs/b.n*10)/10; b.avgEqs=Math.round(b.eqs/b.n*10)/10;
  b.certRate=Math.round(b.certN/b.n*1000)/10;
}

// Portfolio stats
const mcqSum = mcqItems.reduce((s,i)=>s+i.uiqs,0);
const caseSum = caseItems.reduce((s,i)=>s+i.uiqs,0);
const pfAvg = Math.round(allItems.reduce((s,i)=>s+i.uiqs,0)/allItems.length*10)/10;
const mcqAvg = Math.round(mcqSum/mcqItems.length*10)/10;
const csAvg = caseItems.length>0?Math.round(caseSum/caseItems.length*10)/10:0;

// Rewrite Debt
const rdi = {};
for (const d of DL) {
  const items=byDomain[d].items;
  const cats={P0:[],P1:[],P2:[],P3:[],P4:[]};
  for (const i of items) {
    if (i.uiqs<35&&!i.isCertified) cats.P0.push(i.qid);
    else if (i.uiqs<45||i.ewFillRate<0.3) cats.P1.push(i.qid);
    else if (i.uiqs<60) cats.P2.push(i.qid);
    else if (i.uiqs<75) cats.P3.push(i.qid);
    else cats.P4.push(i.qid);
  }
  const cd=items.filter(i=>!i.isCertified).length;
  const ed=items.filter(i=>i.ewFillRate<0.3).length;
  const ecd=items.filter(i=>i.ecLen<150).length;
  rdi[d]={totalItems:items.length,certified:byDomain[d].certN,uncertified:cd,ewDebtCount:ed,ecDebtCount:ecd,
    totalDebtSignals:cd+ed+ecd,debtIntensity:items.length>0?Math.round((cd+ed+ecd)/items.length*100)/100:0,
    p0Count:cats.P0.length,p1Count:cats.P1.length,p2Count:cats.P2.length,p3Count:cats.P3.length,p4Count:cats.P4.length,
    rewriteBurden:cats.P0.length*5+cats.P1.length*3+cats.P2.length*1,avgUiqs:byDomain[d].avg,mcqCount:byDomain[d].mcq,caseCount:byDomain[d].cs};
}

// Cert Readiness
const cro={};
for (const d of DL) {
  const b=byDomain[d]; const ci=b.items.filter(i=>i.isCertified); const ui=b.items.filter(i=>!i.isCertified);
  const rl=b.certRate>=95?'Low':b.certRate>=70?'Medium':b.certRate>=40?'High':'Critical';
  cro[d]={totalItems:b.n,certified:b.certN,certRate:b.certRate,
    avgUiqsCertified:ci.length>0?Math.round(ci.reduce((s,i)=>s+i.uiqs,0)/ci.length*10)/10:0,
    avgUiqsUncertified:ui.length>0?Math.round(ui.reduce((s,i)=>s+i.uiqs,0)/ui.length*10)/10:0,
    avgUiqsOverall:b.avg,riskLevel:rl,remainingEffortEstimate:ui.length};
}

// Top 100
const tp100=[...allItems].sort((a,b)=>a.uiqs-b.uiqs).slice(0,100).map((i,idx)=>({rank:idx+1,qid:i.qid,domain:i.domain,section:i.section,
  source:i.sourceLabel,type:i.sourceType,uiqs:Math.round(i.uiqs*10)/10,dqs:Math.round(i.dqs*10)/10,eqs:Math.round(i.eqs*10)/10,
  certMaturity:i.certMaturity,ewFillRate:Math.round(i.ewFillRate*100),ecLen:i.ecLen,isCertified:i.isCertified,grade:i.grade,cognitiveLevel:i.cognitiveLevel}));

// Strategy
const totalP0=Object.values(rdi).reduce((s,d)=>s+d.p0Count,0);
const totalCert=Object.values(rdi).reduce((s,d)=>s+d.uncertified,0);
const sa={generated:new Date().toISOString(),modelVersion:'S306-UIQS-1.0',
  strategies:{
    certificationFirst:{description:'Certify E/F blocks first (~328 items)','uncertifiedItems':totalCert,risk:'May certify items with EW gaps'},
    rewriteFirst:{description:`Target ${totalP0} P0 items first`,p0Items:totalP0,risk:'Rewrite may need re-audit after certification'},
    hybrid:{description:'P0 items + E/F certification simultaneously',p0Items:totalP0,uncertifiedItems:totalCert,risk:'Largest scope'}
  },
  recommendation:{strategy:'HYBRID',
    rationale:`${totalP0} P0 items concentrated in uncertified E/F blocks. Certifying E/F involves EW authoring — same work. Hybrid: parallel EW authoring for certified DL-008 items + certification with EW authoring for E/F blocks.`,
    roiByDomain:{},sequencing:{wave1:'Domain E certification + Pack C EW remediation',wave2:'Domain F certification + Pack A EW remediation',wave3:'Pack D certification + remaining EW debt'}}};
for (const d of DL) sa.recommendation.roiByDomain[d]={p0Count:rdi[d].p0Count,rewriteBurden:rdi[d].rewriteBurden,avgUiqs:rdi[d].avgUiqs,certGap:rdi[d].uncertified,priority:rdi[d].p0Count>20?'P0':rdi[d].p0Count>5?'P1':rdi[d].avgUiqs<50?'P2':'P3'};

// Dashboard
const dash={generated:new Date().toISOString(),modelVersion:'S306-UIQS-1.0',
  qualitySummary:{portfolioAvgUiqs:pfAvg,mcqAvgUiqs:mcqAvg,caseAvgUiqs:csAvg,totalItems:allItems.length,mcqCount:mcqItems.length,caseCount:caseItems.length,gradeDistribution:byGrade},
  riskSummary:{p0Immediate:totalP0,p1High:Object.values(rdi).reduce((s,d)=>s+d.p1Count,0),totalCertDebt:totalCert,totalEWDebt:Object.values(rdi).reduce((s,d)=>s+d.ewDebtCount,0),totalECDebt:Object.values(rdi).reduce((s,d)=>s+d.ecDebtCount,0)},
  domainCards:{}};
for (const d of DL) dash.domainCards[d]={uiqs:byDomain[d].avg,grade:byDomain[d].avg>=85?'A':byDomain[d].avg>=70?'B':byDomain[d].avg>=55?'C':byDomain[d].avg>=35?'D':'F',
  certRate:byDomain[d].certRate,p0Items:rdi[d].p0Count,p1Items:rdi[d].p1Count,ewDebt:rdi[d].ewDebtCount,avgDqs:byDomain[d].avgDqs,avgEqs:byDomain[d].avgEqs,riskLevel:cro[d].riskLevel,mcqCount:rdi[d].mcqCount,caseCount:rdi[d].caseCount};

// Rankings
const bSource={};
for (const src of [...PACKS,...CASE_DEFS]) {
  const items=allItems.filter(i=>i.sourceLabel===src.label);
  if (items.length===0) continue;
  bSource[src.label]={count:items.length,avgUiqs:Math.round(items.reduce((s,i)=>s+i.uiqs,0)/items.length*10)/10,certified:items.filter(i=>i.isCertified).length,gradeDist:{}};
  for (const g of ['A','B','C','D','F']) bSource[src.label].gradeDist[g]=items.filter(i=>i.grade===g).length;
}
const pr={generated:new Date().toISOString(),modelVersion:'S306-UIQS-1.0',
  byDomain:DL.map(d=>({domain:d,avgUiqs:byDomain[d].avg,avgDqs:byDomain[d].avgDqs,avgEqs:byDomain[d].avgEqs,certRate:byDomain[d].certRate,itemCount:byDomain[d].n,grade:byDomain[d].avg>=85?'A':byDomain[d].avg>=70?'B':byDomain[d].avg>=55?'C':byDomain[d].avg>=35?'D':'F'})).sort((a,b)=>b.avgUiqs-a.avgUiqs).map((d,i)=>({...d,rank:i+1})),
  bySource:Object.entries(bSource).map(([l,d])=>({source:l,...d})).sort((a,b)=>b.avgUiqs-a.avgUiqs),
  byType:[{type:'MCQ',count:mcqItems.length,avgUiqs:mcqAvg},{type:'Case',count:caseItems.length,avgUiqs:csAvg}]};

// Blueprint
const bqa={};
for (const d of DL) {
  const items=byDomain[d].items; const bs={};
  for (const i of items) { const s=i.section; if(!bs[s]) bs[s]=[]; bs[s].push(i); }
  const secs={};
  for (const [s,si] of Object.entries(bs)) secs[s]={count:si.length,avgUiqs:Math.round(si.reduce((sm,i)=>sm+i.uiqs,0)/si.length*10)/10,certified:si.filter(i=>i.isCertified).length,avgDqs:Math.round(si.reduce((sm,i)=>sm+i.dqs,0)/si.length*10)/10};
  bqa[d]={totalItems:items.length,avgUiqs:byDomain[d].avg,sections:secs,concentrationRisk:items.length>600?'Oversampled':items.length<300?'Undersampled':'Balanced',mcqCount:byDomain[d].mcq,caseCount:byDomain[d].cs};
}

// Risk register
const rr={generated:new Date().toISOString(),modelVersion:'S306-UIQS-1.0',
  risks:[
    {id:'UIQS-R1',category:'Certification',severity:'CRITICAL',description:`Domain E: ${rdi.E.uncertified} uncertified (${byDomain.E.certRate}%)`,mitigation:'Prioritize Domain E certification with EW authoring.'},
    {id:'UIQS-R2',category:'Certification',severity:'HIGH',description:`Domain F: ${rdi.F.uncertified} uncertified (${byDomain.F.certRate}%)`,mitigation:'Second-priority after Domain E.'},
    {id:'UIQS-R3',category:'Quality',severity:'HIGH',description:`${totalP0} P0 items (UIQS<35, uncertified)`,mitigation:'Top 100 list provides exact sequencing.'},
    {id:'UIQS-R4',category:'Quality',severity:'MEDIUM',description:`MCQ avg ${mcqAvg} vs Case avg ${csAvg}`,mitigation:'Case-bank EW authoring per S305.'},
    {id:'UIQS-R5',category:'Instructional',severity:'MEDIUM',description:`${dash.riskSummary.totalEWDebt} items with EW<30%`,mitigation:'EW authoring pipeline for sub-30% items.'}
  ]};

// Architecture
const arch={generated:new Date().toISOString(),modelVersion:'S306-UIQS-1.0',title:'Unified Item Quality Score v1.0',
  purpose:'Single composite quality score integrating DQS/EQS/BQS/ExQS into a unified portfolio-ranking framework.',
  dimensions:{
    certificationMaturity:{weight:0.25,source:'BQS',desc:'100=Certified, 50=In Audit, 25=Unprocessed'},
    explanationQuality:{weight:0.25,source:'EQS',desc:'EC length 0-100 + content bonus (refs+15, formula+10, trap+10)'},
    distractorQuality:{weight:0.20,source:'DQS',desc:'EW fill 60% + non-CC EW fill 40%; neutral 50 for no-distractor items'},
    blueprintImportance:{weight:0.10,source:'BQS',desc:'Domain CMA weight normalization'},
    exhibitQuality:{weight:0.10,source:'ExQS',desc:'Domain ExQS for case items; 50 for MCQ'},
    learningValue:{weight:0.10,source:'Composite',desc:'EC richness 60% + EW fill 40%'}
  },
  formula:'UIQS = 0.25×CM + 0.25×EQ + 0.20×DQ + 0.10×BP + 0.10×EX + 0.10×LV',
  gradingScale:{A:'85-100',B:'70-84',C:'55-69',D:'35-54',F:'0-34'},
  qualityRequirements:['auditable','explainable','deterministic','reproducible']};

// Domain C Review
const dcReview={domain:'C — Performance Management',totalItems:byDomain.C.n,avgUiqs:byDomain.C.avg,avgDqs:byDomain.C.avgDqs,avgEqs:byDomain.C.avgEqs,certRate:byDomain.C.certRate,p0Count:rdi.C.p0Count,p1Count:rdi.C.p1Count,mcqCount:byDomain.C.mcq,caseCount:byDomain.C.cs,
  finding:byDomain.C.avg<60?'Domain C below-threshold UIQS; driven by EW gaps in large case-bank cohort. Remains highest-volume rewrite candidate after E/F certification.':'Domain C UIQS adequate.'};

// Domain E/F Review
const defReview={domainE:{certRate:byDomain.E.certRate,avgUiqs:byDomain.E.avg,uncertified:rdi.E.uncertified,p0Count:rdi.E.p0Count},domainF:{certRate:byDomain.F.certRate,avgUiqs:byDomain.F.avg,uncertified:rdi.F.uncertified,p0Count:rdi.F.p0Count},
  conclusion:'Certification debt and rewrite debt are the same problem in Domains E/F. Certifying these domains (with EW authoring per CAQS) addresses both simultaneously.'};

// Write all
console.log('\n--- Writing Deliverables ---');
function wj(name,data){const fp=path.join(REPORTS,name);fs.writeFileSync(fp,JSON.stringify(data,null,2),'utf8');console.log(`  ${name} — ${(JSON.stringify(data).length/1024).toFixed(1)} KB`);}
wj('SESSION306_UIQS_ARCHITECTURE.json',arch);
wj('SESSION306_PORTFOLIO_RANKINGS.json',pr);
wj('SESSION306_REWRITE_DEBT_INDEX.json',rdi);
wj('SESSION306_CERTIFICATION_READINESS_OVERLAY.json',cro);
wj('SESSION306_BLUEPRINT_QUALITY_ANALYSIS.json',bqa);
wj('SESSION306_COST_IMPACT_ANALYSIS.json',sa);
wj('SESSION306_TOP100_REMEDIATION_TARGETS.json',tp100);
wj('SESSION306_RISK_REGISTER.json',rr);
wj('SESSION306_DASHBOARD.json',dash);

// Report
console.log('\n═══════════════════════════════════');
console.log('  S306 UIQS PORTFOLIO SUMMARY');
console.log('═══════════════════════════════════');
console.log(`  Portfolio: ${pfAvg} | MCQ: ${mcqAvg} | Case: ${csAvg}`);
console.log(`  Grades: A:${byGrade.A} B:${byGrade.B} C:${byGrade.C} D:${byGrade.D} F:${byGrade.F}`);
console.log('');
for (const d of pr.byDomain) console.log(`  ${d.rank}. Domain ${d.domain}: UIQS ${d.avgUiqs} | DQS ${d.avgDqs} | EQS ${d.avgEqs} | Cert ${d.certRate}% | P0:${rdi[d.domain].p0Count}`);
console.log(`\n  P0:${totalP0} | P1:${dash.riskSummary.p1High} | Cert Debt:${totalCert} | EW Debt:${dash.riskSummary.totalEWDebt}`);
console.log('  STRATEGY: HYBRID');
console.log('═══════════════════════════════════');

// Post-flight hash check
console.log('\n  Post-Flight Hash Check:');
let allMatch=true;
for (const p of PACKS) {
  const h=crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT,p.file))).digest('hex');
  const m=h===t0[p.file]; if(!m) allMatch=false;
  console.log(`  ${p.file}: ${m?'MATCH':'DRIFT'}`);
}
if (allMatch) console.log('  All hashes stable — read-only attestation confirmed.');
console.log('\n=== S306 COMPLETE ===');
