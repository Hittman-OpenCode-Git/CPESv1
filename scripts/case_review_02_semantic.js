/**
 * Case Review 02 — Semantic Agreement Screen (READ-ONLY, 3 pack waves).
 *
 * One wave per live case pack (case_pack_1/2/3) — NOT per case.
 * DL-045 doctrine: screens produce CANDIDATES for human/LLM adjudication.
 * Nothing here judges correctness; every flag needs verbatim review + independent
 * derivation before any fix is authorized (DL-051 flow).
 *
 * Screens (case-schema adaptations of the DL-047 family):
 *  B-case  : select/multi — keyword recall of each choice vs Explanation;
 *            flag when best-recall choice != stored Correct (recall>=0.50, margin>=0.40).
 *  B-num   : numeric — stored Correct digits absent from Explanation.
 *  M-match : match — Correct value with no exact RightItems entry (DL-038 class).
 *  D-frag  : Explanation starts lowercase (misfiled-continuation candidate).
 *
 * Usage: node scripts/case_review_02_semantic.js [--pack <1|2|3>] [--json-out <path>]
 * Default runs all three waves.
 */
const fs = require("fs");
const path = require("path");
const config = require("./config");
const CaseExtractor = require("./lib/CaseExtractor");
const screens = require("./lib/semantic_screens");

const PACKS = {
  1: "content/cases/case_pack_1_corrected.js",
  2: "content/cases/case_pack_2_corrected.js",
  3: "content/cases/case_pack_3_corrected.js",
};

function digits(s) {
  return String(s === undefined || s === null ? "" : s).replace(/[^0-9.]/g, "");
}

function screenItem(file, caseId, it) {
  const flags = [];
  const expl = it.Explanation || "";
  const doc = screens.contentWords(expl);

  if ((it.Type === "select" || it.Type === "multi") && Array.isArray(it.Choices)) {
    const stored = Array.isArray(it.Correct) ? it.Correct : [it.Correct];
    const scored = it.Choices.map((ch) => ({ choice: ch, r: screens.recall(screens.contentWords(screens.leadPhrase(ch)), doc) }));
    scored.sort((a, b) => b.r - a.r);
    const best = scored[0];
    const second = scored[1] || { r: -1 };
    const inStored = stored.some((s) => s === best.choice);
    if (best && best.r >= 0.5 && best.r - second.r >= 0.4 && !inStored) {
      flags.push({ code: "B-CASE-ECHO", detail: `best-recall choice != stored Correct (best=${JSON.stringify(best.choice.slice(0, 80))} r=${best.r.toFixed(2)} stored=${JSON.stringify(stored[0]).slice(0, 80)})` });
    }
  }

  if (it.Type === "numeric") {
    const d = digits(it.Correct);
    const ed = digits(expl);
    if (d && !ed.includes(d) && !ed.includes(d.replace(".", ""))) {
      flags.push({ code: "B-NUM-ECHO", detail: `Correct digits ${d} absent from Explanation` });
    }
  }

  if (it.Type === "match" && it.Correct && typeof it.Correct === "object" && Array.isArray(it.RightItems)) {
    for (const [k, v] of Object.entries(it.Correct)) {
      if (!it.RightItems.includes(v)) {
        flags.push({ code: "MATCH_ORPHAN", detail: `Correct[${k}] has no exact RightItems entry (DL-038 class)` });
        break;
      }
    }
  }

  const t = expl.trim();
  if (t && t[0] === t[0].toLowerCase() && /[a-z]/.test(t[0])) {
    flags.push({ code: "D-FRAG", detail: "Explanation starts lowercase" });
  }
  return flags;
}

function runWave(packNum) {
  const rel = PACKS[packNum];
  const full = path.join(config.paths.root, rel);
  const cases = CaseExtractor.extractCases(full) || [];
  const flags = [];
  let items = 0;
  for (const c of cases) {
    for (const it of c.Items || []) {
      items += 1;
      for (const f of screenItem(rel, c.CaseID, it)) {
        flags.push({ pack: packNum, file: rel, caseId: c.CaseID, item: it.ItemID, type: it.Type, ...f });
      }
    }
  }
  return { pack: packNum, file: rel, cases: cases.length, items, flags };
}

function main() {
  const args = process.argv.slice(2);
  const pIdx = args.indexOf("--pack");
  const only = pIdx !== -1 ? [Number(args[pIdx + 1])] : [1, 2, 3];
  let jsonOut = path.join(config.paths.root, "scripts", "output", "case_review_02.json");
  const jIdx = args.indexOf("--json-out");
  if (jIdx !== -1 && args[jIdx + 1]) jsonOut = path.resolve(args[jIdx + 1]);

  const waves = only.map(runWave);
  const totalFlags = waves.reduce((n, w) => n + w.flags.length, 0);
  const outDir = path.dirname(jsonOut);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(jsonOut, JSON.stringify({ waves, note: "CANDIDATES only — adjudicate per DL-051 flow before any fix." }, null, 2));

  for (const w of waves) {
    console.log(`WAVE pack_${w.pack}: cases=${w.cases} items=${w.items} flags=${w.flags.length}`);
    const byCode = {};
    for (const f of w.flags) byCode[f.code] = (byCode[f.code] || 0) + 1;
    for (const [code, n] of Object.entries(byCode).sort()) console.log(`  ${code}: ${n}`);
    for (const f of w.flags.slice(0, 12)) console.log(`  - ${f.caseId} ${f.item}: ${f.code} — ${f.detail.slice(0, 140)}`);
    if (w.flags.length > 12) console.log(`  ... +${w.flags.length - 12} more (see artifact)`);
  }
  console.log(`Artifact: ${jsonOut} (total flags=${totalFlags})`);
}

main();
