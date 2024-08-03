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
            $("#powers").empty();
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
            //manipulacion de DOM para generar carta de bootstrap dinamica con info de superheroe basada en datos de objeto data más sus filtros
            $('#info').generateCard(data, '#tarjeta');
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
