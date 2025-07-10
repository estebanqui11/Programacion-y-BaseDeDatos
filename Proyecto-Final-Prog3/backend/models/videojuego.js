module.exports = (sequelize, DataTypes) => {
  const Videojuego = sequelize.define('Videojuego', {

    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false
    },
    plataforma: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'jugando', 'completado'),
      defaultValue: 'pendiente'
    },
    calificacion: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 10
      }
    },
    tiempo_jugado: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    
    imagen: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    tableName: 'videojuegos',
    timestamps: true
  });

  return Videojuego;
};