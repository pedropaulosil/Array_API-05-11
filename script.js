document.getElementById('start').addEventListener('click', () => {
    const listaPaises = ["Brasil", "Canadá", "Japão", "Alemanha", "França", "Itália", "Chile", "México", "Portugal", "Espanha", "Egito"];
    
    // Limpa e exibe os países com tags para o CSS aplicar estilo
    const container = document.getElementById('pais');
    container.innerHTML = listaPaises.map(p => `<span class="pais-item">${p}</span>`).join('');

    // Exibe o 10º país (índice 9)
    document.getElementById('decimopais').innerText = listaPaises[9];

    // Exemplo de busca
    document.getElementById('paisprocurado').innerText = listaPaises.includes("Brasil") ? "Brasil Encontrado" : "Não encontrado";
});
