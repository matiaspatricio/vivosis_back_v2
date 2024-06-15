const { DataTypes } = require('sequelize');
const sequelize = require("../database/database.js");

const PuntoEntrega = sequelize.define('PuntosEntrega', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50)
          
    },
    comentario: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}
,{tableName: 'PuntosEntrega'}
);
module.exports = PuntoEntrega;
