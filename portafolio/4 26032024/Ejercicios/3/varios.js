if (1 + 1 === 2) 
{
    console.log("La suma es correcta") 
} 
else
   { console.log("La suma es incorrecta") };

console.log("finalizado el uno");

var nombreUsuario = prompt("hola usuario! ¿Cómo te llamas?")
switch(nombreUsuario) 
{ 
    case "Pepe":
            console.log("Hola Pepe! Yo te conozco"); 
            break;
    case "Lucia":
           console.log("Hola Lucia! Yo te conozco"); 
           break;
    default: console.log("Eres nuevo... Bienvenido!"); 
}


var vuelta = 0;
while(vuelta < 10)
{
      console.log(vuelta) 
       vuelta++ // vuelta = vuelta +1 
}
console.clear()
var respuesta = confirm("presiona un botón!"); 
if (respuesta === true) 
{
     console.log("Has aceptado!");
}
    else 
        { 
            console.log("Has cancelado");
        }

var control = 1
while (control <= 10)
{ 
    console.log("es el valor " + control);
    control++;
}    


for (var i = 0; i < 10; i++) 
{
   console.log("El valor de i es "+i);
} 

var arreglo = [1, "plátano", "piscina", "manzana", true];
console.log("arreglo[1]:", arreglo[1]);
var miObjeto =
{
    cadena: 'es una cadena',
    numero:13,
    booleano:false,
    saludar: function()
    {
        console.log(" hola");
    }
};

//console.log(miObjeto.cadena);
console.log(miObjeto.saludar());
//miObjeto.numero = miObjeto.numero + 13;
//console.log(miObjeto.numero);
/*

var objeto1 = 
{
    propiedad1: "hola",
    propiedad2: 2,
    propiedad3: false,
    propiedad4: [true,2,5, "..."],
    propiedad5: {
                dato: "más datos..." },
    metodo: function()
    { 
         console.log("hola"); 
    } 
}
function mostrar_propiedades(objeto, nombreObjeto)
{
    var resultado = "";
    for (var i in objeto)
    {
         resultado += nombreObjeto + "." + i + " = " + objeto[i] + "\n";
    }
      return resultado;
 }
 console.log(mostrar_propiedades(objeto1, "objeto1"));
*/
 /*function sumar (p1, p2)
 { 
       console.log("suma:", p1 + p2)
 } 
 sumar(2, 3);
*/
function ingresar()
{
    let cajanom   = document.getElementById("cajauno").value;
    let cajaemail = document.getElementById("cajados").value;
    document.getElementById("cajatres").value = "cplo";
    

                  //   document.getElementById("elemento");
     console.log(cajanom);
     console.log(cajaemail);
     
}

function validarEntero(valor){
   //intento convertir a entero.
   //si era un entero no le afecta, si no lo era lo intenta convertir
   valor = parseInt(valor)

   //Compruebo si es un valor numérico
   if (isNaN(valor)) {
      //entonces (no es numero) devuelvo el valor cadena vacia
      return ""
   }else{
      //En caso contrario (Si era un número) devuelvo el valor
      return valor
   }
}
