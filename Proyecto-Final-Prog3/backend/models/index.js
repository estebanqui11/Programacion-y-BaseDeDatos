// backend/models/index.js
// backend/models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/database');
const VideojuegoModel = require('./videojuego'); //  importamos el modelo videojuego

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions
  }
);

// 👇 Asociamos el modelo y lo exportamos
const Videojuego = VideojuegoModel(sequelize, Sequelize.DataTypes);

module.exports = {
  sequelize,
  Sequelize,
  Videojuego
};
