# 📐 DSE Geometry Visualizer

This project ([ycShea/DSE-Geometry-Visualizer](https://ycshea.github.io/MyMath/3D/Practice/2020-DSE-MATH-II-Q38.html)) is a flexible, web-based 3D visualization tool designed for mathematics students to explore HKDSE-style 3D geometry problems. It transforms static textbook diagrams into interactive environments where users can manipulate the camera, visualize hidden triangles, and follow step-by-step calculations.

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

**Visit [2526-S5UT4-MCQ6.html](https://github.com/ycShea/MyMath/blob/main/3D/Practice/2526-S5UT4-MCQ6.md) and duplicate the file to modify and update it for a new exercise.**
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

### 💻 Code Snippet: Section 3 (Vertex Coordinates)

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
