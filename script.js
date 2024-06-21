document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('closeButton').style.display = 'block';
    startCamera();
});

document.getElementById('closeButton').addEventListener('click', () => {
    stopCamera();
});

function startCamera() {
    console.log('Iniciando cámara');
    document.getElementById('arScene').style.display = 'block';

    // Configurar la detección de marcadores
    const marker = document.getElementById('marker');
    marker.addEventListener('markerFound', () => {
        console.log('Marcador detectado');
        document.getElementById('message').style.display = 'block';
        startAnimation();
    });
    marker.addEventListener('markerLost', () => {
        console.log('Marcador perdido');
        document.getElementById('message').style.display = 'none';
        stopAnimation();
    });
}

function stopCamera() {
    console.log('Deteniendo cámara');
    document.getElementById('arScene').style.display = 'none';
    document.getElementById('closeButton').style.display = 'none';
    document.getElementById('message').style.display = 'none';
    document.getElementById('startButton').style.display = 'block';
    stopAnimation();
}

let animationFrame;

function startAnimation() {
    const model = document.getElementById('animatedModel');
    const animate = () => {
        model.object3D.rotation.x += 0.01;
        model.object3D.rotation.y += 0.01;
        animationFrame = requestAnimationFrame(animate);
    };
    animate();
}

function stopAnimation() {
    cancelAnimationFrame(animationFrame);
}
