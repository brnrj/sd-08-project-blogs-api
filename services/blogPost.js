// const { BlogPost } = require('../models');
const { status, message } = require('./statusMessages');

const blogPostCheck = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title) {
    return res.status(status.BAD_REQUEST).json(message.postTitleEmpty);
  }
  if (!content) {
    return res.status(status.BAD_REQUEST).json(message.postContentEmpty);
  }
  if (!categoryIds) {
    return res.status(status.BAD_REQUEST).json(message.postIdNotExist);
  }

  return next();
};

module.exports = { blogPostCheck };