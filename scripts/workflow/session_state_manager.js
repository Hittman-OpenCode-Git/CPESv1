/**
 * Session State Manager
 * Manages session checkpoints and state persistence for low-context model workflows
 * 
 * Usage:
 *   node scripts/workflow/session_state_manager.js create --task "DL-026 Pack D remediation"
 *   node scripts/workflow/session_state_manager.js update SESSION001 --status "in_progress" --progress "28/84 items"
 *   node scripts/workflow/session_state_manager.js complete SESSION001
 *   node scripts/workflow/session_state_manager.js resume SESSION001
 */

const fs = require('fs');
const path = require('path');

const CHECKPOINT_DIR = path.join(__dirname, '../../reports/session_checkpoints');
const ACTIVE_SESSION_FILE = path.join(CHECKPOINT_DIR, 'ACTIVE_SESSION.json');

// Ensure checkpoint directory exists
if (!fs.existsSync(CHECKPOINT_DIR)) {
    fs.mkdirSync(CHECKPOINT_DIR, { recursive: true });
}

class SessionStateManager {
    constructor() {
        this.checkpointDir = CHECKPOINT_DIR;
    }

    /**
     * Generate session ID
     */
    generateSessionId() {
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0].replace(/-/g, '');
        const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '');
        const counter = this.getNextCounter(dateStr);
        return `S${dateStr}-${counter}`;
    }

    /**
     * Get next counter for today
     */
    getNextCounter(dateStr) {
        const files = fs.readdirSync(this.checkpointDir);
        const todaySessions = files.filter(f => f.startsWith(`S${dateStr}`));
        return String(todaySessions.length + 1).padStart(3, '0');
    }

    /**
     * Create new session
     */
    createSession(taskDescription, options = {}) {
        const sessionId = this.generateSessionId();
        const timestamp = new Date().toISOString();

        const session = {
            sessionId,
            taskDescription,
            status: 'active',
            createdAt: timestamp,
            updatedAt: timestamp,
            phase: options.phase || 'discovery',
            scope: options.scope || {},
            progress: {
                itemsCompleted: 0,
                itemsTotal: options.totalItems || null,
                batchesCompleted: 0,
                batchesTotal: options.totalBatches || null,
                percentage: 0
            },
            artifacts: [],
            findings: [],
            nextActions: [],
            context: {
                packs: options.packs || [],
                sections: options.sections || [],
                defectClasses: options.defectClasses || [],
                qidRange: options.qidRange || null
            },
            notes: []
        };

        // Save session file
        const sessionFile = path.join(this.checkpointDir, `${sessionId}.json`);
        fs.writeFileSync(sessionFile, JSON.stringify(session, null, 2));

        // Update active session pointer
        fs.writeFileSync(ACTIVE_SESSION_FILE, JSON.stringify({ activeSession: sessionId, timestamp }, null, 2));

        console.log(`✓ Created session: ${sessionId}`);
        console.log(`  Task: ${taskDescription}`);
        console.log(`  File: ${sessionFile}`);
        
        return session;
    }

    /**
     * Load session
     */
    loadSession(sessionId) {
        const sessionFile = path.join(this.checkpointDir, `${sessionId}.json`);
        
        if (!fs.existsSync(sessionFile)) {
            throw new Error(`Session not found: ${sessionId}`);
        }

        return JSON.parse(fs.readFileSync(sessionFile, 'utf8'));
    }

    /**
     * Update session
     */
    updateSession(sessionId, updates) {
        const session = this.loadSession(sessionId);
        
        // Merge updates
        Object.assign(session, updates);
        session.updatedAt = new Date().toISOString();

        // Recalculate progress percentage if items updated
        if (session.progress.itemsTotal && session.progress.itemsCompleted !== undefined) {
            session.progress.percentage = Math.round(
                (session.progress.itemsCompleted / session.progress.itemsTotal) * 100
            );
        }

        // Save
        const sessionFile = path.join(this.checkpointDir, `${sessionId}.json`);
        fs.writeFileSync(sessionFile, JSON.stringify(session, null, 2));

        console.log(`✓ Updated session: ${sessionId}`);
        console.log(`  Status: ${session.status}`);
        console.log(`  Progress: ${session.progress.percentage}%`);

        return session;
    }

    /**
     * Add finding to session
     */
    addFinding(sessionId, finding) {
        const session = this.loadSession(sessionId);
        
        session.findings.push({
            timestamp: new Date().toISOString(),
            ...finding
        });

        return this.updateSession(sessionId, { findings: session.findings });
    }

    /**
     * Add artifact to session
     */
    addArtifact(sessionId, artifactPath, description) {
        const session = this.loadSession(sessionId);
        
        session.artifacts.push({
            path: artifactPath,
            description,
            timestamp: new Date().toISOString()
        });

        return this.updateSession(sessionId, { artifacts: session.artifacts });
    }

    /**
     * Add next action
     */
    addNextAction(sessionId, action, priority = 'normal') {
        const session = this.loadSession(sessionId);
        
        session.nextActions.push({
            action,
            priority,
            timestamp: new Date().toISOString(),
            completed: false
        });

        return this.updateSession(sessionId, { nextActions: session.nextActions });
    }

    /**
     * Complete session
     */
    completeSession(sessionId, summary) {
        const session = this.loadSession(sessionId);
        
        session.status = 'completed';
        session.completedAt = new Date().toISOString();
        session.summary = summary;

        const sessionFile = path.join(this.checkpointDir, `${sessionId}.json`);
        fs.writeFileSync(sessionFile, JSON.stringify(session, null, 2));

        // Clear active session if this was active
        if (fs.existsSync(ACTIVE_SESSION_FILE)) {
            const active = JSON.parse(fs.readFileSync(ACTIVE_SESSION_FILE, 'utf8'));
            if (active.activeSession === sessionId) {
                fs.unlinkSync(ACTIVE_SESSION_FILE);
            }
        }

        console.log(`✓ Completed session: ${sessionId}`);
        console.log(`  Summary: ${summary}`);

        return session;
    }

    /**
     * Get active session
     */
    getActiveSession() {
        if (!fs.existsSync(ACTIVE_SESSION_FILE)) {
            return null;
        }

        const active = JSON.parse(fs.readFileSync(ACTIVE_SESSION_FILE, 'utf8'));
        return this.loadSession(active.activeSession);
    }

    /**
     * List sessions
     */
    listSessions(filter = {}) {
        const files = fs.readdirSync(this.checkpointDir)
            .filter(f => f.endsWith('.json') && f !== 'ACTIVE_SESSION.json');

        const sessions = files.map(f => {
            const session = JSON.parse(fs.readFileSync(path.join(this.checkpointDir, f), 'utf8'));
            return {
                sessionId: session.sessionId,
                task: session.taskDescription,
                status: session.status,
                progress: session.progress.percentage,
                created: session.createdAt,
                updated: session.updatedAt
            };
        });

        // Apply filters
        let filtered = sessions;
        if (filter.status) {
            filtered = filtered.filter(s => s.status === filter.status);
        }

        return filtered.sort((a, b) => new Date(b.created) - new Date(a.created));
    }

    /**
     * Generate resume prompt
     */
    generateResumePrompt(sessionId) {
        const session = this.loadSession(sessionId);
        
        const prompt = `Resume Session: ${session.sessionId}

Task: ${session.taskDescription}
Status: ${session.status}
Phase: ${session.phase}
Progress: ${session.progress.itemsCompleted}/${session.progress.itemsTotal || '?'} items (${session.progress.percentage}%)

Scope:
${session.context.packs.length > 0 ? `  Packs: ${session.context.packs.join(', ')}` : ''}
${session.context.sections.length > 0 ? `  Sections: ${session.context.sections.join(', ')}` : ''}
${session.context.defectClasses.length > 0 ? `  Defect Classes: ${session.context.defectClasses.join(', ')}` : ''}
${session.context.qidRange ? `  QID Range: ${session.context.qidRange}` : ''}

Recent Findings:
${session.findings.slice(-3).map(f => `  - ${f.description || JSON.stringify(f)}`).join('\n')}

Artifacts Generated:
${session.artifacts.slice(-5).map(a => `  - ${a.path}: ${a.description}`).join('\n')}

Next Actions:
${session.nextActions.filter(a => !a.completed).map(a => `  ${a.priority === 'high' ? '[HIGH]' : ''} ${a.action}`).join('\n')}

Notes:
${session.notes.slice(-3).join('\n')}

Continue from the next action in the list above.`;

        return prompt;
    }

    /**
     * Export session summary
     */
    exportSummary(sessionId, outputPath) {
        const session = this.loadSession(sessionId);
        
        const summary = `# Session Summary: ${session.sessionId}

**Task:** ${session.taskDescription}
**Status:** ${session.status}
**Created:** ${session.createdAt}
**Updated:** ${session.updatedAt}
${session.completedAt ? `**Completed:** ${session.completedAt}` : ''}

## Progress

- Items: ${session.progress.itemsCompleted}/${session.progress.itemsTotal || '?'} (${session.progress.percentage}%)
- Batches: ${session.progress.batchesCompleted}/${session.progress.batchesTotal || '?'}

## Scope

- Packs: ${session.context.packs.join(', ') || 'None'}
- Sections: ${session.context.sections.join(', ') || 'None'}
- Defect Classes: ${session.context.defectClasses.join(', ') || 'None'}
${session.context.qidRange ? `- QID Range: ${session.context.qidRange}` : ''}

## Findings

${session.findings.map((f, i) => `${i + 1}. ${f.description || JSON.stringify(f)}`).join('\n')}

## Artifacts

${session.artifacts.map(a => `- \`${a.path}\`: ${a.description}`).join('\n')}

