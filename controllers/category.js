const { Category } = require('../services');

const CREATED = 201;

const create = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { body } = req;
    const category = await Category.create(authorization, body);
    res.status(CREATED).json(category);
  } catch (e) {
    const error = e.message.split('$');
    const message = error[0];
    const status = error[1] || 500;
    return res.status(status).json({ message });
  }
};

module.exports = {
  create,
};