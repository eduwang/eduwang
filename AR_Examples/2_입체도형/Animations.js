import {loadGLTF} from '../../applications/libs/loader.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {

        // initialize MindAR 
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: '../../ImageTracking_Course/Rep_Image.mind',
          });
        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);
        
        //model 1 불러오기
        const gltf = await loadGLTF('./cube_fold.gltf');
        gltf.scene.scale.set(0.2, 0.2, 0.2);
        gltf.scene.rotation.set(-Math.PI/2,0,Math.PI);
        gltf.scene.position.set(-1, 0, 0.2);

        //model 2 불러오기
        const gltf2 = await loadGLTF('./cube_fold2.gltf');
        gltf2.scene.scale.set(0.2, 0.2, 0.2);
        gltf2.scene.rotation.set(-Math.PI/2,0,Math.PI);
        gltf2.scene.position.set(0, 0, 0.2);

        //model 3 불러오기
        const gltf3 = await loadGLTF('./cylinder_begin.gltf');
        gltf3.scene.scale.set(0.2, 0.2, 0.2);
        gltf3.scene.rotation.set(-Math.PI/2,0,Math.PI);
        gltf3.scene.position.set(1, 0, 0.2);

        const Anchor = mindarThree.addAnchor(0);
        Anchor.group.add(gltf.scene); //model 1 추가
        Anchor.group.add(gltf2.scene); //model 2 추가
        Anchor.group.add(gltf3.scene); //model 2 추가

        
        //gltf.animations
        const mixer = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[0]); //첫 번째 애니메이션 실행
        action.play();

        //gltf.animations
        const mixer2 = new THREE.AnimationMixer(gltf2.scene);
        const action2 = mixer2.clipAction(gltf2.animations[0]); //첫 번째 애니메이션 실행
        action2.play();

        //gltf.animations
        const mixer3 = new THREE.AnimationMixer(gltf3.scene);
        const action3 = mixer3.clipAction(gltf3.animations[0]); //첫 번째 애니메이션 실행
        action3.play();


        gltf.animations.forEach((animation, index) => {
            console.log(`Animation ${index + 1}: ${animation.name}`);
          });
        gltf2.animations.forEach((animation, index) => {
          console.log(`Animation ${index + 1}: ${animation.name}`);
        });
        const clock = new THREE.Clock();

        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            const delta = clock.getDelta();
            // gltf.scene.rotation.set(0, gltf.scene.rotation.y+delta, 0); //3D 모델에 내장된 애니메이션은 아니고, 코드에서 직접 애니메이션 효과를 주는 방식 애니메이션이라기 보다는 움직이는 효과 정도?
            mixer.update(delta); //애니메이션 매 프레임마다 불러오기
            mixer2.update(delta); //애니메이션 매 프레임마다 불러오기
            mixer3.update(delta); //애니메이션 매 프레임마다 불러오기

            renderer.render(scene, camera);
        });
    }
    start();
});