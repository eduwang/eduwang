import {loadGLTF, loadTexture} from "../../applications/libs/loader.js"
const THREE = window.MINDAR.FACE.THREE;

const capture = (mindarThree) => {
    const {video, renderer, scene, camera} = mindarThree;
    const renderCanvas = renderer.domElement;

    //output canvas
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = renderCanvas.width;
    canvas.height = renderCanvas.height;

    const sx = (video.clientWidth - renderCanvas.clientWidth) /2 * video.videoWidth/video.clientWidth;
    const sy = (video.clientHeight - renderCanvas.clientHeight) /2 * video.videoHeight/video.clientHeight;
    const sw = video.videoWidth - sx*2;
    const sh = video.videoHeight - sy*2;

    context.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

    renderer.preserveDrawingBuffer = true;
    renderer.render(scene, camera);
    context.drawImage(renderCanvas, 0, 0, canvas.width, canvas.height);
    renderer.preserveDrawingBuffer = false;

    /* 기존에 이미지를 저장했던 방식
    const link = document.createElement("a");
    link.download = 'photo.png';
    link.href = canvas.toDataURL("image/png");
    link.click();
    */

    //data를 return 하는 방식으로 바뀜
    const data = canvas.toDataURL("image/png");
    return data;
}

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {
        // initialize MindAR 
        const mindarThree = new window.MINDAR.FACE.MindARThree({
            container: document.body,
        });
        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1);
        scene.add(light)

        const faceMesh = mindarThree.addFaceMesh();
        const texture = await loadTexture("./FaceMesh_Sample6.png")
        faceMesh.material.map = texture;
        faceMesh.material.transparent = true;
        faceMesh.material.needsUpdate = true;

        scene.add(faceMesh);

        const previewImage = document.querySelector("#preview-image");
        const previewClose = document.querySelector("#preview-close");
        const preview = document.querySelector("#preview");
        const previewShare = document.querySelector("#preview-share");
    
        document.querySelector("#capture").addEventListener("click", () => {
          const data = capture(mindarThree);
          preview.style.visibility = "visible";
          previewImage.src = data;
        });
    
        previewClose.addEventListener("click", () => {
          preview.style.visibility = "hidden";
        });
    
        previewShare.addEventListener("click", () => {
          const canvas = document.createElement('canvas');
          canvas.width = previewImage.width;
          canvas.height = previewImage.height;
          const context = canvas.getContext('2d');
          context.drawImage(previewImage, 0, 0, canvas.width, canvas.height);
    
          canvas.toBlob((blob) => {
        const file = new File([blob], "photo.png", {type: "image/png"});
        const files = [file];
        if (navigator.canShare && navigator.canShare({files})) {
          navigator.share({
            files: files, //이 부분을 url 설정으로 universal하게 가져갈 수 있음. web share api를 쓰는 경우!
            title: 'AR Photo',
          })
        } else {
          const link = document.createElement('a');
          link.download = 'photo.png';
          link.href = previewImage.src;
          link.click();
        }
          });
        });
    
        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            renderer.render(scene, camera);
        });
    }
    start();
});