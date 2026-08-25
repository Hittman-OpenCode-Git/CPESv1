#!/usr/bin/env node
/**
 * model_limit_probe.js — Dynamic agent/model token-budget probe (P2-052).
 *
 * Purpose (AGENTS.md §14): replace static output/context limits that may harm
 * content production with measured recommendations derived from:
 *   1. The runtime provider configuration (opencode.json)
 *   2. Live probing of the local Ollama endpoint when reachable (/api/tags,
 *      /api/show) for each model's REAL maximum context window
 *   3. Agent-level model bindings (.opencode/agent/*.md frontmatter)
 *   4. Empirical per-item emission demand measured from p2/pack_p2_[a-f].js,
 *      projected to P2_SCHEMA_STANDARD v1.1 via an overhead factor
 *
 * Modes:
 *   (default)     Report-only. Exit 0 = capacity adequate, 1 = undersized.
 *   --apply       Backs up opencode.json to backups/, then writes recommended
 *                 limits into the declared provider models (clamped to each
 *                 model's probed maximum context when available).
 *
 * This script never deletes files and never edits pack content. Read-only on
 * packs; writes only opencode.json and only under --apply with backup.
 */

"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OPENCODE_JSON = path.join(ROOT, "opencode.json");
const BACKUP_DIR = path.join(ROOT, "backups");
const AGENT_DIR = path.join(ROOT, ".opencode", "agent");
const P2_PACK_RE = /^pack_p2_[a-f]\.js$/;

/** v1.0 -> v1.1 evidence-package projection factor (source_support_for_key x4,
 *  distractor_intent x3, uniqueness_note, source_ids, hold_reason). Calibrated
 *  2026-08-24 against P2_SCHEMA_STANDARD v1.1 field inventory. */
const V11_OVERHEAD_FACTOR = 2.0;
/** Safety margin applied to the projected p98 item before recommending. */
const SAFETY_MARGIN = 1.25;
/** Token estimate: chars per token for CMA-style English JSON prose. */
const CHARS_PER_TOKEN = 4;
/** Prompt-side overhead allowance (SKILL.md + style guide + catalog excerpt). */
const PROMPT_OVERHEAD_TOKENS = 8192;

function readJson(p) { return JSON.parse(fs.readFileSync(p, "utf8")); }
function roundUpTo(n, step) { return Math.ceil(n / step) * step; }

// ── 1. Static configuration ────────────────────────────────────────────────
function loadConfig() {
  const cfg = readJson(OPENCODE_JSON);
  const providers = [];
  for (const [pid, prov] of Object.entries(cfg.provider || {})) {
    for (const [mid, meta] of Object.entries((prov && prov.models) || {})) {
      providers.push({
        provider: pid,
        model: mid,
        name: (meta && meta.name) || mid,
        baseURL: (prov && prov.options && prov.options.baseURL) || null,
        context: (meta && meta.limit && meta.limit.context) || null,
        output: (meta && meta.limit && meta.limit.output) || null,
      });
    }
  }
  return { cfg, providers };
}

// ── 2. Agent-level model bindings ──────────────────────────────────────────
function scanAgentBindings() {
  const out = [];
  if (!fs.existsSync(AGENT_DIR)) return out;
  for (const f of fs.readdirSync(AGENT_DIR).filter(n => n.endsWith(".md"))) {
    const head = fs.readFileSync(path.join(AGENT_DIR, f), "utf8").slice(0, 800);
    const m = head.match(/^model:\s*(.+)$/m);
    if (m) out.push({ agent: f.replace(/\.md$/, ""), model: m[1].trim() });
  }
  return out;
}

// ── 3. Live Ollama probe ───────────────────────────────────────────────────
async function probeOllama(baseURL) {
  const result = { reachable: false, models: {} };
  if (!baseURL) return result;
  try {
    const tags = await fetch(baseURL.replace(/\/v1\/?$/, "") + "/api/tags", { signal: AbortSignal.timeout(4000) });
    if (!tags.ok) return result;
    result.reachable = true;
    const list = (await tags.json()).models || [];
    for (const m of list) {
      try {
        const show = await fetch(baseURL.replace(/\/v1\/?$/, "") + "/api/show",
          { method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: m.name }), signal: AbortSignal.timeout(6000) });
        if (!show.ok) continue;
        const info = await show.json();
        let ctx = null;
        for (const [k, v] of Object.entries(info.model_info || {})) {
          if (/context_length$/.test(k)) { ctx = v; break; }
        }
        result.models[m.name] = { maxContext: ctx };
      } catch (_) { /* per-model probe failure is non-fatal */ }
    }
  } catch (_) { /* server unreachable */ }
  return result;
}

