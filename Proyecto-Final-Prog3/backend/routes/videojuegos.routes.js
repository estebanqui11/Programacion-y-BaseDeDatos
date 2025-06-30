const express = require('express');
const router = express.Router();

const { getAll, create, update, remove, getById } = require('../controllers/videojuego.controller');


// Rutas
router.get('/', getAll);           // GET /videojuegos
router.post('/', create);          // POST /videojuegos
router.put('/:id', update);        // PUT /videojuegos/1
router.delete('/:id', remove);     // DELETE /videojuegos/1
router.get('/:id', getById);  


module.exports = router;
