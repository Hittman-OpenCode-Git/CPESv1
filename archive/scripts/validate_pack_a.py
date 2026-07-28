import json
import re
from pathlib import Path

file_path = Path('pack_a_corrected.js')
content = file_path.read_text(encoding='utf-8')
print('File size:', len(content))
print('Lines:', len(content.splitlines()))

# Count question objects
question_ids = re.findall(r'"QuestionID"\s*:\s*"([^"]+)"', content)
print('Question IDs found:', len(question_ids))
print('Unique IDs:', len(set(question_ids)))
print('First 5 IDs:', question_ids[:5])

# Check for difficulty values
difficulties = re.findall(r'"Difficulty"\s*:\s*"([^"]+)"', content)
print('Difficulty values:', set(difficulties))

# Check for item types
item_types = re.findall(r'"ItemType"\s*:\s*"([^"]+)"', content)
print('Item types:', set(item_types))

# Check for sections
sections = re.findall(r'"Section"\s*:\s*"([^"]+)"', content)
print('Sections:', set(sections))