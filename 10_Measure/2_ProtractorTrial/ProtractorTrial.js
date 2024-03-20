import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ARButton } from 'three/addons/webxr/ARButton.js'

// Set up Three.js scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up ARButton for camera access
document.body.appendChild(ARButton.createButton(renderer));

// Create an arc
var radius = 5;
var startAngle = 0;
var endAngle = Math.PI / 2;
var segments = 32;
var arcGeometry = new THREE.ArcCurve(0, 0, radius, startAngle, endAngle, false);
var arcPoints = arcGeometry.getPoints(segments);
var arcGeometryLine = new THREE.BufferGeometry().setFromPoints(arcPoints);
var arcMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
var arcLine = new THREE.Line(arcGeometryLine, arcMaterial);
scene.add(arcLine);

// Create a sphere to mark the center of the arc
var centerMarkerGeometry = new THREE.SphereGeometry(0.1);
var centerMarkerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var centerMarker = new THREE.Mesh(centerMarkerGeometry, centerMarkerMaterial);
scene.add(centerMarker);

// Create a mesh to make the arc touchable
var arcGeometryMesh = new THREE.CircleGeometry(radius, segments);
var arcMaterialMesh = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
var arcMesh = new THREE.Mesh(arcGeometryMesh, arcMaterialMesh);
scene.add(arcMesh);

// Set up raycaster for touch events
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// Handle touch events
function onTouch(event) {
    event.preventDefault();

    var touch = event.touches[0];
    mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObject(arcMesh);

    if (intersects.length > 0) {
        // Arc is touched
        console.log('Arc is touched!');
    }
}

// Update endAngle based on touch position
function onTouchMove(event) {
    event.preventDefault();

    var touch = event.touches[0];
    mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObject(arcMesh);

    if (intersects.length > 0) {
        // Calculate the angle from the center of the arc to the touch position
        var angle = Math.atan2(intersects[0].point.y, intersects[0].point.x);

        // Convert the angle to the range [0, 2 * Math.PI]
        if (angle < 0) {
            angle += 2 * Math.PI;
        }

        // Update the endAngle based on the calculated angle
        endAngle = angle;

        // Update the arc geometry
        arcGeometry = new THREE.ArcCurve(0, 0, radius, startAngle, endAngle, false);
        arcPoints = arcGeometry.getPoints(segments);
        arcGeometryLine.setFromPoints(arcPoints);
    }
}

// Add touchmove event listener for continuous touch updates
document.addEventListener('touchmove', onTouchMove, false);

// Add touch event listener
document.addEventListener('touchstart', onTouch, false);

// Set camera position
camera.position.z = 10;

// Create an HTML element to display endAngle
var endAngleDisplay = document.createElement('div');
endAngleDisplay.id = 'endAngleDisplay';
document.body.appendChild(endAngleDisplay);

// Update the endAngle value in the HTML element
function updateEndAngleDisplay() {
    endAngleDisplay.innerText = Math.ceil(endAngle*(180 / Math.PI)) +'°'; // Adjust the precision as needed
}


// Render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    updateEndAngleDisplay();

}

animate();
