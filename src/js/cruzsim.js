const BLOCK_SIZE = 790;
const FRAME_SIZE = 784;
const PAUSE_MS = 5;
var canvas;
var ctx;
var bmpApagado;
var bmpVerde;
var bmpRojo;
var maskXY1 = 18;
var maskXY2 = 37;
var scrollControl;
var delayInicioScroll = 1000;
var delayInicioAnimación = 1000;
var tiempoScroll = 30;
var tiempoTextoScroll = 150;
var frameControl;
var row;
var col;
var pos;
var linea;
var textMoveState;
var fin;
var stop;
var frameCounter;
var bytesOffet;
var framesNum = 0;
var aniBytes;
var frameBytes = new Uint8Array(FRAME_SIZE);

var form;
var button1;
var seccion1;
var seccion2;


let z = 0;
var end = false;
var espera = 0;
var acabar;
var primera_vez;
var done = false;
var contar = 0;
var letterSize = 40;
var scape_row;
var bucle;
var timeoutId;

var animationled;
let fileAnimation;
var jsonData;

//Código al cargar la página
window.onload = function () {
  document.getElementById("textoInfo").innerHTML = "inicio onLoad";
  // Se crea el CANVAS 560 x 560  en el cuerpo del documento
  canvas = document.createElement('canvas');
  canvas.width = 560;
  canvas.height = 560;
  document.getElementById("textoInfo").innerHTML = "appendChild(canvas)";
  document.body.appendChild(canvas)
  document.getElementById("textoInfo").innerHTML = "canvas.getContext";
  ctx = canvas.getContext("2d");
  document.getElementById("textoInfo").innerHTML = "createElement('img')";

  bmpApagado = document.createElement('img');
  bmpApagado.src = "../bmp/led_negro_10.bmp";
  bmpVerde = document.createElement('img');
  bmpVerde.src = "../bmp/led_verde_negro_10.bmp";
  bmpRojo = document.createElement('img');
  bmpRojo.src = "../bmp/led_rojo_negro_10.bmp";
  bmpAmarillo = document.createElement('img');
  bmpAmarillo.src = "../bmp/led_amarillo_negro_10.bmp";
  bmpBlanco = document.createElement('img');
  bmpBlanco.src = "../bmp/led_blanco_10.bmp";


  // Se obtiene una referencia al formulario HTML con la clase "seqForm" y se agrega un controlador de eventos para el evento de envío del formulario (submit).
  document.getElementById("textoInfo").innerHTML = "Iniciar secuencia.";
  //Se obtienen referencias a elementos HTML con los id "seccion1" y "seccion2".
  form = document.querySelector('.seqForm');
  form.addEventListener('submit', handleFormSubmit);
  seccion1 = document.getElementById("seccion1");
  seccion2 = document.getElementById("seccion2");
};

//Funcion carga el fichero .led para procesarlo
function playAnimacion(fileName, fileData) {

  console.log("Inicio funcion playAnimacion()");
  document.getElementById("textoInfo").innerHTML = "Inicio secuencia LED";
  z = z + 2 //Sumamos +2 para que la animacion solo se ejecute una vez
  //Lee el contenido del archivo .led proporcionado en formato base64
  aniBytes = new Uint8Array(atob(fileData).split("").map(function (c) { return c.charCodeAt(0); }));
  console.log("numero de aniBytes=", aniBytes);
  framesNum = Math.ceil(aniBytes.length / BLOCK_SIZE); //Redondeo para que framesNum pueda compararse con FramesCounter
  frameCounter = 0;
  bytesOffet = 0;
  stop = false;
  //Lanza función para dibujar la animación después de cargar el archivo .led
  console.log("LLama a dibujar animacion desde playAnimacion() se envia z = ", z);
  //Ejecuta función despues de tiempo establecido por delayInicioAnimacion
  frameControl = setTimeout(dibujarAnimacion(), delayInicioAnimación);
  detenerAnimacionLED();
}

// ======  FUNCION DIBUJA ANIMACION DEL FICHERO LED ================ //
function dibujarAnimacion() {
  var x = 0;
  var y = 0;
  var i;
  var j;
  var LEDColor1;
  var LEDColor2;
  var LEDColor3;
  var LEDColor4;
  console.log("Inicio dibujarAnimacion()");
  console.log("frameCounter recibido:", frameCounter);
  console.log("framesNum establecido:", framesNum);
  console.log("stop:", stop);
  console.log("z dibujarAnimacion()", z);

  // Verifica si se han ejecutado todos los cuadros
  if (frameCounter >= framesNum - 1 || stop) {
    console.log("verifica frameCounter >= framesNum o stop");
    clearInterval(frameControl);
    console.log("framaControl se libera a nulo");
    frameControl = null;
    detenerAnimacionLED(z);
  }

  // leer pausa
  let framePause = 0;
  framePause = (aniBytes[bytesOffet + 3] << 8) + aniBytes[bytesOffet + 4];
  framePause = framePause * PAUSE_MS;
  bytesOffet = bytesOffet + 6;
  for (n = 0; n < FRAME_SIZE; n++) {
    frameBytes[n] = aniBytes[n + bytesOffet];
  }
  bytesOffet += FRAME_SIZE;
  contadorLed = 0;
  contadorFila = 0;
  x = 0;
  y = 0;

  for (i = 0; i < frameBytes.length; i++) {
    // procesar byte de streamBMP
    let datoLed = frameBytes[i];
    let colorMask1 = 0b11000000;
    let colorMask2 = 0b00110000;
    let colorMask3 = 0b00001100;
    let colorMask4 = 0b00000011;

    // obtener color de cada LED en las posiciones de la mascaras
    LEDColor1 = datoLed & colorMask1;
    LEDColor2 = datoLed & colorMask2;
    LEDColor3 = datoLed & colorMask3;
    LEDColor4 = datoLed & colorMask4;

    // poner el bitmap ded LED según el color
    switch (LEDColor1) {
      case 0:
        ctx.drawImage(bmpApagado, x, y);
        break;
      case 0b01000000:
        ctx.drawImage(bmpVerde, x, y);
        break;
      case 0b10000000:
        ctx.drawImage(bmpRojo, x, y);
        break;
      default:
        ctx.drawImage(bmpApagado, x, y);

    }
    x += 10;
    switch (LEDColor2) {
      case 0:
        ctx.drawImage(bmpApagado, x, y);
        break;
      case 0b00010000:
        ctx.drawImage(bmpVerde, x, y);
        break;
      case 0b00100000:
        ctx.drawImage(bmpRojo, x, y);
        break;
      default:
        ctx.drawImage(bmpApagado, x, y);
    }
    x += 10;
    switch (LEDColor3) {
      case 0:
        ctx.drawImage(bmpApagado, x, y);
        break;
      case 0b00000100:
        ctx.drawImage(bmpVerde, x, y);
        break;
      case 0b00001000:
        ctx.drawImage(bmpRojo, x, y);
        break;
      default:
        ctx.drawImage(bmpApagado, x, y);
    }
    x += 10;
    switch (LEDColor4) {
      case 0:
        ctx.drawImage(bmpApagado, x, y);
        break;
      case 0b00000001:
        ctx.drawImage(bmpVerde, x, y);
        break;
      case 0b00000010:
        ctx.drawImage(bmpRojo, x, y);
        break;
      default:
        ctx.drawImage(bmpApagado, x, y);
    }
    x += 10;
    contadorLed++;
    // control de linea
    if (contadorLed == 14) {
      contadorLed = 0;
      contadorFila++;
      x = 0;
      y += 10;
    }
  }
  // =======  CANVAS SUPERPOSICION ANIMACION CUADRADOS EN LAS ESQUINAS =============== //
   // Cuadrado superior izquierdo
   ctx.fillStyle = "white"; // Establece el color a blanco
   ctx.fillRect(0, 0, 211, 211); // Dibuja un cuadrado en la esquina superior izquierda
 
   // Cuadrado superior derecho
   ctx.fillRect(canvas.width - 210, 0, 210, 210); // Dibuja un cuadrado en la esquina superior derecha
 
   // Cuadrado inferior izquierdo
   ctx.fillRect(0, canvas.height - 210, 210, 210); // Dibuja un cuadrado en la esquina inferior izquierda
 
   // Cuadrado inferior derecho
   ctx.fillRect(canvas.width - 210, canvas.height - 210, 210, 210); // Dibuja un cuadrado en la esquina inferior derecha

   //Cuadrado superior central
   ctx.fillRect(211, 0, 140, 70);
   //Cuadrado inferior central
   ctx.fillRect((canvas.width - 140) / 2, canvas.height - 70, 140, 70);
   // Cuadrado lateral central izquierdo
    ctx.fillRect(0, (canvas.height - 140) / 2, 70, 140);
  // Cuadrado lateral central derecho
    ctx.fillRect(canvas.width - 70, (canvas.height - 140) / 2, 70, 140);

  frameCounter++;

  if (frameCounter < framesNum) {
    console.log("frameCounter < framesNum")
    frameControl = setTimeout(dibujarAnimacion, framePause);
    stop = false;
  }
  else {
    stop = true;
  }
}

