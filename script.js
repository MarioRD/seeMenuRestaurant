let video;
let canvas;
let detector;
let scene, camera, renderer;
let cube;
let objectDetected = false;

document.getElementById('startButton').addEventListener('click', async () => {
    console.log('Botón presionado');
    document.getElementById('startButton').style.display = 'none';
    startCamera();
});

function startCamera() {
    console.log('Iniciando cámara');
    // Crear canvas p5.js
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    video = createCapture({ video: { facingMode: { exact: 'environment' } } });
    video.size(windowWidth, windowHeight);
    video.hide();

    // Configurar detección de formas
    console.log('Configurando detector');
    detector = ml5.objectDetector('cocossd', modelReady);

    // Configurar three.js
    setupThreeJS();
}

function draw() {
    if (video) {
        background(220);
        image(video, 0, 0, windowWidth, windowHeight);
        console.log('Dibujando video');

        // Mostrar objeto 3D si se detecta la forma
        if (objectDetected) {
            console.log('Objeto detectado');
            show3DObject();
        }
    }
}

function setupThreeJS() {
    console.log('Configurando three.js');
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
    console.log('Mostrando objeto 3D');
    cube.visible = true;
    document.getElementById('message').style.display = 'block';
}

function modelReady() {
    console.log('Modelo listo');
    detect();
}

function detect() {
    console.log('Detectando objetos');
    detector.detect(video, function (err, results) {
        if (err) {
            console.error(err);
            return;
        }

        // Procesar resultados
        for (let result of results) {
            console.log('Objeto detectado:', result.label);
            if (result.label === 'M') { // Aquí puedes cambiar por la etiqueta de la forma que estás buscando
                objectDetected = true;
                document.getElementById('message').style.display = 'block';
            }
        }

        // Continuar detección
        detect();
    });
}
