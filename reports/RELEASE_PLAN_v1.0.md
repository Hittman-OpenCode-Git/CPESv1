# Release Plan v1.0 — Go-Live Gate

**Version:** 1.0  
**Status:** Draft  
**Authority:** CAQS §8 (Acceptance Criteria), AGENTS.md §15 (Workflow Helpers), §9.2 (Full Governance Lane), §18 (Third-Party Content Review Handoffs), §19 (Board-Approved Guidance)  
**Applies to:** Part 2 go-live release gate

---

## 1. Purpose

Define the one-command release gate for the Part 2 go-live, producing a versioned, hash-stamped release artifact. No `question_state` flip to Certified is final without a clean semantic-screen re-run (§9.2.1 Tend gate).

---

## 2. Release Gate (One Command)

`npm run release` executes, in order:

| Stage | Command | Fail Condition |
|-------|---------|----------------|
| T0 | `npm run preflight` | Any divergence, parse failure, certified-count mismatch |
| Gate 1 | `npm run pipeline` (validate → case-screens → build-registry → dashboard → baseline-coherence) | Any error; coverage-assertion WARNING gate |
| Gate 2 | `npm run probe:parity` | Any divergence in Tier-1 pools, blocklist enforcement, coverage |
| Gate 3 | `npm run case-screens` | New flags beyond documented false-positive set; confirmed key/explanation inversions |
| Gate 4 | `npm run smoke` | Any page error, missing MCQ bank, missing May coaching layer |
| Gate 5 | Governance guard suite (`npm run guard-tests`) | < 100% rule pass |
| Gate 6 | `npm run release-signoff` | Any missing G1–G7 owner signature |

All stages are read-only except signature capture. Exit non-zero on any failure; halt the release.

---

## 3. Release Artifact

On pass, the gate emits a versioned, hash-stamped release artifact:

`releases/RELEASE-v{SEMVER}-{YYYYMMDDHHMMSS}.json` containing:

| Field | Description |
|-------|-------------|
| `releaseVersion` | SemVer (major.minor.patch) |
| `releaseDate` | ISO 8601 UTC |
| `gitCommit` | Full SHA of release commit |
| `gitTreeHash` | Tree SHA |
| `fileHashes` | SHA-256 of every pack/case/source file |
| `certifiedCounts` | P1 MCQ, P2 MCQ, P1 case, P2 case counts |
| `blocklistSnapshot` | SHA-256 of the 3 blocklist manifests |
| `screenResult` | Case-screen flag count + FP set + genuine-inversion count |
| `gateResults` | Pass/fail per stage |
| `signoffs` | G1–G7 owner sign-off matrix |

Artifact is appended (never overwritten) to `releases/RELEASE_LOG.md`.

---

## 4. G1–G7 Owner Sign-Off Matrix (CAQS §8)

| Gate | Role | Owner | Sign-Off Required |
|------|------|-------|-------------------|
| G1 — Technical Review | Accountant | Accounting correctness, standard references, numerical integrity | ✓ |
| G2 — Psychometric Review | Psychometrician | Difficulty, Bloom's, distractor quality, bias check | ✓ |
| G3 — Numerical Validation | Validator | Independent recalculation, rounding, tolerance | ✓ |
| G4 — Instructional Review | Editor | Explanation quality, writing clarity, educational value | ✓ |
| G5 — Metadata Review | Validator | All required fields present and valid | ✓ |
| G6 — Final Validation | Validator | Automated suite: zero errors, no new warnings | ✓ |
| G7 — Approval | Release Manager | Final sign-off for production | ✓ |

No gate may be skipped. Sign-offs are captured in `releases/RELEASE-v{SEMVER}-{timestamp}.json` and countersigned in `knowledge/REVISION_HISTORY.md`.

---

## 5. S121 Portfolio Audit (§19.4-Type Portfolio Gate)

Before go-live, run `scripts/s121_portfolio_dashboard.js` and confirm:

- Difficulty distribution per pack within S121 targets (± tolerance)
- Cognitive-level distribution per domain within S121 targets
- Answer-position balance per section (each position ~25%)
- **No cognitive relabeling to fill distribution gaps** (Rule 12 / §17.1)
- §19.4 clone scan across ALL P2 packs: normalized numeric-literal multiset + Topic pairwise; identical = suspected rotation-clone, human review before archiving newer duplicate

Portfolio gaps are remediated by authoring new content, never by relabeling existing items.

---

## 6. Analytics-Instrumentation Readiness

Confirm the following fields exist and populate on delivery:

| Field | Purpose |
|-------|---------|
| `AverageTime` | Mean solve time |
| `CorrectPercentage` | Historical correct rate |
| `DiscriminationIndex` | Point-biserial correlation |
| `GuessRate` | Estimated guessing rate |
| `RevisionCount` | Number of revisions |
| `LastAuditDate` | Most recent review date |
| `LastReviewedBy` | Reviewer identity |

Instrumentation must not alter scoring or `CorrectChoice` (runtime AI never determines correctness, per CAQS §1.4).

---

## 7. Third-Party Handoff (§18) — Quarantined P2 Cases

The 9 Archived P2 cases (all in `p2/case_pack_p2_2.js`) plus any DL-047-family items remain excluded from delivery. If a third-party auditor reviews without repo access:

1. Split pack files >200KB into verbatim parts ≤40KB (~10K tokens).
2. Emit a part→QID manifest (QID ranges per part, part count, source SHA-256).
3. Prove no-gap/no-dup: concat of parts reproduces source byte-for-byte; record in handoff.
4. Direct reviewer to a control test: attach one part containing an already-verified item, confirm their tool finds it; then attach the disputed item's part.

Evidence hierarchy: chunked file parts (conclusive) > verbatim raw blocks > hand-pasted blocks > git hashes/line numbers alone (inadmissible).

---

## 8. Release Readiness Checklist

- [ ] `npm run preflight` PASS, 0 divergences
- [ ] `npm run pipeline` all gates green (incl. coverage-assertion)
- [ ] `npm run probe:parity` PASS, 0 divergences
- [ ] Case screens clean: zero new flags beyond documented FP set, zero confirmed inversions
- [ ] `npm run smoke` PASS (34+ checks, zero page errors)
- [ ] Governance guard suite 100% pass
- [ ] G1–G7 sign-offs captured
- [ ] S121 portfolio audit within targets
- [ ] §19.4 clone scan clean across all P2 packs
- [ ] Release artifact written and hash-stamped
- [ ] REVISION_HISTORY.md entry for the release

---

## Revision History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-10-18 | Release Plan | Initial go-live gate and release plan v1.0 |
