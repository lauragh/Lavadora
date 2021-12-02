var electro = new Electro();
var programa = 0;
var tempElegida = 0;
var temperaturaLavado = ['baja','media','alta','muy alta'];
var revolucionesCentrifugado = ['debil', 'media', 'fuerte', 'muy fuerte'];
var modo = {
    nombre: "",
    //minutos
    tiempoLavado: 0,
    tiempoCentrifugado: 0,
    //kilos
    peso: 0,
    detergente: 0,
    suavizante: 0,
    nivelAgua: 0,
    //grados
    temperaturaLavado: 0,
    revolucionesLavado: 0,
    revolucionesCentrifugado: 0,

};

var pag = "m1";
var flecha ="flecha1";
var clase = "ahora2";
var lavadoTime = 0;
var presenciaDetectada = false;
var horaMinutos = [];
var hProgramada = false;
var microOn = false;
var tLavadoH = 0;
var tLavadoM = 0;
var tLavadoT = 0;


function microAbierto(){
    if(!microOn){
        document.getElementById("tachado").style.visibility = "hidden";
        microOn = true;
    }
    else{
        document.getElementById("tachado").style.visibility = "visible";
        microOn = false;
    }
}

function programarHora(){
    comprobaciones();
    if(check2 && check3 && check4 && check5 && check6){
        document.getElementById("horaProgramada").textContent = document.getElementById("horita").value;
        document.getElementById("horaProgramada").style.fontFamily = 'Reloj';

        var modHora = document.getElementById("horita").value;
        var horaMinutosAux = modHora.split(":");

        horaMinutos[0] = horaMinutosAux[0];
        horaMinutos[1] = horaMinutosAux[1];

        hProgramada = true;
        cambiarPag(0);
    }
}

function comprobarHora(){

   if(electro.reloj.getMinutes() == parseInt(horaMinutos[1]) && electro.reloj.getHours() == parseInt(horaMinutos[0])){
        lavarProgramado();
        hProgramada = false;
    }

}

function lavarProgramado(){
    document.getElementById("titulo").style.visibility = "hidden";
    document.getElementById("barraIconos2").style.visibility = "hidden";
    document.getElementById("opcionesPrograma").style.visibility = "hidden";
    document.getElementById("opcionesCaracteristicas").style.visibility = "hidden";
    document.getElementById("procesoGlobal").style.visibility = "visible";
    document.getElementById("navegacion").style.visibility = "hidden";
    document.getElementById("programarlavado").style.visibility = "hidden";	
    document.getElementById("abajo").style.visibility = "visible";
    if(lavadoTime != 0){
        modo.tiempoLavado = lavadoTime;
    }
    document.getElementById(flecha).style.visibility = "hidden";
    lavar(function () {
        electro.puertaBloqueada = 1;
        botonLavar.disabled = false;
    });
}

function cancelarHora(){
    document.getElementById("horaProgramada").textContent = "SIN PROGRAMAR";
    document.getElementById("horaProgramada").style.fontFamily = 'Josefin Sans';

}


// Función para mostrar la hora
function mostrarHora() {
  
    if(electro.presencia && !presenciaDetectada){
        cambiarPag(1);
        presenciaDetectada = true;
    }

    if(hProgramada){
        comprobarHora();
    }

    if(tLavadoT != 0){
        cuentaReloj();
    }
    var tiempo = new Date();
    var h = tiempo.getHours();
    var m = tiempo.getMinutes();
    var s = tiempo.getSeconds();

    if(h == 0) { h = 24 }
    if(h > 24) { h = h - 24;}
    if(h < 10) { h = "0" + h; }
    if(m < 10) { m = "0" + m; }
    if(s < 10) { s = "0" + s; }

    var hora = h + ":" + m + ":" + s;
    document.getElementById("horaReloj").textContent = hora;
    setTimeout(mostrarHora, 1000);
}

//Función para mostrar la fecha
function mostrarFecha(){
    var dt = new Date();
    document.getElementById("fechaReloj").textContent = dt.toLocaleDateString();
}

