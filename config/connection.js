const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: 'dpg-co5cc60l6cac73ddm8ig-a', // Update the host with your Render PostgreSQL hostname
    port: 5432, // Update the port if necessary
  });
}

module.exports = sequelize;
