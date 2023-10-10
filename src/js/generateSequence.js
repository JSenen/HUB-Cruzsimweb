let count=0;
let id=0;
let selectedFile = null;
/** @param {*} formJSON Json guarda los parametros de la secuencia creada */

var formJSON; 

function addAction() {
  console.log("addAction()");
    newRow = document.createElement('tr');
    newRow.setAttribute('id', `row-${count}`);
    newRow.setAttribute('data-id', count); // Agrega un atributo data-id con el valor de count
    newRow.innerHTML = `
    <td>
      <label id="count" style="display: none;">${count}</label>
      <input type="text" id="id" value="${count}"></td>
    <td>
        <select>
            <option value"temperature">Temperatura</option>
            <option value"hour">Hora</option>
            <option value"time">Tiempo</option>
            <option value"santoral">Santoral</option>
            <option value"image">Imagen</option>
            <option value"humidity">Humedad</option>
            <option value"date">Fecha</option>
            <option value"text">Texto</option>
            <option value="Animación">Animación</option>
        </select>
    </td>
    <td>
      <button type="button" onclick="toggleDropdown(this)">Mostrar opciones</button>
      <div class="dropdown" style="position: absolute; display: none;">
        <div class="dropdown-content">
        
          <div class="guia">
            <label for="message-${count}">Texto</label>
            <input type="text" id="message-${count}" placeholder="Opcional si no es tipo Texto">
          </div>

          <div class="se_deja">
            <label for="top-drawing-${count}">Dibujo superior</label>
            <select id="top-drawing-${count}">
              <option value="0">Fondo Negro</option>
              <option value="1">Latina Llena</option>
              <option value="2">Latina Vacía</option>
              <option value="3">Malta Llena</option>
              <option value="4">Malta Vacía</option>
              <option value="5">Copa y serp.</option>
              <option value="6">24 Horas</option>
              <option value="7">12 Horas</option>
              <option value="8">Sol</option>
              <option value="9">Luna</option>
              <option value="10">Información</option>
              <option value="11">Símb. Hombre</option>
              <option value="12">Símb. Mujer</option>
              <option value="13">Hombre</option>
              <option value="14">Mujer</option>
              <option value="15">Probeta</option>
              <option value="16">Flecha abajo</option>
              <option value="17">Flecha arriba</option>
              <option value="18">Flecha izqui.</option>
              <option value="19">Flecha dere.</option>
              <option value="20">Gafas</option>
              <option value="21">Árbol navidad</option>
              <option value="22">Regalo navid.</option>
              <option value="23">Estrella navid.</option>
              <option value="24">Campana navid.</option>
              <option value="25">Termómetro</option>
              <option value="26">Teléfono</option>
            </select>
          </div>
          
          <div class="se_deja">
            <label for="bottom-drawing-${count}">Dibujo inferior</label>
            <select id="bottom-drawing-${count}">
              <option value="0">Fondo Negro</option>
              <option value="1">Latina Llena</option>
              <option value="2">Latina Vacía</option>
              <option value="3">Malta Llena</option>
              <option value="4">Malta Vacía</option>
              <option value="5">Copa y serp.</option>
              <option value="6">24 Horas</option>
              <option value="7">12 Horas</option>
              <option value="8">Sol</option>
              <option value="9">Luna</option>
              <option value="10">Información</option>
              <option value="11">Símb. Hombre</option>
              <option value="12">Símb. Mujer</option>
              <option value="13">Hombre</option>
              <option value="14">Mujer</option>
              <option value="15">Probeta</option>
              <option value="16">Flecha abajo</option>
              <option value="17">Flecha arriba</option>
              <option value="18">Flecha izqui.</option>
              <option value="19">Flecha dere.</option>
              <option value="20">Gafas</option>
              <option value="21">Árbol navidad</option>
              <option value="22">Regalo navid.</option>
              <option value="23">Estrella navid.</option>
              <option value="24">Campana navid.</option>
              <option value="25">Termómetro</option>
              <option value="26">Teléfono</option>
            </select>
          </div>

          <div class="se_deja">
            <label for="effect-${count}">Efecto</label>
            <select id="effect-${count}">
              <option value="0">Desplazar Hacia Arriba</option>
              <option value="1">Desplazar Hacia Abajo</option>
              <option value="2">Desplazar Hacia la Izquierda</option>
              <option value="3">Desplazar Hacia la Derecha</option>
              <option value="4" selected="selected">Fijo (Sin Movimiento)</option>
              <option value="5">Fijo Parpadeando (Sin Movimiento)</option>
            </select>
          </div>

          <div class="se_deja">
            <label for="color-${count}">Color</label>
            <select id="color-${count}">
              <option value="0">Verde</option>
              <option value="1">Rojo</option>
              <option value="2">Bicolor</option>
            </select>
          </div>

          <div class="se_deja">
            <label for="tipografia-${count}">Tipografía</label>
            <select id="tipografia-${count}">
              <option value="0">Tipografía 1</option>
              <option value="1">Tipografía 2</option>
            </select>
          </div>

          <div class="se_deja">
            <label for="font_size-${count}">Fuente</label>
            <select id="font_size-${count}">
              <option value="0">Tamaño 1</option>
              <option value="1">Tamaño 2</option>
            </select>
          </div>
          
          <div class="se_deja">
            <label for="row-${count}">Fila</label>
            <select id="row-${count}">
              <option value="0">Fila 1</option>
              <option value="1">Fila 2</option>
              <option value="2">Fila 3</option>
            </select>
          </div>

          <div class="se_deja">
            <label for="speed-${count}">Velocidad</label>
            <select id="speed-${count}">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5" selected="selected">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="se_deja">
            <label for="pause-${count}">Pausa</label>
            <select id="pause-${count}">
              <option value="0">Sin pausa</option>
              <option value="1">1 Seg.</option>
              <option value="2" selected="selected">2 Seg.</option>
              <option value="3">3 Seg.</option>
              <option value="4">4 Seg.</option>
              <option value="5">5 Seg.</option>
              <option value="6">6 Seg.</option>
              <option value="7">7 Seg.</option>
              <option value="8">8 Seg.</option>
              <option value="9">9 Seg.</option>
              <option value="10">10 Seg.</option>
              <option value="11">11 Seg.</option>
              <option value="12">12 Seg.</option>
              <option value="13">13 Seg.</option>
              <option value="14">14 Seg.</option>
              <option value="15">15 Seg.</option>
              <option value="16">16 Seg.</option>
              <option value="17">17 Seg.</option>
              <option value="18">18 Seg.</option>
              <option value="19">19 Seg.</option>
              <option value="20">20 Seg.</option>
            </select>
          </div>

          <div class="se_deja">
            <label for="led-${count}">Led</label>
            <select id="led-${count}">
              <option value="0" selected="selected">1</option>
              <option value="1">2</option>
              <option value="2">3</option>
              <option value="3">4</option>
              <option value="4">5</option>
              <option value="5">6</option>
              <option value="6">7</option>
              <option value="7">8</option>
              <option value="8">9</option>
              <option value="9">10</option>
              <option value="10">11</option>
              <option value="11">12</option>
              <option value="12">13</option>
            </select>
          </div>

          <div class="se_deja">
            <label for="delete_single_row-${count}">Antes borrar una sola fila</label>
            <input type="checkbox" id="delete_single_row-${count}"  checked="true">
          </div>

          <div class="se_deja">
            <label for="delete_all-${count}">Antes borrar todo</label>
            <input type="checkbox" id="delete_all-${count}" checked="true">
          </div>
          
          <div class="se_deja">
            <label for="text_in_out-${count}">El texto entra y sale</label>
            <input type="radio" id="text_in_out-${count}" name="text_move_${count}[]" checked="checked">
          </div>

          <div class="se_deja">
            <label for="text_only_in-${count}">El texto solo entra</label>
            <input type="radio" id="text_only_in-${count}" name="text_move_${count}[]">
          </div>

          <div class="se_deja">
            <label for="orla-${count}">Orla</label>
            <input type="checkbox" id="orla-${count}">
          </div>
        </div>
      </div>
    </td>
    <td>
      <input type="file" id="fileSelector-${count}" accept=".led">
    </td>
    <td><button type="button" onclick="removeAction('row-${count}')" class="delete-btn">Delete</button></td>
    `;
    table = document.getElementById('table');
    table.querySelector('tbody').appendChild(newRow);
    count++;
}


