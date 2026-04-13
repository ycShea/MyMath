# Web Design Prototype: 10-Page Progress Navigation

This project features a split-screen layout with a progress-based navigation top bar (1/3 of the page) and a scrollable content area (2/3 of the page).
https://ycshea.github.io/MyMath/teaching/s5/ch10-3d-trigo/basic-concepts/index.html

## Features
* **Progress Navigation:** 10 large buttons occupying the top 1/3 of the screen.
* **Dynamic Content:** Each button toggles one of 10 pages in the bottom section.
* **Scrollable Questions:** Each page contains 8 questions with variable-height images.
* **Responsive Layout:** Buttons are sized at 1/5 of the container width across two rows.

## Live URL
To view this code live, copy the content below into a web editor such as [CodePen](https://codepen.io/pen/) or [JSFiddle](https://jsfiddle.net/).

---

## Source Code (index.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body, html {
            height: 100%;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            overflow: hidden;
        }

        .container {
            display: flex;
            flex-direction: column;
            height: 100vh;
        }

        /* Top 1/3: Navigation Section */
        .top-section {
            height: 33.33vh;
            background-color: #f8f9fa;
            border-bottom: 2px solid #dee2e6;
            display: flex;
            flex-wrap: wrap;
            padding: 10px;
            gap: 0;
        }

        .nav-btn {
            width: 20%; /* 1/5 of width */
            height: 50%; /* 2 rows for 10 buttons */
            font-size: 1.2rem;
            font-weight: bold;
            cursor: pointer;
            border: 1px solid #dee2e6;
            background-color: #ffffff;
            transition: all 0.2s ease-in-out;
        }

        .nav-btn:hover {
            background-color: #f1f1f1;
        }

        .nav-btn.active {
            background-color: #007bff;
            color: white;
            border-color: #0056b3;
            z-index: 1;
        }

        /* Bottom 2/3: Content Section */
        .bottom-section {
            height: 66.67vh;
            overflow-y: auto;
            padding: 30px;
            background-color: #ffffff;
        }

        .page-content {
            display: none;
            max-width: 800px;
            margin: 0 auto;
        }

        .page-content.active {
            display: block;
        }

        .question {
            margin-bottom: 50px;
            padding: 20px;
            border-bottom: 1px solid #eee;
        }

        .question-image {
            width: 100%;
            background-color: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            color: #aaa;
            border-radius: 4px;
        }

        .question-text {
            font-size: 1.2rem;
            margin-bottom: 15px;
            color: #333;
        }

        textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
            resize: vertical;
        }
    </style>
</head>
<body>

<div class="container">
    <nav class="top-section" id="navbar"></nav>
    <main class="bottom-section" id="content-area"></main>
</div>

<script>
    const navbar = document.getElementById('navbar');
    const contentArea = document.getElementById('content-area');
    const totalPages = 10;
    const questionsPerPage = 8;

    for (let i = 1; i <= totalPages; i++) {
        // Create Navigation Button
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.id = `btn-${i}`;
        btn.innerText = i;
        btn.onclick = () => showPage(i);
        navbar.appendChild(btn);

        // Create Page Container
        const page = document.createElement('div');
        page.className = 'page-content';
        page.id = `page-${i}`;
        
        const title = document.createElement('h1');
        title.innerText = `Step ${i} of 10`;
        title.style.marginBottom = '30px';
        page.appendChild(title);

        // Create Questions
        for (let j = 1; j <= questionsPerPage; j++) {
            const qBox = document.createElement('div');
            qBox.className = 'question';
            
            // Simulating different image heights
            const randomHeight = Math.floor(Math.random() * (450 - 200 + 1)) + 200;
            
            qBox.innerHTML = `
                <div class="question-image" style="height: ${randomHeight}px;">
                    Placeholder Image (Height: ${randomHeight}px)
                </div>
                <div class="question-text">
                    <strong>Question ${i}.${j}:</strong> Please describe your observations based on the image above.
                </div>
                <textarea rows="3" placeholder="Type your answer here..."></textarea>
            `;
            page.appendChild(qBox);
        }
        contentArea.appendChild(page);
    }

    function showPage(pageNum) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));

        document.getElementById(`btn-${pageNum}`).classList.add('active');
        document.getElementById(`page-${pageNum}`).classList.add('active');

        contentArea.scrollTop = 0;
    }

    showPage(1);
</script>

</body>
</html>
