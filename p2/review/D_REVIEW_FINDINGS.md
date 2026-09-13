# D Review Findings (pack_p2_d.js)

**Reviewer:** Nemotron Ultra (executed via Muse Spark), senior management accountant / CMA Part 2 exam editor
**Scope:** Pack D only — `p2/pack_p2_d.js`, P2-D-001..P2-D-500, Risk Management. No other pack reviewed.
**Mode:** Read-only. Fixes proposed only; no pack file modified.
**Manifest:** `p2/review/D_REVIEW_MANIFEST.md` — source 2003455 bytes, SHA256 `b4fd8c36f237c2e7c8a69ca843a1ca1c96009d339df8cd216c230b1938da8997`, 500 QIDs, 50 parts, concat EXACT MATCH, no gaps/extras.
**Method:** 5 parallel range reviews (001-100 / 101-200 / 201-300 / 301-400 / 401-500), every item evaluated on all six dimensions + structural cross-checks (DL-008, DL-026, QID format, ItemStyle, CognitiveLevel/DifficultyScore presence, Part2OnlyFlag). Calculation items recomputed twice. Quotes verified against raw file bytes. Pool-wide distributions and DL-008/DL-026/Part2OnlyFlag screens independently re-verified by orchestrator via Function-constructor parse (see Distributions).

---

## Per-item findings — single-QID entries

## P2-D-008 — Duplicate key: Choices A and C both identify Program A
- Dimension: 2 Precision
- Severity: Critical
- Evidence: Choices.A = "Program A: $520K + (2x$200K) = $920K total. Lower deductible means lower retained losses." Choices.C = "Program A total: $520K+$400K=$920K. Program B total: $380K+$1M=$1,380K. A saves $460K. The $140K higher premium buys $600K in expected insurer payments." ExplanationWrongA = "A does save $460K overall — the computation confirms A is cheaper."
- Proposed fix: Choices.A before/after — before: "Program A: $520K + (2x$200K) = $920K total. Lower deductible means lower retained losses." after: "Program B: $380K + (2x$500K) = $1,380K total. The lower premium is outweighed by higher retained losses." ExplanationWrongA before/after — before: "A does save $460K overall — the computation confirms A is cheaper." after: "B costs $380K+$1M=$1,380K total, $460K more than A. The $140K premium saving buys $600K of extra retained loss."
- Confidence: High

## P2-D-011 — Correct choice non-parallel: embeds rationale, longest option
- Dimension: 4 Distractor Engineering
- Severity: Medium
- Evidence: Choices.D = "Overdue compliance training certifications. Leading indicators predict future risk before losses occur. Untrained employees are more likely to violate policies or commit errors — precursors that management can address proactively." vs Choices.A = "Dollar value of operational losses — directly measures materialized risk."
- Proposed fix: Choices.D before/after — before: "Overdue compliance training certifications. Leading indicators predict future risk before losses occur. Untrained employees are more likely to violate policies or commit errors — precursors that management can address proactively." after: "Overdue compliance training certifications."
- Confidence: High

## P2-D-012 — Correct choice non-parallel: embeds derivation, longest option
- Dimension: 4 Distractor Engineering
- Severity: Medium
- Evidence: Choices.B = "Residual likelihood=40% x (1-0.70)=12%. Impact=$5M unchanged (controls reduce probability, not financial consequence if failure occurs). Expected residual loss=12% x $5M=$600,000." vs Choices.A = "Residual likelihood=12%, impact=$1.5M, expected loss=$60,000."
- Proposed fix: Choices.B before/after — before: "Residual likelihood=40% x (1-0.70)=12%. Impact=$5M unchanged (controls reduce probability, not financial consequence if failure occurs). Expected residual loss=12% x $5M=$600,000." after: "Residual likelihood=12%, impact=$5M, expected loss=$600,000."
- Confidence: High

## P2-D-014 — Cognitive overstatement: definition discrimination labeled Analyze
- Dimension: 3 Difficulty Calibration
- Severity: Medium
- Evidence: CognitiveLevel = "Analyze", DifficultyScore = 4. Stem = "The board asks CRO Elena Martinez: distinguish risk capacity, risk appetite, and risk tolerance with a concrete example. Which illustration is correct?" Correct choice B restates the three definitions with example figures ($200M/$50M/+/-10%).
- Proposed fix: CognitiveLevel before/after — before: "Analyze" after: "Understand" (DifficultyScore 4 → 2; no content change proposed in this read-only review)
- Confidence: Medium

## P2-D-005 — Cognitive overstatement: governance discrimination labeled Analyze
- Dimension: 3 Difficulty Calibration
- Severity: Low
- Evidence: CognitiveLevel = "Analyze", DifficultyScore = 2. Stem = "Crestview Holdings reviews its ERM oversight against COSO ERM (2017). Which statement best describes the division of risk oversight between the board and management?" No data decomposition required.
- Proposed fix: CognitiveLevel before/after — before: "Analyze" after: "Understand" (no content change proposed in this read-only review)
- Confidence: Medium

## P2-D-021 — Cognitive overstatement: residual-vs-appetite comparison labeled Analyze
- Dimension: 3 Difficulty Calibration
- Severity: Low
- Evidence: CognitiveLevel = "Analyze", DifficultyScore = 4. Stem gives residual $2,000,000 vs appetite $3,000,000 and asks "Which conclusion follows?" — a direct compare-and-conclude application with no decomposition.
- Proposed fix: CognitiveLevel before/after — before: "Analyze" after: "Apply" (no content change proposed in this read-only review)
- Confidence: Medium

## P2-D-079 — Cognitive mismatch: pure Principle 1 recall labeled Apply
- Dimension: 3 Difficulty Calibration
- Severity: Low
- Evidence: CognitiveLevel = "Apply", Difficulty = "Easy", DifficultyScore = 1. Stem = "During Flash's annual governance review, board chairperson Rosa Delgado asks who holds ultimate responsibility for overseeing management's design and operation of enterprise risk management. Per COSO ERM (2017) Principle 1, the correct answer is:"
- Proposed fix: CognitiveLevel before/after — before: "Apply" after: "Remember" (Difficulty/DifficultyScore unchanged at Easy/1; no content change proposed in this read-only review)
- Confidence: High

## P2-D-088 — DifficultyScore understated for 4-option computation plus cap screen
- Dimension: 3 Difficulty Calibration
- Severity: Low
- Evidence: Difficulty = "Moderate-Easy", DifficultyScore = 2. Stem requires four retained-loss products plus four totals plus $400,000 single-event eligibility screen: "Retained expected loss: $100,000 x 0.04 = $4,000; $250,000 x 0.04 = $10,000; $500,000 x 0.04 = $20,000; $750,000 x 0.04 = $30,000. Total expected annual cost: $310,000 + $4,000 = $314,000; $262,000 + $10,000 = $272,000; $205,000 + $20,000 = $225,000; $150,000 + $30,000 = $180,000."
- Proposed fix: Difficulty/DifficultyScore before/after — before: "Moderate" / 2 after: "Moderate" / 3 (no content change proposed in this read-only review)
- Confidence: Medium

## P2-D-124 — ExplanationCorrect names wrong choice (says D, key is B; alternatives also mislabeled)
- Dimension: 1 Correctness
- Severity: High
- Evidence: CorrectChoice is B ("Redraw tier boundaries as contiguous ranges with no shared endpoint (Tier 2 covering $100,000 up to but excluding $250,000; Tier 3 covering $250,000 and above), attach a maximum decision deadline to every tier, and set the Tier 1 ceiling at the insurance deductible."). ExplanationCorrect states "Choice D supplies all three: contiguous half-open ranges eliminate the $250,000 double-claim that produced contradictory unit behavior; per-tier decision deadlines end the 45-day idling; and anchoring the Tier 1 ceiling at the $120,000 deductible restores an owner for routine losses." It then describes the alternatives as "B adjusts levels without fixing logic, and C amputates a tier" — but actual Choice C is "Shift every tier boundary upward by 20%" and actual Choice D is "Eliminate Tier 1 handling".
- Proposed fix: ExplanationCorrect — before "Choice D supplies all three:" → after "Choice B supplies all three:"; before "B adjusts levels without fixing logic, and C amputates a tier rather than repairing boundaries." → after "C adjusts levels without fixing logic, and D amputates a tier rather than repairing boundaries."
- Confidence: High

## P2-D-167 — Two defensible answers (B and C share identical verified numbers)
- Dimension: 2 Precision
- Severity: High
- Evidence: Choice B: "Expected loss across scenarios is $1,038,000 and the severe tail beyond the mean is $1,422,000, so Flash is exposed to concentration that consistent provisioning at the $720,000 base would leave uncovered". Recomputed twice: 0.70 x $720,000 + 0.20 x $1,440,000 + 0.10 x $2,460,000 = $504,000 + $288,000 + $246,000 = $1,038,000; severe tail beyond mean = $2,460,000 − $1,038,000 = $1,422,000. EC concedes B only "correctly computes the $1,038,000 mean and $1,422,000 tail but stops at diagnosis without recommendation" — a completeness judgment, not a falsity.
- Proposed fix: Choices.B — before "Expected loss across scenarios is $1,038,000 and the severe tail beyond the mean is $1,422,000, so Flash is exposed to concentration that consistent provisioning at the $720,000 base would leave uncovered" → after "Expected loss across scenarios is $720,000 and the severe tail beyond the mean is $1,740,000, so base provisioning already covers the stress mean" (720,000 = base-as-mean error; 1,740,000 = $2,460,000 − $720,000 mean-confusion error); rewrite ExplanationWrongB to diagnose base-as-weighted-mean confusion.
- Confidence: High

