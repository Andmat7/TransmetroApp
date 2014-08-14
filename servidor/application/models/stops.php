<?php
class Stops extends CI_Model
{
    function __construct()
    {
        parent::__construct();
    }
    //creamos la funcion nuevo comentario que será la que haga la inserción a la base
    //de datos pasándole los datos a introducir en forma de array, siempre al estilo ci
    function nuevo_stop($stop_id,$stop_code,$stop_name,$stop_lat,$stop_lon,$stop_url,$location_type,$parent_station,$wheelchair_boarding)
    {
        $stops = array(
                'stop_id' => $stop_id,
                'stop_code' => $stop_code,
                'stop_name' => $stop_name,
                'stop_lat' => $stop_lat,
                'stop_lon' => $stop_lon,
                'stop_url' => $stop_url,
                'location_type' => $location_type,
                'parent_station' => $parent_station,
                 );
        //aqui se realiza la inserción, si queremos devolver algo deberíamos usar delantre return
        //y en el controlador despues de $nueva_insercion poner lo que queremos hacer, redirigir,
        //envíar un email, en fin, lo que deseemos hacer
        $this->db->insert('stops',$stops);
    }

    function nuevo_stoptime($trip_id,$arrival_time,$departure_time,$stop_id,$stop_sequence,$stop_headsign)
    {
        $stop_times = array(
            'trip_id' => $trip_id,
            'arrival_time' => $arrival_time,
            'departure_time' => $departure_time,
            'stop_id' => $stop_id,
            'stop_sequence' => $stop_sequence,
            'stop_headsign' => $stop_headsign,
        );
        $this->db->insert('stop_times',$stop_times);
    }

    function nuevo_trip(﻿$route_id,$service_id,$trip_id,$trip_headsign,$shape_id)
    {
        $trips = array(
            'route_id' => $route_id,
            'service_id' => $service_id,
            'trip_id' => $trip_id,
            'trip_headsign' => $trip_headsign,
            'shape_id' => $shape_id,
        );
        $this->db->insert('trips',$trips);
    }

    function nuevo_route($route_id,$agency_id,$route_short_name,$route_long_name,$route_desc,$route_type,$route_url,$route_color,$route_text_color)
    {
        $routes = array(
            'route_id' => $route_id,
            'agency_id' => $agency_id,
            'route_short_name' => $route_short_name,
            'route_long_name' => $route_long_name,
            'route_desc' => $route_desc,
            'route_type' => $route_type,
            'route_url' => $route_url,
            'route_color' => $route_color,
            'route_text_color' => $route_text_color,
             );
        $this->db->insert('routes',$routes);
    }

    function nuevo_calendar($service_id,$monday,$tuesday,$wednesday,$thursday,$friday,$saturday,$sunday,$start_date,$end_date)
    {
        $calendar = array(
            'service_id' => $service_id,
            'monday' => $monday,
            'tuesday' => $tuesday,
            'wednesday' => $wednesday,
            'thursday' => $thursday,
            'friday' => $friday,
            'saturday' => $saturday,
            'sunday' => $sunday,
            'start_date' => $start_date,
            'end_date' => $end_date,
             );
        $this->db->insert('calendar',$calendar);
    }

    function nuevo_agency($agency_id,$agency_name,$agency_url,$agency_timezone,$agency_lang,$agency_phone)
    {
        $agency = array(
        'agency_id' => $agency_id,
        'agency_name' => $agency_name,
        'agency_url' => $agency_url,
        'agency_timezone' => $agency_timezone,
        'agency_lang' => $agency_lang,
        'agency_phone' => $agency_phone,
         );
        $this->db->insert('agency',$agency);
    }

    function nuevo_fare_attributes($fare_id,$price,$currency_type,$payment_method,$transfer,$transfer_duration)
    {
        $fare_attributes = array(
                'fare_id' => $fare_id,
                'price' => $price,
                'currency_type' => $currency_type,
                'payment_method' => $payment_method,
                'transfer' => $transfer,
                'transfer_duration' => $transfer_duration,
                 );
        $this->db->insert('fare_attributes',$fare_attributes);
    }

    function nuevo_shapes($shape_id,$shape_pt_lat,$shape_pt_lon,$shape_pt_sequence)
    {
        $shapes = array(
                'shape_id' => $shape_id,
                'shape_pt_lat' => $shape_pt_lat,
                'shape_pt_lon' => $shape_pt_lon,
                'shape_pt_sequence' => $shape_pt_sequence,
                 );
        $this->db->insert('shapes',$shapes);
    }

    function nuevo_feed_info($feed_publisher_name,$feed_publisher_url,$feed_lang,$feed_start_date,$feed_end_date,$feed_version)
    {
        $feed_info = array(
                'feed_publisher_name' => $feed_publisher_name,
                'feed_publisher_url' => $feed_publisher_url,
                'feed_lang' => $feed_lang,
                'feed_start_date' => $feed_start_date,
                'feed_end_date' => $feed_end_date,
                'feed_version' => $feed_version,
                 );
        $this->db->insert('feed_info',$feed_info);
    }


}
 
/*fin del archivo comentarios model*/