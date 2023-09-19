//const THREE = window.MINDAR.IMAGE.THREE;
import * as THREE from 'three';
import {MindARThree} from 'mindar-image-three';
import {mockWithVideo, mockWithImage} from '../../applications/libs/camera-mock.js'; 

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {

        //CamerMock 하는 코드를 미리 작성해두고 위에서 import해와서 반복적으로 사용 가능함
        mockWithVideo("../../applications/assets/mock-videos/course-banner1.mp4");
        //Video가 아니라 Image로도 가능함!
        //mockWithImage("../../applications/assets/mock-videos/course-banner1.png")

        //CameraMock 코드를 import해와서 사용하기 때문에 아래 코드는 필요 없음!
        // navigator.mediaDevices.getUserMedia = () => {
        //     return new Promise((resolve, reject) =>{
        //         const video = document.createElement("video");
        //         video.setAttribute("src", "../../applications/assets/mock-videos/course-banner1.mp4");
        //         video.setAttribute("loop", "");

        //         video.oncanplay = () => {
        //             video.play();
        //             resolve(video.captureStream());
        //         }
        //     });
        // }

        // initialize MindAR 
        const mindarThree = new MindARThree({
            container: document.body,
            imageTargetSrc: '../../applications/assets/targets/course-banner.mind'
        });
        const {renderer, scene, camera} = mindarThree;

        // create AR object
        const geometry = new THREE.PlaneGeometry(1,1);
        const material = new THREE.MeshBasicMaterial({color: 0x0000ff, transparent: true, opacity: 0.5});
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