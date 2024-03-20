import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Create a scene
var scene = new THREE.Scene();

// Create a camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Define the center and radius of the arc
var center = new THREE.Vector3(0, 0, 0);
var radius = 3;

// Create an arc geometry
var arcGeometry = new THREE.CircleBufferGeometry(radius, 64, 0, Math.PI / 6); // 30 degrees in radians

// Create a material for the arc
var arcMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });

// Create a line mesh using the arc geometry and material
var arc = new THREE.Line(arcGeometry, arcMaterial);
scene.add(arc);

// Add the center point for reference
var centerGeometry = new THREE.BufferGeometry();
centerGeometry.setAttribute('position', new THREE.Float32BufferAttribute(center.toArray(), 1));
var centerMaterial = new THREE.PointsMaterial({ size: 0.1, color: 0xff0000 });
var centerPoint = new THREE.Points(centerGeometry, centerMaterial);
scene.add(centerPoint);

// Add an animation loop
function animate() {
    requestAnimationFrame(animate);

    // Add any animations or updates here

    renderer.render(scene, camera);
}

animate();
