const { DataTypes } = require('sequelize');
const sequelize = require("../database/database.js");
const Pedido_cabecera = require("./pedido_cabecera.js"); // Import the Pedido_cabecera model
const Producto = require("./producto.js"); // Import the Producto model

const Pedido_detalle = sequelize.define('Pedidos_detalles', {
    pedido_id: { 
        type: DataTypes.INTEGER,
        primaryKey: true        
    },    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true        
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    producto_id: {
        type: DataTypes.INTEGER,        
        allowNull: false
    },
    cantidad: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: false
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
    estado_item: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    estado_pago_item: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    fecha_entrega: {
        type: DataTypes.DATE,
        allowNull: true
    },
},
{tableName: 'Pedidos_detalle',}
);

Pedido_detalle.belongsTo(Producto, {foreignKey: 'producto_id'});
Pedido_detalle.belongsTo(Pedido_cabecera, {foreignKey: 'pedido_id'});

Pedido_cabecera.hasMany(Pedido_detalle, { foreignKey: 'pedido_id' });
Pedido_detalle.belongsTo(Pedido_cabecera, { foreignKey: 'pedido_id' });


module.exports = Pedido_detalle
