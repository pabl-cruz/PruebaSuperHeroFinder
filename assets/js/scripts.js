$(document).ready(function () {
  //limpiar y refrescar información de tarjeta de superhero y titulo
  $('#info').limpiar('#tarjeta', 'h2');

  //Evento de consulta y validación formulario
  $("#superheroConsulta").on("click", function (event) {
    event.preventDefault();
    $('#info').limpiar('#tarjeta', 'h2');

    const filtroNum = /[1-9][0-9]*/;
    let idConsultado = $("#idSuperheroe").val();
    //al pasar filtro de ids se conecta con superhero api
    if (
      filtroNum.test(idConsultado) &&
      idConsultado < 732 &&
      idConsultado >= 1
    ) {
      $.ajax({
        async: false,
        url: `https://superheroapi.com/api.php/3a4f4e16e4ad52d85f9e4e91bbc17001/${idConsultado}`,
        type: "GET",
        dataType: "json",
        success: function (data) {
          //arreglo vacio para llenar datos de poderes
          const dataPoints = [];
          //for...in para recorrer entre las propiedades (llaves) de un objeto
          for (const power in data.powerstats) {
            //agregando datapoints
            if (data.powerstats[power] !== null) {
              dataPoints.push({
                y: Number(data.powerstats[power]),
                indexLabel: power,
              });
            } else {
              //se pasa el dato si es null para no romper grafico
              continue;
            }
          }
          //filtro si en el arreglo dataPoints hay valores NaN y devuelve cantidad
          const nanCount = dataPoints.filter((val) => isNaN(val.y)).length;
          //Condicional en caso de que hayan más de 2 valores NaN en poderes, se oculta canvasJS y muestra aviso 
          if (nanCount >= 2) {
            $(".canvasjs-chart-container").hide();
            $("#powers").append(
              '<p class="no-data"><strong>No hay datos de poder para este superheroe.</strong></p>'
            );
          } else {
            //de lo contrario, renderiza grafico de torta canvasJS
            $("#powers").graficoCanvasJS(data, dataPoints);
          }
          //validación si id esta dentro de los indices de superhero api
          if (idConsultado > 732 || idConsultado <= 0) {
            alert(
              "El código de superheroe no está en el indice. Por favor intentar de nuevo"
            );
            $('#info').limpiar('#tarjeta', 'h2');
          } else {
            $('#info').limpiar('#tarjeta', 'h2');
            //manipulacion de DOM para generar carta de bootstrap dinamica con info de superheroe basada en datos de objeto data
            $("#info").prepend(`
              <h2 class='my-3 mx-auto pl-1'>Superheroe encontrado</h2>`);

            $("#tarjeta").append(`
                 <div class="card mb-5">
                  <div class='container'>
                    <div class='row'>
                      <img class='col-12 col-lg-4 p-0' src='${data.image.url}' alt='${data.name}'>
                      <div class='col-12 col-lg-8'>
                        <h3 class='card-title p-3'>${data.name}</h3>
                        <div class='card-body container'>
                          <div class='row'>
                            <div class='col-12 col-lg-6'>
                              <h4>Datos Personales</h4>
                              <ul class="list-group list-group-flush">
                                <li class="list-group-item"><strong>Nombre:</strong> <span>${data.biography["full-name"]}</span></li>
                                <li class="list-group-item"><strong>Primera Aparición:</strong> <span>${data.biography["first-appearance"]}</span></li>
                                <li class="list-group-item"><strong>Lugar de nacimiento:</strong> <span>${data.biography["place-of-birth"]}</span></li>
                                <li class="list-group-item"><strong>Alineación:</strong> <span>${data.biography["alignment"]}</span></li>
                              </ul>
                            </div>
                            <div class='col-12 col-lg-6'>
                              <h4>Apariencia</h4>
                              <ul class="list-group list-group-flush"> 
                                <li class="list-group-item"><strong>Genero:</strong> <span>${data.appearance["gender"]}</span></li>
                                <li class="list-group-item"><strong>Raza:</strong> <span>${data.appearance["race"]}</span></li>
                                <li class="list-group-item"><strong>Altura:</strong> <span>${data.appearance["height"][1]}</span></li>
                                <li class="list-group-item"><strong>Peso:</strong> <span>${data.appearance["weight"][1]}</span></li>
                                <li class="list-group-item"><strong>Color de ojos:</strong> <span>${data.appearance["eye-color"]}</span></li>
                                <li class="list-group-item"><strong>Color de cabello:</strong> <span>${data.appearance["hair-color"]}</span></li>
                              </ul>
                            </div>
                            <div class='col-12 py-2'>
                              <h4>Ocupaciones</h4>
                              <ul class="list-group list-group-flush">
                                 <li class="list-group-item"><strong>Trabajo(s):</strong> <span>${data.work["occupation"]}</span></li>
                                 <li class="list-group-item"><strong>Base:</strong> <span>${data.work["base"]}</span></li>
                              </ul>
                            </div>
                            <div class='col-12 py-2'>
                              <h4>Relaciones</h4>
                              <ul class="list-group list-group-flush">
                                <li class="list-group-item"><strong>Afiliación(es):</strong> <span>${data.connections["group-affiliation"]}</span></li>
                                <li class="list-group-item"><strong>Parientes:</strong> <span>${data.connections["relatives"]}</span></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `);
            //filtro si item de info de superheroe tiene guion, o valor null, en ese caso remueve item 
            const infoElemento = $('.list-group-item span')
            infoElemento.filtroInfoCardInvalido();
            //filtro si item de info de superheroe no tiene datos o está vacío, en ese caso remueve item
            const lista = $('.list-group-item')
            lista.filtroInfoCardVacio();
          }
        },
        error: function () {
          alert("No se pudieron encontrar los datos");
        },
      });
    } else {
      alert("Por favor, introduzca un valor númerico o valido.");
    }
  });
});
