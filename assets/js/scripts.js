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

      $.ajax({
        async: false,
        url: `https://superheroapi.com/api.php/3a4f4e16e4ad52d85f9e4e91bbc17001/${idConsultado}`,
        type: 'GET',
        dataType: 'json',
        success: function(data){
          console.log(data.name);
          console.log(data.powerstats);
          console.log(data.biography);
        },
        error: function(){
          alert('No se pudieron encontrar los datos');
        },
      })

      if(idConsultado > 732){
        alert('El código de superheroe no está en el indice. Por favor intentar de nuevo');
        limpiar();
      } else {
        $('#info').append(`<p>${idConsultado}</p>`);
      }
    }
  });
})