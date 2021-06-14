
/*
utilizando jquery podemos acceder a nuestra pantalla.
una vez cargado nuestros elementos en la pantalla, agregamos comportamiento
a los elementos de la misma
*/ 
//cuando es documento esta listo, le paso una funcion con el comportamiento que espero
$(document).ready(function() {
    
    var micaja = $("#caja");

    $("#verde").click(function() {
        micaja.css('background','green');
    });

    $("#rojo").click(function() {
        micaja.css('background', 'red');
    })


});