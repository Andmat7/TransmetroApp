render("listado_rutas",{});
if (!version_lower) {
  $("#listado_rutas #ul_listado_rutas, #listado_rutas #ul_listado_alimentadores").css("height",$(window).height()-($("#listado_rutas .footer").height()+$("#listado_rutas .header").height()));
}



for (var i = 0; i < dataGets.routes.length; i++) {
  color_route = dataGets.routes[i].route_color;
  switch (color_route){
    case "102D6C":
      $("#ul_listado_alimentadores").append('<li class="li_ruta" route_id="'+dataGets.routes[i].route_id+'"><a href="#ruta?route_id="'+dataGets.routes[i].route_id+'"><div class="ruta_troncal">'+
        dataGets.routes[i].route_short_name +
        '</div>'+
        dataGets.routes[i].route_long_name +
        '</a></li>'
      );
      break;
    default:

      $("#ul_listado_rutas").append('<li class="li_ruta" route_id="'+dataGets.routes[i].route_id+'"><a href="#ruta?route_id='+dataGets.routes[i].route_id+'"><div class="ruta_troncal" style="background-color:#'+dataGets.routes[i].route_color+'">'+
        dataGets.routes[i].route_short_name +
        '</div>'+
        dataGets.routes[i].route_long_name +
        '</a></li>'
      );
      break;
  }
 }

$("#ul_listado_alimentadores").append('<li height="400px" style="height: 200px;"><div></div></li>');
$("#ul_listado_rutas").append('<li height="400px" style="height: 200px;"><div></div></li>');
if (listado_rutas_ref!=="") {
    $("#listado_rutas .view").hide();
    $("#listado_rutas .view."+listado_rutas_ref).show();
    $("#listado_rutas .select_horizontal input[ref='"+listado_rutas_ref+"']").attr("checked", "checked");
}
$("#listado_rutas").trigger('create');
$(".li_ruta").click(function(){
  
  localStorage.setItem("route_id", $(this).attr("route_id"));
});
$("#ul_listado_alimentadores").append('<li style="height:80px"></li>');
ui_heigth();
  $("#listado_rutas .select_horizontal .ui-radio").off().on('touchstart',
    function(){

      var view=$(this).find("input").attr("ref");
      listado_rutas_ref=view;
      $("#listado_rutas .view").hide();
      $("#listado_rutas .view."+view).show();

          }
      );

//@ sourceURL=listado_rutas.js