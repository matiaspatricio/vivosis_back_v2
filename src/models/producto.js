const { DataTypes } = require('sequelize');
const sequelize = require("../database/database.js");

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        unique: true
    },
    categoria: {
        type: DataTypes.INTEGER,
        foreignKey: 'Categoria.id',
        allowNull: false
    },
    subcategoria: {
        type: DataTypes.INTEGER,
        foreignKey: 'Subcategoria.id',
        allowNull: false
    },
    costo: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },    
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    stock: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }, 
    fecha_costo: {
        type: DataTypes.DATE,
        allowNull: true
    },       
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    comentarios: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
});
module.exports = Producto

    


