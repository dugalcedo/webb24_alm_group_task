// test-setup.js
process.env.NODE_ENV = "test";
const { sequelize } = require("../src/config/database");
const User = require("../src/models/User");
const Accommodation = require("../src/models/Accommodation.js")
const { doAssociations } = require('../src/config/associations.js')

beforeAll(async () => {
  doAssociations()
  await sequelize.sync({ logging: false, force: true });
});

afterAll(async () => {
  await User.destroy({ where: {} })
  await Accommodation.destroy({ where: {} })
  await sequelize.close();
});

module.exports = { sequelize, User, Accommodation };