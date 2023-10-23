import { loadTexture } from "../../applications/libs/loader.js"
import * as THREE from 'three';
import { MindARThree } from 'mindar-face-three';


const mindarThree = new MindARThree({
    container: document.querySelector("#container"),
    });

//Flipping image of front camera
container.style.webkitTransform = 'scaleX(-1)';
container.style.transform = 'scaleX(-1)';

const {renderer, scene, camera} = mindarThree;

//lights
const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1);
scene.add(light)

//adding face mesh
const faceMesh = mindarThree.addFaceMesh();
const texture = await loadTexture("./FaceMesh_Sample3.png")
faceMesh.material.map = texture;
faceMesh.material.transparent = true;
faceMesh.material.needsUpdate = true;

scene.add(faceMesh);

const camContainer = document.getElementById('video');
let switchCount = 0;

document.querySelector("#switchCam").addEventListener("click", () => {
    mindarThree.switchCamera();
    switchCount++;
    console.log(switchCount);
    if (switchCount % 2 === 1) {
        container.style.webkitTransform = 'scaleX(1)';
        container.style.transform = 'scaleX(1)';
    } else{
        container.style.webkitTransform = 'scaleX(-1)';
        container.style.transform = 'scaleX(-1)';
    }

  });

//start function
const start = async() => {
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
        });
    }

const startButton = document.querySelector("#startButton");
const stopButton = document.querySelector("#stopButton");
startButton.addEventListener("click", () => {
    start();
});
stopButton.addEventListener("click", () => {
    mindarThree.stop();
    mindarThree.renderer.setAnimationLoop(null);
});