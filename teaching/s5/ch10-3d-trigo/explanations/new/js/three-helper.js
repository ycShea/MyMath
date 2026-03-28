// Global variables for the scene
let scene, camera, renderer, controls;
let activeLabels = {};
let activeMeshes = [];

function initThreeScene(containerId) {
    const container = document.getElementById(containerId);
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f2f5);
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    // LOCK THE RIGHT-CLICK TRANSLATION (Panning)
    controls.enablePan = false; 

    scene.add(new THREE.AmbientLight(0xffffff, 1.0));
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

function createLabel(text, pos, container) {
    const div = document.createElement('div');
    div.className = 'label';
    div.textContent = text;
    container.appendChild(div);
    activeLabels[text] = { div, pos };
}

function clearScene() {
    activeMeshes.forEach(m => scene.remove(m));
    activeMeshes = [];
    for (let k in activeLabels) activeLabels[k].div.remove();
    activeLabels = {};
}

function animate() {
    requestAnimationFrame(animate);
    const container = document.getElementById('threejs-container');
    if (!container) return;

    const wHalf = container.clientWidth / 2;
    const hHalf = container.clientHeight / 2;

    for (let key in activeLabels) {
        const item = activeLabels[key];
        const vector = item.pos.clone().project(camera);
        item.div.style.left = (vector.x * wHalf) + wHalf + 'px';
        item.div.style.top = -(vector.y * hHalf) + hHalf + 'px';
        item.div.style.display = vector.z < 1 ? 'block' : 'none';
    }
    controls.update();
    renderer.render(scene, camera);
}
