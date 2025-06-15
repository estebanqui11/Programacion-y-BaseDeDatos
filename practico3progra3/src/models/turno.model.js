const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Turno = sequelize.define('Turno', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idPaciente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('PENDIENTE', 'CANCELADO', 'COMPLETADO'),
        defaultValue: 'PENDIENTE'
    }
});

module.exports = Turno; 