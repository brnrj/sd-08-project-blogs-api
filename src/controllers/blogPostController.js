// codigo inspirado no do Douglas Cajueiro https://github.com/tryber/sd-08-project-blogs-api/pull/53/files
require('dotenv').config({ path: '../../config' });
const boom = require('@hapi/boom');
const jwt = require('../auth/tokenGeneratis');
const services = require('../services');

const createsBlogPost = async (req, res) => {
  console.log('Criando BlogPost');
  const blogPostInfos = req.body;
  const token = req.headers.authorization;
  const { user } = jwt.tokenDecoded(token);
  const createdBlogPost = await services.blogPost.CreateBlogPost(blogPostInfos, user);
  const { error, isBoom } = createdBlogPost;
  if (error) {
    return boom.notFound(error.message);
  }
  if (isBoom) {
    // console.log('Created', createdBlogPost.output);
    const { statusCode } = createdBlogPost.output;
    return res.status(statusCode).json({ message: 'User already registered' });
  }
  // console.log('Created', process.env.STATUS_CREATED, createdBlogPost);
  
  return res.status(Number(process.env.STATUS_CREATED)).json(createdBlogPost);
};

const findAll = async (_req, _res) => {
  // console.log('Pesquisando todos');
  // const foundAll = await services.user.findAll();
  // return res.status(Number(process.env.STATUS_OK)).json(foundAll);
};
const findById = async (_req, _res) => {
  // const { id } = req.params;
  // if (!id) {
  //   console.log('ID NÂO EXISTE', id);
  //   return res.boom.notFound('User does not exist');
  // }
  // const NumberId = Number(id);
  // console.log('Pesquisando por ID', NumberId);
  // const foundId = await services.user.findByKey('id', NumberId);
  // if (!foundId || !foundId.id) {
  //   console.log('USUARIO NÂO EXISTE');
  //   return res.boom.notFound('User does not exist');
  // }
  // const { displayName, email, image } = foundId;
  // const result = { id: Number(id), displayName, email, image };
  // console.log('resultado', result);
  // return res.status(Number(process.env.STATUS_OK)).json(result);
};

module.exports = { 
  createsBlogPost,
  findAll, 
  findById,
};