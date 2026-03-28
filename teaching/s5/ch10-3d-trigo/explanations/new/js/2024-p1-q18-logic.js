const scale = 0.6;
const V = {
    P: new THREE.Vector3(0, 0, 0),
    S: new THREE.Vector3(10 * scale, 0, 0),
    Q: new THREE.Vector3(12 * scale * Math.cos(82 * Math.PI / 180), 12 * scale * Math.sin(82 * Math.PI / 180), 0),
    Ra: new THREE.Vector3(15 * scale, 5 * scale, 0),
    Rb: new THREE.Vector3(8 * scale, 4 * scale, 8 * scale)
};

function drawFigure_2024P1Q18(type) {
    clearScene();
    const container = document.getElementById('threejs-container');
    const targetR = (type === 'A') ? V.Ra : V.Rb;
    
    // Draw edges
    const points = [V.P, V.Q, targetR, V.S, V.P, V.S, V.Q];
    const matLine = new THREE.LineBasicMaterial({ color: 0x333333 });
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), matLine);
    
    scene.add(line);
    activeMeshes.push(line);

    // Labels
    createLabel("P", V.P, container);
    createLabel("Q", V.Q, container);
    createLabel("S", V.S, container);
    createLabel("R", targetR, container);

    // View Controls
    controls.enableRotate = (type === 'B');
    camera.position.set(5, 5, 20);
    controls.target.set(3, 3, 0);
}
