const generateToken = require('../utils/generateToken');
const schema = require('../schema');
const { User } = require('../models');
const CustomError = require('../utils/customError');

const { code, err, msg } = new CustomError();

const checkListLogin = async (data) => {
  const checkSchema = schema.validLogin(data);
  if (checkSchema.err) return checkSchema;

  const emailExists = await User.findOne({
    where: { email: data.email },
  });

  if (!emailExists) return err(msg.userNotExists, code.badRequest);

  if (data.password !== emailExists.password) {
    return { code: code.badRequest, err: { messag: 'Campos inválidos' } };
  }
  return { user: emailExists };
};

const login = async (data) => {
  const resultaData = await checkListLogin(data);
  if (resultaData.err) return resultaData;
  const { email, displayName, id } = resultaData.user;
  const token = generateToken({ email, displayName, id });
  return { token };
};

module.exports = {
  login,
};
