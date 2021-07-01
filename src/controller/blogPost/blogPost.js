const rescue = require('express-rescue');
const helpers = require('../../helpers/helpers');

const {
  createServices,
  findServices,
} = require('../../sevices/blogPost/blogPost');

const createBlogPost = rescue(async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.users;
  const result = await createServices({ title, content, categoryIds, userId });
  if (result.status) return next(result);
  res.status(helpers.DOU).json(result);
});

const findBlogPost = rescue(async (_req, res) => {
  const result = await findServices();
  res.status(helpers.DOO).json(result);
});

module.exports = {
  createBlogPost,
  findBlogPost,
};
