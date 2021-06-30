const { Category } = require('../services');

const OK = 200;
const CREATED = 201;

const create = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { body } = req;
    const category = await Category.create(authorization, body);
    return res.status(CREATED).json(category);
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
    const categories = await Category.getAll(authorization);
    return res.status(OK).json(categories);
  } catch (e) {
    const error = e.message.split('$');
    const message = error[0];
    const status = error[1] || 500;
    return res.status(status).json({ message });
  }
};

module.exports = {
  create,
  getAll,
};