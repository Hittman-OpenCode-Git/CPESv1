# CERTIFICATION REVIEW VERDICT — p2_cert_review_20260824

**Reviewer:** Build-time AI certifier session (2026-08-24)
**Method:** Package integrity verification → independent solve of every item (solve-before-key protocol, parallel solver agents + direct reviewer recomputation) → raw-JSON dual verification of every defect claim → GOVERNANCE §5 flag resolution.
**Read-only:** No pack file was modified. No `question_state` flipped.

---

## 1. Verdict: **HOLD — 3 blockers must clear before any state flip**

All 147 answer keys are CORRECT as stored (75/75 MCQ, 72/72 case items independently reproduced — zero key errors). The content is structurally clean (EW[CC] empty on all MCQs; non-CC slots choice-specific; no DL-008/013/026/037 signatures; Part2OnlyFlag true; QID formats clean). Three defects block certification under CAQS §1.6/§8.3.

## 2. Package integrity — PASS

| Check | Result |
|-------|--------|
| Chunk SHA256 vs MANIFEST | 16/16 exact |
| Byte counts vs MANIFEST | 16/16 exact |
| Item counts | 75 MCQ (15 A + 60 C) ✓; case chunks 6 × 12 items = **72** ✓ |
| Gap/dup | Per-chunk QuestionID counts match manifest exactly; no duplicates found |
| Source packs re-hashed post-extraction | All 5 prefixes match MANIFEST (`82BA56C169583D9E`, `09D80B15D9C4EAB5`, `8C5A4ACEA29FA27D`, `D3819A20A1A0ED58`, `51B1127042CBB8F6`) — chunks are verbatim current-state extractions |

### Documentation count errors in this package (fix the docs, not the data)
- README §scope says "**90 case items**" → actual **72** (12 cases × 6).
- GOVERNANCE §1 scope says "**36 case items**" → actual **72**.
- ANSWER_KEYS.md (12 × 6 = 72) and MANIFEST are correct.

## 3. Answer-key verification — 147/147 MATCH

Every item solved from stem/exhibits before consulting the stored key.
Highlights re-verified digit-for-digit by two independent passes: P2-C-155 Laplace (10.00 / 10.67 / 8.67 → S2; cross-checked against maximax/maximin/minimax-regret), P2-C-162 elasticity markup (33.3% on VC; distractor A = margin-on-price confusion — exemplary), CBQ21-E2 unequal-lives chain (667,054 / 231,899 / 268,233 within ±$500), CBQ23-E1 NPV 49,170±$1,000 (true ≈49,175), CBQ23-C2 full-capacity chain (20,400 / 32,000 / −11,600 / 74.67).

## 4. BLOCKERS (certification prohibited until fixed)

| # | Item | Defect | Evidence |
|---|------|--------|----------|
| B1 | **P2-C-187** | D2 failure — keyed answer is assumption-dependent. Stem never states what happens to overflow beyond the 400-pallet reserved block in the 800-pallet scenario. Keyed EC prices only capped usage ($8,000 + 200×12×$3 = $15,200 < $16,800 → RESERVE). Under the equally natural reading (excess rents ad hoc at $5): 15,200 + 0.2×400×12×5 = **$20,000 > $16,800 → AD HOC wins, key flips to A**. Two defensible answers = CAQS Dim-2 fail. | Raw JSON verified; both computations reproduce. FIX: add one clause ("overflow beyond the block can be rented ad hoc at $5" OR "demand beyond the block is turned away at no cost"), then confirm/re-key accordingly. |
| B2 | **P2-C-151** | Propagated arithmetic error: dropping sacrifice printed as **$110K**, correct value **$70K** (= $140K avoidable − $120K printer CM − $90K accessory CM; equivalently keep preserves −20K + 90K = +70K). The wrong figure appears in Choices.C, ExplanationCorrect, EWA, EWB (4 fields). The item's own VerifiedChecks line ("−20K standalone plus 90K accessories lost -> keep") computes $70K and refutes the printed number. Stored CC=C (KEEP) remains uniquely correct. | Raw JSON verified. FIX: $110K → $70K in all four fields. |
| B3 | **P2-C-181 ≡ P2-C-199** and **P2-C-185 ≡ P2-C-198** | Rotation clones inside one certification batch (DL-012-class). Confirmed by direct comparison: identical parameters/topics/distractor VALUE SETS with letter-rotated keys — cost-plus-fixed-fee ($80K lobbying exclusion, $1.2M base, 7% → $1,284,000; CC C→B) and break-even market share ($6.4M/$16/2M market → 20%; CC C→A). Certifying both injects duplicate measurement into the pool. | Raw JSON verified. FIX: retire one of each pair (or materially re-parameterize one — new scenario numbers, not just rotation). Survivor keys unaffected. |

