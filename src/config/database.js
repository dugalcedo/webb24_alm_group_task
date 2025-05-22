const { Sequelize } = require("sequelize");
const dotenv = require("dotenv"); dotenv.config();

const sequelize = new Sequelize(process.env.NODE_ENV != 'test' ? {
  dialect: "postgres",
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  logging: false
}: {
  dialect: "postgres",
  database: process.env.DB_NAME_TEST,
  username: process.env.DB_USERNAME_TEST,
  password: process.env.DB_PASSWORD_TEST,
  host: process.env.DB_HOST_TEST,
  port: process.env.DB_PORT_TEST,
  logging: false
})

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    // Sync all models
    await sequelize.sync({ force: true, logging: false }); // Note: force: true will drop the table if it already exists
    console.log("Database synchronized");
    return true
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return false
  }
}

module.exports = {
  sequelize,
  testConnection
}
