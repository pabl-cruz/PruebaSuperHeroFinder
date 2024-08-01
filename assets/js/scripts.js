$(document).ready(function(){


  function limpiar(){
    $('#info').empty();
  }

  function validar(num){
    const filtroNum = /[1-9][0-9]*/;
      if (
        filtroNum.test(num) == false
      ) {
        alert('Por favor, introduzca un valor númerico.');
        let esValido = false;
        return esValido;
      } else {
        let esValido = true;
        return esValido;
      }
    }

  $('#superheroConsulta').on('click', function(event){
    event.preventDefault();
    limpiar();
    let idConsultado = $('#idSuperheroe').val();
    
    let filtro = validar(idConsultado);
    if (filtro == true){
      console.log(idConsultado)
      $('#info').append(`<p>${idConsultado}</p>`);
    }
  });
})