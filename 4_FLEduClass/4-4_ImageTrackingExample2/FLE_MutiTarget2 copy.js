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
        const gltf1 = await loadGLTF('../3dModels/gltf_avocado/scene.gltf');
        gltf1.scene.scale.set(0.04, 0.04, 0.04);
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

        const listner = new THREE.AudioListener();
        camera.add(listner);

        const audio1 = new THREE.Audio(listner);
        const audioClip1 = await loadAudio("./Avocado.m4a");
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


        document.body.addEventListener('click', (e) => {
            // normalize to -1 to 1
            const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            const mouse = new THREE.Vector2(mouseX, mouseY);
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children, true);
            console.log(intersects.length)
            if (intersects.length > 0) {
                let o = intersects[0].object; 
                while (o.parent && !o.userData.clickable) {
                o = o.parent;
                }
       
                console.log(o === gltf1.scene)
                console.log(o === gltf2.scene)
            
                if (o.userData.clickable) {
                
                console.log(o === raccoon.scene)
                console.log(o === bear.scene)
                
                    if (o === raccoon.scene) {
                        sound.play();
                    }
                }
                }
          });

        gltf1Anchor.onTargetLost = () => {
            gltf1.scene.scale.set(0,0,0)
        }
        gltf1Anchor.onTargetFound = () =>{
            gltf1.scene.scale.set(0.04,0.04,0.04)
        }
        gltf2Anchor.onTargetLost = () => {
            gltf2.scene.scale.set(0,0,0)
        }
        gltf3Anchor.onTargetLost = () => {
            gltf3.scene.scale.set(0,0,0)
        }
        gltf4Anchor.onTargetLost = () => {
            gltf4.scene.scale.set(0,0,0)
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