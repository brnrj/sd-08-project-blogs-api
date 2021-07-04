const { BAD_REQUEST } = require('../../common/constants/statusCodes');
const { INVALID_FIELDS } = require('../../common/constants/statusMessages');
const { User } = require('../../models');
const { generateError } = require('../../validations/errors/generateError');
const { createToken } = require('../../validations/token');

const loginUser = async (email, password) => {
  const foundUser = await User.findOne({ where: { email, password } });

  if (!foundUser) {
    return generateError(BAD_REQUEST, INVALID_FIELDS);
  }
  const { id } = foundUser.dataValues;
  return { token: createToken({ email, id }) };
};

module.exports = {
  loginUser,
};
