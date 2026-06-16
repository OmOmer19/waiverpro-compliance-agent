# WaiverPro Compliance Agent

## 🚀 Project Overview
WaiverPro Compliance Agent is an automation system that validates whether a healthcare web application UI matches its official guideline documentation.

It extracts structured requirements from a PDF document and compares them against live UI screens using browser automation.

---

## 🎯 Problem Statement
Manual verification of UI compliance with documentation is:
- Time-consuming
- Error-prone
- Not scalable

This project automates the entire validation pipeline.

---

## ⚙️ How It Works

### 1. PDF Processing
- Extracts text from official WaiverPro guideline PDF
- Converts raw text into structured sections

### 2. UI Automation
- Logs into WaiverPro using Playwright
- Crawls authenticated dashboard routes
- Extracts UI elements from each page

### 3. Comparison Engine
- Compares guideline sections with UI data
- Identifies missing or mismatched elements

### 4. Report Generation
- Produces structured JSON report
- Includes route-wise compliance status

---

## 🧰 Tech Stack
- Node.js
- Playwright
- pdf-parse
- File System (fs)

---

## 📁 Project Structure
```
src/
├── parser/
├── extractor/
├── agent/
├── report/
└── index.js
```

---

## 📊 Output Example
```json
{
  "route": "/dashboard/settings",
  "section": "1",
  "missing": [
    "About This Guide",
    "WaiverPro is a web-based platform..."
  ]
}