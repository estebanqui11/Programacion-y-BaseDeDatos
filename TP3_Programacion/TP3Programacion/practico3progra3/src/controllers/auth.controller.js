const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');

const generarJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'tu_secret_key', {
        expiresIn: '2h'
    });
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(400).json({
                message: 'Email o contraseña incorrectos'
            });
        }

        // Verificar la contraseña
        const passwordValido = await usuario.compararPassword(password);
        if (!passwordValido) {
            return res.status(400).json({
                message: 'Email o contraseña incorrectos'
            });
        }

        // Generar JWT
        const token = generarJWT(usuario.id);

        res.json({
            usuario: {
                id: usuario.id,
                email: usuario.email,
                rol: usuario.rol
            },
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error en el servidor'
        });
    }
};

const registro = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario ya existe
        const usuarioExiste = await Usuario.findOne({ where: { email } });
        if (usuarioExiste) {
            return res.status(400).json({
                message: 'El email ya está registrado'
            });
        }

        // Crear usuario
        const usuario = await Usuario.create({
            email,
            password
        });

        // Generar JWT
        const token = generarJWT(usuario.id);

        res.status(201).json({
            usuario: {
                id: usuario.id,
                email: usuario.email,
                rol: usuario.rol
            },
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error en el servidor'
        });
    }
};

module.exports = {
    login,
    registro
}; 