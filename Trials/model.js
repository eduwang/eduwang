// Initialize the scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);


// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(1, 1, 1);
// scene.add(directionalLight);

// const animate = () => {
//     requestAnimationFrame(animate);

//     // Add animations or interactions here

//     renderer.render(scene, camera);
// };

// animate();

// window.addEventListener('resize', () => {
//     const newWidth = window.innerWidth;
//     const newHeight = window.innerHeight;
    
//     camera.aspect = newWidth / newHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(newWidth, newHeight);
// });

const planeGeometry = new THREE.PlaneGeometry(3, 3, 10, 10);

const shape = new THREE.Shape();
shape.moveTo(0, 0); // Starting point
shape.lineTo(0, 3); // Top-left corner
shape.lineTo(3, 3); // Top-right corner
shape.lineTo(3, 0); // Bottom-right corner
shape.lineTo(0, 0); // Closing the shape

const extrudeSettings = {
  steps: 100, // Number of extrusion steps
  bevelEnabled: false, // No beveling for a flat cylinder
//   extrudePath: yourBendPath, // The path along which the extrusion will occur
};

const extrudedGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Replace with your desired material settings

const cylinderMesh = new THREE.Mesh(extrudedGeometry, material);

scene.add(cylinderMesh);

const animate = () => {
    requestAnimationFrame(animate);

    // Add animations or interactions here

    renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
});



