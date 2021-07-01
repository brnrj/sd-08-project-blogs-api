const { BAD_REQUEST } = require('../../utils/errors');
const { User: UserModel } = require('../../models');
const stringyErr = require('../../utils/stringfy');

const { Login: {
  emailRequired,
  passwordRequired,
  emailEmpty,
  passwordEmpty,
  userInexists,
} } = BAD_REQUEST;

const verifyRequestCampsExists = async (req, res, next) => {
  try {
    if (!Object.hasOwnProperty.call(req.body, 'email')) {
      throw new Error(stringyErr(BAD_REQUEST, emailRequired));
    }
    if (!Object.hasOwnProperty.call(req.body, 'password')) {
      throw new Error(stringyErr(BAD_REQUEST, passwordRequired));
    }
    next(req, res);
  } catch (e) {
    const errorCore = JSON.parse(e.message);
    res.status(errorCore.status).send(errorCore.message);
  }
};

const verifyValidCamps = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email.length > 1) throw new Error(stringyErr(BAD_REQUEST, emailEmpty));
    if (password.length > 1) throw new Error(stringyErr(BAD_REQUEST, passwordEmpty));
    next(req, res);
  } catch (e) {
    const errorCore = JSON.parse(e.message);
    res.status(errorCore.status).send(errorCore.message);
  }
};

const verifyIfUserExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const searchUserEmail = await UserModel.findOne({ where: { email } });
    if (searchUserEmail === null) throw new Error(stringyErr(BAD_REQUEST, userInexists));
    return next();
  } catch (e) {
    const errorCore = JSON.parse(e.message);
    res.status(errorCore.status).send(errorCore.message);
  }
};

const validateLogin = (req, res, next) => {
  const checkUserExists = () => verifyIfUserExists(req, res, next);
  const checkValid = () => verifyValidCamps(req, res, checkUserExists);
  verifyRequestCampsExists(req, res, checkValid);
};

module.exports = validateLogin;
