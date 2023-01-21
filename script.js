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

  //Recuperando elementos da Janela de resposta do registro
  let modal = document.getElementById('modal')
  let titleModal = document.getElementById('exampleModalLabel')
  let textModal = document.getElementById('text')
  let btnModal = document.getElementById('btn_modal')

  if (dayExists) {
    modal.className = 'modal-header text-danger'
    titleModal.textContent = 'Erro na gravação.'
    textModal.textContent = `O registro do dia ${today} já foi gerado.`
    btnModal.className = 'btn btn-danger'
    btnModal.textContent = 'Voltar'

    $('#record').modal('show')
    return
  }

  modal.className = 'modal-header text-success'
  titleModal.textContent = 'Dia inserido com sucesso.'
  textModal.textContent = 'Registre seus habitos de hoje.'
  btnModal.className = 'btn btn-success'
  btnModal.textContent = 'Ok'

  $('#record').modal('show')
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