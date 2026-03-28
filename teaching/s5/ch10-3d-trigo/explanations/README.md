# README.md

## 📂 Problem Explanations (Dynamic Hub)
This directory uses a Google Spreadsheet as a database to list 3D Geometry and Trigonometry problem walkthroughs.

### 📊 How to Update Content
1.  **Open Spreadsheet:** [Google Sheet Link](https://docs.google.com/spreadsheets/d/1q4pZt1Lplmd8TZXEDL6HKji0SmvV7rOeEW1t6zfXQ1U/)
2.  **Edit "explanations" Tab:**
    * **Column A:** Title (e.g., `2020 DSE Paper II Q38`)
    * **Column B:** Category (e.g., `Public Exams (DSE)`)
    * **Column C:** Tag (e.g., `MCQ`)
    * **Column D:** URL/Filename (e.g., `2020-DSE-MATH-II-Q38.html`)
3.  **Save:** Changes appear on the website automatically (may take 5 minutes to sync).

### 🛠 Technical Setup
* **Source:** Google Sheets "Publish to Web" as `.csv`.
* **Script:** `index.html` uses JavaScript `fetch()` to parse CSV data and group items by Category.
* **Styles:** Linked to `../style.css`.

### 📁 File Structure
```text
explanation/
├── index.html                 <-- Main Dynamic List
├── 2020-DSE-MATH-II-Q38.html   <-- Individual Solution
└── 2526-S5UT4-MCQ6.html        <-- Individual Solution
