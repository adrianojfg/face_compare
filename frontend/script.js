const form = document.getElementById('uploadForm');
const resultDiv = document.getElementById('result');
const voltarButton = document.getElementById('voltar');
const submitButton = document.getElementById('submitButton');
const loadingSpan = document.getElementById('loading');

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
        jsonData = JSON.parse(data);
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
