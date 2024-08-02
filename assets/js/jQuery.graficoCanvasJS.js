//renderiza un grafico de torta mediante Canvas JS
jQuery.fn.graficoCanvasJS = function(data, dataPoints){
var chart = new CanvasJS.Chart( this[0], {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Estadisticas de poder para " + data.name,
    },
    legend: {
      cursor: "pointer",
    },
    data: [
      {
        type: "pie",
        indexLabelPlacement: "inside",
        toolTipContent: "{indexLabel}: <strong>{y}%</strong>",
        indexLabel: "{indexLabel}",
        dataPoints: dataPoints,
      },
    ],
  });
  chart.render();
}