const Turno = require('../models/turno.model');

// Consultar turnos por identificador de paciente
const getTurnosByPaciente = async (req, res) => {
    try {
        const { idPaciente } = req.params;
        const turnos = await Turno.findAll({
            where: {
                idPaciente: idPaciente
            }
        });
        res.json(turnos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los turnos', error: error.message });
    }
};

// Cancelar un turno
const cancelarTurno = async (req, res) => {
    try {
        const { idTurno } = req.params;
        const turno = await Turno.findByPk(idTurno);
        
        if (!turno) {
            return res.status(404).json({ message: 'Turno no encontrado' });
        }

        turno.estado = 'CANCELADO';
        await turno.save();
        
        res.json({ message: 'Turno cancelado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al cancelar el turno', error: error.message });
    }
};

// Cargar un nuevo turno (requiere autenticación)
const crearTurno = async (req, res) => {
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
            return res.status(400).json({ message: 'Ya existe un turno en ese horario' });
        }

        const nuevoTurno = await Turno.create({
            idPaciente,
            fecha: new Date(fecha)
        });

        res.status(201).json(nuevoTurno);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el turno', error: error.message });
    }
};

module.exports = {
    getTurnosByPaciente,
    cancelarTurno,
    crearTurno
}; 