function cuentaReloj(){
    // console.log("tiempoLavado" +modo.tiempoLavado);
    // console.log("tiempoCentrifugado" + modo.tiempoCentrifugado);

    // console.log("PRIMERO" + tLavadoT);
    if(tLavadoT > 0){
        if(document.getElementById("procesoGlobal").style.visibility == "visible"){
            tLavadoT -= 1;
            if(tLavadoT >= 60){
                if(tLavadoT%60 < 10){
                    tLavadoH = "0"+Math.trunc(tLavadoT/60);
                    tLavadoM = "0"+tLavadoT%60;
                }
                else{
                    tLavadoH = "0"+Math.trunc(tLavadoT/60);
                    tLavadoM = tLavadoT%60;            }
            }
            else{
                tLavadoH = "00";
                tLavadoM = tLavadoT;
            }
            document.getElementById("horas").textContent = tLavadoH;
            document.getElementById("minutos").textContent = tLavadoM;
         
        }
    }
    else{
        document.getElementById("horas").textContent = "00";
        document.getElementById("minutos").textContent = "00";
    }
  
}

function obtenerPrograma(numPrograma){
    programa = numPrograma;
    
    document.getElementById(pag).classList.remove(clase);
    document.getElementById("m2").classList.add("ahora3");
    pag = "m2";
    clase = "ahora3";
    document.getElementById(flecha).style.visibility = "hidden";
    document.getElementById("flecha3").style.visibility = "visible";
    flecha = "flecha3";

    if(programa == 1){
        modo.nombre = "Sintético";
        modo.temperaturaLavado = 30;
        modo.tiempoLavado = 60;
        modo.tiempoCentrifugado = 30;
        modo.revolucionesCentrifugado = 800;
        modo.revolucionesLavado = modo.revolucionesCentrifugado - 200;
        modo.peso = 5;
        modo.detergente = 4;
        modo.suavizante = 3;
        modo.nivelAgua = 70;
     
    }
    else if(programa == 2){
        modo.nombre = "Delicado";
        modo.temperaturaLavado = 15;
        modo.tiempoLavado = 30;
        modo.tiempoCentrifugado = 15;
        modo.revolucionesCentrifugado = 600;
        modo.revolucionesLavado = modo.revolucionesCentrifugado - 200;
        modo.peso = 3;
        modo.detergente = 2;
        modo.suavizante = 1;
        modo.nivelAgua = 50;

    }
    else if(programa == 3){
        modo.nombre = "Lana";
        modo.temperaturaLavado = 20;
        modo.tiempoLavado = 60;
        modo.tiempoCentrifugado = 15;
        modo.revolucionesCentrifugado = 800;
        modo.peso = 4.5;
        modo.detergente = 3;
        modo.suavizante = 2;
        modo.nivelAgua = 60;
    }
    else if(programa == 4){
        modo.nombre = "Eco";
        modo.temperaturaLavado = 30;
        modo.tiempoLavado = 60;
        modo.tiempoCentrifugado = 20;
        modo.revolucionesCentrifugado = 1200;
        modo.revolucionesLavado = modo.revolucionesCentrifugado - 200;
        modo.peso = 4;
        modo.detergente = 4;
        modo.suavizante = 3;
        modo.nivelAgua = 80;
    }
    else if(programa == 5){
        modo.nombre = "Algodón";
        modo.temperaturaLavado = 40;
        modo.tiempoLavado = 40;
        modo.tiempoCentrifugado = 30;
        modo.revolucionesCentrifugado = 1200;
        modo.revolucionesLavado = modo.revolucionesCentrifugado - 200;
        modo.peso = 5;
        modo.detergente = 4;
        modo.suavizante = 3;
        modo.nivelAgua = 80;

    }
    else if(programa == 6){
        modo.nombre = "Centrifugado";
        modo.revolucionesCentrifugado = 800;
        modo.tiempoCentrifugado = 30;
        modo.peso = 4;

    }
    else if(programa == 7){
        modo.nombre = "Aclarado";
        modo.revolucionesLavado = 200;
        modo.tiempoLavado = 20;
        modo.nivelAgua = 70;
        modo.peso = 3.5;
        modo.temperaturaLavado = 30;
        modo.tiempoCentrifugado = 0;
    }

    document.getElementById("opcionesPrograma").style.visibility = "hidden";
    document.getElementById("opcionesCaracteristicas").style.visibility = "visible";
    tLavadoH = Math.trunc(modo.tiempoLavado+60/60);
    tLavadoM = modo.tiempoLavado+60%60;
    tLavadoT = modo.tiempoLavado+60 + modo.tiempoCentrifugado;
    localStorage.setItem('programa', JSON.stringify({
        modo
      }));
    cargarDatos();

}


