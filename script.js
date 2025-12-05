// Seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");


//Seleciona os elementos da lista
const expenseList = document.querySelector("ul");

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

//Captura o evento de submit do formulário para obter os valores
form.onsubmit = (event) => {
    //Previne que o formulario atualize a pagina
    event.preventDefault();

    //Cria um objeto com os detalhes da nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        create_at: new Date(),
    }

    //Chamando a função para acontecer a coisa, adicionar o item na lista
    expenseAdd(newExpense);
}

function expenseAdd(newExpense) {
    try {
        //Cria o elemento li para adicionar o item na lista (ul)
        const expenseItem = document.createElement("li");
        expenseItem.classList.add("expense");

        //Cria o ícone da categoria
        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute("alt", newExpense.category_name);

        //Cria a info da despesa
        const expenseInfo = document.createElement("div");
        expenseInfo.classList.add("expense-info");

        //Cria o nome da despesa
        const expenseName = document.createElement("strong");
        expenseName.textContent = newExpense.expense;

        //Cria a categoria da despesa
        const expenseCategory = document.createElement("span");
        expenseCategory.textContent = newExpense.category_name;

        //Adiciona nome e categoria na div das informações da despesa
        expenseInfo.append(expenseName, expenseCategory);

        //Adiciona as informações no item.
        expenseItem.append(expenseIcon);

        //Cria o ícone de remover
        removeIcon = document.createElement('img');
        removeIcon.classList.add('remove-icon');
        removeIcon.setAttribute('src', 'img/remove.svg');
        removeIcon.setAttribute('alt', 'remover');

        //Criar o valor da despesa
        const expenseAmount = document.createElement("span");
        expenseAmount.classList.add("expense-amount");
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`;

        //Adiciona o item na lista
        expenseList.append(expenseItem, expenseInfo, expenseAmount, removeIcon);

    } catch (error) {
        alert("Não foi possível atualizar a lista de despesa")
        console.log(error)
    }
}