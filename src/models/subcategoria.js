const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Categoria = require('./categoria');

const Subcategoria = sequelize.define('Subcategorias', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  categoria_id:{
    type: DataTypes.INTEGER,
    allowNull: true,
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

// Establecer la relación entre categorías y subcategorías
Subcategoria.belongsTo(Categoria, { foreignKey: 'categoria_id' });

module.exports = Subcategoria;
