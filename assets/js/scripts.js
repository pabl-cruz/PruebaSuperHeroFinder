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
    //limpiar();

    let idConsultado = $('#idSuperheroe').val();
    let filtro = validar(idConsultado);

    if (filtro == true){

      $.ajax({
        async: false,
        url: `https://superheroapi.com/api.php/3a4f4e16e4ad52d85f9e4e91bbc17001/${idConsultado}`,
        type: 'GET',
        dataType: 'json',
        success: function(data){

          const biografia = Object.entries(data.biography);
          const apariencia = Object.entries(data.appearance);
          const trabajo = Object.entries(data.work);
          const relaciones = Object.entries(data.connections);


          const power = data.powerstats;
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
          showInLegend: true,
          toolTipContent: "{name}: <strong>{y}%</strong>",
          indexLabel: "{name} - {y}%",
          dataPoints: [
            { y: parseInt(power['intelligence']), name: "Inteligencia" },
            { y: parseInt(power['strength']), name: "Fuerza" },
            { y: parseInt(power['speed']), name: "Velocidad" },
            { y: parseInt(power['durability']), name: "Resistencia" },
            { y: parseInt(power['power']), name: "Energía" },
            { y: parseInt(power['combate']), name: "Combate" },
          ]
        }]
      });
      chart.render();

          if(idConsultado > 732){
            alert('El código de superheroe no está en el indice. Por favor intentar de nuevo');
            limpiar();
          } else {

            $('#info').prepend(`
              <h2 class='my-3 mx-auto pl-1'>Superheroe encontrado</h2>`);

            $('#contenido').append(`
                 <div class="card col-12 col-lg-6">
                    <img class='card-img' src='${data.image.url}' alt='${data.name}'>
                    <h3 class='card-title p-3'>${data.name}</h3>
                      <div class='card-body'>
                        <p class='card-text'>${biografia}</p>
                        <p class='card-text'>${apariencia}</p>
                        <p class='card-text'>${trabajo}</p>
                        <p class='card-text'>${relaciones}</p>
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
    }
  });
})