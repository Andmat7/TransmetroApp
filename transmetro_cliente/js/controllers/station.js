
render("station",{});
//$("#mapa_parada").html("");
if (!version_lower) {
  $("#station #listador_paradas_station").css("height",$(window).height()-($("#station .footer").height()+$("#station .header").height()));
}
$("#mapa_parada").css('height',0.7*$("#station .content").height());
$("#mapa_parada").css('width',0.95*$("#station").width());

stops_por_id.filterAll();
var stop_id=localStorage.getItem("stop_id");
stops_por_id.filter(localStorage.getItem("stop_id"));

var stop=stops_por_id.top(1)[0];
var rutas_por_stop=[];
$('#station_name').html(stop.stop_name);

for (var i = dataGets.routes.length - 1; i >= 0; i--) {
  var array_paradas;
  if(dataGets.routes[i].secuencia[1]===undefined){
    array_paradas=dataGets.routes[i].secuencia[0].stops;
  }else{
    array_paradas=dataGets.routes[i].secuencia[1].stops;
  }
  for (var j = array_paradas.length - 1; j >= 0; j--) {
    if (array_paradas[j].stop_id===stop_id){

        rutas_por_stop.push(dataGets.routes[i]);
        $("#listador_paradas_station").append('<li class="li_ruta" route_id="'+dataGets.routes[i].route_id+'"><a href="#ruta?route_id='+dataGets.routes[i].route_id+'"><div class="ruta_troncal">'+
        dataGets.routes[i].route_short_name +
        '</div>'+
        dataGets.routes[i].route_long_name +
        '</a></li>'
        );
        break;

    }

  }
}
$("#listador_paradas_station").append('<li style="height:600px"></li>');
$("#station").trigger('create');
boton_back ("station");
$(".li_ruta").click(function(){
    localStorage.setItem("route_id", $(this).attr("route_id"));
});
$("#station").trigger('create');
 //select_radio ("station");
 $("#station .select_horizontal .ui-radio").off().on('touchstart',
    function(){

      var view=$(this).find("input").attr("ref");
      $("#station .view").hide();
      
      if (view==="view2") {
        $("#station .view."+view).show(1,function  () {
          //map_station();
          //map_station();
          verify_google ("map_station");
          // body...
        }
          );

      }else{
        $("#station .view."+view).show();
      }

    }
);
 var mapa_station_creado=false;
 var map_de_station=null;
function map_station () {
  if (!mapa_station_creado) {
    var myLocation = new google.maps.LatLng(stop.stop_lat, stop.stop_lon);
    var mapOptions = {
        zoom: 15,
        center: myLocation,
        disableDefaultUI: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
    
    rutas_por_id.filter(localStorage.getItem("route_id"));
    var ruta=rutas_por_id.top(1);
      
     map_de_station = new google.maps.Map(document.getElementById('mapa_parada'),
          mapOptions);
       
    mapa_station_creado=true;
    google.maps.event.trigger(map_de_station, 'resize');
    var myLatLng =new google.maps.LatLng(stop.stop_lat,stop.stop_lon);
    var marker = new google.maps.Marker({
            position: myLatLng,
            map: map_de_station,
            title: stop.stop_name,
            icon: 'images/paradero.png'
    });
    
    google.maps.event.trigger(map_de_station, 'resize');

  }
}

ui_heigth();
//@ sourceURL=station.js