import * as THREE from '../../applications/libs/three.js-r132/build/three.module.js';
import {ARButton} from '../../applications/libs/three.js-r132/examples/jsm/webxr/ARButton.js';

document.addEventListener('DOMContentLoaded', () => {
  const initialize = async() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const reticleGeometry = new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI/2);
    const reticleMaterial = new THREE.MeshBasicMaterial();
    const reticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);

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
      mesh.position.setFromMatrixPosition(reticle.matrix);
      mesh.scale.y = Math.random()*2+1;
      scene.add(mesh);
    })

    renderer.xr.addEventListener("sessionstart", async ()=>{
      const session = renderer.xr.getSession();

      const viewerReferenceSpace = await session.requestReferenceSpace("viewer");
      const hitTestSource = await session.requestHitTestSource({space: viewerReferenceSpace});

      renderer.setAnimationLoop((timestamp, frame) => {
        if (!frame) return;

        const hitTestResults = frame.getHitTestResults(hitTestSource);

        if (hitTestResults.length) {
          const hit = hitTestResults[0];
          const referenceSpace = renderer.xr.getReferenceSpace(); // ARButton requested 'local' reference space
          const hitPose = hit.getPose(referenceSpace);

          reticle.visible = true;
          reticle.matrix.fromArray(hitPose.transform.matrix);
        } else {
          reticle.visible = false;
        }

        renderer.render(scene, camera);
      });

    });
    renderer.xr.addEventListener("sessionend", async ()=>{

    });

    const arButton = ARButton.createButton(renderer, {requiredFeatures:['hit-test'], optionalFeatures: ['dom-overlay'], domOverlay: {root: document.body}});
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(arButton);
  }

  initialize();
});
