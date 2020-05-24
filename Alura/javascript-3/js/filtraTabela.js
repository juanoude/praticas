var campoFiltro = document.querySelector('#filtrar-tabela');

campoFiltro.addEventListener("input", function() {
  var valor = this.value;

  var pacientes = document.querySelectorAll('.paciente');
  
  if(valor.length > 0) {
    for(i = 0; i < pacientes.length; i++) {
      var paciente = pacientes[i];
      var nomeTd = paciente.querySelector('.info-nome');
      var nome = nomeTd.textContent;
      var expressao = new RegExp(valor, 'i');

      if(!expressao.test(nome)) {
        paciente.classList.add('invisivel');
      }else {
        paciente.classList.remove('invisivel');
      }
    }
  }else {
    for(i = 0; i < pacientes.length; i++) {
      var paciente = pacientes[i];
      paciente.classList.remove('invisivel');
    }
  }
});