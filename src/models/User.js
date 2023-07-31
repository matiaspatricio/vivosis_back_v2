const { DataTypes } = require('sequelize');
const sequelize = require("../database/database.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: [2, 50]
    }
  },
  apellido: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: [2, 50]
    }
  },    
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      len: [2, 50]
    }
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [5, 100]
    }
  }
});

// Método para verificar la contraseña
User.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const generateToken = (userId) => {
  const secretKey = 'nhbfbtyzqlfxtredtjdyrltplavzwiobkjkrlzoiistoamalclunegjpweugmizfmurdlyefopyhkbsxnltmonhgjnjhmouravmqffpaiaoybxcsdjqbzbpjqrsytbwe'; // Reemplaza con tu clave secreta
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  return token;
};

module.exports = User;
