//Reads the WaiverPro guideline PDF and extracts its text content.
//The extracted text will later be transformed into structured guideline sections and requirements.

const fs = require("fs")
const path = require("path")
const pdf = require("pdf-parse")

// console.log(pdfParse)

// function to extract text from guidelines and save the result into text 

async function extractPdfText() {
    try{
        // absolute path to the guideline pdf
        const pdfPath = path.join(
            process.cwd(),
            "data",
            "guidelines",
            "WaiverPro-User-Guidelines.pdf"
        )
        // reading the pdf file into memory
        const pdfBuffer = fs.readFileSync(pdfPath)
        // extracting text from the pdf
        const pdfData = await pdf(pdfBuffer)

        // location where extracted text will be stored
        const outputPath = path.join(
            process.cwd(),
            "data",
            "guidelines",
            "raw-guidelines.txt"
        )

        // saving extracted text
        fs.writeFileSync(outputPath, pdfData.text)

        console.log(" PDF text extracted successfully")
        console.log(` Pages: ${pdfData.numpages}`)
        console.log(` Saved to: ${outputPath}`)
    }
    catch(err){
        console.error("Failed to parse PDF")
        console.error(err)
    }
}

// function to convert extracted pdf into structured guidelines sections
function parseSections(rawText){
    // splitting document whenever a new section begins
    const sections = rawText.split(/SECTION\s+\d+/g)
    // finding all section numbers
    const sectionNumbers = [...rawText.matchAll(/SECTION\s+(\d+)/g)]
                           .map(match => match[1])
    // to store final sections
    const parsedSections = []

    sections.forEach((sectionText, index) => {
        // first split contains document header
        if(index === 0) return

        const lines = sectionText.split("\n")
                                 .map(line => line.trim())
                                 .filter(Boolean)
        
        if(lines.length === 0) return

        const sectionTitle = lines[0]

        const urlLine = lines.find(line => line.startsWith("URL"))

        parsedSections.push({
            sectionNumber: sectionNumbers[index - 1],
            sectionTitle,
            url: urlLine|| null,
            content: sectionText.trim()
        })
    })
    return parsedSections
}

// function to read extracted guidelines text and convert it into json

function generateStructuredGuidelines(){
    // path of previous extracted text
    const rawTextPath = path.join(
        process.cwd(),
        "data",
        "guidelines",
        "raw-guidelines.txt"
    )
    // reading guidelines text
    const rawText = fs.readFileSync(rawTextPath, "utf8")

    //converting text into structured sections
    const sections = parseSections(rawText)

    const outputPath = path.join(
        process.cwd(),
        "data",
        "guidelines",
        "guidelines.json"
    )
    fs.writeFileSync(
        outputPath,
        JSON.stringify(sections, null, 2)
    )
    console.log(" Structured guidelines generated")
    console.log(` Sections Found: ${sections.length}`)
}

module.exports = {extractPdfText,generateStructuredGuidelines}