//Funcion deteniene animacion fichero Led una vez finalzida
function detenerAnimacionLED() {

  document.getElementById("textoInfo").innerHTML = "animacion LED detenida .. continua secuencia"; // Mostrar un mensaje de finalización
  console.log("Inicio funcion detenerAnimacion()");

  if (z <= (actions.length) - 1) {

    z = z + 1;
    console.log("detenerAnimacionLED() z <= actions.length-1 , z =", z," actions.lenght = ",actions.length);
    fin = true;
    console.log("detenerAnimacionLED() llamada a playSequence()");
    playSequence();
  } else if (z > (actions.length)-1){
    fin = true;
    z = 0;
    console.log("detenerAnimacionLED() z > actions.length-1 , z =", z," actions.lenght = ",actions.length);
    console.log("detenerAnimacionLED() llamada a showAction()");
    showAction(action[z], jsonData);
  }

}

function ficheros() {
  var select = document.getElementById('list');
  var items = [{ text: 'text1', value: 'value1' }, { text: 'text2', value: 'value2' }, { text: 'text3', value: 'value3' }];
  var options = [];
  for (var i = 0; i < items.length; i++)
    options.push('<option value="' + items[i].text + '">' + items[i].text + '</option>');
  select.innerHTML = options.join('');
}



function downloadSequence() {
  // Convert JSON to a data URI
  const dataURI = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formJSON, null, 2));

  // Create a temporary anchor element
  const link = document.createElement('a');
  link.href = dataURI;
  link.download = 'sequence.json';

  // Append the anchor element to the body and trigger the download
  document.body.appendChild(link);
  link.click();

  // Clean up the temporary anchor element
  document.body.removeChild(link);

  document.getElementById("textoInfo").innerHTML = "File download.";

}


function finSimulacion() {
  fin = true;
  end = true;
  document.getElementById("textoInfo").innerHTML = "Fin simulación.";
}

function stopAnimacion() {
  stop = true;
  end = true;
  document.getElementById("textoInfo").innerHTML = "Stop animación.";

}

//Muestra las opciones de crear secuencia
function displaySequence() {
  console.log("displaySequence() llamda a finSimulacio() y stopSimulacion()");
  finSimulacion();
  stopAnimacion();
  seccion1.style.display = "none";
  seccion2.style.display = "block";

}

//Cerrar las opciones de crear secuencias 
function displayAnimation() {
  seccion1.style.display = "block";
  seccion2.style.display = "none";
}


/**************************************************************************************/
//                          FUNCIONES DE EJECUTAR SECUENCIAS
/**************************************************************************************/

/**
 * Funcion que ejecuta la secuencia una vez configurada. Lee el json que da forma a la cruz,
 * resetea valores y empieza el bucle que mostrara las animaciones
 */
function playSequence() {
  document.getElementById("textoInfo").innerHTML = "Inicio simulación secuencia creada.";
  //Almacena la mascara selecionada
  var fileInput = document.getElementById('fileSelectorCrossMask');
  var file = fileInput.files[0]; // Obtiene el primer archivo seleccionado
  var reader = new FileReader();
  reader.readAsText(file);

  reader.onload = function (e) {
    var contents = e.target.result;
    var jsonData = JSON.parse(contents);

    espera = 0;
    z = 0;
    acabar = 0;
    end = false;
    fin = true;
    primera_vez = true;
    done = false;
    console.log("playSequence() llamada a myLoop()");
    myLoop(jsonData);
  };
}


/**
 * Funcion bucle que ejecuta las acciones de la secuencia de manera ciclica.
 * 
 * @param {JSON} jsonData json con las mascaras de la cruz, que indican su forma y los colore disponibles.
 */
function myLoop(jsonData) {
  setTimeout(function () {

    if (fin) {
      // Realizamos siguiente acción
      console.log("Inicio myLoop() fin = ",fin, " z = ",z);
      console.log("myLoop() llamda a showAction()");
      showAction(actions[z], jsonData);
      z++;
      console.log("myLoop() z +1 z = ",z);
      // Si se ha llegado al final de la secuencia, vuelta al principio
      if (z > (actions.length) - 1) {
        console.log("myLoop() z > actions.lenght -1  z = ",z," actions.lenght = ",actions.lenght);
        z = 0;
        console.log("myLoop() z = 0");
      }

    }

    // Mientras no se pare y no se esté reproduciendo una animación, se continua de forma cíclica
    if (!end) {
      myLoop(jsonData);
    } else {
      isAnimatig = false; // Controlar restablecer la bandera si se detiene la secuencia
    }
  }, espera) /** @param {int} espera Espera entre acciones */
}


/**
 * Funcion que obtiene los parametros de las acciones dentro de una secuencia y la ejecuta.
 * 
 * @param {*} action accion de la secuencia a realizar
 * @param {*} jsonData json con las mascaras de la cruz, que indican su forma y los colore disponibles.
 */
