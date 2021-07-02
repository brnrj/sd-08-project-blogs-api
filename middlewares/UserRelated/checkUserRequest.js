const { BAD_REQUEST, CONFLICT } = require('../../utils/errors');
const { User: UserModel } = require('../../models');
const stringyErr = require('../../utils/stringfy');

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
      throw new Error(stringyErr(BAD_REQUEST, emailRequired));
    }
    if (!password) {
      throw new Error(stringyErr(BAD_REQUEST, passwordRequired));
    }
    next(req, res);
  } catch (e) {
    console.log(e.message, 'Middlewares, checkUserRequest1');
    const errorCore = JSON.parse(e.message);
    res.status(errorCore.status).send(errorCore.message);
  }
};

const verifyValidCamps = (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/gi;
    if (displayName.length < minDNameLength) {
      throw new Error(stringyErr(BAD_REQUEST, nameMinLength));
    }
    if (!emailRegex.test(email)) throw new Error(stringyErr(BAD_REQUEST, invalidEmail));
    if (password.length < minPasswordLength) {
      throw new Error(stringyErr(BAD_REQUEST, passwordMinLength));
    }
    next(req, res);
  } catch (e) {
    console.log(e.message, 'Middlewares, checkUserRequest2');
    const errorCore = JSON.parse(e.message);
    res.status(errorCore.status).send(errorCore.message);
  }
};

const verifyIfNewUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const searchUserEmail = await UserModel.findOne({ where: { email } });
    if (searchUserEmail !== null) throw new Error(stringyErr(CONFLICT, emailNotUnique));
    return next();
  } catch (e) {
    console.log(e.message, 'Middlewares, checkUserRequest3');
    const errorCore = JSON.parse(e.message);
    res.status(errorCore.status).send(errorCore.message);
  }
};

const validateUserRegister = (req, res, next) => {
  const checkUserExists = () => verifyIfNewUser(req, res, next);
  const checkValid = () => verifyValidCamps(req, res, checkUserExists);
  verifyRequestCampsExists(req, res, checkValid);
};

module.exports = validateUserRegister;
