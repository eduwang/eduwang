import {loadGLTF, loadTexture} from "../../applications/libs/loader.js"
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

        const faceMesh = mindarThree.addFaceMesh();
        const texture = await loadTexture("./FaceMesh_Sample3.png")
        faceMesh.material.map = texture;
        faceMesh.material.transparent = true;
        faceMesh.material.needsUpdate = true;

        scene.add(faceMesh);

        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            renderer.render(scene, camera);
        });
    }
    start();
});