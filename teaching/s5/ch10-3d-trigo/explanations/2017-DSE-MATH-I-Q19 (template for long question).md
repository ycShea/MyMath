# 3D Trigonometry Exercise HTML Template

> **Live URL:** https://ycshea.github.io/MyMath/teaching/s5/ch10-3d-trigo/explanations/2017-DSE-MATH-I-Q19.html  
> **Based on:** 2017 DSE Paper I Q19  
> All calculations use 10 significant figures (following DSE marking); only 5 sig. fig. are shown in workings and figures.

---

## Overview

A split-screen interactive webpage for DSE 3D trigonometry solutions. The left panel shows a live Three.js 3D scene; the right panel shows the question text, solution steps, and answer toggles. Steps are revealed one at a time, and the 3D scene updates to highlight the relevant geometry at each step.

---

## Page Layout

```
┌─────────────────────┬─────────────────────┐
│   3D Canvas (left)  │  Question & Steps   │
│   canvas-side       │  content-side       │
│                     │  (scrollable)       │
│   [Reset Camera 🎥] │                     │
│   TARGET: x y z     │  Part (a)           │
│   CAMERA: x y z     │  Part (b)(i–iv)     │
└─────────────────────┴─────────────────────┘
```

The right panel uses `overflow-y: scroll` so its scrollbar is always present, preventing layout shift when content expands.

---

## Five Update Zones

When creating a new exercise from this template, search for `(UpdateForNewExercise)` and update only these five zones:

| Zone | Location | What to change |
|------|----------|----------------|
| **Zone 1** | `<title>` tag | Page title |
| **Zone 2** | HTML `content-side` div | Question number, image path, question text, part headers, and all solution step `<p>` tags |
| **Zone 3** | `const EXERCISE = { ... }` | Given measurements, angles, and Part B camera position/target |
| **Zone 4** | `drawFigureA()` and `drawFigureB()` | Which lines, labels, and arcs to draw for the base figures |
| **Zone 5** | `revealStep()` switch/case blocks | Which polygons, labels, and annotations to highlight at each step |

---

## Zone 3 — Exercise Config Reference

```javascript
const EXERCISE = {
    bc: 24,                 // given side length BC
    ad: 10,                 // height AD (A above ground)
    ce: 2,                  // height CE (C above ground)
    scale: 0.6,             // display scale factor for all 3D coordinates
    angle_bac: degToRad(30),
    angle_acb: degToRad(42),
    cameraB_position: new THREE.Vector3(5.9, -38.7, 17.6),  // tune after drawing
    cameraB_target:   new THREE.Vector3(5.8, 2, 2.2),       // tune after drawing
};
```

The **Group 2 derived geometry** block below `EXERCISE` is auto-calculated — do not edit it.

---

## Coordinate System

- **Origin:** Vertex B at `(0, 0, 0)`
- **Ground plane:** z = 0 (the horizontal floor)
- **Vertical axis:** z-axis (upward)
- **F lies on:** the positive x-axis
- **D and E:** on the ground directly below A and C respectively

Key derived points stored in `V`:

| Point | Description |
|-------|-------------|
| `V.A` | Vertex A (above ground by `ad`) |
| `V.B` | Origin |
| `V.C` | Vertex C (above ground by `ce`) |
| `V.D` | Foot of perpendicular from A |
| `V.E` | Foot of perpendicular from C |
| `V.F` | Intersection of line AC extended with ground |
| `V.P` | Foot of perpendicular from A (and D) to line BF |
| `V.I` | Reflection of B through F (extends line beyond F) |
| `V.J` | Reflection of F through B (extends line beyond B) |
| `V.K` | Centroid of triangle ABF (label anchor for area) |
| `V.L` | Midpoint of DB (label anchor for triangle BDF area) |

---

## Math & Geometry Tools

### Math tools
```javascript
degToRad(deg)                        // degrees → radians
radToDeg(rad)                        // radians → degrees
cosineSide(b, c, angleArad)          // Law of Cosines: find side a
cosineAngle(a, b, c)                 // Law of Cosines: find angle A (radians)
sineSide(b, angleArad, angleBrad)    // Sine Rule: find side a
sineAngle(a, b, angleBrad)           // Sine Rule: find angle A (radians)
```

### Geometric tools (return `THREE.Vector3`)
```javascript
footOfPerpendicular(point, [p1, p2]) // foot = p1 + t·d,  t = (v·d)/|d|²
midPoint(p1, p2)                     // (p1 + p2) / 2
reflectThrough(point, mirror)        // 2·mirror − point
centroid(p1, p2, p3)                 // (p1 + p2 + p3) / 3
pointOfDivision(p1, p2, r, s)        // (s·p1 + r·p2) / (r + s)
```

---

## User Interaction Logic

### Figure toggle flow
1. User clicks **Show Figure A** or **Show Figure B**.
2. `handleToggle(type)` clears the scene, sets `currentFigure`, then calls `setCameraPartA/B()` and `drawFigureA/B()`.
3. Clicking the same figure again clears and hides it.
4. Only one figure (A or B) is visible at a time.

