const { BAD_REQUEST, CONFLICT } = require('../../utils/errors');
const { User: UserModel } = require('../../models');

const { User: {
  Registration: {
    nameMinLength, invalidEmail,
    emailRequired, passwordMinLength, passwordRequired },
} } = BAD_REQUEST;
const { User: { emailNotUnique } } = CONFLICT;

const minDNameLength = 8;
const minPasswordLength = 6;

const verifyRequestCampsExists = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error(JSON.stringify({ status: BAD_REQUEST.status, message: emailRequired }));
    }
    if (!password) {
      throw new Error(JSON.stringify({ status: BAD_REQUEST.status, message: passwordRequired }));
    }
  } catch (e) {
    console.log(e.message);
    const errorCore = JSON.parse(e.message);
    if (errorCore) res.status(errorCore.status).send(errorCore.message);
  }
  next(req, res);
};

const verifyValidCamps = (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/gi;
    if (displayName.length < minDNameLength) {
      throw new Error(JSON.stringify({ status: BAD_REQUEST.status, message: nameMinLength }));
    }
    if (!emailRegex.test(email)) {
      throw new Error(JSON.stringify({ status: BAD_REQUEST.status, message: invalidEmail }));
    }
    if (password.length < minPasswordLength) {
      throw new Error(JSON.stringify({ status: BAD_REQUEST.status, message: passwordMinLength }));
    }
    next(req, res);
  } catch (e) {
    console.log(e.message);
    const errorCore = JSON.parse(e.message);
    res.status(errorCore.status).send(errorCore.message);
  }
};

const verifyIfNewUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const searchUserEmail = await UserModel.findOne({ where: email });
    const userAll = await UserModel.findAll();
    console.log(userAll);
    if (searchUserEmail) {
      throw new Error(JSON.stringify({ status: CONFLICT.status, message: emailNotUnique }));
    }
    next(req, res);
  } catch (e) {
    // const errorCore = JSON.parse(error.message);
    // res.status(errorCore.status).send(errorCore.message);
    res.send(e.message);
  }
};

const validateUserRegister = (req, res, next) => {
  const checkUserExists = () => verifyIfNewUser(req, res, next);
  const checkValid = () => verifyValidCamps(req, res, checkUserExists);
  verifyRequestCampsExists(req, res, checkValid);
};

module.exports = { validateUserRegister };
