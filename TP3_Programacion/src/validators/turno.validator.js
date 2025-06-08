const Joi = require('joi');

const turnoSchema = Joi.object({
    idPaciente: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'El ID del paciente debe ser un número',
            'any.required': 'El ID del paciente es requerido'
        }),
    
    fecha: Joi.date()
        .greater('now')
        .required()
        .messages({
            'date.base': 'La fecha debe ser válida',
            'date.greater': 'La fecha debe ser posterior a la actual',
            'any.required': 'La fecha es requerida'
        })
});

const validarTurno = (req, res, next) => {
    const { error } = turnoSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({
            message: 'Error de validación',
            error: error.details[0].message
        });
    }
    
    next();
};

module.exports = {
    validarTurno
}; 