function showAction(action, jsonData) {

  console.log("Inicio showAction() ");

  //Obtenemos los parametros de la accion para un uso mas sencillo de la informacion
  var mensaje;                                                  //Mensaje a mostrar
  var top_draw = "dib" + action.parameters.top_drawing;         //Dibujo superior de la cruz
  var bottom_draw = "dib" + action.parameters.bottom_drawing;   //Dibujo inferior de la cruz
  var effect = action.parameters.effect;                        //Movimiento del texto
  var delete_single_row = action.parameters.delete_single_row;  //Borrar una fila
  var delete_all = action.parameters.delete_all;                //Borrar todo el contenido
  var text_in_out = action.parameters.text_in_out;              //Texto sale y entra
  var text_only_in = action.parameters.text_only_in;            //Texto solo entra
  var font_size = action.parameters.font_size;                  //Tamaño de la letra
  //var line = action.parameters.row;                           //(EN ESTE CASO NO SE USA, YA QUE LA POSICION DEL TEXTO SE DETERMINA CON 'LED') Fila en la que se muestra el mensaje
  var speed = action.parameters.speed;                          //Velocidad del texto
  var pausa = action.parameters.pause;                          //Tiempo de espera que realiza el texto
  var orla = action.parameters.orla;                            //Orla activada o no
  var tipography = action.parameters.tipografia;                //Tipografia a utilizar
  var color = action.parameters.color;                          //Color seleccionado
  var led = action.parameters.led;                              //Fila a partir de donde se mostrara el mensaje 
  var animationled = false;                                     // Animacion en la secuencia

  espera = 0; //Tiempo de espera entre acciones

  //MENSAJES A MOSTRAR (EN ESTE CASO ESTAN HARDCODEADOS, DEBERIAN VENIR COMO PARAMETRO)
  switch (action.type) {
    case "Temperatura":
      mensaje = "24º";
      break;

    case "Hora":
      var date = new Date();
      let currentHour = String(date.getHours()).padStart(2, '0');
      let currentMinute = String(date.getMinutes()).padStart(2, '0');
      mensaje = `${currentHour}:${currentMinute}`;
      break;

    case "Tiempo":
      mensaje = "Solejat amb núvols";
      break;

    case "Santoral":
      mensaje = "Sant Joan";
      break;

    case "Imagen":
      mensaje = "Imagen";
      break;

    case "Humedad":
      mensaje = "HUMITAT: 65%";
      break;

    case "Fecha":
      var date = new Date();
      let currentDay = String(date.getDate()).padStart(2, '0');
      let currentMonth = String(date.getMonth() + 1).padStart(2, '0');
      let currentYear = date.getFullYear();
      mensaje = `${currentDay}/${currentMonth}/${currentYear}`;
      break;

    case "Texto":
      mensaje = action.parameters.message;
      break;
    //Caso de cargar animacion, carga el fichero .led seleccionado
    case "Animación":
      console.log("showAnimation() ve que es una animacion");
      // Verificar si se incluyó la animación en el objeto JSON
      if (action.animation) {
        // selectedFile contiene tanto el nombre del archivo como los datos en formato base64
        console.log("Guarda fichero animacion para procesar despues")
        animationled = true;
        fileAnimation = {
          fileName: action.animation.fileName,
          fileData: action.animation.fileData
        }; 
      } else {
        // En caso de que no se carge animación, sestablece el mensaje
        mensaje = "No LED"; //TODO eliminar tras pruebas
      }
      break;

    default:
      mensaje = "FARMACIA";
  }
 

  //Con los parametros, se procede a mostrar 
  animation(jsonData, mensaje, top_draw, bottom_draw, effect, delete_single_row, delete_all, text_in_out, text_only_in, font_size, speed, pausa, orla, tipography, color, led, animationled, fileAnimation);
}


//############################################################################## MEDIDAS DE LA CRUZ ##############################################################################
//Las medidas de la cruz son variables y modifican el tamaño de la cruz. Eso si, que se muestre o no depende de la mascara.
const topPanel_X = 14;
const topPanel_Y = 14;

const middlePanel_X = 42;
const middlePanel_Y = 14;

const bottomPanel_X = 14;
const bottomPanel_Y = 14;

const topEdge = 7;
const bottomEdge = 7;
const leftEdge = 7;
const rightEdge = 7;

var cross_height;
var cross_width;
var mascara = [];
var num = 0;


/**
 * Funcion que integra las cuatro mascaras de diseño en la cruz en una unica mascara, indicando
 * la forma de la cruz (cruz + orla) y de que colores dispone.
 * 
 * @param maskContent Json con las macaras de la cruz, dos correspondientes a la cruz y 
 * otras dos a la orla, una por color. Tener en cuenta que si hubieran mas mascaras, hay 
 * que modificar el codigo.
 */
function checkArrays(maskContent) {
  mascara = [];

  //Inicializamos la mascara a todo 0
  for (var i = 0; i < cross_height; i++) {
    mascara[i] = [];
    for (var j = 0; j < cross_width; j++) {
      mascara[i][j] = 0;
    }
  }

  //Numeros correspondientes a los colores en funcion de si son cruz o orla 
  const BLANCO = 0;
  const VERDE_CRUZ = 1;
  const ROJO_CRUZ = 2;
  const BICOLOR_CRUZ = 3;
  const VERDE_ORLA = 4;
  const ROJO_ORLA = 5;
  const BICOLOR_ORLA = 6;


  // Primera mascara de la cruz (Verde)
  if (maskContent.mask_coreFC1.length != 0) {
    for (var i = 0; i < maskContent.mask_coreFC1.length; i++) {
      for (var j = 0; j < maskContent.mask_coreFC1[i].length; j++) {
        if (maskContent.mask_coreFC1[i][j] == 65535 && mascara[i][j] == BLANCO) {
          mascara[i][j] = BLANCO;
        } else if (maskContent.mask_coreFC1[i][j] != 65535 && mascara[i][j] == BLANCO) {
          mascara[i][j] = VERDE_CRUZ;
        } else if (maskContent.mask_coreFC1[i][j] != 65535 && mascara[i][j] == ROJO_CRUZ) {
          mascara[i][j] = BICOLOR_CRUZ;
        }
      }
    }
  }

  // Segunda mascara de la cruz (Rojo)
  if (maskContent.mask_coreFC2.length != 0) {
    for (var i = 0; i < maskContent.mask_coreFC2.length; i++) {
      for (var j = 0; j < maskContent.mask_coreFC2[i].length; j++) {
        if (maskContent.mask_coreFC2[i][j] == 65535 && mascara[i][j] == BLANCO) {
          mascara[i][j] = BLANCO;
        } else if (maskContent.mask_coreFC2[i][j] != 65535 && mascara[i][j] == BLANCO) {
          mascara[i][j] = ROJO_CRUZ;
        } else if (maskContent.mask_coreFC2[i][j] != 65535 && mascara[i][j] == VERDE_CRUZ) {
          mascara[i][j] = BICOLOR_CRUZ;
        }
      }
    }
  }

  // Primera mascara de la orla (Verde)
  if (maskContent.mask_orlaFC1.length != 0) {
    for (var i = 0; i < maskContent.mask_orlaFC1.length; i++) {
      for (var j = 0; j < maskContent.mask_orlaFC1[i].length; j++) {
        if (maskContent.mask_orlaFC1[i][j] == 65535 && mascara[i][j] == BLANCO) {
          mascara[i][j] = BLANCO;
        } else if (maskContent.mask_orlaFC1[i][j] != 65535 && mascara[i][j] == BLANCO) {
          mascara[i][j] = VERDE_ORLA;
        } else if (maskContent.mask_orlaFC1[i][j] != 65535 && mascara[i][j] == ROJO_ORLA) {
          mascara[i][j] = BICOLOR_ORLA;
        }
      }
    }
  }

  // Segunda mascara de la orla (Rojo)
  if (maskContent.mask_orlaFC2.length != 0) {
    for (var i = 0; i < maskContent.mask_orlaFC2.length; i++) {
      for (var j = 0; j < maskContent.mask_orlaFC2[i].length; j++) {
        if (maskContent.mask_orlaFC2[i][j] == 65535 && mascara[i][j] == BLANCO) {
          mascara[i][j] = BLANCO;
        } else if (maskContent.mask_orlaFC2[i][j] != 65535 && mascara[i][j] == BLANCO) {
          mascara[i][j] = ROJO_ORLA;
        } else if (maskContent.mask_orlaFC2[i][j] != 65535 && mascara[i][j] == VERDE_ORLA) {
          mascara[i][j] = BICOLOR_ORLA;
        }
      }
    }
  }
}


