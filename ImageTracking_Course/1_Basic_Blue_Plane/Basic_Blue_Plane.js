//const THREE = window.MINDAR.IMAGE.THREE;
import * as THREE from 'three';
import {MindARThree} from 'mindar-image-three';

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {
        // initialize MindAR 
        const mindarThree = new MindARThree({
            container: document.body,
            imageTargetSrc: '../../applications/assets/targets/course-banner.mind'
        });
        const {renderer, scene, camera} = mindarThree;

        // create AR object
        const geometry = new THREE.PlaneGeometry(1,1);
        const material = new THREE.MeshBasicMaterial({color: 0x0000ff, tranparent: true, opacity: 0.5});
        const plane = new THREE.Mesh(geometry,material);

        // create anchor
        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(plane); //THREE.Group

        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            renderer.render(scene, camera);
        });
    }
    start();
});