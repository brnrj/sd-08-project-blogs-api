const express = require('express');

const userRouter = express.Router();
userRouter.use(express.json());
const { createUser } = require('../controllers/UserControllers');

userRouter.post('/', createUser);

module.exports = userRouter;
