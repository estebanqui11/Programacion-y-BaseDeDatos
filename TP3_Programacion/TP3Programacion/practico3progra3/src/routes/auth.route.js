const express = require('express');
const router = express.Router();
const { login, registro } = require('../controllers/auth.controller');
const { validarAuth } = require('../validators/auth.validator');

router.post('/login', validarAuth, login);
router.post('/registro', validarAuth, registro);

module.exports = router; 