## 5. WARNs (repair in the same editorial wave, before or at flip)

**Numeric-integrity in explanations/distractors (keys unaffected unless noted):**
1. P2-C-166 — mixed-baseline differential: "−25K vs −100K, better by 75K" excludes unavoidable fixed on one side only. Same-baseline: operate −85 vs shut −100 → **better by $15K** (incremental: −25 vs −40). Fix Choice C text + EC + EWA/EWB echo + VerifiedChecks line. Key C (OPERATE) stays correct.
2. P2-C-188 — EC contradiction: "$47 is 28.1% measured against the $200 list base" (47/200 = 23.5%). 28.1% is vs pocket price $167 (matches VerifiedChecks). Fix sentence; key stands.
3. P2-C-172 — distractor C "$165,000" unconstructible (all-units-at-$40 path yields $135,000). Fix to $135,000.
4. P2-C-181 & P2-C-199 — distractor A "$1,364,000" mislabeled: padded-base fee = 1,280,000×1.07 = **$1,369,600**; printed figure = 1,284,000+80,000 (different error than labeled). Fix both survivors' choice A (or drop with clone retirement).
5. P2-A-176 — distractor D "8.33%" contradicts its own EW (reciprocal mechanism yields 12.5% / 8.0×). Fix to "8.0%".
6. P2-A-186 — premise mechanically impossible: ITM options cannot raise diluted EPS above basic (treasury-stock method always adds shares); option antidilution doesn't occur. Swap fact pattern to convertible bonds. Key C survives.
7. P2-C-153 — distractor D "$8.00/hr" fabricated (B's true hourly = $15.00); EWD derivation narrative broken ("A produces 0.95 salable units per hour" — it's per 2 hours). Fix both.
8. P2-C-147 — distractor A "$60,000" has no construction path (~$74,800). Re-anchor trap.
9. P2-C-156 — EWC false claim: "no fixed-cost pool divides by $12 to yield 15,000" — the top tier's $180,000 does exactly that (confirmed by EWD itself). Rewrite EWC to describe the real misconception.
10. P2-C-174 — EWB false claim: "$90,000 equals neither… nor any single scenario's contribution" — it IS 9,000×$10 (capped strong-demand state). Fix prose; distractor itself fine.
11. P2-C-200 — distractor D "$31,100" irreproducible; AND second defensible optimum exists if P1 demand isn't capped at the contractual 100 units (outsource-all-P2/expand-P1 ≈ $34,785 > keyed $29,900). Add clause "P1 demand is limited to the contracted 100 units"; recompute/re-anchor D.
12. P2-C-190 — distractors C ($600) / D ($2,500) not derivable via their labeled error routes ($1,250 / 25 months). Fix values.
13. P2-C-192 — distractor D "$600 compounding twice" irreproducible (double-count = $480). Fix.
14. P2-C-176 — garbled EWC/EWD prose ("donates the segmentation margin", "corroding both segments"). Rewrite.

**Systematic metadata defects (case bank + some MCQs):**
15. Difficulty label ↔ DifficultyScore mapping violations across ~20+ case items (e.g., "Moderate"/2, "Difficult"/3, "Very Difficult"/4, "Easy"/2). Violates QUESTION_METADATA_STANDARD §5.1 map (1=Easy … 5=Very Difficult); blocks a clean G5 gate. Fix labels (scores track true demand well).
16. Length cueing (CAQS §6.4): the keyed choice is conspicuously longest in nearly all select items across the 12 cases (and several MCQ Evaluate items). Compress keyed choices / expand distractors so max-length distributes across positions.
17. CBQ21-D1 appetite wording: "caps EXPECTED loss per strategic initiative" but items apply per-risk; tighten to "from any single identified risk."
18. Midpoint-rounding keys without stated tolerance: CBQ21-A1-Q1 (1.625→1.63) and -Q2 (0.925→0.93) assume round-half-up. State tolerance or shift exhibit data off .xx5 boundaries.

