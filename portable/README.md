# CMA Part 1 2026 Exam Simulator — Portable Edition

**Version:** V1.0_Portable
**46 files, 14.6 MB**

Fully self-contained, offline-capable CMA Part 1 practice simulator. No build step, no npm, no CDN, no internet required.

## What's Included

- 2,545 Part 1 MCQs across five question packs (A–E)
- 75 integrated case studies with exhibits
- Custom timer, navigator, flagging, review-before-submit
- Score report with grade bands and missed/marked remediation
- May AI Coach — offline rule-based modes (Explain, Quiz, Socratic, Motivate, Study Plan, Exam Review)
- Dark/light theme toggle
- All session data stored locally in Safari (localStorage)

## How to Run on iPad

Safari on iPad cannot open local HTML files with `<script>` tags via `file://`. You need a local HTTP server.

### Option 1: Working Copy (free tier)

1. Install [Working Copy](https://apps.apple.com/app/working-copy/id896694807) from the App Store
2. Transfer this `portable/` folder to your iPad (AirDrop, iCloud Drive, or clone from git)
3. In Working Copy, open the folder and tap "Web Server"
4. Open Safari and navigate to the URL shown (e.g. `http://192.168.x.x:8080/index_updated.html`)

### Option 2: Koder (free)

1. Install [Koder](https://apps.apple.com/app/koder-code-editor/id1447489375) from the App Store
2. Transfer the `portable/` folder to Koder's documents directory
3. Tap the play/run button to start the built-in web server
4. Navigate to `http://localhost:<port>/index_updated.html` in Safari

### Option 3: Pythonista

1. Install [Pythonista 3](https://apps.apple.com/app/pythonista-3/id1085978097)
2. Transfer the `portable/` folder
3. Run: `python -m http.server 8080 --directory portable`
4. Navigate to `http://localhost:8080/index_updated.html` in Safari

## Important Notes

- All progress is stored in Safari's localStorage — clearing Safari data will erase your session history
- The May AI Coach runs entirely offline using local rule-based modes
- LLM features (OpenAI/Azure) are disabled by default and require API keys + internet
- "Add to Home Screen" from Safari Share menu for an app-like experience (still needs the local server running)