//Muestra las caracteristicas del programa seleccionado
function cargarDatos(){
    let temperatura = "";
    let tiempo = 0;
    let revoluciones = "";
    let peso = 0;
    /* Para temperatura
        baja [0,20]
        media [20,30]
        alta [30,40]
        muy alta [40,50]
    */

    /*Para revoluciones
        debil 600
        medio 800
        fuerte 1200
        muy fuerte 1600
    */
    if(modo.temperaturaLavado >= 0 && modo.temperaturaLavado <= 20){
        temperatura = temperaturaLavado[0];
    }
    else if(modo.temperaturaLavado > 20 && modo.temperaturaLavado <= 30){
        temperatura = temperaturaLavado[1];
    }
    else if(modo.temperaturaLavado > 30 && modo.temperaturaLavado <= 40){
        temperatura = temperaturaLavado[2];
    }
    else{
        temperatura = temperaturaLavado[3]
    }
    document.getElementById("tempLabel").textContent = temperatura;
    
    tiempo = modo.tiempoLavado + modo.tiempoCentrifugado;
    if(tiempo < 60){
        document.getElementById("tiempoLavadoLabel").textContent = tiempo+" min";
        tiempo = tiempo+" min";
    }
    else if(tiempo == 60){
        document.getElementById("tiempoLavadoLabel").textContent = tiempo+" h";
        tiempo = 1 +" h";
    }
    else{
        document.getElementById("tiempoLavadoLabel").textContent = Math.round(tiempo/60) + " h" +" y " + tiempo%60 +" min";
        tiempo = Math.round(tiempo/60)+ " h" +" y " + tiempo%60 +" min";
    }
  
    if(modo.revolucionesCentrifugado == 600){
        revoluciones = revolucionesCentrifugado[0];
    }
    else if(modo.revolucionesCentrifugado == 800){
        revoluciones = revolucionesCentrifugado[1];
    }
    else if(modo.revolucionesCentrifugado == 1200){
        revoluciones = revolucionesCentrifugado[2];
    }
    else if(modo.revolucionesCentrifugado == 1600){
        revoluciones = revolucionesCentrifugado[3];
    }
    document.getElementById("centriLabel").textContent = revoluciones;
    peso = modo.peso + " kg";
    document.getElementById("pesoLabel").textContent = peso;
    cargarInfo(temperatura,tiempo,revoluciones,peso);
}


//muestra las caracteristicas del programa en el menú
function cargarInfo(temperatura,tiempo,revoluciones,peso){
    document.getElementById("nombreLabel").textContent = modo.nombre;
    document.getElementById("temperaturaLavado").textContent = temperatura;
    document.getElementById("tiempoLavado").textContent = tiempo;
    document.getElementById("revolucionesCentrifugado").textContent = revoluciones;
    document.getElementById("peso").textContent = peso;

}

