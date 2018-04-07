$(document).ready(function () {
  let dropdown = $('#selectCiudad');

  dropdown.empty();

  dropdown.append('<option selected="true" disabled>Choose State/Province</option>');
  dropdown.prop('selectedIndex', 0);

  const url = 'data-1.json';

  // Populate dropdown with list of provinces
  $.getJSON(url, function (data) {
    $.each(data, function (key, entry) {
      dropdown.append($('<option></option>').attr('value', entry.Ciudad).text(entry.Ciudad));
    })
  });
});


function getDatos(){
  //var HtmlNode = document.getElementById('datos');
  var showData = $('#show-data');
  $.getJSON('data-1.json', function (data) {

    //  alert(data);

      data.forEach(function(val , i){
        //alert(val.Direccion);
        var content = '<div class="tituloContenido card"><ul>'
         + '<li> Direccion: ' + val.Direccion + '</li>'
         + '<li> Ciudad: ' + val.Ciudad + '</li>'
         + '<li> Telefono: ' + val.Telefono + '</li>'
         +  '<li> Codigo_Postal: ' + val.Codigo_Postal + '</li>'
         +  '<li> Tipo: ' + val.Tipo + '</li>'
         +  '<li> Precio: ' + val.Precio + '</li>';
        var list = $('<ul/></div>').html(content);
        showData.append(list);
      })
    });
}

/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();
