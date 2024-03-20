import * as THREE from 'three';
import { ARButton } from 'three/addons/webxr/ARButton.js'

// Initialize Three.js scene
const scene = new THREE.Scene();

// Create AR session
let xrSession = null;

// Function to handle XR session creation
async function initXR() {
    if (!navigator.xr) {
        console.log('WebXR not supported');
        return;
    }

    try {
        xrSession = await navigator.xr.requestSession('immersive-ar', {
            requiredFeatures: ['hit-test']
        });
        console.log('XR session created:', xrSession);

        // Bind the session to the Three.js renderer
        renderer.xr.setReferenceSpaceType('local');
        renderer.xr.setSession(xrSession);

        // Start rendering loop
        animate();
    } catch (e) {
        console.error('Error starting XR session:', e);
    }
}

initXR();

// Create AR camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Function to update UI elements position
function updateUIPosition() {
    // Get AR camera's position and orientation
    if (xrSession) {
        const frame = xrSession.requestAnimationFrame((time, frame) => {
            const viewerSpace = frame.getViewerPose(renderer.xr.getReferenceSpace());
            if (viewerSpace) {
                const cameraPos = viewerSpace.transform.position;
                const cameraQuat = viewerSpace.transform.orientation;

                // Calculate UI position relative to AR camera
                const uiPosition = new THREE.Vector3();
                uiPosition.set(0, 0, -5).applyQuaternion(cameraQuat).add(cameraPos);

                // Set UI element position
                uiElement.position.copy(uiPosition);
            }
        });
        xrSession.requestAnimationFrame(frame);
    }
}

// Create UI element (e.g., a mesh)
const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const uiElement = new THREE.Mesh(geometry, material);
scene.add(uiElement);

// Update UI position on each frame
function animate() {
    updateUIPosition();
    renderer.render(scene, camera);

    if (xrSession) {
        xrSession.requestAnimationFrame(animate);
    }
}
