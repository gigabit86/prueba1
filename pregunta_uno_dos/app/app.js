//Autor: Samuel León Valencia


//Setear variable global ordenarTipo en true para ordenar ascendentemente y false para ordenar descendentemente
var ordenarTipo =true;
var indiceClienteAEliminar = 0;

// Función para validar un RUT chileno
function validarRut(rut) {
    // Eliminar puntos y guión
    rut = rut.replace(/\./g, '').replace(/\-/g, '');

    // Separar dígito verificador
    var rutSinDigitoVerificador = rut.slice(0, -1);
    var digitoVerificador = rut.slice(-1).toUpperCase();

    // Validar longitud del RUT
    if (rutSinDigitoVerificador.length < 7 || rutSinDigitoVerificador.length > 8) {
        return false;
    }

    // Validar que el RUT sin dígito verificador sea un número
    if (isNaN(rutSinDigitoVerificador)) {
        return false;
    }

    // Calcular dígito verificador esperado
    var suma = 0;
    var multiplo = 2;

    // Recorrer dígitos del RUT de derecha a izquierda y sumar productos de dígitos por múltiplos
    for (var i = rutSinDigitoVerificador.length - 1; i >= 0; i--) {
        suma += parseInt(rutSinDigitoVerificador.charAt(i)) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    var resto = suma % 11;
    var dvEsperado = 11 - resto;
    if (dvEsperado === 10) {
        dvEsperado = 'K';
    } else if (dvEsperado === 11) {
        dvEsperado = '0';
    }

    // Comparar dígito verificador ingresado con el esperado
    return digitoVerificador === dvEsperado.toString();
}

// Función para mostrar clientes registrados en la tabla
function mostrarClientesEnTabla() {
    var listaClientes = JSON.parse(localStorage.getItem('clientes')) || [];
    var bodyTablaClientes = $('#bodyTablaClientes');
    bodyTablaClientes.empty(); // Limpiar contenido previo de la tabla

    // Recorrer lista de clientes y agregar una fila por cada cliente
    listaClientes.forEach(function (cliente, index) {
        var fila = `
            <tr>
                <th scope="row">${index + 1}</th>
                <td id="ordenarNombre">${cliente.nombre}</td>
                <td id="ordenarRun">${cliente.run}</td>
                <td id="ordenarEdad">${cliente.edad}</td>
                <td>
                <button class="btn btn-danger btn-sm" onclick="eliminarCliente(${index})"><i class="fas fa-trash-alt"></i>
                Eliminar</button>
                <button class="btn btn-primary btn-sm" onclick="editarCliente(${index})"><i class="fas fa-edit"></i>
                Editar</button>
                </td>
            </tr>
        `;
        // Agregar fila a la tabla
        bodyTablaClientes.append(fila);
    });
}

// Función para mostrar un Toast de Bootstrap con un mensaje
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

// Función para registrar un cliente
function registrarCliente() {
    // Obtener valores del formulario
    let nombre = $('#nombre').val().trim();
    let run = $('#run').val().trim();
    let edad = $('#edad').val().trim();
    let alertmsg = [];
    let error = false;


    // Validar que el nombre no esté vacío
    if (nombre === '') {
        // Agregar mensaje de error al array de mensajes
        alertmsg.push('- Por favor ingrese un nombre.');
        // Marcar error como verdadero para mostrar mensajes de error
        error = true;
    }

    // Validar que el RUT esté en un formato válido
    if (!validarRut(run)) {
        // Agregar mensaje de error al array de mensajes
        alertmsg.push('- Por favor ingrese un RUT válido.');
        // Marcar error como verdadero para mostrar mensajes de error
        error = true;
    }

    // Validar que la edad sea un número
    if (isNaN(edad) || edad === '') {
        // Agregar mensaje de error al array de mensajes
        alertmsg.push('- Por favor ingrese una edad válida entre 0 y 120 años.');
        // Marcar error como verdadero para mostrar mensajes de error
        error = true;
    }
    else
    {
        // Validar que la edad sea un número entre 0 y 120
        if (edad > 120 || edad < 0) {
            // Agregar mensaje de error al array de mensajes
            alertmsg.push('- Por favor ingrese una edad válida entre 0 y 120 años.');
            // Marcar error como verdadero para mostrar mensajes de error
            error = true;
        }

    }


    // Verificar si el RUT ya existe en la lista de clientes
    var listaClientes = JSON.parse(localStorage.getItem('clientes')) || [];
    // Buscar cliente con el mismo RUT en la lista
    var rutExistente = listaClientes.find(function (cliente) {
        return cliente.run === run;
    });

    // Mostrar mensaje de error si el RUT ya está registrado
    if (rutExistente) {
        alertmsg.push('El RUT ingresado ya está registrado.');
        error = true;
    }

    // Mostrar mensajes de error si existen
    if (error) {
        console.log(alertmsg);
        // Mostrar mensajes de error en un Toast
        mostrarToast(alertmsg, 'danger');
        return;
    }



    // Nombre en mayusculas
    nombre = nombre.toUpperCase();
    //rut en mayusculas y sin puntos con guion
    run = run.toUpperCase();
    //expresion regular para eliminar puntos
    run = run.replace(/\./g, '');
    // Edad a número entero
    edad = parseInt(edad);

    // Objeto cliente
    var cliente = {
        nombre: nombre,
        run: run,
        edad: edad
    };

    // Obtener lista de clientes registrados del almacenamiento local
    listaClientes.push(cliente);

    // Guardar lista de clientes en el almacenamiento local
    localStorage.setItem('clientes', JSON.stringify(listaClientes));

    // Limpiar formulario
    $('#registroForm').trigger('reset');

    // Actualizar lista de clientes en la interfaz
    mostrarClientesEnTabla();

    // Mostrar mensaje de éxito
    mostrarToast(['Cliente registrado correctamente.'], 'success');

    // Ocultar el modal de registro
    $('#modalRegistroCliente').modal('hide');
}

// Función para eliminar un cliente
function eliminarCliente(index) {
    // Almacenar el índice del cliente a eliminar en una variable global
    indiceClienteAEliminar = index;

    // Mostrar el modal de confirmación
    $('#modalConfirmacion').modal('show');
}

// Evento click para el botón "Eliminar" en el modal de confirmación
$('#btnEliminarConfirmado').on('click', function () {
    // Obtener el índice del cliente a eliminar desde la variable global
    var index = indiceClienteAEliminar;

    var listaClientes = JSON.parse(localStorage.getItem('clientes')) || []; // Obtener lista de clientes del almacenamiento local los parsea a JSON o si no hay nada los deja vacios
    listaClientes.splice(index, 1); // Eliminar cliente de la lista
    localStorage.setItem('clientes', JSON.stringify(listaClientes)); // Actualizar lista en el almacenamiento local
    mostrarClientesEnTabla(); // Actualizar lista en la interfaz

    // Mostrar mensaje de éxito
    mostrarToast(['Cliente eliminado correctamente.'], 'success');

    // Ocultar el modal de confirmación
    $('#modalConfirmacion').modal('hide');
});


function busquedaCliente() {
    //filtrar por nombre o run la lista de clientes y mostrar en la tabla
    var busqueda = $('#busqueda').val().trim();
    var listaClientes = JSON.parse(localStorage.getItem('clientes')) || [];

    // Filtrar lista de clientes por nombre o RUT
    var listaFiltrada = listaClientes.filter(function (cliente) {
        // Buscar coincidencias en nombre y RUT
        return cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) || cliente.run.includes(busqueda);
    });

    // Mostrar lista filtrada en la tabla
    var bodyTablaClientes = $('#bodyTablaClientes');
    bodyTablaClientes.empty(); // Limpiar contenido previo de la tabla

    // Recorrer lista de clientes filtrada y agregar una fila por cada cliente
    listaFiltrada.forEach(function (cliente, index) {
        var fila = `
            <tr>
                <th scope="row">${index + 1}</th>
                <td id="ordenarNombre">${cliente.nombre}</td>
                <td id="ordenarRun">${cliente.run}</td>
                <td id="ordenarEdad">${cliente.edad}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="eliminarCliente(${index})"><i class="fas fa-trash-alt"></i>
                    Eliminar</button>
                    <button class="btn btn-primary btn-sm" onclick="editarCliente(${index})"><i class="fas fa-edit"></i>
                    Editar</button>
                </td>
            </tr>
        `;

        // Agregar fila a la tabla
        bodyTablaClientes.append(fila);

    });

}



