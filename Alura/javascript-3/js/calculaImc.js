var titulo = document.querySelector(".titulo");
titulo.textContent = "Aparecida Nutricionista";
titulo.addEventListener("click", mostrarMensagem);

function mostrarMensagem() {
  alert("Receba toda a prosperidade do planeta!");
}

// titulo.addEventListener("click", function () {
//   alert("Receba toda a prosperidade do planeta!");
// })

var pacientes = document.querySelectorAll(".paciente");

for (i = 0; i < pacientes.length; i++) {
  var paciente = pacientes[i];

  var tdPeso = paciente.querySelector(".info-peso");
  var peso = tdPeso.textContent;

  var tdAltura = paciente.querySelector(".info-altura");
  var altura = tdAltura.textContent;

  var tdGordura = paciente.querySelector(".info-gordura");
  var gordura = tdGordura.textContent;

  var imc = paciente.querySelector(".info-imc");
  imc.textContent = calculaImc(peso, altura);

  if (!validaPaciente(peso, altura)) {
    paciente.classList.add("paciente-invalido");
  }
  
}

function calculaImc(peso, altura) {
  var pacienteValido = validaPaciente(peso, altura);
  if(pacienteValido) {
    var imc = peso / (altura * altura);
    return imc.toFixed(2);s
  }
  return "Dados Inválidos";  
}

function validaPeso(peso) {
  if(peso <= 0 || peso >= 1000) {
    return false;
  }
  return true;
}

function validaAltura(altura) {
  if(altura <= 0 || altura >= 3) {
    return false;
  }
  return true;
}

function validaPaciente(peso, altura) {
  var pesoValido = validaPeso(peso);
  var alturaValida = validaAltura(altura);

  if(!pesoValido || !alturaValida) {
    return false;
  }

  return true;
}