/**
 * Funcion encargada de indicar si un numero se encuentra dentro de un array de dos dimensiones.
 * 
 * @param   array cadena de 2 dimensiones donde se buscara el valor
 * @param   num valor a encontrar en el array
 * @returns True si el valor se encuentra dentro del array y false en caso contratio
 */
function findValue(array, num) {
  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array[i].length; j++) {
      if (array[i][j] == num) {
        return true;
      }
    }
  }
  return false;
}



/**
 * Funcion que realiza las acciones de una secuencia. Inicia extrayendo valores necesarios para mostrar la animacion,
 * seguidamente dibuja la cruz segun los parametros indicados, y finalmente ejecuta el efecto seleccionado. Las medidas 
 * se realizan dentro de un rango de 56x56, pero los "leds" del simulador ocupan 10 pixeles, por lo que los valores se 
 * tienen que multiplicar por 10 para indicar la posicion en la pantalla.
 * 
 * @param {JSON} cross_mask json con las mascaras de la cruz, que indican su forma y los colore disponibles.
 * @param {string} action_message mensaje a mostrar en los efectos.
 * @param {string} action_top_draw dibujo que se mostrara en el panel superior de la cruz.
 * @param {string} action_bottom_draw dibujo que se mostrara en el panel inferior de la cruz.
 * @param {int} action_effect efecto a ejecutar.
 * @param {boolean} action_delete_single_row indica si hay que borrar un espacio concreto del panel.
 * @param {boolean} action_delete_all indica si hay que borrar todo el contenido del panel central.
 * @param {boolean} action_text_in_out indica si el texto realizara todo el recorrido.
 * @param {boolean} action_text_only_in indica si el texto parara a la mitad.
 * @param {int} action_font_size tamaño de la fuente.
 * @param {int} action_speed velocidad de movimiento del texto.
 * @param {int} action_pausa tiempo de espera que realizara la animacion.
 * @param {boolean} action_orla indica si la orla esta encendida o no.
 * @param {int} action_tipography estilo de la tipografia.
 * @param {int} action_color color en que mostrar el texto en caso de que la cruz lo permita
 * @param {int} action_led numero de filas de led a partir del cual mostrar el mensaje (Este valor viene derivado del valor de FILA)
 */
function animation(cross_mask, action_message, action_top_draw, action_bottom_draw, action_effect, action_delete_single_row, action_delete_all, action_text_in_out, action_text_only_in, action_font_size, action_speed, action_pausa, action_orla, action_tipography, action_color, action_led, animationled, fileAnimation) {
  console.log("Inicio animation()");
  //Limpiamos el panel y indicamos el inicio de la secuencia
  clearInterval(scrollControl);
  document.getElementById("textoInfo").innerHTML = "Inicio secuencia animacion creada.";

  //Indicamos cuales son los parametros de altura y longitud de la cruz para poder trabajar con ellos.
  cross_height = topPanel_Y + middlePanel_Y + bottomPanel_Y + topEdge + bottomEdge;
  cross_width = Math.max(topPanel_X, middlePanel_X, bottomPanel_X) + leftEdge + rightEdge;

  //================= SELECTION ANIMACION FICHERO LED =====================
  if (animationled) {
    console.log("animation() -> Recibe animationled = ", animationled, " llamada a playAnimacion() z = ",z);
    console.log("animation() envia fileName = ",fileAnimation.fileName, " fileData = ",fileAnimation.fileData);
    playAnimacion(fileAnimation.fileName, fileAnimation.fileData);
   
  }

  //================== SELECCION DE TIPOGRAFIA A UTILIZAR ==================
  var font;

  if (action_font_size === 1) {
    //Letra GRANDE
    font = action_tipography === 0 ? font3 : font4; //Font a usar
    row = (topEdge + topPanel_Y) * 10; //Fila donde mostrar los datos
  } else {
    //Letra pequeña
    font = action_tipography === 0 ? font1 : font2; //Font a usar
    row = (topEdge + topPanel_Y + action_led) * 10; //Fila donde mostrar los datos
  }

  bucle = font[action_message[0]].length - 1; //Altura del texto




  // ================== SELECCION DE OFFSET ==================
  //Miramos el tamaño del mensaje a mostrar para poder centrarlo en la cruz
  let offset = 0;
  for (i = 0; i < action_message.length; i++) {
    offset = offset + font[action_message[i]][0].length;
  }

  //Evitamos que quede un numero impar que descuadre el texto
  while ((cross_width - offset) % 2 != 0) {
    offset++;
  }

  //Dividimos por la mitad para saber cuanto se separa del cento del panel
  col = (((cross_width - offset) / 2) + 1) * 10;



  //================== DIBUJAMOS LA CRUZ ==================
  var x = 0;
  var y = 0;

  //Integramos las mascaras todo en uno
  checkArrays(cross_mask);

  for (var i = 0; i < cross_height; i++) { //i = y
    for (var j = 0; j < cross_width; j++) { // j = x

      //Dibujamos orla si se indica con el color escogido si dispone de el
      //Si es bicolor, puede tener los tres
      if (action_orla == true) {
        if ((mascara[i][j] == 4 || mascara[i][j] == 6) && action_color == 0) { //Puede verde o bicolor, selecciona verde
          ctx.drawImage(bmpVerde, x, y);

        } else if ((mascara[i][j] == 5 || mascara[i][j] == 6) && action_color == 1) { //Puede rojo o bicolor, selecciona rojo
          ctx.drawImage(bmpRojo, x, y);

        } else if (mascara[i][j] == 6 && action_color == 2) { //Puede bicolor, selecciona bicolor
          ctx.drawImage(bmpAmarillo, x, y);

        } else if (mascara[i][j] == 4) { //Solo puede verde y seleccion no coincide
          ctx.drawImage(bmpVerde, x, y);

        } else if (mascara[i][j] == 5) { //Solo puede rojo y seleccion no coincide
          ctx.drawImage(bmpRojo, x, y);
        }

      } else if (action_orla == false && (mascara[i][j] == 4 || mascara[i][j] == 5 || mascara[i][j] == 6)) {
        ctx.drawImage(bmpApagado, x, y);
      }

      if (mascara[i][j] == 0) {
        ctx.drawImage(bmpBlanco, x, y);
      }

      //Dibujamos la cruz
      if (mascara[i][j] > 0 && mascara[i][j] < 4) {

        //Borramos toda la cruz si se indica o si se trata de la primera ejecucion de animación
        if (action_delete_all || primera_vez) {
          ctx.drawImage(bmpApagado, x, y);

        } else if (action_delete_single_row && y >= (topEdge + topPanel_Y + action_led) * 10 && y < (topEdge + topPanel_Y + action_led + font[action_message[0]].length) * 10) {
          //Borramos a partir de la linia de leds que se indique y la altura del texto
          ctx.drawImage(bmpApagado, x, y);
        }
      }
      x += 10;
    }
    x = 0;
    y += 10;
  }

  primera_vez = false;



  //================== COLOR DEL TEXTO ==================
  //Miramos que colores permite la cruz a partir de la mascara integrada 
  if (findValue(mascara, 3) && action_color == 2) {
    action_color = bmpAmarillo;

  } else if ((findValue(mascara, 2) || findValue(mascara, 3)) && action_color == 1) {
    action_color = bmpRojo;

  } else {
    action_color = bmpVerde;
  }



  //================== DIBUJOS PANEL SUPERIOR E INFERIOR ==================
  dibujarDib((cross_width / 2 + topPanel_X / 2 - 1) * 10, (topEdge + topPanel_Y - 1) * 10, eval(action_top_draw), action_color, "top");// Dibuja la cruz de arriba
  dibujarDib((cross_width / 2 + bottomPanel_X / 2 - 1) * 10, (cross_height - bottomEdge - 1) * 10, eval(action_bottom_draw), action_color, "bottom");// Dibuja la cruz de abajo

  //Reset de valores
  fin = false;
  linea = 0;
  textMoveState = 0;
  contar = 0;



  //================== EJECUCION DE EFECTOS ==================
  if (action_effect == 0) { // Desplazamiento Arriba
    row = ((cross_height - bottomPanel_Y - bottomEdge) * 10) - 10;
    scrollControl = setInterval(ponerTextoV, delayInicioScroll, action_message, row, "U", action_speed, font, action_pausa, bucle, action_text_only_in, offset, action_led, action_font_size, action_color);

  } else if (action_effect == 1) { // Desplazamiento Abajo
    row = (topEdge + topPanel_Y) * 10;
    scrollControl = setInterval(ponerTextoV, delayInicioScroll, action_message, row, "D", action_speed, font, action_pausa, bucle, action_text_only_in, offset, action_led, action_font_size, action_color);

  } else if (action_effect == 3) { // Desplazamiento Derecha
    col = (leftEdge - offset) * 10;
    scrollControl = setInterval(ponerTexto, delayInicioScroll, action_message, "D", action_speed, font, action_pausa, action_text_in_out, action_text_only_in, offset, action_color);

  } else if (action_effect == 4) { // Desplazamiento Fija
    scrollControl = setInterval(ponerTextoStatico, delayInicioScroll, action_message, "F", font, action_speed, action_pausa, action_color);

  } else if (action_effect == 5) { // Desplazamiento Fija Parpadeante
    scrollControl = setInterval(ponerTextoStatico, delayInicioScroll, action_message, "FP", font, action_speed, action_pausa, action_color);

  } else { // Desplazamiento Izq
    col = (cross_width - rightEdge) * 10;
    scrollControl = setInterval(ponerTexto, delayInicioScroll, action_message, "I", action_speed, font, action_pausa, action_text_in_out, action_text_only_in, offset, action_color);
  }
}


