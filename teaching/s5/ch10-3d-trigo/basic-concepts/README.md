# Quiz Page Documentation

## Overview

A single-page HTML quiz app with multiple sessions, per-session submission, MathJax support, and a summary page. Designed for math topics with LaTeX content and optional images.

---

## How to Update Content (`NEW_CONTENT`)

Search for `// NEW_CONTENT` in the HTML to find the two data objects you need to edit.

### 1. Session Headers — `sessionContents`

Controls the title, explanation text, and image shown at the top of each session.

```js
const sessionContents = {
    s1: { title: `...`, content: `...`, image: "s1.png" },
    s2: { title: `...`, content: `...`, image: "s2.png" },
};
```

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Shown as "Session N: title" in the header |
| `content` | string | HTML + LaTeX text shown in the blue explanation box |
| `image` | string | Filename inside the `images/` folder. Leave `""` to hide. |

If both `image` and `content` are empty, the blue explanation box is hidden automatically.

---

### 2. Questions — `questionContent`

Each question is keyed as `q_SESSION_QUESTION`, e.g. `q_2_3` = Session 2, Question 3.

```js
const questionContent = {
    q_1_1: { q: "Question text", a: "A", options: ["Opt A", "Opt B", "Opt C", "Opt D"], image: "q1_1.png" },
};
```

| Field | Type | Description |
|-------|------|-------------|
| `q` | string | Question text. Supports LaTeX with `$...$`. |
| `a` | string | Correct answer: `"A"`, `"B"`, `"C"`, or `"D"` |
| `options` | array | Four option strings in order A, B, C, D. Supports LaTeX. |
| `image` | string | Filename inside `images/`. Leave `""` to hide. |

The number of sessions and questions per session are **auto-detected** from the keys — no manual count needed.

---

## LaTeX Usage

MathJax is loaded with `$...$` for inline math and `$$...$$` for display math.

### Rules for writing LaTeX in JavaScript strings

Every backslash in LaTeX must be **doubled** inside a JS string:

| LaTeX | In JS string |
|-------|-------------|
| `\pi` | `\\pi` |
| `\frac{a}{b}` | `\\frac{a}{b}` |
| `\angle` | `\\angle` |
| `\perp` | `\\perp` |

### Highlighting in LaTeX

A `\hl{}` macro is defined globally for blue highlighting. Add this hidden div once in the `<body>`:

```html
<div style="display:none">$\def\hl#1{\color{#3b82f6}{#1}}$</div>
```

Then use it in content strings:

```js
content: `$\\hl{P'}$ is the projection of $\\hl{P}$ on $\\hl{\\pi}$.`
```

### Mixing HTML highlights with LaTeX

Use a `<span class="hl">` for surrounding text and `\\hl{}` for the math symbols inside:

```js
content: `<span class="hl">$\\hl{P'}$ is the projection of $\\hl{P}$ on the plane $\\hl{\\pi}$</span>.`
```

Add this CSS once:

```css
.hl { color: #3b82f6; font-weight: 600; }
```

---

## Images

Place all images in the `images/` subfolder next to `index.html`.

```
index.html
images/
  s1.png       ← session explanation images
  s2.png
  q1_1.png     ← question images
  q2_3.png
```

Images use `onerror="this.remove()"` — missing images are silently hidden. If a session image fails to load **and** there is no text content, the entire blue explanation box is removed.

---

## Per-Session Submission

Each session has its own **Submit Session N** button. Submitting a session:
- Locks all answers in that session
- Shows correct/wrong feedback and the green banner
- Updates the nav dots to green/red
- Does **not** affect other sessions

Submission state is saved in `localStorage` as `quiz_submitted_session_N`.

To clear all progress: click **Restart Quiz** (requires confirmation) or call `resetQuiz()` in the console.

---

## Summary Page

Click the **Summary** floating button (bottom-right) to see:
- Total correct / wrong / skipped (submitted sessions only)
- Per-session dot breakdown
- **Back to quiz** button

Unsubmitted sessions show "not submitted" in the breakdown.

---

## localStorage Keys

| Key | Value |
|-----|-------|
| `quiz_answers_v2` | JSON object of all user answers |
| `quiz_submitted_session_N` | `true` if session N has been submitted |

---

## File Structure

```
index.html          ← the quiz page
images/
  s1.png            ← session images
  s2.png
  s3.png
  s4.png
  q1_1.png          ← question images
  q1_2.png
  ...
```

---

## Dependencies (CDN, no install needed)

| Library | Purpose |
|---------|---------|
| [MathJax 3](https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js) | Render LaTeX math |
