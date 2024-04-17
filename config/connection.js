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
      host: 'dpg-coft7qol5elc73dkg010-a.oregon-postgres.render.com',
      dialect: 'postgres'
    }
  );
}

module.exports = sequelize;
