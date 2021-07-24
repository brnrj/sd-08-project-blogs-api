const express = require('express');

const loginRouter = express.Router();

const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtConfig = require('../config/jwtConfig');

const service = require('../services');

const { status, message } = service;

loginRouter.post('/', service.loginCheck, async (req, res) => {
  try {
    // console.log(req.user);
    const { email } = req.user;
    console.log(email);
    console.log(process.env.JWT_SECRET);
    console.log(jwtConfig.jwtConfig);

    const token = jwt.sign({ email }, process.env.JWT_SECRET, jwtConfig.jwtConfig);
    console.log(token);
    res.status(status.OK).json({ token });
  } catch (error) {
      res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

module.exports = loginRouter;