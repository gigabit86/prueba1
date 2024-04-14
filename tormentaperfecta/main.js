//Crud en Local Storage
//Samuel Andres Leon Valencia



let form = document.getElementById("form");                  // definicion de variable form y se carga el objeto del DOM
let textInput = document.getElementById("textInput");    // definicion de variable textInput y se carga el objeto del DOM
let dateInput = document.getElementById("dateInput"); // definicion de variable dateInput y se carga el objeto del DOM
let textarea = document.getElementById("textarea"); // definicion de variable textarea y se carga el objeto del DOM
let tasks = document.getElementById("tasks"); // definicion de variable tasks y se carga el objeto del DOM
let add = document.getElementById("add"); // definicion de variable add y se carga el objeto del DOM
let data = []; // Arreglo para almacenar las tareas en el almacenamiento local del navegador y lo dejamos vacío para que no haya tareas al inicio


// Agregar evento de envío al formulario de agregar tarea
form.addEventListener("submit", (e) => {
  // Evitar que el formulario se envíe de forma predeterminada
  e.preventDefault();

  // Validar los campos del formulario llamando a la función formValidation
  formValidation();
});

// Definimos formValidation como una función de flecha para validar los campos del formulario al momento de agregar una tarea
let formValidation = () => {

  let alerta = [] // Vector para almacenar el mensaje de alerta
  let error = false; // Variable para controlar si hay errores

  // Validamos si el elemento textInput está vacío o no tiene contenido con la propiedad trim que elimina los espacios en blanco al principio 
  //y al final de una cadena de texto, si está vacío asignamos un mensaje de alerta y cambiamos el valor de la variable error a true para indicar que hay un error
  if (textInput.value.trim() === "") {
    //agregamos al vector alerta el mensaje de alerta
    alerta.push("- Por favor, ingresa un título para la tarea");
    //cambiamos el valor de la variable error a true
    error = true;
  }

  // Validamos si el elemento dateInput está vacío o no tiene contenido, si está vacío asignamos un mensaje de alerta y cambiamos el valor de la variable error a true para indicar que hay un error
  if (dateInput.value === "") {
    //agregamos al vector alerta el mensaje de alerta
    alerta.push("- Por favor, selecciona una fecha de ejecución");
    //cambiamos el valor de la variable error a true
    error = true;
  }

  // Validamos si el elemento textarea está vacío o no tiene contenido con la propiedad trim que elimina los espacios en blanco al principio 
  //y al final de una cadena de texto, si está vacío asignamos un mensaje de alerta y cambiamos el valor de la variable error a true para indicar que hay un error
  if (textarea.value.trim() === "") {
    //agregamos al vector alerta el mensaje de alerta
    alerta.push("- Por favor, ingresa una descripción para la tarea");
    //cambiamos el valor de la variable error a true
    error = true;
  }

  // Si hay errores detenemos el proceso de aceptar los datos que guardan las tareas, mostramos un mensaje de alerta
  if (error) {
    //llamamos a la función mensajeflotante con los parametros alerta y danger
    mensajeflotante(alerta, "danger");
    //retornamos para detener el proceso
    return;
  }

  // Si no hay errores, continuar con el proceso de aceptar los datos
  acceptData();

};


// Definimos formEditValidation como una función de flecha para validar los campos del formulario al momento de editar una tarea
let formEditValidation = () => {

  let alerta = ""; // Variable para almacenar el mensaje de alerta

  let error = false; // Variable para controlar si hay errores

  // Validamos si el elemento editTextInput está vacío o no tiene contenido con la propiedad trim que elimina los espacios en blanco al principio
  // y al final de una cadena de texto, si está vacío asignamos un mensaje de alerta y cambiamos el valor de la variable error a true para indicar que hay un error
  if (editTextInput.value.trim() === "") {
    // Asignamos a la variable alerta el mensaje de alerta
    alerta.push("- Por favor, ingresa un título para la tarea");
    // Cambiamos el valor de la variable error a true
    error = true;
  }

  // Validamos si el elemento editDateInput está vacío o no tiene contenido, si está vacío asignamos un mensaje de alerta y cambiamos el valor de la variable error a true para indicar que hay un error
  if (editDateInput.value === "") {
    // Asignamos a la variable alerta el mensaje de alerta
    alerta.push("- Por favor, selecciona una fecha de ejecución");
    // Cambiamos el valor de la variable error a true
    error = true;
  }

  // Validar campo de descripción
  if (editTextarea.value.trim() === "") {
    alerta.push("- Por favor, ingresa una descripción para la tarea");
    error = true;
  }

  // Si hay errores, detener el proceso
  if (error) {
    mensajeflotante(alerta, "danger");
    return false;
  }

  // Mostrar mensaje de éxito si no hay errores
  alerta.push("Tarea editada correctamente");
  mensajeflotante(alerta);

  // Si no hay errores, continuar con el proceso de aceptar los datos
  return true;

};


