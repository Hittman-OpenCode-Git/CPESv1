# S102P — Phase 0 Forensic Reconstruction Report

**Date:** 2026-07-31
**Session:** S102P (Per-Item Reconstruct-Audit)
**Lane:** Full Governance
**Scope:** P1-FD-040, P1-FD-046, P1-FD-050 (Pack D, Section F)
**File:** `pack_d_corrected.js`
**Methodology:** Boundary-aware object parsing + neighboring-item cross-reference + rotation-group pattern analysis

---

## Executive Summary

All three items are DL-016 rotation artifacts from the S899 Phase 1 replacement wave that replaced archived DL-012 rotation clones with new authored content. Each item has ExplanationWrong fields that describe a **different** item's topic rather than its own learner-facing content.

| QID | Content Present? | EW Source | Confidence | Action |
|-----|-----------------|-----------|------------|--------|
| **P1-FD-040** | Yes (complete) | Shifted +1 from FD-041 | **HIGH** | Repair candidate |
| **P1-FD-046** | No (SCRATCH AUTHOR) | Shifted +1 from FD-047 | **LOW** | Isolate — no content to anchor |
| **P1-FD-050** | Yes (complete, metadata mismatch) | Shifted +1 from FD-051 | **MEDIUM** | Can repair EWs; DifficultyScore/CognitiveLevel also mislabeled |

**Preflight:** PASS (0 divergences, 2451 Certified, Pack D 456/500 Certified)

---

## Item 1: P1-FD-040 — Structured vs Unstructured Data

### 1.1 Current State

**Location:** `pack_d_corrected.js` lines 23480–23529

**Content block (internally consistent):**
- **Stem:** "Orchardgate manages both data stored in traditional relational database tables and data from emails, videos, and social media posts. What describes the second category of data?"
- **Choices:**
  - A: "Structured data, identical in format to database tables"
  - B: "Metadata, which only describes other data"
  - C: "Master data, which represents core reference information"
  - D: "Unstructured data, which does not fit neatly into predefined rows and columns"
- **CorrectChoice:** D
- **ExplanationCorrect:** "Unstructured data, such as emails, videos, and social media content, does not fit into predefined rows and columns like structured, tabular database data."
- **question_state:** "Active"
- **DifficultyScore:** 4, **CognitiveLevel:** "Analyze"