## P2-D-169 — Choice C text truncated (",769" fragment)
- Dimension: 2 Precision
- Severity: Medium
- Evidence: Choices.C: "Both methods give ,769 because certainty equivalent and risk-adjusted discount produce identical results when calibrated consistently" — amount missing leading digits; computed PV_CE = 0.88 x $500,000 / 1.04 = $423,077; risk-adjusted PV = $500,000 / 1.12 = $446,429.
- Proposed fix: Choices.C — before "Both methods give ,769 because certainty equivalent and risk-adjusted discount produce identical results when calibrated consistently" → after "Both methods give $423,077 because certainty equivalent and risk-adjusted discount produce identical results when calibrated consistently"; update ExplanationWrongC to refute with the calibration math already in EC (1.04/1.12 = 0.9286 ≠ 0.88).
- Confidence: High

## P2-D-174 — False ES/VaR ratios in two distractor explanations plus EC fragment
- Dimension: 1 Correctness
- Severity: Medium
- Evidence: ExplanationWrongB: "For a normal distribution, ES is approximately 2.5% higher than the corresponding VaR, not equal to sigma." ExplanationWrongD: "For normal distributions, ES is approximately 1.06 x VaR (a few percent above), not 2 x." Recomputed twice: VaR = 1.645 x $2M = $3.29M; ES = $4.13M; ratio 4.13/3.29 = 1.256 → ~25.6% higher. EC states "approximately 25.5% higher than VaR (4.13/3.29 = 1.255)". EC also contains orphan fragment "'s an underestimate. ES exceeds VaR by about 25.5% at 95% confidence for a normal distribution (ES/VaR = 1.255). The answer C is the closest."
- Proposed fix: ExplanationWrongB — before "ES is approximately 2.5% higher than the corresponding VaR, not equal to sigma." → after "ES exceeds VaR by about 25.5% at 95% confidence for a normal distribution (4.13/3.29 = 1.256); it is a tail-loss measure, not the standard deviation." ExplanationWrongD — before "ES is approximately 1.06 x VaR (a few percent above), not 2 x." → after "ES is approximately 1.26 x VaR (about 25.5% above), not 2 x." ExplanationCorrect — before "reflecting the heavier tail beyond VaR. 's an underestimate. ES exceeds VaR by about 25.5%" → after "reflecting the heavier tail beyond VaR. ES exceeds VaR by about 25.5%".
- Confidence: High

## P2-D-177 — Key inversion: stored key B (loss) contradicts stem economics and own explanations (gain)
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: Euro-functional subsidiary; EUR strengthened ($1.08 average → $1.10 spot). Choice A: "Translation gain of $1.0M (50M x (1.10 - 1.08))". Choice B: "Translation loss of $1.0M (50M x (1.10 - 1.08))". Stored CorrectChoice is B. ExplanationCorrect: "50M x (1.10 - 1.08) = $1.0M gain (if rates rose). The sign is a gain because the EUR strengthened against the USD." ExplanationWrongA concedes the distractor's substance.
- Proposed fix: CorrectChoice — before "B" → after "A". ExplanationWrongA — before the current conceding text → after "" (EW[CC] must be empty). ExplanationWrongB — before "" → after "Choice B reports a $1.0M translation loss, but a strengthening euro on a euro-functional subsidiary produces a gain: 50M x (1.10 − 1.08) = $1.0M gain, reported in OCI per ASC 830, not net income." ExplanationCorrect — retain, ensuring it states the $1.0M gain flows to OCI, not net income.
- Confidence: High

## P2-D-181 — Stored answer 20.7% does not match recomputed 21.1%
- Dimension: 1 Correctness
- Severity: High
- Evidence: EC computes "variance = 0.25 x 0.04 + 0.25 x 0.09 + 2 x 0.25 x 0.20 x 0.30 x 0.4 = 0.01 + 0.0225 + 0.012 = 0.0445. Portfolio standard deviation = sqrt(0.0445) = 0.2109 = 21.1%. The closest answer is B (20.7%); 21.1% is within rounding." Recomputed twice: sum = 0.0445; sqrt = 0.21095 → 21.1%. Stored key B ("Approximately 20.7%") is 0.4pp below the correct value — not rounding.
- Proposed fix: Choices.B — before "Approximately 20.7%" → after "Approximately 21.1%". ExplanationCorrect — before "The closest answer is B (20.7%); 21.1% is within rounding." → after "The answer is B (21.1%)."
- Confidence: High

## P2-D-185 — Two defensible answers (A and B); EC admits no single correct answer
- Dimension: 2 Precision
- Severity: High
- Evidence: Choice A: "(1) Mitigate by upgrading; (2) Accept; (3) Transfer via forward; (4) Mitigate by changing practice" — every leg defensible. Choice B (key): "(1) Mitigate by upgrading; (2) Accept; (3) Mitigate via forward hedge or accept; (4) Avoid or mitigate by changing practice to comply". EC: "There is no single 'correct' answer because the optimal treatment depends on the firm's risk appetite, the cost-benefit, and the alternatives; the answer B captures the typical approach."
- Proposed fix: Choices.A — before "(1) Mitigate by upgrading; (2) Accept; (3) Transfer via forward; (4) Mitigate by changing practice" → after "(1) Transfer to the vendor by demanding indefinite support for the outdated system; (2) Transfer minor injuries via first-dollar insurance coverage; (3) Avoid all foreign sales to eliminate the 30-day invoice exposure; (4) Accept the fine as a cost of doing business"; rewrite ExplanationWrongA to diagnose each leg. Key B unchanged.
- Confidence: High

