const express = require('express');
const router = express.Router();
const { 
    getTurnosView, 
    getNuevoTurnoView, 
    createTurnoView, 
    cancelarTurnoView 
} = require('../controllers/turno.view.controller');
const { validarTurno } = require('../validators/turno.validator');

// Rutas para las vistas
router.get('/', getTurnosView);
router.get('/nuevo', getNuevoTurnoView);
router.post('/', validarTurno, createTurnoView);
router.post('/:id/cancelar', cancelarTurnoView);

module.exports = router; 