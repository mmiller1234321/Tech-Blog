
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'dpg-cog082779t8c73ccs1jg-a.oregon-postgres.render.com',
      dialect: 'postgres',
    },
  );
}

module.exports = sequelize;

