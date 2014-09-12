
render("rutas",{});



$("#origen_planificador").html(planifica.departure);
$("#destino_planificador").html(planifica.arrive);
var abbreviation;
var hora_actual;

hora_actual=currentTime();

$('#enrutador').append('<div id="horario_planificador" style="color:black">'+
	currentDay()+'<div>'+hora_actual+' '+abbreviation+'</div> </div>');

runProgram();
//alert("Printing routes");
var contador_respuestas=0;
while (num_transbordos < 3) {
	switch(num_transbordos) {
		case 0:
			for (var i = 0, l=express_route.length; i < l; i++) {
				contador_respuestas++;
				$('#contenedor_recorridos').append('<div class="recorrido">'+
					'<div class="ruta_troncal">'+
					express_route[i].name_route+'</div><div class="tiempo_recorrido">'+
					express_route[i].time_route+' min</div></div>'
				);
			}
			break;
		case 1:
			var max_1_transbordos=4-contador_respuestas ;
			if (max_1_transbordos>0) {
				if (max_1_transbordos>transfer_station.length) {
					max_1_transbordos=transfer_station.length;
				}
				for (var i = 0, l=max_1_transbordos; i < l; i++) {
					contador_respuestas++;
					if (transfer_station[i].stop_name.from_stop == transfer_station[i].stop_name.unto_stop) {
						var station_content="";
						if(transfer_station[i].route1!==""){
							station_content='<div class="ruta_troncal">'+transfer_station[i].route1+
							'</div>';
						}
						station_content=station_content+'<div class="estacion_transbordo">Transbordo: <strong >'+
							transfer_station[i].stop_name.from_stop+'</strong></div>';
						if(transfer_station[i].route2!==""){
							station_content=station_content+'<div class="ruta_troncal">'+transfer_station[i].route2+
							'</div>';
						}
						$('#contenedor_recorridos').append('<div class="recorrido">'+
							station_content+
							'<div class="tiempo_recorrido">'+
							transfer_station[i].timetrip+' min</div></div>'
						);
					}
					else {
						var station_content="";
						if(transfer_station[i].route1!==undefined &&transfer_station[i].route1!==""){
							station_content='<div class="ruta_troncal">'+transfer_station[i].route1+
							'</div>';
						}
						station_content=station_content+'<table class="tranbordo_peatonal" >'+
							'<tr><td rowspan="2" width="30%">'+
						'Transbordo peatonal</td><td class="transbordo_row" width="50%">DE: <span>'+
							transfer_station[i].stop_name.from_stop+'</span></td></tr><tr><td class="transbordo_row" widht=540%">A: <span>'+
							transfer_station[i].stop_name.unto_stop+'</span></td></tr></table>';
						if(transfer_station[i].route2!==undefined && transfer_station[i].route2!==""){
							station_content=station_content+'<div class="ruta_troncal">'+transfer_station[i].route2+
							'</div>';
						}
						$('#contenedor_recorridos').append('<div class="recorrido">'+
							station_content+
							'<div class="tiempo_recorrido">'+
							transfer_station[i].timetrip+' min</div></div>'
						);
					}
				}

			}
			break;
		case 2:
			var max_dos_transbordos=4-contador_respuestas ;
			//for (var i = 0, l=transshipment_route.length; i < l; i++) {
			if (max_dos_transbordos>0) {
				if (max_dos_transbordos>transshipment_route.length) {
					max_dos_transbordos=transshipment_route.length;
				}
				for (var i = 0, l=max_dos_transbordos; i < l; i++) {
//					console.log("On rutas.js executing runProgram() function");
					if (transshipment_route[i].stop_name1.from_stop == transshipment_route[i].stop_name1.unto_stop) {
						if (transshipment_route[i].stop_name2.from_stop == transshipment_route[i].stop_name2.unto_stop) {
							var recorrido_transbordo='<div class="recorrido">';
							if (transshipment_route[i].route1) {
								recorrido_transbordo=recorrido_transbordo+'<div class="ruta_troncal">'+
													transshipment_route[i].route1+'</div>';
							}
							recorrido_transbordo=recorrido_transbordo+'<div class="estacion_transbordo">Transbordo 1: <strong >'+
								transshipment_route[i].stop_name1.from_stop+'</strong></div><div class="ruta_troncal">'+
								transshipment_route[i].route2+'</div><div class="estacion_transbordo">Transbordo 2: <strong >'+
								transshipment_route[i].stop_name2.from_stop+'</strong></div>';
							if (transshipment_route[i].route3) {
								recorrido_transbordo=recorrido_transbordo+'<div class="ruta_troncal">'+transshipment_route[i].route3+
								'</div>';
							}
							recorrido_transbordo=recorrido_transbordo+'<div class="tiempo_recorrido">'+
								transshipment_route[i].timetrip+' min</div></div>';
							$('#contenedor_recorridos').append(recorrido_transbordo
							);
						}
						else {
							var recorrido_transbordo='<div class="recorrido">';
							if (transshipment_route[i].route1) {
								recorrido_transbordo=recorrido_transbordo+'<div class="ruta_troncal">'+
													transshipment_route[i].route1+'</div>';
							}
							recorrido_transbordo=recorrido_transbordo+'<div class="estacion_transbordo">Transbordo 1: <strong >'+
								transshipment_route[i].stop_name1.from_stop+'</strong></div><div class="ruta_troncal">'+
								transshipment_route[i].route2+'</div><table class="tranbordo_peatonal" ><tr><td rowspan="2" width="30%">'+
								'Transbordo peatonal</td><td class="transbordo_row" width="50%">DE: <span>'+
								transshipment_route[i].stop_name2.from_stop+'</span></td></tr><tr><td class="transbordo_row" widht=540%">A: <span>'+
								transshipment_route[i].stop_name2.unto_stop+'</span></td></tr></table>';
							if (transshipment_route[i].route3) {
								recorrido_transbordo=recorrido_transbordo+'<div class="ruta_troncal">'+transshipment_route[i].route3+
								'</div>';
							}
							recorrido_transbordo=recorrido_transbordo+'<div class="tiempo_recorrido">'+transshipment_route[i].timetrip+' min</div></div>';
							$('#contenedor_recorridos').append(recorrido_transbordo);
						}
					}
					else {
						if (transshipment_route[i].stop_name2.from_stop == transshipment_route[i].stop_name2.unto_stop) {
							var recorrido_transbordo='<div class="recorrido">';
							if (transshipment_route[i].route1) {
								recorrido_transbordo=recorrido_transbordo+'<div class="ruta_troncal">'+
													transshipment_route[i].route1+'</div>';
							}
							recorrido_transbordo=recorrido_transbordo+'<table class="tranbordo_peatonal" ><tr><td rowspan="2" width="30%">'+
								'Transbordo peatonal</td><td class="transbordo_row" width="50%">DE: <span>'+
								transshipment_route[i].stop_name1.from_stop+'</span></td></tr><tr><td class="transbordo_row" widht=540%">A: <span>'+
								transshipment_route[i].stop_name1.unto_stop+'</span></td></tr></table><div class="ruta_troncal">'+
								transshipment_route[i].route2+'</div><div class="estacion_transbordo">Transbordo 2: <strong >'+
								transshipment_route[i].stop_name2.from_stop+'</strong></div>';
							if (transshipment_route[i].route3) {
								recorrido_transbordo=recorrido_transbordo+'<div class="ruta_troncal">'+transshipment_route[i].route3+
								'</div>';
							}
							recorrido_transbordo=recorrido_transbordo+'<div class="tiempo_recorrido">'+
								transshipment_route[i].timetrip+' min</div></div>';
							$('#contenedor_recorridos').append(recorrido_transbordo
							);

						}
						else {
							var recorrido_transbordo='<div class="recorrido">';
							if (transshipment_route[i].route1) {
								recorrido_transbordo=recorrido_transbordo+'<div class="ruta_troncal">'+
													transshipment_route[i].route1+'</div>';
							}
							recorrido_transbordo=recorrido_transbordo+'<table class="tranbordo_peatonal" ><tr><td rowspan="2" width="30%">'+
								'Transbordo peatonal</td><td class="transbordo_row" width="50%">DE: <span>'+
								transshipment_route[i].stop_name1.from_stop+'</span></td></tr><tr><td class="transbordo_row" widht=540%">A: <span>'+
								transshipment_route[i].stop_name1.unto_stop+'</span></td></tr></table><div class="ruta_troncal">'+
								transshipment_route[i].route2+'</div><table class="tranbordo_peatonal" ><tr><td rowspan="2" width="30%">'+
								'Transbordo peatonal</td><td class="transbordo_row" width="50%">DE: <span>'+
								transshipment_route[i].stop_name2.from_stop+'</span></td></tr><tr><td class="transbordo_row" widht=540%">A: <span>'+
								transshipment_route[i].stop_name2.unto_stop+'</span></td></tr></table>';
							if (transshipment_route[i].route3) {
								recorrido_transbordo=recorrido_transbordo+'<div class="ruta_troncal">'+transshipment_route[i].route3+
								'</div>';
							}
							recorrido_transbordo=recorrido_transbordo+'<div class="tiempo_recorrido">'+
								transshipment_route[i].timetrip+' min</div></div>';
							$('#contenedor_recorridos').append(recorrido_transbordo
							);
						}
					}
				}
		}
		break;
		}
	num_transbordos++;
}
	
$("#contenedor_recorridos").append('<div style="height:100px"></div>');
$("#rutas").trigger('create');
boton_back ("rutas");

if (no_routes) {
	$('#contenedor_recorridos').append('<div class="recorrido"><div class="estacion_transbordo">'+no_routes+'</div></div>');
}
if (select_station_incorrect) {
	$('#contenedor_recorridos').append('<div class="recorrido"><div class="estacion_transbordo">'+
		select_station_incorrect+'</div><div>Intentar de nuevo</div></div>'
	);
}

//cualquiera();
$('#contenedor_recorridos').append('<li height="700px"></li>');
$("#rutas").trigger('create');
window.planifica.departure=null;
window.planifica.arrive=null;

ui_heigth();

//@ sourceURL=rutas.js