## Next Actions

${session.nextActions.map((a, i) => `${i + 1}. ${a.completed ? '[x]' : '[ ]'} ${a.action} ${a.priority === 'high' ? '(HIGH PRIORITY)' : ''}`).join('\n')}

## Notes

${session.notes.join('\n\n')}

${session.summary ? `## Summary\n\n${session.summary}` : ''}
`;

        fs.writeFileSync(outputPath, summary);
        console.log(`✓ Exported summary to: ${outputPath}`);
        
        return summary;
    }
}

// CLI interface
if (require.main === module) {
    const manager = new SessionStateManager();
    const args = process.argv.slice(2);
    const command = args[0];

    try {
        switch (command) {
            case 'create': {
                const taskIndex = args.indexOf('--task');
                const task = taskIndex >= 0 ? args[taskIndex + 1] : 'Unnamed task';
                
                const options = {};
                if (args.includes('--packs')) options.packs = args[args.indexOf('--packs') + 1].split(',');
                if (args.includes('--sections')) options.sections = args[args.indexOf('--sections') + 1].split(',');
                if (args.includes('--defects')) options.defectClasses = args[args.indexOf('--defects') + 1].split(',');
                if (args.includes('--total')) options.totalItems = parseInt(args[args.indexOf('--total') + 1]);

                manager.createSession(task, options);
                break;
            }

            case 'update': {
                const sessionId = args[1];
                const updates = {};
                
                if (args.includes('--status')) updates.status = args[args.indexOf('--status') + 1];
                if (args.includes('--phase')) updates.phase = args[args.indexOf('--phase') + 1];
                if (args.includes('--completed')) updates.progress = { ...manager.loadSession(sessionId).progress, itemsCompleted: parseInt(args[args.indexOf('--completed') + 1]) };

                manager.updateSession(sessionId, updates);
                break;
            }

            case 'complete': {
                const sessionId = args[1];
                const summaryIndex = args.indexOf('--summary');
                const summary = summaryIndex >= 0 ? args[summaryIndex + 1] : 'Session completed';
                
                manager.completeSession(sessionId, summary);
                break;
            }

            case 'resume': {
                const sessionId = args[1] || manager.getActiveSession()?.sessionId;
                if (!sessionId) {
                    console.log('No active session found. Specify session ID or create new session.');
                    process.exit(1);
                }
                
                const prompt = manager.generateResumePrompt(sessionId);
                console.log(prompt);
                break;
            }

            case 'list': {
                const status = args.includes('--status') ? args[args.indexOf('--status') + 1] : null;
                const sessions = manager.listSessions({ status });
                
                console.log('\nSessions:');
                sessions.forEach(s => {
                    console.log(`  ${s.sessionId}: ${s.task} [${s.status}] ${s.progress}%`);
                });
                break;
            }

            case 'export': {
                const sessionId = args[1];
                const outputIndex = args.indexOf('--output');
                const outputPath = outputIndex >= 0 ? args[outputIndex + 1] : 
                    path.join(__dirname, `../../reports/session_checkpoints/${sessionId}_SUMMARY.md`);
                
                manager.exportSummary(sessionId, outputPath);
                break;
            }

            case 'active': {
                const active = manager.getActiveSession();
                if (active) {
                    console.log(`Active session: ${active.sessionId}`);
                    console.log(`Task: ${active.taskDescription}`);
                    console.log(`Progress: ${active.progress.percentage}%`);
                } else {
                    console.log('No active session');
                }
                break;
            }

            default:
                console.log(`
Session State Manager - Context-Efficient Workflow Tool

Commands:
  create --task "description" [--packs A,B] [--sections C,D] [--defects DL-026] [--total 100]
  update SESSION_ID --status active --completed 28
  complete SESSION_ID --summary "description"
  resume [SESSION_ID]
  list [--status active]
  export SESSION_ID [--output path]
  active

Examples:
  node session_state_manager.js create --task "DL-026 Pack D remediation" --packs D --defects DL-026 --total 84
  node session_state_manager.js update S20260828-001 --completed 28
  node session_state_manager.js resume
  node session_state_manager.js complete S20260828-001 --summary "Remediated 84/84 items"
                `);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = SessionStateManager;
