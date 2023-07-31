const { DataTypes } = require('sequelize');
const sequelize = require("../database/database.js");


const Ingreso = sequelize.define('Ingreso', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    idProducto: {
        type: DataTypes.INTEGER,
        foreignKey: 'Producto.id',
        allowNull: false
    },
    cantidad: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    costo: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    motivo: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    usuario: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
});
module.exports = Ingreso

        