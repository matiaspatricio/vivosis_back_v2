const { DataTypes } = require('sequelize');
const sequelize = require("../database/database.js");

const EstadoPedido = sequelize.define('EstadoPedido', {
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

module.exports = EstadoPedido;

