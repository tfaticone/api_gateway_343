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
      type: {
          type: DataTypes.ENUM,
          values: ['employee', 'customer']
      },
      outside_id: {
          type: DataTypes.INTEGER
      }
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};