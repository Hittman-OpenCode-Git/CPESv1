const path = require("path");
const fs = require("fs");
const config = require("../config");
const logger = require("./logger");

class ValidatorRunner {
    constructor() {
        this.results = [];
        this.validatorCache = {};
    }

    async runAll() {
        logger.info("=== CMA Part 1 Validation Framework ===");
        logger.info(`Project: ${config.project.name} v${config.project.version}`);
        logger.info(`Enabled Validators: ${config.enabledValidators.join(", ")}`);
        logger.info("");

        const validators = config.enabledValidators;

        for (const name of validators) {
            const validator = this.loadValidator(name);
            if (!validator) {
                logger.error(`Validator "${name}" could not be loaded. Skipping.`);
                continue;
            }

            logger.info(`Running ${name}...`);
            try {
                const report = validator.validate();
                this.results.push(report);
                const statusIcon = report.status === "PASS" ? "PASS" :
                    report.status === "WARN" ? "WARN" : "FAIL";
                const statusFn = report.status === "PASS" ? logger.success :
                    report.status === "WARN" ? logger.warning : logger.error;
                statusFn(`${name}: ${report.status} (${report.duration}ms)`);
                if (report.errors.length > 0) {
                    report.errors.forEach(e => logger.error(`  ${e}`));
                }
                if (report.warnings.length > 0) {
                    report.warnings.forEach(w => logger.warning(`  ${w}`));
                }
                if (Object.keys(report.statistics).length > 0) {
                    Object.keys(report.statistics).forEach(k => {
                        logger.info(`  ${k}: ${report.statistics[k]}`);
                    });
                }
                logger.info("");
            } catch (err) {
                logger.error(`${name}: CRASHED - ${err.message}`);
                this.results.push({
                    validator: name,
                    status: "ERROR",
                    errors: [err.message],
                    warnings: [],
                    statistics: {},
                    duration: 0,
                    confidence: 0
                });
            }
        }

        this.generateReports();
        return this.summary();
    }

    loadValidator(name) {
        if (this.validatorCache[name]) return this.validatorCache[name];

        const validatorPath = path.join(config.paths.validators, `${name}.js`);
        const libPath = path.join(config.paths.lib, `${name}.js`);

        let ValidatorClass = null;
        try {
            if (fs.existsSync(validatorPath)) {
                ValidatorClass = require(validatorPath);
            } else if (fs.existsSync(libPath)) {
                ValidatorClass = require(libPath);
            } else {
                return null;
            }
        } catch (e) {
            logger.error(`Error loading validator ${name}: ${e.message}`);
            return null;
        }

        if (typeof ValidatorClass !== "function") return null;
        const instance = new ValidatorClass();
        this.validatorCache[name] = instance;
        return instance;
    }

    generateReports() {
        const reportsDir = config.paths.reports;
        const outputDir = config.paths.output;
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // --- JSON Report ---
        const jsonPath = path.join(outputDir, config.reports.json);
        fs.writeFileSync(jsonPath, JSON.stringify(this.results, null, 2), "utf8");
        logger.success(`JSON report: ${jsonPath}`);

        // --- Markdown Summary ---
        const mdPath = path.join(outputDir, config.reports.markdown);
        const md = this.buildMarkdownSummary();
        fs.writeFileSync(mdPath, md, "utf8");
        logger.success(`Markdown summary: ${mdPath}`);

        // --- HTML Report ---
        const htmlPath = path.join(outputDir, config.reports.html);
        const html = this.buildHTMLReport();
        fs.writeFileSync(htmlPath, html, "utf8");
        logger.success(`HTML report: ${htmlPath}`);
    }

    buildMarkdownSummary() {
        const lines = [];
        lines.push("# Validation Report Summary");
        lines.push("");
        lines.push(`**Generated:** ${new Date().toISOString()}`);
        lines.push(`**Project:** ${config.project.name} v${config.project.version}`);
        lines.push("");
        lines.push("## Results");
        lines.push("");
        lines.push("| Validator | Status | Errors | Warnings | Duration |");
        lines.push("|-----------|--------|--------|----------|----------|");

        let totalErrors = 0;
        let totalWarnings = 0;

        this.results.forEach(r => {
            totalErrors += r.errors.length;
            totalWarnings += r.warnings.length;
            lines.push(`| ${r.validator} | ${r.status} | ${r.errors.length} | ${r.warnings.length} | ${r.duration}ms |`);
        });

        lines.push("");
        lines.push(`**Total Errors:** ${totalErrors}`);
        lines.push(`**Total Warnings:** ${totalWarnings}`);
        lines.push(`**Overall Status:** ${totalErrors > 0 ? "FAIL" : totalWarnings > 0 ? "WARN" : "PASS"}`);

        // --- Details ---
        lines.push("");
        lines.push("## Details");
        this.results.forEach(r => {
            lines.push("");
            lines.push(`### ${r.validator}`);
            lines.push(`**Status:** ${r.status}`);
            lines.push(`**Duration:** ${r.duration}ms`);
            if (Object.keys(r.statistics).length > 0) {
                lines.push("**Statistics:**");
                Object.keys(r.statistics).forEach(k => {
                    lines.push(`- ${k}: ${r.statistics[k]}`);
                });
            }
            if (r.errors.length > 0) {
                lines.push("**Errors:**");
                r.errors.forEach(e => lines.push(`- ${e}`));
            }
            if (r.warnings.length > 0) {
                lines.push("**Warnings:**");
                r.warnings.forEach(w => lines.push(`- ${w}`));
            }
        });

        return lines.join("\n");
    }

