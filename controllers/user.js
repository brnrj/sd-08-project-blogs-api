const { User } = require('../services');

const OK = 200;
const CREATED = 201;

const validate = async (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;
    await User.validate(displayName, email, password);
    next();
  } catch (e) {
    const error = e.message.split('$');
    const message = error[0];
    const status = error[1] || 500;
    return res.status(status).json({ message });
  }
};

const create = async (req, res) => {
  try {
    const token = await User.create(req.body);
    return res.status(CREATED).json({ token });
  } catch (e) {
    const error = e.message.split('$');
    const message = error[0];
    const status = error[1] || 500;
    return res.status(status).json({ message });
  }
};

const validateLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await User.validateLogin(email, password);
    next();
  } catch (e) {
    const error = e.message.split('$');
    const message = error[0];
    const status = error[1] || 500;
    return res.status(status).json({ message });
  }
};

const login = async (req, res) => {
  try {
    const token = await User.login(req.body.email);
    return res.status(OK).json({ token });
  } catch (e) {
    const error = e.message.split('$');
    const message = error[0];
    const status = error[1] || 500;
    return res.status(status).json({ message });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await User.getAll(req.headers.authorization);
    return res.status(OK).json(users);
  } catch (e) {
    const error = e.message.split('$');
    const message = error[0];
    const status = error[1] || 500;
    return res.status(status).json({ message });
  }
};

const getById = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;
    const user = await User.getById(authorization, id);
    return res.status(OK).json(user);
  } catch (e) {
    const error = e.message.split('$');
    const message = error[0];
    const status = error[1] || 500;
    return res.status(status).json({ message });
  }
};

module.exports = {
  validate,
  create,
  validateLogin,
  login,
  getAll,
  getById,
};
