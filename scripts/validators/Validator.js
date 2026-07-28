class Validator {

    constructor(name) {

        this.name = name;

        this.errors = [];

        this.warnings = [];

        this.statistics = {};

        this.startTime = null;

        this.endTime = null;

        this.confidence = 100;

    }

    start() {

        this.startTime = Date.now();

    }

    finish() {

        this.endTime = Date.now();

    }

    duration() {

        return this.endTime - this.startTime;

    }

    addError(message) {

        this.errors.push(message);

    }

    addWarning(message) {

        this.warnings.push(message);

    }

    addStatistic(name, value) {

        this.statistics[name] = value;

    }

    status() {

        if (this.errors.length)

            return "FAIL";

        if (this.warnings.length)

            return "WARN";

        return "PASS";

    }

    report() {

        return {

            validator: this.name,

            status: this.status(),

            errors: this.errors,

            warnings: this.warnings,

            statistics: this.statistics,

            duration: this.duration(),

            confidence: this.confidence

        };

    }

}

module.exports = Validator;