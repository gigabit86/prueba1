function iniciar()
{
   var boton=document.getElementById('grabar'); 
   boton.addEventListener('click', nuevoitem, false);

   var botontodos=document.getElementById('todos'); 
   botontodos.addEventListener('click', mostrartodos, false);

   var botoneliminar=document.getElementById('eliminar'); 
   botoneliminar.addEventListener('click', mostrareliminar, false);

   var botonvaciar=document.getElementById('vaciar'); 
   botonvaciar.addEventListener('click', vaciar, false);
  

}


function nuevoitem() 
{
     var clave=document.getElementById('clave').value;
     var valor=document.getElementById('texto').value; 
     localStorage.setItem(clave,valor); 
     mostrar(clave);
}


function mostrar(clave) 
{
      var cajadatos=document.getElementById('cajadatos'); 
      var valor=localStorage.getItem(clave); 
      
      cajadatos.innerHTML='<div>'+clave+' - '+valor+'</div>';
      
      document.getElementById('clave').value=''; 
      document.getElementById('texto').value='';
}


function mostrartodos() 
{
    var cajadatos=document.getElementById('cajadatos'); 
    cajadatos.innerHTML=''; 
    for(var f=0;f<localStorage.length;f++) 
    {
           var clave=localStorage.key(f);
           var valor=localStorage.getItem(clave);
           cajadatos.innerHTML+='<div>'+clave+' - '+valor+'</div>';
    }
}


function mostrareliminar() 
{
    var cajadatos=document.getElementById('cajadatos'); 
    cajadatos.innerHTML=''; 
    for(var f=0;f<localStorage.length;f++) 
    {
          var clave=localStorage.key(f); 
          var valor=localStorage.getItem(clave);
          cajadatos.innerHTML+= '<div>'+clave+' - '+valor+'<br><button onclick="eliminar(\''+clave+'\')">Eliminar</button></div>';
   }
}


function eliminar(clave) 
{
     if(confirm('Está Seguro?'))
     {
          localStorage.removeItem(clave);
          mostrartodos();
     }
}


function vaciar()
{
     var cajadatos=document.getElementById('cajadatos'); 
     cajadatos.innerHTML=''; 
     for(var f=0;f<localStorage.length;f++)
     {
           var clave=localStorage.key(f);
           var valor=localStorage.getItem(clave); 
           cajadatos.innerHTML+= '<div>'+clave+' - '+valor+'</div>';
     }
          cajadatos.innerHTML+= '<br><button onclick="vaciartodos()">Vaciar</button>'
}


function vaciartodos()
{
     if(confirm('Está Seguro de Vaciar todos los registros?')) 
     {
                localStorage.clear(); 
                mostrartodos();
     }
}

window.addEventListener('load', iniciar, false);
