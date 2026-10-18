var fs=require("fs")
var PACKS={a:"content/packs/pack_a_corrected.js",b:"content/packs/pack_b_corrected.js",c:"content/packs/pack_c_corrected.js",d:"content/packs/pack_d_corrected.js",e:"content/packs/pack_e_corrected.js"}
var allAbs=[];var distr=[];var corr=[]
Object.keys(PACKS).forEach(function(k){var s=fs.readFileSync(PACKS[k],"utf8")
var arr;try{arr=JSON.parse(s.replace(/^.*=s*\[|\];\s*$/,"[","g"))}catch(e){return}
arr.forEach(function(q){if(!q.Choices)return;var cc=String(q.CorrectChoice||"").toUpperCase()
["A","B","C","D"].forEach(function(L){if(!q.Choices[L])return
if(/\\b(always|never|impossible)\\b/i.test(String(q.Choices[L]))){allAbs.push({qid:q.QuestionID,pack:k,choice:L,cc:cc,isCC:L===cc})
if(L===cc)corr.push(q.QuestionID);else distr.push(q.QuestionID)}})}})})
console.log("Total abs: "+allAbs.length+" Distractor: "+distr.length+" CorrectAns: "+corr.length)
var uq={};distr.forEach(function(q){if(!uq[q])uq[q]=0;uq[q]++});console.log("Unique distractor DL-003: "+Object.keys(uq).length);Object.keys(uq).sort().forEach(function(q){console.log(q)})
;var cq={};corr.forEach(function(q){if(!cq[q])cq[q]=0;cq[q]++});console.log("Unique correct-answer: "+Object.keys(cq).length);Object.keys(cq).sort().forEach(function(q){console.log(q)})
