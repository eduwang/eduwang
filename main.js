const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './applications/assets/targets/course-banner.mind'
        });
    
        const {renderer, scene, camera} = mindarThree;
    
        const geometry = new THREE.PlaneGemoetry(1,1);
        const material = new THREE.MeshBasicMaterial({color: 0x0000ff, tranparent: true, opacity: 0.5})
        
        const plane = new THREE.Mesh(geometry,material);
        
        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(plane); //THREE.Group
    
        
        await mindarThree.start();
    
        renderer.setAnimationLoop(()=>{
            renderer.render(scene, camera);
        });
    }

    start();
});