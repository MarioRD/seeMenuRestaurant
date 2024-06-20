let video;
let canvas;
let detector;
let scene, camera, renderer;
let cube;
let objectDetected = false;

document.getElementById('startButton').addEventListener('click', async () => {
    document.getElementById('startButton').style.display = 'none';
    startCamera();
});

function startCamera() {
    // Crear canvas p5.js
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    video = createCapture({ video: { facingMode: { exact: 'environment' } } });
    video.size(windowWidth, windowHeight);
    video.hide();

    // Configurar detección de formas
    detector = ml5.objectDetector('cocossd', modelReady);

    // Configurar three.js
    setupThreeJS();
}

function draw() {
    if (video) {
        background(220);
        image(video, 0, 0, windowWidth, windowHeight);

        // Mostrar objeto 3D si se detecta la forma
        if (objectDetected) {
            show3DObject();
        }
    }
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

function modelReady() {
    console.log('Modelo listo');
    detect();
}

function detect() {
    detector.detect(video, function (err, results) {
        if (err) {
            console.error(err);
            return;
        }

        // Procesar resultados
        for (let result of results) {
            if (result.label === 'person') { // Aquí puedes cambiar por la etiqueta de la forma que estás buscando
                objectDetected = true;
            }
        }

        // Continuar detección
        detect();
    });
}
