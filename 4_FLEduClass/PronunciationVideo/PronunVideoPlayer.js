import * as THREE from 'three';
import {MindARThree} from 'mindar-image-three';
import {loadVideo} from '../../applications/libs/loader.js';

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {

        // initialize MindAR 
        const mindarThree = new MindARThree({
            container: document.body,
            imageTargetSrc: './Target_33.mind',
          });
        const {renderer, scene, camera} = mindarThree;

        // const video1 = await loadVideo('./Video/Video_1.mp4');
        // const texture1 = new THREE.VideoTexture(video1);

        // const geometry1 = new THREE.PlaneGeometry(2,2160/1920); //video가 1:1 비율이 아니므로... 높이는 영상 크기에 맞춰 나눠줌! 1은 이미지 크기에 대응함.
        // const material1 = new THREE.MeshBasicMaterial({map: texture1}); //video를 texture로 만들어서 평면의 material로 지정하는 방식!
        // const plane1 = new THREE.Mesh(geometry1,material1);

        // const Anchor1 = mindarThree.addAnchor(0);
        // Anchor1.group.add(plane1);

        // Anchor1.onTargetFound = () => {
        //     video1.play();
        // }
        // Anchor1.onTargetLost = () => {
        //     video1.pause();
        // }

        // const video2 = await loadVideo('./Video/Video_2.mp4');
        // const texture2 = new THREE.VideoTexture(video2);

        // const geometry2 = new THREE.PlaneGeometry(2,2160/1920); //video가 1:1 비율이 아니므로... 높이는 영상 크기에 맞춰 나눠줌! 1은 이미지 크기에 대응함.
        // const material2 = new THREE.MeshBasicMaterial({map: texture2}); //video를 texture로 만들어서 평면의 material로 지정하는 방식!
        // const plane2 = new THREE.Mesh(geometry2,material2);

        // const Anchor2 = mindarThree.addAnchor(1);
        // Anchor2.group.add(plane2);

        // Anchor2.onTargetFound = () => {
        //     video2.play();
        // }
        // Anchor2.onTargetLost = () => {
        //     video2.pause();
        // }
            const videoFiles = ['./Video/Video_1.mp4'
            , './Video/Video_2.mp4', './Video/Video_3.mp4', './Video/Video_4.mp4', './Video/Video_5.mp4'
            , './Video/Video_6.mp4', './Video/Video_7.mp4', './Video/Video_8.mp4', './Video/Video_9.mp4'
            , './Video/Video_10.mp4', './Video/Video_11.mp4', './Video/Video_12.mp4', './Video/Video_13.mp4'
            , './Video/Video_14.mp4', './Video/Video_15.mp4', './Video/Video_16.mp4', './Video/Video_17.mp4'
            , './Video/Video_18.mp4', './Video/Video_19.mp4', './Video/Video_20.mp4', './Video/Video_21.mp4'
            , './Video/Video_22.mp4', './Video/Video_23.mp4', './Video/Video_24.mp4', './Video/Video_25.mp4'
            , './Video/Video_26.mp4', './Video/Video_27.mp4', './Video/Video_28.mp4', './Video/Video_29.mp4'
            , './Video/Video_30.mp4', './Video/Video_31.mp4', './Video/Video_32.mp4', './Video/Video_33.mp4'];

            for (let i = 0; i < videoFiles.length; i++) {
                const video = await loadVideo(videoFiles[i]);
                const texture = new THREE.VideoTexture(video);

                const geometry = new THREE.PlaneGeometry(2, 2160/1920);
                const material = new THREE.MeshBasicMaterial({map: texture});
                const plane = new THREE.Mesh(geometry, material);

                const anchor = mindarThree.addAnchor(i);
                anchor.group.add(plane);

                anchor.onTargetFound = () => {
                    video.play();
                };

                anchor.onTargetLost = () => {
                    video.pause();
                };
            }


        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            renderer.render(scene, camera);
        });
    }
    start();
});