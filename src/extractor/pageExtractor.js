// extracts headings and buttons from dashboard pages

// function to collect ui elements from current page
async function extractPageContent(page) {
    // getting all the headings from the page
    const headings = await page.locator("h1,h2,h3").allTextContents()

    // getting all the buttons
    const buttons = await page.locator("button").allTextContents()

    return{
        headings,
        buttons
    }
}

// function to save extracted page data
const fs = require("fs")
const path = require("path")

function savePageData(data){

    const outputPath = path.join(
        process.cwd(),
        "data",
        "extracted",
        "pages.json"
    )

    fs.writeFileSync(
        outputPath,
        JSON.stringify(data, null, 2)
    )

    console.log(" Page data saved")
}


module.exports={extractPageContent, savePageData}