import {loadGLTF, loadTexture} from "../../applications/libs/loader.js"
const THREE = window.MINDAR.FACE.THREE;

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {
        // initialize MindAR 
        const mindarThree = new window.MINDAR.FACE.MindARThree({
            container: document.getElementById('video')
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

        const camContainer = document.getElementById('video');
        let switchCount = 0;

        document.querySelector("#switchCam").addEventListener("click", () => {
            mindarThree.switchCamera();
            switchCount++;
            console.log(switchCount);
            if (switchCount % 2 === 1) {
                camContainer.style.webkitTransform = 'scaleX(1)';
                camContainer.style.transform = 'scaleX(1)';
            } else{
                camContainer.style.webkitTransform = 'scaleX(-1)';
                camContainer.style.transform = 'scaleX(-1)';
            }

          });

        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            renderer.render(scene, camera);
        });
    }
    start();
});