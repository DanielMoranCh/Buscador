$(document).ready(function () {
  let ciudad = $('#selectCiudad');
  var datos = [];
  var j = 0;
  ciudad.empty();
  ciudad.append('<option selected="true" disabled>Elige una ciudad</option>');
  ciudad.prop('selectedIndex', 0);

  const url = 'data-1.json';
  // LISTA DE CIUDADES
  $.getJSON(url, function (data) {
    $.each(data, function (key, entry) {
      var k = 0;
      for(i = 0; i < datos.length; i++)
         if(datos[i]==entry.Ciudad)
           k++;
      if(k==0)
      {
        datos[j]=entry.Ciudad;
        j++;
        ciudad.append($('<option></option>').attr('value', entry.Ciudad).text(entry.Ciudad));
      }
    })
  });
  let tipo = $('#selectTipo');
  var datos = [];
  var j = 0;
  tipo.empty();
  tipo.append('<option selected="true" disabled>Elige un tipo</option>');
  tipo.prop('selectedIndex', 0);
  // LISTA DE TIPOS
  $.getJSON(url, function (data) {
    $.each(data, function (key, entry) {
      var k = 0;
      for(i = 0; i < datos.length; i++)
         if(datos[i]==entry.Tipo)
           k++;
      if(k==0)
      {
        datos[j]=entry.Tipo;
        j++;
        tipo.append($('<option></option>').attr('value', entry.Tipo).text(entry.Tipo));
      }
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
    const url = 'data-1.json';
    var minimo = 100000;
    var maximo= 0;
    var mitad =0;
    var datos = [];
    var j = 0;
    $.getJSON(url, function (data) {
      $.each(data, function (key, entry) {
        let precio = entry.Precio.replace(",", "");
        precio =  precio.replace("$", "");
        //alert(parseFloat(precio));
        var k = 0;
        for(i = 0; i < datos.length; i++)
           if(datos[i]==parseFloat(precio))
             k++;
        if(k==0)
        {

        //  alert(parseFloat(precio)+10000000);
          datos[j]=parseFloat(precio);
            //alert(datos[j]);
          j++;
        }
      })

      for(i = 0; i < datos.length; i++)
      {
        //alert(datos.length);
        if(datos[i]<minimo)
          minimo=datos[i];
        if(datos[i]>maximo)
          maximo=datos[i];
      }

      $("#rangoPrecio").ionRangeSlider({
        type: "double",
        grid: false,
        min: 0,
        max: 100000,
        from: minimo,
        to: maximo,
        prefix: "$"
      });

    });
    //alert(datos[4]);

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
