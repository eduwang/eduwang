import * as THREE from '../../applications/libs/three.js-r132/build/three.module.js';
import {ARButton} from '../../applications/libs/three.js-r132/examples/jsm/webxr/ARButton.js';

document.addEventListener('DOMContentLoaded', () => {
  const initialize = async() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const geometry = new THREE.BoxBufferGeometry(0.06, 0.06, 0.06); 
    const material = new THREE.MeshPhongMaterial({color: 0x00ff00});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -0.3);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    renderer.xr.addEventListener("sessionstart", (e) => {
      console.log("session start");
    });
    renderer.xr.addEventListener("sessionend", () => {
      console.log("session end");
    });
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    const controller = renderer.xr.getController(0); //VR에서는 컨트롤러가 따로 존재하지만, AR에서는 터치를 의미함
    scene.add(controller); //컨트롤러를 scene에 추가하면 controller의 위치를 이용할 수 있다

    // const events = document.querySelector("#events");
    controller.addEventListener("selectstart",()=>{
      // events.prepend("select start \n");      
    })
    controller.addEventListener("selectend",()=>{
      // events.prepend("select end \n");      
    })
    controller.addEventListener("select",()=>{
      const geometry = new THREE.BoxGeometry(0.06, 0.06, 0.06);
      const material = new THREE.MeshBasicMaterial({color: 0xffffff*Math.random()});
      const mesh = new THREE.Mesh(geometry, material);    
      mesh.position.applyMatrix4(controller.matrixWorld);
      mesh.quaternion.setFromRotationMatrix(controller.matrixWorld);
      scene.add(mesh);
    })

    const arButton = ARButton.createButton(renderer, {optionalFeatures: ['dom-overlay'], domOverlay: {root: document.body}});
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(arButton);
  }

  initialize();
});
