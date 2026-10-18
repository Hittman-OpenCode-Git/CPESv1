# CANONICAL_TOOLCHAIN_INVENTORY.md

**Version:** 1.0
**Date:** 2026-09-23
**Authority:** PROJECT_CONSTITUTION.md, AGENTS.md §15, RUNTIME_CHANGE_CONTROL_POLICY.md
**Status:** Active — authoritative safe-path reference for maintainers

---

## 1. Purpose

The repository holds a large script population accumulated across authoring waves, audits, and one-shot migrations. This inventory defines the **single safe path** — the canonical commands a new maintainer runs — and classifies everything else so no one destructive-guesses.

**Measurement (2026-09-23, read-only):**
- `scripts/*.js` (top level): **655 files**
- `scripts/` recursive (all files): **1,774 entries** (includes validators, lib, output, backups, fixtures)
- `scripts/validators/*.js`: 12 files
- `app/may/` recursive: 40+ runtime files plus agent workers

### Classification of `scripts/*.js` by filename heuristic (2026-09-23)

| Class | Count | Definition |
|-------|-------|------------|
| canonical-or-gate | 17 | Matches canonical gate stems (preflight, baseline_coherence, validate, build/generate registry, dashboards, screens, semantic verifier, parity, smoke, thorough, guard/parser tests, model probe) |
| diagnostic | 168 | `test_*`, `verify_*`, `scan_*`, `check_*`, `audit_*`, `inspect_*`, `probe_*`, `census`, or name contains audit/scan/verify/check/inspect |
| one-shot-migration | 247 | `sNNN_*`, `session*`, `wave*`, `tier3_*`, `remediate_*`, `insert_wave*`, `rebuild_baselines*`, `regen_*`, `reclassify_*`, `rebalance_*`, `repair_*`, `rotate_*`, `renumber_*`, `splice_*`, `split_*` |
| scratch | 13 | `_*`, `temp_*`, `dbg*`, `dump_*` |
| unknown | 210 | None of the above — requires owner decision before use |

**Rule: no mass-delete or mass-move without a validated dependency map and explicit human approval.** One-shot scripts are history; diagnostics are read-only evidence tools; only §2 is the supported path.

---

## 2. Canonical Workflow (17 commands — the safe path)

| # | Command | Purpose | Inputs | Outputs | Mutation risk | Prerequisites | Validation required |
|---|---------|---------|--------|---------|---------------|---------------|---------------------|
| 1 | `npm run preflight` | T0 integrity: P1 QID counts, parse, Certified totals, guard tests, baseline coherence | content/packs, knowledge/CURRENT_BASELINES.md | console PASS/HALT + divergence list | **None (read-only)** | None | Must be 0 divergences before any write |
| 2 | `npm run preflight:p2` | P2 integrity: QID counts, parse, Part2OnlyFlag, case packs | p2/, p2/CURRENT_BASELINES_P2.md | console PASS/HALT | **None** | None | 0 divergences |
| 3 | `npm run preflight:all` | P1 + P2 preflight in sequence | both | console | **None** | None | 0/0 divergences |
| 4 | `node scripts/test_governance_guard.js` | 21-rule guard suite (101 tests) | .opencode/plugins/governance-guard.js | 101/101 PASS | **None** | None | 101/101 PASS |
| 5 | `node scripts/baseline_coherence.js` | Baseline hash/count/rule-table coherence (read-only default) | CURRENT_BASELINES.md + raw files | 0 divergences or DIVERGE list | **None** without `--fix` | Guard green | 0 divergences |
| 6 | `node scripts/baseline_coherence.js --fix` | **Authorized token-path recapture only** (hashes, sizes, counts, §4 table, footer) | Same + backup of both baseline docs | Rewritten baselines + `.bak-coherence-*` | **HIGH — rewrites governance docs** | Preflight green, pipeline green, human authorization, REVISION_HISTORY entry | Re-run coherence → 0 |
| 7 | `npm run validate` | Full P1+P2 validator suite (10 validators; 6,600 items) | content/, p2/, scripts/validators/ | ValidationReport.json, coverage_fingerprint.json, summaries | **None** (report-only) | None | 0 errors; warnings triaged per VALIDATOR_WARNING_GOVERNANCE_PLAN.md |
| 8 | `npm run validate:p2` | P2 schema validator | p2/ | console + report | **None** | None | 0 errors |
| 9 | `npm run case-screens` | Case semantic screens v3 (180 cases / 1,025 items) | content/cases, p2/case_pack_p2_* | scripts/output/case_semantic_flags.json | **None** | None | Stable flag count; no new key defects |
| 10 | `node scripts/semantic_key_verifier.js` | MCQ semantic key/explanation gate (5 screens, 6,600 items) | content/packs, p2/ | scripts/output/semantic_key_verifier.json | **None** | None | Exit 0; BLOCK 0 (REVIEW/WARN advisory only) |
| 11 | `npm run build-registry` | Registry rebuild (build + generate) | packs, cases | Registry artifacts | **MEDIUM — regenerates derived registries** | Validate green | Registry counts match preflight |
| 12 | `npm run dashboard` | Portfolio dashboard (S121 targets) | registry output | Dashboard artifacts | **LOW — derived output** | Registry built | No new coverage FAILs |
| 13 | `npm run pipeline` | Tend gate: validate → validate:p2 → case-screens → semantic verifier → build-registry → dashboard → baseline-coherence | all | GREEN or FAIL | **LOW — runs derived rebuilds** | All above green | Exit 0 |
| 14 | `npm run probe:parity` | Delivery/pipeline contract probe (Tier-1 Certified-only, blocklists, coverage) | packs, cases, manifests | console + coverage_summary | **None** | Baselines current | 0 divergences |
| 15 | `npm run smoke` | Playwright UI smoke (62 checks incl. W1-A/B/C/D integrity) | index_updated.html, app/, content/ | console PASS/FAIL | **None** | Packs loadable | All PASS |
| 16 | `node scripts/thorough_test.js` | Deep integrity regression (MCQ/case/mixed/full, corrupted restore) | Same as smoke | console PASS/FAIL | **None** | Smoke green | All PASS |
| 17 | `node scripts/test_pack_parser.js` | Canonical parser conformance (20 tests) | scripts/lib/pack_parser.js | 20/20 | **None** | None | 20/20 |

