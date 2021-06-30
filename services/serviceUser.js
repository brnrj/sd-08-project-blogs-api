const { User } = require('../models');
const schema = require('../schema');
const CustomError = require('../utils/customError');
const generateToken = require('../utils/generateToken');

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
  const { displayName, email, id } = await User.create(data);
  const token = generateToken({ displayName, email, id });
  return { token };
};

const getAllUser = async () => {
  const all = await User.findAll();
  if (all.length === 0) return { user: [] };
  const user = all.map((el) => {
    const temp = el.dataValues;
    delete temp.password;
    return temp;
  });
  return { user };
};

module.exports = {
  addUser,
  getAllUser,
};