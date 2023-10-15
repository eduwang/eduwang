const THREE = window.MINDAR.FACE.THREE;

document.addEventListener('DOMContentLoaded',() => {
    const start = async () => {
        // initialize MindAR 
        const mindarThree = new window.MINDAR.FACE.MindARThree({
            container: document.getElementById('video')
        });
        const {renderer, scene, camera} = mindarThree;

        // create AR object
        const geometry = new THREE.SphereGeometry(0.1, 32, 16);
        const material = new THREE.MeshBasicMaterial({color: 0x0000ff, transparent: true, opacity: 0.5});
        const sphere = new THREE.Mesh(geometry, material);

        // create anchor
        const anchor = mindarThree.addAnchor(1); //nose에 위치하는 anchor
        anchor.group.add(sphere); //THREE.Group

        // start AR
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            renderer.render(scene, camera);
        });
    }
    start();
});