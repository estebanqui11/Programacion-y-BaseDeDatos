const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './datsabase.sqlite',
    logging: false
});

const initDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
        await sequelize.sync({ alter: true });
        console.log('Base de datos sincronizada.');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
};

module.exports = {
    sequelize,
    initDatabase
}; 