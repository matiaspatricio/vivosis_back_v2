const { DataTypes } = require('sequelize');
const sequelize = require("../database/database.js");
const Categoria = require("./categoria.js")
const Subcategoria = require("./subcategoria.js")

const Producto = sequelize.define('Productos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        unique: true
    },
    categoria: {
        type: DataTypes.INTEGER,
        foreignKey: 'Categoria.id',
        allowNull: false
    },
    subcategoria: {
        type: DataTypes.INTEGER,
        foreignKey: 'Subcategoria.id',
        allowNull: false
    },
    costo: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },    
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    stock: {
        type: DataTypes.DOUBLE,
        allowNull: true
    }, 
    fecha_costo: {
        type: DataTypes.DATE,
        allowNull: true
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
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
});
module.exports = Producto

Producto.belongsTo(Categoria, { foreignKey: 'categoria', as: 'Categoria' });
Producto.belongsTo(Subcategoria, { foreignKey: 'subcategoria', as: 'SubCategoria' });

    
sequelize.sync({ alter: true });

