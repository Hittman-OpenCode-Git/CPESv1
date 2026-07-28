const fs=require('fs');
const d=require('C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/reports/certification/SESSION059_BLOCKER_MATRIX.json');

// The one non-certified case
const nc = d.blocker_classification.find(x=>x.caseID==='CBQ5-A2');
console.log('CBQ5-A2 (ONLY non-certified case):');
console.log(JSON.stringify(nc,null,2));

// Get breakdown by file
console.log('\n\n=== BREAKDOWN BY FILE ===');
for(const fn of ['scored_cases.js','scored_cases2.js','scored_cases3.js','scored_cases4.js','scored_cases5.js']){
  const fr=d.blocker_classification.filter(x=>x.file===fn);
  const byClass={};
  fr.forEach(x=>{byClass[x.overall_blocker_class]=(byClass[x.overall_blocker_class]||0)+1});
  console.log(fn+' ('+fr.length+' cases): '+JSON.stringify(byClass));
}

// Stakeholder-specific breakdown
console.log('\n\n=== STAKEHOLDER FIELD STATUS ===');
const stakeFields=['CompanyName','Stakeholder','BusinessFunction','Industry','CompanyType'];
for(const f of stakeFields){
  const missing=d.blocker_classification.filter(x=>x.details.stakeholder.some(s=>s.includes(f)));
  console.log(f+': missing in '+missing.length+' cases');
  if(missing.length>0&&missing.length<10) missing.forEach(x=>console.log('  '+x.caseID+' ('+x.file+')'));
}

// Metadata: ProductionStatus contradiction
console.log('\n=== ProductionStatus CONTRADICTION (Draft + all items Certified) ===');
const contra=d.blocker_classification.filter(x=>x.details.metadata.some(m=>m.includes('CONTRADICTION')));
console.log(contra.length+' cases');
contra.forEach(x=>console.log('  '+x.caseID+' ('+x.file+')'));

// DL-032
console.log('\n=== DL-032 (uniform Moderate difficulty) ===');
const dl032=d.blocker_classification.filter(x=>x.details.progression.some(p=>p.includes('DL-032')));
console.log(dl032.length+' cases');
if(dl032.length<=20) dl032.forEach(x=>console.log('  '+x.caseID+' ('+x.file+')'));