//==================================================================================================================================================================================================================================================================


/**
 * Funcion que genera los dibujos en los paneles superior e inferior de la cruz
 * 
 * @param {*} posx Posicion del eje de las X en la Web (columnas)
 * @param {*} posy Posicion del eje de las Y en la Web (fila)
 * @param {*} bufDib Dibujo de js/dib/dib.js a realizar 
 * @param {*} color Color en que mostrar la letra
 * @param {*} position Inidica con que panel se trabaja
 */
function dibujarDib(posx, posy, bufDib, color, position) {
  var y = 0;
  var i;
  var j;
  var datosDib;
  var byteDib = 0;
  var bitMask;
  x = posx;
  y = posy;

  if (position == "top") {
    for (j = 0; j < topPanel_X; j++) {
      bitMask = 0x2000;
      datosDib = (bufDib[byteDib] << 8) | bufDib[byteDib + 1];
      for (i = 0; i < topPanel_Y; i++) {
        if (!(datosDib & bitMask)) {
          ctx.drawImage(bmpApagado, x, y);
        } else {
          ctx.drawImage(color, x, y);
        }
        bitMask = bitMask >> 1;
        x = x - 10;
      }
      x = posx;
      y = y - 10;
      byteDib = byteDib + 2;
    }
  } else if (position == "bottom") {
    for (j = 0; j < bottomPanel_X; j++) {
      bitMask = 0x2000;
      datosDib = (bufDib[byteDib] << 8) | bufDib[byteDib + 1];
      for (i = 0; i < bottomPanel_Y; i++) {
        if (!(datosDib & bitMask)) {
          ctx.drawImage(bmpApagado, x, y);
        }
        else {
          ctx.drawImage(color, x, y);
        }
        bitMask = bitMask >> 1;
        x = x - 10;
      }
      x = posx;
      y = y - 10;
      byteDib = byteDib + 2;
    }
  }

}


//==================================================================================================================================================================================================================================================================


/**
 * Funcion que hace aparecer por el borde superior las letras en el caso DOWN. Primero de los 
 * casos del desplazamiento
 * 
 * @param {int} posx Posicion del eje de las X en la Web (columnas)
 * @param {int} row Posicion del eje de las Y en la Web (fila)
 * @param {char} buffLetra Letra del mensaje a mostrar
 * @param {*} color Color en que mostrar la letra
 * @param {*} font Estilo tipografico del mensaje
 * @param {int} bucle Altura de las letras
 * @returns Posicion en el eje de las X de la Web despues de escribir la letra
 */
function ponLetraV11(posx, row, buffLetra, color, font, bucle) {
  var x;
  var y;
  var letraLength;

  x = posx;
  y = row;

  for (i = bucle; i < font[buffLetra].length; i++) {
    letraLength = font[buffLetra][i].length;
    for (j = 0; j < letraLength; j++) {
      if (x >= leftEdge * 10 && x < (cross_width - rightEdge) * 10) {
        if (font[buffLetra][i][j] != 0) {
          ctx.drawImage(color, x, y);
        } else {
          ctx.drawImage(bmpApagado, x, y);
        }
      }
      x += 10;
    }
    x = posx;
    y += 10;

  }
  return 10 * letraLength;
}



/**
 * Funcion que desplaza el mensaje hacia abajo mientras no tenga que aparecer o desaparecer 
 * por algun borde. Segundo caso del desplazamiento DOWN.
 * 
 * @param {int} posx Posicion del eje de las X en la Web (columnas)
 * @param {int} row Posicion del eje de las Y en la Web (fila)
 * @param {char} buffLetra Letra del mensaje a mostrar
 * @param {*} color Color en que mostrar la letra
 * @param {*} font Estilo tipografico del mensaje
 * @returns Posicion en el eje de las X de la Web despues de escribir la letra
 */
function ponLetraV12(posx, row, buffLetra, color, font) {
  var x;
  var y;
  var letraLength;

  x = posx;
  y = row;

  for (i = 0; i < font[buffLetra].length; i++) {
    letraLength = font[buffLetra][i].length;
    for (j = 0; j < letraLength; j++) {
      if (x >= leftEdge * 10 && x < (cross_width - rightEdge) * 10) {
        if (font[buffLetra][i][j] != 0) {
          ctx.drawImage(color, x, y);
        }
        else {
          ctx.drawImage(bmpApagado, x, y);
        }
      }
      x += 10;
    }
    x = posx;
    y += 10;

  }
  return 10 * letraLength;
}



