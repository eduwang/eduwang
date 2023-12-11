import * as THREE from 'three';
import {MindARThree} from 'mindar-image-three';
import {loadGLTF, loadAudio} from '../../applications/libs/loader.js';

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {

        // initialize MindAR 
        const mindarThree = new MindARThree({
            container: document.body,
            imageTargetSrc: './MultiTarget.mind',
          });
        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);
        
        //load Multiple Models
        const gltf1 = await loadGLTF('./Models/Model_1.gltf');
        gltf1.scene.scale.set(0,0,0);
        gltf1.scene.rotation.set(Math.PI/2,0,0);
        gltf1.scene.position.set(-2, 1, 0);
        const gltf1_1 = await loadGLTF('./Models/Model_1/scene.gltf');
        gltf1_1.scene.scale.set(0,0,0);
        gltf1_1.scene.rotation.set(Math.PI/2,-Math.PI/4,0);
        gltf1_1.scene.position.set(0, 0, 0);
        const gltf1Anchor = mindarThree.addAnchor(0);
        gltf1Anchor.group.add(gltf1.scene);
        gltf1Anchor.group.add(gltf1_1.scene);

        const gltf2 = await loadGLTF('./Models/Model_2.gltf');
        gltf2.scene.scale.set(0,0,0);
        gltf2.scene.rotation.set(Math.PI/2,0,0);
        gltf2.scene.position.set(-1.5, 1, 0);
        const gltf2_1 = await loadGLTF('./Models/Model_2/scene.gltf');
        gltf2_1.scene.scale.set(0,0,0);
        gltf2_1.scene.rotation.set(Math.PI/2,-Math.PI/4,0);
        gltf2_1.scene.position.set(-1.2, 1.2, -3);
        const gltf2Anchor = mindarThree.addAnchor(1);
        gltf2Anchor.group.add(gltf2.scene);
        gltf2Anchor.group.add(gltf2_1.scene);

        const gltf3 = await loadGLTF('./Models/Model_3.gltf');
        gltf3.scene.scale.set(0,0,0);
        gltf3.scene.rotation.set(Math.PI/2,0,0);
        gltf3.scene.position.set(-1.5, 1, 0.4);
        const gltf3_1 = await loadGLTF('./Models/Model_3/scene.gltf');
        gltf3_1.scene.scale.set(0, 0, 0);
        gltf3_1.scene.rotation.set(Math.PI/2, -Math.PI/4, 0);
        gltf3_1.scene.position.set(-0.2, 0.2, 0);
        const gltf3Anchor = mindarThree.addAnchor(2);
        gltf3Anchor.group.add(gltf3.scene);
        gltf3Anchor.group.add(gltf3_1.scene);


        const gltf4 = await loadGLTF('./Models/Model_4.gltf');
        gltf4.scene.scale.set(0,0,0);
        gltf4.scene.rotation.set(Math.PI/2,0,0);
        gltf4.scene.position.set(-1.5, 1, 0);
        const gltf4_1 = await loadGLTF('./Models/Model_4/scene.gltf');
        gltf4_1.scene.scale.set(0,0,0);
        gltf4_1.scene.rotation.set(Math.PI/2,0,0);
        gltf4_1.scene.position.set(-4.5, -23, -150);
        const gltf4Anchor = mindarThree.addAnchor(3);
        gltf4Anchor.group.add(gltf4.scene);
        gltf4Anchor.group.add(gltf4_1.scene);


        const gltf5 = await loadGLTF('./Models/Model_5.gltf');
        gltf5.scene.scale.set(0,0,0);
        gltf5.scene.rotation.set(Math.PI/2,0,0);
        gltf5.scene.position.set(-1.5, 1, 0);
        const gltf5_1 = await loadGLTF('./Models/Model_5/scene.gltf');
        gltf5_1.scene.scale.set(0, 0, 0);
        gltf5_1.scene.rotation.set(Math.PI/2,-Math.PI/4,0);
        gltf5_1.scene.position.set(0, 0, -0.1);
        const gltf5Anchor = mindarThree.addAnchor(4);
        gltf5Anchor.group.add(gltf5.scene);
        gltf5Anchor.group.add(gltf5_1.scene);



        const gltf6 = await loadGLTF('./Models/Model_6.gltf');
        gltf6.scene.scale.set(0,0,0);
        gltf6.scene.rotation.set(Math.PI/2,0,0);
        gltf6.scene.position.set(-1, 1, 0);
        const gltf6_1 = await loadGLTF('./Models/Model_6/scene.gltf');
        gltf6_1.scene.scale.set(0,0,0);
        gltf6_1.scene.rotation.set(Math.PI/2,0,0);
        gltf6_1.scene.position.set(0, 0, 0);
        const gltf6Anchor = mindarThree.addAnchor(5);
        gltf6Anchor.group.add(gltf6.scene);
        gltf6Anchor.group.add(gltf6_1.scene);


        const gltf7 = await loadGLTF('./Models/Model_7.gltf');
        gltf7.scene.scale.set(0,0,0);
        gltf7.scene.rotation.set(Math.PI/2,0,0);
        gltf7.scene.position.set(-1.5, 1, 0);
        const gltf7_1 = await loadGLTF('./Models/Model_7/scene.gltf');
        gltf7_1.scene.scale.set(0,0,0);
        gltf7_1.scene.rotation.set(Math.PI/2, -Math.PI/4,0);
        gltf7_1.scene.position.set(0, 0, 0);
        const gltf7Anchor = mindarThree.addAnchor(6);
        gltf7Anchor.group.add(gltf7.scene);
        gltf7Anchor.group.add(gltf7_1.scene);


        const gltf8 = await loadGLTF('./Models/Model_8.gltf');
        gltf8.scene.scale.set(0,0,0);
        gltf8.scene.rotation.set(Math.PI/2,0,0);
        gltf8.scene.position.set(-1.5, 1, 0);
        const gltf8_1 = await loadGLTF('./Models/Model_8/scene.gltf');
        gltf8_1.scene.scale.set(0, 0, 0);
        gltf8_1.scene.rotation.set(Math.PI/2,Math.PI/4,0);
        gltf8_1.scene.position.set(0, 0, 0);
        const gltf8Anchor = mindarThree.addAnchor(7);
        gltf8Anchor.group.add(gltf8.scene);
        gltf8Anchor.group.add(gltf8_1.scene);



        const listner = new THREE.AudioListener();
        camera.add(listner);

        const audio1 = new THREE.Audio(listner);
        const audioClip1 = await loadAudio("./MusicSource/Target_1.mp3");
        audio1.setBuffer(audioClip1)

        const audio2 = new THREE.Audio(listner);
        const audioClip2 = await loadAudio("./MusicSource/Target_2.mp3");
        audio2.setBuffer(audioClip2)

        const audio3 = new THREE.Audio(listner);
        const audioClip3 = await loadAudio("./MusicSource/Target_3.mp3");
        audio3.setBuffer(audioClip3)

        const audio4 = new THREE.Audio(listner);
        const audioClip4 = await loadAudio("./MusicSource/Target_4.mp3");
        audio4.setBuffer(audioClip4)

        const audio5 = new THREE.Audio(listner);
        const audioClip5 = await loadAudio("./MusicSource/Target_5.mp3");
        audio5.setBuffer(audioClip5)
        
        const audio6 = new THREE.Audio(listner);
        const audioClip6 = await loadAudio("./MusicSource/Target_6.mp3");
        audio6.setBuffer(audioClip6)

        const audio7 = new THREE.Audio(listner);
        const audioClip7 = await loadAudio("./MusicSource/Target_7.mp3");
        audio7.setBuffer(audioClip7)
        
        const audio8 = new THREE.Audio(listner);
        const audioClip8 = await loadAudio("./MusicSource/Target_8.mp3");
        audio8.setBuffer(audioClip8)

        document.body.addEventListener('click',(e) =>{
            const mouseX = (e.clientX / window.innerWidth)*2-1;
            const mouseY = -1*(e.clientY / window.innerHeight)*2+1; //top to bottom이 아니라 bottom to top임. 그래서 반전 시켜줘야 함
            const mouse = new THREE.Vector2(mouseX,mouseY);

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(scene.children, true); //오브젝트 하나를 지정하는게 아니라, scene에 나타나는 오브젝트 전체를 지정해야 나중에 편함

            console.log(intersects.length)

            if (intersects.length > 0) {
                let o = intersects[0].object;
                while (o.parent && !o.userData.clickable) {
                    o = o.parent;
                }
                console.log(o)

                if (o.userData.clickable){
                    if (o === gltf1.scene){
                        audio1.play()
                        console.log("Target 1 Found");
                    }
                    if (o === gltf2.scene){
                        audio2.play()
                        console.log("Target 2 found");
                    }
                    if (o === gltf3.scene){
                        audio3.play()
                        console.log("Target 3 found");
                    }
                    if (o === gltf4.scene){
                        audio4.play()
                        console.log("Target 4 found");
                    }
                    if (o === gltf5.scene){
                        audio5.play()
                        console.log("Target 5 found");
                    }
                    if (o === gltf6.scene){
                        audio6.play()
                        console.log("Target 6 found");
                    }
                    if (o === gltf7.scene){
                        audio7.play()
                        console.log("Target 7 found");
                    }
                    if (o === gltf8.scene){
                        audio8.play()
                        console.log("Target 8 found");
                    }
                }
            }
        });

        //gltf.animations
        const mixer1 = new THREE.AnimationMixer(gltf1_1.scene);
        const action1 = mixer1.clipAction(gltf1_1.animations[0]); //첫 번째 애니메이션 실행
        action1.play();

        const mixer2 = new THREE.AnimationMixer(gltf2_1.scene);
        const action2 = mixer2.clipAction(gltf2_1.animations[0]); //첫 번째 애니메이션 실행
        action2.play();

        const mixer3 = new THREE.AnimationMixer(gltf3_1.scene);
        const action3 = mixer3.clipAction(gltf3_1.animations[0]); //첫 번째 애니메이션 실행
        action3.play();

        const mixer4 = new THREE.AnimationMixer(gltf4_1.scene);
        const action4 = mixer4.clipAction(gltf4_1.animations[0]); //첫 번째 애니메이션 실행
        action4.play();

        const mixer6 = new THREE.AnimationMixer(gltf6_1.scene);
        const action6 = mixer6.clipAction(gltf6_1.animations[0]); //첫 번째 애니메이션 실행
        action6.play();

        const mixer8 = new THREE.AnimationMixer(gltf8_1.scene);
        const action8 = mixer8.clipAction(gltf8_1.animations[0]); //첫 번째 애니메이션 실행
        action8.play();
        
        const clock = new THREE.Clock();

        gltf1Anchor.onTargetLost = () => {
            gltf1.scene.scale.set(0, 0, 0);
            gltf1_1.scene.scale.set(0, 0, 0);
        }
        gltf1Anchor.onTargetFound = () => {
            gltf1.scene.userData.clickable = true
            gltf1_1.scene.userData.clickable = true
            gltf1.scene.scale.set(0.7,0.7,0.7);
            gltf1_1.scene.scale.set(0.5,0.5,0.5);
        }
        gltf2Anchor.onTargetLost = () => {
            gltf2.scene.scale.set(0, 0, 0);
            gltf2_1.scene.scale.set(0, 0, 0);

        }
        gltf2Anchor.onTargetFound = () => {
            gltf2.scene.userData.clickable = true
            gltf2_1.scene.userData.clickable = true
            gltf2.scene.scale.set(0.7,0.7,0.7);
            gltf2_1.scene.scale.set(0.1,0.1,0.1);

        }
        gltf3Anchor.onTargetLost = () => {
            gltf3.scene.scale.set(0, 0, 0);
            gltf3_1.scene.scale.set(0, 0, 0);
        }
        gltf3Anchor.onTargetFound = () => {
            gltf3.scene.userData.clickable = true
            gltf3_1.scene.userData.clickable = true
            gltf3.scene.scale.set(0.7,0.7,0.7);
            gltf3_1.scene.scale.set(0.2, 0.2, 0.2);

        }
        gltf4Anchor.onTargetLost = () => {
            gltf4.scene.scale.set(0, 0, 0);
            gltf4_1.scene.scale.set(0,0,0);

        }
        gltf4Anchor.onTargetFound = () => {
            gltf4.scene.userData.clickable = true
            gltf4_1.scene.userData.clickable = true
            gltf4.scene.scale.set(0.6,0.6,0.6);
            gltf4_1.scene.scale.set(150,150,150);
        }
        gltf5Anchor.onTargetLost = () => {
            gltf5.scene.scale.set(0, 0, 0);
            gltf5_1.scene.scale.set(0, 0, 0);

        }
        gltf5Anchor.onTargetFound = () => {
            gltf5.scene.userData.clickable = true
            gltf5_1.scene.userData.clickable = true
            gltf5.scene.scale.set(0.6,0.6,0.6);
            gltf5_1.scene.scale.set(0.015, 0.015, 0.015);

        }
        gltf6Anchor.onTargetLost = () => {
            gltf6.scene.scale.set(0, 0, 0);
            gltf6_1.scene.scale.set(0, 0, 0);

        }
        gltf6Anchor.onTargetFound = () => {
            gltf6.scene.userData.clickable = true
            gltf6_1.scene.userData.clickable = true
            gltf6.scene.scale.set(0.7,0.7,0.7);
            gltf6_1.scene.scale.set(0.35,0.35,0.35);

        }
        gltf7Anchor.onTargetLost = () => {
            gltf7.scene.scale.set(0, 0, 0);
            gltf7_1.scene.scale.set(0,0,0);
        }
        gltf7Anchor.onTargetFound = () => {
            gltf7.scene.userData.clickable = true
            gltf7_1.scene.userData.clickable = true
            gltf7.scene.scale.set(0.7,0.7,0.7);
            gltf7_1.scene.scale.set(0.5,0.5,0.5);

        }
        gltf8Anchor.onTargetLost = () => {
            gltf8.scene.scale.set(0, 0, 0);
            gltf8_1.scene.scale.set(0, 0, 0);
        }
        gltf8Anchor.onTargetFound = () => {
            gltf8.scene.userData.clickable = true
            gltf8_1.scene.userData.clickable = true
            gltf8.scene.scale.set(0.7,0.7,0.7);
            gltf8_1.scene.scale.set(0.3,0.3,0.3);

        }


        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            const delta = clock.getDelta();
            mixer1.update(delta); //애니메이션 매 프레임마다 불러오기
            mixer2.update(delta); //애니메이션 매 프레임마다 불러오기
            mixer3.update(delta); //애니메이션 매 프레임마다 불러오기
            mixer4.update(delta); //애니메이션 매 프레임마다 불러오기
            mixer6.update(delta); //애니메이션 매 프레임마다 불러오기
            mixer8.update(delta); //애니메이션 매 프레임마다 불러오기

            renderer.render(scene, camera);
        });
    }
    start();
});