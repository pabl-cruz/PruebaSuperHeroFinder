//filtro si categoria de informacion no tiene datos, borrará titulo

jQuery.fn.filtroRemoverTituloVacio = function(titl){
  $(this).each(function(){
    const haylista = $(this).find('.list-group-item');
  
    if(haylista.length === 0){
      $(this).prev(titl).remove()
      $(this).remove();
    }
  })
}