/**
 * Funcion que hace desaparecer las letras por el borde inferior. Tercer y ultimo caso de 
 * deplazamiento DOWN
 * 
 * @param {int} posx Posicion del eje de las X en la Web (columnas)
 * @param {int} row Posicion del eje de las Y en la Web (fila)
 * @param {int} buffLetra Letra del mensaje a mostrar
 * @param {*} color Color en que mostrar la letra
 * @param {*} font Estilo tipografico del mensaje
 * @param {int} bucle Altura de las letras
 * @returns Posicion en el eje de las X de la Web despues de escribir la letra
 */
function ponLetraV13(posx, row, buffLetra, color, font, bucle) {
  var x;
  var y;
  var letraLength;

  x = posx;
  y = row;

  for (i = 0; i < font[buffLetra].length - bucle; i++) {
    letraLength = font[buffLetra][i].length;
    for (j = 0; j < letraLength; j++) {
      if (x >= leftEdge * 10 && x < (cross_width - rightEdge) * 10) {
        if (font[buffLetra][i][j] != 0) {
          ctx.drawImage(color, x, y);
        }
        else {
          ctx.drawImage(bmpApagado, x, y);
        }
      }
      x += 10;
    }
    x = posx;
    y += 10;

  }
  return 10 * letraLength;
}



/**
 * Funcion que hace aparecer las letras por el borde inferior. Primer caso de
 * deplazamiento UP
 * 
 * @param {int} posx Posicion del eje de las X en la Web (columnas)
 * @param {int} row Posicion del eje de las Y en la Web (fila)
 * @param {char} buffLetra Letra del mensaje a mostrar
 * @param {*} color Color en que mostrar la letra
 * @param {*} font Estilo tipografico del mensaje
 * @param {int} bucle Altura de las letras
 * @returns Posicion en el eje de las X de la Web despues de escribir la letra
 */
function ponLetraV21(posx, row, buffLetra, color, font, bucle) {
  var x;
  var y;
  var letraLength;

  x = posx;
  y = row;

  for (i = 0; i < font[buffLetra].length - bucle; i++) {
    letraLength = font[buffLetra][i].length;
    for (j = 0; j < letraLength; j++) {
      if (x >= leftEdge * 10 && x < (cross_width - rightEdge) * 10) {
        if (font[buffLetra][i][j] != 0) {
          ctx.drawImage(color, x, y);
        } else {
          ctx.drawImage(bmpApagado, x, y);
        }
      }
      x += 10;
    }
    x = posx;
    y += 10;

  }
  return 10 * letraLength;
}



/**
 * Funcion que desplaza el mensaje hacia arriba mientras no tenga que aparecer o desaparecer 
 * por algun borde. Segundo caso del desplazamiento UP.
 * 
 * @param {int} posx Posicion del eje de las X en la Web (columnas)
 * @param {int} row Posicion del eje de las Y en la Web (fila)
 * @param {char} buffLetra Letra del mensaje a mostrar
 * @param {*} color Color en que mostrar la letra
 * @param {*} font Estilo tipografico del mensaje
 * @returns Posicion en el eje de las X de la Web despues de escribir la letra
 */
function ponLetraV22(posx, row, buffLetra, color, font) {
  var x;
  var y;
  var letraLength;

  x = posx;
  y = row;

  for (i = 0; i < font[buffLetra].length; i++) {
    letraLength = font[buffLetra][i].length;
    for (j = 0; j < letraLength; j++) {
      if (x >= leftEdge * 10 && x < (cross_width - rightEdge) * 10) {
        if (font[buffLetra][i][j] != 0) {
          ctx.drawImage(color, x, y);
        }
        else {
          ctx.drawImage(bmpApagado, x, y);
        }
      }
      x += 10;
    }
    x = posx;
    y += 10;

  }
  return 10 * letraLength;
}



/**
 * Funcion que hace desaparecer las letras por el borde superior. Tercer y ultimo caso de 
 * deplazamiento UP
 * 
 * @param {int} posx Posicion del eje de las X en la Web (columnas)
 * @param {int} row Posicion del eje de las Y en la Web (fila)
 * @param {char} buffLetra Letra del mensaje a mostrar
 * @param {*} color Color en que mostrar la letra
 * @param {*} font Estilo tipografico del mensaje
 * @param {int} bucle Altura de las letras
 * @returns Posicion en el eje de las X de la Web despues de escribir la letra
 */
function ponLetraV23(posx, row, buffLetra, color, font, bucle) {
  var x;
  var y;
  var letraLength;

  x = posx;
  y = row;

  for (i = bucle; i < font[buffLetra].length; i++) {
    letraLength = font[buffLetra][i].length;
    for (j = 0; j < letraLength; j++) {
      if (x >= leftEdge * 10 && x < (cross_width - rightEdge) * 10) {
        if (font[buffLetra][i][j] != 0) {
          ctx.drawImage(color, x, y);
        } else {
          ctx.drawImage(bmpApagado, x, y);
        }
      }
      x += 10;
    }
    x = posx;
    y += 10;

  }
  return 10 * letraLength;
}



/**
 * Funcion correspondiente a los efectos de las animaciones de ABAJO y ARRIBA.
 * 
 * @param {string} texto mensaje a mostrar.
 * @param {int} row posicion del eje Y en la web. 
 * @param {char} dir indica la direccion del efecto, D (down) y U (up).
 * @param {int} speed velocidad de movimiento del texto.
 * @param {*} font tipografia con la que representar el texto.
 * @param {int} pause tiempo de espera que realizara el efecto.
 * @param {int} bucle mumero de veces que se ejecutaran las funciones de aparecer y desaparecer el 
 *              texto por los limites de la cruz. El valor corresponde a la altura de las letras 
 *              del mensaje
 * @param {boolean} stop_middle indica si hay pausa en el muestreo
 * @param {int} offset separacion del inicio del texto respecto al centro del panel a fin de que el 
 *            mensaje salga centrado
 * @param {int} fila numero de fila de leds a partir del que se mostrara el mensaje.
 * @param {int} size tamaño de la fuente.
 * @param {*} color color en que mostrar el texto en caso de que la cruz lo permita.
 * 
 * done => indica si se ha realizado la pausa o si es necesaria.
 * textMoveState => estado en el que se encuentra la animación.
 */
