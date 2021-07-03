const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { resources: { Users }, api } = require('../.env.js');

const getAll = async () => {
  const resources = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return { result: resources };
};

const findOneWhere = async (objOptions) => User.findOne({ where: objOptions });

const findById = async (id) => {
  const resource = await User.findByPk(id);
  if (!resource) {
    return { error: {
    code: 'notFound', message: 'User does not exist' } };
  }
  return { result: resource };
};

const insertOne = async (obj) => {
  const existingUser = await findOneWhere({ email: obj.email });
  if (existingUser) {
    return { error: {
      code: 'alreadyExists', message: 'User already registered',
    } };
  }
  const newUser = await User.create(obj);
  const { password, ...restUser } = newUser.dataValues;
  const token = jwt.sign({ data: restUser }, api.secret);
  return { result: { token } };
};

const deleteById = async (id) => {
  const resp = await User.deleteById(Users.tableOrCollec, id);
  if (!resp) {
    return { error: {
    code: 'not_found', message: 'not_found message delete' } };
  }
  return { result: {
    message: `The ${Users.singular} with id = ${id} was deleted successfully` } };
};

const updateById = async (id, obj) => {
  const resp = await User.updateById(Users.tableOrCollec, id, obj);
  if (!resp) {
    return { error: {
    code: 'not_found', message: `${Users.singular} not found` } };
  }
  return findById(id);
};

const login = async (obj) => {
  const existingUser = await findOneWhere(obj);
  if (!existingUser) {
    return { error: {
      code: 'badRequest', message: 'Invalid fields',
    } };
  }
  const { password, ...restUser } = existingUser.dataValues;
  const token = jwt.sign({ data: restUser }, api.secret);
  return { result: { token } };
};

module.exports = {
  getAll,
  findById,
  insertOne,
  deleteById,
  updateById,
  login,
};
