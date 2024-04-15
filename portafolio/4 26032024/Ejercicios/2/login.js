function login()
{
  let user=document.getElementById("usuario").value;
  let pass=document.getElementById("clave").value;
  if(user=="ivan" && pass=="1234")
  {
     window.location="dos.html";
  }
  else
      alert("nooooo");
}
