const fs=require('fs');
const c=fs.readFileSync('C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/scored_cases2.js','utf8');
const re=/const\s+\w+\s*=\s*\[/;const m=c.match(re);
const arrText=c.substring(m.index+m[0].length,c.indexOf('];',m.index)+2);
const cases=[];let depth=0,inStr=false,esc=false,start=-1;
for(let i=0;i<arrText.length;i++){const ch=arrText[i];if(!inStr&&ch==='"'){inStr=true;continue}if(inStr&&esc){esc=false;continue}if(inStr&&ch==='\\'){esc=true;continue}if(inStr&&ch==='"'){inStr=false;continue}if(inStr)continue;if(ch==='{'){depth++;if(depth===1)start=i}else if(ch==='}'){depth--;if(depth===0&&start>=0){cases.push(arrText.substring(start,i+1));start=-1}}}
const a2= cases.find(x=>x.includes('"CBQ2-A2"'));
// Search for CompanyName in full case text
const cnRe=/"CompanyName"\s*:\s*"(?:[^"\\]|\\.)*"/g;
let m2,found=false;
while((m2=cnRe.exec(a2))!==null){console.log('Found CompanyName at pos',m2.index,'value:',m2[0]);found=true}
if(!found)console.log('CompanyName NOT FOUND in CBQ2-A2');
// Also check Stakeholder
const shRe=/"Stakeholder"\s*:\s*"(?:[^"\\]|\\.)*"/g;
found=false;
while((m2=shRe.exec(a2))!==null){console.log('Found Stakeholder at pos',m2.index,'value:',m2[0]);found=true}
if(!found)console.log('Stakeholder NOT FOUND in CBQ2-A2');
