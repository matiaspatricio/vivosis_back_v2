const { DataTypes } = require('sequelize');
const sequelize = require("../database/database.js");

const Direccion = sequelize.define('Direcciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCliente: {
        type: DataTypes.INTEGER,        
        primaryKey: true
    },
    calle: {
        type: DataTypes.STRING(100),
        allowNull: false
        
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    piso: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    departamento: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    codigoPostal: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    localidad: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    provincia: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    comentarios: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
});
module.exports = Direccion;


