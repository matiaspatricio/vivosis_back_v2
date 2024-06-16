const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Categorias = sequelize.define('Categorias', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true
},
updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
},
});

module.exports = Categorias;
