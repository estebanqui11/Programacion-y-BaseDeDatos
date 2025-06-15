const express = require('express');
const router = express.Router();
const { getPersonas } = require('../controllers/personaController');

router.get('/personas', getPersonas);

module.exports = router; 