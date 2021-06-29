const { User } = require('../models');
const schema = require('../schema');
const CustomError = require('../utils/customError');

const { err, code, msg } = new CustomError();

const checkListNewUser = async (data) => {
  const checkSchema = schema.validUser(data);
  if (checkSchema.err) return checkSchema;
  const emailExists = await User.findOne({
    where: { email: data.email }, 
  });
  return !emailExists ? true : err(msg.emailExists, code.conflict);
};

const addUser = async (data) => {
  const resultData = await checkListNewUser(data);
  if (resultData.err) return resultData;
  const user = await User.create(data);
  return { user };
};

module.exports = {
  addUser,
};