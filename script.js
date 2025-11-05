function adicionar30Dias(event) {
    event.preventDefault(); // Impede o envio do formulário

    const inputData = document.getElementById('data_retirada').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;

    if (inputData) {
        const dataInicial = new Date(inputData);
        const novaData = new Date(dataInicial);
        novaData.setDate(novaData.getDate() + 31);

        const diaFinal = String(novaData.getDate()).padStart(2, '0');
        const mesFinal = String(novaData.getMonth() + 1).padStart(2, '0');
        const anoFinal = novaData.getFullYear();

        // Atualiza o texto do resultado
        const resultado = document.getElementById('data');
        resultado.textContent = `Sua próxima retirada será: ${diaFinal}/${mesFinal}/${anoFinal}`;

        // Mostra a seção de resultado
        const resultadoSection = document.querySelector('.resultado');
        resultadoSection.classList.remove('hide');

        // rola suavemente até o resultado visível
        resultadoSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Envio de dados para o servidor (mantido como no seu código)
        enviarDados(telefone, email, `${diaFinal}/${mesFinal}/${anoFinal}`);
    } else {
        alert("Por favor, insira uma data válida.");
    }
}

// Função de máscara de telefone com correção para backspace
function mascaraTelefone(input) {
    let valor = input.value.replace(/\D/g, ""); // Remove tudo que não for número

    // Impede mais de 11 dígitos
    if (valor.length > 11) valor = valor.substring(0, 11);

    // Se o usuário está apagando (menos de 3 dígitos), não aplica máscara
    if (valor.length <= 2) {
        input.value = valor;
    } 
    else if (valor.length <= 6) {
        input.value = `(${valor.substring(0, 2)}) ${valor.substring(2)}`;
    } 
    else if (valor.length <= 10) {
        input.value = `(${valor.substring(0, 2)}) ${valor.substring(2, 6)}-${valor.substring(6)}`;
    } 
    else {
        input.value = `(${valor.substring(0, 2)}) ${valor.substring(2, 7)}-${valor.substring(7, 11)}`;
    }
}



// Sempre volta para o topo ao recarregar a página
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

