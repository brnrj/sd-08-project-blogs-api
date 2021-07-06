require('dotenv').config({ path: '../../config' });
const services = require('../services');

const creates = async (req, res) => {
  console.log('Criando categoria');
  const userInfos = req.body;
  const createdCategories = await services.Categories.create(userInfos);
  const { error, isBoom } = createdCategories;
  if (error) {
    return res.boom.notFound(error.message);
  }
  if (isBoom) {
    // console.log('Created', createdCategories.output);
    const { statusCode } = createdCategories.output;
    return res.status(statusCode).json({ message: 'User already registered' });
  }
  // console.log('Created', process.env.STATUS_CREATED, createdCategories);
  return res.status(Number(process.env.STATUS_CREATED)).json(createdCategories);
};

const findAll = async (_req, res) => {
  console.log('Pesquisando todos');
  const foundAll = await services.Categories.findAll();
  return res.status(Number(process.env.STATUS_OK)).json(foundAll);
};

module.exports = { 
  creates,
  findAll,
};