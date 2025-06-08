const Turno = require('../models/turno.model');

const getTurnosView = async (req, res) => {
    try {
        const turnos = await Turno.findAll({
            order: [['fecha', 'DESC']]
        });
        res.render('turnos/index', { 
            turnos,
            messages: req.flash('messages')
        });
    } catch (error) {
        req.flash('messages', [{
            type: 'danger',
            text: 'Error al cargar los turnos'
        }]);
        res.redirect('/');
    }
};

const getNuevoTurnoView = (req, res) => {
    res.render('turnos/nuevo', {
        messages: req.flash('messages')
    });
};

const createTurnoView = async (req, res) => {
    try {
        const { idPaciente, fecha } = req.body;
        
        // Verificar si ya existe un turno en la misma fecha
        const turnoExistente = await Turno.findOne({
            where: {
                fecha: new Date(fecha),
                estado: 'PENDIENTE'
            }
        });

        if (turnoExistente) {
            req.flash('messages', [{
                type: 'danger',
                text: 'Ya existe un turno en ese horario'
            }]);
            return res.redirect('/turnos/nuevo');
        }

        await Turno.create({
            idPaciente,
            fecha: new Date(fecha)
        });

        req.flash('messages', [{
            type: 'success',
            text: 'Turno creado exitosamente'
        }]);
        res.redirect('/turnos');
    } catch (error) {
        req.flash('messages', [{
            type: 'danger',
            text: 'Error al crear el turno'
        }]);
        res.redirect('/turnos/nuevo');
    }
};

const cancelarTurnoView = async (req, res) => {
    try {
        const { id } = req.params;
        const turno = await Turno.findByPk(id);
        
        if (!turno) {
            req.flash('messages', [{
                type: 'danger',
                text: 'Turno no encontrado'
            }]);
            return res.redirect('/turnos');
        }

        turno.estado = 'CANCELADO';
        await turno.save();
        
        req.flash('messages', [{
            type: 'success',
            text: 'Turno cancelado exitosamente'
        }]);
        res.redirect('/turnos');
    } catch (error) {
        req.flash('messages', [{
            type: 'danger',
            text: 'Error al cancelar el turno'
        }]);
        res.redirect('/turnos');
    }
};

module.exports = {
    getTurnosView,
    getNuevoTurnoView,
    createTurnoView,
    cancelarTurnoView
}; 