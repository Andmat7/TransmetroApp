render("mapa",{});
$("#mapa").trigger('create');
if (navigator.onLine) {
    $("#mapa_content").html('<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps/ms?msa=0&amp;msid=215933424098948531395.0004d02181402bd911963&amp;ie=UTF8&amp;ll=10.941455,-74.798546&amp;spn=0.10744,0.069962&amp;t=m&amp;iwloc=0004d0218254cecc8d4ef&amp;output=embed"></iframe>');
}else{
    $("#mapa_content").html('<img src="images/mapa_esquematico.jpg" alt="" />');
    $("#mapa_content").css("overflow-x","scroll");
    $("#mapa_content").css("height","");
}