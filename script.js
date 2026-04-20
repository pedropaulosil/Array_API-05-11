document.addEventListener('DOMContentLoaded', () => {
    // URL da API para pegar todos os países (apenas os campos necessários)
    const API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags';
    
    let countriesList = []; // Array que guardará os países ordenados

    // Elementos do DOM
    const totalCountriesSpan = document.getElementById('total-countries');
    const positionInput = document.getElementById('position-input');
    const searchBtn = document.getElementById('search-btn');
    const resultDisplay = document.getElementById('result-display');
    const messageDisplay = document.getElementById('message-display');
    const countryFlagImg = document.getElementById('country-flag');
    const countryNameH2 = document.getElementById('country-name');
    const countryIndexSpan = document.getElementById('country-index');

    // 1. Função Inteligente para Buscar e Ordenar Países da API
    async function fetchAndSetupCountries() {
        try {
            totalCountriesSpan.innerText = "Carregando...";
            const response = await fetch(API_URL);
            
            if (!response.ok) throw new Error('Falha ao conectar na API');
            
            const data = await response.json();

            // Mapeia para um formato mais simples e ordena alfabeticamente pelo nome comum em português (se disponível) ou inglês
            countriesList = data.map(country => ({
                name: country.name.common, // Nome comum em inglês
                flagUrl: country.flags.svg // URL da bandeira (SVG é melhor)
            }))
            .sort((a, b) => a.name.localeCompare(b.name)); // Ordenação alfabética padrão

            // Atualiza o contador no cabeçalho
            totalCountriesSpan.innerText = countriesList.length;
            positionInput.max = countriesList.length; // Define o máximo do input dinamicamente
            console.log("Lista de países carregada e ordenada.");

        } catch (error) {
            console.error('Erro:', error);
            totalCountriesSpan.innerText = "Erro";
            messageDisplay.innerHTML = `<p class="error-message">Não foi possível carregar a lista de países. Verifique sua conexão.</p>`;
        }
    }

    // 2. Função para Buscar País por Posição
    function findCountryByPosition() {
        const position = parseInt(positionInput.value);
        const total = countriesList.length;

        // Limpa estados anteriores
        resultDisplay.classList.add('hidden');
        messageDisplay.classList.remove('hidden');
        messageDisplay.innerHTML = ''; // Limpa mensagens

        // Validação
        if (isNaN(position)) {
            messageDisplay.innerHTML = '<p class="error-message">Por favor, insira um número válido.</p>';
            return;
        }

        if (position < 1 || position > total) {
            messageDisplay.innerHTML = `<p class="error-message">Posição inválida. Insira um número entre 1 e ${total}.</p>`;
            return;
        }

        // Busca o país (Índice do array = Posição - 1)
        const index = position - 1;
        const country = countriesList[index];

        // Atualiza a exibição com animação
        countryFlagImg.src = country.flagUrl;
        countryFlagImg.alt = `Bandeira de ${country.name}`;
        countryNameH2.innerText = country.name;
        countryIndexSpan.innerText = position;

        // Mostra o resultado e esconde a mensagem de instrução
        messageDisplay.classList.add('hidden');
        resultDisplay.classList.remove('hidden');
    }

    // Eventos
    searchBtn.addEventListener('click', findCountryByPosition);
    
    // Permite buscar apertando "Enter" no input
    positionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            findCountryByPosition();
        }
    });

    // Inicialização
    fetchAndSetupCountries();
});
