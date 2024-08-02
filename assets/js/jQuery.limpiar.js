//limpiar y refrescar información de tarjeta de superhero y titulo
jQuery.fn.limpiar = function(card, titl) {
  $(this)+$(card).empty();
  $(this)+$(titl).empty();
}