const { DataTypes } = require('sequelize');
const sequelize = require("../database/database.js");


const Pedido = sequelize.define('Pedido', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    idCliente: {
        type: DataTypes.INTEGER,
        foreignKey: 'Cliente.id',
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
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    total: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    costo: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    comentarios: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    estado_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    estado_pago: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    fecha_entrega: {
        type: DataTypes.DATE,
        allowNull: true
    },
    punto_entrega: {
        type: DataTypes.INTEGER,
        foreignKey: 'PuntoEntrega.id',
        allowNull: true
    },
    usuario: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
});
module.exports = Pedido


