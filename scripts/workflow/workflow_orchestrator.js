/**
 * Workflow Orchestrator - Breaks Large Tasks into Context-Efficient Chunks
 * 
 * Decomposes complex tasks into sequential sub-tasks that fit in low-context windows.
 * Each sub-task generates artifacts for the next step.
 * 
 * Usage:
 *   node scripts/workflow/workflow_orchestrator.js plan --task "DL-026 remediation Pack D"
 *   node scripts/workflow/workflow_orchestrator.js execute --plan PLAN_ID
 *   node scripts/workflow/workflow_orchestrator.js status --plan PLAN_ID
 */

const fs = require('fs');
const path = require('path');
const SessionStateManager = require('./session_state_manager');

const PLANS_DIR = path.join(__dirname, '../../reports/workflow_plans');

// Ensure plans directory exists
if (!fs.existsSync(PLANS_DIR)) {
    fs.mkdirSync(PLANS_DIR, { recursive: true });
}

class WorkflowOrchestrator {
    constructor() {
        this.plansDir = PLANS_DIR;
        this.sessionManager = new SessionStateManager();
    }

    /**
     * Task Templates - Pre-defined decompositions for common workflows
     */
    getTaskTemplate(taskType) {
        const templates = {
            'defect-scan': {
                name: 'Defect Scan Workflow',
                phases: [
                    {
                        name: 'Discovery',
                        description: 'Scan pack files for defect pattern',
                        contextSize: 'small',
                        inputs: ['pack_file', 'defect_pattern'],
                        outputs: ['qid_list', 'count_summary'],
                        estimatedTime: '5-10 min',
                        script: 'scripts/scan_*.js or grep command'
                    },
                    {
                        name: 'Validation',
                        description: 'Cross-check findings against raw files',
                        contextSize: 'small',
                        inputs: ['qid_list'],
                        outputs: ['verified_qids', 'false_positives'],
                        estimatedTime: '10-15 min',
                        dependencies: ['Discovery']
                    },
                    {
                        name: 'Documentation',
                        description: 'Log findings to defect library and session checkpoint',
                        contextSize: 'small',
                        inputs: ['verified_qids', 'count_summary'],
                        outputs: ['defect_report', 'session_checkpoint'],
                        estimatedTime: '5 min',
                        dependencies: ['Validation']
                    }
                ]
            },

            'defect-remediation': {
                name: 'Defect Remediation Workflow',
                phases: [
                    {
                        name: 'Batch Planning',
                        description: 'Create ≤28-item batches per Rule 5',
                        contextSize: 'small',
                        inputs: ['qid_list'],
                        outputs: ['batch_plan'],
                        estimatedTime: '5 min'
                    },
                    {
                        name: 'Backup',
                        description: 'Backup target files before modification',
                        contextSize: 'tiny',
                        inputs: ['pack_files'],
                        outputs: ['backup_paths'],
                        estimatedTime: '1 min',
                        dependencies: ['Batch Planning']
                    },
                    {
                        name: 'Batch Execution',
                        description: 'Execute one batch at a time',
                        contextSize: 'medium',
                        inputs: ['batch_plan', 'batch_number'],
                        outputs: ['modified_files', 'change_log'],
                        estimatedTime: '20-30 min per batch',
                        repeatable: true,
                        dependencies: ['Backup']
                    },
                    {
                        name: 'Verification',
                        description: 'Verify changes with governance guard and validator',
                        contextSize: 'small',
                        inputs: ['modified_files'],
                        outputs: ['validation_results'],
                        estimatedTime: '5-10 min',
                        dependencies: ['Batch Execution']
                    },
                    {
                        name: 'Documentation',
                        description: 'Update REVISION_HISTORY.md and session state',
                        contextSize: 'small',
                        inputs: ['change_log', 'validation_results'],
                        outputs: ['revision_entry'],
                        estimatedTime: '5 min',
                        dependencies: ['Verification']
                    }
                ]
            },

            'certification-wave': {
                name: 'Certification Wave Workflow',
                phases: [
                    {
                        name: 'Candidate Selection',
                        description: 'Identify items ready for certification',
                        contextSize: 'small',
                        inputs: ['section', 'state_filter'],
                        outputs: ['candidate_list'],
                        estimatedTime: '5 min'
                    },
                    {
                        name: 'Pre-Certification Audit',
                        description: 'Run DL-008/DL-026/Rule checks on candidates',
                        contextSize: 'medium',
                        inputs: ['candidate_list'],
                        outputs: ['audit_results', 'blockers'],
                        estimatedTime: '15-20 min',
                        dependencies: ['Candidate Selection']
                    },
                    {
                        name: 'State Flip',
                        description: 'Update question_state to Certified',
                        contextSize: 'small',
                        inputs: ['passed_candidates'],
                        outputs: ['certified_qids'],
                        estimatedTime: '5 min',
                        dependencies: ['Pre-Certification Audit']
                    },
                    {
                        name: 'Baseline Update',
                        description: 'Update CURRENT_BASELINES.md',
                        contextSize: 'small',
                        inputs: ['certified_qids', 'new_counts'],
                        outputs: ['updated_baseline'],
                        estimatedTime: '5 min',
                        dependencies: ['State Flip']
                    }
                ]
            },

            'pack-audit': {
                name: 'Pack Comprehensive Audit',
                phases: [
                    {
                        name: 'Structural Scan',
                        description: 'Parse check and QID count',
                        contextSize: 'small',
                        inputs: ['pack_file'],
                        outputs: ['parse_results', 'qid_count'],
                        estimatedTime: '5 min'
                    },
                    {
                        name: 'DL-008 Scan',
                        description: 'Check for non-empty EW[CC]',
                        contextSize: 'small',
                        inputs: ['pack_file'],
                        outputs: ['dl008_qids'],
                        estimatedTime: '5 min',
                        dependencies: ['Structural Scan']
                    },
                    {
                        name: 'DL-026 Scan',
                        description: 'Check for empty non-CC EW slots',
                        contextSize: 'small',
                        inputs: ['pack_file'],
                        outputs: ['dl026_qids'],
                        estimatedTime: '5 min',
                        dependencies: ['Structural Scan']
                    },
                    {
                        name: 'State Census',
                        description: 'Count items by question_state',
                        contextSize: 'small',
                        inputs: ['pack_file'],
                        outputs: ['state_counts'],
                        estimatedTime: '5 min',
                        dependencies: ['Structural Scan']
                    },
                    {
                        name: 'Report Generation',
                        description: 'Compile audit report',
                        contextSize: 'medium',
                        inputs: ['all_scan_results'],
                        outputs: ['audit_report'],
                        estimatedTime: '10 min',
                        dependencies: ['DL-008 Scan', 'DL-026 Scan', 'State Census']
                    }
                ]
            }
        };

        return templates[taskType] || null;
    }