// Definimos acceptData como una función de flecha para aceptar los datos que guardan las tareas
let acceptData = () => {
  // Agregar los datos de la tarea al arreglo de tareas data con el método push() que agrega uno o más elementos al final de un array y devuelve la nueva longitud del array
  // y se le asigna un objeto con los valores de los campos del formulario textInput, dateInput y textarea
  data.push({ 
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  // Guardar los datos en el almacenamiento local del navegador con el método setItem() que permite almacenar un valor en el almacenamiento local del navegador
  localStorage.setItem("data", JSON.stringify(data));

  // Mostrar mensaje de éxito
  let alerta = ["Tarea agregada correctamente"];
  mensajeflotante(alerta);
  // Usamos Console.log para mostrar los datos en la consola del navegador a modo de depuración cuando estemo desarrollando
  console.log(data);
  // Crear las tareas en el html con los datos de la tarea
  createTasks();
  // Cerrar el modal de agregar tarea
  $("#form").modal("hide");

  // Si no hay tareas, mostrar un mensaje en la pantalla de que no hay tareas
  nohaytareas();
};


//funcion flecha para crear tareas en el html y se le asigna el valor de data
let createTasks = () => {
  //Limpiamos el contenido html del elemento document.getElementById("tasks") que es el contenedor de las tareas
  tasks.innerHTML = "";

  //Recorremos el arreglo de tareas y creamos las tareas en el html
  data.map((x, y) => { //map() método crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos.
    // return para que se ejecute la funcion y se le asigna el valor de x.text, x.date, x.description, generamos un html con los datos de la tarea y se le asigna el valor a tasks.innerHTML
    //estos se asignan ya que se recorre el arreglo de tareas y se crea el html con los datos de la tarea
    return (tasks.innerHTML += `
      <!-- div que contiene la tarea con un id que es el valor de y -->
      <div id=${y}>
            <!-- span que contiene el títuloobtenido de x.text con la clase fw-bold de bootstrap que hace que el texto sea negrita -->
            <span class="fw-bold">${x.text}</span>
            <!-- span que contiene la fecha de la tarea con la clase small de bootstrap que hace que el texto sea más pequeño y clase text-secondary que hace que el texto sea de color gris -->
            <span class="small text-secondary">${x.date}</span>
            <!-- p que contiene la descripción de la tarea obtenido de x.description -->
            <p>${x.description}</p>
            <!-- span que es un contenedor de los botones con una clase options personalizada que esta en el css estilo.css -->
            <span class="options">
            <!-- Botón para editar la tarea usamos la función editTask y le pasamos el id de la tarea, le asignamos un icono svg y usamos las clases de 
            bootstrap btn y btn-primary las cuales personalizamos en el archivo estilo.css -->
            <button onclick="editTask(${y})" class="btn btn-primary">
                <!-- p que contiene el texto Editar del botón y usamos la clase paragraph personalizada que esta en el css estilo.css -->
                <p class="paragraph"> Editar </p>
                <!-- span que es un contenedor del icono svg con la clase icon-wrapper personalizada que esta en el css estilo.css -->
                <span class="icon-wrapper">
                  <!-- icono svg que se muestra en el botón de editar tarea -->
                <svg fill="#fff" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21,12a1,1,0,0,0-1,1v6a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4h6a1,1,0,0,0,0-2H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM6,12.76V17a1,1,0,0,0,1,1h4.24a1,1,0,0,0,.71-.29l6.92-6.93h0L21.71,8a1,1,0,0,0,0-1.42L17.47,2.29a1,1,0,0,0-1.42,0L13.23,5.12h0L6.29,12.05A1,1,0,0,0,6,12.76ZM16.76,4.41l2.83,2.83L18.17,8.66,15.34,5.83ZM8,13.17l5.93-5.93,2.83,2.83L10.83,16H8Z"/></svg>
                </span><!-- fin span icon-wrapper -->
              </button> <!-- fin button -->

              <!-- span que es un contenedor de los botones con una clase options personalizada que esta en el css estilo.css -->
              <span class="options">
              <!-- Botón para eliminar la tarea usamos la función deleteTask y le pasamos el id de la tarea, le asignamos un icono svg y usamos las clases btn y btn-danger de bootstrap las cuales personalizamos en el archivo estilo.css -->
              <button onclick="deleteTask(${y})" class="btn btn-danger">
                <!-- p que contiene el texto Eliminar del botón y usamos la clase paragraph personalizada que esta en el css estilo.css -->
                <p class="paragraph"> Eliminar </p>
                <!-- span que es un contenedor del icono svg con la clase icon-wrapper personalizada que esta en el css estilo.css -->
                <span class="icon-wrapper">
                  <!-- icono svg que se muestra en el botón de eliminar tarea -->
                  <svg class="icon" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg> <!-- fin svg -->
                </span> <!-- fin span icon-wrapper -->
              </button> <!-- fin button -->
            </span> <!-- fin span options -->
          </div> <!-- fin div -->
      `);
  });

  // Resetear el formulario de agregar tarea
  resetForm();
};


//funcion flecha para resetear el formulario de agregar tarea al momento de agregar una tarea
let resetForm = () => {
  // Resetear los valores de los campos del formulario
  textInput.value = "";
  // Resetear los valores de los campos del formulario
  dateInput.value = "";
  // Resetear los valores de los campos del formulario|
  textarea.value = "";
};


let deleteTask = (id) => {
  let taskName = data[id].text; // Obtener el nombre de la tarea
  $('#confirmDeleteModal').modal('show'); // Mostrar modal de confirmación
  $('#confirmDeleteModal .modal-body').text(`¿Estás seguro de que deseas eliminar la tarea "${taskName}"?`); // Mostrar el nombre de la tarea en el modal
  $('#confirmDeleteButton').off('click').on('click', function () { // Manejar clic en el botón de confirmación
    // Eliminar elemento según el ID HTML
    document.getElementById(id).remove(); // Elimina el elemento especificado del documento y lo devuelve.
    data.splice(id, 1); // Permite cambiar el contenido del arreglo eliminando o sustituyendo los elementos existentes por otros nuevos
    localStorage.setItem("data", JSON.stringify(data));
    let alerta = ["Tarea eliminada correctamente"]; // Mensaje de éxito
    mensajeflotante(alerta); // Mostrar mensaje de éxito
    // Usamos Console.log para mostrar los datos en la consola del navegador a modo de depuración cuando estemo desarrollando
    console.log(data);
    // Si no hay tareas, mostrar un mensaje en la pantalla de que no hay tareas
    
    // Ocultar modal de confirmación
    $('#confirmDeleteModal').modal('hide'); // Ocultar modal de confirmación
    //Cargo las tareas en el html nuevamente
    createTasks();
    nohaytareas();
  });
};



// Función para guardar los cambios de la tarea editada la cual recibe como parámetro el ID de la tarea a editar
let editTaskSave = (id) => {
  // Obtener los nuevos valores del formulario
  let taskName = data[id].text; // Obtener el nombre de la tarea

  // Eliminamos la tarea según el ID HTML
  document.getElementById(id).remove(); // Elimina el elemento especificado del documento y lo devuelve.

  // Eliminar la tarea según el ID del arreglo
  data.splice(id, 1);

  // Guardar los cambios en el almacenamiento local
  localStorage.setItem("data", JSON.stringify(data));

  // Si no hay tareas, mostrara un mensaje en la pantalla de que no hay tareas
  nohaytareas();
};



// Función para mostrar un mensaje si no hay tareas en la lista
function nohaytareas() {

  // contamos la cantidad de tareas en el arreglo data
  titulo_tareas = data.length;
  $('#titulo_tareas').text(`Tareas (${titulo_tareas})`); // Mostrar la cantidad de tareas en el título
  //en el titulo de la pagina se muestra la cantidad de tareas que hay en la lista de tareas
  document.title = `Tormenta Perfecta (${titulo_tareas})`;
  // Verificar si hay tareas en la lista de tareas que está almacenada en el almacenamiento local
  if (titulo_tareas === 0) {
    // Mostrar un mensaje si no hay tareas
    tasks.innerHTML = "<p class='text-center'>No hay tareas</p>";
    //retornamos para detener el proceso
    return;
  }
  // Crear las tareas actualizadas si hay tareas
  createTasks();
}

// Función para mostrar un mensaje flotante en la pantalla con un mensaje y un tipo de mensaje que es la clase de bootstrap
function mensajeflotante(mensaje, tipo = "success") {
  //Si el tipo es success se le asigna la clase bg-success y se le quita la clase bg-danger
  if (tipo == "success") {
    //quitamos la clase bg-danger
    $('#liveToast').removeClass('bg-danger');
    //asignamos la clase bg-success
    $('#liveToast').addClass('bg-success');
  }
  else {
    //Si el tipo es diferente de success se le asigna la clase bg-danger y se le quita la clase bg-success

    //quitamos la clase bg-success
    $('#liveToast').removeClass('bg-success');
    //asignamos la clase bg-danger
    $('#liveToast').addClass('bg-danger');
  }

  //Asignamos el mensaje del sistema al toast haciendo referencia a la clase toast-header y asignamos el mensaje
  $('#liveToast .toast-header').text("Mensaje del sistema");

  //generamos el mensaje segun el parametro que es un vector usamos la funcion join para separar los elementos del vector con un salto de linea <br> y lo asignamos a mensaje
  mensaje = mensaje.join("<br>");
  //cuerpo-toast asignamos el mensaje
  $('#liveToast .toast-body').html(mensaje);
  //mostramos el toast con el mensaje
  $('#liveToast').toast('show');
}

// Función para editar una tarea la cual recibe como parámetro el ID de la tarea a editar
let editTask = (id) => {
  // Obtener la tarea seleccionada
  let selectedTask = data[id];

  // Llenar el formulario del modal con los datos de la tarea seleccionada
  //Asignamos selectedTask.text al campo editTextInput del formulario de edición
  document.getElementById("editTextInput").value = selectedTask.text;
  //Asignamos selectedTask.date al campo editDateInput del formulario de edición
  document.getElementById("editDateInput").value = selectedTask.date;
  //Asignamos selectedTask.description al campo editTextarea del formulario de edición
  document.getElementById("editTextarea").value = selectedTask.description;

  // Mostrar el modal de edición
  $('#editModal').modal('show');
  // Manejar el envío del formulario de edición
  $('#editForm').off('submit').on('submit', function (e) {
    // Evitar que el formulario se envíe
    e.preventDefault();
    // Validar los campos del formulario de edición llamando a la función formEditValidation
    if (!formEditValidation()) // Si hay errores, detener el proceso
    {
      //retornamos para detener el proceso
      return;
    }

    // Obtener los nuevos valores del formulario
    //Asignamos al campo editTextInput del formulario de edición a la variable newText
    let newText = document.getElementById("editTextInput").value;
    //Asignamos al campo editDateInput del formulario de edición a la variable newDate
    let newDate = document.getElementById("editDateInput").value;
    //Asignamos al campo editTextarea del formulario de edición a la variable newDescription
    let newDescription = document.getElementById("editTextarea").value;

    // Actualizar los datos de la tarea seleccionada

    //Asignamos a data[id].text el valor de newText
    data[id].text = newText;
    //Asignamos a data[id].date el valor de newDate
    data[id].date = newDate;
    //Asignamos a data[id].description el valor de newDescription
    data[id].description = newDescription;

    // Guardar los cambios en el almacenamiento local
    localStorage.setItem("data", JSON.stringify(data));

    // Crear las tareas actualizadas
    createTasks();

    // Ocultar el modal de edición
    $('#editModal').modal('hide');
  });
};


// Función para reproducir el audio de fondo y mostrar el modal de audio al cargar la página 
$(document).ready(function () {

  //Asignamos al audio_background el audio con el id audio_background
  $("#bt-info").addClass("animate__animated animate__swing animate__infinite");

  //asignamos al modalAudio el modal con el id modalAudio y le asignamos las propiedades backdrop y keyboard para que no se pueda cerrar con el fondo y con el teclado
  $('#modalAudio').modal({
    backdrop: 'static', // No se puede cerrar con el fondo
    keyboard: false // No se puede cerrar con el teclado
  });

  //Mostar el modal de audio al cargar la página   
  $("#modalAudio").modal("show");

  //Usando la libreria animate.css para agregar animación al botón de play y se le asigna la clase animate__animated animate__pulse animate__infinite
  $("#play").addClass("animate__animated animate__pulse animate__infinite");

  //Al botón play le asignamos un evento click y al hacer click se ejecuta la función
  $("#play").click(function () {
    //Reproducir el audio de fondo al hacer click en el botón play 
    audio_background.play();
    // Ocultar el modal de audio al hacer click en el botón play
    $("#modalAudio").modal("hide");
  }
  );
});


// Función para validar que el campo de fecha no sea menor a la fecha actual y asi evitar que se pueda seleccionar una fecha anterior a la actual
// Esta función se ejecuta al cargar la página
$(document).ready(function () {

  //Asignamos a la variable today la fecha actual en formato ISO y se le asigna el valor de la fecha actual en formato ISO y se le asigna el valor de la fecha actual en formato ISO
  // T es el separador de fecha y hora y se usa split para separar la fecha de la hora y se obtiene la fecha actual
  var today = new Date().toISOString().split('T')[0];
  //dateInput asignamos el valor de today al campo dateInput
  $("#dateInput").attr('min', today);
  //editDateInput asignamos el valor de today al campo editDateInput
  $("#editDateInput").attr('min', today);
});



// Función para validar que el campo textInput debe ser solo letras y espacios
// Esta función se ejecuta al cargar la página
$(document).ready(function () {
  //textInput asignamos la función keypress al campo textInput y se ejecuta la función al presionar una tecla 
  //charCode es el código de la tecla que se presiona y si es menor a 97 o mayor a 122 no se ejecuta la función y no se permite escribir en el campo
  $('#textInput').keypress(function (tecla) {
    // Solo letras minúsculas de la a a la z
    if (tecla.charCode < 97 || tecla.charCode > 122) return false;
  });

  //editTextInput asignamos la función keypress al campo editTextInput y se ejecuta la función al presionar una tecla
  //charCode es el código de la tecla que se presiona y si es menor a 97 o mayor a 122 no se ejecuta la función y no se permite escribir en el campo
  $('#editTextInput').keypress(function (tecla) {
    // Solo letras minúsculas de la a a la z
    if (tecla.charCode < 97 || tecla.charCode > 122) return false;
  });

  //dateInput asignamos la función keypress al campo dateInput y se ejecuta la función al presionar una tecla
  //charCode es el código de la tecla que se presiona y si es menor a 48 o mayor a 57 no se ejecuta la función y no se permite escribir en el campo
  $('#dateInput').keypress(function (tecla) {
    //if (tecla.charCode < 48 || tecla.charCode > 57) return false; // Solo números
    if (tecla.charCode < 48 || tecla.charCode > 57) return false;
  });

  //editDateInput asignamos la función keypress al campo editDateInput y se ejecuta la función al presionar una tecla
  //charCode es el código de la tecla que se presiona y si es menor a 48 o mayor a 57 no se ejecuta la función y no se permite escribir en el campo
  $('#editDateInput').keypress(function (tecla) {
    //if (tecla.charCode < 48 || tecla.charCode > 57) return false; // Solo números
    if (tecla.charCode < 48 || tecla.charCode > 57) return false;
  });

});



// Función para agregar animación al botón de agregar nueva tarea al pasar el mouse sobre el botón
// Esta función se asigna al cargar la página
$(document).ready(function () {

  // Agregar la clase animate__animated animate__tada al botón al pasar el mouse sobre el botón de agregar nueva tarea
  // Usamos hover() para agregar la clase animate__animated animate__tada al botón al pasar el mouse sobre el botón de agregar nueva tarea
  $("#addNew").hover(
    function () {
      // Agregar la clase animate__animated animate__tada al botón
      $(this).addClass("animate__animated animate__tada");
    },
    // Eliminar la clase animate__animated animate__tada al botón al quitar el mouse del botón de agregar nueva tarea
    function () {
      // Eliminar la clase animate__animated animate__tada al botón
      $(this).removeClass("animate__animated animate__tada");
    }
  );

  // cada 5 segundos se ejecuta la función que agrega la clase animate__animated animate__tada al botón de agregar nueva tarea
  setInterval(function () {
    // Agregar la clase animate__animated animate__tada al botón
    $("#addNew").addClass("animate__animated animate__tada");
  }, 5000);
});


// Definimos la función para cargar las tareas al cargar la página el que se ejecuta al cargar la página
(() => {
  // Cargar los datos del almacenamiento local
  data = JSON.parse(localStorage.getItem("data")) || [];
  // Creamos las tareas al cargar la página
  createTasks();
  // Si no hay tareas, mostrar un mensaje en la pantalla de que no hay tareas
  nohaytareas();
})();