function ponerTextoV(texto, row, dir, speed, font, pause, bucle, stop_middle, offset, fila, size, color) {

  clearInterval(scrollControl);
  pos = col;

  //CASO HACIA ABAJO
  if (dir == "D") {
    switch (textMoveState) {
      case 0: //Texto aparece poco a poco desde el panle superior
        for (iletra = 0; iletra < texto.length; iletra++) {
          pos += ponLetraV11(pos, row + (bucle % 1) * 10, texto[iletra], color, font, bucle);
        }
        bucle--;
        if (bucle <= 0) {
          textMoveState++;
        }
        break;

      case 1: //Texto se desplaza hacia abajo
        //Miramos si es necesario realizar pausa.
        if (pause > 0 && contar == 0) {

          //Tamaño de letra pequeña y en que posicion se realiza la pausa
          if (size == 0) {
            if (row > (topEdge + topPanel_Y + fila) * 10) {
              done = true;
              contar++;
            }

            //Tamaño de letra GRANDE. Posicion solo a partir de panel superior
          } else {
            if (row > (topEdge + topPanel_Y) * 10) {
              done = true;
              contar++;
            }
          }

          //Tiempo de espera
          if (contar > 0) {
            setTimeout(function () {
              if (stop_middle) {
                acabar++;
              } else {
                done = false;
              }
              if (size == 1) {
                linea = middlePanel_Y - font[texto[0]].length + 3;
              }
            }, pause * 1000);
          }
        }

        //Mientras no se deba realizar la pausa, deplazamiento del texto hacia abajo
        if (!done) {
          if (row < (cross_height - bottomPanel_Y - bottomEdge - 6) * 10 - 70 * size) {
            if (linea != 0) {
              for (i = (cross_width - offset) / 2; i < (cross_width + offset) / 2; i++) {
                if (i >= leftEdge && i < cross_width - rightEdge) {
                  ctx.drawImage(bmpApagado, (10 * i), row - 10);
                }
              }
            }
            for (iletra = 0; iletra < texto.length; iletra++) {
              pos += ponLetraV12(pos, row, texto[iletra], color, font);
            }
          }

          linea++;
          row += 10;

          //Cuando la parte inferior del texto llegue al panel inferior, pasamos al ultimo estado
          if (linea > (middlePanel_Y - font[texto[0]].length + 1)) {
            textMoveState++;
            linea--;
            row -= 10;
            scape_row = row;
            bucle = 1;
          }
        }

        break;

      case 2: //Texto desaparece por el final
        for (i = (cross_width - offset) / 2; i < (cross_width + offset) / 2; i++) {
          if (i >= leftEdge && i < cross_width - rightEdge) {
            ctx.drawImage(bmpApagado, (10 * i), scape_row - 10);
          }
        }

        for (iletra = 0; iletra < texto.length; iletra++) {
          pos += ponLetraV13(pos, scape_row, texto[iletra], color, font, bucle);
        }

        linea++;
        bucle++;
        scape_row += 10;
        if (linea > middlePanel_Y) {
          acabar++;
        }
        break;
    }

    //CASO HACIA ARRIBA
  } else if (dir == "U") {
    switch (textMoveState) {
      case 0: //Texto aparece poco a poco desde el panle inferior
        for (iletra = 0; iletra < texto.length; iletra++) {
          pos += ponLetraV21(pos, row, texto[iletra], color, font, bucle);
        }

        bucle--;
        row -= 10;
        if (bucle <= 0) {
          textMoveState++;
          scape_row = ((cross_height - bottomPanel_Y - bottomEdge) * 10);
        }
        break;

      case 1://Texto se desplaza hacia arriba
        //Miramos si es necesario realizar pausa.
        if (pause > 0 && contar == 0) {
          if (row < (topEdge + topPanel_Y + fila) * 10) {
            done = true;
            contar++;
          }

          if (contar > 0) {
            setTimeout(function () {
              done = false;
              if (stop_middle) {
                acabar++;
              }
            }, pause * 1000);
          }
        }

        //Mientras no de deba realizar la pausa, desplazamiento de texto hacia arriba
        if (!done) {
          if (row >= (topEdge + topPanel_Y) * 10) {
            for (iletra = 0; iletra < texto.length; iletra++) {
              pos += ponLetraV22(pos, row, texto[iletra], color, font);
            }

            for (i = (cross_width - offset) / 2; i < (cross_width + offset) / 2; i++) {
              if (i >= leftEdge && i < cross_width - rightEdge && scape_row < (cross_height - bottomPanel_Y - bottomEdge) * 10) {
                ctx.drawImage(bmpApagado, (10 * i), scape_row);
              }
            }
          }

          row -= 10;
          scape_row -= 10;
          linea++;
        }

        //Cuando la parte superior del texto llegue al panel superior, pasamos al ultimo estado
        if (linea > (middlePanel_Y - font[texto[0]].length + 1)) {
          textMoveState++;
          bucle = 1;
          row = (topEdge + topPanel_Y) * 10;
          scape_row += 10;
        }
        break;

      case 2://Texto desaparece por el final.
        for (iletra = 0; iletra < texto.length; iletra++) {
          pos += ponLetraV23(pos, row, texto[iletra], color, font, bucle);
        }


        for (i = (cross_width - offset) / 2; i < (cross_width + offset) / 2; i++) {
          if (i >= leftEdge && i < cross_width - rightEdge) {
            ctx.drawImage(bmpApagado, (10 * i), scape_row);
          }
        }

        linea++;
        bucle++;
        scape_row -= 10;
        if (linea > middlePanel_Y) {
          acabar++;
        }
        break;
    }
  }

  //Si se indica, finalizamos
  if (acabar > 0) {
    fin = true;
    done = false;
    acabar = 0;
    contar = 0;
  }

  if (fin == false) {
    scrollControl = setInterval(ponerTextoV, tiempoScroll - (speed * 2), texto, row, dir, speed, font, pause, bucle, stop_middle, offset, fila, size, color);
  }
}


//==================================================================================================================================================================================================================================================================


/**
 *  Funcion que posiciona las letras hacia la izquierda.
 * 
 * @param {int} posx Posicion del eje de las X en la Web (columnas)
 * @param {int} posy Posicion del eje de las Y en la Web (fila)
 * @param {char} buffLetra Letra del mensaje a mostrar
 * @param {*} color Color en que mostrar la letra
 * @param {*} font Estilo tipografico del mensaje
 * @returns Posicion en el eje de las X de la Web despues de escribir la letra
 */
function ponLetraIzquierda(posx, posy, buffLetra, color, font) {
  var x, y;
  var letraLength;
  x = posx;
  y = posy;

  for (i = 0; i < font[buffLetra].length; i++) {
    letraLength = font[buffLetra][i].length;
    for (j = 0; j < letraLength; j++) {
      if (x < (cross_width - rightEdge) * 10 && x >= (leftEdge) * 10) {
        if (font[buffLetra][i][j] != 0) {
          ctx.drawImage(color, x, y);
        }
        else {
          ctx.drawImage(bmpApagado, x, y);
        }
      }
      x += 10;
    }
    x = posx;
    y += 10;
  }
  return 10 * letraLength;
}



/**
 * Funcion que posiciona las letras hacia la derecha.
 * 
 * @param {int} posx Posicion del eje de las X en la Web (columnas)
 * @param {int} posy Posicion del eje de las Y en la Web (fila)
 * @param {char} buffLetra Letra del mensaje a mostrar
 * @param {*} color Color en que mostrar la letra
 * @param {*} font Estilo tipografico del mensaje
 * @returns Posicion en el eje de las X de la Web despues de escribir la letra
 */
function ponLetraDerecha(posx, posy, buffLetra, color, font) {
  var x, y;
  var letraLength;
  x = posx;
  y = posy;

  for (i = 0; i < font[buffLetra].length; i++) {
    letraLength = font[buffLetra][i].length;
    for (j = 0; j < letraLength; j++) {
      if (x >= leftEdge * 10 && x < (cross_width - rightEdge) * 10) {
        if (font[buffLetra][i][j] != 0) {
          ctx.drawImage(color, x, y);
        }
        else {
          ctx.drawImage(bmpApagado, x, y);
        }
      }
      x += 10;
    }
    x = posx;
    y += 10;
  }
  return 10 * letraLength;
}


