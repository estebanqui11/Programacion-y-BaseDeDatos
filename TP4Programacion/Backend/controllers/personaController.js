const personas = require('../models/persona');

const getPersonas = (req, res) => {
    res.json(personas);
};

module.exports = {
    getPersonas
}; 