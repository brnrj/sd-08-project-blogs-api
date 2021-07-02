const { Post } = require('../services');

const OK = 200;
const CREATED = 201;

const validate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { body } = req;
    await Post.validate(authorization, body);
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
    const { authorization } = req.headers;
    const { body } = req;
    const post = await Post.create(authorization, body);
    return res.status(CREATED).json(post);
  } catch (e) {
    const error = e.message.split('$');
    const message = error[0];
    const status = error[1] || 500;
    return res.status(status).json({ message });
  }
};

const getAll = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const post = await Post.getAll(authorization);
    return res.status(OK).json(post);
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
  getAll,
};