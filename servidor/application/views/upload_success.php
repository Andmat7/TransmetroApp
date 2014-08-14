<body>
    <style>
    pre{
        white-space: normal;
        height: 100%;
    }
    </style>
<h3>El GTFS Fue subido correctamente</h3>
<div id="cargando_gif"><img src="../../uploads/load_vert.gif" alt=""></div>
<table id="carga_de_archivos" class="table"> 
    <tbody>

        <tr>
     
            <td>Cargando base de datos</td>
            <td class="tiempo"></td>
            <td class="gif"> <img src="../../uploads/loading.gif" alt=""></td>

        
        </tr>
        <tr>
            
            <td class="info"></td>
            <td class="tiempo"></td>
            <td class="gif"></td>
        
        </tr>
        <tr>
            <td class="info"></td>
            <td class="tiempo"></td>
            <td class="gif"></td>
        
        </tr>
        <tr>
            <td class="info"></td>
            <td class="tiempo"></td>
            <td class="gif"></td>
        
        </tr>
        <tr>
            <td class="info"></td>
            <td class="tiempo"></td>
            <td class="gif"></td>
        
        </tr>
    </tbody>

    
</table>
<p><?php echo anchor('upload', 'Subirlo de nuevo'); ?></p>
<script>
$.ajaxSetup({ cache: false });
function secondsToTime(secs)
{
    var hours = Math.floor(secs / (60 * 60));
    
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    
    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };  
    return obj;
}

function selectRoutes(){
    $("#carga_de_archivos tr:eq(1) .info").html("Generando archivo de Rutas");
    $("#carga_de_archivos tr:eq(1) .gif").html('<img src="../../uploads/loading.gif" alt="">');
    $.getJSON( "../../index.php/welcome/selectRoutes", function( data ) {
        if (data.already) {

            time_object=secondsToTime(data.tiempo);
            $("#carga_de_archivos tr:eq(1) .tiempo").html(time_object.m+":"+time_object.m+":"+time_object.s);
            $("#carga_de_archivos tr:eq(1) .gif").html('<img src="../../uploads/check.png" width="40px">');
            selectStation();


        }
    });

    
}

function selectStation(){
    $("#carga_de_archivos tr:eq(2) .info").html("Generando archivo de Estaciones");
    $("#carga_de_archivos tr:eq(2) .gif").html('<img src="../../uploads/loading.gif" alt="">');
    $.getJSON( "../../index.php/welcome/selectStation", function( data ) {
        if (data.already) {

            time_object=secondsToTime(data.tiempo);
            $("#carga_de_archivos tr:eq(2) .tiempo").html(time_object.m+":"+time_object.m+":"+time_object.s);
            $("#carga_de_archivos tr:eq(2) .gif").html('<img src="../../uploads/check.png" width="40px">');
            selectupdate();
   


        }
    });

    
}
function selectupdate(){
    $("#carga_de_archivos tr:eq(3) .info").html("Generando archivo de fecha de actualizacion");
    $("#carga_de_archivos tr:eq(3) .gif").html('<img src="../../uploads/loading.gif" alt="">');
    $.getJSON( "../../index.php/welcome/fileUpdate", function( data ) {
        if (data.already) {

            time_object=secondsToTime(data.tiempo);
            $("#carga_de_archivos tr:eq(3) .tiempo").html(time_object.m+":"+time_object.m+":"+time_object.s);
            $("#carga_de_archivos tr:eq(3) .gif").html('<img src="../../uploads/check.png" width="40px">');
            selectTransfer();
   


        }
    });

    
}
function selectTransfer(){
    $("#carga_de_archivos tr:eq(4) .info").html("Generando archivo de Transferencia");
    $("#carga_de_archivos tr:eq(4) .gif").html('<img src="../../uploads/loading.gif" alt="">');
    $.getJSON( "../../index.php/welcome/selectTransfer", function( data ) {
        if (data.already) {

            time_object=secondsToTime(data.tiempo);
            $("#carga_de_archivos tr:eq(4) .tiempo").html(time_object.m+":"+time_object.m+":"+time_object.s);
            $("#carga_de_archivos tr:eq(4) .gif").html('<img src="../../uploads/check.png" width="40px">');
            $("#cargando_gif").html("")
   


        }
    });

    
}
$.getJSON( "../../index.php/upload/execute_sql", function( data ) {
    if (data.already) {
        time_object=secondsToTime(data.tiempo);
        $("#carga_de_archivos tr:first .tiempo").html(time_object.m+":"+time_object.m+":"+time_object.s);
        $("#carga_de_archivos tr:first .gif").html('<img src="../../uploads/check.png" width="40px">');
        selectRoutes();


    };
});

   

</script>

</body>