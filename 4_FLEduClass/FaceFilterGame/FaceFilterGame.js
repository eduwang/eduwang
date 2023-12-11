import { loadTexture } from "../../applications/libs/loader.js"
import * as THREE from 'three';
import { MindARThree } from 'mindar-face-three';


const mindarThree = new MindARThree({
    container: document.querySelector("#container"),
    });

//Flipping image of front camera
container.style.webkitTransform = 'scaleX(-1)';
container.style.transform = 'scaleX(-1)';

const {renderer, scene, camera} = mindarThree;

//lights
const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1);
scene.add(light)

//adding face mesh - 시작: blank mesh 넣어두기
const faceMesh1 = mindarThree.addFaceMesh();
const faceMesh2 = mindarThree.addFaceMesh();
const faceMesh3 = mindarThree.addFaceMesh();
const faceMesh4 = mindarThree.addFaceMesh();
const faceMesh5 = mindarThree.addFaceMesh();
const faceMesh6 = mindarThree.addFaceMesh();
const faceMesh6_2 = mindarThree.addFaceMesh();

const blankTexture = await loadTexture("./0_blank.png")

faceMesh1.material.map = blankTexture;
faceMesh1.material.transparent = true;
faceMesh1.material.needsUpdate = true;

faceMesh2.material.map = blankTexture;
faceMesh2.material.transparent = true;
faceMesh2.material.needsUpdate = true;

faceMesh3.material.map = blankTexture;
faceMesh3.material.transparent = true;
faceMesh3.material.needsUpdate = true;

faceMesh4.material.map = blankTexture;
faceMesh4.material.transparent = true;
faceMesh4.material.needsUpdate = true;

faceMesh5.material.map = blankTexture;
faceMesh5.material.transparent = true;
faceMesh5.material.needsUpdate = true;

faceMesh6.material.map = blankTexture;
faceMesh6.material.transparent = true;
faceMesh6.material.needsUpdate = true;

faceMesh6_2.material.map = blankTexture;
faceMesh6_2.material.transparent = true;
faceMesh6_2.material.needsUpdate = true;

scene.add(faceMesh1);
scene.add(faceMesh2);
scene.add(faceMesh3);
scene.add(faceMesh4);
scene.add(faceMesh5);
scene.add(faceMesh6);
scene.add(faceMesh6_2);

//제작한 faceFilter 추가하기
const texture1_1 = await loadTexture("./Filters/face_color_1.png")
const texture1_2 = await loadTexture("./Filters/face_color_2.png")
const texture2_1 = await loadTexture("./Filters/face_expression_1.png")
const texture2_2 = await loadTexture("./Filters/face_expression_2.png")
const texture2_3 = await loadTexture("./Filters/face_expression_3.png")
const texture3_1 = await loadTexture("./Filters/dot_1.png")
const texture3_2 = await loadTexture("./Filters/dot_2.png")
const texture3_3 = await loadTexture("./Filters/dot_3.png")
const texture3_4 = await loadTexture("./Filters/dot_4.png")
const texture4_1 = await loadTexture("./Filters/glass_1.png")
const texture4_2 = await loadTexture("./Filters/glass_2.png")
const texture4_3 = await loadTexture("./Filters/glass_3.png")
const texture5_1 = await loadTexture("./Filters/eye_color_1.png")
const texture5_2 = await loadTexture("./Filters/eye_color_2.png")
const texture5_3 = await loadTexture("./Filters/eye_color_3.png")
const texture5_4 = await loadTexture("./Filters/eye_color_4.png")
const texture6_1 = await loadTexture("./Filters/on_off_1.png")
const texture6_2 = await loadTexture("./Filters/on_off_2.png")


//start function
const start = async() => {
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
        });
    }

const startButton = document.querySelector("#startButton");
const stopButton = document.querySelector("#stopButton");
startButton.addEventListener("click", () => {
    start();
});
stopButton.addEventListener("click", () => {
    mindarThree.stop();
    mindarThree.renderer.setAnimationLoop(null);
});

// const changeFilter = document.querySelector("#changeButton")
// var numofClick = 0;
// changeFilter.addEventListener("click",()=>{
//     numofClick++
//     console.log(numofClick)
//     if (numofClick%3===1){
//         faceMesh1.material.map = texture2;
//     } else if (numofClick%3===2){
//         faceMesh1.material.map = texture3;
//     } else{
//         faceMesh1.material.map = texture;
//     }
// });

//Hidden Button Showing Code
const category1 = document.querySelector('#categoryButton1')
const category2 = document.querySelector('#categoryButton2')
const category3 = document.querySelector('#categoryButton3')
const category4 = document.querySelector('#categoryButton4')
const category5 = document.querySelector('#categoryButton5')
const category6 = document.querySelector('#categoryButton6')

const changeButton1 = document.querySelector('#changeButton1')
const changeButton2 = document.querySelector('#changeButton2')
const changeButton3 = document.querySelector('#changeButton3')
const changeButton4 = document.querySelector('#changeButton4')
const changeButton5 = document.querySelector('#changeButton5')
const changeButton6 = document.querySelector('#changeButton6')
const changeButton7 = document.querySelector('#changeButton7')


