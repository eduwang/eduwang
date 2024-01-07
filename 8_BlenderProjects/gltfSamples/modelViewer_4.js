import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const container = document.getElementById('model-content')
container.appendChild(renderer.domElement);
renderer.setSize(container.clientWidth, container.clientHeight);
//document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.set(4,5,11);
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

const groundGeometry = new THREE.PlaneGeometry(20,20,32,32);
groundGeometry.rotateX(-Math.PI/2);
const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x555555,
    side: THREE.DoubleSide
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
//groundMesh.castShadow = false; //shadow 설정 원하는 경우
//groundMesh.receiveShadow = true; //shadow 설정 원하는 경우
scene.add(groundMesh);

const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
scene.add(light);

//spotLight을 사용하길 원하면 아래 코드로
// const spotLight = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
// spotLight.position.set(0, 25, 0);
// spotLight.castShadow = true;
// spotLight.shadow.bias = -0.0001;
// scene.add(spotLight);

const myModels = {
    '4-f': './models/00_4Triangle.gltf',
    '8-f': './models/00_8Triangle.gltf',
    '12-f': './models/00_12Pentagon.gltf',
    '20-f': './models/00_20Triangle.gltf'
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
let action;

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
            const action = mixer.clipAction(gltf.animations[0]); //첫 번째 애니메이션 실행
            action.play();
            action.setLoop(THREE.LoopRepeat); // Set the animation to play only once
            const targetTime = gltf.animations[0].duration;
        }

        return function getAction(){
            return action;
        }
        
    });

}

loadModel(myModels[currentModel]);

const clock = new THREE.Clock();

//button operations
const foldButton = document.querySelector("#fold");
const unfoldButton = document.querySelector("#unfold");
const pauseButton = document.querySelector("#pause");

const getActionFromLoadModel = loadModel(myModels[currentModel]); // Call loadModel and get the function

foldButton.addEventListener('click', ()=>{
    const currentAction = getActionFromLoadModel;
    //console.log("fold button clicked")
    currentAction.play()
    //unfoldButton.style.display = "inline";
    //foldButton.style.display = "none";
    mixer.timeScale = 1;
}); 

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (mixer) {
        mixer.update(delta);
    } else{
        //console.log("noMixer")
    }
    controls.update();
    renderer.render(scene, camera);
}

animate();
