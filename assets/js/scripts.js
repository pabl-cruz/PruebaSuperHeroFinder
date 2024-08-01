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

          function strings(elemnt){
            const dataString = JSON.stringify(elemnt, null, 4);
            return dataString;
          }
          

          if(idConsultado > 732){
            alert('El código de superheroe no está en el indice. Por favor intentar de nuevo');
            limpiar();
          } else {
            $('#info').append(`
              <h2 class='my-3 mx-auto'>Superheroe encontrado</h2>
              <div class='container'>
                <div clas='row'>
                  <div class="card col-12 col-lg-6">
                  <img class='card-img' src='${data.image.url}' alt='${data.name}'>
                  <h3 class='card-title p-3'>${data.name}</h3>
                    <div class='card-body'>
                      <p class='card-text'>${strings(data.powerstats)}</p>
                      <p class='card-text'>${strings(data.biography)}</p>
                      <p class='card-text'>${strings(data.appearance)}</p>
                      <p class='card-text'>${strings(data.work)}</p>
                      <p class='card-text'>${strings(data.connections)}</p>
                    </div>
                  </div>
                </div>
              </div>
              `);
          }
        },
        error: function(){
          alert('No se pudieron encontrar los datos');
        },
      })
    }
  });
})