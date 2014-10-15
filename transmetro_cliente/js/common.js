
var time_inicio=new Date().getTime();


var planifica={};
var dataGets={};
var num_transbordos=0;
var express_route=[];
var transfer_station=[];
var transshipment_route=[];
var no_routes=false;
var select_station_incorrect=false;
var position={};
var url_data='http://199.89.55.130/prueba/';

var listado_estaciones_ref="";
var listado_rutas_ref="";

  if (!Array.prototype.last){
      Array.prototype.last = function(){
          return this[this.length - 1];
      };
  }


window.enable_change_page=false;
//localStorage.clear();
function change_page(url){
    enable_change_page=false;
    $("#block_page").show(1,function  () {
     
      $.mobile.changePage(url);
      
    });
}
var version_lower=AndroidVersion_lower();
function ui_heigth(){
  
    //alert("adsfafd");
    enable_change_page=true;
       
  $('.ui-page').off('pageshow').on('pageshow',function(event, ui){
    document.getElementById("block_page").style.display = "none";

    
     //document.getElementById("block_page").style.display = "none";
     if (!version_lower) {
      $(".ui-page").height($(window).height());
    }
  });
  
}


function loadFileUpdate () {          //From server
  var data_server=false;
  connectionStatus = navigator.onLine;
  if (connectionStatus) {
    $.getJSON( url_data+"/uploads/update.json", function( data, status ) { //Must change current url to server url
      dataGets.update = data;
      if (status=='success') {
        if (!localStorage.getItem("update")) {
          localStorage.setItem("update", JSON.stringify(dataGets.update));
        }
        loadDataServer();
      }
    });
  }
  else {
    $.getJSON( "datajson/update.json", function( data, status ) {   // *** NO CHANGE path*** ---/
      dataGets.update = data;
      if (status=='success') {
        if (!localStorage.getItem("update")) {
          localStorage.setItem("update", JSON.stringify(dataGets.update));
        }
        loadDataServer();
      }
    });
  }
}
loadFileUpdate();

Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

Array.prototype.uniqueArrayObjects=function(a){
     return function(){
        return this.filter(a)
     }
   }(function(a,b,c){
     var tmp=[]; 
     c.forEach(function(el){
        tmp.push(JSON.stringify(el))
    }); 
    return tmp.indexOf(JSON.stringify(a),b+1)<0
});
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};
Array.prototype.duplicated=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)>0
});

Array.prototype.compare = function (array) {
    if (!array)
        return false;

    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].compare(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            return false;
        }
    }
    return true;
}

Array.prototype.noduplicated = function (array) {
  single=[];
  for (var i = 0, l=this.length; i < l; i++) {
    if (array.indexOf(this[i]) < 0 ) {
      single.push(this[i]);
    };
  };
  return this.value=single;
}

function changePage(page){

  if(navigator.userAgent.match(/OS/i) || navigator.userAgent.match(/Android/i)){

    $.mobile.changePage(page);
  }else{
   window.location.href = page;
 }
}
var rutas_por_id=null;
var stops_por_id=null;
var rutas_cf=null;
var stops_cf=null;
function load_cf_routes(){
    rutas_cf = crossfilter(dataGets.routes);
    rutas_por_id=rutas_cf.dimension(function(d) { return d.route_id; });
}


function load_cf_stops(){
    stops_cf = crossfilter(dataGets.stops);
    stops_por_id=stops_cf.dimension(function(d) { return d.stop_id; });
}
function loadDataServer(){            //From server ---/
  var first_data = (!localStorage.getItem("routes") || !localStorage.getItem("stops") || !localStorage.getItem("transfer"));
  var connectionStatus = navigator.onLine;
  if ((connectionStatus && updateAvailable()) || (connectionStatus && first_data)) {
    document.getElementById("block_page").style.display = "block";
    $.getJSON( url_data+"/uploads/stationsTM.json", function( data, status ) { //Must change current url to server url
      dataGets.stops = data;
      load_cf_stops();
      if (status=='success') {
        localStorage.setItem("stops", JSON.stringify(dataGets.stops));
      }
    });
    $.getJSON( url_data+"/uploads/routesTM.json", function( data, status ) { //Must change current url to server url
      dataGets.routes = data;
      load_cf_routes();
      if (status=='success') {
        localStorage.setItem("routes", JSON.stringify(dataGets.routes));
      }
    });
   
    $.getJSON( url_data+"/uploads/transferTM.json", function( data, status ) {  //Must change current url to server url
      dataGets.transfer = data;
      if (status=='success') {
        localStorage.setItem("transfer", JSON.stringify(dataGets.transfer));
      }
    });
    document.getElementById("block_page").style.display = "none";
    customAlert("Data server are loaded");
  }
  else {
    loadingDataFromLS();
  }

}

function isEmptyJSON(obj) {
  for(var i in obj) { return false; }
  return true;
}

function loadingDataFromLS () {           //Datas are loaded from local storage ---/ 
  if (localStorage.getItem("routes") && localStorage.getItem("stops") && localStorage.getItem("transfer")) {
    //alert("Cargando datos de local storage");
    dataGets.routes = JSON.parse(localStorage.getItem("routes"));
    dataGets.stops = JSON.parse(localStorage.getItem("stops"));
    //dataGets.service = JSON.parse(localStorage.getItem("service"));
    dataGets.transfer = JSON.parse(localStorage.getItem("transfer"));
	load_cf_routes();
	load_cf_stops();
  }
  else {
    customAlert("No hay datos cargados.\nNecesita internet.");
  }
}

function updateAvailable () {
  var update_available = false;
  var fecha = new Date();
  
  fecha_actual = (fecha.getMonth()+1)+"/"+fecha.getDate() +"/"+fecha.getFullYear();
  var local_file_update = JSON.parse(localStorage.getItem("update"));

  var server_start_date = formatDate(dataGets.update.start_date);
  var server_end_date = formatDate(dataGets.update.end_date);
  var local_start_date = formatDate(local_file_update.start_date);
  var local_end_date = formatDate(local_file_update.end_date);
  if (localStorage.update==JSON.stringify(dataGets.update)) {
    return false;
  }else{
    localStorage.setItem("update", JSON.stringify(dataGets.update));
    return true;
    
  }
  if (localStorage.update==JSON.stringify(dataGets.update)) {
    return false;
  }
  else {
    if (dateCompare(fecha_actual, local_end_date)) {
      update_available = false;
    }
    else if ( dateCompare(server_start_date, fecha_actual) &&  dateCompare(fecha_actual, server_end_date)){
      update_available = true;
      localStorage.setItem("update", JSON.stringify(dataGets.update));
    }
    else {
      update_available = false;
    }
  }
  console.log(update_available);
  return update_available;
}

