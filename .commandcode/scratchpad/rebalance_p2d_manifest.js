/**
 * rebalance_p2d_manifest.js — Deterministically rebalances each batch in
 * p2d_sprint_manifest.json to exact S121 mix targets while preserving
 * qid/topic/los/cc assignments.
 * Targets per 30-item batch:
 *   difficulty: Easy 4 / Moderate-Easy 6 / Moderate 9 / Difficult 8 / Very Difficult 3
 *   cognitive:  Remember 3 / Understand 6 / Apply 12 / Analyze 6 / Evaluate 3
 *   cc:         A 7 / B 8 / C 8 / D 7
 *   calc:       9 true / 21 false
 *   los:        D.1..D.5 = 6 each
 */
const fs = require("fs");
const path = require("path");
const MANIFEST = path.resolve(__dirname, "p2d_sprint_manifest.json");
const m = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));

const DIFF_ORDER = ["Easy", "Moderate-Easy", "Moderate", "Difficult", "Very Difficult"];
const CL_ORDER = ["Remember", "Understand", "Apply", "Analyze", "Evaluate"];
const WANT_DIFF = { "Easy": 4, "Moderate-Easy": 6, "Moderate": 9, "Difficult": 8, "Very Difficult": 3 };
const WANT_CL = { "Remember": 3, "Understand": 6, "Apply": 12, "Analyze": 6, "Evaluate": 3 };
const WANT_CC = { "A": 7, "B": 8, "C": 8, "D": 7 };
const WANT_LOS = { "D.1": 6, "D.2": 6, "D.3": 6, "D.4": 6, "D.5": 6 };

const DS = { "Easy": 1, "Moderate-Easy": 2, "Moderate": 3, "Difficult": 4, "Very Difficult": 5 };
const CL_DIFF_OK = {
  "Remember": ["Easy", "Moderate-Easy", "Moderate"],
  "Understand": ["Easy", "Moderate-Easy", "Moderate"],
  "Apply": ["Moderate-Easy", "Moderate", "Difficult"],
  "Analyze": ["Moderate", "Difficult"],
  "Evaluate": ["Difficult", "Very Difficult"]
};

function counts(slots, key) {
  const c = {};
  for (const s of slots) c[s[key]] = (c[s[key]] || 0) + 1;
  return c;
}

function setDiff(s, d) { s.difficulty = d; s.ds = DS[d]; }

