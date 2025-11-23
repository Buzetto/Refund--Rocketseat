// Seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Capturando o evento de input do valor para formatar somente em numero
amount.oninput = () => {
    //Obtem o valor atual do input e remove os caracteres não numericos
    let value = amount.value.replace(/\D/g, "");

    //Transformar o valor em centavos (Exemplo: 150/100 = 1.50)
    value = Number(value) / 100;

    //Atualiza o valor do input
    amount.value = formtaCurrencyBRL(value);
}

//Função que converte o valor do input de valor para moeda local que é Real Brasileiro
function formtaCurrencyBRL (value) {
    //Formata no padrão BRL
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
    //Retorna o valor formatado
    return value;
}

form.onsubmit = (event) => {
    event.preventDefault()
}