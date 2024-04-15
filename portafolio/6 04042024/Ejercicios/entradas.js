function iniciar() 
{
    cajadatos = document.getElementById('cajadatos'); 
    var boton = document.getElementById('boton');
    boton.addEventListener('click', crear, false);
    window.webkitRequestFileSystem(window.PERSISTENT, 5 * 1024 * 1024, creardd, errores);
}


function creardd(sistema) 
{
    dd = sistema.root;
}
function crear()
{
        var nombre = document.getElementById('entrada').value; 
        if (nombre != '')
         {
                  dd.getFile(nombre, { create: true, exclusive: false }, mostrar, errores);
        }
}


function mostrar(entrada) 
{
    document.getElementById('entrada').value = '';
    cajadatos.innerHTML = 'Entrada Creada!<br>'; cajadatos.innerHTML += 'Nombre: ' + entrada.name + 
    '<br>'; cajadatos.innerHTML += 'Ruta: ' + entrada.fullPath + '<br>'; cajadatos.innerHTML += 'Sistema: '
     + entrada.filesystem.name;
}
function errores(e) {
    alert('Error: ' + e.code);
}
window.addEventListener('load', iniciar, false);


