import * as THREE from 'three';
import {MindARThree} from 'mindar-image-three';
import {loadGLTF, loadAudio} from '../../applications/libs/loader.js';

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
        const gltf1 = await loadGLTF('../3dModels/gltf_mario3/scene.gltf');
        gltf1.scene.scale.set(0, 0, 0);
        gltf1.scene.rotation.set(Math.PI/2,0,0);
        gltf1.scene.position.set(0, 0, 0);
        const gltf1Anchor = mindarThree.addAnchor(0);
        gltf1Anchor.group.add(gltf1.scene);

        const gltf2 = await loadGLTF('../3dModels/gltf_france/scene.gltf');
        gltf2.scene.scale.set(0,0,0);
        gltf2.scene.rotation.set(Math.PI/3,0,0);
        gltf2.scene.position.set(0, 0.3, 0.5);
        const gltf2Anchor = mindarThree.addAnchor(1);
        gltf2Anchor.group.add(gltf2.scene);

        const gltf3 = await loadGLTF('../3dModels/gltf_groot_dancing/scene.gltf');
        gltf3.scene.scale.set(0,0,0);
        gltf3.scene.rotation.set(Math.PI/2,0,0);
        gltf3.scene.position.set(0, 0, 0.1);
        const gltf3Anchor = mindarThree.addAnchor(2);
        gltf3Anchor.group.add(gltf3.scene);

        const gltf4 = await loadGLTF('../3dModels/gltf_makar_from_wind_waker_-_the_legend_of_zelda/scene.gltf');
        gltf4.scene.scale.set(0,0,0);
        gltf4.scene.rotation.set(Math.PI/2,0,0);
        gltf4.scene.position.set(0, 0, 0.5);
        const gltf4Anchor = mindarThree.addAnchor(3);
        gltf4Anchor.group.add(gltf4.scene);

        const listner = new THREE.AudioListener();
        camera.add(listner);

        const audio1 = new THREE.Audio(listner);
        const audioClip1 = await loadAudio("./ItsMeMario.mp3");
        audio1.setBuffer(audioClip1)

        const audio2 = new THREE.Audio(listner);
        const audioClip2 = await loadAudio("./France.m4a");
        audio2.setBuffer(audioClip2)

        const audio3 = new THREE.Audio(listner);
        const audioClip3 = await loadAudio("./Groot.m4a");
        audio3.setBuffer(audioClip3)

        const audio4 = new THREE.Audio(listner);
        const audioClip4 = await loadAudio("./Korok.m4a");
        audio4.setBuffer(audioClip4)


        document.body.addEventListener('click',(e) =>{
            const mouseX = (e.clientX / window.innerWidth)*2-1;
            const mouseY = -1*(e.clientY / window.innerHeight)*2+1; //top to bottom이 아니라 bottom to top임. 그래서 반전 시켜줘야 함
            const mouse = new THREE.Vector2(mouseX,mouseY);

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(scene.children, true); //오브젝트 하나를 지정하는게 아니라, scene에 나타나는 오브젝트 전체를 지정해야 나중에 편함

            //console.log(intersects.length)
            //console.log

            if (intersects.length > 0) {
                let o = intersects[0].object;
                while (o.parent && !o.userData.clickable) {
                    o = o.parent;
                }
                console.log(o)

                if (o.userData.clickable){
                    if (o === gltf1.scene){
                        audio1.play()
                        console.log("mario found");
                    }
                    if (o === gltf2.scene){
                        audio2.play()
                        console.log("france flag found");
                    }
                    if (o === gltf3.scene){
                        audio3.play()
                        console.log("dancing groot found");
                    }
                    if (o === gltf4.scene){
                        audio4.play()
                        console.log("Korok found");
                    }
                }
            }
        });

        //gltf.animations
        const mixer1 = new THREE.AnimationMixer(gltf1.scene);
        const action1 = mixer1.clipAction(gltf1.animations[2]); //첫 번째 애니메이션 실행
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

        gltf1Anchor.onTargetLost = () => {
            gltf1.scene.scale.set(0, 0, 0);
        }
        gltf1Anchor.onTargetFound = () => {
            gltf1.scene.userData.clickable = true
            gltf1.scene.scale.set(1, 1, 1);
        }
        gltf2Anchor.onTargetLost = () => {
            gltf2.scene.scale.set(0, 0, 0);
        }
        gltf2Anchor.onTargetFound = () => {
            gltf2.scene.userData.clickable = true
            gltf2.scene.scale.set(0.3, 0.3, 0.3);
        }
        gltf3Anchor.onTargetLost = () => {
            gltf3.scene.scale.set(0, 0, 0);
        }
        gltf3Anchor.onTargetFound = () => {
            gltf3.scene.userData.clickable = true
            gltf3.scene.scale.set(0.5, 0.5, 0.5);
        }
        gltf4Anchor.onTargetLost = () => {
            gltf4.scene.scale.set(0, 0, 0);
        }
        gltf4Anchor.onTargetFound = () => {
            gltf4.scene.userData.clickable = true
            gltf4.scene.scale.set(3, 3, 3);
        }


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