### Step reveal flow
1. User clicks **Show Step** on any part (`ai`, `bi`, `bii`, `biii`, `biv`).
2. `revealStep(session)` checks `currentFigure` and auto-switches if needed.
3. The current step's `<p>` tag becomes visible.
4. `clearStepHighlights()` removes previous step's 3D objects and labels.
5. The matching `case` in the switch block draws new highlights and labels.
6. MathJax re-renders the LaTeX in the newly revealed step.
7. `data-current-step` counter increments; button changes to **Next Step**.
8. On the final step, button becomes **Completed** and **Restart** appears.

### Restart flow
`redoSteps(session)` hides all steps, resets counter to 0, re-enables the Show Step button, and calls `handleToggle()` to redraw the base figure cleanly.

### Answers-only flow
`toggleAnswersOnly(prefix)` hides all non-`final-ans` steps and shows only `<p class="step final-ans">` elements. Clicking again collapses everything.

### Render loop
Runs at ~60 fps via `requestAnimationFrame`. Each frame updates TrackballControls, then projects every entry in `activeLabels` from 3D world space to 2D screen coordinates so HTML labels stay attached to their 3D points as the camera moves.

---

## Function Index

### Zone 4 — Figures & Camera
| Function | Description |
|----------|-------------|
| `handleToggle(type)` | Switch scene between Part A (2D) and Part B (3D) |
| `drawFigureA()` | Draw Part A: triangle ABC with angles and labels |
| `drawFigureB()` | Draw Part B: 3D folded figure with ground plane |
| `setupGround(w, h, cx, cy, hasGrid)` | Add semi-transparent rectangular floor to scene |
| `resetCamera()` | Reset camera based on current active figure |
| `setCameraPartA()` | Top-down 2D view, rotation locked |
| `setCameraPartB(cam, target, lockH)` | 3D perspective view, rotation enabled |
| `animate()` | Main render loop: updates controls and projects labels |

### Zone 5 — Step Logic
| Function | Description |
|----------|-------------|
| `revealStep(session)` | Reveal next solution step and run its draw logic |
| `redoSteps(session)` | Reset a solution back to step 0 |
| `clearStepHighlights()` | Remove all step-specific 3D objects and HTML labels |

### Zone 2 — HTML Controls
| Function | Description |
|----------|-------------|
| `toggleQuestion(divId, btnId)` | Show/hide the full question image popup |
| `toggleAnswersOnly(prefix, btn)` | Show final answers only, or hide all steps |

### Engine — Never Touch
| Function | Description |
|----------|-------------|
| `clearScene()` | Dispose and remove all 3D objects and DOM labels |
| `drawLines(pairs, isSolid, color, name)` | Draw basic solid or dashed lines |
| `drawThickLine(p1, p2, isSolid, color, name)` | Draw bold line using layered offsets |
| `drawAngleArc(p1, v, p2, label, r, color, key)` | Draw 3D arc with label at midpoint |
| `drawThickRightAngle(p1, v, p2, size, color)` | Draw bold right-angle square symbol |
| `highlightPolygon(points, color, id)` | Semi-transparent triangle/quad mesh overlay |
| `createPolygon(points, color)` | Solid semi-transparent triangle/quad mesh |
| `makeLabel(text)` | Create a floating HTML label div |
| `setupLabels(labelMap)` | Register multiple point labels at once |
| `drawLineLabels(p1, p2, label, color, key)` | Place a label at midpoint of a line |
| `stickTempPointLabel(point, text, color, key)` | Place a label at a specific 3D point |
| `Arc3D` (class) | `THREE.Curve` subclass for 3D circular arcs |

---

## Drawing Conventions (Zone 5)

Labels and 3D keys use a consistent naming pattern:

```
stepId + "_" + currentStep + "_description"
// e.g. "step-biii_4_lineBF_Label"
```

**Colour conventions used in steps:**

| Colour | Meaning |
|--------|---------|
| `#000000` black | Given information |
| `#d63384` pink | Unknown value being found |
| `#00bbbb` cyan | Final answer |
| `#bb0000` dark red | Triangle highlight (given) |
| `#ff0000` red | Triangle being worked on |
| `#ffeb3b` yellow | Similar triangle reference |

---

## Dependencies

| Library | Version | Purpose |
|---------|---------|---------|
| Three.js | r128 | 3D scene rendering |
| TrackballControls | r128 | Camera interaction |
| OrbitControls | r128 | (loaded but TrackballControls used) |
| MathJax | 3 (CDN) | LaTeX formula rendering |

---

## Known Notes

- `OrbitControls` is loaded but **TrackballControls** is used instead for a cleaner feel (`staticMoving = true`).
- Part A camera uses a pseudo-orthographic setup (PerspectiveCamera with large z-distance) with rotation locked.
- Part B camera locks to a horizontal view initially (`minPolarAngle = maxPolarAngle = π/2`); the Reset Camera button restores this.
- `console.table(V)` is intentionally left in for development verification of 3D point coordinates.
