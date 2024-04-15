
//Autor: Samuel León Valencia

$(document).ready(function() {
  let intervalID; // Variable para almacenar el ID del intervalo

  // Cada 10 segundos se ejecuta la función efectoAccordeon
  intervalID = setInterval(efectoAccordeon, 8000);

  // Cuando se haga clic en un botón del acordeón, elimina la clase de animación de todos los elementos
  $(".accordion-item").click(function() {
    clearInterval(intervalID); // Detiene el intervalo al hacer clic en un elemento del acordeón
    $(".accordion-item").removeClass("animate__animated animate__headShake animate__slower");
  });
});

function efectoAccordeon() {
  eliminarEfectoAccordeon();
  console.log("Ejecutando efecto acordeón");

  // Recorre cada elemento del acordeón con un intervalo de 1 segundo
  $(".accordion-item").each(function(index) {
    setTimeout(() => {
      // Agrega la clase de animación al elemento actual
      $(this).addClass("animate__animated animate__headShake animate__slower");
    }, index * 1000);
  });
}

function eliminarEfectoAccordeon() {
  console.log("Eliminando efecto acordeón");
  $(".accordion-item").removeClass("animate__animated animate__headShake animate__slower");
}