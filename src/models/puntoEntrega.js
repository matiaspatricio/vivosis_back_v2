const { DataTypes } = require('sequelize');
const sequelize = require("../database/database.js");

const PuntoEntrega = sequelize.define('PuntoEntrega', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        unique: true,    
    },
    comentario: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
});
module.exports = PuntoEntrega;