function formatDate (date) {    //Return format date's MM/DD/YYYY for date plane YYYYMMDD
  var fecha;
  if (date.indexOf("/")>0) {
    return date;
  };
  for (i=0, longitud = date.length; i<longitud; i++) {
    switch(i) {
      case 0: ano=date[i]+date[i+1]+date[i+2]+date[i+3]; break;
      case 4: mes=date[i]+date[i+1]; break;
      case 6: dia=date[i]+date[i+1]; break;
    }
  }
  return fecha=mes+"/"+dia+"/"+ano;
}

function dateCompare (date1, date2) {     //if date1 is less than date2 return true ---/
  var dateA = new Date(date1);
  var dateB = new Date(date2);
  if (dateA <= dateB){
    return true;
  }
  else return false;
}
function timeToSeconds(time) {
  time = time.split(/:/);
  return time[0] * 3600 + time[1] * 60 + time[2] * 1;
}

function currentTime() {
  var fecha = new Date();
  //var hora = fecha.toLocaleTimeString();
  var hora = (fecha.getHours()%12 ==0 ? 12 : fecha.getHours()%12 )+":"+(fecha.getMinutes() >= 10 ? fecha.getMinutes() : "0"+fecha.getMinutes()); 
  abbreviation = (fecha.getHours()%24) < 12 ? 'am' : 'pm';
  return hora;
}

function currentDay() {
  var fecha = new Date;
  //var day = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  var day = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  var dia = day[fecha.getDay()];
  return dia;
}

function previousDay() {
  var fecha = new Date;
  //var day = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  var day = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  var dia = day[(fecha.getDay()-1)<0 ? 6 : (fecha.getDay()-1)];
  return dia;
}

function customAlert(message)
{
  if(navigator.userAgent.match(/OS/i) || navigator.userAgent.match(/Android/i)){

    //navigator.notification.vibrate(1000);

    navigator.notification.alert(message,
      function  () {},
      'Transmetro',
      'Cerrar'
      );

  }else{

    alert(message);
  }
}


var render=function(tmpl_name, tmpl_data) {

  if ( !render.tmpl_cache ) {
    render.tmpl_cache = {};
  }

  if ( ! render.tmpl_cache[tmpl_name] ) {

    var tmpl_dir = './static/templates';
    var tmpl_url = tmpl_dir + '/' + tmpl_name + '.html';

    var tmpl_string;
    $.ajax({
      url: tmpl_url,
      method: 'GET',
      async: false,
      success: function(data) {

        tmpl_string = data;
      }
    });
    
    render.tmpl_cache[tmpl_name] = _.template(tmpl_string);

  }

  $("#"+tmpl_name).html(render.tmpl_cache[tmpl_name](tmpl_data));
  //$("#"+tmpl_name).trigger('create');
  $.mobile.loading( "hide");

  // $("#"+tmpl_name+" .footer .btn_footer").off('touchstart').on('touchstart',function  () {

  //   $.mobile.loading( "show" );
  //   var href=$(this).attr("href");
  //   $.mobile.changePage( href);
  // });
};

jQuery( document).on( "pagebeforeshow", function( event,data) {
//console.log('inicio_before_change'+ (new Date().getTime()-time_inicio));
 //console.log(data);
 //console.log($.mobile.activePage.attr('id'));
  $page=$.mobile.activePage.attr('id');
  var nameScript=$.mobile.activePage.attr('id');
  if (nameScript) {
    $.getScript("js/controllers/"+nameScript+".js");
  }

}
);
function select_radio (tmpl_name) {
    $("#"+tmpl_name+" .select_horizontal .ui-radio").off().on('touchstart',
    function(){
      var view=$(this).find("input").attr("ref");
      $("#"+tmpl_name+" .view").hide();
      $("#"+tmpl_name+" .view."+view).show();


          }
    );
}
function boton_back (tmpl_name) {
    enable_change_page=false;

    $("#"+tmpl_name+"  .atras").off('touchstart').on('touchstart',function  (event) {
    $("#block_page").show(1,function  () {
      $.mobile.back();
    });
    event.stopPropagation();
    return false;

  });
}

function timeVerify (start_time, end_time) {
  var fecha = new Date();
  var fecha_hora=fecha.getHours();
  if(fecha_hora<10){
    fecha_hora="0"+fecha.getHours();
  }
  var fecha_minutos=fecha.getMinutes();
  if(fecha_minutos<10){
   fecha_minutos="0"+fecha.getMinutes();
  }
  var fecha_segundos=fecha.getSeconds();
  if(fecha_segundos<10){
     fecha_segundos="0"+fecha.getSeconds();
  }
  
  var hora_actual = fecha_hora + ":" + fecha_minutos + ":" + fecha_segundos;
  //var hora_actual = fecha.toLocaleTimeString();
  if ((hora_actual > start_time ) && (hora_actual < end_time) ) {
    return true;
  }
  else return false;
}

function serviceVerify (range) {
  var fecha = new Date();
  var response;
  switch(fecha.getDay()){
    case 0:
      if (range.hasOwnProperty("D")) {
        var lon = range.D.length;
        for (var i = 0; i < lon; i++) {
          if (timeVerify(range.D[i].start_time, range.D[i].end_time) ){
            return [true, "D", range.D[i].secuencia];
          }
        };
        return [false];
      }
      else return [false];
      break;

    case 6:
      if (range.hasOwnProperty("S")) {
        var lon = range.S.length;
        for (var i = 0; i < lon; i++) {
          if (timeVerify(range.S[i].start_time, range.S[i].end_time) ){
            return [true, "S", range.S[i].secuencia];
          };
        };
        return [false];
      }
      else return [false];
      break;

    default:
      if (range.hasOwnProperty("H")) {
        var lon = range.H.length;
        for (var i = 0; i < lon; i++) {
          if (timeVerify(range.H[i].start_time, range.H[i].end_time) ){
            return [true, "H", range.H[i].secuencia];
          };
        };
        return [false];
      }
      else return [false];
      break;
  };
}


