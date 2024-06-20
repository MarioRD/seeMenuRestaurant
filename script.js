document.getElementById('openCameraButton').addEventListener('click', async () => {
    const video = document.getElementById('video');

    try {
        const constraints = {
            video: {
                facingMode: { exact: 'environment' }
            }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        video.style.display = 'block';
    } catch (error) {
        console.error('Error accessing the camera:', error);
        alert('No se pudo acceder a la cámara. Por favor, verifica los permisos en la configuración de tu navegador y vuelve a intentarlo.');
    }
});

