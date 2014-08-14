render("listado_estaciones",{});

if (!version_lower) {
  $("#ul_listado_estaciones, #ul_listado_paraderos").css("height",$(window).height()-($("#listado_estaciones .footer").height()+$("#listado_estaciones .header").height() ));
}
if (listado_estaciones_ref!=="") {
    $("#listado_estaciones .view").hide();
    $("#listado_estaciones .view."+listado_estaciones_ref).show();
    $("#listado_estaciones .select_horizontal input[ref='"+listado_estaciones_ref+"']").attr("checked", "checked");
}
var loc_type=[];

function toObject (arreglo) {
	for (var i = 0; i < arreglo.length; i++) {
	}
}
var ul_listado_estaciones_stops="";
var ul_listado_paraderos_stops="";

for (var i = 0; i < dataGets.stops.length; i++) {

if (dataGets.stops[i].stop_name) {
	if (dataGets.stops[i].location_type == 1) {
    ul_listado_estaciones_stops=ul_listado_estaciones_stops+'<li class="li_stop" stop_id="'+dataGets.stops[i].stop_id+'"><a href="#station"><span >'+dataGets.stops[i].stop_name+'</span></a></li>';
		
	}else{
    ul_listado_paraderos_stops=ul_listado_paraderos_stops+'<li class="li_stop" stop_id="'+dataGets.stops[i].stop_id+'"><a href="#station"><span >'+dataGets.stops[i].route_short_name+')   '+dataGets.stops[i].stop_name+'</span></a></li>';
			
	}
}

}
$('#ul_listado_paraderos').append(ul_listado_paraderos_stops);

$('#ul_listado_estaciones').append(ul_listado_estaciones_stops);

$(".li_stop").click(function(){
  
  localStorage.setItem("stop_id", $(this).attr("stop_id"));
});
$('#ul_listado_estaciones').append('<li height="70px" style="height: 200px;"><span ></span></li>');
$('#ul_listado_paraderos').append('<li height="70px" style="height: 200px;"><span ></span></li>');
$("#listado_estaciones").trigger('create');
$("#listado_estaciones .select_horizontal .ui-radio").off('touchstart').on('touchstart',
    function(){

      var view=$(this).find("input").attr("ref");
      listado_estaciones_ref=view;
      $("#listado_estaciones .view").hide();
      $("#listado_estaciones .view."+view).show();


          }
    );

ui_heigth();