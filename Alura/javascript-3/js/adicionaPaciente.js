var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener('click', function () {
  event.preventDefault();

  var form = document.querySelector('form');

  var valores = inputValue(form);

  adicionaPaciente(valores);

  var erros = validaPaciente(valores.peso, valores.altura);

  if(erros.length > 0) {
    var ul = document.querySelector("#erros");
    erros.forEach( erro => {
      var li = document.createElement('li');
      li.textContent = erro;
      ul.appendChild(li);
    })
  }

  var mensagensErro = document.querySelector("#erros");
  mensagensErro.innerHTML = "";

  form.reset();
});

function adicionaPaciente(paciente) {
  var pacienteTr = createTr(paciente);

  var tabela = document.querySelector('#tabela-pacientes');

  tabela.appendChild(pacienteTr);
}

function inputValue(form) {

  return {
    nome: form.nome.value,
    peso: form.peso.value,
    altura: form.altura.value,
    gordura: form.gordura.value,
    imc: calculaImc(form.peso.value, form.altura.value)
  }
}

function createTr(valores) {

  var pacienteTr = document.createElement("tr");

  pacienteTr.appendChild(montaTd(valores.nome, "info-nome"));
  pacienteTr.appendChild(montaTd(valores.peso, "info-peso"));
  pacienteTr.appendChild(montaTd(valores.altura, "info-altura"));
  pacienteTr.appendChild(montaTd(valores.gordura, "info-gordura"));
  pacienteTr.appendChild(montaTd(valores.imc, "info-imc"));

  if(!validaPeso(valores.peso) || !validaAltura(valores.altura)) {
    pacienteTr.classList.add("paciente-invalido");
  }

  return pacienteTr;
}

function montaTd(valor, classe) {
  var td = document.createElement('td');
  td.textContent = valor;
  td.classList.add(classe);
  return td;
};