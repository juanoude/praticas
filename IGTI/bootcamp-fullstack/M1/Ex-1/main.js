window.addEventListener('load', function () {
  var rangeInputs = document.querySelectorAll('.rangeInput');
  var textInputs = document.querySelectorAll('.textInput');
  var square = document.querySelector('#square');

  console.log(rangeInputs);
  console.log(textInputs);

  for(i = 0; i < rangeInputs.length; i++) {
    textInputs[i].value = rangeInputs[i].value;

    rangeInputs[i].addEventListener('change', function (e) {
      var rangeValue = e.target.value;
      var textEqual = e.target.parentElement.children[1];
      
      textEqual.value = rangeValue;

      var color = 'rgb(';

      for(i = 0; i < textInputs.length; i++) {
        color += textInputs[i].value;
        if(i != 2) {
          color += ','
        }
      }
      color += ')';


      square.style.backgroundColor = color;
      console.log(square.style.backgroundColor);
    });  
  }

});