function ordenarClientesPorCampo(campo) {
    // Obtener lista de clientes del almacenamiento local
    var listaClientes = JSON.parse(localStorage.getItem('clientes')) || [];

    //ordenar ascendentemente si ordenarTipo es true
    if (ordenarTipo) {
        // Ordenar lista de clientes por el campo especificado en orden ascendente
        listaClientes.sort(function (clienteA, clienteB) {
            if (clienteA[campo] > clienteB[campo]) {
                return 1;
            } else if (clienteA[campo] < clienteB[campo]) {
                return -1;
            } else {
                return 0;
            }
        });
        ordenarTipo = false;
    }
    else {
          //ordenar descendentemente si ordenarTipo es false
        listaClientes.sort(function (clienteA, clienteB) {
            // Ordenar lista de clientes por el campo especificado en orden descendente
            if (clienteA[campo] < clienteB[campo]) {
                return 1;
            } else if (clienteA[campo] > clienteB[campo]) {
                return -1;
            } else {
                return 0;
            }
        });
        ordenarTipo = true;
    }
    


    // Mostrar lista ordenada en la tabla
    var bodyTablaClientes = $('#bodyTablaClientes');
    bodyTablaClientes.empty(); // Limpiar contenido previo de la tabla

    // Recorrer lista de clientes y agregar una fila por cada cliente
    listaClientes.forEach(function (cliente, index) {
        var fila = `
            <tr>
                <th scope="row">${index + 1}</th>
                <td id="ordenarNombre">${cliente.nombre}</td>
                <td id="ordenarRun">${cliente.run}</td>
                <td id="ordenarEdad">${cliente.edad}</td>
                <td>
                <button class="btn btn-danger btn-sm" onclick="eliminarCliente(${index})"><i class="fas fa-trash-alt"></i>
                Eliminar</button>
                <button class="btn btn-primary btn-sm" onclick="editarCliente(${index})"><i class="fas fa-edit"></i>
                Editar</button>
                </td>
            </tr>
        `;
        bodyTablaClientes.append(fila);
    }
    );
}

