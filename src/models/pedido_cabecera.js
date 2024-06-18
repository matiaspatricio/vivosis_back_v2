const { DataTypes } = require('sequelize');
const sequelize = require("../database/database.js");
const Cliente = require("./cliente.js"); // Import the Cliente model


const Pedido_cabecera = sequelize.define('Pedidos_cabeceras', {
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
    total: {
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
    usuario: {
        type: DataTypes.STRING(50),
        allowNull: true
    },  
    totalEnviado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },      
    punto_entrega: {
        type: DataTypes.INTEGER,
        foreignKey: 'PuntosEntrega.id',
        allowNull: true
    },
    
    
},
{tableName: 'Pedidos_cabecera',}
);
module.exports = Pedido_cabecera


Pedido_cabecera.belongsTo(Cliente, {foreignKey: 'idCliente', targetKey: 'id'});

//sync 


sequelize.sync()
  .then(() => console.log('Base de datos sincronizada'))
  .catch((error) => console.log('Error al sincronizar la base de datos:', error));