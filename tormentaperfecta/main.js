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
    if (textInput.value === "") {                          //verifica si los inputs estan vacios o no
      console.log("failure");
      msg.innerHTML = "Tarea requerida";
         //msg es un div en html <div id="msg"></div> antes del buttom
                           // innerHTML  nnerHTML  es una propiedad que nos permite leer un dato o asignarlo al contenido de un div o bien, 
                             // del mismo control. Nos facilita la asignación de valores a controles.

    } else {
      console.log("success");
      msg.innerHTML = "";
      acceptData();          //llama a la funcion

      add.setAttribute("data-bs-dismiss", "modal");    //se agrega opciones alternativas a la ventana modal
      add.click();  
  
      (() => {                    //   funcion anonima
        add.setAttribute("data-bs-dismiss", "");
      })();


    }
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
              <span onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></span>
              <span onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></span>
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
  
        $("#play").click(function() {
          audio_background.play();
          //animate__hinge es una clase de animate.css para que al salir el modal se vea con un efecto
          $("#modalAudio").addClass("animate__hinge");
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