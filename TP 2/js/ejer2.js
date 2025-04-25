const lista = document.getElementById("lista");
const agregar = document.getElementById("texto");
let contador= 0;
document.getElementById('addItemBtn').addEventListener('click', () => {
  const texto = agregar.value.trim();
  if (texto !== "") {
    const nuevo = document.createElement("li");
    nuevo.textContent = texto;
    agregar.value = "";
    let boton=document.createElement("button");
    boton.textContent="eliminar"
    boton.setAttribute('class', 'eliminar')
    nuevo.appendChild(boton)
    lista.appendChild(nuevo);

        boton.addEventListener('click', (e) => {
        lista.removeChild(nuevo)
        });
    }
  })