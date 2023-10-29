import * as THREE from 'three';
import {MindARThree} from 'mindar-image-three';
import {loadGLTF} from '../../applications/libs/loader.js';

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {

        // initialize MindAR 
        const mindarThree = new MindARThree({
            container: document.body,
            imageTargetSrc: './MultipleTargets.mind',
          });
        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);
        
        //load Multiple Models
        const gltf1 = await loadGLTF('../3dModels/gltf_avocado/scene.gltf');
        gltf1.scene.scale.set(0.05, 0.05, 0.05);
        gltf1.scene.rotation.set(Math.PI/2,0,0);
        gltf1.scene.position.set(0, -0.2, 0);
        const gltf1Anchor = mindarThree.addAnchor(0);
        gltf1Anchor.group.add(gltf1.scene);


        const gltf2 = await loadGLTF('../3dModels/gltf_france/scene.gltf');
        gltf2.scene.scale.set(0.3, 0.3, 0.3);
        gltf2.scene.rotation.set(Math.PI/3,0,0);
        gltf2.scene.position.set(0, 0.3, 0.5);
        const gltf2Anchor = mindarThree.addAnchor(1);
        gltf2Anchor.group.add(gltf2.scene);

        const gltf3 = await loadGLTF('../3dModels/gltf_groot_dancing/scene.gltf');
        gltf3.scene.scale.set(0.5, 0.5, 0.5);
        gltf3.scene.rotation.set(Math.PI/2,0,0);
        gltf3.scene.position.set(0, 0, 0.1);
        const gltf3Anchor = mindarThree.addAnchor(2);
        gltf3Anchor.group.add(gltf3.scene);

        const gltf4 = await loadGLTF('../3dModels/gltf_makar_from_wind_waker_-_the_legend_of_zelda/scene.gltf');
        gltf4.scene.scale.set(3, 3, 3);
        gltf4.scene.rotation.set(Math.PI/2,0,0);
        gltf4.scene.position.set(0, 0, 0.5);
        const gltf4Anchor = mindarThree.addAnchor(3);
        gltf4Anchor.group.add(gltf4.scene);

        //gltf.animations
        const mixer1 = new THREE.AnimationMixer(gltf1.scene);
        const action1 = mixer1.clipAction(gltf1.animations[0]); //첫 번째 애니메이션 실행
        action1.play();

        const mixer2 = new THREE.AnimationMixer(gltf2.scene);
        const action2 = mixer2.clipAction(gltf2.animations[0]); //첫 번째 애니메이션 실행
        action2.play();

        const mixer3 = new THREE.AnimationMixer(gltf3.scene);
        const action3 = mixer3.clipAction(gltf3.animations[0]); //첫 번째 애니메이션 실행
        action3.play();

        const mixer4 = new THREE.AnimationMixer(gltf4.scene);
        const action4 = mixer4.clipAction(gltf4.animations[0]); //첫 번째 애니메이션 실행
        action4.play();

        const clock = new THREE.Clock();

        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            const delta = clock.getDelta();
            mixer1.update(delta); //애니메이션 매 프레임마다 불러오기
            mixer2.update(delta); //애니메이션 매 프레임마다 불러오기
            mixer3.update(delta); //애니메이션 매 프레임마다 불러오기
            mixer4.update(delta); //애니메이션 매 프레임마다 불러오기
            renderer.render(scene, camera);
        });
    }
    start();
});