    /**
     * Create execution plan from template
     */
    createPlan(taskType, options = {}) {
        const template = this.getTaskTemplate(taskType);
        
        if (!template) {
            throw new Error(`Unknown task type: ${taskType}. Available: ${Object.keys(this.getTaskTemplate()).join(', ')}`);
        }

        const planId = this.generatePlanId(taskType);
        const timestamp = new Date().toISOString();

        const plan = {
            planId,
            taskType,
            name: options.name || template.name,
            createdAt: timestamp,
            status: 'pending',
            phases: template.phases.map(phase => ({
                ...phase,
                status: 'pending',
                attempts: 0,
                maxAttempts: 3,
                artifacts: [],
                errors: []
            })),
            options: {
                ...options,
                maxContextSize: options.maxContextSize || 'medium'
            },
            progress: {
                currentPhase: 0,
                phasesCompleted: 0,
                totalPhases: template.phases.length
            },
            session: null // Will link to session when executed
        };

        // Save plan
        const planFile = path.join(this.plansDir, `${planId}.json`);
        fs.writeFileSync(planFile, JSON.stringify(plan, null, 2));

        console.log(`✓ Created plan: ${planId}`);
        console.log(`  Type: ${taskType}`);
        console.log(`  Phases: ${plan.progress.totalPhases}`);
        console.log(`  File: ${planFile}`);

        return plan;
    }

