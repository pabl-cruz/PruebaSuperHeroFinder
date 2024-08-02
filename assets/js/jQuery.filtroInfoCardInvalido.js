//filtro si item de info de superheroe tiene guiones, o valor null, en ese caso remueve item 

jQuery.fn.filtroInfoCardInvalido = function(){
  $(this).each(function(){
    if($(this).text().trim() === '-' || $(this).text() === "null"){
      $(this).remove();
    }
  })
}