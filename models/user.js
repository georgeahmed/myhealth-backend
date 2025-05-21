'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here if needed
    }
  }

  User.init(
    {
      email: DataTypes.STRING,
      hashed_password: DataTypes.STRING,
      role: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users'  // <-- Add this line
    }
  );

  return User;
};
