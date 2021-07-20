const Joi = require('joi');

const { User } = require('../models');
const JWTgenerate = require('../middleware/JWT');
const { Code400 } = require('../Error');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const reqValid = (userInfo) => {
  const { error } = userSchema.validate(userInfo);
  if (error) {
    const { message } = error.details[0];
    throw new Code400(message);
  }
};

const login = async (loginInfo) => {
  reqValid(loginInfo);
  try {
    const { email: userEmail } = loginInfo;
    const userLogin = await User.findOne({ where: { email: userEmail } });
    const token = JWTgenerate(userLogin.toJSON());
    return token;
  } catch (err) {
    throw new Code400('Invalid fields');
  }
};

module.exports = {
  login,
};
