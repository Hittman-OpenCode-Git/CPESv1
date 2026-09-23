# Longcat 2.0 Review Prompt — CMA Part 1 Tier 3 Waves 13–15 (Third-Party Content Review)

## Context

You are reviewing **90 newly authored Tier 3 items** for the CMA Exam Simulator question bank — the entire "last wave of polishing" (Waves 13, 14, 15). All 90 items are `question_state: "Certified"` in the live packs and passed internal six-dimension verification, but your independent review is the external gate before learners see them. The items were split into **11 verbatim parts** (≤40KB each, ~10K tokens) so your retrieval index can fully ingest each part without prefix truncation.

### The three groups

| Wave | Pack / Section | QID range | Items | Focus |
|------|---------------|-----------|-------|-------|
| 13 | Pack C, Sec D (Cost Management) | P1-DC-101..130 | 30 | Joint/by-product costing, process-costing EU, service-department allocation, spoilage/scrap/rework |
| 14 | Pack A, Sec C (Performance Management) | P1-C-101..130 | 30 | Variance analysis (material/labor/overhead/sales/mix), responsibility centers, ROI/RI, BSC, performance evaluation |
| 15 | Pack B, Sec C (Performance Management) | P1B-C-211..240 | 30 | Mix/yield variances, overhead mix effects, quality costs, transfer-adjacent service pricing, performance-system design |

### Live-pool distributions (informational — do NOT relabel to fit them)

- CorrectChoice: A24 / B23 / C22 / D21
- CognitiveLevel: Analyze 59 / Evaluate 31; DifficultyScore: DS4 58 / DS5 32
- All 90 `question_state: "Certified"` (delivery pool); no Unprocessed items in scope

## Source Files

- **Live sources** (your parts are extracted field-for-field from these; do NOT review the full packs — only the 90 QIDs):
  - `content/packs/pack_a_corrected.js` (2,653,801 bytes, SHA256: `212e2cfa08030077660dcc1960d9006be24dc90492090772f867ecc0b7a18fa7`) — Wave 14 items
  - `content/packs/pack_b_corrected.js` (2,075,993 bytes, SHA256: `93363f36fe27066b5065c9dafa7126cfad0315cb9201f942721655bd39537d3e`) — Wave 15 items
  - `content/packs/pack_c_corrected.js` (2,730,608 bytes, SHA256: `1ca3198f44ae0ad0774000515d570b0c8e07897424650c2a2373c405e4f26ca9`) — Wave 13 items
- **Parts directory**: `content/packs/review_parts/wave1315/` (11 files: `wave1315_part_001.js` through `wave1315_part_011.js`)
- **Manifest**: `content/packs/review_parts/wave1315/wave1315_review_manifest.json` — part→QID mapping, sizes, per-part SHA256, distributions, verification proof
- **Part map**: 001: P1-DC-101–109 · 002: P1-DC-110–118 · 003: P1-DC-119–127 · 004: P1-DC-128–P1-C-106 · 005: P1-C-107–114 · 006: P1-C-115–122 · 007: P1-C-123–130 · 008: P1B-C-211–218 · 009: P1B-C-219–226 · 010: P1B-C-227–234 · 011: P1B-C-235–240

## Verification Protocol (Mandatory Before Review)

**Step 1 — Control Test**: Attach `wave1315_part_001.js` (opens with P1-DC-101, constant-gross-margin NRV). Confirm your tool finds `"P1-DC-101"` literally and returns its full question object (Stem about $120,000 joint cost, CorrectChoice C).

**Step 2 — Coverage Proof**: The manifest's `verification` block proves 90/90 QID coverage (union of part QID lists equals exactly the 90 intended QIDs, zero gaps, zero duplicates) and per-item deep-equal (every part object serializes identically to the live pack object) for 90/90. Each part is a standalone parseable JS array (`const WAVE1315_PART_NNN = [...]`), ≤40KB and ≤30 objects.

**Step 3 — Literal Search**: Use exact QID queries (e.g., `"P1-DC-104"`, `"P1-C-101"`, `"P1B-C-220"`). Do NOT rely on semantic search — IDs are literal strings. **Do not report "not found" as a finding** — treat it as an index limitation until the containing part (per the map above) is tested.

## Review Scope

