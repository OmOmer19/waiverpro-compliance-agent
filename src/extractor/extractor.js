// logs into waiverpro and captures authenticated pages
const {chromium} = require("playwright")

const {extractPageContent } = require("./pageExtractor")

// function to login and open authenticated dashboard
async function loginToWaiverPro() {
    // launching browser
    const browser = await chromium.launch({
        headless: false
    })
    // creating browser page
    const page = await  browser.newPage()

    // opening login page
    await page.goto(
        "https://white-cliff-0bca3ed00.1.azurestaticapps.net/login"
    )

    // waitin until page loads
    await page.waitForLoadState("networkidle")

    // filling email
     await page.fill(
        'input[type="email"]',
        "admin@gmail.com"
    )
    // Filling password
    await page.fill(
        'input[type="password"]',
        "password"
    )

    // clicking login button
     await page.click('button[type="submit"]')

    // waiting for dashboard page
    await page.waitForURL("**/dashboard/**")

    // small delay so everything renders
    await page.waitForTimeout(17000)

    // printing curr url
    console.log("Current URL:", await page.url())

    // taking screenshot after login
    await page.screenshot({
        path: 'screenshots/dashboard.png',
        fullPage: true
    })

    console.log(" Login successful");
    console.log(" Dashboard screenshot saved")

    return{
        browser, page
    }
}

// function to visit importent dasboard pages and save routes
async function extractAllRoutes(page) {
    // routes from the guideline document
    const routes = [
        "/dashboard/my-applications",
        "/dashboard/facilities",
        "/dashboard/action-items",
        "/dashboard/user-management",
        "/dashboard/announcements",
        "/dashboard/faqs",
        "/dashboard/tickets",
        "/dashboard/contact",
        "/dashboard/settings"
    ]

    const discoveredRoutes = []

    for(const route of routes){
        // opening page
        await page.goto(
            `https://white-cliff-0bca3ed00.1.azurestaticapps.net${route}`
        )
        // waiting for rendering
        await page.waitForLoadState("networkidle")

        const pageData = await extractPageContent(page)

        console.log(`Visited: ${route}`)

        discoveredRoutes.push({
            route,
            visitedAt: new Date().toISOString(),
            ...pageData
        })
    }
    return discoveredRoutes
}

// function to save discovered routes into json
function saveRoutes(routes){
    const fs = require("fs")
    const path = require("path")

    const outputPath = path.join(
        process.cwd(),
        "data",
        "extracted",
        "routes.json"
    )
    fs.writeFileSync(
        outputPath,
        JSON.stringify(routes, null, 2)
    )
    console.log(" Routes saved")
}

module.exports = {loginToWaiverPro, extractAllRoutes, saveRoutes}