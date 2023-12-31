import * as THREE from 'three';
import {MindARThree} from 'mindar-image-three';
import {loadGLTF} from '../../applications/libs/loader.js';

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {

        // initialize MindAR 
        const mindarThree = new MindARThree({
            container: document.body,
            imageTargetSrc: '../Target_for_Multiple_Track.mind',
          });
        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);
        
        const raccoon = await loadGLTF("../../applications/assets/models/musicband-raccoon/scene.gltf");
        raccoon.scene.scale.set(0.1,0.1,0.1);
        raccoon.scene.position.set(0,-0.4,0);
        const bear = await loadGLTF("../../applications/assets/models/musicband-bear/scene.gltf");
        bear.scene.scale.set(0.1,0.1,0.1);
        bear.scene.position.set(0,-0.4,0);

        const raccoonAnchor = mindarThree.addAnchor(0);
        raccoonAnchor.group.add(raccoon.scene);

        const bearAnchor = mindarThree.addAnchor(1);
        bearAnchor.group.add(bear.scene);

        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            renderer.render(scene, camera);
        });
    }
    start();
});