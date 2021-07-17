const PostService = require('../../services/post');
const CategoryService = require('../../services/category');
const { errorHandling, customError } = require('../../utils');

module.exports = errorHandling(async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;
  let categories;
  if (categoryIds) {
    categories = await CategoryService.findAll({ where: { id: categoryIds } });
    if (categories.length !== categoryIds.length) {
      return next(customError('"categoryIds" not found', 'invalidData'));
    }
  }
  console.log(categories);

  const result = await PostService.createOne({
    title, content, categoryIds, userId,
  });

  if (result.err) return next(customError(result.err.message, 'invalidData'));

  res.status(201).json(result);
});
