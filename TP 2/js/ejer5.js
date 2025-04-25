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

function toggleError(campoError, esValido) { //evita repetir el if para mostrar o no el elemento <p>
    campoError.style.display = esValido ? "none" : "block";
}

btn_cancelar.addEventListener("click", (e) => {
    formulario.reset();
})

boton.addEventListener("click", function (e) {
    e.preventDefault();

    const nombreValido = validaciones.nombre.test(nombre.value); //verifica que los campos sean verdadero.
    const emailValido = validaciones.email.test(email.value);
    const edadValida = validaciones.edad.test(edad.value);
    const telefonoValido = validaciones.telefono.test(telefono.value);

    toggleError(error_nombre, nombreValido); //LLama a la funcion toggle para mostrar u ocultar el mesaje.
    toggleError(error_email, emailValido);
    toggleError(error_edad, edadValida);
    toggleError(error_telefono, telefonoValido);

    if (nombreValido && emailValido && edadValida && telefonoValido) {
        completo.style.display = "block"
        formulario.reset();
        boton.blur();
    }
    else {
        completo.style.display = "none" //oculta el mesaje por mas que el usuario envie y tenga un error
    }

});