Evaluate each question against the **CAQS v1.0** quality standard (Gold Standard Checklist, §14.2):

### Structural Integrity
- [ ] Valid object structure, all required fields present (`Part, Section, Topic, Stem, Choices, CorrectChoice, ExplanationCorrect, ExplanationWrongA–D, QuestionID, DifficultyScore, CognitiveLevel, question_state, certification_batch, certification_date`)
- [ ] `CorrectChoice` ∈ {A,B,C,D}; `ExplanationWrong[CorrectChoice]` = `""` (EV8 / DL-008)
- [ ] All 4 `Choices.{A,B,C,D}` present, each ≥ 8 chars after trim (Rule 18)
- [ ] `ExplanationCorrect` substantive (mini-lesson: principle + solution with substituted values + business interpretation + exam trap)
- [ ] Each `ExplanationWrong{X}` (X ≠ CorrectChoice) ≥ 50 chars and choice-specific (describes choice X's error, not a neighbor's)
- [ ] `Part1OnlyFlag: true`; `Part: 1`; `Section` matches the group (D for P1-DC-*, C for P1-C-* and P1B-C-*)

### Content Quality (CAQS §2 Rubric)
- [ ] **Blueprint Alignment** (20%): Maps to a specific Part 1 LOS (variance analysis, responsibility accounting, cost allocation). LOSTags in scope: `P1-C.1`, `P1-C.2`, `P1-C.3`, `P1-C Variance analysis`, `P1-D Cost management`
- [ ] **Cognitive Level** (15%): Bloom's level matches question demand. Analyze = decompose/compute/compare (DS4); Evaluate = judge/recommend under competing alternatives (DS5). Flag definition-match inflation (stem defines the term → should be Remember/Easy, per DL-031) — none is expected in this set (all items are scenario/computation-based)
- [ ] **Technical Accuracy** (15%): Answer correct under GAAP/COSO/IMA CSO; recompute every number independently (EU, variances, allocations, transfer ranges, EV). No invented standards
- [ ] **Distractor Quality** (15%): Each distractor targets a distinct documented misconception (wrong isolation point, wrong denominator, sunk-cost inclusion, single-cause netting, etc.)
- [ ] **Business Realism** (10%): Scenario uses executive language, plausible facts, named decision context
- [ ] **Numerical Integrity** (10%): Every figure traces to the stem; rounding is standard (dollars whole, unit costs 2dp)
- [ ] **Explanation Quality** (10%): Correct explanation derives the key step-by-step; each distractor explanation names the specific error and contrasts with the correct approach
- [ ] **Writing Clarity** (5%): Professional tone; no strong absolutes (`always/never/must/impossible`) in choice text
- [ ] **Accessibility** (5%): No biased language; no color-dependent content
- [ ] **Metadata Completeness** (5%): QID formats — `P1-DC-1xx` / `P1-C-1xx` / `P1B-C-2xx`; UniqueConceptKeys `C-101…` / `B-C-211…` / `D-C101…`

### Known Defect Classes to Check (per `DEFECT_LIBRARY.md`)
- **DL-008**: `ExplanationWrong[CorrectChoice]` non-empty (BLOCK)
- **DL-010**: Misassigned explanations (text describes a different choice than its slot — pay special attention to rotated items listed below)
- **DL-013**: Template boilerplate ("represents a plausible misconception…", "does not align with…")
- **DL-025/026**: Empty non-CorrectChoice `ExplanationWrong` slots
- **DL-030/047**: Stored key contradicts stem + choices + explanations (independently derive every key; this is the critical check — structural gates cannot catch it)
- **DL-031**: Definition-match items labeled above Easy (not expected here; confirm)
- **DL-037**: Choice binary lead-in polarity mismatch (`"No,…should be…"`)
- **DL-046**: Corrupted choice text (fragments, leading-space orphans)

### Wave-Specific Watch Items (history you should know, already remediated — verify the fixes held)

