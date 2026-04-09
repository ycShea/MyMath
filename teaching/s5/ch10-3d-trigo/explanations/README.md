## 📂 Problem Explanations (Dynamic Hub)
This directory uses a Google Spreadsheet as a database to list 3D Geometry and Trigonometry problem walkthroughs.

Link to the HTML:
[https://ycshea.github.io/MyMath/teaching/s5/ch10-3d-trigo/explanations/index.html](https://ycshea.github.io/MyMath/teaching/s5/ch10-3d-trigo/explanations/index.html)

### 📊 How to Update Content
1. **Open Spreadsheet:**  
   https://docs.google.com/spreadsheets/d/1q4pZt1Lplmd8TZXEDL6HKji0SmvV7rOeEW1t6zfXQ1U/

2. **Edit "explanations" Tab:**
   * Column A: Title (e.g., `2020 DSE Paper II Q38`)
   * Column B: Category (e.g., `Public Exams (DSE)`)
   * Column C: Tag (e.g., `MCQ`)
   * Column D: File name or URL (e.g., `2020-DSE-MATH-II-Q38.html`)

3. **Save:**  
   Changes will appear on the website automatically (may take about 5 minutes to sync).

### 🛠 Technical Setup
* Source: Google Sheets "Publish to Web" as `.csv`
* Script: `index.html` uses JavaScript `fetch()` to parse CSV data and group items by Category
* Styles: linked to `../style.css`

### 📁 File Structure
explanations/
├── index.html <-- Main Dynamic List
├── 2020-DSE-MATH-II-Q38.html <-- Individual Solution
└── 2526-S5UT4-MCQ6.html <-- Individual Solution