    /**
     * Generate plan ID
     */
    generatePlanId(taskType) {
        const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const existing = fs.readdirSync(this.plansDir)
            .filter(f => f.startsWith(`PLAN_${date}_${taskType}`))
            .length;
        return `PLAN_${date}_${taskType}_${String(existing + 1).padStart(2, '0')}`;
    }

    /**
     * Load plan
     */
    loadPlan(planId) {
        const planFile = path.join(this.plansDir, `${planId}.json`);
        
        if (!fs.existsSync(planFile)) {
            throw new Error(`Plan not found: ${planId}`);
        }

        return JSON.parse(fs.readFileSync(planFile, 'utf8'));
    }

    /**
     * Save plan
     */
    savePlan(plan) {
        const planFile = path.join(this.plansDir, `${plan.planId}.json`);
        fs.writeFileSync(planFile, JSON.stringify(plan, null, 2));
    }

    /**
     * Get current phase
     */
    getCurrentPhase(plan) {
        return plan.phases[plan.progress.currentPhase];
    }

    /**
     * Generate phase prompt
     */
    generatePhasePrompt(plan, phaseIndex) {
        const phase = plan.phases[phaseIndex];
        const prevPhases = plan.phases.slice(0, phaseIndex);
        
        let prompt = `# Workflow Phase: ${phase.name}\n\n`;
        prompt += `**Plan:** ${plan.planId}\n`;
        prompt += `**Task:** ${plan.name}\n`;
        prompt += `**Phase:** ${phaseIndex + 1}/${plan.progress.totalPhases}\n`;
        prompt += `**Context Size:** ${phase.contextSize}\n`;
        prompt += `**Estimated Time:** ${phase.estimatedTime}\n\n`;

        prompt += `## Objective\n\n${phase.description}\n\n`;

        // Inputs
        prompt += `## Inputs Required\n\n`;
        phase.inputs.forEach(input => {
            // Try to find this input in previous phases' outputs
            let source = 'user-provided';
            for (const prev of prevPhases) {
                if (prev.outputs && prev.outputs.includes(input)) {
                    source = `Phase ${prevPhases.indexOf(prev) + 1} artifact`;
                    break;
                }
            }
            prompt += `- \`${input}\` (${source})\n`;
        });
        prompt += '\n';

        // Available artifacts from previous phases
        if (prevPhases.length > 0) {
            prompt += `## Available Artifacts\n\n`;
            prevPhases.forEach((prev, idx) => {
                if (prev.artifacts && prev.artifacts.length > 0) {
                    prompt += `Phase ${idx + 1} - ${prev.name}:\n`;
                    prev.artifacts.forEach(a => {
                        prompt += `  - ${a.path}: ${a.description}\n`;
                    });
                }
            });
            prompt += '\n';
        }

        // Expected outputs
        prompt += `## Expected Outputs\n\n`;
        phase.outputs.forEach(output => {
            prompt += `- \`${output}\`\n`;
        });
        prompt += '\n';

        // Instructions
        prompt += `## Instructions\n\n`;
        prompt += `1. Load only the required inputs listed above\n`;
        prompt += `2. Execute the phase objective\n`;
        prompt += `3. Generate the expected outputs\n`;
        prompt += `4. Save outputs as artifacts in reports/workflow_plans/${plan.planId}/\n`;
        prompt += `5. Report completion with artifact paths\n\n`;

        if (phase.script) {
            prompt += `**Suggested Script:** \`${phase.script}\`\n\n`;
        }

        prompt += `Keep context minimal. Focus only on this phase. Next phase will be a separate session.\n`;

        return prompt;
    }

