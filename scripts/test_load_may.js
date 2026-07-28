// Simulate browser app.js load and test May integration
const fs=require("fs");

// 1. Load all the browser scripts to validate syntax
const scripts=[
  "may-learner-state.js","governance/defect_manifest.js",
  "governance/delivery_blocklist.js","may-core.js","app.js"
];

console.log("=== SCRIPT LOAD CHECK ===");
for(const s of scripts){
  try{
    const c=fs.readFileSync(s,"utf8");
    // Check for syntax errors
    new Function(c+"/*noop*/");
    console.log("OK: "+s+" ("+Math.round(c.length/1024)+"KB)");
  }catch(e){
    console.log("FAIL: "+s+" - "+e.message.slice(0,80));
  }
}

// 2. Check May exports
console.log("\n=== MAY API SURFACE ===");
const mc=fs.readFileSync("may-core.js","utf8");
const funcs=mc.match(/class May|May\s*=\s*\{|this\.\w+\s*=\s*function|May\.\w+\s*=\s*function|function May/g)||[];
console.log("May patterns found: "+funcs.length);

const methods=["renderView","startSessionReview","recordAttempt",
  "generateRecommendations","getExplanationFor","isBlockedQID",
  "getHint","getMiniHint","getConfidenceCheck","formatScore",
  "surfaceMisconception","resolveChallenge"];
for(const m of methods){
  if(mc.includes(m)) console.log("  Found: May."+m);
}
