//plugin manipulacion de DOM para generar carta de bootstrap dinamica con info de superheroe basada en datos de objeto data. los otros plugins de filtros llamados abajo dependen de este.

jQuery.fn.generateCard = function(data, card){
$(this).prepend(`
  <h2 class='my-3 mx-auto pl-1'>Superheroe encontrado</h2>`);

$(card).append(`
     <div class="card mb-5">
      <div class='container'>
        <div class='row'>
          <img class='col-12 col-lg-4 p-0' src='${data.image.url}' alt='${data.name}'>
          <div class='col-12 col-lg-8'>
            <h3 class='card-title p-3'>${data.name}</h3>
            <div class='card-body container'>
              <div class='row'>
                <div class='col-12 col-lg-6'>
                  <h4 class='py-2'>Datos Personales</h4>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Nombre:</strong> <span>${data.biography["full-name"]}</span></li>
                    <li class="list-group-item"><strong>Primera Aparición:</strong> <span>${data.biography["first-appearance"]}</span></li>
                    <li class="list-group-item"><strong>Lugar de nacimiento:</strong> <span>${data.biography["place-of-birth"]}</span></li>
                    <li class="list-group-item"><strong>Alineación:</strong> <span>${data.biography["alignment"]}</span></li>
                  </ul>
                </div>
                <div class='col-12 col-lg-6'>
                  <h4 class='py-2'>Apariencia</h4>
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
                  <h4 class='py-2'>Ocupaciones</h4>
                  <ul class="list-group list-group-flush">
                     <li class="list-group-item"><strong>Trabajo(s):</strong> <span>${data.work["occupation"]}</span></li>
                     <li class="list-group-item"><strong>Base:</strong> <span>${data.work["base"]}</span></li>
                  </ul>
                </div>
                <div class='col-12 py-2'>
                  <h4 class='py-2'>Relaciones</h4>
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
let infoElemento = $('.list-group-item span')
infoElemento.filtroInfoCardInvalido();
//filtro si item de info de superheroe no tiene datos o está vacío, en ese caso remueve item
let lista = $('.list-group-item')
lista.filtroInfoCardVacio();
//filtro si categoria de informacion no tiene datos, borrará titulo
let grupoLista = $(`${card} .row .list-group`);
grupoLista.filtroRemoverTituloVacio($('h4'));
}