**Supporting (restricted):** `scripts/stamp_cert.js` (certification state flips — Full Governance Lane, Rule 5 batching, Rule 16 stamps, backup-before-write); `npm run probe-model` (token-budget probe; read-only unless `--apply`).

---

## 3. Explicitly Prohibited / Restricted Scripts

| Script or pattern | Restriction | Reason |
|-------------------|-------------|--------|
| `scripts/rebuild_baselines.js` (no `--legacy`) | **REFUSES to run** (deprecated 2026-09-20 C3) | Predates app/+content/ reorganization; use `baseline_coherence.js --fix` |
| `scripts/rebuild_baselines_s916.js`, `rebuild_baselines_s923.js` | **One-shot history — do not run** | Superseded snapshots |
| `insert_wave*.js`, `remediate_*.js`, `tier3_wave*.js`, `sXXX_*.js`, `session*.js`, `wave*.js` | **Do not run without wave authorization** | One-shot authoring/migration; re-running duplicates content or rewrites history |
| `_*`, `temp_*`, `dbg*`, `dump_*` | **Do not run in production lanes** | Scratch/debug; unaudited |
| Any script calling `fs.unlinkSync` / `Remove-Item` / `rm` / `del` | **Staged authorization per AGENTS.md §3.1** | Destructive; proposal + backup + explicit approval required |
| `baseline_coherence.js --fix` | **Human authorization + green gates + REVISION_HISTORY entry required** | Rewrites governance baselines |
| `stamp_cert.js` | **Full Governance Lane + Rule 5 (≤30) + Rule 16 stamps** | Flips certification state |

---

## 4. CI / Documentation / Dependency Mapping

| Canonical command | Referenced by |
|-------------------|---------------|
| `npm run preflight` | package.json; .github/workflows/ci.yml (preflight job); AGENTS.md §15; RUNTIME_CHANGE_CONTROL_POLICY.md §8 |
| `node scripts/test_governance_guard.js` | package.json (via preflight); ci.yml (governance job); AGENTS.md §1/§15 |
| `npm run validate` | package.json; ci.yml (validate job); CAQS audit workflow |
| `npm run build-registry` / `build-registry` | package.json; ci.yml (registry job, needs preflight+validate) |
| `npm run smoke` | package.json; .github/workflows/smoke.yml (weekly + dispatch) |
| CodeQL / Dependabot | .github/workflows/codeql.yml (weekly JS analysis); .github/dependabot.yml (weekly npm) — no required-check evidence available locally |
| `scripts/SESSION950_UNCERTAIN_SCRIPTS_INDEX.md` | Prior uncertain-script triage — consult before touching `unknown`-class scripts |

**Gap:** CI defines jobs but hosted branch-protection / required-check settings cannot be verified from the repo (see UNRESOLVED_HUMAN_ACTIONS.md O-02). Local gates are the enforced path.

---

## 5. New-Maintainer Quick-Start

```powershell
# 0. Read the operating contract
#    AGENTS.md → knowledge/CURRENT_BASELINES.md §2 → governance/RUNTIME_CHANGE_CONTROL_POLICY.md

# 1. T0 — integrity before anything
npm run preflight:all
node scripts/test_governance_guard.js

# 2. Read-only health
node scripts/baseline_coherence.js
npm run probe:parity

# 3. Runtime behavior (no flags enabled, no content touched)
npm run smoke

# 4. Content validation (report-only)
npm run validate
node scripts/semantic_key_verifier.js

# 5. Tend gate (only after authorized content work)
npm run pipeline

# 6. Never run: insert_wave*, remediate_*, tier3_*, sNNN_*, _*, rebuild_baselines*
#    Never pass --fix or --apply without human authorization.
#    Never delete or move scripts without dependency map + approval.
```

---

## 6. Residual Risk & Next Actions

- **210 `unknown`-class scripts** need owner triage (keep / archive-candidate / document). No action taken this session — mass archival explicitly prohibited without dependency map.
- **247 one-shot scripts** are retained as wave history per governance convention (Rule 8 session packages, REVISION_HISTORY traceability).
- **Next:** owner walkdown of `unknown` class in 30-item batches; results recorded here and in SESSION950 index.

---

**Inventory method:** filename-heuristic triage + package.json/CI/docs cross-reference. Counts are evidence, not adjudication — per-file disposition requires owner review.