//cambia las pestañas según la sección elegida del menú
function cambiarPag(numPag){
    if(numPag == 0){
        document.getElementById("titulo").style.visibility = "visible";
        document.getElementById("opcionesPrograma").style.visibility = "hidden";
        document.getElementById("opcionesCaracteristicas").style.visibility = "hidden";
        document.getElementById("procesoGlobal").style.visibility = "hidden";	
        document.getElementById("abajo").style.visibility = "hidden";	
        document.getElementById("programarlavado").style.visibility = "hidden";
        document.getElementById(flecha).style.visibility = "hidden";
        document.getElementById(pag).classList.remove(clase);
        document.getElementById("navegacion").style.visibility = "hidden";

	}

    if(numPag == 1){
        var object = localStorage.getItem('programa');
        var json = JSON.parse(object);

        if(json != null){
            if(json.modo.nombre == "Sintético"){
                obtenerPrograma(1);
            }
            else if(json.modo.nombre == "Delicado"){
                obtenerPrograma(2);
            }
            
            else if(json.modo.nombre == "Lana"){
                obtenerPrograma(3);
            }
            
            else if(json.modo.nombre == "Eco"){
                obtenerPrograma(4);
            }
            
            else if(json.modo.nombre == "Algodón"){
                obtenerPrograma(5);
            }
            
            else if(json.modo.nombre == "Aclarado"){
                obtenerPrograma(6);
            }
            else if(json.modo.nombre == "Centrifugado"){
                obtenerPrograma(7);
            }
        }
     
        document.getElementById("navegacion").style.visibility = "visible";
        document.getElementById("opcionesPrograma").style.visibility = "visible";
        document.getElementById("opcionesCaracteristicas").style.visibility = "hidden";
        document.getElementById("procesoGlobal").style.visibility = "hidden";	
        document.getElementById("abajo").style.visibility = "hidden";	
        document.getElementById("programarlavado").style.visibility = "hidden";
        document.getElementById(flecha).style.visibility = "hidden";
        document.getElementById("flecha1").style.visibility = "visible";
        document.getElementById("titulo").style.visibility = "hidden";

        document.getElementById(pag).classList.remove(clase);
        document.getElementById("m1").classList.add("ahora2");

        pag = "m1";
        clase = "ahora2";
        flecha = "flecha1";
    }
    else if(numPag == 2){
        document.getElementById("opcionesPrograma").style.visibility = "hidden";
        document.getElementById("opcionesCaracteristicas").style.visibility = "visible";
        document.getElementById("procesoGlobal").style.visibility = "hidden";	
        document.getElementById("abajo").style.visibility = "hidden";	
        document.getElementById("programarlavado").style.visibility = "hidden";
        document.getElementById(flecha).style.visibility = "hidden";
        document.getElementById("flecha3").style.visibility = "visible";
        document.getElementById(pag).classList.remove(clase);
        document.getElementById("m2").classList.add("ahora3");
        pag = "m2";
        clase = "ahora3";
        flecha = "flecha3";

    }

    else if(numPag == 4){	
        document.getElementById("opcionesPrograma").style.visibility = "hidden";	
        document.getElementById("opcionesCaracteristicas").style.visibility = "hidden";	
        document.getElementById("procesoGlobal").style.visibility = "hidden";	
        document.getElementById("programarlavado").style.visibility = "visible";	
        document.getElementById("abajo").style.visibility = "hidden";
        document.getElementById(flecha).style.visibility = "hidden";
        document.getElementById("flecha2").style.visibility = "visible";
        document.getElementById(pag).classList.remove(clase);
        document.getElementById("m4").classList.add("ahora3");
        pag = "m4";
        clase = "ahora3";
        flecha = "flecha2";
        
       }
}




//Vuelve a calcular el tiempo del lavado y devuelve como string
function calcularTiempo(tiempoL){
    let tiempo = tiempoL + modo.tiempoCentrifugado;

    if(tiempo < 60){
        tiempo = tiempo+" min";
    }
    else if(tiempo == 60){
        tiempo = 1 +" h";
    }
    else{
        tiempo = Math.round(tiempo/60)+ " h" +" y " + tiempo%60 +" min";
    }
    return tiempo;
}

