'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
      id: {
          type: DataTypes.INTEGER,
          unique: true,
          primaryKey: true,
          autoIncrement: true
      },
      username: {
          type: DataTypes.STRING
      },
      password: {
          type: DataTypes.STRING
      },
      accountType: {
          type: DataTypes.ENUM,
          values: ['employee','customer']
      }
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};