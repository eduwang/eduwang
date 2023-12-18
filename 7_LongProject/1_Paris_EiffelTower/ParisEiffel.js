// const THREE = window.MINDAR.IMAGE.THREE;
//import * as THREE from 'three';
//import {MindARThree} from 'mindar-image-three';
//import {mockWithVideo, mockWithImage} from '../../applications/libs/camera-mock.js'; 
//import {GLTFLoader} from '../../applications/libs/three.js-r132/examples/jsm/loaders/GLTFLoader.js';

//아래 코드를 간단하게 import하여 사용
// import {loadGLTF} from '../../applications/libs/loader.js';
// const loadGLTF = (path) => {
//     return new Promise((resolve, reject) => {
//         const loader = new GLTFLoader();
//         loader.load(path, (gltf)=>{
//             resolve(gltf);
//         });
//     });
// }

import * as THREE from 'three';
import {MindARThree} from 'mindar-image-three';
import {loadGLTF} from '../../applications/libs/loader.js';

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {

        // initialize MindAR 
        const mindarThree = new MindARThree({
            container: document.body,
            imageTargetSrc: './Paris.mind',
          });
        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        // create anchor
        const anchor = mindarThree.addAnchor(0);
        const gltf = await loadGLTF("./EiffelTower_embedded2.gltf");
        gltf.scene.scale.set(0.000345, 0.000345, 0.000345);
        gltf.scene.rotation.set(Math.PI/2,0,0);
        gltf.scene.position.set(0, 0, 0);
        anchor.group.add(gltf.scene);

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