const { Sequelize } = require('sequelize/types');

const defineUserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
  displayName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  image: DataTypes.STRING,
  }, { timestamps: false });
  return User;
};
module.exports = defineUserModel;