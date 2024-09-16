const form = document.getElementById('uploadForm');
const resultDiv = document.getElementById('result');
const voltarButton = document.getElementById('voltar');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        resultDiv.style.display = 'block';
        resultDiv.querySelector('#result-text').textContent = data;
        form.style.display = 'none';
    })
    .catch(error => {
        console.error('Erro ao enviar os arquivos:', error);
        resultDiv.style.display = 'block';
        resultDiv.querySelector('#result-text').textContent = 'Ocorreu um erro ao enviar os arquivos.';
    });
});

voltarButton.addEventListener('click', () => {
    resultDiv.style.display = 'none';
    form.style.display = 'block';
});
