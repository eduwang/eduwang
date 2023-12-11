const THREE = window.MINDAR.IMAGE.THREE;
import {loadGLTF} from '../../applications/libs/loader.js';


document.addEventListener('DOMContentLoaded',()=>{
    const start = async() => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "./Rep_Image.mind",
        })
        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        const mario = await loadGLTF("./gltf_mario3/scene.gltf");
        mario.scene.scale.set(1,1,1);
        mario.scene.position.set(0,-0.2,0);

        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(mario.scene);

        const mixer = new THREE.AnimationMixer(mario.scene);

        const idleAction = mixer.clipAction(mario.animations[0]);
        const jumpAction = mixer.clipAction(mario.animations[1]);
        const runAction = mixer.clipAction(mario.animations[2]);
        const run2Action = mixer.clipAction(mario.animations[3]);
        const walkAction = mixer.clipAction(mario.animations[4]);

        jumpAction.loop = THREE.LoopOnce;
        runAction.loop = THREE.LoopOnce;
        run2Action.loop = THREE.LoopOnce;
        walkAction.loop = THREE.LoopOnce;

        const model = await handpose.load();

        //waveGesture가 입력되면 walk
        const waveGesture = new fp.GestureDescription('wave');
        for (let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]){
            waveGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
            waveGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
        }
        
        //dieGesture가 입력되면 run
        const dieGesture = new fp.GestureDescription('die');
        for(let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
            dieGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
            dieGesture.addDirection(finger, fp.FingerDirection.HorizontalLeft, 1.0);
            dieGesture.addDirection(finger, fp.FingerDirection.HorizontalRight, 1.0);
        }

        //jumpGesture가 입력되면 jump
        const jumpGesture = new fp.GestureDescription('jump');
        jumpGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
        jumpGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
        jumpGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);
        jumpGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);
        for(let finger of [fp.Finger.Thumb, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
            jumpGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
            jumpGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
            jumpGesture.addDirection(finger, fp.FingerDirection.VerticalDown, 1.0);
        }

        const GE = new fp.GestureEstimator([
            fp.Gestures.ThumbsUpGesture,
            waveGesture,
            jumpGesture,
            dieGesture,
        ]);

        //start
        const clock = new THREE.Clock();
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            const delta = clock.getDelta();
            mixer.update(delta);
            renderer.render(scene,camera);
        })

        let activeAction = idleAction;
        activeAction.play();
        const fadeToAction = (action, duration) => {
            if (activeAction === action) return;
            activeAction = action;
            activeAction.reset().fadeIn(duration).play();
        }
        mixer.addEventListener("finished", () =>{
            fadeToAction(idleAction, 0.2);
        })

        const video = mindarThree.video;

        let skipCount = 0;
        const detect = async () => {
            if (activeAction !== idleAction){
                window.requestAnimationFrame(detect);
                return;
            }
            if (skipCount < 10){
                skipCount += 1;
                window.requestAnimationFrame(detect);
                return;
            }
            skipCount = 0;

            const predictions = await model.estimateHands(video); 
            if (predictions.length > 0) {
                const estimatedGestures = GE.estimate(predictions[0].landmarks, 7.5);
                if (estimatedGestures.gestures.length>0){
                    const best = estimatedGestures.gestures.sort((g1, g2) => g2.confidence-g1.confidence)[0];

                    if (best.name === 'thumbs_up'){
                        fadeToAction(run2Action, 0.1);
                        console.log("thumbs up!")
                    }
                    
                    if (best.name === 'wave'){
                        fadeToAction(walkAction, 3.0);
                        console.log("wave!")
                    }
                    
                    if (best.name === 'jump'){
                        fadeToAction(jumpAction, 0.5);
                        console.log("jump!")
                    }
                    
                    if (best.name === 'die'){
                        fadeToAction(runAction, 0.5);
                        console.log("die:(")
                    }
                }

            }
            window.requestAnimationFrame(detect);
        }
        window.requestAnimationFrame(detect);

    }
    start();
})