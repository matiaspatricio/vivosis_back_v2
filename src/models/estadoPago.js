const { DataTypes } = require('sequelize');
const sequelize = require("../database/database.js");

const EstadoPago = sequelize.define('EstadoPago', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});

module.exports = EstadoPago;

