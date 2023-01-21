//selecionando elemento pelo id 
const form = document.querySelector("#form-habits")
const nlwSetup = new NLWSetup(form)
const button = document.querySelector('header button')

//metedo vai esperar um evento ao ouvir o evento vai executar a função add
button.addEventListener('click', add)
form.addEventListener("change", save)

function add() {
  //armazena a date de hoje em pt-br
  //slice recorta a string a partir do primeiro paramentro contando o segundo de tras pra frente
  const today = new Date().toLocaleDateString('pt-br').slice(0, -5)
  const dayExists = nlwSetup.dayExists(today)

  if (dayExists) {
    alert("Dia já incluso!")
    return
  }

  alert("Dia adicionado com sucesso!")
  nlwSetup.addDay(today)
}

function save() {
  localStorage.setItem('NLWSetup@habtis', JSON.stringify(nlwSetup.data))
}


/*
const data = {
  run: ["01-01", "01-03", "01-04", "01-05", "01-06"],
  water: ["01-01", "01-02", "01-03", "01-04", "01-05", "01-06"],
  food: ["01-01", "01-02", "01-04", "01-06"],
}
*/
const data = JSON.parse(localStorage.getItem('NLWSetup@habtis')) || {};
nlwSetup.setData(data)
nlwSetup.load()