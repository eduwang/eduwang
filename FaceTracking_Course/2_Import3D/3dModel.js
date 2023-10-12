import {loadGLTF} from "../../applications/libs/loader.js"
const THREE = window.MINDAR.FACE.THREE;

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {
        // initialize MindAR 
        const mindarThree = new window.MINDAR.FACE.MindARThree({
            container: document.body,
        });
        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1);
        scene.add(light)

        const glasses = await loadGLTF('../../applications/assets/models/glasses1/scene.gltf');

        glasses.scene.scale.multiplyScalar(0.01);

        // create anchor
        const anchor = mindarThree.addAnchor(168); //nose에 위치하는 anchor
        anchor.group.add(glasses.scene); //THREE.Group

        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            renderer.render(scene, camera);
        });
    }
    start();
});