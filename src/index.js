// main file- entry point

const {extractPdfText, generateStructuredGuidelines} =require("./parser/pdfParser")

const {loginToWaiverPro, extractAllRoutes, saveRoutes} = require('./extractor/extractor')

const {extractPageContent} = require('./extractor/pageExtractor')

const {compare} = require("./agent/comparator")

const {generateReport } = require("./report/reportGenerator")

async function run() {
    try{
        // extracting pdf text
        await extractPdfText()

        // generating structured guidelines
        await generateStructuredGuidelines()

        // login to 
        const {browser, page} = await loginToWaiverPro()

        // extracting routes
        const routes = await extractAllRoutes(page)
        
        //saving routes
        saveRoutes(routes)

        //extrracting page content
        const pageData = await extractPageContent(page)

        // comparing guidelines vs ui
        const issues = compare(pageData)

        //generating report
        const report = generateReport(issues)

        console.log("final report generated", report)

        //closig browser
        await browser.close()
    }
    catch(err){
        console.error("execution failes",err)
    }
}
run()