let video;
let canvas;
let scene, camera, renderer;
let cube;
let objectDetected = false;

document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('closeButton').style.display = 'block';
    startCamera();
});

document.getElementById('closeButton').addEventListener('click', () => {
    stopCamera();
});

function startCamera() {
    // Crear canvas p5.js
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    video = createCapture({ video: { facingMode: { exact: 'environment' } } });
    video.size(windowWidth, windowHeight);
    video.hide();

    // Configurar three.js
    setupThreeJS();
}

function stopCamera() {
    if (video) {
        video.stop();
        video.remove();
    }
    if (canvas) {
        canvas.remove();
    }
    document.getElementById('closeButton').style.display = 'none';
    document.getElementById('message').style.display = 'none';
    document.getElementById('startButton').style.display = 'block';
    objectDetected = false;
}

function draw() {
    if (video && video.loadedmetadata) {
        background(220);
        image(video, 0, 0, windowWidth, windowHeight);

        detectM();
    }
}

function detectM() {
    loadPixels();
    let totalPixels = 0;
    let matchedPixels = 0;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let index = (x + y * width) * 4;
            let r = pixels[index];
            let g = pixels[index + 1];
            let b = pixels[index + 2];

            // Umbral para detectar áreas brillantes
            if (r > 200 && g > 200 && b > 200) {
                totalPixels++;
                // Verificar si el patrón se asemeja a una "M"
                if (isMShape(x, y)) {
                    matchedPixels++;
                }
            }
        }
    }

    // Umbral para decidir si se ha detectado una "M"
    if (matchedPixels / totalPixels > 0.01) {
        objectDetected = true;
        document.getElementById('message').style.display = 'block';
        show3DObject();
    }
}

function isMShape(x, y) {
    // Implementar una verificación simple para el patrón de una "M"
    return true; // Lógica de marcador de posición
}

function setupThreeJS() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    document.getElementById('three-container').appendChild(renderer.domElement);

    let geometry = new THREE.BoxGeometry();
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Animar objeto 3D
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

function show3DObject() {
    cube.visible = true;
}
