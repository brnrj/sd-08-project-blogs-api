const { User } = require('../models');
const CustomErr = require('../utils');
const { httpStatusCode } = require('../../constants');
const { tokenGenerete } = require('../auth');
const { userValidations } = require('../validations');

const createUser = async (displayName, email, password, image) => {
    userValidations.nameValidate(displayName);
    userValidations.mailValidate(email);
    userValidations.passValidate(password);
    const alreadyRegistredUser = await User.findOne({ where: { email } });
    if (alreadyRegistredUser) {
      throw new CustomErr(httpStatusCode.CONFLICT, 'User already registred');
    }

    const { dataValues: { id } } = await User.create({ displayName, email, password, image });
    const token = tokenGenerete({ email, id });
    return token;
};

module.exports = {
  createUser,
};
