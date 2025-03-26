const video = document.getElementById("camera");
const button = document.getElementById("capturar");
const button_pb = document.getElementById("foto_pb");
const canva = document.getElementById("foto");
const ligar_camera = document.getElementById("ligar_camera");
const desligar_camera = document.getElementById("desligar_camera");

let mediaStream = null;  // Variável para armazenar o fluxo de mídia da câmera
let fotoIndex = 0;  // Índice para controlar em qual foto do álbum estamos

// Função para ligar a câmera
async function startCamera() {
    try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = mediaStream;
        video.style.display = 'block';  // Garante que o vídeo seja exibido quando a câmera for ligada
    } catch (erro) {
        alert('Erro ao abrir a câmera');
    }
}

// Função para desligar a câmera (parar a captura e esconder o vídeo)
function stopCamera() {
    if (mediaStream) {
        const tracks = mediaStream.getTracks();
        tracks.forEach(track => track.stop());  
        video.srcObject = null;  
        video.style.display = 'none';  
    }
}


function adicionarFoto(foto) {
    if (fotoIndex < 8) {  
        const fotoElemento = document.getElementById(`foto${fotoIndex + 1}`);
        fotoElemento.src = foto;
        fotoElemento.style.display = 'block';  
        fotoIndex++;  
    }
}

button.addEventListener('click', function() {
    const contexto = canva.getContext('2d');
    canva.width = video.videoWidth;
    canva.height = video.videoHeight;
    contexto.drawImage(video, 0, 0, canva.width, canva.height);
    canva.style.display = 'block';

    const fotoURL = canva.toDataURL(); 
    adicionarFoto(fotoURL);
});

// Capturar foto com filtro PB
button_pb.addEventListener('click', function() {
    const contexto = canva.getContext('2d');
    canva.width = video.videoWidth;
    canva.height = video.videoHeight;
    contexto.filter = 'grayscale(100%)';
    contexto.drawImage(video, 0, 0, canva.width, canva.height);
    canva.style.display = 'block';

    // Adicionar a foto ao álbum
    const fotoURL = canva.toDataURL(); // Converte a foto em uma URL de imagem
    adicionarFoto(fotoURL);
});

// Ligar a câmera
ligar_camera.addEventListener('click', function() {
    startCamera();
});

// Desligar a câmera (esconder a exibição e parar a captura)
desligar_camera.addEventListener('click', function() {
    stopCamera();
});
