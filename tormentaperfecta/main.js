//Crud en Local Storage
//Samuel Andres Leon Valencia



let form = document.getElementById("form");                  // definicion de variables ... var antigua  let  moderna
let textInput = document.getElementById("textInput");    // se carga/copia el contenido de objetos del DOM,,, del html
let dateInput = document.getElementById("dateInput");    //fijarse en el nombre entre ""
let textarea = document.getElementById("textarea");    //documnet es el html...tomar de ahi se usa getElementById
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {      //form es el formulario..se pregunta si se pulso el bottom submit
                                             //   <button type="submit" id="add" class="btn btn-primary">Add</button>
    e.preventDefault();                  // preventDefault() Cancela el evento si este es cancelable, 
                                           //sin detener el resto del funcionamiento del evento, 
                                             // es decir, puede ser llamado de nuevo
    formValidation();           //lamar a la funcion
  });
  
  let formValidation = () => {
    let error = false; // Variable para controlar si hay errores
    
    // Validar campo de texto
    if (textInput.value.trim() === "") {
        msg.innerHTML = "- Por favor, ingresa un título para la tarea";
        error = true;
    } else {
        msg.innerHTML = "";
    }

    // Validar campo de fecha
    if (dateInput.value === "") {
        msg.innerHTML += "<br>- Por favor, selecciona una fecha de ejecución";
        error = true;
    }

    // Validar campo de descripción
    if (textarea.value.trim() === "") {
        msg.innerHTML += "<br>- Por favor, ingresa una descripción para la tarea";
        error = true;
    }

    // Si hay errores, detener el proceso
    if (error) {
        return;
    }

    // Si no hay errores, continuar con el proceso de aceptar los datos
    acceptData();
    
};

  let data = [];             //definir variable data tipo objeto 

let acceptData = () => {        //funcion 
  data.push({        //en data colocar los datos siguientes
    text: textInput.value,     //las cajas textinput y dateinput estan en html
    date: dateInput.value,    // <input type="text" class="form-control" name="" id="textInput" />
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));  //almacena miento local se ve usando herramientas de desarrollo APLICACION

  console.log(data);
  createTasks();

  //cerrar modal
  $("#form").modal("hide");
};



                                                //ojo con  `    cremilla invertida
                                               // se asigna a innerhtml en post... <div id="posts">

let createTasks = () => {

  if (data.length === 0) {
    tasks.innerHTML = "<p class='text-center'>No hay tareas</p>";
    return;
}

    tasks.innerHTML = "";
    data.map((x, y) => {          //se crea un arreglo de nombre x para las variables cajas e Y para el id
      return (tasks.innerHTML += `
      <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>
    
            <span class="options">
              
            <button onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="btn btn-primary">
                <p class="paragraph"> Editar </p>
                <span class="icon-wrapper">
                <svg fill="#fff" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21,12a1,1,0,0,0-1,1v6a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4h6a1,1,0,0,0,0-2H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM6,12.76V17a1,1,0,0,0,1,1h4.24a1,1,0,0,0,.71-.29l6.92-6.93h0L21.71,8a1,1,0,0,0,0-1.42L17.47,2.29a1,1,0,0,0-1.42,0L13.23,5.12h0L6.29,12.05A1,1,0,0,0,6,12.76ZM16.76,4.41l2.83,2.83L18.17,8.66,15.34,5.83ZM8,13.17l5.93-5.93,2.83,2.83L10.83,16H8Z"/></svg>
                </span>
              </button>


              <span class="options">
              <button onclick="deleteTask(this)" class="btn btn-danger">
                <p class="paragraph"> Eliminar </p>
                <span class="icon-wrapper">
                  <svg class="icon" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </span>
              </button>
            </span>
          </div>
      `);
    });
  
    resetForm();
  };


  let resetForm = () => {         //limpia las cajas variables
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
  };


  let deleteTask = (e) => {             //funcion parentElement devuelve el elemento padre del elemento especificado
    e.parentElement.parentElement.remove();
  
    data.splice(e.parentElement.parentElement.id, 1);  //permite cambiar el contenido del arreglo eliminando
                                                       // o sustituyendo los elementos existentes por otros nuevos
  
    localStorage.setItem("data", JSON.stringify(data));
  
    console.log(data);
  };


  let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
  
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
  
    deleteTask(e);
  };



  // ejecutamos una IIFE (expresión de función invocada inmediatamente) 
 //para recuperar los datos del almacenamiento local. 
  (() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
  })();
 


  $(document).ready(function() {
    $('#modalAudio').modal({
      backdrop: 'static',
      keyboard: false
    });
  });



    //modalAudio DOCUMENT READY
    $(document).ready(function() {
      //abrir modalAudio    
        $("#modalAudio").modal("show");

        //efecto animate.css a boton play
        $("#play").addClass("animate__animated animate__pulse animate__infinite");
  
        $("#play").click(function() {
          audio_background.play();
          //animate__hinge es una clase de animate.css para que al salir el modal se vea con un efecto
         // $("#modalAudio").addClass("animate__hinge");
          //sleep(1000) es una funcion que espera 1 segundo
          setTimeout(function() {
            $("#modalAudio").modal("hide");
          }, 1000);

          

        }
        );
  
  
        
    });


    //dateInput DOCUMENT READY debe ser mayor o igual a la fecha actual para que no se pueda seleccionar una fecha anterior para la tarea
    $(document).ready(function() {
      var today = new Date().toISOString().split('T')[0];
      $("#dateInput").attr('min', today);
    });


    $(document).ready(function() {

      //validar que el campo textInput debe ser solo letras y espacios
      $('#textInput').keypress(function(tecla) {
        if(tecla.charCode < 97 || tecla.charCode > 122) return false;
      });

      //validar que el campo dateInput debe ser solo numeros
      $('#dateInput').keypress(function(tecla) {
        if(tecla.charCode < 48 || tecla.charCode > 57) return false;
      });

    });


    

    $(document).ready(function() {
        $("#addNew").hover(
            function() {
                $(this).addClass("animate__animated animate__tada");
            },
            function() {
                $(this).removeClass("animate__animated animate__tada");
            }
        );
    });