    /**
     * Mark phase complete
     */
    completePhase(planId, phaseIndex, artifacts) {
        const plan = this.loadPlan(planId);
        const phase = plan.phases[phaseIndex];

        phase.status = 'completed';
        phase.artifacts = artifacts;
        phase.completedAt = new Date().toISOString();

        plan.progress.phasesCompleted++;
        
        if (plan.progress.currentPhase < plan.progress.totalPhases - 1) {
            plan.progress.currentPhase++;
        } else {
            plan.status = 'completed';
        }

        this.savePlan(plan);

        console.log(`✓ Phase ${phaseIndex + 1} complete: ${phase.name}`);
        console.log(`  Progress: ${plan.progress.phasesCompleted}/${plan.progress.totalPhases}`);

        return plan;
    }

    /**
     * Mark phase failed
     */
    failPhase(planId, phaseIndex, error) {
        const plan = this.loadPlan(planId);
        const phase = plan.phases[phaseIndex];

        phase.attempts++;
        phase.errors.push({
            timestamp: new Date().toISOString(),
            message: error
        });

        if (phase.attempts >= phase.maxAttempts) {
            phase.status = 'failed';
            plan.status = 'failed';
            console.log(`✗ Phase ${phaseIndex + 1} failed after ${phase.attempts} attempts`);
        } else {
            phase.status = 'retry';
            console.log(`⚠ Phase ${phaseIndex + 1} will retry (attempt ${phase.attempts}/${phase.maxAttempts})`);
        }

        this.savePlan(plan);
        return plan;
    }

    /**
     * Get next phase prompt
     */
    getNextPhase(planId) {
        const plan = this.loadPlan(planId);
        
        if (plan.status === 'completed') {
            return { completed: true, message: 'Plan completed' };
        }

        if (plan.status === 'failed') {
            return { failed: true, message: 'Plan failed' };
        }

        const currentPhase = plan.progress.currentPhase;
        const phase = plan.phases[currentPhase];

        if (phase.status === 'pending' || phase.status === 'retry') {
            return {
                planId,
                phaseIndex: currentPhase,
                phase,
                prompt: this.generatePhasePrompt(plan, currentPhase)
            };
        }

        return { error: 'No pending phase' };
    }

    /**
     * List plans
     */
    listPlans(filter = {}) {
        const files = fs.readdirSync(this.plansDir).filter(f => f.endsWith('.json'));
        
        let plans = files.map(f => {
            const plan = JSON.parse(fs.readFileSync(path.join(this.plansDir, f), 'utf8'));
            return {
                planId: plan.planId,
                name: plan.name,
                status: plan.status,
                progress: `${plan.progress.phasesCompleted}/${plan.progress.totalPhases}`,
                created: plan.createdAt
            };
        });

        if (filter.status) {
            plans = plans.filter(p => p.status === filter.status);
        }

        return plans.sort((a, b) => new Date(b.created) - new Date(a.created));
    }

    /**
     * Export plan summary
     */
    exportSummary(planId) {
        const plan = this.loadPlan(planId);
        
        let summary = `# Workflow Plan: ${plan.planId}\n\n`;
        summary += `**Task:** ${plan.name}\n`;
        summary += `**Type:** ${plan.taskType}\n`;
        summary += `**Status:** ${plan.status}\n`;
        summary += `**Progress:** ${plan.progress.phasesCompleted}/${plan.progress.totalPhases} phases\n`;
        summary += `**Created:** ${plan.createdAt}\n\n`;

        summary += `## Phases\n\n`;
        plan.phases.forEach((phase, idx) => {
            summary += `### ${idx + 1}. ${phase.name} [${phase.status}]\n\n`;
            summary += `${phase.description}\n\n`;
            summary += `- Context: ${phase.contextSize}\n`;
            summary += `- Time: ${phase.estimatedTime}\n`;
            summary += `- Attempts: ${phase.attempts}/${phase.maxAttempts}\n\n`;

            if (phase.artifacts && phase.artifacts.length > 0) {
                summary += `**Artifacts:**\n`;
                phase.artifacts.forEach(a => {
                    summary += `- ${a.path}: ${a.description}\n`;
                });
                summary += '\n';
            }

            if (phase.errors && phase.errors.length > 0) {
                summary += `**Errors:**\n`;
                phase.errors.forEach(e => {
                    summary += `- ${e.timestamp}: ${e.message}\n`;
                });
                summary += '\n';
            }
        });

        return summary;
    }
}

