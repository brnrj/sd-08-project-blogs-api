const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);
const { User: UserModel } = require('../models');
const { tokenGenerateForLogin } = require('../utils');

const createNewUser = async ({ displayName, email, password, image }) => {
  const transaction = await sequelize.transaction();
  try {
    const userData = { displayName, email, password, image };
    await UserModel.create((userData),
      { transaction });
    const tokenGenerated = tokenGenerateForLogin({ email, password });
    return tokenGenerated;
  } catch (e) {
    console.log(e.message, 'UserServices, createNewUser');
    return e.message;
  }
};

const searchAllUsers = async () => {
  try {
    const gettingAll = await UserModel.findAll();
    return gettingAll;
  } catch (e) {
    console.log(e.message, 'UserServices, searchAllUsers');
    return e.message;
  }
};

module.exports = { createNewUser, searchAllUsers };