category1.addEventListener("click",()=>{
    changeButton1.style.display = "inline-block";
    changeButton2.style.display = "none";
    changeButton3.style.display = "none";
    changeButton4.style.display = "none";
    changeButton5.style.display = "none";
    changeButton6.style.display = "none";
    changeButton7.style.display = "none";
})
category2.addEventListener("click",()=>{
    changeButton1.style.display = "none";
    changeButton2.style.display = "inline-block";
    changeButton3.style.display = "none";
    changeButton4.style.display = "none";
    changeButton5.style.display = "none";
    changeButton6.style.display = "none";
    changeButton7.style.display = "none";
})
category3.addEventListener("click",()=>{
    changeButton1.style.display = "none";
    changeButton2.style.display = "none";
    changeButton3.style.display = "inline-block";
    changeButton4.style.display = "none";
    changeButton5.style.display = "none";
    changeButton6.style.display = "none";
    changeButton7.style.display = "none";
})
category4.addEventListener("click",()=>{
    changeButton1.style.display = "none";
    changeButton2.style.display = "none";
    changeButton3.style.display = "none";
    changeButton4.style.display = "inline-block";
    changeButton5.style.display = "none";
    changeButton6.style.display = "none";
    changeButton7.style.display = "none";
})
category5.addEventListener("click",()=>{
    changeButton1.style.display = "none";
    changeButton2.style.display = "none";
    changeButton3.style.display = "none";
    changeButton4.style.display = "none";
    changeButton5.style.display = "inline-block";
    changeButton6.style.display = "none";
    changeButton7.style.display = "none";
})
category6.addEventListener("click",()=>{
    changeButton1.style.display = "none";
    changeButton2.style.display = "none";
    changeButton3.style.display = "none";
    changeButton4.style.display = "none";
    changeButton5.style.display = "none";
    changeButton6.style.display = "inline-block";
    changeButton7.style.display = "inline-block";
})
// category7.addEventListener("click",()=>{
//     changeButton1.style.display = "none";
//     changeButton2.style.display = "none";
//     changeButton3.style.display = "none";
//     changeButton4.style.display = "none";
//     changeButton5.style.display = "none";
//     changeButton6.style.display = "none";
//     changeButton7.style.display = "inline-block";
// })

//changeFunction - category 1
var numofClickCat1 = 0;
changeButton1.addEventListener("click",()=>{
    numofClickCat1++
    if (numofClickCat1%3===1){
        faceMesh1.material.map = texture1_1;
    } else if (numofClickCat1%3===2){
        faceMesh1.material.map = texture1_2;
    } else{
        faceMesh1.material.map = blankTexture;
    }
});

//changeFunction - category 2
var numofClickCat2 = 0;
changeButton2.addEventListener("click",()=>{
    numofClickCat2++
    if (numofClickCat2%4===1){
        faceMesh2.material.map = texture2_1;
    } else if (numofClickCat2%4===2){
        faceMesh2.material.map = texture2_2;
    } else if (numofClickCat2%4===3){
        faceMesh2.material.map = texture2_3
    }
    else{
        faceMesh2.material.map = blankTexture;
    }
});

//changeFunction - category 3
var numofClickCat3 = 0;
changeButton3.addEventListener("click",()=>{
    numofClickCat3++
    if (numofClickCat3%5===1){
        faceMesh3.material.map = texture3_1;
    } else if (numofClickCat3%5===2){
        faceMesh3.material.map = texture3_2;
    } else if (numofClickCat3%5===3){
        faceMesh3.material.map = texture3_3
    } else if (numofClickCat3%5===4){
        faceMesh3.material.map = texture3_4
    }
    else{
        faceMesh3.material.map = blankTexture;
    }
});

//changeFunction - category 4
var numofClickCat4 = 0;
changeButton4.addEventListener("click",()=>{
    numofClickCat4++
    if (numofClickCat4%4===1){
        faceMesh4.material.map = texture4_1;
    } else if (numofClickCat4%4===2){
        faceMesh4.material.map = texture4_2;
    } else if (numofClickCat4%4===3){
        faceMesh4.material.map = texture4_3
    }
    else{
        faceMesh4.material.map = blankTexture;
    }
});

//changeFunction - category 5
var numofClickCat5 = 0;
changeButton5.addEventListener("click",()=>{
    numofClickCat5++
    if (numofClickCat5%5===1){
        faceMesh5.material.map = texture5_1;
    } else if (numofClickCat5%5===2){
        faceMesh5.material.map = texture5_2;
    } else if (numofClickCat5%5===3){
        faceMesh5.material.map = texture5_3
    } else if (numofClickCat5%5===4){
        faceMesh5.material.map = texture5_4
    }
    else{
        faceMesh5.material.map = blankTexture;
    }
});

//changeFunction - category 6-1
var numofClickCat6_1 = 0;
changeButton6.addEventListener("click",()=>{
    numofClickCat6_1++
    if (numofClickCat6_1%2===1){
        faceMesh6.material.map = texture6_1;
    } else{
        faceMesh6.material.map = blankTexture;
    }
});

//changeFunction - category 6-2
var numofClickCat6_2 = 0;
changeButton7.addEventListener("click",()=>{
    numofClickCat6_2++
    if (numofClickCat6_2%2===1){
        faceMesh6_2.material.map = texture6_2;
    } else{
        faceMesh6_2.material.map = blankTexture;
    }
});