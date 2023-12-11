import * as THREE from 'three';
import {MindARThree} from 'mindar-image-three';
import {loadGLTF, loadAudio} from '../../applications/libs/loader.js';

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {

        // initialize MindAR 
        const mindarThree = new MindARThree({
            container: document.body,
            imageTargetSrc: './EscapeRoom.mind',
          });
        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);


        //create anchor
        const Anchor00 = mindarThree.addAnchor(0);
        const Anchor11 = mindarThree.addAnchor(1);
        const Anchor12 = mindarThree.addAnchor(2);
        const Anchor13 = mindarThree.addAnchor(3);
        const Anchor21 = mindarThree.addAnchor(4);
        const Anchor22 = mindarThree.addAnchor(5);
        const Anchor23 = mindarThree.addAnchor(6);
        const Anchor31 = mindarThree.addAnchor(7);
        const Anchor32 = mindarThree.addAnchor(8);
        const Anchor33 = mindarThree.addAnchor(9);
        const Anchor41 = mindarThree.addAnchor(10);
        const Anchor42 = mindarThree.addAnchor(11);
        const Anchor43 = mindarThree.addAnchor(12);
        const Anchor51 = mindarThree.addAnchor(13);
        const Anchor52 = mindarThree.addAnchor(14);
        const Anchor53 = mindarThree.addAnchor(15);
        const Anchor61 = mindarThree.addAnchor(16);
        const Anchor62 = mindarThree.addAnchor(17);
        const Anchor63 = mindarThree.addAnchor(18);
        const Anchor71 = mindarThree.addAnchor(19);
        const Anchor72 = mindarThree.addAnchor(20);
        const Anchor73 = mindarThree.addAnchor(21);
        const Anchor81 = mindarThree.addAnchor(22);
        const Anchor82 = mindarThree.addAnchor(23);
        const Anchor83 = mindarThree.addAnchor(24);
        const Anchor90 = mindarThree.addAnchor(25);

        //audioClips
        const audioClip00 = await loadAudio("./MusicSource/Target_0.mp3");
        const audioClip11 = await loadAudio("./MusicSource/Target_1_1.mp3");
        const audioClip12 = await loadAudio("./MusicSource/Target_1_2.mp3");
        const audioClip13 = await loadAudio("./MusicSource/Target_1_3.mp3");
        const audioClip21 = await loadAudio("./MusicSource/Target_2_1.mp3");
        const audioClip22 = await loadAudio("./MusicSource/Target_2_2.mp3");
        const audioClip23 = await loadAudio("./MusicSource/Target_2_3.mp3");
        const audioClip31 = await loadAudio("./MusicSource/Target_3_1.mp3");
        const audioClip32 = await loadAudio("./MusicSource/Target_3_2.mp3");
        const audioClip33 = await loadAudio("./MusicSource/Target_3_3.mp3");
        const audioClip41 = await loadAudio("./MusicSource/Target_4_1.mp3");
        const audioClip42 = await loadAudio("./MusicSource/Target_4_2.mp3");
        const audioClip43 = await loadAudio("./MusicSource/Target_4_3.mp3");
        const audioClip51 = await loadAudio("./MusicSource/Target_5_1.mp3");
        const audioClip52 = await loadAudio("./MusicSource/Target_5_2.mp3");
        const audioClip53 = await loadAudio("./MusicSource/Target_5_3.mp3");
        const audioClip61 = await loadAudio("./MusicSource/Target_6_1.mp3");
        const audioClip62 = await loadAudio("./MusicSource/Target_6_2.mp3");
        const audioClip63 = await loadAudio("./MusicSource/Target_6_3.mp3");
        const audioClip71 = await loadAudio("./MusicSource/Target_7_1.mp3");
        const audioClip72 = await loadAudio("./MusicSource/Target_7_2.mp3");
        const audioClip73 = await loadAudio("./MusicSource/Target_7_3.mp3");
        const audioClip81 = await loadAudio("./MusicSource/Target_8_1.mp3");
        const audioClip82 = await loadAudio("./MusicSource/Target_8_2.mp3");
        const audioClip83 = await loadAudio("./MusicSource/Target_8_3.mp3");
        const audioClip90 = await loadAudio("./MusicSource/Target_9.mp3");
        const audioClipF = await loadAudio("./MusicSource/Target_Done.mp3");


        const listner = new THREE.AudioListener();
        camera.add(listner);
        const audio00 = new THREE.PositionalAudio(listner);
        const audio11 = new THREE.PositionalAudio(listner);
        const audio12 = new THREE.PositionalAudio(listner);
        const audio13 = new THREE.PositionalAudio(listner);
        const audio21 = new THREE.PositionalAudio(listner);
        const audio22 = new THREE.PositionalAudio(listner);
        const audio23 = new THREE.PositionalAudio(listner);
        const audio31 = new THREE.PositionalAudio(listner);
        const audio32 = new THREE.PositionalAudio(listner);
        const audio33 = new THREE.PositionalAudio(listner);
        const audio41 = new THREE.PositionalAudio(listner);
        const audio42 = new THREE.PositionalAudio(listner);
        const audio43 = new THREE.PositionalAudio(listner);
        const audio51 = new THREE.PositionalAudio(listner);
        const audio52 = new THREE.PositionalAudio(listner);
        const audio53 = new THREE.PositionalAudio(listner);
        const audio61 = new THREE.PositionalAudio(listner);
        const audio62 = new THREE.PositionalAudio(listner);
        const audio63 = new THREE.PositionalAudio(listner);
        const audio71 = new THREE.PositionalAudio(listner);
        const audio72 = new THREE.PositionalAudio(listner);
        const audio73 = new THREE.PositionalAudio(listner);
        const audio81 = new THREE.PositionalAudio(listner);
        const audio82 = new THREE.PositionalAudio(listner);
        const audio83 = new THREE.PositionalAudio(listner);
        const audio90 = new THREE.PositionalAudio(listner);
        const audioF = new THREE.PositionalAudio(listner);


        const Anchors = [Anchor00, Anchor11, Anchor12, Anchor13, 
            Anchor21, Anchor22, Anchor23, Anchor31, Anchor32, Anchor33,
            Anchor41, Anchor42, Anchor43, Anchor51, Anchor52, Anchor53,
            Anchor61, Anchor62, Anchor63, Anchor71, Anchor72, Anchor73, 
            Anchor81, Anchor82, Anchor83, Anchor90];

        const AudioClips =[audioClip00,audioClip11, audioClip12, audioClip13,
            audioClip21, audioClip22, audioClip23, audioClip31, audioClip32, audioClip33,
            audioClip41, audioClip42, audioClip43, audioClip51, audioClip52, audioClip53,
            audioClip61, audioClip62, audioClip63, audioClip71, audioClip72, audioClip73,
            audioClip81, audioClip82, audioClip83, audioClip90]

        const Audios = [audio00, audio11, audio12, audio13,
            audio21, audio22, audio23, audio31, audio32, audio33,
            audio41, audio42, audio43, audio51, audio52, audio53,
            audio61, audio62, audio63, audio71, audio72, audio73,
            audio81, audio82, audio83, audio90];

        let mixer0;
        let mixer11;
        let mixer12;
        let mixer13;
        let mixer21;
        let mixer22;
        let mixer23;
        let mixer31;
        let mixer32;
        let mixer33;
        let mixer41;
        let mixer42;
        let mixer43;
        let mixer51;
        let mixer52;
        let mixer53;
        let mixer61;
        let mixer62;
        let mixer63;
        let mixer71;
        let mixer72;
        let mixer73;
        let mixer81;
        let mixer82;
        let mixer83; 
        let action0;
        let action11;
        let action12;
        let action13;
        let action21;
        let action22;
        let action23;
        let action31;
        let action32;
        let action33;
        let action41;
        let action42;
        let action43;
        let action51;
        let action52;
        let action53;
        let action61;
        let action62;
        let action63;
        let action71;
        let action72;
        let action73;
        let action81;
        let action82;
        let action83; 

        const Mixers = [mixer0, mixer11, mixer12, mixer13, mixer21, mixer22, mixer23,
          mixer31, mixer32, mixer33, mixer41, mixer42, mixer43, mixer51, mixer52, mixer53, 
          mixer61, mixer62, mixer63, mixer71, mixer72, mixer73, mixer81, mixer82, mixer83
        ]

        const Actions = [action0,
          action11,
          action12,
          action13,
          action21,
          action22,
          action23,
          action31,
          action32,
          action33,
          action41,
          action42,
          action43,
          action51,
          action52,
          action53,
          action61,
          action62,
          action63,
          action71,
          action72,
          action73,          action81,
          action82,
          action83 
        ]





        //model 추가
        const gltf90 = await loadGLTF('./Models/dancing_banana/scene.gltf');
        gltf90.scene.scale.set(1,1,1);
        gltf90.scene.rotation.set(Math.PI/2,-Math.PI/4,0);
        gltf90.scene.position.set(0, 0, 0);
        Anchor90.group.add(gltf90.scene);

        const gltf901 = await loadGLTF('./Models/dancing_banana/scene.gltf');
        gltf901.scene.scale.set(1,1,1);
        gltf901.scene.rotation.set(Math.PI/2,Math.PI/4,0);
        gltf901.scene.position.set(-1.5, 0, 0);
        Anchor90.group.add(gltf901.scene);

        const gltf902 = await loadGLTF('./Models/dancing_banana/scene.gltf');
        gltf902.scene.scale.set(1,1,1);
        gltf902.scene.rotation.set(Math.PI/2,0,0);
        gltf902.scene.position.set(1.5, 0, 0);
        Anchor90.group.add(gltf902.scene);

        const gltf1 = await loadGLTF('./Models/model_1/scene.gltf');
        gltf1.scene.scale.set(0.2,0.2,0.2);
        gltf1.scene.rotation.set(Math.PI/2,0,0);
        gltf1.scene.position.set(0.3, 0, 0);

        const gltf2 = await loadGLTF('./Models/model_2/scene.gltf');
        gltf2.scene.scale.set(0.01,0.01,0.01);
        gltf2.scene.rotation.set(Math.PI/2,0,0);
        gltf2.scene.position.set(0.3, 1, 0);

        const gltf3 = await loadGLTF('./Models/model_3/scene.gltf');
        gltf3.scene.scale.set(0.5,0.5,0.5);
        gltf3.scene.rotation.set(Math.PI/2,0,0);
        gltf3.scene.position.set(0, 0, 0);

        const models = [gltf1, gltf2, gltf3]
        function getRandomInt() {
          const randomFloat = Math.random();
          const randomInt = Math.floor(randomFloat * 3);        
          return randomInt;
        }

        for (let j = 0; j < Anchors.length; j++) {
          const index = getRandomInt();
          if (j<25){
            if (index === 0){
              const gltf = await loadGLTF('./Models/model_1/scene.gltf');
              gltf.scene.scale.set(0.2,0.2,0.2);
              gltf.scene.rotation.set(Math.PI/2,0,0);
              gltf.scene.position.set(0.3, 0, 0);
              Anchors[j].group.add(gltf.scene)
              Mixers[j] = new THREE.AnimationMixer(gltf.scene);
              Actions[j] = Mixers[j].clipAction(gltf.animations[0]); //첫 번째 애니메이션 실행
              Actions[j].play();

            } else if (index ===1){
              const gltf = await loadGLTF('./Models/model_2/scene.gltf');
              gltf.scene.scale.set(0.01,0.01,0.01);
              gltf.scene.rotation.set(Math.PI/2,0,0);
              gltf.scene.position.set(0.3, 1, 0);
              Anchors[j].group.add(gltf.scene)
              Mixers[j] = new THREE.AnimationMixer(gltf.scene);
              Actions[j] = Mixers[j].clipAction(gltf.animations[0]); //첫 번째 애니메이션 실행
              Actions[j].play();

            } else if (index===2){
              const gltf = await loadGLTF('./Models/model_3/scene.gltf');
              gltf.scene.scale.set(0.5,0.5,0.5);
              gltf.scene.rotation.set(Math.PI/2,0,0);
              gltf.scene.position.set(0, 0, 0);
              Anchors[j].group.add(gltf.scene)
              Mixers[j] = new THREE.AnimationMixer(gltf.scene);
              Actions[j] = Mixers[j].clipAction(gltf.animations[0]); //첫 번째 애니메이션 실행
              Actions[j].play();

            }
          }

      }


        const mixer1 = new THREE.AnimationMixer(gltf90.scene);
        const action1 = mixer1.clipAction(gltf90.animations[0]); //첫 번째 애니메이션 실행
        action1.play();
        const mixer2 = new THREE.AnimationMixer(gltf901.scene);
        const action2 = mixer2.clipAction(gltf901.animations[1]); //첫 번째 애니메이션 실행
        action2.play();
        const mixer3 = new THREE.AnimationMixer(gltf902.scene);
        const action3 = mixer3.clipAction(gltf902.animations[2]); //첫 번째 애니메이션 실행
        action3.play();

        const mixer4 = new THREE.AnimationMixer(gltf1.scene);
        const action4 = mixer4.clipAction(gltf1.animations[0]); //첫 번째 애니메이션 실행
        action4.play();

        const mixer5 = new THREE.AnimationMixer(gltf2.scene);
        const action5 = mixer5.clipAction(gltf2.animations[0]); //첫 번째 애니메이션 실행
        action5.play();

        const mixer6 = new THREE.AnimationMixer(gltf3.scene);
        const action6 = mixer6.clipAction(gltf3.animations[0]); //첫 번째 애니메이션 실행
        action6.play();
        
        const clock = new THREE.Clock();

        //Anchor에 오디오 추가
        for (let i = 0; i < Anchors.length; i++) {
            Anchors[i].group.add(Audios[i]);
            Audios[i].setRefDistance(100000);
            Audios[i].setBuffer(AudioClips[i]);
            Audios[i].setLoop(true);
        }
        Anchor90.group.add(audioF);
        audioF.setRefDistance(10000);
        audioF.setBuffer(audioClipF);
        audioF.setLoop(true);

        //이미지 인식 여부에 따라 오디오 재생   
        for (let i = 0; i < Anchors.length; i++) {
          if (i===25) {

          }
          else{
            Anchors[i].onTargetFound = () => {
              Audios[i].play();
            }
          Anchors[i].onTargetLost = () => {
              Audios[i].pause();
            }
          }
        }
          Anchor90.onTargetFound = () => {
            audio90.play();
            audioF.play();
          }
          Anchor90.onTargetLost = () => {
            audio90.pause();
            audioF.pause();
          }
            

        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
          const delta = clock.getDelta();  
          renderer.render(scene, camera);
          mixer1.update(delta); //애니메이션 매 프레임마다 불러오기
          mixer2.update(delta); //애니메이션 매 프레임마다 불러오기
          mixer3.update(delta); //애니메이션 매 프레임마다 불러오기
          mixer4.update(delta); //애니메이션 매 프레임마다 불러오기
          mixer5.update(delta); //애니메이션 매 프레임마다 불러오기
          mixer6.update(delta); //애니메이션 매 프레임마다 불러오기
          for (let j = 0; j < Mixers.length; j++) {
            Mixers[j].update(delta);}

        });
    }
    start();
});