// compares guideline requirements with actual UI extracted from website

const fs = require("fs")
const path = require("path")

// function to load guidelines + page data
function loadData(){
    const guidelinePath = path.join(
        process.cwd(),
        "data",
        "guidelines",
        "guidelines.json"
    )
    const pagesPath = path.join(
        process.cwd(),
        "data",
        "extracted",
        "routes.json"
    )
    const guidelines = JSON.parse(fs.readFileSync(guidelinePath, "utf8"))
    const pages = JSON.parse(fs.readFileSync(pagesPath, "utf8"))

    return {guidelines, pages}
}

// main comparison functiion

function compare(){
    const { guidelines, pages } = loadData()

    const issues = []

    pages.forEach(page => {
        const text = page.headings?.join(" ") + " " + page.buttons?.join(" ")

        guidelines.forEach(section => {
            const sectionText = section.content

            // simple keyword match (MVP logic)
            const missingKeywords = []

            const keywords = extractKeywords(sectionText)

            keywords.forEach(keyword => {
                if (!text.toLowerCase().includes(keyword.toLowerCase())) {
                    missingKeywords.push(keyword)
                }
            })

            if(missingKeywords.length > 0){
                issues.push({
                    route: page.route,
                    section: section.sectionNumber,
                    missing: missingKeywords
                })
            }
        })
    })
    return issues
}

// helper keyword extarctor function
function extractKeywords(text) {

    return text
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 4)
        .slice(0, 8) // limit noise
}

module.exports = {compare}