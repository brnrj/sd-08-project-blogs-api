const { User } = require('../models/index');

const CREATED = 201;

const post = async (req, res) => {
  const userObject = await User.create(req.body);
  res.status(CREATED).json(userObject);
};

module.exports = {
  post,
};
