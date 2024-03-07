let model, video, canvas, context;

export function setupHandtracking() {
    video = document.createElement('video');
    video.width = window.innerWidth;
    video.height = window.innerHeight;
    document.body.appendChild(video);

    canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    context = canvas.getContext('2d');

    handTrack.startVideo(video).then((status) => {
        if (status) {
            navigator.mediaDevices.getUserMedia({ video: {} }).then((stream) => {
                video.srcObject = stream;
            });
        }
    });

    model = handTrack.load();
}

export function updateHandtracking(cube) {
    handTrack.detect(model, video).then((predictions) => {
        if (predictions.length > 0) {
            const hand = predictions[0].bbox;

            // Map hand position to Three.js scene
            const x = hand[0] + hand[2] / 2 - window.innerWidth / 2;
            const y = -(hand[1] + hand[3] / 2 - window.innerHeight / 2);

            cube.position.set(x / 100, y / 100, 0); // Adjust scale as needed
        }
    });
}