**INFO (optional polish):** grammar slips ("an $55" C-184; "a $11,600" C2-Q3 explanation); ReferencedBy omissions (CBQ21-A1-E1 missing Q3/Q5; D1-E1 missing Q2; CBQ22-A2-E1 missing Q4); LOSTag drift (P2-C-197 tagged C.2 among C.6 EV siblings); cognitive-progression dips (Understand/Apply mid-sequence); CF5 EstimatedMinutes soft-rule tension; CBQ22-B1-Q3 opportunity rate implied rather than stated; F-domain ALL-SELECT deviation documented and accepted; B-heavy CC rotation C-141–155 acceptable pool-wide (do NOT mechanically rotate keys — no correctness benefit, Rule 4 burden).

## 6. GOVERNANCE §5 flag dispositions

| Flag | Disposition |
|------|-------------|
| B-heavy rotation C-141–155 | Confirmed (A:3/B:6/C:3/D:3). Acceptable; do not rotate. |
| F-domain all-select cases | Documented deviation; accepted. Content quality verified high. |
| NPV tolerance CBQ23-E1-Q2 | Verified — ±$1,000 stated in prompt; all rounding paths land within. |
| **CBQ23-E2-Q3 enumerated-optimum** | **STALE/PHANTOM — no such CaseID exists in this package or in `p2/case_pack_p2_3.js`** (contains only CBQ23-C1/E1/C2/F2). Flag belongs to another package or is a mislabel. N/A here. |
| Elasticity markup C-162 | Verified exemplary. |
| Parallel-session overlap | Confirmed out of scope. |

## 7. Recommended sequence after blocker fixes

1. Fix B1–B3 + WARNs in one editorial wave (≤30 items/change-set per Rule 5; backup-before-write per BACKUP_PROTOCOL.md; REVISION_HISTORY_P2.md entry per Rule 1).
2. If C-187's added clause changes its key, record the re-key justification (Rule 4).
3. Flip `question_state` → `"Certified"` + `certification_session` for all surviving IDs (drop retired clones).
4. Run `npm run validate:p2` + `npm run preflight:p2` (must stay 0 divergences).
5. Log closeout in REVISION_HISTORY_P2.md including distractor tier map per CAQS §1.7.2.

---

## DISPOSITION (Session P2-059, 2026-08-24)

User approved: apply fixes + flip; retire newer clone duplicates; keep NPV key 49170.

- **B1 (P2-C-187):** FIXED — spillover clause added to stem + EC annotation; key B unchanged.
- **B2 (P2-C-151):** FIXED — $110K→$70K in Choices.C/EC/EWA/EWB + VerifiedChecks.
- **B3 (clones):** RESOLVED — P2-C-199 & P2-C-198 Archived; survivors repaired (C-181 choice A →$1,369,600).
- All 14 numeric/explanation WARNs repaired; 35 case-item Difficulty labels aligned to scores; LOSTag C-197 →C.6; ReferencedBy omissions closed; CBQ21-D1 appetite wording tightened; A1-Q1/Q2 tolerance stated.
- **Flipped Certified:** 73 MCQs + 12 cases (+ certification_session P2-059). **Archived:** P2-C-199, P2-C-198.
- Post-fix: validate:p2 710 items / 0 errors; preflight:p2 DIVERGENCES 0 (Certified 545→618); guard 74/74 PASS.
- Logged: REVISION_HISTORY_P2.md Session P2-059 entry + Tier Map Appendix; DEFECT_LIBRARY.md DL-046.
- Deferred exceptions documented in history entry: length-cueing compression wave; CF5 timing soft rule; progression dips; B-heavy rotation accepted (no key rotation).
