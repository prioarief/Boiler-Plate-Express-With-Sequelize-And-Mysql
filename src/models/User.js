const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

module.exports = sequelize.define(
  "user",
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    level_id: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);
