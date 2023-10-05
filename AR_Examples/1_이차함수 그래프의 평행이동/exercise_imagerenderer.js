//const THREE = window.MINDAR.IMAGE.THREE;
// import * as THREE from 'three';
import {MindARThree} from 'mindar-image-three';


document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {
        // initialize MindAR 
        const mindarThree = new MindARThree({
            container: document.body,
            imageTargetSrc: '../../ImageTracking_Course/Rep_Image.mind',
            uiScanning: "#scanning",
            uiLoading: "no"
        });
        const {renderer, scene, camera} = mindarThree;

        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            renderer.render(scene, camera);
        });
    }
    start();
});