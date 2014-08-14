
render("planifica",{});

$("#planifica").trigger('create');


if (window.planifica.departure) {
	$("#buscar_origen_input").val(window.planifica.departure);

}

if (window.planifica.arrive) {
	$("#buscar_destino_input").val(window.planifica.arrive);
}

$("#buscar_origen_input").off('touchstart').on('touchstart',function  (event) {
    //console.log('input '+ (new Date().getTime()-time_inicio));
    //$("#block_page").css("display","block");
    
    //document.getElementById("block_page").style.display = "none";
    change_page("#buscar_origen");

     event.stopPropagation();

 });

$("#buscar_destino_input").off('touchstart').on('touchstart',function  (event) {
    //console.log('input '+ (new Date().getTime()-time_inicio));    
    change_page("#buscar_destino");
    event.stopPropagation();

 });
$(document).on('click', '.ui-input-clear', function () {
    if ($(this).siblings().attr('id')==="buscar_origen_input") {
        window.planifica.departure=null;
    }
    if ($(this).siblings().attr('id')==="buscar_destino_input") {
        window.planifica.arrive=null;
    }
    
});
$("#buscar_rutas").off('touchstart').on('touchstart',function  () {
    if ((planifica.departure && planifica.arrive) ) {
        if ( stopid_departure !== stopid_arrive) {
                change_page("#rutas");
            
            
        }else{
            customAlert("¡Error! \nCampos iguales");
        }
    }else{
        //alert('error \nCampo vacío');
        customAlert("Completa la información de origen y destino");
    }
 });
var booleaN=AndroidVersion_lower();




 $("#planifica #iconPlaner").attr('src', 'images/iconPlaner.png').load(function() {
    //$( "<style>body {background-color : #00FFFF}</style>" ).appendTo( "head" );
    var booleaN=AndroidVersion_lower();
    //debugger;
    //alert("adfads");
    
    if (!booleaN) {
        if (($("#planifica .ui-header").height()+$("#planifica .footer").height())>0) {
            document.getElementById("block_page").style.display ="none";
            var width_contenti=($(window).height()-($("#planifica .ui-header").height()+$("#planifica .footer").height()));
            $( "#style_footer" ).html(".ui-content, .content {height : "+width_contenti+"px}");
            $("#planifica .ui-content").height($(window).height()-($("#planifica .ui-header").height()+$("#planifica .footer").height()));
                 
        }
        
        
    }else{
        //alert("android 2.2");
    }
    
  
 });


function get_last_upgrade () {
    var local_file_update = JSON.parse(localStorage.getItem("update"));
    $("#fecha_actualización").html(formatDate(local_file_update.start_date));

}
get_last_upgrade();

$("#boton_informacion").off('touchstart').on('touchstart',function  (event) {
    
  $.mobile.changePage( "#informacion", {
  transition: "pop",
 
  
});
     event.stopPropagation();

 });
$("#twitter").off('touchstart').on('touchstart',function  (event) {
    
    window.open("https://twitter.com/transmetrobaq", "_system");
     event.stopPropagation();

 });
$(".change_page").off('touchstart').on('touchstart',function  (event) {
    
    window.enable_change_page=false;

    

 });

$("#block_page").css("line-height",$(window).height()+"px");
ui_heigth();

//@ sourceURL=planifica.js