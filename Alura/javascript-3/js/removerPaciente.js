// var pacientes = document.querySelectorAll('.paciente');
// pacientes.forEach(function(paciente) {
//   paciente.addEventListener("dblclick", function() {
//     this.remove();
//   });
// });

var tabela = document.querySelector("table");

tabela.addEventListener("dblclick", function() {
  var trRemovida = event.target.parentNode;

  trRemovida.classList.add('fadeOut');

  setTimeout(function() {
    trRemovida.remove();
  }, 500)
});