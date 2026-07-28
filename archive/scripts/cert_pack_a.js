const fs=require("fs");
let c=fs.readFileSync("pack_a_corrected.js","utf8");
const beforeUnp=(c.match(/"question_state":\s*"Unprocessed"/g)||[]).length;
const beforeCert=(c.match(/"question_state":\s*"Certified"/g)||[]).length;
console.log("Before: cert="+beforeCert+" unp="+beforeUnp);

// Phase 1: Certify Sections D and F (confirmed clean, zero DL-013)
// Also check Section B and C for DL-013 boilerplate
const skipB=new Set();
const skipC=new Set();
const dl013=new RegExp("represents a plausible misconception|does not align with the correct|Option [A-D] is incorrect\\. Under");
const sRE=/"Section":\s*"[B-D,F]","[\s\S]{0,300}?"QuestionID":\s*"([^"]+)",[\s\S]{0,300}?"question_state":\s*"Unprocessed"/g;
let m;
const stats={B:{total:0,skip:0},C:{total:0,skip:0},D:{total:0,skip:0},F:{total:0,skip:0}};
const qidRE=/?/"QuestionID":\s*"([^"]+)"/;
while((m=sRE.exec(c))!==null){
  const qid=m[1];
  const sec=qid.match(/P1-([B-F])-/)?.[1]||"";
  const ctx=c.slice(Math.max(0,m.index-1500),m.index+800);
  stats[sec].total++;
  if(dl013.test(ctx)){stats[sec].skip++; if(sec==="B")skipB.add(qid); if(sec==="C")skipC.add(qid);}
}
console.log("Section B: "+stats.B.total+" unp, "+stats.B.skip+" DL-013");
console.log("Section C: "+stats.C.total+" unp, "+stats.C.skip+" DL-013");
console.log("Section D: "+stats.D.total+" unp, "+stats.D.skip+" DL-013");
console.log("Section F: "+stats.F.total+" unp, "+stats.F.skip+" DL-013");

// Phase 2: Replace Unprocessed→Certified for clean items only
let total=0;
c=c.replace(/"question_state":\s*"Unprocessed"/g,(match,offset)=>{
  const ctx=c.slice(Math.max(0,offset-1200),offset);
  const qm=ctx.match(/"QuestionID":\s*"([^"]+)"/);
  if(!qm) return match;
  const qid=qm[1];
  if(skipB.has(qid)||skipC.has(qid)){
    return match; // skip DL-013 items
  }
  total++;
  return '"question_state": "Certified"';
});

const afterCert=(c.match(/"question_state":\s*"Certified"/g)||[]).length;
const afterUnp=(c.match(/"question_state":\s*"Unprocessed"/g)||[]).length;
console.log("After: cert="+afterCert+" unp="+afterUnp);
console.log("Changes: "+total);

fs.writeFileSync("pack_a_corrected.js",c,"utf8");
