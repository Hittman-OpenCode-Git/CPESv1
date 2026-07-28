const fs=require("fs");
let c=fs.readFileSync("scored_cases.js","utf8");
const ids=["CASE-A1","CASE-A-C1","CASE-A-D1","CASE-A2","CASE-A-C4","CASE-A-D5","CASE-A-C9","CASE-A-D10"];
let n=0;
for(const cid of ids){
  const re=new RegExp("(ItemID\":\s*\""+cid+"-Q\\d+\",[\\s\\S]{0,200}?)\"question_state\":\s*\"Unprocessed\"","g");
  c=c.replace(re,(m,p)=>{n++; return p+"\"question_state\": \"Certified\""});
  process.stdout.write(cid+" ");
}
console.log("\nItem-level changes: "+n);
fs.writeFileSync("scored_cases.js",c,"utf8");