1. **P1-DC-104** (Wave 13 verification fix): EU arithmetic was corrected to 9,070 EU / $21.17 unit / $9,527 loss absorption. Recompute EU from scratch (8,000 + 450 + 620) and confirm Choice A, EC, and EW_B are mutually consistent.
2. **P1-DC-101** (Wave 13 verification fix): NRV pro-rata Choice A corrected to exact $71,429/$48,571 with 59.5%/60.7% unequal margins. Confirm the margin math.
3. **P1-C-101** (Wave 14 verification fix): Choice B corrected to $15,600/$6,400 (price-on-used + quantity-at-actual) with matching EC/EW_B. Confirm the isolation-point logic.
4. **Rotated keys (mechanical choice-position rotation, content unchanged)**: Wave 13 — P1-DC-108/114/119/122/128 B→D, P1-DC-116 + P1-DC-125 B→C. A prior rotation-script bug mangled 7 moved choice texts (dollar-amount `$1`-backreference corruption); all 7 were rewritten wholesale from authored originals. Scrutinize these 7 for residual text corruption AND for letter-reference consistency across Choices/EC/EW.
5. **Hand-rebalanced keys (rewritten at authoring, not rotated)**: Wave 14 — P1-C-123/124/129 B→A, P1-C-110 C→B, P1-C-125 C→D; Wave 15 — P1B-C-225/229 D→B, P1B-C-232/234/237 D→A, P1B-C-235/238/239/240 D→B. For each, confirm Choices/EC/EW letter-references are internally consistent (a stale "option D" reference inside a B-keyed item is a DL-010).
6. **P1-DC-124 — DS/CL pairing watch**: the single DS5+Analyze pairing in the set (FIFO spoilage with BWIP, 9,800 EU / $22.45). Confirm the difficulty demand genuinely warrants DS5 or recommend DS4 with reasons. All other items pair DS4↔Analyze / DS5↔Evaluate.
7. **Wave 14 absolute-language remediation**: 36 choice-text replacements post-insert (`always/never/must/impossible` → neutral phrasings). Confirm no residual strong absolutes in any of the 90 choice texts and no meaning changes from the remediation.
8. **P1-DC-105 lineage**: the first draft was withdrawn at authoring for an EU inconsistency; the shipped version (staged NRV $160,000 vs $110,000 → $53,333/$36,667) is a clean rewrite. Review it as a normal item.

## Evidence Hierarchy (AGENTS.md §18.3)

| Tier | Evidence | Weight |
|------|----------|--------|
| 1 | Chunked parts (actual file bytes you search yourself) | **Conclusive** |
| 2 | Verbatim raw blocks + containing part | Strong |
| 3 | Hand-pasted blocks alone | Weak — style-matched paste ≠ provenance |
| 4 | Git hashes, SHAs, manifests, shell outputs | Inadmissible without repo access |

## Output Format

For each finding, report:

```json
{
  "qid": "P1-DC-104",
  "part": 1,
  "defectClass": "DL-XXX",
  "severity": "Critical|High|Medium|Low|Informational",
  "evidence": "Exact quote from the part file showing the issue",
  "location": "Field name (e.g., ExplanationWrongC, ChoiceB, Stem)",
  "recommendation": "Specific fix"
}
```

## Delivery

Return findings as a JSON array. Include a summary with:
- Total questions reviewed (expect 90: 30 + 30 + 30)
- Per-item key-agreement verdicts (your independently derived CorrectChoice vs stored — list all 90 as AGREE or DISAGREE)
- Findings by defect class and severity
- DS/CL pairing verdict (confirm 89 paired + your ruling on P1-DC-124)
- Any items you could not locate (specify part and QID — will trigger re-split)
- Overall quality assessment (Gold / Exam-Ready / Acceptable / Needs Work / Reject per CAQS §2.4)

## Questions for Clarification

Before beginning, confirm:
1. You can ingest 40KB JS files as raw text attachments (11 files)
2. Your tool supports literal string search (not just semantic retrieval)
3. You understand the control test (Step 1) — will run it first
4. You will independently derive every answer key (Step 0 of every item) rather than trusting stored `CorrectChoice`

---

**Reference Documents** (available in repo):
- `knowledge/CAQS_v1.0.md` — Quality standard
- `knowledge/QUESTION_METADATA_STANDARD.md` — Metadata schema
- `knowledge/DEFECT_LIBRARY.md` — All defect classes with patterns
- `knowledge/EXAM_BLUEPRINT.md` — IMA CMA Part 1 CSO mapping
- `foundation/FORMULA_MASTER.md` — Authoritative formulas
- `review/05_COMMON_EXAM_TRAPS.md` — Documented traps for distractor validation