**Metadata block (EW fields — DEFECTIVE, describe FD-041's authentication topic):**
- **ExplanationWrongA:** "Option A recommends adding a second factor (SMS code) to complement the existing two factors (password + digital certificate)..." — **TOPIC MISMATCH** (describes cybersecurity authentication, not structured data)
- **ExplanationWrongB:** "Option B correctly recommends moving from password-based authentication but recommends the wrong technology. Biometric authentication..." — **TOPIC MISMATCH** (describes authentication)
- **ExplanationWrongC:** "Option C proposes a hardware token solution that addresses 'what you have' (the FIDO2 key)..." — **TOPIC MISMATCH** (describes FIDO2 authentication)
- **ExplanationWrongD:** "" — **CORRECT** (CC slot, DL-008 compliant)

### 1.2 Rotation Group Evidence

P1-FD-040 is position 5 of 5 in the "structured vs unstructured data" DL-012 rotation group. The original group (now all Archived) had identical stems varying only by company name, with the correct answer (Unstructured data) rotating through positions A→B→C→D:

| QID | Line | Company | CC | State |
|-----|------|---------|-----|-------|
| P1-FD-036 | 23280 | Kirkwood | D | Archived |
| P1-FD-037 | 23330 | Ledgemont | A | Archived |
| P1-FD-038 | 23380 | Millhaven | B | Archived |
| P1-FD-039 | 23430 | Norwood Peak | C | Archived |
| **P1-FD-040** | **23480** | **Orchardgate** | **D** | **Active** |

### 1.3 Reference EW Texts (from rotation group siblings)

**Source: FD-036 metadata (line 23323)** — describes why "Structured data" is wrong:
> "Structured data fits predefined fields and tables; the stem asks about content that does not fit neatly into that format."

**Source: FD-037 content (line 23374)** — describes why "Metadata" is wrong:
> "Choice C is incorrect because metadata is data about data — attributes such as creation date, author, file size, and data lineage — not the content itself. The stem describes actual content files (emails, videos, posts), not descriptive tags about those files. A candidate may confuse information about data with the underlying data content."

**Source: FD-037 content (line 23375)** — describes why "Master data" is wrong:
> "Choice D is incorrect because master data represents key business entities such as customers, products, suppliers, and chart of accounts that are shared across systems. Emails, videos, and social media content are not master data records but rather unstructured content that does not fit predefined schemas. A candidate may conflate any non-transactional data category."

### 1.4 Reconstructed ExplanationWrong Fields

**ExplanationWrongA** (reconstructed from FD-036 EW_B, expanded):
> "Choice A is incorrect because structured data is the category that fits neatly into predefined rows and columns — as in the relational database tables referenced in the stem. The stem asks about the second category, which is data from emails, videos, and social media posts that does not conform to a fixed schema. A candidate may reverse the two categories or assume all business data is structured."

**ExplanationWrongB** (reconstructed from FD-037 EW_C):
> "Choice B is incorrect because metadata is data about data — attributes such as creation date, author, file size, and data lineage — not the content itself. The stem describes actual content files (emails, videos, posts), not descriptive tags about those files. A candidate may confuse information about data with the underlying data content."

**ExplanationWrongC** (reconstructed from FD-037 EW_D):
> "Choice C is incorrect because master data represents key business entities such as customers, products, suppliers, and chart of accounts that are shared across systems. Emails, videos, and social media content are not master data records but rather unstructured content that does not fit predefined schemas. A candidate may conflate any non-transactional data category with master data."

**ExplanationWrongD:** "" (CC slot — unchanged, DL-008 compliant)

### 1.5 Confidence Assessment

| Dimension | Assessment |
|-----------|-----------|
| Content block integrity | Internally consistent — Stem, Choices, CC, EC all match |
| EW reference quality | HIGH — three reference EW texts from same rotation group (FD-036, FD-037) |
| Topic knowledge requirement | LOW — definition-level question (Bloom's Understand → upgraded to Analyze) |
| Risk of reconstruction error | LOW — reference texts are word-for-word from Certified/Archived items |
| Number of fields to reconstruct | 3 of 4 (EW_A, EW_B, EW_C; EW_D already correct) |

**Confidence: HIGH** — Reconstructed from sibling items in the same rotation group. No original content invention required. All three distractor concepts have reference EW texts within 300 lines of the target item.

---

## Item 2: P1-FD-046 — SCRATCH AUTHOR (MDM Concept Replacement)

### 2.1 Current State

**Location:** `pack_d_corrected.js` lines 23782–23802

**Metadata block:**
- **QuestionID:** "P1-FD-046"
- **question_state:** "Active"
- **DifficultyScore:** 5
- **CognitiveLevel:** "Evaluate"
- **upgrade_note:** "S899 Phase 1 — SCRATCH AUTHOR: Evaluate/Very Difficult replacement for archived P1-FD-046. Original FD-046 was a Remember/Easy definition-match clone (DL-012 rotation)."

**ExplanationWrong fields (DEFECTIVE — describe FD-047's MDM merger topic):**
- **ExplanationWrongA:** "Option A recommends preserving both legacy taxonomies as a risk mitigation strategy, which directly contradicts the purpose of master data management..."
- **ExplanationWrongB:** "Option B correctly identifies that a 'big bang' approach carries risk but proposes the wrong alternative. A phased migration by legacy system..."
- **ExplanationWrongC:** "Option C recommends deferring the decision indefinitely while technology evolves — a governance failure..."
- **ExplanationWrongD:** ""

**Content block: MISSING.** No Stem, Choices, CorrectChoice, or ExplanationCorrect fields exist for this QID.

### 2.2 Forensic Finding

P1-FD-046 is a **SCRATCH AUTHOR** placeholder. The original DL-012 clone was an MDM concept definition question (same as FD-045, FD-048, FD-049, FD-050). S899 Phase 1 was supposed to replace it with an Evaluate/Very Difficult item, but the content was never authored. Only the metadata shell was created, and the EW fields were populated with a draft of FD-047's MDM merger distractor explanations (the +1 DL-016 shift from FD-047).

### 2.3 Confidence Assessment

| Dimension | Assessment |
|-----------|-----------|
| Content block integrity | **NONE** — no Stem, Choices, CC, or EC exist |
| EW reference quality | N/A — no content to anchor reconstruction |
| Reconstructability | **Cannot reconstruct** — EW fields describe FD-047's choices, not FD-046's (nonexistent) choices |
| Risk of inventing content | **HIGH** — any EW text would describe choices that don't exist |

**Confidence: LOW** — Not a rotation artifact amenable to forensic repair. This item requires full content authoring (SCRATCH AUTHOR), not EW field remediation. The stale EW fields are orphaned text describing a sibling item.

**Recommendation: Isolate, do not repair.** Clear EW_A/EW_B/EW_C to "" and flag for content authoring in a future session. Do NOT invent content.

### 2.4 Comparison with User's Expectation

The user expected FD-046 to be a HIGH-confidence repair candidate (similar to FD-040), but the forensic evidence shows otherwise. FD-046 has no content block — it is structurally incomplete. The EW shift is a +1 artifact from FD-047, not a simple rotation of FD-046's own topic.

---

## Item 3: P1-FD-050 — MDM Concept with Metadata Mismatch

### 3.1 Current State

**Location:** `pack_d_corrected.js` lines 23955–24004

**Content block (internally consistent):**
- **Stem:** "Ambervale maintains a single, authoritative source of core customer and product information used consistently across multiple systems. What practice does this describe?"
- **Choices:**
  - A: "Predictive analytics"
  - B: "Master data management"
  - C: "Data mining"
  - D: "Robotic process automation"
- **CorrectChoice:** B
- **ExplanationCorrect:** "Master data management establishes a single, authoritative, consistent source of core business data (such as customers or products) shared across multiple systems."
- **question_state:** "Active"
- **DifficultyScore:** 5, **CognitiveLevel:** "Evaluate"

**ExplanationWrong fields (DEFECTIVE — EW_A and EW_C describe FD-051's RPA governance topic; EW_D empty):**
- **ExplanationWrongA:** "Option A identifies bot proliferation as the primary issue and recommends limiting bot count..." — **TOPIC MISMATCH** (RPA governance, belongs to FD-051)
- **ExplanationWrongB:** "" — **CORRECT** (CC slot)
- **ExplanationWrongC:** "Option C correctly identifies process documentation as important but misprioritizes it. Documenting bot processes..." — **TOPIC MISMATCH** (RPA governance, belongs to FD-051)
- **ExplanationWrongD:** "" — **DEFECTIVE** (should describe why RPA is wrong for MDM concept question)

### 3.2 Additional Defect: DifficultyScore/CognitiveLevel Mismatch

The question stem is a textbook definition-match: "maintains a single, authoritative source of core customer and product information" → "Master data management." This is a Bloom's **Remember** or **Understand** level item. However, the metadata shows:
- DifficultyScore: **5** (Very Difficult)
- CognitiveLevel: **"Evaluate"**

These labels are clearly from the intended S899 replacement (an RPA governance Evaluate item) and were never recalibrated when the content block was authored as an MDM concept item. This is a **DL-031 difficulty inflation** pattern.

### 3.3 Reference EW Texts

**Source: P1-FD-049** (Certified, lines 23905–23953) — same MDM concept topic, rotation group sibling:

FD-049 (CC=A, MDM at A):
- EW_B (RPA): "Robotic process automation (RPA) automates repetitive, rules-based manual tasks such as data entry between systems — it does not establish a single, authoritative source of core business data. A candidate may assume any technology that involves data qualifies, but RPA moves data, while master data management governs what data is authoritative. The stem describes maintaining consistent customer and product information across systems, which is the defining purpose of master data management."
- EW_C (Predictive analytics): "Choice C is incorrect because predictive analytics uses historical data to forecast future outcomes. The stem describes maintaining consistent, authoritative records of core business entities — a foundational data governance function, not a forward-looking analytical activity. A candidate may confuse any data-related term with the specific discipline described."
- EW_D (Data mining): "Choice D is incorrect because data mining discovers hidden patterns and relationships in large datasets. Master data management focuses on the quality, consistency, and governance of reference data, which is a prerequisite for effective data mining but serves a distinct purpose. A candidate may conflate data discovery with data stewardship."

**Choice rotation mapping (FD-049 → FD-050):**

| FD-049 (CC=A) | FD-050 (CC=B) | Distractor Concept |
|---------------|---------------|-------------------|
| EW_B (RPA) | → EW_D (RPA) | RPA automates tasks, doesn't govern data |
| EW_C (Predictive) | → EW_A (Predictive) | Predictive analytics forecasts, doesn't define master data |
| EW_D (Data mining) | → EW_C (Data mining) | Data mining discovers patterns, doesn't steward data |

### 3.4 Reconstructed ExplanationWrong Fields

**ExplanationWrongA** (reconstructed from FD-049 EW_C):
> "Choice A is incorrect because predictive analytics uses historical data and statistical models to forecast future outcomes and identify trends. The stem describes maintaining a single, authoritative, consistent source of core customer and product information — a foundational data governance function, not a forward-looking analytical activity. A candidate may confuse any data-related term with the specific discipline described."

**ExplanationWrongB:** "" (CC slot — unchanged, DL-008 compliant)

**ExplanationWrongC** (reconstructed from FD-049 EW_D):
> "Choice C is incorrect because data mining searches large datasets to discover hidden patterns, correlations, and relationships. Master data management focuses on establishing and governing the quality, consistency, and authority of reference data — which is a prerequisite for effective data mining but serves a distinct purpose. A candidate may conflate data discovery with data stewardship."

**ExplanationWrongD** (reconstructed from FD-049 EW_B):
> "Choice D is incorrect because robotic process automation (RPA) automates repetitive, rules-based manual tasks such as data entry between systems using software bots. RPA does not establish or govern a single, authoritative source of core business data — it moves data between systems, while master data management defines what data is authoritative. The stem describes maintaining consistent customer and product information across multiple systems, which is the defining purpose of master data management."

### 3.5 Confidence Assessment

| Dimension | Assessment |
|-----------|-----------|
| Content block integrity | Internally consistent — Stem, Choices, CC, EC all match MDM concept |
| EW reference quality | HIGH — FD-049 is Certified with detailed, choice-specific EW texts |
| Choice rotation mapping | Straightforward — 3 distractor concepts map 1:1 between FD-049 and FD-050 |
| Risk of reconstruction error | LOW — reference texts are from a Certified item on the same topic |
| Additional defect | DifficultyScore=5 / CognitiveLevel="Evaluate" does not match content (DL-031) |
| Fields requiring reconstruction | 3 of 4 (EW_A, EW_C, EW_D; EW_B already correct) |

**Confidence: MEDIUM** (upgraded to MEDIUM-HIGH for EW-only repair).

**Rationale for MEDIUM instead of HIGH:**
1. The DifficultyScore/CognitiveLevel metadata mismatch indicates the S899 replacement was partially executed — the content block may have been written by a different agent than the metadata block.
2. FD-050 is "Active" (not "Certified"), meaning it hasn't passed full certification review.
3. However, the EW reconstruction from FD-049 (Certified) is fully traceable and choice-appropriate.

---

## 4. Consolidated Repair Plan

### 4.1 P1-FD-040 — HIGH Confidence — Recommended for Repair

**Actions:**
1. Replace EW_A with reconstructed structured-data distractor text
2. Replace EW_B with reconstructed metadata distractor text
3. Replace EW_C with reconstructed master-data distractor text
4. EW_D remains "" (CC slot, DL-008 compliant)
5. No other field changes

**Backup:** `pack_d_corrected.js.bak-S102P-YYYYMMDDHHMMSS`

**Post-repair verification:**
- Verify EW_A/EW_B/EW_C are non-empty (DL-026 clean)
- Verify EW_D is "" (DL-008 clean)
- Verify Stem, Choices, CC, EC unchanged
- Verify QuestionID count unchanged (500)

### 4.2 P1-FD-046 — LOW Confidence — Isolate Only

**Actions:**
1. Clear EW_A, EW_B, EW_C to "" (remove stale FD-047 descriptions)
2. EW_D remains ""
3. Mark in report as "Requires SCRATCH AUTHOR — content block missing"
4. No content invention

**Rationale:** The user's governance decision explicitly prohibits "inventing missing distractors, inventing missing explanations, reconstructing low-confidence content from assumptions." Since FD-046 has no content block, any EW text would be invention.

### 4.3 P1-FD-050 — MEDIUM Confidence — Requires Authorization

**Actions (if authorized):**
1. Replace EW_A with predictive-analytics distractor text (from FD-049 EW_C)
2. Replace EW_C with data-mining distractor text (from FD-049 EW_D)
3. Replace EW_D with RPA distractor text (from FD-049 EW_B)
4. EW_B remains "" (CC slot)
5. **Optionally:** Recalibrate DifficultyScore → 2 (Moderate-Easy) and CognitiveLevel → "Understand" (DL-031 correction)

**Open question for user:** The DifficultyScore=5/CognitiveLevel="Evaluate" are clearly from the intended RPA governance replacement, not the actual MDM concept content. Should this be corrected in the same pass?

---

## 5. Authorization Gate

Per the user's governance decision:

| QID | Confidence | User Expected | Forensic Finding | Recommended Action |
|-----|-----------|---------------|------------------|-------------------|
| P1-FD-040 | **HIGH** | HIGH | Confirmed | **Proceed with repair** |
| P1-FD-046 | **LOW** | HIGH | **Refuted** — SCRATCH AUTHOR, no content | **Isolate, do not repair** |
| P1-FD-050 | **MEDIUM** | LOW | **Better than expected** — content complete, reference EWs available | **User decision required** |

**Awaiting authorization for:**
- [x] FD-040 repair (HIGH — proceed)
- [ ] FD-046 isolation (clear stale EWs only, no content invention)
- [ ] FD-050 repair (MEDIUM — content complete, reference EWs from Certified FD-049)
- [ ] FD-050 DifficultyScore/CognitiveLevel recalibration (ancillary DL-031 issue)

---

## Appendix A: Evidence Chain

| Evidence | Source | Lines |
|----------|--------|-------|
| FD-036 EW (structured data) | `pack_d_corrected.js` | 23322–23325 |
| FD-037 EW (metadata, master data) | `pack_d_corrected.js` | 23372–23375 |
| FD-037 content (detailed metadata, master data EWs) | `pack_d_corrected.js` | 23374-23375 |
| FD-040 current state | `pack_d_corrected.js` | 23480–23529 |
| FD-041 content (auth topic — FD-040's EWs belong here) | `pack_d_corrected.js` | 23542–23580 |
| FD-045 content (MDM concept, CC=B) | `pack_d_corrected.js` | 23732–23778 |
| FD-046 current state (SCRATCH AUTHOR) | `pack_d_corrected.js` | 23782–23802 |
| FD-047 content (MDM merger — FD-046's EWs belong here) | `pack_d_corrected.js` | 23815–23853 |
| FD-049 content (MDM concept, CC=A — reference for FD-050) | `pack_d_corrected.js` | 23905–23953 |
| FD-050 current state | `pack_d_corrected.js` | 23955–24004 |
| FD-051 content (RPA governance — FD-050's EWs belong here) | `pack_d_corrected.js` | 24017–24054 |

## Appendix B: Preflight Baseline

```
=== PREFLIGHT — 2026-07-31T14:56:07.305Z ===
  OK:   Pack D — QID count 500
  OK:   Pack D — parse OK
  CERT Pack D: 456
  OK:   Governance guard tests — 54/54 PASS
  TOTAL CERTIFIED: 2451
  DIVERGENCES: 0
```
