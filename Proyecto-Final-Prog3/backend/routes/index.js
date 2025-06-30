const express = require('express');
const router = express.Router();

const videojuegosRoutes = require('./videojuegos.routes');
router.use('/videojuegos', videojuegosRoutes);

module.exports = router;