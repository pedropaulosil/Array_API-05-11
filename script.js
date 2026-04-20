   <script>
        // Lógica da Aplicação
        const API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags';
        let countriesList = [];

        // Elementos DOM
        const input = document.getElementById('country-index');
        const btn = document.getElementById('search-btn');
        const totalSpan = document.getElementById('total-count');
        const initialMsg = document.getElementById('initial-msg');
        const resultContent = document.getElementById('result-content');
        const flagImg = document.getElementById('flag-img');
        const nameText = document.getElementById('country-name');
        const posText = document.getElementById('pos-number');

        // Função para carregar dados reais
        async function fetchCountries() {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                
                // Ordenação Alfabética Inteligente
                countriesList = data.map(c => ({
                    name: c.name.common,
                    flag: c.flags.svg
                })).sort((a, b) => a.name.localeCompare(b.name));

                totalSpan.textContent = countriesList.length;
                input.max = countriesList.length;
            } catch (error) {
                totalSpan.textContent = "Erro";
                initialMsg.textContent = "Falha ao carregar lista de países.";
                initialMsg.style.color = "#f43f5e";
            }
        }

        // Função para mostrar o país selecionado
        function searchCountry() {
            const index = parseInt(input.value);

            if (!index || index < 1 || index > countriesList.length) {
                initialMsg.classList.remove('hidden');
                resultContent.classList.add('hidden');
                initialMsg.textContent = `Por favor, indique um número entre 1 e ${countriesList.length}.`;
                initialMsg.style.color = "#f43f5e";
                return;
            }

            const country = countriesList[index - 1];

            // Atualiza Interface
            flagImg.src = country.flag;
            nameText.textContent = country.name;
            posText.textContent = index;

            initialMsg.classList.add('hidden');
            resultContent.classList.remove('hidden');

            // Reinicia animação para efeito visual
            resultContent.style.animation = 'none';
            resultContent.offsetHeight; 
            resultContent.style.animation = null;
        }

        // Eventos
        btn.addEventListener('click', searchCountry);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchCountry();
        });

        // Início
        fetchCountries();
    </script>
