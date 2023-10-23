import * as THREE from 'three';
import { MindARThree } from 'mindar-face-three';
import {loadGLTF} from "../../applications/libs/loader.js"


const mindarThree = new MindARThree({
    container: document.querySelector("#container"),
    });

// 카메라 좌우 반전 
container.style.webkitTransform = 'scaleX(-1)';
container.style.transform = 'scaleX(-1)';

const {renderer, scene, camera} = mindarThree;

const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1);
scene.add(light)

const glasses = await loadGLTF('../../applications/assets/models/glasses1/scene.gltf');

glasses.scene.scale.multiplyScalar(0.01);

//Anchor 만들기
const anchor = mindarThree.addAnchor(168); //nose에 위치하는 anchor
anchor.group.add(glasses.scene); //THREE.Group

const start = async() => {
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
        });
    }
    
const startButton = document.querySelector("#startButton");
startButton.addEventListener("click", () => {
    start();
});
stopButton.addEventListener("click", () => {
    mindarThree.stop();
    mindarThree.renderer.setAnimationLoop(null);
});