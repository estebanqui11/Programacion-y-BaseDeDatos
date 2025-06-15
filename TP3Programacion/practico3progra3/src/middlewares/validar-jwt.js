const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            message: 'No hay token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'tu_secret_key');
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Token no válido'
        });
    }
};

module.exports = {
    validarJWT
}; 