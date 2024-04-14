//Crud en Local Storage
//Samuel Andres Leon Valencia


// Seleccionamos el contenedor de las gotas de lluvia para agregar las gotas en el
const container = document.querySelector('.container')


//funcion que crea gotas de lluvia
const lluvia = () => {

    // usamos let para asignar un valor a la variable "Let se usa para definir variables limitadas al alcance del bloque, instrucción, o expresión en la que se usan."
    let j = 0

    // Mientras j sea menor o igual a 80 se ejecutara el ciclo
    while (j <= 80){
        // Crear gota de lluvia en el documento HTML asignando a la variable gota un elemento i
        let gota = document.createElement('i')

        // asignamos a x un valor aleatorio entre 0 y el ancho de la pantalla para la posición de la gota
        let x = innerWidth * Math.random()
        // asignamos a time un valor aleatorio entre 0 y 1 para la duración de la animación
        let time = 1 * Math.random()
        // asignamos a gota.style.animationDuration el valor de time en segundos y le sumamos 0.4 si es menor a 0.4 para que no se vean gotas muy rápidas
        gota.style.animationDuration = time <= 0.4 ? (time + 0.4) + 's'  : time + 's'
        // asignamos a gota.style.animationDelay el valor de time en segundos para el retraso de la animación
        gota.style.animationDelay = time + 's'
        // asignamos a gota.style.left el valor de x en pixeles para la posición de la gota
        gota.style.left = x + 'px'

        // Agregamos gota que es un elemento i al contenedor que es un elemento div con la clase container
        container.appendChild(gota)

        // Incrementamos j en 1
        j++
    }
}

// Llamamos a la función lluvia para que se ejecuten las gotas de lluvia
lluvia()