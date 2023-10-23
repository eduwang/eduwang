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

//occluder
const occluder = await loadGLTF('../../applications/assets/models/sparkar-occluder/headOccluder.glb');
const occluderMaterial = new THREE.MeshBasicMaterial({colorWrite: false});
occluder.scene.traverse((o) =>{
    if (o.isMesh){
        o.material = occluderMaterial;
    }
})

occluder.scene.scale.multiplyScalar(0.065);
occluder.scene.position.set(0, -0.3, 0.15);
occluder.scene.renderOrder = 0;
const occluderAnchor = mindarThree.addAnchor(168);
occluderAnchor.group.add(occluder.scene);

//Loading 3D models
const glasses = await loadGLTF('../../applications/assets/models/glasses1/scene.gltf');
glasses.scene.renderOrder = 1;
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