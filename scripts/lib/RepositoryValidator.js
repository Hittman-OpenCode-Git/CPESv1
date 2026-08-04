const fs = require("fs");
const path = require("path");

const Validator = require("../validators/Validator");
const config = require("../config");

class RepositoryValidator extends Validator {
    constructor() {
        super("Repository Validator");
    }

    validate() {
        this.start();

        const root = path.resolve(__dirname, "..", "..");

        // ----------------------------
        // Required Files
        // ----------------------------

        const requiredFiles = [
            "app/app.js",
            "styles.css",
            "index_updated.html"
        ];

        requiredFiles.forEach(file => {

            const fullPath = path.join(root, file);

            if (!fs.existsSync(fullPath)) {

                this.addError(`Missing required file: ${file}`);

            }

        });

        // ----------------------------
        // Required Directories
        // ----------------------------

        const requiredDirectories = [
            "knowledge",
            "scripts"
        ];

        requiredDirectories.forEach(dir => {

            const fullPath = path.join(root, dir);

            if (!fs.existsSync(fullPath)) {

                this.addError(`Missing required directory: ${dir}`);

                return;
            }

            if (!fs.statSync(fullPath).isDirectory()) {

                this.addError(`${dir} exists but is not a directory`);

            }

        });

        // ----------------------------
        // Question Packs
        // ----------------------------

        const packFiles = [

            "content/packs/pack_a_corrected.js",

            "content/packs/pack_b_corrected.js",

            "content/packs/pack_c_corrected.js",

            "content/packs/pack_d_corrected.js",

            "content/packs/pack_e_corrected.js"

        ];

        let packCount = 0;

        packFiles.forEach(file => {

            const fullPath = path.join(root, file);

            if (fs.existsSync(fullPath)) {

                packCount++;

            }
            else {

                this.addWarning(`Question pack missing: ${file}`);

            }

        });

        this.addStatistic("Question Packs", packCount);

        // ----------------------------
        // Case Study Banks
        // ----------------------------

        const caseFiles = [

            "content/cases/legacy/scored_cases.js",

            "content/cases/legacy/scored_cases2.js",

            "content/cases/legacy/scored_cases3.js",

            "content/cases/legacy/scored_cases4.js",

            "content/cases/legacy/scored_cases5.js"

        ];

        let caseCount = 0;

        caseFiles.forEach(file => {

            const fullPath = path.join(root, file);

            if (fs.existsSync(fullPath)) {

                caseCount++;

            }
            else {

                this.addWarning(`Case bank missing: ${file}`);

            }

        });

        this.addStatistic("Case Banks", caseCount);

        // ----------------------------
        // Knowledge Library
        // ----------------------------

        const constitution = path.join(
            root,
            "knowledge",
            "00_PROJECT_CONSTITUTION.md"
        );

        if (!fs.existsSync(constitution)) {

            this.addWarning(
                "Project Constitution not found."
            );

        }

        // ----------------------------
        // Finish
        // ----------------------------

        this.finish();

        return this.report();

    }

}

module.exports = RepositoryValidator;