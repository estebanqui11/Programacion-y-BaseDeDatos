function resaltarParrafos() {
    const parrafos = document.querySelectorAll('.parrafo');
    parrafos.forEach(p => p.classList.add('resaltado'));
}

function ocultarParrafos() {
    const parrafos = document.querySelectorAll('.parrafo');
    parrafos.forEach(p => p.classList.toggle('oculto'));
}
