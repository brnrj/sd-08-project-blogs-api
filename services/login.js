const { User } = require('../models');
const { status, message } = require('./statusMessages');

const loginCheck = async (req, res, next) => {
  const { email, password } = req.body;
if (!email || !password) {
  return res.status(status.UNAUTHORIEZED).json(message.serverError); // message
}
const emailFind = await User.findOne({ where: { email } });
if (!emailFind) {
  return res.status(status.UNAUTHORIEZED).json(message.serverError); // message
}
// console.log(emailFind);
const passwordCheck = (password === emailFind.password);
if (!passwordCheck) {
  return res.status(status.CONFLICT).json(message.serverError); // message
}
req.user = emailFind;
return next();
};

module.exports = { loginCheck };