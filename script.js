document.getElementById('openCameraButton').addEventListener('click', async () => {
    const video = document.getElementById('video');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.style.display = 'block';
    } catch (error) {
        console.error('Error accessing the camera:', error);
        alert('No se pudo acceder a la cámara. Por favor, verifica los permisos y vuelve a intentarlo.');
    }
});
