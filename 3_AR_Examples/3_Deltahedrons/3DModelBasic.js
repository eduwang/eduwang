const THREE = window.MINDAR.IMAGE.THREE;
//import * as THREE from 'three';
//import {MindARThree} from 'mindar-image-three';
//import {mockWithVideo, mockWithImage} from '../../applications/libs/camera-mock.js'; 
//import {GLTFLoader} from '../../applications/libs/three.js-r132/examples/jsm/loaders/GLTFLoader.js';

//아래 코드를 간단하게 import하여 사용
import {loadGLTF} from '../../applications/libs/loader.js';
// const loadGLTF = (path) => {
//     return new Promise((resolve, reject) => {
//         const loader = new GLTFLoader();
//         loader.load(path, (gltf)=>{
//             resolve(gltf);
//         });
//     });
// }

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {

        // initialize MindAR 
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './Rep_Image.mind',
          });
        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        // create anchor
        const anchor = mindarThree.addAnchor(0);
        const gltf = await loadGLTF("./models/untitled.gltf");
        gltf.scene.scale.set(0.01, 0.01, 0.01);
        gltf.scene.position.set(-0.5, 0.5, 0);
        anchor.group.add(gltf.scene);

        const gltf2 = await loadGLTF("./models/untitled.gltf");
        gltf2.scene.scale.set(0.01, 0.01, 0.01);
        gltf2.scene.position.set(0.5, 0.5, 0);
        anchor.group.add(gltf2.scene);

        //GLTFLoader
        //아래와 같이 모델을 불러오는 방식은 여러 모델을 불러오는 방식으로는 적합하지 않음
        // const loader = new GLTFLoader();
        // loader.load("../../applications/assets/models/musicband-raccoon/scene.gltf", (gltf) =>{
        //     //gltf.scene: THREE.Group
        //     gltf.scene.scale.set(0.1, 0.1, 0.1);
        //     gltf.scene.position.set(0, -0.4, 0);
        //     anchor.group.add(gltf.scene);
        // });

        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            renderer.render(scene, camera);
        });
    }
    start();
});