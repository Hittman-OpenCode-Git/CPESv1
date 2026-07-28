"""DL-012 archival: Insert question_state: "Archived" for MISSING clone items.
Safe rebuild — parses all before writing. Per BACKUP_PROTOCOL.md Script Safety Rule.
"""
import re, sys, os

def archive_missing_clones(filepath, prefix):
    """Find Section E items without question_state and insert 'Archived'."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern: find QuestionID for Section E items
    qid_pattern = re.compile(r'("QuestionID":\s*"' + re.escape(prefix) + r'-\d{3}")')
    state_pattern = re.compile(r'"question_state":\s*"([^"]*)"')

    matches = list(qid_pattern.finditer(content))
    print(f"  Found {len(matches)} QuestionIDs matching {prefix}-")

    insertions = []
    already_archived = 0
    certified_hits = 0

    for i, match in enumerate(matches):
        qid_m = re.search(r'P1-[A-Z]+-\d+', match.group(0))
        if not qid_m:
            continue
        qid = qid_m.group(0)
        idx = match.start()

        # Look 800 chars ahead for question_state
        next_boundary = content.find('"QuestionID"', idx + len(match.group()))
        if next_boundary == -1:
            window = content[idx:idx + 1200]
        else:
            window = content[idx:min(idx + 1200, next_boundary)]

        # Check if question_state exists
        sm = state_pattern.search(window)
        if sm:
            state_value = sm.group(1)
            if state_value == 'Certified':
                certified_hits += 1
                print(f"  *** CRITICAL: {qid} is Certified! HALT ***")
            elif state_value == 'Archived':
                already_archived += 1
            # else: has some other state (Unprocessed, etc.) — skip
            continue

        # MISSING: need to insert question_state
        # Find the end of the QuestionID line
        qid_line_end = content.index('\n', idx) + 1
        # Insert right after
        indent = '    '
        insertion = f'{indent}"question_state": "Archived",\n'
        insertions.append((qid_line_end, insertion, qid))

    print(f"  Already Archived: {already_archived}")
    print(f"  To archive: {len(insertions)}")
    print(f"  Certified hits: {certified_hits}")

    if certified_hits > 0:
        print("*** HALT: Certified items found. No writes performed. ***")
        return False, 0

    if len(insertions) == 0:
        print("  Nothing to do.")
        return True, 0

    # Apply insertions in reverse order so indices stay valid
    insertions.sort(key=lambda x: x[0], reverse=True)

    result = list(content)
    for pos, ins_text, qid in insertions:
        for ch in ins_text:
            result.insert(pos, ch)

    new_content = ''.join(result)

    # Verify the result
    verify_missing = len(re.findall(r'"QuestionID":\s*"' + re.escape(prefix) + r'-\d{3}"[\s\S]{0,800}?(?![\s\S]*?"question_state")', new_content))
    if verify_missing > 0:
        print(f"  *** VERIFY FAILED: {verify_missing} items still MISSING after insert ***")
        return False, 0

    print(f"  Write verified: 0 items still MISSING for {prefix}")

    with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
        f.write(new_content)

    print(f"  Written: {filepath}")
    return True, len(insertions)


if __name__ == '__main__':
    base = r'C:\Users\User\OneDrive\Desktop\CMA_Part_1_2026'

    print("=== DL-012 Archival Script ===")
    print()

    # Pack C
    print("--- Pack C ---")
    ok_c, count_c = archive_missing_clones(
        os.path.join(base, 'pack_c_corrected.js'), 'P1-EC')

    # Pack D
    print("--- Pack D ---")
    ok_d, count_d = archive_missing_clones(
        os.path.join(base, 'pack_d_corrected.js'), 'P1-ED')

    print()
    total = count_c + count_d
    print(f"=== DONE: {total} items archived ===")
    print(f"Pack C: {count_c}, Pack D: {count_d}")
    sys.exit(0 if (ok_c and ok_d) else 1)