function rebalance(slots) {
  // 1. Difficulty rebalance — allow any-jump moves when adjacency stalls
  const fixDiff = () => {
    let changed = true, guard = 0;
    while (changed && guard++ < 60) {
      changed = false;
      const d = counts(slots, "difficulty");
      const over = DIFF_ORDER.filter(k => d[k] > WANT_DIFF[k]);
      const under = DIFF_ORDER.filter(k => d[k] < WANT_DIFF[k]);
      if (!over.length || !under.length) break;
      for (const o of over) {
        for (const u of under) {
          const idx = slots.findIndex(s => s.difficulty === o && CL_DIFF_OK[s.cl].includes(u));
          if (idx === -1) continue;
          setDiff(slots[idx], u);
          changed = true;
          break;
        }
        if (changed) break;
      }
    }
  };
  fixDiff();

  // 2. Cognitive rebalance (respecting difficulty coherence)
  const fixCl = () => {
    let changed = true, guard = 0;
    while (changed && guard++ < 60) {
      changed = false;
      const c = counts(slots, "cl");
      const over = CL_ORDER.filter(k => c[k] > WANT_CL[k]);
      const under = CL_ORDER.filter(k => c[k] < WANT_CL[k]);
      if (!over.length || !under.length) break;
      for (const o of over) {
        for (const u of under) {
          const idx = slots.findIndex(s => s.cl === o && CL_DIFF_OK[u].includes(s.difficulty));
          if (idx === -1) continue;
          slots[idx].cl = u;
          changed = true;
          break;
        }
        if (changed) break;
      }
    }
  };
  fixCl();

  // 3. CC rebalance
  const fixCC = () => {
    let changed = true, guard = 0;
    while (changed && guard++ < 60) {
      changed = false;
      const c = counts(slots, "cc");
      const over = ["A", "B", "C", "D"].filter(k => c[k] > WANT_CC[k]);
      const under = ["A", "B", "C", "D"].filter(k => c[k] < WANT_CC[k]);
      if (!over.length || !under.length) break;
      for (const o of over) {
        for (const u of under) {
          const idx = slots.findIndex(s => s.cc === o);
          if (idx === -1) continue;
          slots[idx].cc = u;
          changed = true;
          break;
        }
        if (changed) break;
      }
    }
  };
  fixCC();

  // 4. LOS rebalance
  const fixLos = () => {
    let changed = true, guard = 0;
    while (changed && guard++ < 60) {
      changed = false;
      const c = counts(slots, "los");
      const over = ["D.1", "D.2", "D.3", "D.4", "D.5"].filter(k => c[k] > WANT_LOS[k]);
      const under = ["D.1", "D.2", "D.3", "D.4", "D.5"].filter(k => c[k] < WANT_LOS[k]);
      if (!over.length || !under.length) break;
      for (const o of over) {
        for (const u of under) {
          const idx = slots.findIndex(s => s.los === o);
          if (idx === -1) continue;
          slots[idx].los = u;
          changed = true;
          break;
        }
        if (changed) break;
      }
    }
  };
  fixLos();

  // 5. Calc rebalance (9 true / 21 false)
  let calcT = slots.filter(s => s.calc).length;
  let guard = 0;
  while (calcT < 9 && guard++ < 20) {
    const idx = slots.findIndex(s => !s.calc && (s.cl === "Apply" || s.cl === "Analyze") && (s.difficulty === "Moderate" || s.difficulty === "Difficult"));
    if (idx === -1) break;
    slots[idx].calc = true;
    calcT++;
  }
  while (calcT > 9 && guard++ < 20) {
    const idx = slots.findIndex(s => s.calc && (s.cl === "Remember" || s.cl === "Understand"));
    if (idx === -1) break;
    slots[idx].calc = false;
    calcT--;
  }

  // Final CC streak check: if any run >2, swap CC letters of a middle item to break it
  for (let i = 1; i < slots.length - 1; i++) {
    if (slots[i - 1].cc === slots[i].cc && slots[i].cc === slots[i + 1].cc) {
      const others = ["A", "B", "C", "D"].filter(L => L !== slots[i].cc);
      const pick = others.find(L => counts(slots, "cc")[L] < WANT_CC[L]) || others[0];
      slots[i].cc = pick;
    }
  }
  return slots;
}

let totalErr = 0;
for (const b of m.batches) {
  rebalance(b.slots);
  const d = counts(b.slots, "difficulty");
  const c = counts(b.slots, "cl");
  const cc = counts(b.slots, "cc");
  const los = counts(b.slots, "los");
  const calcT = b.slots.filter(s => s.calc).length;
  const okD = Object.keys(WANT_DIFF).every(k => d[k] === WANT_DIFF[k]);
  const okC = Object.keys(WANT_CL).every(k => c[k] === WANT_CL[k]);
  const okCC = Object.keys(WANT_CC).every(k => cc[k] === WANT_CC[k]);
  const okLos = Object.keys(WANT_LOS).every(k => los[k] === WANT_LOS[k]);
  const okCalc = calcT === 9;
  let coherent = true, maxStreak = 1, cur = 1;
  for (let i = 1; i < b.slots.length; i++) {
    if (b.slots[i].cc === b.slots[i - 1].cc) { cur++; if (cur > maxStreak) maxStreak = cur; } else cur = 1;
  }
  for (const s of b.slots) if (!CL_DIFF_OK[s.cl].includes(s.difficulty)) coherent = false;
  console.log(`Batch ${b.batch}: diff ${JSON.stringify(d)} | cog ${JSON.stringify(c)} | cc ${JSON.stringify(cc)} (streak ${maxStreak}) | calc ${calcT} | los ${JSON.stringify(los)}`);
  console.log(`  PASS flags: diff ${okD} cog ${okC} cc ${okCC} calc ${okCalc} los ${okLos} coherent ${coherent}`);
  if (!(okD && okC && okCC && okCalc && okLos && coherent && maxStreak <= 2)) totalErr++;
}
if (totalErr) { console.error(`\n${totalErr} batch(es) failed rebalance`); process.exit(1); }
fs.writeFileSync(MANIFEST, JSON.stringify(m, null, 2), "utf8");
console.log("\nManifest rebalanced and written.");
