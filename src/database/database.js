const Sequelize = require("sequelize");
const pg = require('pg');



const sequelize = new Sequelize({
    database: 'verceldb',
    username: 'default',
    password: 'kV7yrZg0aMmG',
    host: 'ep-aged-sun-52900944-pooler.us-east-1.aws.neon.tech',
    port: 5432, // Puerto predeterminado de PostgreSQL
    dialect: 'postgres',    
    dialectOptions: {
      ssl: {
        require: true,
        dialectModule: pg,
        rejectUnauthorized: false // Si tienes el certificado, esto puede ser false, de lo contrario, configúralo en true
      }
    }
  });


  module.exports = sequelize;