// CLI interface
if (require.main === module) {
    const orchestrator = new WorkflowOrchestrator();
    const args = process.argv.slice(2);
    const command = args[0];

    try {
        switch (command) {
            case 'plan': {
                const taskType = args[args.indexOf('--task') + 1];
                const name = args.includes('--name') ? args[args.indexOf('--name') + 1] : null;
                const options = { name };
                
                orchestrator.createPlan(taskType, options);
                break;
            }

            case 'next': {
                const planId = args[1];
                const result = orchestrator.getNextPhase(planId);
                
                if (result.prompt) {
                    console.log(result.prompt);
                } else {
                    console.log(JSON.stringify(result, null, 2));
                }
                break;
            }

            case 'complete': {
                const planId = args[1];
                const phaseIndex = parseInt(args[args.indexOf('--phase') + 1]);
                const artifactsArg = args.includes('--artifacts') ? args[args.indexOf('--artifacts') + 1] : '[]';
                const artifacts = JSON.parse(artifactsArg);
                
                orchestrator.completePhase(planId, phaseIndex, artifacts);
                break;
            }

            case 'fail': {
                const planId = args[1];
                const phaseIndex = parseInt(args[args.indexOf('--phase') + 1]);
                const error = args[args.indexOf('--error') + 1];
                
                orchestrator.failPhase(planId, phaseIndex, error);
                break;
            }

            case 'status': {
                const planId = args[1];
                const plan = orchestrator.loadPlan(planId);
                console.log(JSON.stringify({
                    planId: plan.planId,
                    status: plan.status,
                    progress: plan.progress,
                    currentPhase: plan.phases[plan.progress.currentPhase].name
                }, null, 2));
                break;
            }

            case 'list': {
                const status = args.includes('--status') ? args[args.indexOf('--status') + 1] : null;
                const plans = orchestrator.listPlans({ status });
                
                console.log('\nWorkflow Plans:');
                plans.forEach(p => {
                    console.log(`  ${p.planId}: ${p.name} [${p.status}] ${p.progress}`);
                });
                break;
            }

            case 'templates': {
                const templates = Object.keys(orchestrator.getTaskTemplate.call({ getTaskTemplate: () => ({
                    'defect-scan': {},
                    'defect-remediation': {},
                    'certification-wave': {},
                    'pack-audit': {}
                })}));
                console.log('\nAvailable Templates:');
                templates.forEach(t => console.log(`  - ${t}`));
                break;
            }

            case 'export': {
                const planId = args[1];
                const summary = orchestrator.exportSummary(planId);
                
                const outputPath = path.join(orchestrator.plansDir, `${planId}_SUMMARY.md`);
                fs.writeFileSync(outputPath, summary);
                console.log(`✓ Exported to: ${outputPath}`);
                break;
            }

            default:
                console.log(`
Workflow Orchestrator - Break Tasks into Context-Efficient Phases

Commands:
  plan --task TYPE [--name "description"]
  next PLAN_ID
  complete PLAN_ID --phase N --artifacts '[{path, description}]'
  fail PLAN_ID --phase N --error "message"
  status PLAN_ID
  list [--status pending]
  templates
  export PLAN_ID

Available Task Types:
  - defect-scan
  - defect-remediation
  - certification-wave
  - pack-audit

Examples:
  node workflow_orchestrator.js plan --task defect-remediation --name "DL-026 Pack D"
  node workflow_orchestrator.js next PLAN_20260828_defect-remediation_01
  node workflow_orchestrator.js complete PLAN_20260828_defect-remediation_01 --phase 0 --artifacts '[{"path":"reports/dl026_scan.json","description":"Scan results"}]'
                `);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = WorkflowOrchestrator;