//Muestra la ventana que permite modificar las caracteristicas
function mensaje(numOpcion){
    let icono;
    let noMostrar = false;

    if(numOpcion == 1){
        opcion = temperaturaLavado;
        icono = '"fas fa-thermometer-quarter"';
    }
    else if(numOpcion == 2){
        let tiempoL;
        opcion = [];
        console.log(modo.tiempoLavado);
        console.log(modo.tiempoCentrifugado);
        console.log(modo.tiempoLavado + modo.tiempoCentrifugado);
        if(modo.tiempoLavado + modo.tiempoCentrifugado > 45){
            opcion.push(calcularTiempo(modo.tiempoLavado));
            tiempoL = modo.tiempoLavado - 10;
            opcion.push(calcularTiempo(tiempoL));
            tiempoL = modo.tiempoLavado - 20;
            opcion.push(calcularTiempo(tiempoL));
        }
        else{
            noMostrar = true;
        }
        icono = '"fas fa-stopwatch"';
    }
    else if(numOpcion == 3){
        opcion = revolucionesCentrifugado;
        icono = '"fab fa-500px"';
    }

    let posicion = 0;

    if(!noMostrar){
        let cont = 0;
        let html='';
        html+='<article>';
        html+='<h2>ELEGIR</h2>';
        html+='<div>';
        
        for(i = 0;  i < opcion.length; i++){
            if(numOpcion == 1){
                if(opcion[i] == document.getElementById("tempLabel").textContent){
                    html+='<a style="color:#4589B1" id="'+cont+'" onclick="cerrarMensajeModal('+cont+','+numOpcion+');"><i style="color:#4589B1" class='+icono+'></i><p>'+ opcion[i]+'</p></a>';
                }
                else{
                    html+='<a id="'+cont+'" onclick="cerrarMensajeModal('+cont+','+numOpcion+');"><i class='+icono+'></i><p>'+ opcion[i]+'</p></a>';
                }
            }
            else if(numOpcion == 2){
                if(opcion[i] == document.getElementById("tiempoLavadoLabel").textContent){
                    html+='<a style="color:#4589B1" id="'+cont+'" onclick="cerrarMensajeModal('+cont+','+numOpcion+');"><i style="color:#4589B1" class='+icono+'></i><p>'+ opcion[i]+'</p></a>';
                }
                else{
                    html+='<a id="'+cont+'" onclick="cerrarMensajeModal('+cont+','+numOpcion+');"><i class='+icono+'></i><p>'+ opcion[i]+'</p></a>';
                }
            }
            else if(numOpcion == 3){
                if(opcion[i] == document.getElementById("centriLabel").textContent){
                    html+='<a style="color:#4589B1" id="'+cont+'" onclick="cerrarMensajeModal('+cont+','+numOpcion+');"><i style="color:#4589B1" class='+icono+'></i><p>'+ opcion[i]+'</p></a>';
                }
                else{
                    html+='<a id="'+cont+'" onclick="cerrarMensajeModal('+cont+','+numOpcion+');"><i class='+icono+'></i><p>'+ opcion[i]+'</p></a>';
                }
            }
          
            cont++;
        }
        html+='</div>';
        html+='</article>';

        mensajeModal(html);
    }
    else{
        document.getElementById("mensajeError").innerHTML = "Tiempo mínimo";
        document.getElementById("mensajeError").style.visibility = "visible";
        setTimeout(function(){
            document.getElementById('mensajeError').style.visibility = "hidden";
        },2000);
    }
}


function mensaje2(){		
    let html='';
    html+='<article>';	
    html+='<h2>ATENCIÓN</h2><i class="fas fa-exclamation-triangle"></i>';	
    html+='<h3>Filtro obstruido</h3>';	
    html+='<p>Desatasque para poder lavar</p>';	
    html+='<button id="boton1" onclick="cerrarMensajeModal2()";><p>Aceptar</p></button>';	
    html+='</article>';
    mensajeModal(html);
}	


function mensaje3(){	
    let html='';
    let mensaje;

    html+='<article>';	
    html+='<h2>ATENCIÓN</h2><i class="fas fa-exclamation-triangle"></i>';
    if(electro.sensorColor != 0 && electro.sensorBlanco != 0){
        mensaje = "de color y blanca";
    }
    else if( electro.sensorBlanco != 0 && electro.sensorOscuro != 0){
        mensaje = " oscura y blanca";

    }
    html+='<h3>Tiene ropa'+mensaje+'</h3>';	
    html+='<p>¿Seguro que desea continuar?</p>';	
    html+='<button id="botonAceptar" onclick="cerrarMensajeModal2()";><p>Aceptar</p></button>';	
    html+='<button onclick="cerrarMensajeModal2()";><p>Cancelar</p></button>';
    html+='</article>';
    mensajeModal(html);	
}	

