import {loadGLTF, loadAudio} from '../../applications/libs/loader.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {

        // initialize MindAR 
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: '../Rep_Image.mind',
          });
        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);
        
        const gltf = await loadGLTF('../../applications/assets/models/musicband-raccoon/scene.gltf');
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        gltf.scene.position.set(0, -0.4, 0);
        gltf.scene.userData.clickable = true;

        const Anchor = mindarThree.addAnchor(0);
        Anchor.group.add(gltf.scene);

        const audioClip = await loadAudio("../../applications/assets/sounds/musicband-background.mp3");

        const listner = new THREE.AudioListener();
        camera.add(listner);

        const audio2 = new THREE.Audio(listner);
        const audioClip2 = await loadAudio("../../applications/assets/sounds/record.m4a");
        audio2.setBuffer(audioClip2)


        const audio = new THREE.PositionalAudio(listner);

        document.body.addEventListener('click',(e) =>{
            const mouseX = (e.clientX / window.innerWidth)*2-1;
            const mouseY = -1*(e.clientY / window.innerHeight)*2+1; //top to bottom이 아니라 bottom to top임. 그래서 반전 시켜줘야 함
            const mouse = new THREE.Vector2(mouseX,mouseY);

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(scene.children, true); //오브젝트 하나를 지정하는게 아니라, scene에 나타나는 오브젝트 전체를 지정해야 나중에 편함

            if (intersects.length > 0) {
                let o = intersects[0].object;
                while (o.parent && !o.userData.clickable) {
                    o = o.parent;
                }

                if (o.userData.clickable){
                    if (o === gltf.scene){
                        audio2.play()
                        console.log("on click found");
                    }
                }
            }
        });

        Anchor.group.add(audio);
//        Anchor.group.add(audio2); UI에서는 얘가 필요없는 것 같음...


        audio.setRefDistance(100); //값을 바꿔가면서 테스트해봐야 함
        audio.setBuffer(audioClip);
        audio.setLoop(true);

        //Multiple Detection을 사용할 때 필요할 수 있음
        Anchor.onTargetFound = () => {
            console.log("on target found");
            audio.play();
        }

        Anchor.onTargetLost = () => {
            console.log("on target lost");
            audio.pause();
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