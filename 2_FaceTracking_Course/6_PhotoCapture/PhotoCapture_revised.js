import { loadTexture } from "../../applications/libs/loader.js"
import * as THREE from 'three';
import { MindARThree } from 'mindar-face-three';


const capture = (mindarThree) => {
    const {video, renderer, scene, camera} = mindarThree;
    const renderCanvas = renderer.domElement;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = renderCanvas.width;
    canvas.height = renderCanvas.height;

    const sx = (video.clientWidth - renderCanvas.clientWidth) /2 * video.videoWidth/video.clientWidth;
    const sy = (video.clientHeight - renderCanvas.clientHeight) /2 * video.videoHeight/video.clientHeight;
    const sw = video.videoWidth - sx*2;
    const sh = video.videoHeight - sy*2;

    context.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

    renderer.preserveDrawingBuffer = true;
    renderer.render(scene, camera);
    context.drawImage(renderCanvas, 0, 0, canvas.width, canvas.height);
    renderer.preserveDrawingBuffer = false;

    const link = document.createElement("a");
    link.download = 'photo.png';
    link.href = canvas.toDataURL("image/png");
    link.click();
}

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

//capture action
document.querySelector("#capture").addEventListener("click", () => {
    capture(mindarThree);
})

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