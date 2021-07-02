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

const getById = async (id) => {
  const validateId = schema.fields.checkId(id);
  if (validateId.err) return validateId;
  const getUser = await User.findByPk(id);
  if (!getUser) return err(msg.listUserNotExists, code.notFound);
  delete getUser.password;
  return { user: getUser };
};

const deleteMe = async (id) => {
  const result = await User.destroy({ where: { id } });
  console.log(result);
  return { post: 'deleteed' };
};

module.exports = {
  addUser,
  getAllUser,
  getById,
  deleteMe,
};