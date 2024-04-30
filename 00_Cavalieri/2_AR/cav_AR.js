//const THREE = window.MINDAR.IMAGE.THREE;
import * as THREE from 'three';
import {MindARThree} from 'mindar-image-three';
import {loadGLTF} from '../../applications/libs/loader.js';

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {
        // initialize MindAR 
        const mindarThree = new MindARThree({
            container: document.body, //mobile 환경 고려하면 굳이 container가 필요 없을 수도?!
            imageTargetSrc: './target_cav.mind'
        });
        const {renderer, scene, camera} = mindarThree;

        // create light
        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        // create anchor
        const anchor = mindarThree.addAnchor(0);
        const gltf = await loadGLTF("../models/0_volume_of_sphere_CompleteVersion.gltf");
        gltf.scene.scale.set(0.3, 0.3, 0.3);
        gltf.scene.rotation.set(Math.PI/2, -Math.PI/2,0)
        gltf.scene.position.set(0, 0, 0);
        anchor.group.add(gltf.scene);

        //gltf.animations
        const mixer = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[0]); //첫 번째 애니메이션 실행
        action.play();

        const clock = new THREE.Clock();

        const sliderController = document.querySelector('#slider-panel');

        anchor.onTargetFound = () => {
            console.log("on target found");
            sliderController.style.display = "block";
        }

        anchor.onTargetLost = () => {
            console.log("on target lost");
            sliderController.style.display = "none";
        }


        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            const delta = clock.getDelta();
            renderer.render(scene, camera);
            mixer.update(delta); //애니메이션 매 프레임마다 불러오기

        });
    }
    start();
});