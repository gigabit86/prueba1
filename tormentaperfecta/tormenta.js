//Crud en Local Storage
//Samuel Andres Leon Valencia

const container = document.querySelector('.container')


//funcion que crea gotas de lluvia
const lluvia = () => {
    let j = 0

    while (j <= 80){
        // Crear gota de lluvia
        let gota = document.createElement('i')

        // asignamos a x un valor aleatorio entre 0 y el ancho de la pantalla
        let x = innerWidth * Math.random()
        // asignamos a time un valor aleatorio entre 0 y 1
        let time = 1 * Math.random()
        // asignamos a gota.style.animationDuration el valor de time en segundos y le sumamos 0.4 si es menor a 0.4 para que no se vean gotas muy rápidas
        gota.style.animationDuration = time <= 0.4 ? (time + 0.4) + 's'  : time + 's'
        // asignamos a gota.style.animationDelay el valor de time en segundos
        gota.style.animationDelay = time + 's'
        // asignamos a gota.style.left el valor de x en pixeles
        gota.style.left = x + 'px'

        // Agregamos la clase gota al elemento gota
        container.appendChild(gota)

        j++
    }
}

lluvia()