$(document).ready(function() {
    
    var url = Config.url;
    var urlInfracciones = '/infracciones/';
    var urlTiposInfraccion = '/tiposInfraccion/';
    var urlAcarreos = '/acarreos/';
    var patente_id = localStorage.getItem('patente');

    $("#btnverDeposito").hide();
    $("#ingresePatente").hide();  

    if (patente_id != null) {

        var bootstrap = function() {
	        fetch(url + patente_id + urlInfracciones)  
            .then(data => data.json() ) 
            .then(data => data['infracciones']) //OBTIENE LAS INFRACCIONES
            .then(infracciones => {
                if(patente_id != 'ABC123' & patente_id != 'BBB111' & patente_id != 'AAA000'){
                    $("#ingresePatente").append("La patente ingresada no posee multas"+"<br>");
                    $("#ingresePatente").show();

                }else{
                    for(infraccion of infracciones){
                    infraccion = miFuncion(infraccion);
                }
                console.log(infracciones[0]);
                $("#infoInfracciones").append("<b>Infracciones de la patente:</b> " + infracciones[0].patente + "<br>");
                }
            })
    
        //AGREGA TIPO INFRACCION
        function miFuncion(infraccion){
            fetch(url + urlTiposInfraccion + infraccion.tipoInfraccion) 
            .then( data => data.json())
            .then(data => {  
                infraccion.tipoInfraccion = data.tipo.descripcion;
                $("#infoInfracciones").append("<br>" + "<b>Direccion registrada:</b> " + infraccion.direccionRegistrada + "<br>");
                $("#infoInfracciones").append("<b>Fecha y hora de la multa:</b> " + infraccion.fechaHoraRegistro + "<br>");
                $("#infoInfracciones").append("<b>Tipo de infraccion:</b> " + infraccion.tipoInfraccion + "<br>");
                $("#infoInfracciones").append("<b>Monto a pagar:</b> " + infraccion.montoAPagar + "<br>");
                
                if(infraccion.existeAcarreo){
                    //AGREGA DEPOSITO
                    $("#btnverDeposito").show();
                    $("#btnverDeposito").click(function(){
                        $("#btnverDeposito").hide();
                            
                        fetch(url + patente_id + urlAcarreos + infraccion.id) 
                        .then( data => data.json())
                        .then(data => {
                            infraccion.deposito = data.acarreo.deposito;
                            $("#infoInfracciones").append("<br>" + "<b>Su vehiculo fue llevado al depósito:</b> " +  infraccion.deposito.nombre + "<br>");
                            $("#infoInfracciones").append("<b>Direccion del depósito:</b> " +  infraccion.deposito.direccion + "<br>");
                            $("#infoInfracciones").append("<b>Horario de atención del depósito:</b> " +  infraccion.deposito.horarios + "<br>");
                            $("#infoInfracciones").append("<b>Teléfono del depósito:</b> " +  infraccion.deposito.telefono + "<br>");
                    })
                        
                })
            }
           
		})
        return infraccion;
    }
   
}
    $(bootstrap)
    
    }

})

function guardarDatos(){
    location.reload();
    localStorage.removeItem('patente');
    localStorage.clear();
    
    var patente = $("#patente").val();
    localStorage.setItem('patente', patente);
}

