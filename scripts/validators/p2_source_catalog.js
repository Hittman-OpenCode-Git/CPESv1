"use strict";
/**
 * P2 Approved Source Catalog — v1.1 (P2-050, 2026-08-24)
 *
 * The single allowlist for `source_ids` and `source_support_for_key.source_id`
 * on Part 2 items (P2_SCHEMA_STANDARD.md §1.1). Resolution is by catalog
 * membership, not formatting — a string must match a registered formula ID
 * (P2005_FORMULA_MASTER.json) or a curated P2 authority registry pattern
 * (mirrors P2002_CERTIFICATION_STANDARD.md §D.2/D.5 and §E.2 authority tables).
 *
 * Usage:  const { resolveSource } = require("./p2_source_catalog");
 *         resolveSource("DA-08: Incremental decision rule") -> { matched: true, kind: "formula", note: "..." }
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");

// ── Formula IDs (P2005_FORMULA_MASTER.json) ─────────────────────────────
const FORMULA_IDS = new Set();
try {
  const reg = JSON.parse(
    fs.readFileSync(path.join(ROOT, "p2", "P2005_FORMULA_MASTER.json"), "utf8")
  );
  for (const d of Object.values(reg.domains || {})) {
    for (const f of d.formulas || []) {
      if (f && typeof f.id === "string") FORMULA_IDS.add(f.id.trim().toUpperCase());
    }
  }
} catch (e) {
  // Catalog is degraded (missing registry); resolution will return unknown.
  FORMULA_IDS._loadError = e.message;
}

// ── P2 Authority Registry (curated from P2002_CERTIFICATION_STANDARD.md) ──
const AUTHORITY_PATTERNS = [
  /^ASC \d{3}(-\d{2}(-\d{2})?)?$/i,
  /^COSO ERM 2017( Principle \d{1,2})?$/i,
  /^COSO IC 2013$/i,
  /^IMA (Statement of Ethical Professional Practice|Ethics Standard [IVX]{1,4} \([A-Za-z ]+\)|SMA on relevant costing)$/i,
  /^SOX (Title [IVX]+|§\d{3}|\d{3})$/i,
  /^FCPA( 1977| anti-bribery)?$/i,
  /^CAPM$/i,
  /^Modigliani-Miller( Proposition [IVX]+)?$/i,
  /^IRS Publication 946$/i,
  /^MACRS$/i,
  /^Black-Scholes( \(qualitative\))?$/i,
  /^Basel III( \(capital adequacy\))?$/i,
  /^SEC Regulation (G|X|K|S|FD)$/i,
  /^SEC Staff Accounting Bulletin( \(\S+\))?$/i,
  /^UK Bribery Act( 2010)?$/i,
  /^NPV (rule|theory)$/i,
  /^IRR (rule|theory)$/i,
  /^Payback (rule|theory)$/i,
  /^Capital budgeting theory$/i,
  /^Managerial (economics|accounting theory)$/i,
  /^Financial statement analysis principles( — .+)?$/i,
];

/**
 * Resolve a source id against the approved catalog.
 * @param {*} rawId
 * @returns {{matched:boolean, kind:string, note:string}}
 */
function resolveSource(rawId) {
  if (typeof rawId !== "string" || rawId.trim() === "") {
    return { matched: false, kind: "empty", note: "empty source id" };
  }
  const t = rawId.trim();
  const up = t.toUpperCase();
  if (FORMULA_IDS.has(up)) {
    return { matched: true, kind: "formula", note: "formula ID in P2005_FORMULA_MASTER.json" };
  }
  const lead = up.match(/^([A-Z]{2}-\d{2,3})\b/);
  if (lead && FORMULA_IDS.has(lead[1])) {
    return { matched: true, kind: "formula", note: "formula ID prefix '" + lead[1] + "'" };
  }
  for (const re of AUTHORITY_PATTERNS) {
    if (re.test(t)) {
      return { matched: true, kind: "authority", note: "P2 authority registry" };
    }
  }
  return { matched: false, kind: "unknown", note: "not in formula registry or authority registry" };
}

module.exports = { resolveSource, FORMULA_IDS, AUTHORITY_PATTERNS };
