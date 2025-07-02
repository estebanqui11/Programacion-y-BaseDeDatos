const { Videojuego } = require('../models');

const create = async (req, res) => {
  try {
    const nuevo = await Videojuego.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear:', error);
    res.status(500).json({ error: 'Error al crear el videojuego' });
  }
};

const getAll = async (req, res) => {
  try {
    const { plataforma, genero } = req.query;
    let where = {};
    if (plataforma) where.plataforma = plataforma;
    if (genero) where.genero = genero;
    const juegos = await Videojuego.findAll({ where });
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener videojuegos' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const juego = await Videojuego.findByPk(id);
    if (!juego) {
      return res.status(404).json({ error: 'Videojuego no encontrado' });
    }

    await juego.update(datos);
    res.json(juego);
  } catch (error) {
    console.error('Error al editar:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const juego = await Videojuego.findByPk(id);

    if (!juego) {
      return res.status(404).json({ error: 'Videojuego no encontrado' });
    }

    await juego.destroy();
    res.json({ mensaje: 'Videojuego eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const juego = await Videojuego.findByPk(id);

    if (!juego) {
      return res.status(404).json({ error: 'Videojuego no encontrado' });
    }

    res.json(juego);
  } catch (error) {
    console.error('Error al obtener juego por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



module.exports = {
  getAll,
  create,
  update,
  remove,
  getById
};

