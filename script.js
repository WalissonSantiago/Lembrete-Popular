function adicionar30Dias(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtém a data inserida pelo usuário
    const inputData = document.getElementById('data_retirada').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;

    if (inputData) {
        // Cria um objeto de data a partir da data inserida
        const dataInicial = new Date(inputData);

        // Adiciona 30 dias
        const novaData = new Date(dataInicial);
        novaData.setDate(novaData.getDate() + 31);

        // Formata a nova data para o formato DD/MM/AAAA
        const diaFinal = String(novaData.getDate()).padStart(2, '0');
        const mesFinal = String(novaData.getMonth() + 1).padStart(2, '0'); // Ajusta o mês para 1-12
        const anoFinal = novaData.getFullYear();

        // Exibe o resultado na seção
        const resultado = document.getElementById('data');
        resultado.textContent = `Sua próxima retirada será: ${diaFinal}/${mesFinal}/${anoFinal}`;

        // Mostra a seção de resultado
        const resultadoSection = document.querySelector('.resultado');
        resultadoSection.classList.remove('hide');

        // Envio de dados para o servidor
        enviarDados(telefone, email, `${diaFinal}/${mesFinal}/${anoFinal}`);
    } else {
        alert("Por favor, insira uma data válida.");
    }
}

// Função para enviar dados ao servidor
function enviarDados(telefone, email, data) {
    const dados = {
        telefone: telefone,
        email: email,
        data: data
    };

    // Aqui você deve fazer uma requisição AJAX ou fetch para o seu servidor
    fetch('URL_DO_SEU_SERVIDOR', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
}
