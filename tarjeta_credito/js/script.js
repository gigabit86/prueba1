
//Autor: Samuel León Valencia

// Función para validar el número de tarjeta de crédito
$(document).ready(function() {

    // Deshabilitar el botón de pago
    $('#bt-pay').attr('disabled','disabled');
    // Aplicar máscara al número de tarjeta
    $('#cno').mask('0000 0000 0000 0000');
    // Aplicar máscara al código de seguridad
    $('#cvv').mask('000');
    // Aplicar máscara a la fecha de expiración
    $('#exp').mask('00/00');


    $('#nombre').on('keypress', function(event) {
      var inputValue = event.which;
      // Permitir solo letras
      if(!(inputValue >= 65 && inputValue <= 122) && (inputValue != 32 && inputValue != 0)) {
          event.preventDefault();
      }
    });
  
    
  
    // Evento de escucha para el número de tarjeta
    $('#cno').on('change keyup', function() {
      validarTarjeta();
    });

    $('#nombre').on('change keyup', function() {
      validarTarjeta();
    });

    $('#cvv').on('change keyup', function() {
      validarTarjeta();
    });

    $('#exp').on('change keyup', function() {
      validarTarjeta();
    }
    );



    //Boton de pago 
    $('#bt-pay').on('click', function(event) {
      //Cancelo  el Submit del formulario
      event.preventDefault();


       mensajes = ['Pago realizado con éxito'];
        mostrarToast(mensajes, 'success');
    });
});

  
  function validarTarjeta(numeroTarjeta) {
    
    var numeroTarjeta = $("#cno").val();

    let Tarjetavalida=false;
    // Eliminar espacios en blanco
    numeroTarjeta = numeroTarjeta.replace(/\s/g, '');
    // Expresiones regulares para identificar el tipo de tarjeta
    var visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    // Expresiones regulares para identificar el tipo de tarjeta
    var mastercardRegex = /^5[1-5][0-9]{14}$/;
    // Expresiones regulares para identificar el tipo de tarjeta
    var amexRegex = /^3[47][0-9]{13}$/;
  

    $('#labelcno').html('Número de Tarjeta');
    $('#labelname').html('Nombre del titular');

    // Validar el número de tarjeta y determinar el tipo
    if (visaRegex.test(numeroTarjeta)) {
      Tarjetavalida=true;
      mostrarImagenTarjeta("img/visa.png");
    } else if (mastercardRegex.test(numeroTarjeta)) {
      Tarjetavalida=true;
      mostrarImagenTarjeta("img/mastercard-logo.png");
    } else if (amexRegex.test(numeroTarjeta)) {
      Tarjetavalida=true;
      mostrarImagenTarjeta("img/amex.png");
    } else {
      Tarjetavalida=false;
      $('#labelcno').html('Número de Tarjeta <span class="invalido">(Número de tarjeta inválido)</span>');
      mostrarImagenTarjeta("img/na.png");
    }

    // Validamos nombre del titular
    if($('#nombre').val().length < 5){
      Tarjetavalida=false;
      $('#labelname').html('Nombre del titular <span class="invalido">(Nombre inválido)</span>');
    }

    //&& validarEXP() && validarCVV() && $('#nombre').val().length >= 5

    if(Tarjetavalida && validarEXP() && $('#nombre').val().length >= 5 && validarCVV()){
      habilitarBoton()
    }
    else{
      deshabilitarBoton()
    }

  }

  // Función para deshabilitar el botón de pago
  function deshabilitarBoton(){
    $('#bt-pay').attr('disabled','disabled');
    //Agregamos la clase BtnDisabled
    $('#bt-pay').addClass('BtnDisabled');
    $('#bt-pay').removeClass('Btn');
  }

  // Funcion para habilitar el boton de pago
  function habilitarBoton(){
    $('#bt-pay').removeAttr('disabled');
    //Eliminamos la clase BtnDisabled
    $('#bt-pay').removeClass('BtnDisabled');
    $('#bt-pay').addClass('Btn');
  }

  


  function mostrarImagenTarjeta(src) {
    // Actualizar la imagen de la tarjeta
    $('#card-image').attr('src', src);
  }


  // Función para validar el código de seguridad
function validarCVV() {
  // Obtener el código de seguridad ingresado por el usuario

  console.log('CVV' + $('#cvv').val());
  var cvv = $('#cvv').val();
  $('#labelcvv').html('Código de Seguridad');
  if (cvv.length < 3) {
      $('#labelcvv').html('Código de Seguridad <span class="invalido">(Código inválido)</span>');
      return false;
  }
  return true;
}


// Function para validar la fecha de expiración
function validarEXP() {
  // Obtener la fecha actual
  var fechaActual = new Date();
  var mesActual = fechaActual.getMonth() + 1;
  var anioActual = fechaActual.getFullYear();

  anioActual = anioActual.toString().substring(2); // Obtener los últimos dos dígitos del año

  // Obtener la fecha de expiración ingresada por el usuario
  var fecha = $('#exp').val();
  var partesFecha = fecha.split('/'); // Dividir la fecha en partes separadas por '/'
  var mes = parseInt(partesFecha[0], 10); // Obtener el mes como un número entero
  var anio = parseInt(partesFecha[1], 10); // Obtener el año como un número entero

  // Mostrar el mensaje de validación
  $('#labelexp').html('Fecha de Expiración');
  
  // Comparar la fecha de expiración con la fecha actual
  if (anio < anioActual || (anio === anioActual && mes < mesActual)) {
      $('#labelexp').html('Fecha de Expiración <span class="invalido">(Fecha expirada)</span>');
      return false;
  }

  if(fecha === '' || fecha.length < 5){
    $('#labelexp').html('Fecha de Expiración <span class="invalido">(Fecha inválida)</span>');
    return false;
  }
  
  return true;
}


  // Función para mostrar un Toast de Bootstrap con un mensaje
function mostrarToast(mensajes, tipo) {
  var toastClass = tipo === 'success' ? 'bg-success' : 'bg-danger';
  var toastIcon = tipo === 'success' ? '<i class="fas fa-check-circle me-2"></i>' : '<i class="fas fa-exclamation-circle me-2"></i>';
  var mensajeHTML = mensajes.join('<br>'); // Unir mensajes con un salto de línea

  var toast = `
      <div class="toast text-white ${toastClass} toastMensaje" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
              <div class="toast-body left"> ${toastIcon} <br>${mensajeHTML} </div>
              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
      </div>
  `;

  $('#toastMensaje').html(toast); // Reemplazar el contenido del contenedor con el Toast

  $('.toast').toast('show'); // Mostrar el Toast

  // Eliminar el Toast del DOM después de ocultarse
  $('.toast').on('hidden.bs.toast', function () {
      $(this).remove();
  });
}

