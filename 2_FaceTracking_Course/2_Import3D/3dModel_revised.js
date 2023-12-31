import * as THREE from 'three';
import { MindARThree } from 'mindar-face-three';
import { loadGLTF } from "../../applications/libs/loader.js"


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

//Loading 3D models
const glasses = await loadGLTF('../../applications/assets/models/glasses1/scene.gltf');

//model scaling
glasses.scene.scale.multiplyScalar(0.01);

//making anchor
const anchor = mindarThree.addAnchor(168); //nose에 위치하는 anchor
anchor.group.add(glasses.scene); //THREE.Group

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