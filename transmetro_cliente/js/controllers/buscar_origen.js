render("buscar_origen",{});

if (typeof stopid_departure === 'undefined') {
  var stopid_departure="";
}



var stops_origen_rutas="";
var stops_paradero_origen="";
for (var i = 0; i < dataGets.stops.length; i++) {
	if (dataGets.stops[i].stop_name) {
		if (dataGets.stops[i].location_type == 1) {
      stops_origen_rutas=stops_origen_rutas+'<li stopid="'+dataGets.stops[i].stop_id+'"><span >'+dataGets.stops[i].stop_name+'</span></li>';

			
		}else{
      stops_paradero_origen=stops_paradero_origen+'<li stopid="'+dataGets.stops[i].stop_id+'"><span> <span class="bold">'+dataGets.stops[i].route_short_name+' </span>    '+dataGets.stops[i].stop_name+'</span></li>';
			
		}
	}
}

$('#origen_rutas').append(stops_origen_rutas);
$('#paradero_origen').append(stops_paradero_origen);

  
$('#origen_rutas').append('<li height="700px" style="height:300px"></br></li>');
$('#paradero_origen').append('<li height="700px" style="height:300px"></br></li>');

$("#buscar_origen").trigger('create');
if (!version_lower) {
  $("#buscar_origen #origen_rutas,#buscar_origen #paradero_origen").css("height",$("#buscar_origen .content").height()-$("#buscar_origen fieldset").outerHeight(true)-$("#buscar_origen .ui-filterable").outerHeight(true))  ;
}
$("#mapa_destino").css('height',0.4*$("#buscar_origen .content").height());
$("#mapa_destino").css('width',0.95*$("#buscar_origen").width());
$("#buscar_origen .view").hide();
$("#buscar_origen .view.view1").show();
$("#buscar_origen .select_horizontal .ui-radio").off('touchstart').on('touchstart', function() {
    var view = $(this).find("input").attr("ref");
    $("#buscar_origen .view").hide();

    if (view === "view3") {
        $("#buscar_origen .view." + view).show(0, function() {
            initialize();
            //initialize();
        });

    }
    else {
        $("#buscar_origen .view." + view).show();
      }

});
boton_back ("buscar_origen");
var marcadores_buscar_origen=[];


function setAllMap(map) {
  for (var i = 0; i < marcadores_buscar_origen.length; i++) {
    marcadores_buscar_origen[i].setMap(map);
  }
}

function deleteMarkers() {
  clearMarkers();
  marcadores_buscar_origen = [];
}



// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}
var mapa_origen;
function drawmap (latitud,longitud,zoom) {
  $('#mapa_destino').html("<span>Cargando Mapa </span>")
  var myLocation = new google.maps.LatLng(latitud,longitud);
     var mapOptions = {
    zoom: zoom,
    center: myLocation,
    disableDefaultUI: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDoubleClickZoom: true
  };
  mapa_origen = new google.maps.Map(document.getElementById('mapa_destino'),
                    mapOptions);
}


function go_to_function (marker,lugar) {
     // console.log(stop_id);

  
      google.maps.event.addListener(marker, 'click', function() {
        stopid_departure=lugar.stop_id;
        window.planifica.departure=lugar.stop_name;
        $.mobile.changePage("#planifica");
        
        // mapa_origen.setCenter(marker.getPosition());
        // alert(stop_id);
        
      });

}
    
function dibujar_posiciones (latitud, longitud) {


  deleteMarkers();
  $("#ul_mas_cercanos").html("");
  
  var lugares2=encontrar_mas_cerca(dataGets.stops,latitud, longitud);

  // var cerca=mascerca(lugares,pos_lat,pos_long);
  var lugares=mascerca(lugares2 ,latitud, longitud);
  console.log(lugares);

  var cont_estaciones_cercanas=0;
  for (var key in lugares) {

    
    if (typeof lugares[key].stop_id !== 'undefined') {
      var myLatLng =new google.maps.LatLng(lugares[key].stop_lat,lugares[key].stop_lon);
      var marker = new google.maps.Marker({
                position: myLatLng,
                map: mapa_origen,
                title: lugares[key].stop_name,
                icon: 'images/paradero.png'
              });
      marcadores_buscar_origen.push(marker);
      
      go_to_function(marker,lugares[key]);
      

    $("#ul_mas_cercanos").append('<li class=" ui-li-static ui-body-inherit ui-panel-page-container-a" stopid="'+lugares[key].stop_id+'">'+lugares[key].stop_name+'</li>');
      cont_estaciones_cercanas++;
    }

  }
  if (cont_estaciones_cercanas===0) {
    $("#ul_mas_cercanos").append('<li style="color:black"> No hay estaciones cercanas</li>');
  }

  $("#ul_mas_cercanos").append('<li style="height:60px" style="height:300px"></li>');
  $( "#ul_mas_cercanos li" ).click(function(evento,elemento) {
      window.planifica.departure=$(this).text();
      $.mobile.changePage("#planifica");
      stopid_departure=$(this).attr('stopid');
  });
}

function initialize() {
  verify_google("dibuja_mapa_geo");


}
function dibuja_mapa_geo () {

  if (_.size(position)>0) {
    drawmap(position.latitude, position.longitude,14);
    var myLatLng =new google.maps.LatLng(position.latitude, position.longitude);
    var Marcador_esta_aqui = new google.maps.Marker({
              position: myLatLng,
              map: mapa_origen,
              title: "Ud esta aquí",
              icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            });
    dibujar_posiciones(position.latitude, position.longitude);

  }else{
    drawmap(10.9716024,-74.7799347,12);
  }

  google.maps.event.addListener(mapa_origen, "dblclick", function(event) {
    

    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    dibujar_posiciones (lat, lng);

  });
}
ui_heigth();
jQuery( "#buscar_origen" ).on( "pageshow", function( event ) {
  $( "#origen_rutas li,#paradero_origen li" ).off("click").on('click',function(evento,elemento) { 
    if ($(this).attr('stopid')!==undefined) {
      window.planifica.departure=$(this).text();
      stopid_departure=$(this).attr('stopid');
      change_page("#planifica");

    };
     
    
  });
});
//@ sourceURL=buscar_origen.js