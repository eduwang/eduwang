import * as THREE from 'three';

// Step 1: Set up the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create x,y,z axes lines
var xAxisMaterial = new THREE.LineBasicMaterial({ linewidth: 5, color: 0x000000 });
var yAxisMaterial = new THREE.LineBasicMaterial({ linewidth: 5, color: 0x000000 });

var xAxisGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-1000, 0, 0),
    new THREE.Vector3(1000, 0, 0)
]);

var yAxisGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, -1000, 0),
    new THREE.Vector3(0, 1000, 0)
]);


var xAxis = new THREE.Line(xAxisGeometry, xAxisMaterial);
var yAxis = new THREE.Line(yAxisGeometry, yAxisMaterial);

// Add axes to the scene
scene.add(xAxis);
scene.add(yAxis);



// Step 2: Define quadratic function
function quadraticFunction(x, a, b, c) {
    return a * x * x + b * x + c;
}

function quadraticFunction2(x, a, b, c) {
    return a * (x-b) * (x-b) + c;
}

// Retrieve input elements
const inputA = document.getElementById('inputA');
const inputB = document.getElementById('inputB');
const inputC = document.getElementById('inputC');
const updateButton = document.getElementById('updateButton');
const updateButton2 = document.getElementById('updateButton-2');

var points = [];

// Function to update function graph
function updateFunctionGraph() {
    points = []; // Reset points array
    scene.children.forEach(child => {
        if (child instanceof THREE.Points) {
            scene.remove(child);
        }
    });

    // Get input values
    const a = parseFloat(inputA.value);
    const b = parseFloat(inputB.value);
    const c = parseFloat(inputC.value);

    // Use input values in your Three.js code to update the function graph
    // Step 3: Create points representing the function
    for (var i = -50; i <= 50; i += 0.01) {
        var y = quadraticFunction(i, a, b, c);
        points.push(new THREE.Vector3(i, y, 0));
    }
    // Step 4: Render points
    var geometry = new THREE.BufferGeometry().setFromPoints(points);
    var material = new THREE.PointsMaterial({
        size: 0.35, // Adjust the size of the points
        color: 0xB6D7A8 // Enable vertex colors
    });

    var quadraticPoints = new THREE.Points(geometry, material);
    scene.add(quadraticPoints);
}

function updateFunctionGraph2() {
    points = []; // Reset points array
    scene.children.forEach(child => {
        if (child instanceof THREE.Points) {
            scene.remove(child);
        }
    });

    // Get input values
    const a = parseFloat(inputA.value);
    const b = parseFloat(inputB.value);
    const c = parseFloat(inputC.value);

    // Use input values in your Three.js code to update the function graph
    // Step 3: Create points representing the function
    for (var i = -50; i <= 50; i += 0.01) {
        var y = quadraticFunction2(i, a, b, c);
        points.push(new THREE.Vector3(i, y, 0));
    }
    // Step 4: Render points
    var geometry = new THREE.BufferGeometry().setFromPoints(points);
    var material = new THREE.PointsMaterial({
        size: 0.35, // Adjust the size of the points
        color: 0xB6D7A8 // Enable vertex colors
    });

    var quadraticPoints = new THREE.Points(geometry, material);
    scene.add(quadraticPoints);
}

// Listen for button click to update graph
updateButton.addEventListener('click', updateFunctionGraph);
updateButton2.addEventListener('click', updateFunctionGraph2);



// Position the camera
camera.position.z = 50;
camera.position.y = 0;


// Add touch event listener for translation
var touchStartX = 0;

function onTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function onTouchMove(event) {
    var touchMoveX = event.touches[0].clientX;
    var deltaX = (touchMoveX - touchStartX) * 0.01; // Adjust sensitivity
    camera.position.x += deltaX;
    camera.lookAt(scene.position);
    touchStartX = touchMoveX;
}

renderer.domElement.addEventListener('touchstart', onTouchStart, false);
renderer.domElement.addEventListener('touchmove', onTouchMove, false);

// Access the rear camera
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(function (stream) {
        var video = document.getElementById('videoElement');
        video.srcObject = stream;
    })
    .catch(function (error) {
        console.error('Error accessing the camera: ', error);
    });


// Render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
