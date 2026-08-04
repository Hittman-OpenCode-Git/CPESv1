const path = require("path");
const fs = require("fs");
const Validator = require("./Validator");
const config = require("../config");
const CaseExtractor = require("../lib/CaseExtractor");
const taxonomy = require("./config/taxonomy");

class BlueprintValidator extends Validator {
    constructor() {
        super("Blueprint Validator");
        this.sectionToDomain = taxonomy.sectionToDomain;
        this.domainToSection = taxonomy.domainToSection;
        this.domainTopics = taxonomy.domainTopics;
    }

    validate() {
        this.start();
        const root = config.paths.root;
        const banks = config.caseBanks;
        let totalCases = 0;
        let crossDomainCases = 0;
        let topicCounts = {};

        banks.forEach(file => {
            const fullPath = path.join(root, file);
            if (!fs.existsSync(fullPath)) return;
            const content = fs.readFileSync(fullPath, "utf8");
            const cases = this.extractCases(content, file);
            if (!cases) return;

            cases.forEach((c, idx) => {
                totalCases++;
                this.validateBlueprint(c, file, idx);
                if (c.BlueprintDomain) {
                    if (!topicCounts[c.BlueprintDomain]) {
                        topicCounts[c.BlueprintDomain] = 0;
                    }
                    topicCounts[c.BlueprintDomain]++;
                }
                if (c.SectionTags && c.SectionTags.length > 1) {
                    crossDomainCases++;
                }
            });
        });

        this.addStatistic("Cases Checked", totalCases);
        this.addStatistic("Cross-Domain Cases", crossDomainCases);
        Object.keys(topicCounts).sort().forEach(d => {
            this.addStatistic(`Domain: ${d}`, topicCounts[d]);
        });
        this.checkCoverage(topicCounts, totalCases);
        this.finish();
        return this.report();
    }

    extractCases(content, filename) {
        return CaseExtractor.extractFromContent(content);
    }

    validateBlueprint(c, filename, idx) {
        const caseID = c.CaseID || "?";
        const prefix = `${filename}[${idx}] (${caseID})`;

        if (!c.SectionTags || !Array.isArray(c.SectionTags)) return;

        if (c.BlueprintDomain) {
            if (c.SectionTags.length === 1) {
                const expectedDomain = this.sectionToDomain[c.SectionTags[0]];
                if (expectedDomain && c.BlueprintDomain !== expectedDomain) {
                    this.addWarning(
                        `${prefix}: SectionTag "${c.SectionTags[0]}" expected BlueprintDomain "${expectedDomain}", got "${c.BlueprintDomain}"`
                    );
                }
            } else {
                const expectedDomains = c.SectionTags
                    .map(s => this.sectionToDomain[s])
                    .filter(Boolean);
                if (expectedDomains.length > 0 && !expectedDomains.includes(c.BlueprintDomain)) {
                    this.addWarning(
                        `${prefix}: SectionTags ${JSON.stringify(c.SectionTags)} map to domains [${expectedDomains.join(", ")}], but BlueprintDomain is "${c.BlueprintDomain}"`
                    );
                }
            }
        } else {
            this.addWarning(`${prefix}: Missing BlueprintDomain`);
        }
        if (c.BlueprintDomain) {
            if (!this.domainToSection[c.BlueprintDomain]) {
                this.addError(`${prefix}: BlueprintDomain "${c.BlueprintDomain}" is not a recognized domain name`);
            }
        }
        if (!c.BlueprintObjectives || !Array.isArray(c.BlueprintObjectives) || c.BlueprintObjectives.length === 0) {
            this.addWarning(`${prefix}: Missing or empty BlueprintObjectives`);
        }
        if (!c.LearningObjectives || !Array.isArray(c.LearningObjectives) || c.LearningObjectives.length === 0) {
            this.addWarning(`${prefix}: Missing or empty LearningObjectives`);
        }
        if (c.Items && Array.isArray(c.Items) && c.BlueprintDomain) {
            const domainTopicList = this.domainTopics[c.BlueprintDomain];
            if (domainTopicList) {
                const unmappedTopics = new Set();
                c.Items.forEach((item, itemIdx) => {
                    if (item.Topic && !domainTopicList.some(dt =>
                        dt.toLowerCase() === item.Topic.toLowerCase() ||
                        item.Topic.toLowerCase().includes(dt.toLowerCase()) ||
                        dt.toLowerCase().includes(item.Topic.toLowerCase())
                    )) {
                        unmappedTopics.add(item.Topic);
                    }
                });
                if (unmappedTopics.size > 0) {
                    this.addWarning(
                        `${prefix}: ${unmappedTopics.size} item topic(s) not in domain topic list for "${c.BlueprintDomain}": ${[...unmappedTopics].slice(0, 5).join(", ")}${unmappedTopics.size > 5 ? "..." : ""}`
                    );
                }
            }
        }
        c.SectionTags.forEach(tag => {
            if (!this.sectionToDomain[tag]) {
                this.addError(`${prefix}: Invalid SectionTag "${tag}"`);
            }
        });
        if (c.CaseID) {
            const match = c.CaseID.match(/^CBQ(\d*)-([A-F])(\d*)$/);
            if (match) {
                const section = match[2];
                const sequence = parseInt(match[3], 10);
                if (isNaN(sequence) || sequence < 1) {
                    this.addWarning(`${prefix}: CaseID sequence number should be >= 1`);
                }
            }
        }
    }

    checkCoverage(topicCounts, totalCases) {
        if (totalCases === 0) return;
        const targetPerDomain = totalCases / 6;
        const tolerance = Math.ceil(targetPerDomain * 0.3);
        Object.keys(this.sectionToDomain).forEach(section => {
            const domain = this.sectionToDomain[section];
            const count = topicCounts[domain] || 0;
            if (count < targetPerDomain - tolerance) {
                this.addWarning(
                    `Domain "${domain}" has ${count} cases (expected ${Math.round(targetPerDomain - tolerance)}-${Math.round(targetPerDomain + tolerance)}). Underrepresented.`
                );
            } else if (count > targetPerDomain + tolerance) {
                this.addWarning(
                    `Domain "${domain}" has ${count} cases (expected ${Math.round(targetPerDomain - tolerance)}-${Math.round(targetPerDomain + tolerance)}). Overrepresented.`
                );
            }
        });
    }
}

module.exports = BlueprintValidator;
