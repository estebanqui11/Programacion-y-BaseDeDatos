// Cambiar el texto del título
const titulo = document.getElementById("tituloPrincipal");
titulo.textContent = "Título modificado con JavaScript";

// Cambiar el color de los párrafos
const parrafos = document.getElementsByClassName("parrafo");
for (let p of parrafos) {
  p.style.color = "blue";
}

// Agregar texto extra a cada <li>
const elementos = document.querySelectorAll("li");
elementos.forEach((item, index) => {
  item.textContent += ` (ítem ${index + 1})`;
});
