
//debugger;
render("ruta",{});
if (!version_lower) {
  $("#ruta #listador_paradas_ruta").css("height",$(window).height()-($("#ruta .footer").height()+$("#ruta .header").height()));
}
//$("#mapa_ruta").html("");
$("#mapa_ruta").css('height',0.7*$("#ruta .content").height());
$("#mapa_ruta").css('width',0.95*$("#ruta").width());



rutas_por_id.filterAll();
rutas_por_id.filter(localStorage.getItem("route_id"));

var ruta=rutas_por_id.top(1);
ruta=ruta[0];

rutas_por_id.filterAll();
var paradas=[];
var range_route='';
for (var i = ruta.range['H'].length - 1; i >= 0; i--) {
  if (ruta.range['H'][i].start_time<"21:00:00"||ruta.range['H'][i].end_time>"08:00:00") {
   range=ruta.range['H'][i].secuencia;
   break;
  }

}
for (var secuencia_long = ruta.secuencia.length - 1; secuencia_long >= 0; secuencia_long--) {
  
  if (ruta.secuencia[secuencia_long][0]==range) {
    ruta_paradas=ruta.secuencia[secuencia_long].stops;
  }

}

for (var i = ruta_paradas.length - 1; i >= 0; i--) {

    var secuencia=parseInt(ruta_paradas[i].stop_sequence,0);
    paradas[secuencia]=ruta_paradas[i];
    stops_por_id.filterAll();
    stops_por_id.filter(ruta_paradas[i].stop_id);
    var stop=stops_por_id.top(1)[0];
    paradas[secuencia].location_type=stop.location_type;
    paradas[secuencia].stop_name=stop.stop_name;
    paradas[secuencia].stop_lat=stop.stop_lat;
    paradas[secuencia].stop_lon=stop.stop_lon;
}

$("#name_ruta").html(ruta.route_short_name);
$("#route_long_name").html(ruta.route_long_name);


var contador_paradas=0;
for (var i=0; i<paradas.length; i++) {
  if (paradas[i]!==undefined) {
    contador_paradas++;
    $("#listador_paradas_ruta").append('<li class="ui-btn  ui-icon-carat-r" stopid="'+paradas[i].stop_id+'"> <span class="bold">'+contador_paradas+'- </span>'+paradas[i].stop_name+'</li>');
  }
}

$("#listador_paradas_ruta").append('<li style="height:200px"></li>');
$("#ruta").trigger('create');
 //select_radio ("ruta");
 $("#ruta .select_horizontal .ui-radio").off().on('touchstart',
    function(){

      var view=$(this).find("input").attr("ref");
      $("#ruta .view").hide();
      
      if (view==="view2") {
        
        $("#ruta .view."+view).show(1,function  () {
          //map_ruta();
          verify_google ("map_ruta");
        }

          
          );

      }else{
        $("#ruta .view."+view).show();
      }

    }
);

boton_back ("ruta");
var mapa_ruta_creado=false;
function map_ruta () {
  //debugger;
  if (!mapa_ruta_creado) {
    var myLocation = new google.maps.LatLng(10.98, -74.8);
    var mapOptions = {
      zoom: 11,
      center: myLocation,
      disableDefaultUI: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    rutas_por_id.filter(localStorage.getItem("route_id"));
    var ruta=rutas_por_id.top(1);
    delete(map_de_ruta);
    map_de_ruta = new google.maps.Map(document.getElementById('mapa_ruta'),mapOptions);
    
    mapa_ruta_creado=true;

  }

  for (var key in paradas) {

      var myLatLng =new google.maps.LatLng(paradas[key].stop_lat,paradas[key].stop_lon);

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map_de_ruta,
            title: paradas[key].stop_name
      });
  }

  
}
ui_heigth();
//@ sourceURL=ruta.js