function mensaje4(){	
    let html='';
    let liquido = "";
    if(electro.nivelDetergente == 0 && electro.nivelSuavizante != 0){
        liquido = "DETERGENTE";
    }
    else if(electro.nivelDetergente != 0 && electro.nivelSuavizante == 0){
        liquido = "SUAVIZANTE";
    }
    else if(electro.nivelDetergente == 0 && electro.nivelSuavizante == 0){
        liquido = "DETERGENTE Y SUAVIZANTE";
    }

    html+='<article>';	
    html+='<h2>ATENCIÓN</h2><i class="fas fa-exclamation-triangle"></i>';	
    html+='<h3>Tanque de '+liquido+' vacío</h3>';	
    html+='<button onclick="cerrarMensajeModal2();">Aceptar</button>';	
    html+='</article>';
    mensajeModal(html);	
}	

function mensaje5(num){	
    let html='';

    html+='<article>';	
    html+='<h2>ATENCIÓN</h2><i class="fas fa-exclamation-triangle"></i>';
    if(num == 1){
        html+= 'Superación de la capacidad de carga';
        html+='<h3>Actual: '+electro.peso/1000+'kg</h3>';	
        html+='<h3>Máx: '+modo.peso+'kg</h3>';
        html+='<button onclick="cerrarMensajeModal2();">Aceptar</button>';	
    }
    else if(num == 2){
        html += '<h3 style="margin-top:10px;">No hay ropa</h3>';
        html+='<button onclick="cerrarMensajeModal2();">Aceptar</button>';	
    }
    else if(num == 3){
        html += '<h3>La puerta está abierta</h3>';
    }
  
    html+='</article>';
    mensajeModal(html);
}	

function mensaje6(){
    let html='';
    html+='<article>';	
    html+='<h2>Fin</h2>';	
    html+='<button id="boton1" onclick="cerrarMensajeModal3()";><p>Aceptar</p></button>';	
    html+='</article>';
    mensajeModal(html);
}

function mensaje7(){
    let html='';
    html+='<article>';	
    html+='<h2>Consumo: '+ electro.consumo +'kWh</h2>';	
    html+='<button id="boton1" onclick="cerrarMensajeModal2()";><p>Aceptar</p></button>';	
    html+='</article>';
    mensajeModal(html);
}


function mensajeModal(html){
    let div=document.createElement('div');
    div.setAttribute('id','capa-fondo');
    div.innerHTML=html;
    document.querySelector('body').appendChild(div);
    
}

function cerrarMensajeModal(cont,numOpcion){
    if(numOpcion == 1){
        document.getElementById("tempLabel").textContent = opcion[cont];
        document.getElementById("temperaturaLavado").textContent = opcion[cont];
        if(cont == 0){
            modo.temperaturaLavado = 20;
        }
        else if(cont == 1){
            modo.temperaturaLavado = 30;
        }
        else if(cont == 2){
            modo.temperaturaLavado = 50;
        }
        else{
            modo.temperaturaLavado = 60;
        }

    }
    else if(numOpcion == 2){
        document.getElementById("tiempoLavadoLabel").textContent = opcion[cont];
        document.getElementById("tiempoLavado").textContent = opcion[cont];
        if(cont == 1){
            lavadoTime =  modo.tiempoLavado - 10;
        }
        else if(cont == 2){
            lavadoTime = modo.tiempoLavado - 20;
        }
    }
    else if(numOpcion == 3){
        document.getElementById("centriLabel").textContent = opcion[cont];
        document.getElementById("revolucionesCentrifugado").textContent = opcion[cont];
        if(cont == 0){
            modo.revolucionesCentrifugado == 600;
        }
        else if(cont == 1){
            modo.revolucionesCentrifugado == 800;
        }
        else if(cont == 2){
            modo.revolucionesCentrifugado == 1200;
        }
        else{
            modo.revolucionesCentrifugado == 1600;
        }
    }
    document.querySelector('#capa-fondo').remove();
}

function cerrarMensajeModal2(){
    document.querySelector('#capa-fondo').remove();
}

function cerrarMensajeModal3(){
    document.querySelector('#capa-fondo').remove();
    cambiarPag(0);
}

