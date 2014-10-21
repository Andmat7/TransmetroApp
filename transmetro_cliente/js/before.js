var connectionStatus;
var load_scripts=function(){
    
    connectionStatus = navigator.onLine;
    if(connectionStatus){
        var linkElem = document.createElement('link');
        linkElem.rel = 'stylesheet';
        linkElem.type = 'text/css';
        linkElem.href = 'http://code.google.com/apis/maps/documentation/javascript/examples/default.css';
        document.getElementsByTagName('head')[0].appendChild(linkElem);

        
    }
};
$(function() {
   // FastClick.attach(document.body); 
});
if (navigator.onLine) {
 addScript( 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC5Fg9nz4EE0Qbt2J0X0JCSlPziC09NYk8&sensor=false&callback=listo');
}
