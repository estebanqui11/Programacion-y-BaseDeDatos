// backend/app.js
const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas (más adelante vas a tener más)
const videojuegosRoutes = require('./routes/videojuegos.routes');
app.use('/videojuegos', videojuegosRoutes);

module.exports = app;
