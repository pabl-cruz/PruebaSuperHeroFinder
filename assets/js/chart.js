window.onload = function (data) {

  $.ajax({
    async: true,
    url: `https://superheroapi.com/api.php/3a4f4e16e4ad52d85f9e4e91bbc17001/${data.id}`,
    type: 'GET',
    dataType: 'json',
    success: function(data){
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
      }
})
}