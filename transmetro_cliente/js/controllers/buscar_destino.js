render("buscar_destino",{});

if (typeof stopid_arrive === 'undefined') {
  var stopid_arrive="";
}
if (!version_lower) {
  $("#buscar_destino #paradero_destino, #buscar_destino #destino_rutas").css("height",$(window).height()-($("#buscar_destino .footer").height()+$("#buscar_destino .header").height())+30);
}


var stops_destino_rutas="";
var stops_paradero_destinos="";
for (var i = 0; i < dataGets.stops.length; i++) {
	if (dataGets.stops[i].stop_name) {
		if (dataGets.stops[i].location_type == 1) {
      stops_destino_rutas=stops_destino_rutas+'<li stopid="'+dataGets.stops[i].stop_id+'"><span >'+dataGets.stops[i].stop_name+'</span></li>';
			
			
		}else{
      stops_paradero_destinos=stops_paradero_destinos+'<li stopid="'+dataGets.stops[i].stop_id+'"><span> <span class="bold">'+dataGets.stops[i].route_short_name+' </span>    '+dataGets.stops[i].stop_name+'</span></li>';
      
		}
	}
}
$('#paradero_destino').append(stops_paradero_destinos);
$('#destino_rutas').append(stops_destino_rutas);


$('#destino_rutas').append('<li height="700px" style="height:700px">  </li>');
$('#paradero_destino').append('<li height="700px" style="height:700px"></li>');
$("#buscar_destino").trigger('create');

boton_back ("buscar_destino");
$("#buscar_destino .view").hide();
$("#buscar_destino .view.view1").show();
$("#buscar_destino .select_horizontal .ui-radio").off('touchstart').on('touchstart',
  function(){
    var view=$(this).find("input").attr("ref");
    $("#buscar_destino .view").hide();
    $("#buscar_destino .view."+view).show();
  }
);
ui_heigth();
jQuery( "#buscar_destino" ).on( "pageshow", function( event ) {
  
  $( "#destino_rutas li,#paradero_destino li" ).off("click").on('click',

    function(evento,elemento) {
      window.planifica.arrive=$(this).text();
      
      stopid_arrive=$(this).attr('stopid');
      change_page("#planifica");
      
    });
});

//@ sourceURL=buscar_destion.js