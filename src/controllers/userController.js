// codigo inspirado no do Douglas Cajueiro https://github.com/tryber/sd-08-project-blogs-api/pull/53/files
require('dotenv').config({ path: '../../config' });
const boom = require('@hapi/boom');
const jwt = require('../auth/tokenGeneratis');
const services = require('../services');

const createsUser = async (req, res) => {
  console.log('Criando usuario');
  const userInfos = req.body;
  const createdUser = await services.user.CreateUser(userInfos);
  const { error, isBoom } = createdUser;
  if (error) {
    return boom.notFound(error.message);
  }
  if (isBoom) {
    // console.log('Created', createdUser.output);
    const { statusCode } = createdUser.output;
    return res.status(statusCode).json({ message: 'User already registered' });
  }
  // console.log('Created', process.env.STATUS_CREATED, createdUser);
  const token = await jwt.tokenGenerete(userInfos);
  return res.status(Number(process.env.STATUS_CREATED)).json({ token });
};

const findAll = async (_req, res) => {
  console.log('Pesquisando todos');
  const foundAll = await services.user.findAll();
  return res.status(Number(process.env.STATUS_OK)).json(foundAll);
};
const findById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    console.log('ID NÂO EXISTE', id);
    return res.boom.notFound('User does not exist');
  }
  const NumberId = Number(id);
  console.log('Pesquisando por ID', NumberId);
  const foundId = await services.user.findByKey('id', NumberId);
  if (!foundId || !foundId.id) {
    console.log('USUARIO NÂO EXISTE');
    return res.boom.notFound('User does not exist');
  }
  const { displayName, email, image } = foundId;
  const result = { id: Number(id), displayName, email, image };
  console.log('resultado', result);
  return res.status(Number(process.env.STATUS_OK)).json(result);
};

module.exports = { 
  createsUser,
  findAll, 
  findById,
};