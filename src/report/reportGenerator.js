// it generates final  report from comparison results

const fs = require("fs")
const path = require("path")

function generateReport(issues){

    // total pages checked (approx)
    const totalChecks = 10

    const complianceScore =
        Math.max(0, ((totalChecks - issues.length) / totalChecks) * 100)
    
    const report = {
        timestamp: new Date().toISOString(),
        totalIssues: issues.length,
        complianceScore: Math.round(complianceScore),
        status:
            complianceScore > 80
                ? "COMPLIANT"
                : complianceScore > 50
                ? "PARTIALLY_COMPLIANT"
                : "NON_COMPLIANT",
        issues
    }

    const outputPath = path.join(
        process.cwd(),
        "data",
        "reports",
        "compliance-report.json"
    )

    fs.writeFileSync(
        outputPath,
        JSON.stringify(report, null, 2)
    )

    console.log(" Report generated")
    console.log(` Score: ${report.complianceScore}%`)

    return report
}

module.exports = {generateReport}