function defineRoute (station_depart_id, station_arrive_id){
  var define_route=[];
  var define_timetrip=[];
  //console.log("departure_id: "+station_depart_id);
  //console.log("arrive_id: "+station_arrive_id);
  var longitud_i = dataGets.routes.length;
  for (var i = 0; i < longitud_i; i++){
    var service_route = serviceVerify(dataGets.routes[i].range);
    if (service_route[0]) {
      switch(service_route[1]) {
        case "D":
          var secuencia_id = service_route[2];
          break;
        case "S":
          var secuencia_id = service_route[2];
          break;
        case "H":
          var secuencia_id = service_route[2];
          break;
        default:
          var secuencia_id = service_route[2];
          break;
      };
    }
    else {
      //console.log("No esta disponible en este horario");
      continue;
    }
    var longitud_j = dataGets.routes[i].secuencia.length;
    for (var j = 0; j < longitud_j; j++) {
      if (secuencia_id === dataGets.routes[i].secuencia[j][0]) {
        var longitud_k = dataGets.routes[i].secuencia[j].stops.length;
        for (var k = 0; k < longitud_k; k++) {
          for (var l = 0; l < longitud_k; l++) {
            
              if ( (dataGets.routes[i].secuencia[j].stops[k].stop_id == station_depart_id) &&
                      (dataGets.routes[i].secuencia[j].stops[l].stop_id == station_arrive_id)
                      )
              {
                
                if ((parseInt(dataGets.routes[i].secuencia[j].stops[k].stop_sequence,0) <
                       parseInt(dataGets.routes[i].secuencia[j].stops[l].stop_sequence,0))) {
                        define_route.push(dataGets.routes[i].route_short_name);
                        define_timetrip.push((timeToSeconds(dataGets.routes[i].secuencia[j].stops[l].arrival_time) -
                                   (timeToSeconds(dataGets.routes[i].secuencia[j].stops[k].arrival_time)))/60);

                }else{
                  if ((parseInt(dataGets.routes[i].secuencia[j].stops[k].stop_sequence,0) >
                       parseInt(dataGets.routes[i].secuencia[j].stops[l].stop_sequence,0))&&is_transfer(dataGets.routes[i].route_id)) {
                        define_route.push(dataGets.routes[i].route_short_name);
                        define_timetrip.push(((timeToSeconds(dataGets.routes[i].secuencia[j].stops.last().arrival_time)-timeToSeconds(dataGets.routes[i].secuencia[j].stops[k].arrival_time) )+
                                   (timeToSeconds(dataGets.routes[i].secuencia[j].stops[l].arrival_time)-timeToSeconds(dataGets.routes[i].secuencia[j].stops[0].arrival_time)))/60);
                        


                }

              }
              
              }
              
            }
          }
        }
      }
    }


  if (define_route.length===0) {
    return false;
  }

  var timesAndRoutes = [];
  
  longitud_i = define_route.length;

  for (var i = 0; i < longitud_i; i++) {
    timesAndRoutes.push({'time_route': define_timetrip[i], 'name_route': define_route[i] });
  }
  timesAndRoutes=timesAndRoutes.uniqueArrayObjects();
  timesAndRoutes.sort(function(a, b) {
    return a.time_route - b.time_route;
  });

  return timesAndRoutes;
}

function addScript( url, callback ) {
    var script = document.createElement( 'script' );
    if( callback ) script.onload = callback;
    script.type = 'text/javascript';
    script.src = url;
    document.body.appendChild( script );
}
/*
Arroja un array con dos vectores
el primero las rutas que pasan por station_depart_id
el segundo las rutas que pasan por station_arrive_id
*/
function selectRoutes (station_depart_id, station_arrive_id) {
  var routeDeparture=[];
  var routeArrive=[];
  var longitud_i = dataGets.routes.length;
  for (var i = 0; i < longitud_i; i++){
    var service_route = serviceVerify(dataGets.routes[i].range);
    if (service_route[0]) {
      switch(service_route[1]) {
        case "D":
          var secuencia_id = service_route[2];
          break;
        case "S":
          var secuencia_id = service_route[2];
          break;
        case "H":
          var secuencia_id = service_route[2];
          break;
      };  
    }
    else {
      continue;
    }
    var longitud_j = dataGets.routes[i].secuencia.length;
    for (var j = 0; j < longitud_j; j++) {
      if (secuencia_id ==   dataGets.routes[i].secuencia[j][0]) {
        var longitud_k = dataGets.routes[i].secuencia[j].stops.length;
        for (var k = 0; k < longitud_k; k++) {
          if (dataGets.routes[i].secuencia[j].stops[k].stop_id == station_depart_id ) {
            routeDeparture.push(dataGets.routes[i]);
            break;
          }
          else if (dataGets.routes[i].secuencia[j].stops[k].stop_id == station_arrive_id) {
            routeArrive.push(dataGets.routes[i]);
            break;
          };
        };
      };
    };
  };
  return [routeDeparture, routeArrive];
}

