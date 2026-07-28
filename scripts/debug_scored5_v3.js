const fs=require('fs');
const c=fs.readFileSync('C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/scored_cases5.js','utf8');
const re = /const\s+\w+\s*=\s*\[/;
const m=c.match(re);
let depth=1, inStr=false, esc=false, failed=false;
for(let i=m.index+m[0].length; i<c.length; i++){
  const ch=c[i];
  if(!inStr && ch==='"'){inStr=true; continue}
  if(inStr && esc){esc=false; continue}
  if(inStr && ch==='\\'){esc=true; continue}
  if(inStr && ch==='"'){inStr=false; continue}
  if(inStr) continue;
  if(ch==='[') depth++;
  else if(ch===']'){
    depth--;
    if(depth===0){
      console.log('Closing ] at pos',i,'context:',JSON.stringify(c.substring(i-3,i+60)));
      // Verify it's correct
      console.log('Content after: [',c.substring(i+1,i+30),']');
      break;
    }
    if(depth<0){console.log('DEPTH WENT NEGATIVE at',i); failed=true; break;}
  }
}
console.log('Final depth:',depth);
if(!failed){
  // Also check approach: just find ];
  const semiIdx = c.indexOf('];', m.index);
  console.log('Simple indexOf ]; at:', semiIdx);
}
