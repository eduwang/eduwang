import {loadGLTF} from '../../applications/libs/loader.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {

        // initialize MindAR 
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './target.mind',
          });
        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);
        
        const gltf1 = await loadGLTF('./Models/MengerSponge_1.gltf');
        gltf1.scene.scale.set(0, 0, 0);
        gltf1.scene.position.set(0, 0, 0.5);
        gltf1.scene.rotation.set(0, 0, 0);

        const gltf2 = await loadGLTF('./Models/MengerSponge_2.gltf');
        gltf2.scene.scale.set(0, 0, 0);
        gltf2.scene.position.set(0, 0, 0.5);
        gltf2.scene.rotation.set(0, 0, 0);

        const gltf3 = await loadGLTF('./Models/MengerSponge_3.gltf');
        gltf3.scene.scale.set(0, 0, 0);
        gltf3.scene.position.set(0, 0, 0.5);
        gltf3.scene.rotation.set(0, 0, 0);


        const Anchor = mindarThree.addAnchor(0);
        Anchor.group.add(gltf1.scene);
        Anchor.group.add(gltf2.scene);
        Anchor.group.add(gltf3.scene);

        
        //gltf.animations
        // const mixer = new THREE.AnimationMixer(gltf.scene);
        // const action = mixer.clipAction(gltf.animations[0]); //첫 번째 애니메이션 실행
        // action.setLoop(THREE.LoopOnce); // Set the animation to play only once
        // const targetTime = gltf.animations[0].duration;

        // const clock = new THREE.Clock();

        //Button Operation 추가
        const Button1 = document.querySelector("#sponge1");
        const Button2 = document.querySelector("#sponge2");
        const Button3 = document.querySelector("#sponge3");

        //타겟을 찾으면 button이 보이게
        Anchor.onTargetFound = () => {
            Button1.style.display = "inline";
            Button2.style.display = "inline";
            Button3.style.display = "inline";
        };

        Anchor.onTargetLost = () => {
            Button1.style.display = "none";
            Button2.style.display = "none";
            Button3.style.display = "none";
        };

        Button1.addEventListener('click', ()=>{
            gltf1.scene.scale.set(0.005, 0.005, 0.005);
            gltf2.scene.scale.set(0, 0, 0);
            gltf3.scene.scale.set(0, 0, 0);

        }); 

        Button2.addEventListener('click', ()=>{
            gltf2.scene.scale.set(0.005, 0.005, 0.005);
            gltf3.scene.scale.set(0, 0, 0);
            gltf1.scene.scale.set(0, 0, 0);
        }); 

        Button3.addEventListener('click', ()=>{
            gltf3.scene.scale.set(0.005, 0.005, 0.005);
            gltf1.scene.scale.set(0, 0, 0);
            gltf2.scene.scale.set(0, 0, 0);
        }); 



        //Touch Interaction 추가해보기
        // // Variable to store initial touch position
        // let touchStartX = 0;

        // // Touch start event handler
        // const onTouchStart = (event) => {
        //     touchStartX = event.touches[0].clientX;
        // };

        // // Touch move event handler
        // const onTouchMove = (event) => {
        //     const touchX = event.touches[0].clientX;
        //     const deltaX = touchX - touchStartX;
        
        //     // Adjust rotation based on touch movement
        //     const rotationSpeed = 0.01;
        //     gltf.scene.rotation.y += deltaX * rotationSpeed;
        
        //     touchStartX = touchX;
        // };

        // // Add touch event listeners
        // renderer.domElement.addEventListener('touchstart', onTouchStart);
        // renderer.domElement.addEventListener('touchmove', onTouchMove);
        

        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            //const delta = clock.getDelta();
            //gltf.scene.rotation.set(0, gltf.scene.rotation.y+delta, 0); //3D 모델에 내장된 애니메이션은 아니고, 코드에서 직접 애니메이션 효과를 주는 방식 애니메이션이라기 보다는 움직이는 효과 정도?
            //mixer.update(delta); //애니메이션 매 프레임마다 불러오기
            renderer.render(scene, camera);
            //console.log(mixer)
            // if (mixer.timeScale === 1){
            //     if (Math.abs(mixer._actions[0].time-targetTime) < 0.05 ) {
            //         mixer.timeScale = 0;
            //     };
            // } else if (mixer.timeScale === -1){
            //     if (mixer._actions[0].time < 0.05  ) {
            //         mixer.timeScale = 0;
            //     };
            // }
        });
    }
    start();

    
});