const form = document.getElementById('uploadForm');
const dropAreaFile1 = document.getElementById('drop-area-file1');
const dropAreaFile2 = document.getElementById('drop-area-file2');
const fileInput1 = document.getElementById('file1');
const fileInput2 = document.getElementById('file2');
const previewFile1 = document.getElementById('preview-file1');
const previewFile2 = document.getElementById('preview-file2');
const resultDiv = document.getElementById('result');
const voltarButton = document.getElementById('voltar');
const submitButton = document.getElementById('submitButton');
const loadingSpan = document.getElementById('loading');

// Previne o comportamento padrão de eventos de drag-and-drop
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropAreaFile1.addEventListener(eventName, preventDefaults, false);
    dropAreaFile2.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Adiciona ou remove a classe highlight
dropAreaFile1.addEventListener('dragover', () => dropAreaFile1.classList.add('highlight'), false);
dropAreaFile1.addEventListener('dragleave', () => dropAreaFile1.classList.remove('highlight'), false);
dropAreaFile2.addEventListener('dragover', () => dropAreaFile2.classList.add('highlight'), false);
dropAreaFile2.addEventListener('dragleave', () => dropAreaFile2.classList.remove('highlight'), false);

// Processa os arquivos ao soltar
dropAreaFile1.addEventListener('drop', (e) => {
    dropAreaFile1.classList.remove('highlight');
    const files = e.dataTransfer.files;

    if (files.length === 1 && files[0].type.startsWith('image/')) {
        fileInput1.files = files;
        displayImage(files[0], previewFile1);
    } else {
        alert('Por favor, solte uma imagem válida na Imagem 1.');
    }
});

dropAreaFile2.addEventListener('drop', (e) => {
    dropAreaFile2.classList.remove('highlight');
    const files = e.dataTransfer.files;

    if (files.length === 1 && files[0].type.startsWith('image/')) {
        fileInput2.files = files;
        displayImage(files[0], previewFile2);
    } else {
        alert('Por favor, solte uma imagem válida na Imagem 2.');
    }
});

// Função para exibir a imagem
function displayImage(file, imgElement) {
    const reader = new FileReader();
    reader.onload = () => {
        imgElement.src = reader.result;
        imgElement.style.display = 'block'; // Mostra a imagem
    };
    reader.readAsDataURL(file);
}

// Adiciona eventos de clique nos inputs
fileInput1.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files.length > 0) {
        displayImage(files[0], previewFile1);
    }
});

fileInput2.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files.length > 0) {
        displayImage(files[0], previewFile2);
    }
});

// Permite clicar na área para selecionar arquivos
dropAreaFile1.addEventListener('click', () => {
    fileInput1.click();
});

dropAreaFile2.addEventListener('click', () => {
    fileInput2.click();
});

// Envia o formulário
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    submitButton.disabled = true;
    loadingSpan.style.display = 'inline-block';

    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        const jsonData = JSON.parse(data);
        resultDiv.style.display = 'block';
        resultDiv.querySelector('#result-text').innerHTML = jsonData.message || `Face distance: <strong>${jsonData.face_distance}</strong>`;
        form.style.display = 'none';
        submitButton.disabled = false;
        loadingSpan.style.display = 'none';
    })
    .catch(error => {
        console.error('Erro ao enviar os arquivos:', error);
        resultDiv.style.display = 'block';
        resultDiv.querySelector('#result-text').textContent = 'Ocorreu um erro ao enviar os arquivos.';
        submitButton.disabled = false;
        loadingSpan.style.display = 'none';
    });
});

voltarButton.addEventListener('click', () => {
    resultDiv.style.display = 'none';
    form.style.display = 'block';
});
