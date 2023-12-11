import * as faceapi from '../../applications/libs/faceapi/face-api.esm.js';
import {loadTexture} from "../../applications/libs/loader.js";
import {MindARThree} from 'mindar-face-three';
import * as THREE from 'three';

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {

    const optionsTinyFace = new faceapi.TinyFaceDetectorOptions({ inputSize: 128, scoreThreshold : 0.3 }) ;
    const modelPath = '../../applications/libs/faceapi/model';
    await faceapi.nets.tinyFaceDetector.load(modelPath);
    await faceapi.nets.faceLandmark68Net.load(modelPath);
    await faceapi.nets.faceExpressionNet.load(modelPath);

    // initialize MindAR 
    const mindarThree = new MindARThree({
      container: document.body
    });
    const {renderer, scene, camera} = mindarThree;
    const textures = {};
    textures['happy'] = await loadTexture('../../applications/assets/openmoji/1F600.png');
    textures['angry'] = await loadTexture('../../applications/assets/openmoji/1F621.png');
    textures['sad'] = await loadTexture('../../applications/assets/openmoji/1F625.png');
    textures['neutral'] = await loadTexture('../../applications/assets/openmoji/1F610.png');

    const geometry = new THREE.PlaneGeometry(0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({map: textures['neutral'], transparent: true});
    const plane = new THREE.Mesh(geometry, material);

    // create anchor
    const anchor = mindarThree.addAnchor(10);
    anchor.group.add(plane);

    // start AR
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    const video = mindarThree.video;

    const expressions = ['happy', 'angry', 'sad', 'neutral'];
    let lastExpression = 'neutral';
    const detect = async () => {
      const results = await faceapi.detectSingleFace(video, optionsTinyFace).withFaceLandmarks().withFaceExpressions();
      if (results && results.expressions) {
        let newExpression = 'neutral';
        for (let i = 0; i < expressions.length; i++) {
        if (results.expressions[expressions[i]] > 0.5) {
            newExpression = expressions[i];
        }
        }
        if (newExpression !== lastExpression) {
            material.map = textures[newExpression];
            material.needsUpdate = true;
        }
        lastExpression = newExpression;
      }
      window.requestAnimationFrame(detect);
    }
    window.requestAnimationFrame(detect);
    
  }
  start();
});