## P2-D-194 — ExplanationWrongA cites foreign premium/figures from another item
- Dimension: 4 Distractor Engineering
- Severity: High
- Evidence: ExplanationWrongA: "Premium $55,000 versus control $85,000 suggests Y is cheaper by $30,000, but total cost must add expected retained loss: X $72,000 + $85,000 = $157,000 versus Y $48,000 + $120,000 = $168,000". Stem prices Option Y premium at $120,000, not $55,000 ($55,000 is P2-D-168's premium). Verified totals: X = 0.03 x $2,400,000 + $85,000 = $157,000; Y = $48,000 + $120,000 = $168,000; X cheaper by $11,000.
- Proposed fix: ExplanationWrongA — before "Premium $55,000 versus control $85,000 suggests Y is cheaper by $30,000, but total cost must add expected retained loss:" → after "Upfront cost alone ($120,000 premium versus $85,000 control) suggests Y is cheaper by $35,000, but total cost must add expected retained loss:"
- Confidence: High

## P2-D-173 — Definition-recall item labeled Apply/Moderate
- Dimension: 3 Difficulty Calibration
- Severity: Low
- Evidence: Stem: "Flash Manufacturing's risk officer is plotting risks on a heat map. Which axis labels are correct for a standard risk heat map?" — pure convention recall (X = likelihood low→high; Y = impact low→high); CALC=false. Labeled CognitiveLevel Apply, Difficulty Moderate/3.
- Proposed fix: CognitiveLevel — before "Apply" → after "Understand"; Difficulty/DifficultyScore — before "Moderate"/3 → after "Moderate-Easy"/2. No content change.
- Confidence: Medium

## P2-D-179 — Definition-recall item labeled Apply
- Dimension: 3 Difficulty Calibration
- Severity: Low
- Evidence: Stem: "Flash Holdings is establishing a risk committee. Risk officer Maya Caldwell is drafting the committee charter. Which element is NOT typically included in a risk-committee charter?" — recall of charter contents; CALC=false. Labeled CognitiveLevel Apply.
- Proposed fix: CognitiveLevel — before "Apply" → after "Understand". Difficulty Moderate-Easy/2 already fits; no content change.
- Confidence: Medium

## P2-D-214 — Key selects higher-cost response; Share total $128,600 beats Reduce total $129,000
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: Stem: "recommend the lowest total expected cost option among doing nothing, reducing the risk, or sharing it". EC computes: "Reduce (monitoring): residual 4% x $1,600,000 = $64,000; total = $65,000 + $64,000 = $129,000. Share (insurance): premium $95,000 plus retained 15% x 0.14 x $1,600,000 = $33,600; total = $128,600." Recomputed twice: Accept = 224,000; Reduce = 129,000; Share = 128,600. Share is lowest by $400, but CorrectChoice is "B" (Reduce).
- Proposed fix: CorrectChoice "B" → "C", and rewrite Choices.C (currently "Share the risk via insurance at $95,000 premium, because insurance eliminates the risk and $95,000 is lower than $129,000" — false "eliminates" rationale) to "Share the risk via insurance: $95,000 premium plus $33,600 retained expected loss = $128,600 total, the lowest of the three alternatives"; rewrite ExplanationWrongC/EW_B accordingly; re-verify.
- Confidence: High

## P2-D-214 — Evaluate item below DifficultyScore floor (DS3 < 4)
- Dimension: 3 Difficulty Calibration
- Severity: Medium
- Evidence: "CognitiveLevel": "Evaluate" with "DifficultyScore": 3. Authoring rule: DifficultyScore ≥ 4 for Evaluate.
- Proposed fix: After key repair, set Difficulty "Difficult", DifficultyScore 4.
- Confidence: High

## P2-D-216 — Difficulty label/Score mismatch (Easy with DS2)
- Dimension: Structural
- Severity: Low
- Evidence: "Difficulty": "Easy", "DifficultyScore": 2 (Easy ↔ 1; 2 ↔ Moderate-Easy).
- Proposed fix: "DifficultyScore": 2 → 1 (single-step framework recall), or "Difficulty": "Easy" → "Moderate-Easy".
- Confidence: High

## P2-D-231 — Difficulty label/Score mismatch (Easy with DS2)
- Dimension: Structural
- Severity: Low
- Evidence: "Difficulty": "Easy", "DifficultyScore": 2.
- Proposed fix: "DifficultyScore": 2 → 1, or "Difficulty": "Easy" → "Moderate-Easy".
- Confidence: High

## P2-D-236 — Forward hedge classified Reduce, contradicting pack's own Share standard (221/295/D-204)
- Dimension: 1 Correctness
- Severity: High
- Evidence: Choice B (key): "Financial risk; response is reduction (control activity), because forwards lower the likelihood and impact of adverse FX moves". Pack siblings: P2-D-221 key maps "Forward purchase is sharing"; P2-D-295 key "Share, because the currency risk is transferred to the counterparty". A forward does not lower the likelihood of FX moves; it transfers the consequence. No choice offers Financial+Share.
- Proposed fix: Rewrite Choices.B to "Financial risk; response is sharing, because the forward transfers the currency outcome to the counterparty while the intercompany position is retained" (keep CorrectChoice "B"); adjust ExplanationCorrect/EW_D to match.
- Confidence: Medium

## P2-D-246 — ExplanationCorrect names wrong option letter ("Option A" but key is B)
- Dimension: 1 Correctness
- Severity: High
- Evidence: EC closing sentence: "Option A states this purpose correctly." source_support_for_key.key_conclusion: "making Option A correct." uniqueness_note: "Option B is wrong because inherent risk is forward-looking…" (describes the key as wrong). CorrectChoice is "B".
- Proposed fix: ExplanationCorrect "Option A states this purpose correctly." → "Option B states this purpose correctly."; key_conclusion → "making Option B correct."; uniqueness_note → "Option A is wrong because it describes realized losses; Option C is wrong because it equates inherent with residual; Option D is wrong because the register drives prioritization; Option B states the baseline purpose."
- Confidence: High

## P2-D-248 — Computation labeled Remember; uniqueness_note letters scrambled; CalculationItem false
- Dimension: 3 Difficulty Calibration
- Severity: Medium
- Evidence: Two-step PD×EAD×LGD computation (0.04 x $1,200,000 = $48,000; x 0.60 = $28,800) labeled "CognitiveLevel": "Remember" with "CalculationItem": false. uniqueness_note: "Option A omits LGD (48,000); … Option B is the full PD x EAD x LGD chain (28,800)" — but raw choices are A="$28,800" (key), B="$48,000": letters swapped.
- Proposed fix: CognitiveLevel "Remember" → "Apply"; CalculationItem false → true; uniqueness_note → "Option B omits LGD ($48,000 is expected exposure only); Option C uses conditional loss without probability weighting ($720,000); Option D inverts the probability ($1,152,000); Option A is the full PD x EAD x LGD chain ($28,800)."
- Confidence: High

## P2-D-249 — EC wrong letter plus ExplanationWrongA/EW_D transposed (DL-010)
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: CorrectChoice "B" ("It converts appetite into measurable thresholds…"). EC: "Option D states this measurable-threshold feature, which is what makes the statement most useful." ExplanationWrongA claims the quantified statement eliminates tolerance bands (choice D's content, not A's). ExplanationWrongD claims appetite is not legally binding (choice A's content, not D's). key_conclusion: "making Option D correct."
- Proposed fix: EC "Option D states…" → "Option B states…"; swap ExplanationWrongA ↔ ExplanationWrongD bodies so each refutes its own choice; key_conclusion → "making Option B correct."; rewrite uniqueness_note letter mapping.
- Confidence: High

## P2-D-250 — ExplanationCorrect names wrong option letter ("Option A" but key is C)
- Dimension: 1 Correctness
- Severity: High
- Evidence: CorrectChoice "C" ("Avoid"). EC: "Option A states this correctly." key_conclusion: "making Option A correct." uniqueness_note maps Avoid to A — raw A is "Share", B is "Reduce", C is "Avoid" (key), D is "Accept".
- Proposed fix: EC → "Option C states this correctly."; key_conclusion → "making Option C correct."; uniqueness_note → "Option C is Avoid (exit the activity); Option A transfers risk (Share); Option B applies controls while continuing (Reduce); Option D retains the risk (Accept)."
- Confidence: High

## P2-D-251 — ExplanationCorrect names wrong option letter ("Option B" but key is D)
- Dimension: 1 Correctness
- Severity: High
- Evidence: CorrectChoice "D" ("Average driver hours per week and percentage of trucks with overdue maintenance"). EC: "Option B pairs these two leading indicators." key_conclusion: "making Option B correct."
- Proposed fix: EC → "Option D pairs these two leading indicators."; key_conclusion → "making Option D correct."; uniqueness_note → "Option D pairs the two leading indicators (driver hours, overdue maintenance); Option A and B mix leading with lagging; Option C uses two lagging indicators."
- Confidence: High

## P2-D-252 — Tie at 12 (Y and Z both score 12); two defensible answers, tie-break not in stem
- Dimension: 2 Precision
- Severity: High
- Evidence: Stem: "Using the standard risk score (L x S), which risk ranks highest". Computed: W = 5x2 = 10; X = 2x5 = 10; Y = 4x3 = 12; Z = 3x4 = 12. Choices A="Risk Z, score 12" and C="Risk Y, score 12" both satisfy the stated rule. The "higher severity wins" tie-break exists only in EC, not the stem. EC concedes: "Risks Y and Z tie at 12".
- Proposed fix: Append to stem: "If two risks tie on Risk Score, rank the one with higher severity first." (then key A holds); fix key_conclusion → "making Option A correct." plus uniqueness_note A/C swap.
- Confidence: High

## P2-D-253 — ExplanationCorrect names wrong option letter ("Option A" but key is B)
- Dimension: 1 Correctness
- Severity: High
- Evidence: CorrectChoice "B" (operations first line / oversight second / audit third). EC: "Option A states this standard mapping correctly." key_conclusion: "Option A is the correct three-lines mapping." — raw A is "First line: internal audit…" (reversed).
- Proposed fix: EC/key_conclusion/uniqueness_note "Option A" → "Option B" (3 replacements); uniqueness_note "Option B reverses audit and operations" → "Option A reverses audit and operations".
- Confidence: High

## P2-D-254 — ExplanationCorrect names wrong option letter ("Option D" but key is C)
- Dimension: 1 Correctness
- Severity: High
- Evidence: CorrectChoice "C" ("It breaches the single-borrower tolerance band…"). EC: "Option D states this." key_conclusion: "…requiring escalation — Option D." uniqueness_note swaps C/D.
- Proposed fix: EC → "Option C states this."; key_conclusion → "Option C."; uniqueness_note → "Option A cites capacity incorrectly; Option B claims no breach; Option D misreads appetite as a transaction limit; Option C identifies the tolerance breach."
- Confidence: High

## P2-D-256 — ExplanationCorrect names wrong option letter ("Option C" but key is A)
- Dimension: 1 Correctness
- Severity: High
- Evidence: CorrectChoice "A" ("Model several plausible severe scenarios…"). EC: "Option C states this design." key_conclusion: "…is the tail-revealing design — Option C."
- Proposed fix: EC → "Option A states this design."; key_conclusion → "Option A."; uniqueness_note → "Option C suppresses the tail with point estimates; Option B trusts history alone; Option D hides correlation; Option A models severe correlated scenarios."
- Confidence: High

## P2-D-257 — ExplanationCorrect names wrong option letter ("Option A" but key is B); A/B swapped
- Dimension: 1 Correctness
- Severity: High
- Evidence: CorrectChoice "B" ("Risk appetite is applied during strategy formulation…"). EC: "Option A states this integration." and "Post-hoc documentation (Option B)…" — raw A is post-hoc documentation, B is the during-formulation key. key_conclusion: "…during formulation — Option A."
- Proposed fix: EC → "Option B states this integration."; key_conclusion → "Option B."; uniqueness_note → "Option A documents after the fact; … Option B screens alternatives during formulation."
- Confidence: High

## P2-D-258 — EC wrong letter plus ExplanationWrongA/EW_D transposed (DL-010)
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: CorrectChoice "C" ("updated continuously…"). EC: "Option D states this cadence principle." ExplanationWrongA refutes loss-only logging (choice D's content, not A's "frozen for the fiscal year"). ExplanationWrongD refutes static-annual (choice B's content, not D's).
- Proposed fix: EC → "Option C states this cadence principle."; swap ExplanationWrongA ↔ ExplanationWrongD bodies; support → "placed at Option C"; rewrite uniqueness_note mapping.
- Confidence: High

## P2-D-263 — ExplanationCorrect names wrong option letter ("Option B" but key is D)
- Dimension: 1 Correctness
- Severity: High
- Evidence: CorrectChoice "D" ("board's oversight role includes receiving timely information…"). EC: "Option B states this principle." key_conclusion: "…board oversight — Option B."
- Proposed fix: EC → "Option D states this principle."; key_conclusion → "Option D."
- Confidence: High

## P2-D-266 — ExplanationCorrect names wrong option letter ("Option A" but key is C)
- Dimension: 1 Correctness
- Severity: High
- Evidence: CorrectChoice "C" ("defines a trigger level that prompts escalation…before the limit is breached"). EC: "Option A states this design." key_conclusion: "…makes the KRI effective — Option A." uniqueness_note swaps A/C.
- Proposed fix: EC/key_conclusion → "Option C"; uniqueness_note → "Option A triggers at the limit; Option B reports after breach; Option D monitors annually; Option C has the pre-limit trigger with defined response."
- Confidence: High

## P2-D-267 — ExplanationCorrect names wrong option letter ("Option C" but key is D)
- Dimension: 1 Correctness
- Severity: High
- Evidence: CorrectChoice "D" ("Operational risk…"). EC: "Option C states this classification." key_conclusion: "…Option C."
- Proposed fix: EC/key_conclusion → "Option D"; uniqueness_note → "Option A uses reputational effect; Option B uses regulatory concern; Option C uses customer impact; Option D correctly identifies the systems-failure source as operational risk."
- Confidence: High

## P2-D-268 — ExplanationCorrect computes foreign figures absent from stem
- Dimension: 1 Correctness
- Severity: High
- Evidence: Stem: "Unit A earns $12 million with $80 million of risk capital. Unit B earns $9 million with $45 million of risk capital." EC: "Unit X: $15M / $75M = 20.0%. Unit Y: $12M / $40M = 30.0%. Unit Y ranks higher…" Correct derivation: A = 12/80 = 15.0%; B = 9/45 = 20.0% → Unit B higher (choice A text "Unit B at 20.0%" is correct; key letter A holds).
- Proposed fix: EC → "Return on risk-adjusted capital = profit / risk capital. Unit A: $12M / $80M = 15.0%. Unit B: $9M / $45M = 20.0%. Unit B ranks higher… Option A states the correct answer."; key_conclusion → "Unit B at 20.0% ranks higher — Option A."; uniqueness_note → "Option B ranks by absolute profit; Option C uses revenue; Option D miscalculates B at 12.5%; Option A correctly states B's 20.0% return per risk dollar."
- Confidence: High

## P2-D-269 — ExplanationCorrect names wrong option letter ("Option D" but key is B)
- Dimension: 1 Correctness
- Severity: High
- Evidence: CorrectChoice "B" ("Pressure and opportunity…"). EC: "Option D states this." key_conclusion: "…are evident — Option D." — raw D is "Opportunity and rationalization".
- Proposed fix: EC/key_conclusion/uniqueness_note "Option D" → "Option B" (3 replacements); uniqueness_note "Option B swaps it for pressure" → "Option D swaps pressure for rationalization".
- Confidence: High

## P2-D-271 — ExplanationCorrect names wrong option letter ("Option B" but key is D)
- Dimension: 1 Correctness
- Severity: High
- Evidence: CorrectChoice "D" ("loan is within the single-name tolerance, but the portfolio must be monitored…"). EC: "Option B states this." key_conclusion: "…against annual appetite — Option B."
- Proposed fix: EC/key_conclusion → "Option D"; uniqueness_note → "Option A compares exposure to the loss limit directly; Option B ignores the portfolio limit; Option C confines appetite to retail; Option D states the monitoring requirement."
- Confidence: High

## P2-D-272 — ExplanationCorrect names wrong option letter ("Option D" but key is A)
- Dimension: 1 Correctness
- Severity: High
- Evidence: CorrectChoice "A" ("Identifying risks that may become material…"). EC: "Option D states this." key_conclusion: "…monitoring and preparation — Option D." — raw D is the certainty distractor.
- Proposed fix: EC/key_conclusion → "Option A"; uniqueness_note → "Option D promises certainty; Option B confines scanning to the register; Option C reduces it to a single forecast; Option A states the forward-monitoring purpose."
- Confidence: High

## P2-D-273 — ExplanationCorrect names wrong option letter ("Option A" but key is B)
- Dimension: 1 Correctness
- Severity: High
- Evidence: CorrectChoice "B" ("Accept the residual risk, documenting…"). EC: "…the framework-consistent decision is to accept the residual risk and document the rationale — Option A." key_conclusion: "…with documentation — Option A." — raw A is zero-risk rejection.
- Proposed fix: EC/key_conclusion → "Option B"; uniqueness_note → "Option A demands zero residual risk; Option C ignores response cost; Option D transfers uneconomically; Option B is acceptance within tolerance with documentation."
- Confidence: High

## P2-D-274 — ExplanationCorrect names wrong option letter ("Option B" but key is C)
- Dimension: 1 Correctness
- Severity: High
- Evidence: CorrectChoice "C" ("Using the stressed loss estimates to size capital buffers…"). EC: "Option B states this use." key_conclusion: "…and limits — Option B." — raw B is reporting-only.
- Proposed fix: EC/key_conclusion → "Option C"; uniqueness_note → "Option A treats stress as forecast; Option B limits it to reporting; Option D ignores conflicting output; Option C connects stress output to capital buffers and limits."
- Confidence: High

## P2-D-275 — ExplanationCorrect names wrong option letter ("Option C" but key is D)
- Dimension: 1 Correctness
- Severity: High
- Evidence: CorrectChoice "D" ("risk owner should be the person best positioned…"). EC: "Option C states this." key_conclusion: "…accountable owner — Option C." — raw C is identify-only.
- Proposed fix: EC/key_conclusion → "Option D"; uniqueness_note → "Option A centralizes ownership in the CRO; Option B ends ownership at registration; Option C limits it to identification; Option D states the best-positioned-owner principle."
- Confidence: High

## P2-D-277 — Key is wrong: process failure is choice D, not choice C; EW_D carries authoring scaffolding
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: Stem: "Which event is best classified as a process failure". Choices: C="An employee intentionally falsifying expense reports" (people/fraud), D="A vendor invoice processed twice because the two-step approval workflow had no duplicate check" (process failure). CorrectChoice "C". EC itself states the duplicate-invoice case "is the clearest process failure" and the falsified expenses "is fraud by an employee", then concludes C. ExplanationWrongD contains non-learner scaffolding conceding the mismatch.
- Proposed fix: CorrectChoice "C" → "D"; EC should conclude "Option D states the process-failure example…"; rewrite ExplanationWrongC as the fraud-vs-process distinction; ExplanationWrongA/B intact.
- Confidence: High

## P2-D-281 — Key is wrong: correct distinction is choice B, not choice D; EC refutes its own key
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: Choices: B="Inherent risk is the exposure before controls (50% x $3,000,000); residual risk is the exposure after controls (20% x $1,500,000)" (inherent $1.5M → residual $300K, correct); D="Residual risk is higher than inherent risk when controls are effective" (false). CorrectChoice "D". EC computes "inherent = 50% x $3,000,000 = $1,500,000 expected loss, and residual = 20% x $1,500,000 = $300,000" then states "Options that … claim residual exceeds inherent are each incorrect" (refutes D, the key).
- Proposed fix: CorrectChoice "D" → "B"; EC closing → "…Option B states the likelihood-weighted distinction correctly."; EW_D should refute "residual higher than inherent" ($300K < $1.5M); ExplanationWrongA/C intact.
- Confidence: High

## P2-D-284 — Key is wrong: capacity-bounds-appetite statement is choice A, not choice C
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: Choices: A="Risk capacity sets the outer boundary — the maximum risk the bank can absorb — within which appetite and tolerance are set" (correct); C="Risk capacity is the same as risk appetite and is set by the CRO alone" (false). CorrectChoice "C". EC supports A. ExplanationWrongA affirms A's content while calling it wrong.
- Proposed fix: CorrectChoice "C" → "A"; ExplanationWrongA → ""; author new ExplanationWrongC refuting CRO-alone conflation; de-duplicate EW_A/EW_B.
- Confidence: High

## P2-D-289 — Key is wrong: full-lifecycle accountability is choice A, not choice D
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: Choices: A="The risk owner is accountable for implementing the response, monitoring the risk, and reporting progress to the ERM function" (correct); D="The risk owner has no ongoing accountability once the risk is accepted" (false). CorrectChoice "D". EC supports A.
- Proposed fix: CorrectChoice "D" → "A"; ExplanationWrongA → ""; author new ExplanationWrongD refuting no-ongoing-accountability; ExplanationWrongB/C intact.
- Confidence: High

## P2-D-290 — Key is wrong: minimum Program A $750,000 sits at choice D, not choice A
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: Stem numbers: A = $650,000 + $100,000 = $750,000; B = $480,000 + $300,000 = $780,000. Choices: A="Program B at $780,000", D="Program A at $750,000". CorrectChoice "A". EC: "Program A minimizes cost at $750,000."
- Proposed fix: CorrectChoice "A" → "D"; ExplanationWrongD → ""; author new ExplanationWrongA ("Option A names the costlier program: B totals $780,000 vs A's $750,000."); ExplanationWrongB/C intact.
- Confidence: High

## P2-D-293 — Key is wrong: correct VaR interpretation is choice B, not choice D
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: Choices: B="The portfolio has a 5% chance of losing more than $4,000,000 on any given day, and the figure is within the $5,000,000 appetite" (correct); D="The portfolio has a 95% chance of losing exactly $4,000,000" (false). CorrectChoice "D". EC supports B.
- Proposed fix: CorrectChoice "D" → "B"; ExplanationWrongB → ""; author new ExplanationWrongD refuting exact-probability misread; ExplanationWrongA/C intact.
- Confidence: High

## P2-D-297 — Key is wrong: tiered-threshold design is choice A, not choice D
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: Choices: A="Tiered thresholds with defined response times give management escalating urgency and clear accountability for action" (correct); D="The protocol should be reviewed only annually to avoid over-reporting" (false). CorrectChoice "D". EC describes the tiered design (supports A).
- Proposed fix: CorrectChoice "D" → "A"; ExplanationWrongA → ""; author new ExplanationWrongD refuting annual-only review; ExplanationWrongB/C intact.
- Confidence: High

## P2-D-276 — Verbatim-definition recall labeled DS3 (sibling recall items DS1)
- Dimension: 3 Difficulty Calibration
- Severity: Low
- Evidence: Stem quotes the COSO definition nearly verbatim ("establishes the organization's core values, defines board oversight responsibilities, and sets the tone"); "CognitiveLevel": "Remember", "DifficultyScore": 3. Sibling component-recall items P2-D-201, P2-D-220, P2-D-229, P2-D-235 are DS1.
- Proposed fix: Difficulty "Moderate" → "Easy", DifficultyScore 3 → 1.
- Confidence: Medium

## P2-D-278 — Computation labeled Remember (should be Apply)
- Dimension: 3 Difficulty Calibration
- Severity: Medium
- Evidence: "CognitiveLevel": "Remember" for computing and comparing two expected losses (0.05 x $2,000,000 = $100,000 vs 0.02 x $4,500,000 = $90,000). Procedural computation → Apply. (Key A verified correct: $100K > $90K.)
- Proposed fix: CognitiveLevel "Remember" → "Apply" (keep DS3 Moderate).
- Confidence: High

## P2-D-285 — DS4 Difficult for giveaway recall (stem hands the rationale)
- Dimension: 3 Difficulty Calibration
- Severity: Medium
- Evidence: Stem: "exposure is small relative to the company's capital and the hedge cost would exceed the expected loss" → Accept is spelled out. "CognitiveLevel": "Apply", "DifficultyScore": 4. Sibling response-identification items P2-D-264, P2-D-295 (same demand) are DS2.
- Proposed fix: Difficulty "Difficult" → "Moderate", DifficultyScore 4 → 3 (or 2).
- Confidence: Medium

## P2-D-292 — uniqueness_note letter mapping swapped (metadata only)
- Dimension: Structural
- Severity: Low
- Evidence: EC ("Option C states this correctly") and key_conclusion ("Option C") match CorrectChoice "C". But uniqueness_note: "Option A correctly labels all three as financial risk; Option B, C, D each scramble the categories." — raw A scrambles, C is the all-financial key.
- Proposed fix: uniqueness_note → "Option C correctly labels all three as financial risk; Options A, B, and D each scramble the categories."
- Confidence: High

## P2-D-298 — Analyze/DS4 overstatement for single-concept identification (siblings Apply/DS2)
- Dimension: 3 Difficulty Calibration
- Severity: Medium
- Evidence: "Which risk response does cyber insurance represent?" with "CognitiveLevel": "Analyze", "DifficultyScore": 4. Identical demand siblings P2-D-264 (fleet insurance = Share) and P2-D-295 (forward = Share) are Apply/DS2. No decomposition required. (Key A verified correct.)
- Proposed fix: CognitiveLevel "Analyze" → "Apply"; Difficulty "Difficult" → "Moderate-Easy", DifficultyScore 4 → 2.
- Confidence: Medium

## P2-D-301 — Key error: correct Reduce content at A, key at D
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: Choices.A "Reduce by qualifying a second supplier and holding safety stock, while retaining a residual risk that is monitored" vs CorrectChoice "D" ("Share by transferring the risk to the second supplier"); ExplanationWrongA: "Option A is wrong because it states the correct approach but at the wrong position"
- Proposed fix: "CorrectChoice": "D" → "CorrectChoice": "A"; set ExplanationWrongA → ""; author choice-specific ExplanationWrongD refuting Share-transfer to a second supplier; rewrite ExplanationCorrect to name Option A
- Confidence: High

## P2-D-304 — Key error: correct review-and-revise principle at B, key at C
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: Choices.B "Tolerance bands should be reviewed and revised when experience shows they are misaligned with the actual risk profile" vs CorrectChoice "C"; ExplanationWrongB: "Option B is wrong because it states the correct principle — review and revise when experience shows misalignment"
- Proposed fix: "CorrectChoice": "C" → "CorrectChoice": "B"; ExplanationWrongB → ""; author ExplanationWrongC (loss alone does not prove band too tight); rewrite ExplanationCorrect/EW_B/uniqueness_note/source_support to name Option B
- Confidence: High

## P2-D-305 — Key error: correct buffer-sizing use at A, key at D
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: Choices.A "Sizing the liquid asset buffer and setting funding limits so the bank can survive the stress within its risk appetite" vs CorrectChoice "D"; ExplanationWrongA: "Option A is wrong because it states the correct use of the stress result — sizing the buffer and setting limits — but at the wrong position"
- Proposed fix: "CorrectChoice": "D" → "CorrectChoice": "A"; ExplanationWrongA → ""; author choice-specific ExplanationWrongD (ignoring an unlikely-but-severe scenario); rewrite ExplanationCorrect/source_support/uniqueness_note to name Option A
- Confidence: High

## P2-D-311 — Key error + fragment ExplanationCorrect: correct multi-method statement at B, key at D
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: Choices.B "Risk identification should use a combination of methods tailored to the entity's context to surface a broad range of risks" vs CorrectChoice "D"; ExplanationWrongB: "Option B is wrong because a combination of methods ... is the framework's approach"
- Proposed fix: "CorrectChoice": "D" → "CorrectChoice": "B"; ExplanationWrongB → ""; author ExplanationWrongD (quant-only reliance misses emerging/qualitative risks); replace fragment ExplanationCorrect with full derivation naming Option B
- Confidence: High

## P2-D-314 — Key error: correct willingness-below-capacity rationale at A, key at C
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: Choices.A "Appetite is set below capacity because the board chooses the risk it is willing to take, which is normally less than the maximum it could absorb" vs CorrectChoice "C" ("Appetite is set below capacity only when regulators require it"); ExplanationWrongA affirms A's content while calling it wrong.
- Proposed fix: "CorrectChoice": "C" → "CorrectChoice": "A"; ExplanationWrongA → ""; author ExplanationWrongC (regulators impose minimum capital, they do not set the board's appetite); rewrite ExplanationCorrect/source_support/uniqueness_note to name Option A
- Confidence: High

## P2-D-315 — Key error: correct Share response at B, key at D
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: Choices.B "Share, because the development risk is distributed between the joint venture partners" vs CorrectChoice "D"; ExplanationWrongB: "Option B is wrong because the joint venture distributes the development risk between the partners — that is the Share response"
- Proposed fix: "CorrectChoice": "D" → "CorrectChoice": "B"; ExplanationWrongB → ""; author ExplanationWrongD (Accept would retain the full development risk); rewrite ExplanationCorrect/source_support/uniqueness_note to name Option B
- Confidence: High

## P2-D-318 — Key error: correct risk-adjusted-metrics statement at A, key at C
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: Choices.A "Performance metrics should be adjusted for risk so that reported results reflect the risk taken to achieve them" vs CorrectChoice "C"; ExplanationWrongA: "Option A is wrong because risk-adjusted performance metrics are the correct integration — reported results should reflect the risk taken"
- Proposed fix: "CorrectChoice": "C" → "CorrectChoice": "A"; ExplanationWrongA → ""; author ExplanationWrongC (ERM is not confined to risk functions); rewrite ExplanationCorrect/source_support/uniqueness_note to name Option A
- Confidence: High

## P2-D-319 — Key error: correct risk-score-input purpose at A, key at D
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: Choices.A "It provides the inputs for computing risk scores and prioritizing risks on the heat map" vs CorrectChoice "D"; ExplanationWrongA: "Option A is wrong because recording likelihood and impact provides the inputs for risk scores and heat-map prioritization"
- Proposed fix: "CorrectChoice": "D" → "CorrectChoice": "A"; ExplanationWrongA → ""; author ExplanationWrongD (register is not limited to largest risks); rewrite ExplanationCorrect/source_support/uniqueness_note to name Option A
- Confidence: High

## P2-D-324 — Key error: correct risk-committee structure at B, key at A
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: Choices.B "The risk committee should own ERM while the audit committee focuses on financial reporting and internal control, avoiding over-concentration of oversight" vs CorrectChoice "A"; ExplanationWrongB concedes B's structure avoids over-concentrating oversight.
- Proposed fix: "CorrectChoice": "A" → "CorrectChoice": "B"; ExplanationWrongB → ""; author ExplanationWrongA (defaulting ERM to audit over-concentrates oversight); rewrite ExplanationCorrect/source_support/uniqueness_note to name Option B
- Confidence: High

## P2-D-327 — Key error: correct measurable-leading KRI characteristics at A, key at D
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: Choices.A "The KRI is measurable, reliable, and leading — moving before the risk materializes so management can act" vs CorrectChoice "D"; ExplanationWrongA concedes A states the useful-KRI characteristics.
- Proposed fix: "CorrectChoice": "D" → "CorrectChoice": "A"; ExplanationWrongA → ""; author ExplanationWrongD (a fixed indicator cannot signal change); rewrite ExplanationCorrect/source_support/uniqueness_note to name Option A
- Confidence: High

## P2-D-333 — ExplanationCorrect contradicts key by letter (B vs A references)
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: CorrectChoice "B" but ExplanationCorrect: "Routing the emerging risk to the risk committee ... Option A states this"; source_support_for_key.key_conclusion: "Route to the risk committee with ongoing monitoring — Option A."; uniqueness_note maps the routing to A.
- Proposed fix: ExplanationCorrect before "Option A states this" → after "Option B states this"; key_conclusion before "— Option A." → after "— Option B."; uniqueness_note before "Option A routes to the risk committee" → after "Option B routes to the risk committee" (CorrectChoice B and Choices.B text already correct; no key change)
- Confidence: High

## P2-D-335 — Key error: correct adjust-the-plan action at A, key at D
- Dimension: 1 Correctness
- Severity: Critical
- Evidence: Choices.A "Adjust the recovery plan and liquidity buffer so the bank can cover the 60-day target under stress" vs CorrectChoice "D"; ExplanationWrongA concedes A is the correct action.
- Proposed fix: "CorrectChoice": "D" → "CorrectChoice": "A"; ExplanationWrongA → ""; author ExplanationWrongD (45-day coverage is not sufficient against a 60-day target); rewrite ExplanationCorrect/source_support/uniqueness_note to name Option A
- Confidence: High

## P2-D-405 — Near-identical correct-vs-distractor pair (two defensible answers)
- Dimension: 2 Precision
- Severity: High
- Evidence: Choice A "R2 score 9, R3 score 10, R1 score 20; R1 exceeds tolerance and is highest priority, while R2 and R3 are within tolerance but should be monitored in aggregate" vs Choice B (key) "R1 score 20 (4 x 5), R2 score 9 (3 x 3), R3 score 10 (5 x 2); R1 exceeds tolerance 12 and is highest priority, while R2 and R3 are within tolerance but contribute to aggregate exposure". ExplanationWrongA concedes A scores correctly yet refutes a claim A does not make.
- Proposed fix: Choices.A before "…while R2 and R3 are within tolerance but should be monitored in aggregate" → after "…while R2 and R3 are within tolerance and can be ignored entirely with no further monitoring". ExplanationWrongA → after "Choice A correctly scores 20, 9, 10 but concludes R2 and R3 can be ignored; the error drops the portfolio view, which requires monitoring aggregate exposure of 9 + 10 for correlation and velocity even when each risk is within tolerance."
- Confidence: High

## P2-D-450 — Choice lead-in polarity contradiction plus drafting artifact in learner-facing text
- Dimension: 2 Precision
- Severity: Medium
- Evidence: Choices.A "Yes, debt to equity becomes $30 million / $40 million = 0.75? No  -  $30 / $40 = 0.75 exceeds 0.70, so actually no; wait recomputed: $24m + $6m = $30m, 0.75 exceeds 0.70, and volatility $1.2m is below $5m, but leverage breaches so the proposal is outside appetite". Lead-in "Yes" contradicts concluding "outside appetite" (DL-037 class); "? No  - " / "wait recomputed:" is author drafting self-talk. Key (A) arithmetically correct: $24m+$6m=$30m, $30m/$40m=0.75 > 0.70.
- Proposed fix: Choices.A before (quoted above) → after "No, debt to equity becomes $30 million / $40 million = 0.75, which exceeds the 0.70 limit, so the proposal is outside appetite even though volatility $1.2 million remains within the $5 million limit". CorrectChoice unchanged (A).
- Confidence: High

## P2-D-455 — Complete-answer vs partial-answer both factually defensible
- Dimension: 2 Precision
- Severity: Medium
- Evidence: Choice B (key) "Inherent $480,000 (0.06 x $8,000,000) exceeding $400,000, with monitoring residual 0.03 x $8,000,000 = $240,000 inside tolerance but total cost $900,000 + $240,000 = $1,140,000, a $660,000 net increase over inherent, so tolerance benefit must justify cost" vs Choice C "Inherent $480,000 and monitored residual $240,000, so monitoring reduces expected loss by $240,000 for $900,000 spend, a substantial net increase requiring non-quantitative tolerance justification". C's numbers are correct and its conclusion matches B's; differentiated only by omitting totals.
- Proposed fix: Choices.C before (quoted above) → after "Inherent $480,000 and monitored residual $240,000, so monitoring is automatically justified on expected cost alone and no tolerance, variance, or trust assessment is needed". Rewrite ExplanationWrongC accordingly.
- Confidence: Medium

## P2-D-401 — Difficulty inflation on dashboard-design item
- Dimension: 3 Difficulty Calibration
- Severity: Low
- Evidence: Difficulty "Difficult", DifficultyScore 4, CognitiveLevel "Apply" for "Tailor information by audience, prioritize tolerance breaches and emerging risks, define a 2-day escalation path with clear owners, and report the portfolio view with actionable insights rather than raw data" against transparently wrong distractors; sibling P2-D-480 tests the identical demand at "Moderate-Easy"/2/"Understand".
- Proposed fix: Difficulty before "Difficult" → after "Moderate-Easy"; DifficultyScore before 4 → after 2; CognitiveLevel retained "Apply".
- Confidence: Medium

## P2-D-461 — Difficulty + cognitive inflation, same dashboard demand as P2-D-401/P2-D-480
- Dimension: 3 Difficulty Calibration
- Severity: Low
- Evidence: Difficulty "Difficult", DifficultyScore 4, CognitiveLevel "Analyze" for the 50-indicator variant of P2-D-401's stem; stem asks which design "best applies" (Apply verb); P2-D-480 calibrates the same demand at Understand/2.
- Proposed fix: Difficulty before "Difficult" → after "Moderate-Easy"; DifficultyScore before 4 → after 2; CognitiveLevel before "Analyze" → after "Apply".
- Confidence: Medium

## P2-D-495 — Difficulty + cognitive inflation, same dashboard demand (55-indicator variant)
- Dimension: 3 Difficulty Calibration
- Severity: Low
- Evidence: Difficulty "Difficult", DifficultyScore 4, CognitiveLevel "Analyze" against "Increase push to 110 indicators", "Report only financial risks", "Limit communication to senior executives"; identical demand to P2-D-401 (Apply/4) and P2-D-480 (Understand/2).
- Proposed fix: Difficulty before "Difficult" → after "Moderate-Easy"; DifficultyScore before 4 → after 2; CognitiveLevel before "Analyze" → after "Apply".
- Confidence: Medium

## P2-D-479 — Difficulty inflation on velocity-ordering item
- Dimension: 3 Difficulty Calibration
- Severity: Low
- Evidence: Difficulty "Difficult", DifficultyScore 4, CognitiveLevel "Apply" for "P has highest velocity (2 days), then R (14 days), then Q (90 days); P warrants immediate mitigation and monitoring, Q allows planned mitigation" — ordering three given day-counts plus faster = more urgent.
- Proposed fix: Difficulty before "Difficult" → after "Moderate-Easy"; DifficultyScore before 4 → after 2; CognitiveLevel retained "Apply".
- Confidence: Medium

## P2-D-451 — Verification scaffolding and self-contradictory distractor in learner-facing choices
- Dimension: 2 Precision
- Severity: Low
- Evidence: Choices.B (key) "RAROC 57.8%? Recomputed: $2,100,000 - $1,400,000 - $180,000 = $520,000, $520,000 / $900,000 = 57.78% and exceeds 15.0% hurdle" — "?" and "Recomputed:" are author scaffolding. Choices.A "RAROC 57.8% ($520,000 / $900,000) but uses revenue alone" is self-contradictory: $520,000 is the net numerator, not revenue alone (revenue alone = $2,100,000 / $900,000 = 233.33%). Key arithmetically correct: $520,000/$900,000=57.78% > 15.0%.
- Proposed fix: Choices.B before (quoted above) → after "RAROC 57.78% ($520,000 / $900,000), which exceeds the 15.0% hurdle". Choices.A before (quoted above) → after "RAROC 233.33% ($2,100,000 / $900,000) using revenue alone without deducting costs or expected loss, exceeding the hurdle". Rewrite ExplanationWrongA accordingly.
- Confidence: High

## P2-D-467 — Draft self-correction artifact in learner-facing ExplanationCorrect
- Dimension: 2 Precision
- Severity: Low
- Evidence: ExplanationCorrect "…expected profit = $9M x 0.18 = $1.62M margin? Wait margin already on revenue: $9M x 18% = $1,620,000 contribution, which is actually less than $2.8M expected loss…" — "? Wait … :" is author draft self-talk. Underlying analysis correct ($1.62M < $2.8M; $12M tail vs $10M tolerance).
- Proposed fix: ExplanationCorrect before "expected profit = $9M x 0.18 = $1.62M margin? Wait margin already on revenue: $9M x 18% = $1,620,000 contribution, which is actually less than $2.8M expected loss" → after "expected contribution = $9M x 18% = $1,620,000, which is actually less than the $2.8M expected loss".
- Confidence: High

## P2-D-456 — Circular definition in correct choice
- Dimension: 2 Precision
- Severity: Low
- Evidence: Choices.C (key) "The types and amount of risk Flash is willing to accept in pursuit of strategy and value, set by the board and linked to appetite" — defines appetite as "linked to appetite" (circular); sibling P2-D-486 phrases it as "linked to creating and preserving value".
- Proposed fix: Choices.C before (quoted above) → after "The types and amount of risk Flash is willing to accept in pursuit of strategy and value, set by the board and linked to creating and preserving value".
- Confidence: Medium

## P2-D-433 — Self-contradictory distractor label
- Dimension: 4 Distractor Engineering
- Severity: Low
- Evidence: Choices.A "W high $250,000, X medium $250,000, Y low $120,000, Z high $250,000  -  all below $400,000" labels $250,000 items "high" while stating "all below $400,000" when the stem defines high as above $400,000 (computations W/X/Z $250,000 medium, Y $120,000 low per key D are correct).
- Proposed fix: Choices.A before (quoted above) → after "W high $250,000, X high $250,000, Y medium $120,000, Z high $250,000".
- Confidence: Medium

## P2-D-415 — ExplanationWrongB misdescribes Choice B's error
- Dimension: 4 Distractor Engineering
- Severity: Low
- Evidence: ExplanationWrongB "Choice B understates the comparison by miscomputing retained loss; the misconception calculates residual incorrectly as $48,000 for insurance…" vs Choice B "Option R residual expected loss $48,000 (0.08 x 600,000) saving $72,000 for $35,000 cost, net $37,000, while Option S leaves higher total cost including premium and counterparty risk" — B's error is the verdict (S costlier) when S totals $64,000 vs R $83,000. Key A verified correct.
- Proposed fix: ExplanationWrongB before (quoted above) → after "Choice B reaches the wrong verdict by asserting Option S leaves higher total cost; the error skips the total-cost arithmetic showing Option S at $24,000 retained expected loss plus $40,000 premium = $64,000 beats Option R at $48,000 plus $35,000 = $83,000, overweighting counterparty risk against a $19,000 expected saving."
- Confidence: Medium

## P2-D-463 — VerifiedChecks cites wrong choice letter (internal metadata)
- Dimension: Structural
- Severity: Informational
- Evidence: VerifiedChecks "Recomputed: X 0.10 x 3,000,000 = 300,000, Y 0.30 x 800,000 = 240,000, Z 0.05 x 5,000,000 = 250,000 -- independently verified: matches Choice B $300,000 top rank" — CorrectChoice is A ("X > Z > Y"); Choice B states "X > Y > Z". Numbers verified correct (X $300,000 > Z $250,000 > Y $240,000 = key A). Not learner-facing.
- Proposed fix: VerifiedChecks before "matches Choice B $300,000 top rank" → after "matches Choice A X > Z > Y ranking (X $300,000 top)".
- Confidence: High

## P2-D-457 — Near-verbatim duplicate of P2-D-396 with inconsistent calibration
- Dimension: Structural
- Severity: Informational
- Evidence: P2-D-457 stem "Flash Dynamics analyst Samuel Okonkwo, Board member, is leading the annual ERM briefing at Flash's Detroit operations center. Flash has $210 million assets, targets 8.0% return on assets, and the board approved $4 million in acceptable earnings volatility." vs P2-D-396 stem "Flash Manufacturing professional Amara Okafor, Board member, is leading the board orientation for new directors at Flash's Cleveland plant. The packet states Flash holds $210 million in assets, targets 8.0% return on assets, and the board has approved a risk appetite that allows up to $4 million in annual earnings volatility." — identical parameters/concept/proposition, labeled Remember/1 (396) vs Understand/2 (457). Both keys correct; redundant measurement, split calibration.
- Proposed fix: None now (read-only); on next content pass, differentiate parameters/context of one item and align both to Remember/1, or archive one per the numeric-multiset + Topic clone gate.
- Confidence: High

---

## Grouped findings — multi-QID metadata patterns (each entry covers the listed QIDs)

## P2-D-216 through P2-D-245 — distractor_intent includes key letter; missing why_plausible + tier_candidate (30 items)
- Dimension: 4 Distractor Engineering
- Severity: Low
- Evidence: Byte-measured over all 30 items (P2-D-216..P2-D-245): distractor_intent keys = "ABCD" (includes the CorrectChoice letter) instead of exactly the 3 non-key letters; every entry carries only "misconception" with no "why_plausible" and no "tier_candidate". Learner-facing ExplanationWrong slots intact (all non-CC ≥50 chars, EW[CC]=""), so authoring-metadata only.
- Proposed fix: For each item, delete the key-letter entry from distractor_intent; add non-empty "why_plausible" and "tier_candidate" 1/2/3 (unique) to the 3 non-key entries. No learner-facing text changes.
- Confidence: High

## P2-D-250, P2-D-259, P2-D-261, P2-D-262, P2-D-264, P2-D-266, P2-D-267, P2-D-269, P2-D-270, P2-D-271, P2-D-273, P2-D-274, P2-D-275 — distractor_intent misconception text duplicated across slots or mismatched to choice content (13 items)
- Dimension: 4 Distractor Engineering
- Severity: Low
- Evidence: P2-D-250 intent A/B/D all "Thinks any mitigation effort means Reduce" (identical ×3); P2-D-259 A/B/C all "Computes B correctly but picks the wrong program"; P2-D-261 A and C both "Defaulting to compliance for anything regulatory"; P2-D-262 A/B/D all "Halves the portfolio in the computation"; P2-D-264 B and C share "Purchasing coverage feels like removing the problem"; P2-D-266 A and D share "Places the trigger at the absolute limit"; P2-D-267 A and B share "Classifies by reputational consequence"; P2-D-269 A/C/D all "Substitutes rationalization for opportunity"; P2-D-270 A and B share "Treats a second supplier as a transfer"; P2-D-271 A/B/C all "Compares the loan amount to the loss appetite directly"; P2-D-273 A and D share "Treats any residual risk as unacceptable"; P2-D-274 A/B/D all "Treats the severe scenario as the base forecast"; P2-D-275 A/B/C all "Makes the CRO the sole owner of all risks". Learner-facing EWs choice-specific; metadata-only.
- Proposed fix: Rewrite each listed intent entry with a choice-specific misconception + why_plausible (keep existing tier_candidate values).
- Confidence: High

## P2-D-247, P2-D-248, P2-D-249, P2-D-254, P2-D-255, P2-D-256, P2-D-257, P2-D-258, P2-D-263, P2-D-276, P2-D-277, P2-D-278, P2-D-279, P2-D-280, P2-D-281, P2-D-282, P2-D-283, P2-D-284, P2-D-285, P2-D-286, P2-D-287, P2-D-288, P2-D-289, P2-D-290, P2-D-291, P2-D-292, P2-D-293, P2-D-294, P2-D-295, P2-D-296, P2-D-297, P2-D-298, P2-D-299, P2-D-300 — distractor_intent generic placeholder text on all three non-key slots (34 items)
- Dimension: 4 Distractor Engineering
- Severity: Low
- Evidence: All three non-key intent entries read "Chooses this option based on a surface reading of the scenario" / "The option restates scenario language without the deeper framework distinction" (byte-verified across all 34 items). Keys/tiers/why_plausible structurally present and EW[CC]="", non-CC EWs ≥50 chars and choice-specific — learner feedback intact; engineering documentation is placeholder.
- Proposed fix: Author choice-specific misconception + why_plausible per slot (retain tier_candidate values); no learner-facing changes. Prioritize the 10 Critical-key items in this set (249, 258, 277, 281, 284, 289, 290, 293, 297) during their key repair.
- Confidence: High

## P2-D-248, P2-D-252, P2-D-255, P2-D-259, P2-D-262, P2-D-268, P2-D-278, P2-D-282, P2-D-286, P2-D-290, P2-D-299 — CalculationItem false on items requiring candidate computation (11 items)
- Dimension: Structural
- Severity: Low
- Evidence: Each stem requires arithmetic: 248 PD×EAD×LGD; 252 four L×S products; 255 0.40×$5M×0.30; 259 620K+250K vs 410K+500K; 262 1.65×0.02×$50M; 268 12/80 vs 9/45; 278 0.05×$2M vs 0.02×$4.5M; 282 4 products; 286 ($1M−$400K)−$300K; 290 650K+100K vs 480K+300K; 299 $18M−$12M vs $15M−$5M. All carry "CalculationItem": false (sibling calc items 202/203/206/208 carry true).
- Proposed fix: "CalculationItem": false → true on all 11 items. No other changes.
- Confidence: High

## P2-D-301, P2-D-302, P2-D-303, P2-D-304, P2-D-305, P2-D-306, P2-D-307, P2-D-308, P2-D-309, P2-D-310, P2-D-311, P2-D-312, P2-D-313, P2-D-314, P2-D-315, P2-D-316, P2-D-317, P2-D-318, P2-D-319, P2-D-321, P2-D-322, P2-D-323, P2-D-324, P2-D-326, P2-D-327, P2-D-328, P2-D-329, P2-D-330, P2-D-331, P2-D-332, P2-D-333, P2-D-334, P2-D-335 — distractor_intent verbatim copy-paste boilerplate, not item-specific misconceptions (33 items)
- Dimension: 4 Distractor Engineering
- Severity: Medium
- Evidence: All three slots per item share byte-identical text: "misconception": "Chooses this option based on a surface reading of the scenario" / "why_plausible": "The option restates scenario language without the deeper framework distinction" (verified on P2-D-301 through P2-D-319 and P2-D-321–324/326–335; P2-D-320 and P2-D-325 are the only items in the 301–335 cohort with genuinely item-specific distractor_intent). Includes P2-D-308 computation labeled Remember with CalculationItem false: item computes (0.20×$500,000)+(0.10×$2,000,000)=$300,000 yet "CognitiveLevel": "Remember", "CalculationItem": false — fix to Apply/true with item-specific intents (B: mid-outcome-as-expectation; C: unweighted sum; D: misweighted tail).
- Proposed fix: Replace each generic triple with item-specific misconception + why_plausible entries (retain tier_candidate values); for P2-D-308 additionally "CognitiveLevel": "Remember" → "Apply" and "CalculationItem": false → true. No learner-facing text changes except none.
- Confidence: High

---

## Measured distributions (counted from raw file — orchestrator-verified via Function-constructor parse, 500/500 items)

**CognitiveLevel:** Remember 38, Understand 106, Apply 197, Analyze 101, Evaluate 58 (total 500).
Per-range: 001-100 R6/U37/Ap33/An15/E9; 101-200 R8/U15/Ap44/An20/E13; 201-300 R7/U21/Ap42/An22/E8; 301-400 R10/U21/Ap32/An23/E14; 401-500 R7/U12/Ap46/An21/E14.

**DifficultyScore:** 1 → 69, 2 → 107, 3 → 167, 4 → 107, 5 → 50 (total 500).
Per-range: 001-100 14/27/39/15/5; 101-200 13/20/34/21/12; 201-300 16/21/34/24/5; 301-400 13/19/30/24/14; 401-500 13/20/30/23/14.
Difficulty labels track scores 1:1 (Easy 69, Moderate-Easy 107, Moderate 167, Difficult 107, Very Difficult 50) except P2-D-216 and P2-D-231 (label "Easy" with score 2 — filed above).

**Structural screens (pool-wide, orchestrator-verified):** DL-008 0 violations (every EW[CC] == ""); DL-026 0 violations (every non-key EW present, ≥50 chars); Part2OnlyFlag strictly true 500/500; QID format P2-D-NNN 500/500; ItemStyle single-select 500/500; CognitiveLevel + DifficultyScore present 500/500; BlueprintDomain "Risk Management" 500/500; LOSTag D.1–D.5 throughout, no cross-domain drift. distractor_intent present on 135/500 items (concentrated P2-D-216..335); absent elsewhere (conditional check N/A there).

---

## Findings grouped by dimension

**Dimension 1 Correctness (Critical/High cluster — dominant pattern: stored key or EC/support/note option letters rotated off the true answer):** P2-D-177, P2-D-181, P2-D-124, P2-D-174 (EW ratios + EC fragment), P2-D-214 (key), P2-D-236, P2-D-246, P2-D-249, P2-D-250, P2-D-251, P2-D-253, P2-D-254, P2-D-256, P2-D-257, P2-D-258, P2-D-263, P2-D-266, P2-D-267, P2-D-268, P2-D-269, P2-D-271, P2-D-272, P2-D-273, P2-D-274, P2-D-275, P2-D-277, P2-D-281, P2-D-284, P2-D-289, P2-D-290, P2-D-293, P2-D-297, P2-D-301, P2-D-304, P2-D-305, P2-D-311, P2-D-314, P2-D-315, P2-D-318, P2-D-319, P2-D-324, P2-D-327, P2-D-333, P2-D-335. All calculation keys outside the listed mismatches recomputed twice and agree with stored keys.

**Dimension 2 Precision:** P2-D-008 (duplicate key), P2-D-167 (two defensible), P2-D-169 (truncated choice), P2-D-185 (two defensible), P2-D-252 (tie, two defensible), P2-D-405 (near-identical pair), P2-D-450 (polarity contradiction + drafting artifact; key arithmetically correct), P2-D-455 (complete vs partial both defensible), P2-D-451 (scaffolding + self-contradictory distractor), P2-D-467 (draft self-talk in EC), P2-D-456 (circular definition).

**Dimension 3 Difficulty Calibration:** P2-D-014, P2-D-005, P2-D-021, P2-D-079, P2-D-088, P2-D-173, P2-D-179, P2-D-214 (Evaluate floor), P2-D-248, P2-D-276, P2-D-278, P2-D-285, P2-D-298, P2-D-308 (in grouped entry), P2-D-401, P2-D-461, P2-D-495, P2-D-479.

**Dimension 4 Distractor Engineering:** P2-D-011, P2-D-012 (non-parallel correct choices), P2-D-194 (foreign figures in EW), P2-D-415, P2-D-433, plus grouped metadata entries: 30-item key-in-letter set (216-245), 13-item duplication set, 34-item placeholder set (247-300), 33-item boilerplate set (301-335). Learner-facing non-key EWs are ≥50 chars and choice-specific throughout (DL-026 0); these are engineering-documentation defects except 011/012/194/415/433.

**Dimension 5 Blueprint Alignment:** 0 findings. All 500 items carry BlueprintDomain "Risk Management", LOSTag D.1–D.5, Topic matching stem. No cross-domain drift.

**Dimension 6 Part 2 Relevance (tests Part 2 material; not from another exam part):** 0 findings. All 500 items test Part 2 Risk Management material; Part2OnlyFlag strictly true 500/500.

**Structural:** P2-D-216, P2-D-231 (Easy/DS2 mismatch), P2-D-292 (note letter swap), P2-D-463 (VerifiedChecks letter), P2-D-457 (near-duplicate + split calibration), 11-item CalculationItem-false group.

---

## Summary table

| Metric | Count |
|---|---|
| Items reviewed (P2-D-001..P2-D-500, zero gaps) | 500 |
| Items clean (zero findings) | 350 (001-100: 92; 101-200: 90; 201-300: 15; 301-400: 67; 401-500: 86) |
| QIDs with ≥1 finding | 150 |
| Single-QID finding entries | ~107 |
| Grouped multi-QID entries (metadata patterns) | 5 (covering 30 + 13 + 34 + 11 + 33 items, overlapping) |
| Critical entries | 24 (P2-D-008, P2-D-177, P2-D-214-key, P2-D-249, P2-D-258, P2-D-277, P2-D-281, P2-D-284, P2-D-289, P2-D-290, P2-D-293, P2-D-297, P2-D-301, P2-D-304, P2-D-305, P2-D-311, P2-D-314, P2-D-315, P2-D-318, P2-D-319, P2-D-324, P2-D-327, P2-D-333, P2-D-335) |
| High entries | 25 (P2-D-124, P2-D-167, P2-D-181, P2-D-185, P2-D-194, P2-D-236, P2-D-246, P2-D-250, P2-D-251, P2-D-252, P2-D-253, P2-D-254, P2-D-256, P2-D-257, P2-D-263, P2-D-266, P2-D-267, P2-D-268, P2-D-269, P2-D-271, P2-D-272, P2-D-273, P2-D-274, P2-D-275, P2-D-405) |
| Medium entries | ~45 (incl. 33-item boilerplate group) |
| Low entries | ~20 single + 4 grouped metadata sets |
| Informational entries | 2 (P2-D-457, P2-D-463) |
| Items without HIGH-confidence verdict on every dimension (Medium-confidence flags) | 18: P2-D-005, P2-D-014, P2-D-021, P2-D-088, P2-D-173, P2-D-179, P2-D-236, P2-D-276, P2-D-285, P2-D-298, P2-D-401, P2-D-415, P2-D-433, P2-D-455, P2-D-456, P2-D-461, P2-D-479, P2-D-495 (all Medium on calibration/precision wording only; Correctness/Structural at High) |
| DL-008 / DL-026 / Part2OnlyFlag violations | 0 / 0 / 0 (orchestrator-verified pool-wide) |

**Dominant patterns for the fix wave:** (a) P2-084-D2 batch EC/support/note option letters systematically rotated off CorrectChoice (ranges 246-300, 301-335) — most escalate to wrong-key Critical; (b) distractor_intent placeholder/boilerplate or key-letter inclusion across P2-D-216..335 (metadata-only, learner feedback intact); (c) isolated key inversions with self-refuting ECs (177, 214, 277, 281, 284, 289, 290, 293, 297). No pack file modified — all fixes above are proposals for later authorization.