//llamar a la funcion ordenarClientesPorCampo con el campo nombre ejemplo ordenarClientesPorCampo('nombre');

// Función para editar un cliente
function editarCliente(index) {
    // Obtener lista de clientes del almacenamiento local
    var listaClientes = JSON.parse(localStorage.getItem('clientes')) || [];
    var cliente = listaClientes[index];

    // Mostrar datos del cliente en el formulario de edición
    $('#nombreEditar').val(cliente.nombre);
    $('#runEditar').val(cliente.run);
    $('#edadEditar').val(cliente.edad);

    // Mostrar el modal de edición
    $('#modalEditarCliente').modal('show');
}

// Evento click para el botón "Guardar cambios" en el modal de edición
function guardarCambiosCliente() {
    // Obtener valores del formulario de edición
    var nombre = $('#nombreEditar').val().trim();
    var run = $('#runEditar').val().trim();
    var edad = $('#edadEditar').val().trim();
    var alertmsg = [];
    var error = false;

    // Validar que el nombre no esté vacío
    if (nombre === '') {
        // Agregar mensaje de error al array de mensajes
        alertmsg.push('- Por favor ingrese un nombre.');
        // Marcar error como verdadero para mostrar mensajes de error
        error = true;
    }

    // Validar que el RUT esté en un formato válido
    if (!validarRut(run)) {
        // Agregar mensaje de error al array de mensajes
        alertmsg.push('- Por favor ingrese un RUT válido.');
        // Marcar error como verdadero para mostrar mensajes de error
        error = true;
    }

    // Validar que la edad sea un número
    if (isNaN(edad) || edad === '') {
        // Agregar mensaje de error al array de mensajes
        alertmsg.push('- Por favor ingrese una edad válida entre 0 y 120 años.');
        // Marcar error como verdadero para mostrar mensajes de error
        error = true;
    }
    else
    {
        // Validar que la edad sea un número entre 0 y 120
        if (edad > 120 || edad < 0) {
            // Agregar mensaje de error al array de mensajes
            alertmsg.push('- Por favor ingrese una edad válida entre 0 y 120 años.');
            // Marcar error como verdadero para mostrar mensajes de error
            error = true;
        }

    }

    // Mostrar mensajes de error si existen
    if (error) {
        // Mostrar mensajes de error en un Toast
        mostrarToast(alertmsg, 'danger');
        return;
    }

    // Nombre en mayusculas
    nombre = nombre.toUpperCase();
    //rut en mayusculas y sin puntos con guion
    run = run.toUpperCase();
    run = run.replace(/\./g, '');
    // Edad a número entero
    edad = parseInt(edad);

    // Obtener lista de clientes del almacenamiento local
    var listaClientes = JSON.parse(localStorage.getItem('clientes')) || [];

    // Actualizar datos del cliente
    listaClientes[indiceClienteAEliminar].nombre = nombre;
    listaClientes[indiceClienteAEliminar].run = run;
    listaClientes[indiceClienteAEliminar].edad = edad;

    // Guardar lista de clientes actualizada en el almacenamiento local
    localStorage.setItem('clientes', JSON.stringify(listaClientes));

    // Actualizar lista de clientes en la interfaz
    mostrarClientesEnTabla();

    // Mostrar mensaje de éxito
    mostrarToast(['Cliente actualizado correctamente.'], 'success');

    // Ocultar el modal de edición
    $('#modalEditarCliente').modal('hide');
}