/**
 * Funcion correspondiente a los efectos de las animaciones de IZQUIERDA Y DERECHA.
 * 
 * @param {string} texto Mensaje a mostrar.
 * @param {char} dir Indica la direccion del efecto, I (izquierda) y D (derecha).
 * @param {int} speed Velocidad de movimiento del texto.
 * @param {*} font Tipografia con la que representar el texto.
 * @param {int} pause Tiempo de espera que realizara el efecto.
 * @param {boolean} all_movement Indica si el texto realiza todo el movimiento.
 * @param {boolean} stop_middle Indica si hay pausa en el muestreo.
 * @param {int} offset Separacion del inicio del texto respecto al centro del panel a fin de que el 
 *            mensaje salga centrado
 * @param {*} color color en que mostrar el texto en caso de que la cruz lo permita.
 * 
 * done => indica si se ha realizado la pausa o si es necesaria.
 */
function ponerTexto(texto, dir, speed, font, pause, all_movement, stop_middle, offset, color) {

  clearInterval(scrollControl);
  pos = col;

  //CASO HACIA DERECHA
  if (dir == "D") {
    for (i = (row / 10 - topEdge - topPanel_Y); i < (row / 10 - topEdge - topPanel_Y) + font[texto[0]].length; i++) {
      if (col > leftEdge * 10) {
        ctx.drawImage(bmpApagado, (col - 10), (topEdge + topPanel_Y + i) * 10);
      }
    }
    //Miramos si hay espera
    if (pause > 0 && pos >= ((cross_width - offset) / 2) * 10 && !done) {
      for (iletra = 0; iletra < texto.length; iletra++) {
        pos += ponLetraDerecha(pos, row, texto[iletra], color, font);
      }
      //Realizamos espera indicada
      if (contar == 0) {
        timeoutId = setTimeout(function () {
          done = true;
          if (stop_middle == true) {
            acabar++;
          }
        }, pause * 1000);
      }
      contar++;

    } else {
      //Mientras no haya espera mostramos y desplazamos las letras
      if (stop_middle == true && pause == 0 && pos > ((cross_width - offset) / 2) * 10) {
        acabar++;
      }
      for (iletra = 0; iletra < texto.length; iletra++) {
        pos += ponLetraDerecha(pos, row, texto[iletra], color, font);
      }
      col += 10; //Vamos incrementando las columnas
      if (pos >= (leftEdge + middlePanel_X + offset) * 10) {
        acabar++;
      }
    }

    //CASO HACIA LA IZQUIERDA
  } else if (dir == "I") {
    //Miramos si hay espera
    if (pause > 0 && pos <= ((cross_width - offset) / 2 + 1) * 10 && !done) {
      for (iletra = 0; iletra < texto.length; iletra++) {
        pos += ponLetraIzquierda(pos, row, texto[iletra], color, font);
      }
      //Realizamos espera indicada
      if (contar == 0) {
        timeoutId = setTimeout(function () {
          done = true;
          if (stop_middle == true) {
            acabar++;
          }
        }, pause * 1000);
      }
      contar++;

    } else {
      //Mientras no haya espera mostramos y desplazamos las letras
      if (stop_middle == true && pause == 0 && pos <= ((cross_width - offset) / 2) * 10) {
        acabar++;
      }
      for (iletra = 0; iletra < texto.length; iletra++) {
        pos += ponLetraIzquierda(pos, row, texto[iletra], color, font);
      }
      col -= 10; //Vamos incrementando las columnas
      if (col < (leftEdge - offset) * 10) {
        acabar++;
      }
    }
  }

  //Si se indica, finalizamos
  if (acabar > 0) {
    acabar = 0;
    contar = 0;
    fin = true;
    done = false;
  }

  if (fin == false) {
    scrollControl = setInterval(ponerTexto, tiempoScroll - (speed * 2), texto, dir, speed, font, pause, all_movement, stop_middle, offset, color);
  }
}


//==================================================================================================================================================================================================================================================================


/**
 * Funcion que posiciona el texto a partir de un punto fijo
 * 
 * @param {*} posx Posicion del eje de las X en la Web (columnas)
 * @param {*} posy Posicion del eje de las Y en la Web (fila)
 * @param {*} buffLetra Letra del mensaje a mostrar
 * @param {*} color Color en que mostrar la letra
 * @param {*} font Estilo tipografico del mensaje
 * @returns Posicion en el eje de las X de la Web despues de escribir la letra
 */
function ponLetra(posx, posy, buffLetra, color, font) {
  var x, y;
  var letraLength;
  x = posx;
  y = posy;

  for (i = 0; i < font[buffLetra].length; i++) {
    letraLength = font[buffLetra][i].length;
    for (j = 0; j < letraLength; j++) {
      if (x > leftEdge * 10 && x < (cross_width - rightEdge) * 10) {
        if (font[buffLetra][i][j] != 0) {
          ctx.drawImage(color, x, y);
        }
        else {
          ctx.drawImage(bmpApagado, x, y);
        }
      }
      x += 10;
    }
    x = posx;
    y += 10;
  }
  return 10 * letraLength;
}


/**
 * Funcion correspondiente a los efectos de las animaciones de FIJO Y FIJO PARPADEANTE.
 * 
 * @param {string} texto Mensaje a mostrar.
 * @param {char} dir Indica la direccion del efecto, I (izquierda) y D (derecha).
 * @param {*} font Tipografia con la que representar el texto.
 * @param {int} speed Velocidad de movimiento del texto.
 * @param {int} pause Tiempo de espera que realizara el efecto.
 * @param {*} color Color en que mostrar el texto en caso de que la cruz lo permita.
 * 
 * done => indica si se ha realizado el tiempo entre mostrar y apagar mensaje.
 * contar => numero de veces que hay que realizar el encendido y apagado
 */
function ponerTextoStatico(texto, dir, font, speed, pause, color) {

  pos = col;
  clearInterval(scrollControl);

  //CASO FIJO
  if (dir == "F") {
    //Mostramos mensaje
    for (iletra = 0; iletra < texto.length; iletra++) {
      pos += ponLetra(pos, row, texto[iletra], color, font);
    }
    //Realizamos espera indicada
    if (done == false) {
      setTimeout(function () {
        acabar++;
      }, pause * 1000);
      done = true;
    }

    //CASO FIJO PARPADEANTE
  } else if (dir == "FP") {

    //Mostramos mensaje
    if (contar % 2 == 0) {

      if (done == false) {
        for (iletra = 0; iletra < texto.length; iletra++) {
          pos += ponLetra(pos, row, texto[iletra], color, font);
        }

        clearTimeout(timeoutId);

        //Tiempo de espera entre encendido y apagado
        done = true;
        timeoutId = setTimeout(function () {
          contar++;
          done = false;
        }, 800);
      }

    } else {
      //Escondemos el mensaje
      if (done == false) {
        for (iletra = 0; iletra < texto.length; iletra++) {
          pos += ponLetra(pos, row, texto[iletra], bmpApagado, font);
        }

        clearTimeout(timeoutId);

        //Tiempo de espera entre encendido y apagado
        done = true;
        timeoutId = setTimeout(function () {
          contar++;
          done = false;
        }, 800);
      }
    }

    //Numero de ciclos de apagado y encendido
    if (contar > 4) {
      acabar++;
    }

  }

  //Si se indica, finalizamos
  if (acabar > 0) {
    acabar = 0;
    contar = 0;
    fin = true;
    done = false;
    clearTimeout(timeoutId); //Eliminamos cualquier ejecucion posterior para evitar problemas
  }

  if (fin == false) {
    scrollControl = setInterval(ponerTextoStatico, tiempoScroll - (speed * 2), texto, dir, font, speed, pause, color);
  }
}