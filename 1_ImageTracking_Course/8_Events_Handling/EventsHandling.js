import * as THREE from 'three';
import {MindARThree} from 'mindar-image-three';
import {loadGLTF} from '../../applications/libs/loader.js';

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {

        // initialize MindAR 
        const mindarThree = new MindARThree({
            container: document.body,
            imageTargetSrc: '../Rep_Image.mind',
          });
        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);
        
        const gltf = await loadGLTF('../../applications/assets/models/musicband-raccoon/scene.gltf');
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        gltf.scene.position.set(0, -0.4, 0);

        const Anchor = mindarThree.addAnchor(0);
        Anchor.group.add(gltf.scene);
        
        //Multiple Detection을 사용할 때 필요할 수 있음
        Anchor.onTargetFound = () => {
            console.log("on target found")
        }

        Anchor.onTargetLost = () => {
            console.log("on target lost")
        }


        //gltf.animations
        const mixer = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[0]); //첫 번째 애니메이션 실행
        action.play();

        const clock = new THREE.Clock();

        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            const delta = clock.getDelta();
            gltf.scene.rotation.set(0, gltf.scene.rotation.y+delta, 0); //3D 모델에 내장된 애니메이션은 아니고, 코드에서 직접 애니메이션 효과를 주는 방식 애니메이션이라기 보다는 움직이는 효과 정도?
            mixer.update(delta); //애니메이션 매 프레임마다 불러오기
            renderer.render(scene, camera);
        });
    }
    start();
});