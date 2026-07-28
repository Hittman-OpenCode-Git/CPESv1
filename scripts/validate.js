const ValidatorRunner = require("./lib/ValidatorRunner");

async function main() {
    const runner = new ValidatorRunner();
    const summary = await runner.runAll();
    console.log("\n=== Final Summary ===");
    console.log(`Validators: ${summary.validators}`);
    console.log(`Passed: ${summary.passed}`);
    console.log(`Warned: ${summary.warned}`);
    console.log(`Failed: ${summary.failed}`);
    console.log(`Errors: ${summary.totalErrors}`);
    console.log(`Warnings: ${summary.totalWarnings}`);
    console.log(`Status: ${summary.status}`);
    process.exit(summary.status === "FAIL" ? 1 : 0);
}

main().catch(err => {
    console.error("Fatal error:", err.message);
    process.exit(1);
});
