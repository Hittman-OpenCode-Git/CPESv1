# Session 700 — Scored Cases Certification Review

**Files:** scored_cases.js, scored_cases2.js, scored_cases3.js, scored_cases4.js, scored_cases5.js

## Pool Statistics
| File | Cases | Items | Format | ProductionStatus |
|------|-------|-------|--------|-----------------|
| scored_cases.js | 15 | 120 | Legacy (CASE-*) | Production (all) |
| scored_cases2.js | 15 | 75 | Enhanced | Draft (all) |
| scored_cases3.js | 15 | 75 | Enhanced | Draft (all) |
| scored_cases4.js | 15 | 75 | Enhanced | Draft (all) |
| scored_cases5.js | 15 | 75 | Enhanced (CBQ) | 6 Production, 84 Draft |
| **Total** | **75** | **420** | | **141 Production, 279 Draft** |

## SectionTag Distribution
A=13, B=13, C=15, D=12, E=11, F=11 — reasonably balanced. No cross-domain E+F tags.

## Key Findings

### 1. Uniform "Moderate" Difficulty (ALL cases)
Every case and item across all 5 files is labeled "Moderate." Zero Easy, Difficult, or Very Difficult. This is statistically implausible for a 420-item pool and indicates template-based labeling rather than cognitive calibration.

### 2. Minimal Authoritative Citations (3.8%)
Only 16 of 420 (3.8%) explanations reference ASC/COSO/GAAP/Under. This violates CAQS §4.3 EV3 ("Correct answer must reference the accounting principle by name").

### 3. scored_cases5.js Issues
- Unquoted keys (different serialization from files 1-4)
- 11 Body fields (text-type exhibits — not DL-023, but format inconsistency)
- Missing per-item Difficulty fields (only case-level Difficulty present)
- 6/90 Production items — partial certification

### 4. scored_cases2/3/4 Status Gap
SESSION_STATUS says ~54 case-level certified entries, but ProductionStatus field says "Draft." This is a metadata inconsistency requiring reconciliation.

### 5. Structurally Clean
- Zero empty explanations
- Zero placeholder text
- DL-023 resolved (0 table exhibits with Body-instead-of-Headers)

## Readiness Verdict
**Only scored_cases.js (15 cases, 120 items) is Production-ready.** scored_cases2-5 need:
1. Difficulty label assignment (real calibration, not uniform "Moderate")
2. ASC/COSO citations added to explanations
3. ProductionStatus updates to match certified state
4. scored_cases5.js formatting normalization (quoted keys, per-item Difficulty)
