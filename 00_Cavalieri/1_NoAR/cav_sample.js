import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setClearColor(0xeeeeee);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const container = document.getElementById('model-content')
container.appendChild(renderer.domElement);
renderer.setSize(container.clientWidth, container.clientHeight);
//document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.set(20,2,1);
camera.lookAt(0,0,0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = true;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0,1,0);
controls.update();



const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
scene.add(light);

const myModels = {
    '4-f': '../models/0_volume_of_sphere_CompleteVersion.gltf',
}

let currentModel = '4-f';

//model-selector button
const modelSelector = document.querySelectorAll('.model-selector');
modelSelector.forEach(button =>{
    button.addEventListener('click',()=>{
        currentModel = button.value;
        
        scene.remove(scene.getObjectByName('currentModel'));
    
        loadModel(myModels[currentModel]);
    });
})


let mixer; // Declare the mixer variable at a higher scope
let action; // Declare the action variable at a higher scope
let targetTime; 

const loader = new GLTFLoader();

function loadModel(modelPath) {
    loader.load(modelPath,(gltf)=>{
        const previousModel = scene.getObjectByName('currentModel');
        if (previousModel){
            scene.remove(previousModel);
        }

        const mesh = gltf.scene;
        mesh.name = 'currentModel'
    
        mesh.traverse((child)=>{
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    
        mesh.position.set(0,1.05,-1);
        scene.add(mesh);
        //gltf.animations
        if (gltf.animations && gltf.animations.length >0){
            mixer = new THREE.AnimationMixer(gltf.scene);
            action = mixer.clipAction(gltf.animations[0]); //첫 번째 애니메이션 실행
            //action.play();
            action.setLoop(THREE.LoopRepeat); // Set the animation to play only once
            targetTime = gltf.animations[0].duration;
        }        
    });

}

loadModel(myModels[currentModel]);

const clock = new THREE.Clock();

//button operations
// const foldButton = document.querySelector("#fold");
// const unfoldButton = document.querySelector("#unfold");
// const pauseButton = document.querySelector("#pause");


// foldButton.addEventListener('click', ()=>{
//     action.play()
//     mixer.timeScale = -1;
// }); 
// unfoldButton.addEventListener('click', ()=>{
//     action.play()
//     mixer.timeScale = 1;
// }); 

// pauseButton.addEventListener('click', ()=>{
//     if (mixer) {
//         mixer.timeScale = 0; // Pauses the animation
//     }
// });

//Silder Control
const sliderController = document.querySelector('#slider-panel');

sliderController.addEventListener('input', () => {
    const sliderValue = parseFloat(sliderController.value);
    if (mixer) {
        mixer.setTime(sliderValue); // Set the animation time of the mixer
        mixer.update(0); // Update the mixer with a delta time of 0 to apply the new animation time
    }
    action.play();
    mixer.timeScale = 1;
});

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    controls.update();
    renderer.render(scene, camera);
}

const initButton = document.querySelector('#init');

setTimeout(() => {
    initButton.style.display = 'block'; // Display the button by setting its CSS display property to 'block'
}, 1500);
initButton.addEventListener('click', ()=>{
    animate();
    initButton.style.display = "none";
    sliderController.style.display = "block";
    sliderController.min = 0.02;
    sliderController.max = targetTime/2;
})

//animate();