function load_google(function_onload) {
  if(typeof(google) == "undefined"){
    //addScript( 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC5Fg9nz4EE0Qbt2J0X0JCSlPziC09NYk8&sensor=false&callback=mapsApiReady',function_onload );
  }
}
function verify_google (function_name) {
  var fn = window[function_name];
  if(typeof fn === 'function') {
    if(!window.navigator.onLine){
   

    }else{
      if (typeof (google) === 'undefined') {
        addScript( 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC5Fg9nz4EE0Qbt2J0X0JCSlPziC09NYk8&sensor=false&callback='+function_name);
      }else{
        fn();
      }
    }
  }else{
    alert("error");
  }
  
}


function nonRoutesRepeat (untransbordo) {
  var longitud_i = untransbordo.length;
  array_transbordos=[];

  for (var i = 0; i < longitud_i; i++) {
    var longitud_o = array_transbordos.length;
    have_routes_repeat=false;

    for (var o = 0; o < longitud_o; o++) {
      if (array_transbordos[o].route1===untransbordo[i].route1&&array_transbordos[o].route2===untransbordo[i].route2) {
          have_routes_repeat=true
      };

    }
    if (!have_routes_repeat) {
     array_transbordos.push(untransbordo[i]) ;
    };
    
  }
  return array_transbordos;
  
}
function nonNegativeRoutes (untransbordo) {

  var validate_negative=true;
  if (!(get_location_type (stopid_departure)==1 && get_location_type (stopid_arrive)==1)) {
    validate_negative=false;
  }else{
    if ((stopid_departure>200&&stopid_departure<300)&&((stopid_arrive>100&&stopid_arrive<120)||stopid_arrive=="20300")||
        (stopid_arrive>200&&stopid_arrive<300)&&((stopid_departure>100&&stopid_departure<120)||stopid_departure=="20300")
        )
    {
      validate_negative=false;
    }
  }
  if (validate_negative) {
    var non_negative=[];

    var longitud_total = distanceBetweenStops(stopid_departure, stopid_arrive);
    var departure_station = getStation(stopid_departure);
    var arrive_station    = getStation(stopid_arrive);

    var longitud_i = untransbordo.length;
    for (var i = 0; i < longitud_i; i++) {
      dist_transbordo1 = distanceBetweenStops(departure_station, untransbordo[i].stop_name.from_stop, "stop_name");
      dist_transbordo2 = distanceBetweenStops(untransbordo[i].stop_name.unto_stop, arrive_station, "stop_name");
      if (untransbordo[i].stop_name.from_stop == untransbordo[i].stop_name.unto_stop) {
        if (dist_transbordo1 < longitud_total && dist_transbordo2 < longitud_total) {
          non_negative.push(untransbordo[i]);
        };
      }
      else {
        non_negative.push(untransbordo[i]);
      };
    };
    

  }else{
    non_negative=untransbordo;
  }
  
  
  return non_negative;
}

function distanceBetweenStops (stop1, stop2, name_or_id) {  //Ingresar en el 3o stop_id o stop_name de acuerdo sea stop1 y stop2
  var punto1={};
  var punto2={};
  var vector;
  if(arguments.length==2){
    name_or_id = "stop_id";
  }
  switch(name_or_id) {
   case "stop_id":
      var longitud_i = dataGets.stops.length;
      for (var i = 0; i < longitud_i; i++) {
        if (stop1 == dataGets.stops[i].stop_id) {
          punto1.lat = dataGets.stops[i].stop_lat;
          punto1.lon = dataGets.stops[i].stop_lon;
          if (stop2.lat && stop2.lon) {
            break;
          };
        }
        else if (stop2 == dataGets.stops[i].stop_id) {
          punto2.lat = dataGets.stops[i].stop_lat;
          punto2.lon = dataGets.stops[i].stop_lon;
          if (stop1.lat && stop1.lon) {
            break;
          };
        };
      };
      break;

    case "stop_name":
      var longitud_i = dataGets.stops.length;
      for (var i = 0; i < longitud_i; i++) {
        if (stop1 == dataGets.stops[i].stop_name) {
          punto1.lat = dataGets.stops[i].stop_lat;
          punto1.lon = dataGets.stops[i].stop_lon;
          if (stop2.lat && stop2.lon) {
            break;
          };
        }
        else if (stop2 == dataGets.stops[i].stop_name) {
          punto2.lat = dataGets.stops[i].stop_lat;
          punto2.lon = dataGets.stops[i].stop_lon;
          if (stop1.lat && stop1.lon) {
            break;
          };
        };
      };
      break;
  }

  vector = Math.sqrt(Math.pow((punto1.lon-punto2.lon),2)+Math.pow((punto1.lat-punto2.lat),2));

  return vector;
}
function is_transfer(route_id) {
  var longitud_o = dataGets.transfer.length;
  var break_transfer=false;
  for (var o = 0; o < longitud_o; o++) {
    if (route_id == dataGets.transfer[o].route_id) {
        
            
            break_transfer=true;
            break;
          }
  }
  return break_transfer;
}
function unTransbordo (station_depart_id, station_arrive_id) {
  console.time("unTransbordo");


  var unRouteDeparture=[];
  var unRouteArrive=[];
  var stopsDep=[];
  var stopsArr=[];
  var conect_stop=[];
  var define_untransbordo=[];

  unRoute=selectRoutes(station_depart_id, station_arrive_id);
  unRouteDeparture=unRoute[0];
  unRouteArrive=unRoute[1];
  //debugger;
  if (unRouteDeparture.compare(unRouteArrive) || unRouteDeparture.length==0 || unRouteArrive.length==0) {

    return false;
  }

  else {
    var tmp_unRouteDeparture = unRouteDeparture.noduplicated(unRouteArrive);
    var tmp_unRouteArrive = unRouteArrive.noduplicated(unRouteDeparture);

    if (tmp_unRouteDeparture.length==0 || tmp_unRouteArrive.length==0) {
      return false;
    };
    longitud_o = dataGets.transfer.length;
    

    longitud_i = tmp_unRouteDeparture.length;
    longitud_j = tmp_unRouteArrive.length;
   
    for (var i = 0; i < longitud_i; i++) {
 
      for (var j = 0; j < longitud_j; j++) {
   
        
        longitud_o = dataGets.transfer.length;
        var break_transfer=false;
        var transfer_route="";
        var transfer_stop="";
        var transfer_stop_sequence="";
        var only_pedestrian=0;
      
        for (var o = 0; o < longitud_o; o++) {
          if (tmp_unRouteDeparture[i].route_id == dataGets.transfer[o].route_id) {
            //if (dataGets.transfer[o].stop_sequence==0) {
            only_pedestrian=dataGets.transfer[o].only_pedestrian;
              
              
              
              var range_transfer=serviceVerify(tmp_unRouteDeparture[i].range);
              if (range_transfer[0]) {
                break_transfer=true;
                
                for (var p = tmp_unRouteDeparture[i].secuencia.length - 1; p >= 0; p--) {
                  if (range_transfer[2]==tmp_unRouteDeparture[i].secuencia[p][0]) {
                    for (var q = tmp_unRouteDeparture[i].secuencia[p].stops.length - 1; q >= 0; q--) {
                      tmp_unRouteDeparture[i].secuencia[p].stops[q].stop_id;
                      if (tmp_unRouteDeparture[i].secuencia[p].stops[q].stop_id==dataGets.transfer[o].pedestrian_stop) {
                        transfer_route=dataGets.transfer[o].route_id;
                        transfer_stop=dataGets.transfer[o].stop_id;
                        transfer_stop_sequence=dataGets.transfer[o].stop_sequence;
                        transfer_stop_arrive=dataGets.transfer[o].pedestrian_stop;
                        break;

                      };
                    };

                  };
                };

              };
              
              
              break;

              
            //}
            
          }
          else if (tmp_unRouteArrive[j].route_id == dataGets.transfer[o].route_id) {
            only_pedestrian=dataGets.transfer[o].only_pedestrian;
            var range_transfer=serviceVerify(tmp_unRouteArrive[j].range);
              
                
              
              if (range_transfer[0]) {
                break_transfer=true;
                
                for (var p = tmp_unRouteArrive[j].secuencia.length - 1; p >= 0; p--) {
                  if (range_transfer[2]==tmp_unRouteArrive[j].secuencia[p][0]) {
                    for (var q = tmp_unRouteArrive[j].secuencia[p].stops.length - 1; q >= 0; q--) {
                      tmp_unRouteArrive[j].secuencia[p].stops[q].stop_id;
                      if (tmp_unRouteArrive[j].secuencia[p].stops[q].stop_id==dataGets.transfer[o].pedestrian_stop) {
                        transfer_route=dataGets.transfer[o].route_id;
                        transfer_stop=dataGets.transfer[o].stop_id;
                        transfer_stop_sequence=dataGets.transfer[o].stop_sequence;
                        transfer_stop_arrive=dataGets.transfer[o].pedestrian_stop;
                        break;

                      };
                    };

                  };
                };

              };
              break;
            //}
          };
        };
        
          var longitud_k = tmp_unRouteDeparture[i].secuencia.length;
         
          for (var k = 0; k < longitud_k; k++) {
            
            var longitud_l = tmp_unRouteArrive[j].secuencia.length;
            var break_longitud=false;
            for (var l = 0; l < longitud_l; l++) {
              if (break_transfer) {
                if (tmp_unRouteDeparture[i].route_id == transfer_route) {
                  

                  conect_stop.push({"arrive": transfer_stop_arrive,
                                    "depart": transfer_stop}); 
                 break_longitud=true; 
                  
                }
                else if (tmp_unRouteArrive[j].route_id == transfer_route) {
                  
                
                  conect_stop.push({"arrive": transfer_stop,
                                    "depart": transfer_stop_arrive });
                  break_longitud=true;
                  
                };
              }
              if (only_pedestrian==0) {  

              
      
                var longitud_m = tmp_unRouteDeparture[i].secuencia[k].stops.length;
                var longitud_n = tmp_unRouteArrive[j].secuencia[l].stops.length;
                for (var m = 0; m < longitud_m; m++) {
                  for (var n = 0; n < longitud_n; n++) {
                    if ((tmp_unRouteDeparture[i].secuencia[k].stops[m].stop_id) == 
                        (tmp_unRouteArrive[j].secuencia[l].stops[n].stop_id) )
                    {
                      conect_stop.push({"arrive": tmp_unRouteDeparture[i].secuencia[k].stops[m].stop_id,
                                        "depart": tmp_unRouteArrive[j].secuencia[l].stops[n].stop_id});
                      break_longitud=true;
                      break;
                    }
                      else {
                        
                        
                      }
                  };
                  //break;
                };
                //break;

              }
              if (break_longitud) {
                break;
              };
              
            };
            break;
          };
     
        //break; //Correct
      };
    };
    
    conect_stop=conect_stop.uniqueArrayObjects();

    var R1, R2;
    for (var i = 0, l=conect_stop.length; i < l; i++) {
      R1 = defineRoute(station_depart_id, conect_stop[i].arrive);
      R2 = defineRoute(conect_stop[i].depart, station_arrive_id);
      var extra_time = 6;
      if  ((conect_stop[i].depart===station_arrive_id.toString()) && (R1.length===1) ) {
 
        var stations_transfer = {"from_stop": getStation(conect_stop[i].arrive),
                                 "from_stop_id":conect_stop[i].arrive,
                                  "unto_stop": getStation(conect_stop[i].depart),
                                  "unto_stop_id": conect_stop[i].depart

                                };
        define_untransbordo.push({
                                  "route1": R1[0].name_route, 
                                  "stop_name": stations_transfer,
                                  "timetrip":(R1[0].time_route+extra_time) 
                                });

      }
      
      if((station_depart_id.toString()=== conect_stop[i].arrive) && (R2.length===1) ) {
         var stations_transfer = {"from_stop": getStation(conect_stop[i].arrive),
                                  "from_stop_id":conect_stop[i].arrive,
                                  "unto_stop": getStation(conect_stop[i].depart),
                                  "unto_stop_id": conect_stop[i].depart
                                   };
        define_untransbordo.push({ "stop_name": stations_transfer,
                                    "route2": R2[0].name_route, 
                                    "timetrip": (R2[0].time_route+extra_time) });


      }
      if (!R1 || !R2) {
      continue;
      };

      longitud_j = R1.length;
      longitud_k = R2.length;

      for (var j = 0; j < longitud_j; j++) {
        for (var k = 0; k < longitud_k; k++) {
          if (R1[j].name_route===R2[k].name_route) {
            continue
          };
          if (station_depart_id == conect_stop[i].arrive) {
            R1[j].time_route = 0;
            R1[j].name_route = "";
          }
          else if (conect_stop[i].depart == station_arrive_id) {
            R2[k].time_route = 0;
            R2[k].name_route = "";
          };

          var stations_transfer = {"from_stop": getStation(conect_stop[i].arrive),
                                    "from_stop_id":conect_stop[i].arrive,
                                  "unto_stop": getStation(conect_stop[i].depart),
                                  "unto_stop_id":conect_stop[i].depart
                                   };
          
          if (conect_stop[i].arrive == conect_stop[i].depart) {
            extra_time = 4;
          };
          //if (true) {};
          define_untransbordo.push({"route1": R1[j].name_route, "stop_name": stations_transfer,
                                    "route2": R2[k].name_route, "timetrip": 
                                    (R1[j].time_route+R2[k].time_route+extra_time) });
        }
      }

      }



      

    }

    define_untransbordo=define_untransbordo.uniqueArrayObjects();
    //console.log(define_untransbordo);

    if (define_untransbordo.length==0) {
      return false;
    };

    define_untransbordo = nonNegativeRoutes(define_untransbordo);   //definen non negative transhipment
    define_untransbordo.sort(function(a, b) {
      return a.timetrip - b.timetrip;
    });
    define_untransbordo = nonRoutesRepeat(define_untransbordo); 

    if (define_untransbordo.length==0) {
      return false;
    };

    define_untransbordo.sort(function(a, b) {
      return a.timetrip - b.timetrip;
    });

    //console.timeEnd("unTransbordo");
    //define_untransbordo.push({"route1": "K6", "stop_name": "Universidad UN", "route2": "L27", "timetrip": 43});
    return define_untransbordo;
  };
function encontrar_mas_cerca (array_stops,pos_lat,pos_long) {
  
    var rango=0.007;
    //var rango=0.1;
    var rango_long=0.007;
    //var rango_long=0.1;
    var cf = crossfilter(array_stops);
    var porlat = cf.dimension(function(p) { return p.stop_lat; });
    
    porlat.filter([pos_lat-rango, pos_lat+rango]);
    
    //return porlat.top(Infinity);
    
    
    cf=crossfilter(porlat.top(Infinity));
    var porlong = cf.dimension(function(p) { return p.stop_lon*100; });
    
    porlong.filter([(pos_long-rango_long)*100, (pos_long+rango_long)*100]);

    return porlong.top(Infinity);
    
}
function mascerca (array_stops, pos_lat,pos_long) {
  
  var  array_ordenados=[];
  var menor=100;
  var station_near={};
  for (var i = array_stops.length - 1; i >= 0; i--) {

    sqr=Math.sqrt(Math.pow((array_stops[i].stop_lon-pos_long),2)+Math.pow(array_stops[i].stop_lat-pos_lat,2));
    array_stops[i].sqr=sqr;
    array_ordenados.push(array_stops[i]);
    if(sqr<menor){
      menor=sqr;
      station_near=array_stops[i];
    }

    
  }
   array_ordenados = _.sortBy( array_ordenados, 'sqr' );

  array_ordenados.sort();

  return array_ordenados;
  
}
function rutas_conexas (station_depart_id, station_arrive_id) {
  var doRouteDeparture=[];
  var doRouteArrive=[];

  var conect_route=[];


  doRoute=selectRoutes(station_depart_id, station_arrive_id);
  doRouteDeparture=doRoute[0];
  doRouteArrive=doRoute[1];
  var routes_dep = doRouteDeparture.noduplicated(doRouteArrive);
  var routes_arr = doRouteArrive.noduplicated(doRouteDeparture);
  
  if (doRouteDeparture.compare(doRouteArrive) || doRouteDeparture.length==0 || doRouteArrive.length==0) {
    return false;
  }
  if (routes_dep.length==0 || routes_arr.length==0) {
      return false;
  };

    routes_dep = routes_dep.uniqueArrayObjects();
    routes_arr = routes_arr.uniqueArrayObjects();

    var id_selected = [];
    for (var j = 0, l1=routes_arr.length; j < l1; j++) {
      id_selected.push(routes_arr[j].route_id);
    };
    // for (var k = 0,  l2=routes_dep.length; k < l2; k++) {
    //   id_selected.push(routes_dep[k].route_id);
    // };

    id_selected = id_selected.unique();


    longitud_s=dataGets.routes.length;

    for (var s= 0; s < longitud_s; s++) {
      
      if (id_selected.indexOf(dataGets.routes[s].route_id) >= 0) {
        

        conect_route.push(dataGets.routes[s]);
        
      };
    }

    conect_route = conect_route.uniqueArrayObjects();
    
    if (conect_route.length==0) {
      return false;
    };
    return conect_route;


}
/*
1/calcula todas la rutas que tienen en común en conect_route
2.por cada secuencia ystop en conect route 

*/
function dosTransbordos (station_depart_id, station_arrive_id) {
  //console.time("dosTransbordos");
  var conect_route=rutas_conexas (station_depart_id, station_arrive_id)
  if (!conect_route) {
    return false;
  };
  var define_dotransbordo=[];
  console.time("for1");
  for (var i = 0, longitud_i=conect_route.length; i < longitud_i; i++) {
    var range_transfer=serviceVerify(conect_route[i].range);
    var longitud_j = conect_route[i].secuencia.length;
    console.time("forj"+j);
    for (var j = 0; j < longitud_j; j++) {
      if (range_transfer[2]==conect_route[i].secuencia[j][0]) {
        var ruta_transfer=false;
        var longitud_l = dataGets.transfer.length;
        var only_pedestrian=0;
        for (var l = 0; l < longitud_l; l++) {
          if (conect_route[i].route_id == dataGets.transfer[l].route_id) {
            var is_transfer=true;
            var contador_transfer=l;
            only_pedestrian=dataGets.transfer[l].only_pedestrian;
            break;
          }
        }
         
        var longitud_k = conect_route[i].secuencia[j].stops.length;
        for (var k = 0; k < longitud_k; k++) {
          var R1, R2;
          var extra_time = 0;
          var break_transfer=false;

          if (is_transfer) {
          

            if (conect_route[i].secuencia[j].stops[k].stop_id==dataGets.transfer[contador_transfer].pedestrian_stop) {
              if (dataGets.transfer[contador_transfer].stop_id!==station_depart_id && 
                dataGets.transfer[contador_transfer].stop_id!==station_arrive_id) {
                
                var trasbordos_news=conectar_rutas (station_depart_id,station_arrive_id,dataGets.transfer[contador_transfer].stop_id,dataGets.transfer[contador_transfer].pedestrian_stop,extra_time);
                define_dotransbordo=define_dotransbordo.concat(trasbordos_news); 
                
                break_transfer=true;
              }
              
            }

          }
          if (!only_pedestrian) {
            
            var trasbordos_news=conectar_rutas (station_depart_id,station_arrive_id,conect_route[i].secuencia[j].stops[k].stop_id,conect_route[i].secuencia[j].stops[k].stop_id,extra_time);
            if (trasbordos_news.length>0) {
              define_dotransbordo=define_dotransbordo.concat(trasbordos_news);
              break;

            };
            
            
          }else{
            if (break_transfer) {
              break;
            };

          }
        }
        

      };
      
    }
    console.timeEnd("forj"+j)
  }

  console.timeEnd("for1");
  if (define_dotransbordo.length==0) {
    //
    return false;
  };

  define_dotransbordo = define_dotransbordo.uniqueArrayObjects();

  define_dotransbordo.sort(function(a, b) {
    return a.timetrip - b.timetrip;
  });

  //console.timeEnd("dosTransbordos");
  return define_dotransbordo;
}
function conectar_rutas (station_depart,station_arrive,from_stop,unto_stop,extra_time) {
  
  R1 = unTransbordo(station_depart, from_stop);
  R2 = defineRoute(unto_stop, station_arrive);
  define_dotransbordo=[];
  
  stations_transfer = {
    "from_stop": getStation(from_stop),
    "from_stop_id":from_stop,
    "unto_stop": getStation(unto_stop),
    "unto_stop_id":unto_stop
  };
  
  var longitud_m = R1.length;
  var longitud_n = R2.length;
  for (var m = 0; m < longitud_m; m++) {
    for (var n = 0; n < longitud_n; n++) {
      var triptime = (R1[m].triptime + R2[n].time_route + extra_time);
        if (R1[m].stop_name.unto_stop_id!==station_arrive) {
          if (R1[m].route2== undefined) {
            R1[m].route2='';
          };
          define_dotransbordo.push(
          {
            "route1": R1[m].route1, 
            "stop_name1": R1[m].stop_name,
            "route2": R1[m].route2, 
            "stop_name2": stations_transfer,
            "route3": R2[n].name_route, 
            "timetrip":(R1[m].timetrip + R2[n].time_route + extra_time)
            }
          );

      };

    }
  }
  return define_dotransbordo;
}
function dosTransbordos2 (station_depart_id, station_arrive_id) {
  //console.time("dosTransbordos");
  var conect_route=rutas_conexas (station_depart_id, station_arrive_id)
  if (!conect_route) {
    return false;
  };

  var define_dotransbordo=[]; 

  for (var i = 0, longitud_i=conect_route.length; i < longitud_i; i++) {
    var range_transfer=serviceVerify(conect_route[i].range);
    var longitud_j = conect_route[i].secuencia.length;

    for (var j = 0; j < longitud_j; j++) {
      var longitud_k = conect_route[i].secuencia[j].stops.length;
      for (var k = 0; k < longitud_k; k++) {
        var R1, R2;
        var extra_time = 0;
        var stations_transfer;
        var longitud_l = dataGets.transfer.length;
        for (var l = 0; l < longitud_l; l++) {
          if (conect_route[i].route_id == dataGets.transfer[l].route_id) {
            var last_peatonal = false;
            if (dataGets.transfer[l].stop_id!==station_depart_id && 
                dataGets.transfer[l].stop_id!==station_arrive_id) {

              if (range_transfer[0]) {
                  if (range_transfer[2]==conect_route[i].secuencia[j][0]) {

                    for (var q = conect_route[i].secuencia[j].stops.length - 1; q >= 0; q--) {
                      if (conect_route[i].secuencia[j].stops[q].stop_id==dataGets.transfer[l].pedestrian_stop) {
                        R1 = unTransbordo(station_depart_id, dataGets.transfer[l].stop_id);
                        R2 = defineRoute(conect_route[i].secuencia[j].stops[q].stop_id, station_arrive_id);
                        extra_time = 5;
                        stations_transfer = {"from_stop": getStation(dataGets.transfer[l].stop_id),
                                             "unto_stop": getStation(dataGets.transfer[l].pedestrian_stop)};

                        if (conect_route[i].secuencia[j].stops[q].stop_id == station_arrive_id) {
                          var last_peatonal = true;
          
                        }
                      };
                    }
                  }
              }
            };
            break;
          };
        };
        if (!R1 || !R2) {
          R1 = unTransbordo(station_depart_id, conect_route[i].secuencia[j].stops[k].stop_id);
          R2 = defineRoute(conect_route[i].secuencia[j].stops[k].stop_id, station_arrive_id);
          extra_time = 0;
        };

        if (!R1 || !R2) {
          continue;
        };

        var longitud_m = R1.length;
        var longitud_n = R2.length;
        for (var m = 0; m < longitud_m; m++) {
          for (var n = 0; n < longitud_n; n++) {
            if (last_peatonal) {
              R2[n].name_route = "";
              R2[n].time_route = 0;
            }else{         
              stations_transfer = {"from_stop": getStation(conect_route[i].secuencia[j].stops[k].stop_id),
                               "from_stop_id":conect_route[i].secuencia[j].stops[k].stop_id,
                               "unto_stop": getStation(conect_route[i].secuencia[j].stops[k].stop_id),
                               "unto_stop_id":conect_route[i].secuencia[j].stops[k].stop_id
                             };
              if (conect_route[i].secuencia[j].stops[0].stop_id == station_arrive_id) {
                var last_peatonal = true;
                //console.log("Ultimo transbordo peatonal");
              }
              else {
                var last_peatonal = false;
              };     
              var triptime = (R1[m].triptime + R2[n].time_route + extra_time);
              if (R1[m].stop_name.unto_stop_id!==station_arrive_id) {
                define_dotransbordo.push({"route1": R1[m].route1, "stop_name1": R1[m].stop_name,
                                        "route2": R1[m].route2, "stop_name2": stations_transfer,
                                        "route3": R2[n].name_route, "timetrip": 
                                        (R1[m].timetrip + R2[n].time_route + extra_time)
                                      }
                                    );

              };
            }
            
          };
        };
        break;
      };
    };
  };
  

  if (define_dotransbordo.length==0) {
    //console.timeEnd("dosTransbordos");
    return false;
  };

  define_dotransbordo = define_dotransbordo.uniqueArrayObjects();

  define_dotransbordo.sort(function(a, b) {
    return a.timetrip - b.timetrip;
  });

  //console.timeEnd("dosTransbordos");
  return define_dotransbordo;
}

function getStation (station_id) {
  for (var i = 0, l=dataGets.stops.length; i < l; i++) {
    if (station_id == dataGets.stops[i].stop_id) {
      return dataGets.stops[i].stop_name;
    };
  };
}
function get_location_type (station_id) {
    for (var i = 0, l=dataGets.stops.length; i < l; i++) {
    if (station_id == dataGets.stops[i].stop_id) {
      return dataGets.stops[i].location_type;
    };
  };
}

function runProgram () {
  console.time("runProgram");
  num_transbordos = 0;
  no_routes=false;
  select_station_incorrect=false;
  var bool0=true;
  var bool1=true;
  var bool2=true;
  express_route = [];
  transfer_station = [];
  transshipment_route = [];

  if (stopid_departure == stopid_arrive) {
    select_station_incorrect = "NO seleccionar la misma estacion en los dos campos";
    return select_station_incorrect;
  };
  console.time("sintrasbordos");
  express_route = defineRoute(stopid_departure, stopid_arrive);
  if (!express_route) {
    express_route = [];
    bool0 = false;
  };
  console.timeEnd("sintrasbordos");


  console.time("unTransbordo");
  console.log("unTransbordo("+stopid_departure+","+stopid_arrive+")");
  transfer_station = unTransbordo(stopid_departure, stopid_arrive);
  transfer_station=clear_rutes(); 
  if (!transfer_station) {
    transfer_station = [];
    bool1 = false;
  };

  console.timeEnd("unTransbordo");
  console.time("dosTransbordos");
  
  transshipment_route = dosTransbordos(stopid_departure, stopid_arrive);
  transshipment_route = clear_rutes_transshipment();
  if (!transshipment_route) {
    bool2 = false;
    transshipment_route = [];
  };
  console.timeEnd("dosTransbordos");
  

  if (!bool0 && !bool1 && !bool2) {
    
    no_routes="No hay rutas disponibles";
    customAlert(no_routes);
  };
  console.timeEnd("runProgram");
}
function onDeviceReady() {
  

  document.addEventListener("backbutton", function (e) {
    e.preventDefault();
    if (!enable_change_page) {
      //alert("bloqueado");
      e.preventDefault();
    };
            
   }, false );

  navigator.geolocation.getCurrentPosition(load_geo, onError);
  
  
}
function setup() {
    // wait for PhoneGap to load

    if (navigator.userAgent.match(/OS/i) || navigator.userAgent.match(/Android/i)) {
      
      document.addEventListener("deviceready", onDeviceReady, false);
    }else{
      $( document ).ready(function() {
        
        onDeviceReady();
      });
      

    }
        
    
}
function clear_rutes () {
  var el=express_route.length;
  var tl= transfer_station.length;
  var clear_rutes= [];
  for (var i = tl - 1; i >= 0; i--) {
    var bool=true;
    for (var j = el - 1; j >= 0; j--) {
      if ((express_route[j].name_route==transfer_station[i].route1)||(express_route[j].name_route==transfer_station[i].route2)) {
        bool=false;
      };
    
    };
    if(bool){
     clear_rutes.push(transfer_station[i]);
    }
  };
  if (clear_rutes.length==0) {
    return false;
  };
  clear_rutes.sort(function(a, b) {
      return a.timetrip - b.timetrip;
    }); 
  return clear_rutes;
}
function clear_rutes_transshipment () {
  var el=express_route.length;
  var tl= transshipment_route.length;
  var trl= transfer_station.length;
  var clear_rutes= [];
  
  for (var i = tl - 1; i >= 0; i--) {
    var bool=true;
    for (var j = el - 1; j >= 0; j--) {
      if ((express_route[j].name_route==transshipment_route[i].route1)||(express_route[j].name_route==transshipment_route[i].route2)||(express_route[j].name_route==transshipment_route[i].route3)) {
        bool=false;
      };
    
    };
    for (var k = trl - 1; k >= 0; k--) {
      if ((transfer_station[k].route1==transshipment_route[i].route1)||
          (transfer_station[k].route1==transshipment_route[i].route2)||
          (transfer_station[k].route2==transshipment_route[i].route2)||
          (transfer_station[k].route2==transshipment_route[i].route3)
          ) {
        bool=false;
      };
    
    };
    if(bool){
     clear_rutes.push(transshipment_route[i]);
    }
  };
  if (clear_rutes.length==0) {
    return false;
  };
  clear_rutes.sort(function(a, b) {
      return a.timetrip - b.timetrip;
    }); 
  return clear_rutes;
}
var options_geo = {
  enableHighAccuracy: true,
  timeout: 50000,
  maximumAge: 0
};

function getLocation() {
    if (navigator.geolocation) {
       return navigator.geolocation.getCurrentPosition( showPosition, error_geo, options_geo);
    } else {
      customAlert("La geolocacion no es soportada por este dispositivo");
        
    }
}
var position={};
function error_geo () {
  console.log('ERROR(' + err.code + '): ' + err.message);
  
}
function showPosition(position2) {
  position.latitude=position2.coords.latitude;

  position.longitude=position2.coords.longitude;
  var lugares2_p=encontrar_mas_cerca(dataGets.stops,position.latitude, position.longitude);
  var lugares3_q=mascerca(lugares2_p ,position.latitude, position.longitude);
  if (lugares3_q.length!=0) {

    window.planifica.departure=lugares3_q[0].stop_name;
    $("#buscar_origen_input").val(window.planifica.departure);
    stopid_departure=lugares3_q[0].stop_id;  
  };

  
  
}


     


function AndroidVersion_lower() {
  var bool=false;  
  var ua = navigator.userAgent;
  if( ua.indexOf("Android") >= 0 )
  {
    var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
    if (androidversion < 3)
    {

        bool=true;
    }
  }
  return bool;
};
function isDefined( variable) { return (typeof(window[variable]) != "undefined");}
//console.log('fin common'+(new Date().getTime()-time_inicio));
$('#planifica').off('pagebeforechange').on('pagebeforechange',function(event, ui){
    document.getElementById("block_page").style.display = "none";

    
     
  });

setup();
getLocation();

  //document.getElementById("block_page").style.display ="block";