function cancelar(){
    //llamar a funcion de cancelado de la interfaz
    vaciar("nivelAgua", "desague", 0, function () {
        electro.tamborRevoluciones = 0; // parar motor
        electro.puertaBloqueada = false; // desbloquear puerta
        callback();
    });
    location.href = "index.html";
}


function idioma(lengua){
    document.getElementById("idiomaLabel").textContent = lengua;
}


// Llena un deposito hasta un nivel usando un sensor de nivel y una valvula que abre el flujo
function llenar(sensor, valvula, nivel, callback) {
    console.log("  - Llenar depósito.", sensor, "->", nivel);
    electro.on(sensor, function comprobarNivel(nivelActual) { // monitorizar el sensor
        if (nivelActual >= nivel) { // se ha alzanzado el nivel
            electro.off(sensor, comprobarNivel); // dejar de monitorizar
            console.log("    - Cerrar válvula:", valvula);
            electro[valvula] = false; // cerrar la válvula
            callback();
        }
    });
    console.log("    - Abrir válvula:", valvula);
    electro[valvula] = true; // abro la topa
}

// Vaciar un deposito hasta un nivel usando un sensor de nivel y una válvula que abre el flujo
function vaciar(sensor, valvula, nivel, callback) {
    console.log("  - Vaciar depósito.", sensor, "->", nivel);
    electro.on(sensor, function comprobarNivel(nivelActual) { // monitorizar el sensor
        if (nivelActual <= nivel) { // se ha alzanzado el nivel
            electro.off(sensor, comprobarNivel); // dejar de monitorizar
            console.log("    - Cerrar válvula:", valvula);
            electro[valvula] = false; // cerrar la válvula
            callback();
        }
    });
    console.log("    - Abrir válvula:", valvula);
    electro[valvula] = true; // abro la topa
}

// Establece una temperatura a un valor, encendiendo y apagando una resistencia durante un tiempo (ms)
function termostato(sensor, resistencia, temp, duracion, callback) {
    function comprobarTemp(tempAct) {
        if (tempAct < temp) resistencia = true;
        if (tempAct > temp) resistencia = false;
    }
    electro.on(sensor, comprobarTemp);
    setTimeout(function () {
        electro[resistencia] = false;
        electro.off(sensor, comprobarTemp);
        callback();
    }, duracion);
}

// Realiza un lavado
function lavar(callback) {
    // Obtener parámetros del lavado
    var

        detergente = modo.detergente,
        suavizante = modo.suavizante,
        nivelAgua = modo.nivelAgua,
        temperaturaLavado = modo.temperaturaLavado,
        revolucionesLavado = modo.revolucionesLavado,
        tiempoLavado = modo.tiempoLavado * 1000,
        revolucionesCentrifugado = modo.revolucionesCentrifugado,
        tiempoCentrifugado = modo.tiempoCentrifugado * 1000;
 

    console.log("Iniciar lavado");
    electro.puertaBloqueada = true; // Bloquear puerta durante el lavado
    console.log("Puerta bloqueada");
    // Llenar de agua el tambor (para lavado)
    console.log("Llenar de agua (para lavado)...")
    document.getElementById("cLavado").style.color = "yellow";
    llenar("nivelAgua", "tomaAgua", nivelAgua, function () {
        // Detergente
        console.log("Poner detergente...");
        vaciar("nivelDetergente", "tomaDetergente", electro.nivelDetergente - detergente, function () {
            // Lavado
            console.log("Lavar...")
            electro.tamborRevoluciones = revolucionesLavado;
            termostato("temperaturaAgua", "resistenciaAgua", temperaturaLavado, tiempoLavado, function () {
                // Vaciar agua
                console.log("Vaciar tambor de agua...");
                vaciar("nivelAgua", "desague", 0, function () {
                    // Llenar de agua para suavizante
                    console.log("Llenar de agua (para suavizante)...")
                    llenar("nivelAgua", "tomaAgua", nivelAgua, function () {
                        // Suavizante
                        console.log("Poner suavizante");
                        vaciar("nivelSuavizante", "tomaSuavizante", electro.nivelSuavizante - suavizante, function () {
                            // Vaciar agua
                            console.log("Vaciar tambor de agua...");
                            vaciar("nivelAgua", "desague", 0, function () {
                                // Centrifugar
                                console.log("Centrifugar...");
                                document.getElementById("cCentrifugado").style.color = "yellow";
                                electro.tamborRevoluciones = revolucionesCentrifugado;
                                setTimeout(function () {
                                    console.log("Fin del lavado!!!");
                                    electro.tamborRevoluciones = 0; // parar motor
                                    electro.puertaBloqueada = false; // desbloquear puerta
                                    mensaje6();
                                    callback();
                                }, tiempoCentrifugado);
                            });
                        });
                    });
                });
            });
        });
    });
}

