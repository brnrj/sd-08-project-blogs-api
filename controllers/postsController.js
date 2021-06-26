const rescue = require('express-rescue');
const postService = require('../services/postService');

const CREATED_STATUS = 201;
// const OK_STATUS = 200;

const insertPost = rescue(async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req;
  const result = await postService.insertPost(title, content, categoryIds, email);
  if (result.err) return next(result);
  return res.status(CREATED_STATUS).json(result);
});

module.exports = {
  insertPost,
};
