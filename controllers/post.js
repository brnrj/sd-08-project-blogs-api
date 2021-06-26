const PostSevices = require('../services/post');

const add = async (req, res) => {
  const { body, user: { dataValues: userData } } = req;
  const response = await PostSevices.add(body, userData);
  res.status(201).json(response);
};

module.exports = { 
  add,
};