const rescue = require('express-rescue');
const userCreate = require('../schema/userCreate');
const userLogin = require('../schema/userLogin');
const { Users } = require('../models');
const errorClient = require('../utils/errorClient');
const success = require('../utils/success');
const createToken = require('../auth/createToken');

const createUser = rescue(async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const { error } = userCreate.validate({ displayName, email, password });
  if (error) return next(errorClient.badRequest(error.details[0].message));

  const foundEmailDb = await Users.findOne({ where: { email } });
  if (foundEmailDb) return next(errorClient.conflict('User already registered'));

  await Users.create({ displayName, email, password, image });

  res.status(success.Created).json({ token: createToken({ email }) });
});

const loginUser = rescue(async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = userLogin.validate({ email, password });
  if (error) return next(errorClient.badRequest(error.details[0].message));

  const foundEmailDb = await Users.findOne({ where: { email } });
  if (foundEmailDb) {
    return res.status(success.OK).json({ token: createToken({ email }) });
  }

  next(errorClient.badRequest('Invalid fields'));
});

const getAllUsers = rescue(async (_req, res, _next) => {
  const result = await Users.findAll();
  res.status(success.OK).json(result);
});

const getUserByID = rescue(async (req, res, next) => {
  const { id } = req.params;

  const result = await Users.findByPk(id);
  if (!result) return next(errorClient.notFound('User does not exist'));

  res.status(success.OK).json(result);
});

const deleteUserById = rescue(async (req, res, _next) => {
   const { idUser } = req;

   await Users.destroy({ where: { id: idUser } }); 
  
  // if (!result) return next(errorClient.notFound('Post does not exist'));

  // const { userId } = result;
  // 
//  if (+userId !== +idUser) {    
    // return next(errorClient.unauthorized('Unauthorized user')); 
  // } 
// 
  // await BlogPosts.destroy({ where: { userId: id } });
  
  res.status(success.noContent).json();
});

module.exports = {
   createUser,
   loginUser,
   getAllUsers,
   getUserByID,
   deleteUserById,
};