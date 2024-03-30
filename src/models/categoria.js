const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Categoria = sequelize.define('Categorias', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

module.exports = Categoria;
