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
                    $("#ingresePatente").append("<br>"+"La patente ingresada no posee multas"+"<br>");
                    $("#ingresePatente").show();

                }else{
                    for(infraccion of infracciones){
                    infraccion = miFuncion(infraccion);
                }
                console.log(infracciones[0]);
                $("#infoInfracciones").append("Infracciones de la patente:" + infracciones[0].patente + "<br>");
                }
            })
    
        //AGREGA TIPO INFRACCION
        function miFuncion(infraccion){
            fetch(url + urlTiposInfraccion + infraccion.tipoInfraccion) 
            .then( data => data.json())
            .then(data => {  
                infraccion.tipoInfraccion = data.tipo.descripcion;
                $("#infoInfracciones").append("<br>" + "Direccion registrada: " + infraccion.direccionRegistrada + "<br>");
                $("#infoInfracciones").append("Fecha y hora de la multa: " + infraccion.fechaHoraRegistro + "<br>");
                $("#infoInfracciones").append("Tipo de infraccion:" + infraccion.tipoInfraccion + "<br>");
                $("#infoInfracciones").append("Monto a pagar: " + infraccion.montoAPagar + "<br>");
                
                if(infraccion.existeAcarreo){
                    //AGREGA DEPOSITO
                    $("#btnverDeposito").show();
                    $("#btnverDeposito").click(function(){
                        $("#btnverDeposito").hide();
                            
                        fetch(url + patente_id + urlAcarreos + infraccion.id) 
                        .then( data => data.json())
                        .then(data => {
                            infraccion.deposito = data.acarreo.deposito;
                            $("#infoInfracciones").append("<br>" + "Su vehiculo fue llevado al depósito: " +  infraccion.deposito.nombre + "<br>");
                            $("#infoInfracciones").append("Direccion del depósito: " +  infraccion.deposito.direccion + "<br>");
                            $("#infoInfracciones").append("Horario de atención del depósito: " +  infraccion.deposito.horarios + "<br>");
                            $("#infoInfracciones").append("Teléfono del depósito: " +  infraccion.deposito.telefono + "<br>");
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

