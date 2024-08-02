//filtro si item de info de superheroe no tiene datos o está vacío, en ese caso remueve item
jQuery.fn.filtroInfoCardVacio = function(){
  $(this).each(function(){
  const haySpan = $(this).find('span');
  if(haySpan.length === 0){
    $(this).remove();
  }
})
}