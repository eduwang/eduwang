// Initialize variables
let scene, camera, renderer;

// Initialize the scene
function init() {
    // Create a scene
    scene = new THREE.Scene();
    
    // Create a camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    // Load the glTF model
    const loader = new THREE.GLTFLoader();
    loader.load('./models/00_8Triangle.gltf', function (gltf) {
        scene.add(gltf.scene);
    });

    // Add event listener for window resizing
    window.addEventListener('resize', onWindowResize, false);
}

// Handle window resizing
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Initialize and start animation
init();
animate();
