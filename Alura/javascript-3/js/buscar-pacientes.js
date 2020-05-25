var botaoAdicionar = document.querySelector("#buscar-pacientes");
botaoAdicionar.addEventListener("click", function() {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");

  xhr.addEventListener("load", function() {
    if(xhr.status == 200) {
      var resposta = xhr.responseText;
      var pacientes = JSON.parse(resposta);
      
      pacientes.forEach(paciente => {
        adicionaPaciente(paciente);
      });
    }else {
      var erroAjax = document.querySelector("#erro-ajax");
      erroAjax.classList.remove("invisivel");
      setTimeout(function() {
        erroAjax.classList.add("invisivel");
      }, 3000);
    }
  });

  xhr.send();
});