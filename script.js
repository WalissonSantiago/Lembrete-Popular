// =============================
// Função principal - calcular próxima retirada
// =============================
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

        const dataFormatada = `${diaFinal}/${mesFinal}/${anoFinal}`;

        // Atualiza o texto do resultado
        const resultado = document.getElementById('data');
        resultado.textContent = `Sua próxima retirada será: ${dataFormatada}`;

        // Mostra a seção de resultado
        const resultadoSection = document.querySelector('.resultado');
        resultadoSection.classList.remove('hide');

        // Faz a página rolar suavemente até o resultado visível
        resultadoSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Envia os dados pelo EmailJS
        enviarDados(telefone, email, dataFormatada);
    } else {
        alert("Por favor, insira uma data válida.");
    }
}

// =============================
// Função para enviar e-mail via EmailJS
// =============================
function enviarDados(telefone, email, data) {
    if (!email) return; // só envia se o usuário tiver digitado um e-mail

    // Substitua pelos seus IDs do EmailJS
    const serviceID = "service_anj15fo";
    const templateID = "template_jwt2gj8";

    const params = {
        telefone: telefone || "Não informado",
        email_destino: email,
        data_retirada: data
    };

    emailjs.send(serviceID, templateID, params)
    .then(() => {
        alert("✅ Lembrete enviado com sucesso para o e-mail informado!");
    })
    .catch((error) => {
        console.error("Erro ao enviar:", error);
        alert("❌ Ocorreu um erro ao enviar o lembrete. Tente novamente mais tarde.");
    });
}

// =============================
// Função de máscara de telefone (corrigida)
// =============================
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

// =============================
// Sempre volta para o topo ao recarregar
// =============================
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};
