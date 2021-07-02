const express = require('express');
const {
  createUser, searchAllTheUsers, searchTheUserById } = require('../controllers/UserControllers');
const { validateUserRegister, verifyToken } = require('../middlewares');

const userRoutes = express.Router();
userRoutes.use(express.json());

userRoutes.post('/', validateUserRegister, createUser);
userRoutes.get('/', verifyToken, searchAllTheUsers);
userRoutes.get('/:id', searchTheUserById);

module.exports = userRoutes;