// Cargar lista de clientes al cargar la página
$(document).ready(function () {
    mostrarClientesEnTabla();



    // Asignar evento keypress al campo de RUN para permitir solo números, la letra K y el guion -
    $(document).ready(function(){
        $('#run').on('keypress', function(event) {
            var inputValue = event.key;
            // Permitir solo números, la letra K y el guion -
            if(!(inputValue >= '0' && inputValue <= '9' || inputValue.toLowerCase() === 'k' || inputValue === '-')) {
                event.preventDefault();
            }
        });
    });

// Asignar evento keypress al campo de edad para permitir solo números
    $('#edadEditar').on('keypress', function(event) {
        var inputValue = event.which;
        // Permitir solo números
        if(!(inputValue >= 48 && inputValue <= 57)) {
            event.preventDefault();
        }
    });

    // Asignar evento keypress al campo de edad para permitir solo números

    $('#edad').on('keypress', function(event) {
        var inputValue = event.which;
        // Permitir solo números
        if(!(inputValue >= 48 && inputValue <= 57)) {
            event.preventDefault();
        }
    });
    

    // Asignar evento keypress al campo de nombre para permitir solo letras
    $('#nombreEditar').on('keypress', function(event) {
        var inputValue = event.which;
        // Permitir solo letras
        if(!(inputValue >= 65 && inputValue <= 122) && (inputValue != 32 && inputValue != 0)) {
            event.preventDefault();
        }
      });

      // Asignar evento keypress al campo de nombre para permitir solo letras
      $('#nombre').on('keypress', function(event) {
        var inputValue = event.which;
        // Permitir solo letras
        if(!(inputValue >= 65 && inputValue <= 122) && (inputValue != 32 && inputValue != 0)) {
            event.preventDefault();
        }
      });


    // Boton Guardar Cambios
    $('#btnGuardarCambios').on('click', function () {
        guardarCambiosCliente();
    });
    
    // Boton Registrar Cliente
    $('#btnRegistrarCliente').on('click', function () {
        registrarCliente();
    });

    //busquedaCliente();
    $('#busqueda').on('keyup', function () {
        busquedaCliente();
    });

    // Ordenar lista de clientes por nombre al cargar la página
    $('#ordenarNombre').on('click', function () {
        ordenarClientesPorCampo('nombre');
    });

    // Ordenar lista de clientes por RUT al cargar la página
    $('#ordenarRun').on('click', function () {
        ordenarClientesPorCampo('run');
    });

    // Ordenar lista de clientes por edad al cargar la página
    $('#ordenarEdad').on('click', function () {
        ordenarClientesPorCampo('edad');
    });

    
});

// Manejar el envío del formulario
$('#registroForm').on('submit', function (event) {
    event.preventDefault(); // Evitar recargar la página al enviar el formulario
    // Llamar a la función para registrar un cliente
    registrarCliente();
});