# Session 81 — Matching Item Auditor Report

**Generated:** 2026-07-30
**Governance Lane:** Full
**Stage:** 2 — Auditor

---

## Audit Findings — 6 Wave 1 Items

### Item 1: CBQ-E1-Q5 (case_pack_1_corrected.js:6493)
- **Case:** CBQ-E1 — Accounts Payable Controls and SOX Evaluation
- **Prompt:** "Match each control to preventive or detective."
- **LeftItems (4):** Independent vendor approval, Three-way match before payment, Duplicate-payment report review, Bank reconciliation
- **RightItems (4):** Preventive, Preventive, Detective, Detective
- **Correct:** {Vendor→Preventive, 3-way→Preventive, Dup-report→Detective, Bank→Detective}
- **Class A:** 2× same-answer reuse (Preventive→2 items, Detective→2 items)
- **Class B:** 2× duplicate RightItems (Preventive 2×, Detective 2×)
- **Fix:** Replace binary labels with distinct COSO-principled descriptions per control. Expand RightItems from 4 to 6+.

### Item 2: CBQ3-D1-Q6 (case_pack_2_corrected.js:4346)
- **Case:** CBQ3-D1 — Absorption vs Variable Costing
- **Prompt:** "Match each cost item to its classification under variable costing."
- **LeftItems (4):** DM, DL, VOH, Fixed MOH
- **RightItems (4):** Product cost, Product cost, Product cost, Period cost
- **Correct:** {DM→Product cost, DL→Product cost, VOH→Product cost, FOH→Period cost}
- **Class A:** 3× same-answer reuse ("Product cost"→3 items)
- **Class B:** 3× duplicate RightItems
- **Fix:** Replace "Product cost" with distinct labels: "Product cost — direct materials," "Product cost — direct labor," "Product cost — variable overhead." Add 1-2 extra distractors.

### Item 3: CBQ2-C1-Q1 (case_pack_1_corrected.js:3952)
- **Case:** CBQ2-C1 — Flexible Budget and Sales Variance Analysis
- **Prompt:** "Match each variance category to the correct variance amount shown in Exhibit 1."
- **LeftItems (4):** Sales price var, DM efficiency var, DM price var, Labor rate var
- **RightItems (5):** Cannot be determined..., Requires separate...(3×), Is exactly equal to...
- **Correct:** {Sales→Cannot, DM eff→Requires, DM price→Requires, Labor→Requires}
- **Class A:** 3× same-answer reuse ("Requires separate..."→3 items)
- **Class B:** 3× duplicate RightItems
- **Fix:** Split into distinct descriptions per variance type, referencing what specific data each variance needs.

### Item 4: CBQ4-F2-Q2 (case_pack_3_corrected.js:6697)
- **Case:** CBQ4-F2 — Artificial Intelligence & ML
- **Prompt:** "For each ML application, select whether it uses supervised or unsupervised learning."
- **LeftItems (4):** Demand forecasting, Fraud detection, Customer segmentation, Anomaly detection
- **RightItems (4):** Supervised learning, Unsupervised learning, Reinforcement learning, Semi-supervised learning
- **Correct:** {Demand→Supervised, Fraud→Supervised, Customer→Unsupervised, Anomaly→Unsupervised}
- **Class A:** 2× same-answer reuse (Supervised→2, Unsupervised→2)
- **Class B:** None (each RightItem appears once)
- **Fix:** Expand generic ML labels to distinct descriptions per application. Utilize unused distractors as correct answers for redesigned prompts.

### Item 5: CBQ3-A2-Q5 (case_pack_2_corrected.js:705)
- **Case:** CBQ3-A2 — Cash Flow Indirect Method
- **Prompt:** "Match the cash flow activity to its classification."
- **LeftItems (4):** Depreciation expense, Gain on sale of asset, Decrease in inventory, Decrease in AP
- **RightItems (4):** Add back to NI (Operating), Deduct from NI (Operating), Add to NI (Operating), Report in Investing Activities
- **Correct:** {Deprec→Add back, Gain→Deduct, Dec inv→Add to, Dec AP→Deduct}
- **Class A:** "Deduct from NI" maps to 2 items (Gain on sale AND Decrease in AP)
- **Class B:** None
- **Fix:** Distinguish the two deduction cases: "Deduct from NI — non-operating gain removal" vs. "Deduct from NI — working capital decrease."

### Item 6: CBQ5-C3-Q2 (case_pack_3_corrected.js:3139)
- **Case:** CBQ5-C3 — Sales Variance Decomposition
- **Prompt:** "Match each variance concept to the correct calculated result."
- **LeftItems (4):** SVV=$230K F, SQV formula, Market Size formula, Market Share formula
- **RightItems (5):** $198K F, $330K F, $132K U, $32K F (mix), $230K U (distractor)
- **Correct:** {SVV→$198K F, SQV→$198K F, Market Size→$330K F, Market Share→$132K U}
- **Class A:** SVV and SQV both map to $198K F
- **Answer-key concern:** LeftItem states SVV=$230K F but Correct maps to $198K F. The explanation confirms SVV=$230K F = SMV($32K)+SQV($198K). This is a content error — SVV should map to $230K F, not $198K F.
- **Fix:** Add new RightItem "$230,000 Favorable — combines $198K quantity + $32K mix." Re-map SVV to this. Keep SQV at $198K F. Remove incorrect "$230,000 Unfavorable" distractor (or repurpose it).

---

## Impact Summary

| Item | File | Class A | Class B | Certified | Answer-Key Change |
|------|------|---------|---------|-----------|-------------------|
| CBQ-E1-Q5 | case_pack_1 | 2 clusters | 2 duplicates | Yes | No |
| CBQ3-D1-Q6 | case_pack_2 | 1 cluster (3×) | 3 duplicates | Yes | No |
| CBQ2-C1-Q1 | case_pack_1 | 1 cluster (3×) | 3 duplicates | Yes | No |
| CBQ4-F2-Q2 | case_pack_3 | 2 clusters | None | Yes | No |
| CBQ3-A2-Q5 | case_pack_2 | 1 cluster (2×) | None | Yes | No |
| CBQ5-C3-Q2 | case_pack_3 | 1 cluster (2×) | None | Yes | **Yes** |

---

## Risk Assessment

- **CBQ5-C3-Q2 answer-key change:** Low risk. Explanation text confirms SVV=$230K F. The current mapping is a known defect — fixing it restores accuracy. Will document per Rule 4 with independent recalculation note.
- **All other items:** Wording-only changes. No Correct mapping semantics changed.
- **Concurrent-write risk:** Low — only one session editing these files.
- **Batch cap compliance:** 6 items ≤ 28 per Rule 5.
