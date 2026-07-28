const path = require("path");
const fs = require("fs");
const Validator = require("./Validator");
const config = require("../config");

class PsychometricValidator extends Validator {
    constructor() {
        super("PsychometricValidator");
        this.modules = [];
        this.moduleDir = path.join(config.paths.validators, "psychometric");
    }

    loadModules() {
        if (!fs.existsSync(this.moduleDir)) return;
        const files = fs.readdirSync(this.moduleDir).filter(f => f.endsWith(".js"));
        files.sort().forEach(file => {
            try {
                const ModuleClass = require(path.join(this.moduleDir, file));
                if (typeof ModuleClass !== "function") return;
                const instance = new ModuleClass();
                if (!(instance instanceof Validator)) return;
                this.modules.push(instance);
            } catch (e) {
                this.addWarning(`Failed to load psychometric module: ${file} - ${e.message}`);
            }
        });
    }

    validate() {
        this.start();
        this.loadModules();

        if (this.modules.length === 0) {
            this.addWarning("No psychometric modules loaded. Place modules in validators/psychometric/");
            this.finish();
            return this.report();
        }

        let totalErrors = 0;
        let totalWarnings = 0;

        this.modules.forEach(mod => {
            try {
                const report = mod.validate();
                totalErrors += report.errors.length;
                totalWarnings += report.warnings.length;
                report.errors.forEach(e => this.addError(`[${mod.name}] ${e}`));
                report.warnings.forEach(w => this.addWarning(`[${mod.name}] ${w}`));
                if (report.statistics) {
                    Object.keys(report.statistics).forEach(k => {
                        this.addStatistic(`${mod.name}.${k}`, report.statistics[k]);
                    });
                }
            } catch (e) {
                this.addError(`[${mod.name}] CRASHED: ${e.message}`);
            }
        });

        this.addStatistic("modules", this.modules.length);
        this.addStatistic("totalErrors", totalErrors);
        this.addStatistic("totalWarnings", totalWarnings);
        this.finish();
        return this.report();
    }
}

module.exports = PsychometricValidator;
