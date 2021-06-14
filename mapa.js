function bootstrap() {

    var iconoMiAuto = L.icon({
        iconUrl: 'leaflet/images/miAuto.png'}); 
    
    var iconoComercios = L.icon({
        iconUrl: 'leaflet/images/comercios.png'});    
        
    var iconoEstacionamientos = L.icon({
        iconUrl: 'leaflet/images/estacionamientos.png'});

    var inicio = [-34.525572347720434, -58.702525575922586];
    var comercio1 = [-34.53283508573342, -58.70093037036375];
    var comercio2 = [-34.51603069697392, -58.716614273818436];
    var comercio3 = [-34.51766770911156, -58.703019230211666];
    var comercio4 = [-34.52615075641535, -58.71074849719218];

    var estacionamiento1 = [-34.5242420634884, -58.70388937296278];
    var estacionamiento2 = [-34.521943802662996, -58.69838548005967];
    var estacionamiento3 = [-34.5163925254525, -58.70660002644121];
    var estacionamiento4 = [-34.51859283013782, -58.709027684901926];
    var estacionamiento5 = [-34.52179316957842, -58.71224433236235];

    var miAuto = [-34.5260766590305, -58.69996863022136];

    var estacionamientosMostrados = false;
    var comerciosMostrados = false;

    var map = L.map('mapid', {
        center: inicio,
        zoom : 15,
      });

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    var estacionamiento1Marker = L.marker(estacionamiento1,{icon: iconoEstacionamientos}).bindPopup('<b>Estacionamiento Libre</b><br> Tarifa $25 la hora');
    var estacionamiento2Marker = L.marker(estacionamiento2,{icon: iconoEstacionamientos}).bindPopup('<b>Estacionamiento Libre</b><br> Tarifa $25 la hora');
    var estacionamiento3Marker = L.marker(estacionamiento3,{icon: iconoEstacionamientos}).bindPopup('<b>Estacionamiento Libre</b><br> Tarifa $15 la hora');
    var estacionamiento4Marker = L.marker(estacionamiento4,{icon: iconoEstacionamientos}).bindPopup('<b>Estacionamiento Libre</b><br> Tarifa $15 la hora');
    var estacionamiento5Marker = L.marker(estacionamiento5,{icon: iconoEstacionamientos}).bindPopup('<b>Estacionamiento Libre</b><br> Tarifa $15 la hora');
    
    $("#infoAuto").hide();
    $("#imgMiAuto").hide();
    var miAutoMarker = L.marker(miAuto,{icon: iconoMiAuto}).bindPopup('Mi Ubicación').on('mouseover',
    function (e) {$("#infoAuto").show()}).on('mouseover',
    function (e) {$("#imgMiAuto").show()}).on('mouseout',function (e) {$("#infoAuto").hide()})
    .on('mouseout',function (e) {$("#imgMiAuto").hide()});

    miAutoMarker.addTo(map);

    $("#infoComercio1").hide();
    $("#imgMcDonalds").hide();
    var comercio1Marker = L.marker(comercio1,{icon: iconoComercios}).bindPopup('<b>Mc Donalds</b>').on('mouseover',
     function (e) {$("#infoComercio1").show()}).on('mouseover',
     function (e) {$("#imgMcDonalds").show()}).on('mouseout',function (e) {$("#infoComercio1").hide()})
     .on('mouseout',function (e) {$("#imgMcDonalds").hide()});

    $("#infoComercio2").hide();
    $("#imgBurgerKing").hide();
    var comercio2Marker = L.marker(comercio2,{icon: iconoComercios}).bindPopup('<b>Burger King</b>').on('mouseover',
    function (e) {$("#infoComercio2").show()}).on('mouseover',
    function (e) {$("#imgBurgerKing").show()}).on('mouseout',function (e) {$("#infoComercio2").hide()})
    .on('mouseout',function (e) {$("#imgBurgerKing").hide()});

    $("#infoComercio3").hide();
    $("#imgTodoModa").hide();
    var comercio3Marker = L.marker(comercio3,{icon: iconoComercios}).bindPopup('<b>Todo Moda</b>').on('mouseover',
    function (e) {$("#infoComercio3").show()}).on('mouseover',
    function (e) {$("#imgTodoModa").show()}).on('mouseout',function (e) {$("#infoComercio3").hide()})
    .on('mouseout',function (e) {$("#imgTodoModa").hide()});

    $("#infoComercio4").hide();
    $("#imgMostaza").hide();
    var comercio4Marker = L.marker(comercio4,{icon: iconoComercios}).bindPopup('<b>Mostaza</b>').on('mouseover',
    function (e) {$("#infoComercio4").show()}).on('mouseover',
    function (e) {$("#imgMostaza").show()}).on('mouseout',function (e) {$("#infoComercio4").hide()})
    .on('mouseout',function (e) {$("#imgMostaza").hide()});
    
    // CAMBIAR TEXTO DE BOTONES ESTACIONAMIENTOS Y COMERCIOS
    var estacionamientoOcultado = true;
    $("#btnEstacionamientos").click(function(){
        if(estacionamientoOcultado){
            estacionamientoOcultado = false;
            document.getElementById("btnEstacionamientos").innerHTML = "Ocultar Estacionamientos Libres";
        }
        else{
            estacionamientoOcultado = true;
            document.getElementById("btnEstacionamientos").innerHTML = "Mostrar Estacionamientos Libres";
        }
    })

    var comercioOcultado = true;
    $("#btnComercios").click(function(){
        if(comercioOcultado){
            comercioOcultado = false;
            document.getElementById("btnComercios").innerHTML = "Ocultar Comercios Adheridos";
        }
        else{
            comercioOcultado = true;
            document.getElementById("btnComercios").innerHTML = "Mostrar Comercios Adheridos";
        }
    })
    
    //CLUSTERS

    var marcadoresEstacionamientos = [estacionamiento1Marker, estacionamiento2Marker,estacionamiento3Marker,
         estacionamiento4Marker, estacionamiento5Marker];
    var marcadoresComercios = [comercio1Marker, comercio2Marker, comercio3Marker, comercio4Marker];


    var clusterEstacionamientos = L.markerClusterGroup();
    clusterEstacionamientos.addLayers([
      estacionamiento1Marker,
      estacionamiento2Marker,
      estacionamiento3Marker,
      estacionamiento4Marker,
      estacionamiento5Marker
    ]);

    var clusterComercios = L.markerClusterGroup();
    clusterComercios.addLayers([
      comercio1Marker,
      comercio2Marker,
      comercio3Marker,
      comercio4Marker
    ]);

    document.getElementById('btnEstacionamientos').addEventListener('click', function() {

        if (estacionamientosMostrados == true){
            for (var n=0; n<marcadoresEstacionamientos.length;n++) {
                marcadoresEstacionamientos[n].remove();
            };
            estacionamientosMostrados = false;
            clusterEstacionamientos.remove();
        }    

        else if (estacionamientosMostrados == false){
            for (var n=0; n<marcadoresEstacionamientos.length;n++) {
                marcadoresEstacionamientos[n].addTo(map);
            };
            estacionamientosMostrados = true;
            clusterEstacionamientos.addTo(map);
        }
    });

    document.getElementById('btnComercios').addEventListener('click', function() {

        if (comerciosMostrados == true){
            for (var n=0; n<marcadoresComercios.length;n++) {
                marcadoresComercios[n].remove();
            };
            comerciosMostrados = false;
            clusterComercios.remove();
        }    

        else if (comerciosMostrados == false){
            for (var n=0; n<marcadoresComercios.length;n++) {
                marcadoresComercios[n].addTo(map);
            };
            comerciosMostrados = true;
            clusterComercios.addTo(map);
        }
    });

    var latlngs = [
        [-34.51799275276807, -58.702776464374715],
        [-34.52574341898165, -58.710666354372016],
        [-34.532343417747555, -58.70168401805827],
        [-34.52554341089148, -58.69379412806098]];

    var polygon = L.polygon(latlngs, {color: 'green'}).addTo(map);

    var latlngs = [
        [-34.51774271930723, -58.70344407044229],
        [-34.52529340005726, -58.71145534336264],
        [-34.52134312927393, -58.717038957822254],
        [-34.513342006922684, -58.708724227594324]];

    var polygon = L.polygon(latlngs, {color: 'blue'}).addTo(map);
   
}