    buildHTMLReport() {
        const lines = [];
        lines.push("<!DOCTYPE html>");
        lines.push('<html lang="en">');
        lines.push("<head>");
        lines.push('<meta charset="UTF-8">');
        lines.push("<title>CMA Part 1 Validation Report</title>");
        lines.push("<style>");
        lines.push("body { font-family: -apple-system, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; background: #f5f5f5; }");
        lines.push("h1 { color: #333; } h2 { color: #555; }");
        lines.push(".pass { background: #d4edda; color: #155724; }");
        lines.push(".warn { background: #fff3cd; color: #856404; }");
        lines.push(".fail { background: #f8d7da; color: #721c24; }");
        lines.push(".error { background: #f8d7da; }");
        lines.push(".warning { background: #fff3cd; }");
        lines.push("table { width: 100%; border-collapse: collapse; margin: 10px 0; background: white; }");
        lines.push("th, td { padding: 8px 12px; text-align: left; border: 1px solid #ddd; }");
        lines.push("th { background: #f0f0f0; }");
        lines.push(".badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-weight: bold; }");
        lines.push("</style>");
        lines.push("</head>");
        lines.push("<body>");
        lines.push(`<h1>CMA Part 1 Validation Report</h1>`);
        lines.push(`<p>Generated: ${new Date().toISOString()}</p>`);
        lines.push(`<p>Project: ${config.project.name} v${config.project.version}</p>`);

        let totalErrors = 0;
        let totalWarnings = 0;

        lines.push("<h2>Results</h2>");
        lines.push("<table><tr><th>Validator</th><th>Status</th><th>Errors</th><th>Warnings</th><th>Duration</th></tr>");
        this.results.forEach(r => {
            totalErrors += r.errors.length;
            totalWarnings += r.warnings.length;
            const cls = r.status === "PASS" ? "pass" : r.status === "WARN" ? "warn" : "fail";
            lines.push(`<tr><td>${r.validator}</td><td class="${cls}">${r.status}</td><td>${r.errors.length}</td><td>${r.warnings.length}</td><td>${r.duration}ms</td></tr>`);
        });
        lines.push("</table>");

        lines.push(`<p><strong>Total Errors:</strong> ${totalErrors} | <strong>Total Warnings:</strong> ${totalWarnings} | <strong>Overall:</strong> <span class="badge ${totalErrors > 0 ? 'fail' : totalWarnings > 0 ? 'warn' : 'pass'}">${totalErrors > 0 ? "FAIL" : totalWarnings > 0 ? "WARN" : "PASS"}</span></p>`);

        this.results.forEach(r => {
            lines.push(`<h2 id="${r.validator}">${r.validator}</h2>`);
            lines.push(`<p>Status: <span class="badge ${r.status === 'PASS' ? 'pass' : r.status === 'WARN' ? 'warn' : 'fail'}">${r.status}</span> | Duration: ${r.duration}ms</p>`);

            if (Object.keys(r.statistics).length > 0) {
                lines.push("<h3>Statistics</h3><table><tr><th>Metric</th><th>Value</th></tr>");
                Object.keys(r.statistics).forEach(k => {
                    lines.push(`<tr><td>${k}</td><td>${r.statistics[k]}</td></tr>`);
                });
                lines.push("</table>");
            }

            if (r.errors.length > 0) {
                lines.push("<h3>Errors</h3><table>");
                r.errors.forEach(e => lines.push(`<tr class="error"><td>${e}</td></tr>`));
                lines.push("</table>");
            }

            if (r.warnings.length > 0) {
                lines.push("<h3>Warnings</h3><table>");
                r.warnings.forEach(w => lines.push(`<tr class="warning"><td>${w}</td></tr>`));
                lines.push("</table>");
            }
        });

        lines.push("</body></html>");
        return lines.join("\n");
    }

    summary() {
        let totalErrors = 0;
        let totalWarnings = 0;
        let passCount = 0;
        let warnCount = 0;
        let failCount = 0;

        this.results.forEach(r => {
            totalErrors += r.errors.length;
            totalWarnings += r.warnings.length;
            if (r.status === "PASS") passCount++;
            else if (r.status === "WARN") warnCount++;
            else failCount++;
        });

        return {
            validators: this.results.length,
            passed: passCount,
            warned: warnCount,
            failed: failCount,
            totalErrors,
            totalWarnings,
            status: totalErrors > 0 ? "FAIL" : totalWarnings > 0 ? "WARN" : "PASS"
        };
    }
}

module.exports = ValidatorRunner;
