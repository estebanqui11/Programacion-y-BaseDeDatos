const express = require('express');
const router = express.Router();
const { getTurnosByPaciente, cancelarTurno, crearTurno } = require('../controllers/turno.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

// Rutas públicas
router.get('/:idPaciente', getTurnosByPaciente);
router.delete('/:idTurno', cancelarTurno);

// Rutas protegidas
router.post('/', validarJWT, crearTurno);

module.exports = router; 