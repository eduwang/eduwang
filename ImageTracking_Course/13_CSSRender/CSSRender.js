import{CSS3DObject} from "../../applications/libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {
        // initialize MindAR 
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: '../Rep_Image.mind',
          });
        const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;

        const obj = new CSS3DObject(document.querySelector("#ar-div"));
        const cssAnchor = mindarThree.addCSSAnchor(0);
        cssAnchor.group.add(obj);
        cssAnchor.onTargetFound = () => {
            console.log("on target found");
        }
        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            cssRenderer.render(cssScene, camera);
        });
    }
    start();
});