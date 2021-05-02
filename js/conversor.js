(() => {
    const input = document.querySelector('#entrada-moeda');

    function calculaCotacao(json, sigla) {
        const moeda = sigla.replace('-BRL', '');
        const valorReal = parseFloat(json[moeda].bid);
        const valorMoeda = document.querySelector('#entrada-moeda').value;
        const cotacao = valorReal * valorMoeda;
        document.querySelector('#cotacao-real').value = cotacao.toFixed(2);
        input.focus();
    }

    const botao = document.querySelector('.conteudo__botao');
    botao.addEventListener('click', (event) => {
        event.preventDefault();
        const erro = document.querySelector('.erro');
        const saida = document.querySelector('#cotacao-real');
        if (input.value <= 0 || input.value == "") {
            input.style.borderColor = 'red';
            input.style.borderRadius = '5px';
            erro.style.display = 'block';
            saida.value = '';
            return
        } else {
            input.style.borderColor = 'black';
            erro.style.display = 'none';
            const inputMoeda = document.querySelector('.selecao');
            const sigla = inputMoeda.value;
            const url = `https://economia.awesomeapi.com.br/json/all/${sigla}`;
            const xhr = new XMLHttpRequest(); xhr.open('GET', url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status = 200) calculaCotacao(JSON.parse(xhr.responseText), sigla);
                }
            }
            xhr.send();
        }
    });
})()
