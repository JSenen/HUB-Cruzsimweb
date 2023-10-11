// TODO en fichero principal

function newCanvas(){
// Crear un nuevo canvas para la máscara
var maskCanvas = document.createElement('canvas');
maskCanvas.width = maskContent[0].length;
maskCanvas.height = maskContent.length;
var maskCtx = maskCanvas.getContext('2d');

// Dibujar la máscara en el canvas de la máscara
for (var y = 0; y < maskContent.length; y++) {
  for (var x = 0; x < maskContent[y].length; x++) {
    if (maskContent[y][x] === 1) {
      // Dibujar un píxel activo en negro
      maskCtx.fillStyle = "black";
      maskCtx.fillRect(x, y, 1, 1);
    } else {
      // Dibujar un píxel inactivo en blanco
      maskCtx.fillStyle = "white";
      maskCtx.fillRect(x, y, 1, 1);
    }
  }
}
}



///
// Con source-in solo se muestran pixeles donde mascara es negra
// Componer el canvas principal con la máscara
ctx.globalCompositeOperation = 'source-in';
ctx.drawImage(maskCanvas, 0, 0);
ctx.globalCompositeOperation = 'source-over'; // Restaurar la operación predeterminada


//// Dibujar animacon
dibujarAnimacion();



////////////////////////////////////  POR HACER //////////////////////////////
// Variables globales para el canvas y su contexto
var canvas;
var ctx;

// Variables globales para las imágenes de los LEDs
var bmpApagado;
var bmpVerde;
var bmpRojo;
var bmpAmarillo;
var bmpBlanco;

// Variables globales para la máscara
var maskCanvas;
var maskCtx;

// Cargar la máscara desde un archivo JSON
function cargarMascaraDesdeArchivo(file) {
  var reader = new FileReader();

  reader.onload = function(e) {
    var maskContent = JSON.parse(e.target.result);

    // Crear un nuevo canvas para la máscara
    maskCanvas = document.createElement('canvas');
    maskCanvas.width = maskContent[0].length;
    maskCanvas.height = maskContent.length;
    maskCtx = maskCanvas.getContext("2d");

    // Dibujar la máscara en el canvas de la máscara
    for (var y = 0; y < maskContent.length; y++) {
      for (var x = 0; x < maskContent[y].length; x++) {
        if (maskContent[y][x] === 1) {
          // Dibujar un píxel activo en negro
          maskCtx.fillStyle = "black";
          maskCtx.fillRect(x, y, 1, 1);
        } else {
          // Dibujar un píxel inactivo en blanco
          maskCtx.fillStyle = "white";
          maskCtx.fillRect(x, y, 1, 1);
        }
      }
    }
  };

  reader.readAsText(file);
}

// Función para manejar el envío del formulario
function handleFormSubmit(event) {
  event.preventDefault(); // Evitar la recarga de la página por defecto
  var inputElement = document.getElementById("archivoMascara");
  var file = inputElement.files[0];

  if (file) {
    cargarMascaraDesdeArchivo(file);

    // Luego puedes dibujar el canvas de la máscara en el canvas principal
    if (maskCanvas) {
      ctx.drawImage(maskCanvas, 0, 0);
    }
  }
}

// Código al cargar la página
window.onload = function () {
  // Obtener referencias a elementos HTML
  canvas = document.createElement('canvas');
  canvas.width = 560;
  canvas.height = 560;
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");

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

  // Configurar el formulario para manejar la carga de la máscara
  var form = document.querySelector('.seqForm');
  form.addEventListener('submit', handleFormSubmit);
};