function removeAction(row_id) {
  console.log("removeAction()");
    var row = document.getElementById(row_id);
    row.parentNode.removeChild(row);
}

function toggleDropdown(button) {
  const dropdown = button.nextElementSibling;
  dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
}

  
/** Compone la secuencia */
function handleFormSubmit(event) {
  console.log("handleFormSubmit() compone secuencia");
    event.preventDefault();
  
    data = new FormData(event.target);
  
    formJSON = Object.fromEntries(data.entries());

    // get the state of the checkbox
    defaultCheckbox = document.querySelector('input[name="default"]');
    formJSON.default = defaultCheckbox.checked;
    // Busca en las filas 
    tableRows = document.querySelectorAll('#table tbody tr');
    actions = []; //Array para almacenar datos de la fila
    
    tableRows.forEach(row => {
        rowData = {};
        cells = row.querySelectorAll('td');

        cells.forEach((cell, index) => {

          if (index === 0) {
            // Obtén el valor id desde el atributo data-id
            id = row.getAttribute('data-id');
            rowData['_id'] = cell.querySelector('input').value;
          } else if (index === 1) {
                selectElement = cell.querySelector('select');
                selectedOption = selectElement.options[selectElement.selectedIndex];
                rowData['type'] = selectedOption.value;
            } else if (index === 2) {
              
              paramData = {}; 

              inputElement = document.querySelector('#message-' + id);
              paramData['message'] = inputElement.value;

              selectElementTop = cell.querySelector('#top-drawing-' + id);
              selectedOptionTop = selectElementTop.options[selectElementTop.selectedIndex];
              paramData['top_drawing'] = parseInt(selectedOptionTop.value);

              selectElementBottom = cell.querySelector('#bottom-drawing-' + id);
              selectedOptionBottom = selectElementBottom.options[selectElementBottom.selectedIndex];
              paramData['bottom_drawing'] = parseInt(selectedOptionBottom.value);

              selectElementEffect = cell.querySelector('#effect-' + id);
              selectedOptionEffect = selectElementEffect.options[selectElementEffect.selectedIndex];
              paramData['effect'] = parseInt(selectedOptionEffect.value);

              selectElementColor = cell.querySelector('#tipografia-' + id);
              selectedOptionColor = selectElementColor.options[selectElementColor.selectedIndex];
              paramData['tipografia'] = parseInt(selectedOptionColor.value);

              checkboxDeleteSingleRow = cell.querySelector('#delete_single_row-' + id);
              paramData['delete_single_row'] = checkboxDeleteSingleRow.checked;

              checkboxDeleteAll = cell.querySelector('#delete_all-' + id);
              paramData['delete_all'] = checkboxDeleteAll.checked;

              checkboxTextInOut = cell.querySelector('#text_in_out-' + id);
              paramData['text_in_out'] = checkboxTextInOut.checked;

              checkboxTextOnlyIn = cell.querySelector('#text_only_in-' + id);
              paramData['text_only_in'] = checkboxTextOnlyIn.checked;

              selectElementFontSize = cell.querySelector('#font_size-' + id);
              selectedOptionFontSize = selectElementFontSize.options[selectElementFontSize.selectedIndex];
              paramData['font_size'] = parseInt(selectedOptionFontSize.value);

              selectElementRow = cell.querySelector('#row-' + id);
              selectedOptionRow = selectElementRow.options[selectElementRow.selectedIndex];
              paramData['row'] = parseInt(selectedOptionRow.value);

              selectElementSpeed = cell.querySelector('#speed-' + id);
              selectedOptionSpeed = selectElementSpeed.options[selectElementSpeed.selectedIndex];
              paramData['speed'] = parseInt(selectedOptionSpeed.value);

              selectElementPause = cell.querySelector('#pause-' + id);
              selectedOptionPause = selectElementPause.options[selectElementPause.selectedIndex];
              paramData['pause'] = parseInt(selectedOptionPause.value);

              checkboxOrla = cell.querySelector('#orla-' + id);
              paramData['orla'] = checkboxOrla.checked;

              selectElementColor = cell.querySelector('#color-' + id);
              selectedOptionColor = selectElementColor.options[selectElementColor.selectedIndex];
              paramData['color'] = parseInt(selectedOptionColor.value);

              selectElementLed = cell.querySelector('#led-' + id);
              selectedOptionLed = selectElementLed.options[selectElementLed.selectedIndex];
              paramData['led'] = parseInt(selectedOptionLed.value);

              rowData['parameters'] = paramData;//parameters;

            }

            // Columna de la subida del fichero animacion led
            if (index === 3) {
              const inputElement = cell.querySelector('input[type="file"]');
                if (inputElement.files.length > 0) {
                  const selectedFile = inputElement.files[0];
                  const reader = new FileReader();
                  reader.readAsDataURL(selectedFile);

                  reader.onload = function(e) {
                    const fileData = e.target.result.split(',')[1]; // Obtener los datos en base64
                    rowData['animation'] = {
                      fileName: selectedFile.name,
                      fileData: fileData // Almacenar los datos del archivo en base64
                    };
                  };
                } else {
                  rowData['animation'] = null;
                 // actions.push(rowData); // Agregar rowData al arreglo actions
                }
            }
          });
        
          actions.push(rowData);
          console.log("handleFormSubmit() actions[]  ----->",actions );
    });
    
    formJSON.actions = actions;
  
    from_time = formJSON["from-time"];
    to_time = formJSON["to-time"];

    delete formJSON["from-time"];
    delete formJSON["to-time"];

    formJSON.__v = 0;
    formJSON.from_time = from_time;
    formJSON.to_time = to_time;

    // Creamos objeto formJSON con la propiedad sequences
    formJSON = { "sequences": formJSON };
    
    seccion1.style.display = "block";
    seccion2.style.display = "none";
  
    console.log("handleFormSubmit() llamada a playSequence");
    playSequence();
  }
  