var check1 = false,
check2 = false,
check3 = false,
check4 = false,
check5 = false,
check6 = false,
check7 = false,
aceptado = false;


function comprobaciones(){
     //Mezcla de colores
    if((electro.sensorColor != 0 && electro.sensorBlanco != 0) || (electro.sensorBlanco != 0 && electro.sensorOscuro != 0)){
        mensaje3();
    }
    else{
        check1 = true;
    }

    //Filtro obstruido
    if(electro.filtroObstruido == 1){
        mensaje2();
    }
    else{
        check2 = true;
    }
   
    //supera el maximo de peso
    if(electro.peso > modo.peso*1000){
        mensaje5(1);
    }
    else{
        check3 = true;
    }

    //No queda detergente o suavizante
    if(electro.nivelDetergente == 0 || electro.nivelSuavizante == 0 || (electro.nivelDetergente == 0 && electro.nivelSuavizante == 0)){
       mensaje4(); 
    }
    else{
        check4 = true;
    }

       // Hay ropa?
    if (!electro.peso) {
        mensaje5(2);
    }
    else{
        check5 = true;
    }

    // Puerta abierta
    if (electro.puertaAbierta) {
        mensaje5(3);
    }
    else{
        check6 = true;
    }

}

electro.on("connect", function () { // Esparar a que la librería se conecte con la lavadora
    console.log("Ya estoy conectado con la lavadora!!");
    console.log("Con este hay " + electro.clientes + " clientes conectados");

    // Lavar
    var botonLavar = document.getElementById("m3");
    botonLavar.addEventListener("click", function () {
   

        botonLavar.disabled = true;
        comprobaciones();
     
        if((electro.sensorColor != 0 && electro.sensorBlanco != 0) || (electro.sensorBlanco != 0 && electro.sensorOscuro != 0)){
            var aceptarLavado = document.getElementById("botonAceptar");
            aceptarLavado.addEventListener("click", function () {
                aceptado = true;
            });
        }

        if(!aceptado){
            //lavado normal
            if(check1 && check2 && check3 && check4 && check5 && check6){
                document.getElementById("opcionesPrograma").style.visibility = "hidden";
                document.getElementById("opcionesCaracteristicas").style.visibility = "hidden";
                document.getElementById("procesoGlobal").style.visibility = "visible";
                document.getElementById("navegacion").style.visibility = "hidden";
                document.getElementById("programarlavado").style.visibility = "hidden";	
                document.getElementById("abajo").style.visibility = "visible";
                if(lavadoTime != 0){
                    modo.tiempoLavado = lavadoTime;
                }
                document.getElementById(flecha).style.visibility = "hidden";
                lavar(function () {
                    botonLavar.disabled = false;
                });

            }
        }
        else{
            if(check2 && check3 && check4 && check5 && check6){
                document.getElementById("opcionesPrograma").style.visibility = "hidden";
                document.getElementById("opcionesCaracteristicas").style.visibility = "hidden";
                document.getElementById("procesoGlobal").style.visibility = "visible";
                document.getElementById("navegacion").style.visibility = "hidden";
                document.getElementById("programarlavado").style.visibility = "hidden";	
                document.getElementById("abajo").style.visibility = "visible";
                if(lavadoTime != 0){
                    modo.tiempoLavado = lavadoTime;
                }
              
                document.getElementById(flecha).style.visibility = "hidden";
                lavar(function () {
                    botonLavar.disabled = false;
                });
            }
        }
    });
});