// ── 4. Empirical item-demand measurement ───────────────────────────────────
function measureItemDemand() {
  const p2Dir = path.join(ROOT, "p2");
  const sizes = [];
  for (const f of fs.readdirSync(p2Dir).filter(n => P2_PACK_RE.test(n))) {
    const src = fs.readFileSync(path.join(p2Dir, f), "utf8");
    const decl = src.match(/(?:const|let|var)\s+(pack_p2_[a-f]_questions)\s*=\s*\[/);
    if (!decl) continue;
    try {
      const items = new Function(src + "; return " + decl[1] + ";")();
      for (const q of items) sizes.push(JSON.stringify(q).length);
    } catch (e) {
      console.warn(`  WARN: could not evaluate ${f}: ${e.message}`);
    }
  }
  if (!sizes.length) return null;
  sizes.sort((a, b) => a - b);
  const pct = p => sizes[Math.min(sizes.length - 1, Math.floor(sizes.length * p))];
  return {
    items: sizes.length,
    medianTokens: Math.round(pct(0.5) / CHARS_PER_TOKEN),
    p90Tokens: Math.round(pct(0.9) / CHARS_PER_TOKEN),
    p98Tokens: Math.round(pct(0.98) / CHARS_PER_TOKEN),
    maxTokens: Math.round(sizes[sizes.length - 1] / CHARS_PER_TOKEN),
  };
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const apply = process.argv.includes("--apply");
  console.log("=== MODEL LIMIT PROBE ===");
  const { cfg, providers } = loadConfig();
  const bindings = scanAgentBindings();
  const demand = measureItemDemand();

  // Demand projection
  let requiredOutput = null;
  if (demand) {
    const p98v11 = Math.ceil(demand.p98Tokens * V11_OVERHEAD_FACTOR);
    requiredOutput = roundUpTo(Math.ceil(p98v11 * SAFETY_MARGIN), 512);
    console.log(`\nEmpirical demand (${demand.items} P2 items):`);
    console.log(`  v1.0 tokens  median/p90/p98/max: ${demand.medianTokens}/${demand.p90Tokens}/${demand.p98Tokens}/${demand.maxTokens}`);
    console.log(`  v1.1 projected p98 (x${V11_OVERHEAD_FACTOR}): ${p98v11} tok`);
    console.log(`  REQUIRED output budget (x${SAFETY_MARGIN} safety): ${requiredOutput} tok`);
    console.log(`  REQUIRED context floor (prompt ${PROMPT_OVERHEAD_TOKENS} + output): ${PROMPT_OVERHEAD_TOKENS + requiredOutput} tok`);
  } else {
    console.log("\nWARN: no P2 packs measurable; skipping demand projection.");
  }

  if (bindings.length) {
    console.log("\nAgent-level model bindings:");
    for (const b of bindings) console.log(`  ${b.agent} -> ${b.model}`);
  } else {
    console.log("\nAgent bindings: none declared (agents inherit runtime default).");
  }

  let undersized = [];
  for (const p of providers) {
    const live = await probeOllama(p.baseURL);
    const liveEntry = live.models[p.model];
    const verdict = [];
    let recOutput = p.output, recContext = p.context;

    if (requiredOutput) {
      if (!p.output || p.output < requiredOutput) {
        verdict.push(`OUTPUT UNDERSTATED (declared ${p.output || "none"} < required ${requiredOutput})`);
        recOutput = requiredOutput;
      }
      const needCtx = PROMPT_OVERHEAD_TOKENS + requiredOutput;
      if (!p.context || p.context < needCtx) {
        verdict.push(`CONTEXT UNDERSTATED (declared ${p.context || "none"} < required ${needCtx})`);
        recContext = needCtx;
      }
    }
    if (live.reachable && liveEntry && liveEntry.maxContext) {
      verdict.push(`live max context: ${liveEntry.maxContext}`);
      if (recContext > liveEntry.maxContext) {
        verdict.push(`recommendation clamped to live max ${liveEntry.maxContext}`);
        recContext = liveEntry.maxContext;
        if (recOutput > Math.floor(liveEntry.maxContext - PROMPT_OVERHEAD_TOKENS)) {
          recOutput = Math.floor(liveEntry.maxContext - PROMPT_OVERHEAD_TOKENS);
          verdict.push(`output clamped to ${recOutput} (live max minus prompt overhead)`);
        }
      }
    } else if (p.baseURL && !live.reachable) {
      verdict.push("provider endpoint UNREACHABLE (limits unverified live)");
    }

    console.log(`\n${p.provider}/${p.model} (${p.name}):`);
    console.log(`  declared: context=${p.context} output=${p.output}`);
    console.log(`  status: ${verdict.length ? verdict.join("; ") : "ADEQUATE"}`);
    if (verdict.some(v => v.includes("UNDERSTATED"))) {
      console.log(`  recommended: context=${recContext} output=${recOutput}`);
      undersized.push({ ...p, recContext, recOutput });
    }
  }

  if (!undersized.length) {
    console.log("\nRESULT: PASS — all declared limits meet projected v1.1 demand.");
    return 0;
  }

  if (apply) {
    const ts = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
    if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
    const bak = path.join(BACKUP_DIR, `opencode.json.bak-modelprobe-${ts}`);
    fs.copyFileSync(OPENCODE_JSON, bak);
    if (fs.statSync(bak).size === 0) { console.error("Backup failed; aborting apply."); return 2; }
    for (const u of undersized) {
      const pm = cfg.provider[u.provider].models[u.model];
      pm.limit = pm.limit || {};
      pm.limit.output = u.recOutput;
      pm.limit.context = u.recContext;
    }
    fs.writeFileSync(OPENCODE_JSON, JSON.stringify(cfg, null, 2) + "\n");
    console.log(`\nAPPLIED: ${undersized.length} model(s) updated. Backup: ${bak}`);
    console.log("NOTE: restart OpenCode sessions to pick up new limits.");
    return 0;
  }

  console.log("\nRESULT: UNDERSIZED — run with --apply to write recommended limits (backup taken automatically).");
  return 1;
}

main().then(c => process.exit(c)).catch(e => { console.error(e); process.exit(2); });
