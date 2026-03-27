# 📐 DSE Geometry Visualizer

This project ([ycShea/DSE-Geometry-Visualizer](https://www.google.com/search?q=https://github.com/ycShea/DSE-Geometry-Visualizer)) is a flexible, web-based 3D visualization tool designed for mathematics students to explore HKDSE-style 3D geometry problems. It transforms static textbook diagrams into interactive environments where users can manipulate the camera, visualize hidden triangles, and follow step-by-step calculations.

-----

### 🚀 Key Features

  * **Interactive 3D Scene:** Powered by `Three.js`, allowing users to rotate, pan, and zoom to inspect geometry from any angle.
  * **Guided Step-by-Step Logic:** A calculation panel that dynamically highlights specific triangles, lines, and right-angle symbols as the user progresses.
  * **Smart Labels:** Features dynamic pink labels for given dimensions and blue labels for intermediate calculated values.
  * **Visual Precision:** Custom `createTriangle` implementation with disabled depth testing, ensuring highlighted surfaces are always visible through the wireframe.
  * **Debug HUD:** Real-time display of camera coordinates and target points to streamline the creation of new exercise templates.

-----

### 📍 Understanding (x, y, z) Coordinates

In this visualizer, every point is defined by three numbers representing its position in space:

  * **X (Horizontal):** Moves the point **Left (-) or Right (+)**.
  * **Y (Vertical):** Moves the point **Down (-) or Up (+)**.
  * **Z (Depth):** Moves the point **Forward (+) or Backward (-)** toward or away from the screen.

For example, if the base of a prism is a rectangle on the ground, you define the corners using **X** and **Z**, then use **Y** to set the height of the top vertices.

-----

### 🛠️ How to Update for a New Exercise

To swap the current problem for a new one, search for the `(UpdateForNewExercise)` tag in the HTML file and update these 10 components:

1.  **Question:** Update the `<h3>` and paragraph text in the `#ui-layer`.
2.  **Solution:** Update the `stepData` array with the new algebraic steps.
3.  **Points:** Define the `Vector3` coordinates in the `V` object using $(x, y, z)$.
4.  **Edges:** Update the static wireframe lines in the `Static Edges` array.
5.  **Angles:** Use `createRightAngle` to define new perpendicular indicators.
6.  **Labels:** \* Update `lengthLabels` for given values (Pink).
      * Update `lineLabelsForCalculation` for derived values (Blue).
      * Ensure vertex labels (A, B, C...) match the new points.
7.  **Triangles:** Define translucent surfaces using the `createTriangle` function.
8.  **Logic:** Update the `updateHighlights(step)` function to control object visibility and color changes.
9.  **Camera:** Update `resetCamera()` with the optimal `camera.position` and `controls.target` (found via the Debug HUD).
10. **Other Objects:** Add custom meshes or specific properties unique to the new problem.

-----

### 📖 How to Use

  * **Left-Click + Drag:** Rotate the 3D object to inspect dihedral angles.
  * **Right-Click + Drag:** Pan the camera view.
  * **Scroll:** Zoom in/out to see detailed intersections.
  * **Show Steps:** Trigger the interactive walkthrough.
  * **Reset Camera:** Instantly return to the optimal viewing angle.

-----

### ⚙️ Technical Stack

  * **Core Engine:** [Three.js R128](https://threejs.org/)
  * **Controls:** `OrbitControls.js`
  * **Rendering:** `logarithmicDepthBuffer` for precision overlays.
  * **Developer:** [ycShea](https://www.google.com/search?q=https://github.com/ycShea)

-----

I've updated the coordinate mapping for your cuboid exercise. You can copy these into **Section 3** of your code:

```javascript
const V = {
    F: new THREE.Vector3(0, 0, 0),    // Origin
    G: new THREE.Vector3(4, 0, 0),    // AB=4
    H: new THREE.Vector3(4, 0, -12),  // AD=12 (Depth)
    E: new THREE.Vector3(0, 0, -12),
    A: new THREE.Vector3(0, 15, 0),   // Height (Assumed total height 15)
    B: new THREE.Vector3(4, 15, 0),
    C: new THREE.Vector3(4, 15, -12),
    D: new THREE.Vector3(0, 15, -12),
    P: new THREE.Vector3(0, 9, 0)     // AP=6, so 15 - 6 = 9
};
```
