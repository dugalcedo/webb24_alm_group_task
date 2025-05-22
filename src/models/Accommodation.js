const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Accommodation = sequelize.define("Accommodation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  adress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  land: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postnummer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hyra: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  rum: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Accommodation;
