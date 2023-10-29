import {loadGLTF} from '../applications/libs/loader.js';
const THREE = window.MINDAR.IMAGE.THREE;

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
        
        //load gltf models
        const gltf = await loadGLTF('../1-2_Developments/Developments/gltfs/1_cube_fold_typeA.gltf');
        gltf.scene.scale.set(0.2, 0.2, 0.2);
        gltf.scene.position.set(0, 0, 0.5);
        gltf.scene.rotation.set(0, Math.PI/2, Math.PI/2);


        const Anchor = mindarThree.addAnchor(0);
        Anchor.group.add(gltf.scene);
        
        //gltf.animations
        const mixer = new THREE.AnimationMixer(gltf.scene);
        const clip = gltf.animations[0]
        const action = mixer.clipAction(gltf.animations[0]); //첫 번째 애니메이션 실행
        action.play();


        const controlSlider = document.getElementById("custom-slider");
        controlSlider.addEventListener("input", function() {
            // Get the current value of the slider
            const sliderValue = controlSlider.value;
            console.log("Slider value: " + sliderValue);
            // You can perform actions with the slider value here
            const frame = 100; // The desired frame number
            const duration = clip.duration; // Total duration of the animation
            const newTime = (frame / sliderValue);
            action.time = newTime;
            mixer.update(0); // Update the animation
            // mixer.update(sliderValue/900);
          });

        // const clock = new THREE.Clock();
    

        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            // const delta = clock.getDelta();
            //gltf.scene.rotation.set(0, gltf.scene.rotation.y+delta, 0); //3D 모델에 내장된 애니메이션은 아니고, 코드에서 직접 애니메이션 효과를 주는 방식 애니메이션이라기 보다는 움직이는 효과 정도?
            // mixer.update(delta/2); //애니메이션 매 프레임마다 불러오기
            renderer.render(scene, camera);
        });
    }
    start();
});