-- SET @root_path = '/var/www/servidor3/';
-- Reemplazar 
-- /var/www/vhosts/localhost.localdomain/httpdocs/prueba/ 

--
-- con el path del servidor
USE GTFS2;
SELECT concat('DROP TABLE IF EXISTS ', table_name, ';')
FROM information_schema.tables
WHERE table_schema = 'GTFS2';


USE GTFS2;

DROP TABLE IF EXISTS agency;
CREATE TABLE agency (
    agency_id VARCHAR(3),
    agency_name VARCHAR(150),
    agency_url VARCHAR(150),
    agency_timezone VARCHAR(75),
    agency_lang VARCHAR(3),
    agency_phone VARCHAR(15)
);

DROP TABLE IF EXISTS calendar;
CREATE TABLE calendar (
    service_id VARCHAR(2),
    monday TINYINT(1),
    tuesday TINYINT(1),
    wednesday TINYINT(1),
    thursday TINYINT(1),
    friday TINYINT(1),
    saturday TINYINT(1),
    sunday TINYINT(1),
    start_date VARCHAR(10),
    end_date VARCHAR(10),
    PRIMARY KEY(service_id)
);

DROP TABLE IF EXISTS feed_info;
CREATE TABLE feed_info(
    feed_publisher_name VARCHAR(200),
    feed_publisher_url VARCHAR(200),
    feed_lang VARCHAR(200),
    feed_start_date VARCHAR(200),
    feed_end_date VARCHAR(200),
    feed_version VARCHAR(200)



);

DROP TABLE IF EXISTS routes;
CREATE TABLE routes(
    route_id INT(3),
    agency_id VARCHAR(10),
    route_short_name VARCHAR(25),
    route_long_name VARCHAR(150),
    route_desc VARCHAR(3),
    route_url VARCHAR(150),
    route_color VARCHAR(25),
    route_text_color VARCHAR(10),
    route_type INT(2),
    PRIMARY KEY(route_id),
    INDEX(route_long_name)
);

DROP TABLE IF EXISTS shapes;
CREATE TABLE shapes(
    shape_id VARCHAR(20),
    shape_pt_sequence INT(4),
    shape_pt_lat DOUBLE,
    shape_pt_lon DOUBLE
);

DROP TABLE IF EXISTS stop_times;
CREATE TABLE stop_times(
    trip_id VARCHAR(20),
    arrival_time TIME,
    departure_time TIME,
    stop_id VARCHAR(20),
    stop_sequence INT(3),
    INDEX(stop_id),
    INDEX(trip_id)

);

DROP TABLE IF EXISTS stops;
CREATE TABLE stops(
    stop_id VARCHAR(20),
    stop_code CHAR(4),
    stop_name VARCHAR(200),
    stop_lat DOUBLE,
    stop_lon DOUBLE,
  
    stop_url VARCHAR(30),
    location_type INT(5),
    parent_station INT(10),
    wheelchair_boarding VARCHAR(10),
    PRIMARY KEY(stop_id),
    INDEX(stop_name),
    INDEX(stop_lon),
    INDEX(stop_lat)
);

    DROP TABLE IF EXISTS trips;
    CREATE TABLE trips(
        trip_id VARCHAR(20),
        service_id VARCHAR(3),
        route_id INT(3),
        shape_id VARCHAR(20),
        trip_headsign VARCHAR(20),
        INDEX(route_id),
        INDEX(trip_id)
    );
    DROP TABLE IF EXISTS transfer;
    CREATE TABLE transfer(
        route_id VARCHAR(20),
        stop_id VARCHAR(20),
        stop_sequence VARCHAR(20),
        pedestrian_stop VARCHAR(20),
        only_pedestrian INT(1)

    );
LOAD DATA LOCAL INFILE '/var/www/vhosts/localhost.localdomain/httpdocs/prueba/uploads/GTFS_txt/agency.txt'  INTO TABLE agency
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (agency_id,agency_name,agency_url,agency_timezone,agency_lang,agency_phone);

LOAD DATA LOCAL INFILE '/var/www/vhosts/localhost.localdomain/httpdocs/prueba/uploads/GTFS_txt/calendar.txt' INTO TABLE calendar
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (service_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday,start_date,end_date);

LOAD DATA LOCAL INFILE '/var/www/vhosts/localhost.localdomain/httpdocs/prueba/uploads/GTFS_txt/routes.txt' INTO TABLE routes
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (route_id,agency_id,route_short_name,route_long_name,route_desc,route_type,route_url,route_color,route_text_color);

LOAD DATA LOCAL INFILE '/var/www/vhosts/localhost.localdomain/httpdocs/prueba/uploads/GTFS_txt/shapes.txt' INTO TABLE shapes
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (shape_id,shape_pt_lat,shape_pt_lon,shape_pt_sequence);

LOAD DATA LOCAL INFILE '/var/www/vhosts/localhost.localdomain/httpdocs/prueba/uploads/GTFS_txt/stop_times.txt' INTO TABLE stop_times
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (trip_id,arrival_time,departure_time,stop_id,stop_sequence);

LOAD DATA LOCAL INFILE '/var/www/vhosts/localhost.localdomain/httpdocs/prueba/uploads/GTFS_txt/stops.txt' INTO TABLE stops
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (stop_id,stop_code,stop_name,stop_lat,stop_lon,stop_url,location_type,parent_station,wheelchair_boarding);

LOAD DATA LOCAL INFILE '/var/www/vhosts/localhost.localdomain/httpdocs/prueba/uploads/GTFS_txt/trips.txt' INTO TABLE trips
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (route_id,service_id,trip_id,trip_headsign,shape_id);
LOAD DATA LOCAL INFILE '/var/www/vhosts/localhost.localdomain/httpdocs/prueba/uploads/GTFS_txt/transfer.txt' INTO TABLE transfer
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (route_id,stop_id,stop_sequence,pedestrian_stop,only_pedestrian);
LOAD DATA LOCAL INFILE '/var/www/vhosts/localhost.localdomain/httpdocs/prueba/uploads/GTFS_txt/feed_info.txt' INTO TABLE  feed_info
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (feed_publisher_name,feed_publisher_url,feed_lang,feed_start_date,feed_end_date,feed_version);