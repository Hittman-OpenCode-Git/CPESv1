# README — Part 2 Certification Review Package

**Package:** p2_cert_review_20260824
**Produced:** 2026-08-24
**Scope:** All Part 2 content authored in sessions P2-053..P2-057 that is NOT yet Certified — **75 MCQs + 12 case studies (90 case items)**.
**Chunk discipline:** every file ≤40,000 bytes (AGENTS.md §18.2), verbatim JSON extracted from source packs, no paraphrase.

---

## 1. Package inventory

| Path | Contents |
|------|----------|
| `chunks/MCQ_A_176-183.json` | Pack A items 176–183 (8) |
| `chunks/MCQ_A_184-190.json` | Pack A items 184–190 (7) |
| `chunks/MCQ_C_141-148.json` … `MCQ_C_194-200.json` | Pack C items 141–200 in eight ≤8-item chunks (60) |
| `chunks/CASES_p2_1_CBQ21-A1_D1.json` | Liquidity covenant renewal (A) + Launch risk register (D) |
| `chunks/CASES_p2_1_CBQ21-B2_E2.json` | Financing the expansion (B) + Unequal-lives replacement (E) |
| `chunks/CASES_p2_2_CBQ22-B1_F1.json` | Peak-season financing (B) + Overstated quarter ethics (F) |
| `chunks/CASES_p2_2_CBQ22-A2_D2.json` | Quality of earnings (A) + Vendor breach response (D) |
| `chunks/CASES_p2_3_CBQ23-C1_E1.json` | Make-or-buy under constraint (C) + Automation NPV (E) |
| `chunks/CASES_p2_3_CBQ23-C2_F2.json` | Full-capacity order negotiation (C) + Branch misappropriation governance (F) |
| `ANSWER_KEYS.md` | Auto-generated keys per item (MCQ letters; case numeric/select answers) |
| `GOVERNANCE.md` | Certification requirements, evidence already performed, flags, state-flip mechanics |
| `MANIFEST.md` | Per-file bytes, SHA256, ID coverage, gap/dup proof, source-pack hashes |
| `manifest_data.json` | Machine-readable manifest |
| `provenance/extract_generator.js` | Exact script that produced these chunks from the source packs |

## 2. Reviewer quick start (no repo access needed)

1. **Control test first (§18.4):** attach any chunk and search a literal ID it contains (e.g., `P2-C-172`). Your tool must find it. If a literal-ID search returns unrelated content, your index is semantic — request re-chunking rather than drawing conclusions. A passing control makes every negative finding in that chunk trustworthy.
2. **Review order:** read `GOVERNANCE.md` §1–2 (what certification requires), then work chunks, then record verdicts.
3. **Answer verification:** solve from each stem independently, then compare against `ANSWER_KEYS.md`. Every calc answer was derived from formulas in `foundation/FORMULA_MASTER_P2.md` (FA/RM/DA/ID references are printed on the items).

## 3. Integrity verification (for the repo owner)

```powershell
Get-FileHash reports\review_packages\p2_cert_review_20260824\chunks\*.json -Algorithm SHA256
# Compare against MANIFEST.md sha column. Any mismatch = package tampering or stale copy.
```

Source-pack SHA256s at extraction time are recorded per row in `MANIFEST.md` (`sourceSha`) so the exact source state can be re-verified later.

## 4. Completeness proof (embedded in MANIFEST.md)

For MCQ ranges: every expected QID was located in its source pack, exactly once, with zero missing and zero duplicates before chunking (`gap/dup proof: PASS`). Cases were matched by CaseID against the live pack files.

## 5. Out of scope

Content authored by other sessions (including their uncertified tails in every pack), already-Certified items (none of THIS package's content is Certified — verified at extraction), and case-pack app wiring (separate task).
