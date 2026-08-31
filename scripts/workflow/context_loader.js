/**
 * Context Loader - Lightweight Context Builder for Low-Memory Models
 * 
 * Extracts only essential information from large files to fit in low-context windows.
 * 
 * Usage:
 *   node scripts/workflow/context_loader.js baseline
 *   node scripts/workflow/context_loader.js defects --class DL-026
 *   node scripts/workflow/context_loader.js pack --file pack_d_corrected.js --qids P1-BD-001,P1-BD-028
 *   node scripts/workflow/context_loader.js session --id S20260828-001
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '../..');

class ContextLoader {
    /**
     * Load minimal baseline info
     */
    loadBaseline() {
        const baselinePath = path.join(REPO_ROOT, 'knowledge/CURRENT_BASELINES.md');
        const content = fs.readFileSync(baselinePath, 'utf8');
        
        // Extract just the summary section
        const summaryMatch = content.match(/## 2\. Authoritative Certified Pool[\s\S]*?(?=##|$)/);
        const summary = summaryMatch ? summaryMatch[0] : '';
        
        // Extract counts
        const counts = {};
        const countMatches = summary.matchAll(/\*\*(Pack [A-E]|Total):\*\*\s*(\d+)/g);
        for (const match of countMatches) {
            counts[match[1]] = parseInt(match[2]);
        }
        
        return {
            totalCertified: counts['Total'] || 0,
            perPack: {
                A: counts['Pack A'] || 0,
                B: counts['Pack B'] || 0,
                C: counts['Pack C'] || 0,
                D: counts['Pack D'] || 0,
                E: counts['Pack E'] || 0
            },
            timestamp: this.extractTimestamp(summary)
        };
    }

    /**
     * Load defect information (minimal)
     */
    loadDefect(defectClass) {
        const defectLibPath = path.join(REPO_ROOT, 'knowledge/DEFECT_LIBRARY.md');
        const content = fs.readFileSync(defectLibPath, 'utf8');
        
        // Find the defect entry
        const defectPattern = new RegExp(`## ${defectClass}[\\s\\S]*?(?=##|$)`, 'i');
        const match = content.match(defectPattern);
        
        if (!match) {
            return { error: `Defect ${defectClass} not found` };
        }
        
        const entry = match[0];
        
        // Extract key fields
        const extract = (field) => {
            const regex = new RegExp(`${field}\\s+(.+)`, 'i');
            const m = entry.match(regex);
            return m ? m[1].trim() : 'Unknown';
        };
        
        return {
            id: defectClass,
            class: extract('Class'),
            domain: extract('Domain'),
            severity: extract('Severity'),
            status: extract('Status'),
            category: extract('Category'),
            description: this.extractSection(entry, 'Issue'),
            detectionRule: this.extractSection(entry, 'Detection Rule'),
            rootCause: this.extractSection(entry, 'Root Cause')
        };
    }

    /**
     * Load specific QIDs from pack file
     */
    loadQIDs(packFile, qidList) {
        const packPath = path.join(REPO_ROOT, 'content/packs', packFile);
        
        if (!fs.existsSync(packPath)) {
            return { error: `Pack file not found: ${packFile}` };
        }
        
        const content = fs.readFileSync(packPath, 'utf8');
        const qids = qidList.split(',').map(q => q.trim());
        const results = {};
        
        for (const qid of qids) {
            const qidPattern = new RegExp(`"QuestionID":\\s*"${qid}"[\\s\\S]*?(?=\\n\\s*\\{\\s*"QuestionID"|$)`);
            const match = content.match(qidPattern);
            
            if (match) {
                try {
                    // Extract just essential fields
                    const block = match[0];
                    const extractField = (field) => {
                        const regex = new RegExp(`"${field}":\\s*"([^"]*)"`, 'i');
                        const m = block.match(regex);
                        return m ? m[1] : null;
                    };
                    
                    results[qid] = {
                        stem: this.truncate(extractField('Stem'), 200),
                        correctChoice: extractField('CorrectChoice'),
                        question_state: extractField('question_state'),
                        difficulty: extractField('Difficulty'),
                        cognitiveLevel: extractField('CognitiveLevel'),
                        found: true
                    };
                } catch (e) {
                    results[qid] = { error: 'Parse error', found: false };
                }
            } else {
                results[qid] = { found: false };
            }
        }
        
        return results;
    }

    /**
     * Load session context
     */
    loadSession(sessionId) {
        const SessionStateManager = require('./session_state_manager');
        const manager = new SessionStateManager();
        
        try {
            const session = manager.loadSession(sessionId);
            
            // Return lightweight summary
            return {
                sessionId: session.sessionId,
                task: session.taskDescription,
                status: session.status,
                phase: session.phase,
                progress: session.progress,
                scope: session.context,
                recentFindings: session.findings.slice(-3),
                recentArtifacts: session.artifacts.slice(-3),
                nextActions: session.nextActions.filter(a => !a.completed),
                lastUpdated: session.updatedAt
            };
        } catch (e) {
            return { error: e.message };
        }
    }

    /**
     * Load governance rules (summary)
     */
    loadGovernanceRules() {
        const guardPath = path.join(REPO_ROOT, '.opencode/plugins/governance-guard.js');
        const content = fs.readFileSync(guardPath, 'utf8');
        
        // Extract rule summaries
        const rules = [];
        const rulePattern = /\/\/ RULE (\d+):(.*?)(?=\/\/ RULE|\n\s*function|\nexports)/gs;
        const matches = content.matchAll(rulePattern);
        
        for (const match of matches) {
            const ruleNum = match[1];
            const ruleContent = match[2];
            const descMatch = ruleContent.match(/\/\/\s*(.+?)(?:\n|$)/);
            
            rules.push({
                number: parseInt(ruleNum),
                description: descMatch ? descMatch[1].trim() : 'No description',
                level: ruleContent.includes('BLOCK') ? 'BLOCK' : 'WARN'
            });
        }
        
        return rules;
    }

    /**
     * Load essential standards (summary only)
     */
    loadStandardsSummary() {
        const caqs = path.join(REPO_ROOT, 'knowledge/CAQS_v1.0.md');
        const content = fs.readFileSync(caqs, 'utf8');
        
        // Extract key sections only
        const sections = [
            'AI Philosophy',
            'Certification Standard',
            'Gold Standard Checklist'
        ];
        
        const summary = {};
        for (const section of sections) {
            const pattern = new RegExp(`### [0-9.]*\\s*${section}[\\s\\S]*?(?=###|##|$)`);
            const match = content.match(pattern);
            if (match) {
                summary[section] = this.truncate(match[0], 500);
            }
        }
        
        return summary;
    }

    /**
     * Generate focused work context
     */
    generateWorkContext(options = {}) {
        const context = {
            timestamp: new Date().toISOString(),
            baseline: options.includeBaseline ? this.loadBaseline() : null,
            defect: options.defectClass ? this.loadDefect(options.defectClass) : null,
            qids: options.qids && options.packFile ? this.loadQIDs(options.packFile, options.qids) : null,
            session: options.sessionId ? this.loadSession(options.sessionId) : null,
            rules: options.includeRules ? this.loadGovernanceRules() : null,
            standards: options.includeStandards ? this.loadStandardsSummary() : null
        };
        
        // Remove null values
        Object.keys(context).forEach(key => {
            if (context[key] === null) delete context[key];
        });
        
        return context;
    }

    /**
     * Utility: Extract section
     */
    extractSection(text, heading) {
        const pattern = new RegExp(`###?\\s*${heading}[\\s\\S]*?(?=###|##|$)`);
        const match = text.match(pattern);
        return match ? match[0].substring(match[0].indexOf('\n')).trim() : '';
    }

    /**
     * Utility: Truncate text
     */
    truncate(text, maxLength) {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    /**
     * Utility: Extract timestamp
     */
    extractTimestamp(text) {
        const dateMatch = text.match(/\*\*Last updated:\*\*\s*(.+?)(?:\n|$)/);
        return dateMatch ? dateMatch[1].trim() : 'Unknown';
    }

    /**
     * Generate minimal prompt for resuming work
     */
    generateMinimalPrompt(options) {
        const context = this.generateWorkContext(options);
        
        let prompt = `# Work Context (${context.timestamp})\n\n`;
        
        if (context.session) {
            prompt += `## Active Session: ${context.session.sessionId}\n`;
            prompt += `Task: ${context.session.task}\n`;
            prompt += `Progress: ${context.session.progress.itemsCompleted}/${context.session.progress.itemsTotal || '?'} (${context.session.progress.percentage}%)\n\n`;
            
            if (context.session.nextActions.length > 0) {
                prompt += `### Next Actions:\n`;
                context.session.nextActions.forEach((a, i) => {
                    prompt += `${i + 1}. ${a.action}\n`;
                });
                prompt += '\n';
            }
        }
        
        if (context.baseline) {
            prompt += `## Baseline\n`;
            prompt += `Total Certified: ${context.baseline.totalCertified}\n`;
            prompt += `Pack D: ${context.baseline.perPack.D}\n\n`;
        }
        
        if (context.defect) {
            prompt += `## Defect: ${context.defect.id}\n`;
            prompt += `Class: ${context.defect.class} | Severity: ${context.defect.severity} | Status: ${context.defect.status}\n\n`;
            prompt += `**Root Cause:** ${this.truncate(context.defect.rootCause, 200)}\n\n`;
        }
        
        if (context.qids) {
            prompt += `## Items in Scope:\n`;
            Object.entries(context.qids).forEach(([qid, data]) => {
                if (data.found) {
                    prompt += `- ${qid}: ${data.question_state || 'Unknown'} | CC=${data.correctChoice || '?'}\n`;
                }
            });
            prompt += '\n';
        }
        
        if (context.rules) {
            prompt += `## Active Governance Rules (${context.rules.length}):\n`;
            context.rules.filter(r => r.level === 'BLOCK').forEach(r => {
                prompt += `- Rule ${r.number} [BLOCK]: ${this.truncate(r.description, 80)}\n`;
            });
            prompt += '\n';
        }
        
        prompt += `\n---\nProceed with the next action. Use checkpoint files in reports/session_checkpoints/ for detailed state.\n`;
        
        return prompt;
    }
}

// CLI interface
if (require.main === module) {
    const loader = new ContextLoader();
    const args = process.argv.slice(2);
    const command = args[0];

    try {
        let result;
        
        switch (command) {
            case 'baseline':
                result = loader.loadBaseline();
                break;
                
            case 'defects':
                const defectClass = args[args.indexOf('--class') + 1];
                result = loader.loadDefect(defectClass);
                break;
                
            case 'pack':
                const packFile = args[args.indexOf('--file') + 1];
                const qids = args[args.indexOf('--qids') + 1];
                result = loader.loadQIDs(packFile, qids);
                break;
                
            case 'session':
                const sessionId = args[args.indexOf('--id') + 1];
                result = loader.loadSession(sessionId);
                break;
                
            case 'rules':
                result = loader.loadGovernanceRules();
                break;
                
            case 'standards':
                result = loader.loadStandardsSummary();
                break;
                
            case 'work-context':
                const options = {
                    includeBaseline: args.includes('--baseline'),
                    defectClass: args.includes('--defect') ? args[args.indexOf('--defect') + 1] : null,
                    packFile: args.includes('--pack') ? args[args.indexOf('--pack') + 1] : null,
                    qids: args.includes('--qids') ? args[args.indexOf('--qids') + 1] : null,
                    sessionId: args.includes('--session') ? args[args.indexOf('--session') + 1] : null,
                    includeRules: args.includes('--rules'),
                    includeStandards: args.includes('--standards')
                };
                result = loader.generateWorkContext(options);
                break;
                
            case 'prompt':
                const promptOpts = {
                    includeBaseline: args.includes('--baseline'),
                    defectClass: args.includes('--defect') ? args[args.indexOf('--defect') + 1] : null,
                    packFile: args.includes('--pack') ? args[args.indexOf('--pack') + 1] : null,
                    qids: args.includes('--qids') ? args[args.indexOf('--qids') + 1] : null,
                    sessionId: args.includes('--session') ? args[args.indexOf('--session') + 1] : null,
                    includeRules: args.includes('--rules'),
                    includeStandards: args.includes('--standards')
                };
                const prompt = loader.generateMinimalPrompt(promptOpts);
                console.log(prompt);
                return;
                
            default:
                console.log(`
Context Loader - Lightweight Context Builder

Commands:
  baseline                          - Load baseline counts
  defects --class DL-026           - Load defect info
  pack --file pack_d.js --qids P1-BD-001,P1-BD-028
  session --id S20260828-001       - Load session state
  rules                            - Load governance rules
  standards                        - Load CAQS summary
  work-context [options]           - Generate combined context
  prompt [options]                 - Generate resume prompt

Prompt Options:
  --baseline                       - Include baseline counts
  --defect DL-026                 - Include defect info
  --pack pack_d_corrected.js      - Specify pack file
  --qids P1-BD-001,P1-BD-028      - QIDs to load
  --session S20260828-001         - Include session state
  --rules                         - Include governance rules
  --standards                     - Include CAQS summary

Examples:
  node context_loader.js prompt --session S20260828-001 --defect DL-026 --baseline
  node context_loader.js baseline
  node context_loader.js pack --file pack_d_corrected.js --qids P1-BD-001,P1-BD-028
                `);
                return;
        }
        
        console.log(JSON.stringify(result, null, 2));
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = ContextLoader;
