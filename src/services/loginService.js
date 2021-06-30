const { BAD_REQUEST } = require('../../common/constants/statusCodes');
const { INVALID_FIELDS } = require('../../common/constants/statusMessages');
const { User } = require('../../models');
const { generateError } = require('../../validations/errors/generateError');

const loginUser = async (email, password) => {
  const foundUser = await User.findOne({ where: { email, password } });

  if (!foundUser) {
    return generateError(BAD_REQUEST, INVALID_FIELDS);
  }
  return foundUser;
};

module.exports = {
  loginUser,
};
