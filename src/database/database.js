/*const Sequelize = require("sequelize");



const sequelize = new Sequelize({
    database: 'verceldb',
    username: 'default',
    password: 'kV7yrZg0aMmG',
    host: 'ep-aged-sun-52900944-pooler.us-east-1.postgres.vercel-storage.com',
    port: 5432, // Puerto predeterminado de PostgreSQL
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Si tienes el certificado, esto puede ser false, de lo contrario, configúralo en true
      }
    }
  });


  module.exports = sequelize;
*/
const Sequelize = require("sequelize");



const sequelize = new Sequelize({
    database: 'vivosis_test',
    username: 'vivosis_test',
    password: 'Kwgau0OykPsFezlqGtHF011NhtZcjN5x',
    host: 'dpg-cj0637b438irjjakpjs0-a.oregon-postgres.render.com',
    port: 5432, // Puerto predeterminado de PostgreSQL
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Si tienes el certificado, esto puede ser false, de lo contrario, configúralo en true
      }
    }
  }, {
    dialectModule: pg});


  module.exports = sequelize;


