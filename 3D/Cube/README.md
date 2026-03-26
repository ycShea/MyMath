# 3D Geometry Visualizer

The live interactive 3D tool can be accessed at: **[https://ycShea.github.io/MyMath/3D/](https://ycShea.github.io/MyMath/3D/)**

This project provides an interactive WebGL environment for students and educators to explore 3D geometric figures. It is designed to bridge the gap between 2D paper diagrams and 3D spatial reasoning, specifically for DSE Mathematics modules.

## 🚀 Features
- **Interactive Rotation:** Users can click and drag to rotate figures (Tetrahedrons, Pyramids, Prisms) in real-time.
- **Perspective Control:** Zoom in/out to inspect internal angles and vertex coordinates.
- **Wireframe Mode:** Toggle between solid faces and wireframes to see "hidden" lines (essential for calculating dihedral angles).
- **Axis Visualization:** Includes X, Y, and Z axes to help students understand 3D Cartesian coordinates.

## 🛠️ Tech Stack
- **Three.js:** The core 3D engine used to render geometries.
- **OrbitControls.js:** Enables user interaction (rotation, panning, and zooming).
- **HTML5/CSS3:** For the UI overlay and layout.

## 📖 How to Use
1. **Rotate:** Left-click and drag anywhere on the canvas.
2. **Zoom:** Use the mouse wheel or pinch on a trackpad.
3. **Pan:** Right-click and drag to move the entire camera view.
4. **Reset:** Refresh the page to return to the default mathematical perspective.

## 📂 Folder Structure
- `MyMath/`
  - `3D/`
    - `Cube/`
      - `index.html` (The Three.js logic and scene setup)
      - `README.md` (This documentation)

## 🔧 Educational Applications
This tool is particularly useful for explaining:
* **Angle between a line and a plane.**
* **Angle between two planes (Dihedral Angles).**
* **Shortest distance** problems in 3D space.
* **Projections** of 3D objects onto the $xy$, $yz$, or $xz$ planes.

## 📝 License
Internal Educational Use - HKUGAC Mathematics Department.
