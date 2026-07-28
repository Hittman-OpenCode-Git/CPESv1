// S269 precision timing — uses performance.now() for microsecond resolution
const path = require("path");
const fs = require("fs");
const { performance } = require("perf_hooks");
const ROOT = "C:/users/user/onedrive/desktop/cma_part_1_2026";

// Clean require — no cache for cold-start measurement
delete require.cache[require.resolve(path.join(ROOT, "scripts/admin_service_layer.js"))];
const admin = require(path.join(ROOT, "scripts/admin_service_layer.js"));

const results = [];

// Cold lookup: first call loads pack file + builds health index + reads registries
const t0cold = performance.now();
const coldResult = admin.lookupQuestion("P1-A-001");
const t1cold = performance.now();

results.push({ operation: "QID lookup (COLD — loads pack + health index + registries)", us: Math.round((t1cold - t0cold) * 1000), ms: (t1cold - t0cold).toFixed(3) });

// Warm lookups (pack cached, health index cached)
function measureWarm(label, fn) {
  // One warmup call
  fn();
  const t0 = performance.now();
  fn();
  const t1 = performance.now();
  const us = Math.round((t1 - t0) * 1000);
  results.push({ operation: label + " (warm)", us, ms: (t1 - t0).toFixed(3) });
}

measureWarm("QID lookup", () => admin.lookupQuestion("P1-A-002"));
measureWarm("Challenge lookup", () => admin.reviewChallenge("CH-CC1ECA89"));
measureWarm("Investigation lookup", () => admin.lookupInvestigation("INV-20260727-001"));
measureWarm("Session lookup", () => admin.lookupSession("3"));
measureWarm("Recommendation lookup", () => admin.reviewRecommendation("REC-61966733"));

// Full chain trace (warm)
function fullChain() {
  admin.lookupQuestion("P1-A-036");
  admin.reviewChallenge("CH-CC1ECA89");
  admin.lookupInvestigation("INV-20260727-001");
  admin.reviewRecommendation("REC-5B1E489D");
}
fullChain(); // warmup
const tFull0 = performance.now();
fullChain();
const tFull1 = performance.now();
results.push({ operation: "Full chain trace QID→CH→INV→REC (warm)", us: Math.round((tFull1 - tFull0) * 1000), ms: (tFull1 - tFull0).toFixed(3) });

// Dashboard summary
admin.getDashboardSummary(); // warmup
const tSum0 = performance.now();
admin.getDashboardSummary();
const tSum1 = performance.now();
results.push({ operation: "Dashboard summary (warm)", us: Math.round((tSum1 - tSum0) * 1000), ms: (tSum1 - tSum0).toFixed(3) });

// Dashboard rebuild
const tBld0 = performance.now();
admin.buildDashboardDataBundle();
const tBld1 = performance.now();
results.push({ operation: "Dashboard rebuild (2,540 QIDs)", ms: (tBld1 - tBld0).toFixed(0), rawMs: tBld1 - tBld0 });

// Also measure cold full chain (new module load — simulates fresh CLI invocation)
delete require.cache[require.resolve(path.join(ROOT, "scripts/admin_service_layer.js"))];
const admin2 = require(path.join(ROOT, "scripts/admin_service_layer.js"));
const tColdChain0 = performance.now();
admin2.lookupQuestion("P1-A-036");
admin2.reviewChallenge("CH-CC1ECA89");
admin2.lookupInvestigation("INV-20260727-001");
admin2.reviewRecommendation("REC-5B1E489D");
const tColdChain1 = performance.now();
results.push({ operation: "Full chain trace (COLD — fresh CLI invocation)", ms: (tColdChain1 - tColdChain0).toFixed(0), rawMs: tColdChain1 - tColdChain0 });

console.log(JSON.stringify(results, null, 2));
