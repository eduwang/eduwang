import {loadGLTF} from '../../applications/libs/loader.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {

        // initialize MindAR 
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './Target_1.mind',
          });
        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);
        
        // load 3d models
        const gltf = await loadGLTF('../3dModels/gltf_avocado/scene.gltf');
        gltf.scene.scale.set(0.05, 0.05, 0.05);
        gltf.scene.rotation.set(Math.PI/2,0,0);
        gltf.scene.position.set(0, -0.2, 0);

        //create anchor
        const Anchor = mindarThree.addAnchor(0);
        Anchor.group.add(gltf.scene);
        
        //gltf.animations
        const mixer = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[0]); //첫 번째 애니메이션 실행
        action.play();

        const clock = new THREE.Clock();

        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            const delta = clock.getDelta();
            mixer.update(delta); //애니메이션 매 프레임마다 불러오기
            renderer.render(scene, camera);
        });
    }
    start();
});