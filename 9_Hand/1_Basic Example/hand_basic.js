import * as THREE from 'https://unpkg.com/three@110.0.1/build/three.module.js';
import { setupHandtracking, updateHandtracking } from './handtracking.js';

// Set up Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up hand tracking
setupHandtracking();

// Create a cube to represent the tracked hand
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Main animation loop
function animate() {
    requestAnimationFrame(animate);
    updateHandtracking(cube); // Update hand tracking position
    renderer.render(scene, camera);
}

animate();
