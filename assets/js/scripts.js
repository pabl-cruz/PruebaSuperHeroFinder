$(document).ready(function(){
                          
  function limpiar(){
    $('#tarjeta').empty();
    $('#info h2').empty();
  }

  $('#superheroConsulta').on('click', function(event){
    event.preventDefault();
    limpiar();


    const filtroNum = /[1-9][0-9]*/;
    let idConsultado = $('#idSuperheroe').val();

    if (filtroNum.test(idConsultado) && idConsultado < 732 && idConsultado >= 1){

      $.ajax({
        async: false,
        url: `https://superheroapi.com/api.php/3a4f4e16e4ad52d85f9e4e91bbc17001/${idConsultado}`,
        type: 'GET',
        dataType: 'json',
        success: function(data){
        //arreglo vacio para llenar datos de poderes
        const dataPoints = [];
          //for...in para recorrer entre las propiedades (llaves) de un objeto
          for(const power in data.powerstats){
            //agregando datapoints
            if(data.powerstats[power] !== null){
              dataPoints.push({ y: Number(data.powerstats[power]), indexLabel: power})

            } else {
              //se pasa el dato si es null para no romper grafico
              continue;
            }
          }
          

          var chart = new CanvasJS.Chart("powers", {
            exportEnabled: true,
            animationEnabled: true,
            title:{
              text: "Estadisticas de poder para "+data.name
            },
            legend:{
              cursor: "pointer",
            },
        data: [{
          type: "pie",
          indexLabelPlacement: "inside",
          toolTipContent: "{indexLabel}: <strong>{y}%</strong>",
          indexLabel: "{indexLabel}",
          dataPoints: dataPoints,
        }]
      });
      chart.render();

          if(idConsultado > 732 || idConsultado <= 0){
            alert('El código de superheroe no está en el indice. Por favor intentar de nuevo');
            limpiar();
          } else {
            limpiar();
            $('#info').prepend(`
              <h2 class='my-3 mx-auto pl-1'>Superheroe encontrado</h2>`);

            $('#tarjeta').append(`
                 <div class="card">
                    <img class='card-img' src='${data.image.url}' alt='${data.name}'>
                    <h3 class='card-title p-3'>${data.name}</h3>
                      <div class='card-body'>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item"><h4>Datos Personales</h4></li>
                          <li class="list-group-item"><strong>Nombre:</strong> ${data.biography['full-name']}</li>
                          <li class="list-group-item"><strong>Primera Aparición:</strong> ${data.biography['first-appearance']}</li>
                          <li class="list-group-item"><strong>Lugar de nacimiento:</strong> ${data.biography['place-of-birth']}</li>
                          <li class="list-group-item"><strong>Alineación:</strong> ${data.biography['alignment']}</li>
                          <li class="list-group-item"><h4>Apariencia</h4></li>
                          <li class="list-group-item"><strong>Genero:</strong> ${data.appearance['gender']}</li>
                          <li class="list-group-item"><strong>Raza:</strong> ${data.appearance['race']}</li>
                          <li class="list-group-item"><strong>Altura:</strong> ${data.appearance['height'][1]}</li>
                          <li class="list-group-item"><strong>Peso:</strong> ${data.appearance['weight'][1]}</li>
                          <li class="list-group-item"><strong>Color de ojos:</strong> ${data.appearance['eye-color']}</li>
                          <li class="list-group-item"><strong>Color de cabello:</strong> ${data.appearance['hair-color']}</li>
                        </ul>
                    </div>
                  </div>
              `
            )
          }
        },
        error: function(){
          alert('No se pudieron encontrar los datos');
        },
      })
    } else {
      alert('Por favor, introduzca un valor númerico o valido.');
    }
  });
})