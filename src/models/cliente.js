const { DataTypes } = require('sequelize');
const sequelize = require("../database/database.js");
const PuntoEntrega = require("./puntoEntrega.js")


const Clientes = sequelize.define('Clientes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        
    },
    nombre: {
        type: DataTypes.STRING(50),
        unique: true        
    },
    telefono: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING(200),        
        allowNull: true        
    },
    punto_entrega: {
        type: DataTypes.INTEGER,
        foreignKey: 'PuntoEntrega.id',
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: true,
        
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
    origen: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    referido: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
});
//ORIGEN 1: VIVOSIS
//

Clientes.belongsTo(PuntoEntrega, { foreignKey: 'punto_entrega' });
Clientes.belongsTo(Clientes, { as: 'Referido', foreignKey: 'referido' });


module.exports = Clientes