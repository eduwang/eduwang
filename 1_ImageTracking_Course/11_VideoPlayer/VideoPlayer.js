import * as THREE from 'three';
import {MindARThree} from 'mindar-image-three';
import {loadGLTF, loadVideo} from '../../applications/libs/loader.js';

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {

        // initialize MindAR 
        const mindarThree = new MindARThree({
            container: document.body,
            imageTargetSrc: '../Rep_Image.mind',
          });
        const {renderer, scene, camera} = mindarThree;

        const video = await loadVideo('../../3_AR_Examples/1_이차함수 그래프의 평행이동/videosource_exercise2.mp4');
        const texture = new THREE.VideoTexture(video);

        const geometry = new THREE.PlaneGeometry(2,2160/1920); //video가 1:1 비율이 아니므로... 높이는 영상 크기에 맞춰 나눠줌! 1은 이미지 크기에 대응함.
        const material = new THREE.MeshBasicMaterial({map: texture}); //video를 texture로 만들어서 평면의 material로 지정하는 방식!
        const plane = new THREE.Mesh(geometry,material);

        const Anchor = mindarThree.addAnchor(0);
        Anchor.group.add(plane);

        Anchor.onTargetFound = () => {
            video.play();
        }
        Anchor.onTargetLost = () => {
            video.pause();
        }
        video.addEventListener("play", () => {
            video.currentTime = 6;
        })

        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            renderer.render(scene, camera);
        });
    }
    start();
});