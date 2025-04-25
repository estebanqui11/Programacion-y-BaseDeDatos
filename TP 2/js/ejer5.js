// inputs
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const edad = document.getElementById("edad");
const telefono = document.getElementById("telefono");

// id de errores
const error_nombre = document.getElementById("error_nombre");
const error_email = document.getElementById("error_email");
const error_edad = document.getElementById("error_edad");
const error_telefono = document.getElementById("error_telefono");

const formulario = document.getElementById("formulario");
const boton = document.getElementById("boton");
const completo = document.getElementById("completado");
const btn_cancelar = document.getElementById("boton_cancelar");

// validaciones
const validaciones = {
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,20}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    edad: /^(1[89]|[2-9][0-9])$/,
    telefono: /^[0-9]{7,}$/
};

function mostrarError(campoError, esValido) {
    if (esValido == true) {
        campoError.style.display = "none";
    }
    if (esValido == false) {
        campoError.style.display = "block";
    }
}


btn_cancelar.addEventListener("click", (e) => {
    formulario.reset();
})

boton.addEventListener("click", function (e) {
    e.preventDefault();

    const nombreValue = nombre.value;
    const emailValue = email.value;
    const edadValue = edad.value;
    const telefonoValue = telefono.value;

    const nombreValido = validaciones.nombre.test(nombreValue); //verifica que los campos sean verdadero.
    const emailValido = validaciones.email.test(emailValue);
    const edadValida = validaciones.edad.test(edadValue);
    const telefonoValido = validaciones.telefono.test(telefonoValue);

    // muestra en consola los valores del formulario
    console.log("Nombre: ", nombreValue);
    console.log("Email: ", emailValue);
    console.log("Edad: ", edadValue);
    console.log("Teléfono: ", telefonoValue);

    mostrarError(error_nombre, nombreValido);
    mostrarError(error_email, emailValido);
    mostrarError(error_edad, edadValida);
    mostrarError(error_telefono, telefonoValido);

    if (nombreValido && emailValido && edadValida && telefonoValido) {
        completo.style.display = "block"
        formulario.reset();
        setTimeout(() => {
            completo.style.display = "none"
        }, 3000); //oculta el mensaje a los 3seg
    }
    else {
        completo.style.display = "none" //oculta el mesaje por mas que el usuario envie y tenga un error
    }


});

