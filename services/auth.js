const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models');
const { status, message } = require('./statusMessages');

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(status.UNAUTHORIEZED).json(message.serverError); // message
  }
  const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodedPayload);
  //   if (!decodedPayload) {
  //     return res.status(status.UNAUTHORIEZED).json(message.serverError) // message
  //   }
  //   const emailFind = await User.findOne({ where: { decodedPayload.email } });

  // if (!emailFind) {
  //   return res.status(status.UNAUTHORIEZED).json(message.serverError); // message
  // }
  // req.User = emailFind;
  // console.log(req.user);
  return next();
};

module.exports = { auth };