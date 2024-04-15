function validar()
{
    var runx=document.getElementById("cajauno").value;
    var largo=runx.length;
    var digillego=parseInt(runx[largo-1]);
    largo=largo-3;
    var mult=2;
    var suma=0;
    for (var i=largo;i>=0;i--) 
    { 
        
        if(runx[i] != '.')
        {
                 suma=suma+(parseInt(runx[i]))*mult;
                 mult=mult+1;
                 if(mult==8)
                        mult=2;
            
        }
    }
    var divi = suma % 11;
    var sale = 11 - divi;
    alert(sale);
    if (sale == digillego)
       alert('oka')
    else
       alert('no oka')
  
}