# Metadata Validation Report — Sprint 5.6B

**Date:** 2026-07-20
**Status:** Post-Migration Validation

---

## Wave 1 Auto-Generated Fields: Validation Results

### Case-Level Fields
| Field | Expected | Found | Status |
|-------|----------|-------|--------|
| Pack | 75 | 75 | ✓ |
| Section | 75 | 75 | ✓ |
| CaseID | 75 | 75 | ✓ (validated pattern) |
| Version | 75 | 75 | ✓ |
| RevisionHistory | 75 | 75 | ✓ |
| ProductionStatus | 75 | 75 | ✓ |
| QuestionCount | 75 | 75 | ✓ (matches Items.length) |
| ExhibitCount | 75 | 75 | ✓ (matches Exhibits.length) |
| BlueprintDomain | 75 | 75 | ✓ (derived from Section) |
| LastValidated | 75 | 75 | ✓ |
| ValidationVersion | 75 | 75 | ✓ |

### Item-Level Fields
| Field | Expected | Found | Status |
|-------|----------|-------|--------|
| ItemID | 400 | 400 | ✓ (format {CaseID}-Q{N}) |
| CaseID | 400 | 400 | ✓ |
| Pack | 400 | 400 | ✓ |
| Section | 400 | 400 | ✓ |
| EstimatedMinutes | 400 | 400 | ✓ (type-based standard) |
| ProductionStatus | 400 | 400 | ✓ |

### Exhibit-Level Fields
| Field | Expected | Found | Status |
|-------|----------|-------|--------|
| ExhibitID | 166 | 166 | ✓ (format {CaseID}-E{N}) |
| CaseID | 166 | 166 | ✓ |
| ValidationVersion | 166 | 166 | ✓ |

### ID Uniqueness
| Check | Result |
|-------|--------|
| No duplicate ItemIDs | ✓ PASS (400 unique) |
| No duplicate ExhibitIDs | ✓ PASS (166 unique) |
| No duplicate CaseIDs | ✓ PASS (75 unique) |

### Cross-Reference Integrity
| Check | Result |
|-------|--------|
| ItemID matches case prefix | ✓ PASS |
| ExhibitID matches case prefix | ✓ PASS |
| Items linked to correct case | ✓ PASS |

## Fields NOT Populated (Per Spec)

These fields were intentionally left untouched:
- Difficulty (requires psychometric judgment)
- DifficultyScore (requires psychometric judgment)
- CognitiveLevel (requires psychometric review)
- BlueprintObjectives (requires accountant review)
- LearningObjectives (requires accountant review)
- Topic (requires taxonomy alignment)
- Subtopic (requires taxonomy alignment)
- FormulaReference (requires accountant review)
- DecisionTreeReference (requires review)
- CommonTrapReference (requires psychometric review)
- PrimaryCompetency (requires judgment)
- BusinessFunction (requires judgment)
- Industry (requires judgment)
- Stakeholder (requires judgment)
