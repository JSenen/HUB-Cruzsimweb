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