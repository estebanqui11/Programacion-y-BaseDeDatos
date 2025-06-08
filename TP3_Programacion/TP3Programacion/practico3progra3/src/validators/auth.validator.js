const Joi = require('joi');

const authSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'El email debe ser válido',
            'any.required': 'El email es requerido'
        }),
    
    password: Joi.string()
        .min(8)
        .required()
        .messages({
            'string.min': 'La contraseña debe tener al menos 8 caracteres',
            'any.required': 'La contraseña es requerida'
        })
});

const validarAuth = (req, res, next) => {
    const { error } = authSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({
            message: 'Error de validación',
            error: error.details[0].message
        });
    }
    
    next();
};

module.exports = {
    validarAuth
}; 