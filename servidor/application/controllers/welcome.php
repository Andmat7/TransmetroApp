<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
error_reporting(E_ALL);
		ini_set('display_errors', '1');

class Welcome extends CI_Controller {
    function __construct()
    {
        parent::__construct();
        $this->load->model('stops');
    }

    function microtime_float()
	{
		list($useg, $seg) = explode(" ", microtime());
		return ((float)$useg + (float)$seg);
	}

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		 mkdir('./datajson/', 0777, TRUE);
		$this->load->view('welcome_message');
	}
	public function zip()
	{	
		$this->load->view('welcome_message');
		error_reporting(E_ALL);
		ini_set('display_errors', '1');
		$file = 'GTFS.zip';
		// get the absolute path to $file
		$path = './uploads/';

		//$path2  = set_include_path("var/www/zip/extractedfiles/");
		//echo "$path2 ";
		$zip = new ZipArchive;
		$res = $zip->open($path.$file);
		echo $res;
		if ($res === TRUE) {
		  // extract it to the path we determined above
		  $zip->extractTo($path);
		  $zip->close();
		  echo "WOOT! $file extracted to $path";
		} else {
		  echo "Doh! I couldn't open $file";
		}
	}

	public function writeStopsOnDB($value='')
	{
		$firstline = 0;
		$file = fopen("./uploads/stops.txt", "r") or exit("Unable to open file!");
		//Output a line of the file until the end is reached
		while(!feof($file))
		{
			$line = fgets($file);
			$word = explode(',', $line);
			print_r($word);
			if ($firstline != 0) {
				$nueva_insercion = $this->stops->nuevo_stop($word[0],$word[1],$word[2],$word[3],$word[4],$word[5],$word[6],$word[7],$word[8]);
			}
			else {$firstline = 1;}
		}
		fclose($file);
	}

	public function writeStop_timesOnDB($value='')
	{
		$firstline = 0;
		$file = fopen("./uploads/stop_times.txt", "r") or exit("Unable to open file!");
		//Output a line of the file until the end is reached
		while(!feof($file))
		{
			$line = fgets($file);
			$word = explode(',', $line);
			print_r($word);
			if ($firstline != 0) {
				$nueva_insercion = $this->stops->nuevo_stoptime($word[0],$word[1],$word[2],$word[3],$word[4],$word[5]);
			}
			else {$firstline = 1;}
		}
		fclose($file);
	}

	public function writeTripsOnDB($value='')
	{
		$firstline = 0;
		$file = fopen("./uploads/trips.txt", "r") or exit("Unable to open file!");
		//Output a line of the file until the end is reached
		while(!feof($file))
		{
			$line = fgets($file);
			$word = explode(',', $line);
			print_r($word);
			if ($firstline != 0) {
				$nueva_insercion = $this->stops->nuevo_trip($word[0],$word[1],$word[2],$word[3],$word[4]);
			}
			else {$firstline = 1;}
		}
		fclose($file);
	}

	public function writeRoutesOnDB($value='')
	{
		$firstline = 0;
		$file = fopen("./uploads/routes.txt", "r") or exit("Unable to open file!");
		//Output a line of the file until the end is reached
		while(!feof($file))
		{
			$line = fgets($file);
			$word = explode(',', $line);
			print_r($word);
			if ($firstline != 0) {
				$nueva_insercion = $this->stops->nuevo_route($word[0],$word[1],$word[2],$word[3],$word[4],$word[5],$word[6],$word[7],$word[8]);
			}
			else {$firstline = 1;}
		}
		fclose($file);
	}

	public function writeCalendarOnDB($value='')
	{
		$firstline = 0;
		$file = fopen("./uploads/calendar.txt", "r") or exit("Unable to open file!");
		//Output a line of the file until the end is reached
		while(!feof($file))
		{
			$line = fgets($file);
			$word = explode(',', $line);
			print_r($word);
			if ($firstline != 0) {
				$nueva_insercion = $this->stops->nuevo_calendar($word[0],$word[1],$word[2],$word[3],$word[4],$word[5],$word[6],$word[7],$word[8],$word[9]);
			}
			else {$firstline = 1;}
		}
		fclose($file);
	}

	public function writeAgencyOnDB($value='')
	{
		$firstline = 0;
		$file = fopen("./uploads/agency.txt", "r") or exit("Unable to open file!");
		//Output a line of the file until the end is reached
		while(!feof($file))
		{
			$line = fgets($file);
			$word = explode(',', $line);
			print_r($word);
			if ($firstline != 0) {
				$nueva_insercion = $this->stops->nuevo_agency($word[0],$word[1],$word[2],$word[3],$word[4],$word[5]);
			}
			else {$firstline = 1;}
		}
		fclose($file);
	}
	
	public function writeFare_attributesOnDB($value='')
	{
		$firstline = 0;
		$file = fopen("./uploads/fare_attributes.txt", "r") or exit("Unable to open file!");
		while(!feof($file))
		{
			$line = fgets($file);
			$word = explode(',', $line);
			print_r($word);
			if ($firstline != 0) {
				$nueva_insercion = $this->stops->nuevo_fare_attributes($word[0],$word[1],$word[2],$word[3],$word[4],$word[5]);
			}
			else {$firstline = 1;}
		}
		fclose($file);
	}

	public function writeShapesOnDB($value='')
	{
		$firstline = 0;
		$file = fopen("./uploads/shapes.txt", "r") or exit("Unable to open file!");
		while(!feof($file))
		{
			$line = fgets($file);
			$word = explode(',', $line);
			print_r($word);
			if ($firstline != 0) {
				$nueva_insercion = $this->stops->nuevo_shapes($word[0],$word[1],$word[2],$word[3]);
			}
			else {$firstline = 1;}
		}
		fclose($file);
	}

	public function writeFeed_infoOnDB($value='')
	{
		$firstline = 0;
		$file = fopen("./uploads/feed_info.txt", "r") or exit("Unable to open file!");
		while(!feof($file))
		{
			$line = fgets($file);
			$word = explode(',', $line);
			print_r($word);
			if ($firstline != 0) {
				$nueva_insercion = $this->stops->nuevo_feed_info($word[0],$word[1],$word[2],$word[3],$word[4],$word[5]);
			}
			else {$firstline = 1;}
		}
		fclose($file);
	}

	public function selectStation()
	{
		//ruta principal
		//alimentadores
		//

		//$query = $this->db->query('RESET QUERY CACHE;');
		date_default_timezone_set('America/Bogota');
		$tiempo_inicio = $this->microtime_float();
		$station = array();
		$this->db->select('*')->from('stops')->where('parent_station =','0')->where('location_type =','1')->order_by('stop_name','asc');
		$query = $this->db->get();
		foreach ($query->result() as $row)
		{
			$station[] = $row;
		}
		$stop_query = $this->db->query('SELECT stops . * , trips.route_id,route_short_name
			FROM  `stops` 
			RIGHT JOIN stop_times ON stop_times.stop_id = stops.stop_id
			RIGHT JOIN trips ON trips.trip_id = stop_times.trip_id
			RIGHT JOIN routes ON trips.route_id = routes.route_id
			WHERE parent_station =0
			GROUP BY stops.stop_id
			ORDER BY route_short_name, `stops`.`stop_name` ASC ');
		foreach ($stop_query->result() as $row)
		{
			$station[] = $row;
		}
		//echo json_encode($station);
		$this->toWritefile(json_encode($station), "stationsTM.json");
		//print_r($station);
		
		$tiempo_fin = $this->microtime_float();
		
		$salida=array("already"=>true,"message_already"=> "CreadO archivo de estaciones","next_message"=>"Creando base de datos","tiempo"=>($tiempo_fin - $tiempo_inicio));

        echo json_encode($salida);
        exit();
	}
	public function selectTransfer()
	{
		date_default_timezone_set('America/Bogota');
		$tiempo_inicio = $this->microtime_float();
		$this->db->select('*')->from('transfer');
		$query = $this->db->get();
		foreach ($query->result() as $row)
		{
			$transfer[] = $row;
		}
		$this->toWritefile(json_encode($transfer), "transferTM.json");
		//print_r($station);
		
		$tiempo_fin = $this->microtime_float();
		
		$salida=array("already"=>true,"message_already"=> "CreadO archivo de estaciones","next_message"=>"Creando base de datos","tiempo"=>($tiempo_fin - $tiempo_inicio));

        echo json_encode($salida);
        exit();
	}

	public function selectRoutes()
	{
		date_default_timezone_set('America/Bogota');
		ini_set('memory_limit', '-1');
		ini_set('MAX_EXECUTION_TIME', -1);	
		//$query = $this->db->query('RESET QUERY CACHE;');
		$tiempo_inicio = $this->microtime_float();
		$this->db->select('route_id,route_short_name,route_long_name,route_url,route_color,');
		$this->db->order_by("route_short_name", "asc");
		$this->db->from('routes');
		$query = $this->db->get();
		
		foreach ($query->result() as $route)
		{
			$range=NULL;
			$paradas=NULL;
			$array_paradas=NULL;
			$routes_query = $this->db->query("
				SELECT CONSULTA . * , stop_times.arrival_time, stop_times.stop_sequence
                FROM stop_times
                INNER JOIN (


                    SELECT min(stop_times.stop_sequence) as min_sequence, trips.trip_id, service_id, GROUP_CONCAT( (

                        CASE 
                        WHEN parent_station =0
                        THEN stops.stop_id
                        WHEN parent_station !=0
                        THEN parent_station
                        END
                    )
                    ORDER BY stop_times.stop_sequence ) AS secuencia
                    FROM  `trips` 
                    INNER JOIN stop_times ON trips.trip_id = stop_times.trip_id
                    RIGHT JOIN stops ON stops.stop_id = stop_times.stop_id
					WHERE route_id =".$route->route_id."
                    
                    GROUP BY trip_id
                    ORDER BY `secuencia` ASC
                ) AS CONSULTA 
                ON (CONSULTA.trip_id = stop_times.trip_id
                    AND stop_times.stop_sequence= CONSULTA.min_sequence
                )
                ORDER BY  `CONSULTA`.`service_id` ASC,  stop_times.arrival_time
			");
			
			$last_secuencia="";
			$service_id_back = "";
			$contador_range = -1;
			$start_time = "50:00:00";
			$end_time = "00:00:00";

			foreach ($routes_query->result() as $stop_time){

				if ($stop_time->service_id != $service_id_back) {
					$service_id_back = $stop_time->service_id;
					$contador_range=0;
					if ($contador_range == 0) {
						$arrival_time_before = $stop_time->arrival_time;
					}
					$contador_paradas=1;
					$array_range=array(
						'start_time'=>$stop_time->arrival_time,
						'end_time'=>date("H:i:s",strtotime($stop_time->arrival_time)+120),
						'secuencia'=>$stop_time->secuencia,
						'contador_paradas'=>$contador_paradas

						);
					

					$range['range'][$stop_time->service_id][$contador_range]=$array_range;
					
					if (!isset($array_paradas[$stop_time->secuencia])) {
						$paradas['secuencia'][]= array($stop_time->secuencia,'stops'=>$this->paradas($stop_time->trip_id));
						$array_paradas[$stop_time->secuencia]='';
					}
					

					

					$last_secuencia = $stop_time->secuencia;

				}
				else {
					if ($stop_time->secuencia!=$last_secuencia) {
						$last_secuencia = $stop_time->secuencia;
						$contador_range++;
						$contador_paradas=1;
						$array_range=array(
						'start_time'=>$stop_time->arrival_time,
						'end_time'=>date("H:i:s",strtotime($stop_time->arrival_time)+120),
						'secuencia'=>$stop_time->secuencia,
						'contador_paradas'=>$contador_paradas

						);
						$range['range'][$stop_time->service_id][$contador_range]=$array_range;
						if (!isset($array_paradas[$stop_time->secuencia])) {
							$paradas['secuencia'][]= array($stop_time->secuencia,'stops'=>$this->paradas($stop_time->trip_id));
							$array_paradas[$stop_time->secuencia]='asdfa';
						}
					}
					else {

						if (($this->timeToSeconds($stop_time->arrival_time)-$this->timeToSeconds($range['range'][$stop_time->service_id][$contador_range]['end_time'])) > 2400) {
							$contador_range++;
							$contador_paradas=1;
							$array_range=array(
								'start_time'=>$stop_time->arrival_time,
								'end_time'=>date("H:i:s",strtotime($stop_time->arrival_time)+120),
								'secuencia'=>$stop_time->secuencia,
								'contador_paradas'=>$contador_paradas
							);
							

							$range['range'][$stop_time->service_id][$contador_range]=$array_range;
							if (!isset($array_paradas[$stop_time->secuencia])) {
								$paradas['secuencia'][]= array($stop_time->secuencia,'stops'=>$this->paradas($stop_time->trip_id));
								$array_paradas[$stop_time->secuencia]='';
							}
						}
						else{
							$contador_paradas=$contador_paradas+1;
							$last_time=$stop_time->arrival_time;
							$arrival_time_before = $stop_time->arrival_time;
							$range['range'][$stop_time->service_id][$contador_range]['end_time']=$stop_time->arrival_time;
							$range['range'][$stop_time->service_id][$contador_range]['contador_paradas']=$contador_paradas;
						}

					}
					
				}
				
				
				
			}
			

			$routesArray[] = array_merge((array)$route,(array)$range,(array)$paradas);
			

		}
		//echo json_encode($routesArray);
		$this->toWritefile(json_encode($routesArray), "routesTM.json");
		$tiempo_fin = $this->microtime_float();
		
		$salida=array("already"=>true,"message_already"=> "Creada base de datos","next_message"=>"Creando base de datos","tiempo"=>($tiempo_fin - $tiempo_inicio));
        echo json_encode($salida);
        exit();
		
	}
	public function escribir()
	{
		$this->toWritefile("asfadsf", "routesTM.json");
	}
	public function paradas($trip_id)
	{
		$query_stops =$this->db->query('SELECT `arrival_time`, `stop_sequence`, 
					CASE 
					WHEN parent_station =0 THEN stops.stop_id 
					WHEN parent_station !=0 THEN parent_station 
					END as stop_id 
					FROM stop_times
					INNER JOIN stops ON stops.stop_id = stop_times.stop_id
					WHERE `trip_id` = "'.$trip_id.'"
					ORDER BY  `stop_times`.`stop_sequence` ASC 
					');//->where('route_id =','100');
		
	
		$paradas=array();
		foreach ($query_stops->result() as $parada) {
			$paradas[]=$parada;
		}
		//echo $this->db->last_query();
		return $paradas;

	}

	public function prueba()
	{
		$var = $this->timeToSeconds("05:12:30");
		print_r($var);
	}

	public function selectService(){
		//$query = $this->db->query('RESET QUERY CACHE;');
		$tiempo_inicio = $this->microtime_float();
			$this->db->select('route_id')->from('routes');//->where('route_id =','100');
			$this->db->order_by("route_id", "asc");
		$query_routes = $this->db->get();
		$contador_rutas=0;
		foreach ($query_routes->result() as $route)
		{
			$query_trip =$this->db->query("SELECT `route_id`,`service_id`,`trip_id` FROM `trips`  WHERE `route_id` =".$route->route_id." group by `route_id`,`service_id`");

			echo "\nroute ".$route->route_id;		 
			foreach ($query_trip->result() as $trip)
			{
				$this->get_times($trip->route_id,$trip->service_id);
				$contador_rutas++;
			
			}
		//exit();	
		}
		echo('\n contador rutas'.$contador_rutas);	
		$tiempo_fin = $this->microtime_float();
		$tiempo = $tiempo_fin - $tiempo_inicio;
		echo "<br>Tiempo empleado: " . ($tiempo_fin - $tiempo_inicio);

		

	}
	public function get_times($route_id,$service_id)
	{	
		//echo "\n ".$service_id." \n";

		$contador=0;
		$contador2=0;
		$query_stop =$this->db->query("SELECT arrival_time FROM `trips` inner join stop_times on `trips`.`trip_id`=`stop_times`.`trip_id`where `trips`.`route_id`='".$route_id."' and  service_id='".$service_id."' and stop_sequence=1 ORDER BY `stop_times`.`arrival_time` ASC");//->where('route_id =','100');
		//echo "\n\n\n\n".$this->db->last_query()."\n";
		$activa_time=false;
		$time=0;
		$times = array();
		foreach ($query_stop->result() as $stop_time)

		{

			//ECHO $stop_time->arrival_time."\n";
			if (!$activa_time) {
				$contador++;
				$activa_time=true;
				$first_time=strtotime($stop_time->arrival_time);

			}else{
				if($time==0){
					$time=strtotime($stop_time->arrival_time)-$after_time;	
					$contador++;
				}
				else{
					if ($time<strtotime($stop_time->arrival_time)-$after_time+1320 && $time>strtotime($stop_time->arrival_time)-$after_time-1320) {
						$contador++;						
					}else{
						if(strtotime($stop_time->arrival_time)-$after_time>30000){
							$frecuencia_aproximada=($after_time-$first_time)/($contador*60);
							$time_array=array('time' => $time, 'cantidad_paradas'=>$contador,'first_time'=>$first_time,'last_time'=>$after_time,'frecuencia_aproximada'=>$frecuencia_aproximada);	
							$time_array=array('time' => $time, 'cantidad_paradas'=>$contador,'first_time'=>date('H:i:s',$first_time),'last_time'=>date('H:i:s',$after_time),'frecuencia_aproximada'=>$frecuencia_aproximada);	
							//echo "\ncontador ".$contador."\n";
							//exit();
							$first_time=strtotime($stop_time->arrival_time);
							$times[] = $time_array;
							$contador=1;
							$time=0;

						}else{

							$time=strtotime($stop_time->arrival_time)-$after_time;
						}
					}
				}
				
			}
			$after_time=strtotime($stop_time->arrival_time);
			
			//
			$contador2++;

			//print_r($stop_time->arrival_time);
			//exit();
		}
		//echo "\ncontador ".$contador."\n";
		$frecuencia_aproximada=($after_time-$first_time)/($contador*60);

		$time_array=array('time' => $time, 'cantidad_paradas'=>$contador,'first_time'=>$first_time,'last_time'=>$after_time,'frecuencia_aproximada'=>$frecuencia_aproximada);	
		$time_array=array('time' => $time, 'cantidad_paradas'=>$contador,'first_time'=>date('H:i:s',$first_time),'last_time'=>date('H:i:s',$after_time),'frecuencia_aproximada'=>$frecuencia_aproximada);	
		$times[] = $time_array;
		print_r($times);
		//echo ($contador2);
		//exit();
		return $times;
		
	}
	public function selectService2($value='')
	{	//Initializing value ---/
		$tiempo_inicio = $this->microtime_float();
		$time_start_d="50:00:00";
		$time_start_l="50:00:00";
		$time_start_m="50:00:00";
		$time_start_c="50:00:00";
		$time_start_j="50:00:00";
		$time_start_v="50:00:00";
		$time_start_s="50:00:00";
		$time_end_d="00:00:00";
		$time_end_l="00:00:00";
		$time_end_m="00:00:00";
		$time_end_c="00:00:00";
		$time_end_j="00:00:00";
		$time_end_v="00:00:00";
		$time_end_s="00:00:00";
		$calendar = array();
		$this->db->select('route_id')->from('routes');//->where('route_id =','100');
		$query = $this->db->get();
		foreach ($query->result() as $row)
		{
			$tiempo_inicio_routes = $this->microtime_float();
			$this->db->select('service_id, trip_id');
			$this->db->from('trips');
			$this->db->where('trips.route_id =',$row->route_id);
			$querytrip = $this->db->get();
			//$calendar[] = $row;

			foreach ($querytrip->result() as $row2)
			{
				$tiempo_inicio_trip = $this->microtime_float();

				$dia_servicio = $this->configService($row2->service_id);
				$longitud=sizeof($dia_servicio);
				//echo "$longitud";
				$dia_semana=$this->timeRange($row2->trip_id, $time_start_d, $time_end_d);
				for ($i=0; $i<$longitud; $i++) {
					if ($dia_servicio[$i]) {
						switch ($i) {
							case 0:
								//$domingo=$this->timeRange($row2->trip_id, $time_start_d, $time_end_d);
								//print_r($domingo);
								$time_start_d=$dia_semana['start_time'];
								$time_end_d=$dia_semana['end_time'];
								break;
							case 1:
								//$lunes=$this->timeRange($row2->trip_id, $time_start_l, $time_end_l);
								//print_r($lunes);
								$time_start_l=$dia_semana['start_time'];	
								$time_end_l=$dia_semana['end_time'];
								break;
							case 2:
								//$martes=$this->timeRange($row2->trip_id, $time_start_m, $time_end_m);
								//print_r($martes);
								$time_start_m=$dia_semana['start_time'];
								$time_end_m=$dia_semana['end_time'];
								break;
							case 3:
								//$miercoles=$this->timeRange($row2->trip_id, $time_start_c, $time_end_c);
								//print_r($miercoles);
								$time_start_c=$dia_semana['start_time'];
								$time_end_c=$dia_semana['end_time'];
								break;
							case 4:
								//$jueves=$this->timeRange($row2->trip_id, $time_start_j, $time_end_j);
								//print_r($jueves);
								$time_start_j=$dia_semana['start_time'];
								$time_end_j=$dia_semana['end_time'];
								break;
							case 5:
								//$viernes=$this->timeRange($row2->trip_id, $time_start_v, $time_end_v);
								//print_r($viernes);
								$time_start_v=$dia_semana['start_time'];
								$time_end_v=$dia_semana['end_time'];
								break;
							case 6:
								//$sabado=$this->timeRange($row2->trip_id, $time_start_s, $time_end_s);
								//print_r($sabado);
								$time_start_s=$dia_semana['start_time'];
								$time_end_s=$dia_semana['end_time'];
								break;
							default:
								# code...
								break;
						}
					}
					$tiempo_fin_trip = $this->microtime_float();
					$tiempo_fin = $tiempo_fin - $tiempo_inicio_fin;
					echo "<br>Tiempo empleado: " . ($tiempo_fin - $tiempo_inicio);
				exit();
				}
					
			}
			$service['route_id']=$row->route_id;
			$service['domingo'] = $domingo;
			$service['lunes'] = $lunes;
			$service['martes'] = $martes;
			$service['miercoles'] = $miercoles;
			$service['jueves'] = $jueves;
			$service['viernes'] = $viernes;
			$service['sabado'] = $sabado;
			//Reinitializing value  ---/
			$time_start_d="50:00:00";
			$time_start_l="50:00:00";
			$time_start_m="50:00:00";
			$time_start_c="50:00:00";
			$time_start_j="50:00:00";
			$time_start_v="50:00:00";
			$time_start_s="50:00:00";
			$time_end_d="00:00:00";
			$time_end_l="00:00:00";
			$time_end_m="00:00:00";
			$time_end_c="00:00:00";
			$time_end_j="00:00:00";
			$time_end_v="00:00:00";
			$time_end_s="00:00:00";

			
			exit();

			$define_service[] = $service;
		}

		echo json_encode($define_service);
		
		$this->toWritefile(json_encode($define_service), "serviceTM.json");
	}

	public function timeRange($from_trips, $time_start, $time_end)
	{
		$this->db->select('*');
		$this->db->from('stop_times');
		$this->db->where('stop_times.trip_id =',$from_trips);
		$querystoptimes = $this->db->get();
		foreach ($querystoptimes->result() as $row3)
		{
			if ($this->timeToSeconds($row3->arrival_time) < $this->timeToSeconds($time_start)) {
				$calendar['start_time'] = $row3->arrival_time;
				$time_start = $row3->arrival_time;
			}
			else {
				$calendar['start_time'] = $time_start;
			}
			if ($this->timeToSeconds($row3->arrival_time) > $this->timeToSeconds($time_end)) {
				$calendar['end_time'] = $row3->departure_time;
				$time_end = $row3->departure_time;
			}
			else {
				$calendar['end_time'] = $time_end;
			}
		}
		//print_r($calendar);
		return $calendar;
	}

	public function configService($from_tripid)
	{
		$this->db->select('*')->from('calendar')->where('service_id =',$from_tripid);
		$query = $this->db->get();
		foreach ($query->result() as $row)
		{
			$dias[] = $row->sunday;
			$dias[] = $row->monday;
			$dias[] = $row->thursday;
			$dias[] = $row->wednesday;
			$dias[] = $row->tuesday;
			$dias[] = $row->friday; 
			$dias[] = $row->saturday;
			break;
		}
		//print_r($dias);
		return $dias;
	}

	public function timeToSeconds($time)
	{
		$time=explode(":", $time);
		$seconds = $time[0]*3600+$time[1]*60+$time[2];
		return $seconds;
	}

	public function lessTime($time1, $time2)
	{
		return $time1 < $time2 ? $time1 : $time2;
	}
	public function greatTime($time1, $time2)
	{
		return $time1 > $time2 ? $time1 : $time2;
	}

	public function toWritefile($data_to_file, $name_file)
	{
		$archivojson = fopen("./uploads/$name_file", "w") ;
		@chmod("./uploads/$name_file", 0777);
		if ( !$archivojson)
		{
			echo 'Unable to read the file';
		}
		else
		{
			fwrite($archivojson, $data_to_file);
		}
	}

	public function hourToHour($hour)		//Convierte de horas en entero a formato string
	{
		$int_seconds=$hour*3600;
		$hora=(int) ($hour);
		$min=(int)(($hour-$hora)*60);
		$seg= (int) ($int_seconds-$hora*3600 - $min*60);
		$hora= ($hora > 10) ? $hora : "0" . $hora;
		$min = ($min > 10) ? $min : "0" . $min;
		$seg = ($seg > 10) ? $seg : "0" . $seg;
		$string_hour = $hora.":".$min.":".$seg;
		//print_r($string_hour);
		return $string_hour;
	}

	public function fileUpdate()
	{
		$tiempo_inicio = $this->microtime_float();
		$tmp_update = array();
		$update = array();
		$this->db->select('start_date, end_date')->from('calendar');
		$query = $this->db->get();
		foreach ($query->result() as $row) {
			$tmp_update = array_merge((array) $row);
			$tmp_update = str_replace(array("\r", "\n"), "", $tmp_update);
			break;
		}

		$this->db->select('feed_version')->from('feed_info');
		$query = $this->db->get();
		foreach ($query->result() as $row) {
			$row = str_replace(array("\r", "\n"), "", (array)$row);
			$update= array_merge((array)$row, (array) $tmp_update);
			break;
		}
		//$update= str_replace(array("\r", "\n"), "", $tmp_update);
		$this->toWritefile(json_encode($update), "update.json");
		$tiempo_fin = $this->microtime_float();
		
		$salida=array("already"=>true,"message_already"=> "CreadO archivo de estaciones","next_message"=>"Creando base de datos","tiempo"=>($tiempo_fin - $tiempo_inicio));

        echo json